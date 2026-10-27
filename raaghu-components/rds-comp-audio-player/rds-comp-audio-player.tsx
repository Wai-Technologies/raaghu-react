import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties, type HTMLAttributes, type MouseEvent as ReactMouseEvent, type KeyboardEvent as ReactKeyboardEvent, type Ref } from "react";
import clsx from 'clsx';
import useMediaQuery from "@mui/material/useMediaQuery";
import "./rds-comp-audio-player.scss";
import Forward10OutlinedIcon from "@mui/icons-material/Forward10Outlined";
import RestoreOutlinedIcon from "@mui/icons-material/RestoreOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import IosShareIcon from "@mui/icons-material/IosShare";
import PendingOutlinedIcon from "@mui/icons-material/PendingOutlined";
import RdsSlider from "../../raaghu-elements/rds-slider/rds-slider";
import MusicNote from "@mui/icons-material/MusicNote";
import Pause from "@mui/icons-material/Pause";
import PlayArrow from "@mui/icons-material/PlayArrow";
import SettingsSuggestSharpIcon from "@mui/icons-material/SettingsSuggestSharp";
import RdsButton from "../../raaghu-elements/rds-button/rds-button";
import RdsCompAiFabMenu, { type RdsCompAiFabMenuItem } from "../../raaghu-components/rds-comp-ai-fab-menu/rds-comp-ai-fab-menu";
import { registerMaterialIcons } from "../rds-comp-ai-icon/rds-comp-ai-icon";
import { warnDeprecatedProp } from "../../raaghu-elements/shared/utils/deprecation";
import { VolumeSliderComponent } from "./VolumeSliderComponent";
import { SettingsModalComponent } from "./SettingsModalComponent";
import { AudioEditionControls } from "./AudioEditionControls";

registerMaterialIcons({
  share_icon: IosShareIcon,
  pending_icon: PendingOutlinedIcon,
});

type AudioPlayerType = "Audio Edition" | "Audio Player" | "Collapsed";
type ControlVisibility = 'visible' | 'hidden';

/** A trim selection in seconds. */
export interface RdsCompAudioPlayerRange {
  start: number;
  end: number;
}

export interface RdsCompAudioPlayerProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'id' | 'children' | 'onChange' | 'onCancel'> {
  src: string;
  /** Figma variant name. */
  type?: AudioPlayerType;
  /** Variant alias for `type` (`player` = "Audio Player", `editor` = "Audio Edition", `collapsed` = "Collapsed"); wins over `type`. */
  variant?: 'player' | 'editor' | 'collapsed';
  /**
   * @deprecated Prefer `showSettings` / `showVolume` / `showExport` / `showMoreOptions`.
   * String `'visible' | 'hidden'` map; also shadows native `<audio controls>`.
   */
  controls?: {
    settings?: ControlVisibility;
    /** Shows the volume button. */
    volume?: ControlVisibility;
    /** @deprecated Use `volume` instead. */
    transcript?: ControlVisibility;
    export?: ControlVisibility;
    moreOptions?: ControlVisibility;
  };
  /** Show the settings control. */
  showSettings?: boolean;
  /** Show the volume control. */
  showVolume?: boolean;
  /** @deprecated Use `showVolume` instead. */
  showTranscript?: boolean;
  /** Show the export menu. */
  showExport?: boolean;
  /** Show the more-options menu. */
  showMoreOptions?: boolean;
  /** Items of the export menu (defaults to the built-in sample items). */
  exportItems?: RdsCompAiFabMenuItem[];
  /** Items of the "more options" menu (defaults to the built-in sample items). */
  moreItems?: RdsCompAiFabMenuItem[];
  /** Called when the editor's Cancel button is clicked. */
  onCancel?: () => void;
  /** Called when the editor's Save button is clicked. */
  onSave?: () => void;
  /** Called with the current trim selection (seconds) when Trim is clicked. */
  onTrim?: (range: RdsCompAudioPlayerRange) => void;
  /** Called with the current trim selection (seconds) when Delete is clicked. */
  onDelete?: (range: RdsCompAudioPlayerRange) => void;
  /** Editor waveform bar heights (SVG units, viewBox height 200); defaults to generated sample data. */
  waveform?: number[];
  /** Ref to the variant's root element. */
  ref?: Ref<HTMLDivElement>;
}

const SLIDER_MAX = 120;
const MOBILE_QUERY = "(max-width:768px)";

const VARIANT_TO_TYPE: Record<NonNullable<RdsCompAudioPlayerProps['variant']>, AudioPlayerType> = {
  player: "Audio Player",
  editor: "Audio Edition",
  collapsed: "Collapsed",
};

const formatTime = (time: number) =>
  `${Math.floor(time / 60)}:${Math.floor(time % 60).toString().padStart(2, "0")}`;

const EXPORT_MENU_ITEMS: RdsCompAiFabMenuItem[] = [
  { icon: "users", iconHeight: "22px", iconWidth: "22px", key: "new", label: "Share Link" },
  { icon: "refresh", iconHeight: "22px", iconWidth: "22px", key: "refresh", label: "Export Audio" },
  { icon: "export", iconHeight: "22px", iconWidth: "22px", key: "export", label: "Export Transcript" },
  { icon: "delete", iconHeight: "22px", iconWidth: "22px", key: "delete", label: "Export Summary" },
  { icon: "download", iconHeight: "22px", iconWidth: "22px", key: "download", label: "Export Mind Map" },
];

const MORE_OPTIONS_MENU_ITEMS: RdsCompAiFabMenuItem[] = [
  { icon: "users", iconHeight: "22px", iconWidth: "22px", key: "new", label: "Move to folder" },
  { icon: "refresh", iconHeight: "22px", iconWidth: "22px", key: "refresh", label: "Find & Replace" },
  { icon: "export", iconHeight: "22px", iconWidth: "22px", key: "export", label: "Re-Transcribe" },
  { icon: "delete", iconHeight: "22px", iconWidth: "22px", key: "delete", label: "Re-Summarize" },
];

const DEFAULT_WAVEFORM: number[] = Array.from({ length: 150 }, (_, barIndex) =>
  Math.max(20, Math.abs(Math.sin(barIndex * 0.1) * 60 + Math.cos(barIndex * 0.27) * 40))
);

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
  showVolumeSlider: boolean;
  volumeLevel: number;
  showSettingsModal: boolean;
  playbackSpeed: number;
};

const RdsCompAudioPlayer = ({
  src,
  type = "Audio Player",
  variant,
  controls,
  showSettings: legacyShowSettings,
  showVolume: legacyShowVolume,
  showTranscript: legacyShowTranscript,
  showExport: legacyShowExport,
  showMoreOptions: legacyShowMoreOptions,
  exportItems = EXPORT_MENU_ITEMS,
  moreItems = MORE_OPTIONS_MENU_ITEMS,
  onCancel,
  onSave,
  onTrim,
  onDelete,
  waveform = DEFAULT_WAVEFORM,
  className,
  ref,
  ...rest
}: RdsCompAudioPlayerProps) => {
  if (controls !== undefined) {
    warnDeprecatedProp('RdsCompAudioPlayer', 'controls', '`showSettings` / `showVolume` / `showExport` / `showMoreOptions`');
  }
  if (controls?.transcript !== undefined) warnDeprecatedProp('RdsCompAudioPlayer', 'controls.transcript', '`controls.volume`');
  if (legacyShowTranscript !== undefined) warnDeprecatedProp('RdsCompAudioPlayer', 'showTranscript', '`showVolume`');

  const resolvedType: AudioPlayerType = variant ? VARIANT_TO_TYPE[variant] : type;

  const asBool = (value: unknown) => (typeof value === 'boolean' ? value : undefined);
  const fromVisibility = (value: ControlVisibility | undefined) =>
    value === undefined ? undefined : value === 'visible';

  const showSettings = asBool(legacyShowSettings) ?? fromVisibility(controls?.settings) ?? false;
  const showVolume =
    asBool(legacyShowVolume) ??
    asBool(legacyShowTranscript) ??
    fromVisibility(controls?.volume) ??
    fromVisibility(controls?.transcript) ??
    false;
  const showExport = asBool(legacyShowExport) ?? fromVisibility(controls?.export) ?? false;
  const showMoreOptions = asBool(legacyShowMoreOptions) ?? fromVisibility(controls?.moreOptions) ?? false;

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);
  const setAudioRef = useCallback((node: HTMLAudioElement | null) => {
    audioRef.current = node;
    setAudioElement(node);
  }, []);
  const volumeSliderRef = useRef<HTMLDivElement>(null);
  const volumeButtonRef = useRef<HTMLButtonElement>(null);
  const waveformRef = useRef<HTMLDivElement>(null);
  const settingsModalRef = useRef<HTMLDivElement>(null);
  const settingsButtonRef = useRef<HTMLButtonElement>(null);
  const isMobileView = useMediaQuery(MOBILE_QUERY, { noSsr: true });
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
    showVolumeSlider: false,
    volumeLevel: 50,
    showSettingsModal: false,
    playbackSpeed: 1.0,
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
    showVolumeSlider,
    volumeLevel,
    showSettingsModal,
    playbackSpeed,
  } = audioState;

  const timeMarkConfig = useMemo(
    () =>
      isMobileView
        ? { intervalSec: 30, count: 5 }
        : { intervalSec: 10, count: 13 },
    [isMobileView]
  );

  useEffect(() => {
    if (!audioElement) return;
    audioElement.volume = volumeLevel / 100;
  }, [audioElement, volumeLevel]);

  useEffect(() => {
    const audio = audioElement;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      updateAudioState({ duration: audio.duration || 0, sliderValue: 0, currentTime: 0 });
    };

    const handleTimeUpdate = () => {
      updateAudioState({ currentTime: audio.currentTime, sliderValue: audio.currentTime });
    };

    const handlePlay = () => updateAudioState({ isPlaying: true });
    const handlePause = () => updateAudioState({ isPlaying: false });

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handlePause);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handlePause);
    };
  }, [audioElement, updateAudioState]);

  useEffect(() => {
    if (!isDraggingLeft && !isDraggingRight) return;

    const handleDocumentMouseMove = (e: MouseEvent) => {
      const waveformElement = waveformRef.current;
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
    if (!showVolumeSlider && !showSettingsModal) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        showVolumeSlider &&
        volumeSliderRef.current &&
        !volumeSliderRef.current.contains(target) &&
        volumeButtonRef.current &&
        !volumeButtonRef.current.contains(target)
      ) {
        updateAudioState({ showVolumeSlider: false });
      }

      if (showSettingsModal) {
        const settingsModal = settingsModalRef.current;
        const settingsButton = settingsButtonRef.current;
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

    const handleEscape = (event: KeyboardEvent) => {
      if (showSettingsModal && event.key === "Escape") {
        updateAudioState({ showSettingsModal: false });
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [showVolumeSlider, showSettingsModal, updateAudioState]);

  const handleSeek = useCallback(
    (_: Event, value: number | number[]) => {
      const raw = Array.isArray(value) ? value[0] : value;
      const time = Math.max(0, Math.min(raw, duration > 0 ? duration : SLIDER_MAX));
      updateAudioState({ sliderValue: time, currentTime: time });
      if (audioRef.current && time <= duration) {
        audioRef.current.currentTime = time;
      }
    },
    [duration, updateAudioState]
  );

  const getSelectedTimeRange = useCallback(() => {
    const totalDuration = duration > 0 ? duration : SLIDER_MAX;
    const startTime = (leftTrimPosition / 100) * totalDuration;
    const endTime = (rightTrimPosition / 100) * totalDuration;
    return { startTime, endTime, selectedDuration: endTime - startTime };
  }, [duration, leftTrimPosition, rightTrimPosition]);

  const handleTrim = useCallback(() => {
    const { startTime, endTime } = getSelectedTimeRange();
    onTrim?.({ start: startTime, end: endTime });
  }, [getSelectedTimeRange, onTrim]);

  const handleDelete = useCallback(() => {
    const { startTime, endTime } = getSelectedTimeRange();
    onDelete?.({ start: startTime, end: endTime });
  }, [getSelectedTimeRange, onDelete]);

  const handleZoomChange = useCallback((_: Event, value: number | number[]) => {
    updateAudioState({ zoomLevel: Array.isArray(value) ? value[0] : value });
  }, [updateAudioState]);

  const handleZoomIn = useCallback(() => {
    updateAudioState((prev) => ({ zoomLevel: Math.min(100, prev.zoomLevel + 10) }));
  }, [updateAudioState]);

  const handleZoomOut = useCallback(() => {
    updateAudioState((prev) => ({ zoomLevel: Math.max(0, prev.zoomLevel - 10) }));
  }, [updateAudioState]);

  const handleWaveformMouseDown = useCallback((e: ReactMouseEvent, side: "left" | "right") => {
    e.preventDefault();
    updateAudioState({
      isDraggingLeft: side === "left",
      isDraggingRight: side === "right",
    });
  }, [updateAudioState]);

  const togglePlayPause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => updateAudioState({ isPlaying: false }));
      }
    } else {
      audio.pause();
    }
  }, [updateAudioState]);

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
    (e: ReactKeyboardEvent, side: "left" | "right") => {
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

  const toggleVolumeSlider = useCallback(() => {
    updateAudioState((prev) => ({ showVolumeSlider: !prev.showVolumeSlider }));
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

  const closeSettingsModal = useCallback(() => {
    updateAudioState({ showSettingsModal: false });
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

  const rootProps = (baseClassName: string) => ({
    ...rest,
    ref,
    className: clsx(baseClassName, className),
  });

  const audioNode = (
    <audio ref={setAudioRef} src={src} aria-label="Audio playback">
      <track kind="captions" srcLang="en" label="English captions" />
    </audio>
  );

  return (
    <>
      {resolvedType === "Collapsed" && (
        <div {...rootProps("rds-comp-audio-player__collapsed-container")}>
          <span className="rds-comp-audio-player__icon-circle rds-comp-audio-player__icon-circle--purple">
            <MusicNote />
          </span>
          <span className="rds-comp-audio-player__icon-settings">
            <SettingsSuggestSharpIcon />
          </span>
          {audioNode}
        </div>
      )}
      {resolvedType === "Audio Player" && (
        <div {...rootProps("rds-comp-audio-player__player rds-comp-audio-player__player--image-layout")}>
          <span className="rds-comp-audio-player__icon-circle rds-comp-audio-player__icon-circle--purple">
            <MusicNote />
          </span>
          <div className="rds-comp-audio-player__main-controls">
            {audioNode}
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
              aria-pressed={isPlaying}
            >
              {isPlaying ? <Pause /> : <PlayArrow />}
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
              max={duration > 0 ? duration : SLIDER_MAX}
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
                ref={settingsButtonRef}
                className="rds-comp-audio-player__settings-button"
                onClick={toggleSettingsModal}
                aria-label="Open settings"
              >
                <SettingsIcon />
              </button>
            )}
            {showExport && (
              <RdsCompAiFabMenu
                placement="right"
                variant="text"
                color="secondary"
                items={exportItems}
                icon="share_icon"
                size="small"
              />
            )}
            {showMoreOptions && (
              <RdsCompAiFabMenu
                placement="right"
                variant="text"
                color="secondary"
                items={moreItems}
                icon="pending_icon"
                size="small"
              />
            )}
            <div className="rds-comp-audio-player__volume-control">
              {showVolume && (
                <button
                  type="button"
                  ref={volumeButtonRef}
                  onClick={toggleVolumeSlider}
                  aria-label="Toggle volume"
                  aria-expanded={showVolumeSlider}
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
              <VolumeSliderComponent
                showVolumeSlider={showVolumeSlider}
                volumeSliderRef={volumeSliderRef}
                volumeLevel={volumeLevel}
                handleVolumeChange={handleVolumeChange}
              />
            </div>
          </div>
          <SettingsModalComponent
            showSettingsModal={showSettingsModal}
            settingsModalRef={settingsModalRef}
            anchorEl={settingsButtonRef.current}
            playbackSpeed={playbackSpeed}
            handlePlaybackSpeedChange={handlePlaybackSpeedChange}
            onClose={closeSettingsModal}
          />
        </div>
      )}
      {resolvedType === "Audio Edition" && (
        <div {...rootProps("rds-comp-audio-player__edition-container")}>
          <div className="rds-comp-audio-player__edition-buttons-top">
            <RdsButton
              color="primary"
              size="medium"
              text="Cancel"
              layout="text-only"
              shape="rectangle"
              variant="transparent"
              onClick={onCancel}
            />
            <RdsButton
              color="primary"
              size="medium"
              text="Save"
              layout="text-only"
              shape="rectangle"
              variant="filled"
              onClick={onSave}
            />
          </div>
          <div className="rds-comp-audio-player__edition-timemarks">
            {Array.from({ length: timeMarkConfig.count }, (_, index) => (
              <span key={`timemark-${index}`} className="rds-comp-audio-player__edition-timemark">
                {formatTime(index * timeMarkConfig.intervalSec)}
              </span>
            ))}
          </div>
          <div
            ref={waveformRef}
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
              <svg width="100%" height="200" viewBox={`0 0 ${waveform.length * 8} 200`} preserveAspectRatio="none">
                {waveform.map((height, barIndex) => {
                  const x = barIndex * 8;
                  const adjustedHeight = height * Math.max(0.1, zoomLevel / 50);
                  return (
                    <rect
                      key={`wave-bar-${x}`}
                      x={x}
                      y={(200 - adjustedHeight) / 2}
                      width="5"
                      height={adjustedHeight}
                      fill="var(--rds-color-on-primary-container, #fff)"
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
            isPlaying={isPlaying}
            zoomLevel={zoomLevel}
            handleZoomOut={handleZoomOut}
            handleZoomIn={handleZoomIn}
            handleZoomChange={handleZoomChange}
            onTrim={handleTrim}
            onDelete={handleDelete}
          />
          {audioNode}
        </div>
      )}
    </>
  );
};

RdsCompAudioPlayer.displayName = "RdsCompAudioPlayer";
export default RdsCompAudioPlayer;
