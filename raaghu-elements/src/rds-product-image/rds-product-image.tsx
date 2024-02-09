import React from "react";
import "./rds-product-image.css";

export interface RdsProductImageProps {
  displayType:
    | string
    | "basic"
    | "product-overview1"
    | "product-overview2"
    | "product-overview3";
  images: string[];
  itemList: string[];
}

const RdsProductImage = (props: RdsProductImageProps) => {
    return (
        <>
            {/*******  BASIC *********/}

            {props.displayType === "basic" && (
                <div>
                    {props.images.map((image) => (
                        <img src={image} className="w-100" alt={image}/>
                    ))}
                </div>
            )}

            {/*******  Product Overview 1 *********/}

            {props.displayType === "product-overview1" && (
                <div className="container-fluid w-100">
                    <div className="row d-flex justify-content-between">
                        <div className="col-md-4">
                            <div className="bg-light border h-100 w-100 align-items-start card-stretch d-flex align-items-center">
                                <img src={props.itemList[0]} className="w-100 img-fluid" alt={props.itemList[0]} />
                            </div>
                        </div>
                        <div className="col-md-4 d-flex flex-column justify-content-between">
                            <div
                                className="w-100 h-45 card-stretch d-flex"
                            >
                                <img
                                    src={props.itemList[1]}
                                    className="w-100 h-100 img-fluid"
                                    alt={props.itemList[1]}
                                />
                            </div>
                            <div
                                className="w-100 h-45 card-stretch d-flex"
                            >
                                <img
                                    src={props.itemList[2]}
                                    className="w-100 h-100 img-fluid"
                                    alt={props.itemList[2]}
                                />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="bg-light border h-100 w-100 card-stretch d-flex img-fluid align-items-start">
                                <img src={props.itemList[3]} className="w-100" alt={props.itemList[3]} />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/*******  Product Overview 2 *********/}

            {props.displayType === "product-overview2" && (
                <div className="container-fluid w-100">
                    <div className="row">
                        <div className="col-md-12">
                            <img src={props.itemList[0]} className="w-100" alt={props.itemList[0]} />
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col align-items-center justify-content-center">
                            <img src={props.itemList[1]} className="w-100" alt={props.itemList[1]}/>
                        </div>
                        <div className="col align-items-center justify-content-center">
                            <img src={props.itemList[2]} className="w-100" alt={props.itemList[2]} />
                        </div>
                    </div>
                </div>
            )}

            {/*******  Product Overview 3 *********/}

            {props.displayType === "product-overview3" && (
                <div>
                    <div className="container-fluid w-100" />
                    <div className="row">
                        <div className="col-md-12">
                            <img src={props.itemList[0]} className="w-100" alt={props.itemList[0]}/>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col d-flex align-items-center justify-content-center">
                            <img src={props.itemList[1]} className="w-100"alt={props.itemList[1]} />
                        </div>
                        <div className="col d-flex align-items-center justify-content-center">
                            <img src={props.itemList[2]} className="w-100"  alt={props.itemList[2]}/>
                        </div>
                        <div className="col d-flex align-items-center justify-content-center">
                            <img src={props.itemList[3]} className="w-100" alt={props.itemList[3]}/>
                        </div>
                        <div className="col d-flex align-items-center justify-content-center">
                            <img src={props.itemList[4]} className="w-100" alt={props.itemList[4]}/>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default RdsProductImage;
