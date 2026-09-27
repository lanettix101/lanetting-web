import { Link } from 'react-router-dom';
import { Github, Instagram, Linkedin } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { contactInfo } from '../../data/contactInfo';

const Telegram = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 10l-4 4l6 6l4 -16l-18 7l4 2l2 6l3 -4" />
  </svg>
);

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="mt-16 pt-8 border-t border-brand-border">
      <div className="container mx-auto px-4 max-w-4xl flex flex-col items-center gap-6">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          <a href={contactInfo.social.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-brand-text font-medium hover:text-brand-primary transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary rounded-sm">
            <Github className="w-5 h-5" />
            <span className="text-sm">Lanettix101</span>
          </a>
          <a href={contactInfo.social.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-brand-text font-medium hover:text-brand-primary transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary rounded-sm">
            <Instagram className="w-5 h-5" />
            <span className="text-sm">@lanetting_</span>
          </a>
          <a href={contactInfo.social.telegram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-brand-text font-medium hover:text-brand-primary transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary rounded-sm">
            <Telegram className="w-5 h-5" />
            <span className="text-sm">@Luiggilr</span>
          </a>
          <a href={contactInfo.social.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-brand-text font-medium hover:text-brand-primary transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary rounded-sm">
            <Linkedin className="w-5 h-5" />
            <span className="text-sm">Luis Lanetti</span>
          </a>
        </div>

        <p className="text-sm text-brand-accent text-center">
          &copy; {new Date().getFullYear()} {contactInfo.fullName} {t.footer.rights}
        </p>

        <nav aria-label={t.footer.legalLabel} className="mt-1 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
          <Link to="/privacy" className="text-sm text-brand-accent hover:text-brand-primary transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary rounded-sm">
            {t.footer.privacy}
          </Link>
          <span className="text-brand-accent/50" aria-hidden="true">|</span>
          <Link to="/terms" className="text-sm text-brand-accent hover:text-brand-primary transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary rounded-sm">
            {t.footer.terms}
          </Link>
        </nav>
      </div>
    </footer>
  );
}
