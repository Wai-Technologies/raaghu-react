import { useState, type ReactNode, type SyntheticEvent } from 'react';
import clsx from 'clsx';
import { Rating as MuiRating, type RatingProps, Slider } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { warnDeprecatedProp } from '../shared/utils/deprecation';
import './rds-rating.scss';

type RatingStyle = 'default' | 'filled' | 'outlined';
type RatingColor = 'primary' | 'success' | 'danger' | 'warning' | 'light' | 'info' | 'secondary' | 'dark';

export interface RdsRatingProps extends Omit<RatingProps, 'component' | 'color'> {
  /** Text label rendered before the rating. */
  label?: string;
  /** Show the numeric value next to the rating. */
  showValue?: boolean;
  /** @deprecated Use `max` instead. */
  maxStars?: number;
  /** Labels under the slider track (start, middle, end). Defaults to `['No', 'Maybe', 'Yes']`. */
  sliderLabels?: [ReactNode, ReactNode, ReactNode];
  /** Rating display: stars or a three-point slider. */
  type?: 'star' | 'slider';
  level?: 0 | 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5 | 'Left' | 'Mid' | 'Right';
  styles?: RatingStyle;
  /** Visual style of the stars. */
  variant?: RatingStyle;
  /** Color of the rating. */
  color?: RatingColor;
  /** @deprecated Use `color` instead. */
  colorVariant?: RatingColor;
}

const snapToAllowed = (val: number | null | undefined, maxValue = 5): number => {
  if (val === null || val === undefined) return 0;
  const allowedSliderValues = [0, maxValue / 2, maxValue];
  return allowedSliderValues.reduce((prev, curr) => Math.abs(curr - val!) < Math.abs(prev - val!) ? curr : prev);
};

/**
 * MUI Rating builds decimal segments with `new Array(1 / precision)`, which throws
 * RangeError when 1/precision is not an integer (e.g. 0.3 → 3.33…, 0.4 → 2.5).
 * Normalize to a precision that divides 1 evenly.
 */
const sanitizePrecision = (precision: number): number => {
  if (!Number.isFinite(precision) || precision <= 0) return 0.5;
  if (precision >= 1) return 1;
  const segments = Math.max(1, Math.round(1 / precision));
  return 1 / segments;
};

const getLevelValue = (lvl: RdsRatingProps['level']): number | undefined => {
  if (lvl === 'Left') return 0;
  if (lvl === 'Mid') return 2.5;
  if (lvl === 'Right') return 5;
  return lvl;
};

/** Star or three-point slider rating built on MUI Rating / Slider. */
const RdsRating = ({
  label,
  showValue = false,
  maxStars,
  sliderLabels = ['No', 'Maybe', 'Yes'],
  className,
  max,
  value,
  type = 'star',
  styles,
  variant,
  level,
  color,
  colorVariant,
  defaultValue,
  onChange,
  precision: precisionProp,
  ...props
}: RdsRatingProps) => {
  if (maxStars !== undefined) warnDeprecatedProp('RdsRating', 'maxStars', '`max`');
  if (colorVariant !== undefined) warnDeprecatedProp('RdsRating', 'colorVariant', '`color`');
  const maxRating = max || maxStars || 5;
  const resolvedStyle = variant ?? styles ?? 'default';
  const resolvedColor = color ?? colorVariant;

  const [internalValue, setInternalValue] = useState<number | null>(() => {
    if (type === 'slider') {
      if (level !== undefined) {
        const levelVal = getLevelValue(level);
        return snapToAllowed(levelVal, maxRating);
      }
      if (value !== undefined) return snapToAllowed(value, maxRating);
      return defaultValue === undefined ? 0 : snapToAllowed(defaultValue, maxRating);
    } else {
      if (level !== undefined) {
        const levelVal = getLevelValue(level);
        return levelVal !== undefined ? levelVal : null;
      }
      if (value !== undefined) return value;
      return defaultValue ?? null;
    }
  });
  
  
  const computeCurrentValue = (): number | null => {
    // `level` wins so Storybook / Figma level control updates the display even when `value` is set.
    if (type === 'slider') {
      if (level !== undefined) {
        return snapToAllowed(getLevelValue(level), maxRating);
      }
      if (value !== undefined) {
        return snapToAllowed(value, maxRating);
      }
      return snapToAllowed(internalValue, maxRating);
    }

    if (level !== undefined) {
      const levelValue = getLevelValue(level);
      return levelValue !== undefined ? levelValue : null;
    }
    if (value !== undefined) {
      return value;
    }
    return internalValue;
  };
  const currentValue = computeCurrentValue();

  const precision =
    type === 'slider'
      ? undefined
      : sanitizePrecision(precisionProp !== undefined ? precisionProp : 0.5);

  const handleStarChange = (event: SyntheticEvent, newValue: number | null) => {
    let finalValue: number | null = newValue;
    
    if (newValue === currentValue && newValue !== 0) {
      finalValue = 0;
    }
    
    setInternalValue(finalValue);
    
    if (onChange) {
      onChange(event, finalValue);
    }
  };

  const handleSliderChange = (event: Event | SyntheticEvent, newValue: number | number[]) => {
    let value = Array.isArray(newValue) ? newValue[0] : newValue;
    if (props.readOnly) return;
    value = snapToAllowed(value, maxRating);
    setInternalValue(value);
    
    if (onChange) {
      onChange(event as SyntheticEvent<Element, Event>, value);
    }
  };

  const getPositionClass = () => {
    if (type === 'slider' && level !== undefined) {
      const numLevel = getLevelValue(level);
      if (numLevel === 0) return 'rds-rating--position-left';
      if (numLevel === 2.5) return 'rds-rating--position-mid';
      if (numLevel === 5) return 'rds-rating--position-right';
    }
    return '';
  };

  const renderStarRating = () => (
    <MuiRating
      max={maxRating}
      value={currentValue}
      precision={precision === undefined ? undefined : precision}
      onChange={handleStarChange}
      className={clsx(`rds-rating__stars rds-rating__stars--${resolvedStyle} ${resolvedColor ? `rds-rating__stars--color-${resolvedColor}` : ''}`, className)}
      emptyIcon={resolvedStyle === 'filled' ? <StarIcon className="rds-rating__star-icon rds-rating__star-icon--empty" fontSize="inherit" /> : undefined}
      {...props}
    />
  );

  const renderSliderRating = () => (
    <div className="rds-rating__slider-container">
      <div className="rds-rating__slider-wrapper">
        <Slider
          value={currentValue || 0}
          max={maxRating}
          min={0}
          step={precision}
          valueLabelDisplay="off"
          onChange={handleSliderChange}
          disabled={props.disabled}
          name={props.name}
          aria-label={props['aria-label'] ?? label ?? 'Rating'}
          aria-labelledby={props['aria-labelledby']}
          className={`rds-rating__slider ${resolvedColor ? `rds-rating__slider--color-${resolvedColor}` : ''}`}
        />
        {showValue && currentValue !== undefined && currentValue !== null && (
          <span className="rds-rating__value">
            {Number(currentValue).toFixed(1)}
          </span>
        )}
      </div>
      <div className="rds-rating__slider-labels">
        <span className="rds-rating__slider-label rds-rating__slider-label--start">{sliderLabels[0]}</span>
        <span className="rds-rating__slider-label rds-rating__slider-label--middle">{sliderLabels[1]}</span>
        <span className="rds-rating__slider-label rds-rating__slider-label--end">{sliderLabels[2]}</span>
      </div>
    </div>
  );

  return (
  <div className={`rds-rating ${type === 'slider' ? 'rds-rating--slider' : 'rds-rating--star'} rds-rating--${resolvedStyle} ${getPositionClass()} ${resolvedColor ? `rds-rating--color-${resolvedColor}` : ''}`}>
      {label && <span className="rds-rating__label">{label}</span>}
      {type === 'slider' ? renderSliderRating() : renderStarRating()}
      {showValue && currentValue !== undefined && (
        <span className="rds-rating__display-value">
          {type === 'slider' ? `${Number(currentValue).toFixed(1)}` : `(${currentValue}/${maxRating})`}
        </span>
      )}
    </div>
  );
};
RdsRating.displayName = 'RdsRating';
export default RdsRating;
