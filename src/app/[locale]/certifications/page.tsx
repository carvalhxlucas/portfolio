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

  return (
    <div className="max-w-4xl mx-auto px-6 pt-28 pb-24">
      <PageHeader eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />

      <div className="flex flex-col gap-4">
        {certifications.map((cert, i) => (
          <CertificationCard key={cert.name} cert={cert} index={i} />
        ))}
      </div>
    </div>
  );
}
