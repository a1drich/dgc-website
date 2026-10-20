"""Check route metadata and not-found recovery against a running production preview.

Run with: uvx --with playwright python scripts/check_metadata.py --base-url <url>
Install Chromium first with: uvx --with playwright python -m playwright install chromium
"""

import argparse
import re

from playwright.sync_api import expect, sync_playwright

TITLES = {
    "/": "De Leon Group of Companies — Technology & Sustainable Ventures in the Philippines",
    "/about": "About DGC — De Leon Group of Companies",
    "/portfolio": "Portfolio — De Leon Group of Companies",
    "/contact": "Contact — De Leon Group of Companies",
}
NOT_FOUND = "Page not found — De Leon Group of Companies"
HEADING = "We couldn’t find that page."


def metadata(page):
    return page.evaluate("""() => ({
        title: document.title,
        description: document.head.querySelector('meta[name="description"]')?.content,
        canonical: document.head.querySelector('link[rel="canonical"]')?.href,
        social: document.head.querySelector('meta[property="og:title"]')?.content,
        twitter: document.head.querySelector('meta[name="twitter:title"]')?.content,
        url: document.head.querySelector('meta[property="og:url"]')?.content
    })""")


def check_real(page, path, baseline=None):
    expect(page).to_have_title(TITLES[path])
    tags = metadata(page)
    assert tags["canonical"] == tags["url"] == "https://dgc.ph" + path, tags
    assert tags["description"], tags
    expected_social = "De Leon Group of Companies — DGC" if path == "/" else TITLES[path]
    assert tags["social"] == tags["twitter"] == expected_social, tags
    expect(page.locator('head meta[name="robots"]')).to_have_count(0)
    if baseline:
        assert tags == baseline, (tags, baseline)
    return tags


def check_missing(page):
    expect(page).to_have_title(NOT_FOUND)
    expect(page.locator('head meta[name="robots"]')).to_have_attribute("content", "noindex")
    expect(page.locator('head link[rel="canonical"]')).to_have_count(0)
    heading = page.get_by_role("heading", name=HEADING, exact=True)
    expect(heading).to_be_visible()
    # Visibility alone doesn't catch opacity:0 from a broken scroll reveal.
    page.wait_for_function("""() => {
        const h = document.querySelector('h1');
        return h && Number(getComputedStyle(h).opacity) === 1;
    }""")
    expect(page.get_by_role("link", name="Go to home", exact=True)).to_have_attribute("href", "/")
    expect(page.get_by_role("main").get_by_role("link", name="Contact us", exact=True)).to_have_attribute("href", "/contact")


def unknown_link(page, path):
    # No permanent broken link belongs in the site. Add a temporary same-document
    # link that sends a history event through BrowserRouter, without a reload.
    page.evaluate("""path => {
        const link = document.createElement('a');
        link.id = 'test-unknown-link'; link.href = path;
        link.textContent = 'Test unknown route';
        Object.assign(link.style, {position: 'fixed', bottom: '0', zIndex: '9999'});
        link.onclick = event => {
            event.preventDefault(); history.pushState({}, '', path);
            dispatchEvent(new PopStateEvent('popstate')); link.remove();
        };
        document.body.prepend(link);
    }""", path)
    page.locator("#test-unknown-link").click()
    expect(page).to_have_url(re.compile(re.escape(path) + "$"))


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--base-url", required=True)
    base = parser.parse_args().base_url.rstrip("/")
    failures = []
    with sync_playwright() as p:
        browser = p.chromium.launch()
        for width in (1440, 390):
            context = browser.new_context(viewport={"width": width, "height": 900})
            page = context.new_page()
            page.on("pageerror", lambda error: failures.append(str(error)))
            page.on("console", lambda message: failures.append(message.text) if message.type == "error" else None)
            page.on("requestfailed", lambda request: failures.append(f"Load failed: {request.url}: {request.failure}"))
            page.on("response", lambda response: failures.append(f"HTTP {response.status}: {response.url}") if response.status >= 400 else None)
            baselines = {}
            for path in TITLES:
                page.goto(base + path, wait_until="networkidle")
                baselines[path] = check_real(page, path)
                assert page.evaluate("document.documentElement.scrollWidth <= innerWidth"), path
            for key in ("title", "description", "canonical", "social", "url"):
                assert len({tags[key] for tags in baselines.values()}) == 4, key
            page.goto(base + "/", wait_until="networkidle")
            page.evaluate("window.metadataTestMarker = true")
            for path, label in (("/about", "About"), ("/portfolio", "Portfolio"), ("/contact", "Contact"), ("/", "Home")):
                if width < 768:
                    page.get_by_role("button", name="Open menu").click()
                nav = page.get_by_role("navigation", name="Mobile" if width < 768 else "Primary", exact=True)
                nav.get_by_role("link", name=label, exact=True).click()
                check_real(page, path, baselines[path])
                assert page.evaluate("window.metadataTestMarker === true"), "Unexpected reload"
            unknown_link(page, "/unknown-from-link")
            check_missing(page)
            unknown_link(page, "/another-unknown")
            check_missing(page)
            assert page.evaluate("window.metadataTestMarker === true"), "Unexpected reload"
            page.get_by_role("link", name="Go to home", exact=True).click()
            check_real(page, "/", baselines["/"])
            page.goto(base + "/does-not-exist", wait_until="networkidle")
            check_missing(page)
            assert page.evaluate("document.documentElement.scrollWidth <= innerWidth"), "Not-found overflow"
            page.get_by_role("main").get_by_role("link", name="Contact us", exact=True).click()
            check_real(page, "/contact", baselines["/contact"])
            page.goto(base + "/about/?campaign=test#details", wait_until="networkidle")
            check_real(page, "/about", baselines["/about"])
            print(f"PASS metadata, navbar navigation, unknown routes, recovery and overflow at {width}px")
            context.close()
        browser.close()
    assert not failures, "\n".join(failures)


if __name__ == "__main__":
    main()
