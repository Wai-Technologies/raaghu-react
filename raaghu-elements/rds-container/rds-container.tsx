import React from 'react';
import {
  Container as MuiContainer,
  ContainerProps
} from '@mui/material';

export interface RdsContainerProps extends ContainerProps {
  children: React.ReactNode;
  padding?: number | string;
}

const RdsContainer: React.FC<RdsContainerProps> = ({
  children,
  padding,
  sx,
  ...props
}) => {
  const paddingSx = padding === undefined ? {} : padding ? { padding } : {};

  return (
    <MuiContainer
      data-rds-container-padding={padding === undefined && !(sx && typeof sx === 'object' && ('padding' in sx || 'p' in sx || 'px' in sx || 'py' in sx)) ? 'applied' : undefined}
      style={{
        ...(props.style as React.CSSProperties),
        ...(padding === undefined && !(sx && typeof sx === 'object' && ('padding' in sx || 'p' in sx || 'px' in sx || 'py' in sx))
          ? { padding: 'var(--rds-container-padding)' }
          : {}),
      }}
      sx={{
        ...paddingSx,
        ...sx,
      }}
      {...props}
    >
      {children}
    </MuiContainer>
  );
};

RdsContainer.displayName = 'RdsContainer';
export default RdsContainer;
