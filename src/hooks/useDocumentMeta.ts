import { useEffect } from 'react';
import { SITE_URL, contactInfo } from '../data/contactInfo';
import type { Lang } from '../data/seoData';

function upsertMeta(key: 'name' | 'property', keyValue: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${key}="${keyValue}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(key, keyValue);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function removeMeta(key: 'name' | 'property', keyValue: string) {
  document.head.querySelector(`meta[${key}="${keyValue}"]`)?.remove();
}

function upsertCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.rel = 'canonical';
    document.head.appendChild(el);
  }
  el.href = href;
}

export interface DocumentMeta {
  title: string;
  metaDescription: string;
  path: string;
  lang?: Lang;
  keywords?: string;
  noindex?: boolean;
  ogImage?: string;
  ogImageWidth?: number;
  ogImageHeight?: number;
}

export function useDocumentMeta({
  title,
  metaDescription,
  path,
  lang = 'en',
  keywords,
  noindex = false,
  ogImage,
  ogImageWidth,
  ogImageHeight,
}: DocumentMeta) {
  useEffect(() => {
    const fullTitle = `${title} | ${contactInfo.shortName}`;
    const canonical = `${SITE_URL}${path}`;
    const locale = lang === 'es' ? 'es_VE' : 'en_US';

    document.title = fullTitle;
    document.documentElement.lang = lang;
    upsertCanonical(canonical);
    upsertMeta('name', 'robots', noindex ? 'noindex, follow' : 'index, follow');
    upsertMeta('name', 'description', metaDescription);
    if (keywords) {
      upsertMeta('name', 'keywords', keywords);
    }
    upsertMeta('property', 'og:title', fullTitle);
    upsertMeta('property', 'og:description', metaDescription);
    upsertMeta('property', 'og:url', canonical);
    upsertMeta('property', 'og:locale', locale);
    upsertMeta('name', 'twitter:title', fullTitle);
    upsertMeta('name', 'twitter:description', metaDescription);
    upsertMeta('name', 'twitter:url', canonical);

    if (ogImage) {
      const absoluteImage = ogImage.startsWith('http') ? ogImage : `${SITE_URL}/${ogImage}`;
      upsertMeta('property', 'og:image', absoluteImage);
      upsertMeta('name', 'twitter:image', absoluteImage);
      if (ogImageWidth && ogImageHeight) {
        upsertMeta('property', 'og:image:width', String(ogImageWidth));
        upsertMeta('property', 'og:image:height', String(ogImageHeight));
      } else {
        removeMeta('property', 'og:image:width');
        removeMeta('property', 'og:image:height');
      }
    } else {
      removeMeta('property', 'og:image');
      removeMeta('property', 'og:image:width');
      removeMeta('property', 'og:image:height');
      removeMeta('name', 'twitter:image');
    }
  }, [title, metaDescription, path, lang, keywords, noindex, ogImage, ogImageWidth, ogImageHeight]);
}
