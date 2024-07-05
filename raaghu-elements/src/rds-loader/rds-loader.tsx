import React, { Fragment } from "react";
export interface RdsLoaderProps {
  loaderType?: string;
}
const RdsLoader = (props: RdsLoaderProps) => {
  const loaderClass = props.loaderType;
  const classes = `${loaderClass}`.trim();
  return (
    <div className="d-flex justify-content-center my-5">
      <div className={classes} />
    </div>
  );
};
export default RdsLoader;
