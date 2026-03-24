'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from '@/components/ui/BrandIcons';

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
      {/* Background orbs */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-violet-600/20 blur-[120px] animate-pulse-glow" />
        <div
          className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-blue-600/15 blur-[100px] animate-pulse-glow"
          style={{ animationDelay: '2s' }}
        />
        <div
          className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full bg-cyan-500/10 blur-[90px] animate-pulse-glow"
          style={{ animationDelay: '4s' }}
        />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 pt-32 pb-20 w-full">
        <div className="flex flex-col items-center text-center gap-8">
          {/* Avatar */}
          <motion.div {...fadeUp(0)}>
            <div className="relative">
              <div className="w-24 h-24 rounded-full p-0.5 bg-gradient-accent shadow-lg shadow-violet-500/25">
                <Image
                  src="https://github.com/carvalhxlucas.png"
                  alt="Lucas Carvalho"
                  width={96}
                  height={96}
                  className="rounded-full w-full h-full object-cover"
                  priority
                />
              </div>
              <span className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-background shadow-lg shadow-emerald-400/50" />
            </div>
          </motion.div>

          {/* Name */}
          <motion.div {...fadeUp(0.1)}>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-none">
              <span className="gradient-text">Lucas</span>{' '}
              <span className="text-white">Carvalho</span>
            </h1>
          </motion.div>

          {/* Role badge */}
          <motion.div {...fadeUp(0.2)}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-violet-500/20 text-violet-300 text-sm font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
              {t('role')}
            </div>
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
            className="flex flex-wrap items-center justify-center gap-3"
          >
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-accent text-white font-semibold text-sm hover:opacity-90 hover:shadow-lg hover:shadow-violet-500/25 transition-all duration-200"
            >
              {t('cta_projects')}
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass border border-white/10 hover:border-white/20 text-white font-semibold text-sm transition-all duration-200"
            >
              {t('cta_about')}
            </Link>
          </motion.div>

          {/* Social links */}
          <motion.div {...fadeUp(0.5)} className="flex items-center gap-4">
            <a
              href="https://github.com/carvalhxlucas"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-sm"
            >
              <GitHubIcon size={16} />
              <span>GitHub</span>
            </a>
            <span className="text-slate-700">·</span>
            <a
              href="https://linkedin.com/in/carvalhxlucas"
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
