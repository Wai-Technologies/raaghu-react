import type { ToolbarButtonConfig, ToolbarOption } from './rds-comp-toolbar-config-types';

const o = (...pairs: [label: string, value: string][]): ToolbarOption[] => pairs.map(([label, value]) => ({ label, value }));

const textColors = o(['Black', 'black'], ['Red', 'red'], ['Blue', 'blue'], ['Green', 'green'], ['Orange', 'orange'], ['Purple', 'purple']);
const bulletLists = o(['Bullet List', 'bullet'], ['Numbered List', 'numbered'], ['Checklist', 'checklist']);

const dropdownOptions: Record<string, ToolbarOption[]> = {
  textFormat: o(['Heading 1', 'h1'], ['Heading 2', 'h2'], ['Heading 3', 'h3'], ['Normal text', 'normal'], ['Title', 'title'], ['Subtitle', 'subtitle']),
  paragraph: o(['Normal', 'normal'], ['H1', 'h1'], ['H2', 'h2'], ['H3', 'h3']),
  textColor: textColors,
  textColor2: textColors,
  bulletList: bulletLists,
  bulletList2: bulletLists,
  numberList: o(['Numbered List', 'numbered'], ['Roman Numerals', 'roman'], ['Letters', 'letters']),
  fontStyle: o(['Arial', 'arial'], ['Times New Roman', 'times'], ['Helvetica', 'helvetica'], ['Georgia', 'georgia'], ['Verdana', 'verdana']),
  fontSize: o(['8pt', '8'], ['10pt', '10'], ['12pt', '12'], ['14pt', '14'], ['16pt', '16'], ['18pt', '18'], ['24pt', '24']),
  marker: o(['Yellow Highlight', 'yellow'], ['Green Highlight', 'green'], ['Blue Highlight', 'blue'], ['Pink Highlight', 'pink']),
  highlight: o(['Yellow', 'yellow'], ['Green', 'green'], ['Blue', 'blue'], ['Pink', 'pink'], ['Remove Highlight', 'none']),
  outdent2: o(['Decrease Indent', 'decrease'], ['Remove All Indent', 'remove-all']),
  indent2: o(['Increase Indent', 'increase'], ['Tab Indent', 'tab']),
  paragraphPlus: o(['Add Line Break', 'line-break'], ['Add Paragraph', 'paragraph'], ['Add Section', 'section']),
  markerPlus: o(['Marker Tools', 'tools'], ['Custom Color', 'custom'], ['Marker Settings', 'settings']),
  quote: o(['Blockquote', 'blockquote'], ['Inline Quote', 'inline'], ['Citation', 'citation']),
};

/** Built-in dropdown options for the preset actions. */
export const getToolbarDropdownOptions = (action: string): ToolbarOption[] =>
  Object.hasOwn(dropdownOptions, action) ? dropdownOptions[action] : [];
export const isEmojiAction = (action: string) => action === 'emoji' || action === 'insertEmoji';

export const getButtonOptions = (button: Pick<ToolbarButtonConfig, 'action' | 'options'>): ToolbarOption[] =>
  button.options ?? getToolbarDropdownOptions(button.action);

/** Single source of truth for whether a button opens a dropdown. */
export const buttonHasDropdown = (button: Pick<ToolbarButtonConfig, 'action' | 'options' | 'hasDropdown'>): boolean =>
  button.hasDropdown ?? (getButtonOptions(button).length > 0 || isEmojiAction(button.action));
