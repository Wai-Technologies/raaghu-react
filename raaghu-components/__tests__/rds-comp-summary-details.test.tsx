import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompSummaryDetails from '../src/rds-comp-summary-details/rds-comp-summary-details';

// Mock the RdsPaymentSummary component
jest.mock('../../raaghu-elements/src/rds-payment-summary/rds-payment-summary', () => {
  return function MockRdsPaymentSummary(props: any) {
    return (
      <div data-testid="mocked-payment-summary">
        <div data-testid="summary-plan-name">{props.summaryDetailsList?.planName}</div>
        <div data-testid="summary-license-tenure">{props.summaryDetailsList?.licenseTenureName}</div>
        <div data-testid="summary-license-price">{props.summaryDetailsList?.licensePrice}</div>
        <div data-testid="summary-additional-devs">{props.summaryDetailsList?.additionalDevelopersCount}</div>
        <div data-testid="summary-additional-devs-price">{props.summaryDetailsList?.additionalDevelopersPrice}</div>
        <div data-testid="summary-additional-devs-total">{props.summaryDetailsList?.additionalDevelopersTotalPrice}</div>
        <div data-testid="summary-total-price">{props.summaryDetailsList?.totalPrice}</div>
        <div data-testid="summary-tax-percentage">{props.summaryDetailsList?.taxPercentage}</div>
        <div data-testid="summary-tax-price">{props.summaryDetailsList?.taxPrice}</div>
        <div data-testid="summary-discount-percentage">{props.summaryDetailsList?.discountPercentage}</div>
        <div data-testid="summary-discount-price">{props.summaryDetailsList?.discountPrice}</div>
        <div data-testid="summary-total-net-price">{props.summaryDetailsList?.totalNetPrice}</div>
      </div>
    );
  };
});

describe('RdsCompSummaryDetails Component', () => {
  // Sample summary details data for testing
  const mockSummaryDetails = {
    planName: 'Premium Plan',
    licenseTenureName: 'Annual',
    licensePrice: '100',
    additionalDevelopersCount: 2,
    additionalDevelopersPrice: '25',
    additionalDevelopersTotalPrice: '50',
    totalPrice: '150',
    taxPercentage: 10,
    taxPrice: '15',
    discountPercentage: 5,
    discountPrice: '7.50',
    totalNetPrice: '$157.50'
  };

  // Basic Rendering Tests
  describe('Basic Rendering', () => {
    it('renders without crashing', () => {
      render(<RdsCompSummaryDetails />);
      expect(screen.getByTestId('mocked-payment-summary')).toBeInTheDocument();
    });

    it('renders with provided summary details', () => {
      render(<RdsCompSummaryDetails summaryDetailsList={mockSummaryDetails} />);
      expect(screen.getByTestId('mocked-payment-summary')).toBeInTheDocument();
    });
  });

  // Props Passing Tests
  describe('Props Passing', () => {
    it('passes summary details props correctly to RdsPaymentSummary', () => {
      render(<RdsCompSummaryDetails summaryDetailsList={mockSummaryDetails} />);
      
      // Check if all data is correctly passed to the child component
      expect(screen.getByTestId('summary-plan-name')).toHaveTextContent('Premium Plan');
      expect(screen.getByTestId('summary-license-tenure')).toHaveTextContent('Annual');
      expect(screen.getByTestId('summary-license-price')).toHaveTextContent('100');
      expect(screen.getByTestId('summary-additional-devs')).toHaveTextContent('2');
      expect(screen.getByTestId('summary-additional-devs-price')).toHaveTextContent('25');
      expect(screen.getByTestId('summary-additional-devs-total')).toHaveTextContent('50');
      expect(screen.getByTestId('summary-total-price')).toHaveTextContent('150');
      expect(screen.getByTestId('summary-tax-percentage')).toHaveTextContent('10');
      expect(screen.getByTestId('summary-tax-price')).toHaveTextContent('15');
      expect(screen.getByTestId('summary-discount-percentage')).toHaveTextContent('5');
      expect(screen.getByTestId('summary-discount-price')).toHaveTextContent('7.50');
      expect(screen.getByTestId('summary-total-net-price')).toHaveTextContent('$157.50');
    });
  });

  // Different Data Types Tests
  describe('Different Types of Summary Data', () => {
    it('handles numeric string values correctly', () => {
      const numericStringData = {
        ...mockSummaryDetails,
        licensePrice: '199.99',
        totalPrice: '249.99',
        taxPrice: '24.99',
        discountPrice: '12.50',
        totalNetPrice: '$262.48'
      };
      
      render(<RdsCompSummaryDetails summaryDetailsList={numericStringData} />);
      expect(screen.getByTestId('summary-license-price')).toHaveTextContent('199.99');
      expect(screen.getByTestId('summary-total-price')).toHaveTextContent('249.99');
      expect(screen.getByTestId('summary-tax-price')).toHaveTextContent('24.99');
      expect(screen.getByTestId('summary-discount-price')).toHaveTextContent('12.50');
      expect(screen.getByTestId('summary-total-net-price')).toHaveTextContent('$262.48');
    });

    it('handles numeric values correctly', () => {
      const numericData = {
        ...mockSummaryDetails,
        licensePrice: 199.99,
        additionalDevelopersCount: 3,
        additionalDevelopersPrice: 25,
        totalPrice: 249.99,
        taxPercentage: 10,
        taxPrice: 24.99,
        discountPercentage: 5,
        discountPrice: 12.50,
        totalNetPrice: '$262.48'
      };
      
      render(<RdsCompSummaryDetails summaryDetailsList={numericData} />);
      expect(screen.getByTestId('summary-license-price')).toHaveTextContent('199.99');
      expect(screen.getByTestId('summary-additional-devs')).toHaveTextContent('3');
      expect(screen.getByTestId('summary-total-price')).toHaveTextContent('249.99');
    });

    it('handles formatted currency values correctly', () => {
      const formattedData = {
        ...mockSummaryDetails,
        licensePrice: '$199.99',
        totalPrice: '$249.99',
        taxPrice: '$24.99',
        discountPrice: '$12.50',
        totalNetPrice: '$262.48'
      };
      
      render(<RdsCompSummaryDetails summaryDetailsList={formattedData} />);
      expect(screen.getByTestId('summary-license-price')).toHaveTextContent('$199.99');
      expect(screen.getByTestId('summary-total-price')).toHaveTextContent('$249.99');
      expect(screen.getByTestId('summary-tax-price')).toHaveTextContent('$24.99');
      expect(screen.getByTestId('summary-discount-price')).toHaveTextContent('$12.50');
      expect(screen.getByTestId('summary-total-net-price')).toHaveTextContent('$262.48');
    });
  });

  // Edge Cases Tests
  describe('Edge Cases', () => {
    it('handles undefined summaryDetailsList prop', () => {
      render(<RdsCompSummaryDetails />);
      expect(screen.getByTestId('mocked-payment-summary')).toBeInTheDocument();
      // All fields should be empty
      expect(screen.getByTestId('summary-plan-name')).toBeEmptyDOMElement();
      expect(screen.getByTestId('summary-license-tenure')).toBeEmptyDOMElement();
      expect(screen.getByTestId('summary-license-price')).toBeEmptyDOMElement();
    });

    it('handles null summaryDetailsList prop', () => {
      render(<RdsCompSummaryDetails summaryDetailsList={null} />);
      expect(screen.getByTestId('mocked-payment-summary')).toBeInTheDocument();
      // All fields should be empty
      expect(screen.getByTestId('summary-plan-name')).toBeEmptyDOMElement();
      expect(screen.getByTestId('summary-license-tenure')).toBeEmptyDOMElement();
      expect(screen.getByTestId('summary-license-price')).toBeEmptyDOMElement();
    });

    it('handles empty object summaryDetailsList prop', () => {
      render(<RdsCompSummaryDetails summaryDetailsList={{}} />);
      expect(screen.getByTestId('mocked-payment-summary')).toBeInTheDocument();
      // All fields should be empty
      expect(screen.getByTestId('summary-plan-name')).toBeEmptyDOMElement();
      expect(screen.getByTestId('summary-license-tenure')).toBeEmptyDOMElement();
      expect(screen.getByTestId('summary-license-price')).toBeEmptyDOMElement();
    });

    it('handles incomplete summaryDetailsList prop', () => {
      const incompleteData = {
        planName: 'Basic Plan',
        // Missing other fields
      };
      
      render(<RdsCompSummaryDetails summaryDetailsList={incompleteData} />);
      expect(screen.getByTestId('mocked-payment-summary')).toBeInTheDocument();
      
      // Check that provided field is rendered
      expect(screen.getByTestId('summary-plan-name')).toHaveTextContent('Basic Plan');
      
      // Check that missing fields are empty
      expect(screen.getByTestId('summary-license-tenure')).toBeEmptyDOMElement();
      expect(screen.getByTestId('summary-license-price')).toBeEmptyDOMElement();
      expect(screen.getByTestId('summary-total-price')).toBeEmptyDOMElement();
    });
  });
});
