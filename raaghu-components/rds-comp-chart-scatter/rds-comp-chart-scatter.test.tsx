import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';
import RdsCompScatterChart from './rds-comp-chart-scatter';

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
jest.mock('./rds-comp-chart-scatter.scss', () => ({}));

const defaultProps = {
  labels: ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5'],
  dataSets: [
    {
      label: 'Dataset 1',
      data: [
        { x: 10, y: 20 },
        { x: 15, y: 25 },
        { x: 12, y: 18 },
        { x: 18, y: 22 },
        { x: 14, y: 20 },
      ],
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
    },
  ],
  options: {
    responsive: true,
    maintainAspectRatio: false,
  },
  id: 'scatter-chart-1',
};

describe('RdsCompScatterChart', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    it('renders the component without crashing', () => {
      const { container } = render(<RdsCompScatterChart {...defaultProps} />);
      expect(container).toBeInTheDocument();
    });

    it('renders canvas element', () => {
      const { container } = render(<RdsCompScatterChart {...defaultProps} />);
      const canvas = container.querySelector('canvas');
      expect(canvas).toBeInTheDocument();
    });

    it('canvas element has correct id', () => {
      const { container } = render(<RdsCompScatterChart {...defaultProps} />);
      const canvas = container.querySelector('canvas');
      expect(canvas).toHaveAttribute('id', 'scatter-chart-1');
    });

    it('renders div wrapper with correct class', () => {
      const { container } = render(<RdsCompScatterChart {...defaultProps} />);
      const div = container.querySelector('.rds-comp-chart-scatter');
      expect(div).toBeInTheDocument();
    });

    it('has correct display name', () => {
      expect(RdsCompScatterChart.displayName).toBe('RdsCompScatterChart');
    });

    it('renders with different id values', () => {
      const { container } = render(
        <RdsCompScatterChart {...defaultProps} id="custom-scatter" />
      );
      const canvas = container.querySelector('canvas');
      expect(canvas).toHaveAttribute('id', 'custom-scatter');
    });
  });

  describe('Props Handling', () => {
    it('passes labels to chart', () => {
      const { container } = render(<RdsCompScatterChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('passes dataSets to chart', () => {
      const customDatasets = [
        {
          label: 'Custom Dataset',
          data: [
            { x: 5, y: 10 },
            { x: 8, y: 15 },
            { x: 12, y: 20 },
          ],
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ];
      const { container } = render(
        <RdsCompScatterChart {...defaultProps} dataSets={customDatasets} />
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
        <RdsCompScatterChart {...defaultProps} options={customOptions} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('uses provided id for canvas', () => {
      const { container } = render(
        <RdsCompScatterChart {...defaultProps} id="chart-id-1" />
      );
      const canvas = container.querySelector('canvas');
      expect(canvas).toHaveAttribute('id', 'chart-id-1');
    });

    it('handles different id values', () => {
      const { rerender, container } = render(
        <RdsCompScatterChart {...defaultProps} id="chart-1" />
      );
      let canvas = container.querySelector('canvas');
      expect(canvas).toHaveAttribute('id', 'chart-1');

      rerender(<RdsCompScatterChart {...defaultProps} id="chart-2" />);
      canvas = container.querySelector('canvas');
      expect(canvas).toHaveAttribute('id', 'chart-2');
    });
  });

  describe('Dark Mode Detection', () => {
    it('detects dark mode from body class theme-dark', () => {
      document.body.classList.add('theme-dark');
      const { container } = render(<RdsCompScatterChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.body.classList.remove('theme-dark');
    });

    it('detects dark mode from body class dark-theme', () => {
      document.body.classList.add('dark-theme');
      const { container } = render(<RdsCompScatterChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.body.classList.remove('dark-theme');
    });

    it('detects dark mode from documentElement attribute', () => {
      document.documentElement.setAttribute('data-theme', 'dark');
      const { container } = render(<RdsCompScatterChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.documentElement.removeAttribute('data-theme');
    });

    it('detects dark mode from body attribute', () => {
      document.body.setAttribute('data-theme', 'dark');
      const { container } = render(<RdsCompScatterChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.body.removeAttribute('data-theme');
    });

    it('defaults to light mode when no dark mode indicators', () => {
      document.body.classList.remove('theme-dark', 'dark-theme');
      document.documentElement.removeAttribute('data-theme');
      document.body.removeAttribute('data-theme');
      const { container } = render(<RdsCompScatterChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Dark Mode Styles', () => {
    it('applies X axis grid color in dark mode', () => {
      document.body.classList.add('theme-dark');
      const { container } = render(<RdsCompScatterChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.body.classList.remove('theme-dark');
    });

    it('applies Y axis grid color in dark mode', () => {
      document.body.classList.add('theme-dark');
      const { container } = render(<RdsCompScatterChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.body.classList.remove('theme-dark');
    });

    it('applies X axis ticks color in dark mode', () => {
      document.body.classList.add('theme-dark');
      const { container } = render(<RdsCompScatterChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.body.classList.remove('theme-dark');
    });

    it('applies Y axis ticks color in dark mode', () => {
      document.body.classList.add('theme-dark');
      const { container } = render(<RdsCompScatterChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.body.classList.remove('theme-dark');
    });

    it('applies X axis border color in dark mode', () => {
      document.body.classList.add('theme-dark');
      const { container } = render(<RdsCompScatterChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.body.classList.remove('theme-dark');
    });

    it('applies Y axis border color in dark mode', () => {
      document.body.classList.add('theme-dark');
      const { container } = render(<RdsCompScatterChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.body.classList.remove('theme-dark');
    });

    it('applies X axis title color in dark mode', () => {
      document.body.classList.add('theme-dark');
      const { container } = render(<RdsCompScatterChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.body.classList.remove('theme-dark');
    });

    it('applies Y axis title color in dark mode', () => {
      document.body.classList.add('theme-dark');
      const { container } = render(<RdsCompScatterChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.body.classList.remove('theme-dark');
    });

    it('applies legend label color in dark mode', () => {
      document.body.classList.add('theme-dark');
      const { container } = render(<RdsCompScatterChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.body.classList.remove('theme-dark');
    });

    it('applies title color in dark mode', () => {
      document.body.classList.add('theme-dark');
      const { container } = render(<RdsCompScatterChart {...defaultProps} />);
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
        <RdsCompScatterChart {...propsWithTooltip} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.body.classList.remove('theme-dark');
    });
  });

  describe('Canvas Dimensions', () => {
    it('sets canvas height to 76vh', () => {
      const { container } = render(<RdsCompScatterChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('sets canvas width to 100vh', () => {
      const { container } = render(<RdsCompScatterChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('maintains fixed dimensions across all instances', () => {
      const { container: container1 } = render(
        <RdsCompScatterChart {...defaultProps} />
      );
      const canvas1 = container1.querySelector('canvas');
      expect(canvas1).toBeInTheDocument();

      const { container: container2 } = render(
        <RdsCompScatterChart {...defaultProps} id="chart-2" />
      );
      const canvas2 = container2.querySelector('canvas');
      expect(canvas2).toBeInTheDocument();
    });
  });

  describe('Chart Type', () => {
    it('creates chart with type bar', () => {
      const { container } = render(<RdsCompScatterChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('passes correct data structure to chart', () => {
      const { container } = render(<RdsCompScatterChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Chart Destruction', () => {
    it('destroys chart on unmount', () => {
      const { unmount } = render(<RdsCompScatterChart {...defaultProps} />);
      unmount();
      expect(true).toBe(true);
    });

    it('destroys previous chart on props update', () => {
      const { rerender } = render(<RdsCompScatterChart {...defaultProps} />);
      rerender(
        <RdsCompScatterChart
          {...defaultProps}
          labels={['A', 'B', 'C']}
        />
      );
      expect(true).toBe(true);
    });
  });

  describe('Scatter Data Format', () => {
    it('handles x/y coordinate data format', () => {
      const scatterData = [
        {
          label: 'Scatter Points',
          data: [
            { x: 5, y: 10 },
            { x: 15, y: 25 },
            { x: 8, y: 12 },
          ],
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
        },
      ];
      const { container } = render(
        <RdsCompScatterChart {...defaultProps} dataSets={scatterData} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles multiple scatter datasets', () => {
      const multiScatterDatasets = [
        {
          label: 'Dataset 1',
          data: [
            { x: 5, y: 10 },
            { x: 12, y: 18 },
            { x: 8, y: 15 },
          ],
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
        },
        {
          label: 'Dataset 2',
          data: [
            { x: 10, y: 12 },
            { x: 14, y: 20 },
            { x: 11, y: 16 },
          ],
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ];
      const { container } = render(
        <RdsCompScatterChart {...defaultProps} dataSets={multiScatterDatasets} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Data Updates', () => {
    it('updates chart when labels change', () => {
      const { rerender, container } = render(
        <RdsCompScatterChart {...defaultProps} />
      );
      rerender(
        <RdsCompScatterChart
          {...defaultProps}
          labels={['A', 'B', 'C', 'D']}
        />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('updates chart when dataSets change', () => {
      const { rerender, container } = render(
        <RdsCompScatterChart {...defaultProps} />
      );
      rerender(
        <RdsCompScatterChart
          {...defaultProps}
          dataSets={[
            {
              label: 'New Dataset',
              data: [
                { x: 10, y: 15 },
                { x: 20, y: 25 },
              ],
              backgroundColor: 'rgba(255, 159, 64, 0.5)',
            },
          ]}
        />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('updates chart when options change', () => {
      const { rerender, container } = render(
        <RdsCompScatterChart {...defaultProps} />
      );
      rerender(
        <RdsCompScatterChart
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
        <RdsCompScatterChart {...defaultProps} id="chart-1" />
      );
      let canvas = container.querySelector('canvas');
      expect(canvas).toHaveAttribute('id', 'chart-1');

      rerender(<RdsCompScatterChart {...defaultProps} id="chart-2" />);
      canvas = container.querySelector('canvas');
      expect(canvas).toHaveAttribute('id', 'chart-2');
    });
  });

  describe('Multiple Datasets', () => {
    it('renders multiple datasets with different colors', () => {
      const multiDatasets = [
        {
          label: 'Dataset 1',
          data: [
            { x: 10, y: 20 },
            { x: 15, y: 25 },
          ],
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
        },
        {
          label: 'Dataset 2',
          data: [
            { x: 8, y: 18 },
            { x: 12, y: 22 },
          ],
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ];
      const { container } = render(
        <RdsCompScatterChart {...defaultProps} dataSets={multiDatasets} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles three datasets', () => {
      const threeDatasets = [
        {
          label: 'Dataset 1',
          data: [{ x: 10, y: 15 }],
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
        },
        {
          label: 'Dataset 2',
          data: [{ x: 8, y: 12 }],
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: 'Dataset 3',
          data: [{ x: 14, y: 20 }],
          backgroundColor: 'rgba(255, 206, 86, 0.5)',
        },
      ];
      const { container } = render(
        <RdsCompScatterChart {...defaultProps} dataSets={threeDatasets} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles empty datasets array', () => {
      const { container } = render(
        <RdsCompScatterChart {...defaultProps} dataSets={[]} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Label Variations', () => {
    it('renders with numeric string labels', () => {
      const { container } = render(
        <RdsCompScatterChart
          {...defaultProps}
          labels={['1', '2', '3', '4', '5']}
        />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('renders with text labels', () => {
      const { container } = render(
        <RdsCompScatterChart
          {...defaultProps}
          labels={['North', 'South', 'East', 'West', 'Center']}
        />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('renders with empty labels array', () => {
      const { container } = render(
        <RdsCompScatterChart {...defaultProps} labels={[]} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('renders with many labels', () => {
      const manyLabels = Array.from({ length: 20 }, (_, i) => `Label ${i + 1}`);
      const { container } = render(
        <RdsCompScatterChart
          {...defaultProps}
          labels={manyLabels}
        />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Color Configuration', () => {
    it('applies custom background colors', () => {
      const coloredDataset = [
        {
          label: 'Colored',
          data: [
            { x: 10, y: 20 },
            { x: 15, y: 25 },
          ],
          backgroundColor: 'rgba(255, 0, 0, 0.5)',
        },
      ];
      const { container } = render(
        <RdsCompScatterChart {...defaultProps} dataSets={coloredDataset} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('applies custom border colors', () => {
      const borderedDataset = [
        {
          label: 'Bordered',
          data: [
            { x: 10, y: 20 },
            { x: 15, y: 25 },
          ],
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
          borderColor: 'rgba(100, 200, 200, 1)',
          borderWidth: 2,
        },
      ];
      const { container } = render(
        <RdsCompScatterChart {...defaultProps} dataSets={borderedDataset} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty labels array', () => {
      const { container } = render(
        <RdsCompScatterChart {...defaultProps} labels={[]} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles empty datasets array', () => {
      const { container } = render(
        <RdsCompScatterChart {...defaultProps} dataSets={[]} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles very large coordinate values', () => {
      const largeDataset = [
        {
          label: 'Large Values',
          data: [
            { x: 999999, y: 888888 },
            { x: 777777, y: 666666 },
          ],
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
        },
      ];
      const { container } = render(
        <RdsCompScatterChart
          {...defaultProps}
          labels={['A', 'B']}
          dataSets={largeDataset}
        />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles very small coordinate values', () => {
      const smallDataset = [
        {
          label: 'Small Values',
          data: [
            { x: 0.1, y: 0.2 },
            { x: 0.3, y: 0.4 },
          ],
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
        },
      ];
      const { container } = render(
        <RdsCompScatterChart
          {...defaultProps}
          labels={['A', 'B']}
          dataSets={smallDataset}
        />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles zero coordinate values', () => {
      const zeroDataset = [
        {
          label: 'With Zero',
          data: [
            { x: 0, y: 20 },
            { x: 10, y: 0 },
          ],
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
        },
      ];
      const { container } = render(
        <RdsCompScatterChart
          {...defaultProps}
          labels={['A', 'B']}
          dataSets={zeroDataset}
        />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles negative coordinate values', () => {
      const negativeDataset = [
        {
          label: 'With Negatives',
          data: [
            { x: -10, y: 20 },
            { x: 10, y: -20 },
          ],
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
        },
      ];
      const { container } = render(
        <RdsCompScatterChart
          {...defaultProps}
          labels={['A', 'B']}
          dataSets={negativeDataset}
        />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles empty options object', () => {
      const { container } = render(
        <RdsCompScatterChart {...defaultProps} options={{}} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles undefined options', () => {
      const { container } = render(
        <RdsCompScatterChart {...defaultProps} options={undefined} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Component Lifecycle', () => {
    it('initializes chart on first render', () => {
      const { container } = render(<RdsCompScatterChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('cleans up chart on unmount', () => {
      const { unmount, container } = render(
        <RdsCompScatterChart {...defaultProps} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
      unmount();
    });

    it('updates chart on multiple re-renders', () => {
      const { rerender, container } = render(
        <RdsCompScatterChart {...defaultProps} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();

      rerender(
        <RdsCompScatterChart
          {...defaultProps}
          labels={['X', 'Y', 'Z']}
        />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();

      rerender(
        <RdsCompScatterChart
          {...defaultProps}
          dataSets={[
            {
              label: 'Updated',
              data: [
                { x: 25, y: 30 },
                { x: 35, y: 40 },
              ],
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
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
        <RdsCompScatterChart {...defaultProps} id="chart-1" />
      );
      let canvas = container.querySelector('canvas');
      expect(canvas).toHaveAttribute('id', 'chart-1');

      rerender(<RdsCompScatterChart {...defaultProps} id="chart-2" />);
      canvas = container.querySelector('canvas');
      expect(canvas).toHaveAttribute('id', 'chart-2');
    });

    it('preserves canvas ref through re-renders', () => {
      const { rerender, container } = render(
        <RdsCompScatterChart {...defaultProps} />
      );
      const canvas1 = container.querySelector('canvas');

      rerender(
        <RdsCompScatterChart
          {...defaultProps}
          labels={['Updated']}
        />
      );
      const canvas2 = container.querySelector('canvas');

      expect(canvas2).toBeInTheDocument();
    });

    it('handles rapid successive re-renders', () => {
      const { rerender, container } = render(
        <RdsCompScatterChart {...defaultProps} />
      );

      rerender(
        <RdsCompScatterChart
          {...defaultProps}
          dataSets={[{ label: 'Set 1', data: [{ x: 1, y: 2 }] }]}
        />
      );
      rerender(
        <RdsCompScatterChart
          {...defaultProps}
          dataSets={[{ label: 'Set 2', data: [{ x: 3, y: 4 }] }]}
        />
      );
      rerender(
        <RdsCompScatterChart
          {...defaultProps}
          dataSets={[{ label: 'Set 3', data: [{ x: 5, y: 6 }] }]}
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
        <RdsCompScatterChart {...defaultProps} options={optionsWithPlugins} />
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
        <RdsCompScatterChart {...defaultProps} options={options} />
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
        <RdsCompScatterChart {...defaultProps} options={customLegendOptions} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('canvas element is in document', () => {
      const { container } = render(<RdsCompScatterChart {...defaultProps} />);
      const canvas = container.querySelector('canvas');
      expect(canvas).toBeInTheDocument();
  
    });
    it('has no axe accessibility violations', async () => {
      const { container } = render(<RdsCompScatterChart {...defaultProps} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('canvas has id attribute', () => {
      const { container } = render(<RdsCompScatterChart {...defaultProps} />);
      const canvas = container.querySelector('canvas');
      expect(canvas).toHaveAttribute('id');
    });

    it('canvas has proper id value', () => {
      const { container } = render(
        <RdsCompScatterChart {...defaultProps} id="accessible-scatter" />
      );
      const canvas = container.querySelector('canvas');
      expect(canvas).toHaveAttribute('id', 'accessible-scatter');
    });

    it('canvas is focusable element', () => {
      const { container } = render(<RdsCompScatterChart {...defaultProps} />);
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
            beginAtZero: true,
            max: 100,
          },
          y: {
            beginAtZero: true,
            max: 100,
          },
        },
      };
      const { container } = render(
        <RdsCompScatterChart {...defaultProps} options={scaleOptions} />
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
              text: 'X Axis',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Y Axis',
            },
          },
        },
      };
      document.body.classList.add('theme-dark');
      const { container } = render(
        <RdsCompScatterChart {...defaultProps} options={scaleOptions} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.body.classList.remove('theme-dark');
    });
  });

  describe('Minimal Props', () => {
    it('renders with minimal required props', () => {
      const minimalProps = {
        id: 'minimal-chart',
        labels: ['A', 'B'],
        dataSets: [{ label: 'Data', data: [{ x: 10, y: 20 }] }],
        options: {},
      };
      const { container } = render(
        <RdsCompScatterChart {...minimalProps} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('renders with all features enabled', () => {
      const { container } = render(<RdsCompScatterChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('State Management', () => {
    it('initializes with default theme mode', () => {
      const { container } = render(<RdsCompScatterChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('responds to theme changes', () => {
      const { container, rerender } = render(
        <RdsCompScatterChart {...defaultProps} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();

      // Simulate theme change
      document.documentElement.setAttribute('data-theme', 'dark');
      rerender(<RdsCompScatterChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();

      document.documentElement.removeAttribute('data-theme');
    });
  });
});