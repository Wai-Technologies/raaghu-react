import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from "react";
import clsx from 'clsx';
import "./rds-comp-color-picker.scss";
import RdsButton from "../../raaghu-elements/rds-button/rds-button";
import { getColorDisplay, normalizeHex, resolveColorToHex } from "./color-utils";
import {
  ColorPickerGrid,
  ColorPickerSpectrum,
} from "./color-picker-components";
import { colorTokens } from "../../raaghu-react-themes/tokens/design-tokens";
import {
  ColorMode,
  ColorPickerType,
  type RdsCompColorPickerProps,
  StyleType,
} from "./rds-comp-color-picker.types";

interface ColorUpdate {
  hex: string;
  rgb?: { r: number; g: number; b: number; a?: number };
}

const RdsColorPicker = (props: RdsCompColorPickerProps) => {
  const { value, label, type, showSwatches, pickerType, showTabs, colorMode, style, isDisabled, onChange } =
    props;
  const getDefaultColorHex = useCallback(() => {
    if (value) {
      return value.startsWith("#") ? normalizeHex(value) : resolveColorToHex(value).hex;
    }
    try {
      if (typeof window !== 'undefined') {
        const computed = getComputedStyle(document.documentElement).getPropertyValue('--rds-color-primary') || '';
        const trimmed = computed.trim();
        if (trimmed) {
          return trimmed.startsWith("#") ? normalizeHex(trimmed) : resolveColorToHex(trimmed).hex;
        }
      }
    } catch (e) {
      // ignore
    }
    return colorTokens.primary[400];
  }, [value]);

  const hexToRgb = useCallback((hex: string) => {
    if (!hex) return { r: 0, g: 0, b: 0 };
    const h = hex.replace('#', '');
    if (h.length === 3) {
      const r = parseInt(h[0] + h[0], 16);
      const g = parseInt(h[1] + h[1], 16);
      const b = parseInt(h[2] + h[2], 16);
      return { r, g, b };
    }
    const r = parseInt(h.substring(0, 2), 16);
    const g = parseInt(h.substring(2, 4), 16);
    const b = parseInt(h.substring(4, 6), 16);
    return { r, g, b };
  }, []);

  const _defaultHex = useMemo(() => getDefaultColorHex(), [getDefaultColorHex]);
  const defaultRgb = useMemo(() => hexToRgb(_defaultHex), [_defaultHex, hexToRgb]);

  const [pickerState, setPickerState] = useState({
    internalColorState: {
      hex: _defaultHex,
      rgb: { r: defaultRgb.r, g: defaultRgb.g, b: defaultRgb.b, a: 1 },
    },
    showPicker: type !== ColorPickerType.Button,
    internalSelectedTab: (pickerType || "Grid") as "Grid" | "Spectrum",
    internalSelectedColorMode: colorMode || ColorMode.HEX,
    showColorModeDropdown: false,
    internalSelectedStyle: style || StyleType.Type1,
  });
  const {
    internalColorState,
    showPicker,
    internalSelectedTab,
    internalSelectedColorMode,
    showColorModeDropdown,
    internalSelectedStyle,
  } = pickerState;
  const updatePickerState = useCallback((updates: Partial<typeof pickerState> | ((prev: typeof pickerState) => Partial<typeof pickerState>)) => {
    setPickerState((prev) => ({
      ...prev,
      ...(typeof updates === 'function' ? updates(prev) : updates),
    }));
  }, []);

  const selectedTab = internalSelectedTab;
  const selectedStyle = style || internalSelectedStyle;
  const selectedColorHex = internalColorState.hex;
  const selectedColorState = internalColorState;
  
  const colorModeDropdownRef = useRef<HTMLDivElement>(null);
  const prevTypeRef = useRef(type);
  const prevPickerTypeRef = useRef(pickerType);
  const prevColorModeRef = useRef(colorMode);

  if (type !== prevTypeRef.current) {
    prevTypeRef.current = type;
    updatePickerState({ showPicker: type !== ColorPickerType.Button });
  }

  if (pickerType && pickerType !== prevPickerTypeRef.current) {
    prevPickerTypeRef.current = pickerType;
    updatePickerState({ internalSelectedTab: pickerType as "Grid" | "Spectrum" });
  }

  if (colorMode && colorMode !== prevColorModeRef.current) {
    prevColorModeRef.current = colorMode;
    updatePickerState({ internalSelectedColorMode: colorMode });
  }

  const selectedColorMode = internalSelectedColorMode;

  const prevValueRef = useRef(value);
  if (value && value.startsWith('#') && value !== prevValueRef.current) {
    prevValueRef.current = value;
    const rgb = hexToRgb(value);
    updatePickerState((prev) => ({
      internalColorState: {
        ...prev.internalColorState,
        hex: value,
        rgb: {
          r: rgb.r,
          g: rgb.g,
          b: rgb.b,
          a: prev.internalColorState.rgb.a,
        },
      },
    }));
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (colorModeDropdownRef.current && !colorModeDropdownRef.current.contains(event.target as Node)) {
        updatePickerState({ showColorModeDropdown: false });
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [updatePickerState]);
  
  const handleButtonClick = useCallback(() => {
    if (isDisabled) return;
    updatePickerState((prev) => ({ showPicker: !prev.showPicker }));
  }, [isDisabled, updatePickerState]);

  const handleTabClick = useCallback((tab: "Grid" | "Spectrum") => {
    updatePickerState({ internalSelectedTab: tab });
  }, [updatePickerState]);

  const rgbToHex = useCallback((r: number, g: number, b: number) => {
    return `#${[r, g, b]
      .map((v) => Math.round(v).toString(16).padStart(2, '0'))
      .join('')
      .toUpperCase()}`;
  }, []);

  const handleChange = useCallback((newColor: ColorUpdate) => {
    if (isDisabled) return;
    let nextRgb = newColor.rgb ?? selectedColorState.rgb;
    let nextHex: string;

    if (newColor.rgb) {
      nextHex = rgbToHex(nextRgb.r, nextRgb.g, nextRgb.b);
    } else if (newColor.hex.startsWith("#")) {
      nextHex = normalizeHex(newColor.hex);
    } else {
      const resolved = resolveColorToHex(newColor.hex);
      nextHex = resolved.hex;
      nextRgb = resolved.rgb;
    }

    const next = {
      ...selectedColorState,
      hex: nextHex,
      rgb: { ...nextRgb, a: nextRgb.a ?? selectedColorState.rgb.a },
    };
    updatePickerState({ internalColorState: next });
    if (onChange) onChange(nextHex);
  }, [isDisabled, selectedColorState, onChange, rgbToHex, updatePickerState]);

  const handleHueChange = useCallback((newColor: ColorUpdate) => {
    if (isDisabled) return;
    const next = {
      ...selectedColorState,
      hex: newColor.hex,
      rgb: newColor.rgb
        ? { ...newColor.rgb, a: newColor.rgb.a ?? selectedColorState.rgb.a }
        : selectedColorState.rgb,
    };
    updatePickerState({ internalColorState: next });
    if (onChange) onChange(newColor.hex);
  }, [isDisabled, selectedColorState, onChange, updatePickerState]);

  const handleAlphaChange = useCallback((newColor: ColorUpdate) => {
    if (isDisabled) return;
    updatePickerState({ internalColorState: { ...selectedColorState, rgb: { ...selectedColorState.rgb, a: newColor.rgb?.a ?? selectedColorState.rgb.a } } });
  }, [isDisabled, selectedColorState, updatePickerState]);

  const getColorDisplayValue = useCallback(() => {
    return getColorDisplay(selectedColorMode, selectedColorState);
  }, [selectedColorMode, selectedColorState]);

  const handleSelectColorMode = useCallback((mode: ColorMode) => {
    updatePickerState({ internalSelectedColorMode: mode });
  }, [updatePickerState]);

  const setShowColorModeDropdown = useCallback((next: boolean | ((prev: boolean) => boolean)) => {
    updatePickerState((prev) => ({
      showColorModeDropdown: typeof next === 'function' ? next(prev.showColorModeDropdown) : next,
    }));
  }, [updatePickerState]);

  return (
    <Fragment>
      <div className="rds-comp-color-picker" aria-disabled={isDisabled || undefined}>
        {(type === ColorPickerType.Button || type === ColorPickerType.ButtonExpanded) && (
          <RdsButton
            color="primary"
            style="filled"
            disabled={isDisabled}
            onClick={handleButtonClick}
          >
            {label || "Color Picker"}
          </RdsButton>
        )}
        {(showPicker && (type === ColorPickerType.ButtonExpanded || type === ColorPickerType.Default || type === ColorPickerType.Button)) && (
          <div className="rds-comp-color-picker__container">
            {showTabs && (
              <div className="rds-comp-color-picker__tabs">
                <button
                  type="button"
                  className={clsx("rds-comp-color-picker__tab", selectedTab === "Grid" && "rds-comp-color-picker__tab--active")}
                  onClick={() => handleTabClick("Grid")}
                >
                  Grid
                </button>
                <button
                  type="button"
                  className={clsx(
                    "rds-comp-color-picker__tab",
                    selectedTab === "Spectrum" && "rds-comp-color-picker__tab--active"
                  )}
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
                getColorDisplay={getColorDisplayValue}
                onSelectColorMode={handleSelectColorMode}
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
                getColorDisplay={getColorDisplayValue}
                showSwatches={showSwatches}
                styleType={selectedStyle}
                onSelectColorMode={handleSelectColorMode}
              />
            )}
          </div>
        )}
      </div>
    </Fragment>
  );
};
RdsColorPicker.displayName = "RdsCompColorPicker";
export default RdsColorPicker;
