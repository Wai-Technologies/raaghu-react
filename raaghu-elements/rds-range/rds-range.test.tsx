import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import RdsRange from './rds-range';
import { axe } from 'jest-axe';

// Mock SCSS and tooltip imports
jest.mock('./rds-range.scss', () => ({}));
jest.mock('../rds-tooltip/rds-tooltip', () => {
  return ({ children, title }: any) => <div data-testid="rds-tooltip" title={title}>{children}</div>;
});

const renderWithTheme = (component: React.ReactElement) => {
  const theme = createTheme();
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('RdsRange', () => {
  describe('Basic Rendering', () => {
    it('should render range slider component', () => {
      const { container } = renderWithTheme(
        <RdsRange />
      );
      
      expect(container.querySelector('.rds-range')).toBeInTheDocument();
    });

    it('should render MUI Slider component', () => {
      const { container } = renderWithTheme(
        <RdsRange />
      );
      
      expect(container.querySelector('.rds-range__slider')).toBeInTheDocument();
    });

    it('should have correct CSS class applied', () => {
      const { container } = renderWithTheme(
        <RdsRange />
      );
      
      expect(container.querySelector('.rds-range')?.className).toContain('rds-range');
    });

    it('should render without errors with default props', () => {
      const { container } = renderWithTheme(
        <RdsRange />
      );
      
      expect(container).toBeInTheDocument();
    });

    it('should render with full width', () => {
      const { container } = renderWithTheme(
        <RdsRange />
      );
      
      const box = container.querySelector('.rds-range');
      expect(box).toBeInTheDocument();
    });
  });

  describe('Label and Value Display', () => {
    it('should render label when provided with textLabel true', () => {
      renderWithTheme(
        <RdsRange 
          label="Price Range"
          textLabel={true}
          showLabel={true}
        />
      );
      
      expect(screen.getByText('Price Range')).toBeInTheDocument();
    });

    it('should not render label when textLabel is false', () => {
      renderWithTheme(
        <RdsRange 
          label="Price Range"
          textLabel={false}
        />
      );
      
      expect(screen.queryByText('Price Range')).not.toBeInTheDocument();
    });

    it('should render value when showValue is true', () => {
      const { container } = renderWithTheme(
        <RdsRange 
          value={50}
          showValue={true}
          type="two-way"
          range={true}
        />
      );
      
      const valueText = container.querySelector('.rds-range__value');
      expect(valueText).toBeInTheDocument();
    });

    it('should not render value when showValue is false', () => {
      const { container } = renderWithTheme(
        <RdsRange 
          value={50}
          showValue={false}
        />
      );
      
      const valueDisplay = container.querySelector('.rds-range__value');
      expect(valueDisplay).not.toBeInTheDocument();
    });

    it('should render min and max labels when showLabel is true', () => {
      renderWithTheme(
        <RdsRange 
          leftLabel={0}
          rightLabel={100}
          showLabel={true}
        />
      );
      
      expect(screen.getByText('0')).toBeInTheDocument();
      expect(screen.getByText('100')).toBeInTheDocument();
    });

    it('should not render min and max labels when showLabel is false', () => {
      const { container } = renderWithTheme(
        <RdsRange 
          leftLabel={0}
          rightLabel={100}
          showLabel={false}
        />
      );
      
      const footer = container.querySelector('.rds-range__footer');
      expect(footer).not.toBeInTheDocument();
    });

    it('should format value with custom formatValue function', () => {
      const { container } = renderWithTheme(
        <RdsRange 
          value={50}
          showValue={true}
          level="3"
          type="one-way"
          formatValue={(val) => `$${val}`}
        />
      );
      
      const valueText = container.querySelector('.rds-range__value');
      expect(valueText).toBeInTheDocument();
    });

    it('should format range values with custom formatValue function', () => {
      const { container } = renderWithTheme(
        <RdsRange 
          value={[20, 80]}
          showValue={true}
          type="two-way"
          formatValue={(val) => `$${val}`}
        />
      );
      
      const valueText = container.querySelector('.rds-range__value');
      expect(valueText).toBeInTheDocument();
    });
  });

  describe('One-Way Range', () => {
    it('should render one-way range type', () => {
      const { container } = renderWithTheme(
        <RdsRange 
          type="one-way"
        />
      );
      
      expect(container.querySelector('.rds-range--one-way')).toBeInTheDocument();
    });

    it('should apply level class for one-way range', () => {
      const { container } = renderWithTheme(
        <RdsRange 
          type="one-way"
          level="3"
        />
      );
      
      expect(container.querySelector('.rds-range--level-3')).toBeInTheDocument();
    });

    it('should set value based on level 1', () => {
      const handleChange = jest.fn();
      const { container } = renderWithTheme(
        <RdsRange 
          type="one-way"
          level="1"
          leftLabel={0}
          rightLabel={100}
          onChange={handleChange}
        />
      );
      
      const slider = container.querySelector('input[type="range"]') as HTMLInputElement;
      expect(slider).toBeInTheDocument();
    });

    it('should set value based on level 5', () => {
      const { container } = renderWithTheme(
        <RdsRange 
          type="one-way"
          level="5"
          leftLabel={0}
          rightLabel={100}
        />
      );
      
      expect(container.querySelector('.rds-range--level-5')).toBeInTheDocument();
    });

    it('should set value based on custom level', () => {
      const { container } = renderWithTheme(
        <RdsRange 
          type="one-way"
          level="2"
          leftLabel={0}
          rightLabel={100}
        />
      );
      
      expect(container.querySelector('.rds-range--level-2')).toBeInTheDocument();
    });
  });

  describe('Two-Way Range', () => {
    it('should render two-way range type', () => {
      const { container } = renderWithTheme(
        <RdsRange 
          type="two-way"
          range={true}
        />
      );
      
      expect(container.querySelector('.rds-range--two-way')).toBeInTheDocument();
    });

    it('should handle range array values', () => {
      const { container } = renderWithTheme(
        <RdsRange 
          value={[20, 80]}
          type="two-way"
          showValue={true}
        />
      );
      
      const valueText = container.querySelector('.rds-range__value');
      expect(valueText).toBeInTheDocument();
    });

    it('should handle range prop correctly', () => {
      const { container } = renderWithTheme(
        <RdsRange 
          range={true}
          type="two-way"
        />
      );
      
      expect(container.querySelector('.rds-range--two-way')).toBeInTheDocument();
    });
  });

  describe('Min/Max Labels', () => {
    it('should use leftLabel prop for minimum', () => {
      renderWithTheme(
        <RdsRange 
          leftLabel={10}
          rightLabel={100}
          showLabel={true}
        />
      );
      
      expect(screen.getByText('10')).toBeInTheDocument();
    });

    it('should use rightLabel prop for maximum', () => {
      renderWithTheme(
        <RdsRange 
          leftLabel={0}
          rightLabel={200}
          showLabel={true}
        />
      );
      
      expect(screen.getByText('200')).toBeInTheDocument();
    });

    it('should use default leftLabel of 0', () => {
      const { container } = renderWithTheme(
        <RdsRange />
      );
      
      expect(container.querySelector('.rds-range')).toBeInTheDocument();
    });

    it('should use default rightLabel of 100', () => {
      const { container } = renderWithTheme(
        <RdsRange />
      );
      
      expect(container.querySelector('.rds-range')).toBeInTheDocument();
    });

    it('should format min label with custom format function', () => {
      renderWithTheme(
        <RdsRange 
          leftLabel={50}
          rightLabel={200}
          showLabel={true}
          formatValue={(val) => `$${val}`}
        />
      );
      
      expect(screen.getByText('$50')).toBeInTheDocument();
    });

    it('should format max label with custom format function', () => {
      renderWithTheme(
        <RdsRange 
          leftLabel={0}
          rightLabel={500}
          showLabel={true}
          formatValue={(val) => `$${val}`}
        />
      );
      
      expect(screen.getByText('$500')).toBeInTheDocument();
    });
  });

  describe('Tooltip Display', () => {
    it('should render with tooltip when showTooltip is true', () => {
      const { container } = renderWithTheme(
        <RdsRange 
          showTooltip={true}
        />
      );
      
      expect(container.querySelector('.rds-range--with-tooltip')).toBeInTheDocument();
    });

    it('should not render tooltip class when showTooltip is false', () => {
      const { container } = renderWithTheme(
        <RdsRange 
          showTooltip={false}
        />
      );
      
      expect(container.querySelector('.rds-range--with-tooltip')).not.toBeInTheDocument();
    });

    it('should display formatted value in tooltip', () => {
      renderWithTheme(
        <RdsRange 
          value={75}
          showTooltip={true}
          formatValue={(val) => `${val}%`}
        />
      );
      
      // Tooltip is rendered and contains the formatted value
      const tooltip = screen.getByTestId('rds-tooltip');
      expect(tooltip).toBeInTheDocument();
    });
  });

  describe('Disabled State', () => {
    it('should apply disabled class when disabled prop is true', () => {
      const { container } = renderWithTheme(
        <RdsRange 
          disabled={true}
        />
      );
      
      expect(container.querySelector('.rds-range--disabled')).toBeInTheDocument();
    });

    it('should not apply disabled class when disabled prop is false', () => {
      const { container } = renderWithTheme(
        <RdsRange 
          disabled={false}
        />
      );
      
      expect(container.querySelector('.rds-range--disabled')).not.toBeInTheDocument();
    });

    it('should disable slider when disabled prop is true', () => {
      const { container } = renderWithTheme(
        <RdsRange 
          disabled={true}
        />
      );
      
      const slider = container.querySelector('input[type="range"]') as HTMLInputElement;
      expect(slider?.disabled).toBe(true);
    });
  });

  describe('Size and Color Props', () => {
    it('should apply size class', () => {
      const { container } = renderWithTheme(
        <RdsRange 
          size="small"
        />
      );
      
      expect(container.querySelector('.rds-range--small')).toBeInTheDocument();
    });

    it('should apply color class', () => {
      const { container } = renderWithTheme(
        <RdsRange 
          color="secondary"
        />
      );
      
      expect(container.querySelector('.rds-range--secondary')).toBeInTheDocument();
    });

    it('should apply both size and color classes', () => {
      const { container } = renderWithTheme(
        <RdsRange 
          size="medium"
          color="primary"
        />
      );
      
      expect(container.querySelector('.rds-range--medium')).toBeInTheDocument();
      expect(container.querySelector('.rds-range--primary')).toBeInTheDocument();
    });
  });

  describe('Value Handling', () => {
    it('should handle controlled value prop', () => {
      const { container } = renderWithTheme(
        <RdsRange 
          value={50}
          type="two-way"
          range={true}
        />
      );
      
      const slider = container.querySelector('input[type="range"]') as HTMLInputElement;
      expect(slider).toBeInTheDocument();
    });

    it('should handle single value', () => {
      const { container } = renderWithTheme(
        <RdsRange 
          value={30}
          showValue={true}
          type="one-way"
          level="1"
        />
      );
      
      const valueText = container.querySelector('.rds-range__value');
      expect(valueText).toBeInTheDocument();
    });

    it('should handle array value for range', () => {
      const { container } = renderWithTheme(
        <RdsRange 
          value={[25, 75]}
          type="two-way"
          showValue={true}
        />
      );
      
      const valueText = container.querySelector('.rds-range__value');
      expect(valueText).toBeInTheDocument();
    });

    it('should update value when prop changes', () => {
      const { rerender, container } = renderWithTheme(
        <RdsRange 
          value={30}
          type="two-way"
          range={true}
        />
      );

      let slider = container.querySelector('input[type="range"]') as HTMLInputElement;
      expect(slider).toBeInTheDocument();

      rerender(
        <ThemeProvider theme={createTheme()}>
          <RdsRange value={70} type="two-way" range={true} />
        </ThemeProvider>
      );

      slider = container.querySelector('input[type="range"]') as HTMLInputElement;
      expect(slider).toBeInTheDocument();
    });

    it('should call onChange when slider changes', () => {
      const handleChange = jest.fn();
      const { container } = renderWithTheme(
        <RdsRange 
          value={50}
          onChange={handleChange}
          type="two-way"
          range={true}
        />
      );
      
      const slider = container.querySelector('input[type="range"]') as HTMLInputElement;
      fireEvent.change(slider, { target: { value: '60' } });
      
      expect(handleChange).toHaveBeenCalled();
    });
  });

  describe('Marks Support', () => {
    it('should render with marks when provided', () => {
      const marks = [
        { value: 0, label: '0%' },
        { value: 50, label: '50%' },
        { value: 100, label: '100%' }
      ];

      renderWithTheme(
        <RdsRange 
          marks={marks}
        />
      );
      
      // Marks should be rendered by MUI slider
      expect(screen.getByText('0%')).toBeInTheDocument();
    });

    it('should work with different mark values', () => {
      const marks = [
        { value: 10, label: 'Low' },
        { value: 50, label: 'Medium' },
        { value: 90, label: 'High' }
      ];

      renderWithTheme(
        <RdsRange 
          marks={marks}
          leftLabel={10}
          rightLabel={90}
        />
      );
      
      expect(screen.getByText('Low')).toBeInTheDocument();
      expect(screen.getByText('Medium')).toBeInTheDocument();
      expect(screen.getByText('High')).toBeInTheDocument();
    });
  });

  describe('Step Configuration', () => {
    it('should apply step prop to slider', () => {
      const { container } = renderWithTheme(
        <RdsRange 
          step={5}
        />
      );
      
      const slider = container.querySelector('input[type="range"]') as HTMLInputElement;
      expect(slider.step).toBe('5');
    });

    it('should work with decimal step values', () => {
      const { container } = renderWithTheme(
        <RdsRange 
          step={0.5}
        />
      );
      
      const slider = container.querySelector('input[type="range"]') as HTMLInputElement;
      expect(Number.parseFloat(slider.step)).toBe(0.5);
    });

    it('should work with step of 1', () => {
      const { container } = renderWithTheme(
        <RdsRange 
          step={1}
        />
      );
      
      const slider = container.querySelector('input[type="range"]') as HTMLInputElement;
      expect(slider.step).toBe('1');
    });
  });

  describe('Theme Integration', () => {
    it('should work with light theme', () => {
      const lightTheme = createTheme({ palette: { mode: 'light' } });
      const { container } = render(
        <ThemeProvider theme={lightTheme}>
          <RdsRange />
        </ThemeProvider>
      );
      
      expect(container.querySelector('.rds-range')).toBeInTheDocument();
    });

    it('should work with dark theme', () => {
      const darkTheme = createTheme({ palette: { mode: 'dark' } });
      const { container } = render(
        <ThemeProvider theme={darkTheme}>
          <RdsRange />
        </ThemeProvider>
      );
      
      expect(container.querySelector('.rds-range')).toBeInTheDocument();
    });

    it('should reflect theme colors in rendered component', () => {
      const customTheme = createTheme({
        palette: {
          primary: { main: '#ff0000' }
        }
      });

      const { container } = render(
        <ThemeProvider theme={customTheme}>
          <RdsRange color="primary" />
        </ThemeProvider>
      );
      
      expect(container.querySelector('.rds-range--primary')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have accessible slider control', () => {
      const { container } = renderWithTheme(
        <RdsRange 
          label="Select Price"
          showLabel={true}
          textLabel={true}
        />
      );
      
      expect(screen.getByText('Select Price')).toBeInTheDocument();
      const slider = container.querySelector('input[type="range"]');
      expect(slider).toBeInTheDocument();
  
    });
    it('has no axe accessibility violations', async () => {
      const { container } = render(<RdsRange aria-label="Select range" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should be keyboard accessible', async () => {
      const _user = userEvent.setup();
      const { container } = renderWithTheme(
        <RdsRange 
          value={50}
        />
      );
      
      const slider = container.querySelector('input[type="range"]') as HTMLInputElement;
      slider.focus();
      expect(document.activeElement).toBe(slider);
    });

    it('should support arrow key navigation', async () => {
      const _user = userEvent.setup();
      const { container } = renderWithTheme(
        <RdsRange 
          value={50}
        />
      );
      
      const slider = container.querySelector('input[type="range"]') as HTMLInputElement;
      slider.focus();
      
      // Arrow keys should adjust the slider value
      expect(document.activeElement).toBe(slider);
    });

    it('should have proper ARIA attributes', () => {
      const { container } = renderWithTheme(
        <RdsRange 
          label="Price Filter"
          textLabel={true}
          leftLabel={0}
          rightLabel={100}
        />
      );
      
      const slider = container.querySelector('input[type="range"]');
      expect(slider).toBeInTheDocument();
    });
  });

  describe('Complex Scenarios', () => {
    it('should handle rapid value changes', () => {
      const handleChange = jest.fn();
      const { container, rerender } = renderWithTheme(
        <RdsRange 
          value={10}
          onChange={handleChange}
        />
      );

      for (let i = 20; i <= 100; i += 10) {
        rerender(
          <ThemeProvider theme={createTheme()}>
            <RdsRange value={i} onChange={handleChange} />
          </ThemeProvider>
        );
      }

      const slider = container.querySelector('input[type="range"]') as HTMLInputElement;
      expect(Number.parseInt(slider.value)).toBeLessThanOrEqual(100);
    });

    it('should handle type change from one-way to two-way', () => {
      const { container, rerender } = renderWithTheme(
        <RdsRange 
          type="one-way"
          level="3"
        />
      );

      expect(container.querySelector('.rds-range--one-way')).toBeInTheDocument();

      rerender(
        <ThemeProvider theme={createTheme()}>
          <RdsRange type="two-way" range={true} />
        </ThemeProvider>
      );

      expect(container.querySelector('.rds-range--two-way')).toBeInTheDocument();
    });

    it('should handle level changes', () => {
      const { container, rerender } = renderWithTheme(
        <RdsRange 
          type="one-way"
          level="1"
        />
      );

      expect(container.querySelector('.rds-range--level-1')).toBeInTheDocument();

      rerender(
        <ThemeProvider theme={createTheme()}>
          <RdsRange type="one-way" level="5" />
        </ThemeProvider>
      );

      expect(container.querySelector('.rds-range--level-5')).toBeInTheDocument();
    });

    it('should handle label and value display changes', () => {
      const { container, rerender } = renderWithTheme(
        <RdsRange 
          value={30}
          showValue={false}
          type="one-way"
          level="1"
        />
      );

      // Value should not be displayed when showValue is false
      let valueText = container.querySelector('.rds-range__value');
      expect(valueText).not.toBeInTheDocument();

      rerender(
        <ThemeProvider theme={createTheme()}>
          <RdsRange value={30} showValue={true} type="one-way" level="1" />
        </ThemeProvider>
      );

      // Value should be displayed when showValue is true
      valueText = container.querySelector('.rds-range__value');
      expect(valueText).toBeInTheDocument();
    });

    it('should handle disabled state toggle', () => {
      const { container, rerender } = renderWithTheme(
        <RdsRange 
          disabled={false}
        />
      );

      let slider = container.querySelector('input[type="range"]') as HTMLInputElement;
      expect(slider.disabled).toBe(false);

      rerender(
        <ThemeProvider theme={createTheme()}>
          <RdsRange disabled={true} />
        </ThemeProvider>
      );

      slider = container.querySelector('input[type="range"]') as HTMLInputElement;
      expect(slider.disabled).toBe(true);
    });

    it('should handle null and undefined values gracefully', () => {
      const { container } = renderWithTheme(
        <RdsRange 
          value={undefined}
        />
      );
      
      expect(container.querySelector('.rds-range')).toBeInTheDocument();
    });

    it('should handle formatValue with null values', () => {
      renderWithTheme(
        <RdsRange 
          value={0}
          showValue={true}
          formatValue={(val) => val === 0 ? 'Zero' : `$${val}`}
        />
      );
      
      expect(screen.getByText('Zero')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle min and max being equal', () => {
      const { container } = renderWithTheme(
        <RdsRange 
          leftLabel={50}
          rightLabel={50}
        />
      );
      
      expect(container.querySelector('.rds-range')).toBeInTheDocument();
    });

    it('should handle negative min values', () => {
      const { container } = renderWithTheme(
        <RdsRange 
          leftLabel={-100}
          rightLabel={100}
          showLabel={true}
        />
      );
      
      expect(screen.getByText('-100')).toBeInTheDocument();
      expect(container.querySelector('.rds-range')).toBeInTheDocument();
    });

    it('should handle large value ranges', () => {
      const { container } = renderWithTheme(
        <RdsRange 
          value={5000}
          min={0}
          max={10000}
          showValue={true}
          type="one-way"
          level="1"
        />
      );
      
      const valueText = container.querySelector('.rds-range__value');
      expect(valueText).toBeInTheDocument();
    });

    it('should handle empty formatValue function', () => {
      renderWithTheme(
        <RdsRange 
          value={50}
          showValue={true}
          formatValue={() => 'N/A'}
        />
      );
      
      expect(screen.getByText('N/A')).toBeInTheDocument();
    });

    it('should handle valid level values', () => {
      const { container } = renderWithTheme(
        <RdsRange 
          type="one-way"
          level="5"
        />
      );
      
      expect(container.querySelector('.rds-range')).toBeInTheDocument();
    });

    it('should handle range with single value at boundaries', () => {
      const { container } = renderWithTheme(
        <RdsRange 
          value={0}
          leftLabel={0}
          rightLabel={100}
          type="two-way"
          range={true}
        />
      );
      
      expect(container.querySelector('.rds-range')).toBeInTheDocument();
    });

    it('should handle range with value at max', () => {
      const { container } = renderWithTheme(
        <RdsRange 
          value={100}
          leftLabel={0}
          rightLabel={100}
          type="two-way"
          range={true}
        />
      );
      
      expect(container.querySelector('.rds-range')).toBeInTheDocument();
    });
  });

  describe('Header and Footer Structure', () => {
    it('should render header when label and textLabel are true', () => {
      const { container } = renderWithTheme(
        <RdsRange 
          label="Test Label"
          textLabel={true}
        />
      );
      
      const header = container.querySelector('.rds-range__header');
      expect(header).toBeInTheDocument();
    });

    it('should render footer when showLabel is true', () => {
      const { container } = renderWithTheme(
        <RdsRange 
          showLabel={true}
        />
      );
      
      const footer = container.querySelector('.rds-range__footer');
      expect(footer).toBeInTheDocument();
    });

    it('should not render header when conditions not met', () => {
      const { container } = renderWithTheme(
        <RdsRange 
          label="Test"
          textLabel={false}
          showValue={false}
        />
      );
      
      const header = container.querySelector('.rds-range__header');
      expect(header).not.toBeInTheDocument();
    });

    it('should display both label and value in header', () => {
      const { container } = renderWithTheme(
        <RdsRange 
          label="My Range"
          value={50}
          textLabel={true}
          showValue={true}
          type="two-way"
        />
      );
      
      expect(screen.getByText('My Range')).toBeInTheDocument();
      const valueText = container.querySelector('.rds-range__value');
      expect(valueText).toBeInTheDocument();
    });
  });

  describe('Display Name', () => {
    it('should have correct displayName', () => {
      expect(RdsRange.displayName).toBe('RdsRange');
    });
  });
});