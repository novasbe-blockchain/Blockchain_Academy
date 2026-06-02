import { BookOpen } from 'lucide-react';
import { SiteFooter } from '../components/shared/SiteFooter';

export function QuickReference() {
  return (
    <div className="size-full overflow-y-auto p-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <BookOpen className="size-12 text-[#6366f1]" />
          <div>
            <h1 className="text-4xl font-bold text-foreground">Quick Reference Guide</h1>
            <p className="text-muted-foreground">Copy-paste ready code snippets for all components</p>
          </div>
        </div>

        {/* Slide Templates */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 pb-2 border-b border-border">Slide Templates</h2>
          
          <div className="space-y-8">
            {/* Title Slide */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-bold text-foreground mb-3">TitleSlide</h3>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                <code>{`import { TitleSlide } from '../components/templates/TitleSlide';
import { Blocks } from 'lucide-react';

<TitleSlide
  sectionNumber="SECTION 01"
  title="Your Title Here"
  subtitle="Your subtitle here"
  icon={<Blocks className="size-20 text-[#6366f1]" />}
  gradient="from-[#6366f1] to-[#8b5cf6]"
/>`}</code>
              </pre>
            </div>

            {/* Concept Slide */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-bold text-foreground mb-3">ConceptSlide</h3>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                <code>{`import { ConceptSlide } from '../components/templates/ConceptSlide';

<ConceptSlide
  title="Concept Title"
  description="Brief explanation of the concept"
  visual={
    <div>Your visual component here</div>
  }
  keyPoints={[
    "First key point",
    "Second key point",
    "Third key point"
  ]}
/>`}</code>
              </pre>
            </div>

            {/* Timeline Slide */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-bold text-foreground mb-3">TimelineSlide</h3>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                <code>{`import { TimelineSlide } from '../components/templates/TimelineSlide';

<TimelineSlide
  title="Timeline Title"
  events={[
    {
      year: "2008",
      title: "Event Title",
      description: "Event description"
    },
    // Add more events...
  ]}
/>`}</code>
              </pre>
            </div>

            {/* Process Slide */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-bold text-foreground mb-3">ProcessSlide</h3>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                <code>{`import { ProcessSlide } from '../components/templates/ProcessSlide';

<ProcessSlide
  title="Process Title"
  steps={[
    { number: 1, title: "Step 1", description: "Description" },
    { number: 2, title: "Step 2", description: "Description" },
    { number: 3, title: "Step 3", description: "Description" }
  ]}
/>`}</code>
              </pre>
            </div>

            {/* Quiz Slide */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-bold text-foreground mb-3">QuizSlide</h3>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                <code>{`import { QuizSlide } from '../components/templates/QuizSlide';

<QuizSlide
  question="What is the main purpose of blockchain?"
  options={[
    { text: "Correct answer", correct: true },
    { text: "Wrong answer 1", correct: false },
    { text: "Wrong answer 2", correct: false },
    { text: "Wrong answer 3", correct: false }
  ]}
  explanation="Explanation of the correct answer"
/>`}</code>
              </pre>
            </div>
          </div>
        </section>

        {/* Blockchain Components */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 pb-2 border-b border-border">Blockchain Components</h2>
          
          <div className="space-y-8">
            {/* BlockchainBlock */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-bold text-foreground mb-3">BlockchainBlock</h3>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                <code>{`import { BlockchainBlock } from '../components/blockchain/BlockchainBlock';

<BlockchainBlock
  blockNumber={100}
  hash="0xabcdef..."
  previousHash="0x123456..."
  timestamp="Mar 10, 2026"
  data="Transaction data"
  highlighted={true}
/>`}</code>
              </pre>
            </div>

            {/* BlockchainChain */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-bold text-foreground mb-3">BlockchainChain</h3>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                <code>{`import { BlockchainChain } from '../components/blockchain/BlockchainChain';

<BlockchainChain
  blocks={[
    { blockNumber: 0, data: "Genesis Block" },
    { blockNumber: 1, data: "Block 1" },
    { blockNumber: 2, data: "Block 2", highlighted: true }
  ]}
/>`}</code>
              </pre>
            </div>

            {/* TransactionFlow */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-bold text-foreground mb-3">TransactionFlow</h3>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                <code>{`import { TransactionFlow } from '../components/blockchain/TransactionFlow';

<TransactionFlow
  from="0xABC...123"
  to="0xDEF...456"
  amount="2.5 BTC"
  status="confirmed" // 'pending' | 'confirmed' | 'failed'
/>`}</code>
              </pre>
            </div>

            {/* NetworkNode */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-bold text-foreground mb-3">NetworkNode</h3>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                <code>{`import { NetworkNode } from '../components/blockchain/NetworkNode';

<NetworkNode
  label="Node 1"
  status="active" // 'active' | 'inactive' | 'syncing'
/>`}</code>
              </pre>
            </div>
          </div>
        </section>

        {/* Shared Components */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 pb-2 border-b border-border">Shared Components</h2>
          
          <div className="space-y-8">
            {/* DefinitionBox */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-bold text-foreground mb-3">DefinitionBox</h3>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                <code>{`import { DefinitionBox } from '../components/shared/DefinitionBox';

<DefinitionBox
  term="Blockchain"
  definition="A distributed ledger technology..."
/>`}</code>
              </pre>
            </div>

            {/* CalloutBox */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-bold text-foreground mb-3">CalloutBox</h3>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                <code>{`import { CalloutBox } from '../components/shared/CalloutBox';

<CalloutBox type="info" title="Important Note">
  This is an informational callout message
</CalloutBox>

// Types: 'info' | 'warning' | 'tip' | 'important'`}</code>
              </pre>
            </div>
          </div>
        </section>

        {/* Tips */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 pb-2 border-b border-border">Tips & Best Practices</h2>
          
          <div className="space-y-4">
            <div className="bg-[#10b981]/10 border-l-4 border-[#10b981] rounded-r-lg p-4">
              <h4 className="font-bold text-[#10b981] mb-2">✓ Use Full-Screen Slides</h4>
              <p className="text-sm text-foreground">Wrap each slide in a div with h-screen class for full-screen presentation: <code className="bg-muted px-2 py-1 rounded">&lt;div className="h-screen"&gt;</code></p>
            </div>

            <div className="bg-[#10b981]/10 border-l-4 border-[#10b981] rounded-r-lg p-4">
              <h4 className="font-bold text-[#10b981] mb-2">✓ Consistent Colors</h4>
              <p className="text-sm text-foreground">Use the predefined color palette for consistency: #6366f1 (primary), #8b5cf6 (secondary), #22d3ee (neon), #10b981 (success)</p>
            </div>

            <div className="bg-[#10b981]/10 border-l-4 border-[#10b981] rounded-r-lg p-4">
              <h4 className="font-bold text-[#10b981] mb-2">✓ Limit Text</h4>
              <p className="text-sm text-foreground">Keep slides visual-heavy and text-light. Use 3-5 bullet points maximum per slide.</p>
            </div>

            <div className="bg-[#10b981]/10 border-l-4 border-[#10b981] rounded-r-lg p-4">
              <h4 className="font-bold text-[#10b981] mb-2">✓ Interactive Elements</h4>
              <p className="text-sm text-foreground">Include quizzes and discussion slides every few sections to maintain engagement.</p>
            </div>
          </div>
        </section>
      </div>
      <SiteFooter className="snap-start" />
    </div>
  );
}
