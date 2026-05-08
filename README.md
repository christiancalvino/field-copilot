# Field Copilot

An AI-led mobile concept for HappyCo maintenance technicians. A concept artifact submitted to **design@happy.co** for the Staff Product Designer role.

**Figma:** https://www.figma.com/design/MG6QCVUnwNy4NLIahdk2p0
**Author:** Christian Calviño

## What's in here

A Next.js microsite that wraps:

1. **The narrative** — why HappyCo's next AI primitive should be the technician, not another dashboard
2. **A functional demo** — the Frame 2 → Frame 3 transition built as real code (state machine, real animations), not a Figma prototype
3. **The full flow** — 5 screens exported from Figma covering a maintenance technician's day end-to-end
4. **Transparent process notes** — how AI was used, with honest time accounting

Built in ~12h with Claude as the execution partner. Every concept, copy choice, and structural decision was mine. AI handled the typing.

## Stack

- Next.js 16 (App Router) + React 19
- Tailwind CSS v4
- Motion (Framer Motion v12) for the demo animations
- TypeScript

## Run locally

```bash
npm install
npm run dev
```

Opens at http://localhost:3000.

## Brand tokens

Mirrored from the Figma design system (HappyCo-aligned navy + cyan-for-AI). See [`app/globals.css`](app/globals.css) for the full palette + type scale.
