import React from 'react';
import { Rating as MuiRating, RatingProps } from '@mui/material';

export interface RdsRatingProps extends RatingProps {
  label?: string;
  showValue?: boolean;
  maxStars?: number;
}

const RdsRating: React.FC<RdsRatingProps> = ({
  label,
  showValue = false,
  maxStars = 5,
  max,
  value,
  ...props
}) => {
  const maxRating = max || maxStars;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      {label && <span>{label}</span>}
      <MuiRating
        max={maxRating}
        value={value}
        {...props}
      />
      {showValue && value !== undefined && (
        <span>({value}/{maxRating})</span>
      )}
    </div>
  );
};

export default RdsRating;
