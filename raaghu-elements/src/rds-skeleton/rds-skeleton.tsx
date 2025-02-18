import React from "react";
import "./rds-skeleton.css";

interface RdsSkeletonProps {
  shape: "rectangle" | "circle";
  isAnimated: boolean;
  width?: string;
  height?: string;
}

const RdsSkeleton = (props: RdsSkeletonProps) => {
  const { shape, isAnimated, width, height } = props;
  const sizeStyle = {
    width: width ?? "200px",
    height: shape === "circle" ? width : height ?? "100px",
  };

  return (
    <div
      className={`rds-skeleton ${shape} ${
        isAnimated ? "is-animated" : "static"
      }`}
      style={sizeStyle}
    ></div>
  );
};

export default RdsSkeleton;
