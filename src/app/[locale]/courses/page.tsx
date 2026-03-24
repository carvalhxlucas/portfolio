import { useTranslations } from 'next-intl';
import CourseCard from '@/components/sections/CourseCard';
import GradientText from '@/components/ui/GradientText';
import { courses } from '@/data/courses';

export default function CoursesPage() {
  const t = useTranslations('courses');

  return (
    <div className="max-w-6xl mx-auto px-6 pt-28 pb-24">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-3">
          <GradientText>{t('title')}</GradientText>
        </h1>
        <p className="text-slate-400 text-lg">{t('subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {courses.map((course, i) => (
          <CourseCard key={course.name} course={course} index={i} />
        ))}
      </div>
    </div>
  );
}
