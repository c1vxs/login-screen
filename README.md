# Lumen Auth

A small full-stack authentication demo: a polished dark-mode login screen wired to a Node.js / Express REST API. Built as a portfolio piece to demonstrate Figma-to-code translation, TailwindCSS, and backend JS.

**Live demo:** _add your Vercel URL here once deployed_
**Source:** _add your GitHub URL here once pushed_

## Demo credentials

```
Email:    demo@lumen.app
Password: password123
```

## Stack

- **Frontend** — single-file HTML with TailwindCSS (via CDN). Accessible form, password visibility toggle, inline error messaging, loading state, post-login "signed in" view, session-restore on reload.
- **Backend** — Node.js + Express. Two endpoints: `POST /api/auth/login` and `GET /api/auth/me`. Passwords hashed with bcrypt. Sessions issued as JWTs.
- **Hosting** — deployable as a single Vercel project: the static `index.html` is served from the edge, the Express app runs as a serverless function.

## Project layout

```
login-screen/
├── index.html        # frontend (Tailwind via CDN, no build step)
├── server.js         # local dev server: serves frontend + mounts API
├── api/
│   └── index.js      # Express auth API (also the Vercel serverless entry)
├── package.json
├── vercel.json       # routes /api/* → /api on Vercel
├── .gitignore
└── README.md
```

## Run locally

```bash
npm install
npm run dev
```

Then open <http://localhost:3001>.

## API

### POST /api/auth/login

Request:

```json
{ "email": "demo@lumen.app", "password": "password123" }
```

Success (200):

```json
{
  "token": "<jwt>",
  "user": { "id": "1", "email": "demo@lumen.app", "name": "Demo User" }
}
```

Errors: `400` (missing/invalid input) · `401` (bad credentials).

### GET /api/auth/me

Requires `Authorization: Bearer <jwt>`.

Success (200):

```json
{ "user": { "id": "1", "email": "demo@lumen.app", "name": "Demo User" } }
```

Errors: `401` (missing/invalid/expired token).

## Security notes (what's real vs. what's demo-only)

- Passwords are stored as bcrypt hashes (cost factor 10).
- JWTs are signed with HS256 and expire in 7 days.
- Login responds with the same generic message and roughly the same timing whether the email is unknown or the password is wrong, to avoid user-enumeration via timing or response shape.
- The "database" is a hard-coded user array — fine for a portfolio demo; swap in Postgres / Prisma / Supabase for anything real.
- `JWT_SECRET` defaults to a placeholder so the demo runs out of the box. **Set a real secret via the `JWT_SECRET` env var in production / on Vercel.**

## Deploy to Vercel

1. Push to GitHub (any name; this folder is the repo root).
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Under **Environment Variables**, add `JWT_SECRET` (any long random string — `openssl rand -hex 32` gives you a good one).
4. Click **Deploy**. The static frontend is served from `/`, and `/api/*` routes hit the Express function automatically.

## Add to your CV / resume

> **Lumen Auth** — Personal project
> Full-stack authentication demo. Dark-mode login screen built with TailwindCSS; Node.js + Express REST API with bcrypt password hashing and JWT-based sessions; deployed as Vercel serverless functions.
> **Tech:** Node.js, Express, JWT, bcrypt, TailwindCSS, JavaScript, Vercel
> [Live demo](https://...) · [Source](https://github.com/...)

## Going further

- Add a sign-up endpoint (`POST /api/auth/register`) with email-uniqueness checks.
- Swap the in-memory user store for SQLite (better-sqlite3) or Postgres on Neon / Supabase.
- Add rate limiting on `/api/auth/login` (e.g. express-rate-limit) to defend against credential stuffing.
- Move the JWT into an `HttpOnly` cookie instead of `sessionStorage` (more secure, more code).
- Add Cypress / Playwright tests for the login flow.
