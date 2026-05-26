# Lumen — Login Screen

A polished dark-mode login screen built with **TailwindCSS**, designed as a Figma-to-code style portfolio piece.

## What's in here

- `index.html` — the full login screen, single file, no build step required.
- Built with TailwindCSS (via CDN for zero-config previewing).
- Includes: email/password inputs with icons, password visibility toggle, social auth buttons (GitHub, Google), "remember me" checkbox, loading state on submit, accessible focus rings.

## Preview locally

Just open `index.html` in your browser — no server needed.

```bash
# macOS
open index.html

# Windows
start index.html

# Linux
xdg-open index.html
```

If you want a local server with hot reload:

```bash
npx serve .
```

## Deploy to Vercel (recommended, ~2 minutes)

1. Create a new GitHub repo and push these files to it:

   ```bash
   git init
   git add .
   git commit -m "Initial commit: login screen"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/login-screen.git
   git push -u origin main
   ```

2. Go to [vercel.com/new](https://vercel.com/new), sign in with GitHub, and import the repo.
3. Vercel auto-detects it as a static site. Click **Deploy**. Done — you'll get a `your-project.vercel.app` URL.

## Deploy to Netlify (alternative)

1. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag the folder containing `index.html` into the drop zone.
3. You'll get a live URL instantly. To get a custom subdomain, sign in and rename the site.

## Customize

- **Brand name**: Find `Lumen` in `index.html` and replace it.
- **Brand color**: The accent color is indigo. Swap `indigo-*` and `from-indigo-400 to-indigo-600` with another Tailwind palette (e.g., `emerald`, `rose`, `cyan`).
- **Background grid intensity**: Adjust the `rgba(255,255,255,0.035)` values in the `.bg-grid` style.

## Add to your resume

Once deployed, add a line like one of these to your projects section:

> **Lumen Login** — Designed and built a production-quality dark-mode authentication screen with TailwindCSS. Implemented accessible focus states, password visibility toggle, and loading states. [Live demo](https://your-project.vercel.app) · [Source](https://github.com/YOUR_USERNAME/login-screen)

Or in your skills section, you can now legitimately list:

- **TailwindCSS** — utility-first styling, responsive design, custom theme extension
- **HTML/CSS/JS** — accessible forms, focus management, micro-interactions

## Going further (optional)

If you want to demonstrate even more Tailwind chops, consider:

- Converting this to a real Vite + Tailwind project (build step, proper purging). Tutorial: [tailwindcss.com/docs/installation/using-vite](https://tailwindcss.com/docs/installation/using-vite).
- Adding form validation with error states (red border + helper text).
- Adding a matching dark/light mode toggle.
- Building a second component (e.g., the dashboard that the user lands on after sign-in) and linking them.
