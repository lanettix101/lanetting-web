import { motion, useReducedMotion } from 'motion/react';
import { ICON_FILL_OVERRIDES, TERMINAL_ICONS, type TerminalThemeName } from './heroTerminalData';

const ICON_CIRCLE: Record<TerminalThemeName, { fill: string; stroke: string }> = {
  light: { fill: '#FFFFFF', stroke: '#E5E7EB' },
  dark: { fill: '#111827', stroke: '#374151' },
  retro: { fill: '', stroke: '' },
};

interface FloatingTechIconsProps {
  theme: TerminalThemeName;
}

export default function FloatingTechIcons({ theme }: FloatingTechIconsProps) {
  const reducedMotion = useReducedMotion();
  if (theme === 'retro') return null;

  const overrides = ICON_FILL_OVERRIDES[theme] ?? {};
  const circle = ICON_CIRCLE[theme];

  return (
    <g aria-hidden="true">
      {TERMINAL_ICONS.map((icon, i) => (
        <g key={i} transform={`translate(${icon.x} ${icon.y})`}>
          <motion.g
            animate={reducedMotion ? undefined : { y: [0, icon.amp, 0] }}
            transition={
              reducedMotion
                ? undefined
                : { duration: icon.dur, delay: icon.begin, repeat: Infinity, ease: 'easeInOut' }
            }
          >
            {circle.fill && <circle r={30} fill={circle.fill} stroke={circle.stroke} strokeWidth={1.4} />}
            <g transform="translate(-12 -12) scale(1.15)">
              {icon.paths.map((p, j) => (
                <path key={j} d={p.d} fill={overrides[p.fill] ?? p.fill} />
              ))}
            </g>
          </motion.g>
        </g>
      ))}
    </g>
  );
}