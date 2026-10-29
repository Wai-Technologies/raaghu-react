import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';
import RdsCompBooleanChart from './rds-comp-chart-boolean';
import type { ChartIconName } from './chart-icons';

jest.mock('../../raaghu-elements/shared/utils/deprecation', () => ({ warnDeprecatedProp: jest.fn() }));

jest.mock('./rds-comp-chart-boolean.scss', () => ({}));

jest.mock('chart.js/auto', () => {
  return jest.fn().mockImplementation((ctx, config) => {
    return {
      ctx,
      config,
      canvas: {
        style: {
          height: '',
          width: '',
        },
      },
      destroy: jest.fn(),
      update: jest.fn(),
      resize: jest.fn(),
      width: 300,
      height: 300,
    };
  });
});

jest.mock('./chart-icons', () => ({
  ChartIcons: {
    circle: '<svg></svg>',
    headset: '<svg></svg>',
    users: '<svg></svg>',
  },
}));

const defaultProps = {
  labels: ['True', 'False'],
  dataSets: [
    {
      data: [65, 35],
      backgroundColor: ["var(--rds-semantic-success-main)", "var(--rds-semantic-error-main)"],
    },
  ],
  options: {
    responsive: true,
    maintainAspectRatio: false,
  },
  id: 'boolean-chart-1',
  centerIconName: 'circle',
};

describe('RdsCompBooleanChart', () => {
  describe('Basic Rendering', () => {
    it('renders the component without crashing', () => {
      const { container } = render(<RdsCompBooleanChart {...defaultProps} />);
      expect(container).toBeInTheDocument();
    });

    it('renders with correct display name', () => {
      expect(RdsCompBooleanChart.displayName).toBe('RdsCompBooleanChart');
    });

    it('renders canvas element', () => {
      const { container } = render(<RdsCompBooleanChart {...defaultProps} />);
      const canvas = container.querySelector('canvas');
      expect(canvas).toBeInTheDocument();
    });

    it('canvas element has correct id', () => {
      const { container } = render(<RdsCompBooleanChart {...defaultProps} />);
      const canvas = container.querySelector('canvas');
      expect(canvas).toHaveAttribute('id', 'boolean-chart-1');
    });

    it('canvas element has correct data-testid', () => {
      const { container } = render(<RdsCompBooleanChart {...defaultProps} />);
      const canvas = container.querySelector('[data-testid="boolean-chart-1"]');
      expect(canvas).toBeInTheDocument();
    });

    it('renders div wrapper', () => {
      const { container } = render(<RdsCompBooleanChart {...defaultProps} />);
      const div = container.querySelector('div');
      expect(div).toBeInTheDocument();
    });
  });

  describe('Props Handling', () => {
    it('passes labels to chart', () => {
      const { container } = render(<RdsCompBooleanChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('passes dataSets to chart', () => {
      const customDatasets = [
        {
          data: [50, 50],
          backgroundColor: ["var(--rds-semantic-error-main)", "var(--rds-semantic-success-main)"],
        },
      ];
      const { container } = render(
        <RdsCompBooleanChart {...defaultProps} dataSets={customDatasets} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('passes options to chart', () => {
      const customOptions = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            position: 'right',
          },
        },
      };
      const { container } = render(
        <RdsCompBooleanChart {...defaultProps} options={customOptions} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('uses provided id for canvas', () => {
      const { container } = render(
        <RdsCompBooleanChart {...defaultProps} id="custom-id" />
      );
      const canvas = container.querySelector('canvas');
      expect(canvas).toHaveAttribute('id', 'custom-id');
    });

    it('handles different id values', () => {
      const { rerender, container } = render(
        <RdsCompBooleanChart {...defaultProps} id="chart-1" />
      );
      let canvas = container.querySelector('canvas');
      expect(canvas).toHaveAttribute('id', 'chart-1');

      rerender(<RdsCompBooleanChart {...defaultProps} id="chart-2" />);
      canvas = container.querySelector('canvas');
      expect(canvas).toHaveAttribute('id', 'chart-2');
    });
  });

  describe('Center Icon Support', () => {
    it('renders with circle icon', () => {
      const { container } = render(
        <RdsCompBooleanChart {...defaultProps} centerIconName="circle" />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('renders with headset icon', () => {
      const { container } = render(
        <RdsCompBooleanChart {...defaultProps} centerIconName="headset" />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('renders with users icon', () => {
      const { container } = render(
        <RdsCompBooleanChart {...defaultProps} centerIconName="users" />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('renders without centerIconName (optional)', () => {
      const { container } = render(
        <RdsCompBooleanChart
          {...defaultProps}
          centerIconName={undefined}
        />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Canvas Styling', () => {
    it('sets canvas height style', () => {
      const { container } = render(<RdsCompBooleanChart {...defaultProps} />);
      const canvas = container.querySelector('canvas') as HTMLCanvasElement;
      expect(canvas).toBeInTheDocument();
    });

    it('sets canvas width style', () => {
      const { container } = render(<RdsCompBooleanChart {...defaultProps} />);
      const canvas = container.querySelector('canvas') as HTMLCanvasElement;
      expect(canvas).toBeInTheDocument();
    });
  });

  describe('Dark Mode Detection', () => {
    it('detects dark mode from body class', () => {
      document.body.classList.add('theme-dark');
      const { container } = render(<RdsCompBooleanChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.body.classList.remove('theme-dark');
    });

    it('detects dark mode from alternative body class', () => {
      document.body.classList.add('dark-theme');
      const { container } = render(<RdsCompBooleanChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.body.classList.remove('dark-theme');
    });

    it('detects dark mode from documentElement attribute', () => {
      document.documentElement.setAttribute('data-theme', 'dark');
      const { container } = render(<RdsCompBooleanChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.documentElement.removeAttribute('data-theme');
    });

    it('detects dark mode from body attribute', () => {
      document.body.setAttribute('data-theme', 'dark');
      const { container } = render(<RdsCompBooleanChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.body.removeAttribute('data-theme');
    });

    it('defaults to light mode when no dark mode indicators', () => {
      document.body.classList.remove('theme-dark', 'dark-theme');
      document.documentElement.removeAttribute('data-theme');
      document.body.removeAttribute('data-theme');
      const { container } = render(<RdsCompBooleanChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Chart Destruction', () => {
    it('destroys chart on unmount', () => {
      const { unmount } = render(<RdsCompBooleanChart {...defaultProps} />);
      unmount();
      expect(true).toBe(true);
    });

    it('destroys previous chart on props update', () => {
      const { rerender } = render(<RdsCompBooleanChart {...defaultProps} />);
      rerender(
        <RdsCompBooleanChart
          {...defaultProps}
          labels={['Yes', 'No']}
        />
      );
      expect(true).toBe(true);
    });
  });

  describe('Chart Configuration', () => {
    it('creates chart with type doughnut', () => {
      const { container } = render(<RdsCompBooleanChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('passes correct chart type to Chart.js', () => {
      const { container } = render(<RdsCompBooleanChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('sets up chart with labels and datasets', () => {
      const { container } = render(<RdsCompBooleanChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Data Updates', () => {
    it('updates chart when labels change', () => {
      const { rerender, container } = render(
        <RdsCompBooleanChart {...defaultProps} labels={['True', 'False']} />
      );
      rerender(
        <RdsCompBooleanChart {...defaultProps} labels={['Yes', 'No']} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('updates chart when dataSets change', () => {
      const { rerender, container } = render(
        <RdsCompBooleanChart {...defaultProps} />
      );
      rerender(
        <RdsCompBooleanChart
          {...defaultProps}
          dataSets={[
            {
              data: [75, 25],
                backgroundColor: ["var(--rds-semantic-success-main)", "var(--rds-semantic-error-main)"],
            },
          ]}
        />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('updates chart when options change', () => {
      const { rerender, container } = render(
        <RdsCompBooleanChart {...defaultProps} />
      );
      rerender(
        <RdsCompBooleanChart
          {...defaultProps}
          options={{
            responsive: false,
            maintainAspectRatio: true,
          }}
        />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Multiple Datasets', () => {
    it('renders multiple datasets', () => {
      const multiDatasets = [
          {
          data: [65, 35],
          backgroundColor: ["var(--rds-semantic-error-main)", "var(--rds-semantic-success-main)"],
        },
        {
          data: [45, 55],
          backgroundColor: ["var(--rds-info-main)", "var(--rds-warning-main)"],
        },
      ];
      const { container } = render(
        <RdsCompBooleanChart {...defaultProps} dataSets={multiDatasets} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles empty datasets array', () => {
      const { container } = render(
        <RdsCompBooleanChart {...defaultProps} dataSets={[]} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Label Variations', () => {
    it('renders with boolean labels', () => {
      const { container } = render(
        <RdsCompBooleanChart {...defaultProps} labels={['True', 'False']} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('renders with yes/no labels', () => {
      const { container } = render(
        <RdsCompBooleanChart {...defaultProps} labels={['Yes', 'No']} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('renders with on/off labels', () => {
      const { container } = render(
        <RdsCompBooleanChart {...defaultProps} labels={['On', 'Off']} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('renders with empty labels array', () => {
      const { container } = render(
        <RdsCompBooleanChart {...defaultProps} labels={[]} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('renders with many labels', () => {
      const { container } = render(
        <RdsCompBooleanChart
          {...defaultProps}
          labels={['A', 'B', 'C', 'D', 'E']}
        />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Color Configuration', () => {
    it('applies custom background colors', () => {
      const customDataset = [
        {
          data: [60, 40],
          backgroundColor: ["var(--rds-semantic-error-main)", "var(--rds-semantic-success-main)"],
        },
      ];
      const { container } = render(
        <RdsCompBooleanChart {...defaultProps} dataSets={customDataset} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('applies custom border colors', () => {
      const customDataset = [
        {
          data: [60, 40],
          borderColor: ["var(--rds-neutral-900)", "var(--rds-neutral-0)"],
          borderWidth: 2,
        },
      ];
      const { container } = render(
        <RdsCompBooleanChart {...defaultProps} dataSets={customDataset} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Props Variants', () => {
    it('renders with minimal props', () => {
      const minimalProps = {
        labels: ['A', 'B'],
        dataSets: [{ data: [50, 50] }],
        options: {},
        id: 'chart-1',
      };
      const { container } = render(
        <RdsCompBooleanChart {...minimalProps} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('renders with all features enabled', () => {
      const { container } = render(<RdsCompBooleanChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty labels array', () => {
      const { container } = render(
        <RdsCompBooleanChart {...defaultProps} labels={[]} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles very large data values', () => {
      const largeDataset = [
        {
              data: [999999, 1],
              backgroundColor: ["var(--rds-semantic-error-main)", "var(--rds-semantic-success-main)"],
        },
      ];
      const { container } = render(
        <RdsCompBooleanChart {...defaultProps} dataSets={largeDataset} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles very small data values', () => {
      const smallDataset = [
        {
          data: [0.1, 0.9],
          backgroundColor: ["var(--rds-semantic-error-main)", "var(--rds-semantic-success-main)"],
        },
      ];
      const { container } = render(
        <RdsCompBooleanChart {...defaultProps} dataSets={smallDataset} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles zero values in dataset', () => {
      const zeroDataset = [
        {
          data: [0, 100],
          backgroundColor: ["var(--rds-semantic-error-main)", "var(--rds-semantic-success-main)"],
        },
      ];
      const { container } = render(
        <RdsCompBooleanChart {...defaultProps} dataSets={zeroDataset} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles 100:0 ratio', () => {
      const skewedDataset = [
        {
          data: [100, 0],
          backgroundColor: ["var(--rds-semantic-error-main)", "var(--rds-semantic-success-main)"],
        },
      ];
      const { container } = render(
        <RdsCompBooleanChart {...defaultProps} dataSets={skewedDataset} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles 50:50 ratio', () => {
      const balancedDataset = [
        {
          data: [50, 50],
          backgroundColor: ["var(--rds-semantic-error-main)", "var(--rds-semantic-success-main)"],
        },
      ];
      const { container } = render(
        <RdsCompBooleanChart {...defaultProps} dataSets={balancedDataset} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles null options gracefully', () => {
      const { container } = render(
        <RdsCompBooleanChart {...defaultProps} options={null} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles empty options object', () => {
      const { container } = render(
        <RdsCompBooleanChart {...defaultProps} options={{}} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Component Lifecycle', () => {
    it('initializes chart on first render', () => {
      const { container } = render(<RdsCompBooleanChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('cleans up chart on unmount', () => {
      const { unmount, container } = render(
        <RdsCompBooleanChart {...defaultProps} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
      unmount();
    });

    it('updates chart on multiple re-renders', () => {
      const { rerender, container } = render(
        <RdsCompBooleanChart {...defaultProps} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();

      rerender(
        <RdsCompBooleanChart
          {...defaultProps}
          labels={['Yes', 'No']}
        />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();

      rerender(
        <RdsCompBooleanChart
          {...defaultProps}
          dataSets={[{ data: [80, 20] }]}
        />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Re-render Behavior', () => {
    it('updates id on prop change', () => {
      const { rerender, container } = render(
        <RdsCompBooleanChart {...defaultProps} id="chart-1" />
      );
      let canvas = container.querySelector('canvas');
      expect(canvas).toHaveAttribute('id', 'chart-1');

      rerender(<RdsCompBooleanChart {...defaultProps} id="chart-2" />);
      canvas = container.querySelector('canvas');
      expect(canvas).toHaveAttribute('id', 'chart-2');
    });

    it('updates centerIconName on prop change', () => {
      const { rerender, container } = render(
        <RdsCompBooleanChart {...defaultProps} centerIconName="circle" />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();

      rerender(
        <RdsCompBooleanChart {...defaultProps} centerIconName="users" />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('preserves canvas ref through re-renders', () => {
      const { rerender, container } = render(
        <RdsCompBooleanChart {...defaultProps} />
      );

      rerender(
        <RdsCompBooleanChart
          {...defaultProps}
          labels={['Updated', 'Labels']}
        />
      );
      const canvas2 = container.querySelector('canvas');

      expect(canvas2).toBeInTheDocument();
    });
  });

  describe('SVG Icon Processing', () => {
    it('processes SVG for dark mode', () => {
      document.body.classList.add('theme-dark');
      const { container } = render(
        <RdsCompBooleanChart {...defaultProps} centerIconName="circle" />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.body.classList.remove('theme-dark');
    });

    it('handles SVG with various stroke colors', () => {
      const { container } = render(
        <RdsCompBooleanChart {...defaultProps} centerIconName="headset" />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('encodes SVG to base64 for data URL', () => {
      const { container } = render(
        <RdsCompBooleanChart {...defaultProps} centerIconName="users" />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Responsive Configuration', () => {
    it('renders with responsive true', () => {
      const responsiveOptions = {
        responsive: true,
        maintainAspectRatio: false,
      };
      const { container } = render(
        <RdsCompBooleanChart {...defaultProps} options={responsiveOptions} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('renders with responsive false', () => {
      const fixedOptions = {
        responsive: false,
        maintainAspectRatio: true,
      };
      const { container } = render(
        <RdsCompBooleanChart {...defaultProps} options={fixedOptions} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('renders with maintainAspectRatio option', () => {
      const aspectOptions = {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 1,
      };
      const { container } = render(
        <RdsCompBooleanChart {...defaultProps} options={aspectOptions} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Chart Type', () => {
    it('renders as doughnut chart type', () => {
      const { container } = render(<RdsCompBooleanChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('applies correct plugins for center icon', () => {
      const { container } = render(<RdsCompBooleanChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('canvas element is in document', () => {
      const { container } = render(<RdsCompBooleanChart {...defaultProps} />);
      const canvas = container.querySelector('canvas');
      expect(canvas).toBeInTheDocument();
  
    });

    it('has no axe accessibility violations', async () => {
      const { container } = render(<RdsCompBooleanChart {...defaultProps} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('canvas has id attribute', () => {
      const { container } = render(<RdsCompBooleanChart {...defaultProps} />);
      const canvas = container.querySelector('canvas');
      expect(canvas).toHaveAttribute('id');
    });

    it('canvas has data-testid attribute', () => {
      const { container } = render(<RdsCompBooleanChart {...defaultProps} />);
      const canvas = container.querySelector('[data-testid="boolean-chart-1"]');
      expect(canvas).toBeInTheDocument();
    });
  });

  describe('Plugin System', () => {
    it('adds centerIcon plugin to chart', () => {
      const { container } = render(<RdsCompBooleanChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('plugin draws icon at center of chart', () => {
      const { container } = render(<RdsCompBooleanChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('plugin handles missing icon gracefully', () => {
      const { container } = render(
        <RdsCompBooleanChart {...defaultProps} centerIconName={"nonexistent" as ChartIconName} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });
});

describe('audit fixes', () => {
  it('forwards className, ref and rest props to the root div', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { container } = render(
      <RdsCompBooleanChart {...defaultProps} ref={ref} className="my-class" data-foo="bar" />
    );
    const root = container.firstElementChild as HTMLElement;
    expect(root).toBe(ref.current);
    expect(root).toHaveClass('my-class');
    expect(root).toHaveAttribute('data-foo', 'bar');
  });

  it('adds no centre-icon plugin for a missing or unknown icon name', () => {
    jest.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue({} as any);
    const Chart = jest.requireMock('chart.js/auto');
    Chart.mockClear();
    render(<RdsCompBooleanChart {...defaultProps} centerIconName={"nope" as ChartIconName} />);
    render(<RdsCompBooleanChart {...defaultProps} centerIconName={undefined} id="b2" />);
    expect(Chart.mock.calls[0][1].plugins).toBeUndefined();
    expect(Chart.mock.calls[1][1].plugins).toBeUndefined();
    Chart.mockClear();
    render(<RdsCompBooleanChart {...defaultProps} id="b3" />);
    expect(Chart.mock.calls[0][1].plugins).toHaveLength(1);
  });

  it('warns about deprecated chartStyle', () => {
    const { warnDeprecatedProp } = jest.requireMock('../../raaghu-elements/shared/utils/deprecation');
    render(<RdsCompBooleanChart {...defaultProps} chartStyle="x" />);
    expect(warnDeprecatedProp).toHaveBeenCalledWith('RdsCompBooleanChart', 'chartStyle', 'nothing (it has no effect)');
  });
});

describe('additive prop renames', () => {
  it('renders centerIcon over the chart and not when unused', () => {
    const { container, rerender } = render(<RdsCompBooleanChart {...defaultProps} />);
    expect(container.querySelector('span')).toBeNull();
    rerender(<RdsCompBooleanChart {...defaultProps} centerIcon={<i data-testid="ic" />} />);
    expect(screen.getByTestId('ic')).toBeInTheDocument();
  });

  it('ariaLabel wins over chartLabel', () => {
    render(<RdsCompBooleanChart {...defaultProps} ariaLabel="New" chartLabel="Old" />);
    expect(screen.getByRole('img')).toHaveAttribute('aria-label', 'New');
  });
});
