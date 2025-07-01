import React, { Fragment } from "react";
import RdsCompIcon from "../../../raaghu-components/src/rds-comp-icon";
import "./rds-app-detail.css";

export enum IconPosition {
  Left = "left",
  Center = "center",
  Right = "right"
}
export interface RdsAppDetailProps {
  linkUrl?: string;
  iconPosition?: IconPosition;
  showUpperBorder?: boolean;
  appDetailsItem: {
    title: string;
    subtitle: string;
    icon: string;
    route: string;
    selected?: boolean;
    iconHeight: string;
    iconWidth: string;
    iconFill: boolean;
    iconColor: string;
    iconStroke: boolean;
    routeLabel: string;
  };
}

const RdsAppDetail = (props: RdsAppDetailProps) => {
  const getIconPositionStyle = () => {
    switch (props.iconPosition) {
      case "left":
        return { justifyContent: "flex-start" };
      case "center":
        return { justifyContent: "center" };
      case "right":
        return { justifyContent: "flex-end" };
      default:
        return {};
    }
  };

  return (
    <Fragment>
      <div className="card">
        <div className="p-3 d-flex" style={getIconPositionStyle()}>
          <span className="icon-bg border p-1 rounded d-inline-block">
            <RdsCompIcon
              name={props.appDetailsItem?.icon}
              colorVariant={props.appDetailsItem?.iconColor}
              height={props.appDetailsItem?.iconHeight}
              width={props.appDetailsItem?.iconWidth}
              fill={props.appDetailsItem?.iconFill}
              stroke={props.appDetailsItem?.iconStroke}
            />
          </span>
          <div>
            {/* <RdsCheckbox
                            label=""
                            withlabel={false}
                            classes="float-end"
                            checked={false}
                            isSwitch={true}
                            onChange={()=>{}}
                        ></RdsCheckbox> */}
          </div>
        </div>
        <div className="p-3 ps-3">
          <div>
            <label className="fs-5 fw-bold ">
              {props.appDetailsItem?.title}
            </label>
          </div>
          <div>
            <label className="text-muted mt-1">
              {props.appDetailsItem?.subtitle}
            </label>
          </div>
        </div>
        <div
          className={`pb-2 ps-3 pe-3 ${
            props.showUpperBorder ? "border-top" : ""
          }`}
        >
          <a href={props.linkUrl} className="float-end p-2 fs-6 text-primary">
            {props.appDetailsItem?.routeLabel}
          </a>
        </div>
      </div>
    </Fragment>
  );
};

export default RdsAppDetail;
