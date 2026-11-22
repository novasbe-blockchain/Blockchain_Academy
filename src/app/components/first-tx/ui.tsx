import type { ReactNode } from 'react';
import { ExternalLink, type LucideIcon } from 'lucide-react';

/** Small presentational bits shared by the wizard shell and its lazy web3 half. */

export const NS = 'smart-contracts/first-transaction';

export const INDIGO = '#6366f1';
export const SKY = '#0ea5e9';
export const VIOLET = '#8b5cf6';
export const AMBER = '#f59e0b';
export const GREEN = '#39B54A';
export const RED = '#ef4444';

/** What the web3 half reports back, shown in the "what you have so far" strip. */
export interface WizardStatus {
  address?: string;
  onChain?: boolean;
  balance?: string;
  txHash?: string;
  count?: string;
}

export function shorten(value: string, head = 6, tail = 4) {
  return value.length > head + tail + 1 ? `${value.slice(0, head)}…${value.slice(-tail)}` : value;
}

export function PanelMessage({ Icon, text, spin = false, color, children }: { Icon: LucideIcon; text: string; spin?: boolean; color: string; children?: ReactNode }) {
  return (
    <div className="m-auto flex flex-col items-center gap-3 text-center max-w-xs py-6">
      <Icon className={`size-7 ${spin ? 'animate-spin' : ''}`} style={{ color }} />
      <p className="text-sm text-muted-foreground leading-snug">{text}</p>
      {children}
    </div>
  );
}

export function OutLink({ href, color, children }: { href: string; color: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-xs font-bold hover:opacity-80 transition-opacity"
      style={{ color }}
    >
      {children}<ExternalLink className="size-3 shrink-0" />
    </a>
  );
}
