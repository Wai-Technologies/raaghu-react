import React, { useState } from 'react';
import { Chip, ChipProps } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import './rds-comp-chip.scss';

export interface RdsCompChipProps extends Omit<ChipProps, 'variant' | 'size' | 'color'> {
  /**
   * The content of the component
   */
  label?: React.ReactNode;
  
  /**
   * If true, the component will be disabled
   */
  disabled?: boolean;
  
  /**
   * The variant to use
   * @default 'filled'
   */
  variant?: 'filled' | 'outlined';
  
  /**
   * The size of the component
   * @default 'medium'
   */
  size?: 'small' | 'medium';
  
  /**
   * The color of the component
   * @default 'default'
   */
  color?: 'default' | 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
  
  /**
   * Avatar element to display
   */
  avatar?: React.ReactElement;
  
  /**
   * Icon element to display
   */
  icon?: React.ReactElement;
  
  /**
   * Callback fired when the delete icon is clicked
   */
  onDelete?: (event: React.MouseEvent<HTMLElement>) => void;
  
  /**
   * Callback fired when the chip is clicked
   */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  
  /**
   * If true, the chip is selected
   */
  selected?: boolean;
  
  /**
   * Controlled mode: selected state
   */
  value?: string | number | boolean;
  
  /**
   * Uncontrolled mode: default selected state
   */
  defaultValue?: string | number | boolean;
  
  /**
   * Callback fired when the chip is selected/deselected
   */
  onChange?: (value: string | number | boolean, isSelected: boolean) => void;
}

const RdsCompChip: React.FC<RdsCompChipProps> = ({
  label,
  disabled = false,
  variant = 'filled',
  size = 'medium',
  color = 'default',
  avatar,
  icon,
  onDelete,
  onClick,
  selected: controlledSelected,
  value,
  defaultValue,
  onChange,
  className,
  ...props
}) => {
  const [internalSelected, setInternalSelected] = useState(defaultValue === true);
  const isControlled = controlledSelected !== undefined || value !== undefined;
  const isSelected = isControlled ? (controlledSelected ?? false) : internalSelected;

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (!disabled) {
      const newSelected = !isSelected;
      
      if (!isControlled) {
        setInternalSelected(newSelected);
      }
      
      onChange?.(value ?? label ?? '', newSelected);
      onClick?.(event);
    }
  };

  const handleDelete = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    onDelete?.(event);
  };

  const rootClasses = [
    'rds-comp-chip',
    `rds-comp-chip--${variant}`,
    `rds-comp-chip--${size}`,
    `rds-comp-chip--color-${color}`,
    isSelected && 'rds-comp-chip--selected',
    disabled && 'rds-comp-chip--disabled',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Determine the MUI color based on selection and controlled state
  const muiColor = isSelected && color !== 'default' ? (color as any) : 'default';
  const muiVariant = variant === 'outlined' ? 'outlined' : 'filled';

  // Extract data-testid from props to avoid duplication
  const { 'data-testid': dataTestId, ...restProps } = props;

  return (
    <div
      className={rootClasses}
      role="group"
      data-testid={dataTestId || 'rds-comp-chip'}
      aria-disabled={disabled}
      aria-pressed={isSelected}
    >
      <Chip
        label={label}
        disabled={disabled}
        variant={muiVariant}
        size={size}
        color={muiColor}
        avatar={avatar}
        icon={icon}
        onDelete={onDelete ? handleDelete : undefined}
        onClick={handleClick}
        deleteIcon={onDelete ? <CloseIcon /> : undefined}
        className="rds-comp-chip__mui"
        {...restProps}
      />
    </div>
  );
};

RdsCompChip.displayName = 'RdsCompChip';

export default RdsCompChip;
