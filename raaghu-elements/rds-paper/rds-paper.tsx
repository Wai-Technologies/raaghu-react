import React from 'react';
import { Paper as MuiPaper, PaperProps } from '@mui/material';

export interface RdsPaperProps extends PaperProps {
  children: React.ReactNode;
  padding?: number | string;
  square?: boolean;
}

const RdsPaper: React.FC<RdsPaperProps> = ({
  children,
  padding,
  square = false,
  sx,
  ...props
}) => {
  return (
    <MuiPaper
      square={square}
      sx={{
        ...(padding && { padding }),
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
