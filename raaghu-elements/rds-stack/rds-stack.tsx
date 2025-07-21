import React from 'react';
import {
  Stack as MuiStack,
  StackProps
} from '@mui/material';

export interface RdsStackProps extends StackProps {
  children: React.ReactNode;
  gap?: number | string;
}

const RdsStack: React.FC<RdsStackProps> = ({
  children,
  gap,
  spacing,
  ...props
}) => {
  return (
    <MuiStack
      spacing={spacing || gap}
      {...props}
    >
      {children}
    </MuiStack>
  );
};

export default RdsStack;
