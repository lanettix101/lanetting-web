import { useRef, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion, type Variants } from 'motion/react';

const EXIT_SECONDS = 0.18;
const ENTER_SECONDS = 0.26;
const EXIT_BLUR = 'blur(8px)';

const STATIC_KEY = '__static__';

const isPortfolioPath = (pathname: string) => pathname === '/portfolio' || pathname.startsWith('/portfolio/');

const variants: Variants = {
  initial: (enabled: boolean) => ({ opacity: enabled ? 0 : 1 }),
  animate: (enabled: boolean) => ({
    opacity: 1,
    transition: { duration: enabled ? ENTER_SECONDS : 0, ease: 'easeOut' },
  }),
  exit: (enabled: boolean) => ({
    opacity: enabled ? 0 : 1,
    ...(enabled ? { filter: EXIT_BLUR } : {}),
    transition: { duration: enabled ? EXIT_SECONDS : 0, ease: 'easeIn' },
  }),
};

export default function PortfolioTransition({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const reducedMotion = useReducedMotion();
  const lastPathname = useRef<string | null>(null);
  const frozen = useRef({ pathname: '', enabled: false });

  if (lastPathname.current !== pathname) {
    const wasInPortfolio = lastPathname.current !== null && isPortfolioPath(lastPathname.current);
    frozen.current = {
      pathname,
      enabled: !reducedMotion && wasInPortfolio && isPortfolioPath(pathname),
    };
    lastPathname.current = pathname;
  }

  const key = isPortfolioPath(pathname) ? pathname : STATIC_KEY;
  const enabled = frozen.current.enabled;

  return (
    <AnimatePresence mode="wait" custom={enabled} initial={false}>
      <motion.div
        key={key}
        custom={enabled}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
