import { useTranslation } from 'react-i18next';
import { BrandLogo } from './BrandLogo';
import prrBar from '../../../assets/sc/prr-funding-bar.png';
import novaKcData from '../../../assets/sc/nova-kc-data.png';

const LINKS = {
  prr: 'https://recuperarportugal.gov.pt',
  blockchainPt: 'https://www.blockchain.pt',
  nova: 'https://www.novasbe.unl.pt',
} as const;

/**
 * Site footer with partner / funder attribution.
 *
 * The Blockchain.pt wordmark (theme-aware) links to blockchain.pt; the PRR
 * funding bar links to the national Recuperar Portugal portal; the NOVA
 * Knowledge Center mark links to NOVA SBE. The PRR and NOVA marks are
 * dark-ink on transparent, so they sit on a white surface to stay legible
 * in both light and dark mode.
 */
interface SiteFooterProps {
  /** Extra classes for the <footer> root. Pass `snap-start` when the footer
   *  lives inside a `snap-mandatory` scroll container so it stays reachable. */
  className?: string;
}

export function SiteFooter({ className = '' }: SiteFooterProps) {
  const { t } = useTranslation();

  return (
    <footer className={`border-t border-border bg-card/40 ${className}`}>
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col items-center gap-8">

        {/* Blockchain.pt brand */}
        <a
          href={LINKS.blockchainPt}
          target="_blank"
          rel="noopener noreferrer"
          title={t('footer.visitBlockchainPt')}
          aria-label={t('footer.visitBlockchainPt')}
          className="transition-transform hover:scale-[1.03]"
        >
          <BrandLogo className="h-10" />
        </a>

        {/* Funder / partner logos — on a white surface so the dark-ink marks
            read in both themes. */}
        <div className="flex flex-col items-center gap-3">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
            {t('footer.supportedBy')}
          </span>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={LINKS.prr}
              target="_blank"
              rel="noopener noreferrer"
              title={t('footer.visitPrr')}
              aria-label={t('footer.visitPrr')}
              className="bg-white rounded-lg p-3 shadow-sm border border-black/5 transition-transform hover:scale-[1.02]"
            >
              <img src={prrBar} alt={t('footer.visitPrr')} className="h-12 object-contain" />
            </a>
            <a
              href={LINKS.nova}
              target="_blank"
              rel="noopener noreferrer"
              title={t('footer.visitNova')}
              aria-label={t('footer.visitNova')}
              className="bg-white rounded-lg p-3 shadow-sm border border-black/5 transition-transform hover:scale-[1.02]"
            >
              <img src={novaKcData} alt={t('footer.visitNova')} className="h-12 object-contain" />
            </a>
          </div>
        </div>

        {/* Text links */}
        <nav className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
          <a href={LINKS.prr} target="_blank" rel="noopener noreferrer" className="hover:text-foreground hover:underline">PRR</a>
          <span aria-hidden="true">·</span>
          <a href={LINKS.blockchainPt} target="_blank" rel="noopener noreferrer" className="hover:text-foreground hover:underline">Blockchain.pt</a>
          <span aria-hidden="true">·</span>
          <a href={LINKS.nova} target="_blank" rel="noopener noreferrer" className="hover:text-foreground hover:underline">NOVA SBE</a>
        </nav>
      </div>
    </footer>
  );
}
