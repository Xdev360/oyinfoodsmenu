# Oyin Foods — Mobile-first Menu

Open `index.html` in your browser to view a mobile-first single-page menu with category cards and an "Order via Chowdeck" integration card.

Quick preview (from project root):

macOS / Linux:
```
open index.html
```

Or run a quick static server (Python 3):
```
python3 -m http.server 8000
# then open http://localhost:8000 in your browser
```

Files:
- index.html — main single-page layout
- styles.css — mobile-first styling and responsive grid
- script.js — subtle interactions and fade-in

Local development (server + admin panel)

1. Install dependencies:

```bash
cd /Users/xbigbrainnx/Desktop/Oyin\ Foods
npm install
```

2. Start server:

```bash
npm run start
# open http://localhost:3000 to view the public site
# admin panel: http://localhost:3000/admin
```

Default admin user is present in `db.json` with email `admin@example.com`.
To set/change the admin password, generate a bcrypt hash and replace `users[0].passwordHash` in `db.json`:

```bash
# generate a hash (replace NEW_PASS)
npx -y -e "node -e \"console.log(require('bcryptjs').hashSync('NEW_PASS',10))\""
```

Copy the printed hash into `db.json` under `users[0].passwordHash`.

Notes:
- The server persists data to `db.json` and stores uploaded images in `uploads/`.
- This is a small file-backed admin system intended for local or simple hosting. For production, use a managed DB and cloud storage.

Vercel / serverless notes

- `vercel.json` is included with a simple configuration, but deploying this Express server to Vercel requires adapting the code to serverless functions. Key points:
	- File uploads are not suitable for Vercel's ephemeral filesystem. Use cloud object storage (S3, Cloudinary, Firebase Storage) and upload images directly to that service from the admin UI or via signed uploads.
	- Move API route handlers into Vercel serverless functions (under `/api`) instead of a single long-running `server.js` process. Each function should export a handler: `module.exports = (req, res) => { ... }`.
	- Persist data to a real database (Postgres, MongoDB, or managed hosted DB) rather than a local `db.json` when using serverless.
	- Keep `vercel.json` rewrites so that `/api/*` routes point to your serverless functions and static files are served from the project root.

If you want, I can:
1. Convert `server.js` into serverless `/api` functions and wire image uploads to a cloud storage provider (Cloudinary or S3).
2. Keep a minimal cloud-agnostic adapter that stores images in S3 and writes metadata to a managed DB.

What I changed for serverless:

- Added `/api/*` serverless handlers that mirror the previous Express API. They read/write `db.json` locally for testing but for production you should use a managed database.
- Added `/api/upload` which uploads images to Cloudinary. Set the `CLOUDINARY_URL` environment variable in Vercel (or local env) to enable uploads.
- Add `JWT_SECRET` env var for auth token signing in production.

Environment variables to set on Vercel:

- `CLOUDINARY_URL` — Cloudinary connection URL (or set `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`, `CLOUDINARY_CLOUD_NAME`).
- `JWT_SECRET` — secret string for signing admin tokens.

Local testing: the serverless endpoints are file-backed and will work locally (they read/write `db.json`). When deploying to Vercel, configure a real DB and cloud storage.

