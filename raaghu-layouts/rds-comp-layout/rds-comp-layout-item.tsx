import { type ReactNode } from 'react';
import { Box, BoxProps } from '@mui/material';

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
  ...props
}) => {
  const itemClass = `rds-layout-item ${className || ''}`;

  return (
    <Box
      className={itemClass}
      sx={{
        flex,
        order,
        alignSelf,
        ...props.sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

export default RdsCompLayoutItem;
