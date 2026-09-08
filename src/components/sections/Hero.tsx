import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ConsoleHeading from '../ui/ConsoleHeading';
import { useLanguage } from '../../i18n/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section id="hero" className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      <div className="container mx-auto px-4 flex flex-col items-center text-center">
        <div className="max-w-4xl flex flex-col items-center">
          <p className="text-sm md:text-base font-semibold tracking-wider text-brand-accent uppercase mb-4">
            {t.hero.subtitle}
          </p>
          <ConsoleHeading
            as="h1"
            command={t.hero.command}
            text={t.hero.title}
            className="text-xl sm:text-xl md:text-3xl lg:text-4xl font-extrabold text-brand-primary tracking-tight leading-tight mb-6 text-center"
          />
          <p className="text-lg md:text-xl text-brand-text/80 max-w-2xl mb-10 leading-relaxed text-center">
            {t.hero.desc}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
        </div>
        <section className="mt-6 pb-16">
        </section>
        {/* 16:9 Desktop Banner */}
        <div className="mt-16 w-full aspect-video rounded-lg overflow-hidden flex items-center justify-center bg-brand-surface border border-brand-border">
          <img
            src={`${import.meta.env.BASE_URL}img_hero_background_16x9.webp`}
            alt="Hero Background"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
