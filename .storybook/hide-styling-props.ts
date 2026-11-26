import type { ArgTypes, StrictInputType } from 'storybook/internal/types';

/**
 * Every element/component accepts `className`, `sx`, `style` and `ref` for custom styling,
 * but these are developer hooks, not design options, so they are hidden from the
 * Storybook Controls panel and docs table.
 *
 * `style` is only hidden when it is the CSS `style` prop (CSSProperties); several
 * components use `style` as a visual-variant prop and keep that control.
 */
const ALWAYS_HIDDEN = new Set(['sx', 'className', 'ref']);

const isCssStyleProp = (argType: StrictInputType | undefined): boolean => {
  const summary = String(argType?.table?.type?.summary ?? argType?.type?.name ?? '');
  // Pure CSS style only: a union with variant names (e.g. 'filled' | CSSProperties) stays visible.
  return /CSSProperties/.test(summary) && !/['"]/.test(summary);
};

export const hideStylingPropsEnhancer = (context: { argTypes: ArgTypes }): ArgTypes => {
  const argTypes: ArgTypes = { ...context.argTypes };
  for (const [name, argType] of Object.entries(argTypes)) {
    if (ALWAYS_HIDDEN.has(name) || (name === 'style' && isCssStyleProp(argType as StrictInputType))) {
      argTypes[name] = {
        ...argType,
        control: false,
        table: { ...(argType?.table ?? {}), disable: true },
      };
    }
  }
  return argTypes;
};
