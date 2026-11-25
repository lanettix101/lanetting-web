import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { portfolioTranslations } from '../../i18n/portfolioTranslations';
import { getCarouselProjects } from '../../data/projectRelations';
import type { Project } from '../../data/portfolioData';
import {
  heroPinnedSrcSet,
  projectHeroSizes,
  COVER_SMALL_MEDIA,
  COVER_PINNED_MOBILE_WIDTH,
  COVER_PINNED_DESKTOP_WIDTH,
} from '../../data/serviceImages';

const BASE = import.meta.env.BASE_URL;
const DURATION_MS = 5000;
const HOVER_DURATION_MS = 8000;
const FADE_S = 0.6;

interface HeroCarouselProps {
  language: 'en' | 'es';
  ariaLabel: string;
}

function Slide({ project, language, isLoaded, onImageLoad }: {
  project: Project;
  language: 'en' | 'es';
  isLoaded: boolean;
  onImageLoad: () => void;
}) {
  const title = project.title[language] || project.title.en;
  const category = project.category[language] || project.category.en;
  const knowMore = portfolioTranslations[language].card.knowMore;

  return (
    <section className="relative w-full overflow-hidden">
      <div className="absolute inset-0 block">
        <picture>
          {project.imgMobile && project.imgMobileWidth ? (
            <source
              media={COVER_SMALL_MEDIA}
              srcSet={heroPinnedSrcSet(project.imgMobile, project.imgMobileWidth, COVER_PINNED_MOBILE_WIDTH)}
              sizes={projectHeroSizes}
            />
          ) : null}
          <img
            src={`${BASE}${project.img}`}
            srcSet={heroPinnedSrcSet(project.img, project.imgWidth, COVER_PINNED_DESKTOP_WIDTH)}
            sizes={projectHeroSizes}
            alt={title}
            className="w-full h-full object-cover block"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            onLoad={onImageLoad}
          />
        </picture>
      </div>
      {isLoaded && (
        <div className="absolute inset-0 bg-black/40 flex items-end justify-between p-6 sm:p-8">
          <div className="max-w-2xl">
            <p className="text-xs font-mono font-medium uppercase tracking-wide text-brand-accent mb-2">
              {category}
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 line-clamp-2">
              {title}
            </h2>
          </div>
          <button
            className="inline-flex items-center gap-2 rounded-md border border-white/30 bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/20 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            aria-label={knowMore}
          >
            {knowMore}
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>
      )}
    </section>
  );
}

export default function HeroCarousel({ language, ariaLabel }: HeroCarouselProps) {
  const projects = getCarouselProjects();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageLoaded, setCurrentImageLoaded] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const duration = isHovered ? HOVER_DURATION_MS : DURATION_MS;

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % projects.length);
    }, duration);
  }, [duration, projects.length]);

  const next = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setActiveIndex((prev) => (prev + 1) % projects.length);
    resetTimer();
  }, [resetTimer]);

  const prev = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
    resetTimer();
  }, [resetTimer]);

  useEffect(() => {
    setCurrentImageLoaded(false);
    resetTimer();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [activeIndex, resetTimer]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  if (projects.length === 0) return null;

  const project = projects[activeIndex];

  return (
    <section
      id="portfolio-carousel"
      className="relative w-full overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={ariaLabel}
    >
      <AnimatePresence>
        <motion.section
          key={activeIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: FADE_S }}
          className="relative w-full overflow-hidden"
        >
          <Slide
            project={project}
            language={language}
            isLoaded={currentImageLoaded}
            onImageLoad={() => setCurrentImageLoaded(true)}
          />
        </motion.section>
      </AnimatePresence>

      {isHovered && projects.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-white/30 bg-black/40 px-3 py-2 text-sm font-medium text-white hover:bg-white/20 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white opacity-70 hover:opacity-100"
            aria-label="Proyecto anterior"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-white/30 bg-black/40 px-3 py-2 text-sm font-medium text-white hover:bg-white/20 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white opacity-70 hover:opacity-100"
            aria-label="Siguiente proyecto"
          >
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </>
      )}
    </section>
  );
}
