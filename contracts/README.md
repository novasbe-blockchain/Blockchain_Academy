# ClassRegistry

The contract behind the **"Your First Transaction"** wizard and the **"Registered hashes"** board (Smart Contracts, Section 08). Each student sends one transaction that writes an identifier next to their wallet address; the class then watches the shared list grow.

- **Network:** Ethereum **Sepolia**, chain ID **11155111**. This is a **testnet**: its ETH is free and has no value. Do not deploy this contract to mainnet.
- **Explorer:** https://sepolia.etherscan.io
- **Status:** not deployed yet. The wizard renders without it and unlocks the "Send" step once the address is set.

## Everything written here is public and permanent

Anyone can read every entry, forever. Nobody, including the instructor, can edit or delete one.

The wizard therefore never sends the student number itself. It hashes it in the browser and sends only the hash:

```
id = keccak256( UTF-8 bytes of the student number, leading/trailing spaces removed )
```

written as a `0x…` hex string of 66 characters. Example: `20231234` becomes `0x4368b7cabcf1c4a562aefe32b812427acf6559bf554a7b57af04711edd140575`.

**A hash is not anonymity.** Student numbers are short and guessable, so anyone who knows (or tries) a number can compute the same hash and find the matching wallet. Treat the hash as a pseudonym that keeps the number out of plain sight, not as a secret. Students should use a fresh wallet that holds nothing of value.

The hashing is controlled by the build-time flag `HASH_IDENTIFIER` in `src/app/components/first-tx/config.ts`. It defaults to **true**; `VITE_HASH_IDENTIFIER=false` sends the typed text as-is.

## What the contract does

| Call | Kind | What it does |
|---|---|---|
| `register(string id)` | write (transaction, costs gas) | Stores `msg.sender → id`. A wallet's first call adds it to the list and increments `count`. Calling again **replaces** the id; it never adds a second entry and never reverts for that reason. Every call adds 1 to `timesRegistered[msg.sender]`. Emits `Registered(who, id, timesRegistered)`. Rejects an empty id or one longer than 100 characters. |
| `count()` | read | Number of different wallets registered. |
| `idOf(address)` | read | The id a wallet holds now (empty if none). |
| `timesRegistered(address)` | read | How many times that wallet called `register`: 0 = never, 1 = once, 2 or more = it replaced its id. |
| `indexOf(address)` | read | The wallet's position in the list (0 = first). Only meaningful if `timesRegistered` is not 0. |
| `entriesLength()` | read | Length of the list (always equal to `count`). |
| `entryAt(uint index)` | read | `(address who, string id, uint times)` at that position. |
| `allEntries()` | read | The whole list in one call: `(address[] who, string[] ids, uint[] times)`, same position = same entry. This is what the board reads. |

**Re-registrations are visible, not hidden.** A wallet holds one id at a time, so a second `register` overwrites the first. The counter and the event keep the trace: `timesRegistered(wallet)` on the **Read Contract** tab shows 2 or more, and the **Events** tab lists every `Registered` event with the id sent each time and the running count, so the replaced values can still be read there.

Measured on a local test node (anvil): deployment about 662,000 gas; a first `register` with a 66-character id about 192,000 gas (206,000 for the very first wallet); a re-registration about 49,000 gas. Reading `allEntries()` is a free call that costs the node about 15,000 gas per entry (63 entries: 0.95 million), well within what a single RPC call allows at class sizes (geth's default cap is 50 million).

## Checking a student's submission

**In the browser.** The **Registered hashes** slide (Section 08, right after the wizard) lists every registered wallet with the id it holds and its `timesRegistered` count, newest first. **Refresh** reads the list again. Type a student number into the lookup: it is hashed in the browser exactly as the wizard does, and the board says whether that hash is on the list and which wallet (or wallets) registered it. The board only reads: no wallet, no transaction, and the typed number never leaves the browser.

**By hand.**

1. Compute the hash of their student number, for example with Node from the repo root:
   ```bash
   node -e "import('viem').then(v => console.log(v.keccak256(v.stringToBytes('20231234'))))"
   ```
2. Open the contract on Sepolia Etherscan, tab **Read Contract**, and call `idOf` with the student's wallet address. The two values must match. `timesRegistered` with the same address tells you whether they registered more than once. The **Events** tab lists every `Registered` event with its transaction.

## Deploying (instructor, once)

The deploy script compiles with `solc` and sends the transaction with `viem`. It needs Node 22.18 or newer.

```bash
npm run contract:compile    # compile only; refreshes src/app/components/first-tx/ClassRegistry.abi.json
npm run contract:address    # prints the deployer address and its Sepolia balance
npm run contract:deploy     # deploys, waits for the receipt, prints the contract address
```

1. **Deployer key.** The script reads it from the env var `DEPLOYER_PRIVATE_KEY`, else from the file named by `WIZARD_DEPLOYER_KEY_FILE`, else from `../wizard-deployer.key` (one folder above the repo, so it cannot be committed). The file holds one line: the `0x…` private key. Never commit it and never paste it anywhere.
2. **Fund it.** Run `npm run contract:address` and send that address a little Sepolia ETH from a faucet (https://sepolia-faucet.pk910.de needs no login). The script refuses to deploy if the balance is too low.
3. **Deploy.** `npm run contract:deploy`.
4. **Switch the wizard on.** Paste the printed address into `DEPLOYED_CONTRACT_ADDRESS` in `src/app/components/first-tx/config.ts` (look for `TODO: set after deploy`), or build with `VITE_CLASS_REGISTRY_ADDRESS=0x…`.
5. **Optional: verify the source on Etherscan** so students can read it there. Settings: compiler `0.8.39`, optimizer on with 200 runs, EVM version `paris`, licence MIT, no constructor arguments.

RPC: the script uses the public endpoints listed in `config.ts`. Set `SEPOLIA_RPC_URL` to use another one.

## Files

| File | Purpose |
|---|---|
| `contracts/ClassRegistry.sol` | The contract. |
| `scripts/deploy-class-registry.mjs` | Compile / address / deploy. |
| `src/app/components/first-tx/config.ts` | The one place for chain ID, RPC, explorer, contract address, `HASH_IDENTIFIER` and the WalletConnect project id. |
| `src/app/components/first-tx/ClassRegistry.abi.json` | ABI the wizard and the board import. Generated by `npm run contract:compile`; regenerate it whenever the contract changes. |
| `src/app/components/first-tx/registry.ts` | Read-only access (`allEntries`) and the hashing shared by the wizard and the board. Lazy-loaded. |
| `src/app/components/first-tx/RegistryBoard.tsx` | The "Registered hashes" board and the student-number lookup. |
