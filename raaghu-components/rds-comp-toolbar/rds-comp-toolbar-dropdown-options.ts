export interface DropdownOption {
  label: string;
  value: string;
}

export function getDropdownOptions(action: string): DropdownOption[] {
  switch (action) {
    case 'textFormat':
      return [
        { label: 'Heading 1', value: 'h1' },
        { label: 'Heading 2', value: 'h2' },
        { label: 'Heading 3', value: 'h3' },
        { label: 'Normal text', value: 'normal' },
        { label: 'Title', value: 'title' },
        { label: 'Subtitle', value: 'subtitle' },
      ];
    case 'paragraph':
      return [
        { label: 'Normal', value: 'normal' },
        { label: 'H1', value: 'h1' },
        { label: 'H2', value: 'h2' },
        { label: 'H3', value: 'h3' },
      ];
    case 'textColor':
    case 'textColor2':
      return [
        { label: 'Black', value: 'black' },
        { label: 'Red', value: 'red' },
        { label: 'Blue', value: 'blue' },
        { label: 'Green', value: 'green' },
        { label: 'Orange', value: 'orange' },
        { label: 'Purple', value: 'purple' },
      ];
    case 'bulletList':
    case 'bulletList2':
      return [
        { label: 'Bullet List', value: 'bullet' },
        { label: 'Numbered List', value: 'numbered' },
        { label: 'Checklist', value: 'checklist' },
      ];
    case 'numberList':
      return [
        { label: 'Numbered List', value: 'numbered' },
        { label: 'Roman Numerals', value: 'roman' },
        { label: 'Letters', value: 'letters' },
      ];
    case 'fontStyle':
      return [
        { label: 'Arial', value: 'arial' },
        { label: 'Times New Roman', value: 'times' },
        { label: 'Helvetica', value: 'helvetica' },
        { label: 'Georgia', value: 'georgia' },
        { label: 'Verdana', value: 'verdana' },
      ];
    case 'fontSize':
      return [
        { label: '8pt', value: '8' },
        { label: '10pt', value: '10' },
        { label: '12pt', value: '12' },
        { label: '14pt', value: '14' },
        { label: '16pt', value: '16' },
        { label: '18pt', value: '18' },
        { label: '24pt', value: '24' },
      ];
    case 'marker':
      return [
        { label: 'Yellow Highlight', value: 'yellow' },
        { label: 'Green Highlight', value: 'green' },
        { label: 'Blue Highlight', value: 'blue' },
        { label: 'Pink Highlight', value: 'pink' },
      ];
    case 'highlight':
      return [
        { label: 'Yellow', value: 'yellow' },
        { label: 'Green', value: 'green' },
        { label: 'Blue', value: 'blue' },
        { label: 'Pink', value: 'pink' },
        { label: 'Remove Highlight', value: 'none' },
      ];
    case 'outdent2':
      return [
        { label: 'Decrease Indent', value: 'decrease' },
        { label: 'Remove All Indent', value: 'remove-all' },
      ];
    case 'indent2':
      return [
        { label: 'Increase Indent', value: 'increase' },
        { label: 'Tab Indent', value: 'tab' },
      ];
    case 'paragraphPlus':
      return [
        { label: 'Add Line Break', value: 'line-break' },
        { label: 'Add Paragraph', value: 'paragraph' },
        { label: 'Add Section', value: 'section' },
      ];
    case 'markerPlus':
      return [
        { label: 'Marker Tools', value: 'tools' },
        { label: 'Custom Color', value: 'custom' },
        { label: 'Marker Settings', value: 'settings' },
      ];
    case 'quote':
      return [
        { label: 'Blockquote', value: 'blockquote' },
        { label: 'Inline Quote', value: 'inline' },
        { label: 'Citation', value: 'citation' },
      ];
    default:
      return [];
  }
}

const themeClassPattern = /^theme|theme-|dark|light/i;

export function findPortalThemeClass(element: Element | null): string | null {
  try {
    let el: Element | null = element;
    while (el && el !== document.documentElement) {
      if (el.classList && el.classList.length) {
        const themeClass = Array.from(el.classList).find((c) => themeClassPattern.test(c));
        if (themeClass) return themeClass;
      }
      const dataTheme = (el as HTMLElement).dataset?.theme;
      if (dataTheme) return dataTheme;
      el = el.parentElement;
    }
    const bodyTheme = Array.from(document.body.classList || []).find((c) => themeClassPattern.test(c));
    return bodyTheme || Array.from(document.documentElement.classList || []).find((c) => themeClassPattern.test(c)) || null;
  } catch {
    return null;
  }
}
