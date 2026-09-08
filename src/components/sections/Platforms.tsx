import { ExternalLink } from 'lucide-react';
import ConsoleHeading from '../ui/ConsoleHeading';
import { useLanguage } from '../../i18n/LanguageContext';

const platforms = [
  {
    name: 'Legiit',
    img: 'img_platform_legiit_1x1.webp',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem. Sed ut perspiciatis unde omnis.',
    link: 'https://legiit.com/lanetting'
  },
  {
    name: 'Contra',
    img: 'img_platform_contra_1x1.webp',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    link: 'https://contra.com/luis_antonio_lanetti_kl77nmhr/services?r=luis_antonio_lanetti_kl77nmhr'
  },
  {
    name: 'Upwork',
    img: 'img_platform_upwork_1x1.webp',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    link: 'https://www.upwork.com/freelancers/~01eee7a32f933b7192'
  }
];

export default function Platforms() {
  const { t } = useLanguage();

  return (
    <section id="platforms" className="py-16 md:py-24 bg-brand-surface border-y border-brand-border">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-12 flex flex-col items-center">
          <ConsoleHeading command={t.platforms.command} text={t.platforms.title} className="text-xl sm:text-2xl md:text-4xl font-bold text-brand-primary mb-4" />
          <p className="text-brand-accent max-w-2xl mx-auto">
            {t.platforms.desc}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {platforms.map((platform, idx) => (
            <a 
              key={idx}
              href={platform.link}
              className="group block bg-brand-bg border border-brand-border rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
            >
              <div className="flex items-start gap-6">
                <div className="w-20 h-20 shrink-0 bg-brand-surface border border-brand-border rounded-lg overflow-hidden flex items-center justify-center group-hover:border-brand-primary transition-colors">
                  <img 
                    src={`${import.meta.env.BASE_URL}${platform.img}`} 
                    alt={platform.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-brand-primary">{platform.name}</h3>
                    <ExternalLink className="w-5 h-5 text-brand-accent group-hover:text-brand-primary transition-colors" />
                  </div>
                  <p className="text-brand-text/70 text-sm leading-relaxed mb-4">
                    {platform.description}
                  </p>
                  <span className="mt-1 inline-flex items-center gap-1.5 rounded-md border border-brand-primary/40 bg-brand-primary/5 px-3 py-1.5 text-sm font-medium text-brand-primary transition-colors group-hover:border-brand-primary group-hover:bg-brand-primary group-hover:text-brand-surface">
                    {t.platforms.viewProfile}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
