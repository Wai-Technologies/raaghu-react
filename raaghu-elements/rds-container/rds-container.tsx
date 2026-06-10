import { type ReactNode, type CSSProperties } from 'react';
import {
  Container as MuiContainer,
  type ContainerProps
} from '@mui/material';

export interface RdsContainerProps extends ContainerProps {
  children: ReactNode;
  padding?: number | string;
}

const RdsContainer = ({
  children,
  padding,
  sx,
  ...props
}: RdsContainerProps) => {
  return (
    <MuiContainer
      data-rds-container-padding={padding === undefined && !(sx && typeof sx === 'object' && ('padding' in sx || 'p' in sx || 'px' in sx || 'py' in sx)) ? 'applied' : undefined}
      style={{
        ...(props.style as CSSProperties),
        ...(padding === undefined && !(sx && typeof sx === 'object' && ('padding' in sx || 'p' in sx || 'px' in sx || 'py' in sx))
          ? { padding: 'var(--rds-container-padding)' }
          : {}),
      }}
      sx={{
        ...(padding !== undefined ? (padding ? { padding } : {}) : {}),
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
