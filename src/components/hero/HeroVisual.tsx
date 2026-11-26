import { lazy, Suspense } from 'react';
import type { TerminalLanguage, TerminalThemeName } from '../terminal/heroTerminalData';
import HeroTerminal from '../terminal/HeroTerminal';
import { HERO_CAROUSEL_WEBPS } from '../../data/heroCarouselConfig';

const HeroCarousel = lazy(() => import('../carousel/HeroCarousel'));

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
    return (
      <Suspense fallback={<HeroTerminal theme={theme} language={language} ariaLabel={ariaLabel} />}>
        <HeroCarousel language={language} ariaLabel={ariaLabel} />
      </Suspense>
    );
  }
  return <HeroTerminal theme={theme} language={language} ariaLabel={ariaLabel} />;
}
