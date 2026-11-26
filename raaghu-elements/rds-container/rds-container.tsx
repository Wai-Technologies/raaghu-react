import React from 'react';
import {
  Container as MuiContainer,
  ContainerProps
} from '@mui/material';
import { mergeSx } from '../shared/utils/styling-props';

export interface RdsContainerProps extends ContainerProps {
  children: React.ReactNode;
  padding?: number | string;
}

const RdsContainer = React.forwardRef<HTMLDivElement, RdsContainerProps>(function RdsContainer({
  children,
  padding,
  sx,
  style,
  ...props
}, ref) {
  const paddingSx = padding === undefined ? {} : padding ? { padding } : {};

  return (
    <MuiContainer
      ref={ref}
      data-rds-container-padding={padding === undefined && !(sx && typeof sx === 'object' && ('padding' in sx || 'p' in sx || 'px' in sx || 'py' in sx)) ? 'applied' : undefined}
      style={{
        ...(padding === undefined && !(sx && typeof sx === 'object' && ('padding' in sx || 'p' in sx || 'px' in sx || 'py' in sx))
          ? { padding: 'var(--rds-container-padding)' }
          : {}),
        ...style,
      }}
      sx={mergeSx(paddingSx, sx)}
      {...props}
    >
      {children}
    </MuiContainer>
  );
});

RdsContainer.displayName = 'RdsContainer';
export default RdsContainer;
