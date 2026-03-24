'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { PenLine } from 'lucide-react';
import GradientText from '@/components/ui/GradientText';
import GlassCard from '@/components/ui/GlassCard';

export default function ArticlesPage() {
  const t = useTranslations('articles');

  return (
    <div className="max-w-4xl mx-auto px-6 pt-28 pb-24">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-3">
          <GradientText>{t('title')}</GradientText>
        </h1>
        <p className="text-slate-400 text-lg">{t('subtitle')}</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <GlassCard hover={false} className="p-12 flex flex-col items-center text-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
            <PenLine size={28} className="text-violet-400" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white mb-2">{t('coming_soon')}</h2>
            <p className="text-slate-400 text-sm max-w-sm leading-relaxed">{t('coming_soon_desc')}</p>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}
