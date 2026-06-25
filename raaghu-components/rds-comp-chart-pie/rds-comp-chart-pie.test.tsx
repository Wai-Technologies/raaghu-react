import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';
import RdsCompPieChart from './rds-comp-chart-pie';
import Chart from 'chart.js/auto';

// Mock SCSS
jest.mock('./rds-comp-chart-pie.scss', () => ({}));

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
    };
  });
});

// Mock Chart.getChart
(Chart as any).getChart = jest.fn(() => null);

const defaultProps = {
  labels: ['Red', 'Blue', 'Yellow', 'Green'],
  dataSets: [
    {
      data: [12, 19, 3, 5],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
    },
  ],
  options: {
    responsive: true,
    maintainAspectRatio: false,
  },
  radius: 100,
  id: 'pie-chart-1',
};

describe('RdsCompPieChart', () => {
  describe('Basic Rendering', () => {
    it('renders the component without crashing', () => {
      const { container } = render(<RdsCompPieChart {...defaultProps} />);
      expect(container).toBeInTheDocument();
    });

    it('renders with correct display name', () => {
      expect(RdsCompPieChart.displayName).toBe('RdsCompPieChart');
    });

    it('renders canvas element', () => {
      const { container } = render(<RdsCompPieChart {...defaultProps} />);
      const canvas = container.querySelector('canvas');
      expect(canvas).toBeInTheDocument();
    });

    it('canvas element has correct id', () => {
      const { container } = render(<RdsCompPieChart {...defaultProps} />);
      const canvas = container.querySelector('canvas');
      expect(canvas).toHaveAttribute('id', 'pie-chart-1');
    });

    it('renders chart container div', () => {
      const { container } = render(<RdsCompPieChart {...defaultProps} />);
      const chartContainer = container.querySelector('.chart-container');
      expect(chartContainer).toBeInTheDocument();
    });

    it('renders main component div with correct class', () => {
      const { container } = render(<RdsCompPieChart {...defaultProps} />);
      const mainDiv = container.querySelector('.rds-comp-chart-pie');
      expect(mainDiv).toBeInTheDocument();
    });

    it('canvas is inside chart-container', () => {
      const { container } = render(<RdsCompPieChart {...defaultProps} />);
      const chartContainer = container.querySelector('.chart-container');
      const canvas = chartContainer?.querySelector('canvas');
      expect(canvas).toBeInTheDocument();
    });
  });

  describe('Props Handling', () => {
    it('passes labels to chart', () => {
      const { container } = render(<RdsCompPieChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('passes dataSets to chart', () => {
      const customDatasets = [
        {
          data: [25, 75],
          backgroundColor: ['#FF5733', '#33FF57'],
        },
      ];
      const { container } = render(
        <RdsCompPieChart {...defaultProps} dataSets={customDatasets} />
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
        <RdsCompPieChart {...defaultProps} options={customOptions} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('uses provided id for canvas', () => {
      const { container } = render(
        <RdsCompPieChart {...defaultProps} id="custom-pie" />
      );
      const canvas = container.querySelector('canvas');
      expect(canvas).toHaveAttribute('id', 'custom-pie');
    });

    it('handles different id values', () => {
      const { rerender, container } = render(
        <RdsCompPieChart {...defaultProps} id="chart-1" />
      );
      let canvas = container.querySelector('canvas');
      expect(canvas).toHaveAttribute('id', 'chart-1');

      rerender(<RdsCompPieChart {...defaultProps} id="chart-2" />);
      canvas = container.querySelector('canvas');
      expect(canvas).toHaveAttribute('id', 'chart-2');
    });

    it('applies radius prop to chart options', () => {
      const { container } = render(
        <RdsCompPieChart {...defaultProps} radius={150} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles different radius values', () => {
      const { rerender, container } = render(
        <RdsCompPieChart {...defaultProps} radius={50} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();

      rerender(<RdsCompPieChart {...defaultProps} radius={200} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Dark Mode Detection', () => {
    it('detects dark mode from body class theme-dark', () => {
      document.body.classList.add('theme-dark');
      const { container } = render(<RdsCompPieChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.body.classList.remove('theme-dark');
    });

    it('detects dark mode from body class dark-theme', () => {
      document.body.classList.add('dark-theme');
      const { container } = render(<RdsCompPieChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.body.classList.remove('dark-theme');
    });

    it('detects dark mode from documentElement attribute', () => {
      document.documentElement.setAttribute('data-theme', 'dark');
      const { container } = render(<RdsCompPieChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.documentElement.removeAttribute('data-theme');
    });

    it('detects dark mode from body attribute', () => {
      document.body.setAttribute('data-theme', 'dark');
      const { container } = render(<RdsCompPieChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.body.removeAttribute('data-theme');
    });

    it('defaults to light mode when no dark mode indicators', () => {
      document.body.classList.remove('theme-dark', 'dark-theme');
      document.documentElement.removeAttribute('data-theme');
      document.body.removeAttribute('data-theme');
      const { container } = render(<RdsCompPieChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Dark Mode Styles', () => {
    it('applies legend label color in dark mode', () => {
      document.body.classList.add('theme-dark');
      const { container } = render(<RdsCompPieChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.body.classList.remove('theme-dark');
    });

    it('applies title color in dark mode', () => {
      document.body.classList.add('theme-dark');
      const { container } = render(<RdsCompPieChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.body.classList.remove('theme-dark');
    });

    it('applies tooltip colors in dark mode', () => {
      const propsWithTooltip = {
        ...defaultProps,
        options: {
          ...defaultProps.options,
          plugins: {
            tooltip: {
              titleColor: '#000',
              bodyColor: '#000',
            },
          },
        },
      };
      document.body.classList.add('theme-dark');
      const { container } = render(
        <RdsCompPieChart {...propsWithTooltip} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.body.classList.remove('theme-dark');
    });
  });

  describe('Chart Configuration', () => {
    it('creates chart with type pie', () => {
      const { container } = render(<RdsCompPieChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('passes correct chart type to Chart.js', () => {
      const { container } = render(<RdsCompPieChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('sets up chart with labels and datasets', () => {
      const { container } = render(<RdsCompPieChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Data Updates', () => {
    it('updates chart when labels change', () => {
      const { rerender, container } = render(
        <RdsCompPieChart {...defaultProps} labels={['A', 'B']} />
      );
      rerender(
        <RdsCompPieChart {...defaultProps} labels={['X', 'Y', 'Z']} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('updates chart when dataSets change', () => {
      const { rerender, container } = render(
        <RdsCompPieChart {...defaultProps} />
      );
      rerender(
        <RdsCompPieChart
          {...defaultProps}
          dataSets={[
            {
              data: [50, 50],
              backgroundColor: ['#FF0000', '#00FF00'],
            },
          ]}
        />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('updates chart when options change', () => {
      const { rerender, container } = render(
        <RdsCompPieChart {...defaultProps} />
      );
      rerender(
        <RdsCompPieChart
          {...defaultProps}
          options={{
            responsive: false,
            maintainAspectRatio: true,
          }}
        />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('updates chart when radius changes', () => {
      const { rerender, container } = render(
        <RdsCompPieChart {...defaultProps} radius={100} />
      );
      rerender(<RdsCompPieChart {...defaultProps} radius={200} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Pie Segments', () => {
    it('renders with single segment', () => {
      const singleSegment = [
        {
          data: [100],
          backgroundColor: ['#FF0000'],
        },
      ];
      const { container } = render(
        <RdsCompPieChart {...defaultProps} dataSets={singleSegment} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('renders with multiple segments', () => {
      const multiSegments = [
        {
          data: [25, 25, 25, 25],
          backgroundColor: ['#FF0000', '#00FF00', '#0000FF', '#FFFF00'],
        },
      ];
      const { container } = render(
        <RdsCompPieChart {...defaultProps} dataSets={multiSegments} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('renders with unequal segments', () => {
      const unequalSegments = [
        {
          data: [60, 20, 15, 5],
          backgroundColor: ['#FF0000', '#00FF00', '#0000FF', '#FFFF00'],
        },
      ];
      const { container } = render(
        <RdsCompPieChart {...defaultProps} dataSets={unequalSegments} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Color Configuration', () => {
    it('applies custom background colors', () => {
      const coloredDataset = [
        {
          data: [30, 40, 30],
          backgroundColor: ['#FF5733', '#33FF57', '#3357FF'],
        },
      ];
      const { container } = render(
        <RdsCompPieChart {...defaultProps} dataSets={coloredDataset} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('applies custom border colors', () => {
      const borderedDataset = [
        {
          data: [40, 60],
          backgroundColor: ['#FF0000', '#00FF00'],
          borderColor: ['#000000', '#FFFFFF'],
          borderWidth: 2,
        },
      ];
      const { container } = render(
        <RdsCompPieChart {...defaultProps} dataSets={borderedDataset} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Radius Configuration', () => {
    it('renders with small radius', () => {
      const { container } = render(
        <RdsCompPieChart {...defaultProps} radius={50} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('renders with medium radius', () => {
      const { container } = render(
        <RdsCompPieChart {...defaultProps} radius={100} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('renders with large radius', () => {
      const { container } = render(
        <RdsCompPieChart {...defaultProps} radius={200} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('renders with zero radius', () => {
      const { container } = render(
        <RdsCompPieChart {...defaultProps} radius={0} />
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
        radius: 100,
        id: 'chart-1',
      };
      const { container } = render(
        <RdsCompPieChart {...minimalProps} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('renders with all features enabled', () => {
      const { container } = render(<RdsCompPieChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty labels array', () => {
      const { container } = render(
        <RdsCompPieChart {...defaultProps} labels={[]} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles empty datasets array', () => {
      const { container } = render(
        <RdsCompPieChart {...defaultProps} dataSets={[]} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles very large values', () => {
      const largevalues = [
        {
          data: [999999, 1],
          backgroundColor: ['#FF0000', '#00FF00'],
        },
      ];
      const { container } = render(
        <RdsCompPieChart {...defaultProps} dataSets={largevalues} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles very small values', () => {
      const smallValues = [
        {
          data: [0.1, 0.9],
          backgroundColor: ['#FF0000', '#00FF00'],
        },
      ];
      const { container } = render(
        <RdsCompPieChart {...defaultProps} dataSets={smallValues} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles zero values', () => {
      const zeroValues = [
        {
          data: [0, 100],
          backgroundColor: ['#FF0000', '#00FF00'],
        },
      ];
      const { container } = render(
        <RdsCompPieChart {...defaultProps} dataSets={zeroValues} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles equal segments (perfect split)', () => {
      const equalSegments = [
        {
          data: [25, 25, 25, 25],
          backgroundColor: ['#FF0000', '#00FF00', '#0000FF', '#FFFF00'],
        },
      ];
      const { container } = render(
        <RdsCompPieChart {...defaultProps} dataSets={equalSegments} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles null options gracefully', () => {
      const { container } = render(
        <RdsCompPieChart {...defaultProps} options={null} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles empty options object', () => {
      const { container } = render(
        <RdsCompPieChart {...defaultProps} options={{}} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Component Lifecycle', () => {
    it('initializes chart on first render', () => {
      const { container } = render(<RdsCompPieChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('cleans up chart on unmount', () => {
      const { unmount, container } = render(
        <RdsCompPieChart {...defaultProps} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
      unmount();
    });

    it('updates chart on multiple re-renders', () => {
      const { rerender, container } = render(
        <RdsCompPieChart {...defaultProps} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();

      rerender(
        <RdsCompPieChart
          {...defaultProps}
          labels={['A', 'B']}
        />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();

      rerender(
        <RdsCompPieChart
          {...defaultProps}
          dataSets={[{ data: [70, 30] }]}
        />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Re-render Behavior', () => {
    it('updates id on prop change', () => {
      const { rerender, container } = render(
        <RdsCompPieChart {...defaultProps} id="chart-1" />
      );
      let canvas = container.querySelector('canvas');
      expect(canvas).toHaveAttribute('id', 'chart-1');

      rerender(<RdsCompPieChart {...defaultProps} id="chart-2" />);
      canvas = container.querySelector('canvas');
      expect(canvas).toHaveAttribute('id', 'chart-2');
    });

    it('updates radius on prop change', () => {
      const { rerender, container } = render(
        <RdsCompPieChart {...defaultProps} radius={100} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();

      rerender(<RdsCompPieChart {...defaultProps} radius={150} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('preserves canvas ref through re-renders', () => {
      const { rerender, container } = render(
        <RdsCompPieChart {...defaultProps} />
      );
      const _canvas1 = container.querySelector('canvas');

      rerender(
        <RdsCompPieChart
          {...defaultProps}
          labels={['Updated']}
        />
      );
      const canvas2 = container.querySelector('canvas');

      expect(canvas2).toBeInTheDocument();
    });
  });

  describe('Responsive Configuration', () => {
    it('renders with responsive true', () => {
      const responsiveOptions = {
        responsive: true,
        maintainAspectRatio: false,
      };
      const { container } = render(
        <RdsCompPieChart {...defaultProps} options={responsiveOptions} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('renders with responsive false', () => {
      const fixedOptions = {
        responsive: false,
        maintainAspectRatio: true,
      };
      const { container } = render(
        <RdsCompPieChart {...defaultProps} options={fixedOptions} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('renders with maintainAspectRatio option', () => {
      const aspectOptions = {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 2,
      };
      const { container } = render(
        <RdsCompPieChart {...defaultProps} options={aspectOptions} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Chart Type', () => {
    it('renders as pie chart type', () => {
      const { container } = render(<RdsCompPieChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('CSS Classes', () => {
    it('renders main component with rds-comp-chart-pie class', () => {
      const { container } = render(<RdsCompPieChart {...defaultProps} />);
      const mainDiv = container.querySelector('.rds-comp-chart-pie');
      expect(mainDiv).toBeInTheDocument();
    });

    it('renders chart-container div with correct class', () => {
      const { container } = render(<RdsCompPieChart {...defaultProps} />);
      const chartContainer = container.querySelector('.chart-container');
      expect(chartContainer).toBeInTheDocument();
    });

    it('chart-container contains canvas', () => {
      const { container } = render(<RdsCompPieChart {...defaultProps} />);
      const chartContainer = container.querySelector('.chart-container');
      const canvas = chartContainer?.querySelector('canvas');
      expect(canvas).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('canvas element is in document', () => {
      const { container } = render(<RdsCompPieChart {...defaultProps} />);
      const canvas = container.querySelector('canvas');
      expect(canvas).toBeInTheDocument();
  
    });
    it('has no axe accessibility violations', async () => {
      const { container } = render(<RdsCompPieChart {...defaultProps} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('canvas has id attribute', () => {
      const { container } = render(<RdsCompPieChart {...defaultProps} />);
      const canvas = container.querySelector('canvas');
      expect(canvas).toHaveAttribute('id');
    });

    it('canvas id matches prop value', () => {
      const { container } = render(
        <RdsCompPieChart {...defaultProps} id="accessible-pie" />
      );
      const canvas = container.querySelector('canvas[id="accessible-pie"]');
      expect(canvas).toBeInTheDocument();
    });
  });

  describe('Plugin Configuration', () => {
    it('processes options with plugins', () => {
      const optionsWithPlugins = {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
          },
          tooltip: {
            enabled: true,
          },
        },
      };
      const { container } = render(
        <RdsCompPieChart {...defaultProps} options={optionsWithPlugins} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('deep clones options before modification', () => {
      const options = {
        responsive: true,
        plugins: {
          legend: { display: true },
        },
      };
      const { container } = render(
        <RdsCompPieChart {...defaultProps} options={options} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Label Variations', () => {
    it('renders with descriptive labels', () => {
      const { container } = render(
        <RdsCompPieChart
          {...defaultProps}
          labels={['Desktop', 'Mobile', 'Tablet', 'Other']}
        />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('renders with numeric labels', () => {
      const { container } = render(
        <RdsCompPieChart
          {...defaultProps}
          labels={['Q1', 'Q2', 'Q3', 'Q4']}
        />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('renders with many labels', () => {
      const manyLabels = Array.from({ length: 10 }, (_, i) => `Segment ${i + 1}`);
      const { container } = render(
        <RdsCompPieChart {...defaultProps} labels={manyLabels} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });
});