import React from "react";
import RdsIcon from "../rds-icon";

export interface RdsBenefitProps {
    item: any,
    displayType: string,
}

const RdsBenefit = (props: RdsBenefitProps) => {
    const bg = "bg-" + props.item.colorVarient || "primary";

    return (
        <>
            {/* Default  */}
            {props.displayType == "default" && <div className="pt-1 mb-4">
                <div className="border p-4 text-center bg-light rounded" data-testid="defaultAligned">
                    <div>
                        <RdsIcon name={props.item.icon} height={props.item.iconHeight} width={props.item.iconWidth} fill={props.item.iconFill} stroke={props.item.iconstroke} colorVariant={props.item.iconColorVarient} />
                    </div>
                    <div className="mt-2 fw-bold">
                        <label htmlFor=" "> {props.item.title}</label>
                    </div>
                    <div className="mt-1 text-muted">
                        <label htmlFor=" "> {props.item.description}</label>

                    </div>
                </div>
            </div>}
            {/* Left Aligned */}
            {props.displayType == "Left Aligned" && <div className="pt-1 " >
                <div className="border p-4 text-left bg-light rounded" data-testid="leftAligned">
                    <div>
                    <RdsIcon name={props.item.icon} height={props.item.iconHeight} width={props.item.iconWidth} fill={props.item.iconFill} stroke={props.item.iconstroke} colorVariant={props.item.iconColorVarient} />
                    </div>
                    <div className="mt-3 fw-bold">
                        <label htmlFor=" "> {props.item.title}</label>
                    </div>
                    <div className="mt-2">
                        <label htmlFor=" "> {props.item.description}</label>
                    </div>
                </div>
            </div>}
            {/* Center Aligned  */}
            {props.displayType == "Center Aligned" &&
                <div className="pt-1" >
                    <div className="border p-4 text-center bg-light rounded" data-testid="centerAligned">
                        <div>
                            <span className="rounded-circle p-2 bg-secondary bg-opacity-10 d-inline-block">
                                <RdsIcon name={props.item.icon} height={props.item.iconHeight} width={props.item.iconWidth} fill={props.item.iconFill} stroke={props.item.iconstroke} colorVariant={props.item.iconColorVarient} />
                            </span>
                        </div>
                        <div className="mt-3 fw-bold">
                            <label htmlFor=" "> {props.item.title}</label>
                        </div>
                        <div className="mt-2 px-5">
                            <label htmlFor=" "> {props.item.description}</label>
                        </div>
                    </div>
                </div>}

            {/* With Label  */}
            {props.displayType == "With Label" && <div className="pt-1" >
                <div className="d-flex">
                    <div className="d-flex align-items-center">
                    <RdsIcon name={props.item.icon} height={props.item.iconHeight} width={props.item.iconWidth} fill={props.item.iconFill} stroke={props.item.iconstroke} colorVariant={props.item.iconColorVarient} />

                    </div>
                    <div className="ms-3 mt-3  ">

                        <div className=" fw-bold " >
                            <label htmlFor=" "> {props.item.title}</label>
                            <span className={"ms-1 badge " + `${bg}`} >{props.item.status} </span>
                        </div>
                        <div className="pe-5">
                            <label htmlFor=" "> {props.item.description}</label>
                        </div>
                    </div>
                </div>
            </div>}

            {/* Without Label */}
            {props.displayType == "Without Label" && <div className="pt-1"
            >
                <div className="d-flex">
                    <div className="d-flex align-items-center">
                        <span className="rounded-circle p-2 bg-secondary bg-opacity-10">
                            <RdsIcon name={props.item.icon} height={props.item.iconHeight} width={props.item.iconWidth} fill={props.item.iconFill} stroke={props.item.iconstroke} colorVariant={props.item.iconColorVarient} />
                        </span>
                    </div>
                    <div className="ms-3 ">
                        <div className=" fw-bold" >
                            <label htmlFor=" "> {props.item.title}</label>
                        </div>
                        <div className="pe-5">
                            <label htmlFor=" "> {props.item.description}</label>
                        </div>
                    </div>
                </div>
            </div>}

            {/* Heading With Icon  */}
            {props.displayType == "Heading With Icon" && <div className="pt-1">
                <div className="d-flex align-items-center">
                    <div className="d-flex align-items-center">
                        <span className="rounded-circle p-2 bg-secondary bg-opacity-10">
                            <RdsIcon name={props.item.icon} height={props.item.iconHeight} width={props.item.iconWidth} fill={props.item.iconFill} stroke={props.item.iconstroke} colorVariant={props.item.iconColorVarient} />
                        </span>
                    </div>
                    <div className="ms-3 fw-bold">
                        <div>
                            <label htmlFor=" "> {props.item.title}</label>
                        </div>
                    </div>
                </div>
            </div>}
        </>
    );
};
export default RdsBenefit;