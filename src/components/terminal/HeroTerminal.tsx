import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import {
  TERMINAL_CONTENT,
  TERMINAL_GEOMETRY,
  TERMINAL_TIMING,
  THEME_COLORS,
  type TerminalLanguage,
  type TerminalLine,
  type TerminalThemeName,
} from './heroTerminalData';
import TerminalWindow, { type CursorState, type LineState } from './TerminalWindow';
import FloatingTechIcons from './FloatingTechIcons';

interface TimelineStep {
  at: number;
  run: () => void;
}

function buildLineState(scenes: TerminalLine[][]): LineState[][] {
  return scenes.map((s) => s.map(() => ({ revealed: false, typed: 0 })));
}

function commandText(line: TerminalLine): string {
  return line.t.startsWith(' ') ? line.t : ` ${line.t}`;
}

export function computeTerminalCycleMs(language: TerminalLanguage): number {
  const scenes = TERMINAL_CONTENT[language];
  let t = 0;
  for (let sIdx = 0; sIdx < scenes.length; sIdx++) {
    const sceneLines = scenes[sIdx];
    const cmd = commandText(sceneLines[0]);
    t += 200 + cmd.length * TERMINAL_TIMING.charMs;
    for (let l = 1; l < sceneLines.length; l++) {
      t += TERMINAL_TIMING.lineDelayMs + TERMINAL_TIMING.outputStaggerMs;
    }
    t += sIdx === scenes.length - 1 ? TERMINAL_TIMING.loopHoldMs : TERMINAL_TIMING.scenePauseMs;
  }
  return t;
}

interface HeroTerminalProps {
  theme: TerminalThemeName;
  language: TerminalLanguage;
  ariaLabel: string;
}

export default function HeroTerminal({ theme, language, ariaLabel }: HeroTerminalProps) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const reducedMotion = useReducedMotion();

  const scenes = TERMINAL_CONTENT[language];
  const [lines, setLines] = useState<LineState[][]>(() => buildLineState(scenes));
  const [activeScene, setActiveScene] = useState(0);
  const [cursor, setCursor] = useState<CursorState | null>({ scene: 0, line: 0 });
  const [cursorBlinkOn, setCursorBlinkOn] = useState(false);

  const timeline = useMemo<TimelineStep[]>(() => {
    const steps: TimelineStep[] = [];
    let t = 0;

    scenes.forEach((sceneLines, sIdx) => {
      t += 200;
      steps.push({
        at: t,
        run: () => {
          setActiveScene(sIdx);
          setLines((prev) =>
            prev.map((sl, si) => (si === sIdx ? sceneLines.map(() => ({ revealed: false, typed: 0 })) : sl))
          );
          setCursor({ scene: sIdx, line: 0 });
          setCursorBlinkOn(true);
        },
      });

      const cmd = commandText(sceneLines[0]);
      steps.push({
        at: t,
        run: () => {
          setLines((prev) =>
            prev.map((sl, si) =>
              si === sIdx ? sl.map((st, li) => (li === 0 ? { ...st, revealed: true } : st)) : sl
            )
          );
        },
      });

      for (let c = 1; c <= cmd.length; c++) {
        t += TERMINAL_TIMING.charMs;
        steps.push({
          at: t,
          run: () => {
            setLines((prev) =>
              prev.map((sl, si) =>
                si === sIdx
                  ? sl.map((st, li) => (li === 0 ? { ...st, typed: c } : st))
                  : sl
              )
            );
          },
        });
      }

      for (let l = 1; l < sceneLines.length; l++) {
        t += TERMINAL_TIMING.lineDelayMs;
        steps.push({
          at: t,
          run: () => {
            setLines((prev) =>
              prev.map((sl, si) =>
                si === sIdx ? sl.map((st, li) => (li === l ? { ...st, revealed: true } : st)) : sl
              )
            );
          },
        });
        t += TERMINAL_TIMING.outputStaggerMs;
      }

      const isLast = sIdx === scenes.length - 1;
      steps.push({
        at: t + (isLast ? TERMINAL_TIMING.loopHoldMs : TERMINAL_TIMING.scenePauseMs),
        run: () => {
          setCursor({ scene: sIdx, line: 0 });
          setCursorBlinkOn(true);
        },
      });
      t += isLast ? TERMINAL_TIMING.loopHoldMs : TERMINAL_TIMING.scenePauseMs;
    });

    return steps;
  }, [scenes]);

  useEffect(() => {
    if (!inView || reducedMotion) return;
    let cancelled = false;
    const cycleMs = computeTerminalCycleMs(language);
    const timers: number[] = [];

    const runCycle = () => {
      for (const step of timeline) {
        const id = window.setTimeout(() => {
          if (!cancelled) step.run();
        }, step.at);
        timers.push(id);
      }
    };

    runCycle();
    const loopId = window.setTimeout(() => {
      if (!cancelled) runCycle();
    }, cycleMs);
    timers.push(loopId);

    return () => {
      cancelled = true;
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, [inView, reducedMotion, timeline, language]);

  useEffect(() => {
    if (!inView || !reducedMotion) return;
    setLines(
      scenes.map((s, si) =>
        si === 0 ? s.map((l) => ({ revealed: true, typed: l.k === 'p' ? commandText(l).length : 0 })) : s.map(() => ({ revealed: false, typed: 0 }))
      )
    );
    setActiveScene(0);
    setCursor({ scene: 0, line: 0 });
    setCursorBlinkOn(true);
  }, [inView, reducedMotion, scenes]);

  const color = THEME_COLORS[theme];

  return (
    <motion.svg
      ref={ref}
      viewBox={`0 0 ${TERMINAL_GEOMETRY.vbWidth} ${TERMINAL_GEOMETRY.vbHeight}`}
      width={TERMINAL_GEOMETRY.vbWidth}
      height={TERMINAL_GEOMETRY.vbHeight}
      className="w-full h-auto select-none"
      role="img"
      aria-label={ariaLabel}
      initial={false}
      animate={{ opacity: inView ? 1 : 0 }}
      transition={{ duration: 0.8 }}
    >
      <FloatingTechIcons theme={theme} />
      <TerminalWindow
        color={color}
        scenes={scenes}
        lines={lines}
        activeScene={activeScene}
        cursor={cursor}
        cursorBlinkOn={cursorBlinkOn}
      />
    </motion.svg>
  );
}