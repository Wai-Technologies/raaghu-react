import React from 'react';

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
  // Note: `actions` is usually an array of action configs (e.g. Speed Dial), not a ReactNode slot.
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
  // Plain objects from Storybook object controls (e.g. `{}`)
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
    if (isUnsafeReactChild(next[key])) {
      next[key] = undefined;
    }
  }

  // Item/action trees often carry JSX icons that become `{}` when edited.
  for (const key of ['items', 'options', 'menuItems', 'navItems', 'tabs', 'actions'] as const) {
    if (key in next) {
      next[key] = sanitizeNestedTree(next[key]);
    }
  }

  return next as T;
};

/**
 * Shared argTypes: hide non-serializable ReactNode slot editors in Controls.
 * `children` is omitted so stories can keep a text control when content is a string.
 */
export const reactNodeArgTypes = Object.fromEntries(
  REACT_NODE_ARG_KEYS.filter((key) => key !== 'children').map((key) => [
    key,
    {
      control: false,
    },
  ]),
);
