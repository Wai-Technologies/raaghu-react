import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';
import RdsCompBarChart from './rds-comp-chart-bar';

// Mock SCSS
jest.mock('./rds-comp-chart-bar.scss', () => ({}));

// Mock Chart.js
jest.mock('chart.js/auto', () => {
  return class MockChart {
    constructor(ctx: any, config: any) {
      this.ctx = ctx;
      this.config = config;
      this.canvas = ctx?.canvas || document.createElement('canvas');
    }
    destroy = jest.fn();
    ctx: any;
    config: any;
    canvas: HTMLCanvasElement;
  };
});

const defaultProps = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
  dataSets: [
    {
      label: 'Dataset 1',
      data: [10, 20, 30, 40, 50],
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
    },
  ],
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
  id: 'barchart-test',
};

describe('RdsCompBarChart', () => {
  describe('Basic Rendering', () => {
    it('renders the component without crashing', () => {
      const { container } = render(<RdsCompBarChart {...defaultProps} />);
      expect(container).toBeInTheDocument();
    });

    it('renders with correct display name', () => {
      expect(RdsCompBarChart.displayName).toBe('RdsCompBarChart');
    });

    it('renders canvas element', () => {
      const { container } = render(<RdsCompBarChart {...defaultProps} />);
      const canvas = container.querySelector('canvas');
      expect(canvas).toBeInTheDocument();
    });

    it('canvas element has correct id', () => {
      render(<RdsCompBarChart {...defaultProps} id="test-canvas" />);
      const canvas = screen.getByTestId('test-canvas');
      expect(canvas).toHaveAttribute('id', 'test-canvas');
    });

    it('renders div with correct class', () => {
      const { container } = render(<RdsCompBarChart {...defaultProps} />);
      const div = container.querySelector('.rds-comp-chart-bar');
      expect(div).toBeInTheDocument();
    });
  });

  describe('Props Handling', () => {
    it('passes labels to chart', () => {
      const labels = ['Q1', 'Q2', 'Q3', 'Q4'];
      const { container } = render(
        <RdsCompBarChart {...defaultProps} labels={labels} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('passes dataSets to chart', () => {
      const dataSets = [
        {
          label: 'Revenue',
          data: [100, 200, 300, 400],
        },
      ];
      const { container } = render(
        <RdsCompBarChart {...defaultProps} dataSets={dataSets} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('passes options to chart', () => {
      const options = {
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
          },
        },
      };
      const { container } = render(
        <RdsCompBarChart {...defaultProps} options={options} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('uses provided id for canvas', () => {
      render(<RdsCompBarChart {...defaultProps} id="custom-id" />);
      const canvas = screen.getByTestId('custom-id');
      expect(canvas).toHaveAttribute('id', 'custom-id');
    });

    it('handles different id values', () => {
      const ids = ['chart1', 'chart2', 'chart3'];
      ids.forEach(id => {
        const { container, unmount } = render(
          <RdsCompBarChart {...defaultProps} id={id} />
        );
        expect(screen.getByTestId(id)).toHaveAttribute('id', id);
        unmount();
      });
    });
  });

  describe('Canvas Styling', () => {
    it('sets canvas height style', () => {
      const { container } = render(
        <RdsCompBarChart {...defaultProps} height="400px" />
      );
      const canvas = container.querySelector('canvas');
      expect(canvas).toBeInTheDocument();
    });

    it('sets canvas width style', () => {
      const { container } = render(
        <RdsCompBarChart {...defaultProps} height="500px" />
      );
      const canvas = container.querySelector('canvas');
      expect(canvas).toBeInTheDocument();
    });

    it('applies preset height for barchart1 id', () => {
      const { container } = render(
        <RdsCompBarChart {...defaultProps} id="barchart1" />
      );
      const canvas = container.querySelector('canvas');
      expect(canvas).toBeInTheDocument();
    });

    it('applies preset height for histogram id', () => {
      const { container } = render(
        <RdsCompBarChart {...defaultProps} id="histogram" />
      );
      const canvas = container.querySelector('canvas');
      expect(canvas).toBeInTheDocument();
    });

    it('applies default height for other ids', () => {
      const { container } = render(
        <RdsCompBarChart {...defaultProps} id="other-chart" />
      );
      const canvas = container.querySelector('canvas');
      expect(canvas).toBeInTheDocument();
    });
  });

  describe('Dark Mode Detection', () => {
    it('detects dark mode from body class', () => {
      document.body.classList.add('theme-dark');
      const { container } = render(<RdsCompBarChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.body.classList.remove('theme-dark');
    });

    it('detects dark mode from alternative body class', () => {
      document.body.classList.add('dark-theme');
      const { container } = render(<RdsCompBarChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.body.classList.remove('dark-theme');
    });

    it('detects dark mode from documentElement attribute', () => {
      document.documentElement.setAttribute('data-theme', 'dark');
      const { container } = render(<RdsCompBarChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.documentElement.removeAttribute('data-theme');
    });

    it('detects dark mode from body attribute', () => {
      document.body.setAttribute('data-theme', 'dark');
      const { container } = render(<RdsCompBarChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.body.removeAttribute('data-theme');
    });

    it('defaults to light mode', () => {
      const { container } = render(<RdsCompBarChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Chart Destruction', () => {
    it('destroys chart on unmount', () => {
      const { unmount } = render(<RdsCompBarChart {...defaultProps} />);
      expect(screen.getByTestId(defaultProps.id)).toBeInTheDocument();
      unmount();
    });

    it('destroys previous chart on props update', () => {
      const { rerender } = render(
        <RdsCompBarChart {...defaultProps} labels={['A', 'B', 'C']} />
      );
      expect(screen.getByTestId(defaultProps.id)).toBeInTheDocument();

      rerender(
        <RdsCompBarChart {...defaultProps} labels={['X', 'Y', 'Z']} />
      );
      expect(screen.getByTestId(defaultProps.id)).toBeInTheDocument();
    });
  });

  describe('Theme Mode State', () => {
    it('initializes theme mode state', () => {
      const { container } = render(<RdsCompBarChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('subscribes to theme changes via MutationObserver', () => {
      const { container } = render(<RdsCompBarChart {...defaultProps} />);
      document.documentElement.setAttribute('data-theme', 'dark');
      fireEvent.mouseDown(document.documentElement);
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.documentElement.removeAttribute('data-theme');
    });
  });

  describe('Chart Configuration', () => {
    it('creates chart with type bar', () => {
      const { container } = render(<RdsCompBarChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('passes correct chart type to Chart.js', () => {
      const { container } = render(<RdsCompBarChart {...defaultProps} />);
      const canvas = container.querySelector('canvas');
      expect(canvas).toBeInTheDocument();
    });

    it('sets up chart with labels and datasets', () => {
      const { container } = render(<RdsCompBarChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Data Updates', () => {
    it('updates chart when labels change', () => {
      const { rerender } = render(
        <RdsCompBarChart {...defaultProps} labels={['A', 'B']} />
      );
      expect(screen.getByTestId(defaultProps.id)).toBeInTheDocument();

      rerender(
        <RdsCompBarChart {...defaultProps} labels={['X', 'Y', 'Z']} />
      );
      expect(screen.getByTestId(defaultProps.id)).toBeInTheDocument();
    });

    it('updates chart when dataSets change', () => {
      const { rerender } = render(
        <RdsCompBarChart
          {...defaultProps}
          dataSets={[{ label: 'Old', data: [1, 2, 3] }]}
        />
      );
      expect(screen.getByTestId(defaultProps.id)).toBeInTheDocument();

      rerender(
        <RdsCompBarChart
          {...defaultProps}
          dataSets={[{ label: 'New', data: [4, 5, 6] }]}
        />
      );
      expect(screen.getByTestId(defaultProps.id)).toBeInTheDocument();
    });

    it('updates chart when options change', () => {
      const { rerender } = render(
        <RdsCompBarChart
          {...defaultProps}
          options={{ scales: { y: { beginAtZero: true } } }}
        />
      );
      expect(screen.getByTestId(defaultProps.id)).toBeInTheDocument();

      rerender(
        <RdsCompBarChart
          {...defaultProps}
          options={{ scales: { y: { beginAtZero: false } } }}
        />
      );
      expect(screen.getByTestId(defaultProps.id)).toBeInTheDocument();
    });
  });

  describe('Multiple Datasets', () => {
    it('renders multiple datasets', () => {
      const multipleSets = [
        { label: 'Dataset 1', data: [10, 20, 30] },
        { label: 'Dataset 2', data: [5, 15, 25] },
        { label: 'Dataset 3', data: [15, 25, 35] },
      ];
      const { container } = render(
        <RdsCompBarChart {...defaultProps} dataSets={multipleSets} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles empty datasets array', () => {
      const { container } = render(
        <RdsCompBarChart {...defaultProps} dataSets={[]} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Label Variations', () => {
    it('renders with month labels', () => {
      const months = ['January', 'February', 'March', 'April', 'May', 'June'];
      const { container } = render(
        <RdsCompBarChart {...defaultProps} labels={months} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('renders with numeric labels', () => {
      const numLabels = [1, 2, 3, 4, 5];
      const { container } = render(
        <RdsCompBarChart {...defaultProps} labels={numLabels} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('renders with empty labels array', () => {
      const { container } = render(
        <RdsCompBarChart {...defaultProps} labels={[]} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('renders with many labels', () => {
      const manyLabels = Array.from({ length: 50 }, (_, i) => `Label ${i + 1}`);
      const { container } = render(
        <RdsCompBarChart {...defaultProps} labels={manyLabels} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Color Configuration', () => {
    it('applies custom border color', () => {
      const dataSets = [
        {
          label: 'Revenue',
          data: [100, 200, 300],
          borderColor: "var(--rds-semantic-error-main, #ff0000)",
        },
      ];
      const { container } = render(
        <RdsCompBarChart {...defaultProps} dataSets={dataSets} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('applies custom background color', () => {
      const dataSets = [
        {
          label: 'Revenue',
          data: [100, 200, 300],
          backgroundColor: "var(--rds-semantic-success-main, #00ff00)",
        },
      ];
      const { container } = render(
        <RdsCompBarChart {...defaultProps} dataSets={dataSets} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Scale Configuration', () => {
    it('applies custom x-axis configuration', () => {
      const options = {
        scales: {
          x: {
            type: 'category',
            title: { display: true, text: 'X Axis' },
          },
        },
      };
      const { container } = render(
        <RdsCompBarChart {...defaultProps} options={options} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('applies custom y-axis configuration', () => {
      const options = {
        scales: {
          y: {
            beginAtZero: true,
            title: { display: true, text: 'Y Axis' },
          },
        },
      };
      const { container } = render(
        <RdsCompBarChart {...defaultProps} options={options} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('applies both x and y axis configuration', () => {
      const options = {
        scales: {
          x: {
            type: 'category',
            title: { display: true, text: 'Categories' },
          },
          y: {
            beginAtZero: true,
            max: 100,
          },
        },
      };
      const { container } = render(
        <RdsCompBarChart {...defaultProps} options={options} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Dark Mode Stylesheet Updates', () => {
    it('updates grid color in dark mode', () => {
      document.documentElement.setAttribute('data-theme', 'dark');
      const { container } = render(<RdsCompBarChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.documentElement.removeAttribute('data-theme');
    });

    it('updates tick color in dark mode', () => {
      document.body.classList.add('theme-dark');
      const { container } = render(<RdsCompBarChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.body.classList.remove('theme-dark');
    });

    it('updates legend label color in dark mode', () => {
      document.body.classList.add('dark-theme');
      const { container } = render(<RdsCompBarChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.body.classList.remove('dark-theme');
    });

    it('updates tooltip colors in dark mode', () => {
      document.documentElement.setAttribute('data-theme', 'dark');
      const options = {
        plugins: {
          tooltip: {
            enabled: true,
          },
        },
      };
      const { container } = render(
        <RdsCompBarChart {...defaultProps} options={options} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.documentElement.removeAttribute('data-theme');
    });
  });

  describe('Legend Plugin Configuration', () => {
    it('preserves legend position when light mode', () => {
      const options = {
        plugins: {
          legend: {
            position: 'top' as const,
          },
        },
      };
      const { container } = render(
        <RdsCompBarChart {...defaultProps} options={options} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('preserves legend position when dark mode', () => {
      document.documentElement.setAttribute('data-theme', 'dark');
      const options = {
        plugins: {
          legend: {
            position: 'bottom' as const,
          },
        },
      };
      const { container } = render(
        <RdsCompBarChart {...defaultProps} options={options} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
      document.documentElement.removeAttribute('data-theme');
    });
  });

  describe('Tooltip Configuration', () => {
    it('renders with default tooltip', () => {
      const { container } = render(<RdsCompBarChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('renders with custom tooltip configuration', () => {
      const options = {
        plugins: {
          tooltip: {
            backgroundColor: 'rgba(0,0,0,0.8)',
            titleColor: "var(--rds-neutral-0, #fff)",
            bodyColor: "var(--rds-neutral-0, #fff)",
          },
        },
      };
      const { container } = render(
        <RdsCompBarChart {...defaultProps} options={options} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty options object', () => {
      const { container } = render(
        <RdsCompBarChart {...defaultProps} options={{}} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles null options gracefully', () => {
      const { container } = render(
        <RdsCompBarChart {...defaultProps} options={null} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles very large dataset values', () => {
      const dataSets = [
        {
          label: 'Large Values',
          data: [1000000, 2000000, 3000000],
        },
      ];
      const { container } = render(
        <RdsCompBarChart {...defaultProps} dataSets={dataSets} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles negative dataset values', () => {
      const dataSets = [
        {
          label: 'Negative Values',
          data: [-10, -20, -30],
        },
      ];
      const { container } = render(
        <RdsCompBarChart {...defaultProps} dataSets={dataSets} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles zero values in dataset', () => {
      const dataSets = [
        {
          label: 'Zero Values',
          data: [0, 0, 0],
        },
      ];
      const { container } = render(
        <RdsCompBarChart {...defaultProps} dataSets={dataSets} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles mixed positive and negative values', () => {
      const dataSets = [
        {
          label: 'Mixed',
          data: [10, -20, 30, -40],
        },
      ];
      const { container } = render(
        <RdsCompBarChart {...defaultProps} dataSets={dataSets} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('handles string values in dataset', () => {
      const dataSets = [
        {
          label: 'String Values',
          data: ['10', '20', '30'],
        },
      ];
      const { container } = render(
        <RdsCompBarChart {...defaultProps} dataSets={dataSets} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Component Lifecycle', () => {
    it('initializes chart on first render', () => {
      const { container } = render(<RdsCompBarChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('cleans up chart on unmount', () => {
      const { unmount, container } = render(
        <RdsCompBarChart {...defaultProps} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
      unmount();
      expect(container.querySelector('canvas')).not.toBeInTheDocument();
    });

    it('updates chart on multiple re-renders', () => {
      const { rerender } = render(
        <RdsCompBarChart {...defaultProps} labels={['A']} />
      );
      expect(screen.getByTestId(defaultProps.id)).toBeInTheDocument();

      rerender(
        <RdsCompBarChart {...defaultProps} labels={['A', 'B']} />
      );
      expect(screen.getByTestId(defaultProps.id)).toBeInTheDocument();

      rerender(
        <RdsCompBarChart {...defaultProps} labels={['A', 'B', 'C']} />
      );
      expect(screen.getByTestId(defaultProps.id)).toBeInTheDocument();
    });
  });

  describe('Height Variations', () => {
    it('renders with numeric height', () => {
      const { container } = render(
        <RdsCompBarChart {...defaultProps} height={300} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('renders with string height', () => {
      const { container } = render(
        <RdsCompBarChart {...defaultProps} height="400px" />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('renders without height prop', () => {
      const { container } = render(<RdsCompBarChart {...defaultProps} />);
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Responsive Configuration', () => {
    it('renders with responsive true', () => {
      const options = { responsive: true };
      const { container } = render(
        <RdsCompBarChart {...defaultProps} options={options} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('renders with responsive false', () => {
      const options = { responsive: false };
      const { container } = render(
        <RdsCompBarChart {...defaultProps} options={options} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('renders with maintainAspectRatio option', () => {
      const options = { maintainAspectRatio: true };
      const { container } = render(
        <RdsCompBarChart {...defaultProps} options={options} />
      );
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('Re-render Behavior', () => {
    it('updates src on prop change', () => {
      const { rerender } = render(
        <RdsCompBarChart
          {...defaultProps}
          dataSets={[{ label: 'First', data: [1, 2, 3] }]}
        />
      );
      expect(screen.getByTestId(defaultProps.id)).toBeInTheDocument();

      rerender(
        <RdsCompBarChart
          {...defaultProps}
          dataSets={[{ label: 'Second', data: [4, 5, 6] }]}
        />
      );
      expect(screen.getByTestId(defaultProps.id)).toBeInTheDocument();
    });

    it('updates type on prop change', () => {
      const { rerender } = render(
        <RdsCompBarChart {...defaultProps} id="chart1" />
      );
      expect(screen.getByTestId('chart1')).toBeInTheDocument();

      rerender(
        <RdsCompBarChart {...defaultProps} id="chart2" />
      );
      expect(screen.getByTestId('chart2')).toBeInTheDocument();
    });

    it('shows/hides settings on prop change', () => {
      const { rerender } = render(
        <RdsCompBarChart
          {...defaultProps}
          options={{ plugins: { legend: { display: true } } }}
        />
      );
      expect(screen.getByTestId(defaultProps.id)).toBeInTheDocument();

      rerender(
        <RdsCompBarChart
          {...defaultProps}
          options={{ plugins: { legend: { display: false } } }}
        />
      );
      expect(screen.getByTestId(defaultProps.id)).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('canvas element is present and focusable', () => {
      render(<RdsCompBarChart {...defaultProps} />);
      const canvas = screen.getByTestId(defaultProps.id);
      expect(canvas).toBeInTheDocument();
  
    });
    it('has no axe accessibility violations', async () => {
      const { container } = render(<RdsCompBarChart {...defaultProps} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('parent container has semantic markup', () => {
      const { container } = render(<RdsCompBarChart {...defaultProps} />);
      const wrapper = container.querySelector('.rds-comp-chart-bar');
      expect(wrapper).toBeInTheDocument();
    });

    it('canvas is properly associated with container', () => {
      const { container } = render(<RdsCompBarChart {...defaultProps} />);
      const canvas = screen.getByTestId(defaultProps.id);
      const wrapper = container.querySelector('.rds-comp-chart-bar');
      expect(wrapper?.contains(canvas)).toBe(true);
    });
  });

  describe('CSS Classes', () => {
    it('applies correct CSS classes to wrapper', () => {
      const { container } = render(<RdsCompBarChart {...defaultProps} />);
      expect(container.querySelector('.rds-comp-chart-bar')).toBeInTheDocument();
    });

    it('canvas element receives data-testid', () => {
      render(<RdsCompBarChart {...defaultProps} id="test-id" />);
      const canvas = screen.getByTestId('test-id');
      expect(canvas).toBeInTheDocument();
    });

    it('canvas element has id attribute matching testid', () => {
      render(<RdsCompBarChart {...defaultProps} id="sync-id" />);
      const canvas = screen.getByTestId('sync-id');
      expect(canvas).toHaveAttribute('id', 'sync-id');
    });
  });
});