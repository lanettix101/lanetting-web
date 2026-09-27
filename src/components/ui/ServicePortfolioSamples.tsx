import { useState } from 'react';
import { ExternalLink, Play, Image as ImageIcon, Code2, CheckCircle2, Maximize2, X, Globe } from 'lucide-react';
import { MediaSample } from '../../data/servicesData';
import { useLanguage } from '../../i18n/LanguageContext';

interface ServicePortfolioSamplesProps {
  samples?: MediaSample[];
}

export default function ServicePortfolioSamples({ samples }: ServicePortfolioSamplesProps) {
  const { language } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<MediaSample | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'image' | 'video' | 'iframe' | 'link'>('all');

  if (!samples || samples.length === 0) {
    return null;
  }

  const filteredSamples = activeTab === 'all'
    ? samples
    : samples.filter(s => s.type === activeTab);

  const tabs = [
    { id: 'all', label: language === 'es' ? 'Todos los recursos' : 'All Resources', count: samples.length },
    ...(samples.some(s => s.type === 'iframe') ? [{ id: 'iframe', label: language === 'es' ? 'Demos' : 'Demos', count: samples.filter(s => s.type === 'iframe').length }] : []),
    ...(samples.some(s => s.type === 'image') ? [{ id: 'image', label: language === 'es' ? 'Imagenes' : 'Reports & Images', count: samples.filter(s => s.type === 'image').length }] : []),
    ...(samples.some(s => s.type === 'video') ? [{ id: 'video', label: language === 'es' ? 'Videos' : 'Videos & Walkthroughs', count: samples.filter(s => s.type === 'video').length }] : []),
    ...(samples.some(s => s.type === 'link') ? [{ id: 'link', label: language === 'es' ? 'Enlaces y Referencias' : 'Links & References', count: samples.filter(s => s.type === 'link').length }] : []),
  ];

  return (
    <div className="mt-12 pt-10 border-t border-brand-border" id="portfolio-samples">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-primary/10 text-brand-primary text-xs font-mono font-bold uppercase tracking-wider rounded-full mb-2">
            <Code2 className="w-3.5 h-3.5" />
            {language === 'es' ? 'Evidencia Técnica y Muestras' : 'Proof of Work & Samples'}
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-brand-primary">
            {language === 'es' ? 'Muestras y Portafolio' : 'Representative Samples & Portfolio'}
          </h2>
          <p className="text-sm text-brand-accent mt-1">
            {language === 'es'
              ? 'Conoce casos de estudio, demostraciones en vivo, reportes técnicos y recursos asociados a este servicio.'
              : 'Explore live demos, case studies, technical reports, and benchmark assets for this service.'}
          </p>
        </div>

        {tabs.length > 2 && (
          <div className="flex flex-wrap gap-1.5 p-1 bg-brand-bg rounded-lg border border-brand-border">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${activeTab === tab.id
                    ? 'bg-brand-surface text-brand-primary shadow-xs font-semibold border border-brand-border'
                    : 'text-brand-accent hover:text-brand-primary'
                  }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSamples.map((sample) => {
          const sampleTitle = sample.title[language] || sample.title.en;
          const sampleDesc = sample.description[language] || sample.description.en;
          const sampleBadge = sample.badge ? (sample.badge[language] || sample.badge.en) : null;

          if (sample.type === 'iframe') {
            return (
              <div
                key={sample.id}
                className="md:col-span-2 bg-brand-surface border border-brand-border rounded-lg overflow-hidden shadow-sm flex flex-col"
              >
                <div className="bg-brand-bg px-4 py-2.5 border-b border-brand-border flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-400/80 inline-block"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/80 inline-block"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-green-400/80 inline-block"></span>
                    </div>
                    <span className="text-xs font-mono text-brand-accent ml-2 truncate max-w-[12.5rem] sm:max-w-md">
                      {sample.url}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {sampleBadge && (
                      <span className="px-2 py-0.5 text-[0.625rem] font-mono font-bold bg-brand-primary/10 text-brand-primary rounded">
                        {sampleBadge}
                      </span>
                    )}
                    <a
                      href={sample.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-brand-accent hover:text-brand-primary inline-flex items-center gap-1 font-mono transition-colors"
                      title={language === 'es' ? 'Abrir en pestaña nueva' : 'Open in new tab'}
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] bg-brand-bg min-h-[18.75rem]">
                  <iframe
                    src={sample.url}
                    title={sampleTitle}
                    className="w-full h-full border-0"
                    loading="lazy"
                    sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                  />
                </div>

                <div className="p-4 bg-brand-surface border-t border-brand-border">
                  <h3 className="text-base font-bold text-brand-primary">{sampleTitle}</h3>
                  <p className="text-sm text-brand-text/75 mt-1">{sampleDesc}</p>
                </div>
              </div>
            );
          }

          if (sample.type === 'video') {
            return (
              <div
                key={sample.id}
                className="md:col-span-2 bg-brand-surface border border-brand-border rounded-lg overflow-hidden shadow-sm flex flex-col"
              >
                <div className="bg-brand-bg px-4 py-2.5 border-b border-brand-border flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Play className="w-4 h-4 text-brand-primary" />
                    <span className="text-xs font-mono font-semibold text-brand-primary">
                      {language === 'es' ? 'REPRODUCTOR' : 'WALKTHROUGH DEMO'}
                    </span>
                  </div>
                  {sampleBadge && (
                    <span className="px-2 py-0.5 text-[0.625rem] font-mono font-bold bg-brand-primary/10 text-brand-primary rounded">
                      {sampleBadge}
                    </span>
                  )}
                </div>

                <div className="relative w-full aspect-video bg-black">
                  <iframe
                    src={sample.url}
                    title={sampleTitle}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>

                <div className="p-4 bg-brand-surface border-t border-brand-border">
                  <h3 className="text-base font-bold text-brand-primary">{sampleTitle}</h3>
                  <p className="text-sm text-brand-text/75 mt-1">{sampleDesc}</p>
                </div>
              </div>
            );
          }

          if (sample.type === 'image') {
            return (
              <div
                key={sample.id}
                className="bg-brand-surface border border-brand-border rounded-lg overflow-hidden shadow-sm flex flex-col group hover:border-brand-primary/40 transition-colors"
              >
                <div className="relative aspect-[4/3] bg-brand-bg overflow-hidden cursor-pointer" onClick={() => setSelectedImage(sample)}>
                  <img
                    src={sample.url}
                    alt={sampleTitle}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-brand-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="p-2 bg-brand-surface/90 rounded-full text-brand-primary shadow-md backdrop-blur-xs">
                      <Maximize2 className="w-4 h-4" />
                    </span>
                  </div>
                  {sampleBadge && (
                    <span className="absolute top-3 left-3 px-2 py-0.5 text-[0.625rem] font-mono font-bold bg-brand-surface/90 text-brand-primary rounded shadow-xs">
                      {sampleBadge}
                    </span>
                  )}
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-brand-primary mb-1 flex items-start justify-between gap-2">
                      <span>{sampleTitle}</span>
                      <ImageIcon className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" />
                    </h3>
                    <p className="text-sm text-brand-text/75">{sampleDesc}</p>
                  </div>
                  <button
                    onClick={() => setSelectedImage(sample)}
                    className="mt-4 text-xs font-medium text-brand-primary hover:underline self-start inline-flex items-center gap-1"
                  >
                    {language === 'es' ? 'Ver en tamaño completo' : 'View full image'} <Maximize2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          }

          if (sample.type === 'link') {
            return (
              <a
                key={sample.id}
                href={sample.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brand-surface border border-brand-border rounded-lg p-5 shadow-sm flex flex-col justify-between hover:border-brand-primary/50 hover:shadow-md transition-all group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="w-8 h-8 rounded-md bg-brand-primary/10 flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-colors">
                      <Globe className="w-4 h-4" />
                    </div>
                    {sampleBadge && (
                      <span className="px-2 py-0.5 text-[0.625rem] font-mono font-bold bg-brand-primary/10 text-brand-primary rounded">
                        {sampleBadge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-brand-primary group-hover:text-brand-primary transition-colors flex items-center gap-1.5 mb-1.5">
                    {sampleTitle}
                  </h3>
                  <p className="text-sm text-brand-text/75 line-clamp-3">
                    {sampleDesc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-brand-border flex items-center justify-between text-xs text-brand-accent group-hover:text-brand-primary font-medium">
                  <span className="truncate max-w-[12.5rem] font-mono">{sample.url.replace(/^https?:\/\//, '')}</span>
                  <ExternalLink className="w-3.5 h-3.5 shrink-0 ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </a>
            );
          }

          return null;
        })}
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-brand-surface rounded-lg overflow-hidden border border-brand-border shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 bg-brand-bg border-b border-brand-border flex items-center justify-between">
              <div>
                <h4 className="font-bold text-brand-primary text-sm sm:text-base">
                  {selectedImage.title[language] || selectedImage.title.en}
                </h4>
                <p className="text-xs text-brand-accent">
                  {selectedImage.description[language] || selectedImage.description.en}
                </p>
              </div>
              <button
                onClick={() => setSelectedImage(null)}
                className="p-1.5 rounded-md hover:bg-brand-surface text-brand-accent hover:text-brand-primary transition-colors"
                aria-label="Close image"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="max-h-[75vh] overflow-auto bg-black flex items-center justify-center">
              <img
                src={selectedImage.url}
                alt={selectedImage.title[language] || selectedImage.title.en}
                className="max-w-full max-h-[75vh] object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
