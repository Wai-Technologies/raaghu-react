import {
  Grid as MuiGrid,
  type GridProps
} from '@mui/material';
import clsx from 'clsx';
import './rds-grid.scss';

/**
 * Props for RdsGrid. Same as MUI `GridProps`, including the polymorphic
 * `component` prop (e.g. `component="section"` or `component="ul"`).
 */
export type RdsGridProps = GridProps;

/** Responsive layout grid (thin wrapper around MUI `Grid`) that adds the `rds-grid` class. */
const RdsGrid = ({
  children,
  className,
  ...props
}: RdsGridProps) => {
  return (
    <MuiGrid {...props} className={clsx('rds-grid', className)}>
      {children}
    </MuiGrid>
  );
};
RdsGrid.displayName = 'RdsGrid';
export default RdsGrid;
