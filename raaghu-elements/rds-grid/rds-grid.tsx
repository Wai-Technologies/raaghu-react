import { type ReactNode } from 'react';
import {
  Grid as MuiGrid,
  type GridProps
} from '@mui/material';
import clsx from 'clsx';
import './rds-grid.scss';

export interface RdsGridProps extends Omit<GridProps, 'component'> {
  children?: ReactNode;
}

const RdsGrid = ({
  children,
  ...props
}: RdsGridProps) => {
  const className = clsx('rds-grid', props.className);
  return (
    <MuiGrid {...props} className={className}>
      {children}
    </MuiGrid>
  );
};
RdsGrid.displayName = 'RdsGrid';
export default RdsGrid;
