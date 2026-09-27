import { useEffect } from 'react';
import { SITE_URL, contactInfo } from '../data/contactInfo';

function upsertMeta(key: 'name' | 'property', keyValue: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${key}="${keyValue}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(key, keyValue);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
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
  noindex?: boolean;
}

export function useDocumentMeta({ title, metaDescription, path, noindex = false }: DocumentMeta) {
  useEffect(() => {
    const fullTitle = `${title} | ${contactInfo.fullName}`;
    const canonical = `${SITE_URL}${path}`;

    document.title = fullTitle;
    upsertCanonical(canonical);
    upsertMeta('name', 'robots', noindex ? 'noindex, follow' : 'index, follow');
    upsertMeta('name', 'description', metaDescription);
    upsertMeta('property', 'og:title', fullTitle);
    upsertMeta('property', 'og:description', metaDescription);
    upsertMeta('property', 'og:url', canonical);
    upsertMeta('name', 'twitter:title', fullTitle);
    upsertMeta('name', 'twitter:description', metaDescription);
    upsertMeta('name', 'twitter:url', canonical);
  }, [title, metaDescription, path, noindex]);
}
