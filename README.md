# Stack Safety Landing Page

Minimal, responsive static landing page for **Stack Safety** — a personalized changelog for the software your product depends on.

## Files

- `index.html` — landing page content and structure
- `styles.css` — complete responsive visual system
- `app.js` — mobile navigation, reveal animation, interactive stack picker and FAQ behavior
- `favicon.svg` — Stack Safety stack mark

## Run locally

No build step is required.

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

You can also use any static file server, for example:

```bash
npx serve .
```

## Deploy

Because the site is static, it can be deployed directly to:

- GitHub Pages
- Render Static Site
- Netlify
- Vercel
- Cloudflare Pages

Use the repository root as the publish directory. There is no build command.

## Current landing-page boundary

The page intentionally does **not** pretend to collect email addresses yet. The primary CTA points to the public GitHub repository while the founding-pilot signup/delivery backend is still being designed.

The product examples shown on the page are explicitly labeled illustrative. They demonstrate the intended Decision Card and personalized digest experience without presenting sample alerts as live production data.
