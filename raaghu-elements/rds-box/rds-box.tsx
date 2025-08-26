import React from 'react';
import {
  Box as MuiBox,
  type BoxProps
} from '@mui/material';

export interface RdsBoxProps extends BoxProps {
  children?: React.ReactNode;
}

const RdsBox = ({
  children,
  ...props
}:RdsBoxProps) => {
  return (
    <MuiBox {...props}>
      {children}
    </MuiBox>
  );
};

RdsBox.displayName = 'RdsBox';
export default RdsBox;
