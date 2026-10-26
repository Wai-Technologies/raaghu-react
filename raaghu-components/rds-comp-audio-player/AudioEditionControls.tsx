import { memo } from "react";
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
  }: AudioEditionControlsProps) => {
    const selectedRange = getSelectedTimeRange();

    return (
      <div className="rds-comp-audio-player__edition-controls">
        <div className="rds-comp-audio-player__edition-time-info">
          <span className="rds-comp-audio-player__edition-time">
            {formatTime(selectedRange.startTime)} - {formatTime(selectedRange.endTime)}
          </span>
          <span className="rds-comp-audio-player__edition-duration">
            Selected: {formatTime(selectedRange.selectedDuration)}
          </span>
        </div>
        <div className="rds-comp-audio-player__edition-buttons">
          <button type="button" className="rds-comp-audio-player__edition-btn" onClick={onTrim} aria-label="Trim">
            <ContentCut className="rds-comp-audio-player__btn-icon" />
            <span>Trim</span>
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
          <button type="button" className="rds-comp-audio-player__edition-btn rds-comp-audio-player__edition-btn--active" onClick={onDelete} aria-label="Delete">
            <DeleteOutline className="rds-comp-audio-player__btn-icon" />
            <span>Delete</span>
          </button>
        </div>
        <div className="rds-comp-audio-player__edition-zoom">
          <button type="button" onClick={handleZoomOut} disabled={zoomLevel <= 0} aria-label="Zoom out">
            <RemoveOutlinedIcon />
          </button>
          <div className="rds-comp-audio-player__zoom-slider-container">
            <Slider
              max={100}
              min={0}
              value={zoomLevel}
              onChange={handleZoomChange}
              aria-label="Zoom"
              size="small"
              sx={{
                width: "100px",
                color: "var(--rds-primary-main)",
                "& .MuiSlider-thumb": {
                  width: 16,
                  height: 16,
                },
                "& .MuiSlider-track": {
                  height: 4,
                },
                "& .MuiSlider-rail": {
                  height: 4,
                  opacity: 0.3,
                },
              }}
            />
          </div>
          <button type="button" onClick={handleZoomIn} disabled={zoomLevel >= 100} aria-label="Zoom in">
            <AddOutlinedIcon />
          </button>
        </div>
      </div>
    );
  }
);

AudioEditionControls.displayName = "AudioEditionControls";
