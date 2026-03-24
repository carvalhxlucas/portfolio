import { useTranslations } from 'next-intl';
import ProjectCard from '@/components/sections/ProjectCard';
import GradientText from '@/components/ui/GradientText';
import { projects } from '@/data/projects';

export default function ProjectsPage() {
  const t = useTranslations('projects');

  return (
    <div className="max-w-6xl mx-auto px-6 pt-28 pb-24">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-3">
          <GradientText>{t('title')}</GradientText>
        </h1>
        <p className="text-slate-400 text-lg">{t('subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
      </div>
    </div>
  );
}
