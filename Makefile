PORT ?= 4173

.PHONY: screenshots docs

# Build the site, serve the production bundle and capture every page in
# docs/manual/pages.json at desktop and mobile widths.
screenshots:
	npm run build
	uvx --with playwright python -m playwright install chromium
	npm run preview -- --port $(PORT) --strictPort >/dev/null 2>&1 & \
	  PREVIEW=$$!; \
	  trap "kill $$PREVIEW" EXIT; \
	  for i in $$(seq 1 30); do curl -sf http://localhost:$(PORT)/ >/dev/null && break; sleep 0.5; done; \
	  uvx --with playwright python scripts/screenshots.py --base-url http://localhost:$(PORT)

# Build the docs site; fails on any warning.
docs:
	uvx --with mkdocs-material mkdocs build --strict
