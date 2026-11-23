import { Component, Suspense, lazy, useCallback, useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import {
  Wallet, Droplets, Plug, Send, BadgeCheck, Check, ChevronLeft, ChevronRight, ExternalLink,
  KeyRound, Pickaxe, Radio, Loader2, TriangleAlert, Network, ReceiptText, Users,
} from 'lucide-react';
import { useLang } from '../../../i18n/useLang';
import { KeyPointBar } from '../shared/KeyPointBar';
import { KeywordText } from '../shared/KeywordText';
import { CHAIN, FAUCET_LINKS, WALLET_LINKS } from './config';
import { AMBER, GREEN, INDIGO, NS, PanelMessage, SKY, VIOLET, shorten, type WizardStatus } from './ui';
import rabbyIcon from '../../../rabby-icon.png';
import zerionIcon from '../../../zerion-icon.png';

/**
 * "Your First Transaction" — a real, wallet-connected wizard (Smart Contracts §8, Assignment 3 · Part B).
 *
 * This file is the lightweight SHELL: copy, step rail, wallet and faucet links.
 * Everything that needs wagmi / viem / RainbowKit lives in FirstTxWeb3.tsx, which is
 * lazy-loaded the first time the student opens step 3. Until then no web3 code is
 * downloaded or run, so the slide renders the same with or without a wallet.
 */

const STEPS = [
  { Icon: Wallet, color: INDIGO },
  { Icon: Droplets, color: SKY },
  { Icon: Plug, color: VIOLET },
  { Icon: Send, color: AMBER },
  { Icon: BadgeCheck, color: GREEN },
];
const LAST = STEPS.length - 1;
/** First step that needs the web3 bundle. */
const WEB3_FROM = 2;
const RAIL_GRADIENT = `linear-gradient(90deg, ${INDIGO}, ${SKY}, ${VIOLET}, ${AMBER}, ${GREEN})`;

const WALLET_ICONS: Record<string, string | undefined> = { rabby: rabbyIcon, zerion: zerionIcon };

interface StepCopy { label: string; title: string; actions: string[]; why: string; }

const FirstTxWeb3 = lazy(() => import('./FirstTxWeb3'));

/** Keeps a web3 failure (chunk did not load, wallet library threw) inside its panel. */
class Web3Boundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(error: unknown) { console.warn('[first-transaction] wallet tools failed', error); }
  render() { return this.state.failed ? this.props.fallback : this.props.children; }
}

function WalletLinks() {
  const { t } = useTranslation(NS);
  return (
    <div className="flex-1 min-h-0 flex flex-col gap-2.5">
      <div className="text-[10px] font-black uppercase tracking-widest" style={{ color: INDIGO }}>{t('wallets.heading')}</div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        {WALLET_LINKS.map((w) => {
          const icon = WALLET_ICONS[w.id];
          return (
            <a
              key={w.id}
              href={w.url}
              target="_blank"
              rel="noopener noreferrer"
              title={t('opens')}
              className="group rounded-xl border bg-card p-3 flex flex-col gap-2 hover:shadow-sm transition-shadow min-w-0"
              style={{ borderColor: w.highlight ? INDIGO + '77' : 'var(--border)' }}
            >
              <div className="flex items-center gap-2.5">
                {icon
                  ? <img src={icon} alt="" className="size-9 rounded-lg shrink-0" />
                  : <span className="size-9 rounded-lg shrink-0 flex items-center justify-center bg-muted"><Wallet className="size-5 text-muted-foreground" /></span>}
                <div className="min-w-0">
                  <div className="font-black text-sm text-foreground leading-tight">{w.name}</div>
                  <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: w.highlight ? INDIGO : 'var(--muted-foreground)' }}>
                    {w.highlight ? t('wallets.recommended') : t('wallets.alternative')}
                  </div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground leading-snug">{t(`wallets.${w.id}`)}</p>
              <span className="mt-auto inline-flex items-center gap-1 text-xs font-bold group-hover:opacity-80" style={{ color: INDIGO }}>
                {w.url.replace('https://', '')}<ExternalLink className="size-3 shrink-0" />
              </span>
            </a>
          );
        })}
      </div>
      <div className="mt-auto flex items-start gap-2 p-2.5 rounded-xl border text-xs leading-snug text-foreground" style={{ borderColor: AMBER + '66', backgroundColor: AMBER + '12' }}>
        <KeyRound className="size-4 shrink-0 mt-0.5" style={{ color: AMBER }} />
        <span>{t('wallets.safety')}</span>
      </div>
    </div>
  );
}

function FaucetLinks() {
  const { t } = useTranslation(NS);
  const [lead, ...others] = FAUCET_LINKS;
  return (
    <div className="flex-1 min-h-0 flex flex-col gap-2.5">
      <div className="text-[10px] font-black uppercase tracking-widest" style={{ color: SKY }}>{t('faucets.heading')}</div>

      {/* The no-login faucet leads */}
      <a
        href={lead.url}
        target="_blank"
        rel="noopener noreferrer"
        title={t('opens')}
        className="group rounded-xl border-2 bg-card p-3.5 flex items-start gap-3 hover:shadow-sm transition-shadow"
        style={{ borderColor: SKY }}
      >
        <span className="size-10 rounded-xl shrink-0 flex items-center justify-center text-white" style={{ backgroundColor: SKY }}>
          <Pickaxe className="size-5" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-black text-base text-foreground leading-tight">{lead.name}</span>
            <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: GREEN }}>{t(`faucets.${lead.id}Tag`)}</span>
            <span className="text-[10px] font-black uppercase tracking-wider" style={{ color: SKY }}>{t('faucets.lead')}</span>
          </div>
          <p className="text-xs text-muted-foreground leading-snug mt-1">{t(`faucets.${lead.id}`)}</p>
          <span className="mt-1.5 inline-flex items-center gap-1 text-xs font-bold group-hover:opacity-80 break-all" style={{ color: SKY }}>
            {lead.url.replace('https://', '')}<ExternalLink className="size-3 shrink-0" />
          </span>
        </div>
      </a>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {others.map((f) => (
          <a
            key={f.id}
            href={f.url}
            target="_blank"
            rel="noopener noreferrer"
            title={t('opens')}
            className="group rounded-xl border border-border bg-card p-3 flex flex-col gap-1.5 hover:shadow-sm transition-shadow min-w-0"
          >
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-black text-sm text-foreground leading-tight">{f.name}</span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground">{t(`faucets.${f.id}Tag`)}</span>
            </div>
            <p className="text-xs text-muted-foreground leading-snug">{t(`faucets.${f.id}`)}</p>
            <span className="mt-auto inline-flex items-center gap-1 text-xs font-bold group-hover:opacity-80" style={{ color: SKY }}>
              {new URL(f.url).hostname.replace('www.', '')}<ExternalLink className="size-3 shrink-0" />
            </span>
          </a>
        ))}
      </div>

      <p className="mt-auto text-xs text-muted-foreground leading-snug">{t('faucets.note')}</p>
    </div>
  );
}

export function FirstTransactionWizard({ keyPoint }: { keyPoint?: string }) {
  const { t } = useTranslation(NS);
  const lang = useLang();
  const [active, setActive] = useState(0);
  // Flips to true the first time the student opens a wallet step, and stays true
  // so the connection and the sent transaction survive moving between steps.
  const [web3On, setWeb3On] = useState(false);
  const [status, setStatus] = useState<WizardStatus>({});

  const steps = t('steps', { returnObjects: true }) as StepCopy[];
  const step = STEPS[active];
  const copy = steps[active];
  const pos = (i: number) => `${(i / LAST) * 100}%`;

  const goTo = useCallback((i: number) => {
    const next = Math.max(0, Math.min(LAST, i));
    if (next >= WEB3_FROM) setWeb3On(true);
    setActive(next);
  }, []);

  const chips = [
    { Icon: Wallet, color: INDIGO, label: t('status.address'), value: status.address ? shorten(status.address) : undefined },
    { Icon: Network, color: VIOLET, label: t('status.network'), value: status.onChain ? CHAIN.name : undefined },
    { Icon: Droplets, color: SKY, label: t('status.balance'), value: status.balance },
    { Icon: ReceiptText, color: AMBER, label: t('status.tx'), value: status.txHash ? shorten(status.txHash) : undefined },
    { Icon: Users, color: GREEN, label: t('status.count'), value: status.count },
  ];

  return (
    <div className="h-full flex flex-col p-6 lg:p-8">
      {/* Header */}
      <div className="shrink-0 mb-3">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-xs font-black uppercase tracking-widest" style={{ color: GREEN }}>{t('kicker')}</span>
          <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full text-white" style={{ backgroundColor: GREEN }}>
            <Radio className="size-3" />{t('badge')}
          </span>
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full border" style={{ color: GREEN, borderColor: GREEN + '66', backgroundColor: GREEN + '14' }}>
            ● {CHAIN.name} · chain ID {CHAIN.id}
          </span>
        </div>
        <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-1.5">{t('heading')}</h2>
        <p className="text-sm text-muted-foreground mt-1 max-w-4xl">{t('subtitle')}</p>
      </div>

      {/* Step rail */}
      <div className="shrink-0 rounded-2xl border border-border bg-card/50 px-8 pt-7 pb-7 sm:pb-11 mb-3">
        <div className="relative h-1.5 rounded-full bg-border mx-[4%] sm:mx-[9%]">
          <motion.div
            className="absolute left-0 top-0 h-full rounded-full"
            style={{ background: RAIL_GRADIENT }}
            initial={false}
            animate={{ width: pos(active) }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          />
          {STEPS.map((st, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-current={i === active ? 'step' : undefined}
              aria-label={`${i + 1}. ${steps[i].label}`}
              className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              style={{ left: pos(i) }}
            >
              <span
                className="size-10 rounded-full border-2 flex items-center justify-center bg-card transition-all duration-300"
                style={{
                  borderColor: i <= active ? st.color : 'var(--border)',
                  boxShadow: i === active ? `0 0 0 5px ${st.color}33` : undefined,
                  transform: i === active ? 'scale(1.12)' : undefined,
                }}
              >
                {i < active
                  ? <Check className="size-5" style={{ color: st.color }} strokeWidth={3} />
                  : <st.Icon className="size-5" style={{ color: i === active ? st.color : 'var(--muted-foreground)' }} />}
              </span>
              <span
                className="hidden sm:block absolute top-full left-1/2 -translate-x-1/2 mt-2 text-xs font-bold whitespace-nowrap transition-colors"
                style={{ color: i === active ? st.color : 'var(--muted-foreground)' }}
              >
                {i + 1}. {steps[i].label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-3">
        {/* You do */}
        <div className="min-h-0 rounded-2xl border-2 bg-card p-5 flex flex-col transition-colors duration-300" style={{ borderColor: step.color + '77' }}>
          <motion.div key={active} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.25 }} className="flex-1 min-h-0 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="size-12 rounded-xl flex items-center justify-center text-white shrink-0" style={{ backgroundColor: step.color }}>
                <step.Icon className="size-6" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] font-black uppercase tracking-widest" style={{ color: step.color }}>
                  {t('stepOf', { n: active + 1, total: STEPS.length })} · {t('youDo')}
                </div>
                <div className="font-black text-xl text-foreground leading-tight">{copy.title}</div>
              </div>
            </div>
            <ol className="space-y-2.5">
              {copy.actions.map((a, ai) => (
                <li key={ai} className="flex gap-2.5 text-sm text-foreground leading-snug">
                  <span className="shrink-0 size-5 rounded-full text-[10px] font-black flex items-center justify-center mt-0.5" style={{ backgroundColor: step.color + '22', color: step.color }}>{ai + 1}</span>
                  <span>{a}</span>
                </li>
              ))}
            </ol>
            <div className="mt-auto p-2.5 rounded-xl text-xs text-muted-foreground leading-snug" style={{ backgroundColor: step.color + '12' }}>
              <span className="font-bold" style={{ color: step.color }}>{t('whyLabel')}</span><KeywordText text={copy.why} />
            </div>
          </motion.div>

          <div className="shrink-0 mt-3 flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => goTo(active - 1)}
              disabled={active === 0}
              className="flex items-center gap-1 px-3 py-2 rounded-xl border border-border text-sm font-bold text-muted-foreground hover:text-foreground transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-default"
            >
              <ChevronLeft className="size-4" />{t('back')}
            </button>
            {active < LAST && (
              <button
                type="button"
                onClick={() => goTo(active + 1)}
                className="flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-bold text-white transition-colors cursor-pointer"
                style={{ backgroundColor: step.color }}
              >
                {t('next')}<ChevronRight className="size-4" />
              </button>
            )}
          </div>
        </div>

        {/* Do it here */}
        <div className="min-h-0 rounded-2xl border border-border bg-muted/40 p-4 flex flex-col lg:overflow-y-auto">
          {active === 0 && <WalletLinks />}
          {active === 1 && <FaucetLinks />}
          {web3On && (
            <div className={active >= WEB3_FROM ? 'flex-1 min-h-0 flex flex-col' : 'hidden'}>
              <Web3Boundary fallback={<PanelMessage Icon={TriangleAlert} text={t('web3.loadError')} color={AMBER} />}>
                <Suspense fallback={<PanelMessage Icon={Loader2} spin text={t('web3.loading')} color={step.color} />}>
                  <FirstTxWeb3 step={active} lang={lang} goTo={goTo} onStatus={setStatus} />
                </Suspense>
              </Web3Boundary>
            </div>
          )}
        </div>
      </div>

      {/* What you have collected so far. lg:pr-20 keeps the last chip clear of the floating slide-nav buttons */}
      <div className="shrink-0 mt-3 flex items-stretch gap-2 lg:pr-20">
        <div className="hidden lg:flex items-center text-[10px] font-black uppercase tracking-widest text-muted-foreground pr-1 max-w-28 leading-tight">{t('statusLabel')}</div>
        <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {chips.map((c, i) => {
            const earned = c.value !== undefined;
            return (
              <div
                key={i}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all duration-300 min-w-0"
                style={{
                  borderColor: earned ? c.color + '77' : 'var(--border)',
                  backgroundColor: earned ? c.color + '12' : 'transparent',
                  opacity: earned ? 1 : 0.5,
                }}
              >
                <c.Icon className="size-4 shrink-0" style={{ color: earned ? c.color : 'var(--muted-foreground)' }} />
                <div className="min-w-0">
                  <div className="text-[10px] font-bold text-muted-foreground leading-tight truncate">{c.label}</div>
                  <div className="text-xs font-mono font-bold text-foreground leading-tight truncate">{c.value ?? '—'}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {keyPoint && <KeyPointBar text={keyPoint} className="mt-3" />}
    </div>
  );
}
