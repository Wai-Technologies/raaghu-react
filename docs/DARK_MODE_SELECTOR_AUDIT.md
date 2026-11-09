# Dark-mode selector audit

`[data-theme='dark']` overrides in SCSS were moved to mode-aware tokens (`componentModeTokens` light/dark pairs) only where the rendered result is provably identical. Out of scope: the internal grid, tree structure and date-and-time picker, and chat, comments box, adaptive cards, code snippet, details pane and navtabs, which were internal when this audit ran and are exported now.

A declaration `[dark] X { p: B }` is migrated only when all four rules hold:

1. The same file has a light rule with the identical selector and media context declaring `p: A`. Light values that come from MUI or a third-party default do not count.
2. The dark selector uses only the provider hook (`[data-theme='dark']`, `:where(...)`, `html[...]`). Rules that also list `.theme-dark`, `body.dark`, `.rds-theme--dark`, `[data-bs-theme]` or `.sb-show-main` support apps that toggle dark mode without the provider and stay.
3. In the compiled `dist/raaghu-react.css` no other rule R setting `p` (or a shorthand/longhand of it) can match the same element and flip: spec(X) < spec(R) < spec(D), or spec(R) = spec(X) with R after X. "Same element" means the last compounds share a class (BEM modifiers of the same block count), an element, or either is universal or a bare MUI state class. Pseudo-element rules are excluded.
4. A and B are each a single `var(--rds-*)` or a keyword, and A differs from B.

Rule 3 only sees rules shipped in `raaghu-react.css`; MUI/emotion rules injected at runtime and `sx` styles are not visible to the analysis. The migrated elements are plain DOM nodes or carry their own light rule, so the dark result equals the light cascade that already ships.

## Result

| | Count |
|---|---|
| Migrated declarations | 5 |
| Kept rule blocks, blocked by rule 1 | 80 |
| Kept rule blocks, blocked by rule 2 | 148 |
| Kept rule blocks, blocked by rule 3 | 6 |
| Kept rule blocks, blocked by rule 4 | 5 |

A kept block is counted once under the first rule that stops it (checked in the order 2, 1, 3, 4); the table lists every rule that applies to its declarations.

| Rule | Meaning |
|---|---|
| 1 | no light rule of ours with the identical selector and property (MUI/third-party default, or light values differ) |
| 2 | rule also lists non-provider dark hooks (.theme-dark, body.dark, .sb-show-main, [data-bs-theme]) or is a :not/:is wrapper |
| 3 | cascade conflict or could not be located in dist |
| 4 | value is not a single var()/keyword, or light equals dark |

## Migrated

| Location (removed dark rule) | Selector | Result | Blocked by |
|---|---|---|---|
| raaghu-elements/rds-menu/rds-menu.scss:223 | `[data-theme=dark] .rds-menu__header` | migrated (`color` -> `--rds-menu-header-color`) | - |
| raaghu-elements/rds-menu/rds-menu.scss:229 | `[data-theme=dark] .rds-menu__divider` | migrated (`background` -> `--rds-menu-divider-background`) | - |
| raaghu-elements/rds-menu/rds-menu.scss:276 | `[data-theme=dark] .rds-menu__item__shortcut` | migrated (`color` -> `--rds-menu-shortcut-color`) | - |
| raaghu-components/rds-comp-datepicker/rds-comp-datepicker.scss:1272 | `[data-theme=dark] .rds-datepicker__header-select` | migrated (`background-color` -> `--rds-datepicker-header-select-background`) | - |
| raaghu-components/rds-comp-e-signature/rds-comp-e-signature.scss:828 | `[data-theme=dark] .rds-e-signature__file-text` | migrated (`background` -> `--rds-e-signature-file-text-background`) | - |

## Kept

Line numbers are the current source lines of the dark rule or its nested selector.

| Location | Selector | Result | Blocked by |
|---|---|---|---|
| raaghu-components/rds-comp-audio-player/rds-comp-audio-player.scss:964 | `[data-theme=dark] .rds-comp-audio-player__edition-btn--active:hover` | kept | 1 |
| raaghu-components/rds-comp-audio-player/rds-comp-audio-player.scss:971 | `[data-theme=dark] .rds-comp-audio-player__edition-zoom button` | kept | 1 |
| raaghu-components/rds-comp-color-picker/rds-comp-color-picker.scss:726 | `[data-theme=dark] .rds-comp-color-picker span` | kept | 1 |
| raaghu-components/rds-comp-color-picker/rds-comp-color-picker.scss:732 | `[data-theme=dark] .rds-comp-color-picker .rds-comp-color-picker__tabs` | kept | 1 |
| raaghu-components/rds-comp-color-picker/rds-comp-color-picker.scss:736 | `[data-theme=dark] .rds-comp-color-picker .rds-comp-color-picker__tab` | kept | 1 |
| raaghu-components/rds-comp-color-picker/rds-comp-color-picker.scss:740 | `[data-theme=dark] .rds-comp-color-picker .rds-comp-color-picker__ta...` | kept | 1 |
| raaghu-components/rds-comp-datepicker/rds-comp-datepicker.scss:1254 | `[data-theme=dark] .react-datepicker` | kept | 1 |
| raaghu-components/rds-comp-datepicker/rds-comp-datepicker.scss:1261 | `[data-theme=dark] .react-datepicker__month` | kept | 1 |
| raaghu-components/rds-comp-datepicker/rds-comp-datepicker.scss:1265 | `[data-theme=dark] .react-datepicker__current-month` | kept | 1 |
| raaghu-components/rds-comp-datepicker/rds-comp-datepicker.scss:1272 | `[data-theme=dark] .rds-datepicker__header-select` | kept | 1, 3, 4 |
| raaghu-components/rds-comp-datepicker/rds-comp-datepicker.scss:1284 | `[data-theme=dark] .rds-datepicker__header-select:hover` | kept | 1 |
| raaghu-components/rds-comp-datepicker/rds-comp-datepicker.scss:1293 | `[data-theme=dark] .rds-datepicker__header-select:focus-visible` | kept | 4 |
| raaghu-components/rds-comp-datepicker/rds-comp-datepicker.scss:1299 | `[data-theme=dark] .rds-datepicker__custom-header-group .rds-datepic...` | kept | 4 |
| raaghu-components/rds-comp-datepicker/rds-comp-datepicker.scss:1303 | `[data-theme=dark] .react-datepicker__day-name` | kept | 1 |
| raaghu-components/rds-comp-datepicker/rds-comp-datepicker.scss:1307 | `[data-theme=dark] .react-datepicker__day` | kept | 1 |
| raaghu-components/rds-comp-datepicker/rds-comp-datepicker.scss:1311 | `[data-theme=dark] .react-datepicker__day--in-range` | kept | 1 |
| raaghu-components/rds-comp-datepicker/rds-comp-datepicker.scss:1315 | `[data-theme=dark] .react-datepicker__day:hover` | kept | 1 |
| raaghu-components/rds-comp-datepicker/rds-comp-datepicker.scss:1321 | `[data-theme=dark] .react-datepicker__day--selected` | kept | 1 |
| raaghu-components/rds-comp-datepicker/rds-comp-datepicker.scss:1328 | `[data-theme=dark] .react-datepicker__day--range-start` | kept | 1 |
| raaghu-components/rds-comp-datepicker/rds-comp-datepicker.scss:1333 | `[data-theme=dark] .react-datepicker__day--today` | kept | 1 |
| raaghu-components/rds-comp-datepicker/rds-comp-datepicker.scss:1337 | `[data-theme=dark] .react-datepicker__day--selected.react-datepicker...` | kept | 1 |
| raaghu-components/rds-comp-datepicker/rds-comp-datepicker.scss:1343 | `[data-theme=dark] .react-datepicker__day--outside-month` | kept | 1 |
| raaghu-components/rds-comp-datepicker/rds-comp-datepicker.scss:1347 | `[data-theme=dark] .react-datepicker__today-button` | kept | 1 |
| raaghu-components/rds-comp-datepicker/rds-comp-datepicker.scss:1353 | `[data-theme=dark] .rds-datepicker__button-wrapper .rds-button.MuiBu...` | kept | 1 |
| raaghu-components/rds-comp-datepicker/rds-comp-datepicker.scss:1360 | `[data-theme=dark] .react-datepicker__month-dropdown` | kept | 1 |
| raaghu-components/rds-comp-datepicker/rds-comp-datepicker.scss:1366 | `[data-theme=dark] .react-datepicker__month-option` | kept | 1 |
| raaghu-components/rds-comp-datepicker/rds-comp-datepicker.scss:1371 | `[data-theme=dark] .react-datepicker__month-option:hover` | kept | 1 |
| raaghu-components/rds-comp-datepicker/rds-comp-datepicker.scss:1376 | `[data-theme=dark] .react-datepicker__month-option--selected_month` | kept | 1 |
| raaghu-components/rds-comp-datepicker/rds-comp-datepicker.scss:1383 | `[data-theme=dark] .react-datepicker__month-read-view` | kept | 1 |
| raaghu-components/rds-comp-datepicker/rds-comp-datepicker.scss:1389 | `[data-theme=dark] .react-datepicker__month-read-view:hover` | kept | 1 |
| raaghu-components/rds-comp-datepicker/rds-comp-datepicker.scss:1398 | `[data-theme=dark] .react-datepicker__month-read-view:focus-visible` | kept | 1 |
| raaghu-components/rds-comp-datepicker/rds-comp-datepicker.scss:1404 | `[data-theme=dark] .react-datepicker__month-select` | kept | 1 |
| raaghu-components/rds-comp-datepicker/rds-comp-datepicker.scss:1411 | `[data-theme=dark] .react-datepicker__month-select:hover` | kept | 1 |
| raaghu-components/rds-comp-datepicker/rds-comp-datepicker.scss:1420 | `[data-theme=dark] .react-datepicker__month-select:focus-visible` | kept | 1 |
| raaghu-components/rds-comp-datepicker/rds-comp-datepicker.scss:1426 | `[data-theme=dark] .react-datepicker__month-read-view--down-arrow` | kept | 1 |
| raaghu-components/rds-comp-datepicker/rds-comp-datepicker.scss:1432 | `[data-theme=dark] .react-datepicker__navigation-icon::before` | kept | 1 |
| raaghu-components/rds-comp-datepicker/rds-comp-datepicker.scss:1437 | `[data-theme=dark] .react-datepicker__year-text` | kept | 1 |
| raaghu-components/rds-comp-datepicker/rds-comp-datepicker.scss:1442 | `[data-theme=dark] .react-datepicker__year-text:hover` | kept | 1 |
| raaghu-components/rds-comp-datepicker/rds-comp-datepicker.scss:1448 | `[data-theme=dark] .react-datepicker__month-text--selected` | kept | 1 |
| raaghu-components/rds-comp-datepicker/rds-comp-datepicker.scss:1456 | `[data-theme=dark] .react-datepicker__year--container .react-datepic...` | kept | 1 |
| raaghu-components/rds-comp-e-signature/rds-comp-e-signature.scss:804 | `[data-theme=dark] .rds-e-signature__upload-panel` | kept | 1 |
| raaghu-components/rds-comp-e-signature/rds-comp-e-signature.scss:816 | `[data-theme=dark] .rds-e-signature__upload-panel--hover` | kept | 3 |
| raaghu-components/rds-comp-e-signature/rds-comp-e-signature.scss:820 | `[data-theme=dark] .rds-e-signature__file-text--placeholder` | kept | 1 |
| raaghu-components/rds-comp-e-signature/rds-comp-e-signature.scss:828 | `[data-theme=dark] .rds-e-signature__file-text` | kept | 1, 3 |
| raaghu-components/rds-comp-e-signature/rds-comp-e-signature.scss:833 | `[data-theme=dark] .rds-e-signature__upload-label` | kept | 3 |
| raaghu-components/rds-comp-empty-state/rds-comp-empty-state.scss:16 | `[data-theme=dark] .rds-comp-empty-state` | kept | 1 |
| raaghu-components/rds-comp-kanban-board/rds-comp-kanban-board.scss:760 | `body[data-bs-theme=dark] .kanban-board__card` | kept | 2 |
| raaghu-components/rds-comp-kanban-board/rds-comp-kanban-board.scss:765 | `body[data-bs-theme=dark] .kanban-board__card-header` | kept | 2 |
| raaghu-components/rds-comp-kanban-board/rds-comp-kanban-board.scss:771 | `body[data-bs-theme=dark] .kanban-board__header-button` | kept | 2 |
| raaghu-components/rds-comp-kanban-board/rds-comp-kanban-board.scss:778 | `body[data-bs-theme=dark] .rds-kanban-board__sub-card-card` | kept | 2 |
| raaghu-components/rds-comp-kanban-board/rds-comp-kanban-board.scss:784 | `body[data-bs-theme=dark] .rds-kanban-board__sub-card-header-left .M...` | kept | 2 |
| raaghu-components/rds-comp-kanban-board/rds-comp-kanban-board.scss:792 | `body[data-bs-theme=dark] .rds-kanban-board__add-button` | kept | 2 |
| raaghu-components/rds-comp-map/rds-comp-map.scss:107 | `.rds-comp-map .rds-theme--dark .rds-comp-map .worldmap__figure-cont...` | kept | 2 |
| raaghu-components/rds-comp-map/rds-comp-map.scss:239 | `body[data-theme=dark] .rds-comp-map` | kept | 2 |
| raaghu-components/rds-comp-map/rds-comp-map.scss:242 | `body[data-theme=dark] .rds-comp-map figure` | kept | 2 |
| raaghu-components/rds-comp-map/rds-comp-map.scss:251 | `body[data-theme=dark] .rds-comp-map svg` | kept | 2 |
| raaghu-components/rds-comp-map/rds-comp-map.scss:255 | `body[data-theme=dark] .rds-comp-map .rds-comp-map__worldmap-host` | kept | 2 |
| raaghu-components/rds-comp-map/rds-comp-map.scss:260 | `body[data-theme=dark] .rds-comp-map .svg-map__background` | kept | 2 |
| raaghu-components/rds-comp-map/rds-comp-map.scss:268 | `body[data-theme=dark] .rds-comp-map__label` | kept | 2 |
| raaghu-components/rds-comp-notification/rds-comp-notification.scss:361 | `:is(body:not(.theme-dark):not([data-theme=dark]), :root:not([data-t...` | kept | 2 |
| raaghu-components/rds-comp-notification/rds-comp-notification.scss:370 | `:is(body:not(.theme-dark):not([data-theme=dark]), :root:not([data-t...` | kept | 2 |
| raaghu-components/rds-comp-notification/rds-comp-notification.scss:377 | `:is(body:not(.theme-dark):not([data-theme=dark]), :root:not([data-t...` | kept | 2 |
| raaghu-components/rds-comp-notification/rds-comp-notification.scss:381 | `:is(body:not(.theme-dark):not([data-theme=dark]), :root:not([data-t...` | kept | 2 |
| raaghu-components/rds-comp-notification/rds-comp-notification.scss:385 | `:is(body:not(.theme-dark):not([data-theme=dark]), :root:not([data-t...` | kept | 2 |
| raaghu-components/rds-comp-notification/rds-comp-notification.scss:394 | `:is(body.theme-dark, [data-theme=dark]) .rds-comp-notification.MuiC...` | kept | 2 |
| raaghu-components/rds-comp-notification/rds-comp-notification.scss:399 | `:is(body.theme-dark, [data-theme=dark]) .rds-comp-notification--typ...` | kept | 2 |
| raaghu-components/rds-comp-notification/rds-comp-notification.scss:407 | `:is(body.theme-dark, [data-theme=dark]) .rds-comp-notification--lay...` | kept | 2 |
| raaghu-components/rds-comp-notification/rds-comp-notification.scss:411 | `:is(body.theme-dark, [data-theme=dark]) .rds-comp-notification--lay...` | kept | 2 |
| raaghu-components/rds-comp-notification/rds-comp-notification.scss:416 | `:is(body.theme-dark, [data-theme=dark]) .rds-comp-notification .rds...` | kept | 2 |
| raaghu-components/rds-comp-notification/rds-comp-notification.scss:421 | `:is(body.theme-dark, [data-theme=dark]) .rds-comp-notification .rds...` | kept | 2 |
| raaghu-components/rds-comp-reviews/rds-comp-reviews.scss:34 | `:is([data-theme=dark], body.dark, .theme-dark) .rds-comp-reviews .r...` | kept | 2 |
| raaghu-components/rds-comp-reviews/rds-comp-reviews.scss:38 | `:is([data-theme=dark], body.dark, .theme-dark) .rds-comp-reviews .r...` | kept | 2 |
| raaghu-components/rds-comp-reviews/rds-comp-reviews.scss:42 | `:is([data-theme=dark], body.dark, .theme-dark) .rds-comp-reviews .r...` | kept | 2 |
| raaghu-components/rds-comp-reviews/rds-comp-reviews.scss:46 | `:is([data-theme=dark], body.dark, .theme-dark) .rds-comp-reviews .M...` | kept | 2 |
| raaghu-components/rds-comp-reviews/rds-comp-reviews.scss:49 | `:is([data-theme=dark], body.dark, .theme-dark) .rds-comp-reviews .M...` | kept | 2 |
| raaghu-components/rds-comp-reviews/rds-comp-reviews.scss:54 | `:is([data-theme=dark], body.dark, .theme-dark) .rds-comp-reviews .M...` | kept | 2 |
| raaghu-components/rds-comp-reviews/rds-comp-reviews.scss:57 | `:is([data-theme=dark], body.dark, .theme-dark) .rds-comp-reviews .M...` | kept | 2 |
| raaghu-components/rds-comp-reviews/rds-comp-reviews.scss:63 | `:is([data-theme=dark], body.dark, .theme-dark) .rds-comp-reviews .M...` | kept | 2 |
| raaghu-components/rds-comp-reviews/rds-comp-reviews.scss:68 | `:is([data-theme=dark], body.dark, .theme-dark) .rds-comp-reviews .r...` | kept | 2 |
| raaghu-components/rds-comp-reviews/rds-comp-reviews.scss:72 | `:is([data-theme=dark], body.dark, .theme-dark) .rds-comp-reviews .r...` | kept | 2 |
| raaghu-components/rds-comp-reviews/rds-comp-reviews.scss:80 | `:is([data-theme=dark], body.dark, .theme-dark) .rds-comp-reviews .r...` | kept | 2 |
| raaghu-components/rds-comp-reviews/rds-comp-reviews.scss:84 | `:is([data-theme=dark], body.dark, .theme-dark) .rds-comp-reviews .r...` | kept | 2 |
| raaghu-components/rds-comp-reviews/rds-comp-reviews.scss:92 | `:is([data-theme=dark], body.dark, .theme-dark) .rds-comp-reviews .r...` | kept | 2 |
| raaghu-components/rds-comp-reviews/rds-comp-reviews.scss:96 | `:is([data-theme=dark], body.dark, .theme-dark) .rds-comp-reviews .r...` | kept | 2 |
| raaghu-components/rds-comp-reviews/rds-comp-reviews.scss:104 | `:is([data-theme=dark], body.dark, .theme-dark) .rds-comp-reviews .r...` | kept | 2 |
| raaghu-components/rds-comp-reviews/rds-comp-reviews.scss:108 | `:is([data-theme=dark], body.dark, .theme-dark) .rds-comp-reviews .r...` | kept | 2 |
| raaghu-components/rds-comp-reviews/rds-comp-reviews.scss:116 | `:is([data-theme=dark], body.dark, .theme-dark) .rds-comp-reviews .r...` | kept | 2 |
| raaghu-components/rds-comp-reviews/rds-comp-reviews.scss:120 | `:is([data-theme=dark], body.dark, .theme-dark) .rds-comp-reviews .r...` | kept | 2 |
| raaghu-components/rds-comp-reviews/rds-comp-reviews.scss:128 | `:is([data-theme=dark], body.dark, .theme-dark) .rds-comp-reviews .r...` | kept | 2 |
| raaghu-components/rds-comp-reviews/rds-comp-reviews.scss:132 | `:is([data-theme=dark], body.dark, .theme-dark) .rds-comp-reviews .r...` | kept | 2 |
| raaghu-components/rds-comp-reviews/rds-comp-reviews.scss:140 | `:is([data-theme=dark], body.dark, .theme-dark) .rds-comp-reviews .r...` | kept | 2 |
| raaghu-components/rds-comp-reviews/rds-comp-reviews.scss:144 | `:is([data-theme=dark], body.dark, .theme-dark) .rds-comp-reviews .r...` | kept | 2 |
| raaghu-components/rds-comp-reviews/rds-comp-reviews.scss:152 | `:is([data-theme=dark], body.dark, .theme-dark) .rds-comp-reviews .r...` | kept | 2 |
| raaghu-components/rds-comp-reviews/rds-comp-reviews.scss:156 | `:is([data-theme=dark], body.dark, .theme-dark) .rds-comp-reviews .r...` | kept | 2 |
| raaghu-components/rds-comp-text-editor/rds-comp-text-editor.scss:291 | `:is(html[data-theme=dark], body[data-theme=dark], body.theme-dark, ...` | kept | 2 |
| raaghu-components/rds-comp-text-editor/rds-comp-text-editor.scss:299 | `:is(html[data-theme=dark], body[data-theme=dark], body.theme-dark, ...` | kept | 2 |
| raaghu-components/rds-comp-text-editor/rds-comp-text-editor.scss:305 | `:is(html[data-theme=dark], body[data-theme=dark], body.theme-dark, ...` | kept | 2 |
| raaghu-components/rds-comp-text-editor/rds-comp-text-editor.scss:316 | `:is(html[data-theme=dark], body[data-theme=dark], body.theme-dark, ...` | kept | 2 |
| raaghu-components/rds-comp-text-editor/rds-comp-text-editor.scss:320 | `:is(html[data-theme=dark], body[data-theme=dark], body.theme-dark, ...` | kept | 2 |
| raaghu-components/rds-comp-text-editor/rds-comp-text-editor.scss:324 | `:is(html[data-theme=dark], body[data-theme=dark], body.theme-dark, ...` | kept | 2 |
| raaghu-components/rds-comp-text-editor/rds-comp-text-editor.scss:327 | `:is(html[data-theme=dark], body[data-theme=dark], body.theme-dark, ...` | kept | 2 |
| raaghu-components/rds-comp-text-editor/rds-comp-text-editor.scss:333 | `:is(html[data-theme=dark], body[data-theme=dark], body.theme-dark, ...` | kept | 2 |
| raaghu-components/rds-comp-text-editor/rds-comp-text-editor.scss:336 | `:is(html[data-theme=dark], body[data-theme=dark], body.theme-dark, ...` | kept | 2 |
| raaghu-components/rds-comp-text-editor/rds-comp-text-editor.scss:342 | `:is(html[data-theme=dark], body[data-theme=dark], body.theme-dark, ...` | kept | 2 |
| raaghu-components/rds-comp-text-editor/rds-comp-text-editor.scss:348 | `:is(html[data-theme=dark], body[data-theme=dark], body.theme-dark, ...` | kept | 2 |
| raaghu-components/rds-comp-text-editor/rds-comp-text-editor.scss:354 | `:is(html[data-theme=dark], body[data-theme=dark], body.theme-dark, ...` | kept | 2 |
| raaghu-components/rds-comp-text-editor/rds-comp-text-editor.scss:361 | `:is(html[data-theme=dark], body[data-theme=dark], body.theme-dark, ...` | kept | 2 |
| raaghu-components/rds-comp-text-editor/rds-comp-text-editor.scss:367 | `:is(html[data-theme=dark], body[data-theme=dark], body.theme-dark, ...` | kept | 2 |
| raaghu-components/rds-comp-text-editor/rds-comp-text-editor.scss:375 | `:is(html[data-theme=dark], body[data-theme=dark], body.theme-dark, ...` | kept | 2 |
| raaghu-components/rds-comp-text-editor/rds-comp-text-editor.scss:382 | `:is(html[data-theme=dark], body[data-theme=dark], body.theme-dark, ...` | kept | 2 |
| raaghu-components/rds-comp-text-editor/rds-comp-text-editor.scss:386 | `:is(html[data-theme=dark], body[data-theme=dark], body.theme-dark, ...` | kept | 2 |
| raaghu-components/rds-comp-text-editor/rds-comp-text-editor.scss:390 | `:is(html[data-theme=dark], body[data-theme=dark], body.theme-dark, ...` | kept | 2 |
| raaghu-components/rds-comp-text-editor/rds-comp-text-editor.scss:396 | `:is(html[data-theme=dark], body[data-theme=dark], body.theme-dark, ...` | kept | 2 |
| raaghu-components/rds-comp-text-editor/rds-comp-text-editor.scss:405 | `:is(html[data-theme=dark], body[data-theme=dark], body.theme-dark, ...` | kept | 2 |
| raaghu-components/rds-comp-text-editor/rds-comp-text-editor.scss:409 | `:is(html[data-theme=dark], body[data-theme=dark], body.theme-dark, ...` | kept | 2 |
| raaghu-components/rds-comp-time-picker/rds-comp-time-picker.scss:492 | `:is(html[data-theme=dark], body[data-theme=dark], body.theme-dark, ...` | kept | 2 |
| raaghu-components/rds-comp-time-picker/rds-comp-time-picker.scss:497 | `:is(html[data-theme=dark], body[data-theme=dark], body.theme-dark, ...` | kept | 2 |
| raaghu-components/rds-comp-time-picker/rds-comp-time-picker.scss:502 | `:is(html[data-theme=dark], body[data-theme=dark], body.theme-dark, ...` | kept | 2 |
| raaghu-components/rds-comp-time-picker/rds-comp-time-picker.scss:506 | `:is(html[data-theme=dark], body[data-theme=dark], body.theme-dark, ...` | kept | 2 |
| raaghu-components/rds-comp-time-picker/rds-comp-time-picker.scss:512 | `:is(html[data-theme=dark], body[data-theme=dark], body.theme-dark, ...` | kept | 2 |
| raaghu-components/rds-comp-toast/rds-comp-toast.scss:464 | `:is(html[data-theme=dark], body[data-theme=dark], body.theme-dark, ...` | kept | 2 |
| raaghu-components/rds-comp-toast/rds-comp-toast.scss:469 | `:is(html[data-theme=dark], body[data-theme=dark], body.theme-dark, ...` | kept | 2 |
| raaghu-components/rds-comp-toast/rds-comp-toast.scss:479 | `:is(html[data-theme=dark], body[data-theme=dark], body.theme-dark, ...` | kept | 2 |
| raaghu-components/rds-comp-toast/rds-comp-toast.scss:483 | `:is(html[data-theme=dark], body[data-theme=dark], body.theme-dark, ...` | kept | 2 |
| raaghu-components/rds-comp-toast/rds-comp-toast.scss:487 | `:is(html[data-theme=dark], body[data-theme=dark], body.theme-dark, ...` | kept | 2 |
| raaghu-components/rds-comp-toast/rds-comp-toast.scss:491 | `:is(html[data-theme=dark], body[data-theme=dark], body.theme-dark, ...` | kept | 2 |
| raaghu-components/rds-comp-toast/rds-comp-toast.scss:496 | `:is(html[data-theme=dark], body[data-theme=dark], body.theme-dark, ...` | kept | 2 |
| raaghu-components/rds-comp-toast/rds-comp-toast.scss:501 | `:is(html[data-theme=dark], body[data-theme=dark], body.theme-dark, ...` | kept | 2 |
| raaghu-components/rds-comp-toast/rds-comp-toast.scss:506 | `:is(html[data-theme=dark], body[data-theme=dark], body.theme-dark, ...` | kept | 2 |
| raaghu-components/rds-comp-toolbar/rds-comp-toolbar.scss:308 | `:is(html[data-theme=dark], body[data-theme=dark], body.theme-dark, ...` | kept | 2 |
| raaghu-components/rds-comp-toolbar/rds-comp-toolbar.scss:314 | `:is(html[data-theme=dark], body[data-theme=dark], body.theme-dark, ...` | kept | 2 |
| raaghu-elements/rds-accordion/rds-accordion.scss:15 | `body[data-theme=dark] .rds-accordion__container` | kept | 2 |
| raaghu-elements/rds-accordion/rds-accordion.scss:17 | `body[data-theme=dark] .rds-accordion` | kept | 2 |
| raaghu-elements/rds-accordion/rds-accordion.scss:18 | `body[data-theme=dark] .rds-accordion__summary` | kept | 2 |
| raaghu-elements/rds-accordion/rds-accordion.scss:19 | `body[data-theme=dark] .rds-accordion__summary:hover` | kept | 2 |
| raaghu-elements/rds-accordion/rds-accordion.scss:20 | `body[data-theme=dark] .rds-accordion__summary:hover .rds-accordion_...` | kept | 2 |
| raaghu-elements/rds-accordion/rds-accordion.scss:25 | `body[data-theme=dark] .rds-accordion:not(.rds-accordion--selected):...` | kept | 2 |
| raaghu-elements/rds-accordion/rds-accordion.scss:29 | `body[data-theme=dark] .rds-accordion__details .MuiAccordionDetails-...` | kept | 2 |
| raaghu-elements/rds-accordion/rds-accordion.scss:31 | `body[data-theme=dark] .rds-accordion__title` | kept | 2 |
| raaghu-elements/rds-accordion/rds-accordion.scss:32 | `body[data-theme=dark] .rds-accordion .MuiAccordionSummary-expandIco...` | kept | 2 |
| raaghu-elements/rds-accordion/rds-accordion.scss:35 | `body[data-theme=dark] .rds-accordion.rds-accordion--expanded .MuiCo...` | kept | 2 |
| raaghu-elements/rds-accordion/rds-accordion.scss:39 | `body[data-theme=dark] .rds-accordion.rds-accordion--expanded.rds-ac...` | kept | 2 |
| raaghu-elements/rds-accordion/rds-accordion.scss:40 | `body[data-theme=dark] .rds-accordion.rds-accordion--expanded.rds-ac...` | kept | 2 |
| raaghu-elements/rds-accordion/rds-accordion.scss:44 | `body[data-theme=dark] .rds-accordion.rds-accordion--selected .rds-a...` | kept | 2 |
| raaghu-elements/rds-accordion/rds-accordion.scss:45 | `body[data-theme=dark] .rds-accordion.rds-accordion--selected .rds-a...` | kept | 2 |
| raaghu-elements/rds-accordion/rds-accordion.scss:46 | `body[data-theme=dark] .rds-accordion.rds-accordion--selected .rds-a...` | kept | 2 |
| raaghu-elements/rds-accordion/rds-accordion.scss:47 | `body[data-theme=dark] .rds-accordion.rds-accordion--selected .MuiAc...` | kept | 2 |
| raaghu-elements/rds-accordion/rds-accordion.scss:48 | `body[data-theme=dark] .rds-accordion.rds-accordion--selected .MuiAc...` | kept | 2 |
| raaghu-elements/rds-accordion/rds-accordion.scss:52 | `body[data-theme=dark] .rds-accordion.rds-accordion--hover .rds-acco...` | kept | 2 |
| raaghu-elements/rds-accordion/rds-accordion.scss:53 | `body[data-theme=dark] .rds-accordion.rds-accordion--hover .rds-acco...` | kept | 2 |
| raaghu-elements/rds-accordion/rds-accordion.scss:54 | `body[data-theme=dark] .rds-accordion.rds-accordion--hover .rds-acco...` | kept | 2 |
| raaghu-elements/rds-accordion/rds-accordion.scss:55 | `body[data-theme=dark] .rds-accordion.rds-accordion--hover .MuiAccor...` | kept | 2 |
| raaghu-elements/rds-accordion/rds-accordion.scss:56 | `body[data-theme=dark] .rds-accordion.rds-accordion--hover .MuiAccor...` | kept | 2 |
| raaghu-elements/rds-accordion/rds-accordion.scss:58 | `body[data-theme=dark] .rds-accordion__details-panel` | kept | 2 |
| raaghu-elements/rds-accordion/rds-accordion.scss:61 | `body[data-theme=dark] .rds-accordion.rds-accordion--expanded .rds-a...` | kept | 2 |
| raaghu-elements/rds-alert/rds-alert.scss:354 | `:is([data-theme=dark], body.dark, .theme-dark) .rds-alert.MuiAlert-...` | kept | 2 |
| raaghu-elements/rds-alert/rds-alert.scss:358 | `:is([data-theme=dark], body.dark, .theme-dark) .rds-alert.MuiAlert-...` | kept | 2 |
| raaghu-elements/rds-alert/rds-alert.scss:362 | `:is([data-theme=dark], body.dark, .theme-dark) .rds-alert.MuiAlert-...` | kept | 2 |
| raaghu-elements/rds-alert/rds-alert.scss:366 | `:is([data-theme=dark], body.dark, .theme-dark) .rds-alert.MuiAlert-...` | kept | 2 |
| raaghu-elements/rds-alert/rds-alert.scss:371 | `:is([data-theme=dark], body.dark, .theme-dark) .rds-alert.rds-alert...` | kept | 2 |
| raaghu-elements/rds-alert/rds-alert.scss:375 | `:is([data-theme=dark], body.dark, .theme-dark) .rds-alert.rds-alert...` | kept | 2 |
| raaghu-elements/rds-alert/rds-alert.scss:379 | `:is([data-theme=dark], body.dark, .theme-dark) .rds-alert.rds-alert...` | kept | 2 |
| raaghu-elements/rds-alert/rds-alert.scss:383 | `:is([data-theme=dark], body.dark, .theme-dark) .rds-alert.rds-alert...` | kept | 2 |
| raaghu-elements/rds-alert/rds-alert.scss:388 | `:is([data-theme=dark], body.dark, .theme-dark) .rds-alert .rds-aler...` | kept | 2 |
| raaghu-elements/rds-button-dropdown/rds-button-dropdown.scss:66 | `[data-theme=dark] .rds-button-dropdown__menu` | kept | 1 |
| raaghu-elements/rds-button-dropdown/rds-button-dropdown.scss:71 | `[data-theme=dark] .rds-button-dropdown__option` | kept | 1 |
| raaghu-elements/rds-button-dropdown/rds-button-dropdown.scss:76 | `[data-theme=dark] .rds-button-dropdown__option:hover:not(.rds-butto...` | kept | 2 |
| raaghu-elements/rds-button-dropdown/rds-button-dropdown.scss:80 | `[data-theme=dark] .rds-button-dropdown__option--selected` | kept | 1 |
| raaghu-elements/rds-button/rds-button.scss:291 | `[data-theme=dark] .rds-button.MuiButton-contained` | kept | 1 |
| raaghu-elements/rds-carousel/rds-carousel.scss:626 | `[data-theme=dark] .rds-carousel .rds-carousel__title-content` | kept | 2 |
| raaghu-elements/rds-carousel/rds-carousel.scss:632 | `[data-theme=dark] .rds-carousel .rds-carousel__title-content--bottom` | kept | 2 |
| raaghu-elements/rds-carousel/rds-carousel.scss:638 | `[data-theme=dark] .rds-carousel--with-title` | kept | 2 |
| raaghu-elements/rds-carousel/rds-carousel.scss:641 | `[data-theme=dark] .rds-carousel--with-title .rds-carousel__slide` | kept | 2 |
| raaghu-elements/rds-carousel/rds-carousel.scss:646 | `[data-theme=dark] .rds-carousel .rds-carousel__indicator:not(.rds-c...` | kept | 2 |
| raaghu-elements/rds-carousel/rds-carousel.scss:650 | `[data-theme=dark] .rds-carousel .rds-carousel__indicator:not(.rds-c...` | kept | 2 |
| raaghu-elements/rds-carousel/rds-carousel.scss:655 | `[data-theme=dark] .rds-carousel .rds-carousel__title-text` | kept | 2 |
| raaghu-elements/rds-carousel/rds-carousel.scss:660 | `[data-theme=dark] .rds-carousel .rds-carousel__title-subtitle` | kept | 2 |
| raaghu-elements/rds-carousel/rds-carousel.scss:666 | `[data-theme=dark] .rds-carousel .rds-carousel__title-content .rds-c...` | kept | 2 |
| raaghu-elements/rds-carousel/rds-carousel.scss:672 | `[data-theme=dark] .rds-carousel .rds-carousel__title-content .rds-c...` | kept | 2 |
| raaghu-elements/rds-collapse/rds-collapse.scss:44 | `[data-theme=dark] .rds-collapse__story-box--warning *` | kept | 1 |
| raaghu-elements/rds-collapse/rds-collapse.scss:47 | `[data-theme=dark] .rds-collapse__story-box--primary *` | kept | 1 |
| raaghu-elements/rds-collapse/rds-collapse.scss:50 | `[data-theme=dark] .rds-collapse__story-box--secondary *` | kept | 1 |
| raaghu-elements/rds-collapse/rds-collapse.scss:53 | `[data-theme=dark] .rds-collapse__story-box--success *` | kept | 1 |
| raaghu-elements/rds-menu/rds-menu.scss:212 | `[data-theme=dark] .rds-menu__list` | kept | 1 |
| raaghu-elements/rds-menu/rds-menu.scss:216 | `[data-theme=dark] .rds-menu__item` | kept | 3 |
| raaghu-elements/rds-menu/rds-menu.scss:220 | `[data-theme=dark] .rds-menu__item.rds-menu__item--disabled` | kept | 1 |
| raaghu-elements/rds-menu/rds-menu.scss:223 | `[data-theme=dark] .rds-menu__header` | kept | 1, 4 |
| raaghu-elements/rds-menu/rds-menu.scss:228 | `[data-theme=dark] .rds-menu__item:hover:not(:disabled)` | kept | 2 |
| raaghu-elements/rds-menu/rds-menu.scss:234 | `[data-theme=dark] .rds-menu__item:not(.rds-menu__item--disabled) .r...` | kept | 2 |
| raaghu-elements/rds-menu/rds-menu.scss:240 | `[data-theme=dark] .rds-menu__item:not(.rds-menu__item--disabled) .M...` | kept | 2 |
| raaghu-elements/rds-menu/rds-menu.scss:244 | `[data-theme=dark] .rds-menu__item:not(.rds-menu__item--disabled) .r...` | kept | 2 |
| raaghu-elements/rds-menu/rds-menu.scss:250 | `[data-theme=dark] .rds-menu .MuiPaper-root` | kept | 1 |
| raaghu-elements/rds-menu/rds-menu.scss:254 | `[data-theme=dark] .rds-menu__item .rds-menu__item__icon--primary svg` | kept | 1 |
| raaghu-elements/rds-menu/rds-menu.scss:263 | `[data-theme=dark] .rds-menu__item.rds-menu__item--disabled .rds-men...` | kept | 1 |
| raaghu-elements/rds-pagination/rds-pagination.scss:35 | `[data-theme=dark] .rds-pagination .MuiPaginationItem-root` | kept | 4 |
| raaghu-elements/rds-pagination/rds-pagination.scss:322 | `[data-theme=dark] .pagination-legend` | kept | 1 |
| raaghu-elements/rds-radio/rds-radio.scss:181 | `[data-theme=dark] .rds-radio .MuiFormControlLabel-label` | kept | 1 |
| raaghu-elements/rds-radio/rds-radio.scss:186 | `[data-theme=dark] .rds-radio .MuiFormLabel-root` | kept | 3 |
| raaghu-elements/rds-radio/rds-radio.scss:190 | `[data-theme=dark] .rds-radio .MuiRadio-root.Mui-checked` | kept | 4 |
| raaghu-elements/rds-radio/rds-radio.scss:194 | `[data-theme=dark] .rds-radio .MuiRadio-root.Mui-checked svg` | kept | 1 |
| raaghu-elements/rds-stepper/rds-stepper.scss:27 | `[data-theme=dark] .rds-stepper .MuiStepLabel-iconContainer .MuiStep...` | kept | 1 |
| raaghu-elements/rds-stepper/rds-stepper.scss:32 | `[data-theme=dark] .rds-stepper .MuiStepLabel-iconContainer .MuiStep...` | kept | 1 |
| raaghu-elements/rds-tabs/rds-tabs.scss:389 | `[data-theme=dark] .rds-tabs .MuiTab-root` | kept | 1 |
| raaghu-elements/rds-tabs/rds-tabs.scss:393 | `[data-theme=dark] .rds-tabs .MuiTab-root:hover` | kept | 1 |
| raaghu-elements/rds-tabs/rds-tabs.scss:397 | `[data-theme=dark] .rds-tabs--line-bottom .MuiTab-root.Mui-selected` | kept | 4 |
| raaghu-elements/rds-tabs/rds-tabs.scss:404 | `[data-theme=dark] .rds-tabs--line-bottom-solid .MuiTab-root.Mui-sel...` | kept | 2 |
| raaghu-elements/rds-tabs/rds-tabs.scss:416 | `[data-theme=dark] .rds-tabs--filled .MuiTab-root.Mui-selected` | kept | 1 |
| raaghu-elements/rds-tabs/rds-tabs.scss:422 | `[data-theme=dark] .rds-tabs .rds-tabs__icon svg` | kept | 1 |
| raaghu-elements/rds-tabs/rds-tabs.scss:426 | `[data-theme=dark] .rds-tabs .MuiTab-root.Mui-disabled` | kept | 1 |
| raaghu-elements/rds-tabs/rds-tabs.scss:431 | `[data-theme=dark] .rds-tabs .MuiTab-root.Mui-disabled:hover` | kept | 1 |
| raaghu-elements/rds-tabs/rds-tabs.scss:435 | `[data-theme=dark] .rds-tabs .MuiTab-root.Mui-disabled.Mui-selected` | kept | 1, 3 |
| raaghu-elements/rds-tabs/rds-tabs.scss:442 | `[data-theme=dark] .rds-tabs--filled .MuiTab-root.Mui-disabled.Mui-s...` | kept | 1 |
| raaghu-elements/rds-tabs/rds-tabs.scss:448 | `[data-theme=dark] .rds-tabs .MuiTab-root.Mui-disabled.Mui-selected ...` | kept | 1 |
| raaghu-elements/rds-tabs/rds-tabs.scss:454 | `[data-theme=dark] .rds-tabs--line-bottom-solid .MuiTab-root.Mui-dis...` | kept | 3 |
| raaghu-elements/rds-tabs/rds-tabs.scss:461 | `[data-theme=dark] .rds-tabs--flap .MuiTab-root.Mui-disabled.Mui-sel...` | kept | 1, 4 |
| raaghu-elements/rds-tabs/rds-tabs.scss:466 | `[data-theme=dark] .rds-tabs--flap .MuiTabs-vertical .MuiTab-root.Mu...` | kept | 1 |
| raaghu-elements/rds-tabs/rds-tabs.scss:471 | `[data-theme=dark] .rds-tabs .MuiTab-root.Mui-disabled .rds-tabs__ic...` | kept | 1 |
| raaghu-elements/rds-tag/rds-tag.scss:16 | `[data-theme=dark] .rds-tag.MuiChip-filled.MuiChip-colorDefault` | kept | 2 |
| raaghu-elements/rds-tag/rds-tag.scss:22 | `[data-theme=dark] .rds-tag.MuiChip-filled.MuiChip-colorDefault .Mui...` | kept | 2 |
| raaghu-elements/rds-tag/rds-tag.scss:27 | `[data-theme=dark] .rds-tag.MuiChip-outlined .MuiChip-label` | kept | 1 |
| raaghu-elements/rds-tag/rds-tag.scss:31 | `[data-theme=dark] .rds-tag.MuiChip-filled.MuiChip-colorDefault .Mui...` | kept | 2 |
| raaghu-elements/rds-tag/rds-tag.scss:36 | `[data-theme=dark] .rds-tag.MuiChip-outlined .MuiChip-deleteIcon` | kept | 1 |
| raaghu-elements/rds-text-area/rds-text-area.scss:163 | `:is([data-theme=dark], body.dark, .theme-dark) .rds-textarea-contai...` | kept | 2 |
| raaghu-elements/rds-text-area/rds-text-area.scss:167 | `:is([data-theme=dark], body.dark, .theme-dark) .rds-textarea-contai...` | kept | 2 |
| raaghu-elements/rds-text-area/rds-text-area.scss:171 | `:is([data-theme=dark], body.dark, .theme-dark) .rds-textarea-contai...` | kept | 2 |
| raaghu-elements/rds-text-area/rds-text-area.scss:178 | `:is([data-theme=dark], body.dark, .theme-dark) .rds-textarea-contai...` | kept | 2 |
| raaghu-elements/rds-text-area/rds-text-area.scss:183 | `:is([data-theme=dark], body.dark, .theme-dark) .rds-textarea-contai...` | kept | 2 |
| raaghu-elements/rds-text-area/rds-text-area.scss:187 | `:is([data-theme=dark], body.dark, .theme-dark) .rds-textarea-contai...` | kept | 2 |
| raaghu-elements/rds-text-area/rds-text-area.scss:193 | `:is([data-theme=dark], body.dark, .theme-dark) .rds-textarea-contai...` | kept | 2 |
| raaghu-elements/rds-text-area/rds-text-area.scss:196 | `:is([data-theme=dark], body.dark, .theme-dark) .rds-textarea-contai...` | kept | 2 |
| raaghu-elements/rds-toggle-button/rds-toggle-button.scss:340 | `:where([data-theme=dark]) .rds-toggle-button__group .MuiToggleButto...` | kept | 1 |
| raaghu-elements/rds-toggle-button/rds-toggle-button.scss:343 | `:where([data-theme=dark]) .rds-toggle-button__group .MuiToggleButto...` | kept | 3 |
| raaghu-elements/rds-toggle-button/rds-toggle-button.scss:348 | `:where([data-theme=dark]) .rds-toggle-button--large-three.rds-toggl...` | kept | 2 |
| raaghu-elements/rds-toggle-button/rds-toggle-button.scss:353 | `:where([data-theme=dark]) .rds-toggle-button--large-three.rds-toggl...` | kept | 2 |
| raaghu-elements/rds-toggle-button/rds-toggle-button.scss:358 | `:where([data-theme=dark]) .rds-toggle-button--large-three.rds-toggl...` | kept | 2 |
| raaghu-layouts/rds-comp-app-shell/rds-comp-app-shell.scss:209 | `html[data-theme=dark] .rds-appshell-add-layout-center` | kept | 1 |
| raaghu-layouts/rds-comp-app-shell/rds-comp-app-shell.scss:216 | `html[data-theme=dark] .side-nav .rds-appshell-add-layout-flex-center` | kept | 1 |
| raaghu-layouts/rds-comp-app-shell/rds-comp-app-shell.scss:225 | `html[data-theme=dark] .double-nav .MuiBottomNavigation-root` | kept | 1 |
| raaghu-layouts/rds-comp-app-shell/rds-comp-app-shell.scss:238 | `html[data-theme=dark] .double-nav .MuiBottomNavigation-root .MuiBot...` | kept | 1 |
