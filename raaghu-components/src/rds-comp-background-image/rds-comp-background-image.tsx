import React from "react";

export interface RdsCompBackgroundImageProps {
    imageUrl: string,
    imageHeight?: string,
    title: string,
    btnLabel: string,
    subtitle: string,
    backgroundRepeat: string,
    backgroundSize: string,
}

const RdsCompBackgroundImage = (props: RdsCompBackgroundImageProps) => {
    const getImageUrl = () => {
        if (props.imageUrl) {
            return "url(" + props.imageUrl + ")";
        }
        return "";
    };

    const ImgHeight = props.imageHeight || "690px";


    return (
        <>
            <div
                role="img"
                className="w-100 d-flex justify-content-center align-items-center text-white bg-img"
                style={{ backgroundImage: getImageUrl(), height: ImgHeight, backgroundSize: props.backgroundSize, backgroundRepeat: props.backgroundRepeat }}
            >
                <div className="text-center w-50 sm-w-100 px-2">
                    <div className="pb-3">
                        {props.title && <label className="fs-1">{props.title} </label>}
                    </div>
                    {props.subtitle && <label className="fs-5 sm-fs"> {props.subtitle}</label>}

                    {props.btnLabel && <div className="mt-4" >
                        <button className="btn btn-primary ">{props.btnLabel} </button>
                    </div>}
                </div>
            </div>
        </>
    );
};
export default RdsCompBackgroundImage;
