# plop-templates/ — Component Code Generation Templates

This folder contains [Plop.js](https://plopjs.com/) Handlebars templates for scaffolding new Raaghu components. Using these templates ensures every new component follows the exact same file structure, naming conventions, and accessibility patterns required by the design system constitution.

## Folder Structure

```
plop-templates/
├── element/          # Templates for raaghu-elements (rds-* prefix)
│   ├── component.tsx.hbs
│   ├── component.scss.hbs
│   ├── component.test.tsx.hbs
│   └── component.stories.tsx.hbs
└── component/        # Templates for raaghu-components (rds-comp-* prefix)
    ├── component.tsx.hbs
    ├── component.scss.hbs
    ├── component.test.tsx.hbs
    └── component.stories.tsx.hbs
```

## When to Use Which Template

| Template | Use For | Naming Convention | Output Location |
|----------|---------|-------------------|-----------------|
| `element/` | Atomic UI primitives (button, input, badge, icon) | `rds-{name}` | `raaghu-elements/rds-{name}/` |
| `component/` | Composite UI patterns (kanban, chat, data table) | `rds-comp-{name}` | `raaghu-components/rds-comp-{name}/` |

**Rule of thumb**: if it wraps or combines multiple elements, it's a component. If it's a standalone building block, it's an element.

## How to Generate a New Component

### Prerequisites

Install Plop globally or use npx:

```bash
npm install -g plop
# or use npx (no install required)
```

### Run the Generator

```bash
# From the repo root
npx plop element my-widget
# → creates raaghu-elements/rds-my-widget/ with all 4 files

npx plop component data-table
# → creates raaghu-components/rds-comp-data-table/ with all 4 files
```

### Template Variables

| Variable | Syntax | Example Input | Example Output |
|----------|--------|---------------|----------------|
| Component name (kebab) | `{{kebabCase name}}` | `my widget` | `my-widget` |
| Component name (pascal) | `{{pascalCase name}}` | `my widget` | `MyWidget` |

The generator uses these to fill in:
- File names: `rds-my-widget.tsx`, `rds-my-widget.scss`, etc.
- Class names in SCSS: `.rds-my-widget`, `.rds-my-widget--disabled`
- TypeScript interface: `RdsMyWidgetProps`
- React component: `RdsMyWidget`

## What Each Template Generates

### `.tsx` — Component Implementation
- TypeScript props interface with JSDoc
- BEM CSS class composition
- ARIA attributes (`role`, `aria-disabled`, `tabIndex`)
- Keyboard handler for Enter/Space
- `displayName` for React DevTools

### `.scss` — Component Styles
- BEM structure (`.rds-{name}`, `&__label`, `&--disabled`, `&--{size}`)
- CSS custom property usage (`var(--rds-*)`) — no hardcoded colors
- Responsive size variants (small / medium / large)

### `.test.tsx` — Unit Tests
- Render test
- Props test (label, disabled)
- Click event test
- Accessibility test with jest-axe

### `.stories.tsx` — Storybook Stories
- Storybook 9 format (`Meta`, `StoryObj`)
- `argTypes` for Storybook controls
- Default story with `play()` interaction test
- Additional variants: Loading, Disabled, WithChildren

## After Generating

1. Review the generated files and customize for your component's actual API
2. Register the export in the relevant `index.ts`:
   - Elements: `raaghu-elements/index.ts`
   - Components: `raaghu-components/index.ts`
3. Add a `.figma.tsx` file for Figma Code Connect (see existing components for reference)
4. Run tests: `npm test -- rds-{name}`

## Related

- `.specify/README.md` — AI-assisted workflow for speccing and planning new components
- `docs/ARCHITECTURE_OVERVIEW.md` — how elements, components, and layouts relate
