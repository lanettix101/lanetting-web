import { useEffect, useRef, useState, type Ref } from 'react';
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
} from '../../data/featuredProjectsConfig';
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
const THUMBNAIL_COUNT = 3;

interface FeaturedProjectsCarouselProps {
  language: 'en' | 'es';
  ariaLabel: string;
}

function ProjectImage({
  project,
  onLoad,
  imgRef,
  className,
}: {
  project: Project;
  onLoad?: () => void;
  imgRef?: Ref<HTMLImageElement>;
  className: string;
}) {
  return (
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
        alt=""
        className={className}
        loading="lazy"
        fetchPriority="low"
        decoding="async"
        onLoad={onLoad}
      />
    </picture>
  );
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
    <Link
      to={`/portfolio/${project.slug}`}
      onPointerEnter={preloadProjectDetail}
      onFocus={preloadProjectDetail}
      aria-label={title}
      className="group/slide absolute inset-0 block focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-white"
    >
      <ProjectImage
        project={project}
        onLoad={() => setIsLoaded(true)}
        imgRef={imgRef}
        className="h-full w-full object-cover"
      />
      <div
        className="absolute inset-0 bg-gradient-to-br from-black/75 via-black/30 to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent"
        aria-hidden="true"
      />
      {isLoaded && (
        <>
          <div className="absolute left-0 top-0 max-w-[85%] p-5 text-left sm:p-8 md:p-10">
            <p className="mb-1.5 font-mono text-xs font-medium uppercase tracking-wide text-white/85">
              {category}
            </p>
            <h2 className="line-clamp-2 text-[1.125rem] font-bold leading-tight text-white sm:text-[1.40625rem] md:text-[1.6875rem] lg:text-[2.25rem]">
              {title}
            </h2>
          </div>
          <span className="absolute bottom-0 right-0 m-5 inline-flex items-center gap-2 rounded-md border border-white/30 bg-white/10 px-4 py-2 text-sm font-medium text-white opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover/slide:opacity-100 group-focus-visible/slide:opacity-100 sm:m-8 md:m-10">
            {knowMore}
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
        </>
      )}
    </Link>
  );
}

function Thumbnail({ project, language }: { project: Project; language: 'en' | 'es' }) {
  const title = project.title[language] || project.title.en;

  return (
    <Link
      to={`/portfolio/${project.slug}`}
      onPointerEnter={preloadProjectDetail}
      onFocus={preloadProjectDetail}
      aria-label={title}
      className="group/thumb relative block h-full w-full overflow-hidden rounded-lg border-2 border-brand-primary bg-brand-surface transition-colors hover:border-brand-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
    >
      <ProjectImage project={project} className="h-full w-full object-cover" />
      <span className="absolute inset-x-0 bottom-0 block bg-gradient-to-t from-black/85 to-transparent px-2 pb-1.5 pt-6">
        <span className="block truncate text-[0.65rem] font-medium text-white">{title}</span>
      </span>
    </Link>
  );
}

export default function FeaturedProjectsCarousel({ language, ariaLabel }: FeaturedProjectsCarouselProps) {
  const { t } = useLanguage();
  const projects = getCarouselProjects();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const carouselRef = useRef<HTMLElement>(null);
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

  const thumbnails = Array.from(
    { length: Math.min(THUMBNAIL_COUNT, Math.max(0, projects.length - 1)) },
    (_, offset) => projects[(activeIndex + offset + 1) % projects.length],
  );

  return (
    <section
      ref={carouselRef}
      id="portfolio-carousel"
      aria-label={ariaLabel}
      className="container mx-auto mb-12 px-4 md:mb-16"
    >
      <div className="grid gap-4 lg:grid-cols-[80%_minmax(0,1fr)]">
        <div
          className="relative overflow-hidden rounded-lg border border-brand-border bg-brand-surface"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onFocus={() => setIsFocused(true)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setIsFocused(false);
          }}
        >
          <div className="relative w-full aspect-[4/3] sm:aspect-video">
            <AnimatePresence>
              <motion.div
                key={project.slug}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: FADE_S }}
                className="absolute inset-0"
              >
                <Slide project={project} language={language} />
              </motion.div>
            </AnimatePresence>

            {projects.length > 1 && (
              <>
                <button
                  onClick={prev}
                  className={`absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/30 bg-black/40 p-2 text-white transition-opacity duration-200 hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                    showControls ? 'opacity-70' : 'opacity-0 pointer-events-none'
                  }`}
                  aria-label={prevLabel}
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                </button>
                <button
                  onClick={next}
                  className={`absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/30 bg-black/40 p-2 text-white transition-opacity duration-200 hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                    showControls ? 'opacity-70' : 'opacity-0 pointer-events-none'
                  }`}
                  aria-label={nextLabel}
                >
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </>
            )}
          </div>
        </div>

        {thumbnails.length > 0 && (
          <div className="grid grid-cols-3 gap-3 lg:h-full lg:grid-cols-1 lg:grid-rows-3">
            <AnimatePresence initial={false} mode="popLayout">
              {thumbnails.map((thumbnail) => (
                <motion.div
                  key={thumbnail.slug}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="aspect-video min-h-0 lg:aspect-auto"
                >
                  <Thumbnail project={thumbnail} language={language} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
}
