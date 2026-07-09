import { useTranslations } from 'next-intl';
import ProjectCard from '@/components/sections/ProjectCard';
import PageHeader from '@/components/ui/PageHeader';
import { projects } from '@/data/projects';

export default function ProjectsPage() {
  const t = useTranslations('projects');

  return (
    <div className="max-w-6xl mx-auto px-6 pt-28 pb-24">
      <PageHeader eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
      </div>
    </div>
  );
}
