import React from "react";
import ReactPlayer from "react-player";

export interface RdsVideoPlayerProps {
    width: string;
    height: string;
    autoplay: boolean;
    muted: boolean;
    videoLink: string;
}

const RdsVideoPlayer = (props: RdsVideoPlayerProps) => {
    return (
        <div>
            <ReactPlayer
                url={props.videoLink}
                width={props.width}
                height={props.height}
                playing={props.autoplay}
                muted={props.muted}
                controls={true}
            />
        </div>
    );
};

export default RdsVideoPlayer;
