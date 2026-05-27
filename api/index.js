/**
 * Lumen Auth API
 *
 * A minimal Express authentication backend.
 * Two endpoints:
 *   POST /api/auth/login  — validates credentials, returns a JWT
 *   GET  /api/auth/me     — returns the current user given a Bearer token
 *
 * Designed to run both locally (via server.js) and on Vercel
 * (the exported Express app becomes a serverless function — see vercel.json).
 */

const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
app.use(express.json({ limit: '10kb' }));

// --- Config ---------------------------------------------------------------

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-replace-in-production';
const JWT_EXPIRES_IN = '7d';

// In a real app this would be a database. For the demo we hard-code one user.
// Password is "password123" — try logging in with demo@lumen.app / password123.
const USERS = [
  {
    id: '1',
    email: 'demo@lumen.app',
    name: 'Demo User',
    passwordHash: '$2b$10$4jJUJLczCs8IQXePmR9oW.IcoItQyRtA4umpoAC5dlIcKIPyEmInS',
  },
];

// A throwaway hash used as a decoy when the email isn't found, so that
// failed-lookup and failed-password responses take the same amount of time.
// This avoids leaking which emails are registered via timing.
const DECOY_HASH = '$2b$10$DECOYDECOYDECOYDECOYDECOYDECOYDECOYDECOYDECOYDECOYDEC';

// --- Helpers --------------------------------------------------------------

function getBearerToken(req) {
  const auth = req.headers.authorization || '';
  return auth.startsWith('Bearer ') ? auth.slice(7) : null;
}

function isValidEmail(email) {
  return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// --- Routes ---------------------------------------------------------------

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body || {};

  // Input validation
  if (!isValidEmail(email) || typeof password !== 'string' || password.length < 1) {
    return res.status(400).json({ error: 'Please enter a valid email and password.' });
  }

  // Constant-time-ish lookup
  const user = USERS.find((u) => u.email === email.toLowerCase());
  const hash = user ? user.passwordHash : DECOY_HASH;
  const passwordOk = await bcrypt.compare(password, hash);

  if (!user || !passwordOk) {
    return res.status(401).json({ error: 'Invalid email or password.' });
  }

  const token = jwt.sign(
    { sub: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );

  return res.json({
    token,
    user: { id: user.id, email: user.email, name: user.name },
  });
});

app.get('/api/auth/me', (req, res) => {
  const token = getBearerToken(req);
  if (!token) {
    return res.status(401).json({ error: 'Missing authorization token.' });
  }

  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token.' });
  }

  const user = USERS.find((u) => u.id === payload.sub);
  if (!user) {
    return res.status(401).json({ error: 'User no longer exists.' });
  }

  return res.json({
    user: { id: user.id, email: user.email, name: user.name },
  });
});

app.get('/api/health', (_req, res) => res.json({ ok: true }));

// JSON 404 for unknown /api routes
app.use('/api', (_req, res) => res.status(404).json({ error: 'Not found.' }));

// Centralised JSON error handler (so we never leak HTML stack traces)
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error.' });
});

module.exports = app;
