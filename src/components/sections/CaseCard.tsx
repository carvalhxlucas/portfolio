'use client';

import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { ArrowRight, Building2 } from 'lucide-react';
import { Link, type Locale } from '@/i18n/routing';
import Tag from '@/components/ui/Tag';
import { type CaseStudy } from '@/data/cases';

interface CaseCardProps {
  caseStudy: CaseStudy;
  index?: number;
}

export default function CaseCard({ caseStudy, index = 0 }: CaseCardProps) {
  const t = useTranslations('cases');
  const locale = useLocale() as Locale;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className="glass glass-hover rounded-2xl overflow-hidden flex flex-col"
    >
      <div className="flex flex-col flex-1 p-6 gap-4">
        {/* Client / sector / year */}
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 font-medium">
            <Building2 size={12} className="text-violet-400" />
            {caseStudy.client}
          </span>
          <span>{caseStudy.sector[locale]}</span>
          <span className="text-slate-600">·</span>
          <span>{caseStudy.year}</span>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-2">{caseStudy.title[locale]}</h3>
          <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">
            {caseStudy.summary[locale]}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {caseStudy.tags.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </div>

        {/* Footer */}
        <div className="mt-auto pt-2">
          <Link
            href={`/cases/${caseStudy.slug}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-violet-400 hover:text-violet-300 transition-colors group"
          >
            {t('view_case')}
            <ArrowRight
              size={14}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
