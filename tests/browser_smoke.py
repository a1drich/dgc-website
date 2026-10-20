"""Browser regression checks for the built site and optional Vite hot reload."""
import argparse
from pathlib import Path
from playwright.sync_api import sync_playwright, expect

ROOT = Path(__file__).resolve().parents[1]
ROUTES = {
    '/': 'Building the future of',
    '/about': 'A privately held family office focused on future-ready businesses.',
    '/portfolio': 'A focused set of companies, intentionally chosen.',
    '/contact': 'Let’s start a conversation.',
    '/nope': 'We couldn’t find that page.',
}


def check_styles(page):
    assert page.locator('footer').evaluate(
        "el => getComputedStyle(el).backgroundColor"
    ) == 'rgb(8, 44, 33)', 'Tailwind theme is missing'
    assert page.locator('header').evaluate(
        "el => getComputedStyle(el).position"
    ) == 'fixed', 'Tailwind utilities are missing'


def run(browser, base_url, screenshots):
    for width, device in [(1280, 'desktop'), (390, 'mobile')]:
        page = browser.new_page(viewport={'width': width, 'height': 900}, reduced_motion='reduce')
        errors = []
        page.on('pageerror', lambda error: errors.append(str(error)))
        page.on('console', lambda message: errors.append(message.text) if message.type == 'error' else None)
        for route, heading in ROUTES.items():
            response = page.goto(base_url + route, wait_until='networkidle')
            assert response.ok, f'{route}: HTTP {response.status}'
            expect(page.locator('h1')).to_contain_text(heading)
            expect(page.locator('footer')).to_contain_text('contact@dgc.ph')
            check_styles(page)
            assert page.evaluate('document.documentElement.scrollWidth <= innerWidth'), f'{route}: horizontal overflow'
            # Reveal all sections before capturing the whole page.
            height = page.evaluate('document.documentElement.scrollHeight')
            for y in range(0, height, 600):
                page.evaluate('y => window.scrollTo(0, y)', y)
                page.wait_for_timeout(80)
            page.evaluate('window.scrollTo(0, 0)')
            page.wait_for_timeout(800)
            if screenshots:
                screenshots.mkdir(parents=True, exist_ok=True)
                page.screenshot(path=str(screenshots / f'{device}-{route.strip("/") or "home"}.png'), full_page=True)
            print(f'PASS {device} {route}')

        for route, label in [('/', 'Home'), ('/about', 'About'), ('/portfolio', 'Portfolio'), ('/contact', 'Contact')]:
            page.evaluate('window.scrollTo(0, document.body.scrollHeight)')
            assert page.evaluate('scrollY') > 0
            page.locator('footer').get_by_role('link', name=label, exact=True).click()
            expect(page).to_have_url(base_url + route)
            page.wait_for_function('scrollY === 0')
            expect(page.locator('h1')).to_contain_text(ROUTES[route])

        for route, label in [('/', 'Home'), ('/about', 'About'), ('/portfolio', 'Portfolio'), ('/contact', 'Contact')]:
            if device == 'mobile':
                page.get_by_role('button', name='Open menu', exact=True).click()
                nav = page.get_by_role('navigation', name='Mobile', exact=True)
            else:
                nav = page.get_by_role('navigation', name='Primary', exact=True)
            nav.get_by_role('link', name=label, exact=True).click()
            expect(page).to_have_url(base_url + route)
            expect(page.locator('h1')).to_contain_text(ROUTES[route])
            if device == 'mobile':
                expect(page.get_by_role('button', name='Open menu', exact=True)).to_have_attribute('aria-expanded', 'false')
        assert not errors, errors
        page.close()
        print(f'PASS {device} navigation, footer, scroll-to-top; no browser errors')


def about_grid(browser, base_url):
    page = browser.new_page(reduced_motion='reduce')
    try:
        for width in [390, 639, 640, 768, 1023, 1024, 1280, 1440]:
            page.set_viewport_size({'width': width, 'height': 900})
            page.goto(base_url + '/about', wait_until='networkidle')
            grid = page.locator('section').filter(
                has=page.get_by_role('heading', name='A focused mandate, intentionally narrow.')
            ).locator('.grid')
            expect(grid.locator(':scope > div')).to_have_count(5)
            layout = grid.evaluate('''el => {
                const style = getComputedStyle(el);
                const rect = el.getBoundingClientRect();
                return {
                    right: rect.right,
                    bottom: rect.bottom,
                    columns: style.gridTemplateColumns.split(' ').length,
                    gap: style.gap,
                    radius: parseFloat(style.borderTopLeftRadius),
                    overflow: style.overflow,
                    items: [...el.children].map(item => {
                        const box = item.getBoundingClientRect();
                        return {left: box.left, right: box.right, bottom: box.bottom,
                                background: getComputedStyle(item).backgroundColor};
                    }),
                    background: getComputedStyle(el.closest('section')).backgroundColor
                };
            }''')
            assert layout['columns'] == (1 if width < 640 else 2 if width < 1024 else 3), width
            assert layout['gap'] == '1px', width
            assert layout['radius'] > 0 and layout['overflow'] == 'hidden', width
            assert abs(layout['items'][-1]['right'] - layout['right']) < 1, f'{width}: empty final cell'
            assert abs(layout['items'][-1]['bottom'] - layout['bottom']) < 1, width
            assert all(item['background'] == layout['background'] for item in layout['items']), width
            assert page.evaluate('document.documentElement.scrollWidth <= innerWidth'), width
            print(f'PASS About investment grid at {width}px: filled row, hairlines, rounded clipping, no overflow')
    finally:
        page.close()


def hot_reload(browser, dev_url):
    page = browser.new_page()
    page.goto(dev_url + '/contact', wait_until='networkidle')
    check_styles(page)
    page.evaluate('window.__smokeSentinel = 42')
    source = ROOT / 'src/pages/Contact.jsx'
    original = source.read_bytes()
    marker = 'Let’s test hot reload.'
    try:
        assert 'Let’s start a conversation.' in original.decode()
        source.write_bytes(original.replace('Let’s start a conversation.'.encode(), marker.encode()))
        expect(page.locator('h1')).to_have_text(marker)
        assert page.evaluate('window.__smokeSentinel') == 42, 'HMR reloaded the document'
    finally:
        source.write_bytes(original)
    expect(page.locator('h1')).to_have_text(ROUTES['/contact'])
    page.close()
    print('PASS dev Tailwind and component hot reload without document reload; source restored')


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--base-url', required=True)
    parser.add_argument('--screenshots', type=Path)
    parser.add_argument('--dev-url')
    args = parser.parse_args()
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch()
        try:
            run(browser, args.base_url.rstrip('/'), args.screenshots)
            about_grid(browser, args.base_url.rstrip('/'))
            if args.dev_url:
                hot_reload(browser, args.dev_url.rstrip('/'))
        finally:
            browser.close()
