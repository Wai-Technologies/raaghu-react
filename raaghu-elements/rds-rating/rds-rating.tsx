import React from 'react';
import { Rating as MuiRating, RatingProps, Slider, Box } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
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

const RdsRating: React.FC<RdsRatingProps> = ({
  label,
  showValue = false,
  maxStars = 5,
  max,
  value,
  type = 'star',
  styles = 'default',
  level,
  onChange,
  ...props
}) => {
  const maxRating = max || maxStars;
  
  // Convert string level values to numbers
  const getLevelValue = (level: any): number | undefined => {
    if (level === 'Left') return 0;
    if (level === 'Mid') return 2.5;
    if (level === 'Right') return 5;
    return level;
  };
  
  // Use level as value if provided, otherwise use value prop
  const currentValue = level !== undefined ? getLevelValue(level) : value;
  
  // Set precision based on level increments
  const precision = level !== undefined ? 0.5 : (props.precision || 1);

  // Determine position based on level for sliders
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
      precision={precision}
      onChange={onChange}
      className={`rds-rating__stars rds-rating__stars--${styles}`}
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
          onChange={onChange as any}
          className="rds-rating__slider"
        />
        {showValue && currentValue !== undefined && currentValue !== null && (
          <span className="rds-rating__value">
            {Number(currentValue).toFixed(1)}
          </span>
        )}
      </div>
      {/* Slider Labels */}
      <div className="rds-rating__slider-labels">
        <span className="rds-rating__slider-label rds-rating__slider-label--start">No</span>
        <span className="rds-rating__slider-label rds-rating__slider-label--middle">Maybe</span>
        <span className="rds-rating__slider-label rds-rating__slider-label--end">Yes</span>
      </div>
    </div>
  );

  return (
    <div className={`rds-rating ${type === 'slider' ? 'rds-rating--slider' : 'rds-rating--star'} ${styles ? `rds-rating--${styles}` : ''} ${getPositionClass()}`}>
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

export default RdsRating;
