import HeroTerminal from '../terminal/HeroTerminal';
import type { TerminalLanguage, TerminalThemeName } from '../terminal/heroTerminalData';

interface HeroCarouselProps {
  theme: TerminalThemeName;
  language: TerminalLanguage;
  ariaLabel: string;
}

export default function HeroCarousel({ theme, language, ariaLabel }: HeroCarouselProps) {
  // FUTURO (Fase 8 — integración posterior de imágenes webp):
  // El hero pasará a una rotación en carrusel por blur donde un grupo de webp
  // (imágenes que se añadirán al repo posteriormente, ej. public/hero/*.webp)
  // se funden (opacity + filter: blur) para dar lugar a la consola animada.
  // Al terminar la animación de la consola (computeTerminalCycleMs(language)),
  // el carrusel hace crossfade a la siguiente webp, y así en bucle entre
  // imágenes y consola. Las constantes HERO_CAROUSEL_BLUR_PX/FADE_MS y la lista
  // HERO_CAROUSEL_WEBPS (hoy vacía) en src/data/heroCarouselConfig.ts se consumirán aquí.
  //
  // Este componente NO se monta mientras HERO_CAROUSEL_WEBPS esté vacío (ver HeroVisual).
  return (
    <div className="relative w-full">
      <HeroTerminal theme={theme} language={language} ariaLabel={ariaLabel} />
    </div>
  );
}