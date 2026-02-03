# Deploying Oyin Foods (static site)

This project is a static, client-side site. Below are quick instructions for local testing and common static hosts.

## Quick local test

From the project root:

```bash
# macOS / Linux
python3 -m http.server 8000
# open http://localhost:8000
```

## GitHub Pages (simple)

1. Initialize a git repo (if not already):

```bash
git init
git add .
git commit -m "Initial site"
```

2. Create a GitHub repository and push:

```bash
git remote add origin git@github.com:YOUR_USERNAME/REPO_NAME.git
git branch -M main
git push -u origin main
```

3. In the repo settings on GitHub, enable **Pages** and set the source to `main` branch (root). GitHub will publish at `https://YOUR_USERNAME.github.io/REPO_NAME/`.

## Netlify (recommended for easy continuous deploy)

- Drag & drop the project folder to the Netlify dashboard (Sites → Add new site → Deploy manually), OR
- Connect the GitHub repo to Netlify and it will auto-deploy on pushes.

For Netlify CLI deploy:

```bash
npm install -g netlify-cli
netlify deploy --prod --dir=.
```

## Vercel
## Vercel

- Repository: https://github.com/Xdev360/oyinfoodsmenu.git

- Quick CLI deploy (recommended):

```bash
# install the Vercel CLI if you don't have it
npm i -g vercel

# login to your Vercel account
vercel login

# (optional) link this local folder to an existing Vercel project or create one
vercel link

# deploy a preview (interactive)
vercel

# deploy directly to production
vercel --prod
```

- Dashboard / Git integration: For continuous deployment, connect the repository above in the Vercel dashboard (https://vercel.com → Projects → Import Project → Git Repository). Vercel will build and publish on each push; the deployment URL is shown in the dashboard and printed by the CLI after each deploy.

- Notes: If you want me to add a `vercel.json` or specific build settings, tell me the framework/build command. For a simple static site the default settings are sufficient.

- Production URL: https://oyinfoodsmenu.vercel.app/

- Quick verification: after `vercel --prod` the CLI prints a live URL; you can also open the production URL in your browser or check the latest deployment in the Vercel dashboard.

## Notes / Tips

- If you need the site updated live, tell me which host you use (GitHub Pages, Netlify, Vercel, FTP, or other) and I can give exact commands or help with the push.
- If you want me to push the repo for you, add me as a collaborator or provide repo access (I cannot accept credentials here; I'll provide the exact commands to run locally).

