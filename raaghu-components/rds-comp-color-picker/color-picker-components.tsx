import clsx from "clsx";
import { memo, type Dispatch, type RefObject, type SetStateAction } from "react";
import { HuePicker, AlphaPicker, type ColorResult } from "react-color";
import { rgbToHex, handleSpectrumClick, rgbToHsb, rgbToHsl } from "./color-utils";
import { ColorMode } from "./rds-comp-color-picker.types";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ColorizeOutlinedIcon from '@mui/icons-material/ColorizeOutlined';
import RdsButton from "../../raaghu-elements/rds-button/rds-button";

const SLIDER_TRACK_HEIGHT = "12px";
const SLIDER_POINTER_SIZE = 12;

const SliderPointer = ({ direction }: { direction?: string }) => {
  if (direction === "vertical") {
    return (
      <div
        className="rds-comp-color-picker__slider-pointer"
        style={{
          width: SLIDER_POINTER_SIZE,
          height: SLIDER_POINTER_SIZE,
          borderRadius: "50%",
          transform: `translate(-3px, -${SLIDER_POINTER_SIZE / 2}px)`,
          backgroundColor: "#ffffff",
          boxShadow: "0 0 2px rgba(0, 0, 0, 0.6)",
        }}
      />
    );
  }

  return (
    <div
      className="rds-comp-color-picker__slider-pointer"
      style={{
        width: SLIDER_POINTER_SIZE,
        height: SLIDER_POINTER_SIZE,
        borderRadius: "50%",
        backgroundColor: "#ffffff",
        boxShadow: "0 0 2px rgba(0, 0, 0, 0.6)",
      }}
    />
  );
};

const GRID_ROWS = Array.from({ length: 10 }, (_, i) => i);
const GRID_COLS = Array.from({ length: 11 }, (_, i) => i);
const SWATCHES_TYPE_1 = ["var(--rds-semantic-warning-main, #FFC300)", "var(--rds-semantic-error-main, #FF4F00)", "var(--rds-info-main, #EA00FA)", "var(--rds-primary-main, #1708FF)", "var(--rds-info-light, #00F5FF)"];
const SWATCHES_TYPE_2 = ["var(--rds-semantic-warning-main, #FFC300)","var(--rds-semantic-error-main, #FF4F00)","var(--rds-info-main, #EA00FA)","var(--rds-primary-main, #9751F2)","var(--rds-info-light, #00F5FF)","var(--rds-info-variant, #00E5FF)","var(--rds-neutral-300, #00D1B2)","var(--rds-success-main, #1ABC9C)","var(--rds-success-dark, #27AE60)","var(--rds-success-light, #2ECC71)","var(--rds-info-contrast, #16A085)","var(--rds-primary-light, #3498DB)","var(--rds-primary-dark, #9B59B6)","var(--rds-neutral-400, #BDBDBD)"];

const getSwatchHexDisplay = (swatchValue: string) => {
  const hexMatch = swatchValue.match(/#(?:[\dA-Fa-f]{3}){1,2}\b/);
  return hexMatch ? hexMatch[0].toUpperCase() : swatchValue;
};

interface ColorState {
  hex: string;
  rgb: { r: number; g: number; b: number; a: number };
}

interface ColorUpdate {
  hex: string;
  rgb?: { r: number; g: number; b: number; a: number };
}

interface SharedColorPickerProps {
  handleChange: (color: ColorUpdate) => void;
  selectedColorState: ColorState;
  handleHueChange: (color: ColorResult) => void;
  handleAlphaChange: (color: ColorResult) => void;
  colorModeDropdownRef: RefObject<HTMLDivElement>;
  selectedColorMode: ColorMode;
  showColorModeDropdown: boolean;
  setShowColorModeDropdown: Dispatch<SetStateAction<boolean>>;
  getColorDisplay: () => string;
  onSelectColorMode?: (mode: ColorMode) => void;
}

interface ColorPickerInfoProps {
  colorModeDropdownRef: RefObject<HTMLDivElement>;
  selectedColorMode: ColorMode;
  selectedColorState: ColorState;
  showColorModeDropdown: boolean;
  setShowColorModeDropdown: Dispatch<SetStateAction<boolean>>;
  getColorDisplay: () => string;
  onSelectColorMode?: (mode: ColorMode) => void;
}

export const ColorPickerGrid = memo(({
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
}: SharedColorPickerProps) => {
  return (
    <div>
      <div className="rds-comp-color-picker__color-grid-container">
        {GRID_ROWS.map((rowIndex) => {
          return (
            <div key={`row-${rowIndex}`} className="rds-comp-color-picker__color-row">
              {GRID_COLS.map((colIndex) => {
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
                  // Convert HSL to RGB for hex color
                  const l = lightness / 100;
                  const a = 1 * Math.min(l, 1 - l);
                  const f = (n: number) => {
                    const k = (n + hue / 30) % 12;
                    return l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
                  };
                  const r = Math.round(f(0) * 255);
                  const g = Math.round(f(8) * 255);
                  const b = Math.round(f(4) * 255);
                  clickHex = rgbToHex(r, g, b);
                  clickRgb = { r, g, b, a: 1 };
                }

                return (
                  <button
                    type="button"
                    key={`cell-${rowIndex}-${colIndex}`}
                    className="rds-comp-color-picker__color-cell"
                    style={{ backgroundColor: bgColor }}
                    onClick={() => handleChange({ hex: clickHex, rgb: clickRgb })}
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
});

export const ColorPickerSpectrum = memo(({
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
}: SharedColorPickerProps & { selectedColorHex: string; showSwatches?: boolean; styleType?: string }) => {
  return (
    <div className="rds-comp-color-picker__spectrum-type1">    
      <div className="rds-comp-color-picker__color-grid-container rds-comp-color-picker__color-grid-container--spectrum">
        <button
          type="button"
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
          aria-label="Pick color from spectrum"
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
});
export const ColorPickerSliders = memo(({ selectedColorState, handleHueChange, handleAlphaChange }: {
  selectedColorState: ColorState;
  handleHueChange: (color: ColorResult) => void;
  handleAlphaChange: (color: ColorResult) => void;
}) => {
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
            width="230px"
            height={SLIDER_TRACK_HEIGHT}
            {...({ pointer: SliderPointer } as Record<string, unknown>)}
            className="rds-comp-color-picker__hue-picker"
          />
        </div>       
        <div className="rds-comp-color-picker__slider-container rds-comp-color-picker__alpha-slider-container">
          {/* @ts-ignore - React Color TypeScript issues */}
          <AlphaPicker
            color={selectedColorState.rgb}
            onChange={handleAlphaChange}
            width="230px"
            height={SLIDER_TRACK_HEIGHT}
            {...({ pointer: SliderPointer } as Record<string, unknown>)}
            className="rds-comp-color-picker__alpha-picker"
          />
        </div>
      </div>
    </div>
  );
});

interface ColorInputsProps {
  selectedColorMode: ColorMode;
  rgb: { r: number; g: number; b: number; a: number };
  hsb: { h: number; s: number; b: number };
  hsl: { h: number; s: number; l: number };
  getColorDisplay: () => string;
}

const ColorInputs = ({ selectedColorMode, rgb, hsb, hsl, getColorDisplay }: ColorInputsProps) => {
  switch (selectedColorMode) {
    case ColorMode.RGB:
      return (
        <>
          <div className="rds-comp-color-picker__input-wrapper">
            <input type="text" value={rgb.r} readOnly className="rds-comp-color-picker__color-input" aria-label="Red channel value" />
          </div>
          <div className="rds-comp-color-picker__input-wrapper">
            <input type="text" value={rgb.g} readOnly className="rds-comp-color-picker__color-input" aria-label="Green channel value" />
          </div>
          <div className="rds-comp-color-picker__input-wrapper">
            <input type="text" value={rgb.b} readOnly className="rds-comp-color-picker__color-input" aria-label="Blue channel value" />
          </div>
        </>
      );
    case ColorMode.HSB:
      return (
        <>
          <div className="rds-comp-color-picker__input-wrapper">
            <input type="text" value={hsb.h} readOnly className="rds-comp-color-picker__color-input" aria-label="Hue value" />
          </div>
          <div className="rds-comp-color-picker__input-wrapper">
            <input type="text" value={hsb.s} readOnly className="rds-comp-color-picker__color-input" aria-label="Saturation value" />
          </div>
          <div className="rds-comp-color-picker__input-wrapper">
            <input type="text" value={hsb.b} readOnly className="rds-comp-color-picker__color-input" aria-label="Brightness value" />
          </div>
        </>
      );
    case ColorMode.HSL:
      return (
        <>
          <div className="rds-comp-color-picker__input-wrapper">
            <input type="text" value={hsl.h} readOnly className="rds-comp-color-picker__color-input" aria-label="Hue value" />
          </div>
          <div className="rds-comp-color-picker__input-wrapper">
            <input type="text" value={hsl.s} readOnly className="rds-comp-color-picker__color-input" aria-label="Saturation value" />
          </div>
          <div className="rds-comp-color-picker__input-wrapper">
            <input type="text" value={hsl.l} readOnly className="rds-comp-color-picker__color-input" aria-label="Lightness value" />
          </div>
        </>
      );
    default:
      return (
        <div className="rds-comp-color-picker__input-wrapper">
          <input type="text" value={getColorDisplay()} readOnly className="rds-comp-color-picker__hex-input" aria-label="Hex color value" />
        </div>
      );
  }
};
ColorInputs.displayName = 'ColorInputs';

export const ColorPickerInfo = memo(({
  colorModeDropdownRef,
  setShowColorModeDropdown,
  showColorModeDropdown,
  selectedColorMode,
  selectedColorState,
  getColorDisplay,
  onSelectColorMode,
}: ColorPickerInfoProps) => {
  const rgb = selectedColorState.rgb || { r: 0, g: 0, b: 0, a: 1 };
  const hsb = rgbToHsb(rgb);
  const hsl = rgbToHsl(rgb);

  return (
    <div className="rds-comp-color-picker__color-info">
      <div className="rds-comp-color-picker__dropdown-container" ref={colorModeDropdownRef}>
        <button
          type="button"
          className="rds-comp-color-picker__dropdown-button"
          onClick={() => setShowColorModeDropdown(!showColorModeDropdown)}
          aria-label="Change color mode"
        >
          <div className="rds-comp-color-picker__color-circle" style={{ backgroundColor: selectedColorState.hex }}></div>
          <span className="rds-comp-color-picker__dropdown-label">{selectedColorMode}</span>
         
          <KeyboardArrowDownIcon/>
        </button>
        
        {showColorModeDropdown && (
          <div className="rds-comp-color-picker__dropdown-menu" role="listbox" aria-label="Color format">
            {Object.values(ColorMode).map((mode) => (
              <button
                type="button"
                key={mode}
                role="option"
                aria-selected={selectedColorMode === mode}
                className={clsx("rds-comp-color-picker__dropdown-item", selectedColorMode === mode && "active")}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  if (onSelectColorMode) onSelectColorMode(mode);
                  setShowColorModeDropdown(false);
                }}
              >
                {mode}
              </button>
            ))}
          </div>
        )}
      </div>      
      <ColorInputs
        selectedColorMode={selectedColorMode}
        rgb={rgb}
        hsb={hsb}
        hsl={hsl}
        getColorDisplay={getColorDisplay}
      />      
      <div className="rds-comp-color-picker__percent-wrapper">
        <input
          type="text"
          value={`100%`}
          readOnly
          className="rds-comp-color-picker__percent-input"
          aria-label="Opacity percentage"
        />
      </div>
    </div>
  );
});

export const ColorSwatchesType1 = memo(({ handleChange }: { handleChange: (color: { hex: string }) => void }) => {
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
        {SWATCHES_TYPE_1.map((hex) => {
          const swatchHex = getSwatchHexDisplay(hex);
          return (
          <button type="button" key={hex} className="rds-comp-color-picker__swatch-item" onClick={() => handleChange({ hex })} aria-label={`Select color ${swatchHex}`} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleChange({ hex }); } }}>
            <div className="rds-comp-color-picker__swatch-color" style={{ backgroundColor: hex }} />
            <div className="rds-comp-color-picker__swatch-label">{swatchHex}</div>
          </button>
        )})}
      </div>
    </div>
  );
});

export const ColorSwatchesType2 = memo(({ handleChange }: { handleChange: (color: { hex: string }) => void }) => {
  return (
    <div className="rds-comp-color-picker__swatches">
      <div className="rds-comp-color-picker__swatches-header">
        <span>Swatches</span>
      </div>
      <div className="rds-comp-color-picker__swatch-grid">
        <div className="rds-comp-color-picker__swatch-tile rds-comp-color-picker__swatch-tile--add">+</div>
        {SWATCHES_TYPE_2.map(hex => (
          <button type="button" key={hex} className="rds-comp-color-picker__swatch-tile" style={{ backgroundColor: hex }} aria-label={`Select color ${hex}`} onClick={() => handleChange({ hex })} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleChange({ hex }); } }} />
        ))}
      </div>
    </div>
  );
});

export const ColorModeSwatches = memo(({ selectedMode, onSelectMode }: {
  selectedMode: "solid" | "gradient";
  onSelectMode: (mode: "solid" | "gradient") => void;
}) => {
  return (
    <div className="rds-comp-color-picker__mode-switcher">
      <button
        type="button"
        className={clsx("rds-comp-color-picker__mode-swatch", selectedMode === "solid" && "rds-comp-color-picker__mode-swatch--active")}
        onClick={() => onSelectMode("solid")}
        aria-label="Select solid mode"
      >
        <div className="rds-comp-color-picker__mode-swatch-solid"></div>
      </button>
      <button
        type="button"
        className={clsx("rds-comp-color-picker__mode-swatch", selectedMode === "gradient" && "rds-comp-color-picker__mode-swatch--active")}
        onClick={() => onSelectMode("gradient")}
        aria-label="Select gradient mode"
      >
        <div className="rds-comp-color-picker__mode-swatch-gradient"></div>
      </button>
    </div>
  );
});

export const GradientEditor = memo(({
  gradientType,
  gradientDirection,
  gradientStops,
  onGradientTypeChange,
  onGradientDirectionChange,
  onGradientStopChange,
  onGradientPositionChange,
  onAddGradientStop,
  onRemoveGradientStop,
}: {
  gradientType: string;
  gradientDirection: number;
  gradientStops: Array<{ offset: number; color: string }>;
  onGradientTypeChange: (type: string) => void;
  onGradientDirectionChange: (direction: number) => void;
  onGradientStopChange: (index: number, color: string) => void;
  onGradientPositionChange: (index: number, position: number) => void;
  onAddGradientStop: (position: number) => void;
  onRemoveGradientStop: (index: number) => void;
}) => {
  return (
    <div className="rds-comp-color-picker__gradient-editor">
      <div className="rds-comp-color-picker__gradient-type">
        <button
          type="button"
          className={clsx(
            "rds-comp-color-picker__gradient-btn",
            gradientType === "linear" && "rds-comp-color-picker__gradient-btn--active"
          )}
          onClick={() => onGradientTypeChange("linear")}
        >
          Linear
        </button>
        <button
          type="button"
          className={clsx(
            "rds-comp-color-picker__gradient-btn",
            gradientType === "radial" && "rds-comp_color-picker__gradient-btn--active"
          )}
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
            aria-label="Gradient direction"
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
                key={`${stop.color}-${stop.offset}`}
                className="rds-comp-color-picker__gradient-stop"
                style={{
                  left: `${stop.offset * 100}%`,
                  backgroundColor: stop.color
                }}
              >
                <button
                  type="button"
                  className="rds-comp-color-picker__gradient-stop-select"
                  onClick={() => onGradientStopChange(index, stop.color)}
                  aria-label={`Select gradient stop ${index + 1}`}
                />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={stop.offset * 100}
                  onChange={(e) => 
                    onGradientPositionChange(index, parseInt(e.target.value) / 100)
                  }
                  className="rds-comp-color-picker__stop-position"
                  aria-label={`Gradient stop ${index + 1} position`}
                />
                {gradientStops.length > 2 && (
                  <button
                    type="button"
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
          <button
            type="button"
            className="rds-comp-color-picker__add-stop-area"
            onClick={(e) => {
              const rect = (e.currentTarget as HTMLButtonElement).getBoundingClientRect();
              const position = (e.clientX - rect.left) / rect.width;
              onAddGradientStop(position);
            }}
            aria-label="Add gradient stop"
          />
        </div>
      </div>
    </div>
  );
});

ColorPickerGrid.displayName = 'ColorPickerGrid';
ColorPickerSpectrum.displayName = 'ColorPickerSpectrum';
ColorPickerSliders.displayName = 'ColorPickerSliders';
ColorPickerInfo.displayName = 'ColorPickerInfo';
ColorSwatchesType1.displayName = 'ColorSwatchesType1';
ColorSwatchesType2.displayName = 'ColorSwatchesType2';
ColorModeSwatches.displayName = 'ColorModeSwatches';
GradientEditor.displayName = 'GradientEditor';
