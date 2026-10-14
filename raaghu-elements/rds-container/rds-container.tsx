import type { ReactNode } from 'react';
import {
  Container as MuiContainer,
  type ContainerProps
} from '@mui/material';

export interface RdsContainerProps extends Omit<ContainerProps, 'component'> {
  children: ReactNode;
  /** Padding on all sides (theme spacing for numbers, any CSS length for strings). `0` removes the padding. */
  padding?: number | string;
}

const RdsContainer = ({
  children,
  padding,
  sx,
  ...props
}: RdsContainerProps) => {
  // The default padding is used when neither `padding` nor a plain-object `sx` with
  // `padding`/`p`/`px`/`py` is given. Array and function `sx` are not inspected, so the
  // default padding still applies with them (it is inline and wins over their padding).
  const applyDefaultPadding =
    padding === undefined &&
    !(sx && typeof sx === 'object' && ('padding' in sx || 'p' in sx || 'px' in sx || 'py' in sx));

  return (
    <MuiContainer
      data-rds-container-padding={applyDefaultPadding ? 'applied' : undefined}
      style={applyDefaultPadding ? { padding: 'var(--rds-container-padding)' } : undefined}
      sx={[
        padding !== undefined && { padding },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      // Spread last on purpose: a consumer `style` replaces the default padding style.
      {...props}
    >
      {children}
    </MuiContainer>
  );
};

RdsContainer.displayName = 'RdsContainer';
export default RdsContainer;
