import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { useLanguage } from '../../i18n/LanguageContext';
import { devConsoleCommands } from '../../data/devConsoleData';
import {
  DEV_CONSOLE_CHAR_MS,
  DEV_CONSOLE_COMMAND_HOLD_MS,
  DEV_CONSOLE_RESPONSE_HOLD_MS,
} from '../../data/devConsoleConfig';

type Mode = 'typing' | 'command' | 'response';

export default function HeroTerminal() {
  const { language } = useLanguage();
  const reducedMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [typed, setTyped] = useState(0);
  const [mode, setMode] = useState<Mode>('typing');
  const [paused, setPaused] = useState(false);

  const commands = devConsoleCommands[language];
  const current = commands[index % commands.length];
  const command = current.command;
  const response = current.response;

  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden);
    onVisibility();
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  useEffect(() => {
    setIndex(0);
    setTyped(0);
    setMode('typing');
  }, [language]);

  useEffect(() => {
    if (reducedMotion || paused) return;

    if (mode === 'typing') {
      if (typed >= command.length) {
        setMode('command');
        return;
      }
      const timer = setTimeout(() => setTyped((prev) => prev + 1), DEV_CONSOLE_CHAR_MS);
      return () => clearTimeout(timer);
    }

    if (mode === 'command') {
      const timer = setTimeout(() => setMode('response'), DEV_CONSOLE_COMMAND_HOLD_MS);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      setIndex((prev) => (prev + 1) % commands.length);
      setTyped(0);
      setMode('typing');
    }, DEV_CONSOLE_RESPONSE_HOLD_MS);
    return () => clearTimeout(timer);
  }, [command.length, commands.length, mode, paused, reducedMotion, typed]);

  const showResponse = reducedMotion || mode === 'response';
  const prompt = showResponse && !reducedMotion ? '→' : '>';
  const text = reducedMotion
    ? `${command} → ${response}`
    : mode === 'response'
      ? response
      : command.slice(0, typed);

  return (
    <div
      id="hero-terminal"
      aria-hidden="true"
      className="pointer-events-none fixed bottom-4 left-4 z-40 w-max max-w-[min(42rem,calc(100vw-8.5rem))]"
    >
      <div className="flex items-center gap-1.5 overflow-hidden rounded-md border border-brand-border bg-brand-surface/90 px-2.5 py-1.5 font-mono text-[0.65rem] text-brand-text shadow-sm backdrop-blur-sm sm:text-xs">
        <span className="shrink-0 font-bold text-brand-accent">{prompt}</span>
        <motion.span
          key={`${language}-${index}-${showResponse ? 'response' : 'command'}`}
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.18 }}
          className="min-w-0 truncate"
        >
          {text}
        </motion.span>
        {!reducedMotion && (
          <span className="ml-0.5 inline-block h-[0.9em] w-[0.5em] shrink-0 animate-pulse bg-brand-accent" />
        )}
      </div>
    </div>
  );
}
