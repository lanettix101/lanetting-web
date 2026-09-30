import {
  serviceImageSrcSet,
  pinnedImageSrcSet,
  projectHeroSizes,
  COVER_SMALL_MEDIA,
  COVER_PINNED_MOBILE_WIDTH,
  COVER_PINNED_DESKTOP_WIDTH,
} from '../../data/serviceImages';
import type { Project } from '../../data/portfolioData';

type HeroCoverProps = Pick<Project, 'img' | 'imgWidth' | 'imgMobile' | 'imgMobileWidth'>;

const LAYER =
  'w-full h-full object-cover transition-opacity duration-200 ease-out motion-reduce:transition-none';

export default function ProjectHeroCover({ img, imgWidth, imgMobile, imgMobileWidth }: HeroCoverProps) {
  const base = import.meta.env.BASE_URL;
  const responsive = serviceImageSrcSet(img, imgWidth);

  if (!imgMobile || !imgMobileWidth) {
    return (
      <picture className="absolute inset-0 block">
        <img
          src={`${base}${img}`}
          srcSet={responsive}
          sizes={projectHeroSizes}
          alt=""
          aria-hidden="true"
          className={LAYER}
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
      </picture>
    );
  }

  return (
    <>
      <picture className="absolute inset-0 block">
        <source
          media={COVER_SMALL_MEDIA}
          srcSet={pinnedImageSrcSet(imgMobile, COVER_PINNED_MOBILE_WIDTH)}
          sizes={projectHeroSizes}
        />
        <img
          src={`${base}${img}`}
          srcSet={responsive}
          sizes={projectHeroSizes}
          alt=""
          aria-hidden="true"
          className={`${LAYER} cover-portrait`}
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
      </picture>
      <picture className="absolute inset-0 block">
        <source
          media={COVER_SMALL_MEDIA}
          srcSet={pinnedImageSrcSet(img, COVER_PINNED_DESKTOP_WIDTH)}
          sizes={projectHeroSizes}
        />
        <img
          src={`${base}${img}`}
          srcSet={responsive}
          sizes={projectHeroSizes}
          alt=""
          aria-hidden="true"
          className={`${LAYER} cover-landscape`}
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
      </picture>
    </>
  );
}
