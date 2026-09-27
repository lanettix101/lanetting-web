import { Link } from 'react-router-dom';
import { ArrowLeft, Terminal } from 'lucide-react';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { useScrollToTop } from '../hooks/useScrollToTop';
import { useLanguage } from '../i18n/LanguageContext';

export default function NotFound() {
  const { t } = useLanguage();

  useDocumentMeta({
    title: t.notFound.title,
    metaDescription: t.notFound.desc,
    path: '/404',
    noindex: true,
  });

  useScrollToTop();

  return (
    <div className="container mx-auto px-4 py-24 max-w-4xl min-h-[70vh] flex flex-col items-center justify-center text-center">
      <div className="p-4 bg-brand-primary/10 rounded-full text-brand-primary mb-4">
        <Terminal className="w-8 h-8" />
      </div>
      <p className="text-brand-accent/70 font-mono text-sm uppercase tracking-wider mb-3">
        {t.notFound.code}
      </p>
      <h1 className="text-2xl sm:text-3xl font-bold text-brand-primary mb-2">
        {t.notFound.title}
      </h1>
      <p className="text-brand-accent mb-8 max-w-lg">
        {t.notFound.desc}
      </p>
      <Link
        to="/"
        className="inline-flex items-center px-5 py-2.5 bg-brand-primary text-brand-bg rounded-md font-medium hover:opacity-90 transition-opacity"
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> {t.notFound.back}
      </Link>
    </div>
  );
}
