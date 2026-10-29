import React from 'react';
import type { ArgTypesEnhancer, StrictArgTypes } from 'storybook/internal/types';
import type { ReactRenderer } from '@storybook/react-vite';

/**
 * Prop names that are typically ReactNode slots. Storybook infers these as
 * `object` controls; editing them often yields `{}`, which React cannot render.
 */
export const REACT_NODE_ARG_KEYS = [
  'children',
  'logo',
  'header',
  'footer',
  'icon',
  'startIcon',
  'endIcon',
  'subHeader',
  'sidebar',
  'topbar',
  'avatar',
  'badgeContent',
  'trigger',
  'indicator',
  'leftAddon',
  'rightAddon',
  'prefix',
  'suffix',
] as const;

/** Nested keys on item/option trees that often hold JSX icons. */
const NESTED_REACT_NODE_KEYS = ['icon', 'startIcon', 'endIcon', 'avatar', 'logo'] as const;

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' &&
  value !== null &&
  !Array.isArray(value) &&
  !React.isValidElement(value);

/**
 * True when a value would throw if used as a React child
 * ("Objects are not valid as a React child").
 */
export const isUnsafeReactChild = (value: unknown): boolean => {
  if (value == null || typeof value === 'boolean') return false;
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'bigint') {
    return false;
  }
  if (typeof value === 'function') return false;
  if (React.isValidElement(value)) return false;
  if (Array.isArray(value)) return value.some(isUnsafeReactChild);
  return isPlainObject(value);
};

const sanitizeNestedTree = (value: unknown): unknown => {
  if (Array.isArray(value)) {
    return value.map(sanitizeNestedTree);
  }
  if (!isPlainObject(value)) {
    return value;
  }

  const next: Record<string, unknown> = { ...value };
  for (const key of NESTED_REACT_NODE_KEYS) {
    if (key in next && isUnsafeReactChild(next[key])) {
      next[key] = undefined;
    }
  }
  if (Array.isArray(next.children)) {
    next.children = next.children.map(sanitizeNestedTree);
  }
  if (Array.isArray(next.items)) {
    next.items = next.items.map(sanitizeNestedTree);
  }
  return next;
};

/**
 * Strip Storybook object-control artifacts (`{}`) from ReactNode args so
 * canvases do not crash when users click Controls.
 */
export const sanitizeReactNodeArgs = <T extends Record<string, unknown>>(args: T): T => {
  if (!args || typeof args !== 'object') return args;

  const next = { ...args } as Record<string, unknown>;

  for (const key of REACT_NODE_ARG_KEYS) {
    if (!(key in next)) continue;
    const value = next[key];
    if (isPlainObject(value) ? Object.keys(value).length === 0 : isUnsafeReactChild(value)) {
      next[key] = undefined;
    }
  }

  for (const key of ['items', 'options', 'menuItems', 'navItems', 'tabs', 'actions'] as const) {
    if (key in next) {
      next[key] = sanitizeNestedTree(next[key]);
    }
  }

  return next as T;
};

const ARRAY_TYPE = /(\[\]|^(readonly\s+)?Array<.*>)\s*(\|\s*(undefined|null)\s*)*$/;

/**
 * Array props get an object editor in Controls, which can hand the component
 * `{}` and crash `.map` calls. Drop any non-array value for array-typed props.
 */
export const sanitizeArrayArgs = <T extends Record<string, unknown>>(
  args: T,
  argTypes: StrictArgTypes,
): T => {
  const next = { ...args } as Record<string, unknown>;
  for (const [key, value] of Object.entries(next)) {
    if (value == null || Array.isArray(value)) continue;
    const typeText = argTypes[key]?.table?.type?.summary;
    if (typeof typeText === 'string' && ARRAY_TYPE.test(typeText.trim())) {
      next[key] = undefined;
    }
  }
  return next as T;
};

const NO_CONTROL_KEYS = new Set<string>(REACT_NODE_ARG_KEYS.filter((key) => key !== 'children'));
const HIDDEN_KEYS = new Set(['ref', 'component', 'slots', 'slotProps', 'container']);

/**
 * Only touches props the component actually has, so components never show
 * rows for props they do not accept. ReactNode slots keep a docs row without an
 * editor; MUI plumbing props are hidden unless a story gives them a real control.
 */
export const reactNodeArgTypesEnhancer: ArgTypesEnhancer<ReactRenderer> = ({ argTypes }) =>
  Object.fromEntries(
    Object.entries(argTypes).map(([name, argType]) => {
      if (HIDDEN_KEYS.has(name) && (!argType.control || (typeof argType.control === 'object' && argType.control.disable))) {
        return [name, { ...argType, table: { ...argType.table, disable: true } }];
      }
      if (NO_CONTROL_KEYS.has(name) && argType.control === undefined) {
        return [name, { ...argType, control: false }];
      }
      return [name, argType];
    }),
  );
