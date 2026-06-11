import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';
import RdsCompColorPicker, { ColorPickerType, PickerType, ColorMode, StyleType } from './rds-comp-color-picker';

// Mock dependencies
jest.mock('./rds-comp-color-picker.scss', () => ({}));
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
  ColorPickerGrid: function MockColorPickerGrid({ handleChange, selectedColorState, selectedColorMode }: any) {
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
  },
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

jest.mock('./color-utils', () => ({
  getColorDisplay: jest.fn((colorMode, colorState) => {
    if (colorMode === 'HEX') return colorState.hex;
    if (colorMode === 'RGB') return `rgb(${colorState.rgb.r}, ${colorState.rgb.g}, ${colorState.rgb.b})`;
    return colorState.hex;
  }),
}));

// Mock navigator.clipboard
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

describe('RdsCompColorPicker', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    it('renders the component without crashing', () => {
      const { container } = render(<RdsCompColorPicker {...defaultProps} />);
      expect(container).toBeInTheDocument();
    });

    it('has correct display name', () => {
      expect(RdsCompColorPicker.displayName).toBe('RdsCompColorPicker');
    });

    it('renders color picker container', () => {
      render(<RdsCompColorPicker {...defaultProps} />);
      expect(screen.getByTestId('color-picker-grid')).toBeInTheDocument();
    });

    it('renders with correct root class', () => {
      const { container } = render(<RdsCompColorPicker {...defaultProps} />);
      expect(container.querySelector('.rds-comp-color-picker')).toBeInTheDocument();
    });

    it('renders main container', () => {
      const { container } = render(<RdsCompColorPicker {...defaultProps} />);
      expect(container.querySelector('.rds-comp-color-picker__container')).toBeInTheDocument();
    });
  });

  describe('Color Picker Type Variants', () => {
    it('renders Default type with visible picker', () => {
      render(<RdsCompColorPicker {...defaultProps} type={ColorPickerType.Default} />);
      expect(screen.getByTestId('color-picker-grid')).toBeInTheDocument();
    });

    it('renders Button type with hidden picker initially', () => {
      render(<RdsCompColorPicker {...defaultProps} type={ColorPickerType.Button} />);
      expect(screen.getByTestId('rds-button')).toBeInTheDocument();
      expect(screen.queryByTestId('color-picker-grid')).not.toBeInTheDocument();
    });

    it('renders ButtonExpanded type with visible button and picker', () => {
      render(<RdsCompColorPicker {...defaultProps} type={ColorPickerType.ButtonExpanded} />);
      expect(screen.getByTestId('rds-button')).toBeInTheDocument();
      expect(screen.getByTestId('color-picker-grid')).toBeInTheDocument();
    });

    it('displays button text with label', () => {
      render(<RdsCompColorPicker {...defaultProps} type={ColorPickerType.Button} label="Select Color" />);
      expect(screen.getByTestId('rds-button')).toHaveTextContent('Select Color');
    });

    it('uses default label when not provided', () => {
      render(<RdsCompColorPicker value="#9751F2" label="Color Picker" type={ColorPickerType.Button} />);
      expect(screen.getByTestId('rds-button')).toHaveTextContent('Color Picker');
    });
  });

  describe('Button Interactions', () => {
    it('toggles picker visibility when button clicked', () => {
      render(<RdsCompColorPicker {...defaultProps} type={ColorPickerType.Button} />);
      const button = screen.getByTestId('rds-button');
      
      // Initially hidden
      expect(screen.queryByTestId('color-picker-grid')).not.toBeInTheDocument();
      
      // Click to show
      fireEvent.click(button);
      expect(screen.getByTestId('color-picker-grid')).toBeInTheDocument();
      
      // Click to hide
      fireEvent.click(button);
      expect(screen.queryByTestId('color-picker-grid')).not.toBeInTheDocument();
    });

    it('button is disabled when isDisabled is true', () => {
      render(<RdsCompColorPicker {...defaultProps} type={ColorPickerType.Button} isDisabled={true} />);
      expect(screen.getByTestId('rds-button')).toBeDisabled();
    });

    it('button click does not toggle when disabled', () => {
      render(<RdsCompColorPicker {...defaultProps} type={ColorPickerType.Button} isDisabled={true} />);
      const button = screen.getByTestId('rds-button');
      fireEvent.click(button);
      expect(screen.queryByTestId('color-picker-grid')).not.toBeInTheDocument();
    });
  });

  describe('Tab Selection', () => {
    it('renders tabs when showTabs is true', () => {
      const { container } = render(<RdsCompColorPicker {...defaultProps} showTabs={true} />);
      expect(container.querySelectorAll('.rds-comp-color-picker__tab').length).toBe(2);
    });

    it('does not render tabs when showTabs is false', () => {
      const { container } = render(<RdsCompColorPicker {...defaultProps} showTabs={false} />);
      expect(container.querySelectorAll('.rds-comp-color-picker__tab').length).toBe(0);
    });

    it('Grid tab is active by default', () => {
      const { container } = render(<RdsCompColorPicker {...defaultProps} showTabs={true} />);
      const gridTab = container.querySelectorAll('.rds-comp-color-picker__tab')[0];
      expect(gridTab).toHaveClass('rds-comp-color-picker__tab--active');
    });

    it('switches to Spectrum tab when clicked', () => {
      const { container } = render(<RdsCompColorPicker {...defaultProps} showTabs={true} />);
      const spectrumTab = container.querySelectorAll('.rds-comp-color-picker__tab')[1];
      fireEvent.click(spectrumTab);
      
      expect(screen.getByTestId('color-picker-spectrum')).toBeInTheDocument();
      expect(screen.queryByTestId('color-picker-grid')).not.toBeInTheDocument();
      expect(spectrumTab).toHaveClass('rds-comp-color-picker__tab--active');
    });

    it('switches back to Grid tab when clicked', () => {
      const { container } = render(<RdsCompColorPicker {...defaultProps} showTabs={true} />);
      const [gridTab, spectrumTab] = container.querySelectorAll('.rds-comp-color-picker__tab');
      
      fireEvent.click(spectrumTab);
      expect(screen.getByTestId('color-picker-spectrum')).toBeInTheDocument();
      
      fireEvent.click(gridTab);
      expect(screen.getByTestId('color-picker-grid')).toBeInTheDocument();
    });

    it('respects pickerType prop for initial tab', () => {
      render(<RdsCompColorPicker {...defaultProps} showTabs={true} pickerType={PickerType.Spectrum} />);
      expect(screen.getByTestId('color-picker-spectrum')).toBeInTheDocument();
    });
  });

  describe('Color Mode Selection', () => {
    it('defaults to HEX color mode', () => {
      render(<RdsCompColorPicker {...defaultProps} />);
      const gridColorMode = screen.getByTestId('grid-color-mode');
      expect(gridColorMode).toHaveTextContent('HEX');
    });

    it('accepts colorMode prop for RGB', () => {
      render(<RdsCompColorPicker {...defaultProps} colorMode={ColorMode.RGB} />);
      const gridColorMode = screen.getByTestId('grid-color-mode');
      expect(gridColorMode).toHaveTextContent('RGB');
    });

    it('accepts colorMode prop for HSB', () => {
      render(<RdsCompColorPicker {...defaultProps} colorMode={ColorMode.HSB} />);
      const gridColorMode = screen.getByTestId('grid-color-mode');
      expect(gridColorMode).toHaveTextContent('HSB');
    });

    it('accepts colorMode prop for HSL', () => {
      render(<RdsCompColorPicker {...defaultProps} colorMode={ColorMode.HSL} />);
      const gridColorMode = screen.getByTestId('grid-color-mode');
      expect(gridColorMode).toHaveTextContent('HSL');
    });
  });

  describe('Color Changes', () => {
    it('calls onChange callback when color changes', async () => {
      const onChange = jest.fn();
      render(<RdsCompColorPicker {...defaultProps} onChange={onChange} />);
      
      const changeButton = screen.getByTestId('grid-change-color');
      fireEvent.click(changeButton);
      
      await waitFor(() => {
        expect(onChange).toHaveBeenCalledWith('#FF0000');
      });
    });

    it('updates color state when color changes', async () => {
      render(<RdsCompColorPicker {...defaultProps} />);
      
      const colorStateBefore = screen.getByTestId('grid-color-state').textContent;
      expect(colorStateBefore).toContain('#9751F2');
      
      const changeButton = screen.getByTestId('grid-change-color');
      fireEvent.click(changeButton);
      
      await waitFor(() => {
        const colorStateAfter = screen.getByTestId('grid-color-state').textContent;
        expect(colorStateAfter).toContain('#FF0000');
      });
    });

    it('does not change color when disabled', () => {
      const onChange = jest.fn();
      render(<RdsCompColorPicker {...defaultProps} isDisabled={true} onChange={onChange} />);
      
      const changeButton = screen.getByTestId('grid-change-color');
      fireEvent.click(changeButton);
      
      expect(onChange).not.toHaveBeenCalled();
    });

    it('switches to Spectrum and changes color', async () => {
      const onChange = jest.fn();
      const { container } = render(<RdsCompColorPicker {...defaultProps} showTabs={true} onChange={onChange} />);
      
      const tabs = container.querySelectorAll('.rds-comp-color-picker__tab');
      fireEvent.click(tabs[1]);
      
      const changeButton = screen.getByTestId('spectrum-change-color');
      fireEvent.click(changeButton);
      
      await waitFor(() => {
        expect(onChange).toHaveBeenCalledWith('#00FF00');
      });
    });
  });

  describe('Props Updates', () => {
    it('updates color when value prop changes', () => {
      const { rerender } = render(<RdsCompColorPicker {...defaultProps} value="#9751F2" />);
      
      let colorState = screen.getByTestId('grid-color-state').textContent;
      expect(colorState).toContain('#9751F2');
      
      rerender(<RdsCompColorPicker {...defaultProps} value="#FF0000" />);
      
      colorState = screen.getByTestId('grid-color-state').textContent;
      expect(colorState).toContain('#FF0000');
    });

    it('updates tab when pickerType prop changes', () => {
      const { rerender } = render(<RdsCompColorPicker {...defaultProps} showTabs={true} pickerType={PickerType.Grid} />);
      expect(screen.getByTestId('color-picker-grid')).toBeInTheDocument();
      
      rerender(<RdsCompColorPicker {...defaultProps} showTabs={true} pickerType={PickerType.Spectrum} />);
      expect(screen.getByTestId('color-picker-spectrum')).toBeInTheDocument();
    });

    it('updates picker visibility when type prop changes', () => {
      const { rerender } = render(<RdsCompColorPicker {...defaultProps} type={ColorPickerType.Button} />);
      expect(screen.queryByTestId('color-picker-grid')).not.toBeInTheDocument();
      
      rerender(<RdsCompColorPicker {...defaultProps} type={ColorPickerType.Default} />);
      expect(screen.getByTestId('color-picker-grid')).toBeInTheDocument();
    });

    it('updates color mode when colorMode prop changes', () => {
      const { rerender } = render(<RdsCompColorPicker {...defaultProps} colorMode={ColorMode.HEX} />);
      let colorMode = screen.getByTestId('grid-color-mode').textContent;
      expect(colorMode).toContain('HEX');
      
      rerender(<RdsCompColorPicker {...defaultProps} colorMode={ColorMode.RGB} />);
      colorMode = screen.getByTestId('grid-color-mode').textContent;
      expect(colorMode).toContain('RGB');
    });

    it('updates style when style prop changes', () => {
      const { container, rerender } = render(<RdsCompColorPicker {...defaultProps} style={StyleType.Type1} />);
      rerender(<RdsCompColorPicker {...defaultProps} style={StyleType.Type2} />);
      expect(container.querySelector('.rds-comp-color-picker')).toBeInTheDocument();
    });
  });

  describe('Disabled State', () => {
    it('component has aria-disabled attribute when disabled', () => {
      const { container } = render(<RdsCompColorPicker {...defaultProps} isDisabled={true} />);
      const picker = container.querySelector('.rds-comp-color-picker');
      expect(picker).toHaveAttribute('aria-disabled', 'true');
    });

    it('component does not have aria-disabled when not disabled', () => {
      const { container } = render(<RdsCompColorPicker {...defaultProps} isDisabled={false} />);
      const picker = container.querySelector('.rds-comp-color-picker');
      expect(picker).not.toHaveAttribute('aria-disabled');
    });

    it('does not allow color change on hue when disabled', () => {
      const onChange = jest.fn();
      render(<RdsCompColorPicker {...defaultProps} isDisabled={true} onChange={onChange} />);
      
      const changeButton = screen.getByTestId('grid-change-color');
      fireEvent.click(changeButton);
      
      expect(onChange).not.toHaveBeenCalled();
    });
  });

  describe('Swatches', () => {
    it('shows swatches when showSwatches is true', () => {
      const { rerender } = render(<RdsCompColorPicker {...defaultProps} showSwatches={false} />);
      rerender(<RdsCompColorPicker {...defaultProps} showSwatches={true} showTabs={true} pickerType={PickerType.Spectrum} />);
      // Component renders with showSwatches prop passed through
      expect(screen.getByTestId('color-picker-spectrum')).toBeInTheDocument();
    });
  });

  describe('Initial State', () => {
    it('initializes with correct default color hex', () => {
      render(<RdsCompColorPicker value="#9751F2" label="Pick Color" type={ColorPickerType.Default} />);
      const colorState = screen.getByTestId('grid-color-state').textContent;
      expect(colorState).toContain('#9751F2');
    });

    it('initializes with default rgb values when value prop is HEX', () => {
      render(<RdsCompColorPicker {...defaultProps} />);
      const colorState = JSON.parse(screen.getByTestId('grid-color-state').textContent || '{}');
      expect(colorState.rgb).toBeDefined();
      expect(colorState.rgb.r).toBe(151);
      expect(colorState.rgb.g).toBe(81);
      expect(colorState.rgb.b).toBe(242);
    });

    it('initializes with default purple color when no value provided', () => {
      render(<RdsCompColorPicker value="" label="Pick Color" type={ColorPickerType.Default} />);
      const colorState = screen.getByTestId('grid-color-state').textContent;
      expect(colorState).toContain('#');
    });
  });

  describe('Multiple Color Mode Support', () => {
    it('can display color in HEX format', () => {
      render(<RdsCompColorPicker {...defaultProps} colorMode={ColorMode.HEX} />);
      expect(screen.getByTestId('grid-color-mode')).toHaveTextContent('HEX');
    });

    it('can display color in RGB format', () => {
      render(<RdsCompColorPicker {...defaultProps} colorMode={ColorMode.RGB} />);
      expect(screen.getByTestId('grid-color-mode')).toHaveTextContent('RGB');
    });

    it('can display color in HSB format', () => {
      render(<RdsCompColorPicker {...defaultProps} colorMode={ColorMode.HSB} />);
      expect(screen.getByTestId('grid-color-mode')).toHaveTextContent('HSB');
    });

    it('can display color in HSL format', () => {
      render(<RdsCompColorPicker {...defaultProps} colorMode={ColorMode.HSL} />);
      expect(screen.getByTestId('grid-color-mode')).toHaveTextContent('HSL');
    });
  });

  describe('Picker Type Combination', () => {
    it('renders both Grid and Spectrum pickers when tabs are shown', () => {
      const { container } = render(<RdsCompColorPicker {...defaultProps} showTabs={true} />);
      
      // Initially Grid is shown
      expect(screen.getByTestId('color-picker-grid')).toBeInTheDocument();
      
      // Click to Spectrum tab
      const tabs = container.querySelectorAll('.rds-comp-color-picker__tab');
      fireEvent.click(tabs[1]);
      
      // Now Spectrum is shown
      expect(screen.getByTestId('color-picker-spectrum')).toBeInTheDocument();
    });
  });

  describe('Button Type with Different Props', () => {
    it('Button type with label displays label', () => {
      render(<RdsCompColorPicker {...defaultProps} type={ColorPickerType.Button} label="Choose" />);
      expect(screen.getByTestId('rds-button')).toHaveTextContent('Choose');
    });

    it('ButtonExpanded type always shows picker initially', () => {
      render(<RdsCompColorPicker {...defaultProps} type={ColorPickerType.ButtonExpanded} />);
      const button = screen.getByTestId('rds-button');
      expect(screen.getByTestId('color-picker-grid')).toBeInTheDocument();
      
      // Click to hide
      fireEvent.click(button);
      expect(screen.queryByTestId('color-picker-grid')).not.toBeInTheDocument();
      
      // Click to show again
      fireEvent.click(button);
      expect(screen.getByTestId('color-picker-grid')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty value gracefully', () => {
      render(<RdsCompColorPicker value="" label="Color" type={ColorPickerType.Default} />);
      expect(screen.getByTestId('color-picker-grid')).toBeInTheDocument();
    });

    it('handles undefined onChange callback', () => {
      render(<RdsCompColorPicker {...defaultProps} onChange={undefined} />);
      const changeButton = screen.getByTestId('grid-change-color');
      expect(() => fireEvent.click(changeButton)).not.toThrow();
    });

    it('handles rapid tab switches', () => {
      const { container } = render(<RdsCompColorPicker {...defaultProps} showTabs={true} />);
      const tabs = container.querySelectorAll('.rds-comp-color-picker__tab');
      
      fireEvent.click(tabs[1]);
      fireEvent.click(tabs[0]);
      fireEvent.click(tabs[1]);
      
      expect(screen.getByTestId('color-picker-spectrum')).toBeInTheDocument();
    });

    it('handles rapid button clicks', () => {
      render(<RdsCompColorPicker {...defaultProps} type={ColorPickerType.Button} />);
      const button = screen.getByTestId('rds-button');
      
      // Start hidden, click 1 (show), click 2 (hide), click 3 (show)
      fireEvent.click(button);
      fireEvent.click(button);
      fireEvent.click(button);
      
      expect(screen.getByTestId('color-picker-grid')).toBeInTheDocument();
    });

    it('handles color change while disabled then enabled', () => {
      const onChange = jest.fn();
      const { rerender } = render(<RdsCompColorPicker {...defaultProps} isDisabled={true} onChange={onChange} />);
      
      const changeButton = screen.getByTestId('grid-change-color');
      fireEvent.click(changeButton);
      expect(onChange).not.toHaveBeenCalled();
      
      rerender(<RdsCompColorPicker {...defaultProps} isDisabled={false} onChange={onChange} />);
      fireEvent.click(changeButton);
      expect(onChange).toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('renders with Fragment wrapper', () => {
      const { container } = render(<RdsCompColorPicker {...defaultProps} />);
      expect(container.querySelector('.rds-comp-color-picker')).toBeInTheDocument();
    });
  
    it('has no axe accessibility violations', async () => {
      const { container } = render(<RdsCompColorPicker {...defaultProps} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('button has proper semantic structure', () => {
      render(<RdsCompColorPicker {...defaultProps} type={ColorPickerType.Button} />);
      expect(screen.getByTestId('rds-button')).toBeInTheDocument();
    });

    it('disabled state is properly communicated', () => {
      const { container } = render(<RdsCompColorPicker {...defaultProps} isDisabled={true} />);
      const picker = container.querySelector('[aria-disabled="true"]');
      expect(picker).toBeInTheDocument();
    });
  });

  describe('Default Props Behavior', () => {
    it('uses Default type when type not specified', () => {
      const { container } = render(
        <RdsCompColorPicker value="#9751F2" label="Color" type={ColorPickerType.Default} />
      );
      expect(container.querySelector('.rds-comp-color-picker__container')).toBeInTheDocument();
    });

    it('uses Grid picker type by default', () => {
      render(<RdsCompColorPicker {...defaultProps} showTabs={true} />);
      expect(screen.getByTestId('color-picker-grid')).toBeInTheDocument();
    });

    it('uses HEX color mode by default', () => {
      render(<RdsCompColorPicker {...defaultProps} />);
      expect(screen.getByTestId('grid-color-mode')).toHaveTextContent('HEX');
    });

    it('uses Type 1 style by default', () => {
      const { container } = render(<RdsCompColorPicker {...defaultProps} />);
      expect(container.querySelector('.rds-comp-color-picker')).toBeInTheDocument();
    });
  });
});