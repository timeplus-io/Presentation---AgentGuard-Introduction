# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server at http://localhost:3000
npm run build     # Production build
npm run lint      # Type-check (tsc --noEmit)
npm run preview   # Preview production build
npm run clean     # Remove dist/
```

## Architecture

This is a React/TypeScript slide presentation app built with Vite. It renders a 16:9 slideshow for introducing AgentGuard, a real-time security monitoring product for AI agent fleets.

**Slide flow:** `App.tsx` imports individual slide components from `src/slides/` and passes them as an array to `<Presentation>`. The order of the array determines slide order.

**Component structure:**
- `src/components/Presentation.tsx` — two exports:
  - `Presentation`: handles slide state, keyboard navigation (arrow keys / space), and animated transitions via `motion/react`
  - `SlideLayout`: reusable layout wrapper with optional title/subtitle header and a flex-1 content area
- `src/slides/*.tsx` — each file is one self-contained slide; slides are purely presentational React components

**Adding a new slide:** create a new file in `src/slides/`, then import and add it to the `slides` array in `App.tsx`.

## Presentation Design Principles

**Minimize text. Maximize visuals.** Slides should communicate through diagrams, metrics, data, and infographics — not paragraphs. Concrete rules:

- Prefer a metric callout (big number + label) over a sentence describing that metric.
- Prefer a flow diagram or pipeline visualization over a bulleted list of steps.
- Prefer a comparison chart or table over prose describing differences.
- If you find yourself writing more than one short sentence per concept, look for a visual alternative.
- Use icons, color coding, and spatial layout to convey relationships instead of words.

**Available visualization libraries:**
- `recharts` — already installed; use for bar, line, pie, radial charts.
- `@antvis/infographic` (https://github.com/antvis/infographic) — for rich infographic layouts (not yet installed; `npm install @antvis/infographic` before use).
- `lucide-react` — icons already installed.
- `motion/react` — animation already installed; use entrance animations to reveal data progressively.

## Styling

Tailwind CSS v4 (via `@tailwindcss/vite` plugin). No config file — use utility classes directly. The `@` alias resolves to the repo root.

## Environment

`GEMINI_API_KEY` can be set in a `.env` file at the repo root; Vite injects it as `process.env.GEMINI_API_KEY`.
