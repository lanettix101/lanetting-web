export type TerminalThemeName = 'light' | 'dark' | 'retro';
export type TerminalLanguage = 'en' | 'es';

export interface TerminalLine {
  k: 'p' | 'ok' | 'warn' | 'info' | 'arrow';
  t: string;
}

export interface TerminalColorScheme {
  winBg: string;
  winBorder: string;
  titleBg: string;
  titleText: string;
  promptUser: string;
  cmd: string;
  out: string;
  ok: string;
  warn: string;
  info: string;
  arrow: string;
}

export interface TerminalIconPath {
  d: string;
  fill: string;
}

export interface TerminalIcon {
  x: number;
  y: number;
  amp: number;
  dur: number;
  begin: number;
  paths: TerminalIconPath[];
}

export const THEME_COLORS: Record<TerminalThemeName, TerminalColorScheme> = {
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

export interface TerminalSceneContent {
  lines: TerminalLine[];
}

export const TERMINAL_CONTENT: Record<TerminalLanguage, TerminalLine[][]> = {
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

export const LINE_PREFIXES: Record<Exclude<TerminalLine['k'], 'p'>, string> = {
  ok: '✓',
  warn: '+',
  info: 'i',
  arrow: '→',
};

export const TERMINAL_GEOMETRY = {
  vbWidth: 1200,
  vbHeight: 540,
  winX: 110,
  winY: 60,
  winWidth: 980,
  winHeight: 340,
  titleHeight: 44,
  lineX: 132,
  lineStartY: 132,
  lineHeight: 28,
  fontSize: 17,
};

export const TERMINAL_TIMING = {
  charMs: 50,
  lineDelayMs: 160,
  outputStaggerMs: 220,
  scenePauseMs: 1300,
  loopHoldMs: 2400,
};

