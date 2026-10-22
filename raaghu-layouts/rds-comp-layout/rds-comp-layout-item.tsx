import { type ReactNode } from 'react';
import { Box, BoxProps } from '@mui/material';
import clsx from 'clsx';

/** `flex`, `order` and `alignSelf` come from the MUI Box system props. */
export interface RdsCompLayoutItemProps extends BoxProps {
  children?: ReactNode;
}

const RdsCompLayoutItem = ({
  children,
  className,
  ...props
}: RdsCompLayoutItemProps) => (
  <Box {...props} className={clsx('rds-layout-item', className)}>
    {children}
  </Box>
);

RdsCompLayoutItem.displayName = 'RdsCompLayoutItem';
export default RdsCompLayoutItem;
