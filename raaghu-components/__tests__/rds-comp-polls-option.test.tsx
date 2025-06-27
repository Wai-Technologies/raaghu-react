import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import RdsCompPollsOption from '../src/rds-comp-polls-option/rds-comp-polls-option';

// Mock the dependencies
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock('../src/rds-elements', () => ({
  RdsButton: ({ onClick, icon, dataTestId, ...props }: any) => (
    <button onClick={onClick} data-testid={dataTestId} {...props}>
      {icon && <span data-testid={`icon-${icon}`}>{icon}</span>}
    </button>
  ),
  RdsInput: ({ onChange, value, label, placeholder, dataTestId, ...props }: any) => (
    <div>
      {label && <label>{props.name}</label>}
      <input
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        data-testid={dataTestId}
        {...props}
      />
    </div>
  ),
}));

jest.mock('../src/rds-comp-data-table', () => {
  return function MockRdsCompDatatable({
    tableData,
    onActionSelection,
    swapRows,
    tableHeaders,
    actions,
    ...props
  }: any) {
    return (
      <div data-testid="data-table">
        <table>
          <thead>
            <tr>
              {tableHeaders?.map((header: any) => (
                <th key={header.key}>{header.displayName}</th>
              ))}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tableData && tableData.length > 0 ? tableData.map((row: any, index: number) => (
              <tr key={row.id || index} data-testid={`table-row-${index}`}>
                <td data-testid={`cell-text-${index}`}>{row.text}</td>
                <td>
                  {row.actions?.map((action: any) => (
                    <button
                      key={action.id}
                      data-testid={`action-${action.id}-${index}`}
                      onClick={() => onActionSelection(row, action.id)}
                    >
                      {action.displayName}
                    </button>
                  ))}
                </td>
              </tr>
            )) : (
              <tr data-testid="empty-table">
                <td colSpan={2}>No data</td>
              </tr>
            )}
          </tbody>
        </table>
        {swapRows && (
          <button
            data-testid="swap-rows"
            onClick={() => swapRows && tableData ? swapRows([...tableData].reverse()) : null}
          >
            Swap Rows
          </button>
        )}
      </div>
    );
  };
});

describe('RdsCompPollsOption', () => {
  const mockGetPollsOptionData = jest.fn();
  
  const defaultProps = {
    getPollsOptionData: mockGetPollsOptionData,
    optionsData: [],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Component Rendering', () => {
    it('should render the component with all necessary elements', () => {
      render(<RdsCompPollsOption {...defaultProps} />);
      
      expect(screen.getByTestId('option')).toBeInTheDocument();
      expect(screen.getByTestId('add')).toBeInTheDocument();
      expect(screen.getByTestId('data-table')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Enter Option')).toBeInTheDocument();
    });

    it('should render empty table when no options data provided', () => {
      render(<RdsCompPollsOption {...defaultProps} />);
      
      expect(screen.getByTestId('empty-table')).toBeInTheDocument();
    });
  });

  describe('Option Input Handling', () => {
    it('should update input value when typing', async () => {
      const user = userEvent.setup();
      render(<RdsCompPollsOption {...defaultProps} />);
      
      const input = screen.getByTestId('option');
      await user.type(input, 'New Option');
      
      expect(input).toHaveValue('New Option');
    });

    it('should show error when trying to add empty option', async () => {
      const user = userEvent.setup();
      render(<RdsCompPollsOption {...defaultProps} />);
      
      const addButton = screen.getByTestId('add');
      await user.click(addButton);
      
      expect(screen.getByText('Option cannot be empty')).toBeInTheDocument();
    });

    it('should clear error when valid input is entered', async () => {
      const user = userEvent.setup();
      render(<RdsCompPollsOption {...defaultProps} />);
      
      const input = screen.getByTestId('option');
      const addButton = screen.getByTestId('add');
      
      // First create an error
      await user.click(addButton);
      expect(screen.getByText('Option cannot be empty')).toBeInTheDocument();
      
      // Then type valid input
      await user.type(input, 'Valid Option');
      expect(screen.queryByText('Option cannot be empty')).not.toBeInTheDocument();
    });
  });

  describe('Add Option Functionality', () => {
    it('should add a new option to the table', async () => {
      const user = userEvent.setup();
      render(<RdsCompPollsOption {...defaultProps} />);
      
      const input = screen.getByTestId('option');
      const addButton = screen.getByTestId('add');
      
      await user.type(input, 'New Option');
      await user.click(addButton);
      
      // Wait for the state update
      await waitFor(() => {
        expect(screen.getByTestId('cell-text-0')).toHaveTextContent('New Option');
      });
    });

    it('should clear input after adding an option', async () => {
      const user = userEvent.setup();
      render(<RdsCompPollsOption {...defaultProps} />);
      
      const input = screen.getByTestId('option');
      const addButton = screen.getByTestId('add');
      
      await user.type(input, 'Test Option');
      await user.click(addButton);
      
      expect(input).toHaveValue('');
    });

    it('should not add option with only whitespace', async () => {
      const user = userEvent.setup();
      render(<RdsCompPollsOption {...defaultProps} />);
      
      const input = screen.getByTestId('option');
      const addButton = screen.getByTestId('add');
      
      await user.type(input, '   ');
      await user.click(addButton);
      
      expect(screen.getByText('Option cannot be empty')).toBeInTheDocument();
      expect(screen.getByTestId('empty-table')).toBeInTheDocument();
    });
  });

  describe('Props Handling', () => {
    it('should handle undefined optionsData prop', () => {
      render(<RdsCompPollsOption getPollsOptionData={mockGetPollsOptionData} />);
      
      expect(screen.getByTestId('data-table')).toBeInTheDocument();
      expect(screen.getByTestId('empty-table')).toBeInTheDocument();
    });    it('should handle non-array optionsData prop', () => {
      render(
        <RdsCompPollsOption
          getPollsOptionData={mockGetPollsOptionData}
          optionsData={"not an array" as any}
        />
      );
      
      expect(screen.getByTestId('data-table')).toBeInTheDocument();
      expect(screen.getByTestId('empty-table')).toBeInTheDocument();
    });
  });

  describe('Error Handling', () => {
    it('should show error message with correct styling', async () => {
      const user = userEvent.setup();
      render(<RdsCompPollsOption {...defaultProps} />);
      
      const addButton = screen.getByTestId('add');
      await user.click(addButton);
      
      const errorElement = screen.getByText('Option cannot be empty');
      expect(errorElement).toBeInTheDocument();
    });

    it('should handle multiple consecutive error states', async () => {
      const user = userEvent.setup();
      render(<RdsCompPollsOption {...defaultProps} />);
      
      const addButton = screen.getByTestId('add');
      
      // Click multiple times should show error consistently
      await user.click(addButton);
      expect(screen.getByText('Option cannot be empty')).toBeInTheDocument();
      
      await user.click(addButton);
      expect(screen.getByText('Option cannot be empty')).toBeInTheDocument();
    });
  });

  describe('Integration Tests', () => {
    it('should handle adding multiple options', async () => {
      const user = userEvent.setup();
      render(<RdsCompPollsOption {...defaultProps} />);
      
      const input = screen.getByTestId('option');
      const addButton = screen.getByTestId('add');
      
      // Add first option
      await user.type(input, 'Option 1');
      await user.click(addButton);
      
      // Add second option
      await user.type(input, 'Option 2');
      await user.click(addButton);
      
      // Wait for both options to be added
      await waitFor(() => {
        expect(screen.getByTestId('cell-text-0')).toHaveTextContent('Option 1');
        expect(screen.getByTestId('cell-text-1')).toHaveTextContent('Option 2');
      });
    });

    it('should handle input validation workflow', async () => {
      const user = userEvent.setup();
      render(<RdsCompPollsOption {...defaultProps} />);
      
      const input = screen.getByTestId('option');
      const addButton = screen.getByTestId('add');
      
      // Try to add empty option
      await user.click(addButton);
      expect(screen.getByText('Option cannot be empty')).toBeInTheDocument();
      
      // Add valid option
      await user.type(input, 'Valid Option');
      expect(screen.queryByText('Option cannot be empty')).not.toBeInTheDocument();
      
      await user.click(addButton);
      await waitFor(() => {
        expect(screen.getByTestId('cell-text-0')).toHaveTextContent('Valid Option');
      });
      
      expect(input).toHaveValue('');
    });
  });
});