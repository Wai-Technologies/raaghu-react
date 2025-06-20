import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompPage from '../src/rds-comp-page/rds-comp-page';

// Mock RdsCompDatatable
jest.mock('../src/rds-comp-data-table', () => {
  return function MockRdsCompDatatable(props: any) {
    return <div data-testid="rds-comp-datatable">Datatable Mock</div>;
  };
});

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
  RdsTextArea: ({ label, value, onChange, placeholder, rows, readonly, showTitle }: any) => (
    <div data-testid="textarea-container">
      {showTitle && label && <label>{label}</label>}
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
  RdsLabel: ({ label, ...props }: any) => <span {...props}>{label}</span>,
  RdsIcon: ({ name, ...props }: any) => <i data-testid={`icon-${name}`} {...props}></i>,
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
    type: 'default', // Add the type prop for default view
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Component Rendering - Default Type', () => {
    it('should render without crashing', () => {
      expect(() => {
        render(<RdsCompPage tableHeaders={[]} type="default" />);
      }).not.toThrow();
    });

    it('should render title and slug input fields for default type', () => {
      render(<RdsCompPage tableHeaders={[]} {...defaultProps} />);
      
      expect(screen.getByTestId('title')).toBeInTheDocument();
      expect(screen.getByTestId('slug')).toBeInTheDocument();
    });

    it('should render navigation tabs for default type', () => {
      render(<RdsCompPage tableHeaders={[]} {...defaultProps} />);
      
      expect(screen.getByTestId('rds-navtabs')).toBeInTheDocument();
      expect(screen.getByTestId('nav-tab-content')).toBeInTheDocument();
      expect(screen.getByTestId('nav-tab-script')).toBeInTheDocument();
      expect(screen.getByTestId('nav-tab-style')).toBeInTheDocument();
    });

    it('should render save and cancel buttons for default type', () => {
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
  });

  describe('Type: pages - Datatable View', () => {
    const datatableProps = {
      type: 'pages',
      tableHeaders: [
        { displayName: 'Title', key: 'title', datatype: 'text' },
        { displayName: 'Slug', key: 'slug', datatype: 'text' }
      ],
      tableData: [
        { title: 'Test Page', slug: 'test-page' }
      ],
      actions: [
        { displayName: 'Edit', id: 'edit' }
      ],
      pagination: true,
      recordsPerPage: 10,
      onActionSelection: jest.fn()
    };

    it('should render datatable when type is pages', () => {
      render(<RdsCompPage {...datatableProps} />);
      
      expect(screen.getByTestId('rds-comp-datatable')).toBeInTheDocument();
    });
  });

  describe('Type: pageNotFound - 404 View', () => {
    it('should render 404 page when type is pageNotFound', () => {
      render(<RdsCompPage tableHeaders={[]} type="pageNotFound" />);
      
      expect(screen.getByText('Page not found')).toBeInTheDocument();
      expect(screen.getByText('Sorry, we couldn\'t find the page you were looking for.')).toBeInTheDocument();
      expect(screen.getByText('Go back home')).toBeInTheDocument();
      expect(screen.getByTestId('icon-right')).toBeInTheDocument();
    });
  });

  describe('Props Handling', () => {
    it('should handle missing props gracefully', () => {
      expect(() => {
        render(<RdsCompPage tableHeaders={[]} type="default" />);
      }).not.toThrow();
    });

    it('should handle undefined newPageData', () => {
      render(<RdsCompPage newPageData={undefined} tableHeaders={[]} type="default" />);
      
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
  });
});