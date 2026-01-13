How to customize the Oyin Foods menu demo

Brand colors
- Edit CSS variables at the top of `styles.css` (:root) — change `--gold`, `--dark`, `--bg`, etc.

Menu items
- Edit `menuData` in `script.js` to add/remove categories and items.
- Each category key maps to an object with `title` and `items` (array).
- Each item: `{ name: 'Jollof Rice', price: '₦1,500', desc: 'Optional description' }`.

Images
- The demo currently uses **image-free** menu cards by default (minimal, text-focused cards with a decorative accent bar).
- To re-enable images for cards, set `item.image` to a URL or local path in `menuData` (e.g., `item.image = 'assets/jollof.jpg'`) and the `getImageUrl(item)` function will be used by the modal and card rendering.
- The project still contains lightweight SVG placeholders (`assets/food-*.svg`) if you choose to use local images.

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