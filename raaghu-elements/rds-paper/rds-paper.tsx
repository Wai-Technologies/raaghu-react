import { type ReactNode } from 'react';
import { Paper as MuiPaper, type PaperProps } from '@mui/material';

/** Props for {@link RdsPaper}. Extends MUI `PaperProps` (except `component`). */
export interface RdsPaperProps extends Omit<PaperProps, 'component'> {
  /** Content rendered inside the paper surface. */
  children: ReactNode;
  /** Inner padding. A number is multiplied by 8px; a string is used as-is (e.g. `'1rem'`). */
  padding?: number | string;
}

/**
 * Surface container built on MUI `Paper`, with an optional `padding` shorthand.
 * All other MUI `Paper` props (`elevation`, `variant`, `square`, `sx`, ...) are forwarded.
 */
const RdsPaper = ({
  children,
  padding,
  square = false,
  sx,
  ...props
}: RdsPaperProps) => {
  return (
    <MuiPaper
      square={square}
      sx={[
        padding !== undefined && { padding: typeof padding === 'number' ? `${padding * 8}px` : padding },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...props}
    >
      {children}
    </MuiPaper>
  );
};
RdsPaper.displayName = 'RdsPaper';
export default RdsPaper;
