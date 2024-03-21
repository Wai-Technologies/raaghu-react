import React, { useState, useEffect } from "react";
import "./rds-rating.css";
import RdsIcon from "../rds-icon";

export interface RdsRatingProps {
  rating?: number,
  colorVariant?: "primary" | "success" | "danger" | "warning" | "light" | "info" | "secondary" | "dark"
  noOfReviews?: number
  size?: string;
  seeAllOption?: boolean
  onSeeAll?: () => void
  dataTestId?: string
}

const RdsRating = (props: RdsRatingProps) => {

  const [rating, setRating] = useState(props.rating || 0);
  const totalStars = 5;
  useEffect(() => {
    setRating(props.rating || 0);
  }, [props.rating]);

  const handleRating = (rate: number) => {
    setRating(rate);
  };

  const sizeClass = `${props.size === 'small' ? ' fs-5' : props.size === 'large' ? ' fs-3' : ' fs-4'}`;

  return (
    <div className={`starrating align-items-center d-flex gap-2 ${sizeClass}`}>
      <span className="fs-5 me-2 mt-2">{rating}</span>
      {[...Array(totalStars)].map((_, i) => (
        <RdsIcon
          key={i}
          height={props.size === 'small' ? '14px' : props.size === 'large' ? '22px' : '19px'}
          width={props.size === 'small' ? '14px' : props.size === 'large' ? '22px' : '19px'}
          fill={true}
          stroke={false}
          name="star"
          colorVariant="review"
          classes={`${i < rating ? `on text-${props.colorVariant}` : "off"}`}
          onClick={() => handleRating(i + 1)}
        />
      ))}
      <span className="fs-6 mt-1"> See all {props.noOfReviews} review </span>
    </div>
  );
};

export default RdsRating;
