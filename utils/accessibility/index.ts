/**
 * Accessibility utilities and constants for the Raaghu Design System
 * Following WCAG 2.1 AA guidelines
 */

// ARIA Roles
export const ARIA_ROLES = {
  BUTTON: 'button',
  LINK: 'link',
  TAB: 'tab',
  TABPANEL: 'tabpanel',
  TABLIST: 'tablist',
  DIALOG: 'dialog',
  ALERT: 'alert',
  ALERTDIALOG: 'alertdialog',
  MENU: 'menu',
  MENUBAR: 'menubar',
  MENUITEM: 'menuitem',
  CHECKBOX: 'checkbox',
  RADIO: 'radio',
  LISTBOX: 'listbox',
  OPTION: 'option',
  COMBOBOX: 'combobox',
  GRID: 'grid',
  GRIDCELL: 'gridcell',
  ROWHEADER: 'rowheader',
  COLUMNHEADER: 'columnheader',
  PROGRESSBAR: 'progressbar',
  SLIDER: 'slider',
  SPINBUTTON: 'spinbutton',
  TOOLTIP: 'tooltip',
  STATUS: 'status',
  LOG: 'log',
  REGION: 'region',
  BANNER: 'banner',
  NAVIGATION: 'navigation',
  MAIN: 'main',
  COMPLEMENTARY: 'complementary',
  CONTENTINFO: 'contentinfo',
  SEARCH: 'search',
  FORM: 'form',
} as const;

// ARIA Properties
export const ARIA_PROPS = {
  LABEL: 'aria-label',
  LABELLEDBY: 'aria-labelledby',
  DESCRIBEDBY: 'aria-describedby',
  EXPANDED: 'aria-expanded',
  HIDDEN: 'aria-hidden',
  DISABLED: 'aria-disabled',
  CHECKED: 'aria-checked',
  SELECTED: 'aria-selected',
  PRESSED: 'aria-pressed',
  CURRENT: 'aria-current',
  LIVE: 'aria-live',
  ATOMIC: 'aria-atomic',
  RELEVANT: 'aria-relevant',
  BUSY: 'aria-busy',
  INVALID: 'aria-invalid',
  REQUIRED: 'aria-required',
  READONLY: 'aria-readonly',
  MULTISELECTABLE: 'aria-multiselectable',
  ORIENTATION: 'aria-orientation',
  SORT: 'aria-sort',
  VALUEMIN: 'aria-valuemin',
  VALUEMAX: 'aria-valuemax',
  VALUENOW: 'aria-valuenow',
  VALUETEXT: 'aria-valuetext',
  CONTROLS: 'aria-controls',
  OWNS: 'aria-owns',
  ACTIVEDESCENDANT: 'aria-activedescendant',
  HASPOPUP: 'aria-haspopup',
  LEVEL: 'aria-level',
  POSINSET: 'aria-posinset',
  SETSIZE: 'aria-setsize',
} as const;

// Live Region Politeness Levels
export const LIVE_REGIONS = {
  OFF: 'off',
  POLITE: 'polite',
  ASSERTIVE: 'assertive',
} as const;

// Keyboard Keys
export const KEYS = {
  ENTER: 'Enter',
  SPACE: ' ',
  TAB: 'Tab',
  ESCAPE: 'Escape',
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
  HOME: 'Home',
  END: 'End',
  PAGE_UP: 'PageUp',
  PAGE_DOWN: 'PageDown',
  DELETE: 'Delete',
  BACKSPACE: 'Backspace',
} as const;

// Focus Management Types
export interface FocusableElement extends HTMLElement {
  focus(): void;
}

// Accessibility Props Interface
export interface AccessibilityProps {
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-expanded'?: boolean;
  'aria-hidden'?: boolean;
  'aria-disabled'?: boolean;
  'aria-checked'?: boolean | 'mixed';
  'aria-selected'?: boolean;
  'aria-pressed'?: boolean | 'mixed';
  'aria-current'?: boolean | 'page' | 'step' | 'location' | 'date' | 'time';
  'aria-live'?: 'off' | 'polite' | 'assertive';
  'aria-atomic'?: boolean;
  'aria-relevant'?: 'additions' | 'removals' | 'text' | 'all';
  'aria-busy'?: boolean;
  'aria-invalid'?: boolean | 'grammar' | 'spelling';
  'aria-required'?: boolean;
  'aria-readonly'?: boolean;
  'aria-multiselectable'?: boolean;
  'aria-orientation'?: 'horizontal' | 'vertical';
  'aria-sort'?: 'none' | 'ascending' | 'descending' | 'other';
  'aria-valuemin'?: number;
  'aria-valuemax'?: number;
  'aria-valuenow'?: number;
  'aria-valuetext'?: string;
  'aria-controls'?: string;
  'aria-owns'?: string;
  'aria-activedescendant'?: string;
  'aria-haspopup'?: boolean | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog';
  'aria-level'?: number;
  'aria-posinset'?: number;
  'aria-setsize'?: number;
  role?: string;
  tabIndex?: number;
}

// Focus Management Utilities
export class FocusManager {
  private static focusableSelectors = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
    '[contenteditable="true"]'
  ].join(', ');

  static getFocusableElements(container: Element): FocusableElement[] {
    return Array.from(
      container.querySelectorAll(this.focusableSelectors)
    ) as FocusableElement[];
  }

  static getFirstFocusableElement(container: Element): FocusableElement | null {
    const focusable = this.getFocusableElements(container);
    return focusable.length > 0 ? focusable[0] : null;
  }

  static getLastFocusableElement(container: Element): FocusableElement | null {
    const focusable = this.getFocusableElements(container);
    return focusable.length > 0 ? focusable[focusable.length - 1] : null;
  }

  static trapFocus(container: Element, event: KeyboardEvent): void {
    const focusable = this.getFocusableElements(container);
    const firstFocusable = focusable[0];
    const lastFocusable = focusable[focusable.length - 1];

    if (event.key === KEYS.TAB) {
      if (event.shiftKey) {
        if (document.activeElement === firstFocusable) {
          event.preventDefault();
          lastFocusable?.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          event.preventDefault();
          firstFocusable?.focus();
        }
      }
    }
  }

  static restoreFocus(previouslyFocusedElement: FocusableElement | null): void {
    if (previouslyFocusedElement && document.contains(previouslyFocusedElement)) {
      previouslyFocusedElement.focus();
    }
  }
}

// Screen Reader Utilities
export class ScreenReaderUtils {
  static announceToScreenReader(message: string, politeness: 'polite' | 'assertive' = 'polite'): void {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', politeness);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.style.position = 'absolute';
    announcement.style.left = '-10000px';
    announcement.style.width = '1px';
    announcement.style.height = '1px';
    announcement.style.overflow = 'hidden';
    
    document.body.appendChild(announcement);
    announcement.textContent = message;
    
    // Clean up after announcement
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }

  static createVisuallyHiddenStyles() {
    return {
      position: 'absolute' as const,
      left: '-10000px',
      width: '1px',
      height: '1px',
      overflow: 'hidden' as const,
    };
  }
}

// Color Contrast Utilities
export class ColorContrastUtils {
  // Calculate relative luminance according to WCAG 2.1
  static getRelativeLuminance(color: string): number {
    // Convert hex to RGB
    const hex = color.replace('#', '');
    const r = Number.parseInt(hex.substr(0, 2), 16) / 255;
    const g = Number.parseInt(hex.substr(2, 2), 16) / 255;
    const b = Number.parseInt(hex.substr(4, 2), 16) / 255;

    // Apply gamma correction
    const gamma = (c: number) => c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    
    return 0.2126 * gamma(r) + 0.7152 * gamma(g) + 0.0722 * gamma(b);
  }

  // Calculate contrast ratio between two colors
  static getContrastRatio(color1: string, color2: string): number {
    const l1 = this.getRelativeLuminance(color1);
    const l2 = this.getRelativeLuminance(color2);
    
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    
    return (lighter + 0.05) / (darker + 0.05);
  }

  // Check if contrast meets WCAG AA standard (4.5:1)
  static meetsWCAGAA(foreground: string, background: string): boolean {
    return this.getContrastRatio(foreground, background) >= 4.5;
  }

  // Check if contrast meets WCAG AAA standard (7:1)
  static meetsWCAGAAA(foreground: string, background: string): boolean {
    return this.getContrastRatio(foreground, background) >= 7;
  }
}

// Component Accessibility Validators
export class AccessibilityValidator {
  static validateButton(props: any): string[] {
    const errors: string[] = [];
    
    if (!props['aria-label'] && !props.children && !props['aria-labelledby']) {
      errors.push('Button must have accessible name via aria-label, children, or aria-labelledby');
    }
    
    if (props.disabled && props.tabIndex === 0) {
      errors.push('Disabled button should not be focusable (remove tabIndex)');
    }
    
    return errors;
  }

  static validateInput(props: any): string[] {
    const errors: string[] = [];
    
    if (!props['aria-label'] && !props['aria-labelledby'] && !props.placeholder) {
      errors.push('Input must have accessible name via aria-label, aria-labelledby, or placeholder');
    }
    
    if (props.required && !props['aria-required']) {
      errors.push('Required input should have aria-required="true"');
    }
    
    if (props.error && !props['aria-invalid']) {
      errors.push('Invalid input should have aria-invalid="true"');
    }
    
    return errors;
  }

  static validateModal(props: any): string[] {
    const errors: string[] = [];
    
    if (!props['aria-label'] && !props['aria-labelledby']) {
      errors.push('Modal must have accessible name via aria-label or aria-labelledby');
    }
    
    if (props.role !== ARIA_ROLES.DIALOG && props.role !== ARIA_ROLES.ALERTDIALOG) {
      errors.push('Modal should have role="dialog" or role="alertdialog"');
    }
    
    return errors;
  }
}

export default {
  ARIA_ROLES,
  ARIA_PROPS,
  LIVE_REGIONS,
  KEYS,
  FocusManager,
  ScreenReaderUtils,
  ColorContrastUtils,
  AccessibilityValidator,
};
