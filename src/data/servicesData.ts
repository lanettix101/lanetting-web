export interface MediaSample {
  id: string;
  type: 'image' | 'video' | 'iframe' | 'link';
  url: string;
  title: {
    es: string;
    en: string;
  };
  description: {
    es: string;
    en: string;
  };
  caption?: {
    es: string;
    en: string;
  };
  thumbnail?: string;
  badge?: {
    es: string;
    en: string;
  };
  aspectRatio?: 'video' | 'square' | 'auto';
}

export interface ServiceItem {
  id: number;
  slug: string;
  img: string;
  category: {
    es: string;
    en: string;
  };
  title: {
    es: string;
    en: string;
  };
  shortDesc: {
    es: string;
    en: string;
  };
  fullDesc: {
    es: string;
    en: string;
  };
  methodology: {
    es: string[];
    en: string[];
  };
  features: {
    es: string[];
    en: string[];
  };
  deliverables: {
    es: string[];
    en: string[];
  };
  techStack: string[];
  slaOrTimeline: {
    es: string;
    en: string;
  };
  samples?: MediaSample[];
}

export const servicesData: ServiceItem[] = [
  {
    id: 1,
    slug: 'wordpress-speed-optimization',
    img: 'img_service_wp-speed_4x3.webp',
    category: {
      es: 'Core Web Vitals',
      en: 'Core Web Vitals'
    },
    title: {
      es: 'Optimización de Velocidad en WordPress (Core Web Vitals)',
      en: 'WordPress Speed Optimization (Core Web Vitals)'
    },
    shortDesc: {
      es: 'Una web lenta mata tus ventas y te hunde en Google. Optimizamos tu WordPress para que cargue en 1.5 segundos o menos y cada visita se convierta en cliente.',
      en: 'A slow site kills conversions and sinks your rankings. We optimize your WordPress to load in 1.5 seconds or less, turning visitors into customers.'
    },
    fullDesc: {
      es: 'Diagnóstico y optimización profunda del stack de WordPress para alcanzar calificaciones 90+ en Google PageSpeed Insights y superar las métricas Core Web Vitals. Se eliminan cuellos de botella en base de datos, consultas lentas de plugins, scripts bloqueantes de renderizado y assets sobredimensionados.',
      en: 'Deep diagnostics and stack tuning for WordPress to achieve 90+ scores on Google PageSpeed Insights and pass Core Web Vitals. Eliminates database bottlenecks, sluggish plugin queries, render-blocking scripts, and oversized asset payloads.'
    },
    methodology: {
      es: [
        '1. Auditoría inicial de métricas reales (CrUX) y sintéticas (Lighthouse).\n',
        '2. Optimizació n a nivel de servidor (OPcache, Redis Object Cache, HTTP/3, Brotli).\n',
        '3. Limpieza y desfragmentación de base de datos MySQL/MariaDB.\n',
        '4. Optimización crítica de CSS, diferimiento de JavaScript no esencial y carga diferida de medios.\n',
        '5. Configuración de CDN perimetral.\n'
      ],
      en: [
        '1. Initial audit comparing real-user (CrUX) and synthetic (Lighthouse) metrics.\n',
        '2. Server-level tuning (OPcache, Redis Object Cache, HTTP/3, Brotli).\n',
        '3. Database defragmentation and query indexing.\n',
        '4. Critical CSS generation, non-essential JS deferral, and media lazy loading.\n',
        '5. Edge CDN caching configuration.\n'
      ]
    },
    features: {
      es: [
        'Puntuación 90+ en PageSpeed Insights Mobile y Desktop',
        'Configuración de Redis Object Cache persistente para backend ágil',
        'Eliminación de recursos JavaScript y CSS que bloquean el renderizado',
        'Optimización WebP/AVIF y dimensionado dinámico de imágenes',
        'Reducción drástica del TTFB (Time to First Byte)'
      ],
      en: [
        '90+ score on PageSpeed Insights Mobile & Desktop',
        'Persistent Redis Object Cache setup for snappy backend response',
        'Removal of render-blocking JavaScript and CSS assets',
        'WebP/AVIF media conversion and dynamic image sizing',
        'Drastic TTFB (Time to First Byte) latency reduction'
      ]
    },
    deliverables: {
      es: [
        'Reporte comparativo Antes vs. Después con métricas de rendimiento',
        'Copia de seguridad completa previa y verificación de integridad',
        'Configuración personalizada de caché en servidor y CDN',
        'Guía de buenas prácticas para mantener la velocidad al subir contenido nuevo'
      ],
      en: [
        'Before vs. After comparative performance report',
        'Full pre-optimization backup and integrity verification',
        'Tailored server-level and CDN caching configuration',
        'Maintenance guidelines to retain high speeds when publishing content'
      ]
    },
    techStack: ['WordPress', 'Redis', 'LiteSpeed / Nginx', 'Cloudflare APO', 'WP-CLI', 'PageSpeed Insights', 'WebPageTest'],
    slaOrTimeline: {
      es: '2 a 4 días hábiles',
      en: '2 to 4 business days'
    },
    samples: [
      /*{
        id: 'wp-sample-1',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
        thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop',
        title: {
          es: 'Reporte de Auditoría de Core Web Vitals (99/100 Mobile)',
          en: 'Core Web Vitals Audit Report (99/100 Mobile)'
        },
        description: {
          es: 'Métricas reales post-optimización: LCP de 0.8s, CLS de 0.001 e INP de 42ms.',
          en: 'Real post-optimization metrics: 0.8s LCP, 0.001 CLS, and 42ms INP.'
        },
        badge: {
          es: 'Caso de Éxito',
          en: 'Case Study'
        }
      },
      {
        id: 'wp-sample-2',
        type: 'iframe',
        url: 'https://pagespeed.web.dev/analysis?url=https%3A%2F%2Fwordpress.org',
        title: {
          es: 'Emulador de Métricas en Vivo (PageSpeed)',
          en: 'Live Performance Metrics Emulator (PageSpeed)'
        },
        description: {
          es: 'Inspección interactiva de métricas de rendimiento en tiempo real.',
          en: 'Interactive real-time performance metrics inspector.'
        },
        badge: {
          es: 'Demo Interactivo',
          en: 'Interactive Demo'
        }
      },
      {
        id: 'wp-sample-3',
        type: 'link',
        url: 'https://web.dev/explore/fast',
        title: {
          es: 'Estándares Oficiales Web.dev & Core Web Vitals',
          en: 'Official Web.dev Standards & Core Web Vitals Guide'
        },
        description: {
          es: 'Referencia técnica de los umbrales de Google aplicados en nuestras optimizaciones.',
          en: 'Technical specification of the Google thresholds applied in our optimization protocols.'
        },
        badge: {
          es: 'Documentación',
          en: 'Documentation'
        }
      }*/
    ]
  },
  {
    id: 2,
    slug: 'web-scraping-automation-bots',
    img: 'img_service_automation_4x3.webp',
    category: {
      es: 'Automatización & Extracción de Datos',
      en: 'Automation & Data Extraction'
    },
    title: {
      es: 'Web Scraping & Bots de Automatización de Procesos',
      en: 'Web Scraping & Process Automation Bots'
    },
    shortDesc: {
      es: 'Extraer datos y monitorear webs a mano te roba horas cada día. Creamos scrapers personalizados que automatizan tus flujos y trabajan por ti las 24 horas.',
      en: 'Manual data extraction and site monitoring drain your time. We build custom scrapers that automate your workflows 24/7, hands-free.'
    },
    fullDesc: {
      es: 'Diseño de pipelines robustos de extracción de datos con manejo de proxys rotativos, bypass de captchas y ejecución desatendida. Transformamos información desestructurada de la web en bases de datos relacionales, hojas de cálculo o endpoints de API en tiempo real.',
      en: 'Engineering robust data extraction pipelines with rotating proxy management, captcha bypass capabilities, and headless unattended execution. Transforming unstructured web data into structured databases, spreadsheets, or real-time API endpoints.'
    },
    methodology: {
      es: [
        '1. Análisis estructural del sitio objetivo y detección de APIs internas.\n',
        '2. Implementación del motor de scraping (Playwright/Scrapy) con políticas de evasión de bloqueo.\n',
        '3. Limpieza, tipado y validación de datos (Pydantic/Pandas).\n',
        '4. Exportación programada a base de datos, Google Sheets o webhooks.\n',
        '5. Despliegue en contenedores Docker con monitoreo.\n'
      ],
      en: [
        '1. Structural analysis of target sites and discovery of internal endpoints.\n',
        '2. Implementation of extraction engine (Playwright/Scrapy) with anti-ban mechanisms.\n',
        '3. Data sanitization, typing, and validation (Pydantic/Pandas). \n',
        '4. Scheduled exports to database, Google Sheets, or webhooks.\n',
        '5. Deployment in Docker containers with health checks.\n'
      ]
    },
    features: {
      es: [
        'Extracción a gran escala sin bloqueos de IP (rotación inteligente)',
        'Manejo de Single Page Applications (SPAs) y renderizado JavaScript dinámico',
        'Validación y estructuración de esquemas JSON / CSV / SQL',
        'Alertas automatizadas ante cambios de diseño o fallos de conexión',
        'Entrega en entornos serverless o contenedores Docker ligeros'
      ],
      en: [
        'Large-scale extraction with zero IP bans (smart rotation)',
        'Support for SPAs and complex client-side JavaScript rendering',
        'Strict schema validation and export (JSON / CSV / SQL)',
        'Automated alerts on DOM structural changes or network drops',
        'Lightweight deployment via Docker containers or serverless cron jobs'
      ]
    },
    deliverables: {
      es: [
        'Código fuente documentado del scraper o bot',
        'Conjunto inicial de datos exportados y normalizados',
        'Dockerfile y scripts de ejecución automatizada cron',
        'Panel de control o canal de notificaciones en Telegram/Discord'
      ],
      en: [
        'Fully documented scraper/bot source code repository',
        'Initial dataset extracted and validated',
        'Dockerfile and cron execution scripts',
        'Telegram/Discord alerts dashboard for execution monitoring'
      ]
    },
    techStack: ['Python', 'Playwright', 'BeautifulSoup4', 'Scrapy', 'Docker', 'PostgreSQL', 'FastAPI'],
    slaOrTimeline: {
      es: '3 a 7 días hábiles',
      en: '3 to 7 business days'
    },
    samples: [
      /*{
        id: 'scraping-sample-1',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop',
        thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=600&auto=format&fit=crop',
        title: {
          es: 'Arquitectura de Pipeline de Scraping en Contenedores',
          en: 'Containerized Scraping Pipeline Architecture'
        },
        description: {
          es: 'Flujo distribuido con colas de mensajes Redis y workers concurrentes.',
          en: 'Distributed workflow utilizing Redis message queues and concurrent workers.'
        },
        badge: {
          es: 'Diagrama Técnico',
          en: 'Technical Diagram'
        }
      },
      {
        id: 'scraping-sample-2',
        type: 'video',
        url: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
        thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=600&auto=format&fit=crop',
        title: {
          es: 'Demostración de Extracción Automatizada en Tiempo Real',
          en: 'Real-time Automated Extraction Demo'
        },
        description: {
          es: 'Ejecución en vivo del bot recopilando 1,000 registros estructurados en 60 segundos.',
          en: 'Live walkthrough of the bot extracting 1,000 structured records in under 60 seconds.'
        },
        badge: {
          es: 'Video Demo',
          en: 'Demo Video'
        }
      },
      {
        id: 'scraping-sample-3',
        type: 'link',
        url: 'https://playwright.dev/',
        title: {
          es: 'Documentación Oficial de Playwright',
          en: 'Official Playwright Automation Framework'
        },
        description: {
          es: 'Motor headless utilizado para la interacción y extracción de interfaces modernas.',
          en: 'Headless browser automation engine used for modern web interaction and data ingestion.'
        },
        badge: {
          es: 'Framework',
          en: 'Framework'
        }
      }*/
    ]
  },
  {
    id: 3,
    slug: 'technical-seo-gsc-audits',
    img: 'img_service_tech-seo_4x3.webp',
    category: {
      es: 'SEO Técnico & Indexabilidad',
      en: 'Technical SEO & Crawlability'
    },
    title: {
      es: 'Auditorías de SEO & Google Search Console',
      en: 'Technical SEO & Google Search Console Audits'
    },
    shortDesc: {
      es: 'Los errores ocultos en Search Console te vuelven invisible para tus clientes. Reparamos la raíz del problema para que te encuentren rápido y vendas más.',
      en: 'Hidden flaws in Search Console keep customers from finding you. We fix the root issues so your site is built to perform and sell.'
    },
    fullDesc: {
      es: 'Auditoría integral del motor de búsqueda para diagnosticar por qué tus páginas no indexan o pierden posiciones. Analizamos la arquitectura de enlaces internos, estado de sitemaps XML, directivas robots.txt, canónicos erróneos, bucles de redirección y microdatos JSON-LD estructurados.',
      en: 'Comprehensive search engine architectural audit diagnosing why your URLs fail to index or lose ranking positions. We analyze internal link structures, XML sitemaps, robots.txt directives, canonical conflicts, redirect chains, and JSON-LD structured data.'
    },
    methodology: {
      es: [
        '1. Extracción completa con Screaming Frog / Sitebulb.\n',
        '2. Análisis forense de cobertura en Google Search Console y BigQuery.\n',
        '3. Verificación de renderizado JavaScript vs. HTML estático.\n',
        '4. Implementación de esquema Schema.org JSON-LD para fragmentos enriquecidos.\n',
        '5. Plan de corrección de código y seguimiento de re-indexación.\n',
      ],
      en: [
        '1. Full website crawl using Screaming Frog / Sitebulb.\n',
        '2. Forensic analysis of Google Search Console coverage and server log files.\n',
        '3. JavaScript rendering validation vs. static server HTML.\n',
        '4. Rich schema JSON-LD markup integration.\n',
        '5. Technical action roadmap and re-indexation tracking.\n',
      ]
    },
    features: {
      es: [
        'Depuración de errores "Rastreada: actualmente sin indexar" en GSC',
        'Validación de datos estructurados Schema.org (Organization, Article, FAQ, Product)',
        'Optimización del Crawl Budget eliminando cadenas de redirecciones 301/302 y 404s',
        'Estrategia de arquitectura de silos y distribución de PageRank interno',
        'Configuración precisa de etiquetas hreflang para sitios multilingües'
      ],
      en: [
        'Resolution of "Crawled - currently not indexed" GSC errors',
        'Full validation of Schema.org rich markup (Organization, Product, FAQ, Article)',
        'Crawl Budget optimization removing 301/302 redirect loops and broken 404s',
        'Silo architecture restructuring and internal PageRank equity distribution',
        'Strict hreflang implementation for multilingual and international sites'
      ]
    },
    deliverables: {
      es: [
        'Documento técnico ejecutivo con matriz de prioridad (Alta, Media, Baja)',
        'Archivo de datos estructurados JSON-LD listo para incrustar',
        'Robots.txt y Sitemap XML optimizados',
        'Sesión técnica para validar la corrección de errores en Google Search Console'
      ],
      en: [
        'Executive technical roadmap with prioritized impact matrix (High, Med, Low)',
        'Production-ready JSON-LD structured data snippets',
        'Optimized robots.txt and XML Sitemap files',
        'Technical walkthrough session verifying GSC error validation'
      ]
    },
    techStack: ['Google Search Console', 'Screaming Frog', 'Schema.org', 'Semrush', 'Ahrefs', 'Log File Analysis'],
    slaOrTimeline: {
      es: '3 a 5 días hábiles',
      en: '3 to 5 business days'
    },
    samples: [
      /*{
        id: 'seo-sample-1',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
        thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop',
        title: {
          es: 'Matriz de Diagnóstico y Recuperación de Tráfico Orgánico',
          en: 'Organic Traffic Recovery & Diagnostic Matrix'
        },
        description: {
          es: 'Identificación de problemas críticos en más de 20,000 URLs rastreadas.',
          en: 'Critical technical bottleneck identification across 20,000+ audited URLs.'
        },
        badge: {
          es: 'Auditoría',
          en: 'Audit'
        }
      },
      {
        id: 'seo-sample-2',
        type: 'link',
        url: 'https://validator.schema.org/',
        title: {
          es: 'Validador Oficial de Datos Estructurados Schema.org',
          en: 'Official Schema.org Structured Data Validator'
        },
        description: {
          es: 'Herramienta de verificación de los fragmentos enriquecidos generados.',
          en: 'Live verification tool for rich snippets generated in our SEO pipeline.'
        },
        badge: {
          es: 'Herramienta',
          en: 'Tool'
        }
      }*/
    ]
  },
  {
    id: 4,
    slug: 'linux-vps-support-migration',
    img: 'img_service_linux-vps_4x3.webp',
    category: {
      es: 'Infraestructura & SysAdmin Linux',
      en: 'Infrastructure & Linux SysAdmin'
    },
    title: {
      es: 'Soporte y Migración de Servidores & VPS',
      en: 'Linux VPS Support & Zero-Downtime Migration'
    },
    shortDesc: {
      es: 'Un fallo de servidor puede detener tu negocio. Nuestro soporte especializado protege y optimiza tus sistemas sin interrumpir tus operaciones.',
      en: 'Server crashes and security flaws disrupt your business. Our SysAdmin support keeps your servers stable and fast, with zero downtime.'
    },
    fullDesc: {
      es: 'Administración profesional de sistemas Linux en proveedores cloud (AWS, Hetzner, DigitalOcean, Vultr, Linode). Realizamos migraciones completas de aplicaciones, bases de datos y correos con tiempo de inactividad cero mediante sincronización incremental rsync y TTLs controlados.',
      en: 'Professional Linux system administration across major cloud providers (AWS, Hetzner, DigitalOcean, Vultr, Linode). We execute zero-downtime migrations for web applications, databases, and mail systems using incremental rsync pipelines and controlled DNS TTL transitions.'
    },
    methodology: {
      es: [
        '1. Aprovisionamiento y hardening inicial (SSH keys, UFW/fail2ban, Swap, NTP).\n',
        '2. Configuración optimizada de LEMP/LAMP (Nginx, PHP-FPM, MariaDB).\n',
        '3. Sincronización previa de datos con rsync y dump de bases de datos.\n',
        '4. Conmutación de DNS con TTL bajo para cero interrupción.\n',
        '5. Certificados SSL automáticos con Certbot.\n',
      ],
      en: [
        '1. Initial provisioning and security hardening (SSH key-only auth, UFW/fail2ban, Swap).\n',
        '2. Optimized LEMP/LAMP stack tuning (Nginx, PHP-FPM, MariaDB).\n',
        '3. Pre-sync data replication via rsync and live DB snapshot.\n',
        '4. Low-TTL DNS cutover for zero disruption.\n',
        '5. Automated SSL certificates via Let\'s Encrypt / Certbot.\n',
      ],
    },
    features: {
      es: [
        'Migraciones en caliente sin pérdida de datos ni transacciones de clientes',
        'Blindaje del servidor contra ataques de fuerza bruta (fail2ban, UFW, SSH hardened)',
        'Monitoreo proactivo de CPU, RAM, I/O de disco y logs del sistema',
        'Automatización de copias de seguridad remotas cifradas (S3, B2 o SFTP)',
        'Afinamiento del kernel y buffers de red para alto tráfico'
      ],
      en: [
        'Live hot migrations with zero data loss and no dropped client transactions',
        'Server hardening against brute-force attacks (fail2ban, UFW, SSH hardened)',
        'Proactive monitoring of CPU load, RAM usage, disk I/O, and syslog alerts',
        'Automated encrypted offsite backups (S3, Backblaze B2, or SFTP)',
        'Kernel sysctl and network buffer tuning for high-concurrency traffic'
      ]
    },
    deliverables: {
      es: [
        'Servidor completamente configurado y blindado con informe de seguridad',
        'Script de copia de seguridad automatizado y probado con restauración real',
        'Manual de acceso y credenciales en baúl seguro',
        'Monitoreo activo durante las 48 horas posteriores a la migración'
      ],
      en: [
        'Fully provisioned and hardened server with security baseline audit',
        'Automated, tested backup script with proven disaster recovery dry-run',
        'Secure credentials handover via encrypted vault',
        'Active 48-hour post-migration health monitoring'
      ]
    },
    techStack: ['Ubuntu Server', 'Debian', 'Nginx', 'Docker', 'Bash Scripting', 'rsync', 'fail2ban', 'Hetzner / AWS'],
    slaOrTimeline: {
      es: '1 a 3 días hábiles',
      en: '1 to 3 business days'
    },
    samples: [
      /*{
        id: 'vps-sample-1',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1200&auto=format&fit=crop',
        thumbnail: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=600&auto=format&fit=crop',
        title: {
          es: 'Topología de Servidor Seguro en Producción (Hetzner Cloud)',
          en: 'Secure Production Server Topology (Hetzner Cloud)'
        },
        description: {
          es: 'Esquema de proxy inverso Nginx con balanceo y aislamiento en contenedores.',
          en: 'Reverse proxy Nginx architecture with container isolation and DDoS filtering.'
        },
        badge: {
          es: 'Infraestructura',
          en: 'Infrastructure'
        }
      },
      {
        id: 'vps-sample-2',
        type: 'link',
        url: 'https://ubuntu.com/server/docs',
        title: {
          es: 'Guía Oficial de Seguridad Ubuntu Server',
          en: 'Official Ubuntu Server Hardening Documentation'
        },
        description: {
          es: 'Normativas de seguridad y compliance CIS aplicadas en nuestros entornos.',
          en: 'CIS compliance benchmarks and security standards applied to our VPS setups.'
        },
        badge: {
          es: 'Seguridad',
          en: 'Security'
        }
      }*/
    ]
  },
  {
    id: 5,
    slug: 'ai-pipelines-telegram-gemini-wp',
    img: 'img_service_ai-pipelines_4x3.webp',
    category: {
      es: 'Inteligencia Artificial & Automatización',
      en: 'AI & Automated Workflows'
    },
    title: {
      es: 'Pipelines de Inteligencia Artificial',
      en: 'AI & Automated Workflows'
    },
    shortDesc: {
      es: 'Actualizar tus canales a mano te consume horas valiosas. Creamos pipelines con IA en WordPress para publicar artículos profesionales con un solo comando desde tu móvil.',
      en: 'Feeding your content channels by hand eats up your week. We build smart AI pipelines that publish polished articles from a single message on your phone.'
    },
    fullDesc: {
      es: 'Diseño e implementación de cadenas de valor potenciadas por Inteligencia Artificial. Conectamos bots interactivos en Telegram con modelos Gemini para procesamiento de texto, transcripción de audios, categorización automática y publicación de borradores en CMS o bases de datos sin intervención humana.',
      en: 'Design and deployment of end-to-end generative AI pipelines. We bridge interactive Telegram bots with Gemini API models for natural language processing, audio transcription, automated tagging, and scheduled publication to WordPress or custom databases.'
    },
    methodology: {
      es: [
        '1. Definición del flujo de negocio y arquitectura de prompts (System Instructions + Few-shot).\n',
        '2. Conexión de webhooks con Telegram Bot API y Gemini API.\n',
        '3. Procesamiento y formateo de datos con Node.js / Python.\n',
        '4. Integración con REST API de WordPress para publicación estructurada.\n',
        '5. Logs y control de cuotas de tokens.\n',
      ],
      en: [
        '1. Business flow mapping and prompt engineering (System Instructions + Few-shot examples).\n',
        '2. Webhook pipeline setup with Telegram Bot API and Gemini API.\n',
        '3. Data transformation and schema enforcement with Node.js / Python.\n',
        '4. WordPress REST API integration for structured publishing.\n',
        '5. Token quota telemetry and error handling.\n',
      ],
    },
    features: {
      es: [
        'Procesamiento multimedia (texto, notas de voz, imágenes) con Gemini Multimodal',
        'Respuestas contextuales ultrarrápidas con streaming en Telegram',
        'Generación de metadatos SEO automáticos (títulos, extractos, etiquetas OpenGraph)',
        'Guardrails estrictos para evitar alucinaciones y mantener el tono de marca',
        'Persistencia de historial de conversación en base de datos ligera'
      ],
      en: [
        'Multimodal processing (text, voice notes, documents) via Gemini Vision & Audio',
        'Ultra-low latency streaming responses directly inside Telegram',
        'Automated SEO metadata generation (titles, excerpts, OpenGraph tags)',
        'Strict guardrails and structured JSON schema outputs to avoid hallucinations',
        'Lightweight conversation history persistence'
      ]
    },
    deliverables: {
      es: [
        'Bot de Telegram desplegado y operativo con webhooks seguros HTTPS',
        'Pipeline de prompts optimizado con schemas JSON estrictos',
        'Conector funcional con WordPress / CRM',
        'Documentación de comandos y variables de entorno'
      ],
      en: [
        'Fully operational Telegram Bot deployed with secure HTTPS webhooks',
        'Optimized prompt pipeline with strict JSON schema outputs',
        'Working integration with WordPress REST API / CRM',
        'Complete command manual and environment configuration reference'
      ]
    },
    techStack: ['Google Gemini API', 'Telegram Bot API', 'TypeScript / Python', 'WordPress REST API', 'Docker', 'Webhooks'],
    slaOrTimeline: {
      es: '4 a 8 días hábiles',
      en: '4 to 8 business days'
    },
    samples: [
      /*{
        id: 'ai-sample-1',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
        thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop',
        title: {
          es: 'Diagrama de Flujo del Pipeline Gemini a WordPress',
          en: 'Gemini to WordPress Pipeline Workflow'
        },
        description: {
          es: 'Recepción de mensaje en Telegram -> Inferencia Gemini -> Redacción y publicación en WP.',
          en: 'Telegram trigger -> Gemini reasoning engine -> Formatted WP article drafting.'
        },
        badge: {
          es: 'Arquitectura AI',
          en: 'AI Architecture'
        }
      },
      {
        id: 'ai-sample-2',
        type: 'link',
        url: 'https://ai.google.dev/',
        title: {
          es: 'Google AI for Developers (Gemini SDK)',
          en: 'Google AI for Developers (Gemini SDK)'
        },
        description: {
          es: 'Plataforma oficial de desarrollo utilizada para los modelos de última generación.',
          en: 'Official developer platform powering our high-efficiency multimodal pipelines.'
        },
        badge: {
          es: 'SDK Oficial',
          en: 'Official SDK'
        }
      }*/
    ]
  },
  {
    id: 6,
    slug: 'wordpress-security-malware-removal',
    img: 'img_service_wp-security_4x3.webp',
    category: {
      es: 'Ciberseguridad & Respuesta a Incidentes',
      en: 'Cybersecurity & Incident Response'
    },
    title: {
      es: 'Seguridad WordPress & Limpieza de Malware',
      en: 'WordPress Security & Malware Removal'
    },
    shortDesc: {
      es: 'Un sitio hackeado o la advertencia roja de Google destruye la confianza en tu marca. Desinfectamos tu WordPress y blindamos cada puerta de entrada.',
      en: 'Spam redirects, malware, or Google\'s red warning destroy your credibility overnight. We clean your WordPress and lock it down for good.'
    },
    fullDesc: {
      es: 'Servicio de emergencia y blindaje preventivo para sitios WordPress comprometidos con inyecciones de código malicioso, redirecciones no deseadas (Japanese SEO Spam, pharma hacks), minería oculta o inclusión en listas negras de Google Safe Browsing. Desinfectamos el núcleo, base de datos y archivos.',
      en: 'Emergency incident response and security hardening for compromised WordPress installations suffering from malicious code injections, spam redirects (Japanese SEO spam, pharma hacks), hidden miners, or Google Safe Browsing blacklisting.'
    },
    methodology: {
      es: [
        '1. Aislamiento y respaldo forense de la instalación infectada.\n',
        '2. Análisis heurístico y diferencial de archivos contra el repositorio oficial de WordPress.\n',
        '3. Limpieza profunda de base de datos (wp_posts, wp_options, transients).\n',
        '4. Reemplazo limpio del core, plugins y temas.\n',
        '5. Blindaje del archivo wp-config.php y reglas WAF.\n',
      ],
      en: [
        '1. Immediate containment and forensic snapshot of the infected environment.\n',
        '2. Heuristic and checksum differential analysis against official WordPress repositories.\n',
        '3. Database malware scrubbing (wp_posts, wp_options, cron events).\n',
        '4. Clean replacement of core files, plugins, and active theme.\n',
        '5. WAF rule configuration and wp-config hardening.\n',
      ],
    },
    features: {
      es: [
        'Eliminación del 100% de backdoors, web shells y código PHP ofuscado',
        'Retiro de advertencias de "Sitio no seguro" en Google Safe Browsing y McAfee',
        'Configuración de Firewall de Aplicaciones Web (WAF) y autenticación 2FA',
        'Protección contra ataques de inyección SQL, XSS y Cross-Site Scripting',
        'Monitoreo continuo de integridad de archivos y cambios de permisos'
      ],
      en: [
        '100% eradication of backdoors, hidden web shells, and obfuscated PHP payloads',
        'De-listing from Google Safe Browsing and security blacklist warnings',
        'Web Application Firewall (WAF) integration and mandatory 2FA enforcement',
        'Protection against SQL injections, XSS vulnerabilities, and brute-force attacks',
        'Continuous file integrity monitoring and privilege restriction policies'
      ]
    },
    deliverables: {
      es: [
        'Sitio web completamente desinfectado y verificado en listas negras',
        'Informe forense detallando el vector de entrada explotado por los atacantes',
        'Certificado de blindaje y configuración de seguridad aplicada',
        'Garantía de soporte y monitorización de 30 días post-limpieza'
      ],
      en: [
        'Fully disinfected website cleared from all global security blacklists',
        'Forensic report identifying the initial intrusion vector exploited',
        'Applied hardening certificates and firewall configuration reference',
        '30-day post-cleanup guarantee and continuous security monitoring'
      ]
    },
    techStack: ['WordPress Security', 'ClamAV', 'WP-CLI', 'PHP Security Hardening', 'Cloudflare WAF', 'Google Search Console'],
    slaOrTimeline: {
      es: '24 a 48 horas (Atención Urgente)',
      en: '24 to 48 hours (Emergency Response)'
    },
    samples: [
      /*{
        id: 'sec-sample-1',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1200&auto=format&fit=crop',
        thumbnail: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=600&auto=format&fit=crop',
        title: {
          es: 'Reporte Forense de Detección y Eliminación de Malware',
          en: 'Malware Detection & Forensic Clean Report'
        },
        description: {
          es: 'Registro de desinfección de 48 archivos maliciosos y restauración de índices limpios.',
          en: 'Sanitization log of 48 infected files and verification of clean Google status.'
        },
        badge: {
          es: 'Reporte de Seguridad',
          en: 'Security Report'
        }
      },
      {
        id: 'sec-sample-2',
        type: 'link',
        url: 'https://transparencyreport.google.com/safe-browsing/search',
        title: {
          es: 'Google Safe Browsing Transparency Report',
          en: 'Google Safe Browsing Transparency Report'
        },
        description: {
          es: 'Verificador oficial del estado de seguridad de dominios en Google.',
          en: 'Official Google diagnostic tool to check public security warnings on web domains.'
        },
        badge: {
          es: 'Verificación Oficial',
          en: 'Official Verification'
        }
      }*/
    ]
  }
];
