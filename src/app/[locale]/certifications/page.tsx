import { useTranslations } from 'next-intl';
import CertificationCard from '@/components/sections/CertificationCard';
import GradientText from '@/components/ui/GradientText';
import { certifications } from '@/data/certifications';

export default function CertificationsPage() {
  const t = useTranslations('certifications');

  return (
    <div className="max-w-4xl mx-auto px-6 pt-28 pb-24">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-3">
          <GradientText>{t('title')}</GradientText>
        </h1>
        <p className="text-slate-400 text-lg">{t('subtitle')}</p>
      </div>

      <div className="flex flex-col gap-4">
        {certifications.map((cert, i) => (
          <CertificationCard key={cert.name} cert={cert} index={i} />
        ))}
      </div>
    </div>
  );
}
