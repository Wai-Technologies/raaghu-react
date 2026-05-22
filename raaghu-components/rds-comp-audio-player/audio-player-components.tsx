import React from "react";
import { Slider } from "@mui/material";
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";

interface VolumeSliderProps {
  showTranscriptSlider: boolean;
  volumeSliderRef: React.RefObject<HTMLDivElement | null>;
  volumeLevel: number;
  handleVolumeChange: (event: Event, value: number | number[]) => void;
}

interface SettingsModalProps {
  showSettingsModal: boolean;
  playbackSpeed: number;
  handlePlaybackSpeedChange: (event: Event, value: number | number[]) => void;
}

interface AudioEditionControlsProps {
  formatTime: (time: number) => string;
  getSelectedTimeRange: () => { startTime: number; endTime: number; selectedDuration: number };
  togglePlayPause: () => void;
  zoomLevel: number;
  handleZoomOut: () => void;
  handleZoomIn: () => void;
  handleZoomChange: (event: Event, value: number | number[]) => void;
}

export const VolumeSliderComponent: React.FC<VolumeSliderProps> = ({
  showTranscriptSlider,
  volumeSliderRef,
  volumeLevel,
  handleVolumeChange
}) => {
  if (!showTranscriptSlider) return null;

  return (
    <div ref={volumeSliderRef} className="rds-comp-audio-player__volume-slider-container">
      <div className="rds-comp-audio-player__volume-slider">
        <VolumeUpIcon className="rds-comp-audio-player__speaker-icon" />
        <Slider
          orientation="vertical"
          value={volumeLevel}
          onChange={handleVolumeChange}
          min={0}
          max={100}
          sx={{
            height: 120,
            color: 'var(--rds-primary-main)',
            '& .MuiSlider-thumb': {
              width: 16,
              height: 16,
              backgroundColor: 'var(--rds-primary-main)',
              '&:hover': {
                boxShadow: '0 0 0 8px rgba(25, 118, 210, 0.16)',
              },
            },
            '& .MuiSlider-track': {
              width: 4,
              backgroundColor: 'var(--rds-primary-main)',
            },
            '& .MuiSlider-rail': {
              width: 4,
              backgroundColor: 'var(--rds-neutral-300, #e0e0e0)',
            },
          }}
        />
      </div>
    </div>
  );
};

export const SettingsModalComponent: React.FC<SettingsModalProps> = ({
  showSettingsModal,
  playbackSpeed,
  handlePlaybackSpeedChange
}) => {
  if (!showSettingsModal) return null;

  return (
    <div className="rds-comp-audio-player__settings-modal">
      <div className="rds-comp-audio-player__settings-header">
        <h3>Playback Speed</h3>
      </div>
      <div className="rds-comp-audio-player__settings-content">
        <div className="rds-comp-audio-player__speed-slider-container">
          <Slider
            value={playbackSpeed}
            onChange={handlePlaybackSpeedChange}
            min={0.5}
            max={2.0}
            step={0.25}
            marks={[
              { value: 0.5, label: '0.5x' },
              { value: 0.75, label: '0.75x' },
              { value: 1.0, label: '1.0x' },
              { value: 1.25, label: '1.25x' },
              { value: 1.5, label: '1.5x' },
              { value: 1.75, label: '1.75x' },
              { value: 2.0, label: '2.0x' }
            ]}
            sx={{
              color: 'var(--rds-primary-main)',
              height: 8,
              '& .MuiSlider-thumb': {
                width: 20,
                height: 20,
                backgroundColor: 'var(--rds-primary-main)',
                '&:hover': {
                  boxShadow: '0 0 0 8px var(--rds-action-hover)',
                },
              },
              '& .MuiSlider-track': {
                height: 8,
                backgroundColor: 'var(--rds-primary-main)',
                border: 'none',
              },
              '& .MuiSlider-rail': {
                height: 8,
                backgroundColor: 'var(--rds-neutral-300)',
              },
              '& .MuiSlider-mark': {
                backgroundColor: 'var(--rds-primary-main)',
                height: 5,
                width: 5,
                borderRadius: '50%',
                '&.MuiSlider-markActive': {
                  backgroundColor: 'var(--rds-neutral-0)',
                },
              },
              '& .MuiSlider-markLabel': {
                fontSize: 'var(--rds-font-size-sm)',
                color: 'var(--rds-text-secondary)',
                marginTop: 'var(--rds-spacing-sm)',
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export const AudioEditionControls: React.FC<AudioEditionControlsProps> = ({
  formatTime,
  getSelectedTimeRange,
  togglePlayPause,
  zoomLevel,
  handleZoomOut,
  handleZoomIn,
  handleZoomChange
}) => {
  return (
    <div className="rds-comp-audio-player__edition-controls">
      <div className="rds-comp-audio-player__edition-time-info">
        <span className="rds-comp-audio-player__edition-time">
          {formatTime(getSelectedTimeRange().startTime)} - {formatTime(getSelectedTimeRange().endTime)}
        </span>
        <span className="rds-comp-audio-player__edition-duration">
          Selected: {formatTime(getSelectedTimeRange().selectedDuration)}
        </span>
      </div>
      <div className="rds-comp-audio-player__edition-buttons">
        <button className="rds-comp-audio-player__edition-btn">
          <CircleOutlinedIcon className="rds-comp-audio-player__btn-icon" />
          <span>Trim</span>
        </button>
        <button className="rds-comp-audio-player__play-btn" onClick={togglePlayPause}>
          <CircleOutlinedIcon />
        </button>
        <button className="rds-comp-audio-player__edition-btn rds-comp-audio-player__edition-btn--active">
          <CircleOutlinedIcon className="rds-comp-audio-player__btn-icon" />
          <span>Delete</span>
        </button>
      </div>
      <div className="rds-comp-audio-player__edition-zoom">
        <button onClick={handleZoomOut} disabled={zoomLevel <= 0}>
          <RemoveOutlinedIcon />
        </button>
        <div className="rds-comp-audio-player__zoom-slider-container">
          <Slider 
            max={100} 
            min={0} 
            value={zoomLevel} 
            onChange={handleZoomChange}
            size="small"
            sx={{ 
              width: '100px',
              color: 'var(--rds-primary-main)',
              '& .MuiSlider-thumb': {
                width: 16,
                height: 16,
              },
              '& .MuiSlider-track': {
                height: 4,
              },
              '& .MuiSlider-rail': {
                height: 4,
                opacity: 0.3,
              },
            }}
          />
        </div>
        <button onClick={handleZoomIn} disabled={zoomLevel >= 100}>
          <AddOutlinedIcon />
        </button>
      </div>
    </div>
  );
};
