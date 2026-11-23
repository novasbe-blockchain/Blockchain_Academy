/**
 * The wallet-connected half of the "Your First Transaction" wizard (steps 3-5).
 *
 * Loaded with React.lazy from FirstTransactionWizard.tsx, so wagmi, viem and RainbowKit
 * (and RainbowKit's stylesheet) are only downloaded when a student opens step 3.
 * All network and contract settings come from ./config; the chain, the ABI and the hashing
 * are shared with the read-only board through ./registry.
 */
import '@rainbow-me/rainbowkit/styles.css';
import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import {
  RainbowKitProvider, connectorsForWallets, darkTheme, lightTheme, useAccountModal, useConnectModal,
} from '@rainbow-me/rainbowkit';
import {
  injectedWallet, metaMaskWallet, rabbyWallet, walletConnectWallet, zerionWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  WagmiProvider, createConfig, fallback, http, useAccount, useBalance, useReadContract,
  useSwitchChain, useWaitForTransactionReceipt, useWriteContract,
} from 'wagmi';
import {
  BaseError, InsufficientFundsError, UserRejectedRequestError, formatEther, type Address, type Hex,
} from 'viem';
import {
  BadgeCheck, Check, Copy, Droplets, Eye, Hash, Info, Loader2, Network, Plug, Send, TriangleAlert,
  Users, Wallet, type LucideIcon,
} from 'lucide-react';
import {
  CHAIN, CONTRACT_ADDRESS, CONTRACT_READY, HASH_IDENTIFIER, MAX_ID_LENGTH, WALLETCONNECT_PROJECT_ID,
  explorerAddressUrl, explorerTxUrl,
} from './config';
import { abi, chain, toPayload } from './registry';
import { AMBER, GREEN, INDIGO, NS, OutLink, PanelMessage, RED, SKY, VIOLET, shorten, type WizardStatus } from './ui';

// ─── One wagmi setup for the whole page (module scope: created once) ────────

const hasWalletConnect = WALLETCONNECT_PROJECT_ID.length > 0;

const connectors = connectorsForWallets(
  [{
    groupName: 'Wallets',
    // Without a WalletConnect project id only injected wallets can work, so only those are offered.
    wallets: hasWalletConnect
      ? [rabbyWallet, zerionWallet, metaMaskWallet, walletConnectWallet, injectedWallet]
      : [rabbyWallet, injectedWallet],
  }],
  { appName: 'Blockchain Academy', projectId: WALLETCONNECT_PROJECT_ID || 'not-configured' },
);

const wagmiConfig = createConfig({
  chains: [chain],
  connectors,
  transports: { [chain.id]: fallback(CHAIN.rpcUrls.map((url) => http(url))) },
});

const queryClient = new QueryClient();

const contract = { address: CONTRACT_ADDRESS as Address, abi, chainId: chain.id } as const;

// ─── Helpers ────────────────────────────────────────────────────────────────

function formatBalance(value: bigint): string {
  const [whole, fraction = ''] = formatEther(value).split('.');
  const shown = fraction.slice(0, 4).replace(/0+$/, '');
  if (value > 0n && whole === '0' && !shown) return '< 0.0001';
  return shown ? `${whole}.${shown}` : whole;
}

function useDarkClass() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'));
  useEffect(() => {
    const root = document.documentElement;
    const observer = new MutationObserver(() => setDark(root.classList.contains('dark')));
    observer.observe(root, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);
  return dark;
}

type Translate = (key: string, options?: Record<string, unknown>) => string;

function describeError(err: unknown, t: Translate): string {
  const message = err instanceof BaseError ? err.shortMessage : String((err as Error)?.message ?? err);
  const rejected = err instanceof BaseError && err.walk((e) => e instanceof UserRejectedRequestError);
  if (rejected || /user rejected|user denied|rejected the request|cancell?ed/i.test(message)) return t('web3.errors.rejected');
  const broke = err instanceof BaseError && err.walk((e) => e instanceof InsufficientFundsError);
  if (broke || /insufficient funds/i.test(message)) return t('web3.errors.noFunds');
  return t('web3.errors.generic', { message });
}

// ─── Small building blocks ──────────────────────────────────────────────────

function Row({ Icon, color, label, done, children }: { Icon: LucideIcon; color: string; label: string; done: boolean; children: ReactNode }) {
  return (
    <div className="rounded-xl border bg-card p-3 flex items-start gap-3" style={{ borderColor: done ? GREEN + '77' : 'var(--border)' }}>
      <span className="size-9 rounded-lg shrink-0 flex items-center justify-center" style={{ backgroundColor: (done ? GREEN : color) + '1c' }}>
        {done ? <Check className="size-5" style={{ color: GREEN }} strokeWidth={3} /> : <Icon className="size-5" style={{ color }} />}
      </span>
      <div className="min-w-0 flex-1">
        <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{label}</div>
        <div className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm text-foreground">{children}</div>
      </div>
    </div>
  );
}

function ActionButton({ onClick, color, disabled, busy, Icon, children, outline = false }: {
  onClick: () => void; color: string; disabled?: boolean; busy?: boolean; Icon?: LucideIcon; children: ReactNode; outline?: boolean;
}) {
  const Glyph = busy ? Loader2 : Icon;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || busy}
      className={`inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-bold transition-opacity cursor-pointer hover:opacity-90 disabled:opacity-50 disabled:cursor-default ${outline ? 'border-2 bg-transparent' : 'text-white'}`}
      style={outline ? { borderColor: color, color } : { backgroundColor: color }}
    >
      {Glyph && <Glyph className={`size-4 shrink-0 ${busy ? 'animate-spin' : ''}`} />}
      {children}
    </button>
  );
}

function Notice({ Icon, color, children }: { Icon: LucideIcon; color: string; children: ReactNode }) {
  return (
    <div className="flex items-start gap-2 p-2.5 rounded-xl border text-xs leading-snug text-foreground" style={{ borderColor: color + '66', backgroundColor: color + '12' }}>
      <Icon className="size-4 shrink-0 mt-0.5" style={{ color }} />
      <span className="min-w-0">{children}</span>
    </div>
  );
}

function CopyButton({ value }: { value: string }) {
  const { t } = useTranslation(NS);
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      /* Clipboard is unavailable on plain-HTTP pages; the value stays selectable. */
    }
  };
  return (
    <button type="button" onClick={copy} className="inline-flex items-center gap-1 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
      {copied ? <Check className="size-3" /> : <Copy className="size-3" />}{copied ? t('web3.copied') : t('web3.copy')}
    </button>
  );
}

// ─── The three live panels ──────────────────────────────────────────────────

interface PanelsProps {
  step: number;
  goTo: (step: number) => void;
  onStatus: (status: WizardStatus) => void;
}

function Panels({ step, goTo, onStatus }: PanelsProps) {
  const { t } = useTranslation(NS);
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const { address, isConnected, chainId: walletChainId } = useAccount();
  const onChain = isConnected && walletChainId === chain.id;

  const switcher = useSwitchChain();
  const balance = useBalance({ address, chainId: chain.id, query: { enabled: !!address, refetchInterval: 15_000 } });
  // Live reads straight from the contract. `count` keeps refreshing so the class total ticks up as classmates register.
  const count = useReadContract({ ...contract, functionName: 'count', query: { enabled: CONTRACT_READY, refetchInterval: 12_000 } });
  const myId = useReadContract({ ...contract, functionName: 'idOf', args: address ? [address] : undefined, query: { enabled: CONTRACT_READY && !!address } });
  const myIndex = useReadContract({ ...contract, functionName: 'indexOf', args: address ? [address] : undefined, query: { enabled: CONTRACT_READY && !!address } });

  const [studentNumber, setStudentNumber] = useState('');
  const [txHash, setTxHash] = useState<Hex>();
  const [sentPayload, setSentPayload] = useState<string>();
  const [countBefore, setCountBefore] = useState<bigint>();
  const [error, setError] = useState<string>();
  const writer = useWriteContract();
  const receipt = useWaitForTransactionReceipt({ hash: txHash, chainId: chain.id });

  const payload = useMemo(() => toPayload(studentNumber), [studentNumber]);
  const tooLong = payload.length > MAX_ID_LENGTH;
  const signing = writer.isPending;
  const mining = !!txHash && receipt.isLoading;
  const confirmed = receipt.data?.status === 'success';
  const reverted = receipt.data?.status === 'reverted';
  const funds = balance.data?.value;
  const countNow = count.data as bigint | undefined;
  const storedId = (myId.data as string | undefined) || undefined;
  const storedIndex = myIndex.data as bigint | undefined;

  // A different wallet means a different story: forget the previous wallet's transaction.
  useEffect(() => {
    setTxHash(undefined);
    setSentPayload(undefined);
    setCountBefore(undefined);
    setError(undefined);
  }, [address]);

  // Once the transaction is mined, read the contract again and show the result.
  const celebrated = useRef<string | undefined>(undefined);
  useEffect(() => {
    if (!confirmed || !txHash || celebrated.current === txHash) return;
    celebrated.current = txHash;
    void count.refetch();
    void myId.refetch();
    void myIndex.refetch();
    void balance.refetch();
    goTo(4);
  }, [confirmed, txHash]); // eslint-disable-line react-hooks/exhaustive-deps

  const balanceText = funds !== undefined ? `${formatBalance(funds)} ETH` : undefined;
  useEffect(() => {
    onStatus({
      address,
      onChain,
      balance: address ? balanceText : undefined,
      txHash: confirmed ? txHash : undefined,
      count: countNow !== undefined ? countNow.toString() : undefined,
    });
  }, [address, onChain, balanceText, confirmed, txHash, countNow, onStatus]);

  const send = async () => {
    if (!payload || tooLong || !CONTRACT_READY) return;
    setError(undefined);
    setTxHash(undefined);
    try {
      setCountBefore(countNow);
      const hash = await writer.writeContractAsync({ ...contract, functionName: 'register', args: [payload] });
      setSentPayload(payload);
      setTxHash(hash);
    } catch (err) {
      setError(describeError(err, t as Translate));
    }
  };

  // ── Step 3 · connect + network + balance ──
  if (step === 2) {
    return (
      <div className="flex-1 min-h-0 flex flex-col gap-2.5">
        <Row Icon={Wallet} color={VIOLET} label={t('web3.wallet')} done={isConnected}>
          {isConnected && address ? (
            <>
              <span className="font-mono font-bold break-all">{shorten(address, 10, 8)}</span>
              <button type="button" onClick={() => openAccountModal?.()} className="text-xs font-bold underline underline-offset-2 text-muted-foreground hover:text-foreground cursor-pointer">{t('web3.manage')}</button>
            </>
          ) : (
            <>
              <span className="text-muted-foreground">{t('web3.notConnected')}</span>
              <ActionButton onClick={() => openConnectModal?.()} color={VIOLET} Icon={Plug} disabled={!openConnectModal}>{t('web3.connect')}</ActionButton>
            </>
          )}
        </Row>

        <Row Icon={Network} color={VIOLET} label={t('web3.network')} done={onChain}>
          {!isConnected || onChain ? (
            <span className={onChain ? 'font-bold' : 'text-muted-foreground'}>{t('web3.onSepolia', { name: chain.name, id: chain.id })}</span>
          ) : (
            <>
              <span>{t('web3.wrongNetwork', { id: walletChainId ?? '?' })}</span>
              <ActionButton onClick={() => switcher.switchChain({ chainId: chain.id })} color={VIOLET} busy={switcher.isPending} Icon={Network}>
                {switcher.isPending ? t('web3.switching') : t('web3.switch', { name: chain.name })}
              </ActionButton>
              <span className="basis-full text-xs text-muted-foreground">{t('web3.switchHint')}</span>
              {switcher.error && <span className="basis-full text-xs" style={{ color: RED }}>{describeError(switcher.error, t as Translate)}</span>}
            </>
          )}
        </Row>

        <Row Icon={Droplets} color={SKY} label={t('web3.balance')} done={funds !== undefined && funds > 0n}>
          {funds === undefined ? (
            <span className="text-muted-foreground">—</span>
          ) : funds > 0n ? (
            <span className="font-bold">{t('web3.balanceValue', { amount: formatBalance(funds) })}</span>
          ) : (
            <>
              <span>{t('web3.noFunds')}</span>
              <ActionButton onClick={() => goTo(1)} color={SKY} outline Icon={Droplets}>{t('web3.toFaucets')}</ActionButton>
            </>
          )}
        </Row>

        <div className="mt-auto flex flex-col gap-2">
          {onChain && funds !== undefined && funds > 0n && <Notice Icon={BadgeCheck} color={GREEN}>{t('web3.ready')}</Notice>}
          {!hasWalletConnect && !isConnected && <Notice Icon={Info} color={SKY}>{t('web3.noWalletConnect')}</Notice>}
        </div>
      </div>
    );
  }

  // ── Step 4 · type the student number, hash it, send it ──
  if (step === 3) {
    return (
      <div className="flex-1 min-h-0 flex flex-col gap-2.5">
        {!CONTRACT_READY && <Notice Icon={Info} color={SKY}>{t('web3.contractPending')}</Notice>}
        {!onChain && (
          <Notice Icon={Plug} color={VIOLET}>
            {t('web3.needConnect')}{' '}
            <button type="button" onClick={() => goTo(2)} className="text-xs font-bold underline underline-offset-2 cursor-pointer" style={{ color: VIOLET }}>{t('web3.goConnect')}</button>
          </Notice>
        )}

        <label className="block">
          <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{t('web3.studentNumber')}</span>
          <input
            type="text"
            value={studentNumber}
            onChange={(e) => setStudentNumber(e.target.value)}
            placeholder={t('web3.studentPlaceholder')}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            maxLength={64}
            disabled={signing || mining}
            className="mt-1 w-full px-3 py-2 rounded-xl border-2 border-border bg-card text-base font-mono text-foreground outline-none focus:border-[#f59e0b] disabled:opacity-60"
          />
        </label>

        <div className="rounded-xl border border-border bg-card p-3">
          <div className="flex items-center gap-2 flex-wrap">
            <Hash className="size-4 shrink-0" style={{ color: AMBER }} />
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{t('web3.willSend')}</span>
            <span className="text-[10px] font-black px-1.5 py-0.5 rounded-full" style={{ backgroundColor: AMBER + '22', color: AMBER }}>
              {HASH_IDENTIFIER ? t('web3.hashTag') : t('web3.rawTag')}
            </span>
          </div>
          <div className={`mt-1.5 text-xs leading-snug break-all ${payload ? 'font-mono font-bold text-foreground' : 'text-muted-foreground'}`}>
            {payload || t('web3.emptyPreview')}
          </div>
        </div>

        <Notice Icon={Eye} color={AMBER}>{HASH_IDENTIFIER ? t('web3.privacy') : t('web3.privacyRaw')}</Notice>
        {tooLong && <Notice Icon={TriangleAlert} color={RED}>{t('web3.tooLong', { max: MAX_ID_LENGTH })}</Notice>}
        {onChain && storedId && !mining && <Notice Icon={Info} color={SKY}>{t('web3.alreadyRegistered')}</Notice>}

        <div className="mt-auto flex flex-col gap-2">
          {error && <Notice Icon={TriangleAlert} color={RED}>{error}</Notice>}
          {reverted && <Notice Icon={TriangleAlert} color={RED}>{t('web3.reverted')}</Notice>}
          {mining && txHash && (
            <Notice Icon={Loader2} color={AMBER}>
              {t('web3.mining')}{' '}
              <OutLink href={explorerTxUrl(txHash)} color={AMBER}>{shorten(txHash, 10, 8)}</OutLink>
            </Notice>
          )}
          <ActionButton
            onClick={send}
            color={AMBER}
            Icon={Send}
            busy={signing || mining}
            disabled={!onChain || !CONTRACT_READY || !payload || tooLong}
          >
            {signing ? t('web3.confirmInWallet') : t('web3.send')}
          </ActionButton>
        </div>
      </div>
    );
  }

  // ── Step 5 · the receipt, the new count, your entry read back from the chain ──
  if (step === 4) {
    if (!confirmed && !storedId) {
      return (
        <PanelMessage Icon={Send} text={t('web3.noTxYet')} color={AMBER}>
          <ActionButton onClick={() => goTo(3)} color={AMBER} outline>{t('web3.goRegister')}</ActionButton>
        </PanelMessage>
      );
    }
    return (
      <div className="flex-1 min-h-0 flex flex-col gap-2.5">
        <div className="flex items-center gap-2.5">
          <span className="size-9 rounded-full shrink-0 flex items-center justify-center text-white" style={{ backgroundColor: GREEN }}>
            <BadgeCheck className="size-5" />
          </span>
          <span className="font-black text-lg text-foreground leading-tight">
            {confirmed && receipt.data ? t('web3.confirmed', { block: receipt.data.blockNumber.toString() }) : t('web3.registeredEarlier')}
          </span>
        </div>

        {confirmed && txHash && (
          <div className="rounded-xl border bg-card p-3" style={{ borderColor: GREEN + '77' }}>
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{t('web3.txHash')}</span>
              <span className="flex items-center gap-3">
                <CopyButton value={txHash} />
                <OutLink href={explorerTxUrl(txHash)} color={GREEN}>{t('web3.viewTx')}</OutLink>
              </span>
            </div>
            <div className="mt-1 text-xs font-mono font-bold text-foreground break-all select-all">{txHash}</div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-2.5">
          <div className="rounded-xl border border-border bg-card p-3 flex flex-col">
            <div className="flex items-center gap-1.5">
              <Users className="size-4 shrink-0" style={{ color: GREEN }} />
              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{t('web3.classCount')}</span>
            </div>
            <div className="mt-1 flex items-baseline gap-2 font-black text-foreground">
              {confirmed && countBefore !== undefined && countNow !== undefined && (
                <span className="text-xl text-muted-foreground">{countBefore.toString()} →</span>
              )}
              <span className="text-3xl" style={{ color: GREEN }}>{countNow !== undefined ? countNow.toString() : '…'}</span>
            </div>
            <div className="mt-auto text-[10px] text-muted-foreground leading-tight">
              {confirmed && countBefore !== undefined ? t('web3.countChange') : t('web3.countLive')}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-3 min-w-0">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{t('web3.yourEntry')}</span>
              {storedId && storedIndex !== undefined && (
                <span className="text-[10px] font-black px-1.5 py-0.5 rounded-full" style={{ backgroundColor: GREEN + '22', color: GREEN }}>
                  {t('web3.entryIndex', { n: (storedIndex + 1n).toString() })}
                </span>
              )}
            </div>
            {address && <div className="mt-1 text-xs font-mono text-muted-foreground break-all">{shorten(address, 10, 8)}</div>}
            <div className="mt-1.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{t('web3.stored')}</div>
            <div className="text-xs font-mono font-bold text-foreground break-all">{storedId ?? '…'}</div>
            {storedId && sentPayload === storedId && HASH_IDENTIFIER && (
              <div className="mt-1.5 flex items-center gap-1 text-xs font-bold" style={{ color: GREEN }}>
                <Check className="size-3.5 shrink-0" strokeWidth={3} />{t('web3.matches')}
              </div>
            )}
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 flex-wrap">
          <span className="text-xs text-muted-foreground">{t('web3.readBack')}</span>
          {CONTRACT_READY && <OutLink href={explorerAddressUrl(CONTRACT_ADDRESS)} color={INDIGO}>{t('web3.viewContract')}</OutLink>}
        </div>
      </div>
    );
  }

  return null;
}

// ─── Entry point: providers + panels ────────────────────────────────────────

export default function FirstTxWeb3({ lang, ...panels }: PanelsProps & { lang: string }) {
  const dark = useDarkClass();
  const theme = useMemo(() => {
    const options = { accentColor: INDIGO, accentColorForeground: '#ffffff', borderRadius: 'medium' } as const;
    return dark ? darkTheme(options) : lightTheme(options);
  }, [dark]);

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={theme} locale={lang === 'pt' ? 'pt-BR' : 'en-US'} initialChain={chain} modalSize="compact">
          <Panels {...panels} />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
