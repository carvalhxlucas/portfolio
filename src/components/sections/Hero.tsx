'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from '@/components/ui/BrandIcons';
import { GITHUB_URL, LINKEDIN_URL } from '@/data/site';

function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.6, ease: 'easeOut' as const },
  };
}

export default function Hero() {
  const t = useTranslations('hero');

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[42rem] h-[42rem] rounded-full bg-violet-600/15 blur-[140px] animate-pulse-glow" />
        <div
          className="absolute bottom-[-15%] right-[8%] w-[26rem] h-[26rem] rounded-full bg-indigo-600/10 blur-[120px] animate-pulse-glow"
          style={{ animationDelay: '4s' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
      </div>

      <div className="max-w-6xl mx-auto px-6 pt-32 pb-20 w-full">
        <div className="flex flex-col items-center text-center gap-7">
          {/* Avatar */}
          <motion.div {...fadeUp(0)}>
            <div className="relative">
              <div className="w-24 h-24 rounded-full p-[3px] bg-background ring-1 ring-violet-400/30 shadow-[0_0_40px_-8px_rgba(139,124,246,0.5)]">
                <Image
                  src="https://github.com/carvalhxlucas.png"
                  alt="Lucas Carvalho"
                  width={96}
                  height={96}
                  className="rounded-full w-full h-full object-cover"
                  priority
                />
              </div>
              <span className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 bg-emerald-400/90 rounded-full border-2 border-background" />
            </div>
          </motion.div>

          {/* Role eyebrow */}
          <motion.span {...fadeUp(0.1)} className="eyebrow">
            {t('role')}
          </motion.span>

          {/* Name */}
          <motion.div {...fadeUp(0.2)}>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-none">
              <span className="gradient-text">Lucas</span>{' '}
              <span className="text-white">Carvalho</span>
            </h1>
          </motion.div>

          {/* Bio */}
          <motion.p
            {...fadeUp(0.3)}
            className="max-w-xl text-slate-400 text-lg leading-relaxed"
          >
            {t('bio')}
          </motion.p>

          {/* CTAs */}
          <motion.div
            {...fadeUp(0.4)}
            className="flex flex-wrap items-center justify-center gap-3 mt-2"
          >
            <Link
              href="/cases"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-accent text-white font-semibold text-sm shadow-[0_8px_24px_-8px_rgba(99,91,232,0.55)] hover:shadow-[0_10px_28px_-6px_rgba(99,91,232,0.7)] hover:-translate-y-0.5 transition-all duration-200"
            >
              {t('cta_cases')}
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass border border-white/10 hover:border-violet-400/25 text-white font-semibold text-sm transition-all duration-200"
            >
              {t('cta_projects')}
            </Link>
          </motion.div>

          {/* Social links */}
          <motion.div {...fadeUp(0.5)} className="flex items-center gap-4 mt-1">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-sm"
            >
              <GitHubIcon size={16} />
              <span>GitHub</span>
            </a>
            <span className="text-slate-700">·</span>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-sm"
            >
              <LinkedInIcon size={16} />
              <span>LinkedIn</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
