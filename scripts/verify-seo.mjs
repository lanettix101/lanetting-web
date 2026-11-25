import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const ROOT = resolve(process.cwd(), 'dist');
const INDEX_HTML = resolve(ROOT, 'index.html');
const SITEMAP_XML = resolve(process.cwd(), 'public', 'sitemap.xml');

let failed = false;

function fail(msg) {
  console.error(`[verify-seo] FAIL: ${msg}`);
  failed = true;
}

function pass(msg) {
  console.log(`[verify-seo] ok: ${msg}`);
}

const indexHtml = readFileSync(INDEX_HTML, 'utf8');

const titleMatch = indexHtml.match(/<title>([\s\S]*?)<\/title>/);
if (!titleMatch || !titleMatch[1].trim()) {
  fail('index.html lacks a <title>');
} else {
  pass(`index.html title: ${titleMatch[1].trim()}`);
}

const descMatch = indexHtml.match(/<meta name="description"\s+content="([\s\S]*?)"/);
if (!descMatch || !descMatch[1].trim()) {
  fail('index.html lacks meta description');
} else {
  pass('index.html has meta description');
}

const canonicalMatch = indexHtml.match(/<link rel="canonical" href="([\s\S]*?)"/);
if (!canonicalMatch || canonicalMatch[1] !== 'https://lanettix101.github.io/lanetting-web/') {
  fail('index.html canonical is missing or points to the wrong URL');
} else {
  pass('index.html canonical is correct');
}

if (!indexHtml.includes('og:title')) fail('index.html lacks og:title');
else pass('index.html has og:title');
if (!indexHtml.includes('og:description')) fail('index.html lacks og:description');
else pass('index.html has og:description');

const ldMatch = indexHtml.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
if (!ldMatch) {
  fail('index.html lacks JSON-LD block');
} else {
  try {
    JSON.parse(ldMatch[1]);
    pass('index.html JSON-LD is valid');
  } catch (err) {
    fail(`index.html JSON-LD is invalid: ${err.message}`);
  }
}

const sitemap = readFileSync(SITEMAP_XML, 'utf8');
const urls = [...sitemap.matchAll(/<loc>([\s\S]*?)<\/loc>/g)].map((m) => m[1].trim());
const seen = new Set();
for (const url of urls) {
  if (seen.has(url)) {
    fail(`sitemap.xml has duplicate URL: ${url}`);
  } else {
    seen.add(url);
  }
}
if (seen.size === urls.length) {
  pass(`sitemap.xml has ${urls.length} unique URLs`);
}

const expected = [
  'https://lanettix101.github.io/lanetting-web/',
  'https://lanettix101.github.io/lanetting-web/portfolio',
  'https://lanettix101.github.io/lanetting-web/privacy',
  'https://lanettix101.github.io/lanetting-web/terms',
];
for (const exp of expected) {
  if (!seen.has(exp)) fail(`sitemap.xml is missing expected route: ${exp}`);
  else pass(`sitemap.xml includes ${exp}`);
}

if (failed) {
  console.error('[verify-seo] SEO verification failed');
  process.exit(1);
} else {
  console.log('[verify-seo] SEO verification passed');
  process.exit(0);
}
