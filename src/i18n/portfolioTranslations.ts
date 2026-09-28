interface PortfolioStrings {
  command: string;
  title: string;
  desc: string;
  metaDescription: string;
  empty: string;
  serviceRelatedTitle: string;
  serviceRelatedDesc: string;
  card: {
    knowMore: string;
  };
  detail: {
    back: string;
    challengeTitle: string;
    solutionTitle: string;
    workflowTitle: string;
    benefitsTitle: string;
    stackTitle: string;
    relatedTitle: string;
    notFoundTitle: string;
    notFoundDesc: string;
  };
}

export const portfolioTranslations: { en: PortfolioStrings; es: PortfolioStrings } = {
  en: {
    command: 'ls ./portfolio',
    title: 'Selected Projects',
    desc: 'Products, tools and automation I designed, built and maintain end to end.',
    metaDescription:
      'Selected projects by Luis Lanetti: web design, automation bots and technical tooling.',
    empty: 'No projects published yet.',
    serviceRelatedTitle: 'Related Projects',
    serviceRelatedDesc: 'Projects where this capability is already implemented, with the repository and the technical breakdown.',
    card: {
      knowMore: 'Know more',
    },
    detail: {
      back: 'Back to Portfolio',
      challengeTitle: 'The Challenge',
      solutionTitle: 'The Solution',
      workflowTitle: 'How It Works',
      benefitsTitle: 'What It Delivers',
      stackTitle: 'Technology Stack',
      relatedTitle: 'Related Services',
      notFoundTitle: 'Project Not Found',
      notFoundDesc: 'The requested project could not be located.',
    },
  },
  es: {
    command: 'ls ./portfolio',
    title: 'Proyectos Seleccionados',
    desc: 'Productos, herramientas y automatizaciones que diseñé, construí y mantengo vigentes.',
    metaDescription:
      'Proyectos de Luis Lanetti: diseño web, bots de automatización y herramientas técnicas.',
    empty: 'Aún no hay proyectos publicados.',
    serviceRelatedTitle: 'Proyectos Relacionados',
    serviceRelatedDesc: 'Proyectos donde esta capacidad ya está implementada, con el repositorio y el desglose técnico.',
    card: {
      knowMore: 'Conoce más',
    },
    detail: {
      back: 'Volver al Portfolio',
      challengeTitle: 'El Desafío',
      solutionTitle: 'La Solución',
      workflowTitle: 'Cómo Funciona',
      benefitsTitle: 'Qué Aporta',
      stackTitle: 'Stack Tecnológico',
      relatedTitle: 'Servicios Relacionados',
      notFoundTitle: 'Proyecto No Encontrado',
      notFoundDesc: 'No se pudo localizar el proyecto solicitado.',
    },
  },
};
