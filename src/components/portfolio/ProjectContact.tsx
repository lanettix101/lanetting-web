import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ChevronDown, Mail, MessageCircle } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { portfolioTranslations } from '../../i18n/portfolioTranslations';
import { contactInfo } from '../../data/contactInfo';
import type { Project } from '../../data/portfolioData';

const BUTTON =
  'flex w-full sm:w-auto items-center justify-center gap-2 px-6 py-3 font-medium rounded-lg transition-all border border-brand-border bg-brand-surface text-brand-primary hover:border-brand-primary/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary';

const OPTION =
  'inline-flex items-center gap-2 rounded-md border border-brand-border bg-brand-bg px-4 py-3 text-sm font-medium text-brand-primary hover:border-brand-primary/40 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary';

export default function ProjectContact({ project }: { project: Project }) {
  const { language } = useLanguage();
  const t = portfolioTranslations[language].contact;
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const cta = project.contactCta;
  if (!cta) return null;

  const isHire = cta === 'hire';
  const projectName = project.title[language] || project.title.en;
  const message = (isHire ? t.hireMessage : t.licenseMessage).replace('{project}', projectName);
  const subject = (isHire ? t.hireSubject : t.licenseSubject).replace('{project}', projectName);
  const whatsappHref = `${contactInfo.whatsappUrl}?text=${encodeURIComponent(message)}`;
  const mailHref = `mailto:${contactInfo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={`project-contact-${project.slug}`}
        className={BUTTON}
      >
        <MessageCircle className="h-4 w-4" aria-hidden="true" />
        {isHire ? t.hireButton : t.licenseButton}
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id={`project-contact-${project.slug}`}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -14, scaleY: 0.9 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -10, scaleY: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            style={{ transformOrigin: 'top' }}
            className="absolute left-0 top-full z-20 mt-2 w-[min(20rem,calc(100vw-2.5rem))] rounded-lg border border-brand-border bg-brand-surface p-4 shadow-lg"
          >
            <p className="text-sm text-brand-text/80 mb-3 text-justify">{isHire ? t.hirePitch : t.licensePitch}</p>
            <div className="flex flex-col gap-2">
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className={OPTION}>
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                {t.whatsapp}
              </a>
              <a href={mailHref} className={OPTION}>
                <Mail className="h-4 w-4" aria-hidden="true" />
                {t.email}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
