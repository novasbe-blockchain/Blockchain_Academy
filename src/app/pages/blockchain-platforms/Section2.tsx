import { useState } from 'react';
import { motion } from 'motion/react';
import { TitleSlide } from '../../components/templates/TitleSlide';
import { TakeawaySlide } from '../../components/templates/TakeawaySlide';
import { ComparisonSlide } from '../../components/templates/ComparisonSlide';
import { SectionNav } from '../../components/navigation/SectionNav';
import { QuizSlide } from '../../components/templates/QuizSlide';
import { Layers } from 'lucide-react';

const chapters = [
  { id: 's2-why', label: 'Why Ethereum?' },
  { id: 's2-accounts-visual', label: 'Accounts Visual' },
  { id: 's2-accounts', label: 'Accounts' },
  { id: 's2-evm', label: 'EVM' },
  { id: 's2-transaction', label: 'Transaction' },
  { id: 's2-smartcontracts', label: 'Smart Contracts' },
  { id: 's2-consensus', label: 'PoW → PoS' },
  { id: 's2-evmecosystem', label: 'EVM Everywhere' },
  { id: 's2-defi',        label: 'DeFi Mechanics' },
  { id: 's2-stablecoins', label: 'Stablecoins' },
  { id: 's2-apps',        label: 'Apps Beyond DeFi' },
  { id: 's2-comparison',  label: 'BTC vs ETH' },
  { id: 's2-quiz', label: 'Quiz' },
  { id: 's2-takeaways', label: 'Takeaways' },
  { id: 's2-summary', label: 'Summary' },
];

export function BP_Section2() {
  return (
    <div className="h-full w-full flex overflow-hidden">
      <div className="w-44 shrink-0 h-full hidden lg:block border-r border-border">
        <SectionNav chapters={chapters} />
      </div>
      <div id="section-scroll" className="flex-1 overflow-y-auto snap-y snap-mandatory">
        <div className="slide-flow">

        {/* ═══════ TITLE ═══════ */}
        <div className="h-full">
          <TitleSlide
            sectionNumber="SECTION 02"
            title="Ethereum: From Money to Programmable Blockchain"
            subtitle="Accounts, EVM, smart contracts, consensus evolution, and the EVM ecosystem"
            icon={<Layers className="size-20 text-[#627EEA]" />}
            gradient="from-[#627EEA] to-[#8b5cf6]"
          />
        </div>

        {/* ═══════ S2-WHY ═══════ */}
        <div id="s2-why" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Why Ethereum?</h2>
            <p className="text-muted-foreground text-sm mt-1">Bitcoin's Limits → Vitalik's Insight</p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-5">

            {/* Left — What Bitcoin couldn't do */}
            <div className="flex flex-col gap-3">
              <h3 className="text-base font-bold text-foreground shrink-0">What Bitcoin couldn't do</h3>
              <div className="flex flex-col gap-2 flex-1">
                {[
                  { title: 'No loops in Script', detail: 'Intentional — prevents infinite loops but limits expressiveness' },
                  { title: 'No state beyond UTXO', detail: "Can't store arbitrary data or run stateful applications" },
                  { title: 'No custom logic', detail: 'Every transaction follows the same spend-output model' },
                  { title: 'Every dApp needs its own chain', detail: 'No shared environment — each project must bootstrap security from scratch' },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.4, ease: 'easeOut' }}
                    className="flex-1 p-3 rounded-xl border-2 border-red-500/30 bg-red-500/08 flex flex-col justify-center"
                    style={{ backgroundColor: 'rgba(239,68,68,0.07)' }}
                  >
                    <div className="flex items-start gap-2">
                      <span className="text-red-500 font-black text-sm shrink-0 mt-0.5">✕</span>
                      <div>
                        <div className="font-bold text-sm text-foreground">{item.title}</div>
                        <div className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{item.detail}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right — Vitalik's Insight */}
            <div className="flex flex-col gap-3">
              <h3 className="text-base font-bold text-foreground shrink-0">Vitalik's insight <span className="text-muted-foreground font-normal">(2013, age 19)</span></h3>

              {/* Quote */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="rounded-xl border-2 p-4"
                style={{ borderColor: '#627EEA60', backgroundColor: '#627EEA12' }}
              >
                <p className="text-sm lg:text-base font-semibold text-foreground italic leading-relaxed">
                  "What if we built a blockchain that could run <span style={{ color: '#627EEA' }}>ANY program</span>?"
                </p>
              </motion.div>

              {/* Key properties */}
              <div className="flex flex-col gap-2 flex-1">
                {[
                  { label: 'Turing-complete scripting language', desc: 'Smart contracts can express any computation' },
                  { label: 'Global shared state (accounts)', desc: 'One universal ledger for all addresses and contracts' },
                  { label: 'Ethereum Virtual Machine (EVM)', desc: 'A sandboxed runtime replicated on every node worldwide' },
                ].map((prop, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.12, duration: 0.4, ease: 'easeOut' }}
                    className="flex-1 flex items-center gap-3 p-3 rounded-xl border bg-card"
                    style={{ borderColor: '#627EEA40' }}
                  >
                    <div
                      className="size-7 rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0"
                      style={{ backgroundColor: '#627EEA' }}
                    >{i + 1}</div>
                    <div>
                      <div className="font-bold text-sm text-foreground">{prop.label}</div>
                      <div className="text-xs text-muted-foreground">{prop.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Bottom callout */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.4 }}
                className="rounded-xl p-3 text-center text-sm font-bold shrink-0"
                style={{ backgroundColor: '#627EEA20', color: '#627EEA', border: '1px solid #627EEA40' }}
              >
                Ethereum = Bitcoin's security model + programmable state machine
              </motion.div>
            </div>

          </div>
        </div>

        {/* ═══════ S2-ACCOUNTS-VISUAL ═══════ */}
        <div id="s2-accounts-visual" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">EOA vs Contract Account</h2>
            <p className="text-sm text-muted-foreground mt-1">The key architectural difference — who initiates, who responds</p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* EOA */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col gap-4 p-6 rounded-2xl border-2"
              style={{ borderColor: '#627EEA60', backgroundColor: '#627EEA08' }}
            >
              <div className="flex items-center gap-4">
                <div className="size-16 rounded-2xl flex items-center justify-center text-4xl" style={{ backgroundColor: '#627EEA18' }}>🔑</div>
                <div>
                  <div className="font-black text-xl text-foreground">EOA</div>
                  <div className="text-sm text-muted-foreground">Externally Owned Account</div>
                </div>
              </div>
              <div className="flex flex-col gap-2 flex-1">
                {[
                  { icon: '👤', text: 'Controlled by a private key (a human or software)' },
                  { icon: '🚀', text: 'The ONLY type that can initiate a transaction' },
                  { icon: '💰', text: 'Holds ETH balance — no code, no storage' },
                  { icon: '⛽', text: 'Always pays the gas fee' },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.08 }}
                    className="flex items-start gap-3 p-3 rounded-xl"
                    style={{ backgroundColor: '#627EEA0d' }}
                  >
                    <span className="text-lg shrink-0">{item.icon}</span>
                    <span className="text-sm text-foreground">{item.text}</span>
                  </motion.div>
                ))}
              </div>
              <div className="p-3 rounded-xl border border-[#627EEA]/40 text-center">
                <div className="text-xs font-bold text-[#627EEA]">Examples</div>
                <div className="text-xs text-muted-foreground mt-1">MetaMask wallet · Hardware wallet · Exchange hot wallet</div>
              </div>
            </motion.div>

            {/* Contract Account */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex flex-col gap-4 p-6 rounded-2xl border-2"
              style={{ borderColor: '#39B54A60', backgroundColor: '#39B54A08' }}
            >
              <div className="flex items-center gap-4">
                <div className="size-16 rounded-2xl flex items-center justify-center text-4xl" style={{ backgroundColor: '#39B54A18' }}>📜</div>
                <div>
                  <div className="font-black text-xl text-foreground">Contract Account</div>
                  <div className="text-sm text-muted-foreground">Smart Contract</div>
                </div>
              </div>
              <div className="flex flex-col gap-2 flex-1">
                {[
                  { icon: '⚙️', text: 'Controlled by code — no private key exists' },
                  { icon: '📩', text: 'Can ONLY respond to incoming calls (never initiates)' },
                  { icon: '🗄️', text: 'Has ETH balance + executable code + persistent storage' },
                  { icon: '🔄', text: 'Gas is paid by the EOA that triggered it' },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.08 }}
                    className="flex items-start gap-3 p-3 rounded-xl"
                    style={{ backgroundColor: '#39B54A0d' }}
                  >
                    <span className="text-lg shrink-0">{item.icon}</span>
                    <span className="text-sm text-foreground">{item.text}</span>
                  </motion.div>
                ))}
              </div>
              <div className="p-3 rounded-xl border border-[#39B54A]/40 text-center">
                <div className="text-xs font-bold text-[#39B54A]">Examples</div>
                <div className="text-xs text-muted-foreground mt-1">Uniswap pool · USDC token · NFT collection · DAO treasury</div>
              </div>
            </motion.div>
          </div>

          {/* Interaction flow */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="shrink-0 mt-4 flex items-center gap-3 p-4 rounded-xl border border-border bg-card"
          >
            <div className="text-sm font-bold text-foreground shrink-0">How they interact:</div>
            <div className="flex items-center gap-2 flex-1 overflow-x-auto">
              {[
                { label: '🔑 EOA', sub: 'signs & sends tx' },
                { label: '→' },
                { label: '📜 Contract', sub: 'executes code' },
                { label: '→' },
                { label: '📜 Contract B', sub: 'calls another contract' },
                { label: '→' },
                { label: '🔑 EOA', sub: 'receives ETH/token' },
              ].map((item, i) =>
                item.label === '→'
                  ? <span key={i} className="text-muted-foreground font-bold shrink-0">→</span>
                  : (
                    <div key={i} className="flex flex-col items-center shrink-0 px-2">
                      <span className="text-sm font-bold text-foreground">{item.label}</span>
                      {item.sub && <span className="text-xs text-muted-foreground">{item.sub}</span>}
                    </div>
                  )
              )}
            </div>
          </motion.div>
        </div>

        {/* ═══════ S2-ACCOUNTS ═══════ */}
        <div id="s2-accounts" className="h-full">
          <ComparisonSlide
            title="Two Types of Accounts"
            featureLabel="Property"
            option1Label="EOA (Externally Owned)"
            option2Label="Contract Account"
            items={[
              { feature: 'Controlled by', option1: 'Private key', option2: 'Code / logic' },
              { feature: 'Has ETH balance', option1: 'Yes', option2: 'Yes' },
              { feature: 'Has code', option1: 'No', option2: 'Yes' },
              { feature: 'Has storage', option1: 'No', option2: 'Yes' },
              { feature: 'Created by', option1: 'Generating a key pair', option2: 'Deploying a transaction' },
              { feature: 'Can initiate tx', option1: 'Yes', option2: 'No — only respond' },
              { feature: 'Gas payer', option1: 'The EOA', option2: 'The calling EOA' },
            ]}
          />
        </div>

        {/* ═══════ S2-EVM ═══════ */}
        <div id="s2-evm" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">The Ethereum Virtual Machine</h2>
            <p className="text-muted-foreground text-sm mt-1">A deterministic, sandboxed runtime replicated on every Ethereum node</p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-5">

            {/* Left — What is the EVM */}
            <div className="flex flex-col gap-3">
              <h3 className="text-base font-bold text-foreground shrink-0">What is the EVM?</h3>
              <div className="flex flex-col gap-2 flex-1">
                {[
                  { icon: '🏖️', label: 'Sandboxed', detail: 'Completely isolated from the host machine — no file system, no network access' },
                  { icon: '⚙️', label: 'Deterministic', detail: 'Same input → same output everywhere, on every node, every time' },
                  { icon: '🔄', label: 'Turing-complete', detail: 'Can run any computable program (within gas limits)' },
                  { icon: '📏', label: 'Gas-metered', detail: 'Every opcode has a fixed gas cost — prevents infinite loops and spam' },
                ].map((prop, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.4, ease: 'easeOut' }}
                    className="flex-1 flex items-start gap-3 p-3 rounded-xl border bg-card"
                    style={{ borderColor: '#627EEA30' }}
                  >
                    <span className="text-2xl shrink-0">{prop.icon}</span>
                    <div>
                      <div className="font-bold text-sm text-foreground">{prop.label}</div>
                      <div className="text-xs text-muted-foreground leading-relaxed mt-0.5">{prop.detail}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right — EVM Stack + compatibility */}
            <div className="flex flex-col gap-3">
              <h3 className="text-base font-bold text-foreground shrink-0">EVM Stack</h3>

              {/* Stack diagram */}
              <div className="flex flex-col gap-1 flex-1">
                {[
                  { label: 'Solidity Code', sub: '.sol source file', color: '#8b5cf6' },
                  { label: 'Bytecode', sub: 'compiled output', color: '#627EEA' },
                  { label: 'Opcodes', sub: 'PUSH, ADD, SSTORE, CALL…', color: '#3b82f6' },
                  { label: 'EVM Execution', sub: 'stack machine processes opcodes', color: '#06b6d4' },
                  { label: 'State Change', sub: 'account balances + storage updated', color: '#10b981' },
                ].map((layer, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <motion.div
                      initial={{ opacity: 0, scaleX: 0.7 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      transition={{ delay: 0.1 + i * 0.1, duration: 0.35 }}
                      className="w-full rounded-lg px-4 py-2 text-center border"
                      style={{ borderColor: layer.color + '50', backgroundColor: layer.color + '15' }}
                    >
                      <div className="font-bold text-sm" style={{ color: layer.color }}>{layer.label}</div>
                      <div className="text-xs text-muted-foreground">{layer.sub}</div>
                    </motion.div>
                    {i < 4 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.15 + i * 0.1 }}
                        className="text-muted-foreground text-sm leading-none py-0.5"
                      >↓</motion.div>
                    )}
                  </div>
                ))}
              </div>

              {/* EVM Compatibility */}
              <div className="shrink-0">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">EVM-compatible chains</p>
                <div className="flex flex-wrap gap-1.5">
                  {['Polygon', 'BNB Chain', 'Arbitrum', 'Optimism', 'Base', 'zkSync', 'Avalanche C-Chain'].map(chain => (
                    <span
                      key={chain}
                      className="px-2.5 py-1 rounded-full text-xs font-medium border"
                      style={{ color: '#627EEA', borderColor: '#627EEA40', backgroundColor: '#627EEA12' }}
                    >{chain}</span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ═══════ S2-TRANSACTION ═══════ */}
        <div id="s2-transaction" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Ethereum Transaction Anatomy</h2>
            <p className="text-muted-foreground text-sm mt-1">Every state change in Ethereum is triggered by a transaction</p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-5">

            {/* Left — Receipt */}
            <div className="flex flex-col gap-3 min-h-0">
              <div className="flex items-center justify-between shrink-0">
                <h3 className="text-base font-bold text-foreground">Transaction fields</h3>
                <span
                  className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider"
                  style={{ backgroundColor: '#627EEA20', color: '#627EEA' }}
                >
                  Type 2 · EIP-1559
                </span>
              </div>
              <div
                className="flex-1 min-h-0 rounded-xl border p-4 font-mono text-[11px] flex flex-col gap-1 overflow-y-auto"
                style={{ backgroundColor: 'var(--card)', borderColor: '#627EEA40' }}
              >
                {[
                  { field: 'type',                 value: '0x02',         comment: '// EIP-1559 (default since London, Aug 2021)' },
                  { field: 'chainId',              value: '1',            comment: '// mainnet · EIP-155 replay protection' },
                  { field: 'nonce',                value: '42',           comment: '// tx count from this address' },
                  { field: 'maxPriorityFeePerGas', value: '1.5 Gwei',     comment: '// tip paid to the validator' },
                  { field: 'maxFeePerGas',         value: '25 Gwei',      comment: '// total cap = base fee + tip cap' },
                  { field: 'gasLimit',             value: '21,000',       comment: '// max gas units to consume' },
                  { field: 'to',                   value: '0xAbC…F1d2',   comment: '// recipient (null = contract deployment)' },
                  { field: 'value',                value: '1.5 ETH',      comment: '// ETH to transfer' },
                  { field: 'data',                 value: '0x',           comment: '// calldata (empty for plain transfer)' },
                  { field: 'accessList',           value: '[]',           comment: '// EIP-2930 storage hint (optional)' },
                  { field: 'yParity, r, s',        value: '…',            comment: '// ECDSA signature' },
                ].map((row, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 + i * 0.05 }}
                    className="flex items-baseline gap-2 py-1 border-b last:border-b-0"
                    style={{ borderColor: 'var(--border)' }}
                  >
                    <span className="text-[#627EEA] font-bold w-36 shrink-0 truncate">{row.field}</span>
                    <span className="text-foreground shrink-0">{row.value}</span>
                    <span className="text-muted-foreground ml-auto hidden lg:inline truncate">{row.comment}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right — Transaction types */}
            <div className="flex flex-col gap-3">
              <h3 className="text-base font-bold text-foreground shrink-0">Transaction types</h3>
              <div className="flex flex-col gap-2 flex-1">
                {[
                  {
                    icon: '💸',
                    label: 'Simple ETH Transfer',
                    detail: 'to = EOA · data empty · 21,000 gas (fixed cost)',
                    color: '#10b981',
                  },
                  {
                    icon: '📜',
                    label: 'Contract Call',
                    detail: 'to = contract address · data = function selector + encoded params',
                    color: '#627EEA',
                  },
                  {
                    icon: '🏗️',
                    label: 'Contract Deployment',
                    detail: 'to = null · data = compiled bytecode · higher gas cost',
                    color: '#8b5cf6',
                  },
                ].map((type, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.12 }}
                    className="flex-1 flex items-start gap-3 p-3 rounded-xl border bg-card"
                    style={{ borderColor: type.color + '40' }}
                  >
                    <span className="text-2xl shrink-0">{type.icon}</span>
                    <div>
                      <div className="font-bold text-sm" style={{ color: type.color }}>{type.label}</div>
                      <div className="text-xs text-muted-foreground leading-relaxed mt-0.5 font-mono">{type.detail}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Account model note */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="shrink-0 rounded-xl p-3 text-xs leading-relaxed"
                style={{ backgroundColor: '#627EEA12', border: '1px solid #627EEA30', color: 'var(--muted-foreground)' }}
              >
                <span className="font-bold" style={{ color: '#627EEA' }}>Account model vs UTXO — </span>
                Ethereum tracks balance directly on each account. No input/output chains — just add/subtract from a global state.
              </motion.div>
            </div>

          </div>
        </div>

        {/* ═══════ S2-SMARTCONTRACTS ═══════ */}
        <div id="s2-smartcontracts" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Smart Contracts on Ethereum</h2>
            <p className="text-muted-foreground text-sm mt-1">Programs stored on-chain that execute deterministically when triggered</p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-5">

            {/* Left — Solidity code block */}
            <div className="flex flex-col gap-2">
              <h3 className="text-base font-bold text-foreground shrink-0">Solidity — Simple Escrow</h3>
              <div
                className="flex-1 rounded-xl p-4 font-mono text-xs leading-relaxed overflow-auto"
                style={{ backgroundColor: '#0d1117', border: '1px solid #30363d', color: '#e6edf3' }}
              >
                <div><span style={{ color: '#ff7b72' }}>pragma solidity</span> <span style={{ color: '#79c0ff' }}>^0.8.0</span>;</div>
                <div className="mt-2"><span style={{ color: '#ff7b72' }}>contract</span> <span style={{ color: '#ffa657' }}>Escrow</span> {'{'}</div>
                <div className="ml-4 mt-1"><span style={{ color: '#79c0ff' }}>address</span> <span style={{ color: '#ff7b72' }}>public</span> depositor;</div>
                <div className="ml-4"><span style={{ color: '#79c0ff' }}>address</span> <span style={{ color: '#ff7b72' }}>public</span> beneficiary;</div>
                <div className="ml-4"><span style={{ color: '#79c0ff' }}>uint256</span> <span style={{ color: '#ff7b72' }}>public</span> amount;</div>
                <div className="ml-4"><span style={{ color: '#79c0ff' }}>bool</span>    <span style={{ color: '#ff7b72' }}>public</span> released;</div>
                <div className="ml-4 mt-2"><span style={{ color: '#d2a8ff' }}>event</span> <span style={{ color: '#ffa657' }}>Released</span>(<span style={{ color: '#79c0ff' }}>address</span> to, <span style={{ color: '#79c0ff' }}>uint256</span> value);</div>
                <div className="ml-4 mt-2">
                  <span style={{ color: '#ff7b72' }}>constructor</span>(<span style={{ color: '#79c0ff' }}>address</span> _beneficiary) <span style={{ color: '#ff7b72' }}>payable</span> {'{'}
                </div>
                <div className="ml-8">depositor   = <span style={{ color: '#79c0ff' }}>msg</span>.sender;</div>
                <div className="ml-8">beneficiary = _beneficiary;</div>
                <div className="ml-8">amount      = <span style={{ color: '#79c0ff' }}>msg</span>.value;</div>
                <div className="ml-4">{'}'}</div>
                <div className="ml-4 mt-2">
                  <span style={{ color: '#ff7b72' }}>function</span> <span style={{ color: '#d2a8ff' }}>release</span>() <span style={{ color: '#ff7b72' }}>external</span> {'{'}
                </div>
                <div className="ml-8">
                  <span style={{ color: '#ff7b72' }}>require</span>(<span style={{ color: '#79c0ff' }}>msg</span>.sender == depositor, <span style={{ color: '#a5d6ff' }}>"not depositor"</span>);
                </div>
                <div className="ml-8">
                  <span style={{ color: '#ff7b72' }}>require</span>(!released, <span style={{ color: '#a5d6ff' }}>"already released"</span>);
                </div>
                <div className="ml-8">released = <span style={{ color: '#79c0ff' }}>true</span>;</div>
                <div className="ml-8">
                  <span style={{ color: '#ff7b72' }}>payable</span>(beneficiary).<span style={{ color: '#d2a8ff' }}>transfer</span>(amount);
                </div>
                <div className="ml-8">
                  <span style={{ color: '#ff7b72' }}>emit</span> <span style={{ color: '#ffa657' }}>Released</span>(beneficiary, amount);
                </div>
                <div className="ml-4">{'}'}</div>
                <div>{'}'}</div>
              </div>
            </div>

            {/* Right — Lifecycle + properties */}
            <div className="flex flex-col gap-3">
              <h3 className="text-base font-bold text-foreground shrink-0">Contract lifecycle</h3>
              <div className="flex flex-col gap-2">
                {[
                  { step: '1', label: 'Write', detail: 'Author code in Solidity (or Vyper, Huff…)', color: '#8b5cf6' },
                  { step: '2', label: 'Compile', detail: 'solc → ABI (interface description) + bytecode', color: '#627EEA' },
                  { step: '3', label: 'Deploy', detail: 'Send tx to null address with bytecode as data', color: '#3b82f6' },
                  { step: '4', label: 'Interact', detail: 'Anyone calls functions via the ABI', color: '#10b981' },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.1 }}
                    className="flex items-center gap-3 p-3 rounded-xl border bg-card"
                    style={{ borderColor: item.color + '40' }}
                  >
                    <div
                      className="size-8 rounded-full flex items-center justify-center text-white font-black text-sm shrink-0"
                      style={{ backgroundColor: item.color }}
                    >{item.step}</div>
                    <div>
                      <div className="font-bold text-sm text-foreground">{item.label}</div>
                      <div className="text-xs text-muted-foreground">{item.detail}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-1">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">Key properties</p>
                <div className="flex flex-col gap-1.5">
                  {[
                    { icon: '🔒', text: 'Immutable after deploy — code cannot be changed once on-chain' },
                    { icon: '⚙️', text: 'Deterministic — same inputs always produce same outputs' },
                    { icon: '🔍', text: 'Transparent — source code verifiable on Etherscan' },
                  ].map((prop, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{prop.icon}</span>
                      <span>{prop.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ═══════ S2-CONSENSUS ═══════ */}
        <div id="s2-consensus" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">The Merge: PoW → PoS</h2>
            <p className="text-muted-foreground text-sm mt-1">September 15, 2022 — Ethereum's biggest upgrade</p>
          </div>

          <div className="flex-1 min-h-0 flex flex-col gap-4">

            {/* Top — Before / After */}
            <div className="grid grid-cols-2 gap-4 shrink-0">
              {[
                {
                  title: 'Before (Proof of Work)',
                  color: '#f59e0b',
                  items: [
                    { icon: '⛏️', label: 'Participants', value: 'Miners' },
                    { icon: '🔢', label: 'Mechanism', value: 'SHA-256 hash race' },
                    { icon: '⚡', label: 'Energy', value: '~73 TWh / year' },
                    { icon: '🖥️', label: 'Requirement', value: 'Anyone with hardware' },
                  ],
                },
                {
                  title: 'After (Proof of Stake)',
                  color: '#10b981',
                  items: [
                    { icon: '🏦', label: 'Participants', value: 'Validators' },
                    { icon: '💎', label: 'Mechanism', value: '32 ETH stake' },
                    { icon: '🌿', label: 'Energy', value: '~0.01 TWh / year (−99.95%)' },
                    { icon: '👤', label: 'Requirement', value: 'Anyone with 32 ETH' },
                  ],
                },
              ].map((col, ci) => (
                <motion.div
                  key={ci}
                  initial={{ opacity: 0, y: -15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: ci * 0.15, duration: 0.4 }}
                  className="rounded-xl border-2 p-4"
                  style={{ borderColor: col.color + '50', backgroundColor: col.color + '10' }}
                >
                  <h3 className="font-bold text-sm mb-3" style={{ color: col.color }}>{col.title}</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {col.items.map((item, ii) => (
                      <div key={ii} className="flex flex-col gap-0.5">
                        <span className="text-xs text-muted-foreground">{item.icon} {item.label}</span>
                        <span className="text-xs font-bold text-foreground">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Bottom — How PoS works */}
            <div className="flex-1 min-h-0 flex flex-col gap-3">
              <h3 className="text-base font-bold text-foreground shrink-0">How Proof of Stake works</h3>
              <div className="flex-1 min-h-0 grid grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  {
                    step: '1', label: 'Deposit', color: '#627EEA',
                    detail: 'Validator locks 32 ETH in the official beacon-chain deposit contract. Each validator runs its own keys and client.',
                    metric: '32 ETH min · withdrawals live since Shapella (Apr 2023)',
                  },
                  {
                    step: '2', label: 'Propose', color: '#8b5cf6',
                    detail: 'Pseudo-randomly selected via RANDAO to build the next block. Slots run on a fixed 12-second clock — 32 slots = 1 epoch.',
                    metric: '1 slot = 12s · 1 epoch ≈ 6.4 min',
                  },
                  {
                    step: '3', label: 'Attest', color: '#3b82f6',
                    detail: 'Committees of ~128 validators sign BLS-aggregated votes on the head of the chain and on the epoch checkpoint.',
                    metric: 'Supermajority ≥ 2/3 required',
                  },
                  {
                    step: '4', label: 'Finalize', color: '#10b981',
                    detail: 'Casper FFG finalises a checkpoint after two consecutive justified epochs. Reverting it would require slashing ≥ 1/3 of all staked ETH.',
                    metric: 'Finality ≈ 12.8 min · economically irreversible',
                  },
                ].map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="flex flex-col gap-2 p-3 rounded-xl border bg-card min-h-0"
                    style={{ borderColor: step.color + '40' }}
                  >
                    <div className="flex items-center gap-2 shrink-0">
                      <div
                        className="size-8 rounded-full flex items-center justify-center text-white font-black text-sm"
                        style={{ backgroundColor: step.color }}
                      >{step.step}</div>
                      <div className="font-bold text-sm text-foreground">{step.label}</div>
                    </div>
                    <div className="text-xs text-muted-foreground leading-relaxed flex-1">{step.detail}</div>
                    <div className="text-[10px] font-mono px-2 py-1 rounded leading-snug shrink-0" style={{ backgroundColor: step.color + '15', color: step.color }}>
                      {step.metric}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Key numbers strip */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65 }}
                className="shrink-0 grid grid-cols-2 lg:grid-cols-4 gap-2 rounded-xl border border-border bg-card px-3 py-2.5"
              >
                {[
                  { value: '~1M+',     label: 'active validators' },
                  { value: '~3–5%',    label: 'staking APR' },
                  { value: '~28% of supply', label: 'ETH staked (~34M ETH)' },
                  { value: '−99.95%',  label: 'energy vs PoW' },
                ].map((stat, i) => (
                  <div key={i} className="flex flex-col items-center gap-0.5 text-center">
                    <div className="text-base lg:text-lg font-black text-foreground leading-none">{stat.value}</div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider leading-snug">{stat.label}</div>
                  </div>
                ))}
              </motion.div>

              {/* Slashing + Liquid Staking */}
              <div className="shrink-0 grid grid-cols-1 lg:grid-cols-2 gap-3">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.75 }}
                  className="rounded-xl p-3 text-xs leading-relaxed flex items-start gap-2.5"
                  style={{ backgroundColor: '#ef444412', border: '1px solid #ef444440' }}
                >
                  <span className="text-xl shrink-0 leading-none">⚔️</span>
                  <div>
                    <div className="font-bold mb-0.5" style={{ color: '#ef4444' }}>Slashing</div>
                    <div className="text-muted-foreground">Double-signing or surround voting triggers an immediate burn (1 ETH minimum) plus a correlation penalty proportional to other slashings nearby — making coordinated attacks economically catastrophic.</div>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.85 }}
                  className="rounded-xl p-3 text-xs leading-relaxed flex items-start gap-2.5"
                  style={{ backgroundColor: '#06b6d412', border: '1px solid #06b6d440' }}
                >
                  <span className="text-xl shrink-0 leading-none">💧</span>
                  <div>
                    <div className="font-bold mb-0.5" style={{ color: '#06b6d4' }}>Liquid Staking</div>
                    <div className="text-muted-foreground">Lido (stETH), Rocket Pool (rETH) and others let users stake any ETH amount via derivative tokens. Lido alone secures ~30% of all staked ETH — boosting access at the cost of validator-set concentration.</div>
                  </div>
                </motion.div>
              </div>
            </div>

          </div>
        </div>

        {/* ═══════ S2-EVMECOSYSTEM ═══════ */}
        <div id="s2-evmecosystem" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">EVM Everywhere</h2>
            <p className="text-muted-foreground text-sm mt-1">The EVM has become the de-facto standard virtual machine for blockchains</p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-5">

            {/* Left — Why EVM won */}
            <div className="flex flex-col gap-3">
              <h3 className="text-base font-bold text-foreground shrink-0">Why EVM won</h3>
              <div className="flex flex-col gap-2 flex-1">
                {[
                  {
                    icon: '🌐',
                    label: 'Network effects',
                    detail: 'Largest developer community in the blockchain space — millions of Solidity developers, the most audited contracts, the richest ecosystem of protocols',
                    color: '#627EEA',
                  },
                  {
                    icon: '🛠️',
                    label: 'Tooling',
                    detail: 'Hardhat, Foundry, Remix, MetaMask, Ethers.js, Viem, OpenZeppelin — a complete, mature developer stack',
                    color: '#8b5cf6',
                  },
                  {
                    icon: '🔗',
                    label: 'Composability',
                    detail: 'All EVM chains share open standards: ERC-20 (tokens), ERC-721 (NFTs), ERC-4626 (vaults) — protocols can interoperate seamlessly',
                    color: '#10b981',
                  },
                ].map((reason, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.12, duration: 0.4 }}
                    className="flex-1 flex items-start gap-3 p-4 rounded-xl border bg-card"
                    style={{ borderColor: reason.color + '40' }}
                  >
                    <span className="text-2xl shrink-0">{reason.icon}</span>
                    <div>
                      <div className="font-bold text-sm text-foreground">{reason.label}</div>
                      <div className="text-xs text-muted-foreground leading-relaxed mt-0.5">{reason.detail}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right — Chain map */}
            <div className="flex flex-col gap-3">
              <h3 className="text-base font-bold text-foreground shrink-0">The EVM ecosystem</h3>

              {/* Layer 2 Rollups */}
              <div className="flex-1 rounded-xl border bg-card p-4" style={{ borderColor: '#627EEA40' }}>
                <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#627EEA' }}>Layer 2 Rollups</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { name: 'Arbitrum', color: '#12AAFF' },
                    { name: 'Optimism', color: '#FF0420' },
                    { name: 'Base', color: '#0052FF' },
                    { name: 'zkSync', color: '#8C8DFC' },
                    { name: 'Starknet', color: '#EC796B' },
                  ].map(chain => (
                    <span
                      key={chain.name}
                      className="px-3 py-1.5 rounded-full text-xs font-bold border"
                      style={{ color: chain.color, borderColor: chain.color + '50', backgroundColor: chain.color + '15' }}
                    >{chain.name}</span>
                  ))}
                </div>
              </div>

              {/* EVM-compatible L1s */}
              <div className="flex-1 rounded-xl border bg-card p-4" style={{ borderColor: '#10b98140' }}>
                <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#10b981' }}>EVM-Compatible L1s</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { name: 'Polygon', color: '#8247E5' },
                    { name: 'BNB Chain', color: '#F3BA2F' },
                    { name: 'Avalanche C-Chain', color: '#E84142' },
                    { name: 'Fantom', color: '#1969FF' },
                    { name: 'Cronos', color: '#002D74' },
                  ].map(chain => (
                    <span
                      key={chain.name}
                      className="px-3 py-1.5 rounded-full text-xs font-bold border"
                      style={{ color: chain.color, borderColor: chain.color + '50', backgroundColor: chain.color + '15' }}
                    >{chain.name}</span>
                  ))}
                </div>
              </div>

              {/* Bottom callout */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="shrink-0 rounded-xl p-3 text-xs font-medium text-center leading-relaxed"
                style={{ backgroundColor: '#627EEA15', border: '1px solid #627EEA40', color: '#627EEA' }}
              >
                "The EVM is becoming the standard instruction set for blockchains — like x86 for computers"
              </motion.div>
            </div>

          </div>
        </div>

        {/* ═══════ DEFI MECHANICS ═══════ */}
        <div id="s2-defi" className="h-full flex flex-col p-5 lg:p-8">
          <div className="shrink-0 mb-4">
            <span className="text-xs font-black uppercase tracking-widest text-[#627EEA]">Section 02</span>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-1 mb-1">DeFi: How Decentralised Finance Actually Works</h2>
            <p className="text-sm text-muted-foreground">DeFi replaces financial institutions with smart contracts. Understanding three core primitives unlocks 90% of the ecosystem.</p>
          </div>
          <div className="flex-1 min-h-0 flex gap-4">

            {/* AMM */}
            <div className="flex-1 flex flex-col rounded-xl border-2 border-[#39B54A]/40 bg-card overflow-hidden">
              <div className="h-1.5 bg-[#39B54A] shrink-0" />
              <div className="flex flex-col flex-1 p-4 gap-3 min-h-0">
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-2xl">🔄</span>
                  <div>
                    <div className="font-black text-base text-[#39B54A]">AMM — Automated Market Maker</div>
                    <div className="text-xs text-muted-foreground font-medium">Replaces: Order book exchanges (NYSE, Binance)</div>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground shrink-0">Instead of matching buyers and sellers, an AMM holds two tokens in a <span className="font-semibold text-foreground">liquidity pool</span> and uses a formula to set the price automatically.</div>
                <div className="p-3 bg-[#39B54A]/10 border border-[#39B54A]/30 rounded-xl shrink-0">
                  <div className="font-bold text-xs text-[#39B54A] mb-1.5">The Constant Product Formula</div>
                  <div className="font-mono text-lg text-center font-black text-foreground my-2">x · y = k</div>
                  <div className="text-xs text-muted-foreground text-center">x = reserve of Token A &nbsp;·&nbsp; y = reserve of Token B &nbsp;·&nbsp; k = constant</div>
                  <div className="text-xs text-muted-foreground mt-2">When you buy Token A, you add Token B to the pool — raising B's reserve and reducing A's. The price shifts automatically to maintain k.</div>
                </div>
                <div className="flex-1 min-h-0 space-y-2">
                  <div className="text-xs font-black uppercase tracking-widest text-muted-foreground">How a swap works</div>
                  {['You send 100 USDC to the pool', 'The contract calculates how much ETH to give you (x · y = k)', 'ETH is sent to your wallet — no counterparty needed', 'Slippage: larger trades move the price more (thinner pool)'].map((s, i) => (
                    <div key={i} className="flex gap-2 text-xs text-muted-foreground">
                      <span className="size-4 rounded-full bg-[#39B54A] text-white flex items-center justify-center font-bold shrink-0">{i + 1}</span>
                      {s}
                    </div>
                  ))}
                </div>
                <div className="text-xs text-muted-foreground pt-2 border-t border-border shrink-0"><span className="font-semibold text-foreground">Live examples:</span> Uniswap (v2/v3), Curve, Balancer, PancakeSwap</div>
              </div>
            </div>

            {/* Liquidity Pools */}
            <div className="flex-1 flex flex-col rounded-xl border-2 border-[#6366f1]/40 bg-card overflow-hidden">
              <div className="h-1.5 bg-[#6366f1] shrink-0" />
              <div className="flex flex-col flex-1 p-4 gap-3 min-h-0">
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-2xl">🌊</span>
                  <div>
                    <div className="font-black text-base text-[#6366f1]">Liquidity Pools</div>
                    <div className="text-xs text-muted-foreground font-medium">Replaces: Market makers and broker-dealers</div>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground shrink-0">Anyone can deposit two tokens into a pool and become a <span className="font-semibold text-foreground">Liquidity Provider (LP)</span>. In return, they earn a share of every trading fee — proportional to their share of the pool.</div>
                <div className="flex-1 min-h-0 space-y-2.5">
                  {[
                    { label: 'LP deposits', value: '100 USDC + 0.05 ETH → receives LP tokens representing pool share', color: '#6366f1' },
                    { label: 'Trading fees', value: '0.3% of every swap goes to LPs — distributed pro-rata to LP token holders', color: '#39B54A' },
                    { label: 'Withdraw', value: 'Burn LP tokens → receive proportional share of pool at current prices', color: '#6366f1' },
                    { label: '⚠️ Impermanent Loss', value: "If ETH price rises 100%, LP earns less than just holding ETH. The 'loss' is impermanent only if the price reverts.", color: '#ef4444' },
                    { label: 'Concentrated Liquidity (v3)', value: 'Uniswap v3 lets LPs specify a price range — capital is 100–4000× more efficient than v2 uniform distribution', color: '#f97316' },
                  ].map(r => (
                    <div key={r.label} className="p-2.5 rounded-lg bg-muted/40 border border-border">
                      <div className="text-xs font-bold mb-0.5" style={{ color: r.color }}>{r.label}</div>
                      <div className="text-xs text-muted-foreground">{r.value}</div>
                    </div>
                  ))}
                </div>
                <div className="text-xs text-muted-foreground pt-2 border-t border-border shrink-0"><span className="font-semibold text-foreground">TVL context:</span> Uniswap alone has processed $2T+ in cumulative volume via permissionless pools</div>
              </div>
            </div>

            {/* Lending Protocols */}
            <div className="flex-1 flex flex-col rounded-xl border-2 border-[#f97316]/40 bg-card overflow-hidden">
              <div className="h-1.5 bg-[#f97316] shrink-0" />
              <div className="flex flex-col flex-1 p-4 gap-3 min-h-0">
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-2xl">🏦</span>
                  <div>
                    <div className="font-black text-base text-[#f97316]">Lending Protocols</div>
                    <div className="text-xs text-muted-foreground font-medium">Replaces: Banks (savings accounts + loans)</div>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground shrink-0">Supply assets to earn interest. Borrow against crypto collateral. No credit score, no KYC, no bank. Rates are set algorithmically by supply and demand.</div>
                <div className="flex-1 min-h-0 space-y-2.5">
                  {[
                    { step: 'Supply', desc: 'Deposit 10 ETH → receive aETH (interest-bearing token). Your balance grows each block.', color: '#39B54A' },
                    { step: 'Borrow', desc: 'Lock 10 ETH as collateral (worth $30k) → borrow up to 75% = $22.5k USDC. Over-collateralized by design.', color: '#f97316' },
                    { step: 'Interest rate', desc: 'Utilization ratio drives rates: if 90% of pool is borrowed, rates spike to incentivize more supply and repayments.', color: '#6366f1' },
                    { step: '⚠️ Liquidation', desc: 'If ETH price drops and your collateral ratio falls below the threshold (e.g. 80%), a liquidator repays your debt and claims your collateral at a discount.', color: '#ef4444' },
                    { step: 'Flash loans', desc: 'Borrow any amount with zero collateral — if repaid in the same transaction. Used for arbitrage and (unfortunately) oracle attacks.', color: '#eab308' },
                  ].map(r => (
                    <div key={r.step} className="p-2.5 rounded-lg bg-muted/40 border border-border">
                      <div className="text-xs font-bold mb-0.5" style={{ color: r.color }}>{r.step}</div>
                      <div className="text-xs text-muted-foreground">{r.desc}</div>
                    </div>
                  ))}
                </div>
                <div className="text-xs text-muted-foreground pt-2 border-t border-border shrink-0"><span className="font-semibold text-foreground">Live examples:</span> Aave, Compound, MakerDAO, Morpho</div>
              </div>
            </div>

          </div>
        </div>

        {/* ═══════ STABLECOINS ═══════ */}
        <div id="s2-stablecoins" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-3">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Stablecoins — the most-used app category</h2>
            <p className="text-sm text-muted-foreground mt-1">Tokens engineered to track a stable reference (almost always 1 USD). Quietly the largest dApp category by volume — and the bridge between traditional finance and crypto.</p>
          </div>

          <div className="shrink-0 mb-4 rounded-xl border p-3" style={{ borderColor: '#10b98155', backgroundColor: '#10b9810d' }}>
            <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: '#10b981' }}>What is a stablecoin?</p>
            <p className="text-sm text-foreground mt-0.5 leading-snug">
              An on-chain token whose value tracks an external reference — almost always the US dollar. The interesting question is <span className="font-semibold">what backs the peg</span>: actual dollars in a bank, on-chain crypto collateral, or pure algorithm. Each model fails differently.
            </p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-3 gap-3">
            {[
              {
                icon: '🏦',
                title: 'Fiat-backed',
                sub: 'Custodial · 1:1 reserve',
                color: '#3b82f6',
                mechanism: 'A regulated issuer holds USD (or short-dated treasuries) 1:1 in a bank account. Users mint tokens by depositing fiat; redeem by burning tokens. Pegged because the issuer guarantees redemption.',
                examples: 'USDT (Tether) · ~$140B — largest, opaque attestations · USDC (Circle) · ~$60B — monthly Big-Four attestations · PYUSD (PayPal) · ~$1B — newer, regulated.',
                risk: 'You\'re trusting the issuer. USDC briefly depegged to $0.87 in March 2023 when Circle had $3.3B locked in collapsed Silicon Valley Bank. Tether has settled multiple lawsuits over reserve disclosures.',
              },
              {
                icon: '⚖️',
                title: 'Crypto-backed',
                sub: 'Decentralised · over-collateralised',
                color: '#8b5cf6',
                mechanism: 'Users lock crypto (ETH, wBTC) into a smart contract at a 150-200% collateral ratio and mint stablecoins. If collateral value drops, the contract auto-liquidates positions. No human issuer.',
                examples: 'DAI (MakerDAO/Sky) · ~$5B — the original, since 2017 · GHO (Aave) · LUSD (Liquity) · crvUSD (Curve) — each with slightly different liquidation mechanics.',
                risk: 'Capital-inefficient (need $150 of crypto to mint $100). Collateral itself is volatile — a fast crash can outrun liquidations (DAI briefly traded over $1 in March 2020). Modern DAI now holds significant USDC reserves, partially re-introducing custodial risk.',
              },
              {
                icon: '⚙️',
                title: 'Algorithmic & hybrid',
                sub: 'No (or partial) collateral',
                color: '#ED1C24',
                mechanism: 'Maintain the peg via supply-mint/burn algorithms or delta-neutral derivatives positions. Pure algorithmic versions have a documented failure mode; hybrids (Frax, Ethena) blend collateral with synthetic strategies.',
                examples: 'TerraUSD (UST) · collapsed May 2022, wiped out ~$60B — death-spiral case study · Frax · ~$650M, partially-collateralised hybrid · Ethena USDe · synthetic delta-neutral, ~$5B+ in 2024.',
                risk: 'Pure algorithmic: every prior attempt has failed. Hybrid: Ethena depends on ETH-perp funding rates staying positive — works in bull markets, untested through a sustained bear cycle. Treat with extra caution.',
              },
            ].map(s => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="rounded-xl border-2 p-3 flex flex-col gap-2 min-h-0"
                style={{ borderColor: s.color + '50', backgroundColor: s.color + '08' }}
              >
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xl shrink-0 leading-none">{s.icon}</span>
                  <div className="min-w-0">
                    <div className="font-black text-sm leading-tight" style={{ color: s.color }}>{s.title}</div>
                    <div className="text-[10px] text-muted-foreground leading-tight">{s.sub}</div>
                  </div>
                </div>
                <div className="rounded-lg border bg-card/60 px-2 py-1.5" style={{ borderColor: s.color + '30' }}>
                  <div className="text-[9px] font-bold uppercase tracking-wider" style={{ color: s.color }}>How the peg works</div>
                  <div className="text-[10px] text-muted-foreground leading-snug mt-0.5">{s.mechanism}</div>
                </div>
                <div className="rounded-lg border bg-card/60 px-2 py-1.5 flex-1 min-h-0" style={{ borderColor: s.color + '30' }}>
                  <div className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">Real examples</div>
                  <div className="text-[10px] text-muted-foreground leading-snug mt-0.5">{s.examples}</div>
                </div>
                <div className="rounded-lg p-2 border-l-2" style={{ borderColor: '#ED1C24', backgroundColor: '#ED1C2410' }}>
                  <div className="text-[9px] font-black uppercase tracking-widest" style={{ color: '#ED1C24' }}>How it can break</div>
                  <div className="text-[10px] text-muted-foreground leading-snug mt-0.5">{s.risk}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Market scale + regulation strip */}
          <div className="shrink-0 mt-3 grid grid-cols-1 lg:grid-cols-2 gap-2">
            <div className="rounded-xl border p-2.5" style={{ borderColor: '#10b98155', backgroundColor: '#10b9810d' }}>
              <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: '#10b981' }}>Scale</p>
              <p className="text-[11px] text-muted-foreground leading-snug mt-0.5">
                Total stablecoin supply: <span className="font-semibold text-foreground">~$200B</span> · daily settlement volume rivals Visa · USDT alone settles more on-chain volume than Bitcoin some days. Stablecoins are the most-used dApp by transaction count.
              </p>
            </div>
            <div className="rounded-xl border p-2.5" style={{ borderColor: '#f59e0b55', backgroundColor: '#f59e0b0d' }}>
              <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: '#f59e0b' }}>Regulation tightening</p>
              <p className="text-[11px] text-muted-foreground leading-snug mt-0.5">
                EU MiCA (live 2024) restricts non-euro algorithmic stablecoins · US frameworks debated in Congress · Hong Kong sandbox active. Issuer transparency, reserve audits, and licensing are the new baseline.
              </p>
            </div>
          </div>
        </div>

        {/* ═══════ APPS — Beyond DeFi ═══════ */}
        <div id="s2-apps" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-3">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Beyond DeFi — what else runs on Ethereum</h2>
            <p className="text-sm text-muted-foreground mt-1">DeFi is the most-discussed app category — but not the only one. The same EVM hosts ownership, governance, identity, and games at meaningful scale.</p>
          </div>

          <div className="shrink-0 mb-4 rounded-xl border p-3" style={{ borderColor: '#627EEA55', backgroundColor: '#627EEA0d' }}>
            <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: '#627EEA' }}>The token standards under everything</p>
            <p className="text-sm text-foreground mt-0.5 leading-snug">
              Most non-DeFi apps boil down to three token standards: <span className="font-semibold">ERC-20</span> (fungible — coins, shares, governance), <span className="font-semibold">ERC-721</span> (unique — NFTs, identity, deeds), <span className="font-semibold">ERC-1155</span> (mixed — game items). The "app" is really a smart contract that mints, transfers, or queries these tokens.
            </p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-2 gap-3">
            {[
              {
                icon: '🎨',
                title: 'NFTs & digital ownership',
                sub: 'ERC-721 / ERC-1155',
                color: '#8b5cf6',
                what: 'A unique on-chain token whose tokenURI points to off-chain metadata (image, JSON). The token proves provenance; the bytes typically live on IPFS or a centralised server.',
                examples: 'CryptoPunks (2017) · Bored Ape (2021) · Tickets: Liverpool FC, Coachella · Music: Sound.xyz · Brand IP: Nike RTFKT, Disney pilots.',
                limit: 'Most metadata is off-chain — if the URL or IPFS pin disappears, the "NFT" is a broken pointer. The 2021-22 speculation cycle collapsed; survivors pivoted to utility (tickets, rights, identity) rather than JPEG flipping.',
              },
              {
                icon: '🏛️',
                title: 'DAOs & on-chain governance',
                sub: 'ERC-20 voting · contract-controlled treasury',
                color: '#10b981',
                what: 'A Decentralized Autonomous Organization is a smart contract that controls a treasury and executes proposals approved by token-holder votes. The contract — not a CEO — moves the funds.',
                examples: 'MakerDAO (DAI issuance) · Uniswap DAO (controls $7B+ in UNI) · ENS DAO (.eth registry) · Optimism Citizen House · Gitcoin grants.',
                limit: 'Voter turnout often 1–5%. Token-weighted votes mean whales decide. Most "DAOs" delegate decisions to small core teams. Legal status of DAOs is unsettled in most jurisdictions.',
              },
              {
                icon: '🆔',
                title: 'Identity & decentralized social',
                sub: 'ENS · SIWE · Lens · Farcaster',
                color: '#f59e0b',
                what: 'Replace email logins with wallet-based identity. ENS gives you a human name (alice.eth) for your address. Sign-In With Ethereum (SIWE) authenticates without passwords. Lens and Farcaster build social graphs on-chain.',
                examples: 'ENS: 3M+ names registered · SIWE: 200+ apps integrated · Farcaster: ~300k DAU (2024) · Worldcoin: 7M+ verified humans · Lens: built around composable feed graphs.',
                limit: 'Still niche vs Web2 social. Wallet-and-gas onboarding blocks most users. ENS names cost gas to mint. Decentralised social hasn\'t solved spam or moderation as well as centralised platforms — yet.',
              },
              {
                icon: '🎮',
                title: 'On-chain gaming & metaverse',
                sub: 'Most assets now live on L2s',
                color: '#ED1C24',
                what: 'Game assets (skins, characters, items) as tokens players actually own and can trade. Ranges from "off-chain game with NFT cosmetics" to "fully on-chain games" where every game state lives in contracts (Dojo engine).',
                examples: 'Immutable (zkEVM for games) · Ronin (Axie Infinity peaked $3B GMV in 2021) · Decentraland · Realms / Loot Survivor on Starknet · DFK Chain (Avalanche L1).',
                limit: 'Most "Web3 games" failed (poor gameplay, predatory tokenomics, Ponzi-shaped incentives). Wallet UX still blocks mainstream gaming. Serious studios increasingly land on "game first, blockchain optional".',
              },
            ].map(app => (
              <motion.div
                key={app.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="rounded-xl border-2 p-3 flex flex-col gap-2 min-h-0"
                style={{ borderColor: app.color + '50', backgroundColor: app.color + '08' }}
              >
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xl shrink-0 leading-none">{app.icon}</span>
                  <div className="min-w-0">
                    <div className="font-black text-sm leading-tight" style={{ color: app.color }}>{app.title}</div>
                    <div className="text-[10px] text-muted-foreground leading-tight">{app.sub}</div>
                  </div>
                </div>
                <p className="text-[11px] text-muted-foreground leading-snug flex-1">{app.what}</p>
                <div className="rounded-lg border bg-card/60 px-2 py-1 text-[10px] leading-snug" style={{ borderColor: app.color + '40' }}>
                  <span className="font-bold" style={{ color: app.color }}>Examples: </span>
                  <span className="text-muted-foreground">{app.examples}</span>
                </div>
                <div className="rounded-lg border bg-card/60 px-2 py-1 text-[10px] leading-snug" style={{ borderColor: '#ED1C2440' }}>
                  <span className="font-bold" style={{ color: '#ED1C24' }}>Honest limit: </span>
                  <span className="text-muted-foreground">{app.limit}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="shrink-0 mt-3 rounded-xl border p-2.5" style={{ borderColor: '#627EEA55', backgroundColor: '#627EEA0d' }}>
            <p className="text-[11px] text-muted-foreground leading-snug">
              <span className="font-bold" style={{ color: '#627EEA' }}>The URI gotcha — </span>
              ERC-721 NFTs typically store only a URL pointing to off-chain metadata. The token on-chain proves you own a pointer; the actual image/asset lives on IPFS, Arweave, or — too often — a single web server. If the host disappears, your NFT renders blank. Always check where the metadata is pinned before buying.
            </p>
          </div>
        </div>

        {/* ═══════ S2-COMPARISON ═══════ */}
        <div id="s2-comparison" className="h-full">
          <ComparisonSlide
            title="Bitcoin vs Ethereum"
            featureLabel="Property"
            option1Label="Bitcoin ₿"
            option2Label="Ethereum Ξ"
            items={[
              { feature: 'Created', option1: '2009', option2: '2015' },
              { feature: 'Creator', option1: 'Satoshi Nakamoto', option2: 'Vitalik Buterin' },
              { feature: 'Purpose', option1: 'Digital gold / store of value', option2: 'Programmable blockchain / world computer' },
              { feature: 'Supply', option1: '21M cap', option2: 'No hard cap, ~120M circulating' },
              { feature: 'Consensus', option1: 'Proof of Work', option2: 'Proof of Stake since 2022' },
              { feature: 'Smart contracts', option1: 'Limited Script', option2: 'Full Turing-complete EVM' },
              { feature: 'Block time', option1: '~10 min', option2: '~12 seconds' },
              { feature: 'TPS', option1: '7', option2: '~15 L1 + thousands on L2' },
              { feature: 'Token', option1: 'BTC', option2: 'ETH' },
              { feature: 'Main L2', option1: 'Lightning Network', option2: 'Arbitrum / Optimism / Base' },
            ]}
          />
        </div>

        {/* ═══════ QUIZ ═══════ */}
        <div id="s2-quiz" className="h-full">
          <QuizSlide
            question="What is the fundamental difference between an Externally Owned Account (EOA) and a Contract Account on Ethereum?"
            options={[
              { text: 'EOAs can store ETH; Contract Accounts can only store code and cannot hold a balance.', correct: false },
              { text: 'Contract Accounts can initiate transactions independently; EOAs can only respond when called by a contract.', correct: false },
              { text: 'EOAs are controlled by a private key and can initiate transactions; Contract Accounts are controlled by code and only execute when triggered by an EOA or another contract.', correct: true },
              { text: 'EOAs exist only on Ethereum mainnet; Contract Accounts work across all EVM-compatible chains automatically.', correct: false },
            ]}
            explanation="This is the foundational distinction of Ethereum's account model. An EOA is what a human controls — it has a private key, can initiate transactions, and pays gas. A Contract Account has no private key — it is pure code deployed at a deterministic address, and it only runs when another account sends it a transaction. This means a Contract Account cannot spontaneously act on a schedule — it needs an EOA (or a keeper bot using an EOA) to trigger it. Every transaction on Ethereum ultimately originates from an EOA."
          />
        </div>

        {/* ═══════ QUIZ 2 — EIP-1559 fee mechanics ═══════ */}
        <div id="s2-quiz-2" className="h-full">
          <QuizSlide
            question="An EIP-1559 transaction sets maxFeePerGas = 30 Gwei and maxPriorityFeePerGas = 2 Gwei. The current base fee is 25 Gwei. What does the sender actually pay per gas, and where does each part go?"
            options={[
              { text: '30 Gwei per gas, all of which is paid to the validator who includes the transaction.', correct: false },
              { text: '25 Gwei base fee (burned, removed from supply) + 2 Gwei tip (paid to the validator) = 27 Gwei per gas. The remaining 3 Gwei of headroom in maxFeePerGas is refunded to the sender.', correct: true },
              { text: '25 Gwei base fee paid to the validator + 2 Gwei priority fee burned. Total 27 Gwei per gas.', correct: false },
              { text: '30 Gwei (max fee) + 2 Gwei (priority fee) = 32 Gwei per gas, paid entirely to the validator.', correct: false },
            ]}
            explanation="EIP-1559 split the gas price into two components. The protocol-determined base fee is BURNED (permanently destroyed — this is what makes ETH deflationary when activity is high). The priority fee is the tip the user offers the validator. Effective price per gas is min(maxFeePerGas, baseFee + maxPriorityFeePerGas) — here min(30, 25 + 2) = 27 Gwei. Any unused headroom is refunded. So the sender pays 27 Gwei × gasUsed: 25 burned, 2 to the validator. maxFeePerGas is a cap, not a target."
          />
        </div>

        {/* ═══════ QUIZ 3 — Contract deployment address ═══════ */}
        <div id="s2-quiz-3" className="h-full">
          <QuizSlide
            question="Bob deploys a smart contract by sending a transaction with to = null and the compiled bytecode in the data field. How is the new contract's address determined?"
            options={[
              { text: 'Bob picks any unused 20-byte address and includes it in the transaction\'s value field.', correct: false },
              { text: 'The Ethereum protocol generates a random 20-byte address at deployment time, so the address is unpredictable until the transaction is mined.', correct: false },
              { text: 'For a regular CREATE deployment, the address is derived deterministically from keccak256(senderAddress, senderNonce) — Bob can compute the future contract address before sending the transaction.', correct: true },
              { text: 'The address equals keccak256(bytecode), so two deployments of identical contracts always share the same address.', correct: false },
            ]}
            explanation="CREATE derives the contract address from rlp(senderAddress, senderNonce), then takes the last 20 bytes of its keccak256 hash. This means anyone can predict the future contract address before deployment — useful for state channels and counterfactual instantiation. CREATE2 (introduced in Constantinople) uses keccak256(0xff, deployer, salt, keccak256(initCode)) so the address depends on a salt and the init code, decoupling it from nonce — enabling address pre-commitment regardless of deployment order. Identical bytecode does NOT share an address with CREATE; CREATE2 distinguishes by salt."
          />
        </div>

        {/* ═══════ TAKEAWAYS ═══════ */}
        <div id="s2-takeaways" className="h-full">
          <TakeawaySlide
            title="Section 02 — Key Takeaways"
            takeaways={[
              'Ethereum extends Bitcoin by adding a Turing-complete virtual machine — the EVM',
              'Two account types: Externally Owned Accounts (EOAs) and Contract Accounts',
              'Smart contracts are programs stored on-chain that execute deterministically when triggered',
              'The Merge (2022) replaced Proof of Work with Proof of Stake — cutting energy use by 99.95%',
              'The EVM has become an industry standard — Polygon, Arbitrum, Base, Optimism, and more are EVM-compatible',
              'Bitcoin is digital money; Ethereum is a programmable settlement layer',
            ]}
          />
        </div>

        </div>
      </div>
    </div>
  );
}
