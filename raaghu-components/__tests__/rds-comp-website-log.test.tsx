import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompWebsiteLog from '../src/rds-comp-website-log/rds-comp-website-log';

// Mock the dependencies
jest.mock('../src/rds-elements', () => ({
  RdsBadge: jest.fn(({ label, colorVariant, ...props }) => {
    // Create a unique ID based on content to avoid conflicts
    const uniqueId = `badge-${label?.toLowerCase()}-${Math.random().toString(36).substr(2, 9)}`;
    return (
      <span 
        data-testid={`badge-${label?.toLowerCase()}`}
        data-unique-id={uniqueId}
        className={`badge-${colorVariant}`}
        {...props}
      >
        {label}
      </span>
    );
  }),
  RdsPagination: jest.fn(({ 
    totalRecords, 
    recordsPerPage, 
    onPageChange, 
    paginationType, 
    alignmentType,
    ...props 
  }) => (
    <div 
      data-testid="rds-pagination-component"
      data-total-records={totalRecords}
      data-records-per-page={recordsPerPage}
      data-pagination-type={paginationType}
      data-alignment-type={alignmentType}
      {...props}
    >
      <button 
        data-testid="page-1"
        onClick={() => onPageChange && onPageChange(1, recordsPerPage)}
      >
        1
      </button>
      <button 
        data-testid="page-2"
        onClick={() => onPageChange && onPageChange(2, recordsPerPage)}
      >
        2
      </button>
      <button 
        data-testid="page-3"
        onClick={() => onPageChange && onPageChange(3, recordsPerPage)}
      >
        3
      </button>
    </div>
  )),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { changeLanguage: jest.fn() },
  }),
}));

describe('RdsCompWebsiteLog', () => {
  afterEach(() => {
    cleanup();
  });
  const mockWebsiteLogData = [
    { status: 'INFO', content: 'Application started successfully' },
    { status: 'WARN', content: 'Memory usage is above 80%' },
    { status: 'ERROR', content: 'Database connection failed' },
    { status: 'SUCCESS', content: 'User authentication completed' },
    { status: 'INFO', content: 'Processing user request' },
    { status: 'ERROR', content: 'Failed to save user data' },
    { status: 'WARN', content: 'API rate limit approaching' },
    { status: 'SUCCESS', content: 'Data backup completed' },
  ];

  const defaultProps = {
    websiteLogData: mockWebsiteLogData,
    pagination: true,
    alignmentType: 'center',
    totalRecords: mockWebsiteLogData.length,
    recordsPerPage: 5,
  };
  beforeEach(() => {
    jest.clearAllMocks();
    // Clean up any existing DOM elements
    document.body.innerHTML = '';
  });

  // Basic Rendering Tests
  describe('Basic Rendering', () => {
    it('renders without crashing', () => {
      render(<RdsCompWebsiteLog {...defaultProps} />);
      expect(screen.getByTestId('rds-pagination')).toBeInTheDocument();
    });

    it('renders the main container when data is provided', () => {
      render(<RdsCompWebsiteLog {...defaultProps} />);
      expect(screen.getByTestId('rds-comp-website-log')).toBeInTheDocument();
    });

    it('does not render the main container when no data is provided', () => {
      const propsWithNoData = { ...defaultProps, websiteLogData: [] };
      render(<RdsCompWebsiteLog {...propsWithNoData} />);
      expect(screen.queryByTestId('rds-comp-website-log')).not.toBeInTheDocument();
    });    it('renders all log entries when pagination is disabled', () => {
      const propsWithoutPagination = { ...defaultProps, pagination: false };
      render(<RdsCompWebsiteLog {...propsWithoutPagination} />);
      
      // Should render all 8 log entries - check by content instead of badges to avoid duplicate testIds
      expect(screen.getByText('Application started successfully')).toBeInTheDocument();
      expect(screen.getByText('Memory usage is above 80%')).toBeInTheDocument();
      expect(screen.getByText('Database connection failed')).toBeInTheDocument();
      expect(screen.getByText('User authentication completed')).toBeInTheDocument();
      expect(screen.getByText('Processing user request')).toBeInTheDocument();
      expect(screen.getByText('Failed to save user data')).toBeInTheDocument();
      expect(screen.getByText('API rate limit approaching')).toBeInTheDocument();
      expect(screen.getByText('Data backup completed')).toBeInTheDocument();
      
      // Check that we have the expected number of badges
      const infoBadges = screen.getAllByTestId('badge-info');
      const warnBadges = screen.getAllByTestId('badge-warn');
      const errorBadges = screen.getAllByTestId('badge-error');
      const successBadges = screen.getAllByTestId('badge-success');
      
      expect(infoBadges).toHaveLength(2); // 2 INFO entries
      expect(warnBadges).toHaveLength(2); // 2 WARN entries
      expect(errorBadges).toHaveLength(2); // 2 ERROR entries
      expect(successBadges).toHaveLength(2); // 2 SUCCESS entries
    });
  });

  // Badge Rendering Tests
  describe('Badge Rendering', () => {    it('renders badges with correct labels', () => {
      render(<RdsCompWebsiteLog {...defaultProps} />);
      
      // Use getAllBy to handle multiple elements with same testid
      const infoBadges = screen.getAllByTestId('badge-info');
      const warnBadges = screen.getAllByTestId('badge-warn');
      const errorBadges = screen.getAllByTestId('badge-error');
      const successBadges = screen.getAllByTestId('badge-success');
      
      expect(infoBadges[0]).toHaveTextContent('INFO');
      expect(warnBadges[0]).toHaveTextContent('WARN');
      expect(errorBadges[0]).toHaveTextContent('ERROR');
      expect(successBadges[0]).toHaveTextContent('SUCCESS');
    });

    it('applies correct color variants to badges', () => {
      render(<RdsCompWebsiteLog {...defaultProps} />);
      
      const infoBadges = screen.getAllByTestId('badge-info');
      const warnBadges = screen.getAllByTestId('badge-warn');
      const errorBadges = screen.getAllByTestId('badge-error');
      const successBadges = screen.getAllByTestId('badge-success');
      
      expect(infoBadges[0]).toHaveClass('badge-info');
      expect(warnBadges[0]).toHaveClass('badge-warning');
      expect(errorBadges[0]).toHaveClass('badge-danger');
      expect(successBadges[0]).toHaveClass('badge-success');
    });

    it('handles unknown status types with success variant', () => {
      const dataWithUnknownStatus = [
        { status: 'UNKNOWN', content: 'Unknown status message' },
      ];
      const propsWithUnknownStatus = { 
        ...defaultProps, 
        websiteLogData: dataWithUnknownStatus,
        recordsPerPage: 1 
      };
      
      render(<RdsCompWebsiteLog {...propsWithUnknownStatus} />);
      
      const unknownBadge = screen.getByText('UNKNOWN');
      expect(unknownBadge.closest('span')).toHaveClass('badge-success');
    });
  });

  // Content Display Tests
  describe('Content Display', () => {
    it('displays log content correctly', () => {
      render(<RdsCompWebsiteLog {...defaultProps} />);
      
      expect(screen.getByText('Application started successfully')).toBeInTheDocument();
      expect(screen.getByText('Memory usage is above 80%')).toBeInTheDocument();
      expect(screen.getByText('Database connection failed')).toBeInTheDocument();
    });    it('applies text-break class to content', () => {
      render(<RdsCompWebsiteLog {...defaultProps} />);
      
      const applicationStartedElement = screen.getByText('Application started successfully');
      const memoryUsageElement = screen.getByText('Memory usage is above 80%');
      
      expect(applicationStartedElement).toHaveClass('text-break');
      expect(memoryUsageElement).toHaveClass('text-break');
    });

    it('wraps content in small tag', () => {
      const { container } = render(<RdsCompWebsiteLog {...defaultProps} />);
      
      const smallElements = container.querySelectorAll('small');
      expect(smallElements.length).toBeGreaterThan(0);
      
      const firstSmallElement = smallElements[0];
      expect(firstSmallElement).toHaveTextContent('Application started successfully');
    });
  });

  // Pagination Tests
  describe('Pagination', () => {
    it('renders pagination component when pagination is enabled', () => {
      render(<RdsCompWebsiteLog {...defaultProps} />);
      expect(screen.getByTestId('rds-pagination-component')).toBeInTheDocument();
    });

    it('does not render pagination when pagination is disabled', () => {
      const propsWithoutPagination = { ...defaultProps, pagination: false };
      render(<RdsCompWebsiteLog {...propsWithoutPagination} />);
      expect(screen.queryByTestId('rds-pagination-component')).not.toBeInTheDocument();
    });

    it('passes correct props to pagination component', () => {
      render(<RdsCompWebsiteLog {...defaultProps} />);
      
      const paginationComponent = screen.getByTestId('rds-pagination-component');
      expect(paginationComponent).toHaveAttribute('data-total-records', mockWebsiteLogData.length.toString());
      expect(paginationComponent).toHaveAttribute('data-records-per-page', '5');
      expect(paginationComponent).toHaveAttribute('data-pagination-type', 'advanced');
      expect(paginationComponent).toHaveAttribute('data-alignment-type', 'center');
    });

    it('uses default records per page when not provided', () => {
      const propsWithoutRecordsPerPage = { ...defaultProps };
      delete (propsWithoutRecordsPerPage as any).recordsPerPage;
      
      render(<RdsCompWebsiteLog {...propsWithoutRecordsPerPage} />);
      
      const paginationComponent = screen.getByTestId('rds-pagination-component');
      expect(paginationComponent).toHaveAttribute('data-records-per-page', '5');
    });

    it('displays only records for current page', () => {
      render(<RdsCompWebsiteLog {...defaultProps} />);
      
      // Should show first 5 records initially
      expect(screen.getByText('Application started successfully')).toBeInTheDocument();
      expect(screen.getByText('Memory usage is above 80%')).toBeInTheDocument();
      expect(screen.getByText('Database connection failed')).toBeInTheDocument();
      expect(screen.getByText('User authentication completed')).toBeInTheDocument();
      expect(screen.getByText('Processing user request')).toBeInTheDocument();
      
      // Should not show records from page 2
      expect(screen.queryByText('Failed to save user data')).not.toBeInTheDocument();
    });    it('handles page change correctly', () => {
      // Use a custom dataset to ensure clear page boundaries
      const testData = [
        { status: 'INFO', content: 'Page 1 Record 1' },
        { status: 'WARN', content: 'Page 1 Record 2' },
        { status: 'ERROR', content: 'Page 1 Record 3' },
        { status: 'INFO', content: 'Page 2 Record 1' },
        { status: 'SUCCESS', content: 'Page 2 Record 2' },
      ];
      
      const testProps = { 
        ...defaultProps, 
        websiteLogData: testData,
        recordsPerPage: 3 
      };
      
      render(<RdsCompWebsiteLog {...testProps} />);
      
      // Initially should show first 3 records
      expect(screen.getByText('Page 1 Record 1')).toBeInTheDocument();
      expect(screen.getByText('Page 1 Record 2')).toBeInTheDocument();
      expect(screen.getByText('Page 1 Record 3')).toBeInTheDocument();
      expect(screen.queryByText('Page 2 Record 1')).not.toBeInTheDocument();
      
      // Click page 2
      const page2Button = screen.getByTestId('page-2');
      fireEvent.click(page2Button);
      
      // Should now show records from page 2
      expect(screen.queryByText('Page 1 Record 1')).not.toBeInTheDocument();
      expect(screen.getByText('Page 2 Record 1')).toBeInTheDocument();
      expect(screen.getByText('Page 2 Record 2')).toBeInTheDocument();
    });
  });

  // Layout Tests
  describe('Layout', () => {
    it('applies correct CSS classes for layout structure', () => {
      const { container } = render(<RdsCompWebsiteLog {...defaultProps} />);
      
      // Check main container
      expect(container.querySelector('.px-3')).toBeInTheDocument();
      
      // Check item layout
      expect(container.querySelector('.d-flex.align-items-center.gap-3.border-bottom.py-3')).toBeInTheDocument();
      
      // Check pagination wrapper
      expect(container.querySelector('.RdsCompDataTable__RdsPagination')).toBeInTheDocument();
      expect(container.querySelector('.pt-3')).toBeInTheDocument();
    });

    it('renders proper flex layout for log items', () => {
      const { container } = render(<RdsCompWebsiteLog {...defaultProps} />);
      
      const logItems = container.querySelectorAll('.d-flex.align-items-center.gap-3');
      expect(logItems.length).toBeGreaterThan(0);
      
      // Each log item should have badge and content sections
      logItems.forEach(item => {
        const badge = item.querySelector('span[class*="badge-"]');
        const content = item.querySelector('small.text-break');
        
        expect(badge).toBeInTheDocument();
        expect(content).toBeInTheDocument();
      });
    });
  });

  // Props Handling Tests
  describe('Props Handling', () => {
    it('handles undefined websiteLogData', () => {
      const propsWithUndefinedData = { ...defaultProps, websiteLogData: undefined as any };
      expect(() => render(<RdsCompWebsiteLog {...propsWithUndefinedData} />)).not.toThrow();
    });

    it('handles null websiteLogData', () => {
      const propsWithNullData = { ...defaultProps, websiteLogData: null as any };
      expect(() => render(<RdsCompWebsiteLog {...propsWithNullData} />)).not.toThrow();
    });

    it('handles empty websiteLogData array', () => {
      const propsWithEmptyData = { ...defaultProps, websiteLogData: [] };
      render(<RdsCompWebsiteLog {...propsWithEmptyData} />);
      
      expect(screen.queryByTestId('rds-comp-website-log')).not.toBeInTheDocument();
      expect(screen.getByTestId('rds-pagination')).toBeInTheDocument();
    });    it('handles different alignment types', () => {
      // Test left alignment
      const { rerender } = render(<RdsCompWebsiteLog {...defaultProps} alignmentType="left" />);
      let paginationComponent = screen.getByTestId('rds-pagination-component');
      expect(paginationComponent).toHaveAttribute('data-alignment-type', 'left');
      
      // Test center alignment
      rerender(<RdsCompWebsiteLog {...defaultProps} alignmentType="center" />);
      paginationComponent = screen.getByTestId('rds-pagination-component');
      expect(paginationComponent).toHaveAttribute('data-alignment-type', 'center');
      
      // Test right alignment
      rerender(<RdsCompWebsiteLog {...defaultProps} alignmentType="right" />);
      paginationComponent = screen.getByTestId('rds-pagination-component');
      expect(paginationComponent).toHaveAttribute('data-alignment-type', 'right');
    });    it('handles different records per page values', () => {
      // Test with 1 record per page
      const { rerender } = render(<RdsCompWebsiteLog {...defaultProps} recordsPerPage={1} />);
      let paginationComponent = screen.getByTestId('rds-pagination-component');
      expect(paginationComponent).toHaveAttribute('data-records-per-page', '1');
      
      // Test with 3 records per page
      rerender(<RdsCompWebsiteLog {...defaultProps} recordsPerPage={3} />);
      paginationComponent = screen.getByTestId('rds-pagination-component');
      expect(paginationComponent).toHaveAttribute('data-records-per-page', '3');
      
      // Test with 10 records per page
      rerender(<RdsCompWebsiteLog {...defaultProps} recordsPerPage={10} />);
      paginationComponent = screen.getByTestId('rds-pagination-component');
      expect(paginationComponent).toHaveAttribute('data-records-per-page', '10');
      
      // Test with 20 records per page
      rerender(<RdsCompWebsiteLog {...defaultProps} recordsPerPage={20} />);
      paginationComponent = screen.getByTestId('rds-pagination-component');
      expect(paginationComponent).toHaveAttribute('data-records-per-page', '20');
    });
  });

  // Edge Cases Tests
  describe('Edge Cases', () => {
    it('handles single log entry', () => {
      const singleLogData = [{ status: 'INFO', content: 'Single log entry' }];
      const propsWithSingleLog = { ...defaultProps, websiteLogData: singleLogData };
      
      render(<RdsCompWebsiteLog {...propsWithSingleLog} />);
      
      expect(screen.getByText('Single log entry')).toBeInTheDocument();
      expect(screen.getByTestId('badge-info')).toBeInTheDocument();
    });

    it('handles log entries with very long content', () => {
      const longContentData = [{
        status: 'ERROR',
        content: 'This is a very long error message that should be handled properly by the component and should wrap correctly with the text-break class applied to prevent layout issues'
      }];
      const propsWithLongContent = { ...defaultProps, websiteLogData: longContentData };
      
      render(<RdsCompWebsiteLog {...propsWithLongContent} />);
      
      const longContent = screen.getByText(/This is a very long error message/);
      expect(longContent).toBeInTheDocument();
      expect(longContent).toHaveClass('text-break');
    });

    it('handles log entries with special characters', () => {
      const specialCharData = [{
        status: 'WARN',
        content: 'Special characters: @#$%^&*()_+-=[]{}|;:,.<>?`~'
      }];
      const propsWithSpecialChars = { ...defaultProps, websiteLogData: specialCharData };
      
      render(<RdsCompWebsiteLog {...propsWithSpecialChars} />);
      
      expect(screen.getByText(/Special characters:/)).toBeInTheDocument();
    });

    it('handles log entries with empty content', () => {
      const emptyContentData = [
        { status: 'INFO', content: '' },
        { status: 'ERROR', content: '   ' },
      ];
      const propsWithEmptyContent = { ...defaultProps, websiteLogData: emptyContentData };
      
      expect(() => render(<RdsCompWebsiteLog {...propsWithEmptyContent} />)).not.toThrow();
    });

    it('handles log entries with missing properties', () => {
      const incompleteData = [
        { status: 'INFO' }, // Missing content
        { content: 'Missing status' }, // Missing status
        {}, // Missing both
      ];
      const propsWithIncompleteData = { ...defaultProps, websiteLogData: incompleteData };
      
      expect(() => render(<RdsCompWebsiteLog {...propsWithIncompleteData} />)).not.toThrow();
    });

    it('handles zero records per page', () => {
      const propsWithZeroRecords = { ...defaultProps, recordsPerPage: 0 };
      expect(() => render(<RdsCompWebsiteLog {...propsWithZeroRecords} />)).not.toThrow();
    });

    it('handles negative records per page', () => {
      const propsWithNegativeRecords = { ...defaultProps, recordsPerPage: -5 };
      expect(() => render(<RdsCompWebsiteLog {...propsWithNegativeRecords} />)).not.toThrow();
    });
  });

  // State Management Tests
  describe('State Management', () => {
    it('initializes row status correctly', () => {
      render(<RdsCompWebsiteLog {...defaultProps} />);
      
      // First page should show first 5 records (indices 0-4)
      expect(screen.getByText('Application started successfully')).toBeInTheDocument(); // index 0
      expect(screen.getByText('Processing user request')).toBeInTheDocument(); // index 4
      expect(screen.queryByText('Failed to save user data')).not.toBeInTheDocument(); // index 5
    });    it('updates row status on page change', () => {
      // Use simple test data for clear expectations
      const simpleTestData = [
        { status: 'INFO', content: 'First record' },
        { status: 'WARN', content: 'Second record' },
        { status: 'ERROR', content: 'Third record' },
        { status: 'SUCCESS', content: 'Fourth record' },
      ];
      
      const testProps = { 
        ...defaultProps, 
        websiteLogData: simpleTestData,
        recordsPerPage: 2 
      };
      
      render(<RdsCompWebsiteLog {...testProps} />);
      
      // Initially on page 1 - should show first 2 records
      expect(screen.getByText('First record')).toBeInTheDocument();
      expect(screen.getByText('Second record')).toBeInTheDocument();
      expect(screen.queryByText('Third record')).not.toBeInTheDocument();
      
      // Change to page 2
      const page2Button = screen.getByTestId('page-2');
      fireEvent.click(page2Button);
      
      // Should show records from page 2
      expect(screen.queryByText('First record')).not.toBeInTheDocument();
      expect(screen.queryByText('Second record')).not.toBeInTheDocument();
      expect(screen.getByText('Third record')).toBeInTheDocument();
      expect(screen.getByText('Fourth record')).toBeInTheDocument();
    });

    it('calculates row ranges correctly for different page sizes', () => {
      const propsWithDifferentPageSize = { ...defaultProps, recordsPerPage: 3 };
      render(<RdsCompWebsiteLog {...propsWithDifferentPageSize} />);
      
      // Should show first 3 records
      expect(screen.getByText('Application started successfully')).toBeInTheDocument(); // index 0
      expect(screen.getByText('Memory usage is above 80%')).toBeInTheDocument(); // index 1
      expect(screen.getByText('Database connection failed')).toBeInTheDocument(); // index 2
      expect(screen.queryByText('User authentication completed')).not.toBeInTheDocument(); // index 3
    });
  });

  // Performance Tests
  describe('Performance', () => {
    it('handles large datasets efficiently', () => {
      const largeDataset = Array.from({ length: 1000 }, (_, i) => ({
        status: ['INFO', 'WARN', 'ERROR', 'SUCCESS'][i % 4],
        content: `Log entry ${i + 1} with some sample content`,
      }));
      
      const propsWithLargeData = { 
        ...defaultProps, 
        websiteLogData: largeDataset,
        recordsPerPage: 10 
      };
      
      expect(() => render(<RdsCompWebsiteLog {...propsWithLargeData} />)).not.toThrow();
      
      // Should only render records for current page, not all 1000 records
      expect(screen.getByText('Log entry 1 with some sample content')).toBeInTheDocument();
      expect(screen.queryByText('Log entry 50 with some sample content')).not.toBeInTheDocument();
    });
  });

  // Integration Tests
  describe('Integration', () => {
    it('integrates pagination with log display correctly', () => {
      render(<RdsCompWebsiteLog {...defaultProps} />);
      
      // Initial state - page 1
      expect(screen.getByText('Application started successfully')).toBeInTheDocument();
      
      // Navigate to page 2
      fireEvent.click(screen.getByTestId('page-2'));
      
      // Check that content changed
      expect(screen.queryByText('Application started successfully')).not.toBeInTheDocument();
      expect(screen.getByText('Failed to save user data')).toBeInTheDocument();
      
      // Navigate back to page 1
      fireEvent.click(screen.getByTestId('page-1'));
      
      // Check that we're back to original content
      expect(screen.getByText('Application started successfully')).toBeInTheDocument();
      expect(screen.queryByText('Failed to save user data')).not.toBeInTheDocument();
    });
  });
});
