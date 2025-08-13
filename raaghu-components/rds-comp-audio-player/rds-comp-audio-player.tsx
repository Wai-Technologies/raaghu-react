import React, { useRef, useState, useEffect } from "react";
import "./rds-comp-audio-player.scss";
import Forward10OutlinedIcon from "@mui/icons-material/Forward10Outlined";
import RestoreOutlinedIcon from "@mui/icons-material/RestoreOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import IosShareIcon from "@mui/icons-material/IosShare";
import PendingOutlinedIcon from "@mui/icons-material/PendingOutlined";
import RdsSlider from "../../raaghu-elements/rds-slider/rds-slider";
import MonitorWeightOutlinedIcon from "@mui/icons-material/MonitorWeightOutlined";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import SettingsSuggestSharpIcon from "@mui/icons-material/SettingsSuggestSharp";
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RdsButton from "../../raaghu-elements/rds-button/rds-button";

interface AudioPlayerProps {
  src: string;
  type: "Audio Edition" | "Audio Player" | "Collapsed";
  showSettings: boolean;
  showTranscript: boolean;
  showExport: boolean;
  showMoreOptions: boolean;
}

const RdsCompAudioPlayer: React.FC<AudioPlayerProps> = ({ src, type="Audio Player", showSettings, showTranscript, showExport, showMoreOptions }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [sliderValue, setSliderValue] = useState(0);
  const [duration, setDuration] = useState(0);
  const SLIDER_MAX = 120;

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const handleLoadedMetadata = () => {
        setDuration(audio.duration);
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
    }
  }, []);

  const handleSeek = (
    _event: Event,
    value: number | number[],
    _activeThumb?: number
  ) => {
    const time = Array.isArray(value) ? value[0] : value;
    setSliderValue(time);
    if (audioRef.current && time <= duration) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

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
        <div className="rds-comp-audio-player__player">
          <span className="rds-comp-audio-player__icon-circle">
            <CircleOutlinedIcon />
          </span>
          <audio ref={audioRef} src={src} />
          <RestoreOutlinedIcon />
          <button className="rds-comp-audio-player__play-btn">
            <CircleOutlinedIcon />
          </button>
          <Forward10OutlinedIcon />
          <span>{formatTime(sliderValue)}</span>
          <RdsSlider
            label="Slider"
            min={0}
            max={duration > 0 ? Math.max(duration, SLIDER_MAX) : SLIDER_MAX}
            value={sliderValue}
            onChange={handleSeek}
            style={{ width: "700px" }}
          />
          <span>{formatTime(duration > 0 ? duration : SLIDER_MAX)}</span>
          {/* Extra control buttons */}
          <div className="rds-comp-audio-player__extra-controls">
            {showSettings && (
              <button>
                <SettingsIcon />
              </button>
            )}
            <CircleOutlinedIcon />
            {showExport && (
              <button>
                <IosShareIcon />
              </button>
            )}
            {showMoreOptions && (
              <button>
                <PendingOutlinedIcon />
              </button>
            )}
            <CircleOutlinedIcon />
            {showTranscript && (
              <button>
                <MonitorWeightOutlinedIcon />
              </button>
            )}
          </div>
        </div>
      )}
      {type === "Audio Edition" && (
        <div className="rds-comp-audio-player__edition-container">
          <div className="rds-comp-audio-player__edition-buttons-top">
            <RdsButton color="primary" inputSize="medium" text="Cancel" layout="text-only" shape="rectangle" size="medium" state="default" style="transparent" />
            <RdsButton color="primary" inputSize="medium" text="Save" layout="text-only" shape="rectangle" size="medium" state="default"  style="filled" />
          </div>
          <div className="rds-comp-audio-player__edition-timemarks">
            {[...Array(13)].map((_, i) => (
              <span key={i} className="rds-comp-audio-player__edition-timemark">
                00:10
              </span>
            ))}
          </div>
          <div className="rds-comp-audio-player__edition-waveform">
            <div className="rds-comp-audio-player__waveform-blue-bar rds-comp-audio-player__waveform-blue-bar--left">
              <div className="rds-comp-audio-player__waveform-bar-handle"></div>
            </div>
            <div className="rds-comp-audio-player__waveform-background">
              <svg width="100%" height="200" viewBox="0 0 1200 200" preserveAspectRatio="none" >
                {[...Array(150)].map((_, i) => {
                  const x = i * 8;
                  const baseHeight = 20;
                  const amplitude = Math.sin(i * 0.1) * 60 + Math.random() * 40;
                  const height = Math.max(baseHeight, Math.abs(amplitude));
                  const y = (200 - height) / 2;

                  return (
                    <rect key={i} x={x} y={y} width="5" height={height} fill="white" rx="2" opacity={0.9} />
                  );
                })}
              </svg>
            </div>
            <div className="rds-comp-audio-player__waveform-blue-bar rds-comp-audio-player__waveform-blue-bar--right">
              <div className="rds-comp-audio-player__waveform-bar-handle"></div>
            </div>
          </div>
          <div className="rds-comp-audio-player__edition-controls">
            <span className="rds-comp-audio-player__edition-time">00:00:00</span>
            <div className="rds-comp-audio-player__edition-buttons">
              <button className="rds-comp-audio-player__edition-btn">
                <CircleOutlinedIcon className="rds-comp-audio-player__btn-icon" />
                <span>Trim</span>
              </button>
              <button className="rds-comp-audio-player__play-btn">
                <CircleOutlinedIcon />
              </button>
              <button className="rds-comp-audio-player__edition-btn rds-comp-audio-player__edition-btn--active">
                <CircleOutlinedIcon className="rds-comp-audio-player__btn-icon" />
                <span>Delete</span>
              </button>
            </div>
            <div className="rds-comp-audio-player__edition-zoom">
              <RemoveOutlinedIcon />
              <div className="rds-comp-audio-player__zoom-slider-container">
                <RdsSlider max={100} min={0} value={30} />
              </div>
              <AddOutlinedIcon />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RdsCompAudioPlayer;
