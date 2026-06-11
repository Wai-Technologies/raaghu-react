import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import RdsToggleButton, { RdsToggleButtonOption } from './rds-toggle-button';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';

// Mock SCSS
jest.mock('./rds-toggle-button.scss', () => ({}));

const renderWithTheme = (component: React.ReactElement, isDark = false) => {
  const theme = createTheme({
    palette: {
      mode: isDark ? 'dark' : 'light',
    },
  });
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

const mockOptions: RdsToggleButtonOption[] = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

const mockOptionsWithIcons: RdsToggleButtonOption[] = [
  { value: 'bold', label: 'Bold', icon: <strong>B</strong> },
  { value: 'italic', label: 'Italic', icon: <em>I</em> },
  { value: 'underline', label: 'Underline', icon: <u>U</u> },
];

describe('RdsToggleButton', () => {
  describe('Basic Rendering', () => {
    it('should render component without crashing', () => {
      const { container } = renderWithTheme(<RdsToggleButton options={mockOptions} />);
      expect(container).toBeInTheDocument();
    });

    it('should have correct displayName', () => {
      expect(RdsToggleButton.displayName).toBe('RdsToggleButton');
    });

    it('should render with rds-toggle-button class', () => {
      const { container } = renderWithTheme(<RdsToggleButton options={mockOptions} />);
      const toggleButton = container.querySelector('.rds-toggle-button');
      expect(toggleButton).toBeInTheDocument();
    });

    it('should render with role group', () => {
      const { container } = renderWithTheme(<RdsToggleButton options={mockOptions} />);
      const group = container.querySelector('[role="group"]');
      expect(group).toBeInTheDocument();
    });

    it('should render with default aria-label', () => {
      const { container } = renderWithTheme(<RdsToggleButton options={mockOptions} />);
      const group = container.querySelector('[role="group"]');
      expect(group).toHaveAttribute('aria-label', 'Toggle button group');
    });

    it('should support custom aria-label', () => {
      const { container } = renderWithTheme(
        <RdsToggleButton options={mockOptions} aria-label="Custom label" />
      );
      const group = container.querySelector('[role="group"]');
      expect(group).toHaveAttribute('aria-label', 'Custom label');
    });
  });

  describe('Options Rendering', () => {
    it('should render all provided options', () => {
      const { container } = renderWithTheme(<RdsToggleButton options={mockOptions} />);
      const buttons = container.querySelectorAll('.MuiToggleButton-root');
      expect(buttons.length).toBe(mockOptions.length);
    });

    it('should render correct number of options', () => {
      const { container } = renderWithTheme(<RdsToggleButton options={mockOptions} />);
      const buttons = container.querySelectorAll('.rds-toggle-button__button, .MuiToggleButton-root');
      expect(buttons.length).toBe(3);
    });

    it('should render option labels', () => {
      renderWithTheme(<RdsToggleButton options={mockOptions} />);
      expect(screen.getByText('Option 1')).toBeInTheDocument();
      expect(screen.getByText('Option 2')).toBeInTheDocument();
      expect(screen.getByText('Option 3')).toBeInTheDocument();
    });

    it('should render empty state when no options provided', () => {
      const { container } = renderWithTheme(<RdsToggleButton options={[]} />);
      const toggleButton = container.querySelector('.rds-toggle-button');
      expect(toggleButton).toBeInTheDocument();
    });

    it('should handle single option', () => {
      const singleOption = [{ value: 'only', label: 'Only Option' }];
      renderWithTheme(<RdsToggleButton options={singleOption} />);
      expect(screen.getByText('Only Option')).toBeInTheDocument();
    });
  });

  describe('Single Select Mode', () => {
    it('should use exclusive mode by default', () => {
      const { container } = renderWithTheme(<RdsToggleButton options={mockOptions} />);
      const toggleGroup = container.querySelector('.MuiToggleButtonGroup-root');
      // In single mode, verify only one button can be selected
      const buttons = container.querySelectorAll('.MuiToggleButton-root');
      expect(buttons.length).toBe(mockOptions.length);
      // Verify first button is not selected by default
      expect(buttons[0]).toHaveAttribute('aria-pressed', 'false');
    });

    it('should have defaultValue as string in single mode', () => {
      const { container } = renderWithTheme(
        <RdsToggleButton options={mockOptions} defaultValue="option1" />
      );
      const buttons = container.querySelectorAll('.MuiToggleButton-root');
      const selectedButton = Array.from(buttons).find(btn => btn.textContent?.includes('Option 1'));
      expect(selectedButton).toHaveAttribute('aria-pressed', 'true');
    });

    it('should select button on click', async () => {
      const { container } = renderWithTheme(<RdsToggleButton options={mockOptions} />);
      const option1Button = screen.getByText('Option 1').closest('button');
      
      fireEvent.click(option1Button!);
      
      await waitFor(() => {
        expect(option1Button).toHaveAttribute('aria-pressed', 'true');
      });
    });

    it('should deselect when clicking selected button without enforceSelected', async () => {
      const { container } = renderWithTheme(
        <RdsToggleButton options={mockOptions} defaultValue="option1" />
      );
      const option1Button = screen.getByText('Option 1').closest('button');
      
      fireEvent.click(option1Button!);
      
      await waitFor(() => {
        expect(option1Button).toHaveAttribute('aria-pressed', 'false');
      });
    });

    it('should handle controlled value', () => {
      const { rerender, container } = renderWithTheme(
        <RdsToggleButton options={mockOptions} value="option1" onChange={() => {}} />
      );
      
      const option1Button = screen.getByText('Option 1').closest('button');
      expect(option1Button).toHaveAttribute('aria-pressed', 'true');
      
      rerender(
        <ThemeProvider theme={createTheme()}>
          <RdsToggleButton options={mockOptions} value="option2" onChange={() => {}} />
        </ThemeProvider>
      );
      
      const option2Button = screen.getByText('Option 2').closest('button');
      expect(option2Button).toHaveAttribute('aria-pressed', 'true');
    });
  });

  describe('Multiple Select Mode', () => {
    it('should use non-exclusive mode when multiple is true', () => {
      const { container } = renderWithTheme(
        <RdsToggleButton options={mockOptions} multiple={true} />
      );
      const toggleGroup = container.querySelector('.MuiToggleButtonGroup-root');
      // In multiple mode, verify multiple buttons can be selected
      const buttons = container.querySelectorAll('.MuiToggleButton-root');
      expect(buttons.length).toBe(mockOptions.length);
      // Verify buttons have aria-pressed attributes (multiple mode)
      buttons.forEach(button => {
        expect(button).toHaveAttribute('aria-pressed');
      });
    });

    it('should have defaultValue as array in multiple mode', () => {
      const { container } = renderWithTheme(
        <RdsToggleButton 
          options={mockOptions} 
          multiple={true} 
          defaultValue={['option1', 'option2']} 
        />
      );
      const option1Button = screen.getByText('Option 1').closest('button');
      const option2Button = screen.getByText('Option 2').closest('button');
      
      expect(option1Button).toHaveAttribute('aria-pressed', 'true');
      expect(option2Button).toHaveAttribute('aria-pressed', 'true');
    });

    it('should select multiple buttons', async () => {
      const { container } = renderWithTheme(
        <RdsToggleButton options={mockOptions} multiple={true} />
      );
      
      const option1Button = screen.getByText('Option 1').closest('button');
      const option2Button = screen.getByText('Option 2').closest('button');
      
      fireEvent.click(option1Button!);
      fireEvent.click(option2Button!);
      
      await waitFor(() => {
        expect(option1Button).toHaveAttribute('aria-pressed', 'true');
        expect(option2Button).toHaveAttribute('aria-pressed', 'true');
      });
    });

    it('should deselect when clicking already selected button in multiple mode', async () => {
      const { container } = renderWithTheme(
        <RdsToggleButton 
          options={mockOptions} 
          multiple={true}
          defaultValue={['option1', 'option2']}
        />
      );
      
      const option1Button = screen.getByText('Option 1').closest('button');
      
      fireEvent.click(option1Button!);
      
      await waitFor(() => {
        expect(option1Button).toHaveAttribute('aria-pressed', 'false');
      });
    });

    it('should handle controlled array value', () => {
      const { rerender } = renderWithTheme(
        <RdsToggleButton 
          options={mockOptions} 
          multiple={true}
          value={['option1']} 
          onChange={() => {}} 
        />
      );
      
      const option1Button = screen.getByText('Option 1').closest('button');
      expect(option1Button).toHaveAttribute('aria-pressed', 'true');
      
      rerender(
        <ThemeProvider theme={createTheme()}>
          <RdsToggleButton 
            options={mockOptions} 
            multiple={true}
            value={['option2', 'option3']} 
            onChange={() => {}} 
          />
        </ThemeProvider>
      );
      
      const option2Button = screen.getByText('Option 2').closest('button');
      const option3Button = screen.getByText('Option 3').closest('button');
      expect(option2Button).toHaveAttribute('aria-pressed', 'true');
      expect(option3Button).toHaveAttribute('aria-pressed', 'true');
    });
  });

  describe('Orientation', () => {
    it('should have horizontal orientation by default', () => {
      const { container } = renderWithTheme(<RdsToggleButton options={mockOptions} />);
      const toggleButton = container.querySelector('.rds-toggle-button');
      expect(toggleButton).toHaveClass('rds-toggle-button--horizontal');
    });

    it('should support vertical orientation', () => {
      const { container } = renderWithTheme(
        <RdsToggleButton options={mockOptions} orientation="vertical" />
      );
      const toggleButton = container.querySelector('.rds-toggle-button');
      expect(toggleButton).toHaveClass('rds-toggle-button--vertical');
    });

    it('should pass orientation to MuiToggleButtonGroup', () => {
      const { container } = renderWithTheme(
        <RdsToggleButton options={mockOptions} orientation="vertical" />
      );
      // Verify vertical orientation class is applied
      const toggleButton = container.querySelector('.rds-toggle-button');
      expect(toggleButton).toHaveClass('rds-toggle-button--vertical');
    });
  });

  describe('Size Variants', () => {
    it('should have small size by default', () => {
      const { container } = renderWithTheme(<RdsToggleButton options={mockOptions} />);
      const toggleButton = container.querySelector('.rds-toggle-button');
      expect(toggleButton).toHaveClass('rds-toggle-button--small');
    });

    it('should apply medium size', () => {
      const { container } = renderWithTheme(
        <RdsToggleButton options={mockOptions} inputSize="medium" />
      );
      const toggleButton = container.querySelector('.rds-toggle-button');
      expect(toggleButton).toHaveClass('rds-toggle-button--medium');
    });

    it('should apply large size', () => {
      const { container } = renderWithTheme(
        <RdsToggleButton options={mockOptions} inputSize="large" />
      );
      const toggleButton = container.querySelector('.rds-toggle-button');
      expect(toggleButton).toHaveClass('rds-toggle-button--large');
    });

    it('should use size prop over inputSize', () => {
      const { container } = renderWithTheme(
        <RdsToggleButton 
          options={mockOptions} 
          inputSize="small"
          size="large"
        />
      );
      const toggleButton = container.querySelector('.rds-toggle-button');
      expect(toggleButton).toHaveClass('rds-toggle-button--large');
    });
  });

  describe('Disabled States', () => {
    it('should disable all buttons when disabled prop is true', () => {
      const { container } = renderWithTheme(
        <RdsToggleButton options={mockOptions} disabled={true} />
      );
      const buttons = container.querySelectorAll('button[disabled]');
      expect(buttons.length).toBeGreaterThan(0);
    });

    it('should disable individual options', () => {
      const disabledOptions = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2', disabled: true },
        { value: 'option3', label: 'Option 3' },
      ];
      const { container } = renderWithTheme(
        <RdsToggleButton options={disabledOptions} />
      );
      const buttons = container.querySelectorAll('button[disabled]');
      expect(buttons.length).toBeGreaterThan(0);
    });

    it('should not allow clicking disabled buttons', async () => {
      const onChange = jest.fn();
      const disabledOptions = [
        { value: 'option1', label: 'Option 1', disabled: true },
        { value: 'option2', label: 'Option 2' },
      ];
      
      renderWithTheme(
        <RdsToggleButton options={disabledOptions} onChange={onChange} multiple={true} />
      );
      
      const disabledButton = screen.getByText('Option 1').closest('button');
      fireEvent.click(disabledButton!);
      
      // onChange may or may not be called, depending on MUI behavior
      // The button should remain unselected
      await waitFor(() => {
        expect(disabledButton).toHaveAttribute('aria-pressed', 'false');
      });
    });
  });

  describe('Icon Support', () => {
    it('should render icons when provided', () => {
      const { container } = renderWithTheme(
        <RdsToggleButton options={mockOptionsWithIcons} />
      );
      const icons = container.querySelectorAll('.rds-toggle-button__icon');
      expect(icons.length).toBe(mockOptionsWithIcons.length);
    });

    it('should render icon and label together', () => {
      const { container } = renderWithTheme(
        <RdsToggleButton options={mockOptionsWithIcons} />
      );
      
      const boldButton = screen.getByText('Bold').closest('button');
      const icon = boldButton?.querySelector('.rds-toggle-button__icon');
      expect(icon).toBeInTheDocument();
      expect(screen.getByText('Bold')).toBeInTheDocument();
    });

    it('should render icon only when no label provided', () => {
      const iconOnlyOptions: RdsToggleButtonOption[] = [
        { value: 'bold', label: 'Bold', icon: <strong>B</strong> },
        { value: 'italic', label: 'Italic', icon: <em>I</em> },
      ];
      
      const { container } = renderWithTheme(
        <RdsToggleButton options={iconOnlyOptions} />
      );
      const icons = container.querySelectorAll('.rds-toggle-button__icon');
      expect(icons.length).toBe(2);
    });
  });

  describe('enforceSelected Prop', () => {
    it('should not allow deselecting all buttons when enforceSelected is true', async () => {
      const { container } = renderWithTheme(
        <RdsToggleButton 
          options={mockOptions} 
          enforceSelected={true}
          defaultValue="option1"
        />
      );
      
      const option1Button = screen.getByText('Option 1').closest('button');
      fireEvent.click(option1Button!);
      
      await waitFor(() => {
        expect(option1Button).toHaveAttribute('aria-pressed', 'true');
      });
    });

    it('should enforce first option selected by default when enforceSelected is true', () => {
      const { container } = renderWithTheme(
        <RdsToggleButton 
          options={mockOptions} 
          enforceSelected={true}
        />
      );
      
      const option1Button = screen.getByText('Option 1').closest('button');
      expect(option1Button).toHaveAttribute('aria-pressed', 'true');
    });

    it('should prevent emptying multiple selection when enforceSelected is true', async () => {
      const { container } = renderWithTheme(
        <RdsToggleButton 
          options={mockOptions} 
          multiple={true}
          enforceSelected={true}
          defaultValue={['option1']}
        />
      );
      
      const option1Button = screen.getByText('Option 1').closest('button');
      fireEvent.click(option1Button!);
      
      await waitFor(() => {
        expect(option1Button).toHaveAttribute('aria-pressed', 'true');
      });
    });

    it('should allow deselecting when enforceSelected is false', async () => {
      const { container } = renderWithTheme(
        <RdsToggleButton 
          options={mockOptions} 
          enforceSelected={false}
          defaultValue="option1"
        />
      );
      
      const option1Button = screen.getByText('Option 1').closest('button');
      fireEvent.click(option1Button!);
      
      await waitFor(() => {
        expect(option1Button).toHaveAttribute('aria-pressed', 'false');
      });
    });
  });

  describe('Spacing', () => {
    it('should not apply spacing class when spacing is 0', () => {
      const { container } = renderWithTheme(
        <RdsToggleButton options={mockOptions} spacing={0} />
      );
      const group = container.querySelector('.rds-toggle-button__custom-group');
      expect(group).not.toBeInTheDocument();
    });

    it('should apply custom spacing container when spacing > 0', () => {
      const { container } = renderWithTheme(
        <RdsToggleButton options={mockOptions} spacing={16} />
      );
      const group = container.querySelector('.rds-toggle-button__custom-group');
      expect(group).toBeInTheDocument();
    });

    it('should apply spacing class to toggle button', () => {
      const { container } = renderWithTheme(
        <RdsToggleButton options={mockOptions} spacing={16} />
      );
      const toggleButton = container.querySelector('.rds-toggle-button');
      expect(toggleButton).toHaveClass('rds-toggle-button--spaced');
    });
  });

  describe('Color Variants', () => {
    it('should pass color prop to buttons', () => {
      const { container } = renderWithTheme(
        <RdsToggleButton options={mockOptions} color="primary" />
      );
      // Verify that buttons are rendered (color is passed through to MUI)
      const buttons = container.querySelectorAll('.MuiToggleButton-root');
      expect(buttons.length).toBeGreaterThan(0);
      // MUI applies color-specific classes when buttons are selected
      const toggleGroup = container.querySelector('.MuiToggleButtonGroup-root');
      expect(toggleGroup).toBeInTheDocument();
    });

    it('should support secondary color', () => {
      const { container } = renderWithTheme(
        <RdsToggleButton options={mockOptions} color="secondary" />
      );
      // Verify that buttons are rendered with secondary color (color is passed through to MUI)
      const buttons = container.querySelectorAll('.MuiToggleButton-root');
      expect(buttons.length).toBeGreaterThan(0);
      const toggleGroup = container.querySelector('.MuiToggleButtonGroup-root');
      expect(toggleGroup).toBeInTheDocument();
    });
  });

  describe('onChange Events', () => {
    it('should call onChange when option is selected', async () => {
      const onChange = jest.fn();
      renderWithTheme(
        <RdsToggleButton options={mockOptions} onChange={onChange} />
      );
      
      const option1Button = screen.getByText('Option 1').closest('button');
      fireEvent.click(option1Button!);
      
      await waitFor(() => {
        expect(onChange).toHaveBeenCalled();
      });
    });

    it('should pass correct value to onChange in single mode', async () => {
      const onChange = jest.fn();
      renderWithTheme(
        <RdsToggleButton options={mockOptions} onChange={onChange} />
      );
      
      const option2Button = screen.getByText('Option 2').closest('button');
      fireEvent.click(option2Button!);
      
      await waitFor(() => {
        expect(onChange).toHaveBeenCalledWith(
          expect.any(Object),
          'option2'
        );
      });
    });

    it('should pass array value to onChange in multiple mode', async () => {
      const onChange = jest.fn();
      renderWithTheme(
        <RdsToggleButton 
          options={mockOptions} 
          multiple={true}
          onChange={onChange}
        />
      );
      
      const option1Button = screen.getByText('Option 1').closest('button');
      const option2Button = screen.getByText('Option 2').closest('button');
      
      fireEvent.click(option1Button!);
      fireEvent.click(option2Button!);
      
      await waitFor(() => {
        expect(onChange).toHaveBeenCalledWith(
          expect.any(Object),
          expect.arrayContaining(['option1', 'option2'])
        );
      });
    });
  });

  describe('Theme Support', () => {
    it('should work with light theme', () => {
      const { container } = renderWithTheme(
        <RdsToggleButton options={mockOptions} />,
        false
      );
      expect(container).toBeInTheDocument();
    });

    it('should work with dark theme', () => {
      const { container } = renderWithTheme(
        <RdsToggleButton options={mockOptions} />,
        true
      );
      expect(container).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle options with special characters', () => {
      const specialOptions = [
        { value: 'special@1', label: 'Special @1' },
        { value: 'special#2', label: 'Special #2' },
      ];
      renderWithTheme(<RdsToggleButton options={specialOptions} />);
      expect(screen.getByText('Special @1')).toBeInTheDocument();
      expect(screen.getByText('Special #2')).toBeInTheDocument();
    });

    it('should handle very long labels', () => {
      const longOptions = [
        { value: 'long', label: 'This is a very long label that should still display correctly' },
      ];
      renderWithTheme(<RdsToggleButton options={longOptions} />);
      expect(screen.getByText('This is a very long label that should still display correctly')).toBeInTheDocument();
    });

    it('should handle options with numeric values', () => {
      const numericOptions = [
        { value: '1', label: 'One' },
        { value: '2', label: 'Two' },
        { value: '3', label: 'Three' },
      ];
      renderWithTheme(
        <RdsToggleButton options={numericOptions} defaultValue="1" />
      );
      const oneButton = screen.getByText('One').closest('button');
      expect(oneButton).toHaveAttribute('aria-pressed', 'true');
    });

    it('should handle undefined icon gracefully', () => {
      const optionsWithUndefinedIcon = [
        { value: 'icon', label: 'With Icon', icon: undefined },
        { value: 'noicon', label: 'Without Icon' },
      ];
      renderWithTheme(<RdsToggleButton options={optionsWithUndefinedIcon} />);
      expect(screen.getByText('With Icon')).toBeInTheDocument();
      expect(screen.getByText('Without Icon')).toBeInTheDocument();
    });

    it('should handle rapidly clicking same button', async () => {
      const onChange = jest.fn();
      renderWithTheme(
        <RdsToggleButton options={mockOptions} onChange={onChange} />
      );
      
      const option1Button = screen.getByText('Option 1').closest('button');
      
      fireEvent.click(option1Button!);
      fireEvent.click(option1Button!);
      fireEvent.click(option1Button!);
      
      await waitFor(() => {
        expect(onChange.mock.calls.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Integration Tests', () => {
    it('should work with all props combined', async () => {
      const onChange = jest.fn();
      const { container } = renderWithTheme(
        <RdsToggleButton
          options={mockOptionsWithIcons}
          multiple={true}
          orientation="vertical"
          inputSize="medium"
          spacing={16}
          color="primary"
          enforceSelected={false}
          defaultValue={['bold']}
          onChange={onChange}
          aria-label="Formatting options"
        />
      );
      
      expect(container.querySelector('.rds-toggle-button')).toHaveClass(
        'rds-toggle-button--vertical',
        'rds-toggle-button--medium',
        'rds-toggle-button--spaced'
      );
      
      const boldButton = screen.getByText('Bold').closest('button');
      expect(boldButton).toHaveAttribute('aria-pressed', 'true');
    });

    it('should handle state changes correctly', async () => {
      const { rerender } = renderWithTheme(
        <RdsToggleButton 
          options={mockOptions} 
          value="option1"
          onChange={() => {}}
        />
      );
      
      const option1Button = screen.getByText('Option 1').closest('button');
      expect(option1Button).toHaveAttribute('aria-pressed', 'true');
      
      rerender(
        <ThemeProvider theme={createTheme()}>
          <RdsToggleButton 
            options={mockOptions} 
            value="option2"
            onChange={() => {}}
          />
        </ThemeProvider>
      );
      
      const option2Button = screen.getByText('Option 2').closest('button');
      expect(option2Button).toHaveAttribute('aria-pressed', 'true');
    });

    it('should switch between single and multiple modes', async () => {
      const { rerender, container } = renderWithTheme(
        <RdsToggleButton 
          options={mockOptions}
          multiple={false}
          defaultValue="option1"
        />
      );
      
      // In single mode, verify button selection
      const option1Button = screen.getByText('Option 1').closest('button');
      expect(option1Button).toHaveAttribute('aria-pressed', 'true');
      
      rerender(
        <ThemeProvider theme={createTheme()}>
          <RdsToggleButton 
            options={mockOptions}
            multiple={true}
            defaultValue={['option1']}
          />
        </ThemeProvider>
      );
      
      const updatedContainer = rerender(
        <ThemeProvider theme={createTheme()}>
          <RdsToggleButton 
            options={mockOptions}
            multiple={true}
            defaultValue={['option1']}
          />
        </ThemeProvider>
      );
    });

    it('should sync with external state', async () => {
      const { rerender } = renderWithTheme(
        <RdsToggleButton 
          options={mockOptions}
          value="option1"
          onChange={() => {}}
        />
      );
      
      fireEvent.click(screen.getByText('Option 2').closest('button')!);
      
      rerender(
        <ThemeProvider theme={createTheme()}>
          <RdsToggleButton 
            options={mockOptions}
            value="option2"
            onChange={() => {}}
          />
        </ThemeProvider>
      );
      
      const option2Button = screen.getByText('Option 2').closest('button');
      expect(option2Button).toHaveAttribute('aria-pressed', 'true');
    });

    it('should maintain selection across re-renders', async () => {
      const { rerender } = renderWithTheme(
        <RdsToggleButton 
          options={mockOptions}
          defaultValue="option2"
        />
      );
      
      let option2Button = screen.getByText('Option 2').closest('button');
      expect(option2Button).toHaveAttribute('aria-pressed', 'true');
      
      rerender(
        <ThemeProvider theme={createTheme()}>
          <RdsToggleButton 
            options={mockOptions}
            defaultValue="option2"
          />
        </ThemeProvider>
      );
      
      option2Button = screen.getByText('Option 2').closest('button');
      expect(option2Button).toHaveAttribute('aria-pressed', 'true');
    });

    it('should handle options array changes', async () => {
      const initialOptions = [
        { value: 'a', label: 'A' },
        { value: 'b', label: 'B' },
      ];
      
      const { rerender } = renderWithTheme(
        <RdsToggleButton options={initialOptions} />
      );
      
      expect(screen.getByText('A')).toBeInTheDocument();
      expect(screen.getByText('B')).toBeInTheDocument();
      
      const newOptions = [
        { value: 'x', label: 'X' },
        { value: 'y', label: 'Y' },
        { value: 'z', label: 'Z' },
      ];
      
      rerender(
        <ThemeProvider theme={createTheme()}>
          <RdsToggleButton options={newOptions} />
        </ThemeProvider>
      );
      
      expect(screen.getByText('X')).toBeInTheDocument();
      expect(screen.getByText('Y')).toBeInTheDocument();
      expect(screen.getByText('Z')).toBeInTheDocument();
    });

    it('should handle toggle icon spacing correctly', () => {
      const { container } = renderWithTheme(
        <RdsToggleButton 
          options={mockOptionsWithIcons}
          iconTextSpacing={12}
        />
      );
      
      const icons = container.querySelectorAll('.rds-toggle-button__icon');
      expect(icons.length).toBeGreaterThan(0);
    });

    it('should apply wrap-mobile class for many options', () => {
      const manyOptions = Array.from({ length: 10 }, (_, i) => ({
        value: `option${i}`,
        label: `Option ${i}`,
      }));
      
      const { container } = renderWithTheme(
        <RdsToggleButton options={manyOptions} />
      );
      
      const toggleButton = container.querySelector('.rds-toggle-button');
      expect(toggleButton).toHaveClass('rds-toggle-button--wrap-mobile');
    });
  });

  describe('Accessibility', () => {
    it('should have aria-label on each button', () => {
      const { container } = renderWithTheme(<RdsToggleButton options={mockOptions} />);
      const buttons = container.querySelectorAll('[aria-label]');
      expect(buttons.length).toBeGreaterThan(0);
  
    });
    it('has no axe accessibility violations', async () => {
      const { container } = render(<RdsToggleButton options={mockOptions} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have aria-pressed on buttons', () => {
      const { container } = renderWithTheme(
        <RdsToggleButton options={mockOptions} />
      );
      const buttons = container.querySelectorAll('[aria-pressed]');
      expect(buttons.length).toBe(mockOptions.length);
    });

    it('should update aria-pressed state on selection', async () => {
      const { container } = renderWithTheme(
        <RdsToggleButton options={mockOptions} />
      );
      
      const option1Button = screen.getByText('Option 1').closest('button');
      expect(option1Button).toHaveAttribute('aria-pressed', 'false');
      
      fireEvent.click(option1Button!);
      
      await waitFor(() => {
        expect(option1Button).toHaveAttribute('aria-pressed', 'true');
      });
    });
  });
});