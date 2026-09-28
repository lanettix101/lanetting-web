import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Clock,
  CheckCircle2,
  Cpu,
  Layers,
  Terminal,
  ArrowRight,
  Mail,
  Calendar,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { lazy, Suspense, useMemo } from 'react';
import ConsoleHeading from '../components/ui/ConsoleHeading';
import { useLanguage } from '../i18n/LanguageContext';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { useScrollToTop } from '../hooks/useScrollToTop';
import { servicesData } from '../data/servicesData';
import { serviceImageSrcSet, serviceDetailSizes } from '../data/serviceImages';

const RelatedProjects = lazy(() => import('../components/portfolio/RelatedProjects'));

const ServicePortfolioSamples = lazy(
  () => import('../components/ui/ServicePortfolioSamples')
);

export default function ServiceDetail() {
  const { id } = useParams<{ id: string }>();
  const { t, language } = useLanguage();

  useScrollToTop();

  const { service, prevService, nextService } = useMemo(() => {
    if (!id) return { service: null, prevService: null, nextService: null };

    const currentIndex = servicesData.findIndex(
      s => s.slug === id || s.id.toString() === id
    );

    if (currentIndex === -1) {
      return { service: null, prevService: null, nextService: null };
    }

    const current = servicesData[currentIndex];
    const prev = currentIndex > 0 ? servicesData[currentIndex - 1] : servicesData[servicesData.length - 1];
    const next = currentIndex < servicesData.length - 1 ? servicesData[currentIndex + 1] : servicesData[0];

    return { service: current, prevService: prev, nextService: next };
  }, [id]);

  useDocumentMeta({
    title: service ? (service.title[language] || service.title.en) : t.serviceDetail.notFoundTitle,
    metaDescription: service
      ? (service.shortDesc[language] || service.shortDesc.en)
      : t.serviceDetail.notFoundDesc,
    path: service ? `/service/${service.slug}` : '/',
    noindex: !service,
  });

  if (!service) {
    return (
      <div className="container mx-auto px-4 py-24 max-w-4xl min-h-[70vh] flex flex-col items-center justify-center text-center">
        <div className="p-4 bg-brand-primary/10 rounded-full text-brand-primary mb-4">
          <Terminal className="w-8 h-8" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-brand-primary mb-2">
          {t.serviceDetail.notFoundTitle}
        </h1>
        <p className="text-brand-accent mb-8">
          {t.serviceDetail.notFoundDesc}
        </p>
        <Link
          to="/#services"
          className="inline-flex items-center px-5 py-2.5 bg-brand-primary text-brand-bg rounded-md font-medium hover:opacity-90 transition-opacity"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> {t.serviceDetail.back}
        </Link>
      </div>
    );
  }

  const title = service.title[language] || service.title.en;
  const category = service.category[language] || service.category.en;
  const fullDesc = service.fullDesc[language] || service.fullDesc.en;
  const methodology = service.methodology[language] || service.methodology.en;
  const features = service.features[language] || service.features.en;
  const deliverables = service.deliverables[language] || service.deliverables.en;
  const sla = service.slaOrTimeline[language] || service.slaOrTimeline.en;

  return (
    <div className="container mx-auto px-4 py-16 md:py-24 max-w-5xl">
      <div className="flex items-center justify-between gap-4 mb-8">
        <Link
          to="/#services"
          className="inline-flex items-center text-brand-accent hover:text-brand-primary font-medium text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary rounded-sm"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> {t.serviceDetail.back}
        </Link>
      </div>

      <ConsoleHeading
        as="h1"
        command={`${t.serviceDetail.commandPrefix}${service.slug}.spec`}
        text={title}
        className="text-2xl sm:text-3xl md:text-5xl font-bold text-brand-primary mb-6"
      />

      <div className="flex flex-wrap items-center gap-3 mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-primary/10 text-brand-primary text-xs font-mono font-bold uppercase tracking-wider rounded-full">
          <Terminal className="w-3.5 h-3.5" />
          {category}
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-surface border border-brand-border text-brand-accent text-xs font-mono rounded-full">
          <Clock className="w-3.5 h-3.5 text-brand-primary" />
          <span>SLA: {sla}</span>
        </div>
      </div>

      <div className="space-y-10">
        <div className="bg-brand-surface border border-brand-border rounded-xl overflow-hidden shadow-xs">
          <div className="w-full aspect-[4/3] bg-brand-bg border-b border-brand-border overflow-hidden flex items-center justify-center">
            <img
              src={`${import.meta.env.BASE_URL}${service.img}`}
              srcSet={serviceImageSrcSet(service.img, service.imgWidth)}
              sizes={serviceDetailSizes}
              alt={title}
              className="w-full h-full object-cover"
              loading="eager"
              fetchPriority="high"
            />
          </div>

          <div className="p-6 sm:p-8 md:p-10">
            <h2 className="text-xl font-bold text-brand-primary mb-4 flex items-center gap-2">
              <Layers className="w-5 h-5 text-brand-primary" />
              {t.serviceDetail.overviewTitle}
            </h2>
            <p className="text-brand-text/85 text-base sm:text-lg leading-relaxed mb-6">
              {fullDesc}
            </p>

            <div className="mt-8 p-6 bg-brand-bg rounded-lg border border-brand-border">
              <h3 className="text-sm font-mono font-bold text-brand-primary uppercase tracking-wider mb-2 flex items-center gap-2">
                <Terminal className="w-4 h-4" />
                {t.serviceDetail.methodologyTitle}
              </h3>
              <p className="text-brand-text/80 text-sm sm:text-base leading-relaxed
              whitespace-pre-line">
                {methodology}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-brand-surface border border-brand-border rounded-xl p-6 sm:p-8 shadow-xs flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-bold text-brand-primary mb-5 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-brand-primary" />
                {t.serviceDetail.featuresTitle}
              </h2>
              <ul className="space-y-3.5">
                {features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-brand-text/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-primary mt-2 shrink-0"></span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-brand-surface border border-brand-border rounded-xl p-6 sm:p-8 shadow-xs flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-bold text-brand-primary mb-5 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                {t.serviceDetail.deliverablesTitle}
              </h2>
              <ul className="space-y-3.5">
                {deliverables.map((deliverable, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-brand-text/80">
                    <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400 mt-1 shrink-0" />
                    <span>{deliverable}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-brand-surface border border-brand-border rounded-xl p-6 sm:p-8 shadow-xs">
          <h2 className="text-lg font-bold text-brand-primary mb-4 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-brand-primary" />
            {t.serviceDetail.techStackTitle}
          </h2>
          <div className="flex flex-wrap gap-2.5">
            {service.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 bg-brand-bg border border-brand-border text-brand-primary text-xs sm:text-sm font-mono font-medium rounded-md"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {service.samples && service.samples.length > 0 && (
          <Suspense fallback={null}>
            <ServicePortfolioSamples samples={service.samples} />
          </Suspense>
        )}

        <div className="bg-brand-primary text-white dark:bg-brand-surface dark:text-brand-text border dark:border-brand-border rounded-xl p-8 sm:p-10 shadow-md">
          <div className="max-w-2xl">
            <h2 className="text-xl sm:text-2xl font-bold mb-3">
              {t.serviceDetail.ctaTitle}
            </h2>
            <p className="text-white/80 dark:text-brand-text/80 text-sm sm:text-base mb-6 leading-relaxed">
              {t.serviceDetail.ctaDesc}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/#contact"
                className="inline-flex items-center px-6 py-3 bg-white text-brand-primary dark:bg-brand-primary dark:text-white rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                <Calendar className="w-4 h-4 mr-2" />
                {t.serviceDetail.ctaButton}
              </Link>
              <Link
                to="/#platforms"
                className="inline-flex items-center px-6 py-3 bg-transparent border border-white/40 dark:border-brand-border text-white dark:text-brand-primary rounded-lg font-semibold text-sm hover:bg-white/10 dark:hover:bg-brand-bg transition-colors"
              >
                {t.serviceDetail.viewOnMarketplaces}
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>

        <Suspense fallback={null}>
          <RelatedProjects serviceId={service.id} />
        </Suspense>

        <div className="pt-8 border-t border-brand-border grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prevService && (
            <Link
              to={`/service/${prevService.slug}`}
              className="p-4 bg-brand-surface border border-brand-border rounded-lg hover:border-brand-primary/40 transition-colors group flex items-center gap-3"
            >
              <ArrowLeft className="w-4 h-4 text-brand-accent group-hover:-translate-x-1 transition-transform" />
              <div className="overflow-hidden">
                <span className="text-xs text-brand-accent block font-mono">{t.serviceDetail.prevService}</span>
                <span className="text-sm font-bold text-brand-primary truncate block">
                  {prevService.title[language] || prevService.title.en}
                </span>
              </div>
            </Link>
          )}

          {nextService && (
            <Link
              to={`/service/${nextService.slug}`}
              className="p-4 bg-brand-surface border border-brand-border rounded-lg hover:border-brand-primary/40 transition-colors group flex items-center justify-between gap-3 text-right"
            >
              <div className="overflow-hidden w-full">
                <span className="text-xs text-brand-accent block font-mono">{t.serviceDetail.nextService}</span>
                <span className="text-sm font-bold text-brand-primary truncate block">
                  {nextService.title[language] || nextService.title.en}
                </span>
              </div>
              <ArrowRight className="w-4 h-4 text-brand-accent group-hover:translate-x-1 transition-transform shrink-0" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
