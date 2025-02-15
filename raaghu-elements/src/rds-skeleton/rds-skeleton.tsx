import React from "react";
import "./rds-skeleton.css";

interface RdsSkeletonProps {
  shape?: "rectangle" | "circle";
  isAnimated?: boolean;
  width?: string;
  height?: string;
  state?: 1 | 2 | 3; 
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
