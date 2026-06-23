import { useState, type MouseEvent, type ReactNode } from 'react';
import { ToggleButton as MuiToggleButton, ToggleButtonProps } from '@mui/material';
import './rds-toggle-button.scss';

export interface RdsStandaloneToggleButtonProps extends Omit<ToggleButtonProps, 'value' | 'component'> {
  value?: string;
  selected?: boolean;
  onChange?: (event: MouseEvent<HTMLElement>, selected: boolean) => void;
  children?: ReactNode;
}

const RdsStandaloneToggleButton = ({
  selected: controlledSelected,
  onChange,
  children,
  ...props
}: RdsStandaloneToggleButtonProps) => {
  const [internalSelected, setInternalSelected] = useState(false);
  
  const isControlled = controlledSelected !== undefined;
  const selected = isControlled ? controlledSelected : internalSelected;

  const handleChange = (event: MouseEvent<HTMLElement>) => {
    const newSelected = !selected;
    
    if (!isControlled) {
      setInternalSelected(newSelected);
    }
    
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

RdsStandaloneToggleButton.displayName = 'RdsStandaloneToggleButton';
