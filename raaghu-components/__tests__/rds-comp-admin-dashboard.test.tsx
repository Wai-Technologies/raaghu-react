import React, { ChangeEvent } from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';

// Define interfaces for component props
interface RdsWidgetProps {
  children: React.ReactNode;
  headerTitle: string;
  isButtonGroupRequired?: boolean;
  buttonGroupList?: any[];
  handleButtonClick?: (event: ChangeEvent<HTMLInputElement>) => void;
  isRefreshRequired?: boolean;
  isCardStretch?: boolean;
  height?: string;
}

interface RdsLineChartProps {
  id: string;
  labels?: string[];
  options?: any;
}

interface RdsBigNumberProps {
  bigNumber: string;
}

// Mock the child components
jest.mock('../src/rds-elements', () => ({
  RdsProgressBar: () => <div data-testid="progress-bar">Progress Bar</div>,
  RdsWidget: ({ 
    children, 
    headerTitle, 
    isButtonGroupRequired, 
    buttonGroupList, 
    handleButtonClick 
  }: RdsWidgetProps) => (
    <div data-testid={`widget-${headerTitle}`}>
      <div data-testid="widget-header">
        <h3 data-testid="widget-title">{headerTitle}</h3>
        {isButtonGroupRequired && buttonGroupList && (
          <div data-testid="button-group">
            {buttonGroupList.map((button, index) => (
              <input
                key={index}
                type="radio"
                id={button.id}
                name={button.name}
                checked={button.checked}
                onChange={handleButtonClick}
                data-testid={`button-${button.label}`}
              />
            ))}
          </div>
        )}
      </div>
      <div data-testid="widget-content">{children}</div>
    </div>  ),
  RdsLineChart: ({ id }: { id: string }) => (
    <div data-testid={`line-chart-${id}`}>Line Chart</div>
  ),
  RdsBigNumber: ({ bigNumber }: { bigNumber: string }) => (
    <div data-testid="big-number">{bigNumber}</div>
  ),
  RdsDoughnutChart: () => <div data-testid="doughnut-chart">Doughnut Chart</div>,
  RdsBooleanChart: () => <div data-testid="boolean-chart">Boolean Chart</div>,
  RdsBarChart: () => <div data-testid="bar-chart">Bar Chart</div>,
  RdsTable: () => <div data-testid="table">Table</div>,
  RdsIcon: () => <div data-testid="icon">Icon</div>,
  RdsMap: () => <div data-testid="map">Map</div>
}));

// Mock chart.js dependency
jest.mock('chart.js', () => ({
  ScriptableContext: {}
}));

// Import the actual component after mocking
import RdsCompAdminDashboard from '../src/rds-comp-admin-dashboard/rds-comp-admin-dashboard';

describe('RdsCompAdminDashboard', () => {
  const defaultProps = {
    user: 'admin'
  };
  // Test 1: Render component and verify it displays correctly
  it('renders admin dashboard component', () => {
    render(<RdsCompAdminDashboard {...defaultProps} />);
    
    // Check for widgets
    expect(screen.getByTestId('widget-Daily Summary')).toBeInTheDocument();
    expect(screen.getByTestId('widget-Maximum Profit')).toBeInTheDocument();
    
    // Check for charts - using getAllBy to handle multiple instances
    expect(screen.getAllByTestId('line-chart-linechart')[0]).toBeInTheDocument();
    expect(screen.getAllByTestId('big-number')).not.toHaveLength(0);
  });
  
  // Test 2: Check button group functionality
  it('renders button group for time period selection', () => {
    render(<RdsCompAdminDashboard {...defaultProps} />);
    
    // Check that the button group is rendered
    expect(screen.getByTestId('button-group')).toBeInTheDocument();
    
    // Check that the buttons are rendered
    expect(screen.getByTestId('button-Day')).toBeInTheDocument();
    expect(screen.getByTestId('button-Week')).toBeInTheDocument();
    expect(screen.getByTestId('button-Month')).toBeInTheDocument();
    
    // Check that the Day button is checked by default
    expect(screen.getByTestId('button-Day')).toBeChecked();
  });  // Test 3: Check chart rendering
  it('renders charts and visualizations', () => {
    render(<RdsCompAdminDashboard {...defaultProps} />);
    
    // Check for different chart types - using getAllBy to handle multiple instances
    expect(screen.getAllByTestId('line-chart-linechart')[0]).toBeInTheDocument();
    expect(screen.getByTestId('doughnut-chart')).toBeInTheDocument();
    
    // Get all boolean charts and verify at least one exists
    const booleanCharts = screen.getAllByTestId('boolean-chart');
    expect(booleanCharts.length).toBeGreaterThan(0);
    expect(booleanCharts[0]).toBeInTheDocument();
    
    // Get all maps and verify at least one exists
    const maps = screen.getAllByTestId('map');
    expect(maps.length).toBeGreaterThan(0);
    expect(maps[0]).toBeInTheDocument();
  });
  
  // Test 4: Check widget titles
  it('displays correct widget titles', () => {
    render(<RdsCompAdminDashboard {...defaultProps} />);
    
    // Get all widget titles
    const widgetTitles = screen.getAllByTestId('widget-title');
    
    // Check for expected titles
    const expectedTitles = ['Daily Summary', 'Maximum Profit'];
    
    // Check that each expected title is present
    expectedTitles.forEach(title => {
      const titleElement = widgetTitles.find(element => element.textContent === title);
      expect(titleElement).toBeTruthy();
    });
  });
    // Test 5: Check big number display
  it('displays big number correctly', () => {
    render(<RdsCompAdminDashboard {...defaultProps} />);
    
    // Find the specific big number within the Maximum Profit widget
    const maximumProfitWidget = screen.getByTestId('widget-Maximum Profit');
    const bigNumber = within(maximumProfitWidget).getByTestId('big-number');
    
    expect(bigNumber).toBeInTheDocument();
    expect(bigNumber).toHaveTextContent('$8,425');
  });
  
  // Test 6: Test time period selection
  it('handles time period selection', () => {
    render(<RdsCompAdminDashboard {...defaultProps} />);
    
    // Get buttons
    const dayButton = screen.getByTestId('button-Day');
    const weekButton = screen.getByTestId('button-Week');
    const monthButton = screen.getByTestId('button-Month');
    
    // Check initial state
    expect(dayButton).toBeChecked();
    expect(weekButton).not.toBeChecked();
    expect(monthButton).not.toBeChecked();
    
    // Click week button
    fireEvent.click(weekButton);
    
    // After clicking the week button, it should be checked
    expect(weekButton).toBeChecked();
    expect(dayButton).not.toBeChecked();
    
    // Click month button
    fireEvent.click(monthButton);
    
    // After clicking the month button, it should be checked
    expect(monthButton).toBeChecked();
    expect(weekButton).not.toBeChecked();
    
    // Click day button again
    fireEvent.click(dayButton);
    
    // After clicking the day button, it should be checked
    expect(dayButton).toBeChecked();
    expect(monthButton).not.toBeChecked();
  });
});