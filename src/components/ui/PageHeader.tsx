'use client';

import { motion } from 'framer-motion';

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  className?: string;
}

export default function PageHeader({ eyebrow, title, subtitle, className }: PageHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={className ?? 'mb-12'}
    >
      <span className="eyebrow mb-4">{eyebrow}</span>
      <h1 className="text-4xl font-bold text-white tracking-tight mt-3 mb-3">{title}</h1>
      {subtitle && <p className="text-slate-400 text-lg max-w-xl">{subtitle}</p>}
    </motion.div>
  );
}
