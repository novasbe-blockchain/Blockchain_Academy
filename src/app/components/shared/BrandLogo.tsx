import logoLight from '../../../assets/sc/blockchainpt-logo-fullColour-rgb-1200.png';
import logoDark from '../../../assets/sc/blockchainpt-logo-fullColour-rgb-1200.jpg';

interface BrandLogoProps {
  /** Sizing / layout classes applied to the rendered <img> (e.g. "h-8", "h-36"). */
  className?: string;
  alt?: string;
}

/**
 * Theme-aware Blockchain.pt wordmark.
 *
 * - Light mode → the transparent PNG (full-colour mark, black "Blockchain" text)
 *   reads cleanly on light surfaces.
 * - Dark mode  → the white-background JPG renders as a tidy logo chip (rounded)
 *   so the black wordmark stays legible against dark backgrounds.
 *
 * Both <img>s are always in the DOM; CSS `dark:` variants toggle which is shown,
 * so the logo flips instantly with the theme without any JS state.
 */
export function BrandLogo({ className = '', alt = 'Blockchain.pt' }: BrandLogoProps) {
  return (
    <>
      <img
        src={logoLight}
        alt={alt}
        className={`object-contain block dark:hidden ${className}`}
      />
      <img
        src={logoDark}
        alt={alt}
        className={`object-contain hidden dark:block rounded-md ${className}`}
      />
    </>
  );
}
