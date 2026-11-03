# Raaghu Design System - Localization Guide

## Current state

`@waiin/raaghu-react` does not ship an i18n framework, translation files or a locale provider. Components render the text you pass them. A few still have built-in English text that cannot be changed yet (see [Known gaps](#known-gaps)).

The earlier `utils/i18n` helpers were removed and are not part of the package.

## Translating component text

Pass already-translated strings through props, using whatever i18n library your app uses (react-i18next, FormatJS, Lingui and so on):

```tsx
const { t } = useTranslation();

<RdsButton variant="filled">{t('actions.save')}</RdsButton>
<RdsSelect label={t('form.country')} placeholder={t('form.selectCountry')} options={countries} />
<RdsIconButton aria-label={t('actions.delete')}><DeleteIcon /></RdsIconButton>
```

Translate accessible names too (`aria-label`, `tooltip`, `alt`). Icon-only buttons warn in development when they have no accessible name.

## Dates and numbers

| Component | How to localize |
|-----------|-----------------|
| `RdsCompDatepicker` | `locale` prop (a BCP 47 tag such as `'de-DE'`). It is used for the displayed date and the month names. |
| `RdsCompReviews` | `locale` prop for date formatting. |
| `RdsCompDateAndTimePicker` | Uses MUI X pickers with the Day.js adapter and the global Day.js locale. Import the locale and set it once at app start: `import 'dayjs/locale/de'; dayjs.locale('de');` |

For anything else, format values with `Intl.DateTimeFormat` or `Intl.NumberFormat` before passing them in.

## Known gaps

- Some components still render fixed English text. One example is the default profile menu items "My Profile" and "Logout" in `RdsAppBar`; override them with `profileMenuItems`. About 150 fixed English labels, placeholders and `aria-label`s remain across the library.
- There is no `labels`/`localeText` prop yet for overriding built-in text in one place.
- Right-to-left layout is not tested or supported yet.

Report a missing translation hook as an issue naming the component and the text.
