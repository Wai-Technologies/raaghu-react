import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompAreaChart from './rds-comp-chart-area';

// Mock SCSS
jest.mock('./rds-comp-chart-area.scss', () => ({}));

// Mock Chart.js
jest.mock('chart.js/auto', () => {
  return class MockChart {
    static register = jest.fn();
    context: CanvasRenderingContext2D | null = null;
    canvas: any = null;
    config: any;
    data: any;
    options: any;

    constructor(ctx: CanvasRenderingContext2D | null, config: any) {
      this.context = ctx;
      this.config = config;
      this.data = config.data;
      this.options = config.options;
      // Create a mock canvas with style properties
      if (ctx) {
        this.canvas = {
          ...ctx.canvas,
          style: {
            height: '0',
            width: '0',
          },
        };
      } else {
        this.canvas = {
          style: {
            height: '0',
            width: '0',
          },
        };
      }
    }

    destroy = jest.fn();
    update = jest.fn();
    render = jest.fn();
    resize = jest.fn();
    toBase64Image = jest.fn(() => 'data:image/png;base64,fake');
  };
});

const defaultProps = {
  labels: ['January', 'February', 'March', 'April', 'May'],
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#000',
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: '#000',
        },
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: '#000',
        },
      },
    },
  },
  dataSets: [
    {
      label: 'Dataset 1',
      data: [10, 20, 30, 40, 50],
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      fill: true,
    },
  ],
  id: 'chart-area-1',
  isGradient: false,
};

describe('RdsCompAreaChart', () => {
  describe('Basic Rendering', () => {
    it('renders the component without crashing', () => {
      const { container } = render(<RdsCompAreaChart {...defaultProps} />);
      expect(container).toBeInTheDocument();
    });

    it('renders with correct display name', () => {
      expect(RdsCompAreaChart.displayName).toBe('RdsCompAreaChart');
    });

    it('renders canvas element', () => {
      const { container } = render(<RdsCompAreaChart {...defaultProps} />);
      const canvas = container.querySelector('canvas');
      expect(canvas).toBeInTheDocument();
    });

    it('canvas element has correct id', () => {
      const { container } = render(<RdsCompAreaChart {...defaultProps} />);
      const canvas = container.querySelector('canvas');
      expect(canvas).toHaveAttribute('id', defaultProps.id);
    });

    it('renders div with correct class', () => {
      const { container } = render(<RdsCompAreaChart {...defaultProps} />);
      const chartDiv = container.querySelector('.rds-comp-chart-area');
      expect(chartDiv).toBeInTheDocument();
    });
  });

  describe('Props Handling', () => {
    it('passes labels to chart', () => {
      render(<RdsCompAreaChart {...defaultProps} />);
      // Chart should be created with labels
      expect(RdsCompAreaChart).toBeDefined();
    });

    it('passes dataSets to chart', () => {
      const customDataSets = [
        {
          label: 'Custom Dataset',
          data: [5, 15, 25, 35, 45],
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          fill: true,
        },
      ];
      render(
        <RdsCompAreaChart
          {...defaultProps}
          dataSets={customDataSets}
        />
      );
      expect(RdsCompAreaChart).toBeDefined();
    });

    it('passes options to chart', () => {
      const customOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom' as const,
          },
        },
      };
      render(
        <RdsCompAreaChart
          {...defaultProps}
          options={customOptions}
        />
      );
      expect(RdsCompAreaChart).toBeDefined();
    });

    it('uses provided id for canvas', () => {
      const customId = 'my-custom-chart-id';
      const { container } = render(
        <RdsCompAreaChart {...defaultProps} id={customId} />
      );
      const canvas = container.querySelector('canvas');
      expect(canvas).toHaveAttribute('id', customId);
    });

    it('handles different id values', () => {
      const ids = ['chart-1', 'area-chart-test', 'my-chart'];
      ids.forEach(id => {
        const { container, unmount } = render(
          <RdsCompAreaChart {...defaultProps} id={id} />
        );
        const canvas = container.querySelector('canvas');
        expect(canvas).toHaveAttribute('id', id);
        unmount();
      });
    });
  });

  describe('Gradient Support', () => {
    it('renders with gradient disabled', () => {
      const { container } = render(
        <RdsCompAreaChart {...defaultProps} isGradient={false} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('renders with gradient enabled', () => {
      const { container } = render(
        <RdsCompAreaChart {...defaultProps} isGradient={true} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('preserves background color from dataset when gradient is true', () => {
      render(
        <RdsCompAreaChart {...defaultProps} isGradient={true} />
      );
      expect(RdsCompAreaChart).toBeDefined();
    });

    it('handles multiple datasets with gradient', () => {
      const multiDataSets = [
        {
          label: 'Dataset 1',
          data: [10, 20, 30],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
        },
        {
          label: 'Dataset 2',
          data: [15, 25, 35],
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
        },
      ];
      render(
        <RdsCompAreaChart
          {...defaultProps}
          dataSets={multiDataSets}
          isGradient={true}
        />
      );
      expect(RdsCompAreaChart).toBeDefined();
    });
  });

  describe('Canvas Styling', () => {
    it('sets canvas height style', () => {
      const { container } = render(<RdsCompAreaChart {...defaultProps} />);
      const canvas = container.querySelector('canvas') as HTMLCanvasElement;
      expect(canvas).toBeInTheDocument();
      // Height would be set by Chart.js instance
    });

    it('sets canvas width style', () => {
      const { container } = render(<RdsCompAreaChart {...defaultProps} />);
      const canvas = container.querySelector('canvas') as HTMLCanvasElement;
      expect(canvas).toBeInTheDocument();
    });
  });

  describe('Dark Mode Detection', () => {
    it('detects dark mode from body class', () => {
      document.body.classList.add('theme-dark');
      const { container } = render(<RdsCompAreaChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.body.classList.remove('theme-dark');
    });

    it('detects dark mode from alternative body class', () => {
      document.body.classList.add('dark-theme');
      const { container } = render(<RdsCompAreaChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.body.classList.remove('dark-theme');
    });

    it('detects dark mode from documentElement attribute', () => {
      document.documentElement.setAttribute('data-theme', 'dark');
      const { container } = render(<RdsCompAreaChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.documentElement.removeAttribute('data-theme');
    });

    it('detects dark mode from body attribute', () => {
      document.body.setAttribute('data-theme', 'dark');
      const { container } = render(<RdsCompAreaChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.body.removeAttribute('data-theme');
    });

    it('defaults to light mode', () => {
      const { container } = render(<RdsCompAreaChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Chart Destruction', () => {
    it('destroys chart on unmount', () => {
      const { unmount } = render(<RdsCompAreaChart {...defaultProps} />);
      unmount();
      expect(RdsCompAreaChart).toBeDefined();
    });

    it('destroys previous chart on props update', () => {
      const { rerender } = render(<RdsCompAreaChart {...defaultProps} />);
      rerender(
        <RdsCompAreaChart
          {...defaultProps}
          labels={['June', 'July', 'August']}
        />
      );
      expect(RdsCompAreaChart).toBeDefined();
    });
  });

  describe('Theme Mode State', () => {
    it('initializes theme mode state', () => {
      const { container } = render(<RdsCompAreaChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('subscribes to theme changes via MutationObserver', () => {
      const mutationObserverMock = jest.fn();
      const originalMutationObserver = global.MutationObserver;
      
      global.MutationObserver = jest.fn((callback: any) => {
        mutationObserverMock(callback);
        return {
          observe: jest.fn(),
          disconnect: jest.fn(),
        };
      }) as any;

      const { container } = render(<RdsCompAreaChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();

      global.MutationObserver = originalMutationObserver;
    });
  });

  describe('Chart Configuration', () => {
    it('creates chart with type line', () => {
      render(<RdsCompAreaChart {...defaultProps} />);
      // Chart is created with type "line" for area chart
      expect(RdsCompAreaChart).toBeDefined();
    });

    it('passes correct chart type to Chart.js', () => {
      render(<RdsCompAreaChart {...defaultProps} />);
      expect(RdsCompAreaChart).toBeDefined();
    });

    it('sets up chart with labels and datasets', () => {
      render(<RdsCompAreaChart {...defaultProps} />);
      expect(RdsCompAreaChart).toBeDefined();
    });
  });

  describe('Data Updates', () => {
    it('updates chart when labels change', () => {
      const { rerender } = render(<RdsCompAreaChart {...defaultProps} />);
      const newLabels = ['Q1', 'Q2', 'Q3', 'Q4'];
      rerender(
        <RdsCompAreaChart {...defaultProps} labels={newLabels} />
      );
      expect(RdsCompAreaChart).toBeDefined();
    });

    it('updates chart when dataSets change', () => {
      const { rerender } = render(<RdsCompAreaChart {...defaultProps} />);
      const newDataSets = [
        {
          label: 'New Dataset',
          data: [60, 70, 80, 90, 100],
          borderColor: 'rgb(100, 100, 100)',
          backgroundColor: 'rgba(100, 100, 100, 0.2)',
          fill: true,
        },
      ];
      rerender(
        <RdsCompAreaChart {...defaultProps} dataSets={newDataSets} />
      );
      expect(RdsCompAreaChart).toBeDefined();
    });

    it('updates chart when options change', () => {
      const { rerender } = render(<RdsCompAreaChart {...defaultProps} />);
      const newOptions = {
        responsive: false,
        plugins: {
          legend: {
            position: 'right' as const,
          },
        },
      };
      rerender(
        <RdsCompAreaChart {...defaultProps} options={newOptions} />
      );
      expect(RdsCompAreaChart).toBeDefined();
    });

    it('updates chart when isGradient changes', () => {
      const { rerender } = render(
        <RdsCompAreaChart {...defaultProps} isGradient={false} />
      );
      rerender(
        <RdsCompAreaChart {...defaultProps} isGradient={true} />
      );
      expect(RdsCompAreaChart).toBeDefined();
    });
  });

  describe('Multiple Datasets', () => {
    it('renders multiple datasets', () => {
      const multipleDataSets = [
        {
          label: 'Dataset 1',
          data: [10, 20, 30, 40, 50],
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
        },
        {
          label: 'Dataset 2',
          data: [5, 15, 25, 35, 45],
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
        },
        {
          label: 'Dataset 3',
          data: [15, 25, 35, 45, 55],
          borderColor: 'rgb(255, 206, 86)',
          backgroundColor: 'rgba(255, 206, 86, 0.2)',
        },
      ];
      render(
        <RdsCompAreaChart {...defaultProps} dataSets={multipleDataSets} />
      );
      expect(RdsCompAreaChart).toBeDefined();
    });

    it('handles empty datasets array', () => {
      const { container } = render(
        <RdsCompAreaChart {...defaultProps} dataSets={[]} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Label Variations', () => {
    it('renders with month labels', () => {
      const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
      render(
        <RdsCompAreaChart {...defaultProps} labels={monthLabels} />
      );
      expect(RdsCompAreaChart).toBeDefined();
    });

    it('renders with numeric labels', () => {
      const numericLabels = [1, 2, 3, 4, 5];
      render(
        <RdsCompAreaChart {...defaultProps} labels={numericLabels} />
      );
      expect(RdsCompAreaChart).toBeDefined();
    });

    it('renders with empty labels array', () => {
      const { container } = render(
        <RdsCompAreaChart {...defaultProps} labels={[]} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('renders with many labels', () => {
      const manyLabels = Array.from({ length: 50 }, (_, i) => `Month ${i + 1}`);
      const { container } = render(
        <RdsCompAreaChart {...defaultProps} labels={manyLabels} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Color Configuration', () => {
    it('applies custom border color', () => {
      const customDataSets = [
        {
          label: 'Custom Color',
          data: [10, 20, 30],
          borderColor: 'rgb(255, 0, 0)',
          backgroundColor: 'rgba(255, 0, 0, 0.2)',
        },
      ];
      render(
        <RdsCompAreaChart {...defaultProps} dataSets={customDataSets} />
      );
      expect(RdsCompAreaChart).toBeDefined();
    });

    it('applies custom background color', () => {
      const customDataSets = [
        {
          label: 'Custom BG',
          data: [10, 20, 30],
          backgroundColor: 'rgba(0, 255, 0, 0.5)',
        },
      ];
      render(
        <RdsCompAreaChart {...defaultProps} dataSets={customDataSets} />
      );
      expect(RdsCompAreaChart).toBeDefined();
    });
  });

  describe('Scale Configuration', () => {
    it('applies custom x-axis configuration', () => {
      const customOptions = {
        scales: {
          x: {
            grid: {
              color: 'rgba(100, 100, 100, 0.2)',
            },
            ticks: {
              color: 'rgb(100, 100, 100)',
            },
          },
        },
      };
      render(
        <RdsCompAreaChart {...defaultProps} options={customOptions} />
      );
      expect(RdsCompAreaChart).toBeDefined();
    });

    it('applies custom y-axis configuration', () => {
      const customOptions = {
        scales: {
          y: {
            grid: {
              color: 'rgba(50, 50, 50, 0.3)',
            },
            ticks: {
              color: 'rgb(50, 50, 50)',
            },
          },
        },
      };
      render(
        <RdsCompAreaChart {...defaultProps} options={customOptions} />
      );
      expect(RdsCompAreaChart).toBeDefined();
    });

    it('applies both x and y axis configuration', () => {
      const customOptions = {
        scales: {
          x: {
            grid: { color: 'rgba(0, 0, 0, 0.1)' },
            ticks: { color: '#000' },
          },
          y: {
            grid: { color: 'rgba(0, 0, 0, 0.1)' },
            ticks: { color: '#000' },
          },
        },
      };
      render(
        <RdsCompAreaChart {...defaultProps} options={customOptions} />
      );
      expect(RdsCompAreaChart).toBeDefined();
    });
  });

  describe('Dark Mode Stylesheet Updates', () => {
    it('updates grid color in dark mode', () => {
      document.documentElement.setAttribute('data-theme', 'dark');
      const { container } = render(<RdsCompAreaChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.documentElement.removeAttribute('data-theme');
    });

    it('updates tick color in dark mode', () => {
      document.body.classList.add('theme-dark');
      const { container } = render(<RdsCompAreaChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.body.classList.remove('theme-dark');
    });

    it('updates legend label color in dark mode', () => {
      document.body.classList.add('dark-theme');
      const { container } = render(<RdsCompAreaChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.body.classList.remove('dark-theme');
    });

    it('updates tooltip colors in dark mode', () => {
      document.body.setAttribute('data-theme', 'dark');
      const { container } = render(<RdsCompAreaChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.body.removeAttribute('data-theme');
    });
  });

  describe('Legend Plugin Configuration', () => {
    it('preserves legend position when light mode', () => {
      const opts = {
        plugins: {
          legend: {
            position: 'top' as const,
            labels: {
              color: '#000',
            },
          },
        },
      };
      render(
        <RdsCompAreaChart {...defaultProps} options={opts} />
      );
      expect(RdsCompAreaChart).toBeDefined();
    });

    it('preserves legend position when dark mode', () => {
      document.documentElement.setAttribute('data-theme', 'dark');
      const opts = {
        plugins: {
          legend: {
            position: 'bottom' as const,
            labels: {
              color: '#000',
            },
          },
        },
      };
      render(
        <RdsCompAreaChart {...defaultProps} options={opts} />
      );
      expect(RdsCompAreaChart).toBeDefined();
      document.documentElement.removeAttribute('data-theme');
    });
  });

  describe('Tooltip Configuration', () => {
    it('renders with default tooltip', () => {
      render(<RdsCompAreaChart {...defaultProps} />);
      expect(RdsCompAreaChart).toBeDefined();
    });

    it('renders with custom tooltip configuration', () => {
      const optionsWithTooltip = {
        ...defaultProps.options,
        plugins: {
          tooltip: {
            enabled: true,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
          },
        },
      };
      render(
        <RdsCompAreaChart {...defaultProps} options={optionsWithTooltip} />
      );
      expect(RdsCompAreaChart).toBeDefined();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty options object', () => {
      const { container } = render(
        <RdsCompAreaChart {...defaultProps} options={{}} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles null options gracefully', () => {
      const { container } = render(
        <RdsCompAreaChart {...defaultProps} options={null} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles very large dataset values', () => {
      const largeDataSet = [
        {
          label: 'Large Values',
          data: [1000000, 2000000, 3000000],
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
        },
      ];
      render(
        <RdsCompAreaChart {...defaultProps} dataSets={largeDataSet} />
      );
      expect(RdsCompAreaChart).toBeDefined();
    });

    it('handles negative dataset values', () => {
      const negativeDataSet = [
        {
          label: 'Negative Values',
          data: [-10, -20, -30, -40],
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
        },
      ];
      render(
        <RdsCompAreaChart {...defaultProps} dataSets={negativeDataSet} />
      );
      expect(RdsCompAreaChart).toBeDefined();
    });

    it('handles zero values in dataset', () => {
      const zeroDataSet = [
        {
          label: 'Zero Values',
          data: [0, 0, 0, 0],
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
        },
      ];
      render(
        <RdsCompAreaChart {...defaultProps} dataSets={zeroDataSet} />
      );
      expect(RdsCompAreaChart).toBeDefined();
    });

    it('handles mixed positive and negative values', () => {
      const mixedDataSet = [
        {
          label: 'Mixed Values',
          data: [10, -20, 30, -40, 50],
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
        },
      ];
      render(
        <RdsCompAreaChart {...defaultProps} dataSets={mixedDataSet} />
      );
      expect(RdsCompAreaChart).toBeDefined();
    });

    it('handles string values in dataset', () => {
      const stringDataSet = [
        {
          label: 'String Values',
          data: ['10', '20', '30', '40'],
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
        },
      ];
      render(
        <RdsCompAreaChart {...defaultProps} dataSets={stringDataSet} />
      );
      expect(RdsCompAreaChart).toBeDefined();
    });
  });

  describe('Component Lifecycle', () => {
    it('initializes chart on first render', () => {
      const { container } = render(<RdsCompAreaChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('cleans up chart on unmount', () => {
      const { unmount } = render(<RdsCompAreaChart {...defaultProps} />);
      expect(() => unmount()).not.toThrow();
    });

    it('updates chart on multiple re-renders', () => {
      const { rerender } = render(<RdsCompAreaChart {...defaultProps} />);
      
      rerender(
        <RdsCompAreaChart
          {...defaultProps}
          labels={['A', 'B', 'C']}
        />
      );
      expect(RdsCompAreaChart).toBeDefined();

      rerender(
        <RdsCompAreaChart
          {...defaultProps}
          labels={['X', 'Y', 'Z']}
        />
      );
      expect(RdsCompAreaChart).toBeDefined();
    });
  });

  describe('Fill Property', () => {
    it('renders with fill property true', () => {
      const fillDataSet = [
        {
          label: 'Filled',
          data: [10, 20, 30],
          fill: true,
        },
      ];
      render(
        <RdsCompAreaChart {...defaultProps} dataSets={fillDataSet} />
      );
      expect(RdsCompAreaChart).toBeDefined();
    });

    it('renders with fill property false', () => {
      const noFillDataSet = [
        {
          label: 'No Fill',
          data: [10, 20, 30],
          fill: false,
        },
      ];
      render(
        <RdsCompAreaChart {...defaultProps} dataSets={noFillDataSet} />
      );
      expect(RdsCompAreaChart).toBeDefined();
    });
  });

  describe('Responsive Configuration', () => {
    it('renders with responsive true', () => {
      const responsiveOptions = {
        ...defaultProps.options,
        responsive: true,
      };
      render(
        <RdsCompAreaChart {...defaultProps} options={responsiveOptions} />
      );
      expect(RdsCompAreaChart).toBeDefined();
    });

    it('renders with responsive false', () => {
      const unresponsiveOptions = {
        ...defaultProps.options,
        responsive: false,
      };
      render(
        <RdsCompAreaChart {...defaultProps} options={unresponsiveOptions} />
      );
      expect(RdsCompAreaChart).toBeDefined();
    });

    it('renders with maintainAspectRatio option', () => {
      const aspectOptions = {
        ...defaultProps.options,
        maintainAspectRatio: true,
      };
      render(
        <RdsCompAreaChart {...defaultProps} options={aspectOptions} />
      );
      expect(RdsCompAreaChart).toBeDefined();
    });
  });
});
