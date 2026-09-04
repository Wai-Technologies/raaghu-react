# stories/ — Global Storybook Documentation

This folder contains the **project-level** Storybook documentation. It is distinct from the component-level `.stories.tsx` files colocated with each component.

## Structure

```
stories/
├── Introduction.mdx     # Storybook landing page — project overview, tech stack, quick links
└── assets/             # Shared images and media used in documentation pages
    ├── *.gif            # Animation demos
    ├── *.svg            # Brand and icon assets
    └── *.png            # Screenshots and diagrams
```

Theme switching in Storybook is handled by `.storybook/storybook-theme-sync.ts` (toolbar globals → `RaaghuThemeProvider`), not a file under `stories/`.

## Root `stories/` vs. Colocated `.stories.tsx`

| | Root `stories/` | Colocated `.stories.tsx` |
|---|---|---|
| **Location** | `stories/` at repo root | Next to each component (e.g., `raaghu-elements/rds-button/rds-button.stories.tsx`) |
| **Purpose** | Project-level docs: intro, guides, design philosophy | Component-level docs: props, variants, interaction tests |
| **Audience** | Anyone landing on the Storybook site | Developers building with or maintaining that component |
| **Contents** | MDX pages, shared assets | Story exports with `args`, `argTypes`, and `play()` functions |

## Storybook Story Discovery Order

Storybook loads stories in this order (configured in `.storybook/main.ts`):

1. `stories/Introduction.mdx` — renders as the home page
2. `stories/**/*.mdx` — any other global documentation pages
3. `raaghu-elements/**/*.stories.tsx` — all element stories
4. `raaghu-components/**/*.stories.tsx` — component stories (excluding paid/internal)
5. `raaghu-layouts/**/*.stories.tsx` — layout stories

## Adding Global Documentation

To add a new documentation page (not tied to a specific component):

1. Create a `.mdx` file in this folder, e.g., `stories/ColorPalette.mdx`
2. It will automatically appear in Storybook under the docs sidebar

For component documentation, create or update the colocated `.stories.tsx` file instead.

## Assets

Files in `stories/assets/` are shared across all `.mdx` documentation pages. Reference them with relative paths:

```mdx
import myImage from './assets/my-image.png';

<img src={myImage} alt="Description" />
```

Do not put component-specific assets here — keep those in the component's own folder.
