import { lazy, Suspense, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import Hero from '../components/sections/Hero';
import Timeline from '../components/sections/Timeline';
import Services from '../components/sections/Services';
import Platforms from '../components/sections/Platforms';
import Contact from '../components/sections/Contact';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { useScrollToTop } from '../hooks/useScrollToTop';
import { getSEOByPath } from '../data/seoData';

const FeaturedProjectsCarousel = lazy(() => import('../components/sections/FeaturedProjectsCarousel'));

function CarouselFallback() {
  return (
    <section className="container mx-auto mb-12 px-4 md:mb-16" aria-hidden="true">
      <div className="grid gap-4 lg:grid-cols-[80%_minmax(0,1fr)]">
        <div className="relative aspect-[4/3] w-full rounded-lg border border-brand-border bg-brand-surface sm:aspect-video" />
        <div className="grid grid-cols-3 gap-3 lg:h-full lg:grid-cols-1 lg:grid-rows-3">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className="aspect-video rounded-lg border-2 border-brand-primary bg-brand-surface lg:aspect-auto"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const location = useLocation();
  const { language, t } = useLanguage();

  const seo = getSEOByPath('/');

  useDocumentMeta({
    title: seo?.title[language] || 'Full-Stack Software Engineer',
    metaDescription: seo?.description[language] || '',
    keywords: seo?.keywords[language],
    path: '/',
    lang: language,
    ogImage: 'thumbnail.webp',
    ogImageWidth: 900,
    ogImageHeight: 1124,
  });

  useScrollToTop();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <>
      <Hero />
      <Suspense fallback={<CarouselFallback />}>
        <FeaturedProjectsCarousel language={language} ariaLabel={t.portfolioCarousel.ariaLabel} />
      </Suspense>
      <Timeline />
      <Services />
      <Platforms />
      <Contact />
    </>
  );
}
