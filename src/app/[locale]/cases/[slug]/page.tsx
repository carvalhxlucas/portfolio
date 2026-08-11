import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { ArrowLeft, Building2 } from 'lucide-react';
import { Link, type Locale } from '@/i18n/routing';
import ContactCTA from '@/components/sections/ContactCTA';
import Tag from '@/components/ui/Tag';
import { cases, getCaseBySlug, type Localized } from '@/data/cases';

export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const caseStudy = getCaseBySlug(slug);
  if (!caseStudy) return {};
  return {
    title: caseStudy.title[locale as Locale],
    description: caseStudy.summary[locale as Locale],
  };
}

function Paragraphs({ text }: { text: string }) {
  return (
    <>
      {text.split('\n\n').map((paragraph, i) => (
        <p key={i} className="text-slate-400 leading-relaxed mb-4 last:mb-0">
          {paragraph}
        </p>
      ))}
    </>
  );
}

export default async function CaseDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  setRequestLocale(rawLocale);
  const locale = rawLocale as Locale;

  const caseStudy = getCaseBySlug(slug);
  if (!caseStudy) notFound();

  const t = await getTranslations('cases');

  const sections: { title: string; content: Localized }[] = [
    { title: t('overview'), content: caseStudy.overview },
    { title: t('what_it_does'), content: caseStudy.whatItDoes },
    { title: t('architecture'), content: caseStudy.architecture },
    ...(caseStudy.results ? [{ title: t('results'), content: caseStudy.results }] : []),
  ];

  return (
    <>
      <article className="max-w-3xl mx-auto px-6 pt-28 pb-16">
        <Link
          href="/cases"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-10"
        >
          <ArrowLeft size={14} />
          {t('back')}
        </Link>

        {/* Header */}
        <header className="mb-12">
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 mb-5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 font-medium">
              <Building2 size={12} className="text-violet-400" />
              {caseStudy.client}
            </span>
            <span>{caseStudy.sector[locale]}</span>
            <span className="text-slate-600">·</span>
            <span>{caseStudy.year}</span>
          </div>

          <h1 className="text-4xl font-bold text-white tracking-tight mb-4">
            {caseStudy.title[locale]}
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed mb-6">
            {caseStudy.summary[locale]}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {caseStudy.tags.map((tag) => (
              <Tag key={tag} label={tag} />
            ))}
          </div>
        </header>

        {/* Sections */}
        <div className="space-y-12">
          {sections.map(({ title, content }) => (
            <section key={title}>
              <h2 className="text-xl font-semibold text-white mb-4">{title}</h2>
              <Paragraphs text={content[locale]} />
            </section>
          ))}
        </div>
      </article>
      <ContactCTA />
    </>
  );
}
