import { Github, ExternalLink } from 'lucide-react';

const BASE =
  'inline-flex items-center justify-center gap-2 px-6 py-3 font-medium rounded-lg transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary';

const PRIMARY = `${BASE} bg-brand-primary text-brand-bg hover:opacity-90`;
const SECONDARY = `${BASE} border border-brand-border bg-brand-surface text-brand-primary hover:border-brand-primary/40`;

export default function ProjectLinks({
  githubUrl,
  demoUrl,
  language,
}: {
  githubUrl?: string;
  demoUrl?: string;
  language: 'es' | 'en';
}) {
  if (!githubUrl && !demoUrl) return null;

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      {demoUrl && (
        <a href={demoUrl} target="_blank" rel="noopener noreferrer" className={PRIMARY}>
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
          {language === 'es' ? 'Conoce el proyecto' : 'See it running'}
        </a>
      )}
      {githubUrl && (
        <a href={githubUrl} target="_blank" rel="noopener noreferrer" className={demoUrl ? SECONDARY : PRIMARY}>
          <Github className="h-4 w-4" aria-hidden="true" />
          {language === 'es' ? 'Ver en GitHub' : 'View on GitHub'}
        </a>
      )}
    </div>
  );
}
