import { useTranslations } from 'next-intl';
import Hero from '@/components/sections/Hero';
import ProjectCard from '@/components/sections/ProjectCard';
import GradientText from '@/components/ui/GradientText';
import { projects } from '@/data/projects';
import { Link } from '@/i18n/routing';
import { ArrowRight } from 'lucide-react';

function FeaturedProjects() {
  const t = useTranslations('hero');
  const tProjects = useTranslations('projects');
  const featured = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <section className="max-w-6xl mx-auto px-6 pb-24">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-2xl font-bold">
          <GradientText>{t('featured')}</GradientText>
        </h2>
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors group"
        >
          {tProjects('title')}
          <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {featured.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
    </>
  );
}
