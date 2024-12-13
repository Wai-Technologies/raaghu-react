import React, { useState } from "react";

interface RdsCompBackgroundImageProps {
    imageUrl: string;
    imageHeight?: string;
    title: string;
    btnLabel: string;
    subtitle: string;
    backgroundRepeat: string;
    backgroundSize: string;
}

const RdsCompBackgroundImage: React.FC<RdsCompBackgroundImageProps> = (props) => {
    const [showImage, setShowImage] = useState<boolean>(true);

    const getImageUrl = (): string => {
        if (props.imageUrl && showImage) {
            return `url(${props.imageUrl})`;
        }
        return "";
    };

    const ImgHeight: string = props.imageHeight || "690px";

    const toggleImage = (): void => {
        setShowImage((prevShowImage) => !prevShowImage);
    };

    return (
        <>
            <div
                role="img"
                className={`w-100 d-flex justify-content-center align-items-center bg-img ${showImage ? 'show-image' : 'hide-image'}`}
                style={{ backgroundImage: getImageUrl(), height: ImgHeight, backgroundSize: props.backgroundSize, backgroundRepeat: props.backgroundRepeat }}
            >
                <div className="text-center w-50 sm-w-100 px-2 bg-layer">
                    <div className="pb-3">
                        {props.title && <label className="fs-1">{props.title} </label>}
                    </div>
                    {props.subtitle && <label className="fs-5 sm-fs"> {props.subtitle}</label>}

                    {props.btnLabel && <div className="mt-4" >
                        <button className="btn btn-primary" onClick={toggleImage}>{showImage ? 'Hide Image' : props.btnLabel}</button>
                    </div>}
                </div></div>
        </>
    );
};
export default RdsCompBackgroundImage;
