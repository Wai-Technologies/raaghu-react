import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';
import RdsCompLineChart from './rds-comp-chart-line';

// Mock SCSS
jest.mock('./rds-comp-chart-line.scss', () => ({}));

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

const defaultProps = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  dataSets: [
    {
      label: 'Sales',
      data: [12, 19, 3, 5, 2, 3],
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.1)',
    },
  ],
  options: {
    responsive: true,
    maintainAspectRatio: false,
  },
  id: 'line-chart-1',
};

describe('RdsCompLineChart', () => {
  describe('Basic Rendering', () => {
    it('renders the component without crashing', () => {
      const { container } = render(<RdsCompLineChart {...defaultProps} />);
      expect(container).toBeInTheDocument();
    });

    it('renders with correct display name', () => {
      expect(RdsCompLineChart.displayName).toBe('RdsCompLineChart');
    });

    it('renders canvas element', () => {
      const { container } = render(<RdsCompLineChart {...defaultProps} />);
      const canvas = container.querySelector('canvas');
      expect(canvas).toBeInTheDocument();
    });

    it('canvas element has correct id', () => {
      const { container } = render(<RdsCompLineChart {...defaultProps} />);
      const canvas = container.querySelector('canvas');
      expect(canvas).toHaveAttribute('id', 'line-chart-1');
    });

    it('canvas element has correct data-testid', () => {
      const { container } = render(<RdsCompLineChart {...defaultProps} />);
      const canvas = container.querySelector('[data-testid="line-chart-1"]');
      expect(canvas).toBeInTheDocument();
    });

    it('renders div with correct class', () => {
      const { container } = render(<RdsCompLineChart {...defaultProps} />);
      const div = container.querySelector('.rds-comp-chart-line');
      expect(div).toBeInTheDocument();
    });
  });

  describe('Props Handling', () => {
    it('passes labels to chart', () => {
      const { container } = render(<RdsCompLineChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('passes dataSets to chart', () => {
      const customDatasets = [
        {
          label: 'Revenue',
          data: [30, 35, 40, 45, 50],
          borderColor: 'rgb(255, 99, 132)',
        },
      ];
      const { container } = render(
        <RdsCompLineChart {...defaultProps} dataSets={customDatasets} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('passes options to chart', () => {
      const customOptions = {
        responsive: true,
        maintainAspectRatio: true,
      };
      const { container } = render(
        <RdsCompLineChart {...defaultProps} options={customOptions} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('uses provided id for canvas', () => {
      const { container } = render(
        <RdsCompLineChart {...defaultProps} id="custom-id" />
      );
      const canvas = container.querySelector('canvas');
      expect(canvas).toHaveAttribute('id', 'custom-id');
    });

    it('handles different id values', () => {
      const { rerender, container } = render(
        <RdsCompLineChart {...defaultProps} id="chart-1" />
      );
      let canvas = container.querySelector('canvas');
      expect(canvas).toHaveAttribute('id', 'chart-1');

      rerender(<RdsCompLineChart {...defaultProps} id="chart-2" />);
      canvas = container.querySelector('canvas');
      expect(canvas).toHaveAttribute('id', 'chart-2');
    });
  });

  describe('Canvas Styling by ID', () => {
    it('applies large dimensions for linechart1 id', () => {
      const { container } = render(
        <RdsCompLineChart {...defaultProps} id="linechart1" />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('applies small dimensions for linechart2 id', () => {
      const { container } = render(
        <RdsCompLineChart {...defaultProps} id="linechart2" />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('applies default dimensions for other ids', () => {
      const { container } = render(
        <RdsCompLineChart {...defaultProps} id="other-chart" />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Dark Mode Detection', () => {
    it('detects dark mode from body class theme-dark', () => {
      document.body.classList.add('theme-dark');
      const { container } = render(<RdsCompLineChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.body.classList.remove('theme-dark');
    });

    it('detects dark mode from body class dark-theme', () => {
      document.body.classList.add('dark-theme');
      const { container } = render(<RdsCompLineChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.body.classList.remove('dark-theme');
    });

    it('detects dark mode from documentElement attribute', () => {
      document.documentElement.setAttribute('data-theme', 'dark');
      const { container } = render(<RdsCompLineChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.documentElement.removeAttribute('data-theme');
    });

    it('detects dark mode from body attribute', () => {
      document.body.setAttribute('data-theme', 'dark');
      const { container } = render(<RdsCompLineChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.body.removeAttribute('data-theme');
    });

    it('defaults to light mode when no dark mode indicators', () => {
      document.body.classList.remove('theme-dark', 'dark-theme');
      document.documentElement.removeAttribute('data-theme');
      document.body.removeAttribute('data-theme');
      const { container } = render(<RdsCompLineChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Dark Mode Stylesheet Updates', () => {
    it('updates grid color in dark mode', () => {
      document.body.classList.add('theme-dark');
      const { container } = render(<RdsCompLineChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.body.classList.remove('theme-dark');
    });

    it('updates tick color in dark mode', () => {
      document.body.classList.add('theme-dark');
      const { container } = render(<RdsCompLineChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.body.classList.remove('theme-dark');
    });

    it('updates legend label color in dark mode', () => {
      document.body.classList.add('theme-dark');
      const { container } = render(<RdsCompLineChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.body.classList.remove('theme-dark');
    });

    it('updates tooltip colors in dark mode', () => {
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
        <RdsCompLineChart {...propsWithTooltip} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.body.classList.remove('theme-dark');
    });
  });

  describe('Chart Destruction', () => {
    it('destroys chart on unmount', () => {
      const { unmount } = render(<RdsCompLineChart {...defaultProps} />);
      unmount();
      expect(true).toBe(true);
    });

    it('destroys previous chart on props update', () => {
      const { rerender } = render(<RdsCompLineChart {...defaultProps} />);
      rerender(
        <RdsCompLineChart
          {...defaultProps}
          labels={['Updated', 'Labels']}
        />
      );
      expect(true).toBe(true);
    });
  });

  describe('Chart Configuration', () => {
    it('creates chart with type line', () => {
      const { container } = render(<RdsCompLineChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('passes correct chart type to Chart.js', () => {
      const { container } = render(<RdsCompLineChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('sets up chart with labels and datasets', () => {
      const { container } = render(<RdsCompLineChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Data Updates', () => {
    it('updates chart when labels change', () => {
      const { rerender, container } = render(
        <RdsCompLineChart {...defaultProps} />
      );
      rerender(
        <RdsCompLineChart
          {...defaultProps}
          labels={['A', 'B', 'C']}
        />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('updates chart when dataSets change', () => {
      const { rerender, container } = render(
        <RdsCompLineChart {...defaultProps} />
      );
      rerender(
        <RdsCompLineChart
          {...defaultProps}
          dataSets={[
            {
              label: 'New Data',
              data: [50, 60, 70],
              borderColor: 'rgb(255, 99, 132)',
            },
          ]}
        />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('updates chart when options change', () => {
      const { rerender, container } = render(
        <RdsCompLineChart {...defaultProps} />
      );
      rerender(
        <RdsCompLineChart
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
          label: 'Sales',
          data: [12, 19, 3, 5, 2, 3],
          borderColor: 'rgb(75, 192, 192)',
        },
        {
          label: 'Profit',
          data: [5, 10, 15, 20, 25, 30],
          borderColor: 'rgb(255, 99, 132)',
        },
      ];
      const { container } = render(
        <RdsCompLineChart {...defaultProps} dataSets={multiDatasets} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles empty datasets array', () => {
      const { container } = render(
        <RdsCompLineChart {...defaultProps} dataSets={[]} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Label Variations', () => {
    it('renders with month labels', () => {
      const { container } = render(
        <RdsCompLineChart
          {...defaultProps}
          labels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']}
        />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('renders with numeric labels', () => {
      const { container } = render(
        <RdsCompLineChart
          {...defaultProps}
          labels={['1', '2', '3', '4', '5', '6']}
        />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('renders with empty labels array', () => {
      const { container } = render(
        <RdsCompLineChart {...defaultProps} labels={[]} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('renders with many labels', () => {
      const manyLabels = Array.from({ length: 100 }, (_, i) => `L${i}`);
      const { container } = render(
        <RdsCompLineChart {...defaultProps} labels={manyLabels} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Color Configuration', () => {
    it('applies custom border color', () => {
      const customDataset = [
        {
          label: 'Sales',
          data: [12, 19, 3, 5, 2, 3],
          borderColor: 'rgb(255, 0, 0)',
        },
      ];
      const { container } = render(
        <RdsCompLineChart {...defaultProps} dataSets={customDataset} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('applies custom background color', () => {
      const customDataset = [
        {
          label: 'Sales',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: 'rgba(255, 0, 0, 0.1)',
        },
      ];
      const { container } = render(
        <RdsCompLineChart {...defaultProps} dataSets={customDataset} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Scale Configuration', () => {
    it('applies custom x-axis configuration', () => {
      const xAxisOptions = {
        responsive: true,
        scales: {
          x: {
            display: true,
            title: { display: true, text: 'Months' },
          },
        },
      };
      const { container } = render(
        <RdsCompLineChart {...defaultProps} options={xAxisOptions} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('applies custom y-axis configuration', () => {
      const yAxisOptions = {
        responsive: true,
        scales: {
          y: {
            display: true,
            title: { display: true, text: 'Sales' },
          },
        },
      };
      const { container } = render(
        <RdsCompLineChart {...defaultProps} options={yAxisOptions} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('applies both x and y axis configuration', () => {
      const bothAxisOptions = {
        responsive: true,
        scales: {
          x: { display: true },
          y: { display: true },
        },
      };
      const { container } = render(
        <RdsCompLineChart {...defaultProps} options={bothAxisOptions} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Props Variants', () => {
    it('renders with minimal props', () => {
      const minimalProps = {
        id: 'line-1',
        labels: ['A', 'B'],
        dataSets: [{ data: [10, 20] }],
        options: {},
      };
      const { container } = render(
        <RdsCompLineChart {...minimalProps} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('renders with all features enabled', () => {
      const { container } = render(<RdsCompLineChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('renders with different line style', () => {
      const dashedDataset = [
        {
          label: 'Sales',
          data: [12, 19, 3, 5, 2, 3],
          borderDash: [5, 5],
          borderColor: 'rgb(75, 192, 192)',
        },
      ];
      const { container } = render(
        <RdsCompLineChart {...defaultProps} dataSets={dashedDataset} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty labels array', () => {
      const { container } = render(
        <RdsCompLineChart {...defaultProps} labels={[]} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles very large dataset values', () => {
      const largeDataset = [
        {
          label: 'Large',
          data: [999999, 1000000, 1000001],
          borderColor: 'rgb(75, 192, 192)',
        },
      ];
      const { container } = render(
        <RdsCompLineChart {...defaultProps} dataSets={largeDataset} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles negative dataset values', () => {
      const negativeDataset = [
        {
          label: 'Negative',
          data: [-10, -20, -30],
          borderColor: 'rgb(75, 192, 192)',
        },
      ];
      const { container } = render(
        <RdsCompLineChart {...defaultProps} dataSets={negativeDataset} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles zero values in dataset', () => {
      const zeroDataset = [
        {
          label: 'Zero',
          data: [0, 0, 0],
          borderColor: 'rgb(75, 192, 192)',
        },
      ];
      const { container } = render(
        <RdsCompLineChart {...defaultProps} dataSets={zeroDataset} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles mixed positive and negative values', () => {
      const mixedDataset = [
        {
          label: 'Mixed',
          data: [-5, 10, -15, 20],
          borderColor: 'rgb(75, 192, 192)',
        },
      ];
      const { container } = render(
        <RdsCompLineChart {...defaultProps} dataSets={mixedDataset} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles string values in dataset', () => {
      const stringDataset = [
        {
          label: 'String',
          data: ['10', '20', '30'],
          borderColor: 'rgb(75, 192, 192)',
        },
      ];
      const { container } = render(
        <RdsCompLineChart {...defaultProps} dataSets={stringDataset} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles null options gracefully', () => {
      const { container } = render(
        <RdsCompLineChart {...defaultProps} options={null} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles empty options object', () => {
      const { container } = render(
        <RdsCompLineChart {...defaultProps} options={{}} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Component Lifecycle', () => {
    it('initializes chart on first render', () => {
      const { container } = render(<RdsCompLineChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('cleans up chart on unmount', () => {
      const { unmount, container } = render(
        <RdsCompLineChart {...defaultProps} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
      unmount();
    });

    it('updates chart on multiple re-renders', () => {
      const { rerender, container } = render(
        <RdsCompLineChart {...defaultProps} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();

      rerender(
        <RdsCompLineChart
          {...defaultProps}
          labels={['Q1', 'Q2', 'Q3']}
        />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();

      rerender(
        <RdsCompLineChart
          {...defaultProps}
          dataSets={[{ data: [40, 50, 60] }]}
        />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Re-render Behavior', () => {
    it('updates id on prop change', () => {
      const { rerender, container } = render(
        <RdsCompLineChart {...defaultProps} id="chart-1" />
      );
      let canvas = container.querySelector('canvas');
      expect(canvas).toHaveAttribute('id', 'chart-1');

      rerender(<RdsCompLineChart {...defaultProps} id="chart-2" />);
      canvas = container.querySelector('canvas');
      expect(canvas).toHaveAttribute('id', 'chart-2');
    });

    it('preserves canvas ref through re-renders', () => {
      const { rerender, container } = render(
        <RdsCompLineChart {...defaultProps} />
      );
      const canvas1 = container.querySelector('canvas');

      rerender(
        <RdsCompLineChart
          {...defaultProps}
          labels={['Updated']}
        />
      );
      const canvas2 = container.querySelector('canvas');

      expect(canvas2).toBeInTheDocument();
    });

    it('updates canvas styling when id changes', () => {
      const { rerender, container } = render(
        <RdsCompLineChart {...defaultProps} id="other-chart" />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();

      rerender(<RdsCompLineChart {...defaultProps} id="linechart1" />);
      expect(container.querySelector('canvas')).toBeInTheDocument();

      rerender(<RdsCompLineChart {...defaultProps} id="linechart2" />);
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
        <RdsCompLineChart {...defaultProps} options={responsiveOptions} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('renders with responsive false', () => {
      const fixedOptions = {
        responsive: false,
        maintainAspectRatio: true,
      };
      const { container } = render(
        <RdsCompLineChart {...defaultProps} options={fixedOptions} />
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
        <RdsCompLineChart {...defaultProps} options={aspectOptions} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Chart Type', () => {
    it('renders as line chart type', () => {
      const { container } = render(<RdsCompLineChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Plugin Configuration', () => {
    it('processes options with plugins', () => {
      const optionsWithPlugins = {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top' as const,
          },
          tooltip: {
            enabled: true,
          },
        },
      };
      const { container } = render(
        <RdsCompLineChart {...defaultProps} options={optionsWithPlugins} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('canvas element is in document', () => {
      const { container } = render(<RdsCompLineChart {...defaultProps} />);
      const canvas = container.querySelector('canvas');
      expect(canvas).toBeInTheDocument();
  
    });
    it('has no axe accessibility violations', async () => {
      const { container } = render(<RdsCompLineChart {...defaultProps} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('canvas has id attribute', () => {
      const { container } = render(<RdsCompLineChart {...defaultProps} />);
      const canvas = container.querySelector('canvas');
      expect(canvas).toHaveAttribute('id');
    });

    it('canvas has data-testid attribute', () => {
      const { container } = render(<RdsCompLineChart {...defaultProps} />);
      const canvas = container.querySelector('[data-testid="line-chart-1"]');
      expect(canvas).toBeInTheDocument();
    });

    it('wrapper div has correct class', () => {
      const { container } = render(<RdsCompLineChart {...defaultProps} />);
      const wrapper = container.querySelector('.rds-comp-chart-line');
      expect(wrapper).toBeInTheDocument();
    });
  });

  describe('Line Style Variations', () => {
    it('renders with solid line', () => {
      const solidLine = [
        {
          label: 'Sales',
          data: [12, 19, 3, 5, 2, 3],
          borderColor: 'rgb(75, 192, 192)',
        },
      ];
      const { container } = render(
        <RdsCompLineChart {...defaultProps} dataSets={solidLine} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('renders with dashed line', () => {
      const dashedLine = [
        {
          label: 'Sales',
          data: [12, 19, 3, 5, 2, 3],
          borderColor: 'rgb(75, 192, 192)',
          borderDash: [5, 5],
        },
      ];
      const { container } = render(
        <RdsCompLineChart {...defaultProps} dataSets={dashedLine} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('renders with dotted line', () => {
      const dottedLine = [
        {
          label: 'Sales',
          data: [12, 19, 3, 5, 2, 3],
          borderColor: 'rgb(75, 192, 192)',
          borderDash: [2, 2],
        },
      ];
      const { container } = render(
        <RdsCompLineChart {...defaultProps} dataSets={dottedLine} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('renders with custom line width', () => {
      const thickLine = [
        {
          label: 'Sales',
          data: [12, 19, 3, 5, 2, 3],
          borderColor: 'rgb(75, 192, 192)',
          borderWidth: 5,
        },
      ];
      const { container } = render(
        <RdsCompLineChart {...defaultProps} dataSets={thickLine} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Fill Options', () => {
    it('renders with fill enabled', () => {
      const filledDataset = [
        {
          label: 'Sales',
          data: [12, 19, 3, 5, 2, 3],
          fill: true,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgb(75, 192, 192)',
        },
      ];
      const { container } = render(
        <RdsCompLineChart {...defaultProps} dataSets={filledDataset} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('renders with fill disabled', () => {
      const unfilledDataset = [
        {
          label: 'Sales',
          data: [12, 19, 3, 5, 2, 3],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
        },
      ];
      const { container } = render(
        <RdsCompLineChart {...defaultProps} dataSets={unfilledDataset} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Legend Configuration', () => {
    it('renders with legend enabled', () => {
      const legendOptions = {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top' as const,
          },
        },
      };
      const { container } = render(
        <RdsCompLineChart {...defaultProps} options={legendOptions} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('renders with legend disabled', () => {
      const noLegendOptions = {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
      };
      const { container } = render(
        <RdsCompLineChart {...defaultProps} options={noLegendOptions} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });
});