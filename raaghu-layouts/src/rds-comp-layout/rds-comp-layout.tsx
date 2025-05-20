import React, { ReactNode } from "react";
import "./rds-comp-layout.css";
import RdsCompLayoutItem from "./rds-comp-layout-item";
export interface RdsCompLayoutProps {
  displayType?: string;
  children?: ReactNode;
  hasShadow?: boolean;
}

const RdsCompLayout = (props: RdsCompLayoutProps) => {
  const getClasses = () => {
    let classes = "layout1";
    if (props.hasShadow) {
      classes += " layout-shadow";
    }
    return classes;
  };

  return (
    <div className={getClasses()}>
      <div className="">
        <div className="">{props.children}</div>
      </div>
    </div>
  );
};

export default RdsCompLayout;
