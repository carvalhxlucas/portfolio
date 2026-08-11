'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { ExternalLink, Award } from 'lucide-react';
import { type Certification } from '@/data/certifications';

const issuerColors: Record<string, string> = {
  'Stanford University': 'text-red-400 bg-red-500/10 border-red-500/20',
  IBM: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
  Google: 'text-green-400 bg-green-500/10 border-green-500/20',
  Meta: 'text-sky-400 bg-sky-500/10 border-sky-500/20',
  Rocketseat: 'text-violet-400 bg-violet-500/10 border-violet-500/20',
  Anthropic: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  Databricks: 'text-orange-400 bg-orange-500/10 border-orange-500/20',
};

const defaultColor = 'text-slate-400 bg-white/5 border-white/10';

interface CertificationCardProps {
  cert: Certification;
  index?: number;
}

export default function CertificationCard({ cert, index = 0 }: CertificationCardProps) {
  const t = useTranslations('certifications');
  const colorClass = issuerColors[cert.issuer] ?? defaultColor;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: (index % 8) * 0.05, duration: 0.4 }}
      className="glass glass-hover rounded-2xl p-6 flex gap-5 items-start"
    >
      {/* Badge */}
      <div className="flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden bg-white/5 flex items-center justify-center p-1">
        {cert.badgeUrl ? (
          <Image
            src={cert.badgeUrl}
            alt={cert.name}
            width={64}
            height={64}
            className="object-contain"
            unoptimized
          />
        ) : (
          <Award size={26} className="text-violet-400/80" />
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 className="text-white font-semibold text-base leading-snug mb-1.5">{cert.name}</h3>
        <span
          className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full border mb-2.5 ${colorClass}`}
        >
          {cert.issuer}
        </span>
        <p className="text-slate-400 text-sm leading-relaxed mb-4">{cert.description}</p>
        <a
          href={cert.credentialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-violet-400 hover:text-violet-300 transition-colors"
        >
          <ExternalLink size={12} />
          {t('view_credential')}
        </a>
      </div>
    </motion.div>
  );
}
