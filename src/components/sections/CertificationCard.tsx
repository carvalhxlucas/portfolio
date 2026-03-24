'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import { type Certification } from '@/data/certifications';

interface CertificationCardProps {
  cert: Certification;
  index?: number;
}

export default function CertificationCard({ cert, index = 0 }: CertificationCardProps) {
  const t = useTranslations('certifications');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="glass glass-hover rounded-2xl p-6 flex gap-5 items-start"
    >
      {/* Badge */}
      <div className="flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden bg-white/5 flex items-center justify-center p-1">
        <Image
          src={cert.badgeUrl}
          alt={cert.name}
          width={64}
          height={64}
          className="object-contain"
          unoptimized
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 className="text-white font-semibold text-base leading-snug mb-1">{cert.name}</h3>
        <p className="text-slate-500 text-xs font-medium mb-2">{cert.issuer}</p>
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
