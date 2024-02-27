// import React, { useState } from "react";
// import { colors, size } from "../../libs/types";
// import "./rds-rating.css";

// export interface RdsRatingProps {
//   rating?: number,
//   reviewPosition?: "left" | "right" | "none",
//   colorVariant?: colors
//   noOfReviews?: number
//   size?: size
//   seeAllOption?: boolean
//   onSeeAll?: () => void
//   dataTestId?: string
// }

// const RdsRating = (props: RdsRatingProps) => {

//     const [rating, setRating] = useState(0);
//     const [hover, setHover] = useState(0);
//     return (
//         <div className="starrating">
//             <span className="me-2">1</span>
//             {[...Array(5)].map((star, index) => {
//                 index += 1;
//                 return (
//                   <button
//                   type="button"
//                   key={index}
//                   className={index <= (hover || rating) ? "on" : "off"}
//                   onClick={() => setRating(index)}
//                   onMouseEnter={() => setHover(index)}
//                   onMouseLeave={() => setHover(rating)}
//                 >
//                   <svg id="a" viewBox="0 0 21 21" fill="currentColor" height="25px" width="25px" >
//                     <path className="icon star" d="M4.081,19.633c-.097,.592,.45,1.055,.932,.791l5.487-3.008,5.486,3.008c.482,.264,1.03-.199,.932-.789l-1.037-6.306,4.402-4.474c.412-.419,.2-1.184-.352-1.267l-6.122-.928L11.079,.891c-.152-.341-.534-.487-.854-.325-.134,.068-.241,.182-.305,.325l-2.73,5.77-6.122,.928c-.551,.083-.765,.848-.354,1.267l4.404,4.474-1.037,6.306v-.003Z" />
//                   </svg>
//                 </button>
//                 );
//             })}<span> See all 123 review </span>
//         </div>
//     );
// };


// export default RdsRating;


import React, { useState } from "react";
import "./rds-rating.css";

export interface RdsRatingProps {
  rating?: number,
  colorVariant?: "primary" | "success" | "danger" | "warning" | "light" | "info" | "secondary" | "dark"
  noOfReviews?: number
  size?: any
  seeAllOption?: boolean
  onSeeAll?: () => void
  dataTestId?: string
}

const RdsRating = (props: RdsRatingProps) => {

  const [rating, setRating] = useState(props.rating || 0);
  const [hover, setHover] = useState(0);
  const totalStars = 5;

  const handleRating = (rate: number) => {
    setRating(rate);
  };

  return (
    <div className="starrating">
      <span className="me-2">{rating}</span>
      {[...Array(totalStars)].map((_, i) => (
        <button
          type="button"
          key={i}
          className={`${i < rating ? "on" : "off"} ${i <= hover ? "on" : ""} ${props.colorVariant}`}
          onClick={() => handleRating(i + 1)}
        >
          <svg id="a" viewBox="0 0 21 21" fill="currentColor" height="25px" width="25px" >
            <path className="icon star" d="M4.081,19.633c-.097,.592,.45,1.055,.932,.791l5.487-3.008,5.486,3.008c.482,.264,1.03-.199,.932-.789l-1.037-6.306,4.402-4.474c.412-.419,.2-1.184-.352-1.267l-6.122-.928L11.079,.891c-.152-.341-.534-.487-.854-.325-.134,.068-.241,.182-.305,.325l-2.73,5.77-6.122,.928c-.551,.083-.765,.848-.354,1.267l4.404,4.474-1.037,6.306v-.003Z" />
          </svg>
        </button>
      ))}
      <span> See all 123 review </span>
    </div>
  );
};


export default RdsRating;
