import React from "react";
import "./rds-comp-app-shell.scss";

export interface RdsCompAppShellItemProps {
  title: string;
  children: React.ReactNode;
}

const RdsCompAppShellItem = (props: RdsCompAppShellItemProps) => {
  return (
    <>
      <div className="rds-comp-app-shell-item">
        <h2 className="rds-comp-app-shell-item__header">{props.title}</h2>
        <div className="rds-comp-app-shell-item__content">{props.children}</div>
      </div>
    </>
  );
};

export default RdsCompAppShellItem;