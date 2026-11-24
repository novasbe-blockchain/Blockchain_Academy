import { useTranslation } from 'react-i18next';

/** Shown while the mock-exam page chunk, and then the question bank, download. */
export function MockExamLoading() {
  const { t } = useTranslation('mock-exam');
  return (
    <div
      role="status"
      className="flex size-full items-center justify-center bg-background text-sm font-semibold text-muted-foreground"
    >
      {t('loading')}
    </div>
  );
}
