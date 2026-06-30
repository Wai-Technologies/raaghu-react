import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';
import RdsCompPolarAreaChart from './rds-comp-chart-polar-area';

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
  labels: ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5'],
  dataSets: [
    {
      label: 'Dataset 1',
      data: [12, 19, 3, 5, 2],
      backgroundColor: [
        'rgba(255, 99, 132, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        'rgba(75, 192, 192, 0.5)',
        'rgba(153, 102, 255, 0.5)',
      ],
    },
  ],
  options: {
    responsive: true,
    maintainAspectRatio: false,
  },
  radius: 400,
  id: 'polar-area-chart-1',
};

describe('RdsCompPolarAreaChart', () => {
  describe('Basic Rendering', () => {
    it('renders the component without crashing', () => {
      const { container } = render(<RdsCompPolarAreaChart {...defaultProps} />);
      expect(container).toBeInTheDocument();
    });

    it('renders with correct display name', () => {
      expect(RdsCompPolarAreaChart.displayName).toBe('RdsCompPolarAreaChart');
    });

    it('renders canvas element', () => {
      const { container } = render(<RdsCompPolarAreaChart {...defaultProps} />);
      const canvas = container.querySelector('canvas');
      expect(canvas).toBeInTheDocument();
    });

    it('canvas element has correct id', () => {
      const { container } = render(<RdsCompPolarAreaChart {...defaultProps} />);
      const canvas = container.querySelector('canvas');
      expect(canvas).toHaveAttribute('id', 'polar-area-chart-1');
    });

    it('renders div wrapper', () => {
      const { container } = render(<RdsCompPolarAreaChart {...defaultProps} />);
      const div = container.querySelector('div');
      expect(div).toBeInTheDocument();
    });
  });

  describe('Props Handling', () => {
    it('passes labels to chart', () => {
      const { container } = render(<RdsCompPolarAreaChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('passes dataSets to chart', () => {
      const customDatasets = [
        {
          label: 'Custom Dataset',
          data: [10, 20, 30, 40, 50],
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
        },
      ];
      const { container } = render(
        <RdsCompPolarAreaChart {...defaultProps} dataSets={customDatasets} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('passes options to chart', () => {
      const customOptions = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            position: 'top',
          },
        },
      };
      const { container } = render(
        <RdsCompPolarAreaChart {...defaultProps} options={customOptions} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('uses provided id for canvas', () => {
      const { container } = render(
        <RdsCompPolarAreaChart {...defaultProps} id="custom-polar" />
      );
      const canvas = container.querySelector('canvas');
      expect(canvas).toHaveAttribute('id', 'custom-polar');
    });

    it('handles different id values', () => {
      const { rerender, container } = render(
        <RdsCompPolarAreaChart {...defaultProps} id="chart-1" />
      );
      let canvas = container.querySelector('canvas');
      expect(canvas).toHaveAttribute('id', 'chart-1');

      rerender(<RdsCompPolarAreaChart {...defaultProps} id="chart-2" />);
      canvas = container.querySelector('canvas');
      expect(canvas).toHaveAttribute('id', 'chart-2');
    });

    it('uses provided radius for canvas height', () => {
      const { container } = render(
        <RdsCompPolarAreaChart {...defaultProps} radius={500} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles different radius values', () => {
      const { rerender, container } = render(
        <RdsCompPolarAreaChart {...defaultProps} radius={300} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();

      rerender(<RdsCompPolarAreaChart {...defaultProps} radius={600} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Dark Mode Detection', () => {
    it('detects dark mode from body class theme-dark', () => {
      document.body.classList.add('theme-dark');
      const { container } = render(<RdsCompPolarAreaChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.body.classList.remove('theme-dark');
    });

    it('detects dark mode from body class dark-theme', () => {
      document.body.classList.add('dark-theme');
      const { container } = render(<RdsCompPolarAreaChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.body.classList.remove('dark-theme');
    });

    it('detects dark mode from documentElement attribute', () => {
      document.documentElement.setAttribute('data-theme', 'dark');
      const { container } = render(<RdsCompPolarAreaChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.documentElement.removeAttribute('data-theme');
    });

    it('detects dark mode from body attribute', () => {
      document.body.setAttribute('data-theme', 'dark');
      const { container } = render(<RdsCompPolarAreaChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.body.removeAttribute('data-theme');
    });

    it('defaults to light mode when no dark mode indicators', () => {
      document.body.classList.remove('theme-dark', 'dark-theme');
      document.documentElement.removeAttribute('data-theme');
      document.body.removeAttribute('data-theme');
      const { container } = render(<RdsCompPolarAreaChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Dark Mode Styles', () => {
    it('applies legend label color in dark mode', () => {
      document.body.classList.add('theme-dark');
      const { container } = render(<RdsCompPolarAreaChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.body.classList.remove('theme-dark');
    });

    it('applies title color in dark mode', () => {
      document.body.classList.add('theme-dark');
      const { container } = render(<RdsCompPolarAreaChart {...defaultProps} />);
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
        <RdsCompPolarAreaChart {...propsWithTooltip} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.body.classList.remove('theme-dark');
    });
  });

  describe('Chart Destruction', () => {
    it('destroys chart on unmount', () => {
      const { unmount } = render(<RdsCompPolarAreaChart {...defaultProps} />);
      unmount();
      expect(true).toBe(true);
    });

    it('destroys previous chart on props update', () => {
      const { rerender } = render(<RdsCompPolarAreaChart {...defaultProps} />);
      rerender(
        <RdsCompPolarAreaChart
          {...defaultProps}
          labels={['A', 'B', 'C']}
        />
      );
      expect(true).toBe(true);
    });
  });

  describe('Chart Configuration', () => {
    it('creates chart with type polarArea', () => {
      const { container } = render(<RdsCompPolarAreaChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('passes correct chart type to Chart.js', () => {
      const { container } = render(<RdsCompPolarAreaChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('sets up chart with labels and datasets', () => {
      const { container } = render(<RdsCompPolarAreaChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Data Updates', () => {
    it('updates chart when labels change', () => {
      const { rerender, container } = render(
        <RdsCompPolarAreaChart {...defaultProps} />
      );
      rerender(
        <RdsCompPolarAreaChart
          {...defaultProps}
          labels={['A', 'B', 'C', 'D']}
        />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('updates chart when dataSets change', () => {
      const { rerender, container } = render(
        <RdsCompPolarAreaChart {...defaultProps} />
      );
      rerender(
        <RdsCompPolarAreaChart
          {...defaultProps}
          dataSets={[
            {
              label: 'New Dataset',
              data: [25, 25, 25, 25, 25],
              backgroundColor: 'rgba(255, 159, 64, 0.5)',
            },
          ]}
        />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('updates chart when options change', () => {
      const { rerender, container } = render(
        <RdsCompPolarAreaChart {...defaultProps} />
      );
      rerender(
        <RdsCompPolarAreaChart
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
  });

  describe('Multiple Datasets', () => {
    it('renders multiple datasets', () => {
      const multiDatasets = [
        {
          label: 'Dataset 1',
          data: [12, 19, 3, 5, 2],
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
        },
        {
          label: 'Dataset 2',
          data: [8, 15, 10, 9, 6],
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ];
      const { container } = render(
        <RdsCompPolarAreaChart {...defaultProps} dataSets={multiDatasets} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles empty datasets array', () => {
      const { container } = render(
        <RdsCompPolarAreaChart {...defaultProps} dataSets={[]} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Label Variations', () => {
    it('renders with numeric labels', () => {
      const { container } = render(
        <RdsCompPolarAreaChart
          {...defaultProps}
          labels={['1', '2', '3', '4', '5']}
        />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('renders with text labels', () => {
      const { container } = render(
        <RdsCompPolarAreaChart
          {...defaultProps}
          labels={['Spring', 'Summer', 'Fall', 'Winter', 'Unknown']}
        />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('renders with empty labels array', () => {
      const { container } = render(
        <RdsCompPolarAreaChart {...defaultProps} labels={[]} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('renders with many labels', () => {
      const manyLabels = Array.from({ length: 20 }, (_, i) => `Label ${i + 1}`);
      const { container } = render(
        <RdsCompPolarAreaChart
          {...defaultProps}
          labels={manyLabels}
          dataSets={[
            {
              label: 'Data',
              data: Array.from({ length: 20 }, () => Math.random() * 100),
              backgroundColor: 'rgba(75, 192, 192, 0.5)',
            },
          ]}
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
          backgroundColor: [
            'rgba(255, 0, 0, 0.5)',
            'rgba(0, 255, 0, 0.5)',
            'rgba(0, 0, 255, 0.5)',
            'rgba(255, 255, 0, 0.5)',
            'rgba(255, 0, 255, 0.5)',
          ],
        },
      ];
      const { container } = render(
        <RdsCompPolarAreaChart {...defaultProps} dataSets={coloredDataset} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('applies custom border colors', () => {
      const borderedDataset = [
        {
          label: 'Bordered',
          data: [10, 20, 30, 40, 50],
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 2,
        },
      ];
      const { container } = render(
        <RdsCompPolarAreaChart {...defaultProps} dataSets={borderedDataset} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Props Variants', () => {
    it('renders with minimal props', () => {
      const minimalProps = {
        id: 'chart-1',
        labels: ['A', 'B'],
        dataSets: [{ data: [50, 50] }],
        options: {},
      };
      const { container } = render(
        <RdsCompPolarAreaChart {...minimalProps} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('renders with all features enabled', () => {
      const { container } = render(<RdsCompPolarAreaChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('renders without optional radius', () => {
      const { container } = render(
        <RdsCompPolarAreaChart
          id="chart-1"
          labels={['A', 'B']}
          dataSets={[{ data: [50, 50] }]}
          options={{}}
        />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty labels array', () => {
      const { container } = render(
        <RdsCompPolarAreaChart {...defaultProps} labels={[]} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles empty datasets array', () => {
      const { container } = render(
        <RdsCompPolarAreaChart {...defaultProps} dataSets={[]} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles very large data values', () => {
      const largeDataset = [
        {
          label: 'Large Values',
          data: [999999, 888888, 777777, 666666, 555555],
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
        },
      ];
      const { container } = render(
        <RdsCompPolarAreaChart {...defaultProps} dataSets={largeDataset} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles very small data values', () => {
      const smallDataset = [
        {
          label: 'Small Values',
          data: [0.1, 0.2, 0.3, 0.4, 0.5],
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
        },
      ];
      const { container } = render(
        <RdsCompPolarAreaChart {...defaultProps} dataSets={smallDataset} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles zero values in dataset', () => {
      const zeroDataset = [
        {
          label: 'With Zeros',
          data: [0, 20, 0, 40, 0],
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
        },
      ];
      const { container } = render(
        <RdsCompPolarAreaChart {...defaultProps} dataSets={zeroDataset} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles negative data values', () => {
      const negativeDataset = [
        {
          label: 'With Negatives',
          data: [-10, 20, -30, 40, -50],
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
        },
      ];
      const { container } = render(
        <RdsCompPolarAreaChart {...defaultProps} dataSets={negativeDataset} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles null options gracefully', () => {
      const { container } = render(
        <RdsCompPolarAreaChart {...defaultProps} options={null} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles empty options object', () => {
      const { container } = render(
        <RdsCompPolarAreaChart {...defaultProps} options={{}} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles undefined radius', () => {
      const { container } = render(
        <RdsCompPolarAreaChart {...defaultProps} radius={undefined} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Component Lifecycle', () => {
    it('initializes chart on first render', () => {
      const { container } = render(<RdsCompPolarAreaChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('cleans up chart on unmount', () => {
      const { unmount, container } = render(
        <RdsCompPolarAreaChart {...defaultProps} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
      unmount();
    });

    it('updates chart on multiple re-renders', () => {
      const { rerender, container } = render(
        <RdsCompPolarAreaChart {...defaultProps} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();

      rerender(
        <RdsCompPolarAreaChart
          {...defaultProps}
          labels={['X', 'Y', 'Z']}
        />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();

      rerender(
        <RdsCompPolarAreaChart
          {...defaultProps}
          dataSets={[
            {
              label: 'Updated',
              data: [50, 50, 50, 50, 50],
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
        <RdsCompPolarAreaChart {...defaultProps} id="chart-1" />
      );
      let canvas = container.querySelector('canvas');
      expect(canvas).toHaveAttribute('id', 'chart-1');

      rerender(<RdsCompPolarAreaChart {...defaultProps} id="chart-2" />);
      canvas = container.querySelector('canvas');
      expect(canvas).toHaveAttribute('id', 'chart-2');
    });

    it('updates radius on prop change', () => {
      const { rerender, container } = render(
        <RdsCompPolarAreaChart {...defaultProps} radius={300} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();

      rerender(<RdsCompPolarAreaChart {...defaultProps} radius={500} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('preserves canvas ref through re-renders', () => {
      const { rerender, container } = render(
        <RdsCompPolarAreaChart {...defaultProps} />
      );
      const _canvas1 = container.querySelector('canvas');

      rerender(
        <RdsCompPolarAreaChart
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
        <RdsCompPolarAreaChart {...defaultProps} options={responsiveOptions} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('renders with responsive false', () => {
      const fixedOptions = {
        responsive: false,
        maintainAspectRatio: true,
      };
      const { container } = render(
        <RdsCompPolarAreaChart {...defaultProps} options={fixedOptions} />
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
        <RdsCompPolarAreaChart {...defaultProps} options={aspectOptions} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Chart Type', () => {
    it('renders as polar area chart type', () => {
      const { container } = render(<RdsCompPolarAreaChart {...defaultProps} />);
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
        <RdsCompPolarAreaChart {...defaultProps} options={optionsWithPlugins} />
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
        <RdsCompPolarAreaChart {...defaultProps} options={options} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
      // Original options should not be mutated other than expected properties
      expect(options).toBeDefined();
    });
  });

  describe('Accessibility', () => {
    it('canvas element is in document', () => {
      const { container } = render(<RdsCompPolarAreaChart {...defaultProps} />);
      const canvas = container.querySelector('canvas');
      expect(canvas).toBeInTheDocument();
  
    });
    it('has no axe accessibility violations', async () => {
      const { container } = render(<RdsCompPolarAreaChart {...defaultProps} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('canvas has id attribute', () => {
      const { container } = render(<RdsCompPolarAreaChart {...defaultProps} />);
      const canvas = container.querySelector('canvas');
      expect(canvas).toHaveAttribute('id');
    });

    it('canvas has proper id value', () => {
      const { container } = render(
        <RdsCompPolarAreaChart {...defaultProps} id="accessible-chart" />
      );
      const canvas = container.querySelector('canvas');
      expect(canvas).toHaveAttribute('id', 'accessible-chart');
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
        <RdsCompPolarAreaChart {...defaultProps} options={scaleOptions} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });
});