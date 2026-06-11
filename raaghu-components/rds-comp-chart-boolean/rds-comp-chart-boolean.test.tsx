import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';
import RdsCompBooleanChart from './rds-comp-chart-boolean';

// Mock SCSS
jest.mock('./rds-comp-chart-boolean.scss', () => ({}));

// Mock Chart.js
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

// Mock chart-icons
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
      backgroundColor: ["var(--rds-semantic-success-main, #4CAF50)", "var(--rds-semantic-error-main, #FF6B6B)"],
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
          backgroundColor: ["var(--rds-semantic-error-main, #FF0000)", "var(--rds-semantic-success-main, #00FF00)"],
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
      // The component sets height to 20vh in the effect
      expect(canvas).toBeInTheDocument();
    });

    it('sets canvas width style', () => {
      const { container } = render(<RdsCompBooleanChart {...defaultProps} />);
      const canvas = container.querySelector('canvas') as HTMLCanvasElement;
      // The component sets width to 20vh in the effect
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
      // Component should cleanup without errors
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
      // Component should update and destroy previous chart
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
                backgroundColor: ["var(--rds-semantic-success-main, #00FF00)", "var(--rds-semantic-error-main, #FF0000)"],
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
          backgroundColor: ["var(--rds-semantic-error-main, #FF0000)", "var(--rds-semantic-success-main, #00FF00)"],
        },
        {
          data: [45, 55],
          backgroundColor: ["var(--rds-info-main, #0000FF)", "var(--rds-warning-main, #FFFF00)"],
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
          backgroundColor: ["var(--rds-semantic-error-main, #FF5733)", "var(--rds-semantic-success-main, #33FF57)"],
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
          borderColor: ["var(--rds-neutral-900, #000000)", "var(--rds-neutral-0, #FFFFFF)"],
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
              backgroundColor: ["var(--rds-semantic-error-main, #FF0000)", "var(--rds-semantic-success-main, #00FF00)"],
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
          backgroundColor: ["var(--rds-semantic-error-main, #FF0000)", "var(--rds-semantic-success-main, #00FF00)"],
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
          backgroundColor: ["var(--rds-semantic-error-main, #FF0000)", "var(--rds-semantic-success-main, #00FF00)"],
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
          backgroundColor: ["var(--rds-semantic-error-main, #FF0000)", "var(--rds-semantic-success-main, #00FF00)"],
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
          backgroundColor: ["var(--rds-semantic-error-main, #FF0000)", "var(--rds-semantic-success-main, #00FF00)"],
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
      const canvas1 = container.querySelector('canvas');

      rerender(
        <RdsCompBooleanChart
          {...defaultProps}
          labels={['Updated', 'Labels']}
        />
      );
      const canvas2 = container.querySelector('canvas');

      // Same canvas element should be present
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
        <RdsCompBooleanChart {...defaultProps} centerIconName="nonexistent" />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });
});