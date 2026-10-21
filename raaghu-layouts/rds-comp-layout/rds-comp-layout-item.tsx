import { type ReactNode } from 'react';
import { Box, BoxProps } from '@mui/material';
import clsx from 'clsx';

export interface RdsCompLayoutItemProps extends BoxProps {
  children?: ReactNode;
  flex?: string | number;
  order?: number;
  alignSelf?: 'auto' | 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
}

const RdsCompLayoutItem = ({
  children,
  flex,
  order,
  alignSelf,
  className,
  sx,
  ...props
}: RdsCompLayoutItemProps) => (
  <Box
    {...props}
    className={clsx('rds-layout-item', className)}
    sx={[{ flex, order, alignSelf }, ...(Array.isArray(sx) ? sx : [sx])]}
  >
    {children}
  </Box>
);

RdsCompLayoutItem.displayName = 'RdsCompLayoutItem';
export default RdsCompLayoutItem;
