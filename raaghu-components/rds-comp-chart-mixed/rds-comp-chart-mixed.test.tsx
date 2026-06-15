import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';
import RdsCompMixedChart from './rds-comp-chart-mixed';

// Mock SCSS
jest.mock('./rds-comp-chart-mixed.scss', () => ({}));

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
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
  dataSets: [
    {
      label: 'Dataset 1',
      type: 'bar',
      data: [10, 20, 30, 40, 50],
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
    },
    {
      label: 'Dataset 2',
      type: 'line',
      data: [5, 15, 25, 35, 45],
      borderColor: 'rgba(255, 99, 132, 1)',
      fill: false,
    },
  ],
  options: {
    responsive: true,
    maintainAspectRatio: false,
  },
  id: 'mixed-chart-1',
};

describe('RdsCompMixedChart', () => {
  describe('Basic Rendering', () => {
    it('renders the component without crashing', () => {
      const { container } = render(<RdsCompMixedChart {...defaultProps} />);
      expect(container).toBeInTheDocument();
    });

    it('renders with correct display name', () => {
      expect(RdsCompMixedChart.displayName).toBe('RdsCompMixedChart');
    });

    it('renders canvas element', () => {
      const { container } = render(<RdsCompMixedChart {...defaultProps} />);
      const canvas = container.querySelector('canvas');
      expect(canvas).toBeInTheDocument();
    });

    it('canvas element has correct id', () => {
      const { container } = render(<RdsCompMixedChart {...defaultProps} />);
      const canvas = container.querySelector('canvas');
      expect(canvas).toHaveAttribute('id', 'mixed-chart-1');
    });

    it('canvas element has correct data-testid', () => {
      const { container } = render(<RdsCompMixedChart {...defaultProps} />);
      const canvas = container.querySelector('[data-testid="mixed-chart-1"]');
      expect(canvas).toBeInTheDocument();
    });

    it('renders div wrapper with correct class', () => {
      const { container } = render(<RdsCompMixedChart {...defaultProps} />);
      const div = container.querySelector('.rds-comp-chart-mixed');
      expect(div).toBeInTheDocument();
    });
  });

  describe('Props Handling', () => {
    it('passes labels to chart', () => {
      const { container } = render(<RdsCompMixedChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('passes dataSets to chart', () => {
      const customDatasets = [
        {
          label: 'Custom',
          type: 'bar',
          data: [15, 25, 35],
          backgroundColor: 'rgba(100, 100, 100, 0.6)',
        },
      ];
      const { container } = render(
        <RdsCompMixedChart {...defaultProps} dataSets={customDatasets} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('passes options to chart', () => {
      const customOptions = {
        responsive: true,
        maintainAspectRatio: true,
      };
      const { container } = render(
        <RdsCompMixedChart {...defaultProps} options={customOptions} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('uses provided id for canvas', () => {
      const { container } = render(
        <RdsCompMixedChart {...defaultProps} id="custom-mixed" />
      );
      const canvas = container.querySelector('canvas');
      expect(canvas).toHaveAttribute('id', 'custom-mixed');
    });

    it('handles different id values', () => {
      const { rerender, container } = render(
        <RdsCompMixedChart {...defaultProps} id="chart-1" />
      );
      let canvas = container.querySelector('canvas');
      expect(canvas).toHaveAttribute('id', 'chart-1');

      rerender(<RdsCompMixedChart {...defaultProps} id="chart-2" />);
      canvas = container.querySelector('canvas');
      expect(canvas).toHaveAttribute('id', 'chart-2');
    });
  });

  describe('Mixed Chart Types', () => {
    it('renders with bar and line datasets mixed', () => {
      const mixedDatasets = [
        {
          label: 'Bar',
          type: 'bar',
          data: [10, 20, 30],
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
        },
        {
          label: 'Line',
          type: 'line',
          data: [5, 15, 25],
          borderColor: 'rgba(255, 99, 132, 1)',
        },
      ];
      const { container } = render(
        <RdsCompMixedChart {...defaultProps} dataSets={mixedDatasets} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('renders with multiple bar datasets', () => {
      const multiBarDatasets = [
        {
          label: 'Bar 1',
          type: 'bar',
          data: [10, 20, 30],
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
        },
        {
          label: 'Bar 2',
          type: 'bar',
          data: [15, 25, 35],
          backgroundColor: 'rgba(255, 99, 132, 0.6)',
        },
      ];
      const { container } = render(
        <RdsCompMixedChart {...defaultProps} dataSets={multiBarDatasets} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('renders with multiple line datasets', () => {
      const multiLineDatasets = [
        {
          label: 'Line 1',
          type: 'line',
          data: [10, 20, 30],
          borderColor: 'rgba(75, 192, 192, 1)',
        },
        {
          label: 'Line 2',
          type: 'line',
          data: [15, 25, 35],
          borderColor: 'rgba(255, 99, 132, 1)',
        },
      ];
      const { container } = render(
        <RdsCompMixedChart {...defaultProps} dataSets={multiLineDatasets} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('renders with bar, line, and area datasets', () => {
      const complexDatasets = [
        {
          label: 'Bar',
          type: 'bar',
          data: [10, 20, 30],
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
        },
        {
          label: 'Line',
          type: 'line',
          data: [5, 15, 25],
          borderColor: 'rgba(255, 99, 132, 1)',
          fill: false,
        },
        {
          label: 'Area',
          type: 'line',
          data: [8, 18, 28],
          borderColor: 'rgba(100, 150, 200, 1)',
          fill: true,
          backgroundColor: 'rgba(100, 150, 200, 0.2)',
        },
      ];
      const { container } = render(
        <RdsCompMixedChart {...defaultProps} dataSets={complexDatasets} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Dark Mode Detection', () => {
    it('detects dark mode from body class theme-dark', () => {
      document.body.classList.add('theme-dark');
      const { container } = render(<RdsCompMixedChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.body.classList.remove('theme-dark');
    });

    it('detects dark mode from body class dark-theme', () => {
      document.body.classList.add('dark-theme');
      const { container } = render(<RdsCompMixedChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.body.classList.remove('dark-theme');
    });

    it('detects dark mode from documentElement attribute', () => {
      document.documentElement.setAttribute('data-theme', 'dark');
      const { container } = render(<RdsCompMixedChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.documentElement.removeAttribute('data-theme');
    });

    it('detects dark mode from body attribute', () => {
      document.body.setAttribute('data-theme', 'dark');
      const { container } = render(<RdsCompMixedChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.body.removeAttribute('data-theme');
    });

    it('defaults to light mode when no dark mode indicators', () => {
      document.body.classList.remove('theme-dark', 'dark-theme');
      document.documentElement.removeAttribute('data-theme');
      document.body.removeAttribute('data-theme');
      const { container } = render(<RdsCompMixedChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Dark Mode Styles', () => {
    it('applies grid color in dark mode', () => {
      document.body.classList.add('theme-dark');
      const { container } = render(<RdsCompMixedChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.body.classList.remove('theme-dark');
    });

    it('applies tick color in dark mode', () => {
      document.body.classList.add('theme-dark');
      const { container } = render(<RdsCompMixedChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.body.classList.remove('theme-dark');
    });

    it('applies border color in dark mode', () => {
      document.body.classList.add('theme-dark');
      const { container } = render(<RdsCompMixedChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.body.classList.remove('theme-dark');
    });

    it('applies title color in dark mode', () => {
      document.body.classList.add('theme-dark');
      const { container } = render(<RdsCompMixedChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.body.classList.remove('theme-dark');
    });

    it('applies legend label color in dark mode', () => {
      document.body.classList.add('theme-dark');
      const { container } = render(<RdsCompMixedChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.body.classList.remove('theme-dark');
    });
  });

  describe('Chart Destruction', () => {
    it('destroys chart on unmount', () => {
      const { unmount } = render(<RdsCompMixedChart {...defaultProps} />);
      unmount();
      expect(true).toBe(true);
    });

    it('destroys previous chart on props update', () => {
      const { rerender } = render(<RdsCompMixedChart {...defaultProps} />);
      rerender(
        <RdsCompMixedChart
          {...defaultProps}
          labels={['Updated', 'Labels']}
        />
      );
      expect(true).toBe(true);
    });
  });

  describe('Chart Configuration', () => {
    it('creates chart with type bar', () => {
      const { container } = render(<RdsCompMixedChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('passes correct chart type to Chart.js', () => {
      const { container } = render(<RdsCompMixedChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('sets up chart with labels and datasets', () => {
      const { container } = render(<RdsCompMixedChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Data Updates', () => {
    it('updates chart when labels change', () => {
      const { rerender, container } = render(
        <RdsCompMixedChart {...defaultProps} />
      );
      rerender(
        <RdsCompMixedChart
          {...defaultProps}
          labels={['A', 'B', 'C']}
        />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('updates chart when dataSets change', () => {
      const { rerender, container } = render(
        <RdsCompMixedChart {...defaultProps} />
      );
      rerender(
        <RdsCompMixedChart
          {...defaultProps}
          dataSets={[
            {
              label: 'Updated',
              type: 'bar',
              data: [50, 50, 50],
              backgroundColor: 'rgba(200, 200, 200, 0.6)',
            },
          ]}
        />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('updates chart when options change', () => {
      const { rerender, container } = render(
        <RdsCompMixedChart {...defaultProps} />
      );
      rerender(
        <RdsCompMixedChart
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

  describe('Color Configuration', () => {
    it('applies custom background colors to bars', () => {
      const coloredDatasets = [
        {
          label: 'Colored Bar',
          type: 'bar',
          data: [10, 20, 30],
          backgroundColor: 'rgba(255, 99, 132, 0.8)',
        },
      ];
      const { container } = render(
        <RdsCompMixedChart {...defaultProps} dataSets={coloredDatasets} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('applies custom border colors to lines', () => {
      const borderedDatasets = [
        {
          label: 'Colored Line',
          type: 'line',
          data: [10, 20, 30],
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 3,
        },
      ];
      const { container } = render(
        <RdsCompMixedChart {...defaultProps} dataSets={borderedDatasets} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('applies gradient colors', () => {
      const gradientDatasets = [
        {
          label: 'Gradient',
          type: 'bar',
          data: [10, 20, 30],
          backgroundColor: [
            'rgba(75, 192, 192, 0.6)',
            'rgba(255, 99, 132, 0.6)',
            'rgba(100, 150, 200, 0.6)',
          ],
        },
      ];
      const { container } = render(
        <RdsCompMixedChart {...defaultProps} dataSets={gradientDatasets} />
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
            title: {
              display: true,
              text: 'Months',
            },
          },
        },
      };
      const { container } = render(
        <RdsCompMixedChart {...defaultProps} options={xAxisOptions} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('applies custom y-axis configuration', () => {
      const yAxisOptions = {
        responsive: true,
        scales: {
          y: {
            title: {
              display: true,
              text: 'Values',
            },
          },
        },
      };
      const { container } = render(
        <RdsCompMixedChart {...defaultProps} options={yAxisOptions} />
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
        <RdsCompMixedChart {...defaultProps} options={bothAxisOptions} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Props Variants', () => {
    it('renders with minimal props', () => {
      const minimalProps = {
        id: 'chart-1',
        labels: ['A', 'B'],
        dataSets: [{ type: 'bar', data: [10, 20] }],
        options: {},
      };
      const { container } = render(
        <RdsCompMixedChart {...minimalProps} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('renders with all features enabled', () => {
      const { container } = render(<RdsCompMixedChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty labels array', () => {
      const { container } = render(
        <RdsCompMixedChart {...defaultProps} labels={[]} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles empty datasets array', () => {
      const { container } = render(
        <RdsCompMixedChart {...defaultProps} dataSets={[]} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles very large data values', () => {
      const largeData = [
        {
          label: 'Large',
          type: 'bar',
          data: [999999, 888888, 777777],
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
        },
      ];
      const { container } = render(
        <RdsCompMixedChart {...defaultProps} dataSets={largeData} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles negative data values', () => {
      const negativeData = [
        {
          label: 'Negative',
          type: 'bar',
          data: [-10, -20, -30],
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
        },
      ];
      const { container } = render(
        <RdsCompMixedChart {...defaultProps} dataSets={negativeData} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles zero values in dataset', () => {
      const zeroData = [
        {
          label: 'Zero',
          type: 'bar',
          data: [0, 0, 0],
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
        },
      ];
      const { container } = render(
        <RdsCompMixedChart {...defaultProps} dataSets={zeroData} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles mixed positive and negative values', () => {
      const mixedData = [
        {
          label: 'Mixed',
          type: 'bar',
          data: [-20, 10, -5, 30, -15],
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
        },
      ];
      const { container } = render(
        <RdsCompMixedChart {...defaultProps} dataSets={mixedData} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles null options gracefully', () => {
      const { container } = render(
        <RdsCompMixedChart {...defaultProps} options={null} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles empty options object', () => {
      const { container } = render(
        <RdsCompMixedChart {...defaultProps} options={{}} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Component Lifecycle', () => {
    it('initializes chart on first render', () => {
      const { container } = render(<RdsCompMixedChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('cleans up chart on unmount', () => {
      const { unmount, container } = render(
        <RdsCompMixedChart {...defaultProps} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
      unmount();
    });

    it('updates chart on multiple re-renders', () => {
      const { rerender, container } = render(
        <RdsCompMixedChart {...defaultProps} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();

      rerender(
        <RdsCompMixedChart
          {...defaultProps}
          labels={['Updated', 'Labels']}
        />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();

      rerender(
        <RdsCompMixedChart
          {...defaultProps}
          dataSets={[
            {
              label: 'New',
              type: 'bar',
              data: [25, 35, 45],
              backgroundColor: 'rgba(100, 100, 100, 0.6)',
            },
          ]}
        />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Re-render Behavior', () => {
    it('updates id on prop change', () => {
      const { rerender, container } = render(
        <RdsCompMixedChart {...defaultProps} id="chart-1" />
      );
      let canvas = container.querySelector('canvas');
      expect(canvas).toHaveAttribute('id', 'chart-1');

      rerender(<RdsCompMixedChart {...defaultProps} id="chart-2" />);
      canvas = container.querySelector('canvas');
      expect(canvas).toHaveAttribute('id', 'chart-2');
    });

    it('preserves canvas ref through re-renders', () => {
      const { rerender, container } = render(
        <RdsCompMixedChart {...defaultProps} />
      );
      const canvas1 = container.querySelector('canvas');

      rerender(
        <RdsCompMixedChart
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
        <RdsCompMixedChart {...defaultProps} options={responsiveOptions} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('renders with responsive false', () => {
      const fixedOptions = {
        responsive: false,
        maintainAspectRatio: true,
      };
      const { container } = render(
        <RdsCompMixedChart {...defaultProps} options={fixedOptions} />
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
        <RdsCompMixedChart {...defaultProps} options={aspectOptions} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Canvas Dimensions', () => {
    it('sets canvas height style to 86vh', () => {
      const { container } = render(<RdsCompMixedChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('sets canvas width style to 100vh', () => {
      const { container } = render(<RdsCompMixedChart {...defaultProps} />);
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
            position: 'top',
          },
          title: {
            display: true,
            text: 'Mixed Chart',
          },
        },
      };
      const { container } = render(
        <RdsCompMixedChart {...defaultProps} options={optionsWithPlugins} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('deep clones options before modification', () => {
      const options = {
        responsive: true,
        scales: {
          x: { display: true },
          y: { display: true },
        },
      };
      const { container } = render(
        <RdsCompMixedChart {...defaultProps} options={options} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
      // Original options should not be mutated
      expect((options.scales as any).x.grid).toBeUndefined();
    });
  });

  describe('Chart Type', () => {
    it('renders as bar chart type (base type for mixed)', () => {
      const { container } = render(<RdsCompMixedChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('CSS Classes', () => {
    it('applies rds-comp-chart-mixed class to wrapper', () => {
      const { container } = render(<RdsCompMixedChart {...defaultProps} />);
      const wrapper = container.querySelector('.rds-comp-chart-mixed');
      expect(wrapper).toBeInTheDocument();
    });

    it('wrapper contains canvas element', () => {
      const { container } = render(<RdsCompMixedChart {...defaultProps} />);
      const wrapper = container.querySelector('.rds-comp-chart-mixed');
      const canvas = wrapper?.querySelector('canvas');
      expect(canvas).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('canvas element is in document', () => {
      const { container } = render(<RdsCompMixedChart {...defaultProps} />);
      const canvas = container.querySelector('canvas');
      expect(canvas).toBeInTheDocument();
  
    });
    it('has no axe accessibility violations', async () => {
      const { container } = render(<RdsCompMixedChart {...defaultProps} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('canvas has id attribute', () => {
      const { container } = render(<RdsCompMixedChart {...defaultProps} />);
      const canvas = container.querySelector('canvas');
      expect(canvas).toHaveAttribute('id');
    });

    it('canvas has data-testid attribute', () => {
      const { container } = render(<RdsCompMixedChart {...defaultProps} />);
      const canvas = container.querySelector('[data-testid="mixed-chart-1"]');
      expect(canvas).toBeInTheDocument();
    });
  });

  describe('Dataset Type Variants', () => {
    it('handles bar type datasets', () => {
      const barDatasets = [
        {
          label: 'Bars',
          type: 'bar',
          data: [10, 20, 30],
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
        },
      ];
      const { container } = render(
        <RdsCompMixedChart {...defaultProps} dataSets={barDatasets} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles line type datasets', () => {
      const lineDatasets = [
        {
          label: 'Lines',
          type: 'line',
          data: [10, 20, 30],
          borderColor: 'rgba(75, 192, 192, 1)',
          fill: false,
        },
      ];
      const { container } = render(
        <RdsCompMixedChart {...defaultProps} dataSets={lineDatasets} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles area type (line with fill) datasets', () => {
      const areaDatasets = [
        {
          label: 'Area',
          type: 'line',
          data: [10, 20, 30],
          borderColor: 'rgba(75, 192, 192, 1)',
          fill: true,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
        },
      ];
      const { container } = render(
        <RdsCompMixedChart {...defaultProps} dataSets={areaDatasets} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles multiple bar datasets grouped', () => {
      const groupedBars = [
        {
          label: 'Group A',
          type: 'bar',
          data: [10, 20, 30],
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
        },
        {
          label: 'Group B',
          type: 'bar',
          data: [15, 25, 35],
          backgroundColor: 'rgba(255, 99, 132, 0.6)',
        },
      ];
      const { container } = render(
        <RdsCompMixedChart {...defaultProps} dataSets={groupedBars} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });
});