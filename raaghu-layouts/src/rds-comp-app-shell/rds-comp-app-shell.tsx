import React, { ReactNode, useState } from "react";
import "./rds-comp-app-shell.css";
export interface RdsCompAppShellProps {
  displayType?: string;
  children?: ReactNode;
}

const RdsCompAppShell = (props: RdsCompAppShellProps) => {
  return (
    <div className="shell1">
      {props.children}
    </div>
  );
};

export default RdsCompAppShell;
