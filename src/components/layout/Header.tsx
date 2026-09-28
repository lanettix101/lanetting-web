import { Moon, Sun, Terminal, Globe } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageContext';

export default function Header() {
  const [isDark, setIsDark] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [isRetro, setIsRetro] = useState(false);
  const { t, language, toggleLanguage } = useLanguage();

  useEffect(() => {
    const root = document.documentElement;
    if (isRetro) {
      root.classList.add('retro');
      root.classList.remove('dark');
    } else {
      root.classList.remove('retro');
      if (isDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
  }, [isDark, isRetro]);

  const handleThemeToggle = () => {
    if (isRetro) {
      setIsRetro(false);
      setClickCount(0);
      return;
    }

    const newCount = clickCount + 1;
    if (newCount === 5) {
      setIsRetro(true);
      setClickCount(0);
    } else {
      setClickCount(newCount);
      setIsDark(!isDark);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-brand-border bg-brand-bg/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-2 font-bold text-brand-primary tracking-tight hover:opacity-80 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary rounded-sm">
          <Terminal className="h-5 w-5" />
          <span>Eng. Luis Lanetti</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-brand-accent">
          <Link to="/#timeline" className="hover:text-brand-primary transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary rounded-sm">{t.nav.journey}</Link>
          <Link to="/#services" className="hover:text-brand-primary transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary rounded-sm">{t.nav.services}</Link>
          <Link to="/portfolio" className="hover:text-brand-primary transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary rounded-sm">{t.nav.portfolio}</Link>
          <Link to="/#platforms" className="hover:text-brand-primary transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary rounded-sm">{t.nav.platforms}</Link>
          <Link to="/#contact" className="hover:text-brand-primary transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary rounded-sm">{t.nav.contact}</Link>
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 p-2 rounded-md hover:bg-brand-surface border border-transparent hover:border-brand-border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary text-brand-primary font-mono text-sm font-bold uppercase"
            aria-label="Toggle language"
          >
            <Globe className="h-4 w-4" />
            {language}
          </button>
          
          <button
            onClick={handleThemeToggle}
            className="p-2 rounded-md hover:bg-brand-surface border border-transparent hover:border-brand-border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
            aria-label="Toggle theme"
          >
            {isRetro ? <Terminal className="h-5 w-5 text-brand-primary" /> : (isDark ? <Sun className="h-5 w-5 text-brand-primary" /> : <Moon className="h-5 w-5 text-brand-primary" />)}
          </button>
        </div>
      </div>
    </header>
  );
}
