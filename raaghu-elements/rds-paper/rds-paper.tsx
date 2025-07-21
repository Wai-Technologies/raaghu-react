import React from 'react';
import { Paper as MuiPaper, PaperProps } from '@mui/material';

export interface RdsPaperProps extends PaperProps {
  children: React.ReactNode;
  padding?: number | string;
}

const RdsPaper: React.FC<RdsPaperProps> = ({
  children,
  padding,
  sx,
  ...props
}) => {
  return (
    <MuiPaper
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

export default RdsPaper;
