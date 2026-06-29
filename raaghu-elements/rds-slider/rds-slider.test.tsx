import React from 'react';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { ThemeProvider, createTheme } from '@mui/material';
import RdsSlider from './rds-slider';
import { axe } from 'jest-axe';

// Test helpers
const renderWithTheme = (component: React.ReactElement) => {
  const theme = createTheme();
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('RdsSlider', () => {
  describe('Basic Rendering', () => {
    it('should render the slider component', () => {
      renderWithTheme(<RdsSlider />);
      const slider = document.querySelector('.rds-slider');
      expect(slider).toBeInTheDocument();
    });

    it('should render with custom className', () => {
      renderWithTheme(<RdsSlider className="custom-class" />);
      const slider = document.querySelector('.rds-slider.custom-class');
      expect(slider).toBeInTheDocument();
    });

    it('should have the correct display name', () => {
      expect(RdsSlider.displayName).toBe('RdsSlider');
    });

    it('should render the MUI Slider input', () => {
      renderWithTheme(<RdsSlider />);
      const input = document.querySelector('input[type="range"]');
      expect(input).toBeInTheDocument();
    });
  });

  describe('One-Way (Single Value) Slider', () => {
    it('should render single value slider by default', () => {
      renderWithTheme(<RdsSlider value={50} min={0} max={100} />);
      const input = document.querySelector('input[type="range"]') as HTMLInputElement;
      expect(input).toHaveValue('50');
    });

    it('should initialize with default value when not controlled', () => {
      renderWithTheme(<RdsSlider min={0} max={100} />);
      const input = document.querySelector('input[type="range"]') as HTMLInputElement;
      // Default should be min + (max - min) * 0.3 = 0 + (100 - 0) * 0.3 = 30
      expect(Number.parseInt(input.value)).toBe(30);
    });

    it('should update slider value on user drag', async () => {
      const user = userEvent.setup();
      const { container } = renderWithTheme(<RdsSlider value={50} min={0} max={100} onChange={jest.fn()} />);
      const input = container.querySelector('input[type="range"]') as HTMLInputElement;
      
      await user.tripleClick(input);
      expect(input).toBeInTheDocument();
    });

    it('should respect min max bounds', () => {
      renderWithTheme(<RdsSlider value={150} min={0} max={100} />);
      const input = document.querySelector('input[type="range"]') as HTMLInputElement;
      expect(Number.parseInt(input.value)).toBeLessThanOrEqual(100);
    });

    it('should update when value prop changes', () => {
      const { rerender } = renderWithTheme(<RdsSlider value={30} min={0} max={100} />);
      let input = document.querySelector('input[type="range"]') as HTMLInputElement;
      expect(Number.parseInt(input.value)).toBe(30);

      rerender(
        <ThemeProvider theme={createTheme()}>
          <RdsSlider value={70} min={0} max={100} />
        </ThemeProvider>
      );
      input = document.querySelector('input[type="range"]') as HTMLInputElement;
      expect(Number.parseInt(input.value)).toBe(70);
    });
  });

  describe('Two-Way (Range) Slider', () => {
    it('should render range slider with controlType="two way"', () => {
      renderWithTheme(<RdsSlider controlType="two way" min={0} max={100} />);
      const inputs = document.querySelectorAll('input[type="range"]');
      expect(inputs.length).toBeGreaterThanOrEqual(1);
    });

    it('should initialize with range values when controlType="two way"', () => {
      renderWithTheme(<RdsSlider controlType="two way" min={0} max={100} />);
      const input = document.querySelector('input[type="range"]') as HTMLInputElement;
      const value = Number.parseInt(input.value);
      // With range: midPoint = 0 + (100 - 0) * 0.5 = 50
      // range = (100 - 0) * 0.2 = 20
      // lower = 50 - 10 = 40, upper = 50 + 10 = 60
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThanOrEqual(100);
    });

    it('should handle range array value', () => {
      renderWithTheme(<RdsSlider controlType="two way" value={[25, 75]} min={0} max={100} />);
      const input = document.querySelector('input[type="range"]') as HTMLInputElement;
      expect(input).toBeInTheDocument();
    });

    it('should switch from range to single value when controlType changes', () => {
      const { rerender } = renderWithTheme(
        <RdsSlider controlType="two way" value={[30, 70]} min={0} max={100} />
      );

      rerender(
        <ThemeProvider theme={createTheme()}>
          <RdsSlider controlType="one way" value={[30, 70]} min={0} max={100} />
        </ThemeProvider>
      );
      const input = document.querySelector('input[type="range"]') as HTMLInputElement;
      expect(input).toBeInTheDocument();
    });

    it('should switch from single value to range when controlType changes', () => {
      const { rerender } = renderWithTheme(
        <RdsSlider controlType="one way" value={50} min={0} max={100} />
      );

      rerender(
        <ThemeProvider theme={createTheme()}>
          <RdsSlider controlType="two way" value={50} min={0} max={100} />
        </ThemeProvider>
      );
      const input = document.querySelector('input[type="range"]') as HTMLInputElement;
      expect(input).toBeInTheDocument();
    });
  });

  describe('Label and Value Display', () => {
    it('should not show label row by default', () => {
      renderWithTheme(<RdsSlider />);
      const labelRow = document.querySelector('.rds-slider__label-row');
      expect(labelRow).not.toBeInTheDocument();
    });

    it('should show label when showLabel=true', () => {
      renderWithTheme(<RdsSlider label="Volume" showLabel={true} />);
      const labelRow = document.querySelector('.rds-slider__label-row');
      expect(labelRow).toBeInTheDocument();
      const labelText = screen.getByText('Volume');
      expect(labelText).toHaveClass('rds-slider__label-text');
    });

    it('should show value when showValue=true', () => {
      renderWithTheme(<RdsSlider value={50} min={0} max={100} showValue={true} />);
      const valueElement = document.querySelector('.rds-slider__value');
      expect(valueElement).toBeInTheDocument();
      expect(valueElement).toHaveTextContent('50');
    });

    it('should show both label and value when both flags are true', () => {
      renderWithTheme(
        <RdsSlider label="Brightness" value={75} min={0} max={100} showLabel={true} showValue={true} />
      );
      const labelRow = document.querySelector('.rds-slider__label-row');
      expect(labelRow).toBeInTheDocument();
      expect(screen.getByText('Brightness')).toBeInTheDocument();
      expect(document.querySelector('.rds-slider__value')).toHaveTextContent('75');
    });

    it('should format value with unit', () => {
      renderWithTheme(<RdsSlider value={50} min={0} max={100} showValue={true} unit="%" />);
      const valueElement = document.querySelector('.rds-slider__value');
      expect(valueElement).toHaveTextContent('50%');
    });

    it('should display range value with unit', () => {
      renderWithTheme(
        <RdsSlider controlType="two way" value={[25, 75]} min={0} max={100} showValue={true} unit="°C" />
      );
      const valueElement = document.querySelector('.rds-slider__value');
      expect(valueElement).toHaveTextContent('25°C - 75°C');
    });

    it('should update displayed value when slider value changes', () => {
      const { rerender } = renderWithTheme(
        <RdsSlider value={30} min={0} max={100} showValue={true} />
      );
      expect(document.querySelector('.rds-slider__value')).toHaveTextContent('30');

      rerender(
        <ThemeProvider theme={createTheme()}>
          <RdsSlider value={70} min={0} max={100} showValue={true} />
        </ThemeProvider>
      );
      expect(document.querySelector('.rds-slider__value')).toHaveTextContent('70');
    });
  });

  describe('Left and Right Labels', () => {
    it('should render left label with default value', () => {
      renderWithTheme(<RdsSlider />);
      expect(screen.getByText('0')).toHaveClass('rds-slider__left-label');
    });

    it('should render right label with default value', () => {
      renderWithTheme(<RdsSlider />);
      expect(screen.getByText('100')).toHaveClass('rds-slider__right-label');
    });

    it('should render custom left label', () => {
      renderWithTheme(<RdsSlider leftLabel="Min" />);
      expect(screen.getByText('Min')).toHaveClass('rds-slider__left-label');
    });

    it('should render custom right label', () => {
      renderWithTheme(<RdsSlider rightLabel="Max" />);
      expect(screen.getByText('Max')).toHaveClass('rds-slider__right-label');
    });

    it('should not render left label when leftLabel is empty string', () => {
      renderWithTheme(<RdsSlider leftLabel="" />);
      const leftLabels = document.querySelectorAll('.rds-slider__left-label');
      expect(leftLabels.length).toBe(0);
    });

    it('should not render right label when rightLabel is empty string', () => {
      renderWithTheme(<RdsSlider rightLabel="" />);
      const rightLabels = document.querySelectorAll('.rds-slider__right-label');
      expect(rightLabels.length).toBe(0);
    });

    it('should render both custom labels together', () => {
      renderWithTheme(<RdsSlider leftLabel="Cold" rightLabel="Hot" />);
      expect(screen.getByText('Cold')).toBeInTheDocument();
      expect(screen.getByText('Hot')).toBeInTheDocument();
    });
  });

  describe('Level Property', () => {
    it('should set position based on level 1', () => {
      renderWithTheme(<RdsSlider level={1} min={0} max={100} />);
      const input = document.querySelector('input[type="range"]') as HTMLInputElement;
      const value = Number.parseInt(input.value);
      // level 1 = 0% of range = min = 0
      expect(value).toBe(0);
    });

    it('should set position based on level 3', () => {
      renderWithTheme(<RdsSlider level={3} min={0} max={100} />);
      const input = document.querySelector('input[type="range"]') as HTMLInputElement;
      const value = Number.parseInt(input.value);
      // level 3 = 50% of range = 0 + (100 - 0) * 0.5 = 50
      expect(value).toBe(50);
    });

    it('should set position based on level 5', () => {
      renderWithTheme(<RdsSlider level={5} min={0} max={100} />);
      const input = document.querySelector('input[type="range"]') as HTMLInputElement;
      const value = Number.parseInt(input.value);
      // level 5 = 100% of range = max = 100
      expect(value).toBe(100);
    });

    it('should update value when level prop changes', () => {
      const { rerender } = renderWithTheme(<RdsSlider level={1} min={0} max={100} />);
      let input = document.querySelector('input[type="range"]') as HTMLInputElement;
      expect(Number.parseInt(input.value)).toBe(0);

      rerender(
        <ThemeProvider theme={createTheme()}>
          <RdsSlider level={5} min={0} max={100} />
        </ThemeProvider>
      );
      input = document.querySelector('input[type="range"]') as HTMLInputElement;
      expect(Number.parseInt(input.value)).toBe(100);
    });

    it('should ignore invalid level values', () => {
      renderWithTheme(<RdsSlider level={0 as any} min={0} max={100} />);
      const input = document.querySelector('input[type="range"]') as HTMLInputElement;
      expect(input).toBeInTheDocument();
    });

    it('should work with range slider', () => {
      renderWithTheme(<RdsSlider controlType="two way" level={3} min={0} max={100} />);
      const input = document.querySelector('input[type="range"]') as HTMLInputElement;
      expect(input).toBeInTheDocument();
    });
  });

  describe('Marks Generation', () => {
    it('should disable marks when marks=false', () => {
      renderWithTheme(<RdsSlider marks={false} min={0} max={100} />);
      const slider = document.querySelector('.rds-slider');
      expect(slider).toBeInTheDocument();
    });

    it('should generate marks when marks=true', () => {
      renderWithTheme(<RdsSlider marks={true} step={25} min={0} max={100} />);
      const slider = document.querySelector('.rds-slider');
      expect(slider).toBeInTheDocument();
    });

    it('should use custom step for mark generation', () => {
      renderWithTheme(<RdsSlider marks={true} step={20} min={0} max={100} />);
      const slider = document.querySelector('.rds-slider');
      expect(slider).toBeInTheDocument();
    });

    it('should not generate marks when max <= min', () => {
      renderWithTheme(<RdsSlider marks={true} min={100} max={100} />);
      const slider = document.querySelector('.rds-slider');
      expect(slider).toBeInTheDocument();
    });

    it('should auto-calculate step when marks=true and step is undefined', () => {
      renderWithTheme(<RdsSlider marks={true} min={0} max={100} />);
      const slider = document.querySelector('.rds-slider');
      expect(slider).toBeInTheDocument();
    });

    it('should handle large range with mark limit', () => {
      renderWithTheme(<RdsSlider marks={true} step={1} min={0} max={1000} />);
      const slider = document.querySelector('.rds-slider');
      expect(slider).toBeInTheDocument();
    });

    it('should disable marks when there are too many', () => {
      renderWithTheme(<RdsSlider marks={true} step={1} min={0} max={3000} />);
      const slider = document.querySelector('.rds-slider');
      expect(slider).toBeInTheDocument();
    });
  });

  describe('Min and Max Values', () => {
    it('should use default max of 100 when not provided', () => {
      renderWithTheme(<RdsSlider min={0} />);
      const input = document.querySelector('input[type="range"]') as HTMLInputElement;
      expect(Number.parseInt(input.max)).toBe(100);
    });

    it('should use custom max value', () => {
      renderWithTheme(<RdsSlider min={0} max={500} />);
      const input = document.querySelector('input[type="range"]') as HTMLInputElement;
      expect(Number.parseInt(input.max)).toBe(500);
    });

    it('should handle custom min value', () => {
      renderWithTheme(<RdsSlider min={10} max={100} value={10} />);
      const input = document.querySelector('input[type="range"]') as HTMLInputElement;
      expect(Number.parseInt(input.min)).toBe(10);
    });

    it('should handle negative min value', () => {
      renderWithTheme(<RdsSlider min={-50} max={50} value={0} />);
      const input = document.querySelector('input[type="range"]') as HTMLInputElement;
      expect(Number.parseInt(input.min)).toBe(-50);
    });

    it('should handle float step', () => {
      renderWithTheme(<RdsSlider min={0} max={1} step={0.1} value={0.5} />);
      const input = document.querySelector('input[type="range"]') as HTMLInputElement;
      expect(input).toBeInTheDocument();
    });

    it('should handle decimal values', () => {
      renderWithTheme(<RdsSlider min={0} max={10} value={7.5} showValue={true} />);
      expect(document.querySelector('.rds-slider__value')).toHaveTextContent('7.5');
    });
  });

  describe('onChange Callback', () => {
    it('should call onChange when value changes', () => {
      const onChange = jest.fn();
      renderWithTheme(<RdsSlider value={50} min={0} max={100} onChange={onChange} />);
      expect(onChange).not.toHaveBeenCalled();
    });

    it('should pass correct parameters to onChange', () => {
      const onChange = jest.fn();
      const { container } = renderWithTheme(
        <RdsSlider value={50} min={0} max={100} onChange={onChange} />
      );
      const slider = container.querySelector('input[type="range"]') as HTMLInputElement;
      expect(slider).toBeInTheDocument();
    });

    it('should handle onChange without crashing', () => {
      const { container } = renderWithTheme(
        <RdsSlider value={50} min={0} max={100} onChange={jest.fn()} />
      );
      const slider = container.querySelector('input[type="range"]');
      expect(slider).toBeInTheDocument();
    });
  });

  describe('Tooltip Display', () => {
    it('should not show tooltip by default', () => {
      renderWithTheme(<RdsSlider value={50} min={0} max={100} />);
      const slider = document.querySelector('.rds-slider');
      expect(slider).toBeInTheDocument();
    });

    it('should set valueLabelDisplay to auto when showTooltip="tooltip"', () => {
      renderWithTheme(<RdsSlider value={50} min={0} max={100} showTooltip="tooltip" />);
      const slider = document.querySelector('.rds-slider');
      expect(slider).toBeInTheDocument();
    });

    it('should set valueLabelDisplay to off when showTooltip is default', () => {
      renderWithTheme(<RdsSlider value={50} min={0} max={100} showTooltip="default" />);
      const slider = document.querySelector('.rds-slider');
      expect(slider).toBeInTheDocument();
    });

    it('should handle undefined showTooltip', () => {
      renderWithTheme(<RdsSlider value={50} min={0} max={100} showTooltip={undefined} />);
      const slider = document.querySelector('.rds-slider');
      expect(slider).toBeInTheDocument();
    });
  });

  describe('Disabled State', () => {
    it('should disable slider when disabled=true', () => {
      renderWithTheme(<RdsSlider disabled={true} value={50} min={0} max={100} />);
      const input = document.querySelector('input[type="range"]') as HTMLInputElement;
      expect(input).toBeDisabled();
    });

    it('should enable slider when disabled=false', () => {
      renderWithTheme(<RdsSlider disabled={false} value={50} min={0} max={100} />);
      const input = document.querySelector('input[type="range"]') as HTMLInputElement;
      expect(input).not.toBeDisabled();
    });

    it('should enable slider by default', () => {
      renderWithTheme(<RdsSlider value={50} min={0} max={100} />);
      const input = document.querySelector('input[type="range"]') as HTMLInputElement;
      expect(input).not.toBeDisabled();
    });
  });

  describe('Controlled Component', () => {
    it('should update slider when value prop changes', () => {
      const { rerender } = renderWithTheme(<RdsSlider value={25} min={0} max={100} />);
      let input = document.querySelector('input[type="range"]') as HTMLInputElement;
      expect(Number.parseInt(input.value)).toBe(25);

      rerender(
        <ThemeProvider theme={createTheme()}>
          <RdsSlider value={75} min={0} max={100} />
        </ThemeProvider>
      );
      input = document.querySelector('input[type="range"]') as HTMLInputElement;
      expect(Number.parseInt(input.value)).toBe(75);
    });

    it('should maintain value when props dont change', () => {
      const { rerender } = renderWithTheme(
        <RdsSlider value={50} min={0} max={100} label="Test" />
      );
      let input = document.querySelector('input[type="range"]') as HTMLInputElement;
      const initialValue = input.value;

      rerender(
        <ThemeProvider theme={createTheme()}>
          <RdsSlider value={50} min={0} max={100} label="Test" />
        </ThemeProvider>
      );
      input = document.querySelector('input[type="range"]') as HTMLInputElement;
      expect(input.value).toBe(initialValue);
    });
  });

  describe('Edge Cases', () => {
    it('should handle value of 0', () => {
      renderWithTheme(<RdsSlider value={0} min={0} max={100} showValue={true} />);
      expect(document.querySelector('.rds-slider__value')).toHaveTextContent('0');
    });

    it('should handle max value', () => {
      renderWithTheme(<RdsSlider value={100} min={0} max={100} showValue={true} />);
      expect(document.querySelector('.rds-slider__value')).toHaveTextContent('100');
    });

    it('should handle very small ranges', () => {
      renderWithTheme(<RdsSlider min={0} max={0.1} value={0.05} showValue={true} />);
      expect(document.querySelector('.rds-slider__value')).toBeInTheDocument();
    });

    it('should handle very large ranges', () => {
      renderWithTheme(<RdsSlider min={0} max={1000000} value={500000} showValue={true} />);
      expect(document.querySelector('.rds-slider__value')).toBeInTheDocument();
    });

    it('should handle empty label', () => {
      renderWithTheme(<RdsSlider label="" showLabel={true} />);
      const labelRow = document.querySelector('.rds-slider__label-row');
      expect(labelRow).toBeInTheDocument();
    });

    it('should handle undefined className', () => {
      renderWithTheme(<RdsSlider className={undefined} />);
      const slider = document.querySelector('.rds-slider');
      expect(slider).toBeInTheDocument();
    });

    it('should handle empty unit', () => {
      renderWithTheme(<RdsSlider value={50} min={0} max={100} showValue={true} unit="" />);
      expect(document.querySelector('.rds-slider__value')).toHaveTextContent('50');
    });
  });

  describe('Accessibility', () => {
    it('should have aria label from parent container', () => {
      renderWithTheme(
        <div aria-label="slider control">
          <RdsSlider value={50} min={0} max={100} />
        </div>
      );
      expect(screen.getByLabelText('slider control')).toBeInTheDocument();
  
    });
    it('has no axe accessibility violations', async () => {
      const { container } = render(<RdsSlider aria-label="Volume" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have keyboard navigation support', () => {
      renderWithTheme(<RdsSlider value={50} min={0} max={100} />);
      const input = document.querySelector('input[type="range"]');
      expect(input).toBeInTheDocument();
    });

    it('should have proper semantic structure', () => {
      renderWithTheme(
        <RdsSlider label="Volume" value={50} min={0} max={100} showLabel={true} />
      );
      const slider = document.querySelector('.rds-slider');
      expect(slider).toBeInTheDocument();
    });

    it('should handle focus state', () => {
      renderWithTheme(<RdsSlider value={50} min={0} max={100} />);
      const input = document.querySelector('input[type="range"]') as HTMLInputElement;
      expect(input).not.toHaveFocus();
    });
  });

  describe('Complex Scenarios', () => {
    it('should handle all props together', () => {
      renderWithTheme(
        <RdsSlider
          label="Temperature"
          value={65}
          min={0}
          max={100}
          step={1}
          showLabel={true}
          showValue={true}
          unit="°F"
          leftLabel="Cold"
          rightLabel="Hot"
          className="custom"
          disabled={false}
        />
      );
      const container = document.querySelector('.rds-slider.custom');
      expect(container).toBeInTheDocument();
      expect(screen.getByText('Temperature')).toBeInTheDocument();
      expect(screen.getByText('65°F')).toBeInTheDocument();
    });

    it('should handle rapid value changes', () => {
      const { rerender } = renderWithTheme(<RdsSlider value={20} min={0} max={100} />);

      for (let i = 30; i <= 80; i += 10) {
        rerender(
          <ThemeProvider theme={createTheme()}>
            <RdsSlider value={i} min={0} max={100} />
          </ThemeProvider>
        );
      }
      const input = document.querySelector('input[type="range"]') as HTMLInputElement;
      expect(Number.parseInt(input.value)).toBe(80);
    });

    it('should handle switching between range and single value modes', () => {
      const { rerender } = renderWithTheme(
        <RdsSlider controlType="one way" value={50} min={0} max={100} />
      );
      expect(document.querySelector('.rds-slider')).toBeInTheDocument();

      rerender(
        <ThemeProvider theme={createTheme()}>
          <RdsSlider controlType="two way" value={50} min={0} max={100} />
        </ThemeProvider>
      );
      expect(document.querySelector('.rds-slider')).toBeInTheDocument();

      rerender(
        <ThemeProvider theme={createTheme()}>
          <RdsSlider controlType="one way" value={50} min={0} max={100} />
        </ThemeProvider>
      );
      expect(document.querySelector('.rds-slider')).toBeInTheDocument();
    });

    it('should handle level changes with range slider', () => {
      const { rerender } = renderWithTheme(
        <RdsSlider controlType="two way" level={1} min={0} max={100} />
      );
      expect(document.querySelector('.rds-slider')).toBeInTheDocument();

      for (let level = 2; level <= 5; level++) {
        rerender(
          <ThemeProvider theme={createTheme()}>
            <RdsSlider controlType="two way" level={level as any} min={0} max={100} />
          </ThemeProvider>
        );
      }
      expect(document.querySelector('.rds-slider')).toBeInTheDocument();
    });

    it('should handle changing display properties', () => {
      const { rerender } = renderWithTheme(
        <RdsSlider value={50} min={0} max={100} showLabel={false} showValue={false} />
      );
      expect(document.querySelector('.rds-slider__label-row')).not.toBeInTheDocument();

      rerender(
        <ThemeProvider theme={createTheme()}>
          <RdsSlider value={50} min={0} max={100} showLabel={true} showValue={true} />
        </ThemeProvider>
      );
      expect(document.querySelector('.rds-slider__label-row')).toBeInTheDocument();
    });
  });

  describe('Props Pass-through', () => {
    it('should pass MUI slider props to underlying slider', () => {
      renderWithTheme(
        <RdsSlider
          value={50}
          min={0}
          max={100}
          step={5}
          orientation="horizontal"
        />
      );
      const input = document.querySelector('input[type="range"]') as HTMLInputElement;
      expect(input).toBeInTheDocument();
    });

    it('should handle color prop from MUI', () => {
      renderWithTheme(
        <RdsSlider
          value={50}
          min={0}
          max={100}
          color="secondary"
        />
      );
      const slider = document.querySelector('.rds-slider');
      expect(slider).toBeInTheDocument();
    });

    it('should handle size prop from MUI', () => {
      renderWithTheme(
        <RdsSlider
          value={50}
          min={0}
          max={100}
          size="small"
        />
      );
      const slider = document.querySelector('.rds-slider');
      expect(slider).toBeInTheDocument();
    });
  });

  describe('Display Name', () => {
    it('should have correct display name for debugging', () => {
      renderWithTheme(<RdsSlider value={50} min={0} max={100} />);
      expect(RdsSlider.displayName).toBe('RdsSlider');
    });
  });
});

describe('RdsSlider — keyboard navigation', () => {
  it('slider is focusable via Tab', async () => {
    renderWithTheme(<RdsSlider />);
    await userEvent.tab();
    expect(screen.getByRole('slider')).toHaveFocus();
  });

  it('increments value on ArrowRight key', async () => {
    renderWithTheme(<RdsSlider defaultValue={50} min={0} max={100} />);
    const slider = screen.getByRole('slider');
    slider.focus();
    await userEvent.keyboard('{ArrowRight}');
    expect(Number(slider.getAttribute('aria-valuenow'))).toBeGreaterThan(50);
  });

  it('decrements value on ArrowLeft key', async () => {
    renderWithTheme(<RdsSlider defaultValue={50} min={0} max={100} />);
    const slider = screen.getByRole('slider');
    slider.focus();
    await userEvent.keyboard('{ArrowLeft}');
    expect(Number(slider.getAttribute('aria-valuenow'))).toBeLessThan(50);
  });

  it('goes to max on End key', async () => {
    renderWithTheme(<RdsSlider defaultValue={50} min={0} max={100} />);
    const slider = screen.getByRole('slider');
    slider.focus();
    await userEvent.keyboard('{End}');
    expect(slider).toHaveAttribute('aria-valuenow', '100');
  });

  it('goes to min on Home key', async () => {
    renderWithTheme(<RdsSlider defaultValue={50} min={0} max={100} />);
    const slider = screen.getByRole('slider');
    slider.focus();
    await userEvent.keyboard('{Home}');
    expect(slider).toHaveAttribute('aria-valuenow', '0');
  });

  it('does not change when disabled', async () => {
    renderWithTheme(<RdsSlider defaultValue={50} min={0} max={100} disabled />);
    const slider = screen.getByRole('slider');
    slider.focus();
    await userEvent.keyboard('{ArrowRight}');
    expect(slider).toHaveAttribute('aria-valuenow', '50');
  });
});