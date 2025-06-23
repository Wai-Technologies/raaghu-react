import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompBilling from '../src/rds-comp-billing/rds-comp-billing';
import { ActionPosition } from '../src/rds-comp-data-table/rds-comp-data-table';

// Define interfaces for better type checking
interface SubscriptionItem {
  plan: string;
  price: string;
  features: Array<{ featureName: string; isInclude: boolean }>;
  colorVariant: string;
  recommended: boolean;
  buttonText: string;
}

interface BillingHeader {
  displayName: string;
  key: string;
  datatype: string;
  sortable: boolean;
}

interface BillingData {
  id: number;
  invoice: string;
  amount: string;
  date: string;
  status: string;
  [key: string]: any;
}

interface Action {
  id: string;
  label: string;
  icon: string;
}

// Mock the sub-components
jest.mock('../src/rds-comp-subscription', () => ({
  __esModule: true,
  default: ({ subscriptionData }: { subscriptionData: SubscriptionItem[] }) => (
    <div data-testid="rds-comp-subscription">
      {subscriptionData.map((item: SubscriptionItem, index: number) => (
        <div key={index} data-testid="subscription-card">
          <div data-testid="subscription-name">{item.plan}</div>
          <div data-testid="subscription-price">{item.price}</div>
        </div>
      ))}
    </div>
  ),
}));

jest.mock('../src/rds-comp-data-table', () => ({
  __esModule: true,
  default: ({ 
    tableHeaders, 
    tableData, 
    actions, 
    onActionSelection 
  }: { 
    tableHeaders: BillingHeader[]; 
    tableData: BillingData[]; 
    actions: Action[];
    onActionSelection: (arg: { actionId: string; rowData: BillingData }) => void;
  }) => (
    <div data-testid="rds-comp-datatable">
      <table>
        <thead>
          <tr>
            {tableHeaders.map((header: BillingHeader, index: number) => (
              <th key={index} data-testid={`header-${header.key}`}>{header.displayName}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row: BillingData, rowIndex: number) => (
            <tr key={rowIndex} data-testid={`row-${rowIndex}`}>
              {tableHeaders.map((header: BillingHeader, cellIndex: number) => (
                <td key={cellIndex} data-testid={`cell-${rowIndex}-${header.key}`}>
                  {row[header.key]}
                </td>
              ))}
              <td>
                {actions && actions.map((action: Action, actionIndex: number) => (
                  <button 
                    key={actionIndex}
                    data-testid={`action-${actionIndex}-row-${rowIndex}`}
                    onClick={() => onActionSelection({ 
                      actionId: action.id, 
                      rowData: row 
                    })}
                  >
                    {action.label}
                  </button>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),
}));

jest.mock('../src/rds-elements', () => ({
  RdsButton: ({ 
    label, 
    dataTestId, 
    onClick 
  }: { 
    label: string; 
    dataTestId?: string; 
    onClick?: () => void 
  }) => (
    <button data-testid={dataTestId || 'rds-button'} onClick={onClick}>
      {label}
    </button>
  ),
}));

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (str: string) => str,
    i18n: {
      changeLanguage: () => new Promise(() => {}),
    },
  }),
}));

describe('RdsCompBilling', () => {
  // Sample data for testing
  const mockSubscriptionData: SubscriptionItem[] = [
    {
      plan: 'Basic',
      price: '$10/month',
      features: [
        { featureName: 'Feature 1', isInclude: true },
        { featureName: 'Feature 2', isInclude: false },
      ],
      colorVariant: 'primary',
      recommended: true,
      buttonText: 'Subscribe',
    },
    {
      plan: 'Premium',
      price: '$50/month',
      features: [
        { featureName: 'Feature 1', isInclude: true },
        { featureName: 'Feature 2', isInclude: true },
      ],
      colorVariant: 'secondary',
      recommended: false,
      buttonText: 'Subscribe',
    },
  ];

  const mockBillingHeaders: BillingHeader[] = [
    { displayName: 'Invoice', key: 'invoice', datatype: 'text', sortable: true },
    { displayName: 'Amount', key: 'amount', datatype: 'text', sortable: true },
    { displayName: 'Date', key: 'date', datatype: 'text', sortable: true },
    { displayName: 'Status', key: 'status', datatype: 'text', sortable: true },
  ];

  const mockBillingData: BillingData[] = [
    { id: 1, invoice: 'INV-001', amount: '$100', date: '2023-01-01', status: 'Paid' },
    { id: 2, invoice: 'INV-002', amount: '$200', date: '2023-02-01', status: 'Pending' },
    { id: 3, invoice: 'INV-003', amount: '$150', date: '2023-03-01', status: 'Paid' },
  ];

  const mockActions: Action[] = [
    { id: 'download', label: 'Download', icon: 'download' },
    { id: 'view', label: 'View', icon: 'visibility' },
  ];

  const mockOnActionSelection = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    const { container } = render(
      <RdsCompBilling
        subscriptionData={mockSubscriptionData}
        billingData={mockBillingData}
        billingHeaders={mockBillingHeaders}
        actions={mockActions}
        onActionSelection={mockOnActionSelection}
      />
    );
    expect(container).toBeTruthy();
  });

  it('renders subscription component with correct data', () => {
    render(
      <RdsCompBilling
        subscriptionData={mockSubscriptionData}
        billingData={mockBillingData}
        billingHeaders={mockBillingHeaders}
        actions={mockActions}
        onActionSelection={mockOnActionSelection}
      />
    );
    
    expect(screen.getByTestId('rds-comp-subscription')).toBeInTheDocument();
    expect(screen.getAllByTestId('subscription-card')).toHaveLength(mockSubscriptionData.length);
    expect(screen.getAllByTestId('subscription-name')[0]).toHaveTextContent(mockSubscriptionData[0].plan);
    expect(screen.getAllByTestId('subscription-price')[0]).toHaveTextContent(mockSubscriptionData[0].price);
  });

  it('renders datatable component with correct data', () => {
    render(
      <RdsCompBilling
        subscriptionData={mockSubscriptionData}
        billingData={mockBillingData}
        billingHeaders={mockBillingHeaders}
        actions={mockActions}
        onActionSelection={mockOnActionSelection}
      />
    );
    
    expect(screen.getByTestId('rds-comp-datatable')).toBeInTheDocument();
    
    // Check headers
    mockBillingHeaders.forEach(header => {
      expect(screen.getByTestId(`header-${header.key}`)).toHaveTextContent(header.displayName);
    });
    
    // Check rows
    expect(screen.getAllByTestId(/^row-\d+$/)).toHaveLength(mockBillingData.length);
    
    // Check specific cell content
    expect(screen.getByTestId('cell-0-invoice')).toHaveTextContent(mockBillingData[0].invoice);
    expect(screen.getByTestId('cell-1-amount')).toHaveTextContent(mockBillingData[1].amount);
    expect(screen.getByTestId('cell-2-status')).toHaveTextContent(mockBillingData[2].status);
  });

  it('renders download all button', () => {
    render(
      <RdsCompBilling
        subscriptionData={mockSubscriptionData}
        billingData={mockBillingData}
        billingHeaders={mockBillingHeaders}
        actions={mockActions}
        onActionSelection={mockOnActionSelection}
      />
    );
    
    expect(screen.getByTestId('download-all')).toBeInTheDocument();
    expect(screen.getByTestId('download-all')).toHaveTextContent('Download All');
  });

  it('calls onActionSelection when an action button is clicked', () => {
    render(
      <RdsCompBilling
        subscriptionData={mockSubscriptionData}
        billingData={mockBillingData}
        billingHeaders={mockBillingHeaders}
        actions={mockActions}
        onActionSelection={mockOnActionSelection}
      />
    );
    
    // Click on the first action button for the first row
    fireEvent.click(screen.getByTestId('action-0-row-0'));
    
    // Check if onActionSelection was called with the correct arguments
    expect(mockOnActionSelection).toHaveBeenCalledTimes(1);
    expect(mockOnActionSelection).toHaveBeenCalledWith({
      actionId: mockActions[0].id,
      rowData: mockBillingData[0]
    });
  });

  it('renders billing history heading and description', () => {
    render(
      <RdsCompBilling
        subscriptionData={mockSubscriptionData}
        billingData={mockBillingData}
        billingHeaders={mockBillingHeaders}
        actions={mockActions}
        onActionSelection={mockOnActionSelection}
      />
    );
    
    expect(screen.getByText('Billing History')).toBeInTheDocument();
    expect(screen.getByText('Check your billing history.')).toBeInTheDocument();
  });

  it('handles empty billing data gracefully', () => {
    render(
      <RdsCompBilling
        subscriptionData={mockSubscriptionData}
        billingData={[]}
        billingHeaders={mockBillingHeaders}
        actions={mockActions}
        onActionSelection={mockOnActionSelection}
      />
    );
    
    // Should still render the component without errors
    expect(screen.getByTestId('rds-comp-datatable')).toBeInTheDocument();
    expect(screen.queryAllByTestId(/^row-\d+$/)).toHaveLength(0);
  });
});

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (str: string) => str,
    i18n: {
      changeLanguage: () => new Promise(() => {}),
    },
  }),
}));

describe('RdsCompBilling', () => {
  // Sample data for testing
  const mockSubscriptionData = [
    {
      plan: 'Basic',
      price: '$10/month',
      features: [
        { featureName: 'Feature 1', isInclude: true },
        { featureName: 'Feature 2', isInclude: false },
      ],
      colorVariant: 'primary',
      recommended: true,
      buttonText: 'Subscribe',
    },
    {
      plan: 'Premium',
      price: '$50/month',
      features: [
        { featureName: 'Feature 1', isInclude: true },
        { featureName: 'Feature 2', isInclude: true },
      ],
      colorVariant: 'secondary',
      recommended: false,
      buttonText: 'Subscribe',
    },
  ];

  const mockBillingHeaders = [
    { displayName: 'Invoice', key: 'invoice', datatype: 'text', sortable: true },
    { displayName: 'Amount', key: 'amount', datatype: 'text', sortable: true },
    { displayName: 'Date', key: 'date', datatype: 'text', sortable: true },
    { displayName: 'Status', key: 'status', datatype: 'text', sortable: true },
  ];

  const mockBillingData = [
    { id: 1, invoice: 'INV-001', amount: '$100', date: '2023-01-01', status: 'Paid' },
    { id: 2, invoice: 'INV-002', amount: '$200', date: '2023-02-01', status: 'Pending' },
    { id: 3, invoice: 'INV-003', amount: '$150', date: '2023-03-01', status: 'Paid' },
  ];

  const mockActions = [
    { id: 'download', label: 'Download', icon: 'download' },
    { id: 'view', label: 'View', icon: 'visibility' },
  ];

  const mockOnActionSelection = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    const { container } = render(
      <RdsCompBilling
        subscriptionData={mockSubscriptionData}
        billingData={mockBillingData}
        billingHeaders={mockBillingHeaders}
        actions={mockActions}
        onActionSelection={mockOnActionSelection}
      />
    );
    expect(container).toBeTruthy();
  });

  it('renders subscription component with correct data', () => {
    render(
      <RdsCompBilling
        subscriptionData={mockSubscriptionData}
        billingData={mockBillingData}
        billingHeaders={mockBillingHeaders}
        actions={mockActions}
        onActionSelection={mockOnActionSelection}
      />
    );
    
    expect(screen.getByTestId('rds-comp-subscription')).toBeInTheDocument();
    expect(screen.getAllByTestId('subscription-card')).toHaveLength(mockSubscriptionData.length);
    expect(screen.getAllByTestId('subscription-name')[0]).toHaveTextContent(mockSubscriptionData[0].plan);
    expect(screen.getAllByTestId('subscription-price')[0]).toHaveTextContent(mockSubscriptionData[0].price);
  });

  it('renders datatable component with correct data', () => {
    render(
      <RdsCompBilling
        subscriptionData={mockSubscriptionData}
        billingData={mockBillingData}
        billingHeaders={mockBillingHeaders}
        actions={mockActions}
        onActionSelection={mockOnActionSelection}
      />
    );
    
    expect(screen.getByTestId('rds-comp-datatable')).toBeInTheDocument();
    
    // Check headers
    mockBillingHeaders.forEach(header => {
      expect(screen.getByTestId(`header-${header.key}`)).toHaveTextContent(header.displayName);
    });
    
    // Check rows
    expect(screen.getAllByTestId(/^row-\d+$/)).toHaveLength(mockBillingData.length);
    
    // Check specific cell content
    expect(screen.getByTestId('cell-0-invoice')).toHaveTextContent(mockBillingData[0].invoice);
    expect(screen.getByTestId('cell-1-amount')).toHaveTextContent(mockBillingData[1].amount);
    expect(screen.getByTestId('cell-2-status')).toHaveTextContent(mockBillingData[2].status);
  });

  it('renders download all button', () => {
    render(
      <RdsCompBilling
        subscriptionData={mockSubscriptionData}
        billingData={mockBillingData}
        billingHeaders={mockBillingHeaders}
        actions={mockActions}
        onActionSelection={mockOnActionSelection}
      />
    );
    
    expect(screen.getByTestId('download-all')).toBeInTheDocument();
    expect(screen.getByTestId('download-all')).toHaveTextContent('Download All');
  });

  it('calls onActionSelection when an action button is clicked', () => {
    render(
      <RdsCompBilling
        subscriptionData={mockSubscriptionData}
        billingData={mockBillingData}
        billingHeaders={mockBillingHeaders}
        actions={mockActions}
        onActionSelection={mockOnActionSelection}
      />
    );
    
    // Click on the first action button for the first row
    fireEvent.click(screen.getByTestId('action-0-row-0'));
    
    // Check if onActionSelection was called with the correct arguments
    expect(mockOnActionSelection).toHaveBeenCalledTimes(1);
    expect(mockOnActionSelection).toHaveBeenCalledWith({
      actionId: mockActions[0].id,
      rowData: mockBillingData[0]
    });
  });

  it('renders billing history heading and description', () => {
    render(
      <RdsCompBilling
        subscriptionData={mockSubscriptionData}
        billingData={mockBillingData}
        billingHeaders={mockBillingHeaders}
        actions={mockActions}
        onActionSelection={mockOnActionSelection}
      />
    );
    
    expect(screen.getByText('Billing History')).toBeInTheDocument();
    expect(screen.getByText('Check your billing history.')).toBeInTheDocument();
  });

  it('handles empty billing data gracefully', () => {
    render(
      <RdsCompBilling
        subscriptionData={mockSubscriptionData}
        billingData={[]}
        billingHeaders={mockBillingHeaders}
        actions={mockActions}
        onActionSelection={mockOnActionSelection}
      />
    );
    
    // Should still render the component without errors
    expect(screen.getByTestId('rds-comp-datatable')).toBeInTheDocument();
    expect(screen.queryAllByTestId(/^row-\d+$/)).toHaveLength(0);
  });
});