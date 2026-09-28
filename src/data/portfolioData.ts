export type Bilingual = { es: string; en: string };
export type BilingualList = { es: string[]; en: string[] };

export type WorkflowNodeKind = 'terminal' | 'step' | 'decision';

export interface WorkflowNode {
  id: string;
  kind: WorkflowNodeKind;
  label: Bilingual;
  detail?: Bilingual;
  col: number;
  row: number;
}

export interface WorkflowEdge {
  from: string;
  to: string;
  label?: Bilingual;
  tone?: 'neutral' | 'positive' | 'muted';
}

export interface WorkflowSpec {
  title: Bilingual;
  caption?: Bilingual;
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
}

export interface Project {
  slug: string;
  title: Bilingual;
  category: Bilingual;
  summary: Bilingual;
  challenge: Bilingual;
  solution: Bilingual;
  benefits: BilingualList;
  stack: Bilingual;
  img: string;
  imgWidth: number;
  githubUrl?: string;
  demoUrl?: string;
  relatedServices: number[];
  workflow?: WorkflowSpec;
  order: number;
}

export const portfolioData: Project[] = [
  {
    slug: 'landing-con-k',
    title: {
      es: 'Verónika con K - Landing page',
      en: 'Verónika con K - Landing page',
    },
    category: {
      es: 'Diseño web responsive',
      en: 'Responsive Web Design',
    },
    summary: {
      es: 'Landing profesional con nueve secciones, tema claro/oscuro y un sistema de escala proporcional que mantiene la composición intacta desde 1024px hasta 4K.',
      en: 'Professional landing page, with nine sections, light/dark theming and a proportional scaling system that keeps the composition intact from 1024px up to 4K.',
    },
    challenge: {
      es: 'Los bloques del hero se desplazaban y se veían distinto entre navegadores en escritorio, y el resto de la página no escalaba junto con la imagen: los iconos SVG quedaban clavados por sus atributos width/height en píxeles, los logos de marketplaces tenían tamaños intrínsecos distintos y el iframe de Instagram traía medidas propias de un tercero.',
      en: 'The hero blocks shifted and rendered differently across desktop browsers, and the rest of the page did not scale with the image: SVG icons stayed frozen by their pixel width/height attributes, marketplace logos had different intrinsic sizes, and the Instagram iframe carried a third party fixed measurement.',
    },
    solution: {
      es: 'Unidad universal de escala con declaración doble vw/cqw que cae automáticamente en navegadores sin container queries, más escalado de página completa vía root font-size calc(100vw/64) con rem en todas las secciones. Los tamaños fijos de los SVG se sobrescribieron con CSS en lugar de editar el TSX, y el CSS siempre se Cargó antes que el JS para eliminar el FOUC.',
      en: 'A universal scale unit with a double vw/cqw declaration that falls back automatically in browsers without container queries, plus full-page scaling via a calc(100vw/64) root font-size with rem across every section. The frozen SVG sizes were overridden with CSS instead of editing the TSX, and CSS was always loaded before JS to remove the FOUC.',
    },
    benefits: {
      es: [
        'First paint de 332ms a 60ms al reordenar el CSS por delante del script.',
        'Composición estable en 1024, 1366, 1440 y 1920, con escala lineal verificada.',
        'La versión móvil queda pixel-idéntica a la original, aislada tras html { font-size: 16px }.',
        'Temas claro y oscuro, animaciones y prefers-reduced-motion respetados.',
        'JSON-LD ProfessionalService, canonical y sitemap en el despliegue.',
      ],
      en: [
        'First paint from 332ms down to 60ms by reordering CSS ahead of the script.',
        'Stable composition at 1024, 1366, 1440 and 1920, with verified linear scaling.',
        'The mobile version stays pixel-identical, isolated behind html { font-size: 16px }.',
        'Light and dark themes, animations and prefers-reduced-motion respected.',
        'ProfessionalService JSON-LD, canonical and sitemap on the deployment.',
      ],
    },
    stack: {
      es: 'React 19 · TypeScript 6 · Vite 8 · oxlint · CSS custom properties · Container queries · Vercel Analytics',
      en: 'React 19 · TypeScript 6 · Vite 8 · oxlint · CSS custom properties · Container queries · Vercel Analytics',
    },
    img: 'portfolio/landing-con-k-cover.webp',
    imgWidth: 3072,
    demoUrl: 'https://veronikaconk.vercel.app',
    relatedServices: [],
    order: 1,
  },
  {
    slug: 'instagram-telegram-bot',
    title: {
      es: 'Instagram → Telegram Monitor Bot',
      en: 'Instagram → Telegram Monitor Bot',
    },
    category: {
      es: 'Automatización & IA',
      en: 'Automation & AI',
    },
    summary: {
      es: 'Bot de Telegram que monitorea perfiles de Instagram y avisa en el momento de cada publicación nueva, descargando los vídeos directamente en el chat.',
      en: 'Telegram bot that monitors Instagram profiles and alerts the moment a new post appears, downloading videos straight into the chat.',
    },
    challenge: {
      es: 'Consultar un perfil de forma continua dispara los límites de la API: los HTTP 401 y 429 terminaban dejando la cuenta de sesión bloqueada. Además, el usuario debía decidir desde el chat si quería recibir solo vídeos o también fotos.',
      en: 'Polling a profile continuously hits API limits: HTTP 401 and 429 responses kept leaving the session account blocked. The user also needed to decide from the chat whether to receive videos only or photos as well.',
    },
    solution: {
      es: 'Rotación de cuentas de sesión de Instagram, de cabeceras User-Agent y retardos aleatorizados entre peticiones, con cambio automático de cuenta cuando la API responde con límite de tasa. El monitoreo reparte 3 verificaciones del perfil principal por cada 1 de los secundarios y ofrece dos modos configurables con inline keyboard.',
      en: 'Rotation of Instagram session accounts, of User-Agent headers and of randomized delays between requests, switching account automatically whenever the API answers with a rate limit. Polling splits 3 checks of the main profile for every 1 of the secondary ones, and offers two modes configurable through an inline keyboard.',
    },
    benefits: {
      es: [
        'La rotación de sesiones evita el bloqueo por límites de tasa.',
        'Alerta en el momento exacto de la publicación, sin revisar manualmente.',
        'Los vídeos llegan como archivo al chat, sin que nadie tenga que abrir un enlace.',
        'El modo se cambia desde el propio Telegram, sin tocar el servidor.',
        'Arranque automático: si el usuario no elige modo en 30 minutos, arranca en solo vídeos.',
      ],
      en: [
        'Session rotation prevents rate-limit lockouts.',
        'Alerts at the exact moment of the post, with nothing to check by hand.',
        'Videos arrive as a file in the chat, with no link to open.',
        'The mode is switched from Telegram itself, without touching the server.',
        'Autostart: if the user does not pick a mode within 30 minutes, it starts on video only.',
      ],
    },
    stack: {
      es: 'Python 3.12 · python-telegram-bot 22.5 · instaloader 4.15 · httpx · requests · python-dotenv',
      en: 'Python 3.12 · python-telegram-bot 22.5 · instaloader 4.15 · httpx · requests · python-dotenv',
    },
    img: 'portfolio/instagram-telegram-bot-cover.webp',
    imgWidth: 3072,
    githubUrl: 'https://github.com/lanettix101/instagram-telegram-bot',
    relatedServices: [],
    order: 2,
    workflow: {
      title: {
        es: 'Flujo de monitoreo y entrega',
        en: 'Monitoring and delivery flow',
      },
      caption: {
        es: 'El estado del último post se conserva en runtime y los archivos temporales se descartan tras el envío.',
        en: 'The last post state is kept at runtime and temporary files are discarded after delivery.',
      },
      nodes: [
        {
          id: 'mode',
          kind: 'terminal',
          col: 1,
          row: 1,
          label: { es: 'Modo (VIDEO / ALL)', en: 'Mode (VIDEO / ALL)' },
        },
        {
          id: 'poll',
          kind: 'step',
          col: 1,
          row: 2,
          label: { es: 'Escaneo rotativo 3:1', en: 'Rotating 3:1 scan' },
          detail: {
            es: 'Instaloader · sesiones rotativas · User-Agent · delays',
            en: 'Instaloader · rotating sessions · User-Agent · delays',
          },
        },
        {
          id: 'isVideo',
          kind: 'decision',
          col: 1,
          row: 3,
          label: { es: '¿Es vídeo?', en: 'Is it a video?' },
        },
        {
          id: 'link',
          kind: 'terminal',
          col: 2,
          row: 2,
          label: { es: 'Envía el enlace del post', en: 'Sends the post link' },
        },
        {
          id: 'download',
          kind: 'terminal',
          col: 2,
          row: 3,
          label: { es: 'Descarga y envía el archivo', en: 'Downloads and sends the file' },
        },
      ],
      edges: [
        { from: 'mode', to: 'poll' },
        { from: 'poll', to: 'isVideo' },
        { from: 'isVideo', to: 'link', label: { es: 'no · foto', en: 'no · photo' }, tone: 'muted' },
        { from: 'isVideo', to: 'download', label: { es: 'sí · vídeo', en: 'yes · video' }, tone: 'positive' },
      ],
    },
  },
  {
    slug: 'creative-pricing-calculator',
    title: {
      es: 'Calculadora de precios creativa',
      en: 'Creative Pricing Calculator',
    },
    category: {
      es: 'App web & móvil',
      en: 'Web & Mobile App',
    },
    summary: {
      es: 'Herramienta web y móvil que calcula el precio de venta de un arreglo floral a partir de materiales, mano de obra y margen, y exporta el presupuesto para enviar al cliente.',
      en: 'Web and mobile tool that calculates the selling price of a floral arrangement from materials, labor and margin, then exports the quote ready to send to the client.',
    },
    challenge: {
      es: 'Fijar el precio de un arreglo manual era pura conjetura: la cinta, el silicón y el número de pétalos se contaban a ojo y el margen se elegía a sensación, con el riesgo real de vender por debajo de coste.',
      en: 'Pricing a handmade arrangement was pure guesswork: ribbon, silicone and petal counts were tallied by eye and the margin was picked by feel, with a real risk of selling below cost.',
    },
    solution: {
      es: 'Un modelo de costos con precio unitario de cada insumo y parámetros por flor (centímetros de cinta por pétalo, pétalos por flor, silicón), más un desglose que suma servicios, mano de obra y profit sobre el subtotal. Toda la configuración se guarda en el dispositivo y el presupuesto se exporta como imagen PNG.',
      en: 'A cost model with a unit price per supply and per-flower parameters (centimeters of ribbon per petal, petals per flower, silicone), plus a breakdown adding services, labor and profit over the subtotal. The whole configuration is stored on the device and the quote is exported as a PNG image.',
    },
    benefits: {
      es: [
        'El precio de venta sale de los datos, no de la intuición.',
        'Los seis tipos de flor se modelan con sus propios parámetros.',
        'El desglose muestra cuánto va a materiales, servicios, mano de obra y profit.',
        'La configuración se conserva entre sesiones sin cuenta ni servidor.',
        'El presupuesto se exporta como imagen para mandar por WhatsApp.',
        'La misma lógica de negocio corre en web (React) y móvil (Flutter).',
      ],
      en: [
        'The selling price comes out of the data, not out of intuition.',
        'The six flower types are modeled with their own parameters.',
        'The breakdown shows how much goes to supplies, services, labor and profit.',
        'The configuration survives between sessions, with no account and no server.',
        'The quote is exported as an image to send over WhatsApp.',
        'The same business logic runs on web (React) and mobile (Flutter).',
      ],
    },
    stack: {
      es: 'React 19 · TypeScript · Vite · Tailwind CSS · html2canvas · Flutter 3.19 · Dart',
      en: 'React 19 · TypeScript · Vite · Tailwind CSS · html2canvas · Flutter 3.19 · Dart',
    },
    img: 'portfolio/creative-pricing-calculator-cover.webp',
    imgWidth: 3072,
    githubUrl: 'https://github.com/lanettix101/creative-pricing-calculator',
    demoUrl: 'https://creative-pricing-calculator.vercel.app',
    relatedServices: [],
    order: 3,
    workflow: {
      title: {
        es: 'Flujo del cálculo',
        en: 'Pricing flow',
      },
      caption: {
        es: 'El precio sugerido suma el costo de los materiales, un 15% de servicios, la mano de obra y un 50% de profit sobre el subtotal.',
        en: 'The suggested price adds the material cost, 15% for services, labor, and 50% profit over the subtotal.',
      },
      nodes: [
        {
          id: 'cfg',
          kind: 'terminal',
          col: 1,
          row: 1,
          label: { es: 'Carga ajustes', en: 'Load settings' },
          detail: { es: 'localStorage o valores por defecto', en: 'localStorage or defaults' },
        },
        {
          id: 'db',
          kind: 'step',
          col: 1,
          row: 2,
          label: { es: 'Precios y parámetros', en: 'Prices and parameters' },
          detail: { es: '8 insumos · 6 tipos de flor', en: '8 supplies · 6 flower types' },
        },
        {
          id: 'cost',
          kind: 'step',
          col: 1,
          row: 3,
          label: { es: 'Costo del arreglo', en: 'Arrangement cost' },
          detail: { es: 'cantidades y extras', en: 'quantities and extras' },
        },
        {
          id: 'price',
          kind: 'terminal',
          col: 2,
          row: 3,
          label: { es: 'Precio sugerido', en: 'Suggested price' },
          detail: { es: 'costo + servicios + MO + profit', en: 'cost + services + labor + profit' },
        },
        {
          id: 'png',
          kind: 'terminal',
          col: 2,
          row: 4,
          label: { es: 'Exporta PNG', en: 'Exports PNG' },
          detail: { es: 'presupuesto para enviar', en: 'quote ready to send' },
        },
      ],
      edges: [
        { from: 'cfg', to: 'db' },
        { from: 'db', to: 'cost' },
        { from: 'cost', to: 'price' },
        { from: 'price', to: 'png' },
      ],
    },
  },
  {
    slug: 'prize-wheel-promo',
    title: {
      es: 'Ruleta de sorteos para promociones',
      en: 'Prize Wheel Promo',
    },
    category: {
      es: 'Aplicación web interactiva',
      en: 'Interactive Web App',
    },
    summary: {
      es: 'Ruleta de la fortuna para sorteos y campañas promocionales, con premios/participantes ponderados, gestor de premios en vivo, logo configurable y anuncio del ganador.',
      en: 'Wheel of fortune for giveaways and promo campaigns, with weighted prizes, weight of participation, a live prize manager, a configurable center logo, and winner announcement.',
    },
    challenge: {
      es: 'Sortear a mano en un evento en vivo es lento y sesga el resultado: quien gira, quien reparte y quien anota. Y el operador, sin conocimientos técnicos, tenía que poder cambiar premios y marcas sin pedir ayuda.',
      en: 'Drawing by hand on a live event is slow and skews the result: the person spinning, the one handing out, and the one writing it down. And the operator, with no technical background, had to be able to change prizes and branding without asking for help.',
    },
    solution: {
      es: 'Una ruleta SVG donde el ángulo de cada sector es proporcional al peso del premio y la participación, de modo que el sorteo se resuelve con un muestreo ponderado y la probabilidad anunciada es la real. El panel de configuración permite agregar, editar, reordenar y ponderar premios en vivo, y el reloj del evento fija la zona horaria para dar credibilidad al sorteo.',
      en: 'An SVG wheel where each sector angle is proportional to the prize weight and the weight of participation, so the draw resolves through a weighted sample and the advertised probability is the real one. The configuration panel can add, edit, reorder and weight prizes live, and the event clock pins the time zone to give credibility to the draw.',
    },
    benefits: {
      es: [
        'El sorteo se resuelve solo y el resultado es auditable.',
        'Los pesos realmente alteran la probabilidad de cada premio.',
        'Premios y logotipo se reconfiguran en vivo, sin recompilar.',
        'El ganador se anuncia con modal y confeti en el momento.',
        'El reloj fija la zona horaria del evento para sortear a una hora exacta.',
        'Un solo archivo desplegable: se proyecta o se abre en el móvil.',
      ],
      en: [
        'The draw resolves on its own and the result is auditable.',
        'The weights genuinely change each prize probability.',
        'Prizes and logo are reconfigured live, with no rebuild.',
        'The winner is announced with a modal and confetti on the spot.',
        'The clock pins the event time zone to draw at an exact hour.',
        'A single deployable file: projected on a screen or opened on a phone.',
      ],
    },
    stack: {
      es: 'React 18 · TypeScript 5.5 · Vite 7 · SVG · react-confetti · Tailwind CSS',
      en: 'React 18 · TypeScript 5.5 · Vite 7 · SVG · react-confetti · Tailwind CSS',
    },
    img: 'portfolio/prize-wheel-promo-cover.webp',
    imgWidth: 3072,
    githubUrl: 'https://github.com/lanettix101/prize-wheel-promo',
    demoUrl: 'https://ruleta-tienda-wheat.vercel.app/',
    relatedServices: [],
    order: 4,
    workflow: {
      title: {
        es: 'Flujo del sorteo',
        en: 'Spin flow',
      },
      caption: {
        es: 'El ángulo de cada sector es proporcional a su peso, así que el sorteo se resuelve con un muestreo ponderado y no con un azar uniforme.',
        en: 'Each sector angle is proportional to its weight, so the draw resolves through a weighted sample rather than a uniform one.',
      },
      nodes: [
        {
          id: 'prizes',
          kind: 'terminal',
          col: 1,
          row: 1,
          label: { es: 'Premios, pesos y logo', en: 'Prizes, weights and logo' },
          detail: { es: 'InputPanel · edición en vivo', en: 'InputPanel · live editing' },
        },
        {
          id: 'sectors',
          kind: 'step',
          col: 1,
          row: 2,
          label: { es: 'Sectores en SVG', en: 'SVG sectors' },
          detail: { es: 'ángulo proporcional al peso', en: 'angle proportional to weight' },
        },
        {
          id: 'sample',
          kind: 'step',
          col: 1,
          row: 3,
          label: { es: 'Muestreo ponderado', en: 'Weighted sampling' },
          detail: { es: 'mayor peso, mayor probabilidad', en: 'higher weight, higher odds' },
        },
        {
          id: 'winner',
          kind: 'terminal',
          col: 1,
          row: 4,
          label: { es: 'Modal y confeti', en: 'Modal and confetti' },
          detail: { es: 'anuncia el premio ganador', en: 'announces the winning prize' },
        }
      ],
      edges: [
        { from: 'prizes', to: 'sectors' },
        { from: 'sectors', to: 'sample' },
        { from: 'sample', to: 'winner', label: { es: 'se detiene', en: 'it stops' }, tone: 'positive' },
      ],
    },
  },
  {
    slug: 'traffic-analytics-simulator',
    title: {
      es: 'Simulador de analítica de tráfico',
      en: 'Traffic Analytics Simulator',
    },
    category: {
      es: 'Dashboard & datos',
      en: 'Dashboard & Data',
    },
    summary: {
      es: 'Generador de reportes analíticos de tráfico web realistas: desde valores parametrizables la herramienta produce un dashboard con gráficos, métricas y exportación a PDF.',
      en: 'Realistic web traffic analytics report generator: set the aggregate parameters and the tool produces a dashboard with charts, derived metrics and PDF export.',
    },
    challenge: {
      es: 'En una propuesta de seguimiento SEO hay que mostrar cómo se verá el informe antes de cerrar el contrato, sin exponer datos reales de otros clientes ni esperar semanas a que se acumule tráfico.',
      en: 'In an SEO follow-up proposal you have to show what the report will look like before signing, without exposing another client real data or waiting weeks for traffic to accumulate.',
    },
    solution: {
      es: 'Un generador que parte de los totales configurados y construye series diarias coherentes: desglose orgánico, pago y bots, tendencia por regresión lineal con ruido, e impresiones derivadas por heurística de sitio medio. Todo se puede aleatorizar a valores plausibles y el reporte se exporta con CSS de impresión, sección por sección.',
      en: 'A generator that starts from the configured totals and builds coherent daily series: organic, paid and bot breakdown, a linear-regression trend with noise, and derived impressions from a mid-sized-site heuristic. Everything can be randomized to plausible values, and the report exports with print CSS, section by section.',
    },
    benefits: {
      es: [
        'El cliente ve el informe real antes de contratar el seguimiento.',
        'Los datos simulados no exponen métricas de otros clientes.',
        'Las series tienen tendencia y ruido, no números planos.',
        'Las heurísticas derivadas dan proporciones creíbles de la industria.',
        'Aleatorizar genera una demo plausible en un solo clic.',
        'Exporta a PDF con paginación por sección y marca de agua de marca.',
      ],
      en: [
        'The client sees the real report before committing to tracking.',
        'Simulated data exposes no metrics from other clients.',
        'The series carry trend and noise, not flat numbers.',
        'Derived heuristics give believable industry proportions.',
        'Randomize produces a plausible demo in a single click.',
        'Exports to PDF with per-section pagination and brand header and footer.',
      ],
    },
    stack: {
      es: 'React 19 · TypeScript 5.8 · Vite 6 · Chart.js 4.5 · react-chartjs-2',
      en: 'React 19 · TypeScript 5.8 · Vite 6 · Chart.js 4.5 · react-chartjs-2',
    },
    img: 'portfolio/traffic-analytics-simulator-cover.webp',
    imgWidth: 3072,
    githubUrl: 'https://github.com/lanettix101/traffic-analytics-simulator',
    demoUrl: 'https://traffic-sim-pro.vercel.app/',
    relatedServices: [],
    order: 5,
    workflow: {
      title: {
        es: 'Flujo de la simulación',
        en: 'Simulation flow',
      },
      caption: {
        es: 'Las heurísticas derivadas fijan las impresiones entre 10.5 y 14 veces el tráfico y las sesiones en el 70% del orgánico, como en un sitio medio.',
        en: 'Derived heuristics set impressions at 10.5 to 14 times traffic and sessions at 70% of organic, like a mid-sized site.',
      },
      nodes: [
        {
          id: 'params',
          kind: 'terminal',
          col: 1,
          row: 1,
          label: { es: 'Parámetros del informe', en: 'Report parameters' },
          detail: { es: 'tráfico · bots · países · dispositivos', en: 'traffic · bots · countries · devices' },
        },
        {
          id: 'gen',
          kind: 'step',
          col: 1,
          row: 2,
          label: { es: 'generateSimulationData()', en: 'generateSimulationData()' },
          detail: { es: 'serie diaria con tendencia y ruido', en: 'daily series with trend and noise' },
        },
        {
          id: 'derived',
          kind: 'step',
          col: 1,
          row: 3,
          label: { es: 'Métricas derivadas', en: 'Derived metrics' },
          detail: { es: 'impresiones · sesiones · CTR', en: 'impressions · sessions · CTR' },
        },
        {
          id: 'dash',
          kind: 'step',
          col: 2,
          row: 3,
          label: { es: 'Dashboard', en: 'Dashboard' },
          detail: { es: 'Chart.js y tablas', en: 'Chart.js and tables' },
        },
        {
          id: 'pdf',
          kind: 'terminal',
          col: 2,
          row: 4,
          label: { es: 'Exportar PDF', en: 'Export PDF' },
          detail: { es: '@media print · window.print()', en: '@media print · window.print()' },
        },
        {
          id: 'rand',
          kind: 'terminal',
          col: 2,
          row: 1,
          label: { es: 'Aleatorizar', en: 'Randomize' },
          detail: { es: 'valores plausibles', en: 'plausible values' },
        },
      ],
      edges: [
        { from: 'params', to: 'gen' },
        { from: 'gen', to: 'derived' },
        { from: 'derived', to: 'dash' },
        { from: 'dash', to: 'pdf' },
        { from: 'rand', to: 'gen', label: { es: 'aleatorizar', en: 'randomize' }, tone: 'muted' },
      ],
    },
  },
  {
    slug: 'wordpress-telegram-bridge',
    title: {
      es: 'Bridge WordPress ↔ Telegram',
      en: 'WordPress ↔ Telegram Bridge',
    },
    category: {
      es: 'Automatización & IA',
      en: 'Automation & AI',
    },
    summary: {
      es: 'Bot de Telegram que administra un sitio WordPress por su REST API: publica, programa, edita, elimina y reporta contenido desde el chat mediante monitoreo en tiempo real.',
      en: 'Telegram bot that runs a WordPress site through its REST API: it publishes, schedules, edits, deletes and reports content from the chat, with automatic alerts for every new post.',
    },
    challenge: {
      es: 'La redacción publicaba desde el panel de WordPress, con un solo usuario y a veces desde el móvil: escribir HTML, cargar la imagen destacada, rellenar Yoast y elegir categoría y tags era un trámite largo y nada intuitivo desde un chat.',
      en: 'The newsroom published from the WordPress dashboard, with a single user and sometimes from a phone: writing HTML, uploading the featured image, filling Yoast and picking category and tags was a long chore and nothing intuitive from a chat.',
    },
    solution: {
      es: 'Un bot con flujos conversacionales que van pidiendo cada campo y luego los envían a la REST API de WordPress, con reintentos ante falsos 500. Un workjob cada 30 minutos consulta los últimos posts y avisa por el chat de lo nuevo, saltando la franja nocturna para no notificar. Las credenciales viven solo en variables de entorno.',
      en: 'A bot with conversational flows that ask for each field and then send them to the WordPress REST API, with retries against false 500s. A job every 30 minutes checks the latest posts and alerts the chat about what is new, skipping the night window so it does not notify. Credentials live only in environment variables.',
    },
    benefits: {
      es: [
        'Publicar desde el móvil sin abrir el panel de WordPress.',
        'El Yoast se rellena dentro del mismo flujo, sin campos sueltos.',
        'Carga masiva de medios con cola, deduplicación y renombrado.',
        'Cada publicación nueva genera aviso en el chat en minutos.',
        'El shortcode propio convierte medios en video o imagen al publicar.',
        'Ningún secreto en el repositorio: todo desde variables de entorno.',
      ],
      en: [
        'Publish from the phone without opening the WordPress dashboard.',
        'Yoast is filled inside the same flow, with no loose fields.',
        'Bulk media upload with a queue, deduplication and renaming.',
        'Every new post raises a chat alert within minutes.',
        'A custom shortcode turns media into video or image on publish.',
        'No secrets in the repository: everything from environment variables.',
      ],
    },
    stack: {
      es: 'Python 3.12 · python-telegram-bot 22.5 · WordPress REST API · httpx · APScheduler',
      en: 'Python 3.12 · python-telegram-bot 22.5 · WordPress REST API · httpx · APScheduler',
    },
    img: 'portfolio/wordpress-telegram-bridge-cover.webp',
    imgWidth: 3072,
    githubUrl: 'https://github.com/lanettix101/wordpress-telegram-bridge',
    relatedServices: [],
    order: 6,
    workflow: {
      title: {
        es: 'Flujo editorial',
        en: 'Editorial flow',
      },
      caption: {
        es: 'El monitor corre por su cuenta cada 30 minutos y salta la franja nocturna de 01:00 a 07:30 para no notificar.',
        en: 'The monitor runs on its own every 30 minutes and skips the 01:00 to 07:30 night window so it does not notify.',
      },
      nodes: [
        {
          id: 'chat',
          kind: 'terminal',
          col: 1,
          row: 1,
          label: { es: 'Comando en Telegram', en: 'Telegram command' },
          detail: { es: '/publicar · /editar · /medios', en: '/publicar · /editar · /medios' },
        },
        {
          id: 'dialog',
          kind: 'step',
          col: 1,
          row: 2,
          label: { es: 'ConversationHandler', en: 'ConversationHandler' },
          detail: { es: 'título · HTML · Yoast · tags', en: 'title · HTML · Yoast · tags' },
        },
        {
          id: 'media',
          kind: 'decision',
          col: 1,
          row: 3,
          label: { es: 'Lleva imagen?', en: 'Has an image?' },
        },
        {
          id: 'post',
          kind: 'step',
          col: 1,
          row: 4,
          label: { es: 'Publica o programa', en: 'Publish or schedule' },
          detail: { es: 'posts · Yoast · categorías', en: 'posts · Yoast · categories' },
        },
        {
          id: 'watch',
          kind: 'terminal',
          col: 2,
          row: 1,
          label: { es: 'Monitor cada 30 min', en: 'Monitor every 30 min' },
          detail: { es: 'consulta los 10 últimos posts', en: 'reads the last 10 posts' },
        },
        {
          id: 'log',
          kind: 'step',
          col: 2,
          row: 2,
          label: { es: 'Registra en el log', en: 'Writes to the log' },
          detail: { es: 'sent_posts_log.json', en: 'sent_posts_log.json' },
        },
        {
          id: 'upload',
          kind: 'step',
          col: 2,
          row: 4,
          label: { es: 'Sube el medio', en: 'Uploads the media' },
          detail: { es: 'cola de 2 workers · dedup', en: '2-worker queue · dedup' },
        },
      ],
      edges: [
        { from: 'chat', to: 'dialog' },
        { from: 'dialog', to: 'media' },
        { from: 'media', to: 'post', label: { es: 'no · solo texto', en: 'no · text only' }, tone: 'muted' },
        { from: 'media', to: 'upload', label: { es: 'sí · imagen', en: 'yes · image' }, tone: 'positive' },
        { from: 'upload', to: 'post' },
        { from: 'watch', to: 'log' },
      ],
    },
  },
];

export const portfolioSlugs = portfolioData.map((p) => p.slug);
