import { Calendar, Github, Mail, Instagram, Linkedin } from 'lucide-react';
import ConsoleHeading from '../ui/ConsoleHeading';
import { useLanguage } from '../../i18n/LanguageContext';

const Telegram = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 10l-4 4l6 6l4 -16l-18 7l4 2l2 6l3 -4" />
  </svg>
);

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
            href="mailto:lanettix101@gmail.com" 
            className="flex items-center justify-center w-full sm:w-auto px-8 py-4 bg-brand-primary text-brand-bg font-medium rounded-lg hover:opacity-90 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
          >
            <Mail className="w-5 h-5 mr-3" />
            {t.contact.email}
          </a>
          
          <a 
            href="https://calendly.com/lanettix101/30min" 
            className="flex items-center justify-center w-full sm:w-auto px-8 py-4 bg-brand-surface border border-brand-border text-brand-text font-medium rounded-lg hover:bg-brand-bg transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
          >
            <Calendar className="w-5 h-5 mr-3" />
            {t.contact.book}
          </a>
        </div>

        <div className="mt-16 pt-8 border-t border-brand-border flex flex-col md:flex-row items-center md:items-end justify-between gap-6 w-full">
          <div className="flex flex-col items-center md:items-start gap-4">
            <a href="https://github.com/lanettix101" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-brand-text font-medium hover:text-brand-primary transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary rounded-sm">
              <Github className="w-6 h-6" />
              <span>github.com/lanettix101</span>
            </a>
            <a href="https://instagram.com/lanetting_" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-brand-text font-medium hover:text-brand-primary transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary rounded-sm">
              <Instagram className="w-6 h-6" />
              <span>@lanetting_</span>
            </a>
            <a href="https://t.me/luiggilr" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-brand-text font-medium hover:text-brand-primary transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary rounded-sm">
              <Telegram className="w-6 h-6" />
              <span>Telegram</span>
            </a>
            <a href="https://www.linkedin.com/in/luis-lanetti/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-brand-text font-medium hover:text-brand-primary transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary rounded-sm">
              <Linkedin className="w-6 h-6" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
        <p className="mt-4 text-sm text-brand-accent text-center md:text-center">
          &copy; {new Date().getFullYear()} Ing. Luis Antonio Lanetti R. {t.contact.rights}
        </p>
      </div>
    </section>
  );
}
