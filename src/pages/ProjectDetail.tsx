import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, CircleDot, Target, Wrench, ListChecks, Boxes } from 'lucide-react';
import ProjectLinks from '../components/portfolio/ProjectLinks';
import PortfolioWorkflow from '../components/portfolio/PortfolioWorkflow';
import { useLanguage } from '../i18n/LanguageContext';
import { portfolioTranslations } from '../i18n/portfolioTranslations';
import { getProjectBySlug, getServiceById, getServiceIdsForProject } from '../data/projectRelations';
import { serviceImageSrcSet } from '../data/serviceImages';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { useScrollToTop } from '../hooks/useScrollToTop';
import NotFound from './NotFound';

export default function ProjectDetail() {
  const { slug } = useParams();
  const { language } = useLanguage();
  const pt = portfolioTranslations[language];
  const project = getProjectBySlug(slug);

  useScrollToTop();

  const related = getServiceIdsForProject(slug ?? '')
    .map((id) => getServiceById(id))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  useDocumentMeta({
    title: project ? project.title[language] || project.title.en : pt.detail.notFoundTitle,
    metaDescription: project ? project.summary[language] || project.summary.en : pt.detail.notFoundDesc,
    path: project ? `/portfolio/${project.slug}` : '/portfolio',
    noindex: !project,
    ogImage: project?.img,
    ogImageWidth: project?.imgWidth,
    ogImageHeight: project ? Math.round((project.imgWidth * 3) / 4) : undefined,
  });

  if (!project) return <NotFound />;

  const title = project.title[language] || project.title.en;
  const category = project.category[language] || project.category.en;
  const summary = project.summary[language] || project.summary.en;
  const challenge = project.challenge[language] || project.challenge.en;
  const solution = project.solution[language] || project.solution.en;
  const stack = project.stack[language] || project.stack.en;
  const stackItems = stack.split(' · ');
  const benefits = project.benefits[language] || project.benefits.en;

  return (
    <article>
      <header className="relative w-full overflow-hidden">
        <img
          src={`${import.meta.env.BASE_URL}${project.img}`}
          srcSet={serviceImageSrcSet(project.img, project.imgWidth)}
          sizes="100vw"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
        <div
          className="absolute inset-x-0 bottom-0 h-90 bg-gradient-to-t from-black/90 via-black/75 to-transparent"
          aria-hidden="true"
        />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/20 to-transparent" aria-hidden="true" />

        <div className="first-viewport relative w-full flex flex-col justify-between p-5 sm:p-8 md:p-12">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 self-start rounded-full border border-white/25 bg-black/20 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm hover:border-brand-primary hover:bg-brand-primary hover:text-brand-bg transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {pt.detail.back}
          </Link>

          <div className="max-w-4xl">
            <p className="text-sm font-mono font-medium uppercase tracking-wide text-white/85 mb-3">{category}</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold text-white mb-4">{title}</h1>
            <p className="text-white/90 text-base md:text-lg text-justify">{summary}</p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-10 md:py-14">
        <div className="mb-10">
          <ProjectLinks githubUrl={project.githubUrl} demoUrl={project.demoUrl} language={language} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <section className="bg-brand-surface border border-brand-border rounded-lg p-6">
            <h2 className="flex items-center gap-2 text-lg font-bold text-brand-primary mb-3">
              <Target className="h-5 w-5" aria-hidden="true" />
              {pt.detail.challengeTitle}
            </h2>
            <p className="text-brand-text/80 text-sm text-justify">{challenge}</p>
          </section>

          <section className="bg-brand-surface border border-brand-border rounded-lg p-6">
            <h2 className="flex items-center gap-2 text-lg font-bold text-brand-primary mb-3">
              <Wrench className="h-5 w-5" aria-hidden="true" />
              {pt.detail.solutionTitle}
            </h2>
            <p className="text-brand-text/80 text-sm text-justify">{solution}</p>
          </section>
        </div>

        {project.workflow && (
          <section className="mb-10">
            <h2 className="flex items-center gap-2 text-lg font-bold text-brand-primary mb-4">
              <CircleDot className="h-5 w-5" aria-hidden="true" />
              {pt.detail.workflowTitle}
            </h2>
            <PortfolioWorkflow workflow={project.workflow} language={language} idPrefix={project.slug} />
          </section>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <section className="bg-brand-surface border border-brand-border rounded-lg p-6">
            <h2 className="flex items-center gap-2 text-lg font-bold text-brand-primary mb-4">
              <ListChecks className="h-5 w-5" aria-hidden="true" />
              {pt.detail.benefitsTitle}
            </h2>
            <ul className="space-y-2">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex gap-2 text-brand-text/80 text-sm">
                  <span className="text-brand-primary font-bold" aria-hidden="true">
                    ›
                  </span>
                  <span className="text-justify">{benefit}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-brand-surface border border-brand-border rounded-lg p-6">
            <h2 className="flex items-center gap-2 text-lg font-bold text-brand-primary mb-4">
              <Boxes className="h-5 w-5" aria-hidden="true" />
              {pt.detail.stackTitle}
            </h2>
            <ul className="flex flex-wrap gap-2">
              {stackItems.map((item) => (
                <li
                  key={item}
                  className="inline-flex items-center rounded-md border border-brand-border bg-brand-bg px-3 py-1.5 text-xs font-mono font-medium text-brand-accent"
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {related.length > 0 && (
          <section className="bg-brand-surface border border-brand-border rounded-lg p-6">
            <h2 className="text-lg font-bold text-brand-primary mb-4">{pt.detail.relatedTitle}</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {related.map((service) => (
                <li key={service.id}>
                  <Link
                    to={`/service/${service.slug}`}
                    className="flex items-center gap-2 rounded-md border border-brand-border bg-brand-bg px-4 py-3 text-sm font-medium text-brand-primary hover:border-brand-primary/40 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
                  >
                    <span>{service.title[language] || service.title.en}</span>
                    <ArrowLeft className="h-4 w-4 rotate-180 ms-auto" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </article>
  );
}
