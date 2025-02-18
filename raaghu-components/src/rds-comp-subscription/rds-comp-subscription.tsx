import React from "react";
import { RdsButton, RdsIcon } from "../rds-elements";
import "./rds-comp-subscription.css";
import { useTranslation } from "react-i18next";

export interface RdsCompSubscriptionProps {
    subscriptionData: any[];
    width?: string;
    onSubscription?: (event: React.MouseEventHandler<HTMLInputElement>, item: any) => void;
}

const RdsCompSubscription = (props: RdsCompSubscriptionProps) => {
    const getIcon = (feature: any) => {
        if (feature.isInclude == true) {
            return "tick_circle";
        } else return "close_circle";
    };

    const width = props.width || "226px";
    const subscriptionhandler = (event: any, item: any) => {
        props.onSubscription != undefined && props.onSubscription(event, item);

    };
    return (
        <>
            <div className="justify-content-center text-center my-4 col">
                {props.subscriptionData.map((item: any) => {
                    const bg = "bg-" + item.colorVariant || "primary";
                    const border = "border-" + item.colorVariant || "primary";
                    return (
                        <div className="px-2 position-relative mb-3 mx-2" data-testid="subscription-card" style={{ width: width }}>
                            {item.recommended ? (
                                <>
                                    {" "}
                                    <div className="ribbon">
                                        <span className="ribbon2">
                                            <RdsIcon
                                                name="star"
                                                colorVariant="light"
                                                fill={true}
                                                stroke={true}
                                                width="10px"
                                                height="10px"
                                                isCursorPointer={true}
                                            />
                                        </span>
                                    </div>
                                    <span className="bg-recommended text-white rounded px-3 pb-4 py-1 position-relative">
                                        RECOMMENDED
                                    </span>{" "}
                                </>
                            ) : <div className="notRecommended"></div>}
                            <div className={`card  ${border}`} style={{ width: width }}>
                                <h5 className={` card-header Header___name text-white ${bg}`}>{item.name}</h5>
                                <div className="card-body Card__body">
                                    <RdsIcon
                                        name={item.icon}
                                        colorVariant={item.colorVariant}
                                        fill={false}
                                        stroke={true}
                                        width="92px"
                                        height="100px"
                                        isCursorPointer={true}
                                    />
                                    <h2 className="card-title p-2 pb-0">{item.price}</h2>
                                    <p className="card-text fs-5">{item.duration}</p>
                                    <div className="d-flex justify-content-center">
                                        <div className="mt-4 mb-4 text-start">
                                            {item.features?.map((feature: any, index: number) => {
                                                return (
                                                    <div key={index} className="d-flex" >
                                                        <div className="me-2">
                                                            <RdsIcon
                                                                name={getIcon(feature)}
                                                                fill={false}
                                                                stroke={true}
                                                                colorVariant="dark"
                                                                width="16px"
                                                                height="16px"
                                                                isCursorPointer={true}
                                                            />
                                                        </div>
                                                        <div> {feature.title} </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                    <RdsButton
                                        type={"button"}
                                        label="Upgrade"
                                        isOutline={true}
                                        colorVariant="primary"
                                        class="me-2 ms-4 mt-4 upGrade__btn"
                                        onClick={(event) => subscriptionhandler(event, item)}
                                    ></RdsButton>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default RdsCompSubscription;
