import React, { useState } from 'react';
import { Box, ToggleButton as MuiToggleButton, ToggleButtonProps } from '@mui/material';
import './rds-toggle-button.scss';

export interface RdsStandaloneToggleButtonProps extends Omit<ToggleButtonProps, 'value'> {
  value?: string;
  selected?: boolean;
  onChange?: (event: React.MouseEvent<HTMLElement>, selected: boolean) => void;
  children?: React.ReactNode;
}

const RdsStandaloneToggleButton = React.forwardRef<HTMLDivElement, RdsStandaloneToggleButtonProps>(function RdsStandaloneToggleButton({
  selected: controlledSelected,
  onChange,
  children,
  className,
  sx,
  style,
  ...props
}, ref) {
  const [internalSelected, setInternalSelected] = useState(false);
  
  const isControlled = controlledSelected !== undefined;
  const selected = isControlled ? controlledSelected : internalSelected;

  const handleChange = (event: React.MouseEvent<HTMLElement>) => {
    const newSelected = !selected;
    
    if (!isControlled) {
      setInternalSelected(newSelected);
    }
    
    onChange?.(event, newSelected);
  };

  return (
    <Box
      ref={ref}
      className={`rds-toggle-button rds-toggle-button--standalone${className ? ` ${className}` : ''}`}
      sx={sx}
      style={style}
    >
      <MuiToggleButton
        value="standalone"
        selected={selected}
        onChange={handleChange}
        className="rds-toggle-button__button"
        aria-pressed={selected}
        {...props}
      >
        {children}
      </MuiToggleButton>
    </Box>
  );
});

export default RdsStandaloneToggleButton;

RdsStandaloneToggleButton.displayName = 'RdsStandaloneToggleButton';
