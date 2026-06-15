import React from 'react';
import {
  Grid as MuiGrid,
  GridProps
} from '@mui/material';
import './rds-grid.scss';

export interface RdsGridProps extends GridProps {
  children?: React.ReactNode;
}

const RdsGrid: React.FC<RdsGridProps> = ({
  children,
  ...props
}) => {
  const className = `rds-grid${props.className ? ' ' + props.className : ''}`;
  return (
    <MuiGrid {...props} className={className}>
      {children}
    </MuiGrid>
  );
};
RdsGrid.displayName = 'RdsGrid';
export default RdsGrid;
