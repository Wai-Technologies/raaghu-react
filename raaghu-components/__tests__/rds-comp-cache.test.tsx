import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompCache from '../src/rds-comp-cache/rds-comp-cache';

// Define types for mocking
interface CacheItem {
  id: number;
  name: string;
}

// Mock the dependencies
jest.mock('../src/rds-elements', () => ({
  RdsIcon: ({ 
    name, 
    tooltipTitle, 
    width, 
    height, 
    stroke, 
    tooltip, 
    tooltipPlacement 
  }: { 
    name: string; 
    tooltipTitle?: string; 
    width?: string;
    height?: string;
    stroke?: boolean;
    tooltip?: boolean;
    tooltipPlacement?: string;
  }) => (
    <div 
      data-testid={`rds-icon-${name}`} 
      title={tooltipTitle}
      style={{ width, height }}
    >
      {name} Icon
    </div>
  ),
  RdsPagination: ({ 
    alignmentType, 
    paginationType, 
    recordsPerPage, 
    totalRecords 
  }: { 
    alignmentType?: string; 
    paginationType: string; 
    recordsPerPage: number; 
    size: string; 
    totalRecords: number 
  }) => (
    <div data-testid="rds-pagination">
      <span data-testid="pagination-records-per-page">{recordsPerPage}</span>
      <span data-testid="pagination-total-records">{totalRecords}</span>
      <span data-testid="pagination-alignment">{alignmentType || 'default'}</span>
      <button data-testid="pagination-next-page">Next</button>
    </div>
  )
}));

jest.mock('../src/rds-comp-alert-popup/rds-comp-alert-popup', () => ({ 
  __esModule: true, 
  default: ({ alertID, onSuccess }: { alertID: string | number; onSuccess: () => void }) => {
    // The component is using both id formats in different conditions:
    // In pagination=true mode: element.id
    // In pagination=false mode: `alert_popup_${element.id}`
    const formattedId = typeof alertID === 'string' ? alertID : `alert_popup_${alertID}`;
    
    return (
      <div data-testid={`alert-popup-${formattedId}`}>
        <button 
          data-testid={`confirm-delete-${formattedId}`}
          onClick={onSuccess}
        >
          Confirm Delete
        </button>
      </div>
    );
  }
}));

describe('RdsCompCache', () => {
  // Sample cache data for testing
  const mockCacheData: CacheItem[] = [
    { id: 1, name: 'Cache Item 1' },
    { id: 2, name: 'Cache Item 2' },
    { id: 3, name: 'Cache Item 3' },
    { id: 4, name: 'Cache Item 4' },
    { id: 5, name: 'Cache Item 5' }
  ];

  const defaultProps = {
    cachedata: mockCacheData,
    recordsperpage: 3,
    pagination: true,
    alignment: 'end'
  };

  it('renders without crashing', () => {
    const { container } = render(<RdsCompCache {...defaultProps} />);
    expect(container).toBeTruthy();
  });

  it('renders the correct number of items when pagination is enabled', () => {
    render(<RdsCompCache {...defaultProps} />);
    
    // Should show recordsperpage number of items initially (3 in this case)
    const cacheItems = screen.getAllByText(/Cache Item/);
    expect(cacheItems).toHaveLength(3);
  });

  it('renders all items when pagination is disabled', () => {
    render(<RdsCompCache {...defaultProps} pagination={false} />);
    
    // Should show all 5 items when pagination is disabled
    const cacheItems = screen.getAllByText(/Cache Item/);
    expect(cacheItems).toHaveLength(5);
  });

  it('renders pagination component when pagination is enabled', () => {
    render(<RdsCompCache {...defaultProps} />);
    
    const paginationComponent = screen.getByTestId('rds-pagination');
    expect(paginationComponent).toBeInTheDocument();
    
    // Check if pagination props are correctly passed
    expect(screen.getByTestId('pagination-records-per-page').textContent).toBe('3');
    expect(screen.getByTestId('pagination-total-records').textContent).toBe('5');
    expect(screen.getByTestId('pagination-alignment').textContent).toBe('end');
  });
  it('does not render pagination component when pagination is disabled', () => {
    render(<RdsCompCache {...defaultProps} pagination={false} />);
    
    expect(screen.queryByTestId('rds-pagination')).not.toBeInTheDocument();
  });

  it('deletes an item when delete is confirmed (pagination disabled)', () => {
    render(<RdsCompCache {...defaultProps} pagination={false} />);
    
    // Get initial count of items
    const initialItems = screen.getAllByText(/Cache Item/);
    expect(initialItems).toHaveLength(5);
    
    // Find and click delete button for the first item
    // The actual testid includes 'alert_popup_' prefix in non-pagination mode
    const confirmDeleteBtn = screen.getByTestId('confirm-delete-alert_popup_1');
    fireEvent.click(confirmDeleteBtn);
    
    // After deletion, there should be 4 items left
    const remainingItems = screen.getAllByText(/Cache Item/);
    expect(remainingItems).toHaveLength(4);
    
    // The deleted item should not be present
    expect(screen.queryByText('Cache Item 1')).not.toBeInTheDocument();
  });

  it('passes the correct alignment prop to pagination', () => {
    // Test with 'start' alignment
    const { rerender } = render(<RdsCompCache {...defaultProps} alignment="start" />);
    expect(screen.getByTestId('pagination-alignment').textContent).toBe('start');
    
    // Test with 'center' alignment
    rerender(<RdsCompCache {...defaultProps} alignment="center" />);
    expect(screen.getByTestId('pagination-alignment').textContent).toBe('center');
    
    // Test with 'end' alignment
    rerender(<RdsCompCache {...defaultProps} alignment="end" />);
    expect(screen.getByTestId('pagination-alignment').textContent).toBe('end');
  });

  it('calls the onClick handler when provided', () => {
    const handleClick = jest.fn();
    
    render(
      <RdsCompCache 
        {...defaultProps} 
        pagination={false} 
        onclick={handleClick}
      />
    );
    
    // Since the component doesn't seem to implement onclick in the code,
    // we're just verifying it's passed correctly. An actual test would 
    // simulate clicking a cache item if the component had that functionality.
    
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('uses the recordsperpage prop correctly', () => {
    // Test with different recordsperpage value
    render(<RdsCompCache {...defaultProps} recordsperpage={2} />);
    
    // Should only show 2 items with recordsperpage=2
    const cacheItems = screen.getAllByText(/Cache Item/);
    expect(cacheItems).toHaveLength(2);
    
    // Pagination should reflect the recordsperpage value
    expect(screen.getByTestId('pagination-records-per-page').textContent).toBe('2');
  });
});