import type { CSSProperties } from 'react';
import type { SxProps, Theme } from '@mui/material/styles';

/**
 * Custom-styling hooks every Raaghu element/component accepts on its root element.
 * They are hidden from the Storybook controls (see `.storybook/hide-styling-props.ts`).
 */
export interface RdsStylingProps {
  /** Extra class name(s) applied to the root element. */
  className?: string;
  /** MUI `sx` styles applied to the root element. */
  sx?: SxProps<Theme>;
  /** Inline styles applied to the root element. */
  style?: CSSProperties;
}

/** For components whose `style` prop is already a visual variant: `sx` covers custom styles. */
export type RdsStylingPropsWithoutStyle = Omit<RdsStylingProps, 'style'>;

/** Joins class names, skipping empty values. */
export const joinClassNames = (...names: Array<string | false | null | undefined>): string =>
  names.filter(Boolean).join(' ');

/** Merges `sx` values (objects, arrays or functions) into one `sx` array. */
export const mergeSx = (...items: Array<SxProps<Theme> | false | null | undefined>): SxProps<Theme> =>
  items.flatMap((item) => (!item ? [] : Array.isArray(item) ? item : [item])) as SxProps<Theme>;
