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
  contact: {
    hireButton: string;
    licenseButton: string;
    hirePitch: string;
    licensePitch: string;
    whatsapp: string;
    email: string;
    hireMessage: string;
    hireSubject: string;
    licenseMessage: string;
    licenseSubject: string;
  };
}

export const portfolioTranslations: { en: PortfolioStrings; es: PortfolioStrings } = {
  en: {
    command: 'ls ./portfolio',
    title: 'My Projects',
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
    contact: {
      hireButton: 'Commission yours!',
      licenseButton: 'Tool available',
      hirePitch: 'Need something similar for your project? I build you a version tailored to your needs.',
      licensePitch: 'This tool is available for you to acquire a private copy.',
      whatsapp: 'Message me on WhatsApp',
      email: 'Send me an email',
      hireMessage:
        'Hello Eng. Lanetti, I saw your {project} project and I would love for us to build something similar. Could we talk for a few minutes about the vision I have?',
      hireSubject: 'I saw your {project} project and I am interested',
      licenseMessage:
        'Hello Eng. Lanetti, I saw the {project} project and I would like to get a copy for my own use. Could we talk for a few minutes about how I can acquire a private version?',
      licenseSubject: 'I am interested in a copy of {project}',
    },
  },
  es: {
    command: 'ls ./portfolio',
    title: 'Conoce mis Proyectos',
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
    contact: {
      hireButton: '¡Encarga el tuyo!',
      licenseButton: 'Herramienta disponible',
      hirePitch: '¿Necesitas algo parecido para tu proyecto? Te desarrollo una versión a la medida.',
      licensePitch: 'Esta herramienta está disponible para adquirir una copia privada.',
      whatsapp: 'Escríbeme por WhatsApp',
      email: 'Envíame un mail',
      hireMessage:
        'Saludos, Ing. Lanetti. Vi tu proyecto {project} y me gustaría que desarrollemos algo similar. ¿Podemos conversar unos minutos sobre la visión que tengo?',
      hireSubject: 'He visto tu proyecto {project} y me interesa',
      licenseMessage:
        'Saludos, Ing. Lanetti. He visto el proyecto {project} y me gustaría conseguir una copia para mi uso. ¿Podemos conversar unos minutos sobre cómo puedo adquirir una versión privada?',
      licenseSubject: 'Me interesa una copia de {project}',
    },
  },
};
