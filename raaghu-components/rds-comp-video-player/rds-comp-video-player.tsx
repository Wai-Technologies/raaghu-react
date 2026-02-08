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
        
        switch (type) {
            case VideoPlayerType.YouTube:
                if (videoLink.includes("youtube.com") || videoLink.includes("youtu.be")) {
                    return videoLink;
                }
                return "https://www.youtube.com/watch?v=LXb3EKWsInQ";
                
            case VideoPlayerType.Vimeo:
                if (videoLink.includes("vimeo.com")) {
                    return videoLink;
                }
                return "https://vimeo.com/90509568";
                
            case VideoPlayerType.Default:
            default:
                return videoLink;
        }
    };

    const formattedUrl = getFormattedUrl();

    return (
        <div className={`rds-comp-video-player${disabled ? " rds-comp-video-player--disabled" : ""} ${className}`}>
            <div className="rds-comp-video-player__wrapper">
                {React.createElement(ReactPlayer as any, {
                    key: type === VideoPlayerType.Vimeo ? `vimeo-${formattedUrl}-controls-${controls}` : 
                         type === VideoPlayerType.YouTube ? `youtube-${formattedUrl}-controls-${controls}` : `${formattedUrl}-${controls}`,
                    url: formattedUrl,
                    width: "100%",
                    height: "100%",
                    playing: autoplay && !disabled,
                    muted: muted,
                    controls: controls,
                    volume: volume,
                    config: type === VideoPlayerType.Vimeo ? {
                        vimeo: {
                            playerOptions: {
                                controls: controls,
                                title: false,
                                byline: false,
                                portrait: false
                            }
                        }
                    } : type === VideoPlayerType.YouTube ? {
                        youtube: {
                            playerVars: {
                                controls: controls ? 1 : 0,
                                modestbranding: 1,
                                rel: 0
                            }
                        }
                    } : {
                        file: { attributes: { preload: 'auto' } }
                    },
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