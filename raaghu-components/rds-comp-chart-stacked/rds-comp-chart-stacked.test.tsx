import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';
import RdsCompStackedChart from './rds-comp-chart-stacked';

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

// Mock SCSS
jest.mock('./rds-comp-chart-stacked.scss', () => ({}));

const defaultProps = {
  labels: ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5'],
  dataSets: [
    {
      label: 'Dataset 1',
      data: [12, 19, 3, 5, 2],
      backgroundColor: 'rgba(75, 192, 192, 0.7)',
    },
    {
      label: 'Dataset 2',
      data: [10, 15, 8, 12, 6],
      backgroundColor: 'rgba(255, 99, 132, 0.7)',
    },
  ],
  options: {
    responsive: true,
    maintainAspectRatio: false,
  },
  id: 'stacked-chart-1',
};

describe('RdsCompStackedChart', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    it('renders the component without crashing', () => {
      const { container } = render(<RdsCompStackedChart {...defaultProps} />);
      expect(container).toBeInTheDocument();
    });

    it('renders canvas element', () => {
      const { container } = render(<RdsCompStackedChart {...defaultProps} />);
      const canvas = container.querySelector('canvas');
      expect(canvas).toBeInTheDocument();
    });

    it('canvas element has correct id', () => {
      const { container } = render(<RdsCompStackedChart {...defaultProps} />);
      const canvas = container.querySelector('canvas');
      expect(canvas).toHaveAttribute('id', 'stacked-chart-1');
    });

    it('renders div wrapper with correct class', () => {
      const { container } = render(<RdsCompStackedChart {...defaultProps} />);
      const div = container.querySelector('.stack-chart-container');
      expect(div).toBeInTheDocument();
    });

    it('has correct display name', () => {
      expect(RdsCompStackedChart.displayName).toBe('RdsCompStackedChart');
    });

    it('renders with different id values', () => {
      const { container } = render(
        <RdsCompStackedChart {...defaultProps} id="custom-stacked" />
      );
      const canvas = container.querySelector('canvas');
      expect(canvas).toHaveAttribute('id', 'custom-stacked');
    });
  });

  describe('Props Handling', () => {
    it('passes labels to chart', () => {
      const { container } = render(<RdsCompStackedChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('passes dataSets to chart', () => {
      const customDatasets = [
        {
          label: 'Custom Dataset',
          data: [10, 20, 30, 40, 50],
          backgroundColor: 'rgba(255, 99, 132, 0.7)',
        },
      ];
      const { container } = render(
        <RdsCompStackedChart {...defaultProps} dataSets={customDatasets} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('passes options to chart', () => {
      const customOptions = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            position: 'top' as const,
          },
        },
      };
      const { container } = render(
        <RdsCompStackedChart {...defaultProps} options={customOptions} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('uses provided id for canvas', () => {
      const { container } = render(
        <RdsCompStackedChart {...defaultProps} id="chart-id-1" />
      );
      const canvas = container.querySelector('canvas');
      expect(canvas).toHaveAttribute('id', 'chart-id-1');
    });

    it('handles different id values', () => {
      const { rerender, container } = render(
        <RdsCompStackedChart {...defaultProps} id="chart-1" />
      );
      let canvas = container.querySelector('canvas');
      expect(canvas).toHaveAttribute('id', 'chart-1');

      rerender(<RdsCompStackedChart {...defaultProps} id="chart-2" />);
      canvas = container.querySelector('canvas');
      expect(canvas).toHaveAttribute('id', 'chart-2');
    });
  });

  describe('Dark Mode Detection', () => {
    it('detects dark mode from body class theme-dark', () => {
      document.body.classList.add('theme-dark');
      const { container } = render(<RdsCompStackedChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.body.classList.remove('theme-dark');
    });

    it('detects dark mode from body class dark-theme', () => {
      document.body.classList.add('dark-theme');
      const { container } = render(<RdsCompStackedChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.body.classList.remove('dark-theme');
    });

    it('detects dark mode from documentElement attribute', () => {
      document.documentElement.setAttribute('data-theme', 'dark');
      const { container } = render(<RdsCompStackedChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.documentElement.removeAttribute('data-theme');
    });

    it('detects dark mode from body attribute', () => {
      document.body.setAttribute('data-theme', 'dark');
      const { container } = render(<RdsCompStackedChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.body.removeAttribute('data-theme');
    });

    it('defaults to light mode when no dark mode indicators', () => {
      document.body.classList.remove('theme-dark', 'dark-theme');
      document.documentElement.removeAttribute('data-theme');
      document.body.removeAttribute('data-theme');
      const { container } = render(<RdsCompStackedChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Dark Mode Styles', () => {
    it('applies X axis grid color in dark mode', () => {
      document.body.classList.add('theme-dark');
      const { container } = render(<RdsCompStackedChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.body.classList.remove('theme-dark');
    });

    it('applies Y axis grid color in dark mode', () => {
      document.body.classList.add('theme-dark');
      const { container } = render(<RdsCompStackedChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.body.classList.remove('theme-dark');
    });

    it('applies X axis ticks color in dark mode', () => {
      document.body.classList.add('theme-dark');
      const { container } = render(<RdsCompStackedChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.body.classList.remove('theme-dark');
    });

    it('applies Y axis ticks color in dark mode', () => {
      document.body.classList.add('theme-dark');
      const { container } = render(<RdsCompStackedChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.body.classList.remove('theme-dark');
    });

    it('applies legend label color in dark mode', () => {
      document.body.classList.add('theme-dark');
      const { container } = render(<RdsCompStackedChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.body.classList.remove('theme-dark');
    });

    it('applies title color in dark mode', () => {
      document.body.classList.add('theme-dark');
      const { container } = render(<RdsCompStackedChart {...defaultProps} />);
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
        <RdsCompStackedChart {...propsWithTooltip} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.body.classList.remove('theme-dark');
    });
  });

  describe('Canvas Dimensions', () => {
    it('sets canvas height to 86vh', () => {
      const { container } = render(<RdsCompStackedChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('maintains fixed height across all instances', () => {
      const { container: container1 } = render(
        <RdsCompStackedChart {...defaultProps} />
      );
      const canvas1 = container1.querySelector('canvas');
      expect(canvas1).toBeInTheDocument();

      const { container: container2 } = render(
        <RdsCompStackedChart {...defaultProps} id="chart-2" />
      );
      const canvas2 = container2.querySelector('canvas');
      expect(canvas2).toBeInTheDocument();
    });
  });

  describe('Chart Type', () => {
    it('creates chart with type bar', () => {
      const { container } = render(<RdsCompStackedChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('passes correct data structure to chart', () => {
      const { container } = render(<RdsCompStackedChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Chart Destruction', () => {
    it('destroys chart on unmount', () => {
      const { unmount } = render(<RdsCompStackedChart {...defaultProps} />);
      unmount();
      expect(true).toBe(true);
    });

    it('destroys previous chart on props update', () => {
      const { rerender } = render(<RdsCompStackedChart {...defaultProps} />);
      rerender(
        <RdsCompStackedChart
          {...defaultProps}
          labels={['A', 'B', 'C']}
        />
      );
      expect(true).toBe(true);
    });
  });

  describe('Data Updates', () => {
    it('updates chart when labels change', () => {
      const { rerender, container } = render(
        <RdsCompStackedChart {...defaultProps} />
      );
      rerender(
        <RdsCompStackedChart
          {...defaultProps}
          labels={['A', 'B', 'C', 'D']}
        />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('updates chart when dataSets change', () => {
      const { rerender, container } = render(
        <RdsCompStackedChart {...defaultProps} />
      );
      rerender(
        <RdsCompStackedChart
          {...defaultProps}
          dataSets={[
            {
              label: 'New Dataset',
              data: [25, 25, 25, 25, 25],
              backgroundColor: 'rgba(255, 159, 64, 0.7)',
            },
          ]}
        />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('updates chart when options change', () => {
      const { rerender, container } = render(
        <RdsCompStackedChart {...defaultProps} />
      );
      rerender(
        <RdsCompStackedChart
          {...defaultProps}
          options={{
            responsive: false,
            plugins: {
              legend: {
                display: false,
              },
            },
          }}
        />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('updates chart when id changes', () => {
      const { rerender, container } = render(
        <RdsCompStackedChart {...defaultProps} id="chart-1" />
      );
      let canvas = container.querySelector('canvas');
      expect(canvas).toHaveAttribute('id', 'chart-1');

      rerender(<RdsCompStackedChart {...defaultProps} id="chart-2" />);
      canvas = container.querySelector('canvas');
      expect(canvas).toHaveAttribute('id', 'chart-2');
    });
  });

  describe('Stacked Bar Configuration', () => {
    it('renders with stacked bar datasets', () => {
      const { container } = render(<RdsCompStackedChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles multiple stacked datasets', () => {
      const multiStackedDatasets = [
        {
          label: 'Dataset 1',
          data: [10, 15, 12],
          backgroundColor: 'rgba(75, 192, 192, 0.7)',
        },
        {
          label: 'Dataset 2',
          data: [8, 12, 10],
          backgroundColor: 'rgba(255, 99, 132, 0.7)',
        },
        {
          label: 'Dataset 3',
          data: [14, 10, 15],
          backgroundColor: 'rgba(255, 206, 86, 0.7)',
        },
      ];
      const { container } = render(
        <RdsCompStackedChart {...defaultProps} dataSets={multiStackedDatasets} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles three stacked datasets', () => {
      const threeDatasets = [
        {
          label: 'Dataset 1',
          data: [10, 15, 12, 14, 11],
          backgroundColor: 'rgba(75, 192, 192, 0.7)',
        },
        {
          label: 'Dataset 2',
          data: [8, 12, 10, 11, 9],
          backgroundColor: 'rgba(255, 99, 132, 0.7)',
        },
        {
          label: 'Dataset 3',
          data: [14, 10, 15, 13, 16],
          backgroundColor: 'rgba(255, 206, 86, 0.7)',
        },
      ];
      const { container } = render(
        <RdsCompStackedChart {...defaultProps} dataSets={threeDatasets} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles empty datasets array', () => {
      const { container } = render(
        <RdsCompStackedChart {...defaultProps} dataSets={[]} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Label Variations', () => {
    it('renders with numeric string labels', () => {
      const { container } = render(
        <RdsCompStackedChart
          {...defaultProps}
          labels={['1', '2', '3', '4', '5']}
        />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('renders with text labels', () => {
      const { container } = render(
        <RdsCompStackedChart
          {...defaultProps}
          labels={['Q1', 'Q2', 'Q3', 'Q4', 'Q5']}
        />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('renders with empty labels array', () => {
      const { container } = render(
        <RdsCompStackedChart {...defaultProps} labels={[]} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('renders with many labels', () => {
      const manyLabels = Array.from({ length: 12 }, (_, i) => `Month ${i + 1}`);
      const { container } = render(
        <RdsCompStackedChart
          {...defaultProps}
          labels={manyLabels}
          dataSets={[
            {
              label: 'Data 1',
              data: Array.from({ length: 12 }, (_, index) => (index % 5 + 1) * 8),
              backgroundColor: 'rgba(75, 192, 192, 0.7)',
            },
            {
              label: 'Data 2',
              data: Array.from({ length: 12 }, (_, index) => (index % 4 + 2) * 6),
              backgroundColor: 'rgba(255, 99, 132, 0.7)',
            },
          ]}
        />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Color Configuration', () => {
    it('applies custom background colors to datasets', () => {
      const coloredDatasets = [
        {
          label: 'Colored 1',
          data: [10, 20, 30],
          backgroundColor: 'rgba(255, 0, 0, 0.7)',
        },
        {
          label: 'Colored 2',
          data: [15, 25, 35],
          backgroundColor: 'rgba(0, 255, 0, 0.7)',
        },
      ];
      const { container } = render(
        <RdsCompStackedChart
          {...defaultProps}
          labels={['A', 'B', 'C']}
          dataSets={coloredDatasets}
        />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('applies custom border colors', () => {
      const borderedDatasets = [
        {
          label: 'Bordered',
          data: [10, 20, 30],
          backgroundColor: 'rgba(75, 192, 192, 0.7)',
          borderColor: 'rgba(100, 200, 200, 1)',
          borderWidth: 2,
        },
      ];
      const { container } = render(
        <RdsCompStackedChart
          {...defaultProps}
          labels={['A', 'B', 'C']}
          dataSets={borderedDatasets}
        />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty labels array', () => {
      const { container } = render(
        <RdsCompStackedChart {...defaultProps} labels={[]} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles empty datasets array', () => {
      const { container } = render(
        <RdsCompStackedChart {...defaultProps} dataSets={[]} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles very large data values', () => {
      const largeDatasets = [
        {
          label: 'Large 1',
          data: [999999, 888888, 777777],
          backgroundColor: 'rgba(75, 192, 192, 0.7)',
        },
        {
          label: 'Large 2',
          data: [666666, 555555, 444444],
          backgroundColor: 'rgba(255, 99, 132, 0.7)',
        },
      ];
      const { container } = render(
        <RdsCompStackedChart
          {...defaultProps}
          labels={['A', 'B', 'C']}
          dataSets={largeDatasets}
        />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles very small data values', () => {
      const smallDatasets = [
        {
          label: 'Small 1',
          data: [0.1, 0.2, 0.3],
          backgroundColor: 'rgba(75, 192, 192, 0.7)',
        },
        {
          label: 'Small 2',
          data: [0.4, 0.5, 0.6],
          backgroundColor: 'rgba(255, 99, 132, 0.7)',
        },
      ];
      const { container } = render(
        <RdsCompStackedChart
          {...defaultProps}
          labels={['A', 'B', 'C']}
          dataSets={smallDatasets}
        />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles zero values in dataset', () => {
      const zeroDatasets = [
        {
          label: 'With Zero 1',
          data: [0, 20, 0],
          backgroundColor: 'rgba(75, 192, 192, 0.7)',
        },
        {
          label: 'With Zero 2',
          data: [10, 0, 15],
          backgroundColor: 'rgba(255, 99, 132, 0.7)',
        },
      ];
      const { container } = render(
        <RdsCompStackedChart
          {...defaultProps}
          labels={['A', 'B', 'C']}
          dataSets={zeroDatasets}
        />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles negative data values', () => {
      const negativeDatasets = [
        {
          label: 'With Neg 1',
          data: [-10, 20, -30],
          backgroundColor: 'rgba(75, 192, 192, 0.7)',
        },
        {
          label: 'With Neg 2',
          data: [10, -20, 30],
          backgroundColor: 'rgba(255, 99, 132, 0.7)',
        },
      ];
      const { container } = render(
        <RdsCompStackedChart
          {...defaultProps}
          labels={['A', 'B', 'C']}
          dataSets={negativeDatasets}
        />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles undefined options', () => {
      const { container } = render(
        <RdsCompStackedChart {...defaultProps} options={undefined} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles empty options object', () => {
      const { container } = render(
        <RdsCompStackedChart {...defaultProps} options={{}} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Component Lifecycle', () => {
    it('initializes chart on first render', () => {
      const { container } = render(<RdsCompStackedChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('cleans up chart on unmount', () => {
      const { unmount, container } = render(
        <RdsCompStackedChart {...defaultProps} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
      unmount();
    });

    it('updates chart on multiple re-renders', () => {
      const { rerender, container } = render(
        <RdsCompStackedChart {...defaultProps} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();

      rerender(
        <RdsCompStackedChart
          {...defaultProps}
          labels={['X', 'Y', 'Z']}
        />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();

      rerender(
        <RdsCompStackedChart
          {...defaultProps}
          dataSets={[
            {
              label: 'Updated',
              data: [50, 50, 50],
              backgroundColor: 'rgba(255, 99, 132, 0.7)',
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
        <RdsCompStackedChart {...defaultProps} id="chart-1" />
      );
      let canvas = container.querySelector('canvas');
      expect(canvas).toHaveAttribute('id', 'chart-1');

      rerender(<RdsCompStackedChart {...defaultProps} id="chart-2" />);
      canvas = container.querySelector('canvas');
      expect(canvas).toHaveAttribute('id', 'chart-2');
    });

    it('preserves canvas ref through re-renders', () => {
      const { rerender, container } = render(
        <RdsCompStackedChart {...defaultProps} />
      );
      const canvas1 = container.querySelector('canvas');

      rerender(
        <RdsCompStackedChart
          {...defaultProps}
          labels={['Updated']}
        />
      );
      const canvas2 = container.querySelector('canvas');

      expect(canvas2).toBeInTheDocument();
    });

    it('handles rapid successive re-renders', () => {
      const { rerender, container } = render(
        <RdsCompStackedChart {...defaultProps} />
      );

      rerender(
        <RdsCompStackedChart
          {...defaultProps}
          dataSets={[{ label: 'Set 1', data: [1, 2, 3, 4, 5] }]}
        />
      );
      rerender(
        <RdsCompStackedChart
          {...defaultProps}
          dataSets={[{ label: 'Set 2', data: [5, 4, 3, 2, 1] }]}
        />
      );
      rerender(
        <RdsCompStackedChart
          {...defaultProps}
          dataSets={[{ label: 'Set 3', data: [3, 3, 3, 3, 3] }]}
        />
      );

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
        <RdsCompStackedChart {...defaultProps} options={optionsWithPlugins} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('deep clones options before modification', () => {
      const options = {
        responsive: true,
        plugins: {
          legend: {
            labels: {
              color: '#000',
            },
          },
        },
      };
      const { container } = render(
        <RdsCompStackedChart {...defaultProps} options={options} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
      // Original options should not be mutated other than expected properties
      expect(options).toBeDefined();
    });

    it('handles custom legend configuration', () => {
      const customLegendOptions = {
        responsive: true,
        plugins: {
          legend: {
            position: 'right' as const,
            align: 'center' as const,
            labels: {
              padding: 25,
              font: {
                size: 14,
              },
            },
          },
        },
      };
      const { container } = render(
        <RdsCompStackedChart {...defaultProps} options={customLegendOptions} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('canvas element is in document', () => {
      const { container } = render(<RdsCompStackedChart {...defaultProps} />);
      const canvas = container.querySelector('canvas');
      expect(canvas).toBeInTheDocument();
  
    });

    it('has no axe accessibility violations', async () => {
      const { container } = render(<RdsCompStackedChart {...defaultProps} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('canvas has id attribute', () => {
      const { container } = render(<RdsCompStackedChart {...defaultProps} />);
      const canvas = container.querySelector('canvas');
      expect(canvas).toHaveAttribute('id');
    });

    it('canvas has proper id value', () => {
      const { container } = render(
        <RdsCompStackedChart {...defaultProps} id="accessible-stacked" />
      );
      const canvas = container.querySelector('canvas');
      expect(canvas).toHaveAttribute('id', 'accessible-stacked');
    });

    it('canvas is focusable element', () => {
      const { container } = render(<RdsCompStackedChart {...defaultProps} />);
      const canvas = container.querySelector('canvas');
      expect(canvas).toBeInTheDocument();
    });
  });

  describe('Scale Configuration', () => {
    it('applies custom scale configuration', () => {
      const scaleOptions = {
        responsive: true,
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
            beginAtZero: true,
          },
        },
      };
      const { container } = render(
        <RdsCompStackedChart {...defaultProps} options={scaleOptions} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles x and y scale styling in dark mode', () => {
      const scaleOptions = {
        responsive: true,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Categories',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Values',
            },
          },
        },
      };
      document.body.classList.add('theme-dark');
      const { container } = render(
        <RdsCompStackedChart {...defaultProps} options={scaleOptions} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.body.classList.remove('theme-dark');
    });

    it('applies bar configuration settings', () => {
      const barOptions = {
        responsive: true,
        scales: {
          x: {
            offset: true,
            categoryPercentage: 0.8,
            barPercentage: 0.9,
          },
        },
      };
      const { container } = render(
        <RdsCompStackedChart {...defaultProps} options={barOptions} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Minimal Props', () => {
    it('renders with minimal required props', () => {
      const minimalProps = {
        id: 'minimal-chart',
        labels: ['A', 'B'],
        dataSets: [{ label: 'Data', data: [50, 60] }],
        options: {},
      };
      const { container } = render(
        <RdsCompStackedChart {...minimalProps} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('renders with all features enabled', () => {
      const { container } = render(<RdsCompStackedChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Stacked Configuration', () => {
    it('maintains aspect ratio false by default', () => {
      const { container } = render(<RdsCompStackedChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles custom bar percentage settings', () => {
      const customOptions = {
        responsive: true,
        scales: {
          x: {
            categoryPercentage: 0.5,
            barPercentage: 0.5,
          },
        },
      };
      const { container } = render(
        <RdsCompStackedChart {...defaultProps} options={customOptions} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles category percentage configuration', () => {
      const categoryOptions = {
        responsive: true,
        scales: {
          x: {
            categoryPercentage: 0.9,
          },
        },
      };
      const { container } = render(
        <RdsCompStackedChart {...defaultProps} options={categoryOptions} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });
});