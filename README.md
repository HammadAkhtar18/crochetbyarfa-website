# crochetbyarfa website

Static multi-page marketing site for the Instagram crochet brand **@crochetbyarfa**.

Thoughtfully crocheted flowers, gifts and keepsakes — made one stitch at a time. Handmade in Pakistan · Custom orders · Shipping nationwide.

## Preview locally

From this folder (`crochetbyarfa-website`):

### Option A — Python (no install beyond Python 3)

```bash
python3 -m http.server 5173
```

Then open [http://127.0.0.1:5173/](http://127.0.0.1:5173/).

### Option B — npx serve

```bash
npm start
```

### Option C — any static server

Open the folder with Live Server, Caddy, nginx, etc. No build step is required.

## Pages

| File | Purpose |
|------|---------|
| `index.html` | Home — editorial hero, featured collection, philosophy, categories, custom teaser, how ordering works, Instagram gallery placeholders, CTA |
| `shop.html` | Boutique catalogue with filters + product detail modal |
| `about.html` | Brand story and values |
| `custom.html` | Custom order process (01–04) + consultation enquiry form |
| `contact.html` | Instagram CTA + enquiry form |

Shared header and footer are injected by `js/nav.js`. Forms validate client-side, show a confirmation panel, offer **Copy enquiry**, and open the Instagram profile. Shop filters and a lightweight product modal live in `js/shop.js`.

## Product photography

Place real photos in `assets/images/products/` using the filenames listed in that folder’s README (e.g. `rose-bouquet.jpg`). Pages load SVG placeholders first and auto-prefer a JPG when you drop it via `data-photo`.

Instagram gallery slots use `assets/images/instagram/` — do not scrape Instagram.

## Tech

- HTML + CSS + vanilla JavaScript (no framework, no build)
- Typography: Cormorant Garamond + DM Sans (Google Fonts)
- Mobile-first responsive layout
- Brand palette via CSS variables in `css/styles.css`

## Notes

- Prices shown are **starting** prices in PKR; finals depend on size and colours via DM.
- There is no public email address on the site — enquiries go through Instagram.
- en-GB spelling throughout.
