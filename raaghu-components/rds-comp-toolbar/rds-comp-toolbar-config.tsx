import { useLayoutEffect, useRef, useState, type KeyboardEvent } from "react";
import clsx from "clsx";
import { createPortal } from 'react-dom';
import RdsEmojiGenerator from '../rds-comp-emoji-generator/rds-comp-emoji-generator';
import { KeyboardArrowDown } from "@mui/icons-material";
import { type ToolbarButtonConfig } from './rds-comp-toolbar-config-types';
import { buttonHasDropdown, getButtonOptions, isEmojiAction } from './rds-comp-toolbar-dropdown-options';
export type { ToolbarButtonConfig, ToolbarConfig, ToolbarOption } from './rds-comp-toolbar-config-types';

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

type DropdownPosition = { top: number; left: number; minWidth: number };

const getDropdownPosition = (button: HTMLElement): DropdownPosition => {
  const rect = button.getBoundingClientRect();
  return {
    top: rect.bottom + window.scrollY + 4,
    left: rect.left + window.scrollX,
    minWidth: Math.max(rect.width, 160),
  };
};

export const ToolbarButton = ({ 
  icon, 
  action, 
  hasDropdown: hasDropdownProp,
  options,
  ariaLabel,
  isActive,
  isDisabled,
  dropdownAction,
  onClick,
  onDropdownSelect,
  onDropdownClose,
}: ToolbarButtonConfig & {
  isActive: boolean;
  isDisabled: boolean;
  dropdownAction?: string | null;
  onClick: () => void;
  onDropdownSelect?: (parentAction: string, option: string) => void;
  /** Called when the dropdown asks to close (Escape). */
  onDropdownClose?: () => void;
}) => {
  const hasDropdown = buttonHasDropdown({ action, options, hasDropdown: hasDropdownProp });
  const isDropdownOpen = hasDropdown && dropdownAction === action;
  const dropdownOptions = hasDropdown ? getButtonOptions({ action, options }) : [];
  const isEmoji = isEmojiAction(action);

  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [dropdownPos, setDropdownPos] = useState<DropdownPosition | null>(null);
  const [portalThemeClass, setPortalThemeClass] = useState<string | null>(null);

  // Measure after layout (not during render) and follow scroll/resize while open.
  useLayoutEffect(() => {
    const button = buttonRef.current;
    if (!isDropdownOpen || !button) {
      setDropdownPos(null);
      return;
    }
    const update = () => setDropdownPos(getDropdownPosition(button));
    update();
    setPortalThemeClass(resolvePortalThemeClass(button));
    window.addEventListener('scroll', update, true);
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update, true);
      window.removeEventListener('resize', update);
    };
  }, [isDropdownOpen]);

  // Move focus into the menu when it first appears.
  const isMenuShown = dropdownPos !== null;
  useLayoutEffect(() => {
    if (isMenuShown) {
      menuRef.current?.querySelector<HTMLElement>('[role="menuitem"]')?.focus();
    }
  }, [isMenuShown]);

  const handleMenuKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      onDropdownClose?.();
      buttonRef.current?.focus();
      return;
    }
    const items = Array.from(menuRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]') ?? []);
    if (items.length === 0) return;
    const current = items.indexOf(document.activeElement as HTMLElement);
    let next: number | null = null;
    if (event.key === 'ArrowDown') next = (current + 1) % items.length;
    else if (event.key === 'ArrowUp') next = (current - 1 + items.length) % items.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = items.length - 1;
    if (next !== null) {
      event.preventDefault();
      items[next].focus();
    }
  };

  return (
    <div className="rds-comp-toolbar__button-container">
      <button
        ref={buttonRef}
        type="button"
        className={clsx("rds-comp-toolbar__button", isActive && "rds-comp-toolbar__button--active", isDisabled && "rds-comp-toolbar__button--disabled")}
        onClick={onClick}
        disabled={isDisabled}
        aria-label={ariaLabel || action}
        aria-haspopup={hasDropdown ? (isEmoji ? 'dialog' : 'menu') : undefined}
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

      {isDropdownOpen && dropdownPos && createPortal(
        <div
          ref={menuRef}
          className={clsx('rds-comp-toolbar__dropdown', portalThemeClass)}
          style={{
            position: 'absolute',
            top: dropdownPos.top,
            left: dropdownPos.left,
            minWidth: dropdownPos.minWidth,
            zIndex: 'var(--rds-z-index-overlay, 1250)'
          }}
          role={isEmoji && dropdownOptions.length === 0 ? 'dialog' : 'menu'}
          aria-label={ariaLabel || action}
          data-portal-theme={portalThemeClass || undefined}
          onKeyDown={handleMenuKeyDown}
        >
          {dropdownOptions.map((option) => (
            <button
              type="button"
              role="menuitem"
              tabIndex={-1}
              key={option.value}
              className="rds-comp-toolbar__dropdown-item"
              onClick={() => onDropdownSelect?.(action, option.value)}
              disabled={isDisabled}
            >
              {option.label}
            </button>
          ))}

          {isEmoji && (
            <div className="rds-comp-toolbar__emoji-portal">
              <RdsEmojiGenerator
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
