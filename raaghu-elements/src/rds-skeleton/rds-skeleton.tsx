import React from "react";
import "./rds-skeleton.css";

interface RdsSkeletonProps {
  shape?: "rectangle" | "circle"; // shape of the skeleton
  isAnimated?: boolean; // Determines whether the skeleton has an animation effect.
  width?: string; // width of the skeleton
  height?: string; // height of the skeleton
  state?: 1 | 2 | 3; // state of the skeleton
}

const RdsSkeleton = (props: RdsSkeletonProps) => {
  const { shape, isAnimated, width, height, state } = props;
  const sizeStyle = {
    width: width ?? "150px",
    height: shape === "circle" ? width ?? "150px" : height ?? "100px",
  };

  return (
    <div
      className={`rds-skeleton ${shape} state-${state} ${
        isAnimated ? "is-animated" : "static"
      }`}
      style={sizeStyle}
    ></div>
  );
};

export default RdsSkeleton;
