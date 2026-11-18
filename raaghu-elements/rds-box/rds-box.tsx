import React from 'react';
import {
  Box as MuiBox,
  type BoxProps
} from '@mui/material';
import './rds-box.scss';

export interface RdsBoxProps extends BoxProps {
  children?: React.ReactNode;
}

const RdsBox = React.forwardRef<HTMLDivElement, RdsBoxProps>(({
  children,
  className,
  ...props
}, ref) => {
  const mergedClassName = ['rds-box', className].filter(Boolean).join(' ');

  return (
    <MuiBox ref={ref} className={mergedClassName} {...props}>
      {children}
    </MuiBox>
  );
});

RdsBox.displayName = 'RdsBox';
export default RdsBox;
