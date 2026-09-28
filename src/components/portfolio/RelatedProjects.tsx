import { Boxes } from 'lucide-react';
import ProjectCard from './ProjectCard';
import { useLanguage } from '../../i18n/LanguageContext';
import { portfolioTranslations } from '../../i18n/portfolioTranslations';
import { getProjectsForService } from '../../data/projectRelations';
import { portfolioCardSizes } from '../../data/serviceImages';

export default function RelatedProjects({ serviceId }: { serviceId: number }) {
  const { language } = useLanguage();
  const pt = portfolioTranslations[language];
  const projects = getProjectsForService(serviceId);

  if (projects.length === 0) return null;

  return (
    <section className="py-10 md:py-12">
      <div className="flex flex-col items-center text-center mb-8 gap-2">
        <h2 className="flex items-center gap-2 text-xl sm:text-2xl font-bold text-brand-primary">
          <Boxes className="h-5 w-5" aria-hidden="true" />
          {pt.serviceRelatedTitle}
        </h2>
        <p className="text-brand-accent max-w-2xl text-center">{pt.serviceRelatedDesc}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
    </section>
  );
}
