import { Link } from 'react-router-dom';
import { Github } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { portfolioPromo } from '../../data/portfolioPromo';
import { serviceImageSrcSet, serviceCardSizes } from '../../data/serviceImages';

export default function PortfolioPromoCard() {
  const { t, language } = useLanguage();

  return (
    <Link
      to="/portfolio"
      className="flex-none w-[85%] md:w-[calc(33.333%-1rem)] snap-start rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary group"
    >
      <article className="h-full bg-brand-surface border border-brand-border rounded-lg overflow-hidden group flex flex-col justify-between hover:border-brand-primary/40 transition-colors shadow-xs">
        <div>
          <div className="w-full aspect-[4/3] bg-brand-bg flex items-center justify-center border-b border-brand-border overflow-hidden relative">
            <img
              src={`${import.meta.env.BASE_URL}${portfolioPromo.img}`}
              srcSet={serviceImageSrcSet(portfolioPromo.img, portfolioPromo.imgWidth)}
              sizes={serviceCardSizes}
              alt={t.portfolioPromo.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          </div>
          <div className="p-6">
            <h3 className="text-lg font-bold text-brand-primary mb-2 line-clamp-2 min-h-[3.5rem]">
              {t.portfolioPromo.title}
            </h3>
            <p className="text-brand-text/75 text-sm mb-4 line-clamp-5 text-justify">{t.portfolioPromo.shortDesc}</p>
          </div>
        </div>

        <div className="px-6 pb-6 pt-0 mt-auto">
          <span className="inline-flex items-center gap-1.5 rounded-md border border-brand-border bg-brand-bg px-3 py-1.5 text-xs font-mono font-medium text-brand-accent">
            <Github className="h-3.5 w-3.5 text-brand-primary" aria-hidden="true" />
            {language === 'es' ? 'Conoce más proyectos' : 'View more projects'}
          </span>
        </div>
      </article>
    </Link>
  );
}
