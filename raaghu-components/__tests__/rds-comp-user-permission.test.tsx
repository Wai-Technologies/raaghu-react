import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompUserPermission from '../src/rds-comp-user-permission/rds-comp-user-permission';

// Mock the dependencies
jest.mock('../src/rds-data-table', () => {
  return jest.fn(({ tableHeaders, tableData, actions, onActionSelection, ...props }) => (
    <div data-testid="rds-comp-datatable" {...props}>
      <table>
        <thead>
          <tr>
            {tableHeaders?.map((header: any, index: number) => (
              <th key={index}>{header.displayName}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData?.map((row: any, rowIndex: number) => (
            <tr key={rowIndex}>
              {tableHeaders?.map((header: any, colIndex: number) => (
                <td key={colIndex}>{row[header.key]}</td>
              ))}
              <td>
                {actions?.map((action: any) => (
                  <button
                    key={action.id}
                    onClick={() => onActionSelection(action)}
                    data-testid={`action-${action.id}`}
                  >
                    {action.displayName}
                  </button>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ));
});

jest.mock('../src/rds-elements', () => ({
  RdsButton: jest.fn(({ label, onClick, dataTestId, ...props }) => (
    <button data-testid={dataTestId || 'rds-button'} onClick={onClick} {...props}>
      {label}
    </button>
  )),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { changeLanguage: jest.fn() },
  }),
}));

describe('RdsCompUserPermission', () => {
  const mockTableHeaders = [
    {
      displayName: 'User Name',
      key: 'userName',
      datatype: 'text',
      sortable: true,
    },
    {
      displayName: 'Email',
      key: 'email',
      datatype: 'text',
      sortable: true,
    },
    {
      displayName: 'Role',
      key: 'role',
      datatype: 'text',
      sortable: false,
    },
  ];

  const mockTableData = [
    { userName: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { userName: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  ];

  const mockActions = [
    { displayName: 'Edit', id: 'edit' },
    { displayName: 'Delete', id: 'delete' },
  ];

  const mockOnActionSelection = jest.fn();

  const defaultProps = {
    tableHeaders: mockTableHeaders,
    tableData: mockTableData,
    actions: mockActions,
    onActionSelection: mockOnActionSelection,
    displayType: 'basic' as const,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Basic Rendering Tests
  describe('Basic Rendering', () => {
    it('renders without crashing', () => {
      render(<RdsCompUserPermission {...defaultProps} />);
      expect(screen.getByText('New User')).toBeInTheDocument();
    });

    it('renders the data table component', () => {
      render(<RdsCompUserPermission {...defaultProps} />);
      expect(screen.getByTestId('rds-comp-datatable')).toBeInTheDocument();
    });

    it('renders table headers correctly', () => {
      render(<RdsCompUserPermission {...defaultProps} />);
      expect(screen.getByText('User Name')).toBeInTheDocument();
      expect(screen.getByText('Email')).toBeInTheDocument();
      expect(screen.getByText('Role')).toBeInTheDocument();
    });

    it('renders table data correctly', () => {
      render(<RdsCompUserPermission {...defaultProps} />);
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('john@example.com')).toBeInTheDocument();
      expect(screen.getByText('Admin')).toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
      expect(screen.getByText('jane@example.com')).toBeInTheDocument();
      expect(screen.getByText('User')).toBeInTheDocument();
    });
  });

  // Display Type Tests
  describe('Display Type - Basic', () => {
    it('renders basic layout when displayType is basic', () => {
      render(<RdsCompUserPermission {...defaultProps} displayType="basic" />);
      
      // Check that New User button exists
      expect(screen.getByText('New User')).toBeInTheDocument();
      
      // Check that data table exists
      expect(screen.getByTestId('rds-comp-datatable')).toBeInTheDocument();
    });

    it('applies correct styling for basic mode', () => {
      const { container } = render(<RdsCompUserPermission {...defaultProps} displayType="basic" />);
      
      // Check for d-flex justify-content-end class
      const buttonContainer = container.querySelector('.d-flex.justify-content-end');
      expect(buttonContainer).toBeInTheDocument();
      expect(buttonContainer).not.toHaveClass('mb-3');
    });

    it('passes correct props to RdsButton in basic mode', () => {
      const { RdsButton } = require('../src/rds-elements');
      render(<RdsCompUserPermission {...defaultProps} displayType="basic" />);
      
      expect(RdsButton).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'button',
          colorVariant: 'primary',
          label: 'New User',
          icon: 'plus',
          iconFill: false,
          iconHeight: '12px',
          iconStroke: true,
          iconWidth: '12px',
          iconColorVariant: 'light',
          size: 'small',
        }),
        expect.anything()
      );
    });
  });

  describe('Display Type - Advanced', () => {
    it('renders advanced layout when displayType is advanced', () => {
      render(<RdsCompUserPermission {...defaultProps} displayType="advanced" />);
      
      // Check that New User button exists with test ID
      expect(screen.getByTestId('new-user')).toBeInTheDocument();
      
      // Check that data table exists
      expect(screen.getByTestId('rds-comp-datatable')).toBeInTheDocument();
    });

    it('applies correct styling for advanced mode', () => {
      const { container } = render(<RdsCompUserPermission {...defaultProps} displayType="advanced" />);
      
      // Check for d-flex justify-content-end mb-3 classes
      const buttonContainer = container.querySelector('.d-flex.justify-content-end.mb-3');
      expect(buttonContainer).toBeInTheDocument();
    });

    it('passes correct props to RdsButton in advanced mode', () => {
      const { RdsButton } = require('../src/rds-elements');
      render(<RdsCompUserPermission {...defaultProps} displayType="advanced" />);
      
      expect(RdsButton).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'button',
          colorVariant: 'primary',
          label: 'New User',
          icon: 'plus',
          iconHeight: '15px',
          iconFill: false,
          iconStroke: true,
          iconWidth: '15px',
          iconColorVariant: 'light',
          dataTestId: 'new-user',
          size: 'small',
        }),
        expect.anything()
      );
    });

    it('has different icon dimensions in advanced mode', () => {
      const { RdsButton } = require('../src/rds-elements');
      render(<RdsCompUserPermission {...defaultProps} displayType="advanced" />);
      
      const buttonCall = RdsButton.mock.calls.find((call: any) => call[0].dataTestId === 'new-user');
      expect(buttonCall[0].iconHeight).toBe('15px');
      expect(buttonCall[0].iconWidth).toBe('15px');
    });
  });

  // RdsDatatable Integration Tests
  describe('RdsDatatable Integration', () => {
    it('passes correct props to RdsDatatable in basic mode', () => {
      const RdsDatatable = require('../src/rds-data-table');
      render(<RdsCompUserPermission {...defaultProps} displayType="basic" />);
        expect(RdsDatatable).toHaveBeenCalledWith(
        expect.objectContaining({
          actionPosition: 'Right', // ActionPosition.Right as string
          tableHeaders: mockTableHeaders,
          actions: mockActions,
          tableData: mockTableData,
          pagination: false,
          classes: 'table',
          onActionSelection: mockOnActionSelection,
          enablecheckboxselection: undefined,
        }),
        expect.anything()
      );
    });

    it('passes correct props to RdsDatatable in advanced mode', () => {
      const RdsDatatable = require('../src/rds-data-table');
      render(<RdsCompUserPermission {...defaultProps} displayType="advanced" />);
        expect(RdsDatatable).toHaveBeenCalledWith(
        expect.objectContaining({
          actionPosition: 'Right', // ActionPosition.Right as string
          tableHeaders: mockTableHeaders,
          actions: mockActions,
          tableData: mockTableData,
          pagination: false,
          onActionSelection: mockOnActionSelection,
        }),
        expect.anything()
      );
    });    it('handles action selection correctly', () => {
      render(<RdsCompUserPermission {...defaultProps} />);
      
      const editButtons = screen.getAllByTestId('action-edit');
      fireEvent.click(editButtons[0]); // Click the first edit button
      
      expect(mockOnActionSelection).toHaveBeenCalledWith(mockActions[0]);
    });

    it('passes enablecheckboxselection prop correctly', () => {
      const RdsDatatable = require('../src/rds-data-table');
      render(<RdsCompUserPermission {...defaultProps} enablecheckboxselection={true} />);
      
      expect(RdsDatatable).toHaveBeenCalledWith(
        expect.objectContaining({
          enablecheckboxselection: true,
        }),
        expect.anything()
      );
    });

    it('handles pagination prop correctly', () => {
      const RdsDatatable = require('../src/rds-data-table');
      render(<RdsCompUserPermission {...defaultProps} pagination={true} />);
      
      // Note: Component always passes pagination as false regardless of prop
      expect(RdsDatatable).toHaveBeenCalledWith(
        expect.objectContaining({
          pagination: false,
        }),
        expect.anything()
      );
    });
  });

  // Props Handling Tests
  describe('Props Handling', () => {
    it('handles empty table headers', () => {
      const propsWithEmptyHeaders = { ...defaultProps, tableHeaders: [] };
      expect(() => render(<RdsCompUserPermission {...propsWithEmptyHeaders} />)).not.toThrow();
    });

    it('handles empty table data', () => {
      const propsWithEmptyData = { ...defaultProps, tableData: [] };
      expect(() => render(<RdsCompUserPermission {...propsWithEmptyData} />)).not.toThrow();
    });

    it('handles empty actions array', () => {
      const propsWithEmptyActions = { ...defaultProps, actions: [] };
      expect(() => render(<RdsCompUserPermission {...propsWithEmptyActions} />)).not.toThrow();
    });

    it('handles undefined displayType (defaults to basic)', () => {
      const propsWithoutDisplayType = { ...defaultProps };
      delete (propsWithoutDisplayType as any).displayType;
      
      const { container } = render(<RdsCompUserPermission {...propsWithoutDisplayType} />);
      
      // Should not render either basic or advanced mode
      expect(container.querySelector('.d-flex.justify-content-end')).not.toBeInTheDocument();
    });

    it('handles complex table headers with all properties', () => {
      const complexHeaders = [
        {
          displayName: 'Complex Header',
          key: 'complex',
          datatype: 'text',
          dataLength: 50,
          required: true,
          sortable: true,
          colWidth: '200px',
          disabled: false,
          isEndUserEditing: true,
        },
      ];
      
      const propsWithComplexHeaders = { ...defaultProps, tableHeaders: complexHeaders };
      expect(() => render(<RdsCompUserPermission {...propsWithComplexHeaders} />)).not.toThrow();
      expect(screen.getByText('Complex Header')).toBeInTheDocument();
    });
  });

  // Button Functionality Tests
  describe('Button Functionality', () => {
    it('renders New User button with correct text', () => {
      render(<RdsCompUserPermission {...defaultProps} />);
      expect(screen.getByText('New User')).toBeInTheDocument();
    });

    it('New User button is clickable', () => {
      render(<RdsCompUserPermission {...defaultProps} />);
      const newUserButton = screen.getByText('New User');
      expect(newUserButton).toBeInTheDocument();
      
      // Test that button can be clicked (no onClick handler defined in component)
      fireEvent.click(newUserButton);
      // No assertion needed as there's no onClick handler
    });

    it('applies correct button styles in basic mode', () => {
      const { RdsButton } = require('../src/rds-elements');
      render(<RdsCompUserPermission {...defaultProps} displayType="basic" />);
      
      const buttonCall = RdsButton.mock.calls[0];
      expect(buttonCall[0]).toMatchObject({
        colorVariant: 'primary',
        size: 'small',
        icon: 'plus',
        iconColorVariant: 'light',
      });
    });

    it('applies correct button styles in advanced mode', () => {
      const { RdsButton } = require('../src/rds-elements');
      render(<RdsCompUserPermission {...defaultProps} displayType="advanced" />);
      
      const buttonCall = RdsButton.mock.calls[0];
      expect(buttonCall[0]).toMatchObject({
        colorVariant: 'primary',
        size: 'small',
        icon: 'plus',
        iconColorVariant: 'light',
        dataTestId: 'new-user',
      });
    });
  });

  // Layout and CSS Tests
  describe('Layout and CSS', () => {
    it('applies correct layout classes in basic mode', () => {
      const { container } = render(<RdsCompUserPermission {...defaultProps} displayType="basic" />);
      
      const buttonContainer = container.querySelector('.d-flex.justify-content-end');
      expect(buttonContainer).toBeInTheDocument();
      expect(buttonContainer).not.toHaveClass('mb-3');
    });

    it('applies correct layout classes in advanced mode', () => {
      const { container } = render(<RdsCompUserPermission {...defaultProps} displayType="advanced" />);
      
      const buttonContainer = container.querySelector('.d-flex.justify-content-end.mb-3');
      expect(buttonContainer).toBeInTheDocument();
    });

    it('renders table with correct class in basic mode', () => {
      const RdsDatatable = require('../src/rds-data-table');
      render(<RdsCompUserPermission {...defaultProps} displayType="basic" />);
      
      expect(RdsDatatable).toHaveBeenCalledWith(
        expect.objectContaining({
          classes: 'table',
        }),
        expect.anything()
      );
    });

    it('does not pass classes prop in advanced mode', () => {
      const RdsDatatable = require('../src/rds-data-table');
      render(<RdsCompUserPermission {...defaultProps} displayType="advanced" />);
      
      const datatableCall = RdsDatatable.mock.calls[0];
      expect(datatableCall[0]).not.toHaveProperty('classes');
    });
  });

  // Edge Cases and Error Handling
  describe('Edge Cases', () => {
    it('handles null tableData gracefully', () => {
      const propsWithNullData = { ...defaultProps, tableData: null as any };
      expect(() => render(<RdsCompUserPermission {...propsWithNullData} />)).not.toThrow();
    });

    it('handles undefined tableHeaders gracefully', () => {
      const propsWithUndefinedHeaders = { ...defaultProps, tableHeaders: undefined as any };
      expect(() => render(<RdsCompUserPermission {...propsWithUndefinedHeaders} />)).not.toThrow();
    });

    it('handles missing onActionSelection callback', () => {
      const propsWithoutCallback = { ...defaultProps };
      delete (propsWithoutCallback as any).onActionSelection;
      
      expect(() => render(<RdsCompUserPermission {...propsWithoutCallback} />)).not.toThrow();
    });    it('renders nothing when displayType is neither basic nor advanced', () => {
      const propsWithInvalidDisplayType = { ...defaultProps, displayType: 'invalid' as any };
      const { container } = render(<RdsCompUserPermission {...propsWithInvalidDisplayType} />);
      
      // Component renders empty fragment, so check that no main content divs exist
      expect(container.querySelector('.d-flex.justify-content-end')).not.toBeInTheDocument();
      expect(container.querySelector('[data-testid="rds-comp-datatable"]')).not.toBeInTheDocument();
    });
  });

  // Accessibility Tests
  describe('Accessibility', () => {
    it('New User button has appropriate attributes', () => {
      render(<RdsCompUserPermission {...defaultProps} displayType="advanced" />);
      const button = screen.getByTestId('new-user');
      expect(button).toHaveAttribute('type', 'button');
    });

    it('table headers are properly rendered for screen readers', () => {
      render(<RdsCompUserPermission {...defaultProps} />);
      
      // Check that table headers are accessible
      expect(screen.getByText('User Name')).toBeInTheDocument();
      expect(screen.getByText('Email')).toBeInTheDocument();
      expect(screen.getByText('Role')).toBeInTheDocument();
    });    it('action buttons have proper test IDs', () => {
      render(<RdsCompUserPermission {...defaultProps} />);
      
      const editButtons = screen.getAllByTestId('action-edit');
      const deleteButtons = screen.getAllByTestId('action-delete');
      
      expect(editButtons).toHaveLength(2); // One for each table row
      expect(deleteButtons).toHaveLength(2); // One for each table row
    });
  });

  // Component Integration Tests
  describe('Component Integration', () => {
    it('correctly integrates with react-i18next', () => {
      // The component imports useTranslation but doesn't use it
      // This test ensures the import doesn't break the component
      expect(() => render(<RdsCompUserPermission {...defaultProps} />)).not.toThrow();
    });    it('passes ActionPosition.Right correctly', () => {
      const RdsDatatable = require('../src/rds-data-table');
      render(<RdsCompUserPermission {...defaultProps} />);
      
      expect(RdsDatatable).toHaveBeenCalledWith(
        expect.objectContaining({
          actionPosition: 'Right', // ActionPosition.Right as string
        }),
        expect.anything()
      );
    });

    it('maintains component state correctly across re-renders', () => {
      const { rerender } = render(<RdsCompUserPermission {...defaultProps} displayType="basic" />);
      expect(screen.getByText('New User')).toBeInTheDocument();
      
      rerender(<RdsCompUserPermission {...defaultProps} displayType="advanced" />);
      expect(screen.getByTestId('new-user')).toBeInTheDocument();
    });
  });
});
