import { memo, type RefObject, type Ref } from "react";
import { Slider } from "@mui/material";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";

interface VolumeSliderProps {
  showVolumeSlider: boolean;
  volumeSliderRef: RefObject<HTMLDivElement | null>;
  volumeLevel: number;
  handleVolumeChange: (event: Event, value: number | number[]) => void;
}

export const VolumeSliderComponent = memo(
  ({
    showVolumeSlider,
    volumeSliderRef,
    volumeLevel,
    handleVolumeChange,
  }: VolumeSliderProps) => {
    if (!showVolumeSlider) return null;

    return (
      <div ref={volumeSliderRef as Ref<HTMLDivElement>} className="rds-comp-audio-player__volume-slider-container">
        <div className="rds-comp-audio-player__volume-slider">
          <VolumeUpIcon className="rds-comp-audio-player__speaker-icon" />
          <Slider
            orientation="vertical"
            value={volumeLevel}
            onChange={handleVolumeChange}
            min={0}
            max={100}
            sx={{
              height: "var(--rds-audio-player-volume-slider-height)",
              color: "var(--rds-primary-main)",
              "& .MuiSlider-thumb": {
                width: "var(--rds-size-md)",
                height: "var(--rds-size-md)",
                backgroundColor: "var(--rds-primary-main)",
                "&:hover": {
                  boxShadow: "0 0 0 var(--rds-size-sm) color-mix(in srgb, var(--rds-primary-main) 16%, transparent)",
                },
              },
              "& .MuiSlider-track": {
                width: "var(--rds-size-xs)",
                backgroundColor: "var(--rds-primary-main)",
              },
              "& .MuiSlider-rail": {
                width: "var(--rds-size-xs)",
                backgroundColor: "var(--rds-neutral-300, var(--rds-grey-300))",
              },
            }}
          />
        </div>
      </div>
    );
  }
);

VolumeSliderComponent.displayName = "VolumeSliderComponent";
