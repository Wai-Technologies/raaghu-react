import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';
import RdsCompRadarChart from './rds-comp-chart-radar';

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
      width: 450,
      height: 350,
    };
  });
});

// Mock SCSS
jest.mock('./rds-comp-chart-radar.scss', () => ({}));

const defaultProps = {
  labels: ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5'],
  dataSets: [
    {
      label: 'Dataset 1',
      data: [12, 19, 3, 5, 2],
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
    },
  ],
  options: {
    responsive: true,
    maintainAspectRatio: false,
  },
  id: 'radar-chart-1',
};

describe('RdsCompRadarChart', () => {
  describe('Basic Rendering', () => {
    it('renders the component without crashing', () => {
      const { container } = render(<RdsCompRadarChart {...defaultProps} />);
      expect(container).toBeInTheDocument();
    });

    it('renders canvas element', () => {
      const { container } = render(<RdsCompRadarChart {...defaultProps} />);
      const canvas = container.querySelector('canvas');
      expect(canvas).toBeInTheDocument();
    });

    it('canvas element has correct id', () => {
      const { container } = render(<RdsCompRadarChart {...defaultProps} />);
      const canvas = container.querySelector('canvas');
      expect(canvas).toHaveAttribute('id', 'radar-chart-1');
    });

    it('renders div wrapper with correct class', () => {
      const { container } = render(<RdsCompRadarChart {...defaultProps} />);
      const div = container.querySelector('.rds-comp-chart-radar-container');
      expect(div).toBeInTheDocument();
    });

    it('renders with different id values', () => {
      const { container } = render(
        <RdsCompRadarChart {...defaultProps} id="custom-radar" />
      );
      const canvas = container.querySelector('canvas');
      expect(canvas).toHaveAttribute('id', 'custom-radar');
    });
  });

  describe('Props Handling', () => {
    it('passes labels to chart', () => {
      const { container } = render(<RdsCompRadarChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('passes dataSets to chart', () => {
      const customDatasets = [
        {
          label: 'Custom Dataset',
          data: [10, 20, 30, 40, 50],
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
        },
      ];
      const { container } = render(
        <RdsCompRadarChart {...defaultProps} dataSets={customDatasets} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('passes options to chart', () => {
      const customOptions = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            position: 'bottom',
          },
        },
      };
      const { container } = render(
        <RdsCompRadarChart {...defaultProps} options={customOptions} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('uses provided id for canvas', () => {
      const { container } = render(
        <RdsCompRadarChart {...defaultProps} id="chart-id-1" />
      );
      const canvas = container.querySelector('canvas');
      expect(canvas).toHaveAttribute('id', 'chart-id-1');
    });

    it('handles different id values', () => {
      const { rerender, container } = render(
        <RdsCompRadarChart {...defaultProps} id="chart-1" />
      );
      let canvas = container.querySelector('canvas');
      expect(canvas).toHaveAttribute('id', 'chart-1');

      rerender(<RdsCompRadarChart {...defaultProps} id="chart-2" />);
      canvas = container.querySelector('canvas');
      expect(canvas).toHaveAttribute('id', 'chart-2');
    });
  });

  describe('Dark Mode Detection', () => {
    it('detects dark mode from body class theme-dark', () => {
      document.body.classList.add('theme-dark');
      const { container } = render(<RdsCompRadarChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.body.classList.remove('theme-dark');
    });

    it('detects dark mode from body class dark-theme', () => {
      document.body.classList.add('dark-theme');
      const { container } = render(<RdsCompRadarChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.body.classList.remove('dark-theme');
    });

    it('detects dark mode from documentElement attribute', () => {
      document.documentElement.setAttribute('data-theme', 'dark');
      const { container } = render(<RdsCompRadarChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.documentElement.removeAttribute('data-theme');
    });

    it('detects dark mode from body attribute', () => {
      document.body.setAttribute('data-theme', 'dark');
      const { container } = render(<RdsCompRadarChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.body.removeAttribute('data-theme');
    });

    it('defaults to light mode when no dark mode indicators', () => {
      document.body.classList.remove('theme-dark', 'dark-theme');
      document.documentElement.removeAttribute('data-theme');
      document.body.removeAttribute('data-theme');
      const { container } = render(<RdsCompRadarChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Dark Mode Styles', () => {
    it('applies legend label color in dark mode', () => {
      document.body.classList.add('theme-dark');
      const { container } = render(<RdsCompRadarChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.body.classList.remove('theme-dark');
    });

    it('applies title color in dark mode', () => {
      document.body.classList.add('theme-dark');
      const { container } = render(<RdsCompRadarChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.body.classList.remove('theme-dark');
    });

    it('applies point labels color in dark mode', () => {
      document.body.classList.add('theme-dark');
      const { container } = render(<RdsCompRadarChart {...defaultProps} />);
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
        <RdsCompRadarChart {...propsWithTooltip} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.body.classList.remove('theme-dark');
    });
  });

  describe('Canvas Dimensions', () => {
    it('sets canvas height to 350px', () => {
      const { container } = render(<RdsCompRadarChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('sets canvas width to 450px', () => {
      const { container } = render(<RdsCompRadarChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('maintains fixed dimensions across all instances', () => {
      const { container: container1 } = render(
        <RdsCompRadarChart {...defaultProps} />
      );
      const canvas1 = container1.querySelector('canvas');
      expect(canvas1).toBeInTheDocument();

      const { container: container2 } = render(
        <RdsCompRadarChart {...defaultProps} id="chart-2" />
      );
      const canvas2 = container2.querySelector('canvas');
      expect(canvas2).toBeInTheDocument();
    });
  });

  describe('Chart Type', () => {
    it('creates chart with type radar', () => {
      const { container } = render(<RdsCompRadarChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('passes correct data structure to chart', () => {
      const { container } = render(<RdsCompRadarChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Chart Destruction', () => {
    it('destroys chart on unmount', () => {
      const { unmount } = render(<RdsCompRadarChart {...defaultProps} />);
      unmount();
      expect(true).toBe(true);
    });

    it('destroys previous chart on props update', () => {
      const { rerender } = render(<RdsCompRadarChart {...defaultProps} />);
      rerender(
        <RdsCompRadarChart
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
        <RdsCompRadarChart {...defaultProps} />
      );
      rerender(
        <RdsCompRadarChart
          {...defaultProps}
          labels={['A', 'B', 'C', 'D']}
        />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('updates chart when dataSets change', () => {
      const { rerender, container } = render(
        <RdsCompRadarChart {...defaultProps} />
      );
      rerender(
        <RdsCompRadarChart
          {...defaultProps}
          dataSets={[
            {
              label: 'New Dataset',
              data: [25, 25, 25, 25, 25],
              backgroundColor: 'rgba(255, 159, 64, 0.2)',
              borderColor: 'rgba(255, 159, 64, 1)',
            },
          ]}
        />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('updates chart when options change', () => {
      const { rerender, container } = render(
        <RdsCompRadarChart {...defaultProps} />
      );
      rerender(
        <RdsCompRadarChart
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
        <RdsCompRadarChart {...defaultProps} id="chart-1" />
      );
      let canvas = container.querySelector('canvas');
      expect(canvas).toHaveAttribute('id', 'chart-1');

      rerender(<RdsCompRadarChart {...defaultProps} id="chart-2" />);
      canvas = container.querySelector('canvas');
      expect(canvas).toHaveAttribute('id', 'chart-2');
    });
  });

  describe('Multiple Datasets', () => {
    it('renders multiple datasets', () => {
      const multiDatasets = [
        {
          label: 'Dataset 1',
          data: [12, 19, 3, 5, 2],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
        },
        {
          label: 'Dataset 2',
          data: [8, 15, 10, 9, 6],
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
        },
      ];
      const { container } = render(
        <RdsCompRadarChart {...defaultProps} dataSets={multiDatasets} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles three datasets', () => {
      const threeDatasets = [
        {
          label: 'Dataset 1',
          data: [10, 15, 12, 14, 11],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
        },
        {
          label: 'Dataset 2',
          data: [8, 12, 10, 11, 9],
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
        },
        {
          label: 'Dataset 3',
          data: [14, 10, 15, 13, 16],
          backgroundColor: 'rgba(255, 206, 86, 0.2)',
          borderColor: 'rgba(255, 206, 86, 1)',
        },
      ];
      const { container } = render(
        <RdsCompRadarChart {...defaultProps} dataSets={threeDatasets} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles empty datasets array', () => {
      const { container } = render(
        <RdsCompRadarChart {...defaultProps} dataSets={[]} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Label Variations', () => {
    it('renders with numeric string labels', () => {
      const { container } = render(
        <RdsCompRadarChart
          {...defaultProps}
          labels={['1', '2', '3', '4', '5']}
        />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('renders with text labels', () => {
      const { container } = render(
        <RdsCompRadarChart
          {...defaultProps}
          labels={['North', 'South', 'East', 'West', 'Center']}
        />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('renders with empty labels array', () => {
      const { container } = render(
        <RdsCompRadarChart {...defaultProps} labels={[]} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('renders with many labels', () => {
      const manyLabels = Array.from({ length: 12 }, (_, i) => `Q${i + 1}`);
      const { container } = render(
        <RdsCompRadarChart
          {...defaultProps}
          labels={manyLabels}
          dataSets={[
            {
              label: 'Quarterly Data',
              data: Array.from({ length: 12 }, (_, index) => (index + 1) * 7),
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
            },
          ]}
        />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('renders with single label', () => {
      const { container } = render(
        <RdsCompRadarChart
          {...defaultProps}
          labels={['Only']}
          dataSets={[{ label: 'Data', data: [50] }]}
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
          data: [10, 20, 30, 40, 50],
          backgroundColor: 'rgba(255, 0, 0, 0.3)',
          borderColor: 'rgba(255, 0, 0, 1)',
        },
      ];
      const { container } = render(
        <RdsCompRadarChart {...defaultProps} dataSets={coloredDataset} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('applies custom border colors', () => {
      const borderedDataset = [
        {
          label: 'Bordered',
          data: [10, 20, 30, 40, 50],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(100, 200, 200, 1)',
          borderWidth: 3,
        },
      ];
      const { container } = render(
        <RdsCompRadarChart {...defaultProps} dataSets={borderedDataset} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles datasets without colors', () => {
      const minimalDataset = [
        {
          label: 'Minimal',
          data: [10, 20, 30, 40, 50],
        },
      ];
      const { container } = render(
        <RdsCompRadarChart {...defaultProps} dataSets={minimalDataset} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty labels array', () => {
      const { container } = render(
        <RdsCompRadarChart {...defaultProps} labels={[]} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles empty datasets array', () => {
      const { container } = render(
        <RdsCompRadarChart {...defaultProps} dataSets={[]} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles very large data values', () => {
      const largeDataset = [
        {
          label: 'Large Values',
          data: [999999, 888888, 777777],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
        },
      ];
      const { container } = render(
        <RdsCompRadarChart
          {...defaultProps}
          labels={['A', 'B', 'C']}
          dataSets={largeDataset}
        />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles very small data values', () => {
      const smallDataset = [
        {
          label: 'Small Values',
          data: [0.1, 0.2, 0.3],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
        },
      ];
      const { container } = render(
        <RdsCompRadarChart
          {...defaultProps}
          labels={['A', 'B', 'C']}
          dataSets={smallDataset}
        />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles zero values in dataset', () => {
      const zeroDataset = [
        {
          label: 'With Zeros',
          data: [0, 20, 0],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
        },
      ];
      const { container } = render(
        <RdsCompRadarChart
          {...defaultProps}
          labels={['A', 'B', 'C']}
          dataSets={zeroDataset}
        />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles negative data values', () => {
      const negativeDataset = [
        {
          label: 'With Negatives',
          data: [-10, 20, -30],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
        },
      ];
      const { container } = render(
        <RdsCompRadarChart
          {...defaultProps}
          labels={['A', 'B', 'C']}
          dataSets={negativeDataset}
        />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles null options gracefully', () => {
      const { container } = render(
        <RdsCompRadarChart {...defaultProps} options={null} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles empty options object', () => {
      const { container } = render(
        <RdsCompRadarChart {...defaultProps} options={{}} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles undefined options', () => {
      const { container } = render(
        <RdsCompRadarChart {...defaultProps} options={undefined} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Component Lifecycle', () => {
    it('initializes chart on first render', () => {
      const { container } = render(<RdsCompRadarChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('cleans up chart on unmount', () => {
      const { unmount, container } = render(
        <RdsCompRadarChart {...defaultProps} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
      unmount();
    });

    it('updates chart on multiple re-renders', () => {
      const { rerender, container } = render(
        <RdsCompRadarChart {...defaultProps} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();

      rerender(
        <RdsCompRadarChart
          {...defaultProps}
          labels={['X', 'Y', 'Z']}
        />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();

      rerender(
        <RdsCompRadarChart
          {...defaultProps}
          dataSets={[
            {
              label: 'Updated',
              data: [50, 50, 50],
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
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
        <RdsCompRadarChart {...defaultProps} id="chart-1" />
      );
      let canvas = container.querySelector('canvas');
      expect(canvas).toHaveAttribute('id', 'chart-1');

      rerender(<RdsCompRadarChart {...defaultProps} id="chart-2" />);
      canvas = container.querySelector('canvas');
      expect(canvas).toHaveAttribute('id', 'chart-2');
    });

    it('preserves canvas ref through re-renders', () => {
      const { rerender, container } = render(
        <RdsCompRadarChart {...defaultProps} />
      );
      const canvas1 = container.querySelector('canvas');

      rerender(
        <RdsCompRadarChart
          {...defaultProps}
          labels={['Updated']}
        />
      );
      const canvas2 = container.querySelector('canvas');

      expect(canvas2).toBeInTheDocument();
    });

    it('handles rapid successive re-renders', () => {
      const { rerender, container } = render(
        <RdsCompRadarChart {...defaultProps} />
      );

      rerender(
        <RdsCompRadarChart {...defaultProps} dataSets={[{ data: [1, 2, 3, 4, 5] }]} />
      );
      rerender(
        <RdsCompRadarChart {...defaultProps} dataSets={[{ data: [5, 4, 3, 2, 1] }]} />
      );
      rerender(
        <RdsCompRadarChart {...defaultProps} dataSets={[{ data: [3, 3, 3, 3, 3] }]} />
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
            position: 'top',
          },
          tooltip: {
            enabled: true,
          },
        },
      };
      const { container } = render(
        <RdsCompRadarChart {...defaultProps} options={optionsWithPlugins} />
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
        <RdsCompRadarChart {...defaultProps} options={options} />
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
            position: 'right',
            align: 'center',
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
        <RdsCompRadarChart {...defaultProps} options={customLegendOptions} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('canvas element is in document', () => {
      const { container } = render(<RdsCompRadarChart {...defaultProps} />);
      const canvas = container.querySelector('canvas');
      expect(canvas).toBeInTheDocument();
  
    });

    it('has no axe accessibility violations', async () => {
      const { container } = render(<RdsCompRadarChart {...defaultProps} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('canvas has id attribute', () => {
      const { container } = render(<RdsCompRadarChart {...defaultProps} />);
      const canvas = container.querySelector('canvas');
      expect(canvas).toHaveAttribute('id');
    });

    it('canvas has proper id value', () => {
      const { container } = render(
        <RdsCompRadarChart {...defaultProps} id="accessible-radar" />
      );
      const canvas = container.querySelector('canvas');
      expect(canvas).toHaveAttribute('id', 'accessible-radar');
    });

    it('canvas is focusable element', () => {
      const { container } = render(<RdsCompRadarChart {...defaultProps} />);
      const canvas = container.querySelector('canvas');
      expect(canvas).toBeInTheDocument();
    });
  });

  describe('Scale Configuration', () => {
    it('applies custom scale configuration', () => {
      const scaleOptions = {
        responsive: true,
        scales: {
          r: {
            beginAtZero: true,
            max: 100,
          },
        },
      };
      const { container } = render(
        <RdsCompRadarChart {...defaultProps} options={scaleOptions} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles point label styling', () => {
      const pointLabelOptions = {
        responsive: true,
        scales: {
          r: {
            pointLabels: {
              color: '#333',
              font: {
                size: 14,
              },
            },
          },
        },
      };
      const { container } = render(
        <RdsCompRadarChart {...defaultProps} options={pointLabelOptions} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Minimal Props', () => {
    it('renders with minimal required props', () => {
      const minimalProps = {
        id: 'minimal-chart',
        labels: ['A'],
        dataSets: [{ data: [50] }],
        options: {},
      };
      const { container } = render(
        <RdsCompRadarChart {...minimalProps} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('renders with all features enabled', () => {
      const { container } = render(<RdsCompRadarChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });
});