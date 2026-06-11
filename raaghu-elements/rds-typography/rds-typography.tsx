import { Typography as MuiTypography, type TypographyProps } from '@mui/material';
import clsx from 'clsx';
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
  const variantClass = variant ? `rds-typography rds-typography--${variant}` : 'rds-typography';
  return (
   <MuiTypography
      variant={variant}
      className={clsx(variantClass, className)}
      {...props}
    >
      {text || children}
    </MuiTypography>
  );
};
RdsTypography.displayName = 'RdsTypography';
export default RdsTypography;
