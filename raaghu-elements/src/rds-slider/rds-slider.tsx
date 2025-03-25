import React, { useState, useEffect } from "react";
import Tooltip, { TooltipStyle } from "../rds-tooltip/rds-tooltip";
import "./rds-slider.scss";

export enum ColorVariant {
  Primary = "primary",
  Success = "success",
  Danger = "danger",
  Warning = "warning",
  Light = "light",
  Info = "info",
  Secondary = "secondary",
  Dark = "dark",
}

export enum SliderSize {
  Small = "small",
  Medium = "medium",
  Large = "large",
}

export enum SliderType {
  OneWay = "One Way",
  TwoWay = "Two Way",
}

export enum SliderStyle {
  Default = "default",
  ShowTooltip = "show tooltip",
}

export enum SliderLevel {
  Level1 = 1,
  Level2 = 2,
  Level3 = 3,
  Level4 = 4,
  Level5 = 5,
}
export interface RdsSliderProps {
  colorVariant?: ColorVariant;
  size?: SliderSize;
  type?: SliderType;
  leftLabel?: string;
  rightLabel?: string;
  showLabels?: boolean;
  level?: SliderLevel;
  style?: SliderStyle;
  value?: number;
  onChange?: (value: number) => void;
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
  const [rangeValues, setRangeValues] = useState<[number, number]>([0, 100]);

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

  const handleChangeSlider = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = Number(e.target.value);
    setRangeValues((prev) => {
      let [min, max] = prev;

      if (index === 0) {
        // Ensure min value doesn't exceed max
        min = Math.min(value, max - 5);
      } else {
        // Ensure max value doesn't go below min
        max = Math.max(value, min + 5);
      }
      return [min, max];
    });
  };

  return (
    <>
      {type === "One Way" && (
        <div
          className={`slider-container ${size === "small"
              ? "slidercontainersm"
              : size === "large"
                ? "slidercontainerlg"
                : "slidercontainermd"
            }`}
        >
          {showLabels && (
            <label className="slider-title text-left align-self-start text-muted">
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
                  style={TooltipStyle.MiddleBottomArrow}
                  label="100">
                  <button className="btn btn-primary">
                    {value}
                  </button>
                </Tooltip>
              </div>
            )}
            <div className="d-flex justify-content-between mt-2">
              <span className="left-label">{leftLabel}</span>
              <span className="right-label">{rightLabel}</span>
            </div>
          </div>
        </div>
      )}

      {type === "Two Way" && (

        <div className={`slider-container ${size === "small"
            ? "slidercontainersm"
            : size === "large"
              ? "slidercontainerlg"
              : "slidercontainermd"
          }`}>
          {showLabels && (
            <label className="slider-title text-left align-self-start">
              Slider
            </label>
          )}
          <div className="slider-wrapper relative mt-4 w-56 h-8">
            {/* Slider Track */}
            <div className="absolute top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-300 rounded-md"></div>

            {/* Highlighted Range Track */}
            <div
              className="absolute top-1/2 transform -translate-y-1/2 h-1 bg-blue-500 rounded-md"
              style={{
                left: `${(rangeValues[0] / 100) * 100}%`,
                width: `${((rangeValues[1] - rangeValues[0]) / 100) * 100}%`,
              }}
            ></div>

            {/* Slider Inputs */}
            <input
              type="range"
              min="0"
              max="100"
              value={rangeValues[0]}
              onChange={(e) => handleChangeSlider(e, 0)}
              className=" inputSlider slider rounded absolute w-full bg-transparent appearance-none pointer-events-none"
              style={{
               
                "--thumb-color": primaryColor, zIndex:1
              } as React.CSSProperties}
            />
            <input
              type="range"
              min="0"
              max="100"
              value={rangeValues[1]}
              onChange={(e) => handleChangeSlider(e, 1)}
              className=" inputSlider slider rounded absolute w-full appearance-none bg-transparent pointer-events-none"
              style={{
                background: getBackgroundStyle(),
                "--thumb-color": primaryColor,
              } as React.CSSProperties}
            />
             {style === "show tooltip" && (
              <div className="tooltip" style={{ left: `calc(${value}% - 20px)` }}>
                <Tooltip
                  style={TooltipStyle.MiddleBottomArrow}
                  label="100">
                  <button className="btn btn-primary">
                    {value}
                  </button>
                </Tooltip>
              </div>
            )}
          </div>
          <div className="d-flex justify-content-between mt-2">
            <span className="left-label">{leftLabel}</span>
            {/* <span className="justify-content-center"> {rangeValues[0]} - {rangeValues[1]}</span> */}
            <span className="right-label">{rightLabel}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default RdsSlider;