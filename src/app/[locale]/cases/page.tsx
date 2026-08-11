import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import CaseCard from '@/components/sections/CaseCard';
import ContactCTA from '@/components/sections/ContactCTA';
import PageHeader from '@/components/ui/PageHeader';
import { cases } from '@/data/cases';

export default async function CasesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <CasesContent />;
}

function CasesContent() {
  const t = useTranslations('cases');

  return (
    <>
      <div className="max-w-6xl mx-auto px-6 pt-28 pb-16">
        <PageHeader eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {cases.map((caseStudy, i) => (
            <CaseCard key={caseStudy.slug} caseStudy={caseStudy} index={i} />
          ))}
        </div>
      </div>
      <ContactCTA />
    </>
  );
}
