/**
 * copy-to-root.js
 * ------------------------------------------------------------------
 * GitHub Pages for a user site (codewithrafiq.github.io) serves the
 * site from the ROOT of the deployed branch. Our React source lives in
 * /app, so after `react-scripts build` produces /app/build, this script
 * copies the build output up to the repository root so that index.html
 * sits at the root where GitHub Pages looks for it.
 *
 * It only removes the known generated artifacts at the root before
 * copying, so /app, /contex, /.git, etc. are never touched.
 */
const fs = require('fs');
const path = require('path');

const appDir = path.resolve(__dirname, '..');        // .../app
const buildDir = path.join(appDir, 'build');          // .../app/build
const rootDir = path.resolve(appDir, '..');           // repo root

if (!fs.existsSync(buildDir)) {
  console.error('✖ No build/ folder found. Run "npm run build:app" first.');
  process.exit(1);
}

// Generated artifacts we own at the root and may safely replace.
const MANAGED = [
  'index.html',
  'asset-manifest.json',
  'manifest.json',
  'robots.txt',
  'favicon.ico',
  'profile.jpeg',
  'logo192.png',
  'logo512.png',
  'static',
  '.nojekyll',
];

console.log('• Cleaning previous build artifacts at root…');
for (const entry of MANAGED) {
  const target = path.join(rootDir, entry);
  if (fs.existsSync(target)) {
    fs.rmSync(target, { recursive: true, force: true });
  }
}

console.log('• Copying app/build → repository root…');
// Copy each top-level entry individually. Copying the whole build dir into its
// ancestor (the repo root) in one fs.cpSync call trips a Node overlap guard, so
// we copy per-entry into distinct destination paths instead.
for (const entry of fs.readdirSync(buildDir)) {
  fs.cpSync(path.join(buildDir, entry), path.join(rootDir, entry), { recursive: true });
}

// GitHub Pages: disable Jekyll so files/folders starting with "_" are served.
fs.writeFileSync(path.join(rootDir, '.nojekyll'), '');

console.log('✓ Build copied to root. GitHub Pages will serve index.html from the root.');
