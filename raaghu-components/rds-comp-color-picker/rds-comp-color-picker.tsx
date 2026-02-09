import React, { useState, Fragment, useEffect, useRef } from "react";
import "./rds-comp-color-picker.scss";
import RdsButton from "../../raaghu-elements/rds-button/rds-button";
import { getColorDisplay } from "./color-utils";
import {
  ColorPickerGrid,
  ColorPickerSpectrum,
  ColorModeSwatches,
  GradientEditor
} from "./color-picker-components";

export enum ColorPickerType {
  Default = "Default",
  Button = "Button",
  ButtonExpanded = "Button-Expanded",
}

export enum PickerType {
  Grid = "Grid",
  Spectrum = "Spectrum",
}

export enum ColorMode {
  HEX = "HEX",
  RGB = "RGB",
  HSB = "HSB",
  HSL = "HSL",
}

export enum StyleType {
  Type1 = "Type 1",
  Type2 = "Type 2",
}

export interface RdsColorPickerProps {
  value: string;
  isDisabled?: boolean;
  label: string;
  type: ColorPickerType;
  showSwatches?: boolean;
  pickerType?: PickerType;
  showTabs?: boolean;
  colorMode?: ColorMode;
  style?: StyleType;
  onChange?: (colorHex: string) => void;
}

const RdsColorPicker = (props: RdsColorPickerProps) => {
  const { value, label, type, showSwatches, pickerType, showTabs, colorMode, style, isDisabled, onChange } =
    props;
  const [selectedColorState, setSelectedColorState] = useState({
    hex: value || "#9751F2",
    rgb: { r: 151, g: 81, b: 242, a: 1 },
  });
  const [selectedColorHex, setSelectedColorHex] = useState<string>(value || "#9751F2");
  const [showPicker, setShowPicker] = useState(type !== ColorPickerType.Button);
  const [selectedTab, setSelectedTab] = useState(
    pickerType || "Grid"
  );
  const [selectedColorMode, setSelectedColorMode] = useState<ColorMode>(colorMode || ColorMode.HEX);
  const [showColorModeDropdown, setShowColorModeDropdown] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState(style || StyleType.Type1);
  
  const colorModeDropdownRef = React.useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (colorModeDropdownRef.current && !colorModeDropdownRef.current.contains(event.target as Node)) {
        setShowColorModeDropdown(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  useEffect(() => {
    setShowPicker(type !== ColorPickerType.Button);
  }, [type]);

  useEffect(() => {
    setSelectedColorHex(value);
    if (value && value.startsWith('#')) {
      setSelectedColorState(prev => ({ ...prev, hex: value }));
    }
  }, [value]);

  useEffect(() => {
    setSelectedTab(pickerType || "Grid");
  }, [pickerType]);

  useEffect(() => {
    setSelectedStyle(style || StyleType.Type1);
  }, [style]);

  useEffect(() => {
    if (colorMode) setSelectedColorMode(colorMode);
  }, [colorMode]);

  const handleButtonClick = () => {
    if (isDisabled) return;
    setShowPicker(!showPicker);
  };

  const handleTabClick = (tab: "Grid" | "Spectrum") => {
    setSelectedTab(tab);
  };

  const handleChange = (newColor: any) => {
    if (isDisabled) return;
    const next = { ...selectedColorState, hex: newColor.hex, rgb: newColor.rgb ?? selectedColorState.rgb };
    setSelectedColorState(next);
    setSelectedColorHex(newColor.hex);
    if (onChange) onChange(newColor.hex);
  };

  const handleHueChange = (newColor: any) => {
    if (isDisabled) return;
    const next = { ...selectedColorState, hex: newColor.hex };
    setSelectedColorState(next);
    setSelectedColorHex(newColor.hex);
    if (onChange) onChange(newColor.hex);
  };

  const handleAlphaChange = (newColor: any) => {
    if (isDisabled) return;
    setSelectedColorState({ ...selectedColorState, rgb: { ...selectedColorState.rgb, a: newColor.rgb.a } });
  };

  const getColorDisplayValue = () => {
    return getColorDisplay(selectedColorMode, selectedColorState);
  };

  return (
    <Fragment>
      <div className="rds-comp-color-picker" aria-disabled={isDisabled || undefined}>
        {(type === ColorPickerType.Button || type === ColorPickerType.ButtonExpanded) && (
          <RdsButton
            color="primary"
            children={label || "Color Picker"}
            style="filled"
            disabled={isDisabled}
            onClick={handleButtonClick}
          />
        )}
        {(showPicker && (type === ColorPickerType.ButtonExpanded || type === ColorPickerType.Default || type === ColorPickerType.Button)) && (
          <div className="rds-comp-color-picker__container">
            {showTabs && (
              <div className="rds-comp-color-picker__tabs">
                <button
                  className={`rds-comp-color-picker__tab ${selectedTab === "Grid" ? "rds-comp-color-picker__tab--active" : ""}`}
                  onClick={() => handleTabClick("Grid")}
                >
                  Grid
                </button>
                <button
                  className={`rds-comp-color-picker__tab ${
                    selectedTab === "Spectrum" ? "rds-comp-color-picker__tab--active" : ""
                  }`}
                  onClick={() => handleTabClick("Spectrum")}
                >
                  Spectrum
                </button>
              </div>
            )}

            {selectedTab === "Grid" ? (
              <ColorPickerGrid 
                handleChange={handleChange}
                selectedColorState={selectedColorState}
                handleHueChange={handleHueChange}
                handleAlphaChange={handleAlphaChange}
                colorModeDropdownRef={colorModeDropdownRef}
                selectedColorMode={selectedColorMode}
                showColorModeDropdown={showColorModeDropdown}
                setShowColorModeDropdown={setShowColorModeDropdown}
                getColorDisplay={() => getColorDisplayValue()}
                onSelectColorMode={(mode: any) => setSelectedColorMode(mode as ColorMode)}
              />
            ) : (
              <ColorPickerSpectrum
                selectedColorHex={selectedColorHex}
                selectedColorState={selectedColorState}
                handleChange={handleChange}
                handleHueChange={handleHueChange}
                handleAlphaChange={handleAlphaChange}
                colorModeDropdownRef={colorModeDropdownRef}
                selectedColorMode={selectedColorMode}
                showColorModeDropdown={showColorModeDropdown}
                setShowColorModeDropdown={setShowColorModeDropdown}
                getColorDisplay={() => getColorDisplayValue()}
                showSwatches={showSwatches}
                styleType={selectedStyle}
                onSelectColorMode={(mode: any) => setSelectedColorMode(mode as ColorMode)}
              />
            )}
          </div>
        )}
      </div>
    </Fragment>
  );
};
RdsColorPicker.displayName = "RdsColorPicker";
export default RdsColorPicker;
