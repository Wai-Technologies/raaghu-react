import React, { useState } from "react";
import "./rds-comp-layout.css";

export interface RdsCompLayoutItemProps {
  title: string;
  children: React.ReactNode;
}

const RdsCompLayoutItem = (props: RdsCompLayoutItemProps) => {
  return (
    <>
      <div className="layout-item">
        <h2 className="layout-item-header">{props.title}</h2>
        <div className="layout-item-content">{props.children}</div>
      </div>
    </>
  );
};

export default RdsCompLayoutItem;

