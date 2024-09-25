import React, { ReactNode } from "react";
import "./rds-comp-layout.css";
import RdsCompLayoutItem from "./rds-comp-layout-item";
export interface RdsCompLayoutProps {
  displayType?: string;
  children?: ReactNode;
}

const RdsCompLayout = (props: RdsCompLayoutProps) => {
  return (
    <div className="layout1">
      <div className="">
        <div className="">{props.children}</div>
      </div>
    </div>
  );
};

export default RdsCompLayout;
