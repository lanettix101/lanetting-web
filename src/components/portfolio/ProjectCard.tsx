import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { Project } from '../../data/portfolioData';
import { serviceImageSrcSet } from '../../data/serviceImages';
import { portfolioTranslations } from '../../i18n/portfolioTranslations';

const SKIN =
  'bg-brand-surface border border-brand-border rounded-lg overflow-hidden group flex flex-col justify-between hover:border-brand-primary/40 transition-colors shadow-xs';

const FOCUS = 'rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary';

interface ProjectCardProps {
  project: Project;
  language: 'es' | 'en';
  sizes: string;
  to?: string;
  className?: string;
}

export default function ProjectCard({ project, language, sizes, to, className = '' }: ProjectCardProps) {
  const title = project.title[language] || project.title.en;
  const category = project.category[language] || project.category.en;
  const summary = project.summary[language] || project.summary.en;
  const knowMore = portfolioTranslations[language].card.knowMore;

  const body = (
    <article className={`${SKIN} h-full`}>
      <div>
        <div className="w-full aspect-[4/3] bg-brand-bg flex items-center justify-center border-b border-brand-border overflow-hidden relative">
          <img
            src={`${import.meta.env.BASE_URL}${project.img}`}
            srcSet={serviceImageSrcSet(project.img, project.imgWidth)}
            sizes={sizes}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </div>
        <div className="p-6">
          <p className="text-xs font-mono font-medium uppercase tracking-wide text-brand-accent mb-2">{category}</p>
          <h3 className="text-lg font-bold text-brand-primary mb-2 line-clamp-2 min-h-[3.5rem]">{title}</h3>
          <p className="text-brand-text/75 text-sm mb-4 line-clamp-5 text-justify">{summary}</p>
        </div>
      </div>

      <div className="px-6 pb-6 pt-0 mt-auto flex items-center gap-1.5 border-t border-brand-border/0">
        <span className="text-xs font-mono font-medium uppercase tracking-wider text-brand-primary">
          {knowMore}
        </span>
        <ArrowRight
          className="h-3.5 w-3.5 text-brand-primary transition-transform duration-300 group-hover:translate-x-1"
          aria-hidden="true"
        />
      </div>
    </article>
  );

  if (!to) {
    return <div className={`${className} h-full`}>{body}</div>;
  }

  return (
    <Link to={to} className={`${FOCUS} ${className} h-full`}>
      {body}
    </Link>
  );
}
