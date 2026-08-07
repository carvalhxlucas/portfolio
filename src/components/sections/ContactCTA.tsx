'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { WhatsAppIcon, LinkedInIcon } from '@/components/ui/BrandIcons';
import { whatsappUrl, LINKEDIN_URL } from '@/data/site';

export default function ContactCTA() {
  const t = useTranslations('contact');

  return (
    <section id="contato" className="max-w-6xl mx-auto px-6 pb-24 scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5 }}
        className="relative glass rounded-3xl px-8 py-14 sm:px-14 text-center overflow-hidden"
      >
        {/* Ambient glow */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute top-[-60%] left-1/2 -translate-x-1/2 w-[30rem] h-[30rem] rounded-full bg-violet-600/15 blur-[120px]" />
        </div>

        <div className="flex flex-col items-center gap-5">
          <span className="eyebrow">{t('eyebrow')}</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            {t('title')}
          </h2>
          <p className="max-w-xl text-slate-400 leading-relaxed">{t('subtitle')}</p>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-3">
            <a
              href={whatsappUrl(t('whatsapp_message'))}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-accent text-white font-semibold text-sm shadow-[0_8px_24px_-8px_rgba(99,91,232,0.55)] hover:shadow-[0_10px_28px_-6px_rgba(99,91,232,0.7)] hover:-translate-y-0.5 transition-all duration-200"
            >
              <WhatsAppIcon size={16} />
              {t('cta_whatsapp')}
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass border border-white/10 hover:border-violet-400/25 text-white font-semibold text-sm transition-all duration-200"
            >
              <LinkedInIcon size={16} />
              {t('cta_linkedin')}
            </a>
          </div>

          <p className="flex items-center gap-2 text-slate-500 text-xs mt-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/90" />
            {t('availability')}
          </p>
        </div>
      </motion.div>
    </section>
  );
}
