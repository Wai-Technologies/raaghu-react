import React, { useState } from 'react';
import { ToggleButton as MuiToggleButton, ToggleButtonProps } from '@mui/material';
import './rds-toggle-button.scss';

export interface RdsStandaloneToggleButtonProps extends Omit<ToggleButtonProps, 'value'> {
  /** The value of the toggle button (used for identification) */
  value?: string;
  /** Whether the button is selected (controlled mode) */
  selected?: boolean;
  /** Callback fired when the button state changes */
  onChange?: (event: React.MouseEvent<HTMLElement>, selected: boolean) => void;
  /** Content to render inside the button */
  children?: React.ReactNode;
}

const RdsStandaloneToggleButton: React.FC<RdsStandaloneToggleButtonProps> = ({
  selected: controlledSelected,
  onChange,
  children,
  ...props
}) => {
  // State for internal management (uncontrolled mode)
  const [internalSelected, setInternalSelected] = useState(false);
  
  // Determine if component is controlled
  const isControlled = controlledSelected !== undefined;
  const selected = isControlled ? controlledSelected : internalSelected;

  const handleChange = (event: React.MouseEvent<HTMLElement>) => {
    const newSelected = !selected;
    
    // Update internal state if uncontrolled
    if (!isControlled) {
      setInternalSelected(newSelected);
    }
    
    // Call onChange handler
    onChange?.(event, newSelected);
  };

  return (
    <div className="rds-toggle-button rds-toggle-button--standalone">
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
    </div>
  );
};

export default RdsStandaloneToggleButton;
