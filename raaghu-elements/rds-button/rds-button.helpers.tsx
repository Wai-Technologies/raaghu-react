import React from 'react';
import {
  Add,
  Delete,
  Save,
  Edit,
  Close,
  ArrowForward,
  ArrowBack,
  RadioButtonUnchecked,
  ChevronRight,
  ChevronLeft,
  KeyboardArrowUp,
  KeyboardArrowDown,
} from '@mui/icons-material';
import RdsCompSpinner, { SpinnerLayout, SpinnerSize } from '../../raaghu-components/rds-comp-spinner/rds-comp-spinner';

export type RdsButtonLayout = 'icon+text' | 'icon-only' | 'text-only';

export function normalizeLayout(layout: string): RdsButtonLayout {
  switch (layout.trim().toLowerCase()) {
    case 'icon + text':
      return 'icon+text';
    case 'icon only':
      return 'icon-only';
    case 'text only':
      return 'text-only';
    default:
      return layout as RdsButtonLayout;
  }
}

export function getShapeStyles(shape: 'pill' | 'rectangle') {
  if (shape === 'pill') {
    return { borderRadius: 'var(--rds-border-radius-pill)' };
  }
  return { borderRadius: 'var(--rds-border-radius-sm)' };
}

export function getTextCaseStyles(textCase: 'uppercase' | 'lowercase' | 'capitalize' | 'unset') {
  return {
    textTransform: textCase === 'unset' ? ('none' as const) : (textCase as 'uppercase' | 'lowercase' | 'capitalize'),
  };
}

export function getIconComponent(iconType?: string): React.ReactNode {
  switch (iconType) {
    case 'add':
      return <Add />;
    case 'delete':
      return <Delete />;
    case 'save':
      return <Save />;
    case 'edit':
      return <Edit />;
    case 'close':
      return <Close />;
    case 'arrow-forward':
      return <ArrowForward />;
    case 'chevron':
    case 'chevron_right':
      return <ChevronRight />;
    case 'chevron_left':
      return <ChevronLeft />;
    case 'chevron_up':
      return <KeyboardArrowUp />;
    case 'chevron_down':
      return <KeyboardArrowDown />;
    case 'arrow-back':
      return <ArrowBack />;
    case 'circle':
      return <RadioButtonUnchecked />;
    default:
      return null;
  }
}

export function resolveIcon(icon?: React.ReactNode | string): React.ReactNode {
  if (typeof icon === 'string') {
    return getIconComponent(icon);
  }
  return icon;
}

export function getStateClassName(state: 'default' | 'hover' | 'disabled' | 'selected'): string {
  switch (state) {
    case 'hover':
      return 'rds-button__state-hover';
    case 'selected':
      return 'rds-button__state-selected';
    case 'disabled':
      return 'rds-button__state-disabled';
    case 'default':
    default:
      return 'rds-button__state-default';
  }
}

export function getShapeClassName(shape: 'pill' | 'rectangle'): string {
  return shape === 'pill' ? 'rds-button--shape-pill' : 'rds-button--shape-rectangle';
}

export function getStartIcon(
  normalizedLayout: RdsButtonLayout,
  showLeftIcon: boolean,
  changeLeftIcon?: React.ReactNode | string
): React.ReactNode | undefined {
  if (normalizedLayout === 'icon-only' || normalizedLayout !== 'icon+text' || !showLeftIcon) {
    return undefined;
  }
  return resolveIcon(changeLeftIcon);
}

export function getEndIcon(
  normalizedLayout: RdsButtonLayout,
  showRightIcon: boolean,
  changeRightIcon?: React.ReactNode | string
): React.ReactNode | undefined {
  if (normalizedLayout === 'icon-only' || normalizedLayout !== 'icon+text' || !showRightIcon) {
    return undefined;
  }
  return resolveIcon(changeRightIcon);
}

export function renderButtonContent(
  isLoading: boolean,
  normalizedLayout: RdsButtonLayout,
  showLeftIcon: boolean,
  showRightIcon: boolean,
  changeLeftIcon: React.ReactNode | string,
  changeRightIcon: React.ReactNode | string,
  text?: string,
  children?: React.ReactNode
): React.ReactNode {
  if (isLoading) {
    return (
      <RdsCompSpinner
        colorVariant="light"
        labelText={text || 'Loading'}
        layout={SpinnerLayout.SpinnerAndLabel}
        showLabel
        size={SpinnerSize.Small}
      />
    );
  }
  if (normalizedLayout === 'icon-only') {
    if (showLeftIcon) return resolveIcon(changeLeftIcon);
    if (showRightIcon) return resolveIcon(changeRightIcon);
    return null;
  }
  if (normalizedLayout === 'icon+text' || normalizedLayout === 'text-only') {
    return text || children;
  }
  return null;
}

export function getMuiVariant(style?: 'filled' | 'outlined' | 'transparent') {
  if (style === 'filled') return 'contained';
  if (style === 'transparent') return 'text';
  return style;
}

export function getStyleVariantClass(style?: 'filled' | 'outlined' | 'transparent'): string {
  if (style === 'filled') return 'rds-button__primary';
  if (style === 'outlined') return 'rds-button__secondary';
  if (style === 'transparent') return 'rds-button__text';
  return '';
}

export function getFilledTextColor(
  style: string | undefined,
  color: string | undefined,
  theme: { palette: Record<string, unknown> }
): string | undefined {
  if (style !== 'filled' || !color || color === 'inherit') return undefined;
  const paletteColor = theme.palette[color];
  if (paletteColor && typeof paletteColor === 'object' && 'contrastText' in paletteColor) {
    return (paletteColor as { contrastText: string }).contrastText;
  }
  return undefined;
}

export function getFilledBackgroundColor(
  style: string | undefined,
  color: string | undefined,
  theme: { palette: Record<string, unknown> }
): string | undefined {
  if (style !== 'filled' || !color || color === 'inherit') return undefined;
  const paletteColor = theme.palette[color];
  if (paletteColor && typeof paletteColor === 'object' && 'main' in paletteColor) {
    return (paletteColor as { main: string }).main;
  }
  return undefined;
}
