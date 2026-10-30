import { Suspense, lazy, type HTMLAttributes, type Ref } from "react";
import { Box, type SxProps, type Theme } from "@mui/material";
import clsx from "clsx";
import type { Config } from "react-player/types";
import { warnDeprecatedProp } from "../../raaghu-elements/shared/utils/deprecation";
import "./rds-comp-video-player.scss";
export { VideoPlayerType } from './rds-comp-video-player-types';
import { VideoPlayerType } from './rds-comp-video-player-types';

const ReactPlayer = lazy(() => import("react-player"));

export interface RdsVideoPlayerProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** Width of the player. @default '100%' */
  width?: string | number;
  /** Height of the player. @default 'auto' */
  height?: string | number;
  /** Starts playback automatically unless the player is disabled. */
  autoPlay?: boolean;
  /** Mutes the audio. @default false */
  muted?: boolean;
  /** @deprecated Use `src` instead. */
  videoLink?: string;
  /** URL of the video to play. */
  src?: string;
  /** Video source type (Default, YouTube or Vimeo); also detected from the URL. @default VideoPlayerType.Default */
  type?: VideoPlayerType;
  /** Shows the player controls. @default true */
  controls?: boolean;
  /** Initial volume between 0 and 1. @default 0.8 */
  volume?: number;
  /** Extra class name applied to the root element. @default '' */
  className?: string;
  /** MUI system styles applied to the video player root. */
  sx?: SxProps<Theme>;
  /** Disables playback and shows `disabledMessage`. @default false */
  disabled?: boolean;
  /** Message shown over the player when disabled. */
  disabledMessage?: string;
  /** Defaults to `autoPlay && !disabled`. */
  loop?: boolean;
  /** Accessible title for the embedded player. */
  title?: string;
  /** Ref forwarded to the root element. */
  ref?: Ref<HTMLDivElement>;
}

const formatVideoUrl = (videoLink: string): string => {
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

const buildPlayerConfig = (
  type: VideoPlayerType,
  formattedUrl: string,
  controls: boolean
): Config | undefined => {
  const isYouTubeUrl = formattedUrl.includes("youtube.com") || formattedUrl.includes("youtu.be");
  const isVimeoUrl = formattedUrl.includes("vimeo.com");

  if (type === VideoPlayerType.Vimeo || isVimeoUrl) {
    return {
      vimeo: {
        controls,
        title: false,
        byline: false,
        portrait: false,
      },
    };
  }

  if (type === VideoPlayerType.YouTube || isYouTubeUrl) {
    return {
      youtube: {
        rel: 0,
      },
    };
  }

  return undefined;
};

const RdsCompVideoPlayer = ({
  width = "100%",
  height = "auto",
  autoPlay,
  muted = false,
  videoLink,
  src,
  type = VideoPlayerType.Default,
  controls = true,
  volume = 0.8,
  className = "",
  sx,
  disabled = false,
  disabledMessage = "Video player is disabled",
  loop,
  title,
  style,
  ref,
  ...rest
}: RdsVideoPlayerProps) => {
  if (videoLink !== undefined) warnDeprecatedProp("RdsCompVideoPlayer", "videoLink", "`src`");
  const shouldAutoPlay = (autoPlay ?? false) && !disabled;
  const formattedUrl = formatVideoUrl(src ?? videoLink ?? "");
  const playerConfig = buildPlayerConfig(type, formattedUrl, controls);
  const isFilePlayer =
    type === VideoPlayerType.Default &&
    !formattedUrl.includes("youtube.com") &&
    !formattedUrl.includes("youtu.be") &&
    !formattedUrl.includes("vimeo.com");

  return (
    <Box
      {...rest}
      ref={ref}
      style={style}
      sx={sx}
      className={clsx(
        "rds-comp-video-player",
        disabled && "rds-comp-video-player--disabled",
        className
      )}
    >
      <div className="rds-comp-video-player__wrapper" inert={disabled || undefined}>
        <Suspense
          fallback={
            <div className="rds-comp-video-player__loading" aria-label="Loading video player" />
          }
        >
          <ReactPlayer
            key={formattedUrl}
            src={formattedUrl}
            width={width}
            height={height}
            playing={shouldAutoPlay}
            loop={loop ?? shouldAutoPlay}
            muted={muted}
            controls={controls}
            volume={volume}
            config={playerConfig}
            preload={isFilePlayer ? "auto" : undefined}
            title={title}
            wrapper="div"
            className="rds-comp-video-player__player"
          />
        </Suspense>
        {!controls && (
          <div className="rds-comp-video-player__controls-spacer" aria-hidden="true" />
        )}
      </div>
      {disabled && (
        <div className="rds-comp-video-player__overlay">
          <div className="rds-comp-video-player__disabled-message">{disabledMessage}</div>
        </div>
      )}
    </Box>
  );
};

RdsCompVideoPlayer.displayName = "RdsCompVideoPlayer";
export default RdsCompVideoPlayer;
