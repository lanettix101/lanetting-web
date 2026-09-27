import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, extname } from 'node:path';

const DIST = 'dist';

const BANNED_SIGNATURES = [
  ['document.cookie', 'cookie write/read'],
  ['localStorage.', 'localStorage access'],
  ['sessionStorage.', 'sessionStorage access'],
  ['indexedDB', 'IndexedDB access'],
  ['caches.open', 'Cache Storage access'],
  ['navigator.sendBeacon', 'sendBeacon call'],
  ['navigator.geolocation', 'geolocation prompt'],
  ['googletagmanager.com', 'Google Tag Manager'],
  ['google-analytics.com', 'Google Analytics'],
  ['gtag(', 'gtag() analytics call'],
  ['dataLayer', 'GTM dataLayer'],
  ['plausible.io', 'Plausible'],
  ['umami.is', 'Umami'],
  ['matomo', 'Matomo'],
  ['hotjar', 'Hotjar'],
  ['clarity.ms', 'Microsoft Clarity'],
  ['logrocket', 'LogRocket'],
  ['mixpanel', 'Mixpanel'],
  ['amplitude.io', 'Amplitude'],
  ['posthog', 'PostHog'],
  ['fullstory', 'FullStory'],
  ['heap.io', 'Heap'],
  ['connect.facebook.net', 'Meta Pixel'],
  ['fbevents.js', 'Meta Pixel'],
  ['unsplash.com', 'Unsplash image'],
  ['youtube-nocookie.com', 'YouTube embed'],
  ['googlevideo.com', 'YouTube player'],
  ['fonts.googleapis.com', 'Google Fonts'],
  ['fonts.gstatic.com', 'Google Fonts'],
  ['use.typekit.net', 'Adobe Fonts'],

  ['sentry.io', 'Sentry'],
];
const SUBRESOURCE_TAGS =
  /<(script|img|iframe|embed|object|source|audio|video|track)\b[^>]*\b(?:src|data)="([^"]*)"/gi;
const LINK_TAGS = /<link\b[^>]*>/gi;
const EXTERNAL_CSS = /(?:@import\s+url\(|url\(\s*['"]?)https?:\/\//gi;

const SITE_ORIGIN = 'https://lanettix101.github.io';

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

const failures = [];

function checkSignatures() {
  const files = walk(DIST).filter(
    (f) => ['.js', '.mjs', '.css', '.html'].includes(extname(f))
  );

  for (const file of files) {
    const src = readFileSync(file, 'utf8');
    for (const [needle, label] of BANNED_SIGNATURES) {
      if (src.includes(needle)) {
        const idx = src.indexOf(needle);
        const line = src.slice(0, idx).split('\n').length;
        failures.push(`tracker/storage signature "${label}" (${needle}) in ${file}:${line}`);
      }
    }
  }
  return files.length;
}

function checkIndexHtml() {
  const indexPath = join(DIST, 'index.html');
  if (!existsSync(indexPath)) {
    failures.push('dist/index.html is missing — run `npm run build` first.');
    return;
  }
  const html = readFileSync(indexPath, 'utf8');

  const inspect = (url) => {
    if (!url || /^(data:|blob:|#|\/|\.{1,2}\/)/i.test(url)) return;
    if (/^https?:\/\//i.test(url) && !url.startsWith(SITE_ORIGIN)) {
      failures.push(`non-same-origin subresource in index.html: ${url}`);
    }
  };

  for (const [, tag, url] of html.matchAll(SUBRESOURCE_TAGS)) inspect(url);

  for (const [tag] of html.matchAll(LINK_TAGS)) {
    const rel = tag.match(/\brel="([^"]*)"/i)?.[1]?.toLowerCase() ?? '';
    if (['canonical', 'alternate', 'author', 'license', 'icon', 'apple-touch-icon', 'manifest'].includes(rel)) continue;
    const href = tag.match(/\bhref="([^"]*)"/i)?.[1];
    if (href) inspect(href);
  }
}

function main() {
  if (!existsSync(DIST)) {
    console.error('\n  dist/ not found. Run `npm run build` first.\n');
    process.exit(1);
  }

  console.log('Verifying that the privacy policy claims still hold...\n');

  const scanned = checkSignatures();
  checkIndexHtml();

  console.log(`  Scanned ${scanned} built file(s) for trackers and client-side storage.`);
  console.log('  Audited dist/index.html for non-same-origin subresources.');

  if (failures.length) {
    console.error(`\n  PRIVACY CHECK FAILED — ${failures.length} problem(s):\n`);
    for (const f of failures) console.error(`    - ${f}`);
    console.error(
      '\n  If you added one of these on purpose, update src/content/legal.ts and the' +
        '\n  affected section of the privacy policy, bump its effectiveDate, and relax the' +
        '\n  matching signature in scripts/verify-no-trackers.mjs.\n'
    );
    process.exit(1);
  }

  console.log('\n  PASS — no trackers, no client-side storage, no third-party subresources.\n');
}

main();
