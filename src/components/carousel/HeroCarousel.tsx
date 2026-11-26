import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useInView } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { portfolioTranslations } from '../../i18n/portfolioTranslations';
import { getCarouselProjects } from '../../data/projectRelations';
import type { Project } from '../../data/portfolioData';
import {
  CAROUSEL_BASE_MS,
  CAROUSEL_FADE_MS,
  CAROUSEL_HOVER_EXTRA_MS,
} from '../../data/heroCarouselConfig';
import { preloadProjectDetail } from '../../lib/routePreload';
import {
  heroPinnedSrcSet,
  projectHeroSizes,
  COVER_SMALL_MEDIA,
  COVER_PINNED_MOBILE_WIDTH,
  COVER_PINNED_DESKTOP_WIDTH,
} from '../../data/serviceImages';

const BASE = import.meta.env.BASE_URL;
const FADE_S = CAROUSEL_FADE_MS / 1000;

interface HeroCarouselProps {
  language: 'en' | 'es';
  ariaLabel: string;
}

function Slide({ project, language }: { project: Project; language: 'en' | 'es' }) {
  const title = project.title[language] || project.title.en;
  const category = project.category[language] || project.category.en;
  const knowMore = portfolioTranslations[language].card.knowMore;
  const imgRef = useRef<HTMLImageElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const img = imgRef.current;
    if (img?.complete && img.naturalWidth > 0) setIsLoaded(true);
  }, []);

  return (
    <div className="group absolute inset-0">
      <picture className="absolute inset-0 block">
        {project.imgMobile && project.imgMobileWidth ? (
          <source
            media={COVER_SMALL_MEDIA}
            srcSet={heroPinnedSrcSet(project.imgMobile, project.imgMobileWidth, COVER_PINNED_MOBILE_WIDTH)}
            sizes={projectHeroSizes}
          />
        ) : null}
        <img
          ref={imgRef}
          src={`${BASE}${project.img}`}
          srcSet={heroPinnedSrcSet(project.img, project.imgWidth, COVER_PINNED_DESKTOP_WIDTH)}
          sizes={projectHeroSizes}
          alt={title}
          className="w-full h-full object-cover block"
          loading="lazy"
          fetchPriority="low"
          decoding="async"
          onLoad={() => setIsLoaded(true)}
        />
      </picture>
      <div
        className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 via-black/60 to-transparent"
        aria-hidden="true"
      />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/30 to-transparent" aria-hidden="true" />
      {isLoaded && (
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-8 md:p-12">
          <div className="max-w-2xl">
            <p className="text-xs font-mono font-medium uppercase tracking-wide text-white/85 mb-2">
              {category}
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 line-clamp-2">
              {title}
            </h2>
          </div>
          <Link
            to={`/portfolio/${project.slug}`}
            onPointerEnter={preloadProjectDetail}
            onFocus={preloadProjectDetail}
            className="inline-flex shrink-0 items-center gap-2 rounded-md border border-white/30 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm hover:bg-white/20 transition-opacity duration-200 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {knowMore}
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      )}
    </div>
  );
}

export default function HeroCarousel({ language, ariaLabel }: HeroCarouselProps) {
  const { t } = useLanguage();
  const projects = getCarouselProjects();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const inView = useInView(carouselRef, { amount: 0.1 });
  const showControls = isHovered || isFocused;

  const duration = isHovered
    ? CAROUSEL_BASE_MS + CAROUSEL_HOVER_EXTRA_MS
    : CAROUSEL_BASE_MS;

  useEffect(() => {
    if (!inView || projects.length < 2) return;
    const timer = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % projects.length);
    }, duration);
    return () => clearTimeout(timer);
  }, [activeIndex, duration, inView, projects.length]);

  if (projects.length === 0) return null;

  const project = projects[activeIndex];
  const prevLabel = t.portfolioCarousel.prev;
  const nextLabel = t.portfolioCarousel.next;

  const next = () => setActiveIndex((prev) => (prev + 1) % projects.length);
  const prev = () => setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);

  return (
    <div ref={carouselRef} className="container mx-auto px-4 mb-12 md:mb-16">
      <section
        id="portfolio-carousel"
        className="relative w-full overflow-hidden rounded-lg border border-brand-border bg-brand-surface"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsFocused(true)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setIsFocused(false);
        }}
        aria-label={ariaLabel}
      >
        <div className="relative w-full aspect-[4/3] sm:aspect-video">
          <AnimatePresence>
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: FADE_S }}
              className="absolute inset-0"
            >
              <Slide project={project} language={language} />
            </motion.div>
          </AnimatePresence>
        </div>

        {projects.length > 1 && (
          <>
            <button
              onClick={prev}
              className={`absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-white/30 bg-black/40 p-2 text-white transition-opacity duration-200 hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                showControls ? 'opacity-70' : 'opacity-0 pointer-events-none'
              }`}
              aria-label={prevLabel}
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              onClick={next}
              className={`absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/30 bg-black/40 p-2 text-white transition-opacity duration-200 hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                showControls ? 'opacity-70' : 'opacity-0 pointer-events-none'
              }`}
              aria-label={nextLabel}
            >
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </>
        )}
      </section>
    </div>
  );
}
