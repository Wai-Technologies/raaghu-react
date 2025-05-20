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

  useEffect(() => {
    setLike(props.like);
    setDislike(props.dislike);
  }, [props.like, props.dislike]);

  const handleLikeDislike = (like: number, dislike: number) => {
    setLike(like);
    setDislike(dislike);
    if (props.onClick) {
      props.onClick(like, dislike);
    }
  };

  return (
    <Fragment>
      <div className="like-dislike-container">
        <div className="like-dislike-item">
          <RdsIcon
            name="like"
            fill={false}
            stroke={true}
            height="24px"
            width="24px"
            colorVariant={props.colorVariant}
            onClick={() => handleLikeDislike(like + 1, dislike)}
            isCursorPointer={true}
          />
          <span className="like-dislike-text mt-1">{like}</span>
        </div>

        <div className="like-dislike-item mt-2">
          <RdsIcon
            name="dislike"
            fill={false}
            stroke={true}
            height="24px"
            width="24px"
            colorVariant={props.colorVariant}
            onClick={() => handleLikeDislike(like, dislike + 1)}
            isCursorPointer={true}
          />
          <span className="like-dislike-text mb-1">{dislike}</span>
        </div>
      </div>
    </Fragment>
  );
};

export default RdsLikeDislike;