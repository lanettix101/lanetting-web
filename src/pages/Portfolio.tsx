import ConsoleHeading from '../components/ui/ConsoleHeading';
import ProjectCard from '../components/portfolio/ProjectCard';
import { useLanguage } from '../i18n/LanguageContext';
import { portfolioTranslations } from '../i18n/portfolioTranslations';
import { getSortedProjects } from '../data/projectRelations';
import { portfolioCardSizes } from '../data/serviceImages';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { useScrollToTop } from '../hooks/useScrollToTop';

export default function Portfolio() {
  const { language } = useLanguage();
  const pt = portfolioTranslations[language];
  const projects = getSortedProjects();

  useScrollToTop();

  useDocumentMeta({
    title: pt.title,
    metaDescription: pt.metaDescription,
    path: '/portfolio',
  });

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center mb-10 gap-4">
          <div className="max-w-2xl flex flex-col items-center">
            <ConsoleHeading
              command={pt.command}
              text={pt.title}
              className="text-xl sm:text-2xl md:text-4xl font-bold text-brand-primary mb-4 text-center"
            />
            <p className="text-brand-accent text-center">{pt.desc}</p>
          </div>
        </div>

        {projects.length === 0 ? (
          <p className="text-center text-brand-text/70 py-16">{pt.empty}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard
                key={project.slug}
                project={project}
                language={language}
                sizes={portfolioCardSizes}
                to={`/portfolio/${project.slug}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
