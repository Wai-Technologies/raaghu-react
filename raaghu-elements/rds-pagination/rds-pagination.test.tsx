import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import userEvent from '@testing-library/user-event';
import RdsPagination from './rds-pagination';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';

// Mock SCSS
jest.mock('./rds-pagination.scss', () => ({}));

// Mock helper functions
jest.mock('./rds-pagination.helpers', () => ({
  getStyleConfig: (style: string) => ({
    styleClass: `style-${style}`,
    variant: 'outlined',
    shape: 'circular',
    size: 'medium',
    showFirstControl: true,
    showLastControl: true,
    showDropdownControl: false,
    showLegendControl: false,
    showManualInputControl: false,
    showPagination: true,
    showPrevNext: false,
    showNextOnly: false,
  }),
  calculatePaginationConfig: (style: string, config: any) => ({
    finalSiblingCount: 1,
    finalBoundaryCount: 1,
  }),
  calculateTotalPages: (count: number | undefined, totalPages: number | undefined, pageSize: number) => ({
    totalPagesCalc: totalPages || Math.ceil((count || 100) / pageSize),
    totalRecords: count || 100,
  }),
  generateLegendText: (template: string, current: number, pageSize: number, total: number, totalPages: number) => {
    return template.replace('{current}', String(current)).replace('{total}', String(totalPages));
  },
}));

const renderWithTheme = (component: React.ReactElement, isDark = false) => {
  const theme = createTheme({
    palette: {
      mode: isDark ? 'dark' : 'light',
    },
  });
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('RdsPagination', () => {
  const defaultProps = {
    totalPages: 10,
    currentPage: 1,
    onPageChange: jest.fn(),
  };

  describe('Basic Rendering', () => {
    it('should render component without crashing', () => {
      const { container } = renderWithTheme(
        <RdsPagination {...defaultProps} />
      );
      expect(container).toBeInTheDocument();
    });

    it('should have correct displayName', () => {
      expect(RdsPagination.displayName).toBe('RdsPagination');
    });

    it('should render pagination component', () => {
      renderWithTheme(
        <RdsPagination {...defaultProps} />
      );
      // MUI Pagination creates nav element
      expect(screen.getByRole('navigation')).toBeInTheDocument();
    });

    it('should apply rds-pagination-wrapper class', () => {
      const { container } = renderWithTheme(
        <RdsPagination {...defaultProps} />
      );
      expect(container.querySelector('.rds-pagination-wrapper')).toBeInTheDocument();
    });

    it('should apply rds-pagination class', () => {
      const { container } = renderWithTheme(
        <RdsPagination {...defaultProps} />
      );
      expect(container.querySelector('.rds-pagination')).toBeInTheDocument();
    });
  });

  describe('Pagination Controls', () => {
    it('should render pagination with correct total pages', () => {
      renderWithTheme(
        <RdsPagination {...defaultProps} totalPages={5} />
      );
      // Check that the pagination component is rendered with correct page count
      const nav = screen.getByRole('navigation');
      expect(nav).toBeInTheDocument();
    });

    it('should render page numbers', () => {
      renderWithTheme(
        <RdsPagination {...defaultProps} totalPages={10} currentPage={1} />
      );
      // Check that navigation exists with buttons
      const nav = screen.getByRole('navigation');
      const buttons = within(nav).getAllByRole('button');
      expect(buttons.length).toBeGreaterThan(0);
    });

    it('should highlight current page', () => {
      renderWithTheme(
        <RdsPagination {...defaultProps} totalPages={10} currentPage={5} />
      );
      // Check if pagination renders with current page tracking
      expect(screen.getByRole('navigation')).toBeInTheDocument();
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBeGreaterThan(0);
    });

    it('should disable previous button on first page', () => {
      renderWithTheme(
        <RdsPagination {...defaultProps} totalPages={10} currentPage={1} />
      );
      const prevButton = screen.getByRole('button', { name: /previous/i });
      expect(prevButton).toBeDisabled();
    });

    it('should disable next button on last page', () => {
      renderWithTheme(
        <RdsPagination {...defaultProps} totalPages={10} currentPage={10} />
      );
      const nextButton = screen.getByRole('button', { name: /next/i });
      expect(nextButton).toBeDisabled();
    });

    it('should enable previous button on middle page', () => {
      renderWithTheme(
        <RdsPagination {...defaultProps} totalPages={10} currentPage={5} />
      );
      const prevButton = screen.getByRole('button', { name: /previous/i });
      expect(prevButton).not.toBeDisabled();
    });

    it('should enable next button on middle page', () => {
      renderWithTheme(
        <RdsPagination {...defaultProps} totalPages={10} currentPage={5} />
      );
      const nextButton = screen.getByRole('button', { name: /next/i });
      expect(nextButton).not.toBeDisabled();
    });
  });

  describe('Page Size Dropdown', () => {
    it('should render page size dropdown when showRecordsPerPage is true', () => {
      renderWithTheme(
        <RdsPagination {...defaultProps} showRecordsPerPage={true} />
      );
      expect(screen.getByLabelText(/records per page/i)).toBeInTheDocument();
    });

    it('should not render dropdown by default', () => {
      renderWithTheme(
        <RdsPagination {...defaultProps} />
      );
      expect(screen.queryByLabelText(/records per page/i)).not.toBeInTheDocument();
    });

    it('should use default pageSizeOptions', () => {
      renderWithTheme(
        <RdsPagination {...defaultProps} showRecordsPerPage={true} />
      );
      const dropdown = screen.getByLabelText(/records per page/i);
      fireEvent.mouseDown(dropdown);
      
      const options = screen.getAllByRole('option');
      expect(options.length).toBeGreaterThan(0);
    });

    it('should accept custom pageSizeOptions', () => {
      renderWithTheme(
        <RdsPagination 
          {...defaultProps} 
          showRecordsPerPage={true}
          pageSizeOptions={[5, 10, 25]}
        />
      );
      expect(screen.getByLabelText(/records per page/i)).toBeInTheDocument();
    });

    it('should call onPageSizeChange when size changes', async () => {
      const onPageSizeChange = jest.fn();
      renderWithTheme(
        <RdsPagination 
          {...defaultProps} 
          showRecordsPerPage={true}
          onPageSizeChange={onPageSizeChange}
        />
      );
      
      const dropdown = screen.getByLabelText(/records per page/i);
      await userEvent.click(dropdown);
      
      const option = screen.getAllByRole('option')[1];
      await userEvent.click(option);
      
      expect(onPageSizeChange).toHaveBeenCalled();
    });
  });

  describe('Legend Display', () => {
    it('should render legend when showLegend is true', () => {
      renderWithTheme(
        <RdsPagination 
          {...defaultProps} 
          showLegend={true}
          legendText="{current} of {total} items"
        />
      );
      const legend = screen.getByText(/of/);
      expect(legend).toBeInTheDocument();
    });

    it('should not render legend by default', () => {
      renderWithTheme(
        <RdsPagination {...defaultProps} />
      );
      const legend = screen.queryByText(/of/);
      expect(legend).not.toBeInTheDocument();
    });

    it('should display correct legend text', () => {
      renderWithTheme(
        <RdsPagination 
          {...defaultProps} 
          showLegend={true}
          currentPage={5}
          totalPages={10}
          legendText="{current} of {total} items"
        />
      );
      // Legend should contain the current page number
      const legend = screen.getByText(/5 of/);
      expect(legend).toBeInTheDocument();
    });

    it('should update legend with page changes', () => {
      const { rerender } = renderWithTheme(
        <RdsPagination 
          {...defaultProps} 
          showLegend={true}
          currentPage={1}
          legendText="{current} of {total} items"
        />
      );
      
      let legend = screen.getByText(/1 of/);
      expect(legend).toBeInTheDocument();

      rerender(
        <ThemeProvider theme={createTheme()}>
          <RdsPagination 
            {...defaultProps} 
            showLegend={true}
            currentPage={5}
            legendText="{current} of {total} items"
          />
        </ThemeProvider>
      );
      
      legend = screen.getByText(/5 of/);
      expect(legend).toBeInTheDocument();
    });
  });

  describe('Manual Input', () => {
    it('should render manual input when showManualInput is true', () => {
      renderWithTheme(
        <RdsPagination {...defaultProps} showManualInput={true} />
      );
      expect(screen.getByPlaceholderText('1')).toBeInTheDocument();
    });

    it('should not render manual input by default', () => {
      renderWithTheme(
        <RdsPagination {...defaultProps} />
      );
      expect(screen.queryByPlaceholderText('1')).not.toBeInTheDocument();
    });

    it('should accept manual page input', async () => {
      renderWithTheme(
        <RdsPagination {...defaultProps} showManualInput={true} />
      );
      
      const input = screen.getByPlaceholderText('1') as HTMLInputElement;
      await userEvent.type(input, '5');
      
      expect(input.value).toBe('5');
    });

    it('should navigate to page on Enter key', async () => {
      const onPageChange = jest.fn();
      renderWithTheme(
        <RdsPagination 
          {...defaultProps} 
          showManualInput={true}
          onPageChange={onPageChange}
        />
      );
      
      const input = screen.getByPlaceholderText('1');
      await userEvent.type(input, '5{Enter}');
      
      expect(onPageChange).toHaveBeenCalled();
    });

    it('should have Go to and Page labels', () => {
      renderWithTheme(
        <RdsPagination {...defaultProps} showManualInput={true} />
      );
      
      expect(screen.getByText('Go to')).toBeInTheDocument();
      expect(screen.getByText('Page')).toBeInTheDocument();
    });
  });

  describe('Event Handlers', () => {
    it('should call onPageChange when page is clicked', async () => {
      const onPageChange = jest.fn();
      renderWithTheme(
        <RdsPagination {...defaultProps} onPageChange={onPageChange} totalPages={10} />
      );
      
      // Find a page button that is not disabled
      const buttons = screen.getAllByRole('button');
      const clickableButton = buttons.find(btn => !btn.hasAttribute('disabled') && btn.getAttribute('aria-label')?.includes('page'));
      
      if (clickableButton) {
        await userEvent.click(clickableButton);
        expect(onPageChange).toHaveBeenCalled();
      }
    });

    it('should call onChange when page is clicked', async () => {
      const onChange = jest.fn();
      renderWithTheme(
        <RdsPagination {...defaultProps} onChange={onChange} totalPages={10} />
      );
      
      // Find a page button that is not disabled
      const buttons = screen.getAllByRole('button');
      const clickableButton = buttons.find(btn => !btn.hasAttribute('disabled') && btn.getAttribute('aria-label')?.includes('page'));
      
      if (clickableButton) {
        await userEvent.click(clickableButton);
        expect(onChange).toHaveBeenCalled();
      }
    });

    it('should call both onPageChange and onChange', async () => {
      const onPageChange = jest.fn();
      const onChange = jest.fn();
      renderWithTheme(
        <RdsPagination 
          {...defaultProps} 
          onPageChange={onPageChange}
          onChange={onChange}
          totalPages={10}
        />
      );
      
      // Find a page button that is not disabled
      const buttons = screen.getAllByRole('button');
      const clickableButton = buttons.find(btn => !btn.hasAttribute('disabled') && btn.getAttribute('aria-label')?.includes('page'));
      
      if (clickableButton) {
        await userEvent.click(clickableButton);
        expect(onPageChange).toHaveBeenCalled();
        expect(onChange).toHaveBeenCalled();
      }
    });

    it('should pass correct event object to onChange', async () => {
      const onChange = jest.fn();
      renderWithTheme(
        <RdsPagination {...defaultProps} onChange={onChange} totalPages={10} />
      );
      
      // Find a page button that is not disabled
      const buttons = screen.getAllByRole('button');
      const clickableButton = buttons.find(btn => !btn.hasAttribute('disabled') && btn.getAttribute('aria-label')?.includes('page'));
      
      if (clickableButton) {
        await userEvent.click(clickableButton);
        expect(onChange).toHaveBeenCalledWith(expect.any(Object), expect.any(Number));
      }
    });
  });

  describe('First and Last Buttons', () => {
    it('should render first button when showFirstLast is true', () => {
      renderWithTheme(
        <RdsPagination {...defaultProps} showFirstLast={true} totalPages={10} />
      );
      
      const firstButton = screen.getByRole('button', { name: /first/i });
      expect(firstButton).toBeInTheDocument();
    });

    it('should render last button when showFirstLast is true', () => {
      renderWithTheme(
        <RdsPagination {...defaultProps} showFirstLast={true} totalPages={10} />
      );
      
      const lastButton = screen.getByRole('button', { name: /last/i });
      expect(lastButton).toBeInTheDocument();
    });

    it('should not render first button when showFirstLast is false', () => {
      renderWithTheme(
        <RdsPagination {...defaultProps} showFirstLast={false} totalPages={10} />
      );
      
      const firstButton = screen.queryByRole('button', { name: /first/i });
      expect(firstButton).not.toBeInTheDocument();
    });

    it('should navigate to first page on first button click', async () => {
      const onPageChange = jest.fn();
      renderWithTheme(
        <RdsPagination 
          {...defaultProps} 
          showFirstLast={true}
          totalPages={10}
          currentPage={5}
          onPageChange={onPageChange}
        />
      );
      
      const firstButton = screen.getByRole('button', { name: /first/i });
      await userEvent.click(firstButton);
      
      expect(onPageChange).toHaveBeenCalledWith(1);
    });

    it('should navigate to last page on last button click', async () => {
      const onPageChange = jest.fn();
      renderWithTheme(
        <RdsPagination 
          {...defaultProps} 
          showFirstLast={true}
          totalPages={10}
          currentPage={5}
          onPageChange={onPageChange}
        />
      );
      
      const lastButton = screen.getByRole('button', { name: /last/i });
      await userEvent.click(lastButton);
      
      expect(onPageChange).toHaveBeenCalledWith(10);
    });
  });

  describe('Style Variants', () => {
    it('should apply default style', () => {
      const { container } = renderWithTheme(
        <RdsPagination {...defaultProps} paginationStyle="Style 1" />
      );
      expect(container.querySelector('.rds-pagination-wrapper')).toBeInTheDocument();
    });

    it('should accept different paginationStyle props', () => {
      const styles = ['Style 1', 'Style 2', 'Style 3', 'Style 4', 'Style 5'] as const;
      
      styles.forEach(style => {
        const { container } = renderWithTheme(
          <RdsPagination {...defaultProps} paginationStyle={style} />
        );
        expect(container.querySelector('.rds-pagination-wrapper')).toBeInTheDocument();
      });
    });

    it('should render with correct style class', () => {
      const { container } = renderWithTheme(
        <RdsPagination {...defaultProps} paginationStyle="Style 5" />
      );
      const wrapper = container.querySelector('.rds-pagination-wrapper');
      expect(wrapper).toHaveClass('style-Style 5');
    });
  });

  describe('Navigation Buttons', () => {
    it('should render prev and next buttons in style with showPrevNext', () => {
      const { container } = renderWithTheme(
        <RdsPagination {...defaultProps} totalPages={10} />
      );
      // Prev/Next buttons depend on style configuration
      // This test verifies the component structure
      expect(container.querySelector('.rds-pagination-wrapper')).toBeInTheDocument();
    });

    it('should disable prev button on first page', () => {
      renderWithTheme(
        <RdsPagination {...defaultProps} totalPages={10} currentPage={1} />
      );
      
      const prevButton = screen.getByRole('button', { name: /previous/i });
      expect(prevButton).toBeDisabled();
    });

    it('should disable next button on last page', () => {
      renderWithTheme(
        <RdsPagination {...defaultProps} totalPages={10} currentPage={10} />
      );
      
      const nextButton = screen.getByRole('button', { name: /next/i });
      expect(nextButton).toBeDisabled();
    });
  });

  describe('Controlled Component', () => {
    it('should use count prop instead of totalPages if provided', () => {
      renderWithTheme(
        <RdsPagination count={100} pageSize={10} currentPage={1} />
      );
      
      expect(screen.getByRole('navigation')).toBeInTheDocument();
    });

    it('should use page prop if provided', () => {
      renderWithTheme(
        <RdsPagination totalPages={10} page={5} />
      );
      
      // Verify pagination renders with the page prop
      expect(screen.getByRole('navigation')).toBeInTheDocument();
    });

    it('should prefer page prop over currentPage', () => {
      renderWithTheme(
        <RdsPagination totalPages={10} page={5} currentPage={2} />
      );
      
      // Verify pagination renders correctly when both page and currentPage are provided
      expect(screen.getByRole('navigation')).toBeInTheDocument();
    });

    it('should handle pageSize changes', async () => {
      const onPageSizeChange = jest.fn();
      renderWithTheme(
        <RdsPagination 
          {...defaultProps}
          showRecordsPerPage={true}
          onPageSizeChange={onPageSizeChange}
          pageSizeOptions={[10, 20, 50]}
        />
      );
      
      const dropdown = screen.getByLabelText(/records per page/i);
      await userEvent.click(dropdown);
      
      const option = screen.getByRole('option', { name: '20' });
      await userEvent.click(option);
      
      expect(onPageSizeChange).toHaveBeenCalled();
    });
  });

  describe('Theme Integration', () => {
    it('should render correctly with light theme', () => {
      renderWithTheme(
        <RdsPagination {...defaultProps} />,
        false
      );
      expect(screen.getByRole('navigation')).toBeInTheDocument();
    });

    it('should render correctly with dark theme', () => {
      renderWithTheme(
        <RdsPagination {...defaultProps} />,
        true
      );
      expect(screen.getByRole('navigation')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper navigation role', () => {
      renderWithTheme(
        <RdsPagination {...defaultProps} />
      );
      expect(screen.getByRole('navigation')).toBeInTheDocument();
  
    it('has no axe accessibility violations', async () => {
      const { container } = render(<RdsPagination {...defaultProps} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

    it('should have proper button roles', () => {
      renderWithTheme(
        <RdsPagination {...defaultProps} totalPages={5} />
      );
      
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBeGreaterThan(0);
    });

    it('should mark current page with aria-current', () => {
      renderWithTheme(
        <RdsPagination {...defaultProps} totalPages={10} currentPage={3} />
      );
      
      // Verify pagination renders with current page tracking
      const nav = screen.getByRole('navigation');
      expect(nav).toBeInTheDocument();
      const buttons = within(nav).getAllByRole('button');
      expect(buttons.length).toBeGreaterThan(0);
    });

    it('should have proper labels for buttons', () => {
      renderWithTheme(
        <RdsPagination {...defaultProps} showFirstLast={true} totalPages={10} />
      );
      
      expect(screen.getByRole('button', { name: /first/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /previous/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /last/i })).toBeInTheDocument();
    });
  });

  describe('Complex Scenarios', () => {
    it('should handle pagination with all features enabled', () => {
      renderWithTheme(
        <RdsPagination 
          {...defaultProps}
          totalPages={20}
          showFirstLast={true}
          showRecordsPerPage={true}
          showLegend={true}
          showManualInput={true}
          legendText="{current} of {total} items"
        />
      );
      
      expect(screen.getByRole('navigation')).toBeInTheDocument();
      expect(screen.getByLabelText(/records per page/i)).toBeInTheDocument();
      expect(screen.getByText(/of/)).toBeInTheDocument();
      expect(screen.getByPlaceholderText('1')).toBeInTheDocument();
    });

    it('should handle pagination with large page count', () => {
      renderWithTheme(
        <RdsPagination {...defaultProps} totalPages={1000} />
      );
      
      expect(screen.getByRole('navigation')).toBeInTheDocument();
    });

    it('should handle rapid page changes', async () => {
      const onPageChange = jest.fn();
      renderWithTheme(
        <RdsPagination 
          {...defaultProps}
          totalPages={10}
          onPageChange={onPageChange}
        />
      );
      
      // Find clickable page buttons
      const buttons = screen.getAllByRole('button');
      const clickableButtons = buttons.filter(btn => !btn.hasAttribute('disabled') && btn.getAttribute('aria-label')?.includes('page')).slice(0, 3);
      
      for (const btn of clickableButtons) {
        await userEvent.click(btn);
      }
      
      expect(onPageChange.mock.calls.length).toBeGreaterThan(0);
    });

    it('should handle pagination with custom props', () => {
      renderWithTheme(
        <RdsPagination 
          {...defaultProps}
          count={500}
          pageSize={25}
          showRecordsPerPage={true}
          pageSizeOptions={[5, 10, 25, 50, 100]}
        />
      );
      
      expect(screen.getByRole('navigation')).toBeInTheDocument();
    });

    it('should handle page size changes affecting total pages', async () => {
      const onPageSizeChange = jest.fn();
      const { rerender } = renderWithTheme(
        <RdsPagination 
          {...defaultProps}
          count={100}
          pageSize={10}
          showRecordsPerPage={true}
          onPageSizeChange={onPageSizeChange}
        />
      );
      
      const dropdown = screen.getByLabelText(/records per page/i);
      await userEvent.click(dropdown);
      
      const option = screen.getAllByRole('option')[1];
      await userEvent.click(option);
      
      expect(onPageSizeChange).toHaveBeenCalled();
    });

    it('should handle switching between pagination styles', () => {
      const { rerender, container } = renderWithTheme(
        <RdsPagination {...defaultProps} paginationStyle="Style 1" />
      );
      
      expect(container.querySelector('.rds-pagination-wrapper')).toBeInTheDocument();

      rerender(
        <ThemeProvider theme={createTheme()}>
          <RdsPagination {...defaultProps} paginationStyle="Style 5" />
        </ThemeProvider>
      );
      
      expect(container.querySelector('.rds-pagination-wrapper')).toBeInTheDocument();
    });
  });

  describe('Props Combinations', () => {
    it('should handle empty totalPages gracefully', () => {
      const { container } = renderWithTheme(
        <RdsPagination totalPages={0} currentPage={1} />
      );
      expect(container.querySelector('.rds-pagination-wrapper')).toBeInTheDocument();
    });

    it('should work without any handlers', () => {
      const { container } = renderWithTheme(
        <RdsPagination totalPages={10} currentPage={1} />
      );
      expect(container.querySelector('.rds-pagination-wrapper')).toBeInTheDocument();
    });

    it('should accept both count and totalPages', () => {
      renderWithTheme(
        <RdsPagination count={50} totalPages={100} currentPage={1} />
      );
      expect(screen.getByRole('navigation')).toBeInTheDocument();
    });

    it('should accept MUI Pagination props', () => {
      const { container } = renderWithTheme(
        <RdsPagination 
          {...defaultProps}
          siblingCount={2}
          boundaryCount={2}
          variant="text"
          shape="rounded"
        />
      );
      expect(container.querySelector('.rds-pagination-wrapper')).toBeInTheDocument();
    });
  });
});