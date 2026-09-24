# crochetbyarfa website

Static multi-page marketing site for the Instagram crochet brand **@crochetbyarfa**.

Handmade crochet, made with care · Custom orders welcome · Shipping across Pakistan.

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

Or:

```bash
npx --yes serve . -p 5173
```

### Option C — any static server

Open the folder with Live Server, Caddy, nginx, etc. No build step is required.

## Pages

| File | Purpose |
|------|---------|
| `index.html` | Home — hero, featured products, why handmade, how to order, example reviews, Instagram CTA |
| `shop.html` | Product grid with category filters |
| `about.html` | Brand story, shipping, custom welcome |
| `custom.html` | Custom order process + enquiry form |
| `contact.html` | Instagram DM + enquiry form |

Shared header and footer are injected by `js/nav.js`. Forms validate client-side, show a confirmation panel, offer **Copy enquiry**, and open the Instagram profile.

## Tech

- HTML + CSS + vanilla JavaScript (no framework, no build)
- Mobile-first responsive layout
- SVG illustrations as product placeholders (no scraped Instagram images)
- Brand colours via CSS variables in `css/styles.css`

## Notes

- Prices shown are **starting** prices in PKR; finals depend on size and colours via DM.
- There is no public email address on the site — enquiries go through Instagram.
- Example reviews on the home page are clearly labelled placeholders.
