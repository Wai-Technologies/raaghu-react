import React, { useState } from "react";
import { RdsLabel, RdsIcon, RdsButton } from "../rds-elements";
import RdsCompProductImage, {
    Item,
} from "../rds-comp-product-image/rds-comp-product-image";
import "./rds-comp-product-list.css";
import { useTranslation } from "react-i18next";
export interface RdsCompProductListProps {
    items: Item[];
    type?: string;
}
const RdsCompProductList = (props: RdsCompProductListProps) => {

    const [isLoadMoreClicked, setisLoadMoreClicked] = useState(false);
    const loadMoreHandler = () => {
        setisLoadMoreClicked(true);
    };
    return (
        <div>
            {props.type === "With Tall Images And CTA Link" && (
                <div className="d-flex justify-content-between">
                    <h5>
                        <RdsLabel label="Trending Products" multiline={false}></RdsLabel>
                    </h5>
                    <a href="" className="text-decoration-none">
                        Shop the collection{" "}
                        <RdsIcon
                            height="16px"
                            fill={false}
                            stroke={true}
                            width="16px"
                            name="right"
                            colorVariant="primary"
                        ></RdsIcon>
                    </a>
                </div>
            )}
            {props.type === "With Color Swatches and Horizontal Scrolling" && (
                <div className="d-flex justify-content-between">
                    <h5>
                        <RdsLabel label="Trending Products" multiline={false}></RdsLabel>
                    </h5>
                    <a href="" className="text-decoration-none">
                        Shop everything{" "}
                        <RdsIcon
                            height="16px"
                            fill={false}
                            stroke={true}
                            width="16px"
                            name="right"
                            colorVariant="primary"
                        ></RdsIcon>
                    </a>
                </div>
            )}
            {props.type !== "Infinite List" &&
                props.items.map((item: any, index: any) => (
                    <div className="mb-5 d-inline-block h-100 gap-2 custom_margin_class">
                        <RdsCompProductImage item={item} />
                    </div>
                ))}
            {props.type === "Infinite List" && (
                <div>
                    {props.items.map((item: any, index: number) => (
                        <div className="mb-5 d-inline-block gap-2">
                            {index <= 5 && !isLoadMoreClicked && (
                                <RdsCompProductImage item={item} />
                            )}
                            {isLoadMoreClicked && <RdsCompProductImage item={item} />}
                        </div>
                    ))}
                    {!isLoadMoreClicked && (
                        <div className="d-flex justify-content-center">
                            <RdsButton
                                colorVariant="primary"
                                type="button"
                                label="Load More"
                                block={false}
                                onClick={loadMoreHandler}
                            ></RdsButton>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};


export default RdsCompProductList;
