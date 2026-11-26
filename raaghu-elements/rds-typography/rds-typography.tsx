import { forwardRef } from 'react';
import { Typography as MuiTypography, type TypographyProps } from '@mui/material';
import './rds-typography.scss';

export interface RdsTypographyProps extends TypographyProps {
  text?: string;
}

const RdsTypography = forwardRef<HTMLElement, RdsTypographyProps>(function RdsTypography({
  text,
  variant,
  className = '',
  children,
  ...props
}, ref) {
  const variantClass = variant ? `rds-typography rds-typography--${variant}` : 'rds-typography';
  return (
   <MuiTypography
      variant={variant}
      className={`${variantClass} ${className}`.trim()}
      {...props}
      ref={ref}
    >
      {text || children}
    </MuiTypography>
  );
});
RdsTypography.displayName = 'RdsTypography';
export default RdsTypography;
