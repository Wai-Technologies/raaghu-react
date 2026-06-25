import React from 'react';
import { Rating as MuiRating, Slider, type RatingProps } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

export interface StarRatingViewProps extends Omit<RatingProps, 'onChange'> {
  maxRating: number;
  currentValue: number | null;
  precision: number | undefined;
  styles: 'default' | 'filled' | 'outlined';
  colorVariant?: string;
  onChange: (event: React.SyntheticEvent, newValue: number | null) => void;
}

export function StarRatingView({
  maxRating,
  currentValue,
  precision,
  styles,
  colorVariant,
  onChange,
  ...props
}: StarRatingViewProps) {
  return (
    <MuiRating
      max={maxRating}
      value={currentValue}
      precision={precision === undefined ? undefined : precision}
      onChange={onChange}
      className={`rds-rating__stars rds-rating__stars--${styles} ${colorVariant ? `rds-rating__stars--color-${colorVariant}` : ''}`}
      emptyIcon={
        styles === 'filled' ? (
          <StarIcon className="rds-rating__star-icon rds-rating__star-icon--empty" fontSize="inherit" />
        ) : undefined
      }
      {...props}
    />
  );
}

export interface SliderRatingViewProps {
  currentValue: number | null;
  maxRating: number;
  precision: number | undefined;
  colorVariant?: string;
  showValue: boolean;
  onChange: (event: Event | React.SyntheticEvent, newValue: number | number[]) => void;
}

export function SliderRatingView({
  currentValue,
  maxRating,
  precision,
  colorVariant,
  showValue,
  onChange,
}: SliderRatingViewProps) {
  return (
    <div className="rds-rating__slider-container">
      <div className="rds-rating__slider-wrapper">
        <Slider
          value={currentValue || 0}
          max={maxRating}
          min={0}
          step={precision}
          valueLabelDisplay="off"
          onChange={onChange}
          className={`rds-rating__slider ${colorVariant ? `rds-rating__slider--color-${colorVariant}` : ''}`}
        />
        {showValue && currentValue !== undefined && currentValue !== null && (
          <span className="rds-rating__value">{Number(currentValue).toFixed(1)}</span>
        )}
      </div>
      <div className="rds-rating__slider-labels">
        <span className="rds-rating__slider-label rds-rating__slider-label--start">No</span>
        <span className="rds-rating__slider-label rds-rating__slider-label--middle">Maybe</span>
        <span className="rds-rating__slider-label rds-rating__slider-label--end">Yes</span>
      </div>
    </div>
  );
}
