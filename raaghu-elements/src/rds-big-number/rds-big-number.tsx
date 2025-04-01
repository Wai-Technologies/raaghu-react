import React, { Fragment, ReactNode } from "react";
import RdsIcon from "../rds-icon";
import "./rds-big-number.css";
import RdsBarChart from "../rds-chart-bar";
import RdsLineChart from "../rds-chart-line";


export interface RdsBigNumberProps {
  colorVariant?: string;
  subTitleColorVariant?: string;
  bigNumber: string;
  bigNumberColor?: string;
  subTitle?: string;
  class?: string;
  icon?: string;
  iconHeight?: string;
  iconStroke?: boolean;
  iconFill?: boolean;
  iconWidth?: string;
  iconColor?: string;
  children?: ReactNode;
  chartHeight?: number;
  chartWidth?: number;
  textAlign?: string;
  backgroundColor?: string;
  isIconSubTitle?: boolean;
}

const RdsBigNumber = (props: RdsBigNumberProps) => {
  const tAlign = props.textAlign;
  const Align = `${props.hasOwnProperty("textAlign") ? tAlign : "text-start"}`;
  const alignclasses = `${Align === "text-start"
    ? " text-start "
    : Align === "text-center"
      ? " text-center "
      : Align === "text-end"
        ? " text-end "
        : ""
    }`;

  const borderColor = " border-" + props.subTitleColorVariant;
  const bgColor =
    " bg-" + (props.colorVariant || "  text-white bg-gradient-primary ");
  const subTitleColor = "text-" + (props.subTitleColorVariant || "primary");

  const renderChildren = () => {
    if (props.children) {
      if (React.isValidElement(props.children)) {
        if (props.children.type === RdsBarChart) {
          return React.cloneElement(props.children, {
            ...props.children.props,
            height: props.chartHeight,
            width: props.chartWidth,
          });
        } else if (props.children.type === RdsLineChart) {

          return React.cloneElement(props.children, {
            ...props.children.props,
            height: props.chartHeight,
            width: props.chartWidth,
          });
        }
      }
      return props.children;
    }
    return null;
  };

  return (
    <Fragment>
      {!props.children && (
        <div className="card border-0 card-title bg-transparent">
          <div className={alignclasses}>
            <h2 className={`text-${props.bigNumberColor} mb-0`}>{props.bigNumber}</h2>
            {props.isIconSubTitle && (
              <h6 className={`text-${props.subTitleColorVariant}`}>
                <RdsIcon
                  name={props.icon}
                  fill={props.iconFill}
                  classes="ms-1"
                  stroke={props.iconStroke}
                  height={props.iconHeight}
                  width={props.iconWidth}
                  isCursorPointer={true}
                ></RdsIcon>
                {props.subTitle}
              </h6>
            )}

          </div>
        </div>
      )}
      {props.children && (
        <div
          className={
            "border-top  border-3  d-flex justify-content-center align-items-center big-number p-3 gap-4" +
            borderColor
          }
        >
          <div className="">
            <div className="fs-1 text-center">
              <p className="mb-0">
                <b className={`text-${props.bigNumberColor} mb-0`}>{props.bigNumber}</b>
              </p>
              <p className={"fs-6 mb-0 " + subTitleColor}>{props.subTitle}</p>
            </div>
          </div>
          <div className="">
            <div className="align-items-center justify-content-center d-flex">
              {renderChildren()}
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};
export default RdsBigNumber;
