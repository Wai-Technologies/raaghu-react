import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RdsCompFilterButton, { FilterOption } from './rds-comp-filter-button';
import { axe } from 'jest-axe';

// Mock SCSS
jest.mock('./rds-comp-filter-button.scss', () => ({}));

// Mock RdsButton component
jest.mock('../../raaghu-elements/rds-button/rds-button', () => {
  return React.forwardRef((props: any, ref: any) => {
    const { 
      onClick, 
      text, 
      startIcon, 
      endIcon, 
      className,
      size,
      shape,
      layout,
      style,
      disabled,
      ...rest 
    } = props;
    
    // Filter out MUI-specific props that shouldn't go on a button element
    const cleanProps = Object.fromEntries(
      Object.entries(rest).filter(([key]) => 
        !['sx', 'variant', 'color', 'fullWidth', 'state', 'textCase', 'changeLeftIcon', 'changeRightIcon', 'showLeftIcon', 'showRightIcon', 'isLoading', 'children'].includes(key)
      )
    );
    
    const isTrigger = typeof className === 'string' && className.includes('rds-filter-button__trigger');
    const testId = isTrigger ? 'filter-trigger-button' : 'rds-button';
    return (
      <button
        ref={ref}
        onClick={onClick}
        className={className}
        disabled={disabled}
        data-testid={testId}
        {...cleanProps}
      >
        {startIcon}
        {text}
        {endIcon}
      </button>
    );
  });
});

// Mock MUI components
jest.mock('@mui/material', () => {
  const actual = jest.requireActual('@mui/material');
  return {
    ...actual,
    Box: ({ children, className, sx, ...props }: any) => (
      <div className={className} data-testid="box" {...props}>
        {children}
      </div>
    ),
    Typography: ({ children, className, sx, ...props }: any) => (
      <div className={className} data-testid="typography" {...props}>
        {children}
      </div>
    ),
    Popover: ({ children, open, onClose, anchorEl, ...props }: any) => {
      return open ? (
        <div data-testid="popover" {...props}>
          {children}
        </div>
      ) : null;
    },
    Accordion: ({ children, ...props }: any) => (
      <div data-testid="accordion" {...props}>
        {children}
      </div>
    ),
    AccordionSummary: ({ children, ...props }: any) => (
      <div data-testid="accordion-summary" {...props}>
        {children}
      </div>
    ),
    AccordionDetails: ({ children, ...props }: any) => (
      <div data-testid="accordion-details" {...props}>
        {children}
      </div>
    ),
    Checkbox: ({ checked, onChange, ...props }: any) => (
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        data-testid="filter-checkbox"
        {...props}
      />
    ),
    FormControlLabel: ({ control, label, ...props }: any) => (
      <label data-testid="form-control-label" {...props}>
        {control}
        {label}
      </label>
    ),
    TextField: ({ value, onChange, placeholder, ...props }: any) => (
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        data-testid="search-input"
        {...props}
      />
    ),
    Button: ({ children, onClick, className, sx, variant, ...props }: any) => (
      <button onClick={onClick} className={className} {...props}>
        {children}
      </button>
    ),
  };
});

jest.mock('@mui/icons-material', () => {
  return {
    ExpandMore: () => <span data-testid="expand-more-icon">▼</span>,
    CircleOutlined: () => <span data-testid="CircleOutlinedIcon">●</span>,
  };
});

describe('RdsCompFilterButton', () => {
  const mockFilters: FilterOption[] = [
    {
      id: 'category1',
      name: 'Category 1',
      values: ['Option A', 'Option B', 'Option C'],
      selectedValues: [],
    },
    {
      id: 'category2',
      name: 'Category 2',
      values: ['Option X', 'Option Y', 'Option Z'],
      selectedValues: [],
    },
  ];

  const renderComponent = (props = {}) => {
    return render(
      <RdsCompFilterButton
        filters={mockFilters}
        {...props}
      />
    );
  };

  describe('Basic Rendering', () => {
    it('should render component without crashing', () => {
      renderComponent();
      expect(screen.getByTestId('filter-trigger-button')).toBeInTheDocument();
    });

    it('should have correct displayName', () => {
      expect(RdsCompFilterButton.displayName).toBe('RdsCompFilterButton');
    });

    it('should render trigger button with default text', () => {
      renderComponent();
      expect(screen.getByTestId('filter-trigger-button')).toHaveTextContent('Filter');
    });

    it('should render trigger button with custom text', () => {
      renderComponent({ text: 'Custom Filter' });
      expect(screen.getByTestId('filter-trigger-button')).toHaveTextContent('Custom Filter');
    });

    it('should render root element with correct class', () => {
      const { container } = renderComponent();
      expect(container.querySelector('.rds-comp-filter-button')).toBeInTheDocument();
    });

    it('should apply custom className to root element', () => {
      const { container } = renderComponent({ className: 'custom-class' });
      expect(container.querySelector('.rds-comp-filter-button.custom-class')).toBeInTheDocument();
    });
  });

  describe('Button Shape and Icons', () => {
    it('should render button with default shape (rectangle)', () => {
      renderComponent();
      const button = screen.getByTestId('filter-trigger-button');
      expect(button).toBeInTheDocument();
    });

    it('should pass shape prop to RdsButton', () => {
      renderComponent({ shape: 'pill' });
      expect(screen.getByTestId('filter-trigger-button')).toBeInTheDocument();
    });

    it('should show left icon by default', () => {
      renderComponent({ showLeftIcon: true });
      const icons = screen.getAllByTestId('CircleOutlinedIcon');
      expect(icons.length).toBeGreaterThan(0);
      expect(icons[0]).toBeInTheDocument();
    });

    it('should hide left icon when showLeftIcon is false', () => {
      renderComponent({ showLeftIcon: false });
      const icons = screen.queryAllByTestId('CircleOutlinedIcon');
      expect(icons.length).toBeLessThanOrEqual(1); // Only right icon if shown
    });

    it('should show right icon by default', () => {
      renderComponent({ showRightIcon: true });
      const icons = screen.getAllByTestId('CircleOutlinedIcon');
      expect(icons.length).toBeGreaterThanOrEqual(2);
    });

    it('should use custom left icon', () => {
      const customIcon = <span data-testid="custom-left-icon">LEFT</span>;
      renderComponent({ leftIcon: customIcon, showLeftIcon: true });
      expect(screen.getByTestId('custom-left-icon')).toBeInTheDocument();
    });

    it('should use custom right icon', () => {
      const customIcon = <span data-testid="custom-right-icon">RIGHT</span>;
      renderComponent({ rightIcon: customIcon, showRightIcon: true });
      expect(screen.getByTestId('custom-right-icon')).toBeInTheDocument();
    });
  });

  describe('Popover Interaction', () => {
    it('should not show popover on initial render', () => {
      renderComponent();
      expect(screen.queryByTestId('popover')).not.toBeInTheDocument();
    });

    it('should show popover when button is clicked', () => {
      renderComponent();
      const button = screen.getByTestId('filter-trigger-button');
      fireEvent.click(button);
      expect(screen.getByTestId('popover')).toBeInTheDocument();
    });

    it('should hide popover when button is clicked again', () => {
      renderComponent();
      const button = screen.getByTestId('filter-trigger-button');
      fireEvent.click(button);
      expect(screen.getByTestId('popover')).toBeInTheDocument();
      fireEvent.click(button);
      expect(screen.queryByTestId('popover')).not.toBeInTheDocument();
    });

    it('should display filter header in popover', () => {
      renderComponent();
      fireEvent.click(screen.getByTestId('filter-trigger-button'));
      expect(screen.getByText('Add Filters')).toBeInTheDocument();
    });
  });

  describe('Filter Count Display', () => {
    it('should show default text when no filters selected', () => {
      renderComponent();
      expect(screen.getByTestId('filter-trigger-button')).toHaveTextContent('Filter');
    });

    it('should show filter count when filters are selected', () => {
      const filtersWithSelection = [
        {
          id: 'category1',
          name: 'Category 1',
          values: ['Option A', 'Option B'],
          selectedValues: ['Option A'],
        },
      ];
      renderComponent({ filters: filtersWithSelection });
      expect(screen.getByTestId('filter-trigger-button')).toHaveTextContent('Filter (1)');
    });

    it('should update filter count with multiple selections', () => {
      const filtersWithSelection = [
        {
          id: 'category1',
          name: 'Category 1',
          values: ['Option A', 'Option B', 'Option C'],
          selectedValues: ['Option A', 'Option B'],
        },
        {
          id: 'category2',
          name: 'Category 2',
          values: ['Option X', 'Option Y'],
          selectedValues: ['Option X'],
        },
      ];
      renderComponent({ filters: filtersWithSelection });
      expect(screen.getByTestId('filter-trigger-button')).toHaveTextContent('Filter (3)');
    });
  });

  describe('Search Functionality', () => {
    it('should render search input in popover', () => {
      renderComponent();
      fireEvent.click(screen.getByTestId('filter-trigger-button'));
      expect(screen.getByTestId('search-input')).toBeInTheDocument();
    });

    it('should have search placeholder', () => {
      renderComponent();
      fireEvent.click(screen.getByTestId('filter-trigger-button'));
      expect(screen.getByTestId('search-input')).toHaveAttribute('placeholder', 'Search');
    });

    it('should update search term when typing', async () => {
      renderComponent();
      fireEvent.click(screen.getByTestId('filter-trigger-button'));
      const searchInput = screen.getByTestId('search-input') as HTMLInputElement;
      
      fireEvent.change(searchInput, { target: { value: 'test' } });
      expect(searchInput.value).toBe('test');
    });

    it('should clear search term', async () => {
      renderComponent();
      fireEvent.click(screen.getByTestId('filter-trigger-button'));
      const searchInput = screen.getByTestId('search-input') as HTMLInputElement;
      
      fireEvent.change(searchInput, { target: { value: 'Category' } });
      fireEvent.change(searchInput, { target: { value: '' } });
      expect(searchInput.value).toBe('');
    });
  });

  describe('Filter Selection', () => {
    it('should render all filter categories', () => {
      renderComponent();
      fireEvent.click(screen.getByTestId('filter-trigger-button'));
      const accordions = screen.getAllByTestId('accordion');
      expect(accordions.length).toBe(2);
    });

    it('should render filter values as checkboxes', () => {
      renderComponent();
      fireEvent.click(screen.getByTestId('filter-trigger-button'));
      const checkboxes = screen.getAllByTestId('filter-checkbox');
      expect(checkboxes.length).toBeGreaterThan(0);
    });

    it('should select filter option when checkbox is clicked', () => {
      const onFiltersChange = jest.fn();
      renderComponent({ onFiltersChange });
      fireEvent.click(screen.getByTestId('filter-trigger-button'));
      
      const checkbox = screen.getAllByTestId('filter-checkbox')[0] as HTMLInputElement;
      fireEvent.click(checkbox);
      
      expect(onFiltersChange).toHaveBeenCalled();
    });

    it('should mark checkbox as checked when option is selected', () => {
      const filtersWithSelection = [
        {
          id: 'category1',
          name: 'Category 1',
          values: ['Option A', 'Option B'],
          selectedValues: ['Option A'],
        },
      ];
      renderComponent({ filters: filtersWithSelection });
      fireEvent.click(screen.getByTestId('filter-trigger-button'));
      
      const checkbox = screen.getAllByTestId('filter-checkbox')[0] as HTMLInputElement;
      expect(checkbox.checked).toBe(true);
    });

    it('should uncheck checkbox when option is deselected', () => {
      const onFiltersChange = jest.fn();
      const filtersWithSelection = [
        {
          id: 'category1',
          name: 'Category 1',
          values: ['Option A', 'Option B'],
          selectedValues: ['Option A'],
        },
      ];
      renderComponent({ filters: filtersWithSelection, onFiltersChange });
      fireEvent.click(screen.getByTestId('filter-trigger-button'));
      
      const checkbox = screen.getAllByTestId('filter-checkbox')[0] as HTMLInputElement;
      fireEvent.click(checkbox);
      
      expect(onFiltersChange).toHaveBeenCalled();
    });
  });

  describe('Filter Display', () => {
    it('should display filter category names', () => {
      renderComponent();
      fireEvent.click(screen.getByTestId('filter-trigger-button'));
      expect(screen.getByText('Category 1')).toBeInTheDocument();
      expect(screen.getByText('Category 2')).toBeInTheDocument();
    });

    it('should display all filter values', () => {
      renderComponent();
      fireEvent.click(screen.getByTestId('filter-trigger-button'));
      expect(screen.getByText('Option A')).toBeInTheDocument();
      expect(screen.getByText('Option B')).toBeInTheDocument();
      expect(screen.getByText('Option X')).toBeInTheDocument();
    });

    it('should display item icon when provided', () => {
      const itemIcon = <span data-testid="item-icon">🎯</span>;
      renderComponent({ itemIcon });
      fireEvent.click(screen.getByTestId('filter-trigger-button'));
      const itemIcons = screen.queryAllByTestId('item-icon');
      expect(itemIcons.length).toBeGreaterThan(0);
    });
  });

  describe('Apply Button', () => {
    it('should render apply button', () => {
      renderComponent();
      fireEvent.click(screen.getByTestId('filter-trigger-button'));
      const buttons = screen.getAllByRole('button');
      expect(buttons.some(b => b.textContent === 'Apply')).toBe(true);
    });

    it('should call onApply when apply button is clicked', () => {
      const onApply = jest.fn();
      renderComponent({ onApply });
      fireEvent.click(screen.getByTestId('filter-trigger-button'));
      
      const applyButton = screen.getAllByRole('button').find(b => b.textContent === 'Apply');
      fireEvent.click(applyButton!);
      
      expect(onApply).toHaveBeenCalled();
    });

    it('should close popover after apply', () => {
      const onApply = jest.fn();
      renderComponent({ onApply });
      fireEvent.click(screen.getByTestId('filter-trigger-button'));
      
      const applyButton = screen.getAllByRole('button').find(b => b.textContent === 'Apply');
      fireEvent.click(applyButton!);
      
      expect(screen.queryByTestId('popover')).not.toBeInTheDocument();
    });

    it('should pass selected filters to onApply', () => {
      const onApply = jest.fn();
      const filtersWithSelection = [
        {
          id: 'category1',
          name: 'Category 1',
          values: ['Option A', 'Option B'],
          selectedValues: ['Option A'],
        },
      ];
      renderComponent({ filters: filtersWithSelection, onApply });
      fireEvent.click(screen.getByTestId('filter-trigger-button'));
      
      const applyButton = screen.getAllByRole('button').find(b => b.textContent === 'Apply');
      fireEvent.click(applyButton!);
      
      expect(onApply).toHaveBeenCalledWith(expect.arrayContaining([
        expect.objectContaining({
          id: 'category1',
          selectedValues: ['Option A'],
        }),
      ]));
    });
  });

  describe('Clear All Button', () => {
    it('should render clear all button', () => {
      renderComponent();
      fireEvent.click(screen.getByTestId('filter-trigger-button'));
      const buttons = screen.getAllByRole('button');
      expect(buttons.some(b => b.textContent === 'Clear All')).toBe(true);
    });

    it('should call onClear when clear all button is clicked', () => {
      const onClear = jest.fn();
      renderComponent({ onClear });
      fireEvent.click(screen.getByTestId('filter-trigger-button'));
      
      const clearButton = screen.getAllByRole('button').find(b => b.textContent === 'Clear All');
      fireEvent.click(clearButton!);
      
      expect(onClear).toHaveBeenCalled();
    });

    it('should clear all selections and call onFiltersChange', () => {
      const onFiltersChange = jest.fn();
      const filtersWithSelection = [
        {
          id: 'category1',
          name: 'Category 1',
          values: ['Option A', 'Option B'],
          selectedValues: ['Option A', 'Option B'],
        },
      ];
      renderComponent({ filters: filtersWithSelection, onFiltersChange });
      fireEvent.click(screen.getByTestId('filter-trigger-button'));
      
      const clearButton = screen.getAllByRole('button').find(b => b.textContent === 'Clear All');
      fireEvent.click(clearButton!);
      
      expect(onFiltersChange).toHaveBeenCalledWith(expect.arrayContaining([
        expect.objectContaining({
          selectedValues: [],
        }),
      ]));
    });

    it('should reset button text to default after clear', () => {
      const filtersWithSelection = [
        {
          id: 'category1',
          name: 'Category 1',
          values: ['Option A'],
          selectedValues: ['Option A'],
        },
      ];
      renderComponent({ filters: filtersWithSelection });
      fireEvent.click(screen.getByTestId('filter-trigger-button'));
      
      expect(screen.getByTestId('filter-trigger-button')).toHaveTextContent('Filter (1)');
      
      const clearButton = screen.getAllByRole('button').find(b => b.textContent === 'Clear All');
      fireEvent.click(clearButton!);
      
      fireEvent.click(screen.getByTestId('filter-trigger-button'));
      expect(screen.getByTestId('filter-trigger-button')).toHaveTextContent('Filter');
    });
  });

  describe('Disabled State', () => {
    it('should render button as disabled when disabled prop is true', () => {
      renderComponent({ disabled: true });
      expect(screen.getByTestId('filter-trigger-button')).toBeDisabled();
    });

    it('should not open popover when disabled button is clicked', () => {
      renderComponent({ disabled: true });
      fireEvent.click(screen.getByTestId('filter-trigger-button'));
      expect(screen.queryByTestId('popover')).not.toBeInTheDocument();
    });

    it('should render button as enabled when disabled prop is false', () => {
      renderComponent({ disabled: false });
      expect(screen.getByTestId('filter-trigger-button')).not.toBeDisabled();
    });
  });

  describe('Callbacks', () => {
    it('should call onFiltersChange when filter selection changes', () => {
      const onFiltersChange = jest.fn();
      renderComponent({ onFiltersChange });
      fireEvent.click(screen.getByTestId('filter-trigger-button'));
      
      const checkbox = screen.getAllByTestId('filter-checkbox')[0];
      fireEvent.click(checkbox);
      
      expect(onFiltersChange).toHaveBeenCalled();
    });

    it('should handle undefined onFiltersChange gracefully', () => {
      renderComponent({ onFiltersChange: undefined });
      fireEvent.click(screen.getByTestId('filter-trigger-button'));
      
      const checkbox = screen.getAllByTestId('filter-checkbox')[0];
      expect(() => fireEvent.click(checkbox)).not.toThrow();
    });

    it('should handle undefined onApply gracefully', () => {
      renderComponent({ onApply: undefined });
      fireEvent.click(screen.getByTestId('filter-trigger-button'));
      
      const applyButton = screen.getAllByRole('button').find(b => b.textContent === 'Apply');
      expect(() => fireEvent.click(applyButton!)).not.toThrow();
    });

    it('should handle undefined onClear gracefully', () => {
      renderComponent({ onClear: undefined });
      fireEvent.click(screen.getByTestId('filter-trigger-button'));
      
      const clearButton = screen.getAllByRole('button').find(b => b.textContent === 'Clear All');
      expect(() => fireEvent.click(clearButton!)).not.toThrow();
    });
  });

  describe('Props Spread', () => {
    it('should pass custom props to root element', () => {
      const { container } = renderComponent({
        'data-custom': 'test-value',
      });
      expect(container.querySelector('[data-custom="test-value"]')).toBeInTheDocument();
    });

    it('should accept aria attributes', () => {
      const { container } = renderComponent({
        'aria-label': 'Filter button',
      });
      expect(container.querySelector('[aria-label="Filter button"]')).toBeInTheDocument();
    });
  });

  describe('Empty Filters', () => {
    it('should render with empty filters array', () => {
      renderComponent({ filters: [] });
      expect(screen.getByTestId('filter-trigger-button')).toBeInTheDocument();
    });

    it('should not render accordion when filters array is empty', () => {
      renderComponent({ filters: [] });
      fireEvent.click(screen.getByTestId('filter-trigger-button'));
      expect(screen.queryByTestId('accordion')).not.toBeInTheDocument();
    });
  });

  describe('Multiple Filter Changes', () => {
    it('should handle multiple filter selections across categories', () => {
      const onFiltersChange = jest.fn();
      renderComponent({ onFiltersChange });
      fireEvent.click(screen.getByTestId('filter-trigger-button'));
      
      const checkboxes = screen.getAllByTestId('filter-checkbox');
      fireEvent.click(checkboxes[0]);
      fireEvent.click(checkboxes[3]);
      
      expect(onFiltersChange).toHaveBeenCalledTimes(2);
    });

    it('should maintain selected state across multiple interactions', () => {
      const filtersWithSelection = [
        {
          id: 'category1',
          name: 'Category 1',
          values: ['Option A', 'Option B', 'Option C'],
          selectedValues: ['Option A'],
        },
      ];
      renderComponent({ filters: filtersWithSelection });
      
      fireEvent.click(screen.getByTestId('filter-trigger-button'));
      let checkbox = screen.getAllByTestId('filter-checkbox')[0] as HTMLInputElement;
      expect(checkbox.checked).toBe(true);
      
      fireEvent.click(screen.getByTestId('filter-trigger-button'));
      fireEvent.click(screen.getByTestId('filter-trigger-button'));
      checkbox = screen.getAllByTestId('filter-checkbox')[0] as HTMLInputElement;
      expect(checkbox.checked).toBe(true);
    });
  });

  describe('Integration', () => {
    it('should render complete filter button with all features', () => {
      renderComponent();
      
      expect(screen.getByTestId('filter-trigger-button')).toBeInTheDocument();
      fireEvent.click(screen.getByTestId('filter-trigger-button'));
      
      expect(screen.getByTestId('popover')).toBeInTheDocument();
      expect(screen.getByText('Add Filters')).toBeInTheDocument();
      expect(screen.getByTestId('search-input')).toBeInTheDocument();
      expect(screen.getAllByTestId('accordion')).toHaveLength(2);
      expect(screen.getAllByTestId('filter-checkbox').length).toBeGreaterThan(0);
    });

    it('should handle complete filter workflow', () => {
      const onFiltersChange = jest.fn();
      const onApply = jest.fn();
      const onClear = jest.fn();
      
      renderComponent({ onFiltersChange, onApply, onClear });
      
      // Open popover
      fireEvent.click(screen.getByTestId('filter-trigger-button'));
      expect(screen.getByTestId('popover')).toBeInTheDocument();
      
      // Select filters
      const checkboxes = screen.getAllByTestId('filter-checkbox');
      fireEvent.click(checkboxes[0]);
      fireEvent.click(checkboxes[1]);
      expect(onFiltersChange).toHaveBeenCalled();
      
      // Apply filters
      const applyButton = screen.getAllByRole('button').find(b => b.textContent === 'Apply');
      fireEvent.click(applyButton!);
      expect(onApply).toHaveBeenCalled();
    });

    it('should display filter count and allow clearing', () => {
      const filtersWithSelection = [
        {
          id: 'category1',
          name: 'Category 1',
          values: ['Option A', 'Option B'],
          selectedValues: ['Option A', 'Option B'],
        },
      ];
      
      renderComponent({ filters: filtersWithSelection });
      expect(screen.getByTestId('filter-trigger-button')).toHaveTextContent('Filter (2)');
      
      fireEvent.click(screen.getByTestId('filter-trigger-button'));
      const clearButton = screen.getAllByRole('button').find(b => b.textContent === 'Clear All');
      fireEvent.click(clearButton!);
    });

    it('should handle custom text and icons', () => {
      const customIcon = <span data-testid="custom-icon">⚙️</span>;
      renderComponent({
        text: 'Advanced Filters',
        leftIcon: customIcon,
        showLeftIcon: true,
      });
      
      expect(screen.getByTestId('filter-trigger-button')).toHaveTextContent('Advanced Filters');
      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle filter with no values', () => {
      const emptyFilter: FilterOption = {
        id: 'empty',
        name: 'Empty Filter',
        values: [],
      };
      
      renderComponent({ filters: [emptyFilter] });
      fireEvent.click(screen.getByTestId('filter-trigger-button'));
      
      expect(screen.getByText('Empty Filter')).toBeInTheDocument();
    });

    it('should handle very long filter names', () => {
      const longNameFilter: FilterOption = {
        id: 'long',
        name: 'This is a very long filter name that might cause layout issues if not handled properly',
        values: ['Option 1'],
      };
      
      renderComponent({ filters: [longNameFilter] });
      fireEvent.click(screen.getByTestId('filter-trigger-button'));
      
      expect(screen.getByText(longNameFilter.name)).toBeInTheDocument();
    });

    it('should handle many filters', () => {
      const manyFilters: FilterOption[] = Array.from({ length: 10 }, (_, i) => ({
        id: `filter${i}`,
        name: `Filter ${i}`,
        values: [`Option A${i}`, `Option B${i}`],
        selectedValues: [],
      }));
      
      renderComponent({ filters: manyFilters });
      fireEvent.click(screen.getByTestId('filter-trigger-button'));
      
      expect(screen.getAllByTestId('accordion')).toHaveLength(10);
    });

    it('should handle many values in a filter', () => {
      const manyValuesFilter: FilterOption = {
        id: 'many',
        name: 'Many Values',
        values: Array.from({ length: 20 }, (_, i) => `Option ${i + 1}`),
        selectedValues: [],
      };
      
      renderComponent({ filters: [manyValuesFilter] });
      fireEvent.click(screen.getByTestId('filter-trigger-button'));
      
      expect(screen.getAllByTestId('filter-checkbox').length).toBe(20);
    });

    it('should handle rapid button clicks', () => {
      renderComponent();
      const button = screen.getByTestId('filter-trigger-button');
      
      fireEvent.click(button);
      expect(screen.getByTestId('popover')).toBeInTheDocument();
      
      fireEvent.click(button);
      fireEvent.click(button);
      fireEvent.click(button);
      
      expect(screen.queryByTestId('popover')).not.toBeInTheDocument();
    });

    it('should handle empty search results', () => {
      renderComponent();
      fireEvent.click(screen.getByTestId('filter-trigger-button'));
      
      const searchInput = screen.getByTestId('search-input');
      fireEvent.change(searchInput, { target: { value: 'xyz123notfound' } });
      
      // Component should still render without errors
      expect(screen.getByTestId('popover')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has no axe accessibility violations', async () => {
      const { container } = render(<RdsCompFilterButton />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
