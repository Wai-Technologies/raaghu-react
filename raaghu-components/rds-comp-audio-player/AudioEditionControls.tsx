import { memo } from "react";
import { DEFAULT_RDS_COMP_AUDIO_PLAYER_LOCALE_TEXT, type RdsCompAudioPlayerLocaleText } from "./rds-comp-audio-player-locale";
import { Slider } from "@mui/material";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import ContentCut from "@mui/icons-material/ContentCut";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import Pause from "@mui/icons-material/Pause";
import PlayArrow from "@mui/icons-material/PlayArrow";

interface AudioEditionControlsProps {
  formatTime: (time: number) => string;
  getSelectedTimeRange: () => { startTime: number; endTime: number; selectedDuration: number };
  togglePlayPause: () => void;
  isPlaying?: boolean;
  onTrim?: () => void;
  onDelete?: () => void;
  zoomLevel: number;
  handleZoomOut: () => void;
  handleZoomIn: () => void;
  handleZoomChange: (event: Event, value: number | number[]) => void;
  text?: Pick<RdsCompAudioPlayerLocaleText, "trim" | "playOrPause" | "delete" | "selected" | "zoomOut" | "zoom" | "zoomIn">;
}

export const AudioEditionControls = memo(
  ({
    formatTime,
    getSelectedTimeRange,
    togglePlayPause,
    isPlaying = false,
    onTrim,
    onDelete,
    zoomLevel,
    handleZoomOut,
    handleZoomIn,
    handleZoomChange,
    text = DEFAULT_RDS_COMP_AUDIO_PLAYER_LOCALE_TEXT,
  }: AudioEditionControlsProps) => {
    const selectedRange = getSelectedTimeRange();

    return (
      <div className="rds-comp-audio-player__edition-controls">
        <div className="rds-comp-audio-player__edition-time-info">
          <span className="rds-comp-audio-player__edition-time">
            {formatTime(selectedRange.startTime)} - {formatTime(selectedRange.endTime)}
          </span>
          <span className="rds-comp-audio-player__edition-duration">
            {text.selected}: {formatTime(selectedRange.selectedDuration)}
          </span>
        </div>
        <div className="rds-comp-audio-player__edition-buttons">
          <button type="button" className="rds-comp-audio-player__edition-btn" onClick={onTrim} aria-label={text.trim}>
            <ContentCut className="rds-comp-audio-player__btn-icon" />
            <span>{text.trim}</span>
          </button>
          <button
            type="button"
            className="rds-comp-audio-player__play-btn"
            onClick={togglePlayPause}
            aria-label={text.playOrPause}
            aria-pressed={isPlaying}
          >
            {isPlaying ? <Pause /> : <PlayArrow />}
          </button>
          <button type="button" className="rds-comp-audio-player__edition-btn rds-comp-audio-player__edition-btn--active" onClick={onDelete} aria-label={text.delete}>
            <DeleteOutline className="rds-comp-audio-player__btn-icon" />
            <span>{text.delete}</span>
          </button>
        </div>
        <div className="rds-comp-audio-player__edition-zoom">
          <button type="button" onClick={handleZoomOut} disabled={zoomLevel <= 0} aria-label={text.zoomOut}>
            <RemoveOutlinedIcon />
          </button>
          <div className="rds-comp-audio-player__zoom-slider-container">
            <Slider
              max={100}
              min={0}
              value={zoomLevel}
              onChange={handleZoomChange}
              aria-label={text.zoom}
              size="small"
              sx={{
                width: "var(--rds-spacing-100)",
                color: "var(--rds-primary-main)",
                "& .MuiSlider-thumb": {
                  width: "var(--rds-size-md)",
                  height: "var(--rds-size-md)",
                },
                "& .MuiSlider-track": {
                  height: "var(--rds-size-xs)",
                },
                "& .MuiSlider-rail": {
                  height: "var(--rds-size-xs)",
                  opacity: 0.3,
                },
              }}
            />
          </div>
          <button type="button" onClick={handleZoomIn} disabled={zoomLevel >= 100} aria-label={text.zoomIn}>
            <AddOutlinedIcon />
          </button>
        </div>
      </div>
    );
  }
);

AudioEditionControls.displayName = "AudioEditionControls";
