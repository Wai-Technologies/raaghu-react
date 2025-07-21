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
  return (
    <MuiContainer
      sx={{
        ...(padding && { padding }),
        ...sx,
      }}
      {...props}
    >
      {children}
    </MuiContainer>
  );
};

export default RdsContainer;
