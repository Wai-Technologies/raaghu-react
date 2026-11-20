import React from 'react';
import type { ArgTypesEnhancer, StrictArgTypes } from 'storybook/internal/types';
import type { ReactRenderer } from '@storybook/react-vite';

export const REACT_NODE_ARG_KEYS = [
  'children',
  'logo',
  'header',
  'footer',
  'icon',
  'startIcon',
  'endIcon',
  'changeLeftIcon',
  'changeRightIcon',
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

const NESTED_REACT_NODE_KEYS = ['icon', 'startIcon', 'endIcon', 'avatar', 'logo'] as const;

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' &&
  value !== null &&
  !Array.isArray(value) &&
  !React.isValidElement(value);

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

const REACT_NODE_TYPE = /^(React\.)?(ReactNode|ReactElement|JSX\.Element)\b/;

const typeSummary = (argTypes: StrictArgTypes | undefined, key: string): string => {
  const argType = argTypes?.[key];
  const summary = argType?.table?.type?.summary ?? (argType?.type as { value?: unknown } | undefined)?.value;
  return typeof summary === 'string' ? summary.trim() : '';
};

const isReactNodeArg = (argTypes: StrictArgTypes | undefined, key: string): boolean =>
  REACT_NODE_TYPE.test(typeSummary(argTypes, key));

export const sanitizeReactNodeArgs = <T extends Record<string, unknown>>(
  args: T,
  argTypes?: StrictArgTypes,
  fallback: Record<string, unknown> = {},
): T => {
  if (!args || typeof args !== 'object') return args;

  const next = { ...args } as Record<string, unknown>;
  const nodeKeys = new Set<string>([
    ...REACT_NODE_ARG_KEYS,
    ...Object.keys(next).filter((key) => isReactNodeArg(argTypes, key)),
  ]);

  for (const key of nodeKeys) {
    if (!(key in next)) continue;
    const value = next[key];
    if (isPlainObject(value) ? Object.keys(value).length === 0 : isUnsafeReactChild(value)) {
      next[key] = isUnsafeReactChild(fallback[key]) ? undefined : fallback[key];
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
  fallback: Record<string, unknown> = {},
): T => {
  const next = { ...args } as Record<string, unknown>;
  for (const [key, value] of Object.entries(next)) {
    if (value == null || Array.isArray(value)) continue;
    if (ARRAY_TYPE.test(typeSummary(argTypes, key)) || argTypes[key]?.type?.name === 'array') {
      next[key] = Array.isArray(fallback[key]) ? fallback[key] : undefined;
    }
  }
  return next as T;
};

const NO_CONTROL_KEYS = new Set<string>(REACT_NODE_ARG_KEYS.filter((key) => key !== 'children'));
const HIDDEN_KEYS = new Set(['ref', 'component', 'slots', 'slotProps', 'container']);

export const reactNodeArgTypesEnhancer: ArgTypesEnhancer<ReactRenderer> = ({ argTypes }) =>
  Object.fromEntries(
    Object.entries(argTypes).map(([name, argType]) => {
      if (HIDDEN_KEYS.has(name) && (!argType.control || (typeof argType.control === 'object' && argType.control.disable))) {
        return [name, { ...argType, table: { ...argType.table, disable: true } }];
      }
      if ((NO_CONTROL_KEYS.has(name) || (name !== 'children' && isReactNodeArg(argTypes as StrictArgTypes, name))) && argType.control === undefined) {
        return [name, { ...argType, control: false }];
      }
      return [name, argType];
    }),
  );
