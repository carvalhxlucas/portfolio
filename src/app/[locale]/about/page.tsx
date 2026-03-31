'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { MapPin, Calendar } from 'lucide-react';
import GradientText from '@/components/ui/GradientText';
import GlassCard from '@/components/ui/GlassCard';
import { experience } from '@/data/experience';

export default function AboutPage() {
  const t = useTranslations('about');

  return (
    <div className="max-w-4xl mx-auto px-6 pt-28 pb-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-14"
      >
        <h1 className="text-4xl font-bold mb-3">
          <GradientText>{t('title')}</GradientText>
        </h1>
        <div className="flex flex-col gap-4 max-w-2xl">
          {t('bio').split('\n\n').map((paragraph, i) => (
            <p key={i} className="text-slate-400 text-lg leading-relaxed">{paragraph}</p>
          ))}
        </div>
      </motion.div>

      {/* Experience */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        <h2 className="text-xl font-semibold text-white mb-8">{t('experience')}</h2>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 top-3 bottom-3 w-px bg-gradient-to-b from-violet-500/40 via-blue-500/20 to-transparent" />

          <div className="flex flex-col gap-8 pl-8">
            {experience.map((item, i) => (
              <motion.div
                key={`${item.company}-${i}`}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="relative"
              >
                {/* Timeline dot */}
                <div className="absolute -left-8 top-4 w-2 h-2 rounded-full bg-violet-500 shadow-lg shadow-violet-500/50 -translate-x-[3px]" />

                <GlassCard className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                    <div>
                      <h3 className="text-white font-semibold text-lg">{item.company}</h3>
                      <p className="text-violet-300 text-sm font-medium">{item.role}</p>
                    </div>
                    <div className="flex flex-col sm:items-end gap-1 shrink-0">
                      <span className="inline-flex items-center gap-1.5 text-slate-500 text-xs">
                        <Calendar size={12} />
                        {item.period}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-slate-500 text-xs">
                        <MapPin size={12} />
                        {item.location}
                      </span>
                    </div>
                  </div>
                  <ul className="flex flex-col gap-2">
                    {item.highlights.map((highlight, j) => (
                      <li key={j} className="text-slate-400 text-sm leading-relaxed flex gap-3">
                        <span className="text-violet-500 mt-1.5 shrink-0">▸</span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
