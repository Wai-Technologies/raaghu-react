import React from "react";
import { HuePicker, AlphaPicker } from "react-color";
import { hslToRgb, rgbToHex, handleSpectrumClick, rgbToHsb, rgbToHsl } from "./color-utils";
import { ColorMode } from "./rds-comp-color-picker";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ColorizeOutlinedIcon from '@mui/icons-material/ColorizeOutlined';
import RdsButton from "../../raaghu-elements/rds-button/rds-button";

export const ColorPickerGrid = ({
  handleChange,
  selectedColorState,
  handleHueChange,
  handleAlphaChange,
  colorModeDropdownRef,
  selectedColorMode,
  showColorModeDropdown,
  setShowColorModeDropdown,
  getColorDisplay,
  onSelectColorMode,
}: any) => {
  return (
    <div>
      <div className="rds-comp-color-picker__color-grid-container">
        {[...Array(10)].map((_, rowIndex) => {
          return (
            <div key={`row-${rowIndex}`} className="rds-comp-color-picker__color-row">
              {[...Array(11)].map((_, colIndex) => {
                let bgColor: string;
                let clickHex: string;
                let clickRgb: { r: number; g: number; b: number; a: number };
                if (rowIndex === 0) {
                  const gray = Math.round((colIndex / 10) * 255);
                  bgColor = `rgb(${gray}, ${gray}, ${gray})`;
                  clickHex = rgbToHex(gray, gray, gray);
                  clickRgb = { r: gray, g: gray, b: gray, a: 1 };
                } else {
                  const hue = colIndex * (360 / 11);
                  const lightness = 12 + rowIndex * 8;
                  bgColor = `hsl(${hue}, 100%, ${lightness}%)`;
                  const [r, g, b] = hslToRgb(hue / 360, 1, lightness / 100);
                  clickHex = rgbToHex(r, g, b);
                  clickRgb = { r, g, b, a: 1 };
                }

                return (
                  <div
                    key={`cell-${rowIndex}-${colIndex}`}
                    className="rds-comp-color-picker__color-cell"
                    style={{ backgroundColor: bgColor }}
                    onClick={() => handleChange({ hex: clickHex, rgb: clickRgb })}
                    role="button"
                    tabIndex={0}
                    aria-label={`Select color ${clickHex}`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleChange({ hex: clickHex, rgb: clickRgb });
                      }
                    }}
                  />
                );
              })}
            </div>
          );
        })}
      </div>

      <ColorPickerSliders 
        selectedColorState={selectedColorState} 
        handleHueChange={handleHueChange}
        handleAlphaChange={handleAlphaChange}
      />      
      <ColorPickerInfo
        colorModeDropdownRef={colorModeDropdownRef}
        setShowColorModeDropdown={setShowColorModeDropdown}
        showColorModeDropdown={showColorModeDropdown}
        selectedColorMode={selectedColorMode}
        selectedColorState={selectedColorState}
        getColorDisplay={getColorDisplay}
        onSelectColorMode={onSelectColorMode}
      />
    </div>
  );
};

export const ColorPickerSpectrum = ({
  selectedColorHex,
  selectedColorState,
  handleChange,
  handleHueChange,
  handleAlphaChange,
  colorModeDropdownRef,
  selectedColorMode,
  showColorModeDropdown,
  setShowColorModeDropdown,
  getColorDisplay,
  showSwatches,
  styleType,
  onSelectColorMode,
}: any) => {
  return (
    <div className="rds-comp-color-picker__spectrum-type1">    
      <div className="rds-comp-color-picker__color-grid-container rds-comp-color-picker__color-grid-container--spectrum">
        <div 
          className="rds-comp-color-picker__spectrum-area"
          style={{ backgroundColor: selectedColorHex }}
          onClick={(e) => {
            const result = handleSpectrumClick(
              e, 
              selectedColorState.rgb ? selectedColorState.rgb.r : 0,
              selectedColorState.rgb ? selectedColorState.rgb.a : 1
            );
            handleChange(result);
          }}
        />
      </div>
      
      <ColorPickerSliders 
        selectedColorState={selectedColorState} 
        handleHueChange={handleHueChange}
        handleAlphaChange={handleAlphaChange}
      />
      
      <ColorPickerInfo
        colorModeDropdownRef={colorModeDropdownRef}
        setShowColorModeDropdown={setShowColorModeDropdown}
        showColorModeDropdown={showColorModeDropdown}
        selectedColorMode={selectedColorMode}
        selectedColorState={selectedColorState}
        getColorDisplay={getColorDisplay}
        onSelectColorMode={onSelectColorMode} 
      />
      
      {showSwatches && (
        styleType === "Type 1" ? (
          <ColorSwatchesType1 handleChange={handleChange} />
        ) : (
          <ColorSwatchesType2 handleChange={handleChange} />
        )
      )}
    </div>
  );
};
export const ColorPickerSliders = ({ selectedColorState, handleHueChange, handleAlphaChange }) => {
  return (
    <div className="rds-comp-color-picker__sliders-row">
      <div className="rds-comp-color-picker__eyedropper" aria-hidden="true">
        <ColorizeOutlinedIcon fontSize="small" />
      </div>
      <div className="rds-comp-color-picker__sliders">
        <div className="rds-comp-color-picker__slider-container">
          {/* @ts-ignore - React Color TypeScript issues */}
          <HuePicker
            color={selectedColorState.hex}
            onChange={handleHueChange}
            width="236px"
            className="rds-comp-color-picker__hue-picker"
          />
        </div>       
        <div className="rds-comp-color-picker__slider-container rds-comp-color-picker__alpha-slider-container">
          {/* @ts-ignore - React Color TypeScript issues */}
          <AlphaPicker
            color={selectedColorState.rgb}
            onChange={handleAlphaChange}
            width="233px"
            className="rds-comp-color-picker__alpha-picker"
          />
        </div>
      </div>
    </div>
  );
};

export const ColorPickerInfo = ({
  colorModeDropdownRef,
  setShowColorModeDropdown,
  showColorModeDropdown,
  selectedColorMode,
  selectedColorState,
  getColorDisplay,
  onSelectColorMode,
}: any) => {
  const rgb = selectedColorState.rgb || { r: 0, g: 0, b: 0, a: 1 };
  const hsb = rgbToHsb(rgb);
  const hsl = rgbToHsl(rgb);
  
  const renderColorInputs = () => {
    switch (selectedColorMode) {
      case ColorMode.RGB:
        return (
          <>
            <div className="rds-comp-color-picker__input-wrapper">
              <input
                type="text"
                value={rgb.r}
                readOnly
                className="rds-comp-color-picker__color-input"
              />
            </div>
            <div className="rds-comp-color-picker__input-wrapper">
              <input
                type="text"
                value={rgb.g}
                readOnly
                className="rds-comp-color-picker__color-input"
              />
            </div>
            <div className="rds-comp-color-picker__input-wrapper">
              <input
                type="text"
                value={rgb.b}
                readOnly
                className="rds-comp-color-picker__color-input"
              />
            </div>
          </>
        );
      case ColorMode.HSB:
        return (
          <>
            <div className="rds-comp-color-picker__input-wrapper">
              <input
                type="text"
                value={hsb.h}
                readOnly
                className="rds-comp-color-picker__color-input"
              />
            </div>
            <div className="rds-comp-color-picker__input-wrapper">
              <input
                type="text"
                value={hsb.s}
                readOnly
                className="rds-comp-color-picker__color-input"
              />
            </div>
            <div className="rds-comp-color-picker__input-wrapper">
              <input
                type="text"
                value={hsb.b}
                readOnly
                className="rds-comp-color-picker__color-input"
              />
            </div>
          </>
        );
      case ColorMode.HSL:
        return (
          <>
            <div className="rds-comp-color-picker__input-wrapper">
              <input
                type="text"
                value={hsl.h}
                readOnly
                className="rds-comp-color-picker__color-input"
              />
            </div>
            <div className="rds-comp-color-picker__input-wrapper">
              <input
                type="text"
                value={hsl.s}
                readOnly
                className="rds-comp-color-picker__color-input"
              />
            </div>
            <div className="rds-comp-color-picker__input-wrapper">
              <input
                type="text"
                value={hsl.l}
                readOnly
                className="rds-comp-color-picker__color-input"
              />
            </div>
          </>
        );
      default:
        return (
          <div className="rds-comp-color-picker__input-wrapper">
            <input
              type="text"
              value={getColorDisplay()}
              readOnly
              className="rds-comp-color-picker__hex-input"
            />
          </div>
        );
    }
  };

  return (
    <div className="rds-comp-color-picker__color-info">
      <div className="rds-comp-color-picker__dropdown-container" ref={colorModeDropdownRef}>
        <div 
          className="rds-comp-color-picker__dropdown-button"
          onClick={() => setShowColorModeDropdown(!showColorModeDropdown)}
        >
          <div className="rds-comp-color-picker__color-circle" style={{ backgroundColor: selectedColorState.hex }}></div>
          <span className="rds-comp-color-picker__dropdown-label">{selectedColorMode}</span>
         
          <KeyboardArrowDownIcon/>
        </div>
        
        {showColorModeDropdown && (
          <div className="rds-comp-color-picker__dropdown-menu">
            {Object.values(ColorMode).map((mode) => (
              <div 
                key={mode}
                className={`rds-comp-color-picker__dropdown-item ${selectedColorMode === mode ? 'active' : ''}`}
                onClick={() => {
                  if (onSelectColorMode) onSelectColorMode(mode as any);
                  setShowColorModeDropdown(false);
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    if (onSelectColorMode) onSelectColorMode(mode as any);
                    setShowColorModeDropdown(false);
                  }
                }}
              >
                {mode}
              </div>
            ))}
          </div>
        )}
      </div>      
      {renderColorInputs()}      
      <div className="rds-comp-color-picker__percent-wrapper">
        <input
          type="text"
          value={`100%`}
          readOnly
          className="rds-comp-color-picker__percent-input"
        />
      </div>
    </div>
  );
};

export const ColorSwatchesType1 = ({ handleChange }) => {
  return (
    <div className="rds-comp-color-picker__swatches">
      <div className="rds-comp-color-picker__swatches-header">
        <span>Swatches</span>
      <RdsButton
  changeLeftIcon="add"
  changeRightIcon="save"
  color="primary"
  layout="icon-only"
  shape="rectangle"
  showLeftIcon
  size="small"
  state="default"
  style="transparent"
  text="Default Button"
  textCase="capitalize"
/>
      </div>
      <div className="rds-comp-color-picker__swatch-list rds-comp-color-picker__swatch-list--vertical">
        {["#FFC300", "#FF4F00", "#EA00FA", "#1708FF", "#00F5FF"].map(hex => (
          <div key={hex} className="rds-comp-color-picker__swatch-item" onClick={() => handleChange({ hex })}>
            <div className="rds-comp-color-picker__swatch-color" style={{ backgroundColor: hex }} />
            <div className="rds-comp-color-picker__swatch-label">{hex}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const ColorSwatchesType2 = ({ handleChange }) => {
  return (
    <div className="rds-comp-color-picker__swatches">
      <div className="rds-comp-color-picker__swatches-header">
        <span>Swatches</span>
      </div>
      <div className="rds-comp-color-picker__swatch-grid">
        <div className="rds-comp-color-picker__swatch-tile rds-comp-color-picker__swatch-tile--add">+</div>
        {["#FFC300","#FF4F00","#EA00FA","#9751F2","#00F5FF","#00E5FF","#00D1B2","#1ABC9C","#27AE60","#2ECC71","#16A085","#3498DB","#9B59B6","#BDBDBD"].map(hex => (
          <div key={hex} className="rds-comp-color-picker__swatch-tile" style={{ backgroundColor: hex }} onClick={() => handleChange({ hex })} />
        ))}
      </div>
    </div>
  );
};

export const ColorModeSwatches: React.FC<{
  selectedMode: "solid" | "gradient";
  onSelectMode: (mode: "solid" | "gradient") => void;
}> = ({ selectedMode, onSelectMode }) => {
  return (
    <div className="rds-comp-color-picker__mode-switcher">
      <div
        className={`rds-comp-color-picker__mode-swatch ${
          selectedMode === "solid" ? "rds-comp-color-picker__mode-swatch--active" : ""
        }`}
        onClick={() => onSelectMode("solid")}
      >
        <div className="rds-comp-color-picker__mode-swatch-solid"></div>
      </div>
      <div
        className={`rds-comp-color-picker__mode-swatch ${
          selectedMode === "gradient" ? "rds-comp-color-picker__mode-swatch--active" : ""
        }`}
        onClick={() => onSelectMode("gradient")}
      >
        <div className="rds-comp-color-picker__mode-swatch-gradient"></div>
      </div>
    </div>
  );
};

export const GradientEditor: React.FC<{
  gradientType: string;
  gradientDirection: number;
  gradientStops: Array<{ offset: number; color: string }>;
  onGradientTypeChange: (type: string) => void;
  onGradientDirectionChange: (direction: number) => void;
  onGradientStopChange: (index: number, color: string) => void;
  onGradientPositionChange: (index: number, position: number) => void;
  onAddGradientStop: (position: number) => void;
  onRemoveGradientStop: (index: number) => void;
}> = ({
  gradientType,
  gradientDirection,
  gradientStops,
  onGradientTypeChange,
  onGradientDirectionChange,
  onGradientStopChange,
  onGradientPositionChange,
  onAddGradientStop,
  onRemoveGradientStop,
}) => {
  return (
    <div className="rds-comp-color-picker__gradient-editor">
      <div className="rds-comp-color-picker__gradient-type">
        <button
          className={`rds-comp-color-picker__gradient-btn ${
            gradientType === "linear" ? "rds-comp-color-picker__gradient-btn--active" : ""
          }`}
          onClick={() => onGradientTypeChange("linear")}
        >
          Linear
        </button>
        <button
          className={`rds-comp-color-picker__gradient-btn ${
            gradientType === "radial" ? "rds-comp_color-picker__gradient-btn--active" : ""
          }`}
          onClick={() => onGradientTypeChange("radial")}
        >
          Radial
        </button>
      </div>
      
      {gradientType === "linear" && (
        <div className="rds-comp-color-picker__direction-control">
          <label>Direction: {gradientDirection}°</label>
          <input
            type="range"
            min="0"
            max="359"
            value={gradientDirection}
            onChange={(e) => onGradientDirectionChange(parseInt(e.target.value))}
            className="rds-comp-color-picker__direction-slider"
          />
        </div>
      )}
      
      <div className="rds-comp-color-picker__gradient-stops-container">
        <div 
          className="rds-comp-color-picker__gradient-preview"
          style={{
            background: gradientType === "linear"
              ? `linear-gradient(${gradientDirection}deg, ${gradientStops
                  .map((stop) => `${stop.color} ${stop.offset * 100}%`)
                  .join(", ")})`
              : `radial-gradient(circle, ${gradientStops
                  .map((stop) => `${stop.color} ${stop.offset * 100}%`)
                  .join(", ")})`
          }}
        ></div>
        
        <div className="rds-comp-color-picker__gradient-slider">
          <div className="rds-comp-color-picker__gradient-stops">
            {gradientStops.map((stop, index) => (
              <div
                key={index}
                className="rds-comp-color-picker__gradient-stop"
                style={{
                  left: `${stop.offset * 100}%`,
                  backgroundColor: stop.color
                }}
                onClick={() => onGradientStopChange(index, stop.color)}
              >
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={stop.offset * 100}
                  onChange={(e) => 
                    onGradientPositionChange(index, parseInt(e.target.value) / 100)
                  }
                  className="rds-comp-color-picker__stop-position"
                />
                {gradientStops.length > 2 && (
                  <button
                    className="rds-comp-color-picker__remove-stop"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveGradientStop(index);
                    }}
                  >
                    &times;
                  </button>
                )}
              </div>
            ))}
          </div>
          <div 
            className="rds-comp-color-picker__add-stop-area"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const position = (e.clientX - rect.left) / rect.width;
              onAddGradientStop(position);
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};
