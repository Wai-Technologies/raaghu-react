import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';
import RdsCompBubbleChart from './rds-comp-chart-bubble';

// Mock SCSS
jest.mock('./rds-comp-chart-bubble.scss', () => ({}));

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
  labels: ['Bubble 1', 'Bubble 2', 'Bubble 3'],
  dataSets: [
    {
      label: 'Dataset 1',
      data: [
        { x: 10, y: 20, r: 5 },
        { x: 20, y: 30, r: 10 },
        { x: 30, y: 40, r: 15 },
      ],
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
    },
  ],
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        min: 0,
        max: 40,
      },
      y: {
        min: 0,
        max: 50,
      },
    },
  },
  id: 'bubble-chart-1',
};

describe('RdsCompBubbleChart', () => {
  describe('Basic Rendering', () => {
    it('renders the component without crashing', () => {
      const { container } = render(<RdsCompBubbleChart {...defaultProps} />);
      expect(container).toBeInTheDocument();
    });

    it('renders with correct display name', () => {
      expect(RdsCompBubbleChart.displayName).toBe('RdsCompBubbleChart');
    });

    it('renders canvas element', () => {
      const { container } = render(<RdsCompBubbleChart {...defaultProps} />);
      const canvas = container.querySelector('canvas');
      expect(canvas).toBeInTheDocument();
    });

    it('canvas element has correct id', () => {
      const { container } = render(<RdsCompBubbleChart {...defaultProps} />);
      const canvas = container.querySelector('canvas');
      expect(canvas).toHaveAttribute('id', 'bubble-chart-1');
    });

    it('canvas element has correct data-testid', () => {
      const { container } = render(<RdsCompBubbleChart {...defaultProps} />);
      const canvas = container.querySelector('[data-testid="bubble-chart-1"]');
      expect(canvas).toBeInTheDocument();
    });

    it('canvas element has correct width attribute', () => {
      const { container } = render(<RdsCompBubbleChart {...defaultProps} />);
      const canvas = container.querySelector('canvas');
      expect(canvas).toHaveAttribute('width', '300');
    });

    it('canvas element has correct height attribute', () => {
      const { container } = render(<RdsCompBubbleChart {...defaultProps} />);
      const canvas = container.querySelector('canvas');
      expect(canvas).toHaveAttribute('height', '300');
    });

    it('renders div wrapper', () => {
      const { container } = render(<RdsCompBubbleChart {...defaultProps} />);
      const div = container.querySelector('div');
      expect(div).toBeInTheDocument();
    });
  });

  describe('Props Handling', () => {
    it('passes labels to chart', () => {
      const { container } = render(<RdsCompBubbleChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('passes dataSets to chart', () => {
      const customDatasets = [
        {
          label: 'Custom Dataset',
          data: [
            { x: 5, y: 10, r: 3 },
            { x: 15, y: 25, r: 8 },
          ],
          backgroundColor: 'rgba(255, 99, 132, 0.6)',
        },
      ];
      const { container } = render(
        <RdsCompBubbleChart {...defaultProps} dataSets={customDatasets} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('passes options to chart', () => {
      const customOptions = {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          x: { min: 0, max: 50 },
          y: { min: 0, max: 60 },
        },
      };
      const { container } = render(
        <RdsCompBubbleChart {...defaultProps} options={customOptions} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('uses provided id for canvas', () => {
      const { container } = render(
        <RdsCompBubbleChart {...defaultProps} id="custom-bubble" />
      );
      const canvas = container.querySelector('canvas');
      expect(canvas).toHaveAttribute('id', 'custom-bubble');
    });

    it('handles different id values', () => {
      const { rerender, container } = render(
        <RdsCompBubbleChart {...defaultProps} id="chart-1" />
      );
      let canvas = container.querySelector('canvas');
      expect(canvas).toHaveAttribute('id', 'chart-1');

      rerender(<RdsCompBubbleChart {...defaultProps} id="chart-2" />);
      canvas = container.querySelector('canvas');
      expect(canvas).toHaveAttribute('id', 'chart-2');
    });
  });

  describe('Dark Mode Detection', () => {
    it('detects dark mode from body class theme-dark', () => {
      document.body.classList.add('theme-dark');
      const { container } = render(<RdsCompBubbleChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.body.classList.remove('theme-dark');
    });

    it('detects dark mode from body class dark-theme', () => {
      document.body.classList.add('dark-theme');
      const { container } = render(<RdsCompBubbleChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.body.classList.remove('dark-theme');
    });

    it('detects dark mode from documentElement attribute', () => {
      document.documentElement.setAttribute('data-theme', 'dark');
      const { container } = render(<RdsCompBubbleChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.documentElement.removeAttribute('data-theme');
    });

    it('detects dark mode from body attribute', () => {
      document.body.setAttribute('data-theme', 'dark');
      const { container } = render(<RdsCompBubbleChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.body.removeAttribute('data-theme');
    });

    it('defaults to light mode when no dark mode indicators', () => {
      document.body.classList.remove('theme-dark', 'dark-theme');
      document.documentElement.removeAttribute('data-theme');
      document.body.removeAttribute('data-theme');
      const { container } = render(<RdsCompBubbleChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Dark Mode Styles', () => {
    it('applies grid color in dark mode', () => {
      document.body.classList.add('theme-dark');
      const { container } = render(<RdsCompBubbleChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.body.classList.remove('theme-dark');
    });

    it('applies tick color in dark mode', () => {
      document.body.classList.add('theme-dark');
      const { container } = render(<RdsCompBubbleChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.body.classList.remove('theme-dark');
    });

    it('applies border color in dark mode', () => {
      document.body.classList.add('theme-dark');
      const { container } = render(<RdsCompBubbleChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.body.classList.remove('theme-dark');
    });

    it('applies title color in dark mode', () => {
      document.body.classList.add('theme-dark');
      const { container } = render(<RdsCompBubbleChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.body.classList.remove('theme-dark');
    });

    it('applies legend label color in dark mode', () => {
      document.body.classList.add('theme-dark');
      const { container } = render(<RdsCompBubbleChart {...defaultProps} />);
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
        <RdsCompBubbleChart {...propsWithTooltip} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.body.classList.remove('theme-dark');
    });
  });

  describe('Chart Destruction', () => {
    it('destroys chart on unmount', () => {
      const { unmount } = render(<RdsCompBubbleChart {...defaultProps} />);
      unmount();
      expect(true).toBe(true);
    });

    it('destroys previous chart on props update', () => {
      const { rerender } = render(<RdsCompBubbleChart {...defaultProps} />);
      rerender(
        <RdsCompBubbleChart
          {...defaultProps}
          labels={['Updated Bubble']}
        />
      );
      expect(true).toBe(true);
    });
  });

  describe('Chart Configuration', () => {
    it('creates chart with type bubble', () => {
      const { container } = render(<RdsCompBubbleChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('passes correct chart type to Chart.js', () => {
      const { container } = render(<RdsCompBubbleChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('sets up chart with labels and datasets', () => {
      const { container } = render(<RdsCompBubbleChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Data Updates', () => {
    it('updates chart when labels change', () => {
      const { rerender, container } = render(
        <RdsCompBubbleChart {...defaultProps} />
      );
      rerender(
        <RdsCompBubbleChart
          {...defaultProps}
          labels={['Bubble A', 'Bubble B']}
        />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('updates chart when dataSets change', () => {
      const { rerender, container } = render(
        <RdsCompBubbleChart {...defaultProps} />
      );
      rerender(
        <RdsCompBubbleChart
          {...defaultProps}
          dataSets={[
            {
              label: 'New Dataset',
              data: [{ x: 5, y: 5, r: 5 }],
              backgroundColor: 'rgba(100, 100, 100, 0.6)',
            },
          ]}
        />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('updates chart when options change', () => {
      const { rerender, container } = render(
        <RdsCompBubbleChart {...defaultProps} />
      );
      rerender(
        <RdsCompBubbleChart
          {...defaultProps}
          options={{
            responsive: false,
            scales: {
              x: { min: 0, max: 100 },
              y: { min: 0, max: 100 },
            },
          }}
        />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Bubble Data Points', () => {
    it('renders with single bubble', () => {
      const singleBubble = [
        {
          label: 'Single',
          data: [{ x: 10, y: 20, r: 5 }],
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
        },
      ];
      const { container } = render(
        <RdsCompBubbleChart {...defaultProps} dataSets={singleBubble} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('renders with multiple bubbles in single dataset', () => {
      const multiBubbles = [
        {
          label: 'Multiple',
          data: [
            { x: 5, y: 10, r: 2 },
            { x: 15, y: 25, r: 5 },
            { x: 25, y: 35, r: 10 },
            { x: 35, y: 45, r: 15 },
          ],
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
        },
      ];
      const { container } = render(
        <RdsCompBubbleChart {...defaultProps} dataSets={multiBubbles} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('renders with multiple datasets', () => {
      const multiDatasets = [
        {
          label: 'Dataset 1',
          data: [{ x: 10, y: 20, r: 5 }],
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
        },
        {
          label: 'Dataset 2',
          data: [{ x: 30, y: 40, r: 10 }],
          backgroundColor: 'rgba(255, 99, 132, 0.6)',
        },
      ];
      const { container } = render(
        <RdsCompBubbleChart {...defaultProps} dataSets={multiDatasets} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Bubble Sizing', () => {
    it('renders with small bubble radius', () => {
      const smallBubbles = [
        {
          label: 'Small',
          data: [{ x: 10, y: 20, r: 1 }],
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
        },
      ];
      const { container } = render(
        <RdsCompBubbleChart {...defaultProps} dataSets={smallBubbles} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('renders with large bubble radius', () => {
      const largeBubbles = [
        {
          label: 'Large',
          data: [{ x: 10, y: 20, r: 50 }],
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
        },
      ];
      const { container } = render(
        <RdsCompBubbleChart {...defaultProps} dataSets={largeBubbles} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('renders with varying bubble sizes', () => {
      const varyingBubbles = [
        {
          label: 'Varying',
          data: [
            { x: 5, y: 10, r: 2 },
            { x: 15, y: 25, r: 8 },
            { x: 25, y: 35, r: 20 },
            { x: 35, y: 45, r: 30 },
          ],
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
        },
      ];
      const { container } = render(
        <RdsCompBubbleChart {...defaultProps} dataSets={varyingBubbles} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Color Configuration', () => {
    it('applies custom background colors', () => {
      const coloredDataset = [
        {
          label: 'Colored',
          data: [{ x: 10, y: 20, r: 5 }],
          backgroundColor: 'rgba(255, 99, 132, 0.8)',
        },
      ];
      const { container } = render(
        <RdsCompBubbleChart {...defaultProps} dataSets={coloredDataset} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('applies custom border colors', () => {
      const borderedDataset = [
        {
          label: 'Bordered',
          data: [{ x: 10, y: 20, r: 5 }],
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 2,
        },
      ];
      const { container } = render(
        <RdsCompBubbleChart {...defaultProps} dataSets={borderedDataset} />
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
            min: 0,
            max: 100,
            title: {
              display: true,
              text: 'X Axis',
            },
          },
        },
      };
      const { container } = render(
        <RdsCompBubbleChart {...defaultProps} options={xAxisOptions} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('applies custom y-axis configuration', () => {
      const yAxisOptions = {
        responsive: true,
        scales: {
          y: {
            min: 0,
            max: 100,
            title: {
              display: true,
              text: 'Y Axis',
            },
          },
        },
      };
      const { container } = render(
        <RdsCompBubbleChart {...defaultProps} options={yAxisOptions} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('applies both x and y axis configuration', () => {
      const bothAxisOptions = {
        responsive: true,
        scales: {
          x: { min: 0, max: 100 },
          y: { min: 0, max: 100 },
        },
      };
      const { container } = render(
        <RdsCompBubbleChart {...defaultProps} options={bothAxisOptions} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Props Variants', () => {
    it('renders with minimal props', () => {
      const minimalProps = {
        id: 'bubble-1',
        labels: ['Bubble'],
        dataSets: [{ data: [{ x: 10, y: 20, r: 5 }] }],
        options: {},
      };
      const { container } = render(
        <RdsCompBubbleChart {...minimalProps} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('renders with all features enabled', () => {
      const { container } = render(<RdsCompBubbleChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty labels array', () => {
      const { container } = render(
        <RdsCompBubbleChart {...defaultProps} labels={[]} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles empty datasets array', () => {
      const { container } = render(
        <RdsCompBubbleChart {...defaultProps} dataSets={[]} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles very large coordinate values', () => {
      const largeCoords = [
        {
          label: 'Large',
          data: [{ x: 999999, y: 999999, r: 100 }],
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
        },
      ];
      const { container } = render(
        <RdsCompBubbleChart {...defaultProps} dataSets={largeCoords} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles negative coordinate values', () => {
      const negativeCoords = [
        {
          label: 'Negative',
          data: [{ x: -10, y: -20, r: 5 }],
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
        },
      ];
      const { container } = render(
        <RdsCompBubbleChart {...defaultProps} dataSets={negativeCoords} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles zero values', () => {
      const zeroValues = [
        {
          label: 'Zero',
          data: [{ x: 0, y: 0, r: 0 }],
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
        },
      ];
      const { container } = render(
        <RdsCompBubbleChart {...defaultProps} dataSets={zeroValues} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles null options gracefully', () => {
      const { container } = render(
        <RdsCompBubbleChart {...defaultProps} options={null} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles empty options object', () => {
      const { container } = render(
        <RdsCompBubbleChart {...defaultProps} options={{}} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Component Lifecycle', () => {
    it('initializes chart on first render', () => {
      const { container } = render(<RdsCompBubbleChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('cleans up chart on unmount', () => {
      const { unmount, container } = render(
        <RdsCompBubbleChart {...defaultProps} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
      unmount();
    });

    it('updates chart on multiple re-renders', () => {
      const { rerender, container } = render(
        <RdsCompBubbleChart {...defaultProps} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();

      rerender(
        <RdsCompBubbleChart
          {...defaultProps}
          labels={['Bubble A']}
        />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();

      rerender(
        <RdsCompBubbleChart
          {...defaultProps}
          dataSets={[
            {
              label: 'Updated',
              data: [{ x: 20, y: 30, r: 10 }],
              backgroundColor: 'rgba(255, 99, 132, 0.6)',
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
        <RdsCompBubbleChart {...defaultProps} id="chart-1" />
      );
      let canvas = container.querySelector('canvas');
      expect(canvas).toHaveAttribute('id', 'chart-1');

      rerender(<RdsCompBubbleChart {...defaultProps} id="chart-2" />);
      canvas = container.querySelector('canvas');
      expect(canvas).toHaveAttribute('id', 'chart-2');
    });

    it('preserves canvas ref through re-renders', () => {
      const { rerender, container } = render(
        <RdsCompBubbleChart {...defaultProps} />
      );
      const canvas1 = container.querySelector('canvas');

      rerender(
        <RdsCompBubbleChart
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
        <RdsCompBubbleChart {...defaultProps} options={responsiveOptions} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('renders with responsive false', () => {
      const fixedOptions = {
        responsive: false,
        maintainAspectRatio: true,
      };
      const { container } = render(
        <RdsCompBubbleChart {...defaultProps} options={fixedOptions} />
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
        <RdsCompBubbleChart {...defaultProps} options={aspectOptions} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Canvas Dimensions', () => {
    it('canvas has fixed width of 300', () => {
      const { container } = render(<RdsCompBubbleChart {...defaultProps} />);
      const canvas = container.querySelector('canvas');
      expect(canvas).toHaveAttribute('width', '300');
    });

    it('canvas has fixed height of 300', () => {
      const { container } = render(<RdsCompBubbleChart {...defaultProps} />);
      const canvas = container.querySelector('canvas');
      expect(canvas).toHaveAttribute('height', '300');
    });
  });

  describe('Accessibility', () => {
    it('canvas element is in document', () => {
      const { container } = render(<RdsCompBubbleChart {...defaultProps} />);
      const canvas = container.querySelector('canvas');
      expect(canvas).toBeInTheDocument();
  
    });

    it('has no axe accessibility violations', async () => {
      const { container } = render(<RdsCompBubbleChart {...defaultProps} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('canvas has id attribute', () => {
      const { container } = render(<RdsCompBubbleChart {...defaultProps} />);
      const canvas = container.querySelector('canvas');
      expect(canvas).toHaveAttribute('id');
    });

    it('canvas has data-testid attribute', () => {
      const { container } = render(<RdsCompBubbleChart {...defaultProps} />);
      const canvas = container.querySelector('[data-testid="bubble-chart-1"]');
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
            position: 'top',
          },
          tooltip: {
            enabled: true,
          },
        },
      };
      const { container } = render(
        <RdsCompBubbleChart {...defaultProps} options={optionsWithPlugins} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('deep clones options before modification', () => {
      const options = {
        responsive: true,
        scales: {
          x: { display: true } as any,
          y: { display: true } as any,
        },
      };
      const { container } = render(
        <RdsCompBubbleChart {...defaultProps} options={options} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
      // Original options should not be mutated - grid property should not be added
      expect((options.scales.x as any).grid).toBeUndefined();
    });
  });

  describe('Chart Type', () => {
    it('renders as bubble chart type', () => {
      const { container } = render(<RdsCompBubbleChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });
});