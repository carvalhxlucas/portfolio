'use client';

import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { MapPin, Calendar } from 'lucide-react';
import { type Locale } from '@/i18n/routing';
import PageHeader from '@/components/ui/PageHeader';
import GlassCard from '@/components/ui/GlassCard';
import { experience } from '@/data/experience';

export default function AboutPage() {
  const t = useTranslations('about');
  const locale = useLocale() as Locale;

  return (
    <div className="max-w-4xl mx-auto px-6 pt-28 pb-24">
      {/* Header */}
      <PageHeader eyebrow={t('subtitle')} title={t('title')} className="mb-6" />
      <div className="flex flex-col gap-4 max-w-2xl mb-14">
        {t('bio').split('\n\n').map((paragraph, i) => (
          <p key={i} className="text-slate-400 text-lg leading-relaxed">{paragraph}</p>
        ))}
      </div>

      {/* Experience */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        <h2 className="text-xl font-semibold text-white mb-8 tracking-tight">{t('experience')}</h2>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-violet-500/50 via-indigo-500/15 to-transparent" />

          <div className="flex flex-col gap-7 pl-8">
            {experience.map((item, i) => {
              const isCurrent = item.period.toLowerCase().includes('present');
              return (
                <motion.div
                  key={`${item.company}-${i}`}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: i * 0.06, duration: 0.5 }}
                  className="relative"
                >
                  {/* Timeline dot */}
                  <span
                    className={`absolute -left-8 top-[1.35rem] w-2 h-2 rounded-full -translate-x-[3px] ${
                      isCurrent
                        ? 'bg-violet-400 shadow-[0_0_0_3px_rgba(167,139,250,0.15),0_0_16px_rgba(167,139,250,0.55)]'
                        : 'bg-slate-600'
                    }`}
                  />

                  <GlassCard className="p-6 sm:p-7">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                      <div>
                        <div className="flex items-center gap-2.5">
                          <h3 className="text-white font-semibold text-lg tracking-tight">{item.company}</h3>
                          {isCurrent && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide uppercase text-violet-300 bg-violet-500/10 border border-violet-500/25">
                              Current
                            </span>
                          )}
                        </div>
                        <p className="text-indigo-300/90 text-sm font-medium mt-0.5">{item.role}</p>
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
                    <ul className="flex flex-col gap-2.5">
                      {item.highlights[locale].map((highlight, j) => (
                        <li key={j} className="text-slate-400 text-sm leading-relaxed flex gap-3">
                          <span className="mt-[7px] w-1 h-1 rounded-full bg-violet-400/70 shrink-0" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
