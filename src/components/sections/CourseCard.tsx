'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { FileText } from 'lucide-react';
import { type Course } from '@/data/courses';

const issuerColors: Record<string, string> = {
  'Stanford University': 'text-red-400 bg-red-500/10 border-red-500/20',
  IBM: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
  Google: 'text-green-400 bg-green-500/10 border-green-500/20',
  Meta: 'text-sky-400 bg-sky-500/10 border-sky-500/20',
  Rocketseat: 'text-violet-400 bg-violet-500/10 border-violet-500/20',
};

const defaultColor = 'text-slate-400 bg-white/5 border-white/10';

interface CourseCardProps {
  course: Course;
  index?: number;
}

export default function CourseCard({ course, index = 0 }: CourseCardProps) {
  const t = useTranslations('courses');
  const colorClass = issuerColors[course.issuer] ?? defaultColor;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="glass glass-hover rounded-xl p-5 flex flex-col gap-3"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-white font-medium text-sm leading-snug mb-1">{course.name}</h3>
          <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full border ${colorClass}`}>
            {course.issuer}
          </span>
        </div>
      </div>

      <p className="text-slate-500 text-xs leading-relaxed">{course.description}</p>

      <a
        href={course.credentialUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-violet-300 transition-colors mt-auto"
      >
        <FileText size={12} />
        {t('view_certificate')}
      </a>
    </motion.div>
  );
}
