import { useEffect, useState } from 'react';

export type Theme = 'light' | 'dark' | 'retro';

function resolveTheme(): Theme {
  const root = document.documentElement;
  if (root.classList.contains('retro')) return 'retro';
  if (root.classList.contains('dark')) return 'dark';
  return 'light';
}

export function useTheme(): Theme {
  const [theme, setTheme] = useState<Theme>(resolveTheme);

  useEffect(() => {
    const update = () => setTheme(resolveTheme());
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    return () => observer.disconnect();
  }, []);

  return theme;
}