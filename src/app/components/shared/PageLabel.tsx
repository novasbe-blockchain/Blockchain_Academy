import { useTranslation } from 'react-i18next';
import { DeepDiveBadge } from './DeepDiveBadge';

export type PageLabelKind = 'optional' | 'reference';

const LABEL_KEY: Record<PageLabelKind, string> = {
  optional: 'pageLabel.optionalReading',
  reference: 'pageLabel.forReference',
};

/**
 * Course-wide page label ("Optional Reading" / "For Reference"), rendered with
 * the shared DeepDiveBadge so every labelled slide looks the same. Place it in
 * the slide's kicker row, directly above the title.
 */
export function PageLabel({ kind }: { kind: PageLabelKind }) {
  const { t } = useTranslation('common');
  return <DeepDiveBadge label={t(LABEL_KEY[kind])} />;
}

/** The same label on its own row above the title, for slides that have no kicker row. */
export function PageLabelRow({ kind }: { kind: PageLabelKind }) {
  return (
    <div className="flex items-center gap-3 flex-wrap mb-1.5">
      <PageLabel kind={kind} />
    </div>
  );
}
