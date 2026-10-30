import { useState, type MouseEvent, type ReactNode } from 'react';
import { ToggleButton as MuiToggleButton, ToggleButtonProps } from '@mui/material';
import clsx from 'clsx';
import './rds-toggle-button.scss';

/** Props for RdsStandaloneToggleButton, a single self-toggling MUI ToggleButton. */
export interface RdsStandaloneToggleButtonProps extends Omit<ToggleButtonProps, 'value' | 'component'> {
  /** Value passed to the underlying ToggleButton. */
  value?: string;
  /** Controlled selected state; omit for uncontrolled. */
  selected?: boolean;
  /** Called with the new selected state when toggled. */
  onChange?: (event: MouseEvent<HTMLElement>, selected: boolean) => void;
  /** Button content. */
  children?: ReactNode;
}

const RdsStandaloneToggleButton = ({
  selected: controlledSelected,
  onChange,
  children,
  className,
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
        {...props}
        className={clsx('rds-toggle-button__button', className)}
      >
        {children}
      </MuiToggleButton>
    </div>
  );
};

export default RdsStandaloneToggleButton;

RdsStandaloneToggleButton.displayName = 'RdsStandaloneToggleButton';
