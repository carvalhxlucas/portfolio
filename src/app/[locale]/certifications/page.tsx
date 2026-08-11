import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import CertificationCard from '@/components/sections/CertificationCard';
import PageHeader from '@/components/ui/PageHeader';
import { certifications } from '@/data/certifications';

export default async function CertificationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <CertificationsContent />;
}

function CertificationsContent() {
  const t = useTranslations('certifications');
  const sorted = [...certifications].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="max-w-5xl mx-auto px-6 pt-28 pb-24">
      <PageHeader eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sorted.map((cert, i) => (
          <CertificationCard key={`${cert.name}-${cert.issuer}`} cert={cert} index={i} />
        ))}
      </div>
    </div>
  );
}
