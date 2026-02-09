import React from 'react';
import {
  Box as MuiBox,
  type BoxProps
} from '@mui/material';
import './rds-box.scss';

export interface RdsBoxProps extends BoxProps {
  children?: React.ReactNode;
}

const RdsBox = ({
  children,
  className,
  ...props
}:RdsBoxProps & { className?: string }) => {
  const mergedClassName = ['rds-box', className].filter(Boolean).join(' ');

  return (
    <MuiBox className={mergedClassName} {...props}>
      {children}
    </MuiBox>
  );
};

RdsBox.displayName = 'RdsBox';
export default RdsBox;
