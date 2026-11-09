# Keyboard focus audit

Audit of every `outline: none` / `outline: 0` in the SCSS of exported components. Internal components (grid, chat, tree structure, comments box, adaptive cards, code snippet, details pane, date-and-time picker, navtabs) are not covered.

A declaration is **fixed** when the element is keyboard-focusable and had no visible focus indicator; a `&:focus-visible` rule using `--rds-focus-ring-width` and `--rds-focus-ring-offset` was added. The mouse (`:focus`) look is unchanged. It is **ok** when a visible indicator already exists (a `:focus-visible` rule, MUI focus-visible styling, or a ring/border on `:focus-within`). It is **skipped** when the element is not a keyboard focus target, or when a ring would also show on mouse focus.

| Result | Count |
|---|---|
| Fixed | 19 |
| Already OK | 30 |
| Skipped | 3 |

| Location | Result | Reason |
|---|---|---|
| raaghu-components/rds-comp-ai-fab-menu/rds-comp-ai-fab-menu.scss:25 | ok | button has &:focus-visible outline (line 210) |
| raaghu-components/rds-comp-ai-fab-menu/rds-comp-ai-fab-menu.scss:310 | ok | item :focus changes background, applies to keyboard focus |
| raaghu-components/rds-comp-ai-typing-section/rds-comp-ai-typing-section.scss:113 | ok | textarea; container :focus-within changes border and elevation |
| raaghu-components/rds-comp-ai-typing-section/rds-comp-ai-typing-section.scss:141 | ok | same container :focus-within indicator |
| raaghu-components/rds-comp-audio-player/rds-comp-audio-player.scss:484 | ok | waveform bar has &:focus-visible background and ring (line 498) |
| raaghu-components/rds-comp-color-picker/rds-comp-color-picker.scss:69 | fixed | tab button outline killed on focus-visible; added focus-visible after block at 85 |
| raaghu-components/rds-comp-color-picker/rds-comp-color-picker.scss:85 | fixed | focus-visible reset removed all indication; added &:focus-visible ring |
| raaghu-components/rds-comp-color-picker/rds-comp-color-picker.scss:292 | fixed | dropdown-item button; added &:focus-visible ring |
| raaghu-components/rds-comp-color-picker/rds-comp-color-picker.scss:354 | fixed | readonly color input focusable; added &:focus-visible ring |
| raaghu-components/rds-comp-color-picker/rds-comp-color-picker.scss:378 | fixed | percent input focusable; added &:focus-visible ring |
| raaghu-components/rds-comp-color-picker/rds-comp-color-picker.scss:452 | fixed | swatch-item button; added &:focus-visible ring |
| raaghu-components/rds-comp-datepicker/rds-comp-datepicker.scss:401 | ok | RdsInput MUI root :focus-within sets primary border (765-766) |
| raaghu-components/rds-comp-datepicker/rds-comp-datepicker.scss:420 | ok | same MUI :focus-within border indicator |
| raaghu-components/rds-comp-datepicker/rds-comp-datepicker.scss:492 | ok | has &:focus-visible outline (495) |
| raaghu-components/rds-comp-datepicker/rds-comp-datepicker.scss:565 | fixed | header select; focus-visible reset removed indicator; added ring |
| raaghu-components/rds-comp-datepicker/rds-comp-datepicker.scss:589 | ok | navigation has :focus-visible outline (592) |
| raaghu-components/rds-comp-datepicker/rds-comp-datepicker.scss:730 | ok | focusable day is keyboard-selected with primary background |
| raaghu-components/rds-comp-datepicker/rds-comp-datepicker.scss:768 | ok | MUI notched outline gets primary border on focus-within |
| raaghu-components/rds-comp-datepicker/rds-comp-datepicker.scss:773 | ok | inner input; MUI root focus-within border shows focus |
| raaghu-components/rds-comp-datepicker/rds-comp-datepicker.scss:930 | fixed | month/year read-view; added &:focus-visible ring |
| raaghu-components/rds-comp-datepicker/rds-comp-datepicker.scss:961 | fixed | month/year select; added &:focus-visible ring |
| raaghu-components/rds-comp-datepicker/rds-comp-datepicker.scss:1274 | fixed | dark-theme header select; added &:focus-visible ring (needed for specificity) |
| raaghu-components/rds-comp-datepicker/rds-comp-datepicker.scss:1299 | ok | dark day; keyboard-selected primary background |
| raaghu-components/rds-comp-datepicker/rds-comp-datepicker.scss:1374 | fixed | dark-theme read-view; added &:focus-visible ring |
| raaghu-components/rds-comp-datepicker/rds-comp-datepicker.scss:1391 | fixed | dark-theme select; added &:focus-visible ring |
| raaghu-components/rds-comp-e-signature/rds-comp-e-signature.scss:450 | ok | file-button has :focus-visible outline (454) |
| raaghu-components/rds-comp-scrollbar/rds-comp-scrollbar.scss:143 | fixed | real button; only had outline:none; added &:focus-visible ring |
| raaghu-components/rds-comp-time-picker/rds-comp-time-picker.scss:78 | ok | :focus sets accent border and box-shadow ring |
| raaghu-components/rds-comp-time-picker/rds-comp-time-picker.scss:302 | ok | :focus sets accent border and box-shadow ring |
| raaghu-components/rds-comp-toast/rds-comp-toast.scss:281 | ok | close button has &:focus-visible outline (287) |
| raaghu-components/rds-comp-toast/rds-comp-toast.scss:376 | ok | :focus border-color and box-shadow ring |
| raaghu-components/rds-comp-toolbar/rds-comp-toolbar.scss:182 | ok | has &:focus-visible focus-ring (185) |
| raaghu-components/rds-comp-toolbar/rds-comp-toolbar.scss:253 | ok | :focus changes background (same as hover) |
| raaghu-elements/rds-app-bar/rds-app-bar.scss:899 | ok | inner search input; parent &:focus-within changes border-color |
| raaghu-elements/rds-button-dropdown/rds-button-dropdown.scss:39 | fixed | real button option, no focus style; added focus-visible ring |
| raaghu-elements/rds-button/rds-button.scss:16 | ok | &:focus-visible ring exists |
| raaghu-elements/rds-counter/rds-counter.scss:280 | skipped | text input matches :focus-visible on mouse click too, so a ring would be a visible change; needs a :focus-within ring on the counter wrapper (design call) |
| raaghu-elements/rds-dialog/rds-dialog.scss:167 | ok | &:focus-visible ring follows immediately |
| raaghu-elements/rds-file-uploader/rds-file-uploader.scss:60 | fixed | browse-link button; focus only set color to the already-primary color; added ring |
| raaghu-elements/rds-file-uploader/rds-file-uploader.scss:390 | fixed | same as above for __browse-link; added ring |
| raaghu-elements/rds-header/rds-header.scss:133 | ok | inner search input; parent &:focus-within changes border-color |
| raaghu-elements/rds-input/rds-input.scss:72 | ok | MUI root div; focus-within/Mui-focused border and notched outline show focus |
| raaghu-elements/rds-list/rds-list.scss:191 | skipped | MuiList root container is not focusable; items have focus-visible ring |
| raaghu-elements/rds-menu/rds-menu.scss:34 | ok | &:focus-visible inset box-shadow and hover bg |
| raaghu-elements/rds-pagination/rds-pagination.scss:32 | ok | .MuiPaginationItem-root:focus-visible ring |
| raaghu-elements/rds-pagination/rds-pagination.scss:80 | fixed | selected item; outline:none had higher specificity than the generic ring; added &:focus-visible |
| raaghu-elements/rds-table/rds-table.scss:437 | ok | checkbox :focus-visible shows box-shadow on ::before |
| raaghu-elements/rds-text-area/rds-text-area.scss:66 | ok | :focus sets border-color primary (also for keyboard) |
| raaghu-elements/rds-text-area/rds-text-area.scss:78 | ok | same :focus border-color rule; note disabled/error variants rely on their own border |
| raaghu-elements/shared/styles/rds-profile-menu.scss:21 | skipped | MuiList container, programmatic focus only; menu items show focus |
| raaghu-layouts/rds-comp-app-shell/rds-comp-app-shell.scss:70 | fixed | docked footer nav buttons had no focus style; added > button:focus-visible |
| raaghu-layouts/rds-comp-app-shell/rds-comp-app-shell.scss:762 | fixed | triPane footer nav buttons; added button:focus-visible sibling rule (depth limit) |
