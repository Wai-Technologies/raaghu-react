import React from "react";
import "./rds-price.css";
import RdsIcon from "../rds-icon/rds-icon";

export interface RdsPriceProps {
    mrp: number,
    currentPrice: number,
    type?: "priceOnLeft" | "priceOnRight"
    withDiscount: boolean
}

const RdsPrice = (props: RdsPriceProps) => {

    const discountInPrecent = Math.round((props.mrp - props.currentPrice) * 100 / props.mrp);

    return (
        <>

            {(props.type != "priceOnRight") && <div data-testId="price-on-left">
                <span className="fw-bold fs-4">${props.currentPrice}</span>
                <span className="text-muted m-2 text-decoration-line-through fs-5">${props.mrp}</span>
                {props.withDiscount && <span className="fs-6 text-primary" >{discountInPrecent}% off</span>}
                <span className="px-2"><RdsIcon name="question" width="16px" height="1em" isCursorPointer={true} stroke /></span>
            </div >}

            {(props.type === "priceOnRight") && <div data-testId="price-on-right">
                <span className="px-2"><RdsIcon name="question" width="16px" height="1em" isCursorPointer={true} stroke /></span>
                {props.withDiscount && <span className="fs-6 text-primary" >{discountInPrecent}% off</span>}
                <span className="text-muted m-2 text-decoration-line-through fs-5">${props.mrp}</span>
                <span className="fw-bold fs-4">${props.currentPrice}</span>
            </div >}


        </>
    );
};

export default RdsPrice;
