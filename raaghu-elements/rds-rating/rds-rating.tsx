import { useMemo, useState, type SyntheticEvent } from 'react';
import { Rating as MuiRating, type RatingProps, Slider, Box } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import './rds-rating.scss';

export interface RdsRatingProps extends Omit<RatingProps, 'component'> {
  label?: string;
  showValue?: boolean;
  maxStars?: number;
  type?: 'star' | 'slider';
  level?: 0 | 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5 | 'Left' | 'Mid' | 'Right';
  styles?: 'default' | 'filled' | 'outlined';
  colorVariant?: 'primary' | 'success' | 'danger' | 'warning' | 'light' | 'info' | 'secondary' | 'dark';
}

const allowedSliderValues = [0, 2.5, 5];

const snapToAllowed = (val: number | null | undefined): number => {
  if (val === null || val === undefined) return 0;
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

const RdsRating = ({
  label,
  showValue = false,
  maxStars = 5,
  max,
  value,
  type = 'star',
  styles = 'default',
  level,
  colorVariant,
  onChange,
  precision: precisionProp,
  ...props
}: RdsRatingProps) => {
  const maxRating = max || maxStars;
  
  const [internalValue, setInternalValue] = useState<number | null>(() => {
    if (type === 'slider') {
      if (level !== undefined) {
        const levelVal = getLevelValue(level);
        return snapToAllowed(levelVal);
      }
      if (value !== undefined) return snapToAllowed(value);
      return 0;
    } else {
      if (level !== undefined) {
        const levelVal = getLevelValue(level);
        return levelVal !== undefined ? levelVal : null;
      }
      if (value !== undefined) return value;
      return null;
    }
  });
  
  
  const currentValue = useMemo(() => {
    if (type === 'slider') {
      if (value !== undefined) {
        return snapToAllowed(value);
      }
      if (level !== undefined) {
        return snapToAllowed(getLevelValue(level));
      }
      return snapToAllowed(internalValue);
    }

    if (value !== undefined) {
      return value;
    }
    if (level !== undefined) {
      const levelValue = getLevelValue(level);
      return levelValue !== undefined ? levelValue : null;
    }
    return internalValue;
  }, [internalValue, level, type, value]);

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
    value = snapToAllowed(value);
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
      className={`rds-rating__stars rds-rating__stars--${styles} ${colorVariant ? `rds-rating__stars--color-${colorVariant}` : ''}`}
      emptyIcon={styles === 'filled' ? <StarIcon className="rds-rating__star-icon rds-rating__star-icon--empty" fontSize="inherit" /> : undefined}
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
          className={`rds-rating__slider ${colorVariant ? `rds-rating__slider--color-${colorVariant}` : ''}`}
        />
        {showValue && currentValue !== undefined && currentValue !== null && (
          <span className="rds-rating__value">
            {Number(currentValue).toFixed(1)}
          </span>
        )}
      </div>
      <div className="rds-rating__slider-labels">
        <span className="rds-rating__slider-label rds-rating__slider-label--start">No</span>
        <span className="rds-rating__slider-label rds-rating__slider-label--middle">Maybe</span>
        <span className="rds-rating__slider-label rds-rating__slider-label--end">Yes</span>
      </div>
    </div>
  );

  return (
  <div className={`rds-rating ${type === 'slider' ? 'rds-rating--slider' : 'rds-rating--star'} ${styles ? `rds-rating--${styles}` : ''} ${getPositionClass()} ${colorVariant ? `rds-rating--color-${colorVariant}` : ''}`}>
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
