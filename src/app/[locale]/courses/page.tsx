import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import CourseCard from '@/components/sections/CourseCard';
import PageHeader from '@/components/ui/PageHeader';
import { courses } from '@/data/courses';

export default async function CoursesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <CoursesContent />;
}

function CoursesContent() {
  const t = useTranslations('courses');

  return (
    <div className="max-w-6xl mx-auto px-6 pt-28 pb-24">
      <PageHeader eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {courses.map((course, i) => (
          <CourseCard key={course.name} course={course} index={i} />
        ))}
      </div>
    </div>
  );
}
