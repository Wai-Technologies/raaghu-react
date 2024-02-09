import React, { Fragment } from "react";
import RdsIcon from "../rds-icon";
import "./rds-app-detail.css";
// import RdsCheckbox from "../rds-checkbox/rds-checkbox";

export interface RdsAppDetailProps {
	appDetailsItem: any;
}

const RdsAppDetail = (props: RdsAppDetailProps) => {
    return (
        <Fragment>
            <div className="card">
                <div className="p-3 d-flex justify-content-between">
                    <span className="icon-bg border p-1 rounded d-inline-block">
                        <RdsIcon
                            name={props.appDetailsItem.icon}
                            colorVariant={props.appDetailsItem.iconColor}
                            height={props.appDetailsItem.iconHeight}
                            width={props.appDetailsItem.iconWidth}
                            fill={props.appDetailsItem.iconFill}
                            stroke={props.appDetailsItem.iconStroke}
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
                            {props.appDetailsItem.title}
                        </label>
                    </div>
                    <div>
                        <label className="text-muted mt-1">
                            {props.appDetailsItem.subtitle}
                        </label>
                    </div>
                </div>
                <div className="border-top pb-4 ps-3 pe-3">
                    <a
                        href={props.appDetailsItem.route}
                        className="float-end p-2 fs-6 text-primary"
                    >
                        {props.appDetailsItem.routeLabel}
                    </a>
                </div>
            </div>
        </Fragment>
    );
};

export default RdsAppDetail;
