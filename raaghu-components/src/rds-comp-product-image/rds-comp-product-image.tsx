import React, { useState } from "react";
import {
    RdsLabel,
    RdsBadge,
    RdsIcon,
    RdsRating,
    RdsColorSwitcher,
    RdsButton,
} from "../rds-elements";
import "./rds-comp-product-image.css";
import { ColorVariant } from "../../../raaghu-elements/src/rds-rating/rds-rating";
export interface Item {
    imgUrl?: string;
    rating?: 0 | 1 | 2 | 3 | 4 | 5;
    reviews?: string;
    productTitle?: string;
    productDescription?: string;
    colorLabel?: string;
    cost?: string;
    badgeWithIcon?: { badge: string; icon: string };
    itemWidth?: string;
    ColorSwitcherList?: { id: number; color: string }[];
    showAddToBagButton?: boolean;
    bordered?: boolean;
    showBuyNowButton?: true;
}
export interface RdsCompProductImageProps {
    item: Item;
}
const RdsCompProductImage = (props: RdsCompProductImageProps) => {
    const borderedClass = props.item.bordered ? "border" : "";
    const [heartIconFill, setheartIconFill] = useState(false);
    const [heartIconColor, setheartIconColor] = useState("dark");
    const showAddToBagAndBuyNowButton =
        props.item.showBuyNowButton && props.item.showAddToBagButton;
    const buttonClass = showAddToBagAndBuyNowButton
        ? "d-flex justify-content-between"
        : "";
    const HeartIconClickHandler = () => {
        if (heartIconFill === false) {
            setheartIconFill(true);
            setheartIconColor("danger");
        } else {
            setheartIconFill(false);
            setheartIconColor("dark");
        }
    };
    return (
        <div
            className={
                "d-inline-block position-relative product-container " +
                borderedClass
            }
        >
            <img
                src={props.item.imgUrl}
                alt="product-img"
                className="product-img"
            ></img>
            <div className={props.item.bordered ? "m-3" : ""}>
                <div className="mt-3">
                    <h5><RdsLabel  label={props.item.productTitle} size="28px"></RdsLabel></h5>
                </div>
                <div className="position-absolute iconposition-heart">
                    <RdsIcon
                        name="heart"
                        colorVariant={heartIconColor}
                        height="21px"
                        width="25px"
                        fill={heartIconFill}
                        stroke={true}
                        onClick={HeartIconClickHandler}
                    ></RdsIcon>
                </div>
                {props.item.rating && (
                    <div className="mt-1 me-4 d-inline-block">
                        <RdsRating
                            rating={props.item.rating}
                            colorVariant={ColorVariant.Warning}
                        ></RdsRating>
                    </div>
                )}
                {props.item.reviews && (
                    <div className="d-inline-block">
                        <a href="#" className="text-decoration-none">
                            {props.item.reviews}
                        </a>
                    </div>
                )}

                {props.item.productDescription && (
                    <div className="mt-2 text-muted">{props.item.productDescription}</div>
                )}
                {props.item.colorLabel && (
                    <div className="mt-2">
                        <RdsLabel
                            label={props.item.colorLabel}
                            size="20px"
                        ></RdsLabel>
                    </div>
                )}
                <div className="d-flex justify-content-between mt-4">
                    {props.item.cost && (
                        <div>
                            <RdsLabel label="$35" size="32px"></RdsLabel>
                        </div>
                    )}
                    {props.item.badgeWithIcon && (
                        <div className="d-flex align-items-center">
                            <div className="mb-1">
                                <RdsBadge
                                    label={props.item.badgeWithIcon?.badge}
                                    size="small"
                                    shape="pill"
                                    colorVariant="warning"
                                    children={
                                        <RdsIcon
                                            name={props.item.badgeWithIcon?.icon}
                                            colorVariant="danger"
                                            height="15px"
                                            width="15px"
                                            fill={false}
                                            stroke={true}
                                        ></RdsIcon>
                                    }
                                ></RdsBadge>
                            </div>
                        </div>
                    )}
                </div>
                {props.item.ColorSwitcherList && (
                    <div className="">
                        <RdsColorSwitcher itemList={props.item.ColorSwitcherList} />
                    </div>
                )}

                {props.item.showBuyNowButton && props.item.showAddToBagButton && (
                    <div className="d-flex justify-content-between mt-2">
                        <RdsButton
                            colorVariant="primary"
                            type="button"
                            isOutline={true}
                            label="ADD TO BAG"
                            block={false}
                        ></RdsButton>
                        <RdsButton
                            colorVariant="primary"
                            type="button"
                            label="BUY NOW"
                            block={false}
                        ></RdsButton>
                    </div>
                )}
                {props.item.showBuyNowButton && !props.item.showAddToBagButton && (
                    <div className="mt-2">
                        <RdsButton
                            colorVariant="primary"
                            type="button"
                            label="BUY NOW"
                            block={true}
                        ></RdsButton>
                    </div>
                )}
                {props.item.showAddToBagButton && !props.item.showBuyNowButton && (
                    <div className="mt-2">
                        <RdsButton
                            colorVariant="primary"
                            type="button"
                            label="ADD TO BAG"
                            block={true}
                        ></RdsButton>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RdsCompProductImage;
