'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname, useRouter, Link } from '@/i18n/routing';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { key: 'projects' as const, href: '/projects' },
  { key: 'about' as const, href: '/about' },
  { key: 'certifications' as const, href: '/certifications' },
  { key: 'courses' as const, href: '/courses' },
  { key: 'articles' as const, href: '/articles' },
];

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  function toggleLocale() {
    const next = locale === 'en' ? 'pt-br' : 'en';
    router.replace(pathname, { locale: next });
  }

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass border-b border-white/5 shadow-lg shadow-black/20' : ''
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-white font-semibold tracking-tight hover:opacity-80 transition-opacity">
          <span className="gradient-text font-bold text-sm">@carvalhxlucas</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(({ key, href }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={key}
                href={href}
                className={`px-3 py-1.5 rounded-lg text-sm transition-all duration-200 ${
                  isActive
                    ? 'text-white bg-white/10'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {t(key)}
              </Link>
            );
          })}

          {/* Locale toggle */}
          <button
            onClick={toggleLocale}
            className="ml-3 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 border border-white/10 hover:border-violet-500/40 hover:text-violet-300 transition-all duration-200"
          >
            {locale === 'en' ? 'PT-BR' : 'EN'}
          </button>
        </div>

        {/* Mobile: locale + hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleLocale}
            className="px-2.5 py-1 rounded-md text-xs font-medium text-slate-400 border border-white/10"
          >
            {locale === 'en' ? 'PT-BR' : 'EN'}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 text-slate-400 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden glass border-t border-white/5">
          <div className="max-w-6xl mx-auto px-6 py-3 flex flex-col gap-1">
            {navLinks.map(({ key, href }) => (
              <Link
                key={key}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-200"
              >
                {t(key)}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
