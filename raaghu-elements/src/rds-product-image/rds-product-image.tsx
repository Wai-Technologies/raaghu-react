import React from "react";
import "./rds-product-image.css";

export interface RdsProductImageProps {
    displayType: string,
    images: string[];
    itemList: string[];
}

const RdsProductImage = (props: RdsProductImageProps) => {
    return (
        <>
            {/*******  BASIC *********/}

            {props.displayType === "default" && (
                <div>
                    {props.images.map((image) => (
                        <img src={image} className="w-100" alt={image} />
                    ))}
                </div>
            )}

            {/*******  Product Overview 1 *********/}

            {props.displayType === "column-layout" && (
                <div>
                    <div className="container-fluid w-100" />
                    <div className="row">
                        <div className="col-md-4">
                            <div className="bg-light h-100 w-100 align-items-start card-stretch-100 border">
                            <img src={props.itemList[0]} className="h-100 w-100" alt={props.itemList[0]} />
                            </div>
                        </div>
                    
                    <div className="col-md-4">
                        <div className="bg-light border w-100 card-stretch-50 mb-4">
                            <img src={props.itemList[1]} className="w-100 h-100" alt={props.itemList[1]} />
                        </div>
                        <div className="bg-light border w-100 card-stretch-50">
                            <img src={props.itemList[2]} className="w-100 h-100" alt={props.itemList[2]} />
                        </div>                       
                    </div>
                    <div className="col-md-4">
                        <div className="bg-light h-100 w-100 card-stretch-100 border">
                        <img src={props.itemList[3]} className="h-100 w-100" alt={props.itemList[3]} />
                        </div>
                    </div>
                    </div>
                </div>
            )}

            {/*******  Product Overview 2 *********/}

            {props.displayType === "enlarge-view" && (
                <div className="container-fluid w-100">
                    <div className="row">
                        <div className="col-md-12">
                            <img src={props.itemList[0]} className="w-100" alt={props.itemList[0]} />
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col align-items-center justify-content-center">
                            <img src={props.itemList[1]} className="w-100" alt={props.itemList[1]} />
                        </div>
                        <div className="col align-items-center justify-content-center">
                            <img src={props.itemList[2]} className="w-100" alt={props.itemList[2]} />
                        </div>
                    </div>
                </div>
            )}

            {/*******  Product Overview 3 *********/}

            {props.displayType === "image-gallary" && (
                <div>
                    <div className="container-fluid w-100" />
                    <div className="row">
                        <div className="col-md-12">
                            <img src={props.itemList[0]} className="w-100" alt={props.itemList[0]} />
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col d-flex align-items-center justify-content-center">
                            <img src={props.itemList[1]} className="w-100" alt={props.itemList[1]} />
                        </div>
                        <div className="col d-flex align-items-center justify-content-center">
                            <img src={props.itemList[2]} className="w-100" alt={props.itemList[2]} />
                        </div>
                        <div className="col d-flex align-items-center justify-content-center">
                            <img src={props.itemList[3]} className="w-100" alt={props.itemList[3]} />
                        </div>
                        <div className="col d-flex align-items-center justify-content-center">
                            <img src={props.itemList[4]} className="w-100" alt={props.itemList[4]} />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default RdsProductImage;
