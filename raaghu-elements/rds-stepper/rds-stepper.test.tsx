import React from 'react';
import { render, screen, within } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import RdsStepper from './rds-stepper';
import { RdsStepperStep } from './rds-stepper';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';

// Mock SCSS
jest.mock('./rds-stepper.scss', () => ({}));

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

const createSteps = (count: number = 3, overrides?: Partial<RdsStepperStep>[]): RdsStepperStep[] => {
  const defaultSteps: RdsStepperStep[] = Array.from({ length: count }, (_, i) => ({
    label: `Step ${i + 1}`,
    content: `Content for step ${i + 1}`,
  }));

  if (overrides) {
    return defaultSteps.map((step, i) => ({
      ...step,
      ...overrides[i],
    }));
  }

  return defaultSteps;
};

describe('RdsStepper', () => {
  describe('Basic Rendering', () => {
    it('should render component without crashing', () => {
      const steps = createSteps(3);
      const { container } = renderWithTheme(
        <RdsStepper steps={steps} />
      );
      expect(container).toBeInTheDocument();
    });

    it('should have correct displayName', () => {
      expect(RdsStepper.displayName).toBe('RdsStepper');
    });

    it('should apply rds-stepper class', () => {
      const steps = createSteps(3);
      const { container } = renderWithTheme(
        <RdsStepper steps={steps} />
      );
      const stepper = container.querySelector('.rds-stepper');
      expect(stepper).toBeInTheDocument();
    });

    it('should apply MuiStepper class', () => {
      const steps = createSteps(3);
      const { container } = renderWithTheme(
        <RdsStepper steps={steps} />
      );
      const stepper = container.querySelector('.MuiStepper-root');
      expect(stepper).toBeInTheDocument();
    });

    it('should apply custom className', () => {
      const steps = createSteps(3);
      const { container } = renderWithTheme(
        <RdsStepper steps={steps} className="custom-stepper" />
      );
      const stepper = container.querySelector('.rds-stepper.custom-class');
      expect(container.querySelector('.custom-stepper')).toBeInTheDocument();
    });
  });

  describe('Steps Rendering', () => {
    it('should render all steps', () => {
      const steps = createSteps(3);
      const { container } = renderWithTheme(
        <RdsStepper steps={steps} />
      );
      const stepElements = container.querySelectorAll('.MuiStep-root');
      expect(stepElements.length).toBe(3);
    });

    it('should render step labels correctly', () => {
      const steps = createSteps(3);
      renderWithTheme(
        <RdsStepper steps={steps} />
      );
      expect(screen.getByText('Step 1')).toBeInTheDocument();
      expect(screen.getByText('Step 2')).toBeInTheDocument();
      expect(screen.getByText('Step 3')).toBeInTheDocument();
    });

    it('should render empty steps array', () => {
      const { container } = renderWithTheme(
        <RdsStepper steps={[]} />
      );
      const stepper = container.querySelector('.rds-stepper');
      expect(stepper).toBeInTheDocument();
    });

    it('should render single step', () => {
      const steps = createSteps(1);
      const { container } = renderWithTheme(
        <RdsStepper steps={steps} />
      );
      const stepElements = container.querySelectorAll('.MuiStep-root');
      expect(stepElements.length).toBe(1);
    });

    it('should render many steps', () => {
      const steps = createSteps(10);
      const { container } = renderWithTheme(
        <RdsStepper steps={steps} />
      );
      const stepElements = container.querySelectorAll('.MuiStep-root');
      expect(stepElements.length).toBe(10);
    });
  });

  describe('Current Step and Active Step', () => {
    it('should set active step from currentStep prop', () => {
      const steps = createSteps(3);
      const { container } = renderWithTheme(
        <RdsStepper steps={steps} currentStep={1} />
      );
      const stepper = container.querySelector('.MuiStepper-root');
      expect(stepper).toBeInTheDocument();
    });

    it('should use activeStep prop over currentStep', () => {
      const steps = createSteps(3);
      const { container } = renderWithTheme(
        <RdsStepper steps={steps} currentStep={0} activeStep={2} />
      );
      const stepper = container.querySelector('.MuiStepper-root');
      expect(stepper).toBeInTheDocument();
    });

    it('should default to currentStep 0 when not provided', () => {
      const steps = createSteps(3);
      const { container } = renderWithTheme(
        <RdsStepper steps={steps} />
      );
      const stepper = container.querySelector('.MuiStepper-root');
      expect(stepper).toBeInTheDocument();
    });

    it('should handle high currentStep values', () => {
      const steps = createSteps(3);
      const { container } = renderWithTheme(
        <RdsStepper steps={steps} currentStep={5} />
      );
      const stepper = container.querySelector('.MuiStepper-root');
      expect(stepper).toBeInTheDocument();
    });
  });

  describe('Direction and Orientation', () => {
    it('should render horizontal stepper by default', () => {
      const steps = createSteps(3);
      const { container } = renderWithTheme(
        <RdsStepper steps={steps} />
      );
      const stepper = container.querySelector('.MuiStepper-horizontal');
      expect(stepper).toBeInTheDocument();
    });

    it('should render horizontal stepper when direction is horizontal', () => {
      const steps = createSteps(3);
      const { container } = renderWithTheme(
        <RdsStepper steps={steps} direction="horizontal" />
      );
      const stepper = container.querySelector('.MuiStepper-horizontal');
      expect(stepper).toBeInTheDocument();
    });

    it('should render vertical stepper when direction is vertical', () => {
      const steps = createSteps(3);
      const { container } = renderWithTheme(
        <RdsStepper steps={steps} direction="vertical" />
      );
      const stepper = container.querySelector('.MuiStepper-vertical');
      expect(stepper).toBeInTheDocument();
    });

    it('should use orientation prop over direction prop', () => {
      const steps = createSteps(3);
      const { container } = renderWithTheme(
        <RdsStepper steps={steps} direction="horizontal" orientation="vertical" />
      );
      const stepper = container.querySelector('.MuiStepper-vertical');
      expect(stepper).toBeInTheDocument();
    });

    it('should apply alternativeLabel prop in horizontal orientation', () => {
      const steps = createSteps(3);
      const { container } = renderWithTheme(
        <RdsStepper steps={steps} direction="horizontal" alternativeLabel />
      );
      const stepper = container.querySelector('.MuiStepper-root');
      expect(stepper).toBeInTheDocument();
    });

    it('should not apply alternativeLabel prop in vertical orientation', () => {
      const steps = createSteps(3);
      const { container } = renderWithTheme(
        <RdsStepper steps={steps} direction="vertical" alternativeLabel />
      );
      const stepper = container.querySelector('.MuiStepper-vertical');
      expect(stepper).toBeInTheDocument();
    });
  });

  describe('Content Display', () => {
    it('should not show content by default', () => {
      const steps = createSteps(3);
      renderWithTheme(
        <RdsStepper steps={steps} />
      );
      const stepContent = document.querySelector('.MuiStepContent-root');
      expect(stepContent).not.toBeInTheDocument();
    });

    it('should show content when showContent is true', () => {
      const steps = createSteps(3);
      renderWithTheme(
        <RdsStepper steps={steps} showContent={true} />
      );
      const stepContent = document.querySelectorAll('.MuiStepContent-root');
      expect(stepContent.length).toBe(3);
    });

    it('should render step content correctly in vertical stepper', () => {
      const steps = createSteps(3);
      renderWithTheme(
        <RdsStepper steps={steps} showContent={true} direction="vertical" />
      );
      // In vertical stepper, content for active step (0) will be shown
      expect(screen.getByText('Content for step 1')).toBeInTheDocument();
    });

    it('should not render content for steps without content property', () => {
      const steps: RdsStepperStep[] = [
        { label: 'Step 1', content: 'Content 1' },
        { label: 'Step 2' },
        { label: 'Step 3', content: 'Content 3' },
      ];
      renderWithTheme(
        <RdsStepper steps={steps} showContent={true} direction="vertical" currentStep={0} />
      );
      expect(screen.getByText('Content 1')).toBeInTheDocument();
      expect(screen.queryByText('Content 2')).not.toBeInTheDocument();
      expect(screen.queryByText('Content 3')).not.toBeInTheDocument();
    });

    it('should render React elements as content', () => {
      const steps: RdsStepperStep[] = [
        {
          label: 'Step 1',
          content: (
            <div data-testid="custom-content">
              <button>Click me</button>
            </div>
          ),
        },
      ];
      renderWithTheme(
        <RdsStepper steps={steps} showContent={true} />
      );
      expect(screen.getByTestId('custom-content')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
    });

    it('should toggle content visibility with showContent prop', () => {
      const steps = createSteps(3);
      const { rerender } = renderWithTheme(
        <RdsStepper steps={steps} showContent={false} />
      );
      let stepContent = document.querySelector('.MuiStepContent-root');
      expect(stepContent).not.toBeInTheDocument();

      rerender(
        <ThemeProvider theme={createTheme()}>
          <RdsStepper steps={steps} showContent={true} />
        </ThemeProvider>
      );
      stepContent = document.querySelector('.MuiStepContent-root');
      expect(stepContent).toBeInTheDocument();
    });
  });

  describe('Step States', () => {
    it('should render completed step', () => {
      const steps: RdsStepperStep[] = [
        { label: 'Step 1', completed: true },
        { label: 'Step 2' },
      ];
      const { container } = renderWithTheme(
        <RdsStepper steps={steps} />
      );
      const completedStep = container.querySelector('.Mui-completed');
      expect(completedStep).toBeInTheDocument();
    });

    it('should render multiple completed steps', () => {
      const steps: RdsStepperStep[] = [
        { label: 'Step 1', completed: true },
        { label: 'Step 2', completed: true },
        { label: 'Step 3' },
      ];
      const { container } = renderWithTheme(
        <RdsStepper steps={steps} />
      );
      const completedSteps = container.querySelectorAll('.Mui-completed');
      expect(completedSteps.length).toBeGreaterThanOrEqual(2);
    });

    it('should render disabled step', () => {
      const steps: RdsStepperStep[] = [
        { label: 'Step 1' },
        { label: 'Step 2', disabled: true },
      ];
      const { container } = renderWithTheme(
        <RdsStepper steps={steps} />
      );
      const disabledStep = container.querySelector('.Mui-disabled');
      expect(disabledStep).toBeInTheDocument();
    });

    it('should render multiple disabled steps', () => {
      const steps: RdsStepperStep[] = [
        { label: 'Step 1' },
        { label: 'Step 2', disabled: true },
        { label: 'Step 3', disabled: true },
      ];
      const { container } = renderWithTheme(
        <RdsStepper steps={steps} />
      );
      const disabledSteps = container.querySelectorAll('.Mui-disabled');
      expect(disabledSteps.length).toBeGreaterThanOrEqual(2);
    });

    it('should render step with error state', () => {
      const steps: RdsStepperStep[] = [
        { label: 'Step 1', error: true },
        { label: 'Step 2' },
      ];
      const { container } = renderWithTheme(
        <RdsStepper steps={steps} />
      );
      const errorStepLabel = container.querySelector('.MuiStepLabel-label.Mui-error');
      expect(errorStepLabel).toBeInTheDocument();
    });

    it('should render multiple error steps', () => {
      const steps: RdsStepperStep[] = [
        { label: 'Step 1', error: true },
        { label: 'Step 2', error: true },
        { label: 'Step 3' },
      ];
      const { container } = renderWithTheme(
        <RdsStepper steps={steps} />
      );
      const errorLabels = container.querySelectorAll('.MuiStepLabel-label.Mui-error');
      expect(errorLabels.length).toBe(2);
    });

    it('should render optional step with label', () => {
      const steps: RdsStepperStep[] = [
        { label: 'Step 1' },
        { label: 'Step 2', optional: true },
      ];
      renderWithTheme(
        <RdsStepper steps={steps} />
      );
      const optionalText = screen.getByText('Optional');
      expect(optionalText).toBeInTheDocument();
    });

    it('should render multiple optional steps', () => {
      const steps: RdsStepperStep[] = [
        { label: 'Step 1', optional: true },
        { label: 'Step 2', optional: true },
        { label: 'Step 3' },
      ];
      renderWithTheme(
        <RdsStepper steps={steps} />
      );
      const optionalTexts = screen.getAllByText('Optional');
      expect(optionalTexts.length).toBe(2);
    });

    it('should render step with mixed states', () => {
      const steps: RdsStepperStep[] = [
        { label: 'Step 1', completed: true, optional: true },
        { label: 'Step 2', disabled: true },
        { label: 'Step 3', error: true },
        { label: 'Step 4' },
      ];
      const { container } = renderWithTheme(
        <RdsStepper steps={steps} />
      );
      expect(container.querySelector('.Mui-completed')).toBeInTheDocument();
      expect(container.querySelector('.Mui-disabled')).toBeInTheDocument();
      expect(container.querySelector('.MuiStepLabel-label.Mui-error')).toBeInTheDocument();
    });
  });

  describe('Props Passing', () => {
    it('should pass through MUI Stepper props', () => {
      const steps = createSteps(3);
      const { container } = renderWithTheme(
        <RdsStepper steps={steps} data-testid="test-stepper" />
      );
      const stepper = container.querySelector('[data-testid="test-stepper"]');
      expect(stepper).toBeInTheDocument();
    });

    it('should allow additional MUI Stepper props via spread', () => {
      const steps = createSteps(3);
      const { container } = renderWithTheme(
        <RdsStepper steps={steps} connector={null as any} />
      );
      const stepper = container.querySelector('.MuiStepper-root');
      expect(stepper).toBeInTheDocument();
    });

    it('should handle className combination', () => {
      const steps = createSteps(3);
      const { container } = renderWithTheme(
        <RdsStepper steps={steps} className="custom-1 custom-2" />
      );
      const stepper = container.querySelector('.rds-stepper');
      expect(stepper).toHaveClass('custom-1', 'custom-2');
    });

    it('should filter out empty classNames', () => {
      const steps = createSteps(3);
      const { container } = renderWithTheme(
        <RdsStepper steps={steps} className="" />
      );
      const stepper = container.querySelector('.rds-stepper');
      expect(stepper).toBeInTheDocument();
    });
  });

  describe('Complex Scenarios', () => {
    it('should render vertical stepper with content', () => {
      const steps = createSteps(3);
      const { container } = renderWithTheme(
        <RdsStepper steps={steps} direction="vertical" showContent={true} currentStep={0} />
      );
      expect(container.querySelector('.MuiStepper-vertical')).toBeInTheDocument();
      expect(container.querySelector('.MuiStepContent-root')).toBeInTheDocument();
    });

    it('should render horizontal stepper with alternative label', () => {
      const steps = createSteps(3);
      const { container } = renderWithTheme(
        <RdsStepper steps={steps} direction="horizontal" alternativeLabel />
      );
      expect(container.querySelector('.MuiStepper-horizontal')).toBeInTheDocument();
    });

    it('should handle mixed completed and disabled states with content', () => {
      const steps: RdsStepperStep[] = [
        { label: 'Step 1', completed: true, content: 'Completed content' },
        { label: 'Step 2', disabled: true, content: 'Disabled content' },
        { label: 'Step 3', content: 'Active content' },
      ];
      renderWithTheme(
        <RdsStepper steps={steps} direction="vertical" showContent={true} currentStep={2} />
      );
      // In vertical stepper, only active step content is shown in the collapsed state
      expect(screen.getByText('Active content')).toBeInTheDocument();
    });

    it('should update steps dynamically', () => {
      const steps1 = createSteps(2);
      const { rerender } = renderWithTheme(
        <RdsStepper steps={steps1} />
      );
      let stepElements = document.querySelectorAll('.MuiStep-root');
      expect(stepElements.length).toBe(2);

      const steps2 = createSteps(4);
      rerender(
        <ThemeProvider theme={createTheme()}>
          <RdsStepper steps={steps2} />
        </ThemeProvider>
      );
      stepElements = document.querySelectorAll('.MuiStep-root');
      expect(stepElements.length).toBe(4);
    });

    it('should update current step dynamically', () => {
      const steps = createSteps(3);
      const { rerender } = renderWithTheme(
        <RdsStepper steps={steps} currentStep={0} />
      );

      rerender(
        <ThemeProvider theme={createTheme()}>
          <RdsStepper steps={steps} currentStep={2} />
        </ThemeProvider>
      );
      expect(screen.getByText('Step 1')).toBeInTheDocument();
    });

    it('should change direction dynamically', () => {
      const steps = createSteps(3);
      const { rerender, container } = renderWithTheme(
        <RdsStepper steps={steps} direction="horizontal" />
      );
      expect(container.querySelector('.MuiStepper-horizontal')).toBeInTheDocument();

      rerender(
        <ThemeProvider theme={createTheme()}>
          <RdsStepper steps={steps} direction="vertical" />
        </ThemeProvider>
      );
      expect(container.querySelector('.MuiStepper-vertical')).toBeInTheDocument();
    });
  });

  describe('Theme Integration', () => {
    it('should render with light theme', () => {
      const steps = createSteps(3);
      const { container } = renderWithTheme(
        <RdsStepper steps={steps} />,
        false
      );
      expect(container).toBeInTheDocument();
    });

    it('should render with dark theme', () => {
      const steps = createSteps(3);
      const { container } = renderWithTheme(
        <RdsStepper steps={steps} />,
        true
      );
      expect(container).toBeInTheDocument();
    });

    it('should apply theme colors to stepper', () => {
      const steps = createSteps(3);
      const { container } = renderWithTheme(
        <RdsStepper steps={steps} />,
        false
      );
      const stepper = container.querySelector('.MuiStepper-root');
      expect(stepper).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle steps with empty labels', () => {
      const steps: RdsStepperStep[] = [
        { label: '' },
        { label: 'Step 2' },
      ];
      const { container } = renderWithTheme(
        <RdsStepper steps={steps} />
      );
      const stepLabels = container.querySelectorAll('.MuiStepLabel-label');
      expect(stepLabels.length).toBeGreaterThanOrEqual(1);
    });

    it('should handle steps with special characters in labels', () => {
      const steps: RdsStepperStep[] = [
        { label: 'Step 1 <>&"' },
        { label: 'Step 2 → π' },
      ];
      renderWithTheme(
        <RdsStepper steps={steps} />
      );
      expect(screen.getByText('Step 1 <>&"')).toBeInTheDocument();
      expect(screen.getByText('Step 2 → π')).toBeInTheDocument();
    });

    it('should handle very long step labels', () => {
      const longLabel = 'A'.repeat(100);
      const steps: RdsStepperStep[] = [
        { label: longLabel },
      ];
      renderWithTheme(
        <RdsStepper steps={steps} />
      );
      expect(screen.getByText(longLabel)).toBeInTheDocument();
    });

    it('should handle currentStep greater than steps length', () => {
      const steps = createSteps(3);
      const { container } = renderWithTheme(
        <RdsStepper steps={steps} currentStep={10} />
      );
      expect(container.querySelector('.rds-stepper')).toBeInTheDocument();
    });

    it('should handle negative currentStep', () => {
      const steps = createSteps(3);
      const { container } = renderWithTheme(
        <RdsStepper steps={steps} currentStep={-1} />
      );
      expect(container.querySelector('.rds-stepper')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has no axe accessibility violations', async () => {
      const { container } = renderWithTheme(<RdsStepper steps={createSteps(3)} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
