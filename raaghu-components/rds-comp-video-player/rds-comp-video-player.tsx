import React from "react";
import ReactPlayer from "react-player";
import "./rds-comp-video-player.scss";

export enum VideoPlayerType {
    Default = "Default",
    YouTube = "YouTube",
    Vimeo = "Vimeo"
}

export interface RdsVideoPlayerProps {
    width?: string | number;
    height?: string | number;
    autoplay?: boolean;
    muted?: boolean;
    videoLink: string;
    type?: VideoPlayerType;
    controls?: boolean;
    volume?: number;
    className?: string;
    disabled?: boolean;
}

const RdsCompVideoPlayer: React.FC<RdsVideoPlayerProps> = ({
    width = "100%",
    height = "auto",
    autoplay = false,
    muted = false,
    videoLink,
    type = VideoPlayerType.Default,
    controls = true,
    volume = 0.8,
    className = "",
    disabled = false,
}) => {

    const getFormattedUrl = (): string => {
        if (!videoLink) return "";
        
        if (videoLink.includes("youtube.com") || videoLink.includes("youtu.be")) {
            let videoId = "";
            
            if (videoLink.includes("youtu.be/")) {
                videoId = videoLink.split("youtu.be/")[1]?.split("?")[0];
            } else if (videoLink.includes("youtube.com/watch?v=")) {
                videoId = videoLink.split("v=")[1]?.split("&")[0];
            } else if (videoLink.includes("youtube.com/embed/")) {
                videoId = videoLink.split("embed/")[1]?.split("?")[0];
            }
            if (videoId && videoId.length === 11) {
                return `https://www.youtube.com/watch?v=${videoId}`;
            }
        }
        
        return videoLink;
    };

    const formattedUrl = getFormattedUrl();

    const isYouTubeUrl = formattedUrl.includes("youtube.com") || formattedUrl.includes("youtu.be");
    const isVimeoUrl = formattedUrl.includes("vimeo.com");
    
    const getPlayerConfig = () => {
        if (type === VideoPlayerType.Vimeo || isVimeoUrl) {
            return {
                vimeo: {
                    playerOptions: {
                        controls: controls,
                        title: false,
                        byline: false,
                        portrait: false
                    }
                }
            };
        }
        
        if (type === VideoPlayerType.YouTube || isYouTubeUrl) {
            return {
                youtube: {
                    playerVars: {
                        controls: controls ? 1 : 0,
                        modestbranding: 1,
                        rel: 0
                    }
                }
            };
        }
        
        return {
            file: { attributes: { preload: 'auto' } }
        };
    };

    return (
        <div className={`rds-comp-video-player${disabled ? " rds-comp-video-player--disabled" : ""} ${className}`}>
            <div className="rds-comp-video-player__wrapper">
                {React.createElement(ReactPlayer as any, {
                    key: `${formattedUrl}-${controls}`,
                    url: formattedUrl,
                    width: "100%",
                    height: "100%",
                    playing: autoplay && !disabled,
                    muted: muted,
                    controls: controls,
                    volume: volume,
                    config: getPlayerConfig(),
                    className: "rds-comp-video-player__player",
                    style: { width, height }
                })}
            </div>
            {disabled && (
                <div className="rds-comp-video-player__overlay">
                    <div className="rds-comp-video-player__disabled-message">
                        Video player is disabled
                    </div>
                </div>
            )}
        </div>
    );
};
RdsCompVideoPlayer.displayName = "RdsCompVideoPlayer";
export default RdsCompVideoPlayer;