import { lazy, Suspense } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import ConsoleHeading from '../ui/ConsoleHeading';
import { useLanguage } from '../../i18n/LanguageContext';

const HeroEdgeIcons = lazy(() => import('../ui/HeroEdgeIcons'));

export default function Hero() {
  const { t } = useLanguage();
  const reducedMotion = useReducedMotion();

  return (
    <section id="hero" className="relative overflow-hidden pt-3 pb-16 md:pt-3 md:pb-24">
      <Suspense fallback={null}>
        <HeroEdgeIcons />
      </Suspense>

      <div className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center">
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
            charDelay={70}
            pauseDelay={150}
            className="text-xl sm:text-xl md:text-3xl lg:text-4xl font-bold text-brand-primary tracking-tight leading-tight mb-6 text-center p-2"
          />
          <p className="text-md md:text-md text-brand-text/80 max-w-2xl mb-10 leading-relaxed text-center p-3">
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
      </div>
    </section>
  );
}
