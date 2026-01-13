How to customize the Oyin Foods menu demo

Brand colors
- Edit CSS variables at the top of `styles.css` (:root) — change `--gold`, `--dark`, `--bg`, etc.

Menu items
- Edit `menuData` in `script.js` to add/remove categories and items.
- Each category key maps to an object with `title` and `items` (array).
- Each item: `{ name: 'Jollof Rice', price: '₦1,500', desc: 'Optional description' }`.

Images
- By default the demo now uses **real food images** fetched from Unsplash (via search queries) using `getImageUrl(item)`; this provides realistic photos for each item.
- If you prefer local assets or specific photos, set `item.image` to a local path (e.g., `assets/jollof.jpg`) and the code will use that image instead.
- The project still contains lightweight SVG placeholders (`assets/food-*.svg`) used as fallbacks when an image isn't available or network access is restricted.

Serving locally
- Open `index.html` directly in browser, or run a static server:

  `python3 -m http.server 8000`
  then open `http://localhost:8000`.

Accessibility & behavior
- Category pills are focusable buttons (16px) and support keyboard left/right navigation.
- Clicking a category filters menu cards without navigation; cards open a detail modal on click.

If you'd like me to:
- Replace placeholders with local images and add an `assets/` folder
- Add an optional search bar or sort-by-price feature
- Convert to a small production-ready static bundle

Tell me which follow-up you'd prefer and I'll implement it.