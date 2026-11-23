import { Link } from 'react-router';
import { useLocalizedPath } from '../../../i18n/useLang';

/** Keyword → the course page that teaches it (locale-less route). */
const KEYWORD_ROUTES: Record<string, string> = {
  wallet: '/blockchain-fundamentals/section-1',
  transaction: '/blockchain-fundamentals/section-1',
  hash: '/blockchain-fundamentals/section-1',
  gas: '/smart-contracts/section-2',
  state: '/smart-contracts/section-2',
  functions: '/smart-contracts/section-2',
  oracle: '/smart-contracts/section-2',
  access: '/smart-contracts/section-5',
  immutability: '/smart-contracts/section-5',
};

/**
 * Renders copy with subtle [keyword](kw:id) links back to the lesson that explains the keyword.
 * An id with no route above renders as plain text, so a typo never shows raw markup.
 */
export function KeywordText({ text }: { text: string }) {
  const localize = useLocalizedPath();
  const parts = text.split(/(\[[^\]]+\]\(kw:[a-z]+\))/g);
  return (
    <>
      {parts.map((part, i) => {
        const m = part.match(/^\[([^\]]+)\]\(kw:([a-z]+)\)$/);
        const to = m && KEYWORD_ROUTES[m[2]];
        return m && to
          ? <Link key={i} to={localize(to)} className="underline decoration-dotted underline-offset-2 text-foreground/90 hover:text-[#6366f1] transition-colors">{m[1]}</Link>
          : (m ? m[1] : part);
      })}
    </>
  );
}
