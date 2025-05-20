import React, { Fragment } from "react";
import RdsIcon from "../rds-icon";
import "./rds-stat.css";

export interface RdsStatProps {
  displayType?: "basic" | "advanced";
  items: any[];
  colorVariant?: string;
  backgroundColorVarient?: string;
  textColor?: string;
}

const RdsStat = (props: RdsStatProps) => {
  const textColr = "text-" + props.colorVariant || "primary";
  return (
    <Fragment>
      {props.displayType == "basic" && (
        <div className="card border rounded-0 ">
          <div
            className="card-body align-items-center d-flex justify-content-center"
            style={{ backgroundColor: props.backgroundColorVarient || "white" }}
            data-testId="rds-stat"
          >
            {props.items.map((item: any) => (
              <div>
                <div className="grow mt-4 text-center">
                  <RdsIcon
                    name={item.icon}
                    fill={item.iconFill}
                    colorVariant={props.colorVariant}
                    //stroke={item.iconStroke}
                    height={item.iconHeight}
                    width={item.iconWidth}
                    isCursorPointer={true}
                  />
                </div>
                <h1 className={"fw-bold mt-4 text-center " + `${textColr}`}>
                  {item.value}
                </h1>
                <div>
                  <label className="fs-5 text-muted text-center">
                    {item.title}
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {props.displayType === "advanced" && (
        <div className="card advancestat border2">
          {props.items.map((item: any) => (
            <div
              className="card-body align-items-center card-body d-flex justify-content-center stathover "
            >
              <div className="d-block text-center">
                <h1 className={"fw-bold py-2 titlehover " + `${textColr}`}>
                  {item.value}
                </h1>
                <div>
                  <label className="fs-5 text-muted">{item.title}</label>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Fragment>
  );
};
export default RdsStat;
