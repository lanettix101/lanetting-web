import { useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, useInView, useReducedMotion } from 'motion/react';
import ConsoleHeading from '../ui/ConsoleHeading';
import HeroVisual from '../hero/HeroVisual';
import { useLanguage } from '../../i18n/LanguageContext';
import { useTheme } from '../../hooks/useTheme';

export default function Hero() {
  const { t, language } = useLanguage();
  const theme = useTheme();
  const reducedMotion = useReducedMotion();
  const [terminalReady, setTerminalReady] = useState(false);
  const visualRef = useRef<HTMLDivElement>(null);
  const visualInView = useInView(visualRef, { once: true, amount: 0.1 });
  const showVisual = terminalReady || reducedMotion || visualInView;

  return (
    <section id="hero" className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      <div className="container mx-auto px-4 flex flex-col items-center text-center">
        <motion.div
          className="max-w-4xl flex flex-col items-center"
          initial={reducedMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <p className="text-sm md:text-base font-semibold tracking-wider text-brand-accent uppercase mb-4 p-4">
            {t.hero.subtitle}
          </p>
          <ConsoleHeading
            as="h1"
            command={t.hero.command}
            text={t.hero.title}
            onTypingDone={() => setTerminalReady(true)}
            className="text-xl sm:text-xl md:text-3xl lg:text-4xl font-extrabold text-brand-primary tracking-tight leading-tight mb-6 text-center p-2"
          />
          <p className="text-lg md:text-xl text-brand-text/80 max-w-2xl mb-10 leading-relaxed text-center p-3">
            {t.hero.desc}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pb-15">
            <Link
              to="/#contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-brand-primary text-brand-bg font-medium rounded-md hover:opacity-90 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
            >
              {t.hero.book}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              to="/#services"
              className="inline-flex items-center justify-center px-6 py-3 bg-brand-surface border border-brand-border text-brand-text font-medium rounded-md hover:bg-brand-border/50 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
            >
              {t.hero.viewServices}
            </Link>
          </div>
        </motion.div>
        <motion.div
          ref={visualRef}
          className="mt-10 w-full"
          initial={false}
          animate={showVisual ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <HeroVisual theme={theme} language={language} ariaLabel={t.hero.terminalAlt} />
        </motion.div>
      </div>
    </section>
  );
}