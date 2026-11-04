# Raaghu Design System - Localization Guide

## Current state

`@waiin/raaghu-react` does not ship an i18n framework, translation files or a locale provider. Components render the text you pass them. Built-in English text can be overridden with the `localeText` prop (see [Overriding built-in text](#overriding-built-in-text)).

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

## Overriding built-in text

Components with fixed text (`aria-label`s, placeholders, button labels) take a `localeText` prop. Pass only the keys you want to change; the rest keep their English defaults. Text props you already pass, such as `placeholder` or `profileMenuItems`, win over `localeText`.

```tsx
<RdsCarousel
  localeText={{
    previousSlideLabel: t('carousel.previous'),
    nextSlideLabel: t('carousel.next'),
    slideLabel: (index, total) => t('carousel.slide', { index, total }),
  }}
/>
```

Each type is exported as `Rds{Name}LocaleText` and the defaults as `DEFAULT_RDS_{NAME}_LOCALE_TEXT`. Values that include numbers or names are functions.

| Component | Keys |
|---|---|
| `RdsAppBar` | `menuLabel`, `searchPlaceholder`, `clearSearchLabel`, `openOverflowMenuLabel`, `closeLabel`, `accountMenuLabel`, `myProfile`, `logout` |
| `RdsBackdrop` | `loadingLabel` |
| `RdsButtonDropdown` | `searchPlaceholder` |
| `RdsCarousel` | `carouselLabel`, `previousSlideLabel`, `nextSlideLabel`, `goToSlideLabel`, `slideLabel` |
| `RdsCounter` | `decreaseLabel`, `increaseLabel` |
| `RdsFileUploader` | `fileUploadLabel`, `defaultTitle`, `defaultFormTitle`, `chooseFile`, `chooseFileLabel`, `noFileChosen`, `removeFileNamedLabel`, `removeFileLabel`, `dragAndDropFiles`, `or`, `browse`, `uploadFiles`, `selectedFiles`, `maximumSize`, `fileSizeExceeds`, `fileRequired`, `uploadFailed`, `allFiles` |
| `RdsHeader` | `menuLabel`, `searchPlaceholder`, `clearSearchLabel`, `accountMenuLabel` |
| `RdsCompAiAttachment` | `uploadAttachmentLabel` |
| `RdsCompAiTypingSection` | `promptTitle`, `promptInputLabel`, `sendLabel`, `selectFrontendPlaceholder`, `newProject`, `importFromFigma`, `uploadFromFigma`, `importFromDevice`, `figmaDialogTitle`, `figmaDialogText`, `figmaHintText`, `figmaUrlPlaceholder` |
| `RdsCompAudioPlayer` | `audioPlayback`, `captionsLabel`, `skipBackward`, `playOrPause`, `skipForward`, `playbackProgress`, `openSettings`, `toggleVolume`, `trimHandle`, `cancel`, `save`, `trim`, `delete`, `selected`, `zoomOut`, `zoom`, `zoomIn`, `playbackSpeedSettings`, `playbackSpeed`, `shareLink`, `exportAudio`, `exportTranscript`, `exportSummary`, `exportMindMap`, `moveToFolder`, `findAndReplace`, `reTranscribe`, `reSummarize` |
| `RdsColorPicker` | `colorPicker`, `grid`, `spectrum`, `selectColor`, `saturationBrightness`, `saturationBrightnessValue`, `hue`, `opacity`, `redChannelValue`, `greenChannelValue`, `blueChannelValue`, `hueValue`, `saturationValue`, `brightnessValue`, `lightnessValue`, `hexColorValue`, `changeColorMode`, `colorFormat`, `opacityPercentage`, `swatches`, `addSwatch`, `selectSolidMode`, `selectGradientMode`, `linear`, `radial`, `direction`, `gradientDirection`, `selectGradientStop`, `gradientStopPosition`, `addGradientStop` |
| `RdsCompContribution` | `graphLabel` |
| `RdsDatepicker` | `selectDate`, `clearDate`, `openCalendar`, `previousMonth`, `nextMonth`, `month`, `year`, `custom`, `customDate`, `today`, `yesterday`, `lastSevenDays`, `lastFourteenDays` |
| `RdsCompESignature` | `drawSignature`, `drawInitial`, `uploadSignature`, `uploadInitial`, `chooseSignature`, `drawDisabledMessage`, `anotherMethodSelected`, `initialsCanvasLabel`, `signatureCanvasLabel`, `penColourLabel`, `penColorBlack`, `penColorBlue`, `penColorRed`, `undoLabel`, `saveLabel`, `deleteLabel`, `signatureNotClear`, `uploadInitialFileLabel`, `uploadSignatureFileLabel`, `removeFileLabel`, `fileTooLarge`, `fileFieldLabel`, `chooseFile`, `noFileChosen`, `maximumFileSize`, `selectOnlyOneStyle`, `createOwnSignature` |
| `RdsCompEmojiGenerator` | `searchPlaceholder`, `moodPrompt`, `moreEmojisLabel`, `skinToneLabel`, `skinToneNames`, `categoryTitles`, `emojisTitle` |
| `RdsCompFilterButton` | `title`, `searchPlaceholder`, `apply`, `clearAll` |
| `RdsCompKanbanBoard` | `moreOptions`, `close`, `boardTitlePlaceholder`, `addBoard`, `addItem`, `category`, `title`, `titlePlaceholder`, `description`, `descriptionPlaceholder`, `tags`, `selectTags`, `deleteBoard` |
| `RdsCompNotification` | `dismissNotificationLabel`, `dismiss`, `accept` |
| `RdsCompOffcanvas` | `close`, `openOffCanvas`, `restoreToDefault`, `cancel`, `save` |
| `RdsCompProductTour` | `close`, `previous`, `next`, `skip`, `create`, `add`, `projectNamePlaceholder`, `teamMembersPlaceholder`, `projectDescriptionPlaceholder`, `tourStepAlt`, `tourAnimationAlt`, `slideAlt` |
| `RdsCompReviews` | `like`, `dislike`, `dateNotAvailable` |
| `RdsCompScrollBar` | `scrollToTop`, `scrollToBottom` |
| `RdsTimePicker` | `now`, `cancel`, `setTime`, `placeholder`, `selectedTime`, `toggleTimePicker`, `timePicker`, `hours`, `minutes`, `amPm`, `incrementHour`, `decrementHour`, `incrementMinute`, `decrementMinute`, `toggleAmPmUp`, `toggleAmPm`, `toggleAmPmDown` |
| `RdsCompToast` | `close`, `replyInputLabel` |
| `RdsCompVideoPlayer` | `loading`, `disabledMessage` |

## Known gaps

- Internal components that are not exported (grid, chat, tree structure and similar) still contain fixed English text. `npm run lint:hardcoded-text` stops that count from growing.
- Right-to-left layout is not tested or supported yet.

Report a missing translation hook as an issue naming the component and the text.
