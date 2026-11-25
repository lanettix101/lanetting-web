export type Lang = 'en' | 'es';

export interface SEOEntry {
  title: { en: string; es: string };
  description: { en: string; es: string };
  keywords: { en: string; es: string };
  path: string;
  noindex?: boolean;
  ogImage?: string;
  ogImageWidth?: number;
  ogImageHeight?: number;
}

export const SEO_STATIC_ROUTES: SEOEntry[] = [
  {
    path: '/',
    title: { en: 'Full-Stack Software Engineer | Web Applications & Automation Specialist', es: 'Ingeniero de Software Full-Stack | Especialista en Aplicaciones Web y Automatización' },
    description: {
      en: 'Full-Stack Software Engineer building web applications and custom software with React, TypeScript, Node.js and modern frontend/backend technologies.',
      es: 'Desarrollador fullstack que crea aplicaciones web y software a medida con React, TypeScript, Node.js y tecnologías frontend/backend modernas.',
    },
    keywords: {
      en: 'fullstack developer, web development, software development, React, TypeScript, Node.js, web applications, custom software',
      es: 'desarrollador fullstack, desarrollo web, desarrollo de software, React, TypeScript, Node.js, aplicaciones web, software a medida',
    },
    ogImage: 'thumbnail.webp',
    ogImageWidth: 900,
    ogImageHeight: 1124,
  },
  {
    path: '/portfolio',
    title: { en: 'Portfolio | Full-Stack Software Engineer', es: 'Portfolio | Ingeniero de Software Full-Stack' },
    description: {
      en: 'Selected projects by Luis Lanetti: web development, software engineering, automation and technical tooling.',
      es: 'Proyectos seleccionados de Luis Lanetti: desarrollo web, ingeniería de software, automatización y herramientas técnicas.',
    },
    keywords: {
      en: 'portfolio, fullstack developer, web projects, software projects, Luis Lanetti, React, TypeScript',
      es: 'portfolio, desarrollador fullstack, proyectos web, proyectos de software, Luis Lanetti, React, TypeScript',
    },
  },
  {
    path: '/privacy',
    title: { en: 'Privacy Policy | Eng. Luis Lanetti', es: 'Política de Privacidad | Ing. Luis Lanetti' },
    description: {
      en: 'Privacy policy of Luis Lanetti’s website. No cookies, no analytics, no third-party tracking.',
      es: 'Política de privacidad del sitio web de Luis Lanetti. Sin cookies, sin analítica, sin rastreo de terceros.',
    },
    keywords: { en: 'privacy policy', es: 'política de privacidad' },
  },
  {
    path: '/terms',
    title: { en: 'Terms of Service | Eng. Luis Lanetti', es: 'Términos y Condiciones | Ing. Luis Lanetti' },
    description: {
      en: 'Terms of service for Luis Lanetti’s website and freelance services.',
      es: 'Términos y condiciones del sitio web y servicios freelance de Luis Lanetti.',
    },
    keywords: { en: 'terms of service', es: 'términos y condiciones' },
  },
  {
    path: '*',
    title: { en: 'Not Found | Eng. Luis Lanetti', es: 'No Encontrado | Ing. Luis Lanetti' },
    description: {
      en: 'The requested page could not be found.',
      es: 'La página solicitada no se pudo encontrar.',
    },
    keywords: { en: '404 not found', es: '404 no encontrado' },
    noindex: true,
  },
];

export function getSEOByPath(path: string): SEOEntry | undefined {
  return SEO_STATIC_ROUTES.find((route) => route.path === path || route.path === '*');
}

export function projectSEO(project: {
  slug: string;
  title: { en: string; es: string };
  summary: { en: string; es: string };
  img?: string;
  imgWidth?: number;
  imgHeight?: number;
}): SEOEntry {
  return {
    path: `/portfolio/${project.slug}`,
    title: {
      en: `${project.title.en} | Eng. Luis Lanetti | Full-Stack Software Engineer`,
      es: `${project.title.es} | Ing. Luis Lanetti | Ingeniero de Software Full-Stack`,
    },
    description: { en: project.summary.en, es: project.summary.es },
    keywords: {
      en: 'project, portfolio, web development, software development, fullstack',
      es: 'proyecto, portfolio, desarrollo web, desarrollo de software, fullstack',
    },
    ogImage: project.img,
    ogImageWidth: project.imgWidth,
    ogImageHeight: project.imgHeight,
  };
}
