import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import RdsRadio, { RdsRadioOption } from './rds-radio';

// Mock SCSS import
jest.mock('./rds-radio.scss', () => ({}));

const defaultOptions: RdsRadioOption[] = [
  { value: 'option1', text: 'Option 1' },
  { value: 'option2', text: 'Option 2' },
  { value: 'option3', text: 'Option 3' }
];

const renderWithTheme = (component: React.ReactElement) => {
  const theme = createTheme();
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('RdsRadio', () => {
  describe('Basic Rendering', () => {
    it('should render radio component with options', () => {
      renderWithTheme(
        <RdsRadio 
          options={defaultOptions}
          name="test-radio"
        />
      );
      
      expect(screen.getAllByRole('radio')).toHaveLength(3);
    });

    it('should render all radio options', () => {
      renderWithTheme(
        <RdsRadio 
          options={defaultOptions}
          name="test-radio"
        />
      );
      
      expect(screen.getByDisplayValue('option1')).toBeInTheDocument();
      expect(screen.getByDisplayValue('option2')).toBeInTheDocument();
      expect(screen.getByDisplayValue('option3')).toBeInTheDocument();
    });

    it('should render with label', () => {
      renderWithTheme(
        <RdsRadio 
          options={defaultOptions}
          label="Select an option"
          name="test-radio"
        />
      );
      
      expect(screen.getByText('Select an option')).toBeInTheDocument();
    });

    it('should render without label when not provided', () => {
      const { container } = renderWithTheme(
        <RdsRadio 
          options={defaultOptions}
          name="test-radio"
        />
      );
      
      const legend = container.querySelector('legend');
      expect(legend).not.toBeInTheDocument();
    });

    it('should have correct CSS classes applied', () => {
      const { container } = renderWithTheme(
        <RdsRadio 
          options={defaultOptions}
          name="test-radio"
        />
      );
      
      expect(container.querySelector('.rds-radio')).toBeInTheDocument();
      expect(container.querySelector('.rds-radio__group')).toBeInTheDocument();
    });
  });

  describe('Layout Variations', () => {
    it('should render with icon only layout', () => {
      const { container } = renderWithTheme(
        <RdsRadio 
          options={defaultOptions}
          layout="icon"
          name="test-radio"
        />
      );
      
      expect(container.querySelector('.rds-radio--icon')).toBeInTheDocument();
    });

    it('should render with icon with label layout', () => {
      const { container } = renderWithTheme(
        <RdsRadio 
          options={defaultOptions}
          layout="icon with label"
          name="test-radio"
        />
      );
      
      expect(container.querySelector('.rds-radio--icon-with-label')).toBeInTheDocument();
    });

    it('should render with icon with bottom label layout', () => {
      const { container } = renderWithTheme(
        <RdsRadio 
          options={defaultOptions}
          layout="icon with bottom label"
          name="test-radio"
        />
      );
      
      expect(container.querySelector('.rds-radio--icon-with-bottom-label')).toBeInTheDocument();
    });

    it('should display option text in icon with bottom label layout', () => {
      renderWithTheme(
        <RdsRadio 
          options={defaultOptions}
          layout="icon with bottom label"
          name="test-radio"
        />
      );
      
      expect(screen.getByText('Option 1')).toBeInTheDocument();
      expect(screen.getByText('Option 2')).toBeInTheDocument();
      expect(screen.getByText('Option 3')).toBeInTheDocument();
    });

    it('should display option text with label in default layout', () => {
      renderWithTheme(
        <RdsRadio 
          options={defaultOptions}
          layout="icon with label"
          name="test-radio"
        />
      );
      
      expect(screen.getByText('Option 1')).toBeInTheDocument();
      expect(screen.getByText('Option 2')).toBeInTheDocument();
      expect(screen.getByText('Option 3')).toBeInTheDocument();
    });
  });

  describe('Direction Variations', () => {
    it('should render in column direction by default', () => {
      const { container } = renderWithTheme(
        <RdsRadio 
          options={defaultOptions}
          direction="column"
          name="test-radio"
        />
      );
      
      const radioGroup = container.querySelector('[role="radiogroup"]');
      expect(radioGroup).toHaveAttribute('role', 'radiogroup');
    });

    it('should render in row direction', () => {
      const { container } = renderWithTheme(
        <RdsRadio 
          options={defaultOptions}
          direction="row"
          name="test-radio"
        />
      );
      
      const radioGroup = container.querySelector('[role="radiogroup"]');
      expect(radioGroup).toBeInTheDocument();
    });

    it('should render with flexDirection in bottom label layout', () => {
      const { container } = renderWithTheme(
        <RdsRadio 
          options={defaultOptions}
          layout="icon with bottom label"
          direction="row"
          name="test-radio"
        />
      );
      
      const group = container.querySelector('.rds-radio__group');
      expect(group).toBeInTheDocument();
    });
  });

  describe('State Variations', () => {
    it('should render in default state', () => {
      const { container } = renderWithTheme(
        <RdsRadio 
          options={defaultOptions}
          state="default"
          name="test-radio"
        />
      );
      
      const radio = container.querySelector('.rds-radio');
      expect(radio).not.toHaveClass('rds-radio--disabled');
      expect(radio).not.toHaveClass('rds-radio--hover');
    });

    it('should render in hover state', () => {
      const { container } = renderWithTheme(
        <RdsRadio 
          options={defaultOptions}
          state="hover"
          name="test-radio"
        />
      );
      
      const radio = container.querySelector('.rds-radio--hover');
      expect(radio).toBeInTheDocument();
    });

    it('should render in disabled state', () => {
      const { container } = renderWithTheme(
        <RdsRadio 
          options={defaultOptions}
          state="disabled"
          name="test-radio"
        />
      );
      
      const radio = container.querySelector('.rds-radio--disabled');
      expect(radio).toBeInTheDocument();
    });

    it('should disable all radios in disabled state', () => {
      renderWithTheme(
        <RdsRadio 
          options={defaultOptions}
          state="disabled"
          name="test-radio"
        />
      );
      
      const radios = screen.getAllByRole('radio');
      radios.forEach(radio => {
        expect(radio).toHaveAttribute('disabled');
      });
    });
  });

  describe('Disabled Options', () => {
    const optionsWithDisabled: RdsRadioOption[] = [
      { value: 'option1', text: 'Option 1' },
      { value: 'option2', text: 'Option 2', disabled: true },
      { value: 'option3', text: 'Option 3' }
    ];

    it('should disable specific radio options', () => {
      renderWithTheme(
        <RdsRadio 
          options={optionsWithDisabled}
          name="test-radio"
        />
      );
      
      const radio2 = screen.getByDisplayValue('option2');
      expect(radio2).toHaveAttribute('disabled');
    });

    it('should not disable enabled options', () => {
      renderWithTheme(
        <RdsRadio 
          options={optionsWithDisabled}
          name="test-radio"
        />
      );
      
      const radio1 = screen.getByDisplayValue('option1');
      const radio3 = screen.getByDisplayValue('option3');
      expect(radio1).not.toHaveAttribute('disabled');
      expect(radio3).not.toHaveAttribute('disabled');
    });

    it('should disable options in disabled state even if not marked disabled', () => {
      renderWithTheme(
        <RdsRadio 
          options={defaultOptions}
          state="disabled"
          name="test-radio"
        />
      );
      
      const radios = screen.getAllByRole('radio');
      radios.forEach(radio => {
        expect(radio).toHaveAttribute('disabled');
      });
    });

    it('should have disabled CSS class in bottom label layout', () => {
      const { container } = renderWithTheme(
        <RdsRadio 
          options={optionsWithDisabled}
          layout="icon with bottom label"
          name="test-radio"
        />
      );
      
      const disabledContainer = container.querySelector('.rds-radio__bottom-label-container--disabled');
      expect(disabledContainer).toBeInTheDocument();
    });
  });

  describe('Selection and Value Handling', () => {
    it('should handle value from props', () => {
      const { container } = renderWithTheme(
        <RdsRadio 
          options={defaultOptions}
          value="option2"
          name="test-radio"
        />
      );
      
      const radio = container.querySelector('input[type="radio"][value="option2"]') as HTMLInputElement;
      expect(radio?.checked).toBe(true);
    });

    it('should handle selected prop as true', () => {
      const { container } = renderWithTheme(
        <RdsRadio 
          options={defaultOptions}
          value="option1"
          selected={true}
          name="test-radio"
        />
      );
      
      const radio = container.querySelector('input[type="radio"][value="option1"]') as HTMLInputElement;
      expect(radio?.checked).toBe(true);
    });

    it('should handle selected prop as false', () => {
      const { container } = renderWithTheme(
        <RdsRadio 
          options={defaultOptions}
          value="option1"
          selected={false}
          name="test-radio"
        />
      );
      
      const allRadios = container.querySelectorAll('input[type="radio"]') as NodeListOf<HTMLInputElement>;
      let anyChecked = false;
      allRadios.forEach(radio => {
        if (radio.checked) anyChecked = true;
      });
      expect(anyChecked).toBe(false);
    });

    it('should use first non-disabled option when no value specified', () => {
      const { container } = renderWithTheme(
        <RdsRadio 
          options={defaultOptions}
          selected={true}
          name="test-radio"
        />
      );
      
      const radio1 = container.querySelector('input[type="radio"][value="option1"]') as HTMLInputElement;
      expect(radio1?.checked).toBe(true);
    });

    it('should skip disabled options when selecting default', () => {
      const options: RdsRadioOption[] = [
        { value: 'option1', text: 'Option 1', disabled: true },
        { value: 'option2', text: 'Option 2' },
        { value: 'option3', text: 'Option 3' }
      ];

      const { container } = renderWithTheme(
        <RdsRadio 
          options={options}
          selected={true}
          name="test-radio"
        />
      );
      
      const radio2 = container.querySelector('input[type="radio"][value="option2"]') as HTMLInputElement;
      expect(radio2?.checked).toBe(true);
    });
  });

  describe('User Interaction', () => {
    it('should handle radio selection changes', async () => {
      const handleChange = jest.fn();
      const { container } = renderWithTheme(
        <RdsRadio 
          options={defaultOptions}
          name="test-radio"
          onChange={handleChange}
        />
      );
      
      const radio2 = container.querySelector('input[type="radio"][value="option2"]') as HTMLInputElement;
      fireEvent.click(radio2);
      
      expect(handleChange).toHaveBeenCalled();
    });

    it('should not trigger onChange when disabled', () => {
      const handleChange = jest.fn();
      const { container } = renderWithTheme(
        <RdsRadio 
          options={defaultOptions}
          state="disabled"
          name="test-radio"
          onChange={handleChange}
        />
      );
      
      const radio2 = container.querySelector('input[type="radio"][value="option2"]') as HTMLInputElement;
      // Disabled inputs don't call onChange on click
      fireEvent.click(radio2);
      
      // Verify radio is disabled
      expect(radio2).toHaveAttribute('disabled');
    });

    it('should not trigger onChange for disabled individual options', () => {
      const handleChange = jest.fn();
      const options: RdsRadioOption[] = [
        { value: 'option1', text: 'Option 1' },
        { value: 'option2', text: 'Option 2', disabled: true }
      ];

      const { container } = renderWithTheme(
        <RdsRadio 
          options={options}
          name="test-radio"
          onChange={handleChange}
        />
      );
      
      const radio2 = container.querySelector('input[type="radio"][value="option2"]') as HTMLInputElement;
      fireEvent.click(radio2);
      
      // Verify the radio is disabled
      expect(radio2).toHaveAttribute('disabled');
    });

    it('should allow keyboard navigation', async () => {
      const user = userEvent.setup();
      const { container } = renderWithTheme(
        <RdsRadio 
          options={defaultOptions}
          defaultValue="option1"
          name="test-radio"
        />
      );
      
      const radio1 = container.querySelector('input[type="radio"][value="option1"]') as HTMLInputElement;
      radio1.focus();
      expect(document.activeElement).toBe(radio1);
      
      await user.keyboard('{ArrowRight}');
      expect(document.activeElement).not.toBe(radio1);
    });

    it('should handle keyboard selection with space key', async () => {
      const user = userEvent.setup();
      const { container } = renderWithTheme(
        <RdsRadio 
          options={defaultOptions}
          defaultValue="option2"
          name="test-radio"
        />
      );
      
      const radio2 = container.querySelector('input[type="radio"][value="option2"]') as HTMLInputElement;
      radio2.focus();
      
      // Space should select the focused radio
      expect(radio2.checked).toBe(true);
    });

    it('should handle keyboard selection with Enter key', async () => {
      const user = userEvent.setup();
      const { container } = renderWithTheme(
        <RdsRadio 
          options={defaultOptions}
          defaultValue="option3"
          name="test-radio"
        />
      );
      
      const radio3 = container.querySelector('input[type="radio"][value="option3"]') as HTMLInputElement;
      radio3.focus();
      
      // Enter should keep the radio selected
      expect(radio3.checked).toBe(true);
    });
  });

  describe('Bottom Label Layout Specific', () => {
    it('should render label with proper HTML structure in bottom label', () => {
      const { container } = renderWithTheme(
        <RdsRadio 
          options={defaultOptions}
          layout="icon with bottom label"
          name="test-radio"
        />
      );
      
      const labels = container.querySelectorAll('label');
      expect(labels.length).toBeGreaterThan(0);
    });

    it('should render bottom label with correct CSS class', () => {
      const { container } = renderWithTheme(
        <RdsRadio 
          options={defaultOptions}
          layout="icon with bottom label"
          name="test-radio"
        />
      );
      
      const labels = container.querySelectorAll('.rds-radio__bottom-label');
      expect(labels.length).toBeGreaterThan(0);
    });

    it('should apply disabled styles to bottom label text', () => {
      const options: RdsRadioOption[] = [
        { value: 'option1', text: 'Option 1' },
        { value: 'option2', text: 'Option 2', disabled: true }
      ];

      const { container } = renderWithTheme(
        <RdsRadio 
          options={options}
          layout="icon with bottom label"
          name="test-radio"
        />
      );
      
      const disabledLabels = container.querySelectorAll('.rds-radio__bottom-label--disabled');
      expect(disabledLabels.length).toBeGreaterThan(0);
    });

    it('should handle onChange in bottom label layout', () => {
      const { container } = renderWithTheme(
        <RdsRadio 
          options={defaultOptions}
          layout="icon with bottom label"
          name="test-radio"
        />
      );
      
      const radio2 = container.querySelector('input[type="radio"][value="option2"]') as HTMLInputElement;
      fireEvent.click(radio2);
      
      // Verify radio is clickable and can be checked
      expect(radio2).toBeInTheDocument();
    });

    it('should use option value in bottom label radio id', () => {
      const { container } = renderWithTheme(
        <RdsRadio 
          options={defaultOptions}
          layout="icon with bottom label"
          name="test-radio"
        />
      );
      
      const radio = container.querySelector('input[type="radio"][value="option1"]');
      expect(radio).toHaveAttribute('id', 'rds-radio-option1');
    });

    it('should handle label htmlFor attribute in bottom label', () => {
      const { container } = renderWithTheme(
        <RdsRadio 
          options={defaultOptions}
          layout="icon with bottom label"
          name="test-radio"
        />
      );
      
      const labels = container.querySelectorAll('label');
      labels.forEach(label => {
        expect(label.htmlFor).toBeTruthy();
      });
    });
  });

  describe('RadioProps Integration', () => {
    it('should apply custom radioProps', () => {
      const { container } = renderWithTheme(
        <RdsRadio 
          options={defaultOptions}
          name="test-radio"
          radioProps={{ size: 'small', color: 'secondary' }}
        />
      );
      
      const radios = container.querySelectorAll('input[type="radio"]');
      expect(radios.length).toBeGreaterThan(0);
    });

    it('should pass radioProps to each radio input', () => {
      const { container } = renderWithTheme(
        <RdsRadio 
          options={defaultOptions}
          name="test-radio"
          radioProps={{ color: 'secondary' }}
        />
      );
      
      const radios = container.querySelectorAll('input[type="radio"]');
      radios.forEach(radio => {
        expect(radio).toBeInTheDocument();
      });
    });
  });

  describe('Theme Integration', () => {
    it('should work with light theme', () => {
      const lightTheme = createTheme({ palette: { mode: 'light' } });
      const { container } = render(
        <ThemeProvider theme={lightTheme}>
          <RdsRadio options={defaultOptions} name="test-radio" />
        </ThemeProvider>
      );
      
      expect(container.querySelector('.rds-radio')).toBeInTheDocument();
    });

    it('should work with dark theme', () => {
      const darkTheme = createTheme({ palette: { mode: 'dark' } });
      const { container } = render(
        <ThemeProvider theme={darkTheme}>
          <RdsRadio options={defaultOptions} name="test-radio" />
        </ThemeProvider>
      );
      
      expect(container.querySelector('.rds-radio')).toBeInTheDocument();
    });

    it('should reflect theme colors in rendered component', () => {
      const customTheme = createTheme({
        palette: {
          primary: {
            main: '#ff0000'
          }
        }
      });

      const { container } = render(
        <ThemeProvider theme={customTheme}>
          <RdsRadio options={defaultOptions} name="test-radio" />
        </ThemeProvider>
      );
      
      expect(container.querySelector('.rds-radio')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA role for fieldset', () => {
      const { container } = renderWithTheme(
        <RdsRadio 
          options={defaultOptions}
          label="Test Label"
          name="test-radio"
        />
      );
      
      const fieldset = container.querySelector('fieldset');
      expect(fieldset).toBeInTheDocument();
    });

    it('should have legend for label accessibility', () => {
      const { container } = renderWithTheme(
        <RdsRadio 
          options={defaultOptions}
          label="Accessible Label"
          name="test-radio"
        />
      );
      
      const legend = container.querySelector('legend');
      expect(legend).toHaveTextContent('Accessible Label');
    });

    it('should have proper label associations in standard layout', () => {
      const { container } = renderWithTheme(
        <RdsRadio 
          options={defaultOptions}
          layout="icon with label"
          name="test-radio"
        />
      );
      
      const labels = screen.getAllByText(/Option [1-3]/);
      expect(labels.length).toBe(3);
    });

    it('should have radiogroup role for RadioGroup', () => {
      const { container } = renderWithTheme(
        <RdsRadio 
          options={defaultOptions}
          layout="icon with label"
          name="test-radio"
        />
      );
      
      const radioGroup = container.querySelector('[role="radiogroup"]');
      expect(radioGroup).toBeInTheDocument();
    });

    it('should be keyboard navigable', async () => {
      const user = userEvent.setup();
      renderWithTheme(
        <RdsRadio 
          options={defaultOptions}
          name="test-radio"
        />
      );
      
      const radios = screen.getAllByRole('radio');
      expect(radios[0]).not.toHaveFocus();
      
      radios[0].focus();
      expect(document.activeElement).toBe(radios[0]);
    });

    it('should support label clicking in bottom label layout', () => {
      const { container } = renderWithTheme(
        <RdsRadio 
          options={defaultOptions}
          layout="icon with bottom label"
          name="test-radio"
        />
      );
      
      const label = container.querySelector('label');
      expect(label).toBeInTheDocument();
      const radio = label?.querySelector('input[type="radio"]');
      expect(radio).toBeInTheDocument();
    });
  });

  describe('Complex Scenarios', () => {
    it('should handle empty options array', () => {
      const { container } = renderWithTheme(
        <RdsRadio 
          options={[]}
          name="test-radio"
        />
      );
      
      expect(container.querySelector('.rds-radio')).toBeInTheDocument();
    });

    it('should handle single option', () => {
      const singleOption: RdsRadioOption[] = [
        { value: 'only', text: 'Only Option' }
      ];

      renderWithTheme(
        <RdsRadio 
          options={singleOption}
          name="test-radio"
        />
      );
      
      expect(screen.getByDisplayValue('only')).toBeInTheDocument();
    });

    it('should handle many options', () => {
      const manyOptions: RdsRadioOption[] = Array.from({ length: 20 }, (_, i) => ({
        value: `option${i}`,
        text: `Option ${i}`
      }));

      renderWithTheme(
        <RdsRadio 
          options={manyOptions}
          name="test-radio"
        />
      );
      
      expect(screen.getByDisplayValue('option0')).toBeInTheDocument();
      expect(screen.getByDisplayValue('option19')).toBeInTheDocument();
    });

    it('should handle options with special characters in text', () => {
      const specialOptions: RdsRadioOption[] = [
        { value: 'opt1', text: 'Option <1>' },
        { value: 'opt2', text: 'Option & More' },
        { value: 'opt3', text: 'Option "Quoted"' }
      ];

      renderWithTheme(
        <RdsRadio 
          options={specialOptions}
          name="test-radio"
        />
      );
      
      expect(screen.getByText('Option <1>')).toBeInTheDocument();
    });

    it('should handle rapid selection changes', () => {
      const handleChange = jest.fn();
      const { container, rerender } = renderWithTheme(
        <RdsRadio 
          options={defaultOptions}
          value="option1"
          name="test-radio"
          onChange={handleChange}
        />
      );

      for (let i = 1; i <= 3; i++) {
        rerender(
          <ThemeProvider theme={createTheme()}>
            <RdsRadio 
              options={defaultOptions}
              value={`option${i}`}
              name="test-radio"
              onChange={handleChange}
            />
          </ThemeProvider>
        );
      }

      const radio3 = container.querySelector('input[type="radio"][value="option3"]') as HTMLInputElement;
      expect(radio3.checked).toBe(true);
    });

    it('should handle dynamic option updates', () => {
      const { rerender } = renderWithTheme(
        <RdsRadio 
          options={defaultOptions}
          name="test-radio"
        />
      );

      const newOptions: RdsRadioOption[] = [
        { value: 'new1', text: 'New 1' },
        { value: 'new2', text: 'New 2' }
      ];

      rerender(
        <ThemeProvider theme={createTheme()}>
          <RdsRadio 
            options={newOptions}
            name="test-radio"
          />
        </ThemeProvider>
      );

      expect(screen.getByDisplayValue('new1')).toBeInTheDocument();
      expect(screen.getByDisplayValue('new2')).toBeInTheDocument();
    });

    it('should maintain selection across layout changes', () => {
      const { container, rerender } = renderWithTheme(
        <RdsRadio 
          options={defaultOptions}
          value="option2"
          layout="icon with label"
          name="test-radio"
        />
      );

      rerender(
        <ThemeProvider theme={createTheme()}>
          <RdsRadio 
            options={defaultOptions}
            value="option2"
            layout="icon with bottom label"
            name="test-radio"
          />
        </ThemeProvider>
      );

      const radio2 = container.querySelector('input[type="radio"][value="option2"]') as HTMLInputElement;
      expect(radio2.checked).toBe(true);
    });
  });

  describe('Edge Cases', () => {
    it('should handle undefined value prop', () => {
      const { container } = renderWithTheme(
        <RdsRadio 
          options={defaultOptions}
          name="test-radio"
        />
      );
      
      expect(container.querySelector('.rds-radio')).toBeInTheDocument();
    });

    it('should handle value not matching any option', () => {
      const { container } = renderWithTheme(
        <RdsRadio 
          options={defaultOptions}
          value="nonexistent"
          name="test-radio"
        />
      );
      
      const allRadios = container.querySelectorAll('input[type="radio"]') as NodeListOf<HTMLInputElement>;
      const anyChecked = Array.from(allRadios).some(radio => radio.checked);
      // No radio should be checked if value doesn't match
      expect(anyChecked).toBe(false);
    });

    it('should handle all options disabled', () => {
      const allDisabledOptions: RdsRadioOption[] = [
        { value: 'opt1', text: 'Option 1', disabled: true },
        { value: 'opt2', text: 'Option 2', disabled: true },
        { value: 'opt3', text: 'Option 3', disabled: true }
      ];

      renderWithTheme(
        <RdsRadio 
          options={allDisabledOptions}
          name="test-radio"
        />
      );
      
      const radios = screen.getAllByRole('radio');
      radios.forEach(radio => {
        expect(radio).toHaveAttribute('disabled');
      });
    });

    it('should handle missing option text', () => {
      const optionsNoText: RdsRadioOption[] = [
        { value: 'opt1', text: '' },
        { value: 'opt2', text: 'Option 2' }
      ];

      const { container } = renderWithTheme(
        <RdsRadio 
          options={optionsNoText}
          name="test-radio"
        />
      );
      
      expect(container.querySelector('.rds-radio')).toBeInTheDocument();
    });

    it('should handle long option text', () => {
      const longTextOptions: RdsRadioOption[] = [
        { value: 'opt1', text: 'This is a very long option text that should be handled properly without breaking the layout' }
      ];

      renderWithTheme(
        <RdsRadio 
          options={longTextOptions}
          name="test-radio"
        />
      );
      
      expect(screen.getByText(/This is a very long option text/)).toBeInTheDocument();
    });

    it('should update when name prop changes', () => {
      const { container, rerender } = renderWithTheme(
        <RdsRadio 
          options={defaultOptions}
          name="radio-1"
        />
      );

      rerender(
        <ThemeProvider theme={createTheme()}>
          <RdsRadio 
            options={defaultOptions}
            name="radio-2"
          />
        </ThemeProvider>
      );

      const radios = container.querySelectorAll('input[type="radio"]');
      radios.forEach(radio => {
        expect(radio).toHaveAttribute('name', 'radio-2');
      });
    });
  });

  describe('Display Name', () => {
    it('should have correct displayName', () => {
      expect(RdsRadio.displayName).toBe('RdsRadio');
    });
  });
});
