import LegalDocument from '../components/legal/LegalDocument';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { useScrollToTop } from '../hooks/useScrollToTop';
import { useLanguage } from '../i18n/LanguageContext';
import { legal } from '../content/legal';

export default function Terms() {
  const { language } = useLanguage();
  const doc = legal.terms;

  useDocumentMeta({
    title: doc.title[language],
    metaDescription: doc.description[language],
    path: '/terms',
  });

  useScrollToTop();

  return <LegalDocument doc={doc} />;
}
