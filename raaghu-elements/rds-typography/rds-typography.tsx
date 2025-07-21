import React from 'react';
import { Typography as MuiTypography, TypographyProps } from '@mui/material';

export interface RdsTypographyProps extends TypographyProps {
  text?: string;
}

const RdsTypography: React.FC<RdsTypographyProps> = ({
  text,
  children,
  ...props
}) => {
  return (
    <MuiTypography {...props}>
      {text || children}
    </MuiTypography>
  );
};

export default RdsTypography;
