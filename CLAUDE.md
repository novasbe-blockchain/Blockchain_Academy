# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Role

You are a specialized Blockchain instructor and developer. This is an educational web platform teaching blockchain technology across three courses. Content must be technically accurate and pedagogically sound — treat slide content with the same rigor as academic material.

## Commands

```bash
npm run dev        # Start dev server at http://localhost:5173
npm run build      # Production build
npm run preview    # Preview production build
```

No test suite exists. Visual verification in the browser is the primary validation method.

## Architecture Overview

**Tech stack:** React 18 + React Router 7 + Vite 6 + Tailwind CSS 4 + shadcn/ui + Radix UI

### Routing & Layout Hierarchy

```
AcademyRoot (keyboard nav, dark mode)
└── CourseSelection (/)
└── Root / SmartContractsRoot / BlockchainPlatformsRoot  (course shell + CourseNav)
    └── Section pages (slide content)
```

Each course has its own Root component that sets the accent color passed to `CourseNav`:
- **Blockchain Fundamentals** (`/blockchain-fundamentals`) → `Root` → accent `#ED1C24` (red)
- **Smart Contracts** (`/smart-contracts`) → `SmartContractsRoot` → accent `#6366f1` (indigo)
- **Blockchain Platforms** (`/blockchain-platforms`) → `BlockchainPlatformsRoot` → accent `#39B54A` (green)

### Slide System

Sections are full-screen slide decks. Each slide is `calc(100dvh - 56px)` tall. CSS `snap-y snap-mandatory` handles scroll snapping. Arrow keys navigate slides globally via `useSlideKeyNav` hook (attached at `AcademyRoot`).

**Section page structure pattern:**
```tsx
const chapters = [
  { id: 'section-id', label: 'Chapter Label' },
  // ...
];

// Layout
<div className="h-full w-full flex overflow-hidden">
  <div className="w-44 shrink-0 h-full hidden lg:block border-r border-border">
    <SectionNav chapters={chapters} />
  </div>
  <div id="section-scroll" className="flex-1 overflow-y-auto snap-y snap-mandatory">
    <div className="slide-flow">
      <div className="h-full">
        <TitleSlide title="..." subtitle="..." icon={...} />
      </div>
      <div id="section-id" className="h-full flex flex-col p-5 lg:p-8">
        {/* slide content */}
      </div>
    </div>
  </div>
</div>
```

`SectionNav` auto-highlights the active chapter via scroll position (IntersectionObserver-like logic using `getBoundingClientRect`). Each chapter `id` must match the corresponding slide's `id` attribute.

### Slide Templates

Ten pre-built templates in `src/app/components/templates/`:

| Template | Use case |
|---|---|
| `TitleSlide` | Section opener with icon + gradient |
| `ConceptSlide` | Title + description + visual + numbered key points (2-col) |
| `ComparisonSlide` | Side-by-side feature comparison table |
| `DiagramSlide` | Large diagram + caption + annotations |
| `ProcessSlide` | Sequential step-by-step flow |
| `QuizSlide` | Interactive multiple choice with instant feedback |
| `GroupedQuiz` | A section's whole quiz on ONE slide: takes `questions[]` (QuizSlide's shape), shows one at a time with "Question N / total" + Next question. Use this instead of several `QuizSlide` slides in a row |
| `DiscussionSlide` | Discussion prompts for class engagement |
| `TakeawaySlide` | Bulleted summary with checkmarks |
| `TimelineSlide` | Chronological history view |
| `WhiteboardSlide` | Free-form canvas area |

### Shared Content Components

- `DefinitionBox` — term definition with book icon
- `CalloutBox` — variant: `info | warning | tip | important`
- `TeacherCard` — instructor profile

### Blockchain Visualization Components (`src/app/components/blockchain/`)

Interactive educational visualizations: `BlockchainBlock`, `BlockchainChain`, `ConsensusVisualization`, `TransactionFlow`, `NetworkNode`. Use these when explaining core blockchain mechanics — they are already wired for animation and interactivity.

## Course Content Map

**Course 1 — Blockchain Fundamentals**
- Prologue: History of money and trust
- Section 1: Core concepts (DLT, hashing, Merkle trees, blocks, wallets, consensus) + 36-term vocabulary wall + interactive SHA-256 demo
- Section 2: (extended content)
- Section 3: (extended content)

**Course 2 — Smart Contracts**
- Sections 1-5: Nick Szabo origins → how smart contracts work (gas, Web3) → case studies → oracle problem/limitations → team project

**Course 3 — Blockchain Platforms**
- Section 0: Recap (centralization spectrum, blockchain types)
- Sections 1-4: Bitcoin deep dive → Ethereum → Hyperledger → Interoperability
- Conclusion

## Design System

CSS variables defined in `src/styles/theme.css`. Never hardcode colors — use `hsl(var(--primary))`, `hsl(var(--accent))`, etc.

Dark mode is toggled by adding `.dark` class to `<html>`. Both modes must be checked when building new slides.

Responsive breakpoints: `lg:` is the primary breakpoint (sidebar appears, content expands). Below 900px viewport height, slides zoom out proportionally via CSS.

Icons: use **Lucide React** (`lucide-react`) exclusively unless a specific icon is missing — do not mix icon libraries.

## Adding New Content

1. **New slide in existing section:** Add a chapter entry to the `chapters` array, add a `<div id="chapter-id" className="h-full ...">` block, use an appropriate template.
2. **New section page:** Create `src/app/pages/[course]/SectionN.tsx`, add the route in `src/app/routes.ts`, add the section link in the course's Root component CourseNav.
3. **Blockchain accuracy:** All technical content (hashes, consensus algorithms, protocol specifics) must be verified against primary sources. The platform is used in academic instruction — errors in content undermine student learning.
