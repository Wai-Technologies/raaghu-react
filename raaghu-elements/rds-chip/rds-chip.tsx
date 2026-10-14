import type { ElementType } from 'react';
import { Chip as MuiChip, type ChipProps, type ChipTypeMap } from '@mui/material';

/**
 * Props for {@link RdsChip}: every MUI `Chip` prop, passed through unchanged.
 *
 * `C` is the root element type. It defaults to `'div'` (MUI's default) and is
 * inferred from `component`, so `component="a"` accepts `href`, `target`, etc.
 *
 * @see https://v7.mui.com/material-ui/api/chip/
 */
export type RdsChipProps<C extends ElementType = ChipTypeMap['defaultComponent']> = ChipProps<
  C,
  {
    /** Root element or component to render, e.g. `"a"` together with `href` for a link chip. */
    component?: C;
  }
>;

/**
 * Compact element for an input, attribute or action (thin wrapper around MUI `Chip`).
 *
 * @example
 * <RdsChip label="Tag" onDelete={handleDelete} />
 * <RdsChip label="Docs" component="a" href="/docs" clickable />
 */
const RdsChip = <C extends ElementType = ChipTypeMap['defaultComponent']>(props: RdsChipProps<C>) => {
  return <MuiChip {...props} />;
};

RdsChip.displayName = 'RdsChip';
export default RdsChip;
