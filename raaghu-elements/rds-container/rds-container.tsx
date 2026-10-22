import type { ReactNode } from 'react';
import {
  Container as MuiContainer,
  type ContainerProps
} from '@mui/material';
import { warnDeprecatedProp } from '../shared/utils/deprecation';

export interface RdsContainerProps extends Omit<ContainerProps, 'component'> {
  children: ReactNode;
  /** @deprecated Use `sx` instead. Padding on all sides (theme spacing for numbers, any CSS length for strings). `0` removes the padding. */
  padding?: number | string;
}

const RdsContainer = ({
  children,
  padding,
  sx,
  ...props
}: RdsContainerProps) => {
  if (padding !== undefined) warnDeprecatedProp('RdsContainer', 'padding', '`sx`');
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
      {...props}
    >
      {children}
    </MuiContainer>
  );
};

RdsContainer.displayName = 'RdsContainer';
export default RdsContainer;
