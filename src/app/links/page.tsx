import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Globe, ChevronRight, ArrowUpRight } from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from '@/components/ui/BrandIcons';

export const metadata: Metadata = {
  title: 'Lucas Carvalho — Links',
  description: 'Portfólio, GitHub e LinkedIn de Lucas Carvalho.',
};

const links = [
  {
    label: 'Portfólio',
    href: '/',
    icon: Globe,
    internal: true,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/carvalhxlucas',
    icon: GitHubIcon,
    internal: false,
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/carvalhxlucas',
    icon: LinkedInIcon,
    internal: false,
  },
];

export default function LinksPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 py-16">
      {/* Ambient background */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[36rem] h-[36rem] rounded-full bg-violet-600/15 blur-[140px] animate-pulse-glow" />
      </div>

      <div className="w-full max-w-sm flex flex-col items-center text-center gap-6">
        {/* Avatar */}
        <div className="relative">
          <div className="w-20 h-20 rounded-full p-[3px] bg-background ring-1 ring-violet-400/30 shadow-[0_0_40px_-8px_rgba(139,124,246,0.5)]">
            <Image
              src="https://github.com/carvalhxlucas.png"
              alt="Lucas Carvalho"
              width={80}
              height={80}
              className="rounded-full w-full h-full object-cover"
              priority
            />
          </div>
          <span className="absolute bottom-0.5 right-0.5 w-3 h-3 bg-emerald-400/90 rounded-full border-2 border-background" />
        </div>

        <div className="flex flex-col items-center gap-2.5">
          <span className="eyebrow">Engenheiro de IA Sênior</span>
          <h1 className="text-2xl font-bold tracking-tight">
            <span className="text-white">Lucas </span>
            <span className="gradient-text">Carvalho</span>
          </h1>
          <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
            Construindo sistemas de IA agêntica, RAG e orquestração de LLMs.
          </p>
        </div>

        {/* Links */}
        <div className="w-full flex flex-col gap-3 mt-2">
          {links.map(({ label, href, icon: Icon, internal }) =>
            internal ? (
              <Link
                key={label}
                href={href}
                className="group flex items-center gap-4 w-full px-5 py-4 rounded-2xl glass glass-hover"
              >
                <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-300 shrink-0">
                  <Icon size={19} />
                </span>
                <span className="flex-1 text-left text-white font-semibold text-[15px]">{label}</span>
                <ChevronRight
                  size={16}
                  className="text-slate-500 group-hover:text-violet-300 group-hover:translate-x-0.5 transition-all shrink-0"
                />
              </Link>
            ) : (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 w-full px-5 py-4 rounded-2xl glass glass-hover"
              >
                <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-300 shrink-0">
                  <Icon size={19} />
                </span>
                <span className="flex-1 text-left text-white font-semibold text-[15px]">{label}</span>
                <ArrowUpRight
                  size={16}
                  className="text-slate-500 group-hover:text-violet-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all shrink-0"
                />
              </a>
            ),
          )}
        </div>

        <p className="text-slate-600 text-xs mt-4">© {new Date().getFullYear()} Lucas Carvalho</p>
      </div>
    </div>
  );
}
