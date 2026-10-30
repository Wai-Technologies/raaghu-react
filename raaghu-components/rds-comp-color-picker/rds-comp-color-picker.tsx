import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Box } from "@mui/material";
import clsx from 'clsx';
import "./rds-comp-color-picker.scss";
import RdsButton from "../../raaghu-elements/rds-button/rds-button";
import { resolveDeprecatedProp, warnDeprecatedProp } from "../../raaghu-elements/shared/utils/deprecation";
import { getColorDisplay, normalizeHex, parseHexToRgb, resolveColorToHex, rgbToHex } from "./color-utils";
import {
  ColorPickerGrid,
  ColorPickerSpectrum,
} from "./color-picker-components";
import { colorTokens } from "../../raaghu-react-themes/tokens/design-tokens";
import {
  ColorMode,
  ColorPickerType,
  PickerType,
  type RdsCompColorPickerProps,
  StyleType,
} from "./rds-comp-color-picker.types";

interface ColorUpdate {
  hex: string;
  rgb?: { r: number; g: number; b: number; a?: number };
}

const VARIANT_TO_TYPE = {
  inline: ColorPickerType.Default,
  button: ColorPickerType.Button,
  'button-expanded': ColorPickerType.ButtonExpanded,
};
const VIEW_TO_TAB = { grid: PickerType.Grid, spectrum: PickerType.Spectrum };
const SWATCHES_VARIANT_TO_STYLE = { list: StyleType.Type1, grid: StyleType.Type2 };

const hexToRgb = (hex: string) => (hex ? parseHexToRgb(hex) : { r: 0, g: 0, b: 0 });
const toHex = (r: number, g: number, b: number) => rgbToHex(Math.round(r), Math.round(g), Math.round(b));
const toHex8 = (hex: string, a: number) =>
  `${hex}${Math.round(Math.min(Math.max(a, 0), 1) * 255).toString(16).padStart(2, '0').toUpperCase()}`;

const RdsColorPicker = (props: RdsCompColorPickerProps) => {
  const {
    value: valueProp,
    defaultValue,
    label,
    type: typeProp,
    variant,
    showSwatches,
    pickerType,
    view,
    defaultView,
    showTabs,
    colorMode: colorModeProp,
    format,
    defaultFormat,
    style,
    swatchesVariant,
    disabled,
    isDisabled: isDisabledProp,
    onChange,
    onAddSwatch,
    swatches,
    sx,
    className,
    ref,
    ...rest
  } = props;
  const isDisabled = resolveDeprecatedProp(
    disabled,
    isDisabledProp,
    'RdsCompColorPicker',
    'isDisabled',
    '`disabled`',
  );
  if (colorModeProp !== undefined) warnDeprecatedProp('RdsCompColorPicker', 'colorMode', '`format`');
  if (pickerType !== undefined) warnDeprecatedProp('RdsCompColorPicker', 'pickerType', '`view`');
  const value = valueProp ?? defaultValue;
  const type = (variant && VARIANT_TO_TYPE[variant]) ?? typeProp ?? ColorPickerType.Default;
  const colorMode = (format?.toUpperCase() as ColorMode | undefined) ?? colorModeProp;
  const viewTab = (view && VIEW_TO_TAB[view]) ?? pickerType;
  const initialColorMode = colorMode ?? (defaultFormat?.toUpperCase() as ColorMode | undefined);
  const initialTab = viewTab ?? (defaultView && VIEW_TO_TAB[defaultView]);
  const legacyStyle = typeof style === 'string' ? style : undefined;
  if (legacyStyle !== undefined) warnDeprecatedProp('RdsCompColorPicker', 'style', '`swatchesVariant`');
  const selectedStyle = (swatchesVariant && SWATCHES_VARIANT_TO_STYLE[swatchesVariant]) ?? legacyStyle ?? StyleType.Type1;

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
    } catch {
      return colorTokens.primary[400];
    }
    return colorTokens.primary[400];
  }, [value]);

  const _defaultHex = useMemo(() => getDefaultColorHex(), [getDefaultColorHex]);
  const defaultRgb = useMemo(() => hexToRgb(_defaultHex), [_defaultHex]);

  const [pickerState, setPickerState] = useState({
    internalColorState: {
      hex: _defaultHex,
      rgb: { r: defaultRgb.r, g: defaultRgb.g, b: defaultRgb.b, a: 1 },
    },
    showPicker: type !== ColorPickerType.Button,
    internalSelectedTab: (initialTab || "Grid") as "Grid" | "Spectrum",
    internalSelectedColorMode: initialColorMode || ColorMode.HEX,
    showColorModeDropdown: false,
  });
  const {
    internalColorState,
    showPicker,
    internalSelectedTab,
    internalSelectedColorMode,
    showColorModeDropdown,
  } = pickerState;
  const updatePickerState = useCallback((updates: Partial<typeof pickerState> | ((prev: typeof pickerState) => Partial<typeof pickerState>)) => {
    setPickerState((prev) => ({
      ...prev,
      ...(typeof updates === 'function' ? updates(prev) : updates),
    }));
  }, []);

  const selectedTab = internalSelectedTab;
  const selectedColorHex = internalColorState.hex;
  const selectedColorState = internalColorState;

  const colorModeDropdownRef = useRef<HTMLDivElement>(null);
  const [prevType, setPrevType] = useState(type);
  const [prevPickerType, setPrevPickerType] = useState(viewTab);
  const [prevColorMode, setPrevColorMode] = useState(colorMode);

  if (type !== prevType) {
    setPrevType(type);
    updatePickerState({ showPicker: type !== ColorPickerType.Button });
  }

  if (viewTab && viewTab !== prevPickerType) {
    setPrevPickerType(viewTab);
    updatePickerState({ internalSelectedTab: viewTab as "Grid" | "Spectrum" });
  }

  if (colorMode && colorMode !== prevColorMode) {
    setPrevColorMode(colorMode);
    updatePickerState({ internalSelectedColorMode: colorMode });
  }

  const selectedColorMode = internalSelectedColorMode;

  const [prevValue, setPrevValue] = useState(value);
  if (value !== undefined && value !== prevValue) {
    setPrevValue(value);
    if (value) {
      const trimmed = value.trim();
      const isHex = /^#[0-9A-Fa-f]{3,8}$/.test(trimmed);
      const resolved = isHex
        ? { hex: normalizeHex(trimmed), rgb: { ...hexToRgb(normalizeHex(trimmed)), a: 1 } }
        : resolveColorToHex(trimmed);
      const explicitlyBlack = /^(#0{3}([0-9A-Fa-f]{3})?|#000000|black|rgb\(\s*0\s*,\s*0\s*,\s*0)/i.test(trimmed);
      if (!(resolved.hex === '#000000' && !isHex && !explicitlyBlack)) {
        updatePickerState((prev) => ({
          internalColorState: {
            ...prev.internalColorState,
            hex: resolved.hex,
            rgb: {
              r: resolved.rgb.r,
              g: resolved.rgb.g,
              b: resolved.rgb.b,
              a: prev.internalColorState.rgb.a,
            },
          },
        }));
      }
    }
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
    if (isDisabled) return;
    updatePickerState({ internalSelectedTab: tab });
  }, [isDisabled, updatePickerState]);

  const handleChange = useCallback((newColor: ColorUpdate) => {
    if (isDisabled) return;
    let nextRgb = newColor.rgb ?? selectedColorState.rgb;
    let nextHex: string;

    if (newColor.rgb) {
      nextHex = toHex(nextRgb.r, nextRgb.g, nextRgb.b);
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
  }, [isDisabled, selectedColorState, onChange, updatePickerState]);

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
    const rgba = { ...selectedColorState.rgb, a: newColor.rgb?.a ?? selectedColorState.rgb.a };
    updatePickerState({ internalColorState: { ...selectedColorState, rgb: rgba } });
    if (onChange) onChange(selectedColorState.hex, { rgba, hex8: toHex8(selectedColorState.hex, rgba.a) });
  }, [isDisabled, selectedColorState, onChange, updatePickerState]);

  const getColorDisplayValue = useCallback(() => {
    return getColorDisplay(selectedColorMode, selectedColorState);
  }, [selectedColorMode, selectedColorState]);

  const handleSelectColorMode = useCallback((mode: ColorMode) => {
    if (isDisabled) return;
    updatePickerState({ internalSelectedColorMode: mode });
  }, [isDisabled, updatePickerState]);

  const setShowColorModeDropdown = useCallback((next: boolean | ((prev: boolean) => boolean)) => {
    updatePickerState((prev) => ({
      showColorModeDropdown: typeof next === 'function' ? next(prev.showColorModeDropdown) : next,
    }));
  }, [updatePickerState]);

  return (
    <Box
      role={label ? "group" : undefined}
      aria-label={label || undefined}
      {...rest}
      ref={ref}
      className={clsx("rds-comp-color-picker", className)}
      sx={sx}
      style={typeof style === 'object' ? style : undefined}
      aria-disabled={isDisabled || undefined}
    >
      {(type === ColorPickerType.Button || type === ColorPickerType.ButtonExpanded) && (
        <RdsButton
          color="primary"
          variant="filled"
          disabled={isDisabled}
          onClick={handleButtonClick}
        >
          {label || "Color Picker"}
        </RdsButton>
      )}
      {(showPicker && (type === ColorPickerType.ButtonExpanded || type === ColorPickerType.Default || type === ColorPickerType.Button)) && (
        <div className={clsx("rds-comp-color-picker__container", isDisabled && "rds-comp-color-picker__container--disabled")}>
          {showTabs && (
            <div className="rds-comp-color-picker__tabs" role="tablist">
              <button
                type="button"
                role="tab"
                disabled={isDisabled}
                aria-selected={selectedTab === "Grid"}
                className={clsx("rds-comp-color-picker__tab", selectedTab === "Grid" && "rds-comp-color-picker__tab--active")}
                onClick={() => handleTabClick("Grid")}
              >
                Grid
              </button>
              <button
                type="button"
                role="tab"
                disabled={isDisabled}
                aria-selected={selectedTab === "Spectrum"}
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
              disabled={isDisabled}
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
              swatches={swatches}
              onAddSwatch={onAddSwatch}
              disabled={isDisabled}
            />
          )}
        </div>
      )}
    </Box>
  );
};
RdsColorPicker.displayName = "RdsCompColorPicker";
export default RdsColorPicker;
