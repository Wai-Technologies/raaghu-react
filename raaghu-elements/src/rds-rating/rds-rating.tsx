import React, { useState } from "react";
import { colors, size } from "../../libs/types";
import "./rds-rating.css";

export interface RdsRatingProps {
  rating?: number,
  reviewPosition?: "left" | "right" | "none",
  colorVariant?: colors
  noOfReviews?: number
  size?: size
  seeAllOption?: boolean
  onSeeAll?: () => void
  dataTestId?: string
}

const RdsRating = (props: RdsRatingProps) => {

    /* 
  return (
    <div className="d-flex">
      <div className="Stars" data-testId={props.dataTestId}  style={{ "--rating":props.rating ,"--size":props.size} as React.CSSProperties}  aria-label="Rating of this product is 2.3 out of 5."></div>
  
    </div>
  ); */

    // const StarRating = () => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    return (
        <div className="starrating">
            <span className="me-2">1</span>
            {[...Array(5)].map((star, index) => {
                index += 1;
                return (
                    <button
                        type="button"
                        key={index}
                        className={index <= (hover || rating) ? "on" : "off"}
                        onClick={() => setRating(index)}
                        onMouseEnter={() => setHover(index)}
                        onMouseLeave={() => setHover(rating)}
                    >

                        <svg id="a" viewBox="0 0 21 21" fill="currentColor" height="25px" width="25px" ><path className="icon star" d="M4.081,19.633c-.097,.592,.45,1.055,.932,.791l5.487-3.008,5.486,3.008c.482,.264,1.03-.199,.932-.789l-1.037-6.306,4.402-4.474c.412-.419,.2-1.184-.352-1.267l-6.122-.928L11.079,.891c-.152-.341-.534-.487-.854-.325-.134,.068-.241,.182-.305,.325l-2.73,5.77-6.122,.928c-.551,.083-.765,.848-.354,1.267l4.404,4.474-1.037,6.306v-.003Z" /></svg>
                    </button>
                );
            })}<span> See all 123 review </span>
        </div>
    );
};


export default RdsRating;
/*{ <span className="">
        {(props.reviewPosition === "left" || props.reviewPosition === undefined) &&
          <span>{props.rating}</span>
        }
        {orderArray.map(order =>
          <span key={order} className="ps-1 rating-star-span-custom-class">
            <RdsIcon name="star"
              height="24px"
              width="24px"
              stroke={true}
              fill={order <= props.rating}
              colorVariant={props.colorVariant}
            ></RdsIcon>
          </span>
        )}
        {props.reviewPosition === "right" &&
          <span className="ps-1">{props.rating}</span>
        }
      </span>
      {props.seeAllOption &&
        <small className="ps-2 text-primary" onClick={props.onSeeAll}>
          See all {props.noOfReviews} reviews
        </small>
      } 
      
      
        <RdsIcon
              name="star"
              fill={true}
              stroke={true}
              colorVariant="danger"
              width="30px"
              height="30px"
            />
      
      <svg xmlns="http://www.w3.org/2000/svg" width="26px"
              height="26px" fill="currentColor"
              className="star fill"
              viewBox="0 0 16 16">
              <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" /> </svg>
       } */ 