import LegalDocument from '../components/legal/LegalDocument';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { useScrollToTop } from '../hooks/useScrollToTop';
import { useLanguage } from '../i18n/LanguageContext';
import { legal } from '../content/legal';

export default function Privacy() {
  const { language } = useLanguage();
  const doc = legal.privacy;

  useDocumentMeta({
    title: doc.title[language],
    metaDescription: doc.description[language],
    path: '/privacy',
  });

  useScrollToTop();

  return <LegalDocument doc={doc} />;
}
