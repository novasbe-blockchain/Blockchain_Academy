import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import {
  BadgeCheck, Eye, Hash, Info, ListChecks, Loader2, RefreshCw, Search, SearchX, TriangleAlert, type LucideIcon,
} from 'lucide-react';
import { useLang } from '../../../i18n/useLang';
import { CONTRACT_ADDRESS, CONTRACT_READY, HASH_IDENTIFIER, explorerAddressUrl } from './config';
import { AMBER, GREEN, INDIGO, NS, OutLink, PanelMessage, RED, SKY, shorten } from './ui';
import type { RegistryEntry } from './registry';

/**
 * "Registered hashes" — a read-only board of the class list, plus a student-number lookup
 * (Smart Contracts §8, right after the wizard).
 *
 * Nothing here needs a wallet or sends a transaction: it only READS the contract.
 * The viem-based reader (./registry) is imported dynamically the first time the board
 * scrolls into view, so it stays out of the main bundle. Before the contract address is
 * set in ./config the board shows a "not deployed yet" state and the lookup still hashes.
 */

type Registry = typeof import('./registry');

/** One shared download of the reader, retried on the next call if it failed. */
let registryImport: Promise<Registry> | undefined;
function loadRegistry(): Promise<Registry> {
  registryImport ??= import('./registry').catch((err) => {
    registryImport = undefined;
    throw err;
  });
  return registryImport;
}

/** Coming back to the board re-reads the list if the last read is older than this. */
const STALE_MS = 15_000;

/** Hex hashes compare case-insensitively; plain-text identifiers must match exactly. */
function sameId(stored: string, wanted: string) {
  return stored === wanted || (HASH_IDENTIFIER && stored.toLowerCase() === wanted.toLowerCase());
}

function ResultBox({ Icon, color, title, children }: { Icon: LucideIcon; color: string; title?: string; children: ReactNode }) {
  return (
    <div role="status" aria-live="polite" className="rounded-xl border p-3 flex items-start gap-2.5" style={{ borderColor: color + '77', backgroundColor: color + '12' }}>
      <Icon className="size-5 shrink-0 mt-0.5" style={{ color }} />
      <div className="min-w-0 flex-1 text-xs text-foreground leading-snug">
        {title && <div className="font-black text-sm leading-tight mb-0.5" style={{ color }}>{title}</div>}
        {children}
      </div>
    </div>
  );
}

export function RegistryBoard() {
  const { t } = useTranslation(NS);
  const lang = useLang();
  const root = useRef<HTMLDivElement>(null);
  const listBox = useRef<HTMLDivElement>(null);

  const [registry, setRegistry] = useState<Registry>();
  const [entries, setEntries] = useState<RegistryEntry[]>();
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const [readAt, setReadAt] = useState<Date>();
  const [query, setQuery] = useState('');
  const latestRun = useRef(0);
  const lastRead = useRef(0);

  /** Load the reader (first call only) and, once a contract address is set, re-read the whole list. */
  const refresh = useCallback(async () => {
    const run = ++latestRun.current;
    setLoading(true);
    try {
      const tools = await loadRegistry();
      setRegistry(tools);
      if (CONTRACT_READY) {
        const next = await tools.readEntries();
        if (run !== latestRun.current) return;
        lastRead.current = Date.now();
        setEntries(next);
        setReadAt(new Date());
      }
      if (run === latestRun.current) setFailed(false);
    } catch (err) {
      console.warn('[class-registry] could not read the list', err);
      if (run === latestRun.current) setFailed(true);
    } finally {
      if (run === latestRun.current) setLoading(false);
    }
  }, []);

  // Read when the board scrolls into view: the first time, and again later if the last read is stale.
  useEffect(() => {
    const el = root.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      void refresh();
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && Date.now() - lastRead.current > STALE_MS) void refresh();
    }, { threshold: 0.2 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [refresh]);

  // The lookup: hash what was typed (same function as the wizard's Send step), then search the list.
  const payload = useMemo(() => (registry ? registry.toPayload(query) : ''), [registry, query]);
  const matches = useMemo(
    () => (payload && entries ? entries.filter((e) => sameId(e.id, payload)) : []),
    [payload, entries],
  );
  const matchKey = matches.map((m) => m.index).join(',');
  const rows = useMemo(() => (entries ? [...entries].reverse() : []), [entries]);

  // Bring the first matching row into view, scrolling only the list (never the slide).
  useEffect(() => {
    const box = listBox.current;
    if (!box || !matchKey) return;
    const row = box.querySelector<HTMLElement>(`[data-entry="${matchKey.split(',')[0]}"]`);
    if (row) box.scrollTop = Math.max(0, row.offsetTop - 4);
  }, [matchKey]);

  const typed = query.trim().length > 0;
  const timeText = readAt?.toLocaleTimeString(lang === 'pt' ? 'pt-PT' : 'en-GB');
  const valueLabel = HASH_IDENTIFIER ? t('board.colHash') : t('web3.stored');

  let result: ReactNode = null;
  if (typed && !registry) {
    result = failed
      ? <ResultBox Icon={TriangleAlert} color={RED}>{t('board.error')}</ResultBox>
      : <ResultBox Icon={Loader2} color={SKY}>{t('board.loading')}</ResultBox>;
  } else if (typed && !CONTRACT_READY) {
    result = <ResultBox Icon={Info} color={SKY}>{t('board.lookupNotDeployed')}</ResultBox>;
  } else if (typed && !entries) {
    result = failed
      ? <ResultBox Icon={TriangleAlert} color={RED}>{t('board.error')}</ResultBox>
      : <ResultBox Icon={Loader2} color={SKY}>{t('board.loading')}</ResultBox>;
  } else if (typed && matches.length > 0) {
    result = (
      <ResultBox Icon={BadgeCheck} color={GREEN} title={t('board.found')}>
        <p>{matches.length === 1 ? t('board.foundOne') : t('board.foundMany', { n: matches.length })}</p>
        <ul className="mt-1.5 flex flex-col gap-1.5">
          {matches.map((m) => (
            <li key={m.index} className="rounded-lg border border-border bg-card px-2.5 py-1.5">
              <a
                href={explorerAddressUrl(m.who)} target="_blank" rel="noopener noreferrer" title={t('opens')}
                className="font-mono font-bold text-foreground break-all hover:opacity-75 transition-opacity"
              >
                {m.who}
              </a>
              <div className="mt-0.5 text-muted-foreground">
                {t('web3.entryIndex', { n: m.index + 1 })} · {m.times > 1 ? t('board.timesMany', { n: m.times }) : t('board.timesOnce')}
              </div>
            </li>
          ))}
        </ul>
      </ResultBox>
    );
  } else if (typed) {
    result = <ResultBox Icon={SearchX} color={RED} title={t('board.notFound')}>{t('board.notFoundBody')}</ResultBox>;
  }

  return (
    <div ref={root} className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-3">
      {/* ── Lookup: student number → hash → is it on the list, and from which wallet? ── */}
      <div className="min-h-0 rounded-2xl border-2 bg-card p-4 lg:p-5 flex flex-col gap-3 lg:overflow-y-auto" style={{ borderColor: AMBER + '77' }}>
        <div className="flex items-center gap-3">
          <div className="size-11 rounded-xl flex items-center justify-center text-white shrink-0" style={{ backgroundColor: AMBER }}>
            <Search className="size-5" />
          </div>
          <div className="min-w-0">
            <div className="font-black text-lg text-foreground leading-tight">{t('board.lookupTitle')}</div>
            <p className="text-xs text-muted-foreground leading-snug">{t('board.lookupHint')}</p>
          </div>
        </div>

        <label className="block">
          <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{t('web3.studentNumber')}</span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('web3.studentPlaceholder')}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            maxLength={64}
            className="mt-1 w-full px-3 py-2 rounded-xl border-2 border-border bg-card text-base font-mono text-foreground outline-none focus:border-[#f59e0b]"
          />
        </label>

        <div className="rounded-xl border border-border bg-muted/40 p-3">
          <div className="flex items-center gap-2 flex-wrap">
            <Hash className="size-4 shrink-0" style={{ color: AMBER }} />
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{t('board.hashLabel')}</span>
            <span className="text-[10px] font-black px-1.5 py-0.5 rounded-full" style={{ backgroundColor: AMBER + '22', color: AMBER }}>
              {HASH_IDENTIFIER ? t('web3.hashTag') : t('web3.rawTag')}
            </span>
          </div>
          <div className={`mt-1.5 text-xs leading-snug break-all ${payload ? 'font-mono font-bold text-foreground select-all' : 'text-muted-foreground'}`}>
            {payload || t('board.emptyHash')}
          </div>
        </div>

        {result}

        <div className="mt-auto flex items-start gap-2 p-2.5 rounded-xl border text-xs leading-snug text-foreground" style={{ borderColor: SKY + '66', backgroundColor: SKY + '12' }}>
          <Eye className="size-4 shrink-0 mt-0.5" style={{ color: SKY }} />
          <span className="min-w-0">{t('board.free')}</span>
        </div>
      </div>

      {/* ── Board: every registered wallet and the hash it holds, read live from the contract ── */}
      <div className="min-h-0 rounded-2xl border-2 bg-card p-4 flex flex-col gap-2.5 min-w-0" style={{ borderColor: GREEN + '77' }}>
        <div className="shrink-0 flex items-center justify-between gap-x-3 gap-y-2 flex-wrap">
          <span className="flex items-center gap-2 flex-wrap min-w-0">
            <ListChecks className="size-5 shrink-0" style={{ color: GREEN }} />
            <span className="font-black text-lg text-foreground leading-tight">{t('board.listTitle')}</span>
            {entries && (
              <span className="text-[10px] font-black px-2 py-0.5 rounded-full whitespace-nowrap" style={{ backgroundColor: GREEN + '22', color: GREEN }}>
                {t('board.onList', { n: entries.length })}
              </span>
            )}
          </span>
          <span className="flex items-center gap-3 flex-wrap">
            {timeText && <span className="text-[10px] font-bold text-muted-foreground whitespace-nowrap">{t('board.readAt', { time: timeText })}</span>}
            <button
              type="button"
              onClick={() => void refresh()}
              disabled={!CONTRACT_READY || loading}
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-bold text-white transition-opacity cursor-pointer hover:opacity-90 disabled:opacity-50 disabled:cursor-default"
              style={{ backgroundColor: GREEN }}
            >
              <RefreshCw className={`size-4 shrink-0 ${loading && CONTRACT_READY ? 'animate-spin' : ''}`} />
              {loading && CONTRACT_READY ? t('board.refreshing') : t('board.refresh')}
            </button>
          </span>
        </div>

        {!CONTRACT_READY ? (
          <PanelMessage Icon={Info} text={t('board.notDeployed')} color={SKY} />
        ) : !entries ? (
          failed
            ? <PanelMessage Icon={TriangleAlert} text={t('board.error')} color={RED} />
            : <PanelMessage Icon={Loader2} spin text={t('board.loading')} color={GREEN} />
        ) : entries.length === 0 ? (
          <PanelMessage Icon={ListChecks} text={t('board.empty')} color={GREEN} />
        ) : (
          <>
            {failed && (
              <div className="shrink-0 flex items-start gap-2 p-2 rounded-xl border text-xs leading-snug text-foreground" style={{ borderColor: RED + '66', backgroundColor: RED + '12' }}>
                <TriangleAlert className="size-4 shrink-0 mt-0.5" style={{ color: RED }} />
                <span className="min-w-0">{t('board.error')}</span>
              </div>
            )}
            <div className="shrink-0 grid grid-cols-[2.25rem_minmax(0,0.8fr)_minmax(0,1.6fr)_2.5rem] gap-2 px-2.5 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
              <span>{t('board.colNumber')}</span>
              <span>{t('board.colWallet')}</span>
              <span>{valueLabel}</span>
              <span className="text-right">{t('board.colTimes')}</span>
            </div>
            <div ref={listBox} className="relative flex-1 min-h-0 max-h-[60vh] lg:max-h-none overflow-y-auto flex flex-col gap-1.5 pr-1">
              {rows.map((e) => {
                const hit = matches.some((m) => m.index === e.index);
                return (
                  <div
                    key={e.index}
                    data-entry={e.index}
                    data-match={hit || undefined}
                    className="shrink-0 grid grid-cols-[2.25rem_minmax(0,0.8fr)_minmax(0,1.6fr)_2.5rem] gap-2 items-center px-2.5 py-1.5 rounded-xl border text-xs transition-colors"
                    style={{ borderColor: hit ? GREEN : 'var(--border)', backgroundColor: hit ? GREEN + '1c' : undefined }}
                  >
                    <span className="font-black text-muted-foreground">{e.index + 1}</span>
                    <a
                      href={explorerAddressUrl(e.who)} target="_blank" rel="noopener noreferrer" title={e.who}
                      className="font-mono font-bold text-foreground truncate hover:opacity-75 transition-opacity"
                    >
                      {shorten(e.who, 8, 6)}
                    </a>
                    <span className="font-mono text-foreground truncate" title={e.id}>{e.id}</span>
                    <span className="text-right">
                      <span
                        title={e.times > 1 ? t('board.timesMany', { n: e.times }) : t('board.timesOnce')}
                        className="inline-block text-[10px] font-black px-1.5 py-0.5 rounded-full"
                        style={e.times > 1 ? { backgroundColor: AMBER + '2e', color: AMBER } : { color: 'var(--muted-foreground)' }}
                      >
                        ×{e.times}
                      </span>
                    </span>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* lg:pr-20 keeps the link clear of the floating slide-nav buttons */}
        <div className="shrink-0 flex items-center justify-between gap-x-3 gap-y-1 flex-wrap lg:pr-20">
          <span className="text-xs text-muted-foreground leading-snug">{entries && entries.length > 0 ? t('board.legend') : ''}</span>
          {CONTRACT_READY && <OutLink href={explorerAddressUrl(CONTRACT_ADDRESS)} color={INDIGO}>{t('web3.viewContract')}</OutLink>}
        </div>
      </div>
    </div>
  );
}
