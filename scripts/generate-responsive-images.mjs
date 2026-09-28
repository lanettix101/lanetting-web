import { readdirSync, existsSync, mkdirSync, statSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');

const WIDTHS = [640, 1024, 1280, 1440, 1920, 2560, 3072];
const SOURCE_SUFFIX = '-cover';
const SOURCE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.webp', '.avif'];
const IGNORED_EXTENSIONS = ['.gif'];

const args = process.argv.slice(2);
const flags = new Set(args.filter((a) => a.startsWith('--')));
const values = new Map(
  args
    .filter((a) => a.startsWith('--'))
    .map((a) => {
      const [key, ...rest] = a.replace(/^--/, '').split('=');
      return [key, rest.join('=')];
    })
);

const force = flags.has('force');
const only = values.get('only') ?? null;
const quality = Number(values.get('quality') ?? 82);
const dirArg = values.get('dir') ?? path.join('public', 'portfolio');

if (!Number.isInteger(quality) || quality < 1 || quality > 100) {
  console.error(`\n  ERROR: --quality debe ser un entero entre 1 y 100. Recibido: ${values.get('quality')}\n`);
  process.exit(1);
}

const targetDir = path.resolve(repoRoot, dirArg);
const relDir = path.relative(repoRoot, targetDir);

let sharp;
try {
  ({ default: sharp } = await import('sharp'));
} catch {
  console.error('\n  ERROR: falta "sharp". Instálalo con:\n\n    npm i -D sharp\n');
  process.exit(1);
}

if (!existsSync(targetDir)) {
  mkdirSync(targetDir, { recursive: true });
  console.log(`  Directorio creado: ${relDir}/`);
}

const entries = readdirSync(targetDir);

const bases = entries
  .map((name) => {
    const ext = path.extname(name).toLowerCase();
    const stem = name.slice(0, name.length - path.extname(name).length);
    return { name, ext, stem };
  })
  .filter(({ ext, stem }) => SOURCE_EXTENSIONS.includes(ext) && !IGNORED_EXTENSIONS.includes(ext))
  .filter(({ stem }) => stem.endsWith(SOURCE_SUFFIX))
  .map(({ stem }) => stem);

const uniqueBases = [...new Set(bases)];

if (only && !uniqueBases.includes(only)) {
  const available = uniqueBases.length ? uniqueBases.join(', ') : 'ninguno';
  console.error(`\n  ERROR: --only ${only} no coincide con ningun origen *${SOURCE_SUFFIX}.* en ${relDir}/`);
  console.error(`  Disponibles: ${available}\n`);
  process.exit(1);
}

if (uniqueBases.length === 0) {
  console.log(`\n  Sin origenes *${SOURCE_SUFFIX}.* en ${relDir}/ todavia. No hay nada que generar.`);
  console.log(`  Coloca ahi los archivos ${SOURCE_SUFFIX}.webp (o .png/.jpg) y vuelve a correrlo.\n`);
  process.exit(0);
}

const selectedBases = only ? [only] : uniqueBases;

const results = [];

for (const stem of selectedBases) {
  const srcCandidates = SOURCE_EXTENSIONS.map((ext) => path.join(targetDir, `${stem}${ext}`)).filter((p) => existsSync(p));
  if (srcCandidates.length === 0) continue;

  const srcPath = srcCandidates[0];
  const srcExt = path.extname(srcPath).toLowerCase();
  const image = sharp(srcPath, { animated: false });
  const meta = await image.metadata();
  const naturalWidth = meta.width ?? 0;

  if (!naturalWidth) {
    console.error(`\n  ERROR: no se pudo leer el ancho de ${path.basename(srcPath)}\n`);
    process.exit(1);
  }

  const baseName = `${stem}.webp`;
  const basePath = path.join(targetDir, baseName);
  let baseBytes = 0;
  let baseGenerated = false;

  if (srcExt !== '.webp') {
    const buffer = await image.clone().webp({ quality }).toBuffer();
    writeFileSync(basePath, buffer);
    baseBytes = buffer.length;
    baseGenerated = true;
  } else {
    baseBytes = statSync(basePath).size;
  }

  const targets = WIDTHS.filter((w) => w < naturalWidth);
  const written = [];
  const skipped = [];

  for (const width of targets) {
    const outPath = path.join(targetDir, `${stem}_${width}.webp`);
    if (existsSync(outPath) && !force) {
      skipped.push(width);
      continue;
    }
    const buffer = await image.clone().resize({ width, withoutEnlargement: true }).webp({ quality }).toBuffer();
    writeFileSync(outPath, buffer);
    written.push(width);
  }

  results.push({ stem, naturalWidth, naturalHeight: meta.height ?? 0, baseName, baseBytes, baseGenerated, written, skipped });
}

if (results.length === 0) {
  console.log('\n  No se encontraron origenes procesables.\n');
  process.exit(0);
}

const pad = (value, width) => String(value).padEnd(width);
const padL = (value, width) => String(value).padStart(width);

console.log(`\n  Escalera: ${WIDTHS.join(', ')}  |  calidad: ${quality}${force ? '  |  --force' : ''}\n`);
console.log(`  ${pad('origen', 34)} ${padL('natural', 11)}  ${padL('base', 10)}  variantes`);
console.log(`  ${'-'.repeat(34)} ${'-'.repeat(11)}  ${'-'.repeat(10)}  ${'-'.repeat(26)}`);

for (const r of results) {
  const variants = r.written.length
    ? r.written.map((w) => `${w}`).join(', ')
    : r.skipped.length
      ? `${r.skipped.length} ya existentes (--force para regen)`
      : 'ninguna (imagen menor que el ancho mas bajo)';
  console.log(
    `  ${pad(r.stem, 34)} ${padL(`${r.naturalWidth}x${r.naturalHeight}`, 11)}  ${padL(`${(r.baseBytes / 1024).toFixed(1)}kb`, 10)}  ${variants}`,
  );
}

console.log('\n  img / imgWidth para portfolioData.ts:');
for (const r of results) {
  console.log(`    img: 'portfolio/${r.baseName}',  thumbWidth: ${r.naturalWidth},`);
}
console.log('');
