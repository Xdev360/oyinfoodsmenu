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

- Install `vercel` CLI: `npm i -g vercel`, then run `vercel` in the project root and follow prompts.

## Notes / Tips

- If you need the site updated live, tell me which host you use (GitHub Pages, Netlify, Vercel, FTP, or other) and I can give exact commands or help with the push.
- If you want me to push the repo for you, add me as a collaborator or provide repo access (I cannot accept credentials here; I'll provide the exact commands to run locally).

