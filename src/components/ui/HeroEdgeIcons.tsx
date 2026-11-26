import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { TERMINAL_ICONS } from '../../data/terminalIcons';

const LEFT_ICONS = TERMINAL_ICONS.slice(0, 4);
const RIGHT_ICONS = TERMINAL_ICONS.slice(4, 8);

function IconColumn({
  icons,
  side,
  reducedMotion,
}: {
  icons: typeof TERMINAL_ICONS;
  side: 'left' | 'right';
  reducedMotion: boolean | null;
}) {
  return (
    <div
      className={`absolute top-12 hidden flex-col justify-center gap-20 lg:flex ${
        side === 'left' ? 'left-0 pl-3' : 'right-0 pr-3'
      }`}
    >
      {icons.map((icon, index) => (
        <motion.svg
          key={index}
          viewBox="0 0 24 24"
          fill="currentColor"
          className={`h-8 w-8 ${index % 2 === 0 ? 'text-brand-primary' : 'text-brand-accent'}`}
          animate={reducedMotion ? undefined : { y: [0, -8, 0] }}
          transition={
            reducedMotion
              ? undefined
              : { duration: icon.dur, delay: icon.begin + index * 0.35, repeat: Infinity, ease: 'easeInOut' }
          }
        >
          {icon.paths.map((path, pathIndex) => (
            <path key={pathIndex} d={path.d} />
          ))}
        </motion.svg>
      ))}
    </div>
  );
}

export default function HeroEdgeIcons() {
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.1 });

  return (
    <div
      ref={ref}
      aria-hidden="true"
      data-hero-edge-icons
      className="pointer-events-none absolute inset-0 z-0 opacity-50"
    >
      {inView && (
        <>
          <IconColumn icons={LEFT_ICONS} side="left" reducedMotion={reducedMotion} />
          <IconColumn icons={RIGHT_ICONS} side="right" reducedMotion={reducedMotion} />
        </>
      )}
    </div>
  );
}
