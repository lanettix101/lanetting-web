import { Calendar, Mail } from 'lucide-react';
import ConsoleHeading from '../ui/ConsoleHeading';
import { useLanguage } from '../../i18n/LanguageContext';
import { contactInfo } from '../../data/contactInfo';

export default function Contact() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="py-12 md:py-16">
      <div className="container mx-auto px-4 max-w-4xl text-center flex flex-col items-center">
        <ConsoleHeading command={t.contact.command} text={t.contact.title} className="text-xl sm:text-2xl md:text-4xl font-bold text-brand-primary mb-6" />
        <p className="text-brand-accent text-lg mb-10 max-w-2xl mx-auto">
          {t.contact.desc}
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 w-full">
          <a
            href={`mailto:${contactInfo.email}`}
            className="flex items-center justify-center w-full sm:w-auto px-8 py-4 bg-brand-primary text-brand-bg font-medium rounded-lg hover:opacity-90 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
          >
            <Mail className="w-5 h-5 mr-3" />
            {t.contact.email}
          </a>

          <a
            href={contactInfo.calendlyUrl}
            className="flex items-center justify-center w-full sm:w-auto px-8 py-4 bg-brand-surface border border-brand-border text-brand-text font-medium rounded-lg hover:bg-brand-bg transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
          >
            <Calendar className="w-5 h-5 mr-3" />
            {t.contact.book}
          </a>
        </div>
      </div>
    </section>
  );
}
