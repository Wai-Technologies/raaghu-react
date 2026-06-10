import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import clsx from 'clsx';
import "./rds-comp-audio-player.scss";
import Forward10OutlinedIcon from "@mui/icons-material/Forward10Outlined";
import RestoreOutlinedIcon from "@mui/icons-material/RestoreOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import IosShareIcon from "@mui/icons-material/IosShare";
import PendingOutlinedIcon from "@mui/icons-material/PendingOutlined";
import RdsSlider from "../../raaghu-elements/rds-slider/rds-slider";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import SettingsSuggestSharpIcon from "@mui/icons-material/SettingsSuggestSharp";
import RdsButton from "../../raaghu-elements/rds-button/rds-button";
import RdsCompAiFabMenu from "../../raaghu-components/rds-comp-ai-fab-menu/rds-comp-ai-fab-menu";
import { registerMaterialIcons } from "../rds-comp-ai-icon/rds-comp-ai-icon";
import {
  VolumeSliderComponent,
  SettingsModalComponent,
  AudioEditionControls,
} from "./audio-player-components";

registerMaterialIcons({
  share_icon: IosShareIcon,
  pending_icon: PendingOutlinedIcon,
});

interface AudioPlayerProps {
  src: string;
  type: "Audio Edition" | "Audio Player" | "Collapsed";
  showSettings: boolean;
  showTranscript: boolean;
  showExport: boolean;
  showMoreOptions: boolean;
}

const SLIDER_MAX = 120;
const MOBILE_BREAKPOINT = 768;

const formatTime = (time: number) =>
  `${Math.floor(time / 60)}:${Math.floor(time % 60).toString().padStart(2, "0")}`;

const EXPORT_MENU_ITEMS = [
  { icon: "users", iconHeight: "24px", iconWidth: "24px", key: "new", some: "value", value: "Share Link" },
  { icon: "refresh", iconHeight: "24px", iconWidth: "24px", key: "refresh", some: "value", value: "Export Audio" },
  { icon: "export", iconHeight: "24px", iconWidth: "24px", key: "export", some: "value", value: "Export Transcript" },
  { icon: "delete", iconHeight: "24px", iconWidth: "24px", key: "delete", some: "value", value: "Export Summary" },
  { icon: "download", iconHeight: "24px", iconWidth: "24px", key: "download", some: "value", value: "Export Mind Map" },
];

const MORE_OPTIONS_MENU_ITEMS = [
  { icon: "users", iconHeight: "24px", iconWidth: "24px", key: "new", some: "value", value: "Move to folder" },
  { icon: "refresh", iconHeight: "24px", iconWidth: "24px", key: "refresh", some: "value", value: "Find & Replace" },
  { icon: "export", iconHeight: "24px", iconWidth: "24px", key: "export", some: "value", value: "Re-Transcribe" },
  { icon: "delete", iconHeight: "24px", iconWidth: "24px", key: "delete", some: "value", value: "Re-Summarize" },
];

const RdsCompAudioPlayer = ({
  src,
  type = "Audio Player",
  showSettings,
  showTranscript,
  showExport,
  showMoreOptions,
}: AudioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const volumeSliderRef = useRef<HTMLDivElement>(null);
  const transcriptButtonRef = useRef<HTMLButtonElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [sliderValue, setSliderValue] = useState(0);
  const [duration, setDuration] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(30);
  const [leftTrimPosition, setLeftTrimPosition] = useState(10);
  const [rightTrimPosition, setRightTrimPosition] = useState(90);
  const [isDraggingLeft, setIsDraggingLeft] = useState(false);
  const [isDraggingRight, setIsDraggingRight] = useState(false);
  const [showTranscriptSlider, setShowTranscriptSlider] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(50);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const checkMobileView = () => {
      setIsMobileView(window.innerWidth <= MOBILE_BREAKPOINT);
    };

    checkMobileView();
    window.addEventListener("resize", checkMobileView);

    return () => {
      window.removeEventListener("resize", checkMobileView);
    };
  }, []);

  const timeMarkConfig = useMemo(
    () =>
      isMobileView
        ? { interval: "00:30", count: 5 }
        : { interval: "00:10", count: 13 },
    [isMobileView]
  );

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0);
      setSliderValue(0);
      setCurrentTime(0);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      setSliderValue(audio.currentTime);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [src]);

  useEffect(() => {
    if (!isDraggingLeft && !isDraggingRight) return;

    const handleDocumentMouseMove = (e: MouseEvent) => {
      const waveformElement = document.querySelector(".rds-comp-audio-player__edition-waveform");
      if (!waveformElement) return;

      const rect = waveformElement.getBoundingClientRect();
      const percentage = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));

      if (isDraggingLeft && percentage < rightTrimPosition - 5) {
        setLeftTrimPosition(percentage);
      } else if (isDraggingRight && percentage > leftTrimPosition + 5) {
        setRightTrimPosition(percentage);
      }
    };

    const handleDocumentMouseUp = () => {
      setIsDraggingLeft(false);
      setIsDraggingRight(false);
    };

    document.addEventListener("mousemove", handleDocumentMouseMove);
    document.addEventListener("mouseup", handleDocumentMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleDocumentMouseMove);
      document.removeEventListener("mouseup", handleDocumentMouseUp);
    };
  }, [isDraggingLeft, isDraggingRight, leftTrimPosition, rightTrimPosition]);

  useEffect(() => {
    if (!showTranscriptSlider && !showSettingsModal) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        showTranscriptSlider &&
        volumeSliderRef.current &&
        !volumeSliderRef.current.contains(target) &&
        transcriptButtonRef.current &&
        !transcriptButtonRef.current.contains(target)
      ) {
        setShowTranscriptSlider(false);
      }

      if (showSettingsModal) {
        const settingsModal = document.querySelector(".rds-comp-audio-player__settings-modal");
        const settingsButton = document.querySelector(".rds-comp-audio-player__settings-button");
        if (
          settingsModal &&
          !settingsModal.contains(target) &&
          settingsButton &&
          !settingsButton.contains(target)
        ) {
          setShowSettingsModal(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showTranscriptSlider, showSettingsModal]);

  const handleSeek = useCallback(
    (_: Event, value: number | number[]) => {
      const time = Array.isArray(value) ? value[0] : value;
      setSliderValue(time);
      setCurrentTime(time);
      if (audioRef.current && time <= duration) {
        audioRef.current.currentTime = time;
      }
    },
    [duration]
  );

  const getSelectedTimeRange = useCallback(() => {
    const totalDuration = duration > 0 ? duration : 120;
    const startTime = (leftTrimPosition / 100) * totalDuration;
    const endTime = (rightTrimPosition / 100) * totalDuration;
    return { startTime, endTime, selectedDuration: endTime - startTime };
  }, [duration, leftTrimPosition, rightTrimPosition]);

  const handleZoomChange = useCallback((_: Event, value: number | number[]) => {
    setZoomLevel(Array.isArray(value) ? value[0] : value);
  }, []);

  const handleZoomIn = useCallback(() => {
    setZoomLevel((prev) => Math.min(100, prev + 10));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoomLevel((prev) => Math.max(0, prev - 10));
  }, []);

  const handleWaveformMouseDown = useCallback((e: MouseEvent, side: "left" | "right") => {
    e.preventDefault();
    if (side === "left") {
      setIsDraggingLeft(true);
    } else {
      setIsDraggingRight(true);
    }
  }, []);

  const handleWaveformMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDraggingLeft && !isDraggingRight) return;

      const rect = e.currentTarget.getBoundingClientRect();
      const percentage = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));

      if (isDraggingLeft && percentage < rightTrimPosition - 5) {
        setLeftTrimPosition(percentage);
      } else if (isDraggingRight && percentage > leftTrimPosition + 5) {
        setRightTrimPosition(percentage);
      }
    },
    [isDraggingLeft, isDraggingRight, leftTrimPosition, rightTrimPosition]
  );

  const handleWaveformMouseUp = useCallback(() => {
    setIsDraggingLeft(false);
    setIsDraggingRight(false);
  }, []);

  const togglePlayPause = useCallback(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying((prev) => !prev);
  }, [isPlaying]);

  const skipBackward = useCallback(() => {
    if (!audioRef.current) return;
    const newTime = Math.max(0, currentTime - 10);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
    setSliderValue(newTime);
  }, [currentTime]);

  const skipForward = useCallback(() => {
    if (!audioRef.current) return;
    const maxDuration = duration > 0 ? duration : SLIDER_MAX;
    const newTime = Math.min(maxDuration, currentTime + 10);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
    setSliderValue(newTime);
  }, [currentTime, duration]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent, side: "left" | "right") => {
      const step = 1;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        if (side === "left") {
          setLeftTrimPosition((prev) => Math.max(0, prev - step));
        } else {
          setRightTrimPosition((prev) => Math.max(leftTrimPosition + 5, prev - step));
        }
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        if (side === "left") {
          setLeftTrimPosition((prev) => Math.min(rightTrimPosition - 5, prev + step));
        } else {
          setRightTrimPosition((prev) => Math.min(100, prev + step));
        }
      }
    },
    [leftTrimPosition, rightTrimPosition]
  );

  const toggleTranscriptSlider = useCallback(() => {
    setShowTranscriptSlider((prev) => !prev);
  }, []);

  const handleVolumeChange = useCallback((_: Event, value: number | number[]) => {
    const volume = Array.isArray(value) ? value[0] : value;
    setVolumeLevel(volume);
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, []);

  const toggleSettingsModal = useCallback(() => {
    setShowSettingsModal((prev) => !prev);
  }, []);

  const handlePlaybackSpeedChange = useCallback((_: Event, value: number | number[]) => {
    const speed = Array.isArray(value) ? value[0] : value;
    setPlaybackSpeed(speed);
    if (audioRef.current) {
      audioRef.current.playbackRate = speed;
    }
  }, []);

  const waveformStyle = useMemo(
    () =>
      ({
        "--left-trim-position": `${leftTrimPosition}%`,
        "--right-trim-position": `${rightTrimPosition}%`,
        "--selection-width": `${rightTrimPosition - leftTrimPosition}%`,
        "--left-overlay-width": `${leftTrimPosition}%`,
        "--right-overlay-width": `${100 - rightTrimPosition}%`,
      }) as CSSProperties,
    [leftTrimPosition, rightTrimPosition]
  );

  return (
    <>
      {type === "Collapsed" && (
        <div className="rds-comp-audio-player__collapsed-container">
          <span className="rds-comp-audio-player__icon-circle rds-comp-audio-player__icon-circle--purple">
            <CircleOutlinedIcon />
          </span>
          <span className="rds-comp-audio-player__icon-settings">
            <SettingsSuggestSharpIcon />
          </span>
        </div>
      )}
      {type === "Audio Player" && (
        <div className="rds-comp-audio-player__player rds-comp-audio-player__player--image-layout">
          <span className="rds-comp-audio-player__icon-circle rds-comp-audio-player__icon-circle--purple">
            <CircleOutlinedIcon />
          </span>
          <div className="rds-comp-audio-player__main-controls">
            <audio ref={audioRef} src={src} />
            <button
              className="rds-comp-audio-player__control-btn"
              onClick={skipBackward}
              aria-label="Skip backward"
            >
              <RestoreOutlinedIcon />
            </button>
            <button
              className="rds-comp-audio-player__play-btn"
              onClick={togglePlayPause}
              aria-label="Play or pause"
            >
              <CircleOutlinedIcon />
            </button>
            <button
              className="rds-comp-audio-player__control-btn"
              onClick={skipForward}
              aria-label="Skip forward"
            >
              <Forward10OutlinedIcon />
            </button>
            <span className="rds-comp-audio-player__current-time">{formatTime(sliderValue)}</span>
            <RdsSlider
              min={0}
              max={duration > 0 ? Math.max(duration, SLIDER_MAX) : SLIDER_MAX}
              value={sliderValue}
              onChange={handleSeek}
              className="rds-comp-audio-player__slider"
              controlType="one way"
              leftLabel=""
              rightLabel=""
              aria-label="Playback progress"
            />
            <span className="rds-comp-audio-player__total-time">
              {formatTime(duration > 0 ? duration : SLIDER_MAX)}
            </span>
          </div>
          <div className="rds-comp-audio-player__extra-controls">
            {showSettings && (
              <button
                className="rds-comp-audio-player__settings-button"
                onClick={toggleSettingsModal}
                aria-label="Open settings"
              >
                <SettingsIcon />
              </button>
            )}
            <CircleOutlinedIcon />
            {showExport && (
              <RdsCompAiFabMenu
                alignment="right"
                backgroundType="none"
                colorVariant="secondary"
                listItems={EXPORT_MENU_ITEMS}
                menuIcon="share_icon"
                size="small"
              />
            )}
            {showMoreOptions && (
              <RdsCompAiFabMenu
                alignment="right"
                backgroundType="none"
                colorVariant="secondary"
                listItems={MORE_OPTIONS_MENU_ITEMS}
                menuIcon="pending_icon"
                size="small"
              />
            )}
            <CircleOutlinedIcon />
            {showTranscript && (
              <button
                ref={transcriptButtonRef}
                onClick={toggleTranscriptSlider}
                aria-label="Toggle transcript"
              >
                <svg width="24" height="24" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M11.7825 17.0625H6.21748C5.39199 17.0625 4.60032 16.7346 4.01661 16.1509C3.4329 15.5672 3.10498 14.7755 3.10498 13.95V4.05C3.10498 3.22451 3.4329 2.43284 4.01661 1.84913C4.60032 1.26542 5.39199 0.9375 6.21748 0.9375H11.7825C12.608 0.9375 13.3996 1.26542 13.9834 1.84913C14.5671 2.43284 14.895 3.22451 14.895 4.05V13.95C14.895 14.7755 14.5671 15.5672 13.9834 16.1509C13.3996 16.7346 12.608 17.0625 11.7825 17.0625ZM6.21748 2.0625C5.69036 2.0625 5.18483 2.2719 4.81211 2.64463C4.43938 3.01735 4.22998 3.52288 4.22998 4.05V13.95C4.22998 14.4771 4.43938 14.9826 4.81211 15.3554C5.18483 15.7281 5.69036 15.9375 6.21748 15.9375H11.7825C12.3096 15.9375 12.8151 15.7281 13.1879 15.3554C13.5606 14.9826 13.77 14.4771 13.77 13.95V4.05C13.77 3.52288 13.5606 3.01735 13.1879 2.64463C12.8151 2.2719 12.3096 2.0625 11.7825 2.0625H6.21748ZM8.99998 4.725C8.79644 4.72501 8.59749 4.78546 8.42836 4.8987C8.25923 5.01194 8.12754 5.17286 8.05 5.36104C7.97245 5.54923 7.95255 5.75621 7.99281 5.95573C8.03306 6.15525 8.13167 6.33831 8.27612 6.48171C8.42057 6.6251 8.60435 6.72237 8.80416 6.76116C9.00397 6.79996 9.2108 6.77854 9.39841 6.69962C9.58603 6.6207 9.74598 6.48783 9.85797 6.31788C9.96997 6.14792 10.029 5.94853 10.0275 5.745C10.0275 5.61042 10.0009 5.47717 9.94913 5.35292C9.8974 5.22868 9.82159 5.1159 9.72608 5.02109C9.63057 4.92627 9.51724 4.8513 9.39262 4.80048C9.268 4.74966 9.13456 4.72401 8.99998 4.725ZM8.99998 14.025C8.46004 14.025 7.93222 13.8649 7.48327 13.5649C7.03433 13.2649 6.68442 12.8386 6.47779 12.3397C6.27116 11.8409 6.2171 11.292 6.32244 10.7624C6.42777 10.2328 6.68778 9.7464 7.06958 9.3646C7.45138 8.9828 7.93782 8.72279 8.46738 8.61746C8.99695 8.51212 9.54586 8.56618 10.0447 8.77281C10.5435 8.97944 10.9699 9.32935 11.2699 9.77829C11.5699 10.2272 11.73 10.7551 11.73 11.295C11.728 12.0184 11.4397 12.7117 10.9282 13.2232C10.4166 13.7348 9.72341 14.023 8.99998 14.025ZM8.99998 9.69C8.68254 9.69 8.37223 9.78413 8.10829 9.96049C7.84435 10.1369 7.63863 10.3875 7.51715 10.6808C7.39568 10.9741 7.36389 11.2968 7.42582 11.6081C7.48775 11.9195 7.64061 12.2054 7.86507 12.4299C8.08954 12.6544 8.37552 12.8072 8.68686 12.8692C8.9982 12.9311 9.32091 12.8993 9.61419 12.7778C9.90746 12.6563 10.1581 12.4506 10.3345 12.1867C10.5108 11.9227 10.605 11.6124 10.605 11.295C10.605 10.8693 10.4359 10.4611 10.1349 10.1601C9.83389 9.8591 9.42565 9.69 8.99998 9.69Z"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="0.5"
                  />
                </svg>
              </button>
            )}
          </div>
          <VolumeSliderComponent
            showTranscriptSlider={showTranscriptSlider}
            volumeSliderRef={volumeSliderRef}
            volumeLevel={volumeLevel}
            handleVolumeChange={handleVolumeChange}
          />
          <SettingsModalComponent
            showSettingsModal={showSettingsModal}
            playbackSpeed={playbackSpeed}
            handlePlaybackSpeedChange={handlePlaybackSpeedChange}
          />
        </div>
      )}
      {type === "Audio Edition" && (
        <div className="rds-comp-audio-player__edition-container">
          <div className="rds-comp-audio-player__edition-buttons-top">
            <RdsButton
              color="primary"
              size="medium"
              text="Cancel"
              layout="text-only"
              shape="rectangle"
              state="default"
              style="transparent"
            />
            <RdsButton
              color="primary"
              size="medium"
              text="Save"
              layout="text-only"
              shape="rectangle"
              state="default"
              style="filled"
            />
          </div>
          <div className="rds-comp-audio-player__edition-timemarks">
            {[...Array(timeMarkConfig.count)].map((_, i) => (
              <span key={i} className="rds-comp-audio-player__edition-timemark">
                {timeMarkConfig.interval}
              </span>
            ))}
          </div>
          <div
            className={clsx(
              "rds-comp-audio-player__edition-waveform",
              (isDraggingLeft || isDraggingRight) && "rds-comp-audio-player__edition-waveform--dragging"
            )}
            onMouseMove={handleWaveformMouseMove}
            onMouseUp={handleWaveformMouseUp}
            onMouseLeave={handleWaveformMouseUp}
            style={waveformStyle}
          >
            <div className="rds-comp-audio-player__waveform-background">
              <div className="rds-comp-audio-player__waveform-disabled-overlay rds-comp-audio-player__waveform-disabled-overlay--left" />
              <div className="rds-comp-audio-player__waveform-disabled-overlay rds-comp-audio-player__waveform-disabled-overlay--right" />
              <div className="rds-comp-audio-player__waveform-selection" />
              <svg width="100%" height="200" viewBox="0 0 1200 200" preserveAspectRatio="none">
                {[...Array(150)].map((_, i) => {
                  const x = i * 8;
                  const height = Math.max(20, Math.abs(Math.sin(i * 0.1) * 60 + Math.random() * 40));
                  const adjustedHeight = height * Math.max(0.1, zoomLevel / 50);
                  return (
                    <rect
                      key={i}
                      x={x}
                      y={(200 - adjustedHeight) / 2}
                      width="5"
                      height={adjustedHeight}
                      fill="white"
                      rx="2"
                      opacity={0.9}
                    />
                  );
                })}
              </svg>
            </div>
            {(["left", "right"] as const).map((side) => (
              <div
                key={side}
                className={clsx(
                  "rds-comp-audio-player__waveform-blue-bar",
                  `rds-comp-audio-player__waveform-blue-bar--${side}`
                )}
                onMouseDown={(e) => handleWaveformMouseDown(e, side)}
                onKeyDown={(e) => handleKeyDown(e, side)}
                tabIndex={0}
                role="slider"
                aria-label={`${side} trim handle`}
                aria-valuemin={side === "left" ? 0 : leftTrimPosition + 5}
                aria-valuemax={side === "left" ? rightTrimPosition - 5 : 100}
                aria-valuenow={side === "left" ? leftTrimPosition : rightTrimPosition}
              >
                <div className="rds-comp-audio-player__waveform-bar-handle" />
              </div>
            ))}
          </div>
          <AudioEditionControls
            formatTime={formatTime}
            getSelectedTimeRange={getSelectedTimeRange}
            togglePlayPause={togglePlayPause}
            zoomLevel={zoomLevel}
            handleZoomOut={handleZoomOut}
            handleZoomIn={handleZoomIn}
            handleZoomChange={handleZoomChange}
          />
        </div>
      )}
    </>
  );
};

RdsCompAudioPlayer.displayName = "RdsCompAudioPlayer";
export default RdsCompAudioPlayer;
