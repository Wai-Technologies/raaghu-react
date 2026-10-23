import { Suspense, lazy, type HTMLAttributes, type Ref } from "react";
import { Box, type SxProps, type Theme } from "@mui/material";
import clsx from "clsx";
import type { ReactPlayerProps } from "react-player";
import { warnDeprecatedProp } from "../../raaghu-elements/shared/utils/deprecation";
import "./rds-comp-video-player.scss";
export { VideoPlayerType } from './rds-comp-video-player-types';
import { VideoPlayerType } from './rds-comp-video-player-types';

const ReactPlayer = lazy(() => import("react-player"));

export interface RdsVideoPlayerProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  width?: string | number;
  height?: string | number;
  autoPlay?: boolean;
  muted?: boolean;
  /** @deprecated Use `src` instead. */
  videoLink?: string;
  src?: string;
  type?: VideoPlayerType;
  controls?: boolean;
  volume?: number;
  className?: string;
  /** MUI system styles applied to the video player root. */
  sx?: SxProps<Theme>;
  disabled?: boolean;
  /** Message shown over the player when disabled. */
  disabledMessage?: string;
  /** Defaults to `autoPlay && !disabled`. */
  loop?: boolean;
  /** Accessible title for the embedded player. */
  title?: string;
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
  controls: boolean,
  title?: string
): ReactPlayerProps["config"] => {
  const isYouTubeUrl = formattedUrl.includes("youtube.com") || formattedUrl.includes("youtu.be");
  const isVimeoUrl = formattedUrl.includes("vimeo.com");

  if (type === VideoPlayerType.Vimeo || isVimeoUrl) {
    return {
      vimeo: {
        playerOptions: {
          controls,
          title: false,
          byline: false,
          portrait: false,
        },
      },
    };
  }

  if (type === VideoPlayerType.YouTube || isYouTubeUrl) {
    return {
      youtube: {
        playerVars: {
          controls: controls ? 1 : 0,
          modestbranding: 1,
          rel: 0,
        },
        ...(title !== undefined && { embedOptions: { title } }),
      },
    };
  }

  return {
    file: { attributes: { preload: "auto", ...(title !== undefined && { title }) } },
  };
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
  const playerConfig = buildPlayerConfig(type, formattedUrl, controls, title);

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
            url={formattedUrl}
            width={width}
            height={height}
            playing={shouldAutoPlay}
            loop={loop ?? shouldAutoPlay}
            muted={muted}
            controls={controls}
            volume={volume}
            config={playerConfig}
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
