import React from "react";
import "./rds-fab-menu.css";
import { colors } from "../../libs/types";
import RdsIcon from "../rds-icon";

export interface RdsFabMenuProps {
  colorVariant?: colors;
  size?: string;
  menuIcon?: string;
  menuiconWidth?: string;
  menuiconHeight?: string;
  listItems: any[];
  onClick?: ( React.MouseEventHandler<HTMLButtonElement>);
}

const RdsFabMenu = (props: RdsFabMenuProps) => {
    const customClasses = `btn btn-${props.colorVariant} btn-icon fab-btn ${
        props.size == "small" ? "btn-sm" : props.size == "large" ? "btn-lg" : ""
    }`;

    return (
        <>
            <button
                className={customClasses}
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                data-testid="fab-menu-btn"
            >
                <RdsIcon
                    name="list"
                    fill={false}
                    stroke={true}
                    height="17px"
                    width="17px"
                    colorVariant="light"
                ></RdsIcon>
            </button>
            <div className="dropdown-menu fab-dropdown border-0 shadow mb-1" role="menu">
                {props.listItems.map((listItem)=>(
                    <a role="link" className="dropdown-item fab-dropdown-item d-flex py-3" onClick={listItem.onClick}>
                        <RdsIcon name={listItem.icon} height={listItem.iconHeight} width={listItem.iconWidth} fill={false} stroke={true}></RdsIcon>
                        <span className="ms-3">{listItem.value}</span>
                    </a>
                ))}
            </div>
        </>
    );
};

export default RdsFabMenu;
