# utils/ — Shared Utility Modules

This folder contains utility modules shipped with the Raaghu Design System. These are not component code — they are infrastructure helpers.

## Module Overview

| Module | File | Status | Purpose |
|--------|------|--------|---------|
| `performance` | `performance/index.ts` | Exported & active | Runtime performance monitoring and bundle analysis |

---

## `performance/index.ts` — Active

Exported from the root `index.ts`. Provides:

- **`PerformanceMonitor`** — measures component render time and flags slowdowns
- **`BundleSizeAnalyzer`** — checks that component bundles stay under the 10KB budget
- **`MemoryLeakDetector`** — detects event listeners and timers not cleaned up on unmount
- **`PerformanceTimingUtils`** — utilities for `performance.mark()` / `performance.measure()`

Usage: see `docs/PERFORMANCE_MONITORING.md`

---

## Adding a New Utility

1. Create a folder: `utils/{utility-name}/index.ts`
2. Export only what is reusable across multiple components or test files
3. Add an entry to this README
4. If it should be part of the published package, re-export it from the root `index.ts`

## Related

- `docs/PERFORMANCE_MONITORING.md` — performance utility usage
- `docs/TESTING_GUIDE.md` — test setup and frameworks
