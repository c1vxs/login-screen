/**
 * Local development server.
 *
 * Mounts the Express auth app and also serves the static frontend
 * (index.html, assets) so you can run the whole thing with `npm run dev`.
 * In production on Vercel the static files and the API function are
 * served separately — this file is not used there.
 */

const path = require('path');
const express = require('express');
const api = require('./api');

const app = express();
const PORT = process.env.PORT || 3001;

// Serve frontend
app.use(express.static(path.join(__dirname)));

// Mount API
app.use(api);

app.listen(PORT, () => {
  console.log(`\n  Lumen running at http://localhost:${PORT}\n`);
  console.log('  Demo credentials:');
  console.log('    Email:    demo@lumen.app');
  console.log('    Password: password123\n');
});
