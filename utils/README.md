# utils/ — Shared Utility Modules

This folder contains utility modules that support development, testing, and quality assurance across the Raaghu Design System. These are not component code — they are infrastructure helpers.

## Module Overview

| Module | File | Status | Purpose |
|--------|------|--------|---------|
| `performance` | `performance/index.ts` | Exported & active | Runtime performance monitoring and bundle analysis |
| `accessibility` | `accessibility/index.ts` | Reference implementation | WCAG 2.1 AA helpers and validators |
| `i18n` | `i18n/index.ts` | Reference implementation | i18next integration with 8-locale support |
| `quality` | `quality/standards.ts` | Reference implementation | Component quality metrics and validators |
| `test` | `test/setup.ts` | Used by Jest config | Browser API mocks for the test environment |

---

## `performance/index.ts` — Active

Exported from the root `index.ts`. Provides:

- **`PerformanceMonitor`** — measures component render time and flags slowdowns
- **`BundleSizeAnalyzer`** — checks that component bundles stay under the 10KB budget
- **`MemoryLeakDetector`** — detects event listeners and timers not cleaned up on unmount
- **`PerformanceTimingUtils`** — utilities for `performance.mark()` / `performance.measure()`

Usage: see `docs/PERFORMANCE_MONITORING.md`

---

## `accessibility/index.ts` — Reference Implementation

Provides WCAG 2.1 AA utilities. Not yet imported by individual components — intended as shared helpers when accessibility checks are added to component tests.

Classes available:
- **`FocusManager`** — trap focus within modals/dialogs
- **`ScreenReaderUtils`** — generate live region announcements
- **`ColorContrastUtils`** — compute and validate color contrast ratios
- **`AccessibilityValidator`** — run ARIA role and attribute checks

> If you are writing a new component that needs focus trapping or contrast validation, import from here rather than writing it from scratch.

---

## `i18n/index.ts` — Reference Implementation

Full i18next setup with support for 8 locales: `en`, `es`, `fr`, `de`, `ar`, `zh`, `ja`, `ko`. Includes RTL detection for Arabic.

Classes available:
- **`I18nManager`** — initialize i18next, switch locale, detect RTL
- Translation helpers for component-level string keys

See `docs/LOCALIZATION_GUIDE.md` for how to use i18n in components.

---

## `quality/standards.ts` — Reference Implementation

Defines and validates component quality gates. Not wired into CI yet — available for integration.

- **`ComponentStandards`** — defines the required file structure (tsx, scss, test, stories, figma)
- **`ComponentValidator`** — checks a component folder against the standards
- **`QualityReporter`** — formats validation results for CI output

To run a manual quality check against the component library, you can import and call `ComponentValidator` in a script.

---

## `test/setup.ts` — Jest Test Environment

Loaded during Jest initialization via `jest.config.js`. Provides browser API mocks that jsdom does not include:

- `window.matchMedia` — mocked for responsive component tests
- `ResizeObserver` — mocked for layout-dependent components
- `IntersectionObserver` — mocked for virtualized/lazy components

Do not import this module directly in tests — Jest loads it automatically.

---

## Adding a New Utility

1. Create a folder: `utils/{utility-name}/index.ts`
2. Export only what is reusable across multiple components or test files
3. Add an entry to this README
4. If it should be part of the published package, re-export it from the root `index.ts`

## Related

- `docs/PERFORMANCE_MONITORING.md` — performance utility usage
- `docs/LOCALIZATION_GUIDE.md` — i18n integration guide
- `docs/TESTING_GUIDE.md` — test setup and frameworks
