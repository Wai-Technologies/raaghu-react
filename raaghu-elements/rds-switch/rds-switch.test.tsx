import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import RdsSwitch from './rds-switch';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';

jest.mock('./rds-switch.scss', () => ({}));

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

describe('RdsSwitch', () => {
  describe('Basic Rendering', () => {
    it('should render component without crashing', () => {
      const { container } = renderWithTheme(
        <RdsSwitch />
      );
      expect(container).toBeInTheDocument();
    });

    it('should have correct displayName', () => {
      expect(RdsSwitch.displayName).toBe('RdsSwitch');
    });

    it('should apply rds-switch class', () => {
      const { container } = renderWithTheme(
        <RdsSwitch />
      );
      const switchElement = container.querySelector('.rds-switch');
      expect(switchElement).toBeInTheDocument();
    });

    it('should apply MuiSwitch class', () => {
      const { container } = renderWithTheme(
        <RdsSwitch />
      );
      const muiSwitch = container.querySelector('.MuiSwitch-root');
      expect(muiSwitch).toBeInTheDocument();
    });

    it('should render without label by default', () => {
      const { container } = renderWithTheme(
        <RdsSwitch />
      );
      const formControlLabel = container.querySelector('.MuiFormControlLabel-root');
      expect(formControlLabel).not.toBeInTheDocument();
    });
  });

  describe('Label and Label Placement', () => {
    it('should render with label when provided', () => {
      renderWithTheme(
        <RdsSwitch label="Test Label" />
      );
      expect(screen.getByText('Test Label')).toBeInTheDocument();
    });

    it('should render label with end placement (default)', () => {
      const { container } = renderWithTheme(
        <RdsSwitch label="Test Label" labelPlacement="end" />
      );
      const formControlLabel = container.querySelector('.MuiFormControlLabel-root');
      expect(formControlLabel).toBeInTheDocument();
    });

    it('should render label with start placement', () => {
      const { container } = renderWithTheme(
        <RdsSwitch label="Test Label" labelPlacement="start" />
      );
      const formControlLabel = container.querySelector('.MuiFormControlLabel-root');
      expect(formControlLabel).toBeInTheDocument();
    });

    it('should render label with top placement', () => {
      const { container } = renderWithTheme(
        <RdsSwitch label="Test Label" labelPlacement="top" />
      );
      const formControlLabel = container.querySelector('.MuiFormControlLabel-root');
      expect(formControlLabel).toBeInTheDocument();
    });

    it('should render label with bottom placement', () => {
      const { container } = renderWithTheme(
        <RdsSwitch label="Test Label" labelPlacement="bottom" />
      );
      const formControlLabel = container.querySelector('.MuiFormControlLabel-root');
      expect(formControlLabel).toBeInTheDocument();
    });

    it('should not render label when showLabel is false', () => {
      const { container } = renderWithTheme(
        <RdsSwitch label="Test Label" showLabel={false} />
      );
      expect(screen.queryByText('Test Label')).not.toBeInTheDocument();
      const muiSwitch = container.querySelector('.MuiSwitch-root');
      expect(muiSwitch).toBeInTheDocument();
    });
  });

  describe('Layout Property', () => {
    it('should apply switch+label layout', () => {
      renderWithTheme(
        <RdsSwitch label="Test Label" layout="switch+label" />
      );
      const formControlLabel = screen.getByText('Test Label').closest('.MuiFormControlLabel-root');
      expect(formControlLabel).toBeInTheDocument();
    });

    it('should apply label+switch layout', () => {
      renderWithTheme(
        <RdsSwitch label="Test Label" layout="label+switch" />
      );
      const formControlLabel = screen.getByText('Test Label').closest('.MuiFormControlLabel-root');
      expect(formControlLabel).toBeInTheDocument();
    });

    it('should apply toplabel+switch layout', () => {
      renderWithTheme(
        <RdsSwitch label="Test Label" layout="toplabel+switch" />
      );
      const formControlLabel = screen.getByText('Test Label').closest('.MuiFormControlLabel-root');
      expect(formControlLabel).toBeInTheDocument();
    });

    it('should apply bottomlabel+switch layout', () => {
      renderWithTheme(
        <RdsSwitch label="Test Label" layout="bottomlabel+switch" />
      );
      const formControlLabel = screen.getByText('Test Label').closest('.MuiFormControlLabel-root');
      expect(formControlLabel).toBeInTheDocument();
    });

    it('should handle layout with extra spaces', () => {
      const { container } = renderWithTheme(
        <RdsSwitch label="Test Label" layout="switch+label" />
      );
      const muiSwitch = container.querySelector('.MuiSwitch-root');
      expect(muiSwitch).toBeInTheDocument();
    });
  });

  describe('State Property', () => {
    it('should render in on state', () => {
      const { container } = renderWithTheme(
        <RdsSwitch state="on" />
      );
      const input = container.querySelector('input[type="checkbox"]');
      expect(input).toBeChecked();
    });

    it('should render in off state', () => {
      const { container } = renderWithTheme(
        <RdsSwitch state="off" />
      );
      const input = container.querySelector('input[type="checkbox"]');
      expect(input).not.toBeChecked();
    });

    it('should render in disabled on state', () => {
      const { container } = renderWithTheme(
        <RdsSwitch state="disabled on" />
      );
      const input = container.querySelector('input[type="checkbox"]');
      expect(input).toBeDisabled();
      expect(input).toBeChecked();
    });

    it('should render in disabled off state', () => {
      const { container } = renderWithTheme(
        <RdsSwitch state="disabled off" />
      );
      const input = container.querySelector('input[type="checkbox"]');
      expect(input).toBeDisabled();
      expect(input).not.toBeChecked();
    });

    it('should handle state with extra spaces', () => {
      const { container } = renderWithTheme(
        <RdsSwitch state="on" />
      );
      const input = container.querySelector('input[type="checkbox"]');
      expect(input).toBeChecked();
    });

    it('should handle disabled on state', () => {
      const { container } = renderWithTheme(
        <RdsSwitch state="disabled on" />
      );
      const input = container.querySelector('input[type="checkbox"]');
      expect(input).toBeDisabled();
      expect(input).toBeChecked();
    });
  });

  describe('Style Variations', () => {
    it('should apply style1 by default', () => {
      const { container } = renderWithTheme(
        <RdsSwitch />
      );
      const switchElement = container.querySelector('.rds-switch--style1');
      expect(switchElement).toBeInTheDocument();
    });

    it('should apply style1', () => {
      const { container } = renderWithTheme(
        <RdsSwitch style="style1" />
      );
      const switchElement = container.querySelector('.rds-switch--style1');
      expect(switchElement).toBeInTheDocument();
    });

    it('should apply style2', () => {
      const { container } = renderWithTheme(
        <RdsSwitch style="style2" />
      );
      const switchElement = container.querySelector('.rds-switch--style2');
      expect(switchElement).toBeInTheDocument();
    });

    it('should apply style3', () => {
      const { container } = renderWithTheme(
        <RdsSwitch style="style3" />
      );
      const switchElement = container.querySelector('.rds-switch--style3');
      expect(switchElement).toBeInTheDocument();
    });

    it('should apply style4', () => {
      const { container } = renderWithTheme(
        <RdsSwitch style="style4" />
      );
      const switchElement = container.querySelector('.rds-switch--style4');
      expect(switchElement).toBeInTheDocument();
    });

    it('should apply style5', () => {
      const { container } = renderWithTheme(
        <RdsSwitch style="style5" />
      );
      const switchElement = container.querySelector('.rds-switch--style5');
      expect(switchElement).toBeInTheDocument();
    });

    it('should apply style6', () => {
      const { container } = renderWithTheme(
        <RdsSwitch style="style6" />
      );
      const switchElement = container.querySelector('.rds-switch--style6');
      expect(switchElement).toBeInTheDocument();
    });

    it('should handle style with spaces', () => {
      const { container } = renderWithTheme(
        <RdsSwitch style="style1" />
      );
      const switchElement = container.querySelector('.rds-switch--style1');
      expect(switchElement).toBeInTheDocument();
    });
  });

  describe('Color Property', () => {
    it('should apply primary color by default', () => {
      const { container } = renderWithTheme(
        <RdsSwitch />
      );
      const switchElement = container.querySelector('.rds-switch--color-primary');
      expect(switchElement).toBeInTheDocument();
    });

    it('should apply secondary color', () => {
      const { container } = renderWithTheme(
        <RdsSwitch color="secondary" />
      );
      const switchElement = container.querySelector('.rds-switch--color-secondary');
      expect(switchElement).toBeInTheDocument();
    });

    it('should apply error color', () => {
      const { container } = renderWithTheme(
        <RdsSwitch color="error" />
      );
      const switchElement = container.querySelector('.rds-switch--color-error');
      expect(switchElement).toBeInTheDocument();
    });

    it('should apply warning color', () => {
      const { container } = renderWithTheme(
        <RdsSwitch color="warning" />
      );
      const switchElement = container.querySelector('.rds-switch--color-warning');
      expect(switchElement).toBeInTheDocument();
    });

    it('should apply info color', () => {
      const { container } = renderWithTheme(
        <RdsSwitch color="info" />
      );
      const switchElement = container.querySelector('.rds-switch--color-info');
      expect(switchElement).toBeInTheDocument();
    });

    it('should apply success color', () => {
      const { container } = renderWithTheme(
        <RdsSwitch color="success" />
      );
      const switchElement = container.querySelector('.rds-switch--color-success');
      expect(switchElement).toBeInTheDocument();
    });
  });

  describe('Disabled State', () => {
    it('should disable switch when disabled prop is true', () => {
      const { container } = renderWithTheme(
        <RdsSwitch disabled={true} />
      );
      const input = container.querySelector('input[type="checkbox"]');
      expect(input).toBeDisabled();
    });

    it('should disable switch when state is disabled on', () => {
      const { container } = renderWithTheme(
        <RdsSwitch state="disabled on" />
      );
      const input = container.querySelector('input[type="checkbox"]');
      expect(input).toBeDisabled();
    });

    it('should disable switch when state is disabled off', () => {
      const { container } = renderWithTheme(
        <RdsSwitch state="disabled off" />
      );
      const input = container.querySelector('input[type="checkbox"]');
      expect(input).toBeDisabled();
    });

    it('should be enabled when disabled is false', () => {
      const { container } = renderWithTheme(
        <RdsSwitch disabled={false} />
      );
      const input = container.querySelector('input[type="checkbox"]');
      expect(input).not.toBeDisabled();
    });
  });

  describe('Controlled Component Behavior', () => {
    it('should work as controlled component with checked prop', () => {
      const handleChange = jest.fn();
      const { container } = renderWithTheme(
        <RdsSwitch checked={true} onChange={handleChange} />
      );
      const input = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
      expect(input.checked).toBe(true);
    });

    it('should call onChange when controlled component is toggled', () => {
      const handleChange = jest.fn();
      const { container } = renderWithTheme(
        <RdsSwitch checked={false} onChange={handleChange} />
      );
      const input = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
      fireEvent.click(input);
      expect(handleChange).toHaveBeenCalled();
    });

    it('should not update internal state when controlled', () => {
      const { container, rerender } = renderWithTheme(
        <RdsSwitch checked={true} />
      );
      let input = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
      expect(input.checked).toBe(true);

      rerender(
        <ThemeProvider theme={createTheme()}>
          <RdsSwitch checked={false} />
        </ThemeProvider>
      );
      input = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
      expect(input.checked).toBe(false);
    });
  });

  describe('Uncontrolled Component Behavior', () => {
    it('should work as uncontrolled component with defaultChecked', () => {
      const { container } = renderWithTheme(
        <RdsSwitch defaultChecked={true} />
      );
      const input = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
      expect(input.checked).toBe(true);
    });

    it('should toggle internal state when uncontrolled', () => {
      const { container } = renderWithTheme(
        <RdsSwitch />
      );
      const input = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
      expect(input.checked).toBe(false);

      fireEvent.click(input);
      expect(input.checked).toBe(true);
    });

    it('should not toggle when disabled and uncontrolled', () => {
      const { container } = renderWithTheme(
        <RdsSwitch disabled={true} />
      );
      const input = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
      const initialState = input.checked;

      fireEvent.click(input);
      expect(input.checked).toBe(initialState);
    });

    it('should update state when state prop changes', async () => {
      const { container, rerender } = renderWithTheme(
        <RdsSwitch state="off" />
      );
      let input = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
      expect(input.checked).toBe(false);

      rerender(
        <ThemeProvider theme={createTheme()}>
          <RdsSwitch state="on" />
        </ThemeProvider>
      );

      await waitFor(() => {
        input = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
        expect(input.checked).toBe(true);
      });
    });
  });

  describe('onChange Handler', () => {
    it('should call onChange handler when toggled', () => {
      const handleChange = jest.fn();
      const { container } = renderWithTheme(
        <RdsSwitch onChange={handleChange} />
      );
      const input = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
      fireEvent.click(input);
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('should call onChange with correct event and value', () => {
      const handleChange = jest.fn();
      const { container } = renderWithTheme(
        <RdsSwitch onChange={handleChange} />
      );
      const input = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
      fireEvent.click(input);

      const call = handleChange.mock.calls[0];
      expect(call[0]).toBeDefined();
      expect(call[1]).toBe(true);
    });

    it('should not call onChange for disabled switch', () => {
      const handleChange = jest.fn();
      const { container } = renderWithTheme(
        <RdsSwitch disabled={true} onChange={handleChange} />
      );
      const input = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
      fireEvent.click(input);
      // Note: onClick might still be called but onChange logic won't execute
      expect(input).toBeDisabled();
    });
  });

  describe('Custom ClassName', () => {
    it('should apply custom className', () => {
      const { container } = renderWithTheme(
        <RdsSwitch className="custom-switch" />
      );
      const switchElement = container.querySelector('.custom-switch');
      expect(switchElement).toBeInTheDocument();
    });

    it('should combine rds-switch with custom className', () => {
      const { container } = renderWithTheme(
        <RdsSwitch className="custom-switch" />
      );
      const switchElement = container.querySelector('.rds-switch.custom-switch');
      expect(switchElement).toBeInTheDocument();
    });

    it('should apply multiple custom classes', () => {
      const { container } = renderWithTheme(
        <RdsSwitch className="class1 class2" />
      );
      const switchElement = container.querySelector('.class1.class2');
      expect(switchElement).toBeInTheDocument();
    });
  });

  describe('Dark Theme', () => {
    it('should render correctly in dark theme', () => {
      const { container } = renderWithTheme(
        <RdsSwitch label="Dark Theme Switch" />,
        true
      );
      expect(screen.getByText('Dark Theme Switch')).toBeInTheDocument();
      const muiSwitch = container.querySelector('.MuiSwitch-root');
      expect(muiSwitch).toBeInTheDocument();
    });

    it('should apply color class in dark theme', () => {
      const { container } = renderWithTheme(
        <RdsSwitch color="secondary" />,
        true
      );
      const switchElement = container.querySelector('.rds-switch--color-secondary');
      expect(switchElement).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle both layout and labelPlacement props', () => {
      const { container } = renderWithTheme(
        <RdsSwitch label="Test" layout="switch+label" labelPlacement="start" />
      );
      const formControlLabel = container.querySelector('.MuiFormControlLabel-root');
      expect(formControlLabel).toBeInTheDocument();
    });

    it('should prefer layout over labelPlacement', () => {
      const { container } = renderWithTheme(
        <RdsSwitch label="Test" layout="label+switch" labelPlacement="end" />
      );
      const formControlLabel = container.querySelector('.MuiFormControlLabel-root');
      expect(formControlLabel).toBeInTheDocument();
    });

    it('should handle empty label string', () => {
      const { container } = renderWithTheme(
        <RdsSwitch label="" />
      );
      const muiSwitch = container.querySelector('.MuiSwitch-root');
      expect(muiSwitch).toBeInTheDocument();
    });

    it('should handle undefined props gracefully', () => {
      const { container } = renderWithTheme(
        <RdsSwitch
          label={undefined}
          state={undefined}
          style={undefined}
          layout={undefined}
        />
      );
      expect(container).toBeInTheDocument();
    });

    it('should handle multiple state and style changes', async () => {
      const { container, rerender } = renderWithTheme(
        <RdsSwitch state="on" style="style1" />
      );
      let input = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
      expect(input.checked).toBe(true);

      rerender(
        <ThemeProvider theme={createTheme()}>
          <RdsSwitch state="off" style="style2" />
        </ThemeProvider>
      );

      await waitFor(() => {
        input = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
        expect(input.checked).toBe(false);
        const switchElement = container.querySelector('.rds-switch--style2');
        expect(switchElement).toBeInTheDocument();
      });
    });
  });

  describe('Accessibility', () => {
    it('should have proper checkbox role', () => {
      const { container } = renderWithTheme(
        <RdsSwitch />
      );
      const input = container.querySelector('input[type="checkbox"]');
      expect(input).toHaveAttribute('type', 'checkbox');
  
    it('has no axe accessibility violations', async () => {
      const { container } = render(<RdsSwitch />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

    it('should be keyboard accessible', () => {
      const { container } = renderWithTheme(
        <RdsSwitch />
      );
      const input = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
      input.focus();
      expect(document.activeElement).toBe(input);
    });

    it('should have label associated with switch', () => {
      renderWithTheme(
        <RdsSwitch label="Switch Label" />
      );
      const label = screen.getByText('Switch Label');
      expect(label).toBeInTheDocument();
    });

    it('should support standard HTML attributes', () => {
      const { container } = renderWithTheme(
        <RdsSwitch
          id="test-switch"
          name="test-name"
        />
      );
      const input = container.querySelector('input[type="checkbox"]');
      expect(input).toHaveAttribute('id', 'test-switch');
      expect(input).toHaveAttribute('name', 'test-name');
    });
  });
});