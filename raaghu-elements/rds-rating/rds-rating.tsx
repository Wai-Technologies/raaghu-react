import React, { useState, useEffect } from 'react';
import { Rating as MuiRating, type RatingProps, Slider, Box } from '@mui/material';
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
  ...props
}: RdsRatingProps) => {
  const maxRating = max || maxStars;
  
  // Internal state to manage the current rating value
  const [internalValue, setInternalValue] = useState<number | null>(() => {
    // Initialize with level, value, or null
    if (level !== undefined) {
      const levelVal = getLevelValue(level);
      return levelVal !== undefined ? levelVal : null;
    }
    if (value !== undefined) return value;
    return null;
  });
  
  // Convert string level values to numbers
  function getLevelValue(level: any): number | undefined {
    if (level === 'Left') return 0;
    if (level === 'Mid') return 2.5;
    if (level === 'Right') return 5;
    return level;
  }
  
  // Determine the current value based on priority: internal state > level > value prop
  const currentValue = internalValue !== null ? internalValue : 
                      (level !== undefined ? getLevelValue(level) : value);
  
  // Set precision based on level increments or props
  const precision = level !== undefined ? 0.5 : (props.precision || 1);

  // Update internal state when external value or level changes
  useEffect(() => {
    if (level !== undefined) {
      const levelVal = getLevelValue(level);
      setInternalValue(levelVal !== undefined ? levelVal : null);
    } else if (value !== undefined && internalValue === null) {
      setInternalValue(value);
    }
  }, [value, level]);

  // Custom onChange handler for star rating with toggle functionality
  const handleStarChange = (event: React.SyntheticEvent, newValue: number | null) => {
    let finalValue: number | null = newValue;
    
    // Toggle functionality: if clicking the same star, set to 0
    if (newValue === currentValue && newValue !== 0) {
      finalValue = 0;
    }
    
    // Always update internal state for interactive behavior
    setInternalValue(finalValue);
    
    // Call external onChange if provided
    if (onChange) {
      onChange(event, finalValue);
    }
  };

  // Custom onChange handler for slider
  const handleSliderChange = (event: Event | React.SyntheticEvent, newValue: number | number[]) => {
    const value = Array.isArray(newValue) ? newValue[0] : newValue;
    
    // Always update internal state
    setInternalValue(value);
    
    if (onChange) {
      onChange(event as any, value);
    }
  };

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
      {/* Slider Labels */}
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
