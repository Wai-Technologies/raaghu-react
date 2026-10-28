import clsx from "clsx";
import { memo, useRef, type Dispatch, type KeyboardEvent, type RefObject, type SetStateAction } from "react";
import { Slider } from "@mui/material";
import { rgbToHex, handleSpectrumClick, rgbToHsb, rgbToHsl, hsvToRgb } from "./color-utils";
import { ColorMode } from "./rds-comp-color-picker.types";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ColorizeOutlinedIcon from '@mui/icons-material/ColorizeOutlined';
import RdsButton from "../../raaghu-elements/rds-button/rds-button";

const HUE_TRACK_GRADIENT =
  "linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)";
const CHECKERBOARD =
  "linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)";

const GRID_ROWS = Array.from({ length: 10 }, (_, i) => i);
const GRID_COLS = Array.from({ length: 11 }, (_, i) => i);
const SWATCHES_TYPE_1 = ["var(--rds-semantic-warning-main)", "var(--rds-semantic-error-main)", "var(--rds-info-main)", "var(--rds-primary-main)", "var(--rds-info-light)"];
const SWATCHES_TYPE_2 = ["var(--rds-semantic-warning-main)","var(--rds-semantic-error-main)","var(--rds-info-main)","var(--rds-primary-main)","var(--rds-info-light)","var(--rds-info-variant)","var(--rds-neutral-300)","var(--rds-success-main)","var(--rds-success-dark)","var(--rds-success-light)","var(--rds-info-contrast)","var(--rds-primary-light)","var(--rds-primary-dark)","var(--rds-neutral-400)"];

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
  handleHueChange: (color: ColorUpdate) => void;
  handleAlphaChange: (color: ColorUpdate) => void;
  colorModeDropdownRef: RefObject<HTMLDivElement | null>;
  selectedColorMode: ColorMode;
  showColorModeDropdown: boolean;
  setShowColorModeDropdown: Dispatch<SetStateAction<boolean>>;
  getColorDisplay: () => string;
  onSelectColorMode?: (mode: ColorMode) => void;
}

interface ColorPickerInfoProps {
  colorModeDropdownRef: RefObject<HTMLDivElement | null>;
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
  swatches,
  onAddSwatch,
}: SharedColorPickerProps & {
  selectedColorHex: string;
  showSwatches?: boolean;
  styleType?: string;
  swatches?: string[];
  onAddSwatch?: () => void;
}) => {
  return (
    <div className="rds-comp-color-picker__spectrum-type1">    
      <div className="rds-comp-color-picker__color-grid-container rds-comp-color-picker__color-grid-container--spectrum">
        <button
          type="button"
          className="rds-comp-color-picker__spectrum-area"
          style={{ backgroundColor: selectedColorHex }}
          onClick={(e) => {
            const hue = selectedColorState.rgb ? (rgbToHsb(selectedColorState.rgb).h + 360) % 360 : 0;
            const result = handleSpectrumClick(
              e,
              hue,
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
          <ColorSwatchesType1 handleChange={handleChange} swatches={swatches} onAddSwatch={onAddSwatch} />
        ) : (
          <ColorSwatchesType2 handleChange={handleChange} swatches={swatches} onAddSwatch={onAddSwatch} />
        )
      )}
    </div>
  );
});
export const ColorPickerSliders = memo(({ selectedColorState, handleHueChange, handleAlphaChange }: {
  selectedColorState: ColorState;
  handleHueChange: (color: ColorUpdate) => void;
  handleAlphaChange: (color: ColorUpdate) => void;
}) => {
  const hsb = rgbToHsb(selectedColorState.rgb);
  const hue = ((hsb.h % 360) + 360) % 360;
  const alphaPct = Math.round((selectedColorState.rgb.a ?? 1) * 100);
  const { r, g, b } = selectedColorState.rgb;
  const solid = `rgb(${r}, ${g}, ${b})`;

  return (
    <div className="rds-comp-color-picker__sliders-row">
      <div className="rds-comp-color-picker__eyedropper" aria-hidden="true">
        <ColorizeOutlinedIcon fontSize="small" />
      </div>
      <div className="rds-comp-color-picker__sliders">
        <div className="rds-comp-color-picker__slider-container">
          <Slider
            className="rds-comp-color-picker__hue-picker"
            min={0}
            max={360}
            value={hue}
            aria-label="Hue"
            onChange={(_, value) => {
              const nextHue = Array.isArray(value) ? value[0] : value;
              const rgb = hsvToRgb(nextHue / 360, hsb.s / 100, hsb.b / 100);
              handleHueChange({
                hex: rgbToHex(rgb.r, rgb.g, rgb.b),
                rgb: { ...rgb, a: selectedColorState.rgb.a },
              });
            }}
            sx={{
              color: 'transparent',
              height: 12,
              padding: '6px 0',
              '& .MuiSlider-rail': {
                opacity: 1,
                background: HUE_TRACK_GRADIENT,
                borderRadius: 'var(--rds-border-radius-lg)',
              },
              '& .MuiSlider-track': { background: 'transparent', border: 'none' },
              '& .MuiSlider-thumb': {
                width: 12,
                height: 12,
                backgroundColor: 'var(--rds-color-surface-contrast)',
                boxShadow: '0 0 2px var(--rds-shadow-color, rgba(0, 0, 0, 0.6))',
              },
            }}
          />
        </div>
        <div className="rds-comp-color-picker__slider-container rds-comp-color-picker__alpha-slider-container">
          <Slider
            className="rds-comp-color-picker__alpha-picker"
            min={0}
            max={100}
            value={alphaPct}
            aria-label="Opacity"
            onChange={(_, value) => {
              const pct = Array.isArray(value) ? value[0] : value;
              handleAlphaChange({
                hex: selectedColorState.hex,
                rgb: { ...selectedColorState.rgb, a: pct / 100 },
              });
            }}
            sx={{
              color: 'transparent',
              height: 12,
              padding: '6px 0',
              '& .MuiSlider-rail': {
                opacity: 1,
                backgroundImage: `linear-gradient(to right, transparent, ${solid}), ${CHECKERBOARD}`,
                backgroundSize: '100% 100%, 8px 8px',
                backgroundPosition: '0 0, 0 0, 0 4px, 4px -4px',
                borderRadius: 'var(--rds-border-radius-lg)',
              },
              '& .MuiSlider-track': { background: 'transparent', border: 'none' },
              '& .MuiSlider-thumb': {
                width: 12,
                height: 12,
                backgroundColor: 'var(--rds-color-surface-contrast)',
                boxShadow: '0 0 2px var(--rds-shadow-color, rgba(0, 0, 0, 0.6))',
              },
            }}
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
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeOnEscape = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Escape' && showColorModeDropdown) {
      e.preventDefault();
      setShowColorModeDropdown(false);
      triggerRef.current?.focus();
    }
  };

  return (
    <div className="rds-comp-color-picker__color-info">
      <div className="rds-comp-color-picker__dropdown-container" ref={colorModeDropdownRef}>
        <button
          ref={triggerRef}
          type="button"
          className="rds-comp-color-picker__dropdown-button"
          onClick={() => setShowColorModeDropdown(!showColorModeDropdown)}
          onKeyDown={closeOnEscape}
          aria-label="Change color mode"
          aria-haspopup="listbox"
          aria-expanded={showColorModeDropdown}
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
                onKeyDown={closeOnEscape}
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
          value={`${Math.round((rgb.a ?? 1) * 100)}%`}
          readOnly
          className="rds-comp-color-picker__percent-input"
          aria-label="Opacity percentage"
        />
      </div>
    </div>
  );
});

interface ColorSwatchesProps {
  handleChange: (color: { hex: string }) => void;
  /** Swatch colours; defaults to the built-in list for the style. */
  swatches?: string[];
  /** Called when the add-swatch control is activated. */
  onAddSwatch?: () => void;
}

export const ColorSwatchesType1 = memo(({ handleChange, swatches = SWATCHES_TYPE_1, onAddSwatch }: ColorSwatchesProps) => {
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
  variant="transparent"
  text="Default Button"
  textCase="capitalize"
  aria-label="Add swatch"
  onClick={onAddSwatch}
/>
      </div>
      <div className="rds-comp-color-picker__swatch-list rds-comp-color-picker__swatch-list--vertical">
        {swatches.map((hex, index) => {
          const swatchHex = getSwatchHexDisplay(hex);
          return (
          <button type="button" key={`${hex}-${index}`} className="rds-comp-color-picker__swatch-item" onClick={() => handleChange({ hex })} aria-label={`Select color ${swatchHex}`}>
            <div className="rds-comp-color-picker__swatch-color" style={{ backgroundColor: hex }} />
            <div className="rds-comp-color-picker__swatch-label">{swatchHex}</div>
          </button>
        )})}
      </div>
    </div>
  );
});

export const ColorSwatchesType2 = memo(({ handleChange, swatches = SWATCHES_TYPE_2, onAddSwatch }: ColorSwatchesProps) => {
  return (
    <div className="rds-comp-color-picker__swatches">
      <div className="rds-comp-color-picker__swatches-header">
        <span>Swatches</span>
      </div>
      <div className="rds-comp-color-picker__swatch-grid">
        <div
          className="rds-comp-color-picker__swatch-tile rds-comp-color-picker__swatch-tile--add"
          role="button"
          tabIndex={0}
          aria-label="Add swatch"
          onClick={() => onAddSwatch?.()}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onAddSwatch?.();
            }
          }}
        >+</div>
        {swatches.map((hex, index) => (
          <button type="button" key={`${hex}-${index}`} className="rds-comp-color-picker__swatch-tile" style={{ backgroundColor: hex }} aria-label={`Select color ${hex}`} onClick={() => handleChange({ hex })} />
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
            gradientType === "radial" && "rds-comp-color-picker__gradient-btn--active"
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
