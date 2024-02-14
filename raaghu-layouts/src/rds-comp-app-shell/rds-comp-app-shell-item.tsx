import React, { useState } from "react";
import "./rds-comp-app-shell.css";

export interface RdsCompAppShellItemProps {
  title: string;
  children: React.ReactNode;
}

const RdsCompAppShellItem = (props: RdsCompAppShellItemProps) => {
  return (
    <>
      <div className="app-shell-item">
        <h2 className="app-shell-item-header">{props.title}</h2>
        <div className="app-shell-item-content">{props.children}</div>
      </div>
    </>
  );
};

export default RdsCompAppShellItem;