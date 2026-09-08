import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import ConsoleHeading from '../ui/ConsoleHeading';
import { useLanguage } from '../../i18n/LanguageContext';
import { servicesData } from '../../data/servicesData';

export default function Services() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const { t, language } = useLanguage();

  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (Math.ceil(scrollLeft + clientWidth) >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollBy({ left: 320, behavior: 'smooth' });
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isHovered]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const amount = direction === 'left' ? -320 : 320;
      scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center mb-10 gap-6">
          <div className="max-w-2xl flex flex-col items-center">
            <ConsoleHeading command={t.services.command} text={t.services.title} className="text-xl sm:text-2xl md:text-4xl font-bold text-brand-primary mb-4 text-center" />
            <p className="text-brand-accent text-center">
              {t.services.desc}
            </p>
          </div>

          <div className="hidden md:flex gap-2 justify-center w-full">
            <button
              onClick={() => scroll('left')}
              className="p-2 border border-brand-border rounded-md hover:bg-brand-surface text-brand-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary cursor-pointer transition-colors"
              aria-label="Previous service"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2 border border-brand-border rounded-md hover:bg-brand-surface text-brand-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary cursor-pointer transition-colors"
              aria-label="Next service"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* CAROUSEL CONTAINER */}
        <div
          ref={scrollRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => setIsHovered(false)}
          className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 hide-scrollbar"
          style={{ scrollbarWidth: 'none' }}
        >
          {servicesData.map((service) => {
            const title = service.title[language] || service.title.en;
            const shortDesc = service.shortDesc[language] || service.shortDesc.en;

            return (
              <article
                key={service.id}
                className="flex-none w-[85%] md:w-[calc(33.333%-1rem)] snap-start bg-brand-surface border border-brand-border rounded-lg overflow-hidden group flex flex-col justify-between hover:border-brand-primary/40 transition-colors shadow-xs"
              >
                <div>
                  {/* Image */}
                  <div className="w-full aspect-[4/3] bg-brand-bg flex items-center justify-center border-b border-brand-border overflow-hidden relative">
                    <img
                      src={`${import.meta.env.BASE_URL}${service.img}`}
                      alt={title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-brand-primary mb-2 line-clamp-2 min-h-[3.5rem]">
                      {title}
                    </h3>
                    <p className="text-brand-text/75 text-sm mb-4 line-clamp-4 text-justify">
                      {shortDesc}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-0 mt-auto">
                  <Link
                    to={`/service/${service.slug}`}
                    className="text-brand-primary font-medium text-sm hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary inline-flex items-center group/btn"
                  >
                    <span>{language === 'es' ? 'Ver especificación completa' : 'View full specification'}</span>
                    <ArrowRight className="w-4 h-4 ml-1.5 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
