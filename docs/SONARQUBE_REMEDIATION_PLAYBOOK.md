# SonarQube Remediation Playbook

Reference guide for clearing SonarQube issues in **Raaghu React**. This documents what was done on the **React 18** branch (`react@^18.3.1`) so the same process can be repeated after upgrading to **React 19.2.5** (or any future baseline).

---

## Scope of the React 18 remediation

| Metric | Value |
|--------|-------|
| Source export | `waitech-raaghu-react_issues.xlsx` |
| Total open issues | **2,615** |
| Severity | 94 CRITICAL · 1,203 MAJOR · 1,318 MINOR |
| Types | 2,393 BUG · 193 VULNERABILITY · 29 SECURITY_HOTSPOT |

| File category | Count | Notes |
|---------------|-------|-------|
| Production `.ts` / `.tsx` | 1,242 | Components, elements, layouts, utils |
| `*.test.tsx` | 774 | Sonar scans these (exclusions only cover `.test.js/jsx`) |
| `*.stories.tsx` | 419 | Storybook hook patterns were a major source |
| `*.scss` | 175 | Duplicate selectors, shorthand/longhand conflicts |
| Setup / config | ~5 | `vitest.setup.ts`, test setup mocks |

**Important:** Fixes were applied in code on the current branch. Re-run the SonarQube workflow to confirm **0 open issues** in the server UI. Local verification used Jest (7,104 tests passing) and ESLint on tests/stories.

---

## Recommended execution order

Work in this sequence on a dedicated branch (production first, then tests/stories/scss):

```text
Phase 1  →  CRITICAL + vulnerabilities (production)
Phase 2  →  High-volume file clusters (adaptive-cards, grid, date-picker, …)
Phase 3  →  Mechanical rule sweeps (imports, parseInt, keys, a11y, …)
Phase 4  →  Test files (*.test.tsx)
Phase 5  →  Story files + SCSS
Verify   →  lint · test · build · SonarQube rescan
```

### Phase 1 — Production P0 (do first)

| Rule | What we did |
|------|-------------|
| **S3776** | Extract helpers/subcomponents; reduce cognitive complexity below 15 |
| **S2245** | Replace `Math.random()` with `crypto.getRandomValues` / `crypto.randomUUID` via [`utils/id.ts`](../utils/id.ts) |
| **S5852** | Remove ReDoS-prone regex; use string parsing or [`isValidEmail()`](../utils/id.ts) |
| **S2004** | Extract deeply nested callbacks into named functions (especially `rds-comp-grid`) |
| **S6440** | Move hooks out of inline Storybook `render` and non-component functions |
| **S1186** | Test setup mocks: use `vi.fn()` / `jest.fn()` or `() => undefined` instead of empty `{}` bodies |
| **S1082** | Clickable non-interactive elements: add `role="button"`, `tabIndex={0}`, `onKeyDown` (Enter/Space) |

**Files touched (examples):** `rds-comp-notification`, `rds-comp-kanban-board`, `rds-text-area`, `rds-comp-date-and-time-picker`, `chart-utils.ts`, `vitest.setup.ts`, `src/test/setup.ts`, `utils/test/setup.ts`.

### Phase 2 — Cluster refactors (biggest issue count reduction)

#### Adaptive cards (~266 × S6767)

**Problem:** One mega-interface `AdaptiveCardProps` on every card helper; Sonar flags unused typed props per component.

**Fix:** Split into narrow interfaces and keep `AdaptiveCardProps` as a union/extends type for the parent dispatcher only:

- `InputFormCardProps`
- `ImageGalleryCardProps`
- `FootballScorecardCardProps`
- `ActivityUpdateCardProps`
- `CalendarReminderFormProps` / `RestaurantOrderFormProps` (already existed)

**File:** [`raaghu-components/rds-comp-adaptive-cards/rds-comp-adaptive-cards-helpers.tsx`](../raaghu-components/rds-comp-adaptive-cards/rds-comp-adaptive-cards-helpers.tsx)

#### Grid (~77 issues)

Extracted into:

- [`rds-comp-grid-helpers.ts`](../raaghu-components/rds-comp-grid/rds-comp-grid-helpers.ts)
- [`rds-comp-grid-cells.tsx`](../raaghu-components/rds-comp-grid/rds-comp-grid-cells.tsx)
- [`rds-comp-grid-parts.tsx`](../raaghu-components/rds-comp-grid/rds-comp-grid-parts.tsx)

#### Other production modules

Refactored complexity into `*-helpers.ts(x)` for notification, dialog, input, avatar, date-picker, toolbar, charts, layouts, etc. (~27 helper modules).

### Phase 3 — Mechanical production sweeps

| Rule | Fix pattern |
|------|-------------|
| **S1128** | Remove unused imports (ESLint `--fix` helps) |
| **S1854** | Remove unused assignments or prefix with `_` |
| **S3358** | Replace nested ternaries with `if/else` or lookup maps |
| **S7773** | `Number.parseInt`, `Number.isNaN`, `Number.parseFloat` |
| **S7764** | `globalThis` instead of `window` (skip test setup files) |
| **S6582** | Optional chaining `?.` |
| **S6606** | Nullish coalescing `??` where appropriate |
| **S6479** | Stable React keys (`id`, `value`) — not array index |
| **S7735** | Prefer positive `if` over negated condition + `else` |
| **S6819** | Semantic HTML (`button`, `nav`) over redundant ARIA roles |
| **S6848 / S1082** | Keyboard handlers on interactive divs |
| **S7761** | `element.dataset.foo` instead of `getAttribute('data-foo')` |
| **S4325** | Remove redundant `as` casts / non-null assertions |
| **S1874** | Replace deprecated MUI/React APIs |

### Phase 4 — Test files

Top rules: S1128, S1854, S7761, S4666, S4325, S6440.

**Mock pitfall (React 18 learnings):** `RdsButton` uses `style="filled"` as a **design token string**, not a CSS object. Test mocks must destructure it so it is not spread onto `<button>`:

```tsx
// Correct mock pattern
function MockRdsButton({ style: _buttonStyle, text, onClick, children, ...props }: any) {
  return <button onClick={onClick} {...props}>{children ?? text}</button>;
}
```

**Other test fixes:**

- Restore `const { rerender } = render(...)` wherever `rerender()` is used
- `dataset` camelCase: `data-rds-container-padding` → `dataset.rdsContainerPadding`
- [`createUniqueId()`](../utils/id.ts) needs jsdom fallback when `crypto.randomUUID` is missing

### Phase 5 — Stories + SCSS

**Stories (S6440):** Never call hooks inside `render: (args) => { ... }`. Extract a **PascalCase** wrapper:

```tsx
function InputFormStory(args: InputFormProps) {
  const [value, setValue] = useState('');
  return <RdsInput {...args} value={value} onChange={setValue} />;
}

export const Interactive: Story = {
  render: InputFormStory,
};
```

**SCSS:** Merge duplicate selectors (S4666); resolve shorthand overriding longhand (S4657). Heavy files: `rds-comp-grid.scss`, `rds-comp-adaptive-cards.scss`.

---

## Reusable automation scripts

Run from repo root after exporting a fresh SonarQube issue list:

```bash
# Mechanical TS/TSX (parseInt, globalThis, dataset — production-oriented)
node scripts/sonar-mechanical-fixes.mjs

# Test files
node scripts/fix-test-sonar-issues.mjs

# SCSS duplicate selectors / shorthand conflicts
node scripts/fix-scss-sonar-issues.mjs

# ESLint auto-fix (review diff before commit)
npx eslint . --fix
```

Scripts live under [`scripts/`](../scripts/). Re-run them after merging React 19 changes if new issues appear in the same categories.

---

## Shared utilities added

[`utils/id.ts`](../utils/id.ts):

```ts
secureRandomId()   // crypto.getRandomValues — replaces Math.random() for IDs
createUniqueId(prefix)  // crypto.randomUUID with jsdom fallback
isValidEmail(value)  // no backtracking-prone email regex
```

Use these anywhere Sonar flags **S2245** or **S5852** for email/ID generation.

---

## Verification checklist

Before closing the React 19 SonarQube effort:

```bash
npm install                    # required: million, slate, react-quill, etc.
npm run lint
npm test
npm run storybook              # smoke-check Storybook loads
npm run build                  # library build
```

SonarQube (GitHub Actions → **SonarQube Analysis** → workflow_dispatch):

- Project key: `wai-technologies-raaghu-react`
- Workflow: [`.github/workflows/sonarqube-analysis.yml`](../.github/workflows/sonarqube-analysis.yml)
- Current exclusions: `**/*.test.js`, `**/*.test.jsx`, `**/*.spec.js`, `**/*.spec.jsx` only — **`*.test.tsx` is still scanned**

Optional: export issues again from SonarQube UI to Excel and compare counts to the baseline (2,615).

---

## React 19.2.5 migration — what to re-check

Most SonarQube fixes are **framework-agnostic**. After upgrading React, expect **new or repeated** issues in these areas:

| Area | React 19 notes |
|------|----------------|
| **S6440** (hooks) | Stricter hook rules; re-audit stories and test wrappers |
| **S6767** (typed props) | Re-run on components whose prop interfaces changed |
| **S1874** (deprecated APIs) | `defaultProps` on function components, legacy context, old ref patterns |
| **S3776** | New code from React 19 refactors may reintroduce complexity |
| **Test mocks** | `react-dom/test-utils` changes; update RTL / user-event usage |
| **Types** | `@types/react@19` may surface new TS issues Sonar reports as bugs |
| **MUI + React 19** | Confirm MUI version supports 19.2.5; deprecated APIs may return as S1874 |

### Suggested React 19 workflow

1. Create branch: `upgrade/react-19.2.5` (or similar).
2. Bump dependencies:

   ```json
   "react": "19.2.5",
   "react-dom": "19.2.5",
   "@types/react": "^19.x",
   "@types/react-dom": "^19.x"
   ```

3. Fix compile/test breakages from the upgrade first.
4. Run full SonarQube scan; export issues to Excel (same columns as before).
5. Apply this playbook **in phase order** — reuse scripts where rules match.
6. Pay extra attention to **Phase 1** and **Phase 4/5** (hooks in stories/tests often regress on major React bumps).
7. Re-run verification checklist and SonarQube until open issue count is **0**.

---

## Top rules reference (React 18 baseline)

| Rule | Count (approx.) | Priority |
|------|-----------------|----------|
| S6767 | 282 | Split prop interfaces per component |
| S1128 | 275 | Remove unused imports |
| S1854 | 221 | Remove unused assignments |
| S7761 | 180 | Use `.dataset` |
| S4325 | 178 | Remove redundant casts |
| S4666 | 114 | Merge duplicate SCSS selectors |
| S6440 | 111 | Hooks only in components / custom hooks |
| S3358 | 100 | Flatten nested ternaries |
| S3776 | 36 | Extract helpers (CRITICAL) |
| S2245 | 18 | Secure random / UUID |

---

## Related docs

- [Testing guide](./TESTING_GUIDE.md)
- [Architecture overview](./ARCHITECTURE_OVERVIEW.md)
- SonarQube CI: [`.github/workflows/sonarqube-analysis.yml`](../.github/workflows/sonarqube-analysis.yml)

---

*Last updated: June 2026 — React 18.3.1 baseline, targeting reuse for React 19.2.5.*
