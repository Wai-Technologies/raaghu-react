import React from "react";
import "./rds-video-player.css";
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
                config={{
                    youtube: {
                        playerVars: { showinfo: 1 },
                    },
                }}
                width={props.width}
                height={props.height}
                loop={props.autoplay}
                muted={props.muted}
                controls={true}
                data-testid="ReactPlayer"
            />
        </div>
    );
};

export default RdsVideoPlayer;
