import React from "react";

// Define possible size values
export type LoaderSize = "small" | "medium" | "large";

export interface RdsLoaderProps {
  loaderType?: string;
  size?: LoaderSize;
}

const RdsLoader = (props: RdsLoaderProps) => {
  const loaderClass = props.loaderType || "spinner-ring";
  const size = props.size || "medium";

  // Generate size-specific class 
  // It will only have an effect if CSS targets the combination (e.g., .spinner-ring.loader-medium)
  const sizeClass = `loader-${size}`;

  // Combine loader type and size classes
  const classes = `${loaderClass} ${sizeClass}`.trim();

  return (
    <div className="d-flex justify-content-center my-5">
      <div className={classes} />
    </div>
  );
};

export default RdsLoader;
