import Image from "next/image";
import { FieldCopilotDemo } from "./components/Demo";

const SCREENS = [
  {
    src: "/screens/01-today.png",
    label: "01 — Today",
    desc: "AI-curated morning. JoyAI already triaged overnight calls; today's route is optimized, parts pre-staged, top of stack flagged.",
  },
  {
    src: "/screens/02-capture.png",
    label: "02 — Capture",
    desc: "Voice in the unit. Transcription parses entities live. Tags emerge auto-detected. Three sentences replace a five-minute form.",
  },
  {
    src: "/screens/03-pattern.png",
    label: "03 — Pattern Detected",
    desc: "The moment that matters. The AI sees what the technician can't: a recurring pattern across the portfolio, a likely root cause, a vendor who's solved this before.",
    hero: true,
  },
  {
    src: "/screens/04-autofill.png",
    label: "04 — Auto-Filled",
    desc: "The work order, drafted. Confidence shown openly, every field editable. Parts checked against truck inventory. Photos auto-attached.",
  },
  {
    src: "/screens/05-wrap.png",
    label: "05 — Day Wrap",
    desc: "End of day, AI surfaces one insight worth escalating up the chain. Tomorrow is pre-loaded, parts ordered. Leave the day clean.",
  },
];

export default function Home() {
  return (
    <main className="font-sans">
      {/* ======== HERO ======== */}
      <section className="px-6 sm:px-10 pt-16 sm:pt-24 pb-20 max-w-6xl mx-auto">
        <div className="flex items-center gap-2 text-[12px] font-semibold tracking-[0.2em] text-text-tertiary mb-6 uppercase">
          <span className="text-accent-ai-soft">✦</span>
          A concept for HappyCo
        </div>

        <h1 className="text-[clamp(40px,7vw,84px)] font-bold leading-[1.02] tracking-[-0.04em] text-text-primary max-w-4xl">
          An AI copilot in the maintenance technician&apos;s pocket.
        </h1>

        <p className="mt-7 max-w-2xl text-[18px] sm:text-[20px] leading-[1.55] text-text-secondary">
          HappyCo already has the smartest AI in multifamily —{" "}
          <span className="font-semibold text-text-primary">JoyAI</span>{" "}
          handles calls. The next move is shipping that intelligence into the
          field, where the technician is in the unit, hands dirty, three
          sentences away from a complete work order — and a portfolio-wide
          pattern they couldn&apos;t see alone.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3 text-[13px] font-mono text-text-tertiary">
          <span><span className="text-text-primary">5</span> screens</span>
          <span><span className="text-text-primary">1</span> functional moment</span>
          <span><span className="text-text-primary">~12h</span> with AI</span>
          <span><span className="text-text-primary">0</span> mockup tools</span>
        </div>
      </section>

      {/* ======== LIVE MOMENT ======== */}
      <section className="bg-bg-deep text-text-inverse">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 py-20 sm:py-28">
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-14 lg:gap-20 items-center">
            <div>
              <div className="text-[12px] font-semibold tracking-[0.2em] text-accent-ai mb-5 uppercase">
                The moment that matters
              </div>
              <h2 className="text-[clamp(32px,4.6vw,56px)] font-bold leading-[1.05] tracking-[-0.03em] mb-7">
                Three sentences. <br />
                The AI does the rest.
              </h2>
              <p className="text-[17px] leading-[1.6] text-text-on-navy/85 max-w-lg mb-10">
                Watch the actual flow. Marcus walks into Unit 3B, taps the mic,
                describes the leak. The AI parses entities in real time, tags
                the work, and surfaces the insight a human would never connect
                across 200 units of memory:{" "}
                <span className="text-accent-ai font-semibold">
                  it&apos;s the third leak in the same vertical column this
                  month.
                </span>
              </p>

              {/* Timeline — stacked vertically below the paragraph */}
              <div className="space-y-4 max-w-md">
                <TimelineStep n="1" label="Speak naturally" />
                <TimelineStep n="2" label="AI parses entities live" />
                <TimelineStep n="3" label="Pattern detected" />
              </div>
            </div>

            <FieldCopilotDemo />
          </div>
        </div>
      </section>

      {/* ======== THE 5 SCREENS ======== */}
      <section className="px-6 sm:px-10 py-20 sm:py-28 max-w-6xl mx-auto">
        <div className="text-[12px] font-semibold tracking-[0.2em] text-text-tertiary mb-5 uppercase">
          The full flow
        </div>
        <h2 className="text-[clamp(32px,4.4vw,52px)] font-bold leading-[1.05] tracking-[-0.03em] mb-3 max-w-3xl">
          A day in five screens.
        </h2>
        <p className="text-[17px] leading-[1.55] text-text-secondary max-w-2xl mb-14">
          Each screen lives at a different moment of the technician&apos;s day.
          The AI threads through all of them — never theatrical, always marked
          by the same{" "}
          <span className="text-accent-ai-soft font-semibold">✦ cyan</span>{" "}
          accent so the user always knows when it&apos;s the system speaking.
        </p>

        {/* Hero screen */}
        {SCREENS.filter((s) => s.hero).map((s) => (
          <div
            key={s.src}
            className="grid lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-16 items-center mb-20 lg:mb-28"
          >
            <div className="relative flex items-center justify-center py-10 lg:py-16">
              {/* Soft cyan glow — hints at the AI moment without a heavy frame */}
              <div
                aria-hidden
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <div className="w-[80%] aspect-square bg-accent-ai/20 rounded-full blur-[80px]" />
              </div>
              <Image
                src={s.src}
                alt={s.label}
                width={390}
                height={844}
                className="relative rounded-[44px] shadow-[0_30px_60px_-15px_rgba(11,37,64,0.25)] ring-1 ring-bg-deep/5 max-w-full h-auto"
                priority
              />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] text-accent-ai-soft mb-4 uppercase">
                <span>✦</span> Hero
              </div>
              <div className="text-[12px] font-semibold tracking-[0.18em] text-text-tertiary mb-2 uppercase">
                {s.label}
              </div>
              <h3 className="text-[28px] sm:text-[36px] font-bold tracking-[-0.025em] leading-[1.1] text-text-primary mb-4">
                Pattern detected.
              </h3>
              <p className="text-[16px] sm:text-[17px] leading-[1.6] text-text-secondary">
                {s.desc}
              </p>
              <div className="mt-7 grid grid-cols-2 gap-4 max-w-md">
                <Stat value="94%" label="AI confidence shown" />
                <Stat value="14" label="matching cases used" />
                <Stat value="3" label="units flagged in stack" />
                <Stat value="1" label="vendor pre-routed" />
              </div>
            </div>
          </div>
        ))}

        {/* The other 4 — editorial floating, consistent with hero treatment */}
        <div className="grid sm:grid-cols-2 gap-y-16 gap-x-10">
          {SCREENS.filter((s) => !s.hero).map((s) => (
            <div key={s.src}>
              <div className="relative flex items-center justify-center py-8 mb-6">
                {/* Subtle cyan glow — softer than the hero */}
                <div
                  aria-hidden
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                >
                  <div className="w-[70%] aspect-square bg-accent-ai/10 rounded-full blur-[60px]" />
                </div>
                <Image
                  src={s.src}
                  alt={s.label}
                  width={390}
                  height={844}
                  className="relative rounded-[44px] shadow-[0_20px_40px_-15px_rgba(11,37,64,0.2)] ring-1 ring-bg-deep/5 max-w-[320px] w-full h-auto"
                />
              </div>
              <div className="text-[11px] font-semibold tracking-[0.18em] text-text-tertiary mb-2 uppercase">
                {s.label}
              </div>
              <p className="text-[15px] leading-[1.55] text-text-secondary">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ======== THE WHY ======== */}
      <section className="bg-bg-muted">
        <div className="max-w-5xl mx-auto px-6 sm:px-10 py-20 sm:py-28">
          <div className="text-[12px] font-semibold tracking-[0.2em] text-text-tertiary mb-5 uppercase">
            Why this, why now
          </div>
          <h2 className="text-[clamp(32px,4.4vw,52px)] font-bold leading-[1.06] tracking-[-0.03em] mb-10 max-w-3xl">
            HappyCo&apos;s next AI primitive isn&apos;t a feature. It&apos;s a
            persona.
          </h2>

          <div className="grid md:grid-cols-2 gap-10 text-[16px] leading-[1.65] text-text-secondary">
            <div className="space-y-4">
              <p>
                <span className="font-semibold text-text-primary">
                  JoyAI handles the call.
                </span>{" "}
                That covers one persona — the resident, after hours. But
                multifamily maintenance has four personas, and the one with
                the most volume of friction is the maintenance technician in
                the field.
              </p>
              <p>
                Most of HappyCo&apos;s product surface today serves managers
                and owners — dashboards, audits, KPIs. The technician
                experience is mobile and form-heavy. That&apos;s the gap.
              </p>
            </div>
            <div className="space-y-4">
              <p>
                <span className="font-semibold text-text-primary">
                  Field Copilot
                </span>{" "}
                extends the JoyAI primitive into the technician&apos;s
                pocket. Same intelligence, different context. It captures
                voice, parses intent, and most importantly:{" "}
                <span className="text-accent-ai-soft font-semibold">
                  it remembers across the portfolio.
                </span>
              </p>
              <p>
                That&apos;s where the &ldquo;40% repeat work eliminated&rdquo;
                that HappyCo&apos;s testimonials promise actually gets earned
                — when the system catches that the leak in 3B is the third in
                the same column, not three isolated tickets.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ======== HOW I BUILT THIS ======== */}
      <section className="px-6 sm:px-10 py-20 sm:py-28 max-w-5xl mx-auto">
        <div className="text-[12px] font-semibold tracking-[0.2em] text-text-tertiary mb-5 uppercase">
          How I built this with AI
        </div>
        <h2 className="text-[clamp(28px,3.8vw,44px)] font-bold leading-[1.1] tracking-[-0.03em] mb-12 max-w-3xl">
          Transparent process. No magic, just leverage.
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          <Step
            n="01"
            title="Research, ~30 min"
            tools="Claude · happy.co"
            body="Scraped happy.co for product surface, personas, brand voice, testimonials. Identified JoyAI as the existing AI primitive to extend, not replace."
          />
          <Step
            n="02"
            title="Concept, ~45 min"
            tools="Claude"
            body="Stress-tested three concepts (Field Copilot, Pattern Teardown, Owner's Pulse). Picked the one that ladders directly into HappyCo's strategic gap."
          />
          <Step
            n="03"
            title="Design system, ~1h"
            tools="Figma · Plugin API"
            body="Generated 19 color tokens + 15 text styles programmatically in Figma via the Plugin API. Brand-aligned to HappyCo: navy, cyan for AI, neutrals."
          />
          <Step
            n="04"
            title="5 high-fi frames, ~3h"
            tools="Figma + Claude"
            body="Built each screen with auto-layout, components, and the design tokens. Iterated copy with Claude to match HappyCo's voice."
          />
          <Step
            n="05"
            title="Functional demo, ~3h"
            tools="Next.js · React 19 · Motion · Tailwind"
            body="The Frame 2 → Frame 3 transition above is real code, not a prototype. State machine, real animations, deployed live."
          />
          <Step
            n="06"
            title="This microsite, ~1.5h"
            tools="Next.js · Vercel"
            body="What you're reading. The container is also a demonstration: same brand language, same craft, real engineering."
          />
        </div>

        <div className="mt-14 p-7 sm:p-9 rounded-2xl bg-bg-primary text-text-inverse">
          <div className="text-[11px] font-semibold tracking-[0.2em] text-accent-ai mb-3 uppercase">
            The honest part
          </div>
          <p className="text-[16px] leading-[1.6] text-text-on-navy max-w-2xl">
            AI didn&apos;t make me faster at making decisions. It made me
            faster at executing them. Every concept, copy choice, and
            structural call was mine. AI handled the typing.
          </p>
        </div>
      </section>

      {/* ======== CTA ======== */}
      <section className="bg-bg-deep text-text-inverse">
        <div className="max-w-4xl mx-auto px-6 sm:px-10 py-24 sm:py-32 text-center">
          <div className="text-[12px] font-semibold tracking-[0.2em] text-accent-ai mb-6 uppercase">
            ✦ Here&apos;s what I&apos;d do
          </div>
          <h2 className="text-[clamp(32px,4.8vw,56px)] font-bold leading-[1.08] tracking-[-0.03em] mb-7 max-w-2xl mx-auto">
            A working concept, submitted for review.
          </h2>
          <p className="text-[17px] leading-[1.65] text-text-on-navy/80 max-w-2xl mx-auto mb-10">
            The artifact above documents persona choice, system extension
            rationale (JoyAI → Field Copilot), and one functional moment
            built in real code. Open to discussion of implementation
            trade-offs, scope, or design rationale.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://www.figma.com/design/MG6QCVUnwNy4NLIahdk2p0"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-accent-ai text-bg-deep font-semibold hover:bg-text-inverse transition"
            >
              View Figma file
              <span>↗</span>
            </a>
            <a
              href="https://chriscalvino.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full border border-text-on-navy/30 text-text-inverse font-medium hover:border-accent-ai hover:text-accent-ai transition"
            >
              chriscalvino.com
              <span>↗</span>
            </a>
          </div>
        </div>
      </section>

      <footer className="px-6 sm:px-10 py-10 max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-[13px] text-text-tertiary">
        <div>
          Field Copilot · A concept for HappyCo · By{" "}
          <span className="text-text-primary font-medium">
            Christian Calviño
          </span>
        </div>
        <div>
          Not affiliated with HappyCo · {new Date().getFullYear()}
        </div>
      </footer>
    </main>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="text-[28px] font-mono font-medium text-text-primary tracking-[-0.02em]">
        {value}
      </div>
      <div className="text-[12px] text-text-tertiary leading-snug mt-0.5">
        {label}
      </div>
    </div>
  );
}

function TimelineStep({ n, label }: { n: string; label: string }) {
  return (
    <div className="relative pt-4 border-t border-text-on-navy/15">
      <div className="absolute -top-px left-0 w-8 h-px bg-accent-ai" />
      <div className="text-[12px] font-semibold tracking-[0.18em] text-accent-ai mb-1.5">
        {n}.
      </div>
      <div className="text-[15px] text-text-on-navy/90 leading-snug">
        {label}
      </div>
    </div>
  );
}

function Step({
  n,
  title,
  tools,
  body,
}: {
  n: string;
  title: string;
  tools: string;
  body: string;
}) {
  return (
    <div className="border-t border-border-subtle pt-5">
      <div className="flex items-baseline justify-between mb-2">
        <span className="text-[28px] font-mono text-text-tertiary tracking-tight">
          {n}
        </span>
        <span className="text-[11px] font-mono text-text-tertiary uppercase tracking-wider">
          {tools}
        </span>
      </div>
      <h3 className="text-[18px] font-semibold text-text-primary mb-2">
        {title}
      </h3>
      <p className="text-[15px] leading-[1.55] text-text-secondary">{body}</p>
    </div>
  );
}
