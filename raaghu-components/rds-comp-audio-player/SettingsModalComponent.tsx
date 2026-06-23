import { memo } from "react";
import { Slider } from "@mui/material";

interface SettingsModalProps {
  showSettingsModal: boolean;
  playbackSpeed: number;
  handlePlaybackSpeedChange: (event: Event, value: number | number[]) => void;
}

export const SettingsModalComponent = memo(
  ({
    showSettingsModal,
    playbackSpeed,
    handlePlaybackSpeedChange,
  }: SettingsModalProps) => {
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
                { value: 0.5, label: "0.5x" },
                { value: 0.75, label: "0.75x" },
                { value: 1.0, label: "1.0x" },
                { value: 1.25, label: "1.25x" },
                { value: 1.5, label: "1.5x" },
                { value: 1.75, label: "1.75x" },
                { value: 2.0, label: "2.0x" },
              ]}
              sx={{
                color: "var(--rds-primary-main)",
                height: 8,
                "& .MuiSlider-thumb": {
                  width: 20,
                  height: 20,
                  backgroundColor: "var(--rds-primary-main)",
                  "&:hover": {
                    boxShadow: "0 0 0 8px var(--rds-action-hover)",
                  },
                },
                "& .MuiSlider-track": {
                  height: 8,
                  backgroundColor: "var(--rds-primary-main)",
                  border: "none",
                },
                "& .MuiSlider-rail": {
                  height: 8,
                  backgroundColor: "var(--rds-neutral-300)",
                },
                "& .MuiSlider-mark": {
                  backgroundColor: "var(--rds-primary-main)",
                  height: 5,
                  width: 5,
                  borderRadius: "50%",
                  "&.MuiSlider-markActive": {
                    backgroundColor: "var(--rds-neutral-0)",
                  },
                },
                "& .MuiSlider-markLabel": {
                  fontSize: "var(--rds-font-size-sm)",
                  color: "var(--rds-text-secondary)",
                  marginTop: "var(--rds-spacing-sm)",
                },
              }}
            />
          </div>
        </div>
      </div>
    );
  }
);

SettingsModalComponent.displayName = "SettingsModalComponent";
