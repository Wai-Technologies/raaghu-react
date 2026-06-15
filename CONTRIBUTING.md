# Contributing to Raaghu React Design System

When contributing, please first discuss the change you wish to make via issue or email with the repository owners.

---

## Quick start

```bash
npm install
npm run dev       # start Vite dev server
npm run storybook # start Storybook on port 6006
npm run test      # run Jest unit tests
```

---

## Adding a new component or element

Create component and element files manually following existing folder conventions.

**What gets generated:**

| File | Description |
|------|-------------|
| `rds-my-widget.tsx` | Component with typed Props interface and `displayName` |
| `rds-my-widget.scss` | SCSS using `var(--rds-*)` design tokens |
| `rds-my-widget.stories.tsx` | 4 story variants with `play:` functions |
| `rds-my-widget.test.tsx` | 6 test suites including `jest-axe` |
| `index.ts` | Export line added automatically |

---

## Naming conventions

| Thing | Rule | Example |
|-------|------|---------|
| Element prefix | `rds-` | `rds-badge` |
| Component prefix | `rds-comp-` | `rds-comp-kanban-board` |
| Props interface | `RdsXxxProps` or `RdsCompXxxProps` | `RdsBadgeProps` |
| `displayName` | Must match component name | `RdsBadge.displayName = 'RdsBadge'` |
| Story exports | PascalCase | `export const Default`, `export const Disabled` |
| SCSS classes | BEM with `rds-` prefix | `.rds-badge`, `.rds-badge--large` |

---

## Design token rules

**Always use CSS custom properties — never hardcode values.**

```scss
/* ✅ Correct */
color: var(--rds-text-primary);
padding: var(--rds-spacing-sm);
border-radius: var(--rds-radius-base);
transition: var(--rds-motion-transition-fast);

/* ❌ Wrong */
color: #333;
padding: 8px;
```

| Token prefix | Examples |
|--------|---------|
| `--rds-spacing-*` | `xxs` `xs` `sm` `md` `lg` `xl` `2xl` |
| `--rds-font-size-*` | `xs` `sm` `md` `lg` `xl` `2xl` |
| `--rds-font-weight-*` | `regular` `medium` `semibold` `bold` |
| `--rds-radius-*` | `sm` `base` `md` `lg` `xl` `full` |
| `--rds-motion-*` | `duration-fast` `transition-base` `easing-in-out` |
| `--rds-text-*` | `primary` `secondary` `disabled` |
| `--rds-primary-*` | `main` `light` `dark` |
| `--rds-border-*` | `default` `strong` `focus` |

---

## Writing stories

Every story file must:

- Import from `@storybook/react-vite` (not `@storybook/react`)
- Have `tags: ['autodocs', 'stable']` (or `'beta'` for new/experimental)
- Export a `Default` story with a `play:` function

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from '@storybook/test';

export const Default: Story = {
  args: { label: 'Example' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText('Example')).toBeInTheDocument();
  },
};
```

---

## Writing tests

Every test file must:

- Mock the SCSS import: `jest.mock('./rds-xxx.scss', () => ({}))`
- Include a `describe('Accessibility')` block with `jest-axe`

```tsx
import { axe } from 'jest-axe';

describe('Accessibility', () => {
  it('has no axe accessibility violations', async () => {
    const { container } = render(<RdsMyWidget {...defaultProps} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

---

## Accessibility requirements

- `aria-label` on every icon-only button
- `role="button"` + `tabIndex={0}` + `onKeyDown` on interactive `<div>` / `<span>`
- `aria-disabled` when disabled

---

## CI checks on every PR

| Check | Gates |
|-------|-------|
| Style governance | No bare hex in SCSS |
| Health check | Stories/tests/axe coverage |
| Bundle size | Elements ≤500kB, Components ≤500kB |
| Chromatic | Visual regression snapshots |
| Playwright | Story render + visual smoke |

---

## Branch strategy

| Branch | Purpose |
|--------|---------|
| `production` | Live releases |
| `development` | Integration — all PRs target here |
| `user/<name>/<task>` | Feature / fix branches |

PR title format: `type(scope): description`
Examples: `feat(button): add loading state`, `fix(modal): close on Escape key`

Please note we have a code of conduct, please follow it in all your interactions with the project.

## Pull Request Process

1. Ensure any install or build dependencies are removed before the end of the layer when doing a 
   build.
2. Update the README.md with details of changes to the interface, this includes new environment 
   variables, exposed ports, useful file locations and container parameters.
3. Increase the version numbers in any examples files and the README.md to the new version that this
   Pull Request would represent. The versioning scheme we use is [SemVer](http://semver.org/).
4. You may merge the Pull Request in once you have the sign-off of two other developers, or if you 
   do not have permission to do that, you may request the second reviewer to merge it for you.

## Code of Conduct

### Our Pledge

In the interest of fostering an open and welcoming environment, we as
contributors and maintainers pledge to making participation in our project and
our community a harassment-free experience for everyone, regardless of age, body
size, disability, ethnicity, gender identity and expression, level of experience,
nationality, personal appearance, race, religion, or sexual identity and
orientation.

### Our Standards

Examples of behavior that contributes to creating a positive environment
include:

* Using welcoming and inclusive language
* Being respectful of differing viewpoints and experiences
* Gracefully accepting constructive criticism
* Focusing on what is best for the community
* Showing empathy towards other community members

Examples of unacceptable behavior by participants include:

* The use of sexualized language or imagery and unwelcome sexual attention or
advances
* Trolling, insulting/derogatory comments, and personal or political attacks
* Public or private harassment
* Publishing others' private information, such as a physical or electronic
  address, without explicit permission
* Other conduct which could reasonably be considered inappropriate in a
  professional setting

### Our Responsibilities

Project maintainers are responsible for clarifying the standards of acceptable
behavior and are expected to take appropriate and fair corrective action in
response to any instances of unacceptable behavior.

Project maintainers have the right and responsibility to remove, edit, or
reject comments, commits, code, wiki edits, issues, and other contributions
that are not aligned to this Code of Conduct, or to ban temporarily or
permanently any contributor for other behaviors that they deem inappropriate,
threatening, offensive, or harmful.

### Scope

This Code of Conduct applies both within project spaces and in public spaces
when an individual is representing the project or its community. Examples of
representing a project or community include using an official project e-mail
address, posting via an official social media account, or acting as an appointed
representative at an online or offline event. Representation of a project may be
further defined and clarified by project maintainers.

### Enforcement

Instances of abusive, harassing, or otherwise unacceptable behavior may be
reported by contacting the project team at [INSERT EMAIL ADDRESS]. All
complaints will be reviewed and investigated and will result in a response that
is deemed necessary and appropriate to the circumstances. The project team is
obligated to maintain confidentiality with regard to the reporter of an incident.
Further details of specific enforcement policies may be posted separately.

Project maintainers who do not follow or enforce the Code of Conduct in good
faith may face temporary or permanent repercussions as determined by other
members of the project's leadership.

### Attribution

This Code of Conduct is adapted from the [homepage], version 1.0.0,
available at [version]
