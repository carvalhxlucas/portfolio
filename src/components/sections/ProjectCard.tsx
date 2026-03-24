'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import { GitHubIcon } from '@/components/ui/BrandIcons';
import Tag from '@/components/ui/Tag';
import { type Project } from '@/data/projects';

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const t = useTranslations('projects');

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className="glass glass-hover rounded-2xl overflow-hidden flex flex-col"
    >
      {/* Cover image */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-violet-900/20 via-blue-900/20 to-cyan-900/20">
        <Image
          src={project.coverImage}
          alt={project.coverImageAlt}
          fill
          className="object-cover opacity-90"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#06060f]/80 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6 gap-4">
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">{project.title}</h3>
          <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">{project.summary}</p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </div>

        {/* Footer */}
        <div className="mt-auto pt-2">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-violet-400 hover:text-violet-300 transition-colors group"
          >
            <GitHubIcon size={15} />
            {t('view_code')}
            <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
        </div>
      </div>
    </motion.article>
  );
}
