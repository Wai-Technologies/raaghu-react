import React from 'react';
import { Paper as MuiPaper, PaperProps } from '@mui/material';
import { mergeSx } from '../shared/utils/styling-props';

export interface RdsPaperProps extends PaperProps {
  children: React.ReactNode;
  padding?: number | string;
  square?: boolean;
}

const RdsPaper = React.forwardRef<HTMLDivElement, RdsPaperProps>(function RdsPaper({
  children,
  padding,
  square = false,
  sx,
  ...props
}, ref) {
  return (
    <MuiPaper
      ref={ref}
      square={square}
      sx={mergeSx({
        ...(padding && { padding: typeof padding === 'number' ? `${(padding as number) * 8}px` : padding }),
      }, sx)}
      {...props}
    >
      {children}
    </MuiPaper>
  );
});
RdsPaper.displayName = 'RdsPaper';
export default RdsPaper;
