"""Capture the pages in docs/manual/pages.json at desktop and mobile widths.

Usage: python scripts/screenshots.py --base-url http://localhost:4173

For each page it waits for the page's `expect` text, then saves
docs/manual/screenshots/<name>-desktop.png and <name>-mobile.png.
It also captures the open mobile menu as nav-mobile-open.png.
Reduced motion is emulated so scroll-reveal content is visible.
"""

import argparse
import json
import sys
from pathlib import Path

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent.parent
PAGES = ROOT / "docs" / "manual" / "pages.json"
OUT = ROOT / "docs" / "manual" / "screenshots"

VIEWPORTS = {
    "desktop": {"width": 1440, "height": 900},
    "mobile": {"width": 390, "height": 844},
}


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--base-url", required=True)
    args = parser.parse_args()
    base = args.base_url.rstrip("/")

    pages = json.loads(PAGES.read_text())["pages"]
    OUT.mkdir(parents=True, exist_ok=True)
    failures = []

    with sync_playwright() as p:
        browser = p.chromium.launch()
        for label, viewport in VIEWPORTS.items():
            context = browser.new_context(
                viewport=viewport,
                reduced_motion="reduce",
                device_scale_factor=1,
                is_mobile=label == "mobile",
                has_touch=label == "mobile",
            )
            page = context.new_page()
            for entry in pages:
                page.goto(base + entry["path"], wait_until="networkidle")
                try:
                    page.get_by_text(entry["expect"]).first.wait_for(timeout=10_000)
                except Exception:
                    failures.append(f"{entry['name']} ({label}): missing {entry['expect']!r}")
                    continue
                page.evaluate("document.fonts.ready")
                path = OUT / f"{entry['name']}-{label}.png"
                page.screenshot(path=path, full_page=True)
                print(f"saved {path.relative_to(ROOT)}")

            if label == "mobile":
                page.goto(base + "/", wait_until="networkidle")
                page.evaluate("window.scrollTo(0, 0)")
                page.wait_for_timeout(300)
                page.get_by_role("button", name="Open menu").click()
                page.get_by_role("navigation", name="Mobile").wait_for()
                page.wait_for_timeout(600)
                path = OUT / "nav-mobile-open.png"
                page.screenshot(path=path)
                print(f"saved {path.relative_to(ROOT)}")
            context.close()
        browser.close()

    if failures:
        print("\n".join(failures), file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
