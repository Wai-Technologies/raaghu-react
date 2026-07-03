import React, { useState, useEffect } from 'react';
import { type RatingProps } from '@mui/material';
import {
  getInitialInternalValue,
  resolveCurrentValue,
  getSyncInternalValue,
  getPositionClass,
  normalizePrecision,
  snapToAllowed,
} from './rds-rating.helpers';
import { StarRatingView, SliderRatingView } from './rds-rating.views';
import './rds-rating.scss';

export interface RdsRatingProps extends RatingProps {
  label?: string;
  showValue?: boolean;
  maxStars?: number;
  type?: 'star' | 'slider';
  level?: 0 | 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5 | 'Left' | 'Mid' | 'Right';
  styles?: 'default' | 'filled' | 'outlined';
  colorVariant?: 'primary' | 'success' | 'danger' | 'warning' | 'light' | 'info' | 'secondary' | 'dark';
}

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
  const [internalValue, setInternalValue] = useState<number | null>(() =>
    getInitialInternalValue(type, level, value)
  );

  const currentValue = resolveCurrentValue(type, internalValue, level, value);
  const precision =
    type === 'slider' ? undefined : normalizePrecision(precisionProp, 0.5);

  useEffect(() => {
    const synced = getSyncInternalValue(type, level, value);
    if (synced !== null) {
      setInternalValue(synced);
    }
  }, [value, level, type]);

  const handleStarChange = (event: React.SyntheticEvent, newValue: number | null) => {
    let finalValue: number | null = newValue;
    if (newValue === currentValue && newValue !== 0) {
      finalValue = 0;
    }
    setInternalValue(finalValue);
    onChange?.(event, finalValue);
  };

  const handleSliderChange = (event: Event | React.SyntheticEvent, newValue: number | number[]) => {
    let nextValue = Array.isArray(newValue) ? newValue[0] : newValue;
    nextValue = snapToAllowed(nextValue);
    setInternalValue(nextValue);
    onChange?.(event as React.SyntheticEvent, nextValue);
  };

  return (
    <div
      className={`rds-rating ${type === 'slider' ? 'rds-rating--slider' : 'rds-rating--star'} ${styles ? `rds-rating--${styles}` : ''} ${getPositionClass(type, level)} ${colorVariant ? `rds-rating--color-${colorVariant}` : ''}`}
    >
      {label && <span className="rds-rating__label">{label}</span>}
      {type === 'slider' ? (
        <SliderRatingView
          currentValue={currentValue}
          maxRating={maxRating}
          precision={precision}
          colorVariant={colorVariant}
          showValue={showValue}
          onChange={handleSliderChange}
        />
      ) : (
        <StarRatingView
          maxRating={maxRating}
          currentValue={currentValue}
          precision={precision}
          styles={styles}
          colorVariant={colorVariant}
          onChange={handleStarChange}
          {...props}
        />
      )}
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
