import type { ElementType } from 'react';
import { Typography as MuiTypography, type TypographyProps } from '@mui/material';
import clsx from 'clsx';
import { warnDeprecatedProp } from '../shared/utils/deprecation';
import './rds-typography.scss';

/** MUI `Typography` with Raaghu styling. Use `component` to pick the element (e.g. `variant="h4" component="h2"`). */
export interface RdsTypographyProps extends Omit<TypographyProps, 'component'> {
  /** Element or component to render as (defaults to the variant mapping). */
  component?: ElementType;
  /** @deprecated Use `children` instead. */
  text?: string;
}

const RdsTypography = ({
  text,
  variant,
  className = '',
  children,
  ...props
}: RdsTypographyProps) => {
  if (text !== undefined) warnDeprecatedProp('RdsTypography', 'text', '`children`');
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
