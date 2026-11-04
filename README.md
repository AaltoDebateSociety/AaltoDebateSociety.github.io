# Aalto Debate Society website

A static website (plain HTML, CSS and a little JavaScript) for the Aalto Debate Society. It has no build step and no dependencies, so it can be hosted for free on GitHub Pages.

## Pages
| File | Contents |
|---|---|
| `index.html` | Home: hero, meeting days (Tue & Thu), what we do, BP at a glance, tournaments, join links |
| `bp-rules.html` | Beginner's guide to British Parliamentary debate |
| `gallery.html` | Photo gallery with a lightbox |

## Editing content: `assets/js/config.js`
Most day-to-day changes are made in **one file**:

- **Links:** Telegram channel, Telegram chat, Instagram, and an optional email address. Any link left empty (`""`) is hidden.
- **Meetings:** time and room. If left empty, the site says they're announced on Telegram.
- **Photos:** put image files in `assets/photos/` and add one line per photo:
  ```js
  { src: "assets/photos/worlds-2026.jpg", caption: "Team at WUDC 2026", alt: "Five debaters holding a flag" },
  ```
  Resize photos to about 1600px wide (under ~500 KB) so the page loads quickly.

## Free hosting with GitHub Pages
1. Push this repository to GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, set *Source* to **Deploy from a branch**, then pick branch `main` and folder `/ (root)`.
4. After a minute the site is live at `https://<username>.github.io/<repo-name>/`.

To use a custom domain (e.g. `aaltodebate.fi`), add it under Settings → Pages → Custom domain and follow GitHub's DNS instructions.

Netlify and Cloudflare Pages also work for free: connect the repo and leave the build command empty.

## Previewing locally
```bash
python3 -m http.server 8000
```
Then open http://localhost:8000.

## Brand
- Yellow: Pantone 116 C, `#FFCD00` (RGB 255, 205, 0)
- Black: `#1D1D1B`
- Font: Nimbus Sans, with Helvetica/Arial as fallbacks
- Logo design by Anna Koblova. The SVG logos in `assets/img/` were converted from the original `.ai` files.
