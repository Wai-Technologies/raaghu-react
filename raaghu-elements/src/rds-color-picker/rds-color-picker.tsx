import React, { useState, Fragment, useEffect } from "react";
import "./rds-color-picker.css";
import {
  ChromePicker,
  SketchPicker,
  SwatchesPicker,
  HuePicker,
  AlphaPicker,
} from "react-color";
import RdsButton from "../rds-button";
import { use } from "i18next";
import { t } from "i18next";
import { TooltipStyle } from "../rds-tooltip/rds-tooltip";

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

export interface RdsColorPickerProps {
  value: string;
  isDisabled?: boolean;
  label: string;
  type: ColorPickerType;
  showSwatches?: boolean;
  pickerType?: PickerType;
  showTabs?: boolean;
  colorMode?: ColorMode;
}

const RdsColorPicker = (props: RdsColorPickerProps) => {
  const { value, label, type, showSwatches, pickerType, showTabs, colorMode } =
    props;
  const [color1, setColor1] = useState({
    hex: "#9751F2",
    rgb: { r: 151, g: 81, b: 242, a: 1 },
  });
  const [Color, setColor] = useState(value);
  const [hex, setHex] = useState("#fff");
  const [showPicker, setShowPicker] = useState(true);
  const [selectedTab, setSelectedTab] = useState(
    showSwatches ? "Spectrum" : pickerType || "Grid"
  );
  const [selectedColorMode, setSelectedColorMode] = useState(colorMode || "HEX");
useEffect(() => {
  if (type === "Button") {
    setShowPicker(false);
  }
  else {
    setShowPicker(true);
  }
},[type]);

  useEffect(() => {
    setColor(value);
  }, [value]);

  useEffect(() => {
    setSelectedTab(showSwatches ? "Spectrum" : pickerType || "Grid");
  }, [pickerType, showSwatches]);

  const convertToRgba = (color: any) => {
    if (color.rgb) {
      const { r, g, b, a } = color.rgb;
      return `rgba(${r}, ${b}, ${g}, ${a})`;
    }
    return color.hex;
  };

  const handleButtonClick = () => {
    setShowPicker(!showPicker);
  };

  const handleTabClick = (tab: "Grid" | "Spectrum") => {
    setSelectedTab(tab);
  };

  const handleColorChange = (color: any) => {
    setColor(convertToRgba(color));
  };

  const handleChange = (newColor: any) => {
    setColor1({ ...color1, hex: newColor.hex, rgb: newColor.rgb });
    setHex(newColor.hex);
  };

  const handleHueChange = (newColor: any) => {
    setColor1({ ...color1, hex: newColor.hex });
    setHex(newColor.hex);
  };

  const handleAlphaChange = (newColor: any) => {
    setColor1({ ...color1, rgb: { ...color1.rgb, a: newColor.rgb.a } });
  };

  const handleColorModeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedColorMode(event.target.value as "HEX" | "RGB" | "HSB" | "HSL");
  };

  const getColorDisplay = () => {
    switch (selectedColorMode) {
      case "RGB":
        return `rgb(${color1.rgb.r}, ${color1.rgb.g}, ${color1.rgb.b})`;
      case "HSB":
        // Convert RGB to HSB
        const hsb = rgbToHsb(color1.rgb);
        return `hsb(${hsb.h}, ${hsb.s}%, ${hsb.b}%)`;
      case "HSL":
        // Convert RGB to HSL
        const hsl = rgbToHsl(color1.rgb);
        return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
      case "HEX":
      default:
        return color1.hex;
    }
  };

  const rgbToHsb = (rgb: { r: number; g: number; b: number }) => {
    const r = rgb.r / 255;
    const g = rgb.g / 255;
    const b = rgb.b / 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const delta = max - min;
    const h =
      delta === 0
        ? 0
        : max === r
        ? ((g - b) / delta) % 6
        : max === g
        ? (b - r) / delta + 2
        : (r - g) / delta + 4;
    const s = max === 0 ? 0 : delta / max;
    const v = max;
    return { h: Math.round(h * 60), s: Math.round(s * 100), b: Math.round(v * 100) };
  };

  const rgbToHsl = (rgb: { r: number; g: number; b: number }) => {
    const r = rgb.r / 255;
    const g = rgb.g / 255;
    const b = rgb.b / 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const delta = max - min;
    const h =
      delta === 0
        ? 0
        : max === r
        ? ((g - b) / delta) % 6
        : max === g
        ? (b - r) / delta + 2
        : (r - g) / delta + 4;
    const l = (max + min) / 2;
    const s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    return { h: Math.round(h * 60), s: Math.round(s * 100), l: Math.round(l * 100) };
  };

  return (
    <Fragment>
      <div className="m-2">
        {type === "Button" && (
          <RdsButton
            badgeLayout="Text_only"
            badgeState="default"
            badgeStyle="primary"
            colorVariant="primary"
            databstoggle="tooltip"
            displayType="Text Only"
            icon=""
            label={label}
            shape="rectangle"
            size="medium"
            state="default"
            style="filled"
            textCase="unset"
            tooltipPlacement={TooltipStyle.LeftArrow}
            tooltipTitle="This is tooltip"
            onClick={handleButtonClick}
          />
        )}

        {type === "Button-Expanded" && (
          <RdsButton
            badgeLayout="Text_only"
            badgeState="default"
            badgeStyle="primary"
            colorVariant="primary"
            databstoggle="tooltip"
            displayType="Text Only"
            icon=""
            label={label}
            shape="rectangle"
            size="medium"
            state="default"
            style="filled"
            textCase="unset"
            tooltipPlacement={TooltipStyle.LeftArrow}
            tooltipTitle="This is tooltip"
            onClick={handleButtonClick}
          />
        )}

        {(showPicker && (type === "Button-Expanded" || type === "Default"|| type === "Button")) && (
          <div className="color-picker-container">
            {showTabs && (
              <div className="tabs">
                <button
                  className={`tab ${selectedTab === "Grid" ? "active" : ""}`}
                  onClick={() => handleTabClick("Grid")}
                >
                  Grid
                </button>
                <button
                  className={`tab ${
                    selectedTab === "Spectrum" ? "active" : ""
                  }`}
                  onClick={() => handleTabClick("Spectrum")}
                >
                  Spectrum
                </button>
              </div>
            )}
            {selectedTab === "Grid" ? (
              <div>
                {/* Grid-Based Swatches Picker */}
                <div className="color-picker-type1">
                  <SwatchesPicker
                    onChangeComplete={handleChange}
                    colors={[
                      ["#FF0000", "#FF7F00", "#FFFF00", "#7FFF00", "#00FF00"],
                      ["#00FF7F", "#00FFFF", "#007FFF", "#0000FF", "#7F00FF"],
                      ["#FF00FF", "#FF007F", "#A9A9A9", "#D3D3D3", "#FFFFFF"],
                    ]}
                    height={150}
                    width={300}
                  />
                </div>

                {/* Hue Slider */}
                <HuePicker
                  color={color1.hex}
                  onChange={handleHueChange}
                  width="220px"
                />

                {/* Opacity (Alpha) Slider */}
                <div className="mt-1">
                <AlphaPicker
                  color={color1.rgb}
                  onChange={handleAlphaChange}
                  width="220px"
                />
                </div>
                

                {/* Selected Color Display */}
                <p className="color-display-row">
                  <select
                    value={selectedColorMode}
                    onChange={handleColorModeChange}
                    className="color-mode-dropdown"
                  >
                    <option value="HEX">HEX</option>
                    <option value="RGB">RGB</option>
                    <option value="HSB">HSB</option>
                    <option value="HSL">HSL</option>
                  </select>
                  <div className="color-display-container">
                    <input
                      type="text"
                      value={getColorDisplay()}
                      readOnly
                      className="color-display-input1"
                    />
                    
                  </div>
                  <div className="color-display-container">
                    <input
                      type="text"
                      value={`${Math.round(color1.rgb.a * 100)}%`}
                      readOnly
                      className="color-display-input2"
                    />
                  </div>
                </p>
              </div>
            ) : showSwatches ? (
              <SketchPicker
                color={Color}
                disableAlpha={false}
                onChangeComplete={handleColorChange}
              />
            ) : (
              <ChromePicker
                color={Color}
                disableAlpha={false}
                onChangeComplete={handleColorChange}
              />
            )}
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default RdsColorPicker;




// import React, { useState, Fragment, useEffect } from "react";
// import "./rds-color-picker.css";

// export interface RdsColorPickerProps {
//     value: string;
//     isDisabled?: boolean;
//     label: string;
// }

// const RdsColorPicker = (props: RdsColorPickerProps) => {
//     const Value = props.value;

//     let [Color, setColor] = useState(Value);

//     useEffect(() => {
//         setColor(Value);
//     }, [Value]);
//     const HandlerChangecolor = (e: any) => {
//         const { value } = e.target;
//         console.log(value);
//         return (
//             setColor(Color = value));
//     };

//     const stri = Color;
//     const isValidHexaCode = () => {
//         if (stri[0] != "#")
//             return false;

//         if (!(stri.length == 4 || stri.length == 7))
//             return false;

//         for (let i = 1; i < stri.length; i++)
//             if (!((stri[i].charCodeAt(0) <= "0".charCodeAt(0) && stri[i].charCodeAt(0) <= 9)
//                 || (stri[i].charCodeAt(0) >= "a".charCodeAt(0) && stri[i].charCodeAt(0) <= "f".charCodeAt(0))
//                 || (stri[i].charCodeAt(0) >= "A".charCodeAt(0) || stri[i].charCodeAt(0) <= "F".charCodeAt(0))))
//                 return false;

//         return true;
//     };
//     // Driver Code
//     if (isValidHexaCode() === true) {
//         Color = stri;
//     }
//     else {
//         Color = "#000000";
//     }

//     return (
//         <Fragment>
//             <div className="m-2 ">
//                 <div>

//                     <label>{props.label}</label>
//                 </div>
      
//                 <div className=" align-items-center border col-md-3 col-xl-2 col-6 d-flex mt-1 p-2" >
//                     <span className="me-3">
//                         <input
//                             type="color"
//                             className="form-control form-control-color colorPick"
//                             value={Color}
//                             id="color"
//                             disabled={props.isDisabled}
//                             onChange={HandlerChangecolor}
//                             title="Choose your color"
//                             data-testId="colorPicker"
//                         />
//                     </span>
//                     <span>{Color}</span>

//                 </div>
//             </div>
//         </Fragment>
//     );
// };
// export default RdsColorPicker;
