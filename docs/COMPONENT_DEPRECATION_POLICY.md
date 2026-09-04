# Component Deprecation Policy

This document defines how components are marked as deprecated, how long the deprecation window lasts, and what consuming teams should do when a component is deprecated.

---

## Why We Have a Deprecation Policy

Removing or renaming a component is a breaking change for every team using `@waiin/raaghu-react`. A clear deprecation policy gives:

- **Consumers** time to migrate before a component is removed
- **Maintainers** a consistent process so deprecations don't get skipped or forgotten
- **Reviewers** a checklist to verify deprecations are handled correctly

---

## Deprecation Lifecycle

```
Active → Deprecated → Removed
          (min 1 minor release window, recommended 1 major)
```

| Stage | What Happens |
|-------|-------------|
| **Active** | Component is fully supported and receives bug fixes and enhancements |
| **Deprecated** | Component is flagged with `@deprecated` JSDoc, a console warning is added, and the replacement is documented |
| **Removed** | Component is deleted from the codebase in a major version bump |

---

## How to Deprecate a Component

### Step 1 — Add `@deprecated` JSDoc

In the component's `.tsx` file, add a `@deprecated` tag to the component and its props interface:

```tsx
/**
 * @deprecated Use `RdsNewButton` instead. This component will be removed in v2.0.0.
 * Migration guide: docs/migrations/rds-button-v2.md
 */
export interface RdsOldButtonProps { ... }

/**
 * @deprecated Use `RdsNewButton` instead. This component will be removed in v2.0.0.
 */
const RdsOldButton: React.FC<RdsOldButtonProps> = (props) => { ... }
```

### Step 2 — Add a Console Warning

Add a `console.warn` in the component body so consuming teams see the warning at runtime:

```tsx
const RdsOldButton: React.FC<RdsOldButtonProps> = (props) => {
  if (process.env.NODE_ENV !== 'production') {
    console.warn(
      '[raaghu-react] RdsOldButton is deprecated and will be removed in v2.0.0. ' +
      'Use RdsNewButton instead. See docs/migrations/rds-button-v2.md'
    );
  }
  // ... component body
};
```

### Step 3 — Update the Storybook Story

Add a deprecation notice to the component's `.stories.tsx`:

```tsx
const meta: Meta<typeof RdsOldButton> = {
  title: 'Elements/OldButton',
  component: RdsOldButton,
  parameters: {
    docs: {
      description: {
        component: '**DEPRECATED**: Use `RdsNewButton` instead. This component will be removed in v2.0.0.',
      },
    },
  },
};
```

### Step 4 — Add to the Deprecations Register Below

Fill in the table in the [Current Deprecations](#current-deprecations) section of this document.

### Step 5 — Write a Migration Guide

Create a file at `docs/migrations/{component}-v{version}.md` explaining:
- What changed and why
- How to update imports
- How to update props (with before/after code examples)
- Any behavioral differences

---

## How to Remove a Deprecated Component

Only remove a deprecated component in a **major version bump** (e.g., 1.x → 2.0.0).

Before removing:

1. Confirm the deprecation has been in place for at least one released minor version
2. Search for any remaining usages: `grep -r "RdsOldButton" --include="*.tsx" --include="*.ts"`
3. Delete the component folder
4. Remove the export from the relevant `index.ts`
5. Add a `### Removed` entry to the main `CHANGELOG.md`
6. Update this document — move the entry from Current Deprecations to the Removed section below

---

## Current Deprecations

> This table is updated whenever a component enters or exits deprecated status.

| Component | Deprecated In | Removal Target | Replacement | Migration Guide |
|-----------|--------------|----------------|-------------|-----------------|
| *(none currently)* | — | — | — | — |

---

## Removed Components

> Components that have been fully removed from the library.

| Component | Removed In | Replacement | Notes |
|-----------|-----------|-------------|-------|
| *(none yet)* | — | — | — |

---

## For Consumers

When you see a deprecation warning in your console:

1. Check this document or the component's Storybook page for the replacement
2. Follow the migration guide linked in the warning message
3. Update your code before the next major version

If no migration guide is available, open an issue in this repo.
