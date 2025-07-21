import React from 'react';
import { Divider as MuiDivider, DividerProps } from '@mui/material';

export interface RdsDividerProps extends DividerProps {
  text?: string;
  position?: 'left' | 'center' | 'right';
}

const RdsDivider: React.FC<RdsDividerProps> = ({
  text,
  position = 'center',
  children,
  ...props
}) => {
  const content = text || children;
  
  if (content) {
    return (
      <MuiDivider textAlign={position} {...props}>
        {content}
      </MuiDivider>
    );
  }
  
  return <MuiDivider {...props} />;
};

export default RdsDivider;
