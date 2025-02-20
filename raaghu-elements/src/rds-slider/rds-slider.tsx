import React, { useState, useEffect } from "react";
import Tooltip from "../rds-tooltip/rds-tooltip";
import "./rds-slider.scss";

export interface RdsSliderProps {
  colorVariant?:
    | "primary"
    | "success"
    | "danger"
    | "warning"
    | "light"
    | "info"
    | "secondary"
    | "dark";
  size?: "small" | "medium" | "large";
  type?: "One Way" | "Two Way";
  leftLabel?: string;
  rightLabel?: string;
  showLabels?: boolean;
  level?: 1 | 2 | 3 | 4 | 5;
  style?: "default" | "show tooltip"; // Added style prop
  value?: number; // Prop to control slider value
  onChange?: (value: number) => void; // Callback when value changes
}

const RdsSlider: React.FC<RdsSliderProps> = ({
  colorVariant = "primary",
  size = "medium",
  type = "One Way",
  showLabels = true,
  leftLabel = "0", // Default label for the left side
  rightLabel = "100", // Default label for the right side
  level = 1,
  style = "default", // Default style
  value: propValue = 0, // Default value prop
  onChange, // Callback to handle value changes
}) => {
  const [value, setValue] = useState(propValue);

  useEffect(() => {
    // Sync state with prop value (if exists)
    setValue(propValue);
  }, [propValue]);

  useEffect(() => {
    // Map the level to a value between 0 and 100
    const levelValue = (level - 1) * 25;
    setValue(levelValue);
  }, [level]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  const lightenColor = (color: string, percent: number) => {
    const num = parseInt(color.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00ff) + amt;
    const B = (num & 0x0000ff) + amt;
    return `#${(
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 1 ? 0 : B) : 255)
    )
      .toString(16)
      .slice(1)}`;
  };

  const primaryColor =
    colorVariant === "primary"
      ? "#7e2eef"
      : colorVariant === "success"
      ? "#24993A"
      : colorVariant === "danger"
      ? "#E02D30"
      : colorVariant === "warning"
      ? "#EA6C0C"
      : colorVariant === "light"
      ? "#f8f9fa"
      : colorVariant === "info"
      ? "#3ef1e8"
      : colorVariant === "secondary"
      ? "#2539FF"
      : "#343a40";

  const lighterColor = lightenColor(primaryColor, 25);

  const getBackgroundStyle = () => {
    return type === "One Way"
      ? `linear-gradient(90deg, ${primaryColor} ${value}%, ${lighterColor} ${value}%)`
      : `linear-gradient(90deg, ${lighterColor} 0%, ${primaryColor} ${value}%, ${lighterColor} 100%)`;
  };

  return (
    <div
      className={`slider-container ${
        size === "small"
          ? "slidercontainersm"
          : size === "large"
          ? "slidercontainerlg"
          : "slidercontainermd"
      }`}
    >
      {showLabels && (
        <label className="slider-title text-left align-self-start">
          Slider
        </label>
      )}
      <div className="slider-wrapper mt-4">
        <input
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={handleChange}
          style={{
            background: getBackgroundStyle(),
            "--thumb-color": primaryColor,
          } as React.CSSProperties}
          className="slider rounded"
        />
        {style === "show tooltip" && (
          <div className="tooltip" style={{ left: `calc(${value}% - 20px)` }}>
           <Tooltip
            place="top"
            text="100">
            <button className="btn btn-primary">
                {value}
            </button>
            </Tooltip>
          </div>
        )}
        <div className="d-flex justify-content-between">
          <span className="left-label">{leftLabel}</span>
          <span className="right-label">{rightLabel}</span>
        </div>
      </div>
    </div>
  );
};

export default RdsSlider;