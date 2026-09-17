import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');
const publicDir = path.join(repoRoot, 'public');
const sourceSvg = readFileSync(path.join(repoRoot, 'assets', 'hero-terminal-stack.svg'), 'utf8');

const FONT = "'Ubuntu Mono','JetBrains Mono',Menlo,Consolas,monospace";
const TOTAL_DUR = 44;
const VB_W = 1200;
const VB_H = 540;

const THEME_COLORS = {
  light: {
    winBg: '#FFFFFF',
    winBorder: '#E5E7EB',
    titleBg: '#F8F1F1',
    titleText: '#4A2327',
    promptUser: '#4A2327',
    cmd: '#111827',
    out: '#374151',
    ok: '#16a34a',
    warn: '#b45309',
    info: '#0891b2',
    arrow: '#7c3aed',
  },
  dark: {
    winBg: '#111827',
    winBorder: '#374151',
    titleBg: '#1f2937',
    titleText: '#9aa4b2',
    promptUser: '#4ADE80',
    cmd: '#e8eefb',
    out: '#c5d1e2',
    ok: '#4ADE80',
    warn: '#FBBF24',
    info: '#22D3EE',
    arrow: '#A78BFA',
  },
  retro: {
    winBg: '#0A0A0A',
    winBorder: '#00FF41',
    titleBg: '#0A0A0A',
    titleText: '#00FF41',
    promptUser: '#00FF41',
    cmd: '#00FF41',
    out: '#00FF41',
    ok: '#00FF41',
    warn: '#00FF41',
    info: '#00FF41',
    arrow: '#00FF41',
  },
};

const THEME_CONSOLE = {
  light: { rx: 14, icons: true, iconCircleFill: '#FFFFFF', iconCircleStroke: '#E5E7EB', iconFillOverride: { '#e6edf3': '#24292E' } },
  dark: { rx: 14, icons: true, iconCircleFill: '#111827', iconCircleStroke: '#374151', iconFillOverride: {} },
  retro: { rx: 0, icons: false, iconCircleFill: '', iconCircleStroke: '', iconFillOverride: {} },
};

const SCENES = [
  { start: 0.025, end: 0.125 },
  { start: 0.145, end: 0.28 },
  { start: 0.3, end: 0.588 },
  { start: 0.608, end: 0.73 },
  { start: 0.75, end: 0.95 },
];

const CONTENT = {
  en: [
    [{ k: 'p', t: 'sudo su' }, { k: 'ok', t: ' shell escalated · root access granted' }],
    [
      { k: 'p', t: './Professional_Journey.sh' },
      { k: 'ok', t: ' 2017 bank security → 2021 global infra' },
      { k: 'warn', t: ' 2023 UX+SEO · 2025 AI workflows' },
      { k: 'info', t: ' 2026 · senior sysadmin · automation & AI' },
    ],
    [
      { k: 'p', t: 'sudo get_services' },
      { k: 'warn', t: ' wordpress-speed-optimization · 2–4 days' },
      { k: 'warn', t: ' web-scraping-automation-bots · 3–7 days' },
      { k: 'warn', t: ' technical-seo-gsc-audits · 3–5 days' },
      { k: 'warn', t: ' linux-vps-support-migration · 1–3 days' },
      { k: 'warn', t: ' ai-pipelines-telegram-gemini-wp · 4–8 days' },
      { k: 'warn', t: ' wordpress-security-malware-removal · 24–48 h' },
    ],
    [
      { k: 'p', t: 'display --profiles' },
      { k: 'arrow', t: ' legit · contra · upwork' },
      { k: 'ok', t: ' verified freelance profiles' },
    ],
    [
      { k: 'p', t: 'connect --init' },
      { k: 'arrow', t: ' email · whatsapp · telegram · calendly' },
      { k: 'ok', t: ' connection established · let\u2019s build something great' },
    ],
  ],
  es: [
    [{ k: 'p', t: 'sudo su' }, { k: 'ok', t: ' shell elevada · acceso root concedido' }],
    [
      { k: 'p', t: './Professional_Journey.sh' },
      { k: 'ok', t: ' 2017 seguridad bancaria → 2021 infra global' },
      { k: 'warn', t: ' 2023 UX+SEO · 2025 flujos de IA' },
      { k: 'info', t: ' 2026 · sysadmin senior · automatización e IA' },
    ],
    [
      { k: 'p', t: 'sudo get_services' },
      { k: 'warn', t: ' optimización-velocidad-wordpress · 2–4 días' },
      { k: 'warn', t: ' scraping-web-y-bots-automatización · 3–7 días' },
      { k: 'warn', t: ' auditorías-seo-técnico-gsc · 3–5 días' },
      { k: 'warn', t: ' soporte-vps-linux-y-migración · 1–3 días' },
      { k: 'warn', t: ' pipelines-ia-telegram-gemini-wp · 4–8 días' },
      { k: 'warn', t: ' seguridad-wordpress-limpieza-malware · 24–48 h' },
    ],
    [
      { k: 'p', t: 'display --profiles' },
      { k: 'arrow', t: ' legit · contra · upwork' },
      { k: 'ok', t: ' perfiles freelance verificados' },
    ],
    [
      { k: 'p', t: 'connect --init' },
      { k: 'arrow', t: ' email · whatsapp · telegram · calendly' },
      { k: 'ok', t: ' conexión establecida · construyamos algo increíble' },
    ],
  ],
};

const PREFIXES = {
  ok: '✓',
  warn: '+',
  info: 'i',
  arrow: '→',
};

const SLOTS = [
  { x: 40, y: 90 }, { x: 40, y: 170 }, { x: 40, y: 250 }, { x: 40, y: 330 },
  { x: 1160, y: 90 }, { x: 1160, y: 170 }, { x: 1160, y: 250 }, { x: 1160, y: 330 },
  { x: 300, y: 44 }, { x: 600, y: 44 }, { x: 900, y: 44 },
  { x: 230, y: 476 }, { x: 460, y: 476 }, { x: 690, y: 476 }, { x: 920, y: 476 },
  { x: 210, y: 44 }, { x: 430, y: 38 }, { x: 640, y: 42 }, { x: 850, y: 40 }, { x: 1030, y: 46 },
  { x: 130, y: 472 }, { x: 270, y: 446 }, { x: 400, y: 478 }, { x: 530, y: 452 }, { x: 660, y: 480 },
  { x: 790, y: 450 }, { x: 920, y: 478 }, { x: 1050, y: 454 }, { x: 1148, y: 112 }, { x: 1154, y: 220 },
  { x: 1142, y: 320 }, { x: 1160, y: 150 }, { x: 1146, y: 270 },
];

function parseIcons() {
  const re = /<g transform="translate\(([\d.]+),([\d.]+)\)">\s*<g>\s*<animateTransform\s+attributeName="transform"\s+type="translate"\s+values="0 0;0 -([\d.]+);0 0"\s+dur="([\d.]+)s"\s+begin="([\d.]+)s"\s+repeatCount="indefinite"\/>\s*<circle r="30" fill="#[0-9a-fA-F]{3,8}" stroke="#[0-9a-fA-F]{3,8}" stroke-width="1\.4"\/>\s*<g transform="translate\(-12,-12\) scale\(1\.15\)">([\s\S]*?)<\/g>\s*<\/g>\s*<\/g>/g;
  const icons = [];
  let m;
  while ((m = re.exec(sourceSvg)) !== null) {
    const inner = m[6];
    const paths = [];
    const pathRe = /<path\s+[^>]*d="([^"]*)"[^>]*fill="#([0-9a-fA-F]{3,8})"/g;
    let p;
    while ((p = pathRe.exec(inner)) !== null) {
      paths.push({ d: p[1], fill: `#${p[2]}` });
    }
    if (paths.length === 0) continue;
    icons.push({
      amp: `-${m[3]}`,
      dur: m[4],
      begin: m[5],
      fill: paths[0].fill,
      paths,
    });
  }
  return icons;
}

const ICONS = parseIcons();

function buildKeyTimes(start, end) {
  const a = start;
  const b = Math.min(start + 0.005, end - 0.005);
  const c = Math.max(end - 0.005, b + 0.001);
  const d = end;
  return {
    keyTimes: [0, a, b, c, d, 1].map((v) => v.toFixed(5)),
    values: '0;0;1;1;0;0',
  };
}

function buildCursorBlink(start, end) {
  const keyTimes = [0, start];
  const values = [0, 0];
  let t = start;
  let on = true;
  const blink = 0.011;
  while (t < end - blink) {
    t += blink;
    keyTimes.push(Math.min(t, end));
    values.push(on ? 1 : 0);
    on = !on;
  }
  keyTimes.push(end, 1);
  values.push(0, 0);
  return {
    keyTimes: keyTimes.map((v) => v.toFixed(5)),
    values: values.join(';'),
  };
}

function renderLine(line, y, scene, idx, color) {
  const start = Math.min(scene.start + idx * 0.008, scene.end - 0.012);
  const { keyTimes, values } = buildKeyTimes(start, scene.end);

  let tspans;
  if (line.k === 'p') {
    tspans = `<tspan fill="${color.promptUser}">lanetting@ubuntu:~$</tspan><tspan fill="${color.cmd}"> ${line.t}</tspan>`;
  } else {
    const symbol = PREFIXES[line.k];
    const prefixColor = color[line.k];
    tspans = `<tspan fill="${prefixColor}" font-weight="700">[${symbol}]</tspan><tspan fill="${color.out}">${line.t}</tspan>`;
  }

  return `<text x="132" y="${y}" font-family="${FONT}" font-size="17" opacity="0">
      <animate attributeName="opacity" dur="${TOTAL_DUR}s" repeatCount="indefinite" keyTimes="${keyTimes.join(
    ';'
  )}" values="${values}"/>
      ${tspans}
    </text>`;
}

function renderIcons(themeConf) {
  if (!themeConf.icons) return '';
  return ICONS.map((icon, iParam) => {
    const slot = SLOTS[iParam % SLOTS.length];
    const innerPaths = icon.paths
      .map((p) => {
        const fill = themeConf.iconFillOverride[p.fill] || p.fill;
        return `<path d="${p.d}" fill="${fill}"/>`;
      })
      .join('');
    return `<g transform="translate(${slot.x},${slot.y})">
    <g>
      <animateTransform attributeName="transform" type="translate" values="0 0;0 ${icon.amp};0 0" dur="${icon.dur}s" begin="${icon.begin}s" repeatCount="indefinite"/>
      <circle r="30" fill="${themeConf.iconCircleFill}" stroke="${themeConf.iconCircleStroke}" stroke-width="1.4"/>
      <g transform="translate(-12,-12) scale(1.15)">${innerPaths}</g>
    </g>
  </g>`;
  }).join('\n  ');
}

function buildSvg(themeName, lang) {
  const color = THEME_COLORS[themeName];
  const themeConf = THEME_CONSOLE[themeName];
  const scenes = CONTENT[lang];
  const cx = 110;
  const cy = 60;
  const cw = 980;
  const ch = 340;
  const titleH = 44;
  const rx = themeConf.rx;

  const linesHtml = scenes
    .map((sceneLines, sIdx) => {
      return sceneLines
        .map((line, lineIdx) => {
          const html = renderLine(line, cy + titleH + 28 + lineIdx * 28, SCENES[sIdx], lineIdx, color);
          return html;
        })
        .join('\n      ');
    })
    .join('\n      ');

  // Cursor sits right after the last prompt line of the final scene.
  const lastPromptY = cy + titleH + 28;
  const blink = buildCursorBlink(SCENES[4].start, SCENES[4].end - 0.02);
  const cursor = `<rect x="462" y="${lastPromptY - 13}" width="9" height="16" rx="2" fill="${color.promptUser}" opacity="0">
    <animate attributeName="opacity" dur="${TOTAL_DUR}s" repeatCount="indefinite" keyTimes="${blink.keyTimes.join(
    ';'
  )}" values="${blink.values}"/>
  </rect>`;

  const iconsHtml = renderIcons(themeConf);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${VB_W} ${VB_H}" width="${VB_W}" height="${VB_H}" preserveAspectRatio="xMidYMid meet">
  ${iconsHtml}
  <g>
    <rect x="${cx}" y="${cy}" width="${cw}" height="${ch}" rx="${rx}" fill="${color.winBg}"/>
    <rect x="${cx}" y="${cy}" width="${cw}" height="${ch}" rx="${rx}" fill="none" stroke="${color.winBorder}" stroke-width="1.5"/>
    <rect x="${cx}" y="${cy}" width="${cw}" height="${titleH}" rx="${rx}" fill="${color.titleBg}"/>
    <path d="M${cx} ${cy + titleH} h${cw}" stroke="${color.winBorder}"/>
    <circle cx="${cx + 36}" cy="${cy + 22}" r="7" fill="#ff5f56"/>
    <circle cx="${cx + 60}" cy="${cy + 22}" r="7" fill="#ffbd2e"/>
    <circle cx="${cx + 84}" cy="${cy + 22}" r="7" fill="#27c93f"/>
    <text x="${cx + cw / 2}" y="${cy + 29}" text-anchor="middle" font-family="${FONT}" font-size="17" fill="${color.titleText}">lanetting@ubuntu: ~</text>
    ${linesHtml}
    ${cursor}
  </g>
</svg>
`;
}

mkdirSync(publicDir, { recursive: true });

for (const themeName of Object.keys(THEME_COLORS)) {
  for (const lang of ['en', 'es']) {
    const file = path.join(publicDir, `hero-terminal-${themeName}-${lang}.svg`);
    writeFileSync(file, buildSvg(themeName, lang));
    console.log(`✓ generated ${path.relative(repoRoot, file)}`);
  }
}