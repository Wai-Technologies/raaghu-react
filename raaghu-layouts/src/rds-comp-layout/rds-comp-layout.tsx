import React, { ReactNode } from "react";
import "./rds-comp-layout.css";

export interface RdsCompLayoutProps {
  displayType?: string;
  children?: ReactNode;
}

const RdsCompLayout = (props: RdsCompLayoutProps) => {
  return (
    <div className="layout1">
      <div className="container">
        <div className="row">{props.children}</div>
      </div>
    </div>
  );
};

export default RdsCompLayout;
