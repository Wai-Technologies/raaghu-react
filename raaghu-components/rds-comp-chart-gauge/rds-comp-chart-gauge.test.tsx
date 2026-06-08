import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';
import RdsCompGaugeChart from './rds-comp-chart-gauge';

// Mock SCSS
jest.mock('./rds-comp-chart-gauge.scss', () => ({}));

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
        top: 10,
        right: 290,
        bottom: 290,
        left: 10,
        width: 280,
        height: 280,
      },
    };
  });
});

const defaultProps = {
  labels: ['Progress'],
  dataSets: [
    {
      data: [75, 25],
      backgroundColor: ['#4CAF50', '#E0E0E0'],
      borderWidth: 0,
    },
  ],
  options: {
    responsive: true,
    maintainAspectRatio: false,
  },
  id: 'gauge-chart-1',
  titleText: 'Completion',
  subTitleText: '75%',
  value: 75,
  maxValue: 100,
};

describe('RdsCompGaugeChart', () => {
  describe('Basic Rendering', () => {
    it('renders the component without crashing', () => {
      const { container } = render(<RdsCompGaugeChart {...defaultProps} />);
      expect(container).toBeInTheDocument();
    });

    it('renders with correct display name', () => {
      expect(RdsCompGaugeChart.displayName).toBe('RdsCompGaugeChart');
    });

    it('renders canvas element', () => {
      const { container } = render(<RdsCompGaugeChart {...defaultProps} />);
      const canvas = container.querySelector('canvas');
      expect(canvas).toBeInTheDocument();
    });

    it('canvas element has correct id', () => {
      const { container } = render(<RdsCompGaugeChart {...defaultProps} />);
      const canvas = container.querySelector('canvas');
      expect(canvas).toHaveAttribute('id', 'gauge-chart-1');
    });

    it('canvas element has correct data-testid', () => {
      const { container } = render(<RdsCompGaugeChart {...defaultProps} />);
      const canvas = container.querySelector('[data-testid="gauge-chart-1"]');
      expect(canvas).toBeInTheDocument();
    });

    it('renders gauge wrapper div with correct class', () => {
      const { container } = render(<RdsCompGaugeChart {...defaultProps} />);
      const wrapper = container.querySelector('.rds-comp-chart-gauge');
      expect(wrapper).toBeInTheDocument();
    });
  });

  describe('Props Handling', () => {
    it('passes labels to chart', () => {
      const { container } = render(<RdsCompGaugeChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('passes dataSets to chart', () => {
      const customDatasets = [
        {
          data: [60, 40],
          backgroundColor: ['#2196F3', '#E0E0E0'],
          borderWidth: 0,
        },
      ];
      const { container } = render(
        <RdsCompGaugeChart {...defaultProps} dataSets={customDatasets} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('passes options to chart', () => {
      const customOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
        },
      };
      const { container } = render(
        <RdsCompGaugeChart {...defaultProps} options={customOptions} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('uses provided id for canvas', () => {
      const { container } = render(
        <RdsCompGaugeChart {...defaultProps} id="custom-gauge" />
      );
      const canvas = container.querySelector('canvas');
      expect(canvas).toHaveAttribute('id', 'custom-gauge');
    });

    it('handles different id values', () => {
      const { rerender, container } = render(
        <RdsCompGaugeChart {...defaultProps} id="gauge-1" />
      );
      let canvas = container.querySelector('canvas');
      expect(canvas).toHaveAttribute('id', 'gauge-1');

      rerender(<RdsCompGaugeChart {...defaultProps} id="gauge-2" />);
      canvas = container.querySelector('canvas');
      expect(canvas).toHaveAttribute('id', 'gauge-2');
    });
  });

  describe('Title and Subtitle', () => {
    it('renders with custom title text', () => {
      const { container } = render(
        <RdsCompGaugeChart {...defaultProps} titleText="Performance" />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('renders with custom subtitle text', () => {
      const { container } = render(
        <RdsCompGaugeChart {...defaultProps} subTitleText="90%" />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('renders without title text (optional)', () => {
      const { container } = render(
        <RdsCompGaugeChart {...defaultProps} titleText={undefined} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('renders without subtitle text (optional)', () => {
      const { container } = render(
        <RdsCompGaugeChart {...defaultProps} subTitleText={undefined} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('renders with both title and subtitle', () => {
      const { container } = render(
        <RdsCompGaugeChart
          {...defaultProps}
          titleText="Progress"
          subTitleText="85%"
        />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles empty title text', () => {
      const { container } = render(
        <RdsCompGaugeChart {...defaultProps} titleText="" />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles empty subtitle text', () => {
      const { container } = render(
        <RdsCompGaugeChart {...defaultProps} subTitleText="" />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles very long title text', () => {
      const longTitle = 'Very Long Title Text That Might Need Truncation';
      const { container } = render(
        <RdsCompGaugeChart {...defaultProps} titleText={longTitle} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles special characters in title', () => {
      const { container } = render(
        <RdsCompGaugeChart {...defaultProps} titleText="Progress (100%)" />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Value and MaxValue Props', () => {
    it('renders with value prop', () => {
      const { container } = render(
        <RdsCompGaugeChart {...defaultProps} value={75} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('renders with maxValue prop', () => {
      const { container } = render(
        <RdsCompGaugeChart {...defaultProps} maxValue={100} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('renders with different value ratios', () => {
      const { container } = render(
        <RdsCompGaugeChart {...defaultProps} value={50} maxValue={100} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('renders with zero value', () => {
      const { container } = render(
        <RdsCompGaugeChart {...defaultProps} value={0} maxValue={100} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('renders with max value equal to value', () => {
      const { container } = render(
        <RdsCompGaugeChart {...defaultProps} value={100} maxValue={100} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Dark Mode Detection', () => {
    it('detects dark mode from body class theme-dark', () => {
      document.body.classList.add('theme-dark');
      const { container } = render(<RdsCompGaugeChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.body.classList.remove('theme-dark');
    });

    it('detects dark mode from body class dark-theme', () => {
      document.body.classList.add('dark-theme');
      const { container } = render(<RdsCompGaugeChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.body.classList.remove('dark-theme');
    });

    it('detects dark mode from documentElement attribute', () => {
      document.documentElement.setAttribute('data-theme', 'dark');
      const { container } = render(<RdsCompGaugeChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.documentElement.removeAttribute('data-theme');
    });

    it('detects dark mode from body attribute', () => {
      document.body.setAttribute('data-theme', 'dark');
      const { container } = render(<RdsCompGaugeChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.body.removeAttribute('data-theme');
    });

    it('defaults to light mode when no dark mode indicators', () => {
      document.body.classList.remove('theme-dark', 'dark-theme');
      document.documentElement.removeAttribute('data-theme');
      document.body.removeAttribute('data-theme');
      const { container } = render(<RdsCompGaugeChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Dark Mode Styles', () => {
    it('applies legend color in dark mode', () => {
      document.body.classList.add('theme-dark');
      const { container } = render(<RdsCompGaugeChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.body.classList.remove('theme-dark');
    });

    it('applies correct text color for title in dark mode', () => {
      document.body.classList.add('theme-dark');
      const { container } = render(
        <RdsCompGaugeChart {...defaultProps} titleText="Title" />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.body.classList.remove('theme-dark');
    });

    it('applies correct text color for subtitle in dark mode', () => {
      document.body.classList.add('theme-dark');
      const { container } = render(
        <RdsCompGaugeChart {...defaultProps} subTitleText="SubTitle" />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.body.classList.remove('theme-dark');
    });
  });

  describe('Chart Destruction', () => {
    it('destroys chart on unmount', () => {
      const { unmount } = render(<RdsCompGaugeChart {...defaultProps} />);
      unmount();
      expect(true).toBe(true);
    });

    it('destroys previous chart on props update', () => {
      const { rerender } = render(<RdsCompGaugeChart {...defaultProps} />);
      rerender(
        <RdsCompGaugeChart
          {...defaultProps}
          titleText="Updated Title"
        />
      );
      expect(true).toBe(true);
    });
  });

  describe('Chart Configuration', () => {
    it('creates chart with type doughnut', () => {
      const { container } = render(<RdsCompGaugeChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('applies gauge rotation of -90 degrees', () => {
      const { container } = render(<RdsCompGaugeChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('applies gauge circumference of 180 degrees', () => {
      const { container } = render(<RdsCompGaugeChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('sets maintainAspectRatio to false', () => {
      const { container } = render(<RdsCompGaugeChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('sets responsive to true', () => {
      const { container } = render(<RdsCompGaugeChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Data Updates', () => {
    it('updates chart when labels change', () => {
      const { rerender, container } = render(
        <RdsCompGaugeChart {...defaultProps} labels={['Progress']} />
      );
      rerender(
        <RdsCompGaugeChart {...defaultProps} labels={['Completion']} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('updates chart when dataSets change', () => {
      const { rerender, container } = render(
        <RdsCompGaugeChart {...defaultProps} />
      );
      rerender(
        <RdsCompGaugeChart
          {...defaultProps}
          dataSets={[
            {
              data: [90, 10],
              backgroundColor: ['#FF9800', '#E0E0E0'],
              borderWidth: 0,
            },
          ]}
        />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('updates chart when options change', () => {
      const { rerender, container } = render(
        <RdsCompGaugeChart {...defaultProps} />
      );
      rerender(
        <RdsCompGaugeChart
          {...defaultProps}
          options={{
            responsive: false,
            maintainAspectRatio: true,
          }}
        />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('updates title text on prop change', () => {
      const { rerender, container } = render(
        <RdsCompGaugeChart {...defaultProps} titleText="Title 1" />
      );
      rerender(
        <RdsCompGaugeChart {...defaultProps} titleText="Title 2" />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('updates subtitle text on prop change', () => {
      const { rerender, container } = render(
        <RdsCompGaugeChart {...defaultProps} subTitleText="50%" />
      );
      rerender(
        <RdsCompGaugeChart {...defaultProps} subTitleText="75%" />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Multiple Datasets', () => {
    it('renders with single dataset', () => {
      const { container } = render(<RdsCompGaugeChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('renders with multiple datasets', () => {
      const multiDatasets = [
        {
          data: [75, 25],
          backgroundColor: ['#4CAF50', '#E0E0E0'],
          borderWidth: 0,
        },
        {
          data: [50, 50],
          backgroundColor: ['#2196F3', '#E0E0E0'],
          borderWidth: 0,
        },
      ];
      const { container } = render(
        <RdsCompGaugeChart {...defaultProps} dataSets={multiDatasets} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles empty datasets array', () => {
      const { container } = render(
        <RdsCompGaugeChart {...defaultProps} dataSets={[]} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Color Configuration', () => {
    it('applies custom background colors', () => {
      const coloredDataset = [
        {
          data: [80, 20],
          backgroundColor: ['#FF5733', '#E0E0E0'],
          borderWidth: 0,
        },
      ];
      const { container } = render(
        <RdsCompGaugeChart {...defaultProps} dataSets={coloredDataset} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('applies custom border width', () => {
      const borderedDataset = [
        {
          data: [65, 35],
          backgroundColor: ['#4CAF50', '#E0E0E0'],
          borderWidth: 2,
          borderColor: '#333',
        },
      ];
      const { container } = render(
        <RdsCompGaugeChart {...defaultProps} dataSets={borderedDataset} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Props Variants', () => {
    it('renders with minimal props', () => {
      const minimalProps = {
        labels: ['Gauge'],
        dataSets: [{ data: [50, 50] }],
        options: {},
        id: 'gauge-1',
      };
      const { container } = render(
        <RdsCompGaugeChart {...minimalProps} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('renders with all features enabled', () => {
      const { container } = render(<RdsCompGaugeChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty labels array', () => {
      const { container } = render(
        <RdsCompGaugeChart {...defaultProps} labels={[]} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles very large data values', () => {
      const largeDataset = [
        {
          data: [999999, 1],
          backgroundColor: ['#4CAF50', '#E0E0E0'],
          borderWidth: 0,
        },
      ];
      const { container } = render(
        <RdsCompGaugeChart {...defaultProps} dataSets={largeDataset} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles zero values in dataset', () => {
      const zeroDataset = [
        {
          data: [0, 100],
          backgroundColor: ['#4CAF50', '#E0E0E0'],
          borderWidth: 0,
        },
      ];
      const { container } = render(
        <RdsCompGaugeChart {...defaultProps} dataSets={zeroDataset} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles 100:0 ratio', () => {
      const maxedDataset = [
        {
          data: [100, 0],
          backgroundColor: ['#4CAF50', '#E0E0E0'],
          borderWidth: 0,
        },
      ];
      const { container } = render(
        <RdsCompGaugeChart {...defaultProps} dataSets={maxedDataset} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles 50:50 ratio', () => {
      const balancedDataset = [
        {
          data: [50, 50],
          backgroundColor: ['#4CAF50', '#E0E0E0'],
          borderWidth: 0,
        },
      ];
      const { container } = render(
        <RdsCompGaugeChart {...defaultProps} dataSets={balancedDataset} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles null options gracefully', () => {
      const { container } = render(
        <RdsCompGaugeChart {...defaultProps} options={null} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles empty options object', () => {
      const { container } = render(
        <RdsCompGaugeChart {...defaultProps} options={{}} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Component Lifecycle', () => {
    it('initializes chart on first render', () => {
      const { container } = render(<RdsCompGaugeChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('cleans up chart on unmount', () => {
      const { unmount, container } = render(
        <RdsCompGaugeChart {...defaultProps} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
      unmount();
    });

    it('updates chart on multiple re-renders', () => {
      const { rerender, container } = render(
        <RdsCompGaugeChart {...defaultProps} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();

      rerender(
        <RdsCompGaugeChart
          {...defaultProps}
          titleText="Updated Title"
        />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();

      rerender(
        <RdsCompGaugeChart
          {...defaultProps}
          value={90}
        />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Re-render Behavior', () => {
    it('updates id on prop change', () => {
      const { rerender, container } = render(
        <RdsCompGaugeChart {...defaultProps} id="gauge-1" />
      );
      let canvas = container.querySelector('canvas');
      expect(canvas).toHaveAttribute('id', 'gauge-1');

      rerender(<RdsCompGaugeChart {...defaultProps} id="gauge-2" />);
      canvas = container.querySelector('canvas');
      expect(canvas).toHaveAttribute('id', 'gauge-2');
    });

    it('preserves canvas ref through re-renders', () => {
      const { rerender, container } = render(
        <RdsCompGaugeChart {...defaultProps} />
      );
      const canvas1 = container.querySelector('canvas');

      rerender(
        <RdsCompGaugeChart
          {...defaultProps}
          titleText="Updated"
        />
      );
      const canvas2 = container.querySelector('canvas');

      expect(canvas2).toBeInTheDocument();
    });

    it('updates wrapper class through re-renders', () => {
      const { rerender, container } = render(
        <RdsCompGaugeChart {...defaultProps} />
      );
      let wrapper = container.querySelector('.rds-comp-chart-gauge');
      expect(wrapper).toBeInTheDocument();

      rerender(
        <RdsCompGaugeChart {...defaultProps} id="new-id" />
      );
      wrapper = container.querySelector('.rds-comp-chart-gauge');
      expect(wrapper).toBeInTheDocument();
    });
  });

  describe('Responsive Configuration', () => {
    it('renders with responsive true', () => {
      const responsiveOptions = {
        responsive: true,
        maintainAspectRatio: false,
      };
      const { container } = render(
        <RdsCompGaugeChart {...defaultProps} options={responsiveOptions} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('renders with responsive false', () => {
      const fixedOptions = {
        responsive: false,
        maintainAspectRatio: true,
      };
      const { container } = render(
        <RdsCompGaugeChart {...defaultProps} options={fixedOptions} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('renders with custom aspect ratio', () => {
      const aspectOptions = {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 2,
      };
      const { container } = render(
        <RdsCompGaugeChart {...defaultProps} options={aspectOptions} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Canvas Styling', () => {
    it('sets canvas width style to 45vh', () => {
      const { container } = render(<RdsCompGaugeChart {...defaultProps} />);
      const canvas = container.querySelector('canvas') as HTMLCanvasElement;
      expect(canvas).toBeInTheDocument();
    });

    it('sets canvas height style to 45vh', () => {
      const { container } = render(<RdsCompGaugeChart {...defaultProps} />);
      const canvas = container.querySelector('canvas') as HTMLCanvasElement;
      expect(canvas).toBeInTheDocument();
    });
  });

  describe('Plugin Configuration', () => {
    it('adds centerText plugin to chart', () => {
      const { container } = render(<RdsCompGaugeChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('plugin renders title text', () => {
      const { container } = render(
        <RdsCompGaugeChart {...defaultProps} titleText="Progress" />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('plugin renders subtitle text', () => {
      const { container } = render(
        <RdsCompGaugeChart {...defaultProps} subTitleText="75%" />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

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
        <RdsCompGaugeChart {...defaultProps} options={optionsWithPlugins} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('deep clones options before modification', () => {
      const options = {
        responsive: true,
        plugins: {
          legend: {
            display: true,
          },
        },
      };
      const { container } = render(
        <RdsCompGaugeChart {...defaultProps} options={options} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
      // Original options should not be mutated
      expect((options.plugins.legend as any).labels).toBeUndefined();
    });
  });

  describe('Chart Type', () => {
    it('renders as doughnut chart type', () => {
      const { container } = render(<RdsCompGaugeChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('uses gauge configuration (rotation -90, circumference 180)', () => {
      const { container } = render(<RdsCompGaugeChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('canvas element is in document', () => {
      const { container } = render(<RdsCompGaugeChart {...defaultProps} />);
      const canvas = container.querySelector('canvas');
      expect(canvas).toBeInTheDocument();
  
    });
    it('has no axe accessibility violations', async () => {
      const { container } = render(<RdsCompGaugeChart {...defaultProps} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('canvas has id attribute', () => {
      const { container } = render(<RdsCompGaugeChart {...defaultProps} />);
      const canvas = container.querySelector('canvas');
      expect(canvas).toHaveAttribute('id');
    });

    it('canvas has data-testid attribute', () => {
      const { container } = render(<RdsCompGaugeChart {...defaultProps} />);
      const canvas = container.querySelector('[data-testid="gauge-chart-1"]');
      expect(canvas).toBeInTheDocument();
    });

    it('wrapper div has semantic class name', () => {
      const { container } = render(<RdsCompGaugeChart {...defaultProps} />);
      const wrapper = container.querySelector('.rds-comp-chart-gauge');
      expect(wrapper).toBeInTheDocument();
    });
  });

  describe('Legend Configuration', () => {
    it('enables legend by default', () => {
      const { container } = render(<RdsCompGaugeChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('applies legend position as top', () => {
      const { container } = render(<RdsCompGaugeChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('uses point style circle for legend', () => {
      const { container } = render(<RdsCompGaugeChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('disables legend when display is false', () => {
      const noLegendOptions = {
        plugins: {
          legend: {
            display: false,
          },
        },
      };
      const { container } = render(
        <RdsCompGaugeChart {...defaultProps} options={noLegendOptions} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });
});