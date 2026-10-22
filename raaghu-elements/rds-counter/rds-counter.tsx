import { useId, useState, type ChangeEvent, type KeyboardEvent } from 'react';
import { Box, IconButton, InputBase, Typography, type BoxProps } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import clsx from 'clsx';
import { warnDeprecatedProp } from '../shared/utils/deprecation';
import "./rds-counter.scss";

/**
 * Root props are forwarded to the outer `Box` (`className`, `sx`, `ref`, `id`, `aria-*`, `data-*`, event handlers…).
 */
export interface RdsCounterProps
  extends Omit<BoxProps, 'children' | 'component' | 'onChange' | 'defaultValue' | 'placeholder'> {
  /** Controlled value. When set (even without `onChange`) the counter is controlled. */
  value?: number;
  /** Called with the new value. Only values inside `[min, max]` are emitted. */
  onChange?: (value: number) => void;
  /** Initial value when uncontrolled. */
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  showInput?: boolean;
  /** Label shown above (or, in the compact variant, beside) the counter. */
  label?: string;
  variant?: 'default' | 'compact';
  layout?: 'right-side' | 'side-to-side' | 'bottom';
  placeholder?: string;
  /** @deprecated Use `slotProps.controls.className` instead. */
  controlsClassName?: string;
  /** Props for the inner parts. `controls` goes on the container of the buttons and value. */
  slotProps?: { controls?: BoxProps };
  /** Show the label. */
  showTitle?: boolean;
  /** Marks the field as required: shows the asterisk next to the label and sets `aria-required` on the input. */
  required?: boolean;
  selected?: boolean;
  /** Figma visual state. */
  state?: 'default' | 'selected' | 'disabled';
  /** @deprecated Use `label` instead. */
  titleText?: string;
  /** @deprecated Use `required` instead. */
  isMandatory?: boolean;
}

/** Whether the typed number `n` is in range, or could still get there by typing more digits. */
const canReachRange = (n: number, min: number, max: number): boolean => {
  if (n >= min && n <= max) return true;
  const positive = n >= 0;
  if (positive ? max === Infinity : min === -Infinity) return true;
  for (let k = 1; k <= 15; k++) {
    const scale = 10 ** k;
    const lo = positive ? n * scale : n * scale - (scale - 1);
    const hi = positive ? n * scale + (scale - 1) : n * scale;
    if (hi >= min && lo <= max) return true;
    if (positive ? lo > max : hi < min) return false;
  }
  return false;
};

const RdsCounter = ({
  value,
  onChange,
  defaultValue,
  min = 0,
  max = Infinity,
  step = 1,
  disabled = false,
  size = 'medium',
  showInput = true,
  label,
  titleText,
  variant = 'default',
  layout = 'side-to-side',
  placeholder='00',
  controlsClassName,
  slotProps,
  showTitle = true,
  required,
  isMandatory,
  selected = false,
  state = 'default',
  className,
  sx,
  ref,
  ...rest
}: RdsCounterProps) => {
  if (titleText !== undefined) warnDeprecatedProp('RdsCounter', 'titleText', '`label`');
  if (controlsClassName !== undefined) warnDeprecatedProp('RdsCounter', 'controlsClassName', '`slotProps.controls.className`');
  if (isMandatory !== undefined) warnDeprecatedProp('RdsCounter', 'isMandatory', '`required`');

  const labelText = label ?? titleText;
  const isRequired = required ?? isMandatory ?? false;
  const inputId = `rds-counter-${useId()}`;

  /** Only a numeric `value` is controlled (Storybook may pass `{}` for unset object controls). */
  const isControlled = typeof value === 'number';
  const [internalValue, setInternalValue] = useState<number | undefined>(
    typeof defaultValue === 'number' ? defaultValue : undefined
  );
  const [draft, setDraft] = useState<string | null>(null);
  const currentValue = isControlled ? value : internalValue;

  const updateValue = (newValue: number | undefined) => {
    if (isControlled) {
      if (typeof newValue === 'number') onChange?.(newValue);
    } else {
      setInternalValue(newValue);
    }
  };

  const handleIncrement = () => {
    setDraft(null);
    const base = typeof currentValue === 'number' ? currentValue : min;
    const newValue = Math.min(base + step, max);
    updateValue(newValue);
  };

  const handleDecrement = () => {
    setDraft(null);
    const base = typeof currentValue === 'number' ? currentValue : min;
    const newValue = Math.max(base - step, min);
    updateValue(newValue);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const raw = event.target.value.trim();
    if (raw === '') {
      setDraft(null);
      updateValue(undefined);
      return;
    }
    if (raw === '-' && min < 0) {
      setDraft(raw);
      return;
    }
    const newValue = parseInt(raw, 10);
    if (isNaN(newValue)) return;
    if (newValue >= min && newValue <= max) {
      setDraft(null);
      updateValue(newValue);
    } else if (canReachRange(newValue, min, max)) {
      setDraft(String(newValue));
    }
  };

  const handleInputBlur = () => {
    if (draft === null) return;
    setDraft(null);
    const parsed = parseInt(draft, 10);
    if (isNaN(parsed)) return;
    const clamped = Math.min(Math.max(parsed, min), max);
    if (clamped !== currentValue) updateValue(clamped);
  };

  const isSelected = state === 'selected' || selected;
  const isDisabled = state === 'disabled' || disabled;
  const atMin = typeof currentValue === 'number' && currentValue <= min;
  const atMax = typeof currentValue === 'number' && currentValue >= max;

  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (!atMax) handleIncrement();
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (!atMin) handleDecrement();
    }
  };

  const containerClasses = clsx(
    'rds-counter',
    `rds-counter--${variant}`,
    `rds-counter--${size}`,
    isSelected && 'rds-counter--selected',
    isDisabled && 'rds-counter--disabled',
    `rds-counter--layout-${layout}`,
    className,
  );

  const buildValue = (valueVariant: 'compact' | 'default') => (
    showInput ? (
      <InputBase
        value={draft ?? (typeof currentValue === 'number' ? currentValue : '')}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        onKeyDown={handleInputKeyDown}
        disabled={isDisabled}
        className={clsx(
          'rds-counter__input',
          `rds-counter__input--${valueVariant}`,
          `rds-counter__input--${size}`,
          isDisabled && 'rds-counter__input--disabled',
        )}
        slotProps={{
          input: {
            id: inputId,
            inputMode: 'numeric',
            pattern: '[0-9]*',
            ...(Number.isFinite(min) ? { min } : {}),
            ...(Number.isFinite(max) ? { max } : {}),
            'aria-label': labelText ? `${labelText} value` : 'counter value',
            ...(isRequired ? { 'aria-required': true } : {}),
            placeholder: placeholder,
            style: { textAlign: 'center' }
          }
        }}
      />
    ) : (
      <Typography className={clsx(
        'rds-counter__value',
        `rds-counter__value--${valueVariant}`,
        `rds-counter__value--${size}`,
        isDisabled && 'rds-counter__value--disabled',
      )}>
        {typeof currentValue === 'number' ? currentValue : placeholder}
      </Typography>
    )
  );

  const decButton = (
    <IconButton
      aria-label="Decrease value"
      onClick={handleDecrement}
      disabled={isDisabled || atMin}
      size={size === 'small' ? 'small' : 'medium'}
      className={clsx(
        'rds-counter__button',
        'rds-counter__button--decrement',
        `rds-counter__button--${variant}`,
        `rds-counter__button--${size}`,
        (isDisabled || atMin) && 'rds-counter__button--disabled',
      )}
    >
      <RemoveIcon className={`rds-counter__icon rds-counter__icon--${variant} rds-counter__icon--${size}`} />
    </IconButton>
  );
  const incButton = (
    <IconButton
      aria-label="Increase value"
      onClick={handleIncrement}
      disabled={isDisabled || atMax}
      size={size === 'small' ? 'small' : 'medium'}
      className={clsx(
        'rds-counter__button',
        'rds-counter__button--increment',
        `rds-counter__button--${variant}`,
        `rds-counter__button--${size}`,
        (isDisabled || atMax) && 'rds-counter__button--disabled',
      )}
    >
      <AddIcon className={`rds-counter__icon rds-counter__icon--${variant} rds-counter__icon--${size}`} />
    </IconButton>
  );

  const renderControls = () => {
    const controlsProps = {
      ...slotProps?.controls,
      className: clsx(
        'rds-counter__controls',
        `rds-counter__controls--${variant}`,
        `rds-counter__controls--${size}`,
        `rds-counter__controls--layout-${layout}`,
        controlsClassName,
        slotProps?.controls?.className,
      ),
    };
    const valueNode = buildValue(variant === 'compact' ? 'compact' : 'default');
    if (layout === 'right-side') {
      return <Box {...controlsProps}>{valueNode}{decButton}{incButton}</Box>;
    }
    if (layout === 'bottom') {
      return (
        <Box {...controlsProps}>
          <Box className="rds-counter__value-wrapper">{valueNode}</Box>
            <Box className="rds-counter__button-group">{decButton}{incButton}</Box>
        </Box>
      );
    }

    return <Box {...controlsProps}>{decButton}{valueNode}{incButton}</Box>;
  };

  const controlsElement = renderControls();

  return (
    <Box {...rest} ref={ref} className={containerClasses} sx={sx}>
      {showTitle && typeof labelText === 'string' && labelText && (
        <Typography
          {...(showInput ? { component: 'label' as const, htmlFor: inputId } : {})}
          className={clsx(
            'rds-counter__label',
            variant === 'compact' && 'rds-counter__label--compact',
            `rds-counter__label--${size}`,
          )}
        >
          {labelText}
          <span className="rds-counter__mandatory" style={{ visibility: isRequired ? 'visible' : 'hidden' }}>*</span>
        </Typography>
      )}
      {controlsElement}
    </Box>
  );
};

RdsCounter.displayName = 'RdsCounter';
export default RdsCounter;
