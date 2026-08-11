import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { GitHubIcon, LinkedInIcon, WhatsAppIcon } from '@/components/ui/BrandIcons';
import { whatsappUrl, GITHUB_URL, LINKEDIN_URL } from '@/data/site';

const footerLinks = [
  { key: 'cases' as const, href: '/cases' },
  { key: 'projects' as const, href: '/projects' },
  { key: 'about' as const, href: '/about' },
  { key: 'certifications' as const, href: '/certifications' },
  { key: 'articles' as const, href: '/articles' },
];

export default function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const tContact = useTranslations('contact');
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 mt-24">
      <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="lg:col-span-2 flex flex-col gap-3">
          <span className="gradient-text font-bold text-sm">@carvalhxlucas</span>
          <p className="text-slate-500 text-sm leading-relaxed max-w-xs">{t('tagline')}</p>
        </div>

        {/* Navigation */}
        <div className="flex flex-col gap-3">
          <h3 className="text-white text-sm font-semibold">{t('nav_title')}</h3>
          <ul className="flex flex-col gap-2">
            {footerLinks.map(({ key, href }) => (
              <li key={key}>
                <Link
                  href={href}
                  className="text-slate-500 hover:text-white text-sm transition-colors"
                >
                  {tNav(key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-3">
          <h3 className="text-white text-sm font-semibold">{t('contact_title')}</h3>
          <ul className="flex flex-col gap-2">
            <li>
              <a
                href={whatsappUrl(tContact('whatsapp_message'))}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-slate-500 hover:text-white text-sm transition-colors"
              >
                <WhatsAppIcon size={15} />
                WhatsApp
              </a>
            </li>
            <li>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-slate-500 hover:text-white text-sm transition-colors"
              >
                <GitHubIcon size={15} />
                GitHub
              </a>
            </li>
            <li>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-slate-500 hover:text-white text-sm transition-colors"
              >
                <LinkedInIcon size={15} />
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-slate-500 text-xs">
            © {year} Lucas Carvalho. {t('rights')}.
          </p>
          <p className="text-slate-600 text-xs">{t('built_with')}</p>
        </div>
      </div>
    </footer>
  );
}
