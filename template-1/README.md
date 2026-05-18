# Couples Wedding Template — Avery & Sam

Modular, static wedding website for a couple. Designed to be a starting template — keep only the sections you want, drop the rest. Deploys cleanly to GitHub Pages.

## Modular sections

Each page is intentionally section-based so you can hide or remove what isn't relevant to your day. Pages and the in-page sections you can drop:

| Page            | Drop-in sections you can keep or remove                       |
| --------------- | ------------------------------------------------------------ |
| `index.html`    | Countdown, story, quick facts, hero CTA                       |
| `details.html`  | Schedule timeline, venue card, travel & stay, dress code      |
| `rsvp.html`     | Meal selector, plus-one toggle, shuttle, song request, note   |
| `registry.html` | Each registry card is independent — delete any you don't need |
| `gallery.html`  | Replace `<div class="gallery-item">` placeholders with real `<img>` |
| `faqs.html`     | Each `<details class="faq">` block is removable               |

Any section marked with a `<!-- module -->` comment can be safely deleted without breaking the rest of the page.

## Customizing in 3 minutes

1. **Names + date** — search/replace `Avery`, `Sam`, and `A & S` across the HTML files.
2. **Wedding date** — set `WEDDING_DATE` at the top of `assets/js/main.js` (ISO format). This powers the countdown.
3. **Colors** — edit the `:root { --color-* }` block at the top of `assets/css/styles.css`. The default palette is ivory + sage; try:
   - Champagne + black: `--color-accent: #c2a875; --color-accent-dark: #8a7448`
   - Dusty rose: `--color-accent: #c08573; --color-accent-dark: #8e5947`
   - Deep teal: `--color-accent: #436b6b; --color-accent-dark: #2d4949`
4. **Fonts** — swap the Google Fonts link and the two CSS custom properties `--font-display` and `--font-body`.
5. **Photos** — drop images into `assets/img/`. In the hero replace the `<div class="hero-image">` with `<img>`; in the gallery replace each placeholder tile.

## Wiring up the RSVP

The form posts JSON to whatever endpoint you set as `ENDPOINT_URL` in `assets/js/main.js`.

Common free options:
- **Formspree** — paste the form endpoint as `ENDPOINT_URL`.
- **Google Apps Script** — deploy a doPost webhook that appends to a Google Sheet.
- **Netlify Forms** — if hosting on Netlify, add `netlify` and `data-netlify="true"` attributes to the `<form>` instead.
- **Your own API** — anything that accepts JSON and replies 200 OK.

If you leave `ENDPOINT_URL` empty, the form logs the submission to the console and shows a "captured locally" message — perfect for previewing.

## Deploy to GitHub Pages

```bash
git init
git add .
git commit -m "Our wedding site"
gh repo create averyandsam --public --source=. --push
# enable Pages from the main branch in repo settings
```

## A note on indexing

The template ships with `<meta name="robots" content="noindex, nofollow">` because most couples prefer their wedding site stays off search engines. Remove that meta tag if you want it indexed.
