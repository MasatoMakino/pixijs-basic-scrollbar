# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
# Install dependencies
npm ci

# Build everything (TypeScript + demo pages + API docs)
npm run build

# Build TypeScript only (outputs to esm/)
npm run buildTS

# Type check without emitting
npx tsc --noEmit

# Start dev server (browser-sync + tsc watch + demo watch)
npm run start:dev

# Run tests (Vitest in browser mode with headless Chrome)
npm test

# Run a single test file
npx vitest --run __test__/SliderView.spec.ts

# Coverage report
npm run coverage
```

## Architecture

This is a PixiJS v8 scrollbar/slider UI component library published as ES Modules to npm.

### Class Hierarchy

```text
Container (pixi.js)
└── SliderView          - Base slider with drag/tap interaction, rate (0.0-1.0) positioning
    └── ScrollBarView   - Adds content-aware scrollbar with inertial scroll and mouse wheel
        (uses ScrollBarContents, InertialScrollManager, MouseWheelScrollManager)

StepBarView             - Discrete step indicator (separate from slider hierarchy)
```

### Key Design Patterns

- **Graphics injection**: All visual elements (base, bar, button, mask) are passed in via `SliderViewOption` rather than created internally. `hitArea` must be set on containers to define bounds.
- **Event-driven**: Classes extend PixiJS `Container` and use `EventEmitter` for value change notifications (`SliderEventTypes`, `ScrollBarEventTypes`).
- **Explicit disposal**: Call `dispose()` to clean up Ticker references and event listeners.
- **Canvas reference required**: PixiJS v8 needs the canvas element for pointer events outside drawn areas — passed via `SliderViewOption.canvas`.

### Source Layout

- `src/` — Library source (SliderView at root, ScrollBar and StepBar in subdirectories)
- `__test__/` — Vitest browser tests with generator helpers for test fixtures
- `demoSrc/` — Demo page JavaScript sources (built with `@masatomakino/gulptask-demo-page`)
- `esm/` — Build output (ES Modules + declarations)
- `docs/demo/` — Built demo pages, `docs/api/` — TypeDoc output

## Testing

Tests run in **real browser** (headless Chrome via WebDriverIO), not jsdom. Test helpers in `__test__/` provide fixture generators (`SliderGenerator`, `ScrollBarViewGenerator`, etc.) and a mock pointer event (`DummyPointerEvent`).

## Release Process

Releases are automated via `@masatomakino/release-helper`. Manual version tagging, release PR creation, and `npm publish` are prohibited.

## CI

GitHub Actions runs `tsc --noEmit` + `npm test` on Node.js 18/20/22. Merges to `main` auto-deploy docs to GitHub Pages.
