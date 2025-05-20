import React, { useState, useEffect } from "react";
import "./rds-rating.css";
import RdsIcon from "../rds-icon";

export enum ColorVariant {
  Primary = "primary",
  Success = "success",
  Danger = "danger",
  Warning = "warning",
  Light = "light",
  Info = "info",
  Secondary = "secondary",
  Dark = "dark",
}

export enum RatingType {
  Star = "star",
  Slider = "slider",
}

export enum RatingStyle {
  Default = "default",
  Filled = "filled",
  Outline = "outline",
}

export enum RatingLevel {
  Left = "left",
  Mid = "mid",
  Right = "right",
  Zero = "0",
  ZeroPointFive = "0-5",
  One = "1",
  OnePointFive = "1-5",
  Two = "2",
  TwoPointFive = "2-5",
  Three = "3",
  ThreePointFive = "3-5",
  Four = "4",
  FourPointFive = "4-5",
  Five = "5",
}

export interface RdsRatingProps {
  rating?: any; // The rating value
  colorVariant?: ColorVariant; // The color variant of the rating
  noOfReviews?: number; // The number of reviews
  size?: string; // The size of the rating
  type?: RatingType; // The type of the rating
  seeAllOption?: boolean; // Option to see all reviews
  onSeeAll?: () => void; // Callback function for the "See All" option
  dataTestId?: string; // The data-testid attribute
  outline?: boolean; // The outline style of the rating
  filled?: boolean; // The filled style of the rating
  defaultSlider?: boolean; // Determines whether the slider is the default slider
  style?: RatingStyle; // The style of the rating
  level?: RatingLevel; // The level of the rating
  totalStars?: number; // The total number of stars
}

const RdsRating = (props: RdsRatingProps) => {
  const [rating, setRating] = useState(props.rating || 0);
  const totalStars = props.totalStars || 5;
  const [value, setValue] = useState(0);

  useEffect(() => {
    setRating(props.rating || 0);
  }, [props.rating]);

  useEffect(() => {
    if (props.rating === "left") {
      setValue(0);
    } else if (props.rating === "mid") {
      setValue(1);
    } else if (props.rating === "right") {
      setValue(2);
    }
  }, [props.rating]);

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

  const lighterColor = lightenColor(primaryColor, 20); // Lighten the primary color by 20%

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
            key={i}
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
            key={i}
            height={props.size === 'small' ? '14px' : props.size === 'large' ? '22px' : '19px'}
            width={props.size === 'small' ? '14px' : props.size === 'large' ? '22px' : '19px'}
            fill={true}
            stroke={false}
            colorVariant="review"
            name={props.style === "outline" ? "starhalf_outline" : "starhalf"}
            classes={`me-2 star filled text-${props.colorVariant}`}
            onClick={() => handleRating(i)}
          />
        );
      } else {
        stars.push(
          <RdsIcon
            key={i}
            height={props.size === 'small' ? '14px' : props.size === 'large' ? '22px' : '19px'}
            width={props.size === 'small' ? '14px' : props.size === 'large' ? '22px' : '19px'}
            fill={false}
            stroke={false}
            colorVariant="review"
            name={props.style === "outline" ? "starempty_outline" : "starempty"}
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
      {props.type === "star" && props.style !== "default" && (
         <div className={`align-items-center d-flex d-lg-flex fs-5 starrating ${sizeClass}`}>
          {renderStars()}
        </div>
      )}

      {(props.type === "slider" || props.style === "default") && (
        <div className={`${props.size === "small" ? "slidercontainersm" : props.size === "large" ? "slidercontainerlg" : "slidercontainermd"}`}>
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