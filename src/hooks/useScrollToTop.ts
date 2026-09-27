import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Resets scroll to the top of the document on route navigation.
 *
 * Browsers restore the previous scroll offset on SPA navigations, so landing on a
 * route from the footer (which sits at the bottom) would otherwise mount the page
 * scrolled down. Uses `instant` because the global `scroll-behavior: smooth` in
 * index.css would otherwise animate a long jump from the bottom of the page.
 *
 * Skipped when a hash is present so in-page anchors keep winning. `hash` stays in the
 * dependency list (rather than being deliberately omitted) so the early return
 * neutralises hash-only navigations without tripping exhaustive-deps.
 */
export function useScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname, hash]);
}
