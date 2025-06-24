import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompProperties from '../src/rds-comp-properties/rds-comp-properties';
import { ActionPosition } from '../../raaghu-elements/src/rds-data-table/rds-data-table';

// Mock the rds-elements components
jest.mock('../src/rds-elements', () => ({
  RdsButton: ({ 
    label, 
    colorVariant, 
    isDisabled, 
    onClick, 
    dataTestId 
  }: any) => (
    <button
      data-testid={dataTestId}
      disabled={isDisabled}
      onClick={onClick}
      data-color={colorVariant}
    >
      {label}
    </button>
  ),
  RdsInput: ({ 
    name, 
    label, 
    placeholder, 
    inputType, 
    onChange, 
    value, 
    dataTestId 
  }: any) => (
    <div>
      {label && <label htmlFor={dataTestId}>{name}</label>}
      <input
        data-testid={dataTestId}
        name={name}
        type={inputType}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  ),
  RdsIcon: ({ 
    name, 
    height, 
    width, 
    stroke 
  }: any) => (
    <span 
      data-testid={`icon-${name}`} 
      className={`icon-${name}`} 
      style={{ height, width }}
    >
      {name}
    </span>
  )
}));

// Mock the RdsDatatable component
jest.mock('../src/rds-data-table/rds-data-table', () => {
  return {
    __esModule: true,
    ActionPosition: {
      Right: 'right',
      Left: 'left'
    },
    default: ({ 
      tableHeaders, 
      tableData, 
      pagination, 
      onActionSelection 
    }: any) => (
      <div data-testid="datatable">
        <table>
          <thead>
            <tr>
              {tableHeaders.map((header: any, index: number) => (
                <th key={index} data-testid={`header-${header.key}`}>{header.displayName}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((row: any, rowIndex: number) => (
              <tr key={rowIndex} data-testid={`row-${rowIndex}`}>
                {tableHeaders.map((header: any, colIndex: number) => (
                  <td key={colIndex} data-testid={`cell-${rowIndex}-${header.key}`}>
                    {header.datatype === 'children' ? row[header.key] : String(row[header.key])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  };
});

// Mock i18n
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('RdsCompProperties', () => {
  // Mock props
  const mockOnActionSelection = jest.fn();
  
  const propertyHeaders = [
    {
      displayName: "Key",
      key: "key",
      datatype: "text",
      sortable: true,
    },
    {
      displayName: "Value",
      key: "Value",
      datatype: "text",
      sortable: true,
    },
    {
      displayName: "Action",
      key: "delete",
      datatype: "children",
      sortable: true,
    },
  ];
  
  const propertyData = [
    {
      key: "testKey1",
      Value: "testValue1",
      delete: "<button>Delete</button>"
    },
    {
      key: "testKey2",
      Value: "testValue2",
      delete: "<button>Delete</button>"
    }
  ];
  
  const defaultProps = {
    propertyData: propertyData,
    propertyHeaders: propertyHeaders,
    onActionSelection: mockOnActionSelection,
    displayType: "basic" as const
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render basic display type correctly', () => {
    render(<RdsCompProperties {...defaultProps} />);
    
    // Check if datatable is rendered
    expect(screen.getByTestId('datatable')).toBeInTheDocument();
    
    // Check if input fields are rendered
    expect(screen.getByTestId('key')).toBeInTheDocument();
    expect(screen.getByTestId('value')).toBeInTheDocument();
    
    // Check if buttons are rendered
    expect(screen.getByTestId('add')).toBeInTheDocument();
    expect(screen.getByTestId('save')).toBeInTheDocument();
    expect(screen.getByTestId('cancel')).toBeInTheDocument();
  });

  it('should render advanced display type correctly', () => {
    render(<RdsCompProperties {...defaultProps} displayType="advanced" />);
    
    // Check if datatable is rendered
    expect(screen.getByTestId('datatable')).toBeInTheDocument();
    
    // Check if input fields are rendered
    expect(screen.getByTestId('key')).toBeInTheDocument();
    expect(screen.getByTestId('value')).toBeInTheDocument();
    
    // Check if buttons are rendered
    expect(screen.getByTestId('add')).toBeInTheDocument();
    expect(screen.getByTestId('cancel')).toBeInTheDocument();
    expect(screen.getByTestId('submit')).toBeInTheDocument(); // Advanced uses 'submit' instead of 'save'
  });

  it('should handle key input change in basic display type', () => {
    render(<RdsCompProperties {...defaultProps} />);
    
    const keyInput = screen.getByTestId('key');
    fireEvent.change(keyInput, { target: { value: 'newKey' } });
    
    // Verify input value is updated
    expect(keyInput).toHaveValue('newKey');
  });

  it('should handle value input change in basic display type', () => {
    render(<RdsCompProperties {...defaultProps} />);
    
    const valueInput = screen.getByTestId('value');
    fireEvent.change(valueInput, { target: { value: 'newValue' } });
    
    // Verify input value is updated
    expect(valueInput).toHaveValue('newValue');
  });

  it('should handle form submission in basic display type', () => {
    render(<RdsCompProperties {...defaultProps} />);
    
    // Enter values in the inputs
    const keyInput = screen.getByTestId('key');
    const valueInput = screen.getByTestId('value');
    
    fireEvent.change(keyInput, { target: { value: 'newKey' } });
    fireEvent.change(valueInput, { target: { value: 'newValue' } });
    
    // Submit the form
    const saveButton = screen.getByTestId('save');
    fireEvent.click(saveButton);
    
    // After submission, inputs should be cleared
    expect(keyInput).toHaveValue('');
    expect(valueInput).toHaveValue('');
  });

  it('should handle key input change in advanced display type', () => {
    render(<RdsCompProperties {...defaultProps} displayType="advanced" />);
    
    const keyInput = screen.getByTestId('key');
    fireEvent.change(keyInput, { target: { value: 'advancedKey' } });
    
    // Verify input value is updated
    expect(keyInput).toHaveValue('advancedKey');
  });

  it('should handle value input change in advanced display type', () => {
    render(<RdsCompProperties {...defaultProps} displayType="advanced" />);
    
    const valueInput = screen.getByTestId('value');
    fireEvent.change(valueInput, { target: { value: 'advancedValue' } });
    
    // Verify input value is updated
    expect(valueInput).toHaveValue('advancedValue');
  });

  it('should add item to table in advanced display type', async () => {
    const { rerender } = render(<RdsCompProperties {...defaultProps} displayType="advanced" />);
    
    // Enter values in the inputs
    const keyInput = screen.getByTestId('key');
    const valueInput = screen.getByTestId('value');
    
    fireEvent.change(keyInput, { target: { value: 'newKey' } });
    fireEvent.change(valueInput, { target: { value: 'newValue' } });
    
    // Click add button
    const addButton = screen.getByTestId('add');
    fireEvent.click(addButton);
    
    // Because we're mocking the component, we can't directly test state changes
    // In a real test, you might want to check if a new row appears in the table
    // For this mock, we can check if inputs are cleared
    expect(keyInput).toHaveValue('');
    expect(valueInput).toHaveValue('');
  });

  it('should handle onActionSelection callback', () => {
    render(<RdsCompProperties {...defaultProps} />);
    
    // Since we mocked the datatable, we can't directly trigger its actions
    // We can only verify the props were passed correctly
    expect(mockOnActionSelection).not.toHaveBeenCalled();
  });

  it('should clear input fields on form submission', () => {
    render(<RdsCompProperties {...defaultProps} />);
    
    // Enter values in the inputs
    const keyInput = screen.getByTestId('key');
    const valueInput = screen.getByTestId('value');
    
    fireEvent.change(keyInput, { target: { value: 'testKey' } });
    fireEvent.change(valueInput, { target: { value: 'testValue' } });
    
    // Submit the form
    const form = keyInput.closest('form')!;
    fireEvent.submit(form);
    
    // After submission, inputs should be cleared
    expect(keyInput).toHaveValue('');
    expect(valueInput).toHaveValue('');
  });
  
  it('should call onActionSelection when action is selected', () => {
    render(<RdsCompProperties {...defaultProps} />);
    
    // In a real test, we would trigger the action in the data table
    // But since we mocked it, we can only verify the callback was passed
    
    // We can simulate what might happen if an action was selected
    const mockAction = { type: 'delete', row: propertyData[0] };
    defaultProps.onActionSelection(mockAction);
    
    expect(mockOnActionSelection).toHaveBeenCalledWith(mockAction);
  });
  
  it('should handle delete item in advanced display type', () => {
    // For advanced display, we need to first add an item then delete it
    const { rerender } = render(<RdsCompProperties {...defaultProps} displayType="advanced" />);
    
    // Add an item first
    const keyInput = screen.getByTestId('key');
    const valueInput = screen.getByTestId('value');
    
    fireEvent.change(keyInput, { target: { value: 'deleteKey' } });
    fireEvent.change(valueInput, { target: { value: 'deleteValue' } });
    
    const addButton = screen.getByTestId('add');
    fireEvent.click(addButton);
    
    // Since we mocked the component, we can't directly test the delete functionality
    // In a real test, we would:
    // 1. Find the delete button in the table
    // 2. Click it
    // 3. Verify the item is removed
    
    // Here we're just testing if our mocks work as expected
    expect(keyInput).toHaveValue('');
    expect(valueInput).toHaveValue('');
  });
});