import React from 'react';
import { IconButton as MuiIconButton, IconButtonProps } from '@mui/material';

export interface RdsIconButtonProps extends IconButtonProps {
  icon?: React.ReactNode;
  tooltip?: string;
}

const RdsIconButton: React.FC<RdsIconButtonProps> = ({
  icon,
  children,
  tooltip,
  ...props
}) => {
  const buttonContent = icon || children;
  
  return (
    <MuiIconButton
      title={tooltip}
      {...props}
    >
      {buttonContent}
    </MuiIconButton>
  );
};

export default RdsIconButton;
