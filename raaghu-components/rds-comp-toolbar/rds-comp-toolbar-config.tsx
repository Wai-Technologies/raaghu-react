import { useRef } from "react";
import clsx from "clsx";
import ReactDOM from 'react-dom';
import RdsEmojiGenerator from '../rds-comp-emoji-generator/rds-comp-emoji-generator';
import { KeyboardArrowDown } from "@mui/icons-material";
import { type ToolbarButtonConfig } from './rds-comp-toolbar-config-types';
export type { ToolbarButtonConfig, ToolbarConfig } from './rds-comp-toolbar-config-types';

const resolvePortalThemeClass = (buttonElement: HTMLElement | null): string | null => {
  if (!buttonElement) {
    return null;
  }

  try {
    let el: Element | null = buttonElement;
    let found: string | null = null;
    while (el && el !== document.documentElement) {
      if (el.classList && el.classList.length) {
        for (const className of Array.from(el.classList)) {
          if (/^theme|theme-|dark|light/i.test(className)) {
            found = className;
            break;
          }
        }
        if (found) {
          break;
        }
      }
      const dataTheme = (el as HTMLElement).dataset?.theme;
      if (dataTheme) {
        found = dataTheme;
        break;
      }
      el = el.parentElement;
    }

    if (!found) {
      const bodyTheme = Array.from(document.body.classList || []).find(c => /^theme|theme-|dark|light/i.test(c));
      found = bodyTheme || Array.from(document.documentElement.classList || []).find(c => /^theme|theme-|dark|light/i.test(c)) || null;
    }
    return found;
  } catch {
    return null;
  }
};

function getToolbarDropdownOptions(action: string): { label: string; value: string }[] {
  switch (action) {
    case 'textFormat':
      return [
        { label: 'Heading 1', value: 'h1' },
        { label: 'Heading 2', value: 'h2' },
        { label: 'Heading 3', value: 'h3' },
        { label: 'Normal text', value: 'normal' },
        { label: 'Title', value: 'title' },
        { label: 'Subtitle', value: 'subtitle' }
      ];
    case 'paragraph':
      return [
        { label: 'Normal', value: 'normal' },
        { label: 'H1', value: 'h1' },
        { label: 'H2', value: 'h2' },
        { label: 'H3', value: 'h3' }
      ];
    case 'textColor':
    case 'textColor2':
      return [
        { label: 'Black', value: 'black' },
        { label: 'Red', value: 'red' },
        { label: 'Blue', value: 'blue' },
        { label: 'Green', value: 'green' },
        { label: 'Orange', value: 'orange' },
        { label: 'Purple', value: 'purple' }
      ];
    case 'bulletList':
    case 'bulletList2':
      return [
        { label: 'Bullet List', value: 'bullet' },
        { label: 'Numbered List', value: 'numbered' },
        { label: 'Checklist', value: 'checklist' }
      ];
    case 'numberList':
      return [
        { label: 'Numbered List', value: 'numbered' },
        { label: 'Roman Numerals', value: 'roman' },
        { label: 'Letters', value: 'letters' }
      ];
    case 'fontStyle':
      return [
        { label: 'Arial', value: 'arial' },
        { label: 'Times New Roman', value: 'times' },
        { label: 'Helvetica', value: 'helvetica' },
        { label: 'Georgia', value: 'georgia' },
        { label: 'Verdana', value: 'verdana' }
      ];
    case 'fontSize':
      return [
        { label: '8pt', value: '8' },
        { label: '10pt', value: '10' },
        { label: '12pt', value: '12' },
        { label: '14pt', value: '14' },
        { label: '16pt', value: '16' },
        { label: '18pt', value: '18' },
        { label: '24pt', value: '24' }
      ];
    case 'marker':
      return [
        { label: 'Yellow Highlight', value: 'yellow' },
        { label: 'Green Highlight', value: 'green' },
        { label: 'Blue Highlight', value: 'blue' },
        { label: 'Pink Highlight', value: 'pink' }
      ];
    case 'highlight':
      return [
        { label: 'Yellow', value: 'yellow' },
        { label: 'Green', value: 'green' },
        { label: 'Blue', value: 'blue' },
        { label: 'Pink', value: 'pink' },
        { label: 'Remove Highlight', value: 'none' }
      ];
    case 'outdent2':
      return [
        { label: 'Decrease Indent', value: 'decrease' },
        { label: 'Remove All Indent', value: 'remove-all' }
      ];
    case 'indent2':
      return [
        { label: 'Increase Indent', value: 'increase' },
        { label: 'Tab Indent', value: 'tab' }
      ];
    case 'paragraphPlus':
      return [
        { label: 'Add Line Break', value: 'line-break' },
        { label: 'Add Paragraph', value: 'paragraph' },
        { label: 'Add Section', value: 'section' }
      ];
    case 'markerPlus':
      return [
        { label: 'Marker Tools', value: 'tools' },
        { label: 'Custom Color', value: 'custom' },
        { label: 'Marker Settings', value: 'settings' }
      ];
    case 'quote':
      return [
        { label: 'Blockquote', value: 'blockquote' },
        { label: 'Inline Quote', value: 'inline' },
        { label: 'Citation', value: 'citation' }
      ];
    default:
      return [];
  }
}

export const ToolbarButton = ({ 
  icon, 
  action, 
  className: buttonClassName = "",
  ariaLabel,
  isActive,
  isDisabled,
  dropdownAction,
  onClick,
  onDropdownSelect
}: ToolbarButtonConfig & {
  isActive: boolean;
  isDisabled: boolean;
  dropdownAction?: string | null;
  onClick: () => void;
  onDropdownSelect?: (parentAction: string, option: string) => void;
}) => {
  const hasDropdown = getToolbarDropdownOptions(action).length > 0 || action === 'emoji' || action === 'insertEmoji';
  const isDropdownOpen = hasDropdown && dropdownAction === action;
  const dropdownOptions = hasDropdown ? getToolbarDropdownOptions(action) : [];

  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const rect = buttonRef.current?.getBoundingClientRect();
  const dropdownPos = isDropdownOpen && rect
    ? {
      top: rect.bottom + window.scrollY + 4,
      left: rect.left + window.scrollX,
      minWidth: Math.max(rect.width, 160),
    }
    : null;
  const portalThemeClass = isDropdownOpen ? resolvePortalThemeClass(buttonRef.current) : null;

  return (
    <div className="rds-comp-toolbar__button-container">
      <button
        ref={buttonRef}
        type="button"
        className={clsx("rds-comp-toolbar__button", isActive && "rds-comp-toolbar__button--active", isDisabled && "rds-comp-toolbar__button--disabled")}
        onClick={onClick}
        disabled={isDisabled}
        aria-label={ariaLabel || action}
        aria-haspopup={hasDropdown ? true : undefined}
        aria-pressed={isActive}
        aria-expanded={hasDropdown ? isDropdownOpen : undefined}
        data-testid={`toolbar-button-${action}`}
      >
        <span className="rds-comp-toolbar__button-icon">
          {icon}
        </span>
        {hasDropdown && (
          <span className="rds-comp-toolbar__button-dropdown">
            <KeyboardArrowDown />
          </span>
        )}
      </button>

      {hasDropdown && isDropdownOpen && dropdownPos && ReactDOM.createPortal(
        <div
          className={clsx('rds-comp-toolbar__dropdown', portalThemeClass)}
          style={{
            position: 'absolute',
            top: dropdownPos.top,
            left: dropdownPos.left,
            minWidth: dropdownPos.minWidth,
            zIndex: 'var(--rds-z-index-overlay, 1250)'
          }}
          role="menu"
          data-portal-theme={portalThemeClass || undefined}
        >
          {dropdownOptions.length > 0 && dropdownOptions.map((option) => (
            <button
              type="button"
              key={option.value}
              className="rds-comp-toolbar__dropdown-item"
              onClick={() => onDropdownSelect?.(action, option.value)}
              disabled={isDisabled}
            >
              {option.label}
            </button>
          ))}

          {(action === 'emoji' || action === 'insertEmoji') && (
            <div className="rds-comp-toolbar__emoji-portal">
              <RdsEmojiGenerator
                Type={undefined}
                onEmojiSelect={(e: string) => {
                  const val = typeof e === 'string' ? e : String(e);
                  onDropdownSelect?.(action, val);
                }}
                maxEmojis={80}
              />
            </div>
          )}
        </div>,
        document.body
      )}
    </div>
  );
};

export const Divider = () => <div className="rds-comp-toolbar__divider" />;

ToolbarButton.displayName = 'ToolbarButton';
Divider.displayName = 'Divider';
