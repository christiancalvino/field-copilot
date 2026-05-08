"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

type Phase = "idle" | "recording" | "transcript" | "thinking" | "sheet" | "done";

const TRANSCRIPT: { text: string; entity: boolean }[] = [
  { text: "“", entity: false },
  { text: "Leaking ", entity: true },
  { text: "faucet ", entity: true },
  { text: "under ", entity: false },
  { text: "the ", entity: false },
  { text: "kitchen ", entity: true },
  { text: "sink. ", entity: true },
  { text: "Third ", entity: true },
  { text: "one ", entity: true },
  { text: "this ", entity: true },
  { text: "month ", entity: true },
  { text: "I ", entity: false },
  { text: "think. ", entity: false },
  { text: "Water ", entity: true },
  { text: "pooling ", entity: true },
  { text: "on ", entity: false },
  { text: "the ", entity: false },
  { text: "cabinet ", entity: false },
  { text: "floor.”", entity: false },
];

const WAVE_BARS = 35;

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function FieldCopilotDemo() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [wordsShown, setWordsShown] = useState(0);
  const [timer, setTimer] = useState(0);
  const [diagramStep, setDiagramStep] = useState(0); // 0..3 (how many cyan dots in)
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const intervalsRef = useRef<ReturnType<typeof setInterval>[]>([]);

  const clearAll = () => {
    timeoutsRef.current.forEach(clearTimeout);
    intervalsRef.current.forEach(clearInterval);
    timeoutsRef.current = [];
    intervalsRef.current = [];
  };

  const schedule = (fn: () => void, ms: number) => {
    const t = setTimeout(fn, ms);
    timeoutsRef.current.push(t);
  };

  const play = () => {
    clearAll();
    setWordsShown(0);
    setTimer(0);
    setDiagramStep(0);
    setPhase("recording");

    // Tick timer up to 0:42 over ~4.2s, then freeze (it's the moment)
    const tickStart = Date.now();
    const tickEnd = 4200;
    const tickInterval = setInterval(() => {
      const elapsed = Date.now() - tickStart;
      if (elapsed >= tickEnd) {
        setTimer(42);
        clearInterval(tickInterval);
        return;
      }
      setTimer((elapsed / tickEnd) * 42);
    }, 80);
    intervalsRef.current.push(tickInterval);

    // Start typing transcript word-by-word
    schedule(() => setPhase("transcript"), 800);
    TRANSCRIPT.forEach((_, i) => {
      schedule(() => setWordsShown(i + 1), 800 + i * 120);
    });

    // Brief "thinking" pause after transcript
    const transcriptEnd = 800 + TRANSCRIPT.length * 120;
    schedule(() => setPhase("thinking"), transcriptEnd + 200);

    // Sheet slides up
    schedule(() => setPhase("sheet"), transcriptEnd + 1100);

    // Diagram dots fill in sequentially
    schedule(() => setDiagramStep(1), transcriptEnd + 1700);
    schedule(() => setDiagramStep(2), transcriptEnd + 1900);
    schedule(() => setDiagramStep(3), transcriptEnd + 2100);

    schedule(() => setPhase("done"), transcriptEnd + 3500);
  };

  useEffect(() => () => clearAll(), []);

  const showWaveform = phase !== "idle";
  const showSheet = phase === "sheet" || phase === "done";

  return (
    <div className="relative w-full max-w-[390px] mx-auto">
      {/* Phone shell */}
      <div className="relative aspect-[390/844] rounded-[44px] overflow-hidden bg-bg-deep border border-border-subtle/10 shadow-2xl">
        {/* === FRAME 2 LAYER (always rendered, sheet covers it) === */}
        <div className="absolute inset-0 flex flex-col">
          {/* Status bar */}
          <div className="flex items-center justify-between px-6 pt-3.5 pb-2.5 text-text-inverse">
            <span className="text-[13px] font-medium">9:41</span>
            <span className="text-[13px] tracking-[0.15em]">•••••</span>
          </div>

          {/* Header */}
          <div className="px-6 pt-3 pb-3 space-y-1.5">
            <div className="flex items-center gap-2.5">
              <motion.span
                className="w-2.5 h-2.5 rounded-full bg-danger"
                animate={
                  phase === "idle"
                    ? { opacity: 0.3 }
                    : { opacity: [1, 0.4, 1] }
                }
                transition={{ duration: 1.4, repeat: Infinity }}
              />
              <span className="text-[11px] font-semibold text-danger tracking-[0.15em]">
                {phase === "idle" ? "READY" : "RECORDING"}
              </span>
              <span className="text-[13px] font-mono text-accent-ai ml-1">
                {formatTime(timer)}
              </span>
            </div>
            <div className="text-[17px] font-semibold text-text-inverse">
              Unit 3B · Riverside Apartments
            </div>
            <div className="text-[13px] text-text-on-navy/60">
              {phase === "idle"
                ? "Tap the mic to start. AI will fill in the rest."
                : "Speak naturally. Tag photos with the camera button."}
            </div>
          </div>

          {/* Waveform */}
          <div className="flex items-center justify-center py-8">
            <div className="flex items-end gap-[5px] h-[60px]">
              {Array.from({ length: WAVE_BARS }).map((_, i) => {
                const distFromCenter = Math.abs(i - WAVE_BARS / 2) / (WAVE_BARS / 2);
                const baseOpacity = 1 - distFromCenter * 0.5;
                return (
                  <motion.span
                    key={i}
                    className="w-1 rounded-full bg-accent-ai origin-bottom"
                    style={{
                      height: `${10 + Math.sin(i * 1.3) * 18 + 22}px`,
                      opacity: baseOpacity,
                    }}
                    animate={
                      showWaveform
                        ? {
                            scaleY: [0.4, 1, 0.6, 1.1, 0.5, 1],
                          }
                        : { scaleY: 0.3 }
                    }
                    transition={{
                      duration: 1.2 + (i % 5) * 0.15,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.03,
                    }}
                  />
                );
              })}
            </div>
          </div>

          {/* Transcript */}
          <div className="px-6 space-y-3 flex-1">
            <AnimatePresence>
              {phase !== "idle" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-2"
                >
                  <div className="text-[11px] font-semibold tracking-[0.18em] text-accent-ai">
                    LIVE TRANSCRIPT
                  </div>
                  <div
                    className={`text-[17px] font-semibold leading-[1.45] text-text-inverse ${
                      phase === "transcript" || phase === "recording"
                        ? "cursor-blink"
                        : ""
                    }`}
                  >
                    {TRANSCRIPT.slice(0, wordsShown).map((tok, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.18 }}
                        className={
                          tok.entity ? "text-accent-ai font-semibold" : ""
                        }
                      >
                        {tok.text}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {(phase === "thinking" ||
                phase === "transcript" && wordsShown >= TRANSCRIPT.length) && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-2 pt-2"
                >
                  <div className="text-[11px] font-semibold tracking-[0.18em] text-text-tertiary">
                    AUTO-DETECTED
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["plumbing", "high priority", "recurring"].map((t, i) => (
                      <motion.span
                        key={t}
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-accent-ai/60 bg-bg-deep text-[11px] font-semibold text-accent-ai"
                      >
                        <span className="w-1 h-1 rounded-full bg-accent-ai" />
                        {t}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom mic */}
          <div className="px-6 pb-9 pt-4 flex items-center justify-around">
            <div className="flex flex-col items-center gap-1.5 opacity-70">
              <div className="w-12 h-12 rounded-full border border-accent-ai/60 flex items-center justify-center text-text-inverse text-[18px]">
                ✕
              </div>
              <span className="text-[10px] text-text-on-navy/70">Cancel</span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <motion.button
                onClick={phase === "idle" ? play : undefined}
                className="w-[72px] h-[72px] rounded-full bg-accent-ai flex items-center justify-center"
                animate={
                  phase === "idle"
                    ? { boxShadow: "0 0 0 0 rgba(0, 212, 255, 0.6)" }
                    : phase === "recording" || phase === "transcript"
                    ? {
                        boxShadow: [
                          "0 0 0 0 rgba(0, 212, 255, 0.6)",
                          "0 0 0 16px rgba(0, 212, 255, 0)",
                        ],
                      }
                    : { boxShadow: "0 0 32px rgba(0, 212, 255, 0.5)" }
                }
                transition={{
                  duration: 1.4,
                  repeat:
                    phase === "recording" || phase === "transcript"
                      ? Infinity
                      : 0,
                }}
                whileHover={phase === "idle" ? { scale: 1.05 } : undefined}
                whileTap={phase === "idle" ? { scale: 0.95 } : undefined}
              >
                <span className="w-4 h-4 rounded-sm bg-bg-deep" />
              </motion.button>
              <span className="text-[10px] text-accent-ai">
                {phase === "idle" ? "Tap to start" : "Recording…"}
              </span>
            </div>
            <div className="flex flex-col items-center gap-1.5 opacity-70">
              <div className="w-12 h-12 rounded-full border border-accent-ai/60 flex items-center justify-center text-text-inverse text-[18px]">
                ◉
              </div>
              <span className="text-[10px] text-text-on-navy/70">Photo</span>
            </div>
          </div>
        </div>

        {/* === IDLE OVERLAY (instructional) === */}
        <AnimatePresence>
          {phase === "idle" && (
            <motion.div
              key="idle-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-bg-deep/40 backdrop-blur-[1px] flex items-end justify-center pb-44 pointer-events-none"
            >
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-center text-text-inverse text-[13px] font-medium"
              >
                ↓ Tap the mic ↓
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* === SHEET (Pattern Detected) === */}
        <AnimatePresence>
          {showSheet && (
            <motion.div
              key="sheet"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="absolute inset-x-0 bottom-0 bg-bg-card rounded-t-[28px] shadow-[0_-8px_32px_rgba(0,0,0,0.25)] p-5 pb-7"
              style={{ height: "62%" }}
            >
              {/* Drag handle */}
              <div className="flex justify-center mb-3">
                <span className="w-10 h-1 rounded-full bg-border-strong" />
              </div>

              {/* Header row */}
              <div className="flex items-center justify-between mb-3.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-bg-primary flex items-center justify-center">
                    <span className="text-accent-ai text-[14px]">✦</span>
                  </div>
                  <span className="text-[20px] font-semibold text-text-primary tracking-[-0.02em]">
                    Pattern detected
                  </span>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-bg-muted text-[11px] font-semibold text-text-secondary">
                  <span className="w-1.5 h-1.5 rounded-full bg-success" />
                  High confidence
                </span>
              </div>

              {/* Insight card */}
              <div className="bg-bg-muted rounded-2xl p-4 flex items-center gap-3.5 mb-3">
                <div className="flex-1 space-y-1">
                  <div className="text-[11px] font-semibold tracking-[0.15em] text-accent-ai-soft">
                    3RD LEAK · C-STACK
                  </div>
                  <div className="text-[17px] font-semibold tracking-[-0.02em] text-text-primary">
                    Same column, 30 days
                  </div>
                  <div className="text-[13px] leading-snug text-text-secondary">
                    Units 3C, 4C and 5C all flagged. Probable shared cause
                    upstream.
                  </div>
                </div>

                {/* Building diagram */}
                <div className="relative w-[72px] h-[106px] flex-shrink-0">
                  {[
                    { y: 0, idx: 0 },
                    { y: 22, idx: 1 },
                    { y: 44, idx: 2 },
                    { y: 66, isWhite: true },
                    { y: 88, isWhite: true },
                  ].map((floor, i) => (
                    <div
                      key={i}
                      className={`absolute left-0 w-16 h-[18px] rounded ${
                        floor.isWhite
                          ? "bg-white border border-border-subtle"
                          : "bg-bg-primary"
                      }`}
                      style={{ top: floor.y }}
                    >
                      {!floor.isWhite && (
                        <motion.span
                          className="absolute right-1 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent-ai"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={
                            diagramStep > (floor.idx ?? 0)
                              ? { scale: 1, opacity: 1 }
                              : { scale: 0, opacity: 0 }
                          }
                          transition={{ type: "spring", damping: 18 }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Cause card */}
              <div className="bg-bg-card rounded-2xl border border-border-subtle p-4 space-y-1.5 mb-3">
                <div className="text-[11px] font-semibold tracking-[0.15em] text-text-tertiary">
                  LIKELY CAUSE
                </div>
                <div className="text-[15px] font-medium text-text-primary">
                  Pressure regulator on stack riser
                </div>
                <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-bg-muted text-[11px] font-medium text-text-secondary">
                  14 matching cases · across portfolio
                </span>
              </div>

              {/* Actions */}
              <div className="text-[11px] font-semibold tracking-[0.15em] text-text-tertiary pl-1 mb-2">
                RECOMMENDED
              </div>
              <button className="w-full bg-bg-primary rounded-xl px-5 py-3.5 flex items-center justify-between mb-2 active:scale-[0.99] transition">
                <div className="text-left">
                  <div className="text-[15px] font-medium text-text-inverse">
                    Escalate to Acme Plumbing
                  </div>
                  <div className="text-[11px] text-accent-ai">
                    2hr avg resolution on similar cases
                  </div>
                </div>
                <span className="text-text-inverse text-[18px]">→</span>
              </button>
              <button className="w-full bg-bg-card border border-border-subtle rounded-xl px-5 py-3.5 text-[15px] font-medium text-text-secondary">
                Document & continue
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Replay control under phone */}
      <div className="flex items-center justify-center gap-3 mt-5">
        <button
          onClick={play}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-bg-primary text-text-inverse text-[13px] font-medium hover:bg-bg-deep transition"
        >
          <span className="text-accent-ai">▶</span>
          {phase === "idle" ? "Play the moment" : "Replay"}
        </button>
        <span className="text-[12px] text-text-tertiary">
          ~6s · interactive
        </span>
      </div>
    </div>
  );
}
