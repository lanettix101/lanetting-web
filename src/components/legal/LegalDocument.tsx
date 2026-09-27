import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowLeft, FileText, Info } from 'lucide-react';
import ConsoleHeading from '../ui/ConsoleHeading';
import { useLanguage } from '../../i18n/LanguageContext';
import type { LegalBlock, LegalDocument, Localised } from '../../content/legal';

const t = (value: Localised, language: 'en' | 'es') => value[language];

function Block({ block, language }: { block: LegalBlock; language: 'en' | 'es' }) {
  if (block.kind === 'p') {
    return (
      <p className="text-brand-text/85 text-sm sm:text-base leading-relaxed mb-4 last:mb-0">
        {t(block.text, language)}
      </p>
    );
  }

  if (block.kind === 'ul') {
    return (
      <ul className="space-y-2.5 mb-4 last:mb-0">
        {block.items.map((item, idx) => (
          <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-brand-text/80">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-primary mt-2.5 shrink-0" />
            <span className="leading-relaxed">{t(item, language)}</span>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="flex items-start gap-3 p-4 sm:p-5 mb-5 bg-brand-primary/10 border-l-2 border-brand-primary rounded-r-lg">
      <Info className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
      <p className="text-brand-text text-sm sm:text-base leading-relaxed font-medium">
        {t(block.text, language)}
      </p>
    </div>
  );
}

export default function LegalDocument({ doc }: { doc: LegalDocument }) {
  const { language } = useLanguage();
  const reduceMotion = useReducedMotion();
  const isEn = language === 'en';

  return (
    <div className="container mx-auto px-4 py-16 md:py-24 max-w-3xl">
      <Link
        to="/"
        className="inline-flex items-center text-brand-accent hover:text-brand-primary font-medium text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary rounded-sm mb-8"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        {isEn ? 'Back to home' : 'Volver al inicio'}
      </Link>

      <ConsoleHeading
        as="h1"
        command={t(doc.command, language)}
        text={t(doc.title, language)}
        className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-primary mb-4"
      />

      <p className="flex items-center gap-2 text-brand-accent text-xs font-mono uppercase tracking-wider mb-12">
        <FileText className="w-3.5 h-3.5" />
        {isEn ? 'Effective date' : 'Fecha de vigencia'}: {doc.effectiveDate}
      </p>

      <nav
        aria-label={isEn ? 'Contents' : 'Contenido'}
        className="bg-brand-surface border border-brand-border rounded-xl p-5 sm:p-6 mb-14"
      >
        <h2 className="text-xs font-mono font-bold text-brand-primary uppercase tracking-wider mb-4">
          {isEn ? '// Contents' : '// Contenido'}
        </h2>
        <ol className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
          {doc.sections.map((section, idx) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className="flex gap-2.5 text-sm text-brand-text/75 hover:text-brand-primary transition-colors py-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary rounded-sm"
              >
                <span className="text-brand-accent/70 font-mono text-xs pt-0.5 shrink-0">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <span className="leading-snug">{t(section.heading, language)}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="space-y-12">
        {doc.sections.map((section, idx) => (
          <motion.section
            key={section.id}
            id={section.id}
            aria-labelledby={`${section.id}-heading`}
            className="scroll-mt-8"
            initial={reduceMotion ? false : { opacity: 1, y: 12 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <h2
              id={`${section.id}-heading`}
              className="flex items-baseline gap-3 text-lg sm:text-xl font-bold text-brand-primary mb-4 pb-3 border-b border-brand-border"
            >
              <span className="text-brand-accent/70 font-mono text-sm shrink-0">
                {String(idx + 1).padStart(2, '0')}
              </span>
              <span className="break-words">{t(section.heading, language)}</span>
            </h2>
            {section.blocks.map((block, bIdx) => (
              <Block key={bIdx} block={block} language={language} />
            ))}
          </motion.section>
        ))}
      </div>
    </div>
  );
}
