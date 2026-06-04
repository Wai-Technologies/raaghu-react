import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import RdsProgress from './rds-progress';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';

// Mock SCSS
jest.mock('./rds-progress.scss', () => ({}));

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

describe('RdsProgress', () => {
  describe('Basic Rendering', () => {
    it('should render component without crashing', () => {
      const { container } = renderWithTheme(
        <RdsProgress />
      );
      expect(container).toBeInTheDocument();
    });

    it('should have correct displayName', () => {
      expect(RdsProgress.displayName).toBe('RdsProgress');
    });

    it('should render default linear progress', () => {
      const { container } = renderWithTheme(
        <RdsProgress />
      );
      const progress = container.querySelector('.rds-progress');
      expect(progress).toBeInTheDocument();
    });

    it('should apply correct CSS classes', () => {
      const { container } = renderWithTheme(
        <RdsProgress type="linear" style="line" />
      );
      const progress = container.querySelector('.rds-progress--line');
      expect(progress).toBeInTheDocument();
    });
  });

  describe('Linear Progress', () => {
    it('should render linear progress with line style', () => {
      const { container } = renderWithTheme(
        <RdsProgress type="linear" style="line" value={50} variant="determinate" />
      );
      const lineProgress = container.querySelector('.rds-progress--line');
      expect(lineProgress).toBeInTheDocument();
    });

    it('should render with different values', () => {
      const { container, rerender } = renderWithTheme(
        <RdsProgress type="linear" style="line" value={25} variant="determinate" />
      );
      expect(container).toBeInTheDocument();

      rerender(
        <ThemeProvider theme={createTheme()}>
          <RdsProgress type="linear" style="line" value={75} variant="determinate" />
        </ThemeProvider>
      );
      expect(container).toBeInTheDocument();
    });

    it('should render with label', () => {
      const { container } = renderWithTheme(
        <RdsProgress 
          type="linear" 
          style="line" 
          value={50} 
          variant="determinate"
          showLabel={true}
          label="Loading"
        />
      );
      expect(screen.getByText('Loading')).toBeInTheDocument();
    });

    it('should show percentage as label when no label provided', () => {
      const { container } = renderWithTheme(
        <RdsProgress 
          type="linear" 
          style="line" 
          value={50} 
          variant="determinate"
          showLabel={true}
        />
      );
      expect(screen.getByText('50%')).toBeInTheDocument();
    });

    it('should render indeterminate variant', () => {
      const { container } = renderWithTheme(
        <RdsProgress 
          type="linear" 
          style="line" 
          variant="indeterminate"
        />
      );
      const progress = container.querySelector('.rds-progress--indeterminate');
      expect(progress).toBeInTheDocument();
    });
  });

  describe('Circular Progress', () => {
    it('should render circular progress', () => {
      const { container } = renderWithTheme(
        <RdsProgress type="circular" style="circular" value={50} variant="determinate" />
      );
      const circularProgress = container.querySelector('.rds-progress--circular');
      expect(circularProgress).toBeInTheDocument();
    });

    it('should render with custom size and thickness', () => {
      const { container } = renderWithTheme(
        <RdsProgress 
          type="circular" 
          style="circular" 
          value={50} 
          variant="determinate"
          size={100}
          thickness={5}
        />
      );
      expect(container).toBeInTheDocument();
    });

    it('should render with indeterminate variant', () => {
      const { container } = renderWithTheme(
        <RdsProgress 
          type="circular" 
          style="circular"
          variant="indeterminate"
        />
      );
      const progress = container.querySelector('.rds-progress--circular');
      expect(progress).toBeInTheDocument();
    });

    it('should show label overlay for determinate', () => {
      const { container } = renderWithTheme(
        <RdsProgress 
          type="circular" 
          style="circular" 
          value={60} 
          variant="determinate"
          showLabel={true}
          label="Complete"
        />
      );
      expect(screen.getByText('Complete')).toBeInTheDocument();
    });

    it('should show percentage in center for circular with label', () => {
      const { container } = renderWithTheme(
        <RdsProgress 
          type="circular" 
          style="circular" 
          value={75} 
          variant="determinate"
          showLabel={true}
        />
      );
      expect(screen.getByText('75%')).toBeInTheDocument();
    });
  });

  describe('Stepper Progress', () => {
    it('should render stepper with number type', () => {
      const { container } = renderWithTheme(
        <RdsProgress 
          style="stepper" 
          value={40} 
          totalSteps={5}
          stepperType="number"
        />
      );
      const stepper = container.querySelector('.rds-progress--stepper');
      expect(stepper).toBeInTheDocument();
    });

    it('should render stepper with circle type', () => {
      const { container } = renderWithTheme(
        <RdsProgress 
          style="stepper" 
          value={40} 
          totalSteps={5}
          stepperType="circle"
        />
      );
      const stepper = container.querySelector('.rds-progress--stepper');
      expect(stepper).toBeInTheDocument();
    });

    it('should display correct number of steps', () => {
      const { container } = renderWithTheme(
        <RdsProgress 
          style="stepper" 
          value={40} 
          totalSteps={3}
          stepperType="number"
        />
      );
      const steps = container.querySelectorAll('.rds-progress__stepper-step');
      expect(steps.length).toBe(3);
    });

    it('should mark completed steps', () => {
      const { container } = renderWithTheme(
        <RdsProgress 
          style="stepper" 
          value={60} 
          totalSteps={5}
          stepperType="number"
        />
      );
      const completedSteps = container.querySelectorAll('.rds-progress__stepper-step--completed');
      expect(completedSteps.length).toBeGreaterThan(0);
    });

    it('should show connectors between steps', () => {
      const { container } = renderWithTheme(
        <RdsProgress 
          style="stepper" 
          value={40} 
          totalSteps={5}
          stepperType="number"
        />
      );
      const connectors = container.querySelectorAll('.rds-progress__stepper-connector');
      expect(connectors.length).toBe(4); // 5 steps = 4 connectors
    });

    it('should handle different totalSteps values', () => {
      const { container, rerender } = renderWithTheme(
        <RdsProgress 
          style="stepper" 
          value={40} 
          totalSteps={3}
          stepperType="number"
        />
      );
      let steps = container.querySelectorAll('.rds-progress__stepper-step');
      expect(steps.length).toBe(3);

      rerender(
        <ThemeProvider theme={createTheme()}>
          <RdsProgress 
            style="stepper" 
            value={40} 
            totalSteps={7}
            stepperType="number"
          />
        </ThemeProvider>
      );
      steps = container.querySelectorAll('.rds-progress__stepper-step');
      expect(steps.length).toBe(7);
    });
  });

  describe('Dash Progress', () => {
    it('should render dash progress', () => {
      const { container } = renderWithTheme(
        <RdsProgress 
          style="dash" 
          value={50} 
        />
      );
      const dash = container.querySelector('.rds-progress--dash');
      expect(dash).toBeInTheDocument();
    });

    it('should display dash segments', () => {
      const { container } = renderWithTheme(
        <RdsProgress 
          style="dash" 
          value={50} 
        />
      );
      const segments = container.querySelectorAll('.rds-progress__dash');
      expect(segments.length).toBe(5);
    });

    it('should fill correct number of dash segments', () => {
      const { container } = renderWithTheme(
        <RdsProgress 
          style="dash" 
          value={60} 
        />
      );
      const filledSegments = container.querySelectorAll('.rds-progress__dash--filled');
      expect(filledSegments.length).toBeGreaterThan(0);
    });

    it('should handle different values for dash progress', () => {
      const { container, rerender } = renderWithTheme(
        <RdsProgress 
          style="dash" 
          value={20} 
        />
      );
      let filledSegments = container.querySelectorAll('.rds-progress__dash--filled');
      const initialFilled = filledSegments.length;

      rerender(
        <ThemeProvider theme={createTheme()}>
          <RdsProgress 
            style="dash" 
            value={80} 
          />
        </ThemeProvider>
      );
      filledSegments = container.querySelectorAll('.rds-progress__dash--filled');
      expect(filledSegments.length).toBeGreaterThan(initialFilled);
    });
  });

  describe('Block Progress', () => {
    it('should render block progress', () => {
      const { container } = renderWithTheme(
        <RdsProgress 
          style="block" 
          value={50} 
        />
      );
      const block = container.querySelector('.rds-progress--block');
      expect(block).toBeInTheDocument();
    });

    it('should display block segments', () => {
      const { container } = renderWithTheme(
        <RdsProgress 
          style="block" 
          value={50} 
        />
      );
      const segments = container.querySelectorAll('.rds-progress__block');
      expect(segments.length).toBe(5);
    });

    it('should fill correct number of block segments', () => {
      const { container } = renderWithTheme(
        <RdsProgress 
          style="block" 
          value={60} 
        />
      );
      const filledSegments = container.querySelectorAll('.rds-progress__block--filled');
      expect(filledSegments.length).toBeGreaterThan(0);
    });

    it('should show step labels in blocks', () => {
      const { container } = renderWithTheme(
        <RdsProgress 
          style="block" 
          value={40} 
        />
      );
      expect(screen.getByText('Step 1')).toBeInTheDocument();
      expect(screen.getByText('Step 2')).toBeInTheDocument();
    });
  });

  describe('Steps Prop', () => {
    it('should handle steps prop with value 0', () => {
      const { container } = renderWithTheme(
        <RdsProgress 
          style="line" 
          steps={0}
        />
      );
      expect(container).toBeInTheDocument();
    });

    it('should handle steps prop with value 5', () => {
      const { container } = renderWithTheme(
        <RdsProgress 
          style="line" 
          steps={5}
        />
      );
      expect(container).toBeInTheDocument();
    });

    it('should calculate progress from steps', () => {
      const { container, rerender } = renderWithTheme(
        <RdsProgress 
          style="stepper"
          steps={2}
          totalSteps={5}
          stepperType="number"
        />
      );
      let completedSteps = container.querySelectorAll('.rds-progress__stepper-step--completed');
      const initialCompleted = completedSteps.length;

      rerender(
        <ThemeProvider theme={createTheme()}>
          <RdsProgress 
            style="stepper"
            steps={4}
            totalSteps={5}
            stepperType="number"
          />
        </ThemeProvider>
      );
      completedSteps = container.querySelectorAll('.rds-progress__stepper-step--completed');
      expect(completedSteps.length).toBeGreaterThan(initialCompleted);
    });
  });

  describe('Color Variants', () => {
    const colors = ['primary', 'secondary', 'error', 'info', 'success', 'warning'];

    colors.forEach(color => {
      it(`should render with color: ${color}`, () => {
        const { container } = renderWithTheme(
          <RdsProgress 
            style="line" 
            value={50} 
            color={color as any}
            variant="determinate"
          />
        );
        const progress = container.querySelector(`.rds-progress--${color}`);
        expect(progress).toBeInTheDocument();
      });
    });
  });

  describe('Variants', () => {
    it('should render with determinate variant', () => {
      const { container } = renderWithTheme(
        <RdsProgress 
          style="line" 
          value={50} 
          variant="determinate"
        />
      );
      expect(container).toBeInTheDocument();
    });

    it('should render with indeterminate variant', () => {
      const { container } = renderWithTheme(
        <RdsProgress 
          style="line" 
          variant="indeterminate"
        />
      );
      const progress = container.querySelector('.rds-progress--indeterminate');
      expect(progress).toBeInTheDocument();
    });

    it('should render with buffer variant', () => {
      const { container } = renderWithTheme(
        <RdsProgress 
          style="line" 
          variant="buffer"
          value={50}
          valueBuffer={75}
        />
      );
      expect(container).toBeInTheDocument();
    });

    it('should render with query variant', () => {
      const { container } = renderWithTheme(
        <RdsProgress 
          style="line" 
          variant="query"
        />
      );
      expect(container).toBeInTheDocument();
    });
  });

  describe('Theme Integration', () => {
    it('should render with light theme', () => {
      const { container } = renderWithTheme(
        <RdsProgress style="line" value={50} variant="determinate" />,
        false
      );
      expect(container).toBeInTheDocument();
    });

    it('should render with dark theme', () => {
      const { container } = renderWithTheme(
        <RdsProgress style="line" value={50} variant="determinate" />,
        true
      );
      expect(container).toBeInTheDocument();
    });
  });

  describe('Custom SX Props', () => {
    it('should accept sx prop for linear', () => {
      const { container } = renderWithTheme(
        <RdsProgress 
          style="line" 
          value={50} 
          variant="determinate"
          sx={{ marginTop: '20px' }}
        />
      );
      expect(container).toBeInTheDocument();
    });

    it('should accept sx prop for circular', () => {
      const { container } = renderWithTheme(
        <RdsProgress 
          style="circular" 
          value={50} 
          variant="determinate"
          sx={{ marginTop: '20px' }}
        />
      );
      expect(container).toBeInTheDocument();
    });

    it('should accept sx prop for stepper', () => {
      const { container } = renderWithTheme(
        <RdsProgress 
          style="stepper" 
          value={40}
          sx={{ marginTop: '20px' }}
        />
      );
      expect(container).toBeInTheDocument();
    });
  });

  describe('Complex Scenarios', () => {
    it('should handle rapid value changes', () => {
      const { rerender, container } = renderWithTheme(
        <RdsProgress style="line" value={10} variant="determinate" showLabel={true} />
      );

      for (let i = 20; i <= 100; i += 10) {
        rerender(
          <ThemeProvider theme={createTheme()}>
            <RdsProgress style="line" value={i} variant="determinate" showLabel={true} />
          </ThemeProvider>
        );
      }
      // Verify progress component renders
      const progress = container.querySelector('.rds-progress--line');
      expect(progress).toBeInTheDocument();
    });

    it('should handle style changes', () => {
      const { rerender } = renderWithTheme(
        <RdsProgress style="line" value={50} variant="determinate" />
      );
      let lineProgress = document.querySelector('.rds-progress--line');
      expect(lineProgress).toBeInTheDocument();

      rerender(
        <ThemeProvider theme={createTheme()}>
          <RdsProgress style="circular" value={50} variant="determinate" />
        </ThemeProvider>
      );
      const circularProgress = document.querySelector('.rds-progress--circular');
      expect(circularProgress).toBeInTheDocument();
    });

    it('should work with all props combined', () => {
      const { container } = renderWithTheme(
        <RdsProgress 
          type="linear"
          style="line"
          value={60}
          variant="determinate"
          color="success"
          showLabel={true}
          label="Processing"
        />
      );
      expect(screen.getByText('Processing')).toBeInTheDocument();
      expect(container.querySelector('.rds-progress--success')).toBeInTheDocument();
    });

    it('should handle 0 value', () => {
      const { container } = renderWithTheme(
        <RdsProgress 
          style="line" 
          value={0} 
          variant="determinate"
          showLabel={true}
        />
      );
      expect(screen.getByText('0%')).toBeInTheDocument();
    });

    it('should handle 100 value', () => {
      const { container } = renderWithTheme(
        <RdsProgress 
          style="line" 
          value={100} 
          variant="determinate"
          showLabel={true}
        />
      );
      expect(screen.getByText('100%')).toBeInTheDocument();
    });

    it('should handle values exceeding 100', () => {
      const { container } = renderWithTheme(
        <RdsProgress 
          style="dash" 
          value={150}
        />
      );
      expect(container).toBeInTheDocument();
    });

    it('should render stepper with all step states', () => {
      const { container } = renderWithTheme(
        <RdsProgress 
          style="stepper"
          value={45}
          totalSteps={5}
          stepperType="number"
        />
      );
      const completedSteps = container.querySelectorAll('.rds-progress__stepper-step--completed');
      const currentStep = container.querySelectorAll('.rds-progress__stepper-step--current');
      const upcomingSteps = container.querySelectorAll('.rds-progress__stepper-step--upcoming');
      
      expect(completedSteps.length + currentStep.length + upcomingSteps.length).toBe(5);
    });

    it('should handle custom size and thickness for circular', () => {
      const { container } = renderWithTheme(
        <RdsProgress 
          type="circular"
          style="circular"
          value={50}
          variant="determinate"
          size={150}
          thickness={8}
        />
      );
      expect(container).toBeInTheDocument();
    });

    it('should correctly display steps as progress values', () => {
      const { rerender } = renderWithTheme(
        <RdsProgress 
          style="block"
          steps={1}
        />
      );
      let filledSegments = document.querySelectorAll('.rds-progress__block--filled');
      const step1Filled = filledSegments.length;

      rerender(
        <ThemeProvider theme={createTheme()}>
          <RdsProgress 
            style="block"
            steps={3}
          />
        </ThemeProvider>
      );
      filledSegments = document.querySelectorAll('.rds-progress__block--filled');
      expect(filledSegments.length).toBeGreaterThan(step1Filled);
    });
  });

  describe('Edge Cases', () => {
    it('should render with undefined value', () => {
      const { container } = renderWithTheme(
        <RdsProgress style="line" variant="indeterminate" />
      );
      expect(container).toBeInTheDocument();
    });

    it('should render with no props provided', () => {
      const { container } = renderWithTheme(
        <RdsProgress />
      );
      const progress = container.querySelector('.rds-progress');
      expect(progress).toBeInTheDocument();
    });

    it('should handle label without showLabel', () => {
      const { container } = renderWithTheme(
        <RdsProgress 
          style="line" 
          value={50} 
          variant="determinate"
          showLabel={false}
          label="Should not appear"
        />
      );
      expect(screen.queryByText('Should not appear')).not.toBeInTheDocument();
    });

    it('should handle negative value gracefully', () => {
      const { container } = renderWithTheme(
        <RdsProgress 
          style="line" 
          value={-10} 
          variant="determinate"
        />
      );
      expect(container).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has no axe accessibility violations', async () => {
      const { container } = render(<RdsProgress />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
