import React from "react";
import ReactPlayer from "react-player";

export interface RdsVideoPlayerProps {
    width: string;
    height: string;
    autoplay: boolean;
    muted: boolean;
    videoLink: string;
    type?: "Default" | "YouTube" | "Vimeo";
}

const RdsVideoPlayer = ({ width, height, autoplay, muted, videoLink, type }: RdsVideoPlayerProps) => {
    let formattedLink = videoLink;

    if (type === "YouTube" && !videoLink.includes("youtube.com") && !videoLink.includes("youtu.be")) {
        formattedLink = "https://youtu.be/7sDY4m8KNLc"; // Default YouTube video
    } else if (type === "Vimeo" && !videoLink.includes("vimeo.com")) {
        formattedLink = "https://vimeo.com/420192272"; // Default Vimeo video
    }

    return (
        <div className="video-player-wrapper">
        <ReactPlayer
            url={formattedLink}
            className="react-player"
            playing={autoplay}
            muted={muted}
            controls={true}
            style={{ maxWidth: "100%" }}
        />
    </div>
    
    );
};

export default RdsVideoPlayer;
