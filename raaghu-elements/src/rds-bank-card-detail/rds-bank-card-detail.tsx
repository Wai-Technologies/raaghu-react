import React, { Fragment, useState } from "react";
import RdsIcon from "../rds-icon";
import "./rds-bank-card-detail.css";

export interface RdsBankCardDetailProps {
    cardDatas: any;
    isSelectable?: boolean;
    isEditable?: boolean;
    onEdit?: (cardID: string) => void;
    onActiveButton?: (cardID: string) => void;
}

const RdsBankCardDetail = (props: RdsBankCardDetailProps) => {
    const [clicked, setClicked] = useState(false);
    const [activeButton, setActiveButton] = useState<number>();

    const clickHandler = (index: any, cardID: string) => {
        setActiveButton(index);
        if (props.onActiveButton) {
            props.onActiveButton(cardID);
        }
    };

    const setDefaultHandler = () => {
        setClicked(!clicked);
    };

    const editHandler = (cardID: string, e: React.MouseEvent<HTMLAnchorElement>) => {
        e.stopPropagation(); 
        if (props.onEdit) {
            props.onEdit(cardID);
        }
    };

    return (
        <Fragment>
            <div className="m-1 p-1">
                {props.cardDatas.map((data: any, index: number) => (
                    <div key={index} onClick={() => clickHandler(index, data.cardID)}>
                        <div className="cursor-pointer mb-4">
                            <div
                                className={`${activeButton === index ? "border__color p-4" : "border__gray p-4"
                                    }`}
                            >
                                <div className=" ">
                                    <div className="d-flex justify-content-between">
                                        <div className="d-flex align-items-center">
                                            <RdsIcon name={data.icon}
                                                height={data.iconHeight}
                                                width={data.iconWidth}
                                                fill={data.iconFill}
                                                stroke={data.iconstroke}
                                                colorVariant={data.iconColorVarient}
                                            />

                                            <div className="ms-1">
                                                <div className="ms-2 fs-6">
                                                    <span>{data.cardName} Ending with {data.cardNumber}</span>
                                                </div>
                                                <div className="ms-2 fs-7">
                                                    <span className="text-muted fs-7">
                                                        {" "}
                                                        Expiry {data.cardExpiry}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-check">
                                            {props.isSelectable == true ? (
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="flexRadioDefault"
                                                    id="flexRadioD"
                                                    checked={activeButton === index}
                                                />
                                            ) : (
                                                <input
                                                    className="form-check-input d-none"
                                                    type="radio"
                                                    name="flexRadioDefault"
                                                    id="flexRadioD"
                                                />
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {props.isEditable == true && (
                                    <div className="mt-2 ms-4">
                                        {activeButton == index ? (clicked == false ? (
                                            <a
                                                className="ms-3 text-primary text-decoration-none"
                                                onClick={setDefaultHandler}
                                            >
                                                Set as default
                                            </a>
                                        ) : (
                                            <a
                                                className="ms-3 text-muted me-1 text-decoration-none"
                                                onClick={setDefaultHandler}
                                            >
                                                Default
                                            </a>
                                        )) : (
                                            <a
                                                className="ms-3 text-primary text-decoration-none"
                                            >
                                                Set as default
                                            </a>
                                        )}

                                        <a
                                            className="text-primary ms-2 text-decoration-none"
                                            style={{ textDecoration: "auto" }}
                                            onClick={(e) => editHandler(data.cardID, e)}
                                        >
                                            Edit
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Fragment>
    );
};

export default RdsBankCardDetail;