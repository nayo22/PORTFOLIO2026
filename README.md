# Nayo ✳ — Interactive Media Designer Portfolio

A complete responsive, static website for Nayibe González (Nayo). Real Behance project covers, interactive featured carousel with swipe, all-project filters, autoplay ambient animations, creative playground, dark/light themes, and clickable contact information. The project is **a lightweight static site** (HTML, CSS and JavaScript): no Node or build process required.

## Run locally

From inside this folder:

```bash
python3 -m http.server 8080
```

Open http://localhost:8080/ in a browser. (You can also open `index.html` directly, though serving it locally is best.)

## Publish on Vercel

1. Unzip this package.
2. Go to https://vercel.com/new and import a GitHub repo containing these files, or upload using the Vercel CLI.
3. Select **Other** as the framework preset, **no build command**, and set the output directory to the project root (`.`) when requested.
4. Deploy. Vercel will serve `index.html` and the `assets` directory.

For the Vercel CLI, if installed, run `vercel --prod` inside the project directory and follow the authentication prompts.

## Content and credits

- Photos and five case-study cover images were supplied by Nayibe González. 
- Selected external case studies link directly to the original Behance URLs. Descriptions are editorial summaries based on supplied covers and project titles rather than claims of independently verified results, metrics, or individual project ownership.
- Fonts are loaded through Google Fonts with robust system fallbacks. No licensed font files are redistributed.
- All UI copy is in English; the Spanish title of an actual project is preserved.

## Edit content

- Project descriptions, links and carousel labels: `script.js` at the top, `projects` array.
- Static project cards and bio: `index.html`.
- Palette and visual styles: `styles.css` (`:root` and `:root[data-theme="light"]`).
- Images: `/assets/` (WebP optimized versions of the supplied attachments).

## Features

- Fully responsive navigation and layouts
- Theme switch persisted in localStorage and respects system preference
- Featured Behance carousel: arrow buttons, dots, swipe, keyboard arrows
- All work section with functional category filters
- Non-interaction ambient motion, reduced-motion support
- Color photo reveal over black-and-white portrait
- Small idea-generator game, clickable star Easter egg
- Real email, phone, LinkedIn and Behance links
- Semantics, alt text, accessible navigation and SEO metadata
