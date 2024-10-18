import React, { useState, useEffect } from "react";
import "./rds-rating.css";
import RdsIcon from "../rds-icon";

export interface RdsRatingProps {
  rating?: number;
  colorVariant?: "primary" | "success" | "danger" | "warning" | "light" | "info" | "secondary" | "dark";
  noOfReviews?: number;
  size?: string;
  seeAllOption?: boolean;
  onSeeAll?: () => void;
  dataTestId?: string;
}
const RdsRating = (props: RdsRatingProps) => {
  const sizeClass = `${props.size === 'small' ? ' fs-5' : props.size === 'large' ? ' fs-3' : ' fs-4'}`;
  const [rating, setRating] = useState(props.rating || 0);
  const totalStars = 5;

  useEffect(() => {
    setRating(props.rating || 0);
  }, [props.rating]);

  const handleRating = (rate: number) => {
    setRating(rate);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= totalStars; i++) {
      if (i <= rating) {
        stars.push(
          <RdsIcon
          height={props.size === 'small' ? '14px' : props.size === 'large' ? '22px' : '19px'}
          width={props.size === 'small' ? '14px' : props.size === 'large' ? '22px' : '19px'}
          fill={true}
          stroke={false}
          name="star"
          colorVariant="review"

            classes={`me-2 star filled text-${props.colorVariant}`}
            onClick={() => handleRating(i)}
          />
        );
      } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
        stars.push(
          <RdsIcon
          height={props.size === 'small' ? '14px' : props.size === 'large' ? '22px' : '19px'}
          width={props.size === 'small' ? '14px' : props.size === 'large' ? '22px' : '19px'}
          fill={true}
          stroke={false}
          colorVariant="review"

            name="starhalf"
            classes={`me-2 star half-filled text-${props.colorVariant}`}
            onClick={() => handleRating(i)}
          />
        );
      } else {
        stars.push(
          <RdsIcon
          height={props.size === 'small' ? '14px' : props.size === 'large' ? '22px' : '19px'}
          width={props.size === 'small' ? '14px' : props.size === 'large' ? '22px' : '19px'}
          fill={true}
          stroke={false}
          colorVariant="review"
            name="starempty"
            classes={`me-2 star empty ${props.colorVariant}`}
            onClick={() => handleRating(i)}
          />
        );
      }
    }
    return stars;
  };

  return (
    <div className="rds-rating d-flex" data-testid={props.dataTestId}>
      {renderStars()}
      {props.noOfReviews && <span  className="reviews fs-6 mt-1">({props.noOfReviews})</span>}
      {props.seeAllOption && (
        <button className="see-all fs-6 mt-1" onClick={props.onSeeAll}>
          See All
        </button>
      )}
    </div>
  );
};

export default RdsRating;