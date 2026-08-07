'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Check } from 'lucide-react';
import { WhatsAppIcon } from '@/components/ui/BrandIcons';
import { whatsappUrl } from '@/data/site';
import { type Service } from '@/data/services';

interface ServiceCardProps {
  service: Service;
  index?: number;
}

export default function ServiceCard({ service, index = 0 }: ServiceCardProps) {
  const t = useTranslations('services');
  const Icon = service.icon;
  const features = t.raw(`${service.key}.features`) as string[];

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className="glass glass-hover rounded-2xl p-7 flex flex-col gap-5"
    >
      <div className="flex items-center gap-4">
        <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-300 shrink-0">
          <Icon size={22} />
        </span>
        <h3 className="text-lg font-semibold text-white">{t(`${service.key}.title`)}</h3>
      </div>

      <p className="text-slate-400 text-sm leading-relaxed">{t(`${service.key}.description`)}</p>

      <ul className="flex flex-col gap-2.5">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-sm text-slate-300">
            <Check size={15} className="text-violet-400 mt-0.5 shrink-0" />
            {feature}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-2">
        <a
          href={whatsappUrl(t(`${service.key}.whatsapp_message`))}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-accent text-white font-semibold text-sm shadow-[0_8px_24px_-8px_rgba(99,91,232,0.55)] hover:shadow-[0_10px_28px_-6px_rgba(99,91,232,0.7)] hover:-translate-y-0.5 transition-all duration-200"
        >
          <WhatsAppIcon size={16} />
          {t('cta')}
        </a>
      </div>
    </motion.article>
  );
}
