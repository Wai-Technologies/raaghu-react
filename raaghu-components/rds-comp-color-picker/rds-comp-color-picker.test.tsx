import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';
import RdsCompColorPicker from './rds-comp-color-picker';
import { ColorPickerType, PickerType, ColorMode } from './rds-comp-color-picker.types';

jest.mock('./rds-comp-color-picker.scss', () => ({}));
jest.mock('../../raaghu-elements/shared/utils/deprecation', () => {
  const warnDeprecatedProp = jest.fn();
  return {
    warnDeprecatedProp,
    resolveDeprecatedProp: (
      canonical: unknown,
      legacy: unknown,
      component: string,
      legacyName: string,
      replacement: string,
    ) => {
      if (legacy !== undefined) warnDeprecatedProp(component, legacyName, replacement);
      return canonical !== undefined ? canonical : legacy;
    },
  };
});
jest.mock('../../raaghu-elements/rds-button/rds-button', () => {
  return function MockRdsButton({ children, onClick, disabled, style, color, ...props }: any) {
    return (
      <button data-testid="rds-button" onClick={onClick} disabled={disabled} {...props}>
        {children}
      </button>
    );
  };
});

jest.mock('./color-picker-components', () => ({
  ColorPickerGrid: jest.fn(function MockColorPickerGrid({ handleChange, selectedColorState, selectedColorMode }: any) {
    return (
      <div data-testid="color-picker-grid">
        <div data-testid="grid-color-state">{JSON.stringify(selectedColorState)}</div>
        <div data-testid="grid-color-mode">{selectedColorMode}</div>
        <button
          data-testid="grid-change-color"
          onClick={() => handleChange({ hex: '#FF0000', rgb: { r: 255, g: 0, b: 0, a: 1 } })}
        >
          Change to Red
        </button>
      </div>
    );
  }),
  ColorPickerSpectrum: function MockColorPickerSpectrum({ handleChange, selectedColorState, selectedColorMode }: any) {
    return (
      <div data-testid="color-picker-spectrum">
        <div data-testid="spectrum-color-state">{JSON.stringify(selectedColorState)}</div>
        <div data-testid="spectrum-color-mode">{selectedColorMode}</div>
        <button
          data-testid="spectrum-change-color"
          onClick={() => handleChange({ hex: '#00FF00', rgb: { r: 0, g: 255, b: 0, a: 1 } })}
        >
          Change to Green
        </button>
      </div>
    );
  },
  ColorModeSwatches: function MockColorModeSwatches() {
    return <div data-testid="color-mode-swatches" />;
  },
  GradientEditor: function MockGradientEditor() {
    return <div data-testid="gradient-editor" />;
  },
}));

jest.mock('./color-utils', () => {
  const actual = jest.requireActual('./color-utils');
  return {
    ...actual,
    getColorDisplay: jest.fn((colorMode: string, colorState: { hex: string; rgb: { r: number; g: number; b: number } }) => {
      if (colorMode === 'HEX') return colorState.hex;
      if (colorMode === 'RGB') return `rgb(${colorState.rgb.r}, ${colorState.rgb.g}, ${colorState.rgb.b})`;
      return colorState.hex;
    }),
  };
});

Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn(() => Promise.resolve()),
  },
});

const defaultProps = {
  value: '#9751F2',
  label: 'Pick Color',
  type: ColorPickerType.Default,
};

const setup = (p: Record<string, any> = {}) => render(<RdsCompColorPicker {...defaultProps} {...p} />);
const tabsOf = (container: HTMLElement) => container.querySelectorAll('.rds-comp-color-picker__tab');
const grid = () => screen.queryByTestId('color-picker-grid');

describe('RdsCompColorPicker', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    it('renders the component without crashing', () => {
      const { container } = setup();
      expect(container).toBeInTheDocument();
      expect(screen.getByTestId('color-picker-grid')).toBeInTheDocument();
      expect(container.querySelector('.rds-comp-color-picker')).toBeInTheDocument();
      expect(container.querySelector('.rds-comp-color-picker__container')).toBeInTheDocument();
    });

    it('has correct display name', () => {
      expect(RdsCompColorPicker.displayName).toBe('RdsCompColorPicker');
    });
  });

  describe('Color Picker Type Variants', () => {
    it('renders Default type with visible picker', () => {
      setup({ type: ColorPickerType.Default });
      expect(grid()).toBeInTheDocument();
    });

    it('renders Button type with hidden picker initially', () => {
      setup({ type: ColorPickerType.Button });
      expect(screen.getByTestId('rds-button')).toBeInTheDocument();
      expect(grid()).not.toBeInTheDocument();
    });

    it('renders ButtonExpanded type with visible button and picker', () => {
      setup({ type: ColorPickerType.ButtonExpanded });
      expect(screen.getByTestId('rds-button')).toBeInTheDocument();
      expect(grid()).toBeInTheDocument();
    });

    it('displays button text with label', () => {
      setup({ type: ColorPickerType.Button, label: 'Select Color' });
      expect(screen.getByTestId('rds-button')).toHaveTextContent('Select Color');
    });
  });

  describe('Button Interactions', () => {
    it('toggles picker visibility when button clicked', () => {
      setup({ type: ColorPickerType.Button });
      const button = screen.getByTestId('rds-button');
      expect(grid()).not.toBeInTheDocument();
      fireEvent.click(button);
      expect(grid()).toBeInTheDocument();
      fireEvent.click(button);
      expect(grid()).not.toBeInTheDocument();
    });

    it('button is disabled and click does not toggle when disabled is true', () => {
      setup({ type: ColorPickerType.Button, disabled: true });
      const button = screen.getByTestId('rds-button');
      expect(button).toBeDisabled();
      fireEvent.click(button);
      expect(grid()).not.toBeInTheDocument();
    });
  });

  describe('Tab Selection', () => {
    it('renders tabs when showTabs is true', () => {
      const { container } = setup({ showTabs: true });
      expect(tabsOf(container).length).toBe(2);
    });

    it('does not render tabs when showTabs is false', () => {
      const { container } = setup({ showTabs: false });
      expect(tabsOf(container).length).toBe(0);
    });

    it('Grid tab is active by default', () => {
      const { container } = setup({ showTabs: true });
      expect(tabsOf(container)[0]).toHaveClass('rds-comp-color-picker__tab--active');
    });

    it('switches to Spectrum tab when clicked', () => {
      const { container } = setup({ showTabs: true });
      const spectrumTab = tabsOf(container)[1];
      fireEvent.click(spectrumTab);
      expect(screen.getByTestId('color-picker-spectrum')).toBeInTheDocument();
      expect(grid()).not.toBeInTheDocument();
      expect(spectrumTab).toHaveClass('rds-comp-color-picker__tab--active');
    });

    it('switches back to Grid tab when clicked', () => {
      const { container } = setup({ showTabs: true });
      const [gridTab, spectrumTab] = tabsOf(container);
      fireEvent.click(spectrumTab);
      expect(screen.getByTestId('color-picker-spectrum')).toBeInTheDocument();
      fireEvent.click(gridTab);
      expect(grid()).toBeInTheDocument();
    });

    it('respects pickerType prop for initial tab', () => {
      setup({ showTabs: true, pickerType: PickerType.Spectrum });
      expect(screen.getByTestId('color-picker-spectrum')).toBeInTheDocument();
    });
  });

  describe('Color Mode Selection', () => {
    it('defaults to HEX color mode', () => {
      setup();
      expect(screen.getByTestId('grid-color-mode')).toHaveTextContent('HEX');
    });

    it.each([ColorMode.HEX, ColorMode.RGB, ColorMode.HSB, ColorMode.HSL])('accepts colorMode prop for %s', (mode) => {
      setup({ colorMode: mode });
      expect(screen.getByTestId('grid-color-mode')).toHaveTextContent(String(mode));
    });
  });

  describe('Color Changes', () => {
    it('calls onChange callback when color changes', async () => {
      const onChange = jest.fn();
      setup({ onChange });
      fireEvent.click(screen.getByTestId('grid-change-color'));
      await waitFor(() => {
        expect(onChange).toHaveBeenCalledWith('#FF0000');
      });
    });

    it('updates color state when color changes', async () => {
      setup();
      expect(screen.getByTestId('grid-color-state').textContent).toContain('#9751F2');
      fireEvent.click(screen.getByTestId('grid-change-color'));
      await waitFor(() => {
        expect(screen.getByTestId('grid-color-state').textContent).toContain('#FF0000');
      });
    });

    it('does not change color when disabled', () => {
      const onChange = jest.fn();
      setup({ disabled: true, onChange });
      fireEvent.click(screen.getByTestId('grid-change-color'));
      expect(onChange).not.toHaveBeenCalled();
    });

    it('switches to Spectrum and changes color', async () => {
      const onChange = jest.fn();
      const { container } = setup({ showTabs: true, onChange });
      fireEvent.click(tabsOf(container)[1]);
      fireEvent.click(screen.getByTestId('spectrum-change-color'));
      await waitFor(() => {
        expect(onChange).toHaveBeenCalledWith('#00FF00');
      });
    });
  });

  describe('Props Updates', () => {
    it('updates color when value prop changes', () => {
      const { rerender } = setup({ value: '#9751F2' });
      expect(screen.getByTestId('grid-color-state').textContent).toContain('#9751F2');
      rerender(<RdsCompColorPicker {...defaultProps} value="#FF0000" />);
      expect(screen.getByTestId('grid-color-state').textContent).toContain('#FF0000');
    });

    it('updates tab when pickerType prop changes', () => {
      const { rerender } = setup({ showTabs: true, pickerType: PickerType.Grid });
      expect(grid()).toBeInTheDocument();
      rerender(<RdsCompColorPicker {...defaultProps} showTabs={true} pickerType={PickerType.Spectrum} />);
      expect(screen.getByTestId('color-picker-spectrum')).toBeInTheDocument();
    });

    it('updates picker visibility when type prop changes', () => {
      const { rerender } = setup({ type: ColorPickerType.Button });
      expect(grid()).not.toBeInTheDocument();
      rerender(<RdsCompColorPicker {...defaultProps} type={ColorPickerType.Default} />);
      expect(grid()).toBeInTheDocument();
    });

    it('updates color mode when colorMode prop changes', () => {
      const { rerender } = setup({ colorMode: ColorMode.HEX });
      expect(screen.getByTestId('grid-color-mode').textContent).toContain('HEX');
      rerender(<RdsCompColorPicker {...defaultProps} colorMode={ColorMode.RGB} />);
      expect(screen.getByTestId('grid-color-mode').textContent).toContain('RGB');
    });

    it('updates swatchesVariant when prop changes', () => {
      const { container, rerender } = setup({ swatchesVariant: 'list' });
      rerender(<RdsCompColorPicker {...defaultProps} swatchesVariant="grid" />);
      expect(container.querySelector('.rds-comp-color-picker')).toBeInTheDocument();
    });

    it('applies CSS style to the root element', () => {
      setup({ style: { marginTop: 8 } });
      expect(document.querySelector('.rds-comp-color-picker')).toHaveStyle({ marginTop: '8px' });
    });
  });

  describe('Disabled State', () => {
    it('component has aria-disabled attribute when disabled', () => {
      const { container } = setup({ disabled: true });
      expect(container.querySelector('.rds-comp-color-picker')).toHaveAttribute('aria-disabled', 'true');
      expect(container.querySelector('[aria-disabled="true"]')).toBeInTheDocument();
    });

    it('component does not have aria-disabled when not disabled', () => {
      const { container } = setup({ disabled: false });
      expect(container.querySelector('.rds-comp-color-picker')).not.toHaveAttribute('aria-disabled');
    });

    it.each([ColorPickerType.Default, ColorPickerType.ButtonExpanded])(
      'disables the open %s panel: tabs, container and child panel',
      (type) => {
        const { container } = setup({ type, disabled: true, showTabs: true });
        expect(container.querySelector('.rds-comp-color-picker__container--disabled')).toBeInTheDocument();
        screen.getAllByRole('tab').forEach((tab) => expect(tab).toBeDisabled());
        const gridMock = jest.requireMock('./color-picker-components').ColorPickerGrid as jest.Mock;
        expect(gridMock.mock.calls.at(-1)?.[0]).toEqual(expect.objectContaining({ disabled: true }));
      },
    );

    it('does not switch tabs when disabled', () => {
      setup({ disabled: true, showTabs: true });
      fireEvent.click(screen.getByRole('tab', { name: 'Spectrum' }));
      expect(screen.getByTestId('color-picker-grid')).toBeInTheDocument();
    });
  });

  describe('Disabled panel controls', () => {
    const actual = jest.requireActual('./color-picker-components');
    const panelProps = {
      handleChange: jest.fn(),
      handleHueChange: jest.fn(),
      handleAlphaChange: jest.fn(),
      selectedColorState: { hex: '#FF0000', rgb: { r: 255, g: 0, b: 0, a: 1 } },
      colorModeDropdownRef: { current: null },
      selectedColorMode: ColorMode.HEX,
      showColorModeDropdown: false,
      setShowColorModeDropdown: jest.fn(),
      getColorDisplay: () => '#FF0000',
      disabled: true,
    };

    it('disables every grid cell, both sliders and the format dropdown', () => {
      const { container } = render(<actual.ColorPickerGrid {...panelProps} />);
      const cells = container.querySelectorAll('.rds-comp-color-picker__color-cell');
      expect(cells.length).toBeGreaterThan(0);
      cells.forEach((cell) => expect(cell).toBeDisabled());
      screen.getAllByRole('slider').forEach((slider) => expect(slider).toBeDisabled());
      expect(screen.getByRole('button', { name: 'Change color mode' })).toBeDisabled();
    });

    it('disables the spectrum area, sliders, dropdown and swatches', () => {
      render(
        <actual.ColorPickerSpectrum {...panelProps} selectedColorHex="#FF0000" showSwatches styleType="Type 2" />,
      );
      expect(screen.getByRole('button', { name: 'Pick color from spectrum' })).toBeDisabled();
      screen.getAllByRole('slider').forEach((slider) => expect(slider).toBeDisabled());
      expect(screen.getByRole('button', { name: 'Change color mode' })).toBeDisabled();
      screen.getAllByRole('button', { name: /^Select color/ }).forEach((swatch) => expect(swatch).toBeDisabled());
      expect(screen.getByRole('button', { name: 'Add swatch' })).toHaveAttribute('aria-disabled', 'true');
    });
  });

  describe('Swatches', () => {
    it('shows swatches when showSwatches is true', () => {
      const { rerender } = setup({ showSwatches: false });
      rerender(
        <RdsCompColorPicker {...defaultProps} showSwatches={true} showTabs={true} pickerType={PickerType.Spectrum} />
      );
      expect(screen.getByTestId('color-picker-spectrum')).toBeInTheDocument();
    });
  });

  describe('Initial State', () => {
    it('initializes with correct default color hex and rgb values', () => {
      setup();
      const state = JSON.parse(screen.getByTestId('grid-color-state').textContent || '{}');
      expect(state.hex).toContain('#9751F2');
      expect(state.rgb).toBeDefined();
      expect(state.rgb.r).toBe(151);
      expect(state.rgb.g).toBe(81);
      expect(state.rgb.b).toBe(242);
    });

    it('initializes with default purple color when no value provided', () => {
      setup({ value: '' });
      expect(screen.getByTestId('grid-color-state').textContent).toContain('#');
    });
  });

  describe('Picker Type Combination', () => {
    it('renders both Grid and Spectrum pickers when tabs are shown', () => {
      const { container } = setup({ showTabs: true });
      expect(grid()).toBeInTheDocument();
      fireEvent.click(tabsOf(container)[1]);
      expect(screen.getByTestId('color-picker-spectrum')).toBeInTheDocument();
    });
  });

  describe('Button Type with Different Props', () => {
    it('ButtonExpanded type always shows picker initially', () => {
      setup({ type: ColorPickerType.ButtonExpanded });
      const button = screen.getByTestId('rds-button');
      expect(grid()).toBeInTheDocument();
      fireEvent.click(button);
      expect(grid()).not.toBeInTheDocument();
      fireEvent.click(button);
      expect(grid()).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty value gracefully', () => {
      setup({ value: '' });
      expect(grid()).toBeInTheDocument();
    });

    it('handles undefined onChange callback', () => {
      setup({ onChange: undefined });
      expect(() => fireEvent.click(screen.getByTestId('grid-change-color'))).not.toThrow();
    });

    it('handles rapid tab switches', () => {
      const { container } = setup({ showTabs: true });
      const tabs = tabsOf(container);
      fireEvent.click(tabs[1]);
      fireEvent.click(tabs[0]);
      fireEvent.click(tabs[1]);
      expect(screen.getByTestId('color-picker-spectrum')).toBeInTheDocument();
    });

    it('handles rapid button clicks', () => {
      setup({ type: ColorPickerType.Button });
      const button = screen.getByTestId('rds-button');
      fireEvent.click(button);
      fireEvent.click(button);
      fireEvent.click(button);
      expect(grid()).toBeInTheDocument();
    });

    it('handles color change while disabled then enabled', () => {
      const onChange = jest.fn();
      const { rerender } = setup({ disabled: true, onChange });
      const changeButton = screen.getByTestId('grid-change-color');
      fireEvent.click(changeButton);
      expect(onChange).not.toHaveBeenCalled();
      rerender(<RdsCompColorPicker {...defaultProps} disabled={false} onChange={onChange} />);
      fireEvent.click(changeButton);
      expect(onChange).toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('has no axe accessibility violations', async () => {
      const { container } = setup();
      expect(await axe(container)).toHaveNoViolations();
    });
  });

  describe('Default Props Behavior', () => {
    it('uses Grid picker type by default', () => {
      setup({ showTabs: true });
      expect(grid()).toBeInTheDocument();
    });
  });

  describe('audit fixes', () => {
    const actual = jest.requireActual('./color-picker-components');
    const { warnDeprecatedProp } = jest.requireMock('../../raaghu-elements/shared/utils/deprecation');
    const colorState = { hex: '#0000FF', rgb: { r: 0, g: 0, b: 255, a: 0.5 } };
    const infoProps = {
      colorModeDropdownRef: { current: null },
      selectedColorMode: ColorMode.HEX,
      selectedColorState: colorState,
      getColorDisplay: () => colorState.hex,
    };

    it('G4-003: hue and opacity use MUI sliders (no react-color)', () => {
      const handleHueChange = jest.fn();
      const handleAlphaChange = jest.fn();
      render(
        <actual.ColorPickerSliders
          selectedColorState={colorState}
          handleHueChange={handleHueChange}
          handleAlphaChange={handleAlphaChange}
        />
      );
      const hue = screen.getByRole('slider', { name: 'Hue' });
      const opacity = screen.getByRole('slider', { name: 'Opacity' });
      expect(hue).toBeInTheDocument();
      expect(opacity).toBeInTheDocument();
      fireEvent.change(hue, { target: { value: '120' } });
      expect(handleHueChange).toHaveBeenCalled();
      fireEvent.change(opacity, { target: { value: '25' } });
      expect(handleAlphaChange).toHaveBeenCalledWith(
        expect.objectContaining({ rgb: expect.objectContaining({ a: 0.25 }) }),
      );
    });

    it('G4-002: spectrum click uses the current hue, not the red channel', () => {
      const handleChange = jest.fn();
      render(
        <actual.ColorPickerSpectrum
          {...infoProps}
          selectedColorHex={colorState.hex}
          handleChange={handleChange}
          handleHueChange={jest.fn()}
          handleAlphaChange={jest.fn()}
          showColorModeDropdown={false}
          setShowColorModeDropdown={jest.fn()}
        />
      );
      const area = screen.getByLabelText('Pick color from spectrum');
      area.getBoundingClientRect = () => ({ left: 0, top: 0, width: 100, height: 100 } as DOMRect);
      fireEvent.click(area, { clientX: 100, clientY: 0 });
      expect(handleChange).toHaveBeenCalledWith(expect.objectContaining({ hex: '#0000FF' }));
    });

    it('G4-004: alpha change calls onChange with rgba and hex8', () => {
      const onChange = jest.fn();
      setup({ onChange });
      const Grid = jest.requireMock('./color-picker-components').ColorPickerGrid as jest.Mock;
      const { handleAlphaChange } = Grid.mock.calls[Grid.mock.calls.length - 1][0];
      act(() => handleAlphaChange({ hex: '#9751F2', rgb: { r: 151, g: 81, b: 242, a: 0.5 } }));
      expect(onChange).toHaveBeenCalledWith('#9751F2', {
        rgba: { r: 151, g: 81, b: 242, a: 0.5 },
        hex8: '#9751F280',
      });
    });

    it('G4-005: opacity input reflects alpha', () => {
      render(<actual.ColorPickerInfo {...infoProps} showColorModeDropdown={false} setShowColorModeDropdown={jest.fn()} />);
      expect(screen.getByLabelText('Opacity percentage')).toHaveValue('50%');
    });

    it('G4-006: radial gradient button gets the correct active class', () => {
      render(
        <actual.GradientEditor
          gradientType="radial"
          gradientDirection={0}
          gradientStops={[{ offset: 0, color: '#000' }, { offset: 1, color: '#fff' }]}
          onGradientTypeChange={jest.fn()}
          onGradientDirectionChange={jest.fn()}
          onGradientStopChange={jest.fn()}
          onGradientPositionChange={jest.fn()}
          onAddGradientStop={jest.fn()}
          onRemoveGradientStop={jest.fn()}
        />
      );
      expect(screen.getByText('Radial')).toHaveClass('rds-comp-color-picker__gradient-btn--active');
    });

    it('G4-008: add-swatch icon button is labelled and calls onAddSwatch', () => {
      const onAddSwatch = jest.fn();
      render(<actual.ColorSwatchesType1 handleChange={jest.fn()} onAddSwatch={onAddSwatch} />);
      fireEvent.click(screen.getByRole('button', { name: 'Add swatch' }));
      expect(onAddSwatch).toHaveBeenCalledTimes(1);
    });

    it('G4-009: "+" tile is keyboard operable', () => {
      const onAddSwatch = jest.fn();
      render(<actual.ColorSwatchesType2 handleChange={jest.fn()} onAddSwatch={onAddSwatch} />);
      const tile = screen.getByRole('button', { name: 'Add swatch' });
      expect(tile).toHaveAttribute('tabindex', '0');
      fireEvent.keyDown(tile, { key: 'Enter' });
      fireEvent.keyDown(tile, { key: ' ' });
      expect(onAddSwatch).toHaveBeenCalledTimes(2);
    });

    it('G4-011: disabled wins over isDisabled; isDisabled warns; type defaults to Default', () => {
      const { container } = render(<RdsCompColorPicker value="#9751F2" label="Pick Color" disabled isDisabled={false} />);
      expect(container.querySelector('.rds-comp-color-picker')).toHaveAttribute('aria-disabled', 'true');
      expect(container.querySelector('.rds-comp-color-picker__container')).toBeInTheDocument();
      expect(warnDeprecatedProp).toHaveBeenCalledWith('RdsCompColorPicker', 'isDisabled', '`disabled`');
    });

    it('G4-012/G4-013: root forwards className, ref, rest and is a labelled group', () => {
      const ref = React.createRef<HTMLDivElement>();
      setup({ ref, className: 'custom', 'data-testid': 'cp-root' });
      const root = screen.getByTestId('cp-root');
      expect(root).toHaveClass('rds-comp-color-picker', 'custom');
      expect(ref.current).toBe(root);
      expect(screen.getByRole('group', { name: 'Pick Color' })).toBe(root);
    });

    it('G4-018: tabs expose tablist/tab semantics', () => {
      setup({ showTabs: true });
      expect(screen.getByRole('tablist')).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: 'Grid' })).toHaveAttribute('aria-selected', 'true');
      fireEvent.click(screen.getByRole('tab', { name: 'Spectrum' }));
      expect(screen.getByRole('tab', { name: 'Spectrum' })).toHaveAttribute('aria-selected', 'true');
    });

    it('G4-019: colour-mode trigger has popup state and Escape closes', () => {
      const setShow = jest.fn();
      render(<actual.ColorPickerInfo {...infoProps} showColorModeDropdown setShowColorModeDropdown={setShow} />);
      const trigger = screen.getByRole('button', { name: 'Change color mode' });
      expect(trigger).toHaveAttribute('aria-haspopup', 'listbox');
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
      fireEvent.keyDown(screen.getByRole('option', { name: 'RGB' }), { key: 'Escape' });
      expect(setShow).toHaveBeenCalledWith(false);
    });

    it('G4-022: custom swatches replace the default list', () => {
      const handleChange = jest.fn();
      render(<actual.ColorSwatchesType1 handleChange={handleChange} swatches={['#123456']} />);
      expect(screen.getAllByRole('button', { name: /^Select color/ })).toHaveLength(1);
      fireEvent.click(screen.getByRole('button', { name: 'Select color #123456' }));
      expect(handleChange).toHaveBeenCalledWith({ hex: '#123456' });
    });
  });
});

describe('audit fixes', () => {
  it('format, view and variant map to the legacy enum values', () => {
    render(<RdsCompColorPicker label="c" value="#123456" format="rgb" view="spectrum" variant="inline" />);
    expect(screen.getByTestId('spectrum-color-mode')).toHaveTextContent('RGB');
  });

  it('defaultFormat and defaultView set the initial state and defaultValue the colour', () => {
    render(<RdsCompColorPicker label="c" defaultValue="#123456" defaultFormat="hsl" defaultView="spectrum" />);
    expect(screen.getByTestId('spectrum-color-mode')).toHaveTextContent('HSL');
    expect(screen.getByTestId('spectrum-color-state')).toHaveTextContent('#123456');
  });

  it('variant button hides the picker until clicked', () => {
    render(<RdsCompColorPicker label="c" value="#123456" variant="button" />);
    expect(screen.queryByTestId('color-picker-grid')).not.toBeInTheDocument();
  });

  it('warns for colorMode and pickerType but not the Figma type prop', () => {
    const { warnDeprecatedProp } = jest.requireMock('../../raaghu-elements/shared/utils/deprecation');
    render(
      <RdsCompColorPicker
        label="c"
        value="#123456"
        type={ColorPickerType.Default}
        colorMode={ColorMode.RGB}
        pickerType={PickerType.Grid}
      />
    );
    expect(warnDeprecatedProp).not.toHaveBeenCalledWith('RdsCompColorPicker', 'type', expect.anything());
    expect(warnDeprecatedProp).toHaveBeenCalledWith('RdsCompColorPicker', 'colorMode', '`format`');
    expect(warnDeprecatedProp).toHaveBeenCalledWith('RdsCompColorPicker', 'pickerType', '`view`');
  });

  it('syncs non-hex controlled values (G4-014)', () => {
    const { rerender } = render(<RdsCompColorPicker label="c" value="#123456" />);
    expect(screen.getByTestId('grid-color-state').textContent).toContain('#123456');
    rerender(<RdsCompColorPicker label="c" value="rgb(255, 0, 0)" />);
    expect(screen.getByTestId('grid-color-state').textContent).toContain('#FF0000');
  });
});

describe('RdsCompColorPicker id', () => {
  it('forwards id to the root and adds none when omitted', () => {
    const a = setup({ id: 'cp' });
    expect(a.container.firstChild).toHaveAttribute('id', 'cp');
    const b = setup();
    expect(b.container.firstChild).not.toHaveAttribute('id');
  });
});
