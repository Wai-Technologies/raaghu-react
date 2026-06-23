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
  controls?: {
    settings?: 'visible' | 'hidden';
    transcript?: 'visible' | 'hidden';
    export?: 'visible' | 'hidden';
    moreOptions?: 'visible' | 'hidden';
  };
  [key: string]: unknown;
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

type AudioPlayerState = {
  isPlaying: boolean;
  currentTime: number;
  sliderValue: number;
  duration: number;
  zoomLevel: number;
  leftTrimPosition: number;
  rightTrimPosition: number;
  isDraggingLeft: boolean;
  isDraggingRight: boolean;
  showTranscriptSlider: boolean;
  volumeLevel: number;
  showSettingsModal: boolean;
  playbackSpeed: number;
  isMobileView: boolean;
};

const RdsCompAudioPlayer = ({
  src,
  type = "Audio Player",
  controls,
  ...legacyProps
}: AudioPlayerProps) => {
  const legacyShowSettings = typeof legacyProps['showSettings'] === 'boolean' ? (legacyProps['showSettings'] as boolean) : undefined;
  const legacyShowTranscript = typeof legacyProps['showTranscript'] === 'boolean' ? (legacyProps['showTranscript'] as boolean) : undefined;
  const legacyShowExport = typeof legacyProps['showExport'] === 'boolean' ? (legacyProps['showExport'] as boolean) : undefined;
  const legacyShowMoreOptions = typeof legacyProps['showMoreOptions'] === 'boolean' ? (legacyProps['showMoreOptions'] as boolean) : undefined;

  const showSettings = controls?.settings ? controls.settings === 'visible' : (legacyShowSettings ?? false);
  const showTranscript = controls?.transcript ? controls.transcript === 'visible' : (legacyShowTranscript ?? false);
  const showExport = controls?.export ? controls.export === 'visible' : (legacyShowExport ?? false);
  const showMoreOptions = controls?.moreOptions ? controls.moreOptions === 'visible' : (legacyShowMoreOptions ?? false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const volumeSliderRef = useRef<HTMLDivElement>(null);
  const transcriptButtonRef = useRef<HTMLButtonElement>(null);
  const [audioState, setAudioState] = useState<AudioPlayerState>({
    isPlaying: false,
    currentTime: 0,
    sliderValue: 0,
    duration: 0,
    zoomLevel: 30,
    leftTrimPosition: 10,
    rightTrimPosition: 90,
    isDraggingLeft: false,
    isDraggingRight: false,
    showTranscriptSlider: false,
    volumeLevel: 50,
    showSettingsModal: false,
    playbackSpeed: 1.0,
    isMobileView: typeof window !== 'undefined' && window.innerWidth <= MOBILE_BREAKPOINT,
  });
  const updateAudioState = useCallback(
    (updates: Partial<AudioPlayerState> | ((prev: AudioPlayerState) => Partial<AudioPlayerState>)) => {
      setAudioState((prev) => ({
        ...prev,
        ...(typeof updates === "function" ? updates(prev) : updates),
      }));
    },
    []
  );
  const {
    isPlaying,
    currentTime,
    sliderValue,
    duration,
    zoomLevel,
    leftTrimPosition,
    rightTrimPosition,
    isDraggingLeft,
    isDraggingRight,
    showTranscriptSlider,
    volumeLevel,
    showSettingsModal,
    playbackSpeed,
    isMobileView,
  } = audioState;

  useEffect(() => {
    const checkMobileView = () => {
      setAudioState((prev) => ({
        ...prev,
        isMobileView: window.innerWidth <= MOBILE_BREAKPOINT,
      }));
    };

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
      updateAudioState({ duration: audio.duration || 0, sliderValue: 0, currentTime: 0 });
    };

    const handleTimeUpdate = () => {
      updateAudioState({ currentTime: audio.currentTime, sliderValue: audio.currentTime });
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [src, updateAudioState]);

  useEffect(() => {
    if (!isDraggingLeft && !isDraggingRight) return;

    const handleDocumentMouseMove = (e: MouseEvent) => {
      const waveformElement = document.querySelector(".rds-comp-audio-player__edition-waveform");
      if (!waveformElement) return;

      const rect = waveformElement.getBoundingClientRect();
      const percentage = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));

      if (isDraggingLeft && percentage < rightTrimPosition - 5) {
        updateAudioState({ leftTrimPosition: percentage });
      } else if (isDraggingRight && percentage > leftTrimPosition + 5) {
        updateAudioState({ rightTrimPosition: percentage });
      }
    };

    const handleDocumentMouseUp = () => {
      updateAudioState({ isDraggingLeft: false, isDraggingRight: false });
    };

    document.addEventListener("mousemove", handleDocumentMouseMove);
    document.addEventListener("mouseup", handleDocumentMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleDocumentMouseMove);
      document.removeEventListener("mouseup", handleDocumentMouseUp);
    };
  }, [isDraggingLeft, isDraggingRight, leftTrimPosition, rightTrimPosition, updateAudioState]);

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
        updateAudioState({ showTranscriptSlider: false });
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
          updateAudioState({ showSettingsModal: false });
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showTranscriptSlider, showSettingsModal, updateAudioState]);

  const handleSeek = useCallback(
    (_: Event, value: number | number[]) => {
      const time = Array.isArray(value) ? value[0] : value;
      updateAudioState({ sliderValue: time, currentTime: time });
      if (audioRef.current && time <= duration) {
        audioRef.current.currentTime = time;
      }
    },
    [duration, updateAudioState]
  );

  const getSelectedTimeRange = useCallback(() => {
    const totalDuration = duration > 0 ? duration : 120;
    const startTime = (leftTrimPosition / 100) * totalDuration;
    const endTime = (rightTrimPosition / 100) * totalDuration;
    return { startTime, endTime, selectedDuration: endTime - startTime };
  }, [duration, leftTrimPosition, rightTrimPosition]);

  const handleZoomChange = useCallback((_: Event, value: number | number[]) => {
    updateAudioState({ zoomLevel: Array.isArray(value) ? value[0] : value });
  }, [updateAudioState]);

  const handleZoomIn = useCallback(() => {
    updateAudioState((prev) => ({ zoomLevel: Math.min(100, prev.zoomLevel + 10) }));
  }, [updateAudioState]);

  const handleZoomOut = useCallback(() => {
    updateAudioState((prev) => ({ zoomLevel: Math.max(0, prev.zoomLevel - 10) }));
  }, [updateAudioState]);

  const handleWaveformMouseDown = useCallback((e: MouseEvent, side: "left" | "right") => {
    e.preventDefault();
    updateAudioState({
      isDraggingLeft: side === "left",
      isDraggingRight: side === "right",
    });
  }, [updateAudioState]);

  const handleWaveformMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDraggingLeft && !isDraggingRight) return;

      const rect = e.currentTarget.getBoundingClientRect();
      const percentage = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));

      if (isDraggingLeft && percentage < rightTrimPosition - 5) {
        updateAudioState({ leftTrimPosition: percentage });
      } else if (isDraggingRight && percentage > leftTrimPosition + 5) {
        updateAudioState({ rightTrimPosition: percentage });
      }
    },
    [isDraggingLeft, isDraggingRight, leftTrimPosition, rightTrimPosition, updateAudioState]
  );

  const handleWaveformMouseUp = useCallback(() => {
    updateAudioState({ isDraggingLeft: false, isDraggingRight: false });
  }, [updateAudioState]);

  const togglePlayPause = useCallback(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    updateAudioState((prev) => ({ isPlaying: !prev.isPlaying }));
  }, [isPlaying, updateAudioState]);

  const skipBackward = useCallback(() => {
    if (!audioRef.current) return;
    const newTime = Math.max(0, currentTime - 10);
    audioRef.current.currentTime = newTime;
    updateAudioState({ currentTime: newTime, sliderValue: newTime });
  }, [currentTime, updateAudioState]);

  const skipForward = useCallback(() => {
    if (!audioRef.current) return;
    const maxDuration = duration > 0 ? duration : SLIDER_MAX;
    const newTime = Math.min(maxDuration, currentTime + 10);
    audioRef.current.currentTime = newTime;
    updateAudioState({ currentTime: newTime, sliderValue: newTime });
  }, [currentTime, duration, updateAudioState]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent, side: "left" | "right") => {
      const step = 1;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        if (side === "left") {
          updateAudioState((prev) => ({ leftTrimPosition: Math.max(0, prev.leftTrimPosition - step) }));
        } else {
          updateAudioState((prev) => ({ rightTrimPosition: Math.max(prev.leftTrimPosition + 5, prev.rightTrimPosition - step) }));
        }
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        if (side === "left") {
          updateAudioState((prev) => ({ leftTrimPosition: Math.min(prev.rightTrimPosition - 5, prev.leftTrimPosition + step) }));
        } else {
          updateAudioState((prev) => ({ rightTrimPosition: Math.min(100, prev.rightTrimPosition + step) }));
        }
      }
    },
    [updateAudioState]
  );

  const toggleTranscriptSlider = useCallback(() => {
    updateAudioState((prev) => ({ showTranscriptSlider: !prev.showTranscriptSlider }));
  }, [updateAudioState]);

  const handleVolumeChange = useCallback((_: Event, value: number | number[]) => {
    const volume = Array.isArray(value) ? value[0] : value;
    updateAudioState({ volumeLevel: volume });
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [updateAudioState]);

  const toggleSettingsModal = useCallback(() => {
    updateAudioState((prev) => ({ showSettingsModal: !prev.showSettingsModal }));
  }, [updateAudioState]);

  const handlePlaybackSpeedChange = useCallback((_: Event, value: number | number[]) => {
    const speed = Array.isArray(value) ? value[0] : value;
    updateAudioState({ playbackSpeed: speed });
    if (audioRef.current) {
      audioRef.current.playbackRate = speed;
    }
  }, [updateAudioState]);

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
            <audio ref={audioRef} src={src} aria-label="Audio playback">
              <track kind="captions" srcLang="en" label="English captions" />
            </audio>
            <button
              type="button"
              className="rds-comp-audio-player__control-btn"
              onClick={skipBackward}
              aria-label="Skip backward"
            >
              <RestoreOutlinedIcon />
            </button>
            <button
              type="button"
              className="rds-comp-audio-player__play-btn"
              onClick={togglePlayPause}
              aria-label="Play or pause"
            >
              <CircleOutlinedIcon />
            </button>
            <button
              type="button"
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
                type="button"
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
                type="button"
                ref={transcriptButtonRef}
                onClick={toggleTranscriptSlider}
                aria-label="Toggle transcript"
              >
                <svg width="24" height="24" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M11.78 17.06H6.22C5.39 17.06 4.6 16.73 4.02 16.15C3.43 15.57 3.1 14.78 3.1 13.95V4.05C3.1 3.22 3.43 2.43 4.02 1.85C4.6 1.27 5.39 0.94 6.22 0.94H11.78C12.61 0.94 13.4 1.27 13.98 1.85C14.57 2.43 14.9 3.22 14.9 4.05V13.95C14.9 14.78 14.57 15.57 13.98 16.15C13.4 16.73 12.61 17.06 11.78 17.06ZM6.22 2.06C5.69 2.06 5.18 2.27 4.81 2.64C4.44 3.02 4.23 3.52 4.23 4.05V13.95C4.23 14.48 4.44 14.98 4.81 15.36C5.18 15.73 5.69 15.94 6.22 15.94H11.78C12.31 15.94 12.82 15.73 13.19 15.36C13.56 14.98 13.77 14.48 13.77 13.95V4.05C13.77 3.52 13.56 3.02 13.19 2.64C12.82 2.27 12.31 2.06 11.78 2.06H6.22ZM9 4.72C8.8 4.73 8.6 4.79 8.43 4.9C8.26 5.01 8.13 5.17 8.05 5.36C7.97 5.55 7.95 5.76 7.99 5.96C8.03 6.16 8.13 6.34 8.28 6.48C8.42 6.63 8.6 6.72 8.8 6.76C9 6.8 9.21 6.78 9.4 6.7C9.59 6.62 9.75 6.49 9.86 6.32C9.97 6.15 10.03 5.95 10.03 5.74C10.03 5.61 10 5.48 9.95 5.35C9.9 5.23 9.82 5.12 9.73 5.02C9.63 4.93 9.52 4.85 9.39 4.8C9.27 4.75 9.13 4.72 9 4.72ZM9 14.02C8.46 14.02 7.93 13.86 7.48 13.56C7.03 13.26 6.68 12.84 6.48 12.34C6.27 11.84 6.22 11.29 6.32 10.76C6.43 10.23 6.69 9.75 7.07 9.36C7.45 8.98 7.94 8.72 8.47 8.62C9 8.51 9.55 8.57 10.04 8.77C10.54 8.98 10.97 9.33 11.27 9.78C11.57 10.23 11.73 10.76 11.73 11.3C11.73 12.02 11.44 12.71 10.93 13.22C10.42 13.73 9.72 14.02 9 14.02ZM9 9.69C8.68 9.69 8.37 9.78 8.11 9.96C7.84 10.14 7.64 10.39 7.52 10.68C7.4 10.97 7.36 11.3 7.43 11.61C7.49 11.92 7.64 12.21 7.87 12.43C8.09 12.65 8.38 12.81 8.69 12.87C9 12.93 9.32 12.9 9.61 12.78C9.91 12.66 10.16 12.45 10.33 12.19C10.51 11.92 10.6 11.61 10.6 11.3C10.6 10.87 10.44 10.46 10.13 10.16C9.83 9.86 9.43 9.69 9 9.69Z"
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
            {Array.from({ length: timeMarkConfig.count }, (_, markNumber) => markNumber + 1).map((markNumber) => (
              <span key={`timemark-${markNumber}`} className="rds-comp-audio-player__edition-timemark">
                {timeMarkConfig.interval}
              </span>
            ))}
          </div>
          <div
            className={clsx(
              "rds-comp-audio-player__edition-waveform",
              (isDraggingLeft || isDraggingRight) && "rds-comp-audio-player__edition-waveform--dragging"
            )}
            style={waveformStyle}
          >
            <div className="rds-comp-audio-player__waveform-background">
              <div className="rds-comp-audio-player__waveform-disabled-overlay rds-comp-audio-player__waveform-disabled-overlay--left" />
              <div className="rds-comp-audio-player__waveform-disabled-overlay rds-comp-audio-player__waveform-disabled-overlay--right" />
              <div className="rds-comp-audio-player__waveform-selection" />
              <svg width="100%" height="200" viewBox="0 0 1200 200" preserveAspectRatio="none">
                {Array.from({ length: 150 }, (_, barIndex) => barIndex).map((barIndex) => {
                  const x = barIndex * 8;
                  const height = Math.max(20, Math.abs(Math.sin(barIndex * 0.1) * 60 + Math.cos(barIndex * 0.27) * 40));
                  const adjustedHeight = height * Math.max(0.1, zoomLevel / 50);
                  return (
                    <rect
                      key={`wave-bar-${x}`}
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
              <button
                type="button"
                key={side}
                className={clsx(
                  "rds-comp-audio-player__waveform-blue-bar",
                  `rds-comp-audio-player__waveform-blue-bar--${side}`
                )}
                onMouseDown={(e) => handleWaveformMouseDown(e, side)}
                onKeyDown={(e) => handleKeyDown(e, side)}
                tabIndex={0}
                role="slider"
                aria-orientation="horizontal"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={side === 'left' ? leftTrimPosition : rightTrimPosition}
                aria-label={`${side} trim handle`}
              >
                <div className="rds-comp-audio-player__waveform-bar-handle" />
              </button>
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
