import React, { useState, useEffect } from "react";
import "./rds-rating.css";
import RdsIcon from "../rds-icon";

export interface RdsRatingProps {
  rating?: number;
  colorVariant?:
    | "primary"
    | "success"
    | "danger"
    | "warning"
    | "light"
    | "info"
    | "secondary"
    | "dark";
  noOfReviews?: number;
  size?: string;
  type?: string;
  seeAllOption?: boolean;
  onSeeAll?: () => void;
  dataTestId?: string;
  outline?: boolean;
  filled?: boolean;
  defaultSlider?: boolean;
  style?: string;
  level?: "left" | "mid" | "right";
}

const RdsRating = (props: RdsRatingProps) => {
  const [rating, setRating] = useState(props.rating || 0);
  const totalStars = 5;
  const [value, setValue] = useState(0);

  useEffect(() => {
    setRating(props.rating || 0);
  }, [props.rating]);

  useEffect(() => {
    if (props.level === "left") {
      setValue(0);
    } else if (props.level === "mid") {
      setValue(1);
    } else if (props.level === "right") {
      setValue(2);
    }
  }, [props.level]);

  const handleRating = (rate: number) => {
    setRating(rate);
  };

  const sizeClass = `${
    props.size === "small"
      ? " fs-5"
      : props.size === "large"
      ? " fs-3"
      : " fs-4"
  }`;

  const handleChange = (e: any) => {
    setValue(Number(e.target.value));
  };

  const lightenColor = (color: string, percent: number) => {
    const num = parseInt(color.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return `#${(
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 1 ? 0 : B) : 255)
    )
      .toString(16)
      .slice(1)}`;
  };

  // Determine the primary color and its lighter version
  const primaryColor =
    props.colorVariant === 'primary' ? '#7e2eef' :
    props.colorVariant === 'success' ? '#24993A' :
    props.colorVariant === 'danger' ? '#E02D30' :
    props.colorVariant === 'warning' ? '#EA6C0C' :
    props.colorVariant === 'light' ? '#f8f9fa' :
    props.colorVariant === 'info' ? '#3ef1e8' :
    props.colorVariant === 'secondary' ? '#2539FF' :
    '#343a40';

  const lighterColor = lightenColor(primaryColor, 25); // Lighten the primary color by 25%

  const getBackgroundStyle = () => {
    let background = '';

    if (value === 0) {
      // When "No" is selected, use the lighter primary color for the entire slider
      background = `linear-gradient(90deg, ${lighterColor} 0%, ${lighterColor} 100%)`;
    } else if (value === 1) {
      // When "Maybe" is selected, fill from No to Maybe with the primary color
      background = `linear-gradient(90deg, ${primaryColor} 0%, ${primaryColor} 50%, ${lighterColor} 50%, ${lighterColor} 100%)`;
    } else if (value === 2) {
      // When "Yes" is selected, fill the entire slider with the primary color
      background = `linear-gradient(90deg, ${primaryColor} 0%, ${primaryColor} 100%)`;
    }

    return background;
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

            name={props.style ==="outline" ? "starhalf_outline" : "starhalf"}
            classes={`me-2 star filled text-${props.colorVariant}`}
            onClick={() => handleRating(i)}
          />
        );
      } else {
        stars.push(
          <RdsIcon
          height={props.size === 'small' ? '14px' : props.size === 'large' ? '22px' : '19px'}
          width={props.size === 'small' ? '14px' : props.size === 'large' ? '22px' : '19px'}
          fill={false}
          stroke={false}
          colorVariant="review"
            name={props.style ==="outline" ? "starempty_outline" : "starempty"}
            classes={`me-2 star empty ${props.colorVariant}`}
            onClick={() => handleRating(i)}
          />
        );
      }
    }
    return stars;
  };


  return (
    <>
      {!props.defaultSlider && (
        <div className={`starrating align-items-center d-flex gap-2 ${sizeClass}`}>
          {!props.outline && !props.filled && !props.defaultSlider && (
            <span className="fs-5 me-2 mt-2">{rating}</span>
          )}
          {renderStars()}
          {!props.outline && !props.filled && !props.defaultSlider && (
            <span className="fs-6 mt-1"> See all {props.noOfReviews} review </span>
          )}
        </div>
      )}

      {props.defaultSlider && (
        <div className={`${props.size === "small" ? "slidercontainersm" : props.size === "large" ? "slidercontainerlg" : "slidercontainermd"
              }`}>
          <input
            type="range"
            min="0"
            max="2"
            value={value}
            onChange={handleChange}
            style={{
              background: getBackgroundStyle(),
              '--thumb-color': primaryColor,
            } as React.CSSProperties}
            className="slider rounded"
          />
          <div className="labels">
            <span className={value === 0 ? "active" : ""}>No</span>
            <span className={value === 1 ? "active" : ""}>Maybe</span>
            <span className={value === 2 ? "active" : ""}>Yes</span>
          </div>
        </div>
      )}
    </>
  );
};

export default RdsRating;