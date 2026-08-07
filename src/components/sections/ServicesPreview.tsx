'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ArrowRight } from 'lucide-react';
import { services } from '@/data/services';

export default function ServicesPreview() {
  const t = useTranslations('services');

  return (
    <section className="max-w-6xl mx-auto px-6 pb-24">
      <div className="flex items-center justify-between mb-10">
        <div>
          <span className="eyebrow mb-3">{t('eyebrow')}</span>
          <h2 className="text-2xl font-bold text-white tracking-tight mt-2">{t('home_title')}</h2>
        </div>
        <Link
          href="/services"
          className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors group"
        >
          {t('home_link')}
          <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {services.map((service, i) => {
          const Icon = service.icon;
          return (
            <motion.div
              key={service.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              <Link
                href="/services"
                className="glass glass-hover rounded-2xl p-6 flex flex-col gap-4 h-full group"
              >
                <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-300 shrink-0">
                  <Icon size={20} />
                </span>
                <h3 className="text-[15px] font-semibold text-white leading-snug">
                  {t(`${service.key}.title`)}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">
                  {t(`${service.key}.description`)}
                </p>
                <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-violet-400 group-hover:text-violet-300 transition-colors">
                  {t('home_card_link')}
                  <ArrowRight
                    size={13}
                    className="group-hover:translate-x-0.5 transition-transform"
                  />
                </span>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
