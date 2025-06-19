import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompPage from '../src/rds-comp-page/rds-comp-page';

// Mock the rds-elements components
jest.mock('../src/rds-elements', () => ({
  RdsInput: ({ label, value, onChange, placeholder, name, required, dataTestId, ...props }: any) => (
    <div data-testid={`input-container-${dataTestId}`}>
      {label && <label>{name}</label>}
      <input
        data-testid={dataTestId}
        value={value || ''}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        {...props}
      />
    </div>
  ),
  RdsButton: ({ label, onClick, colorVariant, type, size, isDisabled, isOutline, dataTestId, ...props }: any) => (
    <button
      data-testid={dataTestId}
      onClick={onClick}
      disabled={isDisabled}
      className={`btn ${colorVariant} ${size} ${isOutline ? 'outline' : ''}`}
      type={type}
      {...props}
    >
      {label}
    </button>
  ),
  RdsNavtabs: ({ navtabsItems, activeNavtabOrder, activeNavTabId }: any) => (
    <div data-testid="rds-navtabs">
      {navtabsItems?.map((item: any, index: number) => (
        <button
          key={index}
          data-testid={`nav-tab-${item.id}`}
          onClick={() => activeNavtabOrder && activeNavtabOrder(item.id)}
          className={activeNavTabId === item.id ? 'active' : ''}
        >
          {item.label}
        </button>
      ))}
    </div>
  ),
  RdsTextArea: ({ label, value, onChange, placeholder, rows, readonly }: any) => (
    <div data-testid="textarea-container">
      {label && <label>{label}</label>}
      <textarea
        data-testid="rds-textarea"
        value={value || ''}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        readOnly={readonly}
      />
    </div>
  ),
  RdsTextEditor: ({ value, onChange, placeholder }: any) => (
    <div data-testid="text-editor-container">
      <textarea
        data-testid="rds-text-editor"
        value={value || ''}
        onChange={(e) => onChange && onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  ),
}));

describe('RdsCompPage', () => {
  const mockPageData = {
    title: 'Test Page',
    slug: 'test-page',
    content: 'Test content',
    script: 'Test script',
    style: 'Test style'
  };

  const defaultProps = {
    newPageData: mockPageData,
    reset: false,
    onSaveHandler: jest.fn(),
    onCancel: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Component Rendering', () => {
    it('should render without crashing', () => {
      expect(() => {
        render(<RdsCompPage tableHeaders={[]} />);
      }).not.toThrow();
    });

    it('should render title and slug input fields', () => {
      render(<RdsCompPage tableHeaders={[]} {...defaultProps} />);
      
      expect(screen.getByTestId('title')).toBeInTheDocument();
      expect(screen.getByTestId('slug')).toBeInTheDocument();
    });

    it('should render navigation tabs', () => {
      render(<RdsCompPage tableHeaders={[]} {...defaultProps} />);
      
      expect(screen.getByTestId('rds-navtabs')).toBeInTheDocument();
      expect(screen.getByTestId('nav-tab-content')).toBeInTheDocument();
      expect(screen.getByTestId('nav-tab-script')).toBeInTheDocument();
      expect(screen.getByTestId('nav-tab-style')).toBeInTheDocument();
    });

    it('should render save and cancel buttons', () => {
      render(<RdsCompPage tableHeaders={[]} {...defaultProps} />);
      
      expect(screen.getByTestId('save')).toBeInTheDocument();
      expect(screen.getByTestId('cancel')).toBeInTheDocument();
    });

    it('should display initial data in input fields', () => {
      render(<RdsCompPage tableHeaders={[]} {...defaultProps} />);
      
      expect(screen.getByTestId('title')).toHaveValue('Test Page');
      expect(screen.getByTestId('slug')).toHaveValue('test-page');
    });
  });

  describe('Tab Navigation', () => {
    it('should show content tab as active by default', () => {
      render(<RdsCompPage tableHeaders={[]} {...defaultProps} />);
      
      expect(screen.getByTestId('rds-text-editor')).toBeInTheDocument();
    });

    it('should switch to script tab when clicked', () => {
      render(<RdsCompPage tableHeaders={[]} {...defaultProps} />);
      
      const scriptTab = screen.getByTestId('nav-tab-script');
      fireEvent.click(scriptTab);
      
      expect(screen.getByTestId('rds-textarea')).toBeInTheDocument();
      expect(screen.getByText('Script Description')).toBeInTheDocument();
    });

    it('should switch to style tab when clicked', () => {
      render(<RdsCompPage tableHeaders={[]} {...defaultProps} />);
      
      const styleTab = screen.getByTestId('nav-tab-style');
      fireEvent.click(styleTab);
      
      expect(screen.getByTestId('rds-textarea')).toBeInTheDocument();
      expect(screen.getByText('Style Description')).toBeInTheDocument();
    });

    it('should switch back to content tab', () => {
      render(<RdsCompPage tableHeaders={[]} {...defaultProps} />);
      
      // Switch to script tab first
      fireEvent.click(screen.getByTestId('nav-tab-script'));
      expect(screen.getByTestId('rds-textarea')).toBeInTheDocument();
      
      // Switch back to content tab
      fireEvent.click(screen.getByTestId('nav-tab-content'));
      expect(screen.getByTestId('rds-text-editor')).toBeInTheDocument();
    });
  });

  describe('Form Input Handling', () => {
    it('should update title when input changes', () => {
      render(<RdsCompPage tableHeaders={[]} {...defaultProps} />);
      
      const titleInput = screen.getByTestId('title');
      fireEvent.change(titleInput, { target: { value: 'New Title' } });
      
      expect(titleInput).toHaveValue('New Title');
    });

    it('should update slug when input changes', () => {
      render(<RdsCompPage tableHeaders={[]} {...defaultProps} />);
      
      const slugInput = screen.getByTestId('slug');
      fireEvent.change(slugInput, { target: { value: 'new-slug' } });
      
      expect(slugInput).toHaveValue('new-slug');
    });

    it('should update content in text editor', () => {
      render(<RdsCompPage tableHeaders={[]} {...defaultProps} />);
      
      const textEditor = screen.getByTestId('rds-text-editor');
      fireEvent.change(textEditor, { target: { value: 'New content' } });
      
      expect(textEditor).toHaveValue('New content');
    });

    it('should update script in textarea', () => {
      render(<RdsCompPage tableHeaders={[]} {...defaultProps} />);
      
      // Switch to script tab
      fireEvent.click(screen.getByTestId('nav-tab-script'));
      
      const scriptTextarea = screen.getByTestId('rds-textarea');
      fireEvent.change(scriptTextarea, { target: { value: 'New script' } });
      
      expect(scriptTextarea).toHaveValue('New script');
    });

    it('should update style in textarea', () => {
      render(<RdsCompPage tableHeaders={[]} {...defaultProps} />);
      
      // Switch to style tab
      fireEvent.click(screen.getByTestId('nav-tab-style'));
      
      const styleTextarea = screen.getByTestId('rds-textarea');
      fireEvent.change(styleTextarea, { target: { value: 'New style' } });
      
      expect(styleTextarea).toHaveValue('New style');
    });
  });

  describe('Form Validation', () => {
    it('should disable save button when title is empty', () => {
      const emptyData = { ...mockPageData, title: '' };
      render(<RdsCompPage tableHeaders={[]} {...defaultProps} newPageData={emptyData} />);
      
      const saveButton = screen.getByTestId('save');
      expect(saveButton).toBeDisabled();
    });

    it('should disable save button when slug is empty', () => {
      const emptyData = { ...mockPageData, slug: '' };
      render(<RdsCompPage tableHeaders={[]} {...defaultProps} newPageData={emptyData} />);
      
      const saveButton = screen.getByTestId('save');
      expect(saveButton).toBeDisabled();
    });

    it('should enable save button when both title and slug are provided', () => {
      render(<RdsCompPage tableHeaders={[]} {...defaultProps} />);
      
      const saveButton = screen.getByTestId('save');
      expect(saveButton).not.toBeDisabled();
    });

    it('should validate form when inputs change', () => {
      render(<RdsCompPage tableHeaders={[]} {...defaultProps} />);
      
      const titleInput = screen.getByTestId('title');
      const saveButton = screen.getByTestId('save');
      
      // Clear title to make form invalid
      fireEvent.change(titleInput, { target: { value: '' } });
      expect(saveButton).toBeDisabled();
      
      // Add title back to make form valid
      fireEvent.change(titleInput, { target: { value: 'Valid Title' } });
      expect(saveButton).not.toBeDisabled();
    });
  });

  describe('Button Interactions', () => {
    it('should call onSaveHandler when save button is clicked', () => {
      render(<RdsCompPage tableHeaders={[]} {...defaultProps} />);
      
      const saveButton = screen.getByTestId('save');
      fireEvent.click(saveButton);
      
      expect(defaultProps.onSaveHandler).toHaveBeenCalledWith(mockPageData);
    });

    it('should call onCancel when cancel button is clicked', () => {
      render(<RdsCompPage tableHeaders={[]} {...defaultProps} />);
      
      const cancelButton = screen.getByTestId('cancel');
      fireEvent.click(cancelButton);
      
      expect(defaultProps.onCancel).toHaveBeenCalled();
    });

    it('should reset form data after successful save', () => {
      render(<RdsCompPage tableHeaders={[]} {...defaultProps} />);
      
      const saveButton = screen.getByTestId('save');
      fireEvent.click(saveButton);
      
      // Form should be reset after save
      expect(screen.getByTestId('title')).toHaveValue('');
      expect(screen.getByTestId('slug')).toHaveValue('');
    });

    it('should save with updated data', () => {
      render(<RdsCompPage tableHeaders={[]} {...defaultProps} />);
      
      // Update title
      const titleInput = screen.getByTestId('title');
      fireEvent.change(titleInput, { target: { value: 'Updated Title' } });
      
      // Update slug
      const slugInput = screen.getByTestId('slug');
      fireEvent.change(slugInput, { target: { value: 'updated-slug' } });
      
      // Save
      const saveButton = screen.getByTestId('save');
      fireEvent.click(saveButton);
      
      expect(defaultProps.onSaveHandler).toHaveBeenCalledWith({
        ...mockPageData,
        title: 'Updated Title',
        slug: 'updated-slug'
      });
    });
  });

  describe('Props Handling', () => {
    it('should handle missing props gracefully', () => {
      expect(() => {
        render(<RdsCompPage tableHeaders={[]} />);
      }).not.toThrow();
    });

    it('should handle undefined newPageData', () => {
      render(<RdsCompPage newPageData={undefined} tableHeaders={[]} />);
      
      expect(screen.getByTestId('title')).toHaveValue('');
      expect(screen.getByTestId('slug')).toHaveValue('');
    });

    it('should update when newPageData prop changes', () => {
      const { rerender } = render(<RdsCompPage tableHeaders={[]} {...defaultProps} />);
      
      const newData = {
        title: 'New Page Title',
        slug: 'new-page-slug',
        content: 'New content',
        script: 'New script',
        style: 'New style'
      };
      
      rerender(<RdsCompPage tableHeaders={[]} {...defaultProps} newPageData={newData} />);
      
      expect(screen.getByTestId('title')).toHaveValue('New Page Title');
      expect(screen.getByTestId('slug')).toHaveValue('new-page-slug');
    });

    it('should handle reset prop changes', () => {
      const { rerender } = render(<RdsCompPage tableHeaders={[]} {...defaultProps} reset={false} />);
      
      rerender(<RdsCompPage tableHeaders={[]} {...defaultProps} reset={true} />);
      
      // Component should handle reset prop change
      expect(screen.getByTestId('title')).toBeInTheDocument();
    });
  });

  describe('Component Structure', () => {
    it('should have correct CSS classes for layout', () => {
      const { container } = render(<RdsCompPage tableHeaders={[]} {...defaultProps} />);
      
      expect(container.querySelector('.custom-content-scroll')).toBeInTheDocument();
      expect(container.querySelector('.footer-buttons')).toBeInTheDocument();
    });

    it('should have form groups with proper structure', () => {
      const { container } = render(<RdsCompPage tableHeaders={[]} {...defaultProps} />);
      
      const formGroups = container.querySelectorAll('.form-group');
      expect(formGroups.length).toBeGreaterThan(0);
    });

    it('should have tab content area with proper styling', () => {
      const { container } = render(<RdsCompPage tableHeaders={[]} {...defaultProps} />);
      
      const tabContent = container.querySelector('.mt-3.mb-4.overflow-x-hidden.overflow-y-scroll');
      expect(tabContent).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have accessible form elements', () => {
      render(<RdsCompPage tableHeaders={[]} {...defaultProps} />);
      
      const inputs = screen.getAllByRole('textbox');
      inputs.forEach(input => {
        expect(input).toBeVisible();
      });
    });

    it('should have accessible buttons', () => {
      render(<RdsCompPage tableHeaders={[]} {...defaultProps} />);
      
      const buttons = screen.getAllByRole('button');
      buttons.forEach(button => {
        expect(button).toBeVisible();
        expect(button).toHaveAccessibleName();
      });
    });

    it('should have proper labels for inputs', () => {
      render(<RdsCompPage tableHeaders={[]} {...defaultProps} />);
      
      expect(screen.getByText('Title')).toBeInTheDocument();
      expect(screen.getByText('Slug')).toBeInTheDocument();
    });
  });

  describe('Component Stability', () => {
    it('should not crash on multiple renders', () => {
      const { rerender } = render(<RdsCompPage tableHeaders={[]} {...defaultProps} />);
      
      expect(() => {
        rerender(<RdsCompPage tableHeaders={[]} {...defaultProps} />);
        rerender(<RdsCompPage tableHeaders={[]} {...defaultProps} newPageData={undefined} />);
      }).not.toThrow();
    });

    it('should maintain tab state during re-renders', () => {
      const { rerender } = render(<RdsCompPage tableHeaders={[]} {...defaultProps} />);
      
      // Switch to script tab
      fireEvent.click(screen.getByTestId('nav-tab-script'));
      expect(screen.getByTestId('rds-textarea')).toBeInTheDocument();
      
      // Re-render with same props
      rerender(<RdsCompPage tableHeaders={[]} {...defaultProps} />);
      
      // Should still be on script tab
      expect(screen.getByTestId('rds-textarea')).toBeInTheDocument();
    });
  });
});