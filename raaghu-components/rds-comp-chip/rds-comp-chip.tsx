import React, { useState, useEffect } from 'react';
import { Chip as MuiChip, ChipProps as MuiChipProps, Box } from '@mui/material';
import './rds-comp-chip.scss';

/**
 * Individual chip option item
 */
export interface ChipOption {
  /** Unique identifier for the chip */
  id: string | number;
  /** Display label for the chip */
  label: string;
  /** Optional icon to display (leading icon) */
  icon?: React.ReactNode;
  /** Optional avatar element */
  avatar?: React.ReactNode;
  /** Whether the chip is deletable */
  deletable?: boolean;
  /** Whether the chip is disabled */
  disabled?: boolean;
  /** Callback when delete icon is clicked */
  onDelete?: (id: string | number) => void;
  /** Callback when chip is clicked */
  onClick?: (id: string | number) => void;
}

/**
 * Props for RdsCompChip component
 */
export interface RdsCompChipProps extends Omit<MuiChipProps, 'variant'> {
  /** Array of chip options to render */
  options: ChipOption[];
  /** Currently selected chip ID(s) - controlled mode */
  value?: string | number | (string | number)[];
  /** Default selected chip ID(s) - uncontrolled mode */
  defaultValue?: string | number | (string | number)[];
  /** Allow multiple chips to be selected */
  multiple?: boolean;
  /** Size of chips */
  size?: 'small' | 'medium' | 'large';
  /** Color variant */
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'default';
  /** Chip style variant */
  variant?: 'filled' | 'outlined';
  /** Whether chips are clickable/selectable */
  clickable?: boolean;
  /** Custom CSS class */
  className?: string;
  /** Callback when selection changes */
  onChange?: (value: string | number | (string | number)[]) => void;
}

/**
 * RdsCompChip - Selection component using MUI Chip
 * Supports both controlled and uncontrolled modes
 * Supports single and multiple selection
 * Supports deletion and custom colors
 * 
 * @example
 * // Uncontrolled
 * <RdsCompChip 
 *   options={options}
 *   defaultValue="option1"
 *   onChange={(val) => console.log(val)}
 * />
 * 
 * // Controlled
 * <RdsCompChip 
 *   options={options}
 *   value={selected}
 *   onChange={setSelected}
 *   multiple
 * />
 */
const RdsCompChip: React.FC<RdsCompChipProps> = ({
  options,
  value: controlledValue,
  defaultValue,
  multiple = false,
  size = 'medium',
  color = 'default',
  variant = 'filled',
  clickable = true,
  className,
  onChange,
  ...props
}) => {
  // ─── State Management (Controlled + Uncontrolled) ────────────────
  const [internalValue, setInternalValue] = useState<string | number | (string | number)[]>(() => {
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    return multiple ? [] : '';
  });

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  // Sync when defaultValue changes (uncontrolled mode only)
  useEffect(() => {
    if (!isControlled && defaultValue !== undefined) {
      setInternalValue(defaultValue);
    }
  }, [defaultValue, isControlled]);

  // ─── Event Handlers ──────────────────────────────────────────────
  const handleChipClick = (optionId: string | number) => {
    const option = options.find(o => o.id === optionId);
    
    if (option?.disabled || !clickable) return;

    let newValue: string | number | (string | number)[];

    if (multiple) {
      const currentArray = Array.isArray(value) ? [...value] : [];
      const index = currentArray.indexOf(optionId);

      if (index === -1) {
        currentArray.push(optionId);
      } else {
        currentArray.splice(index, 1);
      }
      newValue = currentArray;
    } else {
      // Toggle: clicking same item deselects, clicking different selects
      newValue = value === optionId ? '' : optionId;
    }

    if (!isControlled) {
      setInternalValue(newValue);
    }

    onChange?.(newValue);
    option?.onClick?.(optionId);
  };

  const handleChipDelete = (optionId: string | number) => {
    const option = options.find(o => o.id === optionId);
    option?.onDelete?.(optionId);
  };

  // ─── Helper Functions ────────────────────────────────────────────
  const isChipSelected = (optionId: string | number): boolean => {
    if (multiple) {
      return Array.isArray(value) && value.includes(optionId);
    }
    return value === optionId;
  };

  // ─── CSS Classes ─────────────────────────────────────────────────
  const getRootClasses = (): string => {
    const classes = ['rds-comp-chip'];
    classes.push(`rds-comp-chip--${size}`);
    classes.push(`rds-comp-chip--${variant}`);
    classes.push(`rds-comp-chip--${color}`);
    if (multiple) classes.push('rds-comp-chip--multiple');
    if (className) classes.push(className);
    return classes.join(' ');
  };

  // ─── Render ──────────────────────────────────────────────────────
  return (
    <Box
      className={getRootClasses()}
      role="group"
      data-testid="rds-comp-chip"
      {...props}
    >
      <div className="rds-comp-chip__container">
        {options.map((option) => {
          const isSelected = isChipSelected(option.id);
          const chipColor = isSelected && clickable ? (color as any) : 'default';
          const isDisabled = option.disabled;

          return (
            <MuiChip
              key={option.id}
              label={option.label}
              icon={option.icon}
              avatar={option.avatar}
              onDelete={option.deletable ? () => handleChipDelete(option.id) : undefined}
              onClick={clickable ? () => handleChipClick(option.id) : undefined}
              disabled={isDisabled}
              color={chipColor}
              variant={variant === 'outlined' ? 'outlined' : 'filled'}
              size={size === 'large' ? 'medium' : size}
              aria-pressed={clickable ? isSelected : undefined}
              aria-label={option.label}
              data-testid={`chip-${option.id}`}
              className={`rds-comp-chip__item ${
                isSelected ? 'rds-comp-chip__item--selected' : ''
              } ${isDisabled ? 'rds-comp-chip__item--disabled' : ''}`}
            />
          );
        })}
      </div>
    </Box>
  );
};

RdsCompChip.displayName = 'RdsCompChip';
export default RdsCompChip;
