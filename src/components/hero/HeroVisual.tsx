import type { TerminalLanguage, TerminalThemeName } from '../terminal/heroTerminalData';
import HeroTerminal from '../terminal/HeroTerminal';
import HeroCarousel from '../carousel/HeroCarousel';
import { HERO_CAROUSEL_WEBPS } from '../../data/heroCarouselConfig';

export type HeroVisualSource = 'terminal' | 'carousel';

interface HeroVisualProps {
  theme: TerminalThemeName;
  language: TerminalLanguage;
  ariaLabel: string;
}

export function heroVisualSource(): HeroVisualSource {
  return HERO_CAROUSEL_WEBPS.length > 0 ? 'carousel' : 'terminal';
}

export default function HeroVisual({ theme, language, ariaLabel }: HeroVisualProps) {
  if (heroVisualSource() === 'carousel') {
    return <HeroCarousel theme={theme} language={language} ariaLabel={ariaLabel} />;
  }
  return <HeroTerminal theme={theme} language={language} ariaLabel={ariaLabel} />;
}