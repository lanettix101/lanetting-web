import { contactInfo, SITE_URL } from '../data/contactInfo';

export type Localised = { en: string; es: string };

export type LegalBlock =
  | { kind: 'p'; text: Localised }
  | { kind: 'ul'; items: Localised[] }
  | { kind: 'note'; text: Localised };

export interface LegalSection {
  id: string;
  heading: Localised;
  blocks: LegalBlock[];
}

export interface LegalDocument {
  command: Localised;
  title: Localised;
  description: Localised;
  effectiveDate: string;
  sections: LegalSection[];
}

export const retentionPeriods = {
  enquiries: '12 months',
  clientTechnicalData: '30 days after the engagement ends',
} as const;

export const legal: { privacy: LegalDocument; terms: LegalDocument } = {
  privacy: {
    effectiveDate: '2026-09-26',
    command: { en: 'cat /legal/privacy.md', es: 'cat /legal/privacidad.md' },
    title: {
      en: 'Privacy Policy',
      es: 'Política de Privacidad',
    },
    description: {
      en: 'How Eng. Luis Lanetti handles personal data. This site sets no cookies, runs no analytics and stores nothing on your device.',
      es: 'Cómo maneja el Ing. Luis Lanetti los datos personales. Este sitio no instala cookies, no usa analítica y no almacena nada en tu dispositivo.',
    },
    sections: [
      {
        id: 'who-i-am',
        heading: {
          en: 'Who I am and what this policy covers',
          es: 'Quién soy y qué cubre esta política',
        },
        blocks: [
          {
            kind: 'p',
            text: {
              en: `This policy explains how I handle personal data. My name is ${contactInfo.fullName}, an independent software and infrastructure engineer residing in ${contactInfo.country}. I offer professional services as a natural person, not through a registered company, and I act as the data controller for the business contacts I hold.`,
              es: `Esta política explica cómo manejo los datos personales. Mi nombre es ${contactInfo.fullName}, ingeniero de software e infraestructura independiente, radicado en ${contactInfo.country}. Ofrezco servicios profesionales como persona natural, no a través de una empresa constituida, y actúo como controlador de los datos de contacto de mi actividad.`,
            },
          },
          {
            kind: 'p',
            text: {
              en: `It applies to this website, published at ${SITE_URL}, and to the personal data you share with me when you contact me. Where I handle data on behalf of a client under a service agreement, I act as a processor for that data and the client's own privacy policy applies to it.`,
              es: `Se aplica a este sitio web, publicado en ${SITE_URL}, y a los datos personales que compartes conmigo cuando me contactas. Cuando manejo datos en nombre de un cliente bajo un contrato de servicios, actúo como encargado de esos datos y prevalece la política de privacidad del propio cliente.`,
            },
          },
        ],
      },
      {
        id: 'what-this-site-does-not-do',
        heading: {
          en: 'What this website does not do',
          es: 'Lo que este sitio web no hace',
        },
        blocks: [
          {
            kind: 'note',
            text: {
              en: 'This website sets no cookies, runs no analytics or tracking, and stores nothing on your device. Your theme and language preference are not saved between visits, so the site cannot recognise you as a returning visitor.',
              es: 'Este sitio web no instala cookies, no ejecuta analítica ni rastreo, y no almacena nada en tu dispositivo. Tu preferencia de tema e idioma no se guarda entre visitas, por lo que el sitio no puede reconocerte como visitante recurrente.',
            },
          },
          {
            kind: 'p',
            text: {
              en: 'Concretely, the site:',
              es: 'En concreto, el sitio:',
            },
          },
          {
            kind: 'ul',
            items: [
              {
                en: 'sets no cookies and reads no cookies;',
                es: 'no instala ni lee cookies;',
              },
              {
                en: 'does not write to localStorage, sessionStorage or IndexedDB;',
                es: 'no escribe en localStorage, sessionStorage ni IndexedDB;',
              },
              {
                en: 'loads no analytics, tag manager, pixel, beacon or session-recording script;',
                es: 'no carga scripts de analítica, tag manager, pixels, beacons ni grabación de sesión;',
              },
              {
                en: 'loads no external web fonts, stylesheets, scripts or images; every asset is served from this site\'s own domain;',
                es: 'no carga fuentes, hojas de estilo, scripts ni imágenes externas; todos los recursos se sirven desde el dominio del propio sitio;',
              },
              {
                en: 'embeds no third-party content, no video, and no social media widgets.',
                es: 'no incrusta contenido de terceros, ni vídeo, ni widgets de redes sociales.',
              },
            ],
          },
          {
            kind: 'p',
            text: {
              en: 'These are not intentions but verifiable facts: the site is built from open source libraries and its full source is inspectable. If this ever changes, this policy is updated before the change goes live, and the effective date below changes accordingly.',
              es: 'No son intenciones sino hechos verificables: el sitio está construido con librerías de código abierto y su código fuente es inspeccionable. Si esto cambia, esta política se actualiza antes de que el cambio se publique, y la fecha de vigencia que aparece más abajo se modifica en consecuencia.',
            },
          },
        ],
      },
      {
        id: 'when-you-contact-me',
        heading: {
          en: 'What happens when you contact me',
          es: 'Qué ocurre cuando me contactas',
        },
        blocks: [
          {
            kind: 'p',
            text: {
              en: 'This website has no contact form and no server of its own. Every contact route hands you off to a third-party service, and each one sends me information about you:',
              es: 'Este sitio web no tiene formulario de contacto ni servidor propio. Toda vía de contacto te traslada a un servicio de terceros, y cada uno me envía información sobre ti:',
            },
          },
          {
            kind: 'ul',
            items: [
              {
                en: `Email. The "Email Me" button opens your own mail application and does not transmit anything through this site. Whatever you write becomes part of an email conversation in my inbox, hosted on a Google account in the United States.`,
                es: `Correo electrónico. El botón "Envíame un correo" abre tu propia aplicación de correo y no transmite nada a través de este sitio. Lo que escribas pasa a formar parte de una conversación de correo en mi bandeja de entrada, alojada en una cuenta de Google en Estados Unidos.`,
              },
              {
                en: `Scheduling. The "Book a Meeting" button opens Calendly (calendly.com, United States). Calendly collects and processes the information you enter in its booking form, including your name, email, timezone and any note you add, under Calendly's own privacy policy.`,
                es: `Agenda. El botón "Agendar una llamada" abre Calendly (calendly.com, Estados Unidos). Calendly recopila y procesa la información que ingieres en su formulario de reserva (nombre, correo, franja horaria y cualquier nota que añadas) conforme a su propia política de privacidad.`,
              },
              {
                en: `Messaging. The floating WhatsApp button opens a chat with me on WhatsApp, operated by Meta Platforms Ireland Limited. The conversation is stored on Meta's infrastructure and is subject to Meta's privacy policy and the law of Ireland.`,
                es: `Mensajería. El botón flotante de WhatsApp abre un chat conmigo en WhatsApp, operado por Meta Platforms Ireland Limited. La conversación se almacena en la infraestructura de Meta y está sujeta a la política de privacidad de Meta y a la legislación irlandesa.`,
              },
              {
                en: `Freelance marketplaces. Links to Legiit, Contra, Upwork and Workana take you to those platforms, each of which has its own privacy policy and, where relevant, its own payment and identity verification processes.`,
                es: `Plataformas de freelance. Los enlaces a Legiit, Contra, Upwork y Workana te llevan a esas plataformas, cada una con su propia política de privacidad y, cuando corresponda, sus propios procesos de pago y verificación de identidad.`,
              },
            ],
          },
          {
            kind: 'note',
            text: {
              en: 'I only ask for the information needed to evaluate and deliver a project. Please do not send passwords, API keys, private keys, card details or identity documents before a contract exists.',
              es: 'Solo solicito la información necesaria para evaluar y ejecutar un proyecto. Por favor no envíes contraseñas, claves de API, claves privadas, datos de tarjetas ni documentos de identidad antes de que exista un contrato.',
            },
          },
        ],
      },
      {
        id: 'client-data',
        heading: {
          en: 'Data I handle during client engagements',
          es: 'Datos que manejo con el cliente',
        },
        blocks: [
          {
            kind: 'p',
            text: {
              en: 'Infrastructure, security and automation work frequently requires access to client systems. Where a client engages me to work on their environment, I act as a data processor on their behalf. I process their data only on their documented instructions, for the purpose agreed in the service agreement, and no other.',
              es: 'El trabajo de infraestructura, seguridad y automatización requiere regularmente acceso a los sistemas del cliente. Cuando un cliente me contrata para trabajar en su entorno, actúo como encargado del tratamiento de sus datos por cuenta propia. Solo proceso sus datos conforme a sus instrucciones documentadas, para la finalidad acordada en el contrato de servicios, y para ningún otro fin.',
            },
          },
          {
            kind: 'p',
            text: {
              en: 'This typically includes the following, depending on the engagement:',
              es: 'Esto suele incluir lo siguiente, según el alcance del trabajo:',
            },
          },
          {
            kind: 'ul',
            items: [
              {
                en: 'server IP addresses, hostnames, domain and DNS configuration;',
                es: 'direcciones IP de servidores, nombres de host, dominio y configuración DNS;',
              },
              {
                en: 'administrator usernames, credential material needed to perform the work, and configuration or deployment files;',
                es: 'usuarios administradores, material de credenciales necesario para ejecutar el trabajo, y archivos de configuración o despliegue;',
              },
              {
                en: 'website content, analytics or search-console data where relevant to an SEO or performance engagement;',
                es: 'contenido web, datos de analítica o de consola de búsqueda cuando sean relevantes para un trabajo de SEO o rendimiento;',
              },
              {
                en: 'server, application or security logs where relevant to an incident response or migration engagement.',
                es: 'registros de servidor, aplicación o seguridad cuando sean relevantes para una respuesta a incidentes o una migración.',
              },
            ],
          },
          {
            kind: 'p',
            text: {
              en: 'Some of this may be personal data belonging to the client\'s own users or customers. For the duration of the engagement I apply the measures a competent security professional would apply regardless of contract: access limited to what the task requires, credentials used only for the purpose they were provided and never shared or reused, unencrypted channels avoided where an encrypted one is available, and no client data copied to my personal devices for convenience. Access is revoked and any residual credentials are deleted when the engagement ends, unless the contract or the client\'s security requirements state otherwise.',
              es: 'Parte de estos datos puede ser información personal perteneciente a los propios usuarios o clientes del cliente que me contrata. Durante la vigencia del trabajo aplico las medidas que aplicaría cualquier profesional de seguridad competente con independencia del contrato: acceso limitado a lo que la tarea exige, credenciales usadas solo para el fin que fueron entregadas y nunca compartidas ni reutilizadas, evitación de canales sin cifrado cuando existe uno cifrado, y ningún dato del cliente almacenado en mis dispositivos personales por comodidad. El acceso se revoca y las credenciales residuales se eliminan al finalizar el trabajo, salvo que el contrato o los requisitos de seguridad del cliente indiquen lo contrario.',
            },
          },
          {
            kind: 'p',
            text: {
              en: 'If a security incident affecting client data occurs, I notify the client without undue delay so that the client, as controller, can meet its own notification obligations. I do not independently assess or disclose to any authority.',
              es: 'Si ocurre un incidente de seguridad que afecte datos de un cliente, se lo notifico sin demora indebida para que el cliente, como controlador, pueda cumplir sus propias obligaciones de notificación. No evalúo ni revelo ante ninguna autoridad por cuenta propia.',
            },
          },
        ],
      },
      {
        id: 'hosting',
        heading: {
          en: 'Hosting and server logs',
          es: 'Alojamiento y registros del servidor',
        },
        blocks: [
          {
            kind: 'p',
            text: {
              en: `This site is hosted on GitHub Pages. GitHub, Inc., a company in the United States, serves the files and acts as a processor for the limited purpose of delivering them. Like any web host, GitHub processes technical request data — such as IP address, user agent, requested URL and timestamp — in the course of serving a page, under its own privacy statement and infrastructure security practices.`,
              es: `Este sitio está alojado en GitHub Pages. GitHub, Inc., empresa con sede en Estados Unidos, sirve los archivos y actúa como encargado del tratamiento únicamente para ese fin. Como cualquier proveedor de hosting, GitHub procesa datos técnicos de la solicitud (como dirección IP, User Agents, URL solicitada y marcas de tiempo) para servir la página, conforme a su propia declaración de privacidad y sus prácticas de seguridad de infraestructura.`,
            },
          },
          {
            kind: 'p',
            text: {
              en: 'I have no access to those logs, no server-side application, no database and no session store. I cannot identify visitors from this site, and I do not attempt to.',
              es: 'No tengo acceso a esos registros, ni al servidor como tal, ni bases de datos asociadas, ni a datos de sesiones. No puedo identificar a los visitantes de este sitio, y no lo intento.',
            },
          },
        ],
      },
      {
        id: 'transfers',
        heading: {
          en: 'International transfers',
          es: 'Transferencias internacionales',
        },
        blocks: [
          {
            kind: 'p',
            text: {
              en: 'I am established in Venezuela, outside the European Economic Area. Depending on where you are and on your relationship with me, the data described above crosses borders. The recipients outside Venezuela are:',
              es: 'Estoy establecido en Venezuela, fuera del Espacio Económico Europeo. Según dónde estés y cuál sea la condición de tu visita, los datos descritos antes cruzan fronteras. Los destinatarios fuera de Venezuela son:',
            },
          },
          {
            kind: 'ul',
            items: [
              {
                en: 'Google LLC, United States, for the email account in which enquiries and client correspondence are held;',
                es: 'Google LLC, Estados Unidos, por la cuenta de correo en la que se gestionan las consultas y la correspondencia con clientes;',
              },
              {
                en: 'GitHub, Inc., United States, for the hosting of this website;',
                es: 'GitHub, Inc., Estados Unidos, por el alojamiento de este sitio web;',
              },
              {
                en: 'Calendly LLC, United States, and Meta Platforms Ireland Limited, Ireland, for scheduling and messaging;',
                es: 'Calendly LLC, Estados Unidos, y Meta Platforms Ireland Limited, Irlanda, para la agenda y la mensajería;',
              },
              {
                en: 'the relevant marketplace operator, for contracts concluded there.',
                es: 'el operador de la plataforma donde contrates, si lo haces, para prestar el servicio.',
              },
            ],
          },
          {
            kind: 'p',
            text: {
              en: 'These transfers are necessary to deliver the service you asked for, which is the legal basis for making them. They are not used for any other purpose and I do not sell or share personal data with third parties for their own benefit. I will apply appropriate safeguards in any engagement with a client established in the European Economic Area.',
              es: 'Estos envíos de datos son necesarios para prestar el servicio solicitado, que es la base jurídica para efectuarlos. No se utilizan para ningún otro fin y no vendo ni comparto datos personales con terceros para su propio beneficio. Aplicaré las salvaguardas adecuadas en cualquier relación con un cliente establecido en el Espacio Económico Europeo.',
            },
          },
        ],
      },
      {
        id: 'retention',
        heading: {
          en: 'How long data is kept',
          es: 'Cuánto tiempo se conservan los datos',
        },
        blocks: [
          {
            kind: 'ul',
            items: [
              {
                en: `Data collected by this website: none, because none is collected.`,
                es: `Datos recopilados por este sitio web: ninguno, porque no se recopila ninguno.`,
              },
              {
                en: `Enquiries and project correspondence: ${retentionPeriods.enquiries}, after which I delete them.`,
                es: `Consultas y correspondencia de proyectos: ${retentionPeriods.enquiries}, tras lo cual las elimino.`,
              },
              {
                en: `Technical data and credentials received during client engagements: ${retentionPeriods.clientTechnicalData}, unless the contract or the client's retention requirements state otherwise.`,
                es: `Datos técnicos y credenciales recibidos durante el trabajo con clientes: ${retentionPeriods.clientTechnicalData}, salvo que el contrato o los requisitos de conservación del cliente indiquen lo contrario.`,
              },
              {
                en: 'Accounting and tax records, where I am obliged to keep them, for the period required by law.',
                es: 'Registros contables y fiscales, cuando esté obligado a conservarlos, durante el período exigido por la ley.',
              },
            ],
          },
        ],
      },
      {
        id: 'your-rights',
        heading: {
          en: 'Your rights',
          es: 'Tus derechos',
        },
        blocks: [
          {
            kind: 'p',
            text: {
              en: 'You may ask me to confirm whether I hold data about you, to correct it, to delete it, to restrict how I use it, to object to it, or to give you a portable copy. I respond without undue delay and in any case within 30 days of receiving the request.',
              es: 'Puedes pedirme que confirme si tengo datos sobre ti, que los corrija, que los elimine, que restrinja su uso, o que te entregue una copia portable. Respondo sin demora indebida y, en todo caso, dentro de los 30 días siguientes a la recepción de la solicitud.',
            },
          },
          {
            kind: 'p',
            text: {
              en: 'Send requests to the email address in the contact section, ideally from the same address you used to get in touch, so I can verify who you are before disclosing anything. I do not charge for this unless a request is manifestly unfounded or excessive.',
              es: `Envía las solicitudes a la dirección de correo de la sección de contacto, idealmente desde la misma dirección con la que te comunicaste originalmente, para que pueda verificar tu identidad antes de revelar nada. No cobro por ello salvo que la solicitud sea manifiestamente infundada o excesiva.`,
            },
          },
          {
            kind: 'p',
            text: {
              en: 'This website collects no data, so there is normally nothing held about you and no automated decision-making, profiling or automated access decision applies to you. If your data is held by one of the services listed above — for example a Calendly booking or a WhatsApp conversation — you must direct that request to that service, and I will assist you with a correction or deletion I am authorised to make.',
              es: 'Este sitio web no recopila datos, por lo que normalmente no hay nada almacenado sobre ti ni se aplica ninguna decisión automatizada, perfilado o decisión automatizada de acceso. Si tus datos están en poder de alguno de los servicios indicados arriba (por ejemplo una reserva en Calendly o una conversación en WhatsApp) debes dirigir la solicitud a ese servicio, y yo te ayudaré con la corrección o eliminación que me esté autorizado a realizar.',
            },
          },
          {
            kind: 'p',
            text: {
              en: `${contactInfo.country} has no comprehensive data protection statute in force equivalent to the European General Data Protection Regulation, so I do not present these as rights conferred by Venezuelan law. If you are in the European Economic Area, the GDPR may apply to data I process as a processor for a client, in which case the client is your contact point and the applicable rights are those of the GDPR. If you are in Brazil, Mexico, Colombia, Argentina or another jurisdiction with its own legislation, that legislation may give you additional or different rights, and I will honour them.`,
              es: `${contactInfo.country} no tiene en vigor una norma integral de protección de datos equivalente al Reglamento General de Protección de Datos de la Unión Europea, por lo que no presento estos derechos como conferidos por la legislación venezolana. Si estás en el Espacio Económico Europeo, el RGPD puede aplicarse a los datos que proceso como encargado de un cliente, en cuyo caso el cliente es tu punto de contacto y los derechos aplicables son los del RGPD. Si estás en Brasil, México, Colombia, Argentina u otra jurisdicción con legislación propia, esa legislación puede otorgarte derechos adicionales o distintos, y los respetaré según corresponda.`,
            },
          },
        ],
      },
      {
        id: 'children',
        heading: {
          en: 'Children',
          es: 'Menores de edad',
        },
        blocks: [
          {
            kind: 'p',
            text: {
              en: 'This website is a professional services portfolio. It is not directed at children, it does not knowingly collect data from anyone under 16, and it contains no content intended for them.',
              es: 'Este sitio web es un portafolio de servicios profesionales. No está dirigido a menores de edad, no recopila conscientemente datos de ninguna persona menor de 16 años y no contiene contenido destinado a ellos.',
            },
          },
        ],
      },
      {
        id: 'changes',
        heading: {
          en: 'Changes to this policy',
          es: 'Cambios en esta política',
        },
        blocks: [
          {
            kind: 'p',
            text: {
              en: 'I revise this policy when the site changes in a way that affects your data. Before any such change takes effect, this page is updated and the effective date below is changed. Events that require an update include, without limitation:',
              es: 'Reviso esta política cuando el sitio cambie de una forma que afecte tus datos. Antes de que entre en vigor cualquier cambio de ese tipo, esta página se actualiza y se modifica la fecha de vigencia publicada. Los hechos que requieren una actualización incluyen, sin limitarse a ellos:',
            },
          },
          {
            kind: 'ul',
            items: [
              {
                en: 'a third-party embed, video, widget or externally hosted asset is added to any page, including the portfolio samples section of the service pages;',
                es: 'que se añada a alguna página un contenido incrustado de terceros, un vídeo, un widget o un recurso alojado externamente, incluida la sección de muestras de portafolio de las páginas de servicio;',
              },
              {
                en: 'analytics, a tag manager, a pixel, a beacon, a session-recording tool or a cookie is introduced;',
                es: 'que se introduzca analítica, un tag manager, un píxel, un beacon, una herramienta de grabación de sesión o una cookie;',
              },
              {
                en: 'the site starts persisting data on your device through localStorage, sessionStorage, IndexedDB or any other mechanism;',
                es: 'que el sitio empiece a persistir datos en tu dispositivo mediante localStorage, sessionStorage, IndexedDB o cualquier otro mecanismo;',
              },
              {
                en: 'a contact form, newsletter, comment system or any other input feature is added;',
                es: 'que se añada un formulario de contacto, un boletín, un sistema de comentarios o cualquier otra función de entrada de datos;',
              },
              {
                en: 'the hosting provider, the email provider or the country of residence changes;',
                es: 'que cambie el proveedor de alojamiento, el proveedor de correo o el país de residencia;',
              },
              {
                en: 'the law applicable to me changes in a way that affects this policy.',
                es: 'que cambie la ley aplicable que me afecta de una forma que influya en esta política.',
              },
            ],
          },
          {
            kind: 'p',
            text: {
              en: 'If you have visited this site before a revision, nothing you did here is retroactively affected: no data was ever collected that could be retrieved, corrected or erased.',
              es: 'Si visitaste este sitio antes de alguna revisión, nada de lo que hiciste aquí se ve afectado retroactivamente: nunca se recopiló ningún dato que pudiera recuperarse, corregirse o eliminarse.',
            },
          },
        ],
      },
      {
        id: 'contact',
        heading: {
          en: 'Contact',
          es: 'Contacto',
        },
        blocks: [
          {
            kind: 'p',
            text: {
              en: `For any privacy question, request or complaint, contact me at ${contactInfo.email}. I am established in ${contactInfo.country} and this policy is governed by the laws of ${contactInfo.country}.`,
              es: `Para cualquier consulta, solicitud o queja relacionada con la privacidad, comunícate conmigo en ${contactInfo.email}. Estoy establecido en ${contactInfo.country} y esta política se rige por las leyes de ${contactInfo.country}.`,
            },
          },
        ],
      },
    ],
  },

  terms: {
    effectiveDate: '2026-09-26',
    command: { en: 'cat /legal/terms.md', es: 'cat /legal/terminos.md' },
    title: {
      en: 'Terms of Service',
      es: 'Términos y Condiciones',
    },
    description: {
      en: 'The terms that govern the use of this website. The site is informational; contracting happens through third-party channels.',
      es: 'Los términos que rigen el uso de este sitio web. El sitio es informativo; la contratación se realiza por canales de terceros.',
    },
    sections: [
      {
        id: 'identity',
        heading: {
          en: 'Legal identity',
          es: 'Identidad legal',
        },
        blocks: [
          {
            kind: 'p',
            text: {
              en: `This website is operated by ${contactInfo.fullName}, as an independent professional offering software, infrastructure, automation and technical SEO services. I provide these services as a natural person, domiciled in ${contactInfo.country}, and not through a registered company.`,
              es: `Este sitio web es operado por ${contactInfo.fullName}, como profesional independiente que ofrece servicios de software, infraestructura, automatización y SEO técnico. Presto estos servicios como persona natural, domiciliado en ${contactInfo.country}, y no a través de una empresa constituida.`,
            },
          },
          {
            kind: 'p',
            text: {
              en: `I can be reached at ${contactInfo.email}. Where you contract for services through a freelance marketplace, the contracting entity is the marketplace and its own terms govern the engagement, not these.`,
              es: `Puede contactarme en ${contactInfo.email}. Cuando contrate servicios a través de una plataforma de freelance, la parte contratante es la plataforma y sus propias condiciones rigen la relación, no estas.`,
            },
          },
        ],
      },
      {
        id: 'nature-of-the-site',
        heading: {
          en: 'Nature of this website',
          es: 'Naturaleza de este sitio web',
        },
        blocks: [
          {
            kind: 'note',
            text: {
              en: 'This website is a marketing and informational resource. Visiting it, reading it, or contacting me through it does not create a contract, an engagement, a commitment of work, or a client relationship.',
              es: 'Este sitio web es un recurso comercial e informativo. Visitarlo, leerlo o contactarme a través de él no crea contrato, encargo, compromiso de trabajo ni relación de cliente.',
            },
          },
          {
            kind: 'p',
            text: {
              en: 'The service pages describe typical scopes, methodologies and deliverables. The delivery timelines and any guarantee shown there are marketing estimates included to describe the kind of work I do. They are not contractual commitments and they do not constitute an offer capable of being accepted. A binding commitment exists only in a written agreement signed by both parties.',
              es: 'Las páginas de servicios describen alcances, metodologías y entregables típicos. Los plazos de entrega y cualquier garantía que en ellas figuren son estimaciones comerciales incluidas para describir el tipo de trabajo que realizo. No constituyen compromisos contractuales ni ofertas capaces de ser aceptadas. Un compromiso vinculante existe únicamente en un acuerdo escrito firmado por ambas partes.',
            },
          },
          {
            kind: 'p',
            text: {
              en: 'Priorities, technologies and prices may change without notice, and the scope, timeline and price of any real engagement are agreed in writing before work begins.',
              es: 'Las prioridades, tecnologías y precios pueden cambiar sin previo aviso, y el alcance, plazo y precio de cualquier trabajo real se acuerdan por escrito antes de iniciarlo.',
            },
          },
        ],
      },
      {
        id: 'contracting',
        heading: {
          en: 'How contracting works',
          es: 'Cómo funciona la contratación',
        },
        blocks: [
          {
            kind: 'ul',
            items: [
              {
                en: 'This website does not accept payments, process orders, or collect card details. It has no checkout, no cart and no client account.',
                es: 'Este sitio web no acepta pagos, no procesa pedidos ni recoge datos de tarjetas. No tiene checkout, ni carrito, ni cuenta de cliente.',
              },
              {
                en: 'Enquiries start by email, by booking a call on Calendly, or by messaging me on WhatsApp.',
                es: 'Las consultas comienzan por correo electrónico, agendando una llamada en Calendly o escribiéndome por WhatsApp.',
              },
              {
                en: 'Where I am engaged through Legiit, Contra, Upwork or Workana, the terms of that platform govern the contract, the payment flow, the escrow and the dispute resolution, and the scope I commit to is the one recorded there.',
                es: 'Cuando me contrate a través de Legiit, Contra, Upwork o Workana, los términos de esa plataforma rigen el contrato, el flujo de pago, el depósito en garantía y la resolución de disputas, y el alcance al que me comprometo es el que quede registrado allí.',
              },
              {
                en: 'For work agreed directly by email or by message, a written agreement is required before any access to systems, credentials or data is provided or accepted.',
                es: 'Para trabajos acordados directamente por correo o mensaje, se requiere un acuerdo escrito antes de que se facilite o se acepte cualquier acceso a sistemas, credenciales o datos.',
              },
            ],
          },
        ],
      },
      {
        id: 'portfolio',
        heading: {
          en: 'Portfolio and client work',
          es: 'Portafolio y trabajos de clientes',
        },
        blocks: [
          {
            kind: 'p',
            text: {
              en: 'All content published on this website is either my own work or is published with the written authorisation of the client it belongs to. Screenshots, metrics, case descriptions and results are shared deliberately and with consent, and no client material is published unilaterally.',
              es: 'Todo el contenido publicado en este sitio web es trabajo mío propio o se publica con la autorización escrita del cliente al que pertenece. Las capturas, métricas, descripciones de casos y resultados se comparten de forma deliberada y con consentimiento, y ningún material de clientes se publica unilateralmente.',
            },
          },
          {
            kind: 'p',
            text: {
              en: 'If you are a client and you would like something of yours removed from this site, ask me and I will remove it. I do not need to be asked twice or wait for a legal claim.',
              es: 'Si eres cliente y deseas que retire de este sitio algo tuyo, pídemelo y lo retiro. No hace falta que me lo pidas dos veces ni que realices una reclamación legal.',
            },
          },
        ],
      },
      {
        id: 'intellectual-property',
        heading: {
          en: 'Intellectual property',
          es: 'Propiedad intelectual',
        },
        blocks: [
          {
            kind: 'p',
            text: {
              en: 'The site\'s source code, design, written content, visual identity, terminal animation and service descriptions are my exclusive property. They are not licensed under any open source licence. The footer copyright notice is authoritative.',
              es: 'El código fuente, el diseño, los contenidos escritos, la identidad visual, la animación de terminal y las descripciones de servicios de este sitio son de mi propiedad exclusiva. No se licencian bajo ninguna licencia de código abierto. El aviso de derechos de autor del pie de página es el que prevalece.',
            },
          },
          {
            kind: 'p',
            text: {
              en: 'You may view the site, print it for personal reference, and link to it. You may not copy, republish, modify, reverse engineer, mine text from, or use its content commercially without my prior written permission. Third-party names, logos and trade marks appearing on the site, including marketplace platforms, social networks and technology vendors, remain the property of their respective owners and are used for identification only.',
              es: 'Puedes consultar el sitio, imprimirlo para referencia personal y enlazarlo. No puedes copiarlo, republicarlo, modificarlo, hacer ingeniería inversa, extraer sus textos ni usar su contenido con fines comerciales sin mi autorización previa por escrito. Los nombres, logotipos y marcas de terceros que aparecen en el sitio, incluidas plataformas de freelance, redes sociales y proveedores tecnológicos, siguen siendo propiedad de sus titulares y se utilizan solo con fines identificativos.',
            },
          },
        ],
      },
      {
        id: 'accuracy',
        heading: {
          en: 'Accuracy and availability',
          es: 'Precisión y disponibilidad',
        },
        blocks: [
          {
            kind: 'p',
            text: {
              en: 'I make reasonable efforts to keep the information on this site accurate and current, but I do not guarantee it. Content is provided as is. The site may be modified, interrupted or taken down at any time without notice.',
              es: 'Realizo esfuerzos razonables para mantener la información de este sitio exacta y actualizada, pero no la garantizo. El contenido se proporciona tal cual. El sitio puede ser modificado, interrumpido o retirado en cualquier momento sin previo aviso.',
            },
          },
          {
            kind: 'p',
            text: {
              en: 'Links to external sites are provided for convenience. I do not control those sites and I am not responsible for their content, their privacy practices, or how they handle your data. Following an external link is at your own risk.',
              es: 'Los enlaces a sitios externos se ofrecen por comodidad. No controlo esos sitios y no soy responsable de su contenido, sus prácticas de privacidad ni de cómo tratan tus datos. Seguir un enlace externo es responsabilidad tuya.',
            },
          },
        ],
      },
      {
        id: 'liability',
        heading: {
          en: 'Limitation of liability',
          es: 'Limitación de responsabilidad',
        },
        blocks: [
          {
            kind: 'p',
            text: {
              en: 'To the fullest extent permitted by applicable law, I am not liable for any indirect, incidental, special or consequential loss arising from your use of this website or your reliance on its content, nor for any loss of data, profits, revenue or business arising from decisions made on the basis of it. Where liability cannot be excluded, it is limited to the amount you actually paid for the service that gave rise to the claim.',
              es: 'En la máxima medida permitida por la legislación aplicable, no respondo por ninguna pérdida indirecta, accesoria, especial o consecuente que derive de tu uso de este sitio web o de tu confianza en su contenido, ni por la pérdida de datos, beneficios, ingresos u oportunidades de negocio derivada de decisiones tomadas con base en él. Cuando la responsabilidad no pueda excluirse, queda limitada al importe que efectivamente pagaste por el servicio que originó la reclamación.',
            },
          },
          {
            kind: 'p',
            text: {
              en: 'Nothing in these terms excludes or limits liability that cannot lawfully be excluded or limited, including liability for fraud or intentional misconduct.',
              es: 'Nada en estos términos excluye ni limita la responsabilidad que no pueda ser excluida o limitada legalmente, incluyendo la responsabilidad por fraude o conducta intencional.',
            },
          },
        ],
      },
      {
        id: 'law',
        heading: {
          en: 'Governing law and disputes',
          es: 'Legislación aplicable y controversias',
        },
        blocks: [
          {
            kind: 'p',
            text: {
              en: `These terms are governed by the laws of ${contactInfo.country}, and the courts of ${contactInfo.country} have jurisdiction over any dispute arising from them. Where an engagement is contracted through a freelance marketplace, the governing law and dispute forum agreed on that platform apply to that engagement instead.`,
              es: `Estos términos se rigen por las leyes de ${contactInfo.country}, y los tribunales de ${contactInfo.country} son competentes para cualquier controversia que surja de ellos. Cuando un trabajo se contrate a través de una plataforma de freelance, se aplicarán a ese trabajo la legislación y el fuero acordados en esa plataforma.`,
            },
          },
          {
            kind: 'p',
            text: {
              en: 'Before starting proceedings, you agree to contact me first. Most misunderstandings are resolved in a single email, and I would rather resolve one that way than in a court.',
              es: 'Antes de iniciar un procedimiento, aceptas contactarme primero. La mayoría de los malentendidos se resuelven en un solo correo, y preferiría resolverlo así antes que en un tribunal.',
            },
          },
        ],
      },
      {
        id: 'language',
        heading: {
          en: 'Controlling language',
          es: 'Idioma que prevalece',
        },
        blocks: [
          {
            kind: 'p',
            text: {
              en: 'These terms and the privacy policy are published in English and Spanish. Where the two versions differ, the English version prevails.',
              es: 'Estos términos y la política de privacidad se publican en inglés y español. En caso de discrepancia entre ambas versiones, prevalece la versión en inglés.',
            },
          },
        ],
      },
      {
        id: 'changes',
        heading: {
          en: 'Changes to these terms',
          es: 'Cambios en estos términos',
        },
        blocks: [
          {
            kind: 'p',
            text: {
              en: 'I may revise these terms. The revised version takes effect when published on this page, and the effective date below is updated at that point. Continuing to use the site after that date means the revised terms apply to it.',
              es: 'Puedo revisar estos términos. La versión revisada entra en vigor al publicarse en esta página, y la fecha de vigencia que aparece más abajo se actualiza en ese momento. Seguir usando el sitio después de esa fecha implica que se le aplican los términos revisados.',
            },
          },
        ],
      },
      {
        id: 'contact',
        heading: {
          en: 'Contact',
          es: 'Contacto',
        },
        blocks: [
          {
            kind: 'p',
            text: {
              en: `Questions about these terms: ${contactInfo.email}.`,
              es: `Preguntas sobre estos términos: ${contactInfo.email}.`,
            },
          },
        ],
      },
    ],
  },
};

export type PrivacyDocument = LegalDocument;
export type TermsDocument = LegalDocument;
