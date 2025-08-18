import React from 'react';
import {
  Box as MuiBox,
  BoxProps
} from '@mui/material';

export interface RdsBoxProps extends BoxProps {
  children?: React.ReactNode;
}

const RdsBox: React.FC<RdsBoxProps> = ({
  children,
  ...props
}) => {
  return (
    <MuiBox {...props}>
      {children}
    </MuiBox>
  );
};

RdsBox.displayName = 'RdsBox';
export default RdsBox;
