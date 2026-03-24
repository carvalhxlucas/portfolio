import { useTranslations } from 'next-intl';
import { GitHubIcon, LinkedInIcon } from '@/components/ui/BrandIcons';

export default function Footer() {
  const t = useTranslations('footer');
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 mt-24">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-slate-500 text-sm">
          © {year} Lucas Carvalho. {t('rights')}.
        </p>
        <div className="flex items-center gap-4">
          <p className="text-slate-600 text-xs">{t('built_with')}</p>
          <div className="flex gap-3">
            <a
              href="https://github.com/carvalhxlucas"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <GitHubIcon size={18} />
            </a>
            <a
              href="https://linkedin.com/in/carvalhxlucas"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <LinkedInIcon size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
