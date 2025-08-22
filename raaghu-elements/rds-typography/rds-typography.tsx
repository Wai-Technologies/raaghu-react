import React from 'react';
import { Typography as MuiTypography, type TypographyProps } from '@mui/material';

export interface RdsTypographyProps extends TypographyProps {
  text?: string;
}

const RdsTypography = ({
  text,
  children,
  ...props
}:RdsTypographyProps) => {
  return (
    <MuiTypography {...props}>
      {text || children}
    </MuiTypography>
  );
};
RdsTypography.displayName = 'RdsTypography';
export default RdsTypography;
