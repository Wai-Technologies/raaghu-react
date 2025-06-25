import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompCustomerReviews from '../src/rds-comp-customer-reviews/rds-comp-customer-reviews';

// Mock the child components used in RdsCompCustomerReviews
jest.mock('../src/rds-elements', () => ({
  RdsLabel: ({ label }: any) => <div data-testid="rds-label">{label}</div>,
  RdsProgressBar: ({ 
    progressWidth, 
    colorVariant, 
    height, 
    role, 
    steps, 
    completedSteps 
  }: any) => (
    <div 
      data-testid="rds-progress-bar"
      data-progress={progressWidth}
      data-color={colorVariant}
      data-height={height}
      data-role={role}
    >
      Progress: {progressWidth}%
    </div>
  ),
  RdsRating: ({ rating }: any) => <div data-testid="rds-rating">Rating: {rating}</div>,
  RdsCompIcon: ({ 
    name, 
    fill, 
    stroke, 
    height, 
    width, 
    colorVariant 
  }: any) => (
    <div 
      data-testid={`icon-${name}`}
      style={{ height, width }}
      data-fill={fill}
      data-stroke={stroke}
      data-color={colorVariant}
    >
      {name}
    </div>
  )
}));

describe('RdsCompCustomerReviews Component', () => {
  // Sample test data
  const testItemList = [
    { value: 5, count: 50 },
    { value: 4, count: 30 },
    { value: 3, count: 15 },
    { value: 2, count: 5 },
    { value: 1, count: 0 }
  ];

  it('renders without crashing', () => {
    const { container } = render(<RdsCompCustomerReviews itemList={testItemList} />);
    expect(container).toBeTruthy();
  });

  it('displays the product title and rating', () => {
    render(<RdsCompCustomerReviews itemList={testItemList} />);
    
    // Check for product name header
    expect(screen.getByText('Product Name')).toBeInTheDocument();
    
    // Check for rating component
    const ratingComponent = screen.getByTestId('rds-rating');
    expect(ratingComponent).toBeInTheDocument();
    expect(ratingComponent).toHaveTextContent('Rating: 4');
  });

  it('renders correct number of rating bars', () => {
    render(<RdsCompCustomerReviews itemList={testItemList} />);
    
    // There should be one progress bar for each item in the list
    const progressBars = screen.getAllByTestId('rds-progress-bar');
    expect(progressBars).toHaveLength(testItemList.length);
  });
  it('calculates and displays correct percentage values', () => {
    render(<RdsCompCustomerReviews itemList={testItemList} />);
    
    // Calculate expected percentages for each rating
    const totalCount = testItemList.reduce((sum, item) => sum + item.count, 0);
    const expectedPercentages = testItemList
      .map(item => Math.round((100 * item.count) / totalCount).toString())
      .reverse(); // Component displays them in reverse order
    
    // Get all labels that contain percentage values
    const allLabels = screen.getAllByTestId('rds-label');
    
    // The percentage labels are every second label (after the rating value labels)
    const percentageLabels = [];
    for (let i = 0; i < testItemList.length; i++) {
      // For each rating item, we have two labels - rating value and percentage
      // So percentages are at positions 1, 3, 5, etc. in the flattened array
      percentageLabels.push(allLabels[i * 2 + 1]);
    }
    
    const renderedPercentages = percentageLabels.map(label => label.textContent);
    expect(renderedPercentages).toEqual(expectedPercentages);
  });

  it('configures progress bars with correct properties', () => {
    render(<RdsCompCustomerReviews itemList={testItemList} />);
    
    const progressBars = screen.getAllByTestId('rds-progress-bar');
    
    // Verify properties of the progress bars
    progressBars.forEach(bar => {
      expect(bar).toHaveAttribute('data-color', 'warning');
      expect(bar).toHaveAttribute('data-role', 'single');
      expect(bar).toHaveAttribute('data-height', '15');
    });
  });

  it('renders star icons for each rating row', () => {
    render(<RdsCompCustomerReviews itemList={testItemList} />);
    
    const starIcons = screen.getAllByTestId('icon-star');
    expect(starIcons).toHaveLength(testItemList.length);
    
    starIcons.forEach(icon => {
      expect(icon).toHaveAttribute('data-color', 'review');
      expect(icon).toHaveAttribute('data-fill', 'true');
      expect(icon).toHaveAttribute('data-stroke', 'true');
    });
  });
  it('renders items in reverse order (highest rating first)', () => {
    render(<RdsCompCustomerReviews itemList={testItemList} />);
    
    // Get all rating value labels - they are at positions 0, 2, 4, etc.
    const allLabels = screen.getAllByTestId('rds-label');
    const ratingLabels = [];
    for (let i = 0; i < testItemList.length; i++) {
      ratingLabels.push(allLabels[i * 2]);
    }
    
    const renderedRatingValues = ratingLabels.map(label => label.textContent);
    
    // Expected values should be in reverse order of the input
    const expectedValues = testItemList
      .map(item => item.value.toString())
      .reverse();
    
    expect(renderedRatingValues).toEqual(expectedValues);
  });

  it('handles empty itemList properly', () => {
    const { container } = render(<RdsCompCustomerReviews itemList={[]} />);
    
    // Should render the component without crashing
    expect(container).toBeTruthy();
    
    // Should still display the product title and rating
    expect(screen.getByText('Product Name')).toBeInTheDocument();
    expect(screen.getByTestId('rds-rating')).toBeInTheDocument();
    
    // Should not render any progress bars
    expect(screen.queryAllByTestId('rds-progress-bar')).toHaveLength(0);
  });  it('handles itemList with zero counts properly', () => {
    const zeroCountList = [
      { value: 5, count: 0 },
      { value: 4, count: 0 },
      { value: 3, count: 0 }
    ];
    
    render(<RdsCompCustomerReviews itemList={zeroCountList} />);
    
    // Should display progress bars
    const progressBars = screen.getAllByTestId('rds-progress-bar');
    expect(progressBars).toHaveLength(zeroCountList.length);
    
    // When all counts are zero, division by zero would result in NaN,
    // which the component should handle by showing 0 progress
    progressBars.forEach(bar => {
      const progress = parseInt(bar.getAttribute('data-progress') || 'NaN', 10);
      expect(isNaN(progress)).toBe(false); // Should not be NaN
      expect(progress).toBe(0); // Should be 0 when all counts are 0
    });
    
    // Also check the percentage labels - they should all show 0
    const allLabels = screen.getAllByTestId('rds-label');
    
    // Get only the percentage labels (skip the rating value labels)
    // Every other label starting from index 1 should be a percentage
    for (let i = 0; i < zeroCountList.length; i++) {
      const percentageLabel = allLabels[i * 2 + 1]; // Get percentage labels at odd indices
      expect(percentageLabel.textContent).toBe('0'); // Should be "0" with our fix
    }
  });

  it('handles a single item in the itemList properly', () => {
    const singleItemList = [{ value: 4, count: 10 }];
    
    render(<RdsCompCustomerReviews itemList={singleItemList} />);
    
    // Should display just one progress bar with 100% progress
    const progressBars = screen.getAllByTestId('rds-progress-bar');
    expect(progressBars).toHaveLength(1);
    expect(progressBars[0]).toHaveAttribute('data-progress', '100');
  });
});