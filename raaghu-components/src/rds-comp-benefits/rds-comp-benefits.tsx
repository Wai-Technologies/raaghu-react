import React from "react";
import RdsCompIcon from "../rds-comp-icon";
import "./rds-benefit.css";

export interface RdsCompBenefitsProps {
    item?: any,
    displayType: string,
    colsize?: number,
    itemList?: RdsCompBenefitItem[],
}

export interface RdsCompBenefitItem {
    id: number;
    title: string;
    description: string;
    icon?: string;
    iconHeight?: string;
    iconWidth?: string;
    iconFill?: boolean;
    iconstroke?: boolean;
    iconColorVarient?: string;
    colorVarient?: string;
    status?: string;
    imgSrc?: string;
    imgHeight?: string;
    imgWidth?: string;
}

const RdsCompBenefits = (props: RdsCompBenefitsProps) => {
    const bg = "bg-" + props.item?.colorVarient || "primary";

    // NEW: Array layout functionality (additional feature)
    if (props.itemList && props.itemList.length > 0) {
        const Column = "col-md-" + (props.colsize || 4);
        
        return (
            <div className="row">
                {props.itemList?.map((item: RdsCompBenefitItem, index: number) => (
                    <div className={Column} key={item.id || index} data-testId="rds-comp-benefits">
                        <div className="rds-benefit" data-component="rds-benefit">
                            {/* Default  */}
                            {props.displayType == "default" && <div className="pt-1 mb-4">
                                <div className="border p-4 text-center bg-light rounded" data-testid="defaultAligned">
                                    <div>
                                        <RdsCompIcon name={item.icon} height={item.iconHeight} width={item.iconWidth} fill={item.iconFill} stroke={item.iconstroke} colorVariant={item.iconColorVarient} />
                                    </div>
                                    <div className="mt-2 custom-text fw-bold">
                                        <label htmlFor=" "> {item.title}</label>
                                    </div>
                                    <div className="mt-1 text-muted">
                                        <label htmlFor=" "> {item.description}</label>
                                    </div>
                                </div>
                            </div>}
                            {/* Left Aligned */}
                            {props.displayType == "Left Aligned" && <div className="pt-1 " >
                                <div className="border p-4 text-left bg-light rounded" data-testid="leftAligned">
                                    <div>
                                    <RdsCompIcon name={item.icon} height={item.iconHeight} width={item.iconWidth} fill={item.iconFill} stroke={item.iconstroke} colorVariant={item.iconColorVarient} />
                                    </div>
                                    <div className="mt-3 custom-text fw-bold">
                                        <label htmlFor=" "> {item.title}</label>
                                    </div>
                                    <div className="mt-2 text-muted">
                                        <label htmlFor=" "> {item.description}</label>
                                    </div>
                                </div>
                            </div>}
                            {/* Center Aligned  */}
                            {props.displayType == "Center Aligned" &&
                                <div className="pt-1" >
                                    <div className="border p-4 text-center bg-light rounded" data-testid="centerAligned">
                                        <div>
                                            <span className="rounded-circle p-2 bg-secondary bg-opacity-10 d-inline-block">
                                                <RdsCompIcon name={item.icon} height={item.iconHeight} width={item.iconWidth} fill={item.iconFill} stroke={item.iconstroke} colorVariant={item.iconColorVarient} />
                                            </span>
                                        </div>
                                        <div className="mt-3 custom-text fw-bold">
                                            <label htmlFor=" "> {item.title}</label>
                                        </div>
                                        <div className="mt-2 text-muted px-5">
                                            <label htmlFor=" "> {item.description}</label>
                                        </div>
                                    </div>
                                </div>}

                            {/* With Label  */}
                            {props.displayType == "With Label" && <div className="pt-1" >
                                <div className="d-flex">
                                    <div className="d-flex align-items-center">
                                        {item.imgSrc ? (
                                            <img 
                                                src={item.imgSrc} 
                                                height={item.imgHeight || "40px"} 
                                                width={item.imgWidth || "40px"} 
                                                alt={item.title}
                                            />
                                        ) : (
                                            <RdsCompIcon name={item.icon} height={item.iconHeight} width={item.iconWidth} fill={item.iconFill} stroke={item.iconstroke} colorVariant={item.iconColorVarient} />
                                        )}
                                    </div>
                                    <div className="ms-3 mt-3  ">
                                        <div className="custom-text fw-bold " >
                                            <label htmlFor=" "> {item.title}</label>
                                            <span className={"ms-1 badge bg-" + (item.colorVarient || "primary")} >{item.status} </span>
                                        </div>
                                        <div className="pe-5 text-muted">
                                            <label htmlFor=" "> {item.description}</label>
                                        </div>
                                    </div>
                                </div>
                            </div>}

                            {/* Without Label */}
                            {props.displayType == "Without Label" && <div className="pt-1">
                                <div className="d-flex">
                                    <div className="d-flex align-items-center">
                                        <span className="rounded-circle p-2 bg-secondary bg-opacity-10">
                                            <RdsCompIcon name={item.icon} height={item.iconHeight} width={item.iconWidth} fill={item.iconFill} stroke={item.iconstroke} colorVariant={item.iconColorVarient} />
                                        </span>
                                    </div>
                                    <div className="ms-3 ">
                                        <div className=" custom-text fw-bold" >
                                            <label htmlFor=" "> {item.title}</label>
                                        </div>
                                        <div className="pe-5 text-muted">
                                            <label htmlFor=" "> {item.description}</label>
                                        </div>
                                    </div>
                                </div>
                            </div>}

                            {/* Heading With Icon  */}
                            {props.displayType == "Heading With Icon" && <div className="pt-1">
                                <div className="d-flex align-items-center">
                                    <div className="d-flex align-items-center">
                                        <span className="rounded-circle p-2 bg-secondary bg-opacity-10">
                                            <RdsCompIcon name={item.icon} height={item.iconHeight} width={item.iconWidth} fill={item.iconFill} stroke={item.iconstroke} colorVariant={item.iconColorVarient} />
                                        </span>
                                    </div>
                                    <div className="ms-3 custom-text fw-bold">
                                        <div>
                                            <label htmlFor=" "> {item.title}</label>
                                        </div>
                                    </div>
                                </div>
                            </div>}
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    // ORIGINAL: Single item logic (unchanged)
    return (
        <div className="rds-benefit" data-component="rds-benefit">
            {/* Default  */}
            {props.displayType == "default" && <div className="pt-1 mb-4">
                <div className="border p-4 text-center bg-light rounded" data-testid="defaultAligned">
                    <div>
                        <RdsCompIcon name={props.item.icon} height={props.item.iconHeight} width={props.item.iconWidth} fill={props.item.iconFill} stroke={props.item.iconstroke} colorVariant={props.item.iconColorVarient} />
                    </div>
                    <div className="mt-2 custom-text fw-bold">
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
                    <RdsCompIcon name={props.item.icon} height={props.item.iconHeight} width={props.item.iconWidth} fill={props.item.iconFill} stroke={props.item.iconstroke} colorVariant={props.item.iconColorVarient} />
                    </div>
                    <div className="mt-3 custom-text fw-bold">
                        <label htmlFor=" "> {props.item.title}</label>
                    </div>
                    <div className="mt-2 text-muted">
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
                                <RdsCompIcon name={props.item.icon} height={props.item.iconHeight} width={props.item.iconWidth} fill={props.item.iconFill} stroke={props.item.iconstroke} colorVariant={props.item.iconColorVarient} />
                            </span>
                        </div>
                        <div className="mt-3 custom-text fw-bold">
                            <label htmlFor=" "> {props.item.title}</label>
                        </div>
                        <div className="mt-2 text-muted px-5">
                            <label htmlFor=" "> {props.item.description}</label>
                        </div>
                    </div>
                </div>}

            {/* With Label  */}
            {props.displayType == "With Label" && <div className="pt-1" >
                <div className="d-flex">
                    <div className="d-flex align-items-center">
                    <RdsCompIcon name={props.item.icon} height={props.item.iconHeight} width={props.item.iconWidth} fill={props.item.iconFill} stroke={props.item.iconstroke} colorVariant={props.item.iconColorVarient} />

                    </div>
                    <div className="ms-3 mt-3  ">

                        <div className="custom-text fw-bold " >
                            <label htmlFor=" "> {props.item.title}</label>
                            <span className={"ms-1 badge " + `${bg}`} >{props.item.status} </span>
                        </div>
                        <div className="pe-5 text-muted">
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
                            <RdsCompIcon name={props.item.icon} height={props.item.iconHeight} width={props.item.iconWidth} fill={props.item.iconFill} stroke={props.item.iconstroke} colorVariant={props.item.iconColorVarient} />
                        </span>
                    </div>
                    <div className="ms-3 ">
                        <div className=" custom-text fw-bold" >
                            <label htmlFor=" "> {props.item.title}</label>
                        </div>
                        <div className="pe-5 text-muted">
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
                            <RdsCompIcon name={props.item.icon} height={props.item.iconHeight} width={props.item.iconWidth} fill={props.item.iconFill} stroke={props.item.iconstroke} colorVariant={props.item.iconColorVarient} />
                        </span>
                    </div>
                    <div className="ms-3 custom-text fw-bold">
                        <div>
                            <label htmlFor=" "> {props.item.title}</label>
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    );
};
export default RdsCompBenefits;