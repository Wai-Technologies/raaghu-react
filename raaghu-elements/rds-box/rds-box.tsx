import { type ReactNode } from 'react';
import {
  Box as MuiBox,
  type BoxProps
} from '@mui/material';
import clsx from 'clsx';
import './rds-box.scss';

export interface RdsBoxProps extends Omit<BoxProps, 'component'> {
  children?: ReactNode;
}

const RdsBox = ({
  children,
  className,
  ...props
}: RdsBoxProps) => {
  const mergedClassName = clsx('rds-box', className);

  return (
    <MuiBox className={mergedClassName} {...props}>
      {children}
    </MuiBox>
  );
};

RdsBox.displayName = 'RdsBox';
export default RdsBox;
