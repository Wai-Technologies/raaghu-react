import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import RdsProgress from './rds-progress';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';

jest.mock('../shared/utils/deprecation', () => ({ warnDeprecatedProp: jest.fn() }));
import { warnDeprecatedProp } from '../shared/utils/deprecation';

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

const wrap = (ui: React.ReactElement) => <ThemeProvider theme={createTheme()}>{ui}</ThemeProvider>;

describe('RdsProgress', () => {
  describe('Basic Rendering', () => {
    it('should render component without crashing', () => {
      const { container } = renderWithTheme(<RdsProgress />);
      expect(container).toBeInTheDocument();
      expect(container.querySelector('.rds-progress')).toBeInTheDocument();
    });

    it('should have correct displayName', () => {
      expect(RdsProgress.displayName).toBe('RdsProgress');
    });

    it('should apply correct CSS classes', () => {
      const { container } = renderWithTheme(<RdsProgress type="linear" shape="line" />);
      expect(container.querySelector('.rds-progress--line')).toBeInTheDocument();
    });
  });

  describe('Linear Progress', () => {
    it('should render linear progress with line variant', () => {
      const { container } = renderWithTheme(<RdsProgress type="linear" shape="line" value={50} mode="determinate" />);
      expect(container.querySelector('.rds-progress--line')).toBeInTheDocument();
    });

    it('should render with different values', () => {
      const { container, rerender } = renderWithTheme(
        <RdsProgress type="linear" shape="line" value={25} mode="determinate" />
      );
      expect(container).toBeInTheDocument();
      rerender(wrap(<RdsProgress type="linear" shape="line" value={75} mode="determinate" />));
      expect(container).toBeInTheDocument();
    });

    it('should render with label', () => {
      renderWithTheme(
        <RdsProgress type="linear" shape="line" value={50} mode="determinate" showLabel={true} label="Loading" />
      );
      expect(screen.getByText('Loading')).toBeInTheDocument();
    });

    it('should show percentage as label when no label provided', () => {
      renderWithTheme(<RdsProgress type="linear" shape="line" value={50} mode="determinate" showLabel={true} />);
      expect(screen.getByText('50%')).toBeInTheDocument();
    });

    it('should render indeterminate variant', () => {
      const { container } = renderWithTheme(<RdsProgress type="linear" shape="line" mode="indeterminate" />);
      expect(container.querySelector('.rds-progress--indeterminate')).toBeInTheDocument();
    });
  });

  describe('Circular Progress', () => {
    it('should render circular progress', () => {
      const { container } = renderWithTheme(
        <RdsProgress type="circular" shape="circular" value={50} mode="determinate" />
      );
      expect(container.querySelector('.rds-progress--circular')).toBeInTheDocument();
    });

    it('should render with custom size and thickness', () => {
      const { container } = renderWithTheme(
        <RdsProgress type="circular" shape="circular" value={50} mode="determinate" size={100} thickness={5} />
      );
      expect(container).toBeInTheDocument();
    });

    it('should render with indeterminate variant', () => {
      const { container } = renderWithTheme(<RdsProgress type="circular" shape="circular" mode="indeterminate" />);
      expect(container.querySelector('.rds-progress--circular')).toBeInTheDocument();
    });

    it('should show label overlay for determinate', () => {
      renderWithTheme(
        <RdsProgress type="circular" shape="circular" value={60} mode="determinate" showLabel={true} label="Complete" />
      );
      expect(screen.getByText('Complete')).toBeInTheDocument();
    });

    it('should show percentage in center for circular with label', () => {
      renderWithTheme(<RdsProgress type="circular" shape="circular" value={75} mode="determinate" showLabel={true} />);
      expect(screen.getByText('75%')).toBeInTheDocument();
    });
  });

  describe('Stepper Progress', () => {
    it.each(['number', 'circle'] as const)('should render stepper with %s type', (stepperType) => {
      const { container } = renderWithTheme(
        <RdsProgress shape="stepper" value={40} totalSteps={5} stepperType={stepperType} />
      );
      expect(container.querySelector('.rds-progress--stepper')).toBeInTheDocument();
    });

    it('should mark completed steps', () => {
      const { container } = renderWithTheme(
        <RdsProgress shape="stepper" value={60} totalSteps={5} stepperType="number" />
      );
      expect(container.querySelectorAll('.rds-progress__stepper-step--completed').length).toBeGreaterThan(0);
    });

    it('should show connectors between steps', () => {
      const { container } = renderWithTheme(
        <RdsProgress shape="stepper" value={40} totalSteps={5} stepperType="number" />
      );
      expect(container.querySelectorAll('.rds-progress__stepper-connector').length).toBe(4);
    });

    it('should handle different totalSteps values', () => {
      const { container, rerender } = renderWithTheme(
        <RdsProgress shape="stepper" value={40} totalSteps={3} stepperType="number" />
      );
      expect(container.querySelectorAll('.rds-progress__stepper-step').length).toBe(3);
      rerender(wrap(<RdsProgress shape="stepper" value={40} totalSteps={7} stepperType="number" />));
      expect(container.querySelectorAll('.rds-progress__stepper-step').length).toBe(7);
    });
  });

  describe('Dash Progress', () => {
    it('should render dash progress with segments', () => {
      const { container } = renderWithTheme(<RdsProgress shape="dash" value={50} />);
      expect(container.querySelector('.rds-progress--dash')).toBeInTheDocument();
      expect(container.querySelectorAll('.rds-progress__dash').length).toBe(5);
    });

    it('should fill correct number of dash segments', () => {
      const { container } = renderWithTheme(<RdsProgress shape="dash" value={60} />);
      expect(container.querySelectorAll('.rds-progress__dash--filled').length).toBeGreaterThan(0);
    });

    it('should handle different values for dash progress', () => {
      const { container, rerender } = renderWithTheme(<RdsProgress shape="dash" value={20} />);
      const initialFilled = container.querySelectorAll('.rds-progress__dash--filled').length;
      rerender(wrap(<RdsProgress shape="dash" value={80} />));
      expect(container.querySelectorAll('.rds-progress__dash--filled').length).toBeGreaterThan(initialFilled);
    });
  });

  describe('Block Progress', () => {
    it('should render block progress with segments', () => {
      const { container } = renderWithTheme(<RdsProgress shape="block" value={50} />);
      expect(container.querySelector('.rds-progress--block')).toBeInTheDocument();
      expect(container.querySelectorAll('.rds-progress__block').length).toBe(5);
    });

    it('should fill correct number of block segments', () => {
      const { container } = renderWithTheme(<RdsProgress shape="block" value={60} />);
      expect(container.querySelectorAll('.rds-progress__block--filled').length).toBeGreaterThan(0);
    });

    it('should show step labels in blocks', () => {
      renderWithTheme(<RdsProgress shape="block" value={40} />);
      expect(screen.getByText('Step 1')).toBeInTheDocument();
      expect(screen.getByText('Step 2')).toBeInTheDocument();
    });
  });

  describe('Steps Prop', () => {
    it.each([0, 5] as const)('should handle steps prop with value %s', (steps) => {
      const { container } = renderWithTheme(<RdsProgress shape="line" steps={steps} />);
      expect(container).toBeInTheDocument();
    });

    it('should calculate progress from steps', () => {
      const { container, rerender } = renderWithTheme(
        <RdsProgress shape="stepper" steps={2} totalSteps={5} stepperType="number" />
      );
      const initialCompleted = container.querySelectorAll('.rds-progress__stepper-step--completed').length;
      rerender(wrap(<RdsProgress shape="stepper" steps={4} totalSteps={5} stepperType="number" />));
      expect(container.querySelectorAll('.rds-progress__stepper-step--completed').length).toBeGreaterThan(initialCompleted);
    });
  });

  describe('Color Variants', () => {
    it.each(['primary', 'secondary', 'error', 'info', 'success', 'warning'])('should render with color: %s', (color) => {
      const { container } = renderWithTheme(
        <RdsProgress shape="line" value={50} color={color as any} mode="determinate" />
      );
      expect(container.querySelector(`.rds-progress--${color}`)).toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('should render with determinate variant', () => {
      const { container } = renderWithTheme(<RdsProgress shape="line" value={50} mode="determinate" />);
      expect(container).toBeInTheDocument();
    });

    it('should render with indeterminate variant', () => {
      const { container } = renderWithTheme(<RdsProgress shape="line" mode="indeterminate" />);
      expect(container.querySelector('.rds-progress--indeterminate')).toBeInTheDocument();
    });

    it('should render with buffer variant', () => {
      const { container } = renderWithTheme(<RdsProgress shape="line" variant="buffer" value={50} valueBuffer={75} />);
      expect(container).toBeInTheDocument();
    });

    it('should render with query variant', () => {
      const { container } = renderWithTheme(<RdsProgress shape="line" variant="query" />);
      expect(container).toBeInTheDocument();
    });
  });

  describe('Theme Integration', () => {
    it.each([false, true])('should render with theme dark=%s', (dark) => {
      const { container } = renderWithTheme(<RdsProgress shape="line" value={50} mode="determinate" />, dark);
      expect(container).toBeInTheDocument();
    });
  });

  describe('Custom SX Props', () => {
    it.each([
      ['linear', 'line', 50],
      ['circular', 'circular', 50],
      ['stepper', 'stepper', 40],
    ] as const)('should accept sx prop for %s', (_n, shape, value) => {
      const { container } = renderWithTheme(<RdsProgress shape={shape} value={value} mode="determinate" sx={{ marginTop: '20px' }} />);
      expect(container).toBeInTheDocument();
    });
  });

  describe('Complex Scenarios', () => {
    it('should handle rapid value changes', () => {
      const { rerender, container } = renderWithTheme(
        <RdsProgress shape="line" value={10} mode="determinate" showLabel={true} />
      );
      for (let i = 20; i <= 100; i += 10) {
        rerender(wrap(<RdsProgress shape="line" value={i} mode="determinate" showLabel={true} />));
      }
      expect(container.querySelector('.rds-progress--line')).toBeInTheDocument();
    });

    it('should handle visual variant changes', () => {
      const { rerender } = renderWithTheme(<RdsProgress shape="line" value={50} mode="determinate" />);
      expect(document.querySelector('.rds-progress--line')).toBeInTheDocument();
      rerender(wrap(<RdsProgress shape="circular" value={50} mode="determinate" />));
      expect(document.querySelector('.rds-progress--circular')).toBeInTheDocument();
    });

    it('should work with all props combined', () => {
      const { container } = renderWithTheme(
        <RdsProgress
          type="linear"
          shape="line"
          value={60}
          mode="determinate"
          color="success"
          showLabel={true}
          label="Processing"
        />
      );
      expect(screen.getByText('Processing')).toBeInTheDocument();
      expect(container.querySelector('.rds-progress--success')).toBeInTheDocument();
    });

    it.each([0, 100])('should handle %s value', (value) => {
      renderWithTheme(<RdsProgress shape="line" value={value} mode="determinate" showLabel={true} />);
      expect(screen.getByText(`${value}%`)).toBeInTheDocument();
    });

    it('should handle values exceeding 100', () => {
      const { container } = renderWithTheme(<RdsProgress shape="dash" value={150} />);
      expect(container).toBeInTheDocument();
    });

    it('should render stepper with all step states', () => {
      const { container } = renderWithTheme(
        <RdsProgress shape="stepper" value={45} totalSteps={5} stepperType="number" />
      );
      const count = (s: string) => container.querySelectorAll(`.rds-progress__stepper-step--${s}`).length;
      expect(count('completed') + count('current') + count('upcoming')).toBe(5);
    });

    it('should handle custom size and thickness for circular', () => {
      const { container } = renderWithTheme(
        <RdsProgress type="circular" shape="circular" value={50} mode="determinate" size={150} thickness={8} />
      );
      expect(container).toBeInTheDocument();
    });

    it('should correctly display steps as progress values', () => {
      const { rerender } = renderWithTheme(<RdsProgress shape="block" steps={1} />);
      const step1Filled = document.querySelectorAll('.rds-progress__block--filled').length;
      rerender(wrap(<RdsProgress shape="block" steps={3} />));
      expect(document.querySelectorAll('.rds-progress__block--filled').length).toBeGreaterThan(step1Filled);
    });
  });

  describe('Edge Cases', () => {
    it('should render with undefined value', () => {
      const { container } = renderWithTheme(<RdsProgress shape="line" mode="indeterminate" />);
      expect(container).toBeInTheDocument();
    });

    it('should render with no props provided', () => {
      const { container } = renderWithTheme(<RdsProgress />);
      expect(container.querySelector('.rds-progress')).toBeInTheDocument();
    });

    it('should handle label without showLabel', () => {
      renderWithTheme(
        <RdsProgress shape="line" value={50} mode="determinate" showLabel={false} label="Should not appear" />
      );
      expect(screen.queryByText('Should not appear')).not.toBeInTheDocument();
    });

    it('should handle negative value gracefully', () => {
      const { container } = renderWithTheme(<RdsProgress shape="line" value={-10} mode="determinate" />);
      expect(container).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has no axe accessibility violations', async () => {
      const { container } = render(<RdsProgress aria-label="Loading progress" shape="line" />);
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});

describe('audit fixes', () => {
  it('warns when deprecated type is passed', () => {
    renderWithTheme(<RdsProgress type="circular" />);
    expect(warnDeprecatedProp).toHaveBeenCalledWith('RdsProgress', 'type', '`shape`');
  });

  it('forwards CSSProperties style to the root', () => {
    const { container } = renderWithTheme(<RdsProgress shape="line" style={{ marginTop: '12px' }} />);
    expect(container.querySelector('.rds-progress')).toHaveStyle('margin-top: 12px');
  });

  it('applies aria props to linear and circular', () => {
    renderWithTheme(<RdsProgress aria-label="Upload" aria-labelledby="lbl" />);
    const bar = screen.getByRole('progressbar');
    expect(bar).toHaveAttribute('aria-label', 'Upload');
    expect(bar).toHaveAttribute('aria-labelledby', 'lbl');
  });

  it('forwards className and rest props on every visual variant', () => {
    const { container } = renderWithTheme(<RdsProgress shape="dash" className="extra" data-testid="root" />);
    expect(screen.getByTestId('root')).toHaveClass('rds-progress', 'extra');
    expect(container.querySelectorAll('.rds-progress__dash')).toHaveLength(5);
  });

  it('derives value from steps/totalSteps and uses totalSteps segments', () => {
    const { container } = renderWithTheme(<RdsProgress shape="block" steps={3} totalSteps={7} />);
    expect(container.querySelectorAll('.rds-progress__block')).toHaveLength(7);
    expect(container.querySelectorAll('.rds-progress__block--filled')).toHaveLength(3);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', String(Math.round(300 / 7)));
  });

  it('exposes progressbar semantics on stepper and supports formatStepLabel and sx array', () => {
    renderWithTheme(
      <RdsProgress shape="block" steps={1} aria-label="Wizard" sx={[{ margin: 1 }]} formatStepLabel={(n) => `S${n}`} />
    );
    const bar = screen.getByRole('progressbar');
    expect(bar).toHaveAttribute('aria-label', 'Wizard');
    expect(bar).toHaveAttribute('aria-valuemax', '100');
    expect(screen.getByText('S2')).toBeInTheDocument();
  });
});

describe('doc-09 renames', () => {
  it('mode="determinate" renders determinate progress', () => {
    const { container } = render(<RdsProgress mode="determinate" value={40} showLabel />);
    expect(screen.getByText('40%')).toBeInTheDocument();
    expect(container.querySelector('.rds-progress--indeterminate')).toBeNull();
  });

  it('deprecated style string still selects the shape and warns', () => {
    const { container } = render(<RdsProgress style="dash" />);
    expect(container.querySelector('.rds-progress--dash')).toBeInTheDocument();
    expect(warnDeprecatedProp).toHaveBeenCalledWith('RdsProgress', 'style', '`shape`');
  });

  it('stepIcon dot matches stepperType circle silently', () => {
    const { container } = render(<RdsProgress shape="stepper" stepIcon="dot" steps={2} />);
    expect(container.querySelectorAll('.rds-progress__stepper-inner-dot')).toHaveLength(5);
    const legacy = render(<RdsProgress shape="stepper" stepperType="circle" steps={2} />);
    expect(legacy.container.querySelectorAll('.rds-progress__stepper-inner-dot')).toHaveLength(5);
  });
});
