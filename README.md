# Stack Safety Landing Page

Minimal, responsive static landing page for **Stack Safety** — a personalized radar for the software your product depends on.

## Current positioning

> Only the software changes that matter to your stack.

The founding wedge is intentionally small: users choose the public technologies they depend on, Stack Safety scans the relevant sources, material changes are verified and classified, and the user receives a concise weekly or twice-weekly digest.

The landing page does not claim code-level impact analysis or continuous production SLA monitoring.

## Files

- `index.html` — landing page content and product narrative
- `styles.css` — base responsive visual system
- `enhancements.css` — refined conversion, evidence, pilot and interaction styling
- `app.js` — mobile navigation, scroll progress, reveal animation, active navigation, persistent demo stack picker and FAQ behavior
- `favicon.svg` — Stack Safety stack mark
- `.github/ISSUE_TEMPLATE/pilot.yml` — public founding-pilot request form
- `.github/workflows/validate.yml` — zero-dependency landing-page validation

## Run locally

No build step is required.

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

You can also use any static file server:

```bash
npx serve .
```

## Validation

Check the JavaScript directly:

```bash
node --check app.js
```

GitHub Actions also validates JavaScript syntax, HTML parsing, CSS brace balance, required assets, key page sections, positioning copy and the pilot issue template on every push or pull request to `main`.

## Deploy

Because the site is static, it can be deployed directly to:

- GitHub Pages
- Render Static Site
- Netlify
- Vercel
- Cloudflare Pages

Use the repository root as the publish directory. There is no build command.

## Founding pilot flow

The main CTA opens the repository's `Founding pilot request` GitHub Issue Form. It deliberately avoids collecting private email addresses in a public issue. Pilot users can identify their public stack, preferred digest frequency, role and the problem they want Stack Safety to solve; private contact can be arranged separately afterward.

The interactive stack picker on the landing page is a demo and persists selections only in the visitor's own browser via `localStorage`.

## Product truth boundary

- Example Decision Cards and digest content are explicitly labeled illustrative.
- Official changelogs, release notes, security advisories and deprecation notices are positioned as the core evidence layer.
- Wider web, technical comparisons and community reports are secondary context, not replacements for primary evidence.
- The founding pilot is human-reviewed and does not claim source-code scanning or production SLA monitoring.
