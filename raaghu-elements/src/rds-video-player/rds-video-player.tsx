import React from "react";
import ReactPlayer from "react-player";

export interface RdsVideoPlayerProps {
    width: string; // Width of the video player
    height: string; // Height of the video player
    autoplay: boolean; // Autoplay the video
    muted: boolean; // Mute the video
    videoLink: string; // Link to the video
    type?: "Default" | "YouTube" | "Vimeo"; // Type of video source
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
                width={width}
                height={height}
                playing={autoplay}
                muted={muted}
                className="react-player"
                controls={true}
                style={{ maxWidth: "100%" }}
            />
        </div>
    );
};

export default RdsVideoPlayer;
