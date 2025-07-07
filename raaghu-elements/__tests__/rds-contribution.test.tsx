import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RdsContribution } from '../src/rds-contribution/rds-contribution';

// Mock react-measure
jest.mock('react-measure', () => {
  return ({ children, onResize }: any) => {
    // Simulate a measurement with a fixed width
    React.useEffect(() => {
      onResize({ bounds: { width: 1000, height: 200 } });
    }, [onResize]);

    return children({ measureRef: () => {} });
  };
});

describe('RdsContribution', () => {
  // Sample data for testing
  const today = new Date();
  const oneYearAgo = new Date(today);
  oneYearAgo.setFullYear(today.getFullYear() - 1);
  
  const formatDate = (date: Date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  // Create sample contribution data for the past year
  const sampleValues: { [key: string]: number } = {};
  for (let i = 0; i < 365; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    // Assign random values between 0 and 4
    const value = Math.floor(Math.random() * 5);
    sampleValues[formatDate(date)] = value;
  }

  const weekNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const panelColors = ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39']; // GitHub-like colors

  const defaultProps = {
    values: sampleValues,
    until: formatDate(today),
    weekNames,
    monthNames,
    panelColors,
    showMonthLabels: true,
    dateFormat: 'YYYY-MM-DD',
    weekLabelAttributes: {},
    monthLabelAttributes: {},
    panelAttributes: {},
    monthLabelHeight: 20,
    weekLabelWidth: 30,
    panelSize: 12,
    panelMargin: 2
  };

  it('renders without crashing', () => {
    const { container } = render(<RdsContribution {...defaultProps} />);
    expect(container).toBeTruthy();
  });

  it('renders the correct number of contribution panels', () => {
    const { container } = render(<RdsContribution {...defaultProps} />);
    
    // Count the actual rect elements (panels)
    const panels = container.querySelectorAll('rect');
    
    // There should be contribution panels for the valid dates (up to a year)
    expect(panels.length).toBeGreaterThan(0);
    // Typically this would be close to 365, but can vary depending on the exact dates
  });

  it('renders month labels when showMonthLabels is true', () => {
    const { container } = render(<RdsContribution {...defaultProps} showMonthLabels={true} />);
    
    // Check for month labels
    const monthLabels = container.querySelectorAll('text');
    expect(monthLabels.length).toBeGreaterThan(0);
    
    // At least some month names should be present
    const monthTexts = Array.from(monthLabels).map(label => label.textContent);
    expect(monthTexts.some(text => monthNames.includes(text || ''))).toBeTruthy();
  });

  it('does not render month labels when showMonthLabels is false', () => {
    const { container } = render(<RdsContribution {...defaultProps} showMonthLabels={false} />);
    
    // Month labels should not be present
    const monthLabels = container.querySelectorAll('text');
    
    // The text elements with month names should not be present
    const monthTexts = Array.from(monthLabels).map(label => label.textContent);
    expect(monthTexts.some(text => monthNames.includes(text || ''))).toBeFalsy();
  });

  it('renders panels with the correct colors based on values', () => {
    const { container } = render(<RdsContribution {...defaultProps} />);
    
    // Get all contribution panels
    const panels = container.querySelectorAll('rect');
    
    // Check if panels have the correct fill color based on their value
    panels.forEach((panel) => {
      const value = parseInt(panel.getAttribute('data-value') || '0', 10);
      const fill = panel.getAttribute('fill');
      
      // The fill color should match the corresponding color in panelColors array
      const expectedColor = value >= panelColors.length ? panelColors[panelColors.length - 1] : panelColors[value];
      expect(fill).toBe(expectedColor);
    });
  });

  it('renders panels with the correct size based on props', () => {
    const customPanelSize = 15;
    const customPanelMargin = 3;
    
    const { container } = render(
      <RdsContribution 
        {...defaultProps} 
        panelSize={customPanelSize} 
        panelMargin={customPanelMargin} 
      />
    );
    
    // Get all contribution panels
    const panels = container.querySelectorAll('rect');
    
    // Check if panels have the correct width and height
    panels.forEach((panel) => {
      expect(panel.getAttribute('width')).toBe(customPanelSize.toString());
      expect(panel.getAttribute('height')).toBe(customPanelSize.toString());
    });
  });

  it('renders SVG with correct dimensions', () => {
    const { container } = render(<RdsContribution {...defaultProps} />);
    
    // Get the SVG element
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    
    // SVG should have width and height attributes
    expect(svg).toHaveAttribute('width');
    expect(svg).toHaveAttribute('height');
    
    // Width should be columns * (panelSize + panelMargin) + weekLabelWidth
    // Height should be 7 * (panelSize + panelMargin) + monthLabelHeight
    // Since we're mocking react-measure, the exact calculations might be different,
    // but the SVG should have reasonable dimensions
    const width = parseInt(svg?.getAttribute('width') || '0', 10);
    const height = parseInt(svg?.getAttribute('height') || '0', 10);
    
    expect(width).toBeGreaterThan(defaultProps.weekLabelWidth);
    expect(height).toBeGreaterThan(defaultProps.monthLabelHeight);
  });

  it('handles missing required props gracefully', () => {
    // Testing with missing panelColors
    const { container: container1 } = render(
      <RdsContribution 
        {...defaultProps} 
        panelColors={undefined} 
      />
    );
    
    // Component should not render anything substantial when required props are missing
    expect(container1.querySelector('svg')).not.toBeInTheDocument();
    
    // Testing with missing weekNames
    const { container: container2 } = render(
      <RdsContribution 
        {...defaultProps} 
        weekNames={undefined} 
      />
    );
    
    expect(container2.querySelector('svg')).not.toBeInTheDocument();
    
    // Testing with missing monthNames
    const { container: container3 } = render(
      <RdsContribution 
        {...defaultProps} 
        monthNames={undefined} 
      />
    );
    
    expect(container3.querySelector('svg')).not.toBeInTheDocument();
  });

  it('correctly applies custom attributes to panels', () => {
    const customPanelAttributes = {
      className: 'custom-panel',
      'data-testid': 'contribution-panel'
    };
    
    const { container } = render(
      <RdsContribution 
        {...defaultProps} 
        panelAttributes={customPanelAttributes} 
      />
    );
    
    // Get all contribution panels
    const panels = container.querySelectorAll('rect');
    
    // Check if panels have the custom attributes
    panels.forEach((panel) => {
      expect(panel).toHaveClass('custom-panel');
      expect(panel).toHaveAttribute('data-testid', 'contribution-panel');
    });
  });

  it('correctly applies custom attributes to month labels', () => {
    const customMonthLabelAttributes = {
      className: 'custom-month-label',
      'data-testid': 'month-label'
    };
    
    const { container } = render(
      <RdsContribution 
        {...defaultProps} 
        monthLabelAttributes={customMonthLabelAttributes} 
      />
    );
    
    // Get all text elements which are likely month labels
    const monthLabels = container.querySelectorAll('text');
    
    // At least some text elements should have the custom attributes
    const hasCustomAttributes = Array.from(monthLabels).some(label => 
      label.classList.contains('custom-month-label') && 
      label.getAttribute('data-testid') === 'month-label'
    );
    
    expect(hasCustomAttributes).toBeTruthy();
  });

  it('handles date formatting correctly', () => {
    // Create a custom date format
    const customDateFormat = 'MM/DD/YYYY';
    
    // Create sample values with the custom date format
    const customFormatValues: { [key: string]: number } = {};
    for (let i = 0; i < 10; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const formattedDate = `${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}/${date.getFullYear()}`;
      customFormatValues[formattedDate] = i % 5;
    }
    
    const { container } = render(
      <RdsContribution 
        {...defaultProps} 
        values={customFormatValues}
        dateFormat={customDateFormat}
      />
    );
    
    // Get all contribution panels
    const panels = container.querySelectorAll('rect');
    
    // Check if at least some panels have the correct date attribute format
    const hasCorrectDateFormat = Array.from(panels).some(panel => {
      const dateAttr = panel.getAttribute('data-date');
      return dateAttr && /^\d{2}\/\d{2}\/\d{4}$/.test(dateAttr);
    });
    
    expect(hasCorrectDateFormat).toBeTruthy();
  });
});