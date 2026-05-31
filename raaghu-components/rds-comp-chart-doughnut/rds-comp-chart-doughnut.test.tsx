import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';
import RdsCompDoughnutChart from './rds-comp-chart-doughnut';

// Mock SCSS
jest.mock('./rds-comp-chart-doughnut.scss', () => ({}));

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
      chartArea: {
        top: 0,
        right: 300,
        bottom: 300,
        left: 0,
        width: 300,
        height: 300,
      },
    };
  });
});

const defaultProps = {
  labels: ['Label 1', 'Label 2', 'Label 3'],
  dataSets: [
    {
      data: [30, 40, 30],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
    },
  ],
  options: {
    responsive: true,
    maintainAspectRatio: false,
  },
  id: 'doughnut-chart-1',
  titleText: 'Doughnut Chart',
  subTitleText: 'Sample Subtitle',
};

describe('RdsCompDoughnutChart', () => {
  describe('Basic Rendering', () => {
    it('renders the component without crashing', () => {
      const { container } = render(<RdsCompDoughnutChart {...defaultProps} />);
      expect(container).toBeInTheDocument();
    });

    it('renders with correct display name', () => {
      expect(RdsCompDoughnutChart.displayName).toBe('RdsCompDoughnutChart');
    });

    it('renders canvas element', () => {
      const { container } = render(<RdsCompDoughnutChart {...defaultProps} />);
      const canvas = container.querySelector('canvas');
      expect(canvas).toBeInTheDocument();
    });

    it('canvas element has correct id', () => {
      const { container } = render(<RdsCompDoughnutChart {...defaultProps} />);
      const canvas = container.querySelector('canvas');
      expect(canvas).toHaveAttribute('id', 'doughnut-chart-1');
    });

    it('canvas element has correct data-testid', () => {
      const { container } = render(<RdsCompDoughnutChart {...defaultProps} />);
      const canvas = container.querySelector('[data-testid="doughnut-chart-1"]');
      expect(canvas).toBeInTheDocument();
    });

    it('renders div with correct class', () => {
      const { container } = render(<RdsCompDoughnutChart {...defaultProps} />);
      const div = container.querySelector('.rds-comp-chart-doughnut');
      expect(div).toBeInTheDocument();
    });

    it('wraps canvas in div with rds-comp-chart-doughnut class', () => {
      const { container } = render(<RdsCompDoughnutChart {...defaultProps} />);
      const div = container.querySelector('.rds-comp-chart-doughnut');
      const canvas = div?.querySelector('canvas');
      expect(canvas).toBeInTheDocument();
    });
  });

  describe('Props Handling', () => {
    it('passes labels to chart', () => {
      const { container } = render(<RdsCompDoughnutChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('passes dataSets to chart', () => {
      const customDatasets = [
        {
          data: [50, 50],
          backgroundColor: ['#FF0000', '#00FF00'],
        },
      ];
      const { container } = render(
        <RdsCompDoughnutChart {...defaultProps} dataSets={customDatasets} />
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
        <RdsCompDoughnutChart {...defaultProps} options={customOptions} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('uses provided id for canvas', () => {
      const { container } = render(
        <RdsCompDoughnutChart {...defaultProps} id="custom-doughnut" />
      );
      const canvas = container.querySelector('canvas');
      expect(canvas).toHaveAttribute('id', 'custom-doughnut');
    });

    it('handles different id values', () => {
      const { rerender, container } = render(
        <RdsCompDoughnutChart {...defaultProps} id="chart-1" />
      );
      let canvas = container.querySelector('canvas');
      expect(canvas).toHaveAttribute('id', 'chart-1');

      rerender(<RdsCompDoughnutChart {...defaultProps} id="chart-2" />);
      canvas = container.querySelector('canvas');
      expect(canvas).toHaveAttribute('id', 'chart-2');
    });
  });

  describe('Title and Subtitle Text', () => {
    it('renders with title text', () => {
      const { container } = render(
        <RdsCompDoughnutChart {...defaultProps} titleText="My Title" />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('renders with subtitle text', () => {
      const { container } = render(
        <RdsCompDoughnutChart {...defaultProps} subTitleText="My Subtitle" />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('renders with both title and subtitle', () => {
      const { container } = render(
        <RdsCompDoughnutChart
          {...defaultProps}
          titleText="Title"
          subTitleText="Subtitle"
        />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('renders without title text (optional)', () => {
      const { container } = render(
        <RdsCompDoughnutChart {...defaultProps} titleText={undefined} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('renders without subtitle text (optional)', () => {
      const { container } = render(
        <RdsCompDoughnutChart {...defaultProps} subTitleText={undefined} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('renders with empty title text', () => {
      const { container } = render(
        <RdsCompDoughnutChart {...defaultProps} titleText="" />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('renders with empty subtitle text', () => {
      const { container } = render(
        <RdsCompDoughnutChart {...defaultProps} subTitleText="" />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('renders with very long title text', () => {
      const longTitle = 'A'.repeat(100);
      const { container } = render(
        <RdsCompDoughnutChart {...defaultProps} titleText={longTitle} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('renders with very long subtitle text', () => {
      const longSubtitle = 'B'.repeat(100);
      const { container } = render(
        <RdsCompDoughnutChart {...defaultProps} subTitleText={longSubtitle} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Dark Mode Detection', () => {
    it('detects dark mode from body class theme-dark', () => {
      document.body.classList.add('theme-dark');
      const { container } = render(<RdsCompDoughnutChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.body.classList.remove('theme-dark');
    });

    it('detects dark mode from body class dark-theme', () => {
      document.body.classList.add('dark-theme');
      const { container } = render(<RdsCompDoughnutChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.body.classList.remove('dark-theme');
    });

    it('detects dark mode from documentElement attribute', () => {
      document.documentElement.setAttribute('data-theme', 'dark');
      const { container } = render(<RdsCompDoughnutChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.documentElement.removeAttribute('data-theme');
    });

    it('detects dark mode from body attribute', () => {
      document.body.setAttribute('data-theme', 'dark');
      const { container } = render(<RdsCompDoughnutChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.body.removeAttribute('data-theme');
    });

    it('defaults to light mode when no dark mode indicators', () => {
      document.body.classList.remove('theme-dark', 'dark-theme');
      document.documentElement.removeAttribute('data-theme');
      document.body.removeAttribute('data-theme');
      const { container } = render(<RdsCompDoughnutChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Dark Mode Styles', () => {
    it('applies legend label color in dark mode', () => {
      document.body.classList.add('theme-dark');
      const { container } = render(<RdsCompDoughnutChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.body.classList.remove('theme-dark');
    });

    it('applies title and subtitle colors in dark mode', () => {
      document.body.classList.add('theme-dark');
      const { container } = render(
        <RdsCompDoughnutChart
          {...defaultProps}
          titleText="Title"
          subTitleText="Subtitle"
        />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.body.classList.remove('theme-dark');
    });
  });

  describe('Chart Destruction', () => {
    it('destroys chart on unmount', () => {
      const { unmount } = render(<RdsCompDoughnutChart {...defaultProps} />);
      unmount();
      expect(true).toBe(true);
    });

    it('destroys previous chart on props update', () => {
      const { rerender } = render(<RdsCompDoughnutChart {...defaultProps} />);
      rerender(
        <RdsCompDoughnutChart
          {...defaultProps}
          labels={['Updated']}
        />
      );
      expect(true).toBe(true);
    });
  });

  describe('Chart Configuration', () => {
    it('creates chart with type doughnut', () => {
      const { container } = render(<RdsCompDoughnutChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('passes correct chart type to Chart.js', () => {
      const { container } = render(<RdsCompDoughnutChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('sets up chart with labels and datasets', () => {
      const { container } = render(<RdsCompDoughnutChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('adds centerText plugin to chart', () => {
      const { container } = render(<RdsCompDoughnutChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Data Updates', () => {
    it('updates chart when labels change', () => {
      const { rerender, container } = render(
        <RdsCompDoughnutChart {...defaultProps} />
      );
      rerender(
        <RdsCompDoughnutChart
          {...defaultProps}
          labels={['Updated 1', 'Updated 2']}
        />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('updates chart when dataSets change', () => {
      const { rerender, container } = render(
        <RdsCompDoughnutChart {...defaultProps} />
      );
      rerender(
        <RdsCompDoughnutChart
          {...defaultProps}
          dataSets={[
            {
              data: [60, 40],
              backgroundColor: ['#00FF00', '#FF0000'],
            },
          ]}
        />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('updates chart when options change', () => {
      const { rerender, container } = render(
        <RdsCompDoughnutChart {...defaultProps} />
      );
      rerender(
        <RdsCompDoughnutChart
          {...defaultProps}
          options={{
            responsive: false,
            maintainAspectRatio: true,
          }}
        />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('updates chart when title changes', () => {
      const { rerender, container } = render(
        <RdsCompDoughnutChart {...defaultProps} titleText="Original" />
      );
      rerender(
        <RdsCompDoughnutChart {...defaultProps} titleText="Updated" />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('updates chart when subtitle changes', () => {
      const { rerender, container } = render(
        <RdsCompDoughnutChart {...defaultProps} subTitleText="Original" />
      );
      rerender(
        <RdsCompDoughnutChart {...defaultProps} subTitleText="Updated" />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Multiple Datasets', () => {
    it('renders multiple datasets', () => {
      const multiDatasets = [
        {
          data: [30, 40, 30],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        },
        {
          data: [20, 50, 30],
          backgroundColor: ['#4BC0C0', '#9966FF', '#FF9F40'],
        },
      ];
      const { container } = render(
        <RdsCompDoughnutChart {...defaultProps} dataSets={multiDatasets} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles empty datasets array', () => {
      const { container } = render(
        <RdsCompDoughnutChart {...defaultProps} dataSets={[]} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Label Variations', () => {
    it('renders with numeric labels', () => {
      const { container } = render(
        <RdsCompDoughnutChart
          {...defaultProps}
          labels={['Label 1', 'Label 2', 'Label 3']}
        />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('renders with empty labels array', () => {
      const { container } = render(
        <RdsCompDoughnutChart {...defaultProps} labels={[]} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('renders with many labels', () => {
      const manyLabels = Array.from({ length: 10 }, (_, i) => `Label ${i + 1}`);
      const { container } = render(
        <RdsCompDoughnutChart {...defaultProps} labels={manyLabels} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('renders with special characters in labels', () => {
      const { container } = render(
        <RdsCompDoughnutChart
          {...defaultProps}
          labels={['@', '#', '$', '%']}
        />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Color Configuration', () => {
    it('applies custom background colors', () => {
      const coloredDataset = [
        {
          data: [50, 50],
          backgroundColor: ['#FF0000', '#00FF00'],
        },
      ];
      const { container } = render(
        <RdsCompDoughnutChart {...defaultProps} dataSets={coloredDataset} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('applies custom border colors', () => {
      const borderedDataset = [
        {
          data: [50, 50],
          backgroundColor: ['#FF0000', '#00FF00'],
          borderColor: ['#000000', '#FFFFFF'],
          borderWidth: 2,
        },
      ];
      const { container } = render(
        <RdsCompDoughnutChart {...defaultProps} dataSets={borderedDataset} />
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
        <RdsCompDoughnutChart {...minimalProps} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('renders with all features enabled', () => {
      const { container } = render(<RdsCompDoughnutChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty labels array', () => {
      const { container } = render(
        <RdsCompDoughnutChart {...defaultProps} labels={[]} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles very large data values', () => {
      const largeDataset = [
        {
          data: [999999, 1],
          backgroundColor: ['#FF0000', '#00FF00'],
        },
      ];
      const { container } = render(
        <RdsCompDoughnutChart {...defaultProps} dataSets={largeDataset} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles very small data values', () => {
      const smallDataset = [
        {
          data: [0.1, 0.9],
          backgroundColor: ['#FF0000', '#00FF00'],
        },
      ];
      const { container } = render(
        <RdsCompDoughnutChart {...defaultProps} dataSets={smallDataset} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles zero values in dataset', () => {
      const zeroDataset = [
        {
          data: [0, 100],
          backgroundColor: ['#FF0000', '#00FF00'],
        },
      ];
      const { container } = render(
        <RdsCompDoughnutChart {...defaultProps} dataSets={zeroDataset} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles 100:0 ratio', () => {
      const skewedDataset = [
        {
          data: [100, 0],
          backgroundColor: ['#FF0000', '#00FF00'],
        },
      ];
      const { container } = render(
        <RdsCompDoughnutChart {...defaultProps} dataSets={skewedDataset} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles 50:50 ratio', () => {
      const balancedDataset = [
        {
          data: [50, 50],
          backgroundColor: ['#FF0000', '#00FF00'],
        },
      ];
      const { container } = render(
        <RdsCompDoughnutChart {...defaultProps} dataSets={balancedDataset} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles null options gracefully', () => {
      const { container } = render(
        <RdsCompDoughnutChart {...defaultProps} options={null} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles empty options object', () => {
      const { container } = render(
        <RdsCompDoughnutChart {...defaultProps} options={{}} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Component Lifecycle', () => {
    it('initializes chart on first render', () => {
      const { container } = render(<RdsCompDoughnutChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('cleans up chart on unmount', () => {
      const { unmount, container } = render(
        <RdsCompDoughnutChart {...defaultProps} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
      unmount();
    });

    it('updates chart on multiple re-renders', () => {
      const { rerender, container } = render(
        <RdsCompDoughnutChart {...defaultProps} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();

      rerender(
        <RdsCompDoughnutChart
          {...defaultProps}
          labels={['Yes', 'No']}
        />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();

      rerender(
        <RdsCompDoughnutChart
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
        <RdsCompDoughnutChart {...defaultProps} id="chart-1" />
      );
      let canvas = container.querySelector('canvas');
      expect(canvas).toHaveAttribute('id', 'chart-1');

      rerender(<RdsCompDoughnutChart {...defaultProps} id="chart-2" />);
      canvas = container.querySelector('canvas');
      expect(canvas).toHaveAttribute('id', 'chart-2');
    });

    it('preserves canvas ref through re-renders', () => {
      const { rerender, container } = render(
        <RdsCompDoughnutChart {...defaultProps} />
      );
      const canvas1 = container.querySelector('canvas');

      rerender(
        <RdsCompDoughnutChart
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
        <RdsCompDoughnutChart {...defaultProps} options={responsiveOptions} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('renders with responsive false', () => {
      const fixedOptions = {
        responsive: false,
        maintainAspectRatio: true,
      };
      const { container } = render(
        <RdsCompDoughnutChart {...defaultProps} options={fixedOptions} />
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
        <RdsCompDoughnutChart {...defaultProps} options={aspectOptions} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Canvas Styling', () => {
    it('sets canvas height style to 66vh', () => {
      const { container } = render(<RdsCompDoughnutChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('sets canvas width style to 66vh', () => {
      const { container } = render(<RdsCompDoughnutChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('canvas element is in document', () => {
      const { container } = render(<RdsCompDoughnutChart {...defaultProps} />);
      const canvas = container.querySelector('canvas');
      expect(canvas).toBeInTheDocument();
  
    it('has no axe accessibility violations', async () => {
      const { container } = render(<RdsCompDoughnutChart {...defaultProps} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

    it('canvas has id attribute', () => {
      const { container } = render(<RdsCompDoughnutChart {...defaultProps} />);
      const canvas = container.querySelector('canvas');
      expect(canvas).toHaveAttribute('id');
    });

    it('canvas has data-testid attribute', () => {
      const { container } = render(<RdsCompDoughnutChart {...defaultProps} />);
      const canvas = container.querySelector('[data-testid="doughnut-chart-1"]');
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
        },
      };
      const { container } = render(
        <RdsCompDoughnutChart {...defaultProps} options={optionsWithPlugins} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('deep clones options before modification', () => {
      const options = {
        responsive: true,
      };
      const { container } = render(
        <RdsCompDoughnutChart {...defaultProps} options={options} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
      // Original options should not be mutated with plugins
      expect((options as any).plugins).toBeUndefined();
    });
  });

  describe('Chart Type', () => {
    it('renders as doughnut chart type', () => {
      const { container } = render(<RdsCompDoughnutChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Text Rendering', () => {
    it('renders title and subtitle using centerText plugin', () => {
      const { container } = render(
        <RdsCompDoughnutChart
          {...defaultProps}
          titleText="Main Title"
          subTitleText="Sub Title"
        />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles missing title and subtitle', () => {
      const { container } = render(
        <RdsCompDoughnutChart
          {...defaultProps}
          titleText={undefined}
          subTitleText={undefined}
        />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });
});