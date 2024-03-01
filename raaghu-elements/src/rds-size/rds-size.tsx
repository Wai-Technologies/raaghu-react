import React, { Fragment, useState } from "react";
import "./rds-size.css";

export interface RdsSizeProps {
    sizeType: string;
    sizeData?: any[];
    sizeDataWithDescription?: any[];
}

const RdsSize = (props: RdsSizeProps) => {
    // const [clicked, setClicked] = useState(false);
    const [activeButton, setActiveButton] = useState("");

    return (
        <Fragment>
            {props.sizeType == "withDescription" && (
                <div className="">
                    <ul className="d-flex ulStyle" id="rds-size">
                        {props.sizeDataWithDescription &&
                            props.sizeDataWithDescription.map((data: any, index: any) => (
                                <li className="me-3 mt-3 border flex-evens">
                                    <div
                                        key={index}
                                        onClick={() => {
                                            setActiveButton(index);
                                        }}
                                        className={`p-3 ${activeButton === index ? "border-color" : ""
                                            }`}
                                        data-testid={`size-button-${index}`}
                                    >
                                        <div className="size text-dark fw-medium">{data.value}</div>
                                        <div className="description">{data.description}</div>
                                    </div>
                                </li>
                            ))}
                    </ul>
                </div>
            )}

            {props.sizeType == "withoutDescription" && (
                <ul className="d-flex" id="rds-size">
                    {props.sizeData &&
                        props.sizeData.map((data: any, index: any) => (
                            <li className="me-3 mt-3 border flex-even text-center  d-flex">
                                <div
                                    key={index}
                                    onClick={() => {
                                        setActiveButton(index);
                                    }}
                                    className={`${data.inStock
                                            ? activeButton === index
                                                ? " flex-even d-flex border-color"
                                                : "flex-even  d-flex"
                                            : " outOfStock"
                                        }`}
                                >
                                    {!data.inStock && <div className=" Out"> {data.value} </div>}
                                    <div
                                        className={`${data.inStock
                                                ? "size-small align-self-center mx-auto "
                                                : "outOfStock1"
                                            }`}
                                    >
                                        {data.inStock && <> {data.value}</>}
                                    </div>
                                </div>
                            </li>
                        ))}
                </ul>
            )}
        </Fragment>
    );
};
export default RdsSize;
