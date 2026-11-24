import { lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';

// Loaded on demand so the question bank stays out of the main bundle.
const MockExam = lazy(() => import('./MockExam'));

function Loading() {
  const { t } = useTranslation('mock-exam');
  return (
    <div className="flex size-full items-center justify-center bg-background text-sm font-semibold text-muted-foreground">
      {t('loading')}
    </div>
  );
}

/** Route element for the hidden mock exam (`/:lang/mock`). */
export function MockExamRoute() {
  return (
    <Suspense fallback={<Loading />}>
      <MockExam />
    </Suspense>
  );
}
