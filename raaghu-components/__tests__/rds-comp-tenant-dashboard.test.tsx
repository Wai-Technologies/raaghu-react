import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompTenantDashboard from '../src/rds-comp-tenant-dashboard/rds-comp-tenant-dashboard';

// Mock chart.js
jest.mock('chart.js', () => ({
  ScriptableContext: class {
    static toString() {
      return 'ScriptableContext';
    }
  }
}));

// Mock the RDS elements
jest.mock('../src/rds-elements', () => ({
  RdsCompBigNumber: (props: any) => (
    <div data-testid="rds-comp-big-number" data-number={props.bigNumber}>
      {props.bigNumber}
    </div>
  ),
  RdsProgressBar: (props: any) => (
    <div 
      data-testid="rds-progress-bar"
      data-progress={props.progress}
      data-height={props.height}
      data-color-variant={props.colorVariant}
    >
      Progress: {props.progress}%
    </div>
  ),
  RdsRadarChart: (props: any) => (
    <div 
      data-testid={`rds-radar-chart-${props.id}`}
      data-chart-id={props.id}
    >
      Radar Chart: {props.id}
    </div>
  ),
  RdsTable: (props: any) => (
    <div data-testid="rds-table">
      Table with {props.tableHeaders?.length || 0} headers and {props.tableData?.length || 0} rows
    </div>
  ),
  RdsWidget: (props: any) => (
    <div 
      data-testid="rds-widget" 
      data-header-title={props.headerTitle}
      data-is-refresh-required={props.isRefreshRequired ? 'true' : 'false'}
      data-color-variant={props.colorVariant}
      data-is-card-stretch={props.isCardStretch ? 'true' : 'false'}
      className={props.class}
    >
      <div data-testid="widget-header">{props.headerTitle}</div>
      <div data-testid="widget-content">{props.children}</div>
    </div>
  ),
  RdsLineChart: (props: any) => (
    <div 
      data-testid={`rds-line-chart-${props.id}`}
      data-chart-id={props.id}
      data-labels={props.labels?.join(',')}
      data-datasets-count={props.dataSets?.length}
    >
      Line Chart: {props.id}
    </div>
  ),
  RdsDoughnutChart: (props: any) => (
    <div 
      data-testid={`rds-doughnut-chart-${props.id}`}
      data-chart-id={props.id}
      data-labels={props.labels?.join(',')}
      data-datasets-count={props.dataSets?.length}
    >
      Doughnut Chart: {props.id}
    </div>
  ),
  RdsBooleanChart: (props: any) => (
    <div 
      data-testid={`rds-boolean-chart-${props.id}`}
      data-chart-id={props.id}
    >
      Boolean Chart: {props.id}
    </div>
  ),
  RdsBarChart: (props: any) => (
    <div 
      data-testid={`rds-bar-chart-${props.id}`}
      data-chart-id={props.id}
      data-labels={props.labels?.join(',')}
      data-datasets-count={props.dataSets?.length}
    >
      Bar Chart: {props.id}
    </div>
  )
}));

describe('RdsCompTenantDashboard Component', () => {
  
  // Basic Rendering Tests
  describe('Basic Rendering', () => {
    it('renders without crashing', () => {
      render(<RdsCompTenantDashboard />);
      
      // Check if the main container is rendered
      const dashboardContainer = screen.getByText((content, element) => {
        return element?.className?.includes('dashboard') || false;
      });
      expect(dashboardContainer).toBeInTheDocument();
    });

    it('renders all required widgets', () => {
      render(<RdsCompTenantDashboard />);
      
      // Check if all widgets are rendered
      const widgets = screen.getAllByTestId('rds-widget');
      // The component has multiple widgets
      expect(widgets.length).toBeGreaterThan(0);
      
      // Check specific widgets by their titles
      const monthlySummaryWidget = screen.getByText('Monthly Summary');
      expect(monthlySummaryWidget).toBeInTheDocument();
      
      const licenseWidget = screen.getByText('License');
      expect(licenseWidget).toBeInTheDocument();
    });
  });

  // Chart Components Tests
  describe('Chart Components', () => {
    it('renders LineChart component', () => {
      render(<RdsCompTenantDashboard />);
      
      // The component uses LineChart with id "linechart"
      const lineCharts = screen.getAllByTestId((id) => id.startsWith('rds-line-chart'));
      expect(lineCharts.length).toBeGreaterThan(0);
    });

    it('renders RadarChart component', () => {
      render(<RdsCompTenantDashboard />);
      
      // The component uses RadarChart with id "newRadar"
      const radarChart = screen.getByTestId('rds-radar-chart-newRadar');
      expect(radarChart).toBeInTheDocument();
    });

    it('renders BigNumber component', () => {
      render(<RdsCompTenantDashboard />);
      
      // Check if BigNumber is rendered
      const bigNumbers = screen.getAllByTestId('rds-comp-big-number');
      expect(bigNumbers.length).toBeGreaterThan(0);
      
      // Check if at least one BigNumber has the value "10"
      const bigNumber10 = screen.getByText('10');
      expect(bigNumber10).toBeInTheDocument();
    });
  });

  // Widget Properties Tests
  describe('Widget Properties', () => {
    it('configures Monthly Summary widget correctly', () => {
      render(<RdsCompTenantDashboard />);
      
      // Find the Monthly Summary widget
      const widgets = screen.getAllByTestId('rds-widget');
      const monthlySummaryWidget = widgets.find(widget => 
        widget.getAttribute('data-header-title') === 'Monthly Summary'
      );
      
      expect(monthlySummaryWidget).toBeDefined();
      expect(monthlySummaryWidget).toHaveAttribute('data-is-refresh-required', 'true');
      expect(monthlySummaryWidget).toHaveAttribute('data-color-variant', 'white');
      expect(monthlySummaryWidget).toHaveAttribute('data-is-card-stretch', 'true');
    });

    it('configures License widget correctly', () => {
      render(<RdsCompTenantDashboard />);
      
      // Find the License widget
      const widgets = screen.getAllByTestId('rds-widget');
      const licenseWidget = widgets.find(widget => 
        widget.getAttribute('data-header-title') === 'License'
      );
      
      expect(licenseWidget).toBeDefined();
      expect(licenseWidget).toHaveAttribute('data-is-card-stretch', 'true');
    });
  });

  // Structure Tests
  describe('Dashboard Structure', () => {
    it('has the correct layout structure', () => {
      const { container } = render(<RdsCompTenantDashboard />);
      
      // Check for row structure
      const rows = container.querySelectorAll('.row');
      expect(rows.length).toBeGreaterThan(0);
      
      // Check for column structure
      const columns = container.querySelectorAll('[class*="col-"]');
      expect(columns.length).toBeGreaterThan(0);
    });
  });

  // Data Tests
  describe('Chart Data', () => {
    it('passes correct data to LineChart', () => {
      render(<RdsCompTenantDashboard />);
      
      const lineCharts = screen.getAllByTestId((id) => id.startsWith('rds-line-chart'));
      
      // Check that at least one line chart has appropriate labels
      const chartWithMonths = lineCharts.find(chart => {
        const labels = chart.getAttribute('data-labels');
        return labels && labels.includes('Jan,Feb,Mar,Apr');
      });
      
      expect(chartWithMonths).toBeDefined();
      // Check that the chart has multiple datasets
      expect(chartWithMonths).toHaveAttribute('data-datasets-count', expect.stringMatching(/[2-9]/)); // Should have at least 2 datasets
    });
  });

  // Accessibility Tests
  describe('Accessibility', () => {
    it('has proper semantic structure', () => {
      const { container } = render(<RdsCompTenantDashboard />);
      
      // Check for proper headings
      const headings = container.querySelectorAll('h2, h3, h4, h5, h6');
      expect(headings.length).toBeGreaterThan(0);
    });
  });
});
