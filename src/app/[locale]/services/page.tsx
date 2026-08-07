import { useTranslations } from 'next-intl';
import PageHeader from '@/components/ui/PageHeader';
import ServiceCard from '@/components/sections/ServiceCard';
import ContactCTA from '@/components/sections/ContactCTA';
import { services } from '@/data/services';

export default function ServicesPage() {
  const t = useTranslations('services');

  return (
    <>
      <div className="max-w-6xl mx-auto px-6 pt-32 pb-16">
        <PageHeader eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {services.map((service, i) => (
            <ServiceCard key={service.key} service={service} index={i} />
          ))}
        </div>
      </div>
      <ContactCTA />
    </>
  );
}
