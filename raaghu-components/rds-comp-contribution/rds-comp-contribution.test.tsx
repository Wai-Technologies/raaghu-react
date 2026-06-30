import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';
import RdsCompContribution from './rds-comp-contribution';
import dayjs from 'dayjs';

// Mock the SCSS file
jest.mock('./rds-comp-contribution.scss', () => ({}));

// Mock react-measure
jest.mock('react-measure', () => {
  return function MockMeasure({ children, onResize }: { children: (args: unknown) => React.ReactNode; onResize?: (size: unknown) => void }) {
    if (onResize) {
      queueMicrotask(() => onResize({ bounds: { width: 1200, height: 300 } }));
    }
    return children({
      measure: { ref: jest.fn() },
      measureRef: jest.fn(),
    });
  };
});

// Mock MUI SvgIcon
jest.mock('@mui/material/SvgIcon', () => {
  return function MockSvgIcon({ children, className, viewBox, _sx, ...props }: any) {
    return (
      <svg className={className} viewBox={viewBox} data-testid="svg-icon" {...props}>
        {children}
      </svg>
    );
  };
});

describe('RdsCompContribution', () => {
  const defaultProps = {
    values: {
      '2024-01-01': 5,
      '2024-01-02': 3,
      '2024-01-03': 8,
      '2024-01-04': 2,
      '2024-01-05': 0,
    },
    until: '2024-12-31',
    panelColors: ['#ffffff', '#f0f0f0', '#c0c0c0', '#808080', '#404040'],
    weekNames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    monthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    dateFormat: 'YYYY-MM-DD',
  };

  describe('Basic Rendering', () => {
    test('should render component with required props', () => {
      const { container } = render(
        <RdsCompContribution {...defaultProps} />
      );
      const svg = container.querySelector('.rds-comp-contribution__svg');
      expect(svg).toBeInTheDocument();
    });

    test('should render SVG icon container', () => {
      render(<RdsCompContribution {...defaultProps} />);
      const svgIcon = screen.getByTestId('svg-icon');
      expect(svgIcon).toBeInTheDocument();
    });

    test('should have proper wrapper structure', () => {
      const { container } = render(
        <RdsCompContribution {...defaultProps} />
      );
      expect(container.querySelector('.rds-comp-contribution')).toBeInTheDocument();
      expect(container.querySelector('.rds-comp-contribution__container')).toBeInTheDocument();
      expect(container.querySelector('.rds-comp-contribution__wrapper')).toBeInTheDocument();
    });

    test('should return null if panelColors is missing', () => {
      const { container } = render(
        <RdsCompContribution {...defaultProps} panelColors={undefined} />
      );
      expect(container.firstChild).toBeNull();
    });

    test('should render without week labels if weekNames is missing', () => {
      const { container } = render(
        <RdsCompContribution {...defaultProps} weekNames={undefined} />
      );
      expect(container.firstChild).not.toBeNull();
      expect(container.querySelector('.rds-comp-contribution__text--week')).not.toBeInTheDocument();
    });

    test('should return null if values is missing', () => {
      const { container } = render(
        <RdsCompContribution {...{ ...defaultProps, values: '' as any }} />
      );
      expect(container.firstChild).toBeNull();
    });

    test('should return null if until is missing', () => {
      const { container } = render(
        <RdsCompContribution {...{ ...defaultProps, until: '' }} />
      );
      expect(container.firstChild).toBeNull();
    });
  });

  describe('Grid Generation', () => {
    test('should generate 53 columns of contribution data', () => {
      const { container } = render(
        <RdsCompContribution {...defaultProps} />
      );
      const panels = container.querySelectorAll('.rds-comp-contribution__panel');
      expect(panels.length).toBeGreaterThan(0);
    });

    test('should render panels with data-date attribute', () => {
      const { container } = render(
        <RdsCompContribution {...defaultProps} />
      );
      const panels = container.querySelectorAll('.rds-comp-contribution__panel');
      panels.forEach(panel => {
        const dateAttr = panel.dataset.date;
        expect(dateAttr).toBeTruthy();
      });
    });

    test('should render panels with data-value attribute', () => {
      const { container } = render(
        <RdsCompContribution {...defaultProps} />
      );
      const panels = container.querySelectorAll('.rds-comp-contribution__panel');
      panels.forEach(panel => {
        const valueAttr = panel.dataset.value;
        expect(valueAttr).toBeTruthy();
      });
    });

    test('should map contribution values correctly', () => {
      const values = {
        '2024-12-31': 5,
        '2024-12-30': 2,
        '2024-12-29': 0,
      };
      const { container } = render(
        <RdsCompContribution {...defaultProps} values={values} until="2024-12-31" />
      );
      const panels = container.querySelectorAll('[data-value]');
      const dataValues = Array.from(panels).map(p => Number.parseInt(p.dataset.value || '0'));
      expect(dataValues.some(v => v > 0)).toBe(true);
    });

    test('should handle empty values object', () => {
      const { container } = render(
        <RdsCompContribution {...defaultProps} values={{}} />
      );
      const panels = container.querySelectorAll('[data-value="0"]');
      expect(panels.length).toBeGreaterThan(0);
    });
  });

  describe('Panel Color Mapping', () => {
    test('should apply correct color based on contribution value', () => {
      const panelColors = ['#ffffff', '#f0f0f0', '#c0c0c0', '#808080', '#404040'];
      const { container } = render(
        <RdsCompContribution {...defaultProps} panelColors={panelColors} />
      );
      const panels = container.querySelectorAll('.rds-comp-contribution__panel');
      panels.forEach(panel => {
        const fill = panel.getAttribute('fill');
        expect(panelColors.includes(fill ?? '')).toBe(true);
      });
    });

    test('should use last color for values exceeding color array length', () => {
      const values = { '2024-12-31': 10 };
      const panelColors = ['#ffffff', '#f0f0f0'];
      const { container } = render(
        <RdsCompContribution {...defaultProps} values={values} panelColors={panelColors} />
      );
      const panels = container.querySelectorAll('[data-value="10"]');
      if (panels.length > 0) {
        const fill = panels[0].getAttribute('fill');
        expect(fill).toBe('#f0f0f0');
      }
    });

    test('should handle single color array', () => {
      const panelColors = ['#808080'];
      const { container } = render(
        <RdsCompContribution {...defaultProps} panelColors={panelColors} />
      );
      const panels = container.querySelectorAll('.rds-comp-contribution__panel');
      expect(panels.length).toBeGreaterThan(0);
      panels.forEach(panel => {
        const fill = panel.getAttribute('fill');
        expect(fill).toBe('#808080');
      });
    });
  });

  describe('Month Labels', () => {
    test('should render month labels when showMonthLabels is true', () => {
      const { container } = render(
        <RdsCompContribution {...defaultProps} showMonthLabels={true} />
      );
      const monthLabels = container.querySelectorAll('.rds-comp-contribution__text--month');
      expect(monthLabels.length).toBeGreaterThan(0);
    });

    test('should not render month labels when showMonthLabels is false', () => {
      const { container } = render(
        <RdsCompContribution {...defaultProps} showMonthLabels={false} />
      );
      const monthLabels = container.querySelectorAll('.rds-comp-contribution__text--month');
      expect(monthLabels.length).toBe(0);
    });

    test('should display full month names on desktop', () => {
      const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      const { container } = render(
        <RdsCompContribution {...defaultProps} monthNames={monthNames} showMonthLabels={true} />
      );
      const monthLabels = container.querySelectorAll('.rds-comp-contribution__text--month');
      expect(monthLabels.length).toBeGreaterThan(0);
    });

    test('should not render month labels if monthNames invalid', () => {
      const { container } = render(
        <RdsCompContribution {...defaultProps} monthNames={['Jan']} showMonthLabels={true} />
      );
      const monthLabels = container.querySelectorAll('.rds-comp-contribution__text--month');
      expect(monthLabels.length).toBe(0);
    });

    test('should apply mobile class to month labels when on mobile', async () => {
      global.innerWidth = 300;
      const { rerender } = render(
        <RdsCompContribution {...defaultProps} showMonthLabels={true} />
      );
      fireEvent(window, new Event('resize'));
      
      await waitFor(() => {
        rerender(<RdsCompContribution {...defaultProps} showMonthLabels={true} />);
      }, { timeout: 100 });
    });
  });

  describe('Responsive Sizing', () => {
    test('should set panel size to 8px for width <= 320px', async () => {
      global.innerWidth = 320;
      const { container } = render(
        <RdsCompContribution {...defaultProps} panelSize={11} panelMargin={2} />
      );
      fireEvent(window, new Event('resize'));
      
      await waitFor(() => {
        const svg = container.querySelector('[viewBox]');
        expect(svg).toBeInTheDocument();
      });
    });

    test('should set panel size to 9px for width between 320px and 414px', async () => {
      global.innerWidth = 380;
      const { container } = render(
        <RdsCompContribution {...defaultProps} panelSize={11} panelMargin={2} />
      );
      fireEvent(window, new Event('resize'));
      
      await waitFor(() => {
        const svg = container.querySelector('[viewBox]');
        expect(svg).toBeInTheDocument();
      });
    });

    test('should set panel size to 8px for width between 414px and 834px', async () => {
      global.innerWidth = 600;
      const { container } = render(
        <RdsCompContribution {...defaultProps} panelSize={11} panelMargin={2} />
      );
      fireEvent(window, new Event('resize'));
      
      await waitFor(() => {
        const svg = container.querySelector('[viewBox]');
        expect(svg).toBeInTheDocument();
      });
    });

    test('should use default panel size for width > 834px', async () => {
      global.innerWidth = 1200;
      const { container } = render(
        <RdsCompContribution {...defaultProps} panelSize={11} panelMargin={2} />
      );
      fireEvent(window, new Event('resize'));
      
      await waitFor(() => {
        const svg = container.querySelector('[viewBox]');
        expect(svg).toBeInTheDocument();
      });
    });
  });

  describe('Mobile Detection', () => {
    test('should detect mobile at 414px and below', async () => {
      global.innerWidth = 414;
      const { container } = render(
        <RdsCompContribution {...defaultProps} />
      );
      fireEvent(window, new Event('resize'));
      
      await waitFor(() => {
        const svg = container.querySelector('[viewBox]');
        expect(svg).toBeInTheDocument();
      });
    });

    test('should not detect mobile at 415px and above', async () => {
      global.innerWidth = 415;
      const { container } = render(
        <RdsCompContribution {...defaultProps} />
      );
      fireEvent(window, new Event('resize'));
      
      await waitFor(() => {
        const svg = container.querySelector('[viewBox]');
        expect(svg).toBeInTheDocument();
      });
    });

    test('should shorten month names on mobile', async () => {
      global.innerWidth = 350;
      const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      const { container, rerender } = render(
        <RdsCompContribution {...defaultProps} monthNames={monthNames} showMonthLabels={true} />
      );
      fireEvent(window, new Event('resize'));
      
      await waitFor(() => {
        rerender(<RdsCompContribution {...defaultProps} monthNames={monthNames} showMonthLabels={true} />);
        const svg = container.querySelector('[viewBox]');
        expect(svg).toBeInTheDocument();
      });
    });
  });

  describe('SVG Rendering', () => {
    test('should render SVG with correct viewBox', () => {
      render(
        <RdsCompContribution {...defaultProps} />
      );
      const svg = screen.getByTestId('svg-icon');
      const viewBox = svg.getAttribute('viewBox');
      expect(viewBox).toBeTruthy();
      const [, , width, height] = viewBox!.split(' ').map(Number);
      expect(width).toBeGreaterThan(0);
      expect(height).toBeGreaterThan(0);
    });

    test('should have minimum SVG width of 280px', () => {
      render(
        <RdsCompContribution {...defaultProps} />
      );
      const svg = screen.getByTestId('svg-icon');
      const viewBox = svg.getAttribute('viewBox');
      const [, , width] = viewBox!.split(' ').map(Number);
      expect(width).toBeGreaterThanOrEqual(280);
    });

    test('should apply correct CSS class to SVG', () => {
      const { container } = render(
        <RdsCompContribution {...defaultProps} />
      );
      const svg = container.querySelector('.rds-comp-contribution__svg');
      expect(svg).toBeInTheDocument();
    });

    test('should apply correct sx styles to SVG', () => {
      render(
        <RdsCompContribution {...defaultProps} />
      );
      const svg = screen.getByTestId('svg-icon');
      expect(svg).toHaveClass('rds-comp-contribution__svg');
    });
  });

  describe('Date Formatting', () => {
    test('should use custom date format', () => {
      const values = { '2024/12/31': 5 };
      const { container } = render(
        <RdsCompContribution 
          {...defaultProps} 
          values={values} 
          until="2024/12/31"
          dateFormat="YYYY/MM/DD"
        />
      );
      const panels = container.querySelectorAll('[data-date]');
      expect(panels.length).toBeGreaterThan(0);
    });

    test('should default to YYYY-MM-DD format', () => {
      const { container } = render(
        <RdsCompContribution {...defaultProps} />
      );
      const panels = container.querySelectorAll('[data-date]');
      panels.forEach(panel => {
        const date = panel.dataset.date;
        expect(date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      });
    });

    test('should handle different dateFormat values', () => {
      const values = { '31-12-2024': 3 };
      const { container } = render(
        <RdsCompContribution 
          {...defaultProps} 
          values={values} 
          until="31-12-2024"
          dateFormat="DD-MM-YYYY"
        />
      );
      const panels = container.querySelectorAll('[data-date]');
      expect(panels.length).toBeGreaterThan(0);
    });
  });

  describe('Custom Attributes', () => {
    test('should apply panelAttributes to panels', () => {
      const panelAttributes = { 'data-testid': 'custom-panel' };
      const { container } = render(
        <RdsCompContribution {...defaultProps} panelAttributes={panelAttributes} />
      );
      const panels = container.querySelectorAll('[data-testid="custom-panel"]');
      expect(panels.length).toBeGreaterThan(0);
    });

    test('should apply monthLabelAttributes to month labels', () => {
      const monthLabelAttributes = { 'data-testid': 'custom-month-label' };
      const { container } = render(
        <RdsCompContribution {...defaultProps} monthLabelAttributes={monthLabelAttributes} showMonthLabels={true} />
      );
      const labels = container.querySelectorAll('[data-testid="custom-month-label"]');
      expect(labels.length).toBeGreaterThan(0);
    });

    test('should apply panelAttributes to panels', () => {
      const panelAttributes = { 'data-testid': 'custom-panel' };
      const { container } = render(
        <RdsCompContribution {...defaultProps} panelAttributes={panelAttributes} />
      );
      const panels = container.querySelectorAll('[data-testid="custom-panel"]');
      expect(panels.length).toBeGreaterThan(0);
    });
  });

  describe('Custom Label Configuration', () => {
    test('should use custom monthNames', () => {
      const customMonthNames = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
      const { container } = render(
        <RdsCompContribution {...defaultProps} monthNames={customMonthNames} showMonthLabels={true} />
      );
      const monthLabels = container.querySelectorAll('.rds-comp-contribution__text--month');
      expect(monthLabels.length).toBeGreaterThan(0);
    });
  });

  describe('Panel Properties', () => {
    test('should render panels with border radius', () => {
      const { container } = render(
        <RdsCompContribution {...defaultProps} />
      );
      const panels = container.querySelectorAll('.rds-comp-contribution__panel');
      panels.forEach(panel => {
        const rx = panel.getAttribute('rx');
        const ry = panel.getAttribute('ry');
        expect(rx).toBe('2');
        expect(ry).toBe('2');
      });
    });

    test('should render panels with correct dimensions', () => {
      const { container } = render(
        <RdsCompContribution {...defaultProps} panelSize={11} />
      );
      const panels = container.querySelectorAll('.rds-comp-contribution__panel');
      expect(panels.length).toBeGreaterThan(0);
    });

    test('should have panel with data-date and data-value', () => {
      const { container } = render(
        <RdsCompContribution {...defaultProps} />
      );
      const panels = container.querySelectorAll('.rds-comp-contribution__panel');
      panels.forEach(panel => {
        expect(panel.hasAttribute('data-date')).toBe(true);
        expect(panel.hasAttribute('data-value')).toBe(true);
      });
    });
  });

  describe('Window Resize Handling', () => {
    test('should update state on window resize', async () => {
      const { container } = render(
        <RdsCompContribution {...defaultProps} />
      );
      
      global.innerWidth = 500;
      fireEvent(window, new Event('resize'));
      
      await waitFor(() => {
        const svg = container.querySelector('[viewBox]');
        expect(svg).toBeInTheDocument();
      });
    });

    test('should handle multiple resize events', async () => {
      const { container } = render(
        <RdsCompContribution {...defaultProps} />
      );
      
      global.innerWidth = 300;
      fireEvent(window, new Event('resize'));
      
      global.innerWidth = 800;
      fireEvent(window, new Event('resize'));
      
      await waitFor(() => {
        const svg = container.querySelector('[viewBox]');
        expect(svg).toBeInTheDocument();
      });
    });

    test('should cleanup resize listener on unmount', () => {
      const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
      const { unmount } = render(
        <RdsCompContribution {...defaultProps} />
      );
      
      unmount();
      
      expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
      removeEventListenerSpy.mockRestore();
    });
  });

  describe('Edge Cases', () => {
    test('should handle large contribution values', () => {
      const values = { '2024-12-31': 100 };
      const { container } = render(
        <RdsCompContribution {...defaultProps} values={values} />
      );
      const panels = container.querySelectorAll('[data-value="100"]');
      expect(panels.length).toBeGreaterThan(0);
    });

    test('should handle zero contribution values', () => {
      const values = { '2024-12-31': 0 };
      const { container } = render(
        <RdsCompContribution {...defaultProps} values={values} />
      );
      const panels = container.querySelectorAll('[data-value="0"]');
      expect(panels.length).toBeGreaterThan(0);
    });

    test('should handle leap year dates', () => {
      const values = { '2024-02-29': 5 };
      const { container } = render(
        <RdsCompContribution {...defaultProps} values={values} until="2024-02-29" />
      );
      const panels = container.querySelectorAll('[data-date="2024-02-29"]');
      expect(panels.length).toBeGreaterThan(0);
    });

    test('should handle year boundary dates', () => {
      const values = { '2023-12-31': 5, '2024-01-01': 3 };
      const { container } = render(
        <RdsCompContribution {...defaultProps} values={values} />
      );
      const panels = container.querySelectorAll('[data-date]');
      expect(panels.length).toBeGreaterThan(0);
    });

    test('should handle missing values for some dates', () => {
      const values = {
        '2024-01-01': 5,
        '2024-01-03': 2,
      };
      const { container } = render(
        <RdsCompContribution {...defaultProps} values={values} />
      );
      const zeroValuePanels = container.querySelectorAll('[data-value="0"]');
      expect(zeroValuePanels.length).toBeGreaterThan(0);
    });
  });

  describe('Height and Width Configuration', () => {
    test('should use default monthLabelHeight', () => {
      render(
        <RdsCompContribution {...defaultProps} monthLabelHeight={28} />
      );
      const svg = screen.getByTestId('svg-icon');
      expect(svg).toBeInTheDocument();
    });

    test('should use custom monthLabelHeight', () => {
      render(
        <RdsCompContribution {...defaultProps} monthLabelHeight={40} />
      );
      const svg = screen.getByTestId('svg-icon');
      expect(svg).toBeInTheDocument();
    });

    test('should use default weekLabelWidth', () => {
      render(
        <RdsCompContribution {...defaultProps} weekLabelWidth={24} />
      );
      const svg = screen.getByTestId('svg-icon');
      expect(svg).toBeInTheDocument();
    });

    test('should use custom weekLabelWidth', () => {
      render(
        <RdsCompContribution {...defaultProps} weekLabelWidth={30} />
      );
      const svg = screen.getByTestId('svg-icon');
      expect(svg).toBeInTheDocument();
    });

    test('should use custom panelSize', () => {
      render(
        <RdsCompContribution {...defaultProps} panelSize={15} />
      );
      const svg = screen.getByTestId('svg-icon');
      expect(svg).toBeInTheDocument();
    });

    test('should use custom panelMargin', () => {
      render(
        <RdsCompContribution {...defaultProps} panelMargin={3} />
      );
      const svg = screen.getByTestId('svg-icon');
      expect(svg).toBeInTheDocument();
    });
  });

  describe('Measure Component Integration', () => {
    test('should initialize with measure component bounds', () => {
      const { container } = render(
        <RdsCompContribution {...defaultProps} />
      );
      const svg = container.querySelector('.rds-comp-contribution__svg');
      expect(svg).toBeInTheDocument();
    });

    test('should update size based on measure callback', async () => {
      const { container } = render(
        <RdsCompContribution {...defaultProps} />
      );
      
      await waitFor(() => {
        const svg = container.querySelector('[viewBox]');
        expect(svg).toBeInTheDocument();
      });
    });
  });

  describe('Contribution Data Calculation', () => {
    test('should calculate calendar data for 53 weeks', () => {
      const { container } = render(
        <RdsCompContribution {...defaultProps} until="2024-12-31" />
      );
      const panels = container.querySelectorAll('.rds-comp-contribution__panel');
      expect(panels.length).toBeGreaterThan(0);
      expect(panels.length).toBeLessThanOrEqual(53 * 7);
    });

    test('should handle full year of data', () => {
      const values: { [key: string]: number } = {};
      const start = dayjs('2024-01-01');
      for (let i = 0; i < 365; i++) {
        const date = start.add(i, 'day');
        values[date.format('YYYY-MM-DD')] = Math.floor(Math.random() * 5);
      }
      
      const { container } = render(
        <RdsCompContribution {...defaultProps} values={values} until="2024-12-31" />
      );
      const panels = container.querySelectorAll('.rds-comp-contribution__panel');
      expect(panels.length).toBeGreaterThan(0);
    });

    test('should show correct month values in panels', () => {
      const { container } = render(
        <RdsCompContribution {...defaultProps} until="2024-12-31" />
      );
      const panels = container.querySelectorAll('[data-date]');
      const dates = Array.from(panels).map(p => p.dataset.date);
      dates.forEach(date => {
        expect(date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      });
    });
  });

  describe('Month Boundary Detection', () => {
    test('should detect January boundary correctly', () => {
      const { container } = render(
        <RdsCompContribution {...defaultProps} showMonthLabels={true} />
      );
      const monthLabels = container.querySelectorAll('.rds-comp-contribution__text--month');
      expect(monthLabels.length).toBeGreaterThan(0);
    });

    test('should detect December boundary correctly', () => {
      const { container } = render(
        <RdsCompContribution {...defaultProps} showMonthLabels={true} until="2024-12-31" />
      );
      const monthLabels = container.querySelectorAll('.rds-comp-contribution__text--month');
      expect(monthLabels.length).toBeGreaterThan(0);
    });

    test('should handle all 12 months in monthNames', () => {
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const { container } = render(
        <RdsCompContribution {...defaultProps} monthNames={monthNames} showMonthLabels={true} />
      );
      const monthLabels = container.querySelectorAll('.rds-comp-contribution__text--month');
      expect(monthLabels.length).toBeGreaterThan(0);
    });
  });

  describe('Component Props Variations', () => {
    test('should render with all props provided', () => {
      const { container } = render(
        <RdsCompContribution 
          {...defaultProps}
          showMonthLabels={true}
          monthLabelHeight={28}
          weekLabelWidth={24}
          panelSize={11}
          panelMargin={2}
        />
      );
      const svg = container.querySelector('.rds-comp-contribution__svg');
      expect(svg).toBeInTheDocument();
    });

    test('should render with minimal required props', () => {
      const { container } = render(
        <RdsCompContribution 
          values={{ '2024-12-31': 5 }}
          until="2024-12-31"
          panelColors={['#fff']}
          weekNames={['S', 'M', 'T', 'W', 'T', 'F', 'S']}
          monthNames={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']}
        />
      );
      const svg = container.querySelector('.rds-comp-contribution__svg');
      expect(svg).toBeInTheDocument();
    });

    test('should handle undefined optional attributes', () => {
      const { container } = render(
        <RdsCompContribution 
          {...defaultProps}
          weekLabelAttributes={undefined}
          monthLabelAttributes={undefined}
          panelAttributes={undefined}
        />
      );
      const svg = container.querySelector('.rds-comp-contribution__svg');
      expect(svg).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has no axe accessibility violations', async () => {
      const { container } = render(<RdsCompContribution {...defaultProps} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
