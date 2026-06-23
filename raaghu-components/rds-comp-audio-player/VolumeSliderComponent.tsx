import { memo, type RefObject } from "react";
import { Slider } from "@mui/material";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";

interface VolumeSliderProps {
  showTranscriptSlider: boolean;
  volumeSliderRef: RefObject<HTMLDivElement | null>;
  volumeLevel: number;
  handleVolumeChange: (event: Event, value: number | number[]) => void;
}

export const VolumeSliderComponent = memo(
  ({
    showTranscriptSlider,
    volumeSliderRef,
    volumeLevel,
    handleVolumeChange,
  }: VolumeSliderProps) => {
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
              color: "var(--rds-primary-main)",
              "& .MuiSlider-thumb": {
                width: 16,
                height: 16,
                backgroundColor: "var(--rds-primary-main)",
                "&:hover": {
                  boxShadow: "0 0 0 8px var(--rds-primary-focus-ring, rgba(25, 118, 210, 0.16))",
                },
              },
              "& .MuiSlider-track": {
                width: 4,
                backgroundColor: "var(--rds-primary-main)",
              },
              "& .MuiSlider-rail": {
                width: 4,
                backgroundColor: "var(--rds-neutral-300, #e0e0e0)",
              },
            }}
          />
        </div>
      </div>
    );
  }
);

VolumeSliderComponent.displayName = "VolumeSliderComponent";
