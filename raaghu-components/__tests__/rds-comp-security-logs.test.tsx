import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompSecurityLogs, { RdsCompSecurityLogsProps } from '../src/rds-comp-security-logs/rds-comp-security-logs';
import { ActionPosition } from '../../raaghu-elements/src/rds-data-table/rds-data-table';

// Mock the RdsDatatable component
jest.mock('../src/rds-data-table/rds-data-table', () => {
  const originalModule = jest.requireActual('../src/rds-data-table/rds-data-table');
  return {
    __esModule: true,
    ...originalModule,
    default: ({ tableHeaders, actions, tableData, pagination, recordsPerPage, recordsPerPageSelectListOption, actionPosition }: any) => (
      <div data-testid="rds-comp-datatable" className="mocked-data-table">
        <div data-testid="table-headers">
          {tableHeaders.map((header: any, index: number) => (
            <div key={index} data-testid={`header-${header.key}`} data-key={header.key} data-displayname={header.displayName}>
              {header.displayName}
            </div>
          ))}
        </div>
        <div data-testid="table-actions">
          {actions?.map((action: any, index: number) => (
            <div key={index} data-testid={`action-${action.id}`} data-id={action.id} data-displayname={action.displayName}>
              {action.displayName}
            </div>
          ))}
        </div>
        <div data-testid="table-data" data-rows={tableData?.length || 0}></div>
        <div data-testid="pagination" data-enabled={pagination}></div>
        <div data-testid="records-per-page" data-value={recordsPerPage}></div>
        <div data-testid="records-per-page-select" data-enabled={recordsPerPageSelectListOption}></div>
        <div data-testid="action-position" data-position={actionPosition}></div>
      </div>
    )
  };
});

describe('RdsCompSecurityLogs Component', () => {
  const mockTableHeaders = [
    { displayName: 'User', key: 'user', datatype: 'text', sortable: true },
    { displayName: 'Client IP Address', key: 'clientIpAddress', datatype: 'text', sortable: true },
    { displayName: 'Client Name', key: 'clientName', datatype: 'text', sortable: true },
    { displayName: 'Browser', key: 'browser', datatype: 'text', sortable: true },
    { displayName: 'Action', key: 'action', datatype: 'text', sortable: true },
    { displayName: 'Action Date', key: 'actionDate', datatype: 'text', sortable: true }
  ];

  const mockActions = [
    { displayName: 'View', id: 'view' },
    { displayName: 'Delete', id: 'delete' }
  ];

  const mockTableData = [
    {
      user: 'admin',
      clientIpAddress: '192.168.1.1',
      clientName: 'Client 1',
      browser: 'Chrome',
      action: 'Login',
      actionDate: '2025-06-14'
    },
    {
      user: 'user1',
      clientIpAddress: '192.168.1.2',
      clientName: 'Client 2',
      browser: 'Firefox',
      action: 'Logout',
      actionDate: '2025-06-13'
    }
  ];

  const defaultProps: RdsCompSecurityLogsProps = {
    tableHeaders: mockTableHeaders,
    actions: mockActions,
    tableData: mockTableData,
    pagination: true,
    recordsPerPage: 10,
    recordsPerPageSelectListOption: true
  };

  describe('Component Rendering', () => {
    it('should render without crashing', () => {
      render(<RdsCompSecurityLogs {...defaultProps} />);
      
      expect(screen.getByTestId('rds-comp-datatable')).toBeInTheDocument();
    });

    it('should pass correct table headers to data table', () => {
      render(<RdsCompSecurityLogs {...defaultProps} />);
      
      // Check if all headers are passed to the data table
      mockTableHeaders.forEach(header => {
        expect(screen.getByTestId(`header-${header.key}`)).toBeInTheDocument();
        expect(screen.getByTestId(`header-${header.key}`)).toHaveAttribute('data-displayname', header.displayName);
      });
    });

    it('should render with a card wrapper', () => {
      render(<RdsCompSecurityLogs {...defaultProps} />);
      
      const cardElement = screen.getByTestId('rds-comp-datatable').closest('.card');
      expect(cardElement).toBeInTheDocument();
      expect(cardElement).toHaveClass('p-2', 'border-0', 'rounded-0', 'card-full-stretch');
    });
  });

  describe('Props Handling', () => {
    it('should pass table data correctly', () => {
      render(<RdsCompSecurityLogs {...defaultProps} />);
      
      const tableDataElement = screen.getByTestId('table-data');
      expect(tableDataElement).toHaveAttribute('data-rows', '2');
    });

    it('should pass actions correctly', () => {
      render(<RdsCompSecurityLogs {...defaultProps} />);
      
      mockActions.forEach(action => {
        expect(screen.getByTestId(`action-${action.id}`)).toBeInTheDocument();
        expect(screen.getByTestId(`action-${action.id}`)).toHaveAttribute('data-displayname', action.displayName);
      });
    });

    it('should pass pagination props correctly', () => {
      render(<RdsCompSecurityLogs {...defaultProps} />);
      
      expect(screen.getByTestId('pagination')).toHaveAttribute('data-enabled', 'true');
      expect(screen.getByTestId('records-per-page')).toHaveAttribute('data-value', '10');
      expect(screen.getByTestId('records-per-page-select')).toHaveAttribute('data-enabled', 'true');
    });

    it('should set action position to Right', () => {
      render(<RdsCompSecurityLogs {...defaultProps} />);
      
      expect(screen.getByTestId('action-position')).toHaveAttribute('data-position', 'Right');
    });
  });

  describe('Default Props & Optional Props', () => {
    it('should handle missing optional props', () => {
      const minimalProps = {
        tableHeaders: mockTableHeaders
      };
      
      render(<RdsCompSecurityLogs {...minimalProps} />);
      
      expect(screen.getByTestId('rds-comp-datatable')).toBeInTheDocument();
    });

    it('should handle empty tableData', () => {
      const propsWithEmptyData = {
        ...defaultProps,
        tableData: []
      };
      
      render(<RdsCompSecurityLogs {...propsWithEmptyData} />);
      
      const tableDataElement = screen.getByTestId('table-data');
      expect(tableDataElement).toHaveAttribute('data-rows', '0');
    });

    it('should handle missing actions', () => {
      const propsWithoutActions = {
        ...defaultProps,
        actions: undefined
      };
      
      render(<RdsCompSecurityLogs {...propsWithoutActions} />);
      
      expect(screen.queryByTestId('table-actions')).toBeEmptyDOMElement();
    });
  });
});
