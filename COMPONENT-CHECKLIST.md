# Component checklist

Prop names now follow one rule. The browser and MUI still receive the HTML attribute `required={isRequired}`. Callers only pass `isRequired`.

| Meaning | Prop name |
| --- | --- |
| Field must be filled | `isRequired` |
| Control cannot be used | `disabled` |
| Visible label | `label` |
| Where the label sits | `labelPosition` |
| Visual state | `state` |

`isMandatory`, `required` (as a Raaghu prop), `isDisabled`, `labeltext`, and `labelposition` are not props.

Status values:

- **Fixed** — a prop name or a small React 19 issue in that package was changed.
- **Checked** — the package was included in the name scan. It did not use a second name for the same flag.

## Elements

| Package | Status | What changed |
| --- | --- | --- |
| rds-accordion | Checked | Public disabled flag is already `disabled`. |
| rds-alert | Checked | |
| rds-app-bar | Checked | |
| rds-autocomplete | Fixed | Required flag is `isRequired`. |
| rds-avatar | Checked | |
| rds-backdrop | Checked | |
| rds-badge | Checked | |
| rds-banner | Checked | |
| rds-bottom-navigation | Checked | |
| rds-box | Checked | |
| rds-breadcrumbs | Checked | |
| rds-button | Checked | |
| rds-button-dropdown | Fixed | Nested checkbox uses `label` and `disabled`. |
| rds-card | Checked | |
| rds-card-detail | Checked | |
| rds-carousel | Checked | |
| rds-checkbox | Fixed | `labeltext` is `label`. `isDisabled` is `disabled`. |
| rds-chip | Checked | |
| rds-collapse | Checked | |
| rds-container | Checked | |
| rds-counter | Fixed | Required flag is `isRequired`. |
| rds-dialog | Checked | |
| rds-divider | Checked | |
| rds-drawer | Checked | |
| rds-fab | Checked | |
| rds-file-uploader | Fixed | Required flag is `isRequired`. |
| rds-form-control | Fixed | Required flag is `isRequired`. It is applied after other props so a spread cannot wipe it. |
| rds-grid | Checked | |
| rds-header | Checked | |
| rds-icon-button | Checked | |
| rds-input | Fixed | Required flag is `isRequired`. |
| rds-layout | Checked | |
| rds-list | Fixed | Nested checkbox receives `disabled`. |
| rds-loader | Checked | |
| rds-menu | Checked | |
| rds-modal | Checked | |
| rds-multi-level-menu | Checked | |
| rds-pagination | Checked | |
| rds-paper | Checked | |
| rds-popover | Checked | |
| rds-progress | Checked | |
| rds-radio | Checked | |
| rds-range | Checked | |
| rds-rating | Checked | |
| rds-search | Checked | |
| rds-select | Fixed | Required flag is `isRequired`. Label placement is `labelPosition`. |
| rds-sidebar | Checked | |
| rds-skeleton | Checked | |
| rds-slider | Checked | |
| rds-snackbar | Checked | |
| rds-speed-dial | Checked | |
| rds-stack | Checked | |
| rds-stepper | Checked | |
| rds-switch | Checked | |
| rds-table | Checked | |
| rds-tabs | Checked | |
| rds-tag | Checked | |
| rds-text-area | Fixed | Required flag is `isRequired`. The field id comes from `useId()`. |
| rds-text-field | Fixed | Required flag is `isRequired`. |
| rds-timeline | Checked | |
| rds-toggle-button | Checked | |
| rds-tooltip | Checked | |
| rds-typography | Checked | |

## Components

| Package | Status | What changed |
| --- | --- | --- |
| rds-comp-adaptive-cards | Checked | |
| rds-comp-ai-attachment | Checked | |
| rds-comp-ai-chat-bot | Checked | |
| rds-comp-ai-chat-header | Checked | |
| rds-comp-ai-fab-menu | Checked | |
| rds-comp-ai-gradient-text-with-icon | Checked | |
| rds-comp-ai-icon | Checked | |
| rds-comp-ai-message-box | Checked | |
| rds-comp-ai-typing-section | Fixed | Nested field uses `isRequired`. |
| rds-comp-audio-player | Checked | |
| rds-comp-chart-area | Checked | |
| rds-comp-chart-bar | Checked | |
| rds-comp-chart-boolean | Checked | |
| rds-comp-chart-bubble | Checked | |
| rds-comp-chart-doughnut | Checked | |
| rds-comp-chart-gauge | Checked | |
| rds-comp-chart-line | Checked | |
| rds-comp-chart-mixed | Checked | |
| rds-comp-chart-pie | Checked | |
| rds-comp-chart-polar-area | Checked | |
| rds-comp-chart-radar | Checked | |
| rds-comp-chart-scatter | Checked | |
| rds-comp-chart-stacked | Checked | |
| rds-comp-chat | Checked | |
| rds-comp-code-snippet | Checked | |
| rds-comp-color-picker | Fixed | Disabled flag is `disabled`. |
| rds-comp-comments-box | Checked | |
| rds-comp-contribution | Checked | |
| rds-comp-date-and-time-picker | Fixed | Required flag is `isRequired`. |
| rds-comp-datepicker | Fixed | Required flag is `isRequired`. Disabled flag is `disabled`. |
| rds-comp-details-pane | Checked | |
| rds-comp-e-signature | Checked | |
| rds-comp-emoji-generator | Checked | |
| rds-comp-empty-state | Checked | |
| rds-comp-filter-button | Fixed | Nested checkbox uses `label`. |
| rds-comp-grid | Checked | |
| rds-comp-kanban-board | Checked | |
| rds-comp-map | Checked | |
| rds-comp-navtabs | Checked | |
| rds-comp-notification | Checked | |
| rds-comp-off-canvas | Checked | |
| rds-comp-product-tour | Fixed | File upload uses `isRequired`. |
| rds-comp-reviews | Checked | |
| rds-comp-scrollbar | Checked | |
| rds-comp-spinner | Checked | |
| rds-comp-text-editor | Fixed | Required flag is `isRequired`. Visual state prop is `state`. |
| rds-comp-time-picker | Checked | |
| rds-comp-toast | Checked | |
| rds-comp-toolbar | Checked | `isDisabled` here is an internal render flag, not a public prop. |
| rds-comp-tree-structure | Checked | |
| rds-comp-truncate-text | Checked | |
| rds-comp-video-player | Checked | |

## Layouts

| Package | Status | What changed |
| --- | --- | --- |
| rds-comp-app-shell | Checked | No required or disabled alias. Top bar clone no longer uses an untyped `any` child. |
| rds-comp-layout | Checked | No required or disabled alias. |

## React 19

501 TypeScript files in `raaghu-elements`, `raaghu-components`, and `raaghu-layouts` were scanned against the React 19 removals in the constitution (`React 19.1.0`; this repo runs `19.2.5`).

None of these removed APIs are used: function `defaultProps`, `propTypes`, string refs, legacy context, `componentWillMount` / `componentWillReceiveProps` / `componentWillUpdate`, `findDOMNode`, `ReactDOM.render`, `ReactDOM.hydrate`, `unmountComponentAtNode`, `createFactory`, `React.FC`, or `Context.Provider`. JSX is the automatic runtime (`react-jsx`). Field ids that were random now use `useId()`.

`forwardRef` remains on the date-picker inputs, the MUI date-range layout, the grid imperative handle, and the AI icon wrappers. Those slots still receive a ref from react-datepicker or MUI, and `forwardRef` is valid in React 19. Test mocks that stand in for MUI components keep it for the same reason.

The toolbar dropdown now imports `createPortal` from `react-dom` directly.

## Build

`npm run build` produced the library bundle. The first type emit reported one error in `createRaaghuMuiTheme.ts`: a palette role was assigned without a required `main` color. That assignment now happens only when `main` is a concrete color.

`npm run build:types -- --strict` then completed with no type errors.
