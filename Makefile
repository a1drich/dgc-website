PORT ?= 4173

.PHONY: screenshots docs

# Build the site, serve the production bundle and capture every page in
# docs/manual/pages.json at desktop and mobile widths. Readiness waits for
# this preview's own "Local: ...:PORT" line, so a different server already on
# PORT is never captured; if the preview exits, its output is printed.
screenshots:
	npm run build
	uvx --with playwright python -m playwright install chromium
	npm run preview -- --port $(PORT) --strictPort >.preview.log 2>&1 & \
	  PREVIEW=$$!; \
	  trap "kill $$PREVIEW 2>/dev/null; rm -f .preview.log" EXIT; \
	  ready=; \
	  for i in $$(seq 1 30); do \
	    if ! kill -0 $$PREVIEW 2>/dev/null; then echo "Preview server exited:" >&2; cat .preview.log >&2; exit 1; fi; \
	    if grep -q "localhost:$(PORT)/" .preview.log && curl -sf http://localhost:$(PORT)/ >/dev/null; then ready=1; break; fi; \
	    sleep 0.5; \
	  done; \
	  if [ -z "$$ready" ]; then echo "Preview server not ready on port $(PORT):" >&2; cat .preview.log >&2; exit 1; fi; \
	  if ! kill -0 $$PREVIEW 2>/dev/null; then echo "Preview server exited:" >&2; cat .preview.log >&2; exit 1; fi; \
	  uvx --with playwright python scripts/screenshots.py --base-url http://localhost:$(PORT)

# Build the docs site; fails on any warning.
docs:
	uvx --with mkdocs-material mkdocs build --strict
