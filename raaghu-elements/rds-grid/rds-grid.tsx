import React from 'react';
import {
  Grid as MuiGrid,
  GridProps
} from '@mui/material';

export interface RdsGridProps extends GridProps {
  children: React.ReactNode;
}

const RdsGrid: React.FC<RdsGridProps> = ({
  children,
  ...props
}) => {
  return (
    <MuiGrid {...props}>
      {children}
    </MuiGrid>
  );
};
RdsGrid.displayName = 'RdsGrid';
export default RdsGrid;
