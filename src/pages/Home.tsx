import { useEffect } from 'react';
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

export default function Home() {
  const location = useLocation();
  const { language } = useLanguage();

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
      <Timeline />
      <Services />
      <Platforms />
      <Contact />
    </>
  );
}
