import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompSubscription from '../src/rds-comp-subscription/rds-comp-subscription';

// Mock the i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {})
      }
    };
  }
}));

// Mock the RDS components
jest.mock('../src/rds-elements', () => ({
  RdsButton: (props: any) => (
    <button 
      data-testid="rds-button"
      onClick={props.onClick}
      className={props.class}
      disabled={props.isDisabled}
    >
      {props.label}
    </button>
  ),
  RdsIcon: (props: any) => (
    <span 
      data-testid={`rds-icon-${props.name}`}
      data-name={props.name}
      data-color-variant={props.colorVariant}
      data-fill={props.fill ? 'true' : 'false'}
      data-stroke={props.stroke ? 'true' : 'false'}
      data-width={props.width}
      data-height={props.height}
      onClick={props.onClick}
      style={{ 
        cursor: props.isCursorPointer ? 'pointer' : 'default',
        width: props.width,
        height: props.height 
      }}
    >
      {props.name}
    </span>
  )
}));

describe('RdsCompSubscription Component', () => {
  // Sample subscription data for testing
  const mockSubscriptionData = [
    {
      name: 'Basic Plan',
      colorVariant: 'primary',
      icon: 'dashboard',
      price: '$10',
      duration: 'per month',
      recommended: false,
      features: [
        { title: 'Feature 1', isInclude: true },
        { title: 'Feature 2', isInclude: false }
      ]
    },
    {
      name: 'Premium Plan',
      colorVariant: 'success',
      icon: 'settings',
      price: '$20',
      duration: 'per month',
      recommended: true,
      features: [
        { title: 'Feature 1', isInclude: true },
        { title: 'Feature 2', isInclude: true },
        { title: 'Feature 3', isInclude: true }
      ]
    }
  ];

  const defaultProps = {
    subscriptionData: mockSubscriptionData
  };

  // Basic Rendering Tests
  describe('Basic Rendering', () => {
    it('renders subscription cards with all the required elements', () => {
      render(<RdsCompSubscription {...defaultProps} />);
      
      // Check if both cards are rendered
      const subscriptionCards = screen.getAllByTestId('subscription-card');
      expect(subscriptionCards).toHaveLength(2);
      
      // Check if plan names are displayed
      expect(screen.getByText('Basic Plan')).toBeInTheDocument();
      expect(screen.getByText('Premium Plan')).toBeInTheDocument();
      
      // Check if prices are displayed
      expect(screen.getByText('$10')).toBeInTheDocument();
      expect(screen.getByText('$20')).toBeInTheDocument();
      
      // Check if durations are displayed
      expect(screen.getAllByText('per month')).toHaveLength(2);
      
      // Check if icons are displayed
      expect(screen.getByTestId('rds-icon-dashboard')).toBeInTheDocument();
      expect(screen.getByTestId('rds-icon-settings')).toBeInTheDocument();
      
      // Check if upgrade buttons are displayed
      const upgradeButtons = screen.getAllByText('Upgrade');
      expect(upgradeButtons).toHaveLength(2);
    });

    it('renders with custom width when width prop is provided', () => {
      render(<RdsCompSubscription {...defaultProps} width="300px" />);
      
      const subscriptionCards = screen.getAllByTestId('subscription-card');
      subscriptionCards.forEach(card => {
        expect(card).toHaveStyle({ width: '300px' });
      });
    });

    it('renders with default width when width prop is not provided', () => {
      render(<RdsCompSubscription {...defaultProps} />);
      
      const subscriptionCards = screen.getAllByTestId('subscription-card');
      subscriptionCards.forEach(card => {
        expect(card).toHaveStyle({ width: '226px' });
      });
    });
  });

  // Feature Icon Tests
  describe('Feature Icons', () => {
    it('renders tick icon for included features', () => {
      render(<RdsCompSubscription {...defaultProps} />);
      
      // Basic plan has one included feature
      const tickIcons = screen.getAllByTestId('rds-icon-tick_circle');
      expect(tickIcons.length).toBeGreaterThanOrEqual(1);
    });

    it('renders close icon for non-included features', () => {
      render(<RdsCompSubscription {...defaultProps} />);
      
      // Basic plan has one non-included feature
      const closeIcons = screen.getAllByTestId('rds-icon-close_circle');
      expect(closeIcons.length).toBeGreaterThanOrEqual(1);
    });
  });

  // Recommendation Badge Tests
  describe('Recommendation Badge', () => {
    it('displays recommendation badge for recommended plans', () => {
      render(<RdsCompSubscription {...defaultProps} />);
      
      // Premium plan is recommended
      expect(screen.getByText('RECOMMENDED')).toBeInTheDocument();
      expect(screen.getByTestId('rds-icon-star')).toBeInTheDocument();
    });

    it('does not display recommendation badge for non-recommended plans', () => {
      const nonRecommendedData = [
        {
          name: 'Basic Plan',
          colorVariant: 'primary',
          icon: 'dashboard',
          price: '$10',
          duration: 'per month',
          recommended: false,
          features: []
        }
      ];
      
      render(<RdsCompSubscription subscriptionData={nonRecommendedData} />);
      
      // No plan is recommended
      expect(screen.queryByText('RECOMMENDED')).not.toBeInTheDocument();
      expect(screen.queryByTestId('rds-icon-star')).not.toBeInTheDocument();
    });
  });

  // Color Variant Tests
  describe('Color Variants', () => {
    it('applies the correct color variant classes', () => {
      render(<RdsCompSubscription {...defaultProps} />);
      
      // Check if header has the correct background color class
      const headers = document.querySelectorAll('.card-header');
      expect(headers[0]).toHaveClass('bg-primary');
      expect(headers[1]).toHaveClass('bg-success');
      
      // Check if card has the correct border color class
      const cards = document.querySelectorAll('.card');
      expect(cards[0]).toHaveClass('border-primary');
      expect(cards[1]).toHaveClass('border-success');
    });
  });

  // Interaction Tests
  describe('Interaction', () => {
    it('calls onSubscription handler when upgrade button is clicked', () => {
      const onSubscriptionMock = jest.fn();
      
      render(<RdsCompSubscription 
        {...defaultProps} 
        onSubscription={onSubscriptionMock}
      />);
      
      // Click the first upgrade button
      const upgradeButtons = screen.getAllByText('Upgrade');
      fireEvent.click(upgradeButtons[0]);
      
      // Check if the handler was called with the correct item
      expect(onSubscriptionMock).toHaveBeenCalledTimes(1);
      expect(onSubscriptionMock.mock.calls[0][1]).toEqual(mockSubscriptionData[0]);
      
      // Click the second upgrade button
      fireEvent.click(upgradeButtons[1]);
      
      // Check if the handler was called again with the correct item
      expect(onSubscriptionMock).toHaveBeenCalledTimes(2);
      expect(onSubscriptionMock.mock.calls[1][1]).toEqual(mockSubscriptionData[1]);
    });

    it('does not throw error when onSubscription handler is not provided', () => {
      render(<RdsCompSubscription {...defaultProps} onSubscription={undefined} />);
      
      // Click the upgrade button (should not throw error)
      const upgradeButton = screen.getAllByText('Upgrade')[0];
      expect(() => {
        fireEvent.click(upgradeButton);
      }).not.toThrow();
    });
  });

  // Edge Cases
  describe('Edge Cases', () => {
    it('handles empty subscription data array', () => {
      render(<RdsCompSubscription subscriptionData={[]} />);
      
      // No subscription cards should be rendered
      const subscriptionCards = screen.queryAllByTestId('subscription-card');
      expect(subscriptionCards).toHaveLength(0);
    });

    it('handles missing features array', () => {
      const dataWithMissingFeatures = [
        {
          name: 'Basic Plan',
          colorVariant: 'primary',
          icon: 'dashboard',
          price: '$10',
          duration: 'per month',
          recommended: false
          // features array is missing
        }
      ];
      
      // Should not throw error
      expect(() => {
        render(<RdsCompSubscription subscriptionData={dataWithMissingFeatures} />);
      }).not.toThrow();
    });
  });
});
