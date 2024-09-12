import React, { Fragment, useState, useEffect } from "react";
import RdsIcon from "../rds-icon/rds-icon";
import "./rds-like-dislike.css";

export interface RdsLikeDislikeProps {
    colorVariant?: string;
    like: number;
    dislike: number;
    onClick?: (like: number, dislike: number) => void;
}

const RdsLikeDislike = (props: RdsLikeDislikeProps) => {
    const [like, setLike] = useState(props.like);
    const [dislike, setDislike] = useState(props.dislike);

    if (props.onClick != undefined)
        useEffect(() => {
            props.onClick != undefined && props.onClick(like, dislike);
        }, [like, dislike]);

    const bg = "bg-" + (props.colorVariant || "dark");

    useEffect(() => {
        setLike(props.like);
        setDislike(props.dislike);
      }, [props.like, props.dislike]);

      const handleLikeDislike = (like: number, dislike: number) => {
        setLike(like);
        setDislike(dislike);
      };

    return (
        <Fragment>
            <div className="d-flex justify-content-start">
                <div>
                    <RdsIcon
                        name="like"
                        fill={false}
                        stroke={true}
                        height="24px"
                        width="24px"
                        colorVariant={props.colorVariant}
                        onClick={() => handleLikeDislike(like + 1, dislike)}
                        isCursorPointer={true}
                    ></RdsIcon>
                    <span className="ms-2">
                        <label className="me-2">{like}</label>
                    </span>
                </div>

                <div className="mx-3">
                    <RdsIcon
                        name="dislike"
                        fill={false}
                        stroke={true}
                        height="24px"
                        width="24px"
                        colorVariant={props.colorVariant}
                        onClick={() => handleLikeDislike(like, dislike + 1)}
                        isCursorPointer={true}
                    ></RdsIcon>
                    <span className="ms-2">
                        <label>{dislike}</label>
                    </span>
                </div>
            </div>
        </Fragment>
    );
};

export default RdsLikeDislike;
