const WIDTHS = [640, 1024, 1280, 1440, 1920, 2560, 3072] as const;
const MOBILE_WIDTHS = [480, 640, 828, 1080, 1280] as const;

const base = import.meta.env.BASE_URL;

const DETAIL_SIZES =
  '(min-width: 2560px) 2478px, (min-width: 1920px) 2478px, (min-width: 1280px) 96vw, (min-width: 640px) 94vw, calc(100vw - 34px)';

const CARD_SIZES =
  '(min-width: 2560px) 785px, (min-width: 1920px) 588px, (min-width: 1440px) 440px, (min-width: 1280px) 391px, (min-width: 1024px) 313px, (min-width: 768px) 230px, 302px';

const PORTFOLIO_CARD_SIZES =
  '(min-width: 2560px) 785px, (min-width: 1920px) 588px, (min-width: 1440px) 440px, (min-width: 1280px) 391px, (min-width: 1024px) 310px, (min-width: 640px) 483px, calc(100vw - 32px)';

export const serviceDetailSizes = DETAIL_SIZES;
export const serviceCardSizes = CARD_SIZES;
export const portfolioCardSizes = PORTFOLIO_CARD_SIZES;

export const MOBILE_PORTRAIT_MEDIA = '(max-width: 768px) and (orientation: portrait)';

export const projectHeroSizes = '100vw';

export function serviceImageSrcSet(img: string, naturalWidth: number): string {
  const stem = img.replace(/\.webp$/, '');
  const candidates = WIDTHS.filter((w) => w < naturalWidth).map(
    (w) => `${base}${stem}_${w}.webp ${w}w`,
  );
  candidates.push(`${base}${img} ${naturalWidth}w`);
  return candidates.join(', ');
}

export function mobileCoverSrcSet(img: string, naturalWidth: number): string {
  const stem = img.replace(/\.webp$/, '');
  const candidates = MOBILE_WIDTHS.filter((w) => w < naturalWidth).map(
    (w) => `${base}${stem}_${w}.webp ${w}w`,
  );
  candidates.push(`${base}${img} ${naturalWidth}w`);
  return candidates.join(', ');
}
