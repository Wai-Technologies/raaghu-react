
import React from 'react';
import { Typography as MuiTypography, type TypographyProps } from '@mui/material';
import './rds-typography.scss';

export interface RdsTypographyProps extends TypographyProps {
  text?: string;
}

const RdsTypography = ({
  text,
  variant,
  className = '',
  children,
  ...props
}: RdsTypographyProps) => {
  // Map MUI variant to SCSS class
  const variantClass = variant ? `rds-typography rds-typography--${variant}` : 'rds-typography';
  return (
    <MuiTypography
      variant={variant}
      className={`${variantClass} ${className}`.trim()}
      {...props}
    >
      {text || children}
    </MuiTypography>
  );
};
RdsTypography.displayName = 'RdsTypography';
export default RdsTypography;
