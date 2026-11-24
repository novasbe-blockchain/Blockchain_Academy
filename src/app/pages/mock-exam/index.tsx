import { lazy, Suspense } from 'react';
import { MockExamLoading } from './MockExamLoading';

// Loaded on demand: the page is its own chunk, and it fetches the question
// bank (another chunk) when it mounts. Neither is part of the main bundle.
const MockExam = lazy(() => import('./MockExam'));

/** Route element for the hidden mock exam (`/:lang/mockexam`). */
export function MockExamRoute() {
  return (
    <Suspense fallback={<MockExamLoading />}>
      <MockExam />
    </Suspense>
  );
}
