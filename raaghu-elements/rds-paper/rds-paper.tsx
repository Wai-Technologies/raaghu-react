import { type ReactNode } from 'react';
import { Paper as MuiPaper, type PaperProps } from '@mui/material';

export interface RdsPaperProps extends PaperProps {
  children: ReactNode;
  padding?: number | string;
  square?: boolean;
}

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
      sx={{
        ...(padding && { padding: typeof padding === 'number' ? `${(padding as number) * 8}px` : padding }),
        ...sx,
      }}
      {...props}
    >
      {children}
    </MuiPaper>
  );
};
RdsPaper.displayName = 'RdsPaper';
export default RdsPaper;
