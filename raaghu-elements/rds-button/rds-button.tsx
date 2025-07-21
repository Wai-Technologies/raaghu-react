import React from 'react';
import { Button as MuiButton, ButtonProps } from '@mui/material';

export interface RdsButtonProps extends ButtonProps {
  label?: string;
  isLoading?: boolean;
  iconPosition?: 'start' | 'end';
}

const RdsButton: React.FC<RdsButtonProps> = ({
  label,
  children,
  isLoading = false,
  iconPosition = 'start',
  disabled,
  ...props
}) => {
  return (
    <MuiButton
      disabled={disabled || isLoading}
      {...props}
    >
      {label || children}
    </MuiButton>
  );
};

export default RdsButton;
