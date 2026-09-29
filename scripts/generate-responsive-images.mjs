import { readdirSync, existsSync, mkdirSync, statSync, writeFileSync, openSync, readSync, closeSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');

const WIDTHS = [640, 1024, 1280, 1440, 1920, 2560, 3072];
const SOURCE_SUFFIX = '-cover';
const SOURCE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.webp', '.avif'];
const IGNORED_EXTENSIONS = ['.gif'];

const MOBILE_WIDTHS = [480, 640, 828, 1080, 1280];
const MOBILE_SUFFIX = `${SOURCE_SUFFIX}_mobile`;

const args = process.argv.slice(2);
const flags = new Set(args.filter((a) => a.startsWith('--')).map((a) => a.replace(/^--/, '')));
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
const mobileOnly = flags.has('mobile-only');
const skipMobile = flags.has('skip-mobile');
const mobileQuality = Number(values.get('mobile-quality') ?? 76);
const dirArg = values.get('dir') ?? path.join('public', 'portfolio');

if (!Number.isInteger(quality) || quality < 1 || quality > 100) {
  console.error(`\n  ERROR: --quality debe ser un entero entre 1 y 100. Recibido: ${values.get('quality')}\n`);
  process.exit(1);
}

if (!Number.isInteger(mobileQuality) || mobileQuality < 1 || mobileQuality > 100) {
  console.error(`\n  ERROR: --mobile-quality debe ser un entero entre 1 y 100. Recibido: ${values.get('mobile-quality')}\n`);
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

const stems = entries
  .map((name) => {
    const ext = path.extname(name).toLowerCase();
    const stem = name.slice(0, name.length - path.extname(name).length);
    return { name, ext, stem };
  })
  .filter(({ ext, stem }) => SOURCE_EXTENSIONS.includes(ext) && !IGNORED_EXTENSIONS.includes(ext))
  .map(({ stem }) => stem);

const uniqueStems = [...new Set(stems)];

const desktopBases = uniqueStems.filter((s) => s.endsWith(SOURCE_SUFFIX));
const mobileBases = uniqueStems.filter((s) => s.endsWith(MOBILE_SUFFIX));

const matchesOnly = (stem) => stem === only || stem === `${only}${SOURCE_SUFFIX}` || stem === `${only}${MOBILE_SUFFIX}`;

const selectedDesktop = mobileOnly ? [] : only ? desktopBases.filter(matchesOnly) : desktopBases;
const selectedMobile = skipMobile ? [] : only ? mobileBases.filter(matchesOnly) : mobileBases;

if (only && selectedDesktop.length === 0 && selectedMobile.length === 0) {
  const available = [...desktopBases, ...mobileBases].join(', ') || 'ninguno';
  console.error(`\n  ERROR: --only ${only} no coincide con ningun origen *${SOURCE_SUFFIX}.* ni *${MOBILE_SUFFIX}.* en ${relDir}/`);
  console.error(`  Disponibles: ${available}\n`);
  process.exit(1);
}

if (desktopBases.length === 0 && mobileBases.length === 0) {
  console.log(`\n  Sin origenes en ${relDir}/ todavia. No hay nada que generar.`);
  console.log(`  Coloca ahi los archivos ${SOURCE_SUFFIX}.webp (o .png/.jpg) y vuelve a correrlo.\n`);
  process.exit(0);
}

if (selectedDesktop.length === 0 && selectedMobile.length === 0) {
  console.log(`\n  Los flags dejaron la seleccion vacia. No hay nada que generar.\n`);
  process.exit(0);
}

const isLosslessWebp = (filePath) => {
  const fd = openSync(filePath, 'r');
  try {
    const header = Buffer.alloc(16);
    readSync(fd, header, 0, 16, 0);
    return header.subarray(12, 16).toString('latin1') === 'VP8L';
  } finally {
    closeSync(fd);
  }
};

const results = [];
const mobileResults = [];

const processBase = async (stem, widths, quality, { rewriteLossless, effort }) => {
  const srcCandidates = SOURCE_EXTENSIONS.map((ext) => path.join(targetDir, `${stem}${ext}`)).filter((p) => existsSync(p));
  if (srcCandidates.length === 0) return null;

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

  // El base es el master: solo se reescribe al convertir un origen con perdida (VP8L) a
  // WebP con perdida. Nunca se re-codifica desde si mismo, porque cada corrida --force
  // acumularia una generacion mas de compresion. Para cambiarle la calidad hay que
  // reemplazar el master en su lugar.
  const mustRewriteBase = srcExt !== '.webp' || (rewriteLossless && isLosslessWebp(basePath));

  if (mustRewriteBase) {
    const buffer = await image.clone().webp(effort ? { quality, effort } : { quality }).toBuffer();
    writeFileSync(basePath, buffer);
    baseBytes = buffer.length;
    baseGenerated = true;
  } else {
    baseBytes = statSync(basePath).size;
  }

  const targets = widths.filter((w) => w < naturalWidth);
  const written = [];
  const skipped = [];

  for (const width of targets) {
    const outPath = path.join(targetDir, `${stem}_${width}.webp`);
    if (existsSync(outPath) && !force) {
      skipped.push(width);
      continue;
    }
    const buffer = await image
      .clone()
      .resize({ width, withoutEnlargement: true })
      .webp(effort ? { quality, effort } : { quality })
      .toBuffer();
    writeFileSync(outPath, buffer);
    written.push(width);
  }

  return { stem, naturalWidth, naturalHeight: meta.height ?? 0, baseName, baseBytes, baseGenerated, written, skipped };
};

for (const stem of selectedDesktop) {
  const result = await processBase(stem, WIDTHS, quality, { rewriteLossless: false, effort: 0 });
  if (result) results.push(result);
}

for (const stem of selectedMobile) {
  const result = await processBase(stem, MOBILE_WIDTHS, mobileQuality, { rewriteLossless: true, effort: 6 });
  if (result) mobileResults.push(result);
}

if (results.length === 0 && mobileResults.length === 0) {
  console.log('\n  No se encontraron origenes procesables.\n');
  process.exit(0);
}

const pad = (value, width) => String(value).padEnd(width);
const padL = (value, width) => String(value).padStart(width);

const printTable = (label, rows) => {
  if (rows.length === 0) return;
  console.log(`\n  ${label}\n`);
  console.log(`  ${pad('origen', 36)} ${padL('natural', 11)}  ${padL('base', 10)}  variantes`);
  console.log(`  ${'-'.repeat(36)} ${'-'.repeat(11)}  ${'-'.repeat(10)}  ${'-'.repeat(26)}`);

  for (const r of rows) {
    const variants = r.written.length
      ? r.written.map((w) => `${w}`).join(', ')
      : r.skipped.length
        ? `${r.skipped.length} ya existentes (--force para regen)`
        : 'ninguna (imagen menor que el ancho mas bajo)';
    const base = r.baseGenerated ? `${(r.baseBytes / 1024).toFixed(1)}kb (regen)` : `${(r.baseBytes / 1024).toFixed(1)}kb`;
    console.log(`  ${pad(r.stem, 36)} ${padL(`${r.naturalWidth}x${r.naturalHeight}`, 11)}  ${padL(base, 10)}  ${variants}`);
  }
};

printTable(`Escalera escritorio: ${WIDTHS.join(', ')}  |  calidad: ${quality}${force ? '  |  --force' : ''}`, results);
printTable(
  `Escalera movil: ${MOBILE_WIDTHS.join(', ')}  |  calidad: ${mobileQuality}${force ? '  |  --force' : ''}`,
  mobileResults,
);

if (results.length > 0) {
  console.log('\n  img / imgWidth para portfolioData.ts:');
  for (const r of results) {
    console.log(`    img: 'portfolio/${r.baseName}',  thumbWidth: ${r.naturalWidth},`);
  }
}

if (mobileResults.length > 0) {
  console.log('\n  imgMobile / imgMobileWidth para portfolioData.ts:');
  for (const r of mobileResults) {
    console.log(`    imgMobile: 'portfolio/${r.baseName}',  imgMobileWidth: ${r.naturalWidth},`);
  }
}
console.log('');
