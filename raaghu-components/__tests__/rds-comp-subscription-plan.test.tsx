import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompSubscriptionPlan from '../src/rds-comp-subscription-plan/rds-comp-subscription-plan';

// Mock the RDS elements components
jest.mock('../src/rds-elements', () => ({
  RdsIcon: ({ name, height, width, isCursorPointer, stroke, onClick, dataTestId }: any) => (
    <div 
      data-testid={dataTestId || `rds-icon-${name}`}
      data-name={name}
      data-height={height}
      data-width={width}
      data-cursor-pointer={isCursorPointer ? 'true' : 'false'}
      data-stroke={stroke ? 'true' : 'false'}
      onClick={onClick}
      style={{ cursor: isCursorPointer ? 'pointer' : 'default' }}
    >
      {name}
    </div>
  ),
  RdsPlanSwitcher: ({ button1Text, button2Text, setIsPlanFree, dataTestId }: any) => (
    <div data-testid={dataTestId || "rds-plan-switcher"}>
      <button 
        data-testid="plan-switcher-button1" 
        onClick={() => setIsPlanFree(true)}
      >
        {button1Text}
      </button>
      <button 
        data-testid="plan-switcher-button2" 
        onClick={() => setIsPlanFree(false)}
      >
        {button2Text}
      </button>
    </div>
  ),
  RdsCard: ({ children, state, style, dataTestId }: any) => (
    <div 
      data-testid={dataTestId || "rds-card"}
      data-state={state}
      data-style={style}
    >
      {children}
    </div>
  )
}));

describe('RdsCompSubscriptionPlan Component', () => {
  // Default props for testing
  const defaultProps = {
    freePlanText: 'Free',
    premiumPlanText: 'Premium',
    upgradeText: 'Upgrade to',
    aiPunditChatText: 'AI Pundit Chat',
    proText: 'Pro',
    currentPlanText: 'Choose your plan',
    freePlanDescription: 'Perfect for individuals',
    premiumPlanDescription: 'Advanced features for professionals',
    freePlanPrice: '$0',
    premiumPlanPrice: '19.99',
    freePlanFeatures: ['Basic features', 'Limited access'],
    premiumPlanFeatures: ['All features', 'Unlimited access', 'Priority support'],
    perMonthText: '/month',
    forIndividualsText: 'For Individuals',
    forProUsersText: 'For Pro Users',
    whatsIncludedText: 'What\'s Included',
    backgroundImageSrc: 'background.gif',
    panelImageSrc: 'panel.png',
    aiPunditLogoSrc: 'logo.png'
  };

  // Basic Rendering Tests
  describe('Basic Rendering', () => {
    it('renders the component with default props', () => {
      render(<RdsCompSubscriptionPlan {...defaultProps} />);

      // Check if the main container is rendered
      expect(document.querySelector('.subscriptionContainer')).toBeInTheDocument();
      
      // Check if the close button is rendered
      expect(screen.getByTestId('rds-icon-close')).toBeInTheDocument();
      
      // Check if the background images are rendered
      const images = document.querySelectorAll('img');
      expect(images.length).toBeGreaterThanOrEqual(3);
      expect(images[0]).toHaveAttribute('src', 'background.gif');
      expect(images[1]).toHaveAttribute('src', 'panel.png');
      expect(images[2]).toHaveAttribute('src', 'logo.png');
      
      // Check if the text elements are rendered
      expect(screen.getByText('Upgrade to')).toBeInTheDocument();
      expect(screen.getByText('AI Pundit Chat')).toBeInTheDocument();
      expect(screen.getByText('Pro')).toBeInTheDocument();
      expect(screen.getByText('Choose your plan')).toBeInTheDocument();
      
      // Check if the plan switcher is rendered
      expect(screen.getByTestId('rds-plan-switcher')).toBeInTheDocument();
      expect(screen.getByTestId('plan-switcher-button1')).toHaveTextContent('Free');
      expect(screen.getByTestId('plan-switcher-button2')).toHaveTextContent('Premium');
      
      // Check if the card is rendered
      expect(screen.getByTestId('rds-card')).toBeInTheDocument();
    });    it('initially renders the free plan content', () => {
      render(<RdsCompSubscriptionPlan {...defaultProps} />);
      
      // Check if the free plan content is visible
      expect(screen.getByText('Perfect for individuals')).toBeInTheDocument();
      expect(screen.getByText('$0')).toBeInTheDocument();
      expect(screen.getByText('For Individuals')).toBeInTheDocument();
      
      // Check if free plan features are rendered
      expect(screen.getByText('Basic features')).toBeInTheDocument();
      expect(screen.getByText('Limited access')).toBeInTheDocument();
      
      // Verify that the free plan text is present in the card content
      const freeTextElement = document.querySelector('.freeText');
      expect(freeTextElement).toHaveTextContent('Free');
    });
  });

  // Plan Switching Tests
  describe('Plan Switching', () => {    it('switches from free to premium plan when premium button is clicked', () => {
      render(<RdsCompSubscriptionPlan {...defaultProps} />);
      
      // Initially, free plan should be visible
      expect(screen.getByText('Perfect for individuals')).toBeInTheDocument();
      expect(screen.getByText('$0')).toBeInTheDocument();
      
      // Click the premium plan button
      fireEvent.click(screen.getByTestId('plan-switcher-button2'));
      
      // Now premium plan should be visible
      expect(screen.getByText('Advanced features for professionals')).toBeInTheDocument();
      expect(screen.getByText('$19.99')).toBeInTheDocument();
      
      // Check if premium plan features are rendered
      expect(screen.getByText('All features')).toBeInTheDocument();
      expect(screen.getByText('Unlimited access')).toBeInTheDocument();
      expect(screen.getByText('Priority support')).toBeInTheDocument();
      
      // Verify that the premium plan text is present in the card content
      const premiumTextElement = document.querySelector('.freeText');
      expect(premiumTextElement).toHaveTextContent('Premium');
    });
    
    it('switches back to free plan when free button is clicked after premium', () => {
      render(<RdsCompSubscriptionPlan {...defaultProps} />);
      
      // Switch to premium plan first
      fireEvent.click(screen.getByTestId('plan-switcher-button2'));
      expect(screen.getByText('Advanced features for professionals')).toBeInTheDocument();
      
      // Now switch back to free plan
      fireEvent.click(screen.getByTestId('plan-switcher-button1'));
      
      // Check if free plan content is visible again
      expect(screen.getByText('Perfect for individuals')).toBeInTheDocument();
      expect(screen.getByText('$0')).toBeInTheDocument();
      expect(screen.getByText('Basic features')).toBeInTheDocument();
    });
  });

  // Customization Tests
  describe('Customization', () => {
    it('renders with custom plan amount when provided', () => {
      const customProps = {
        ...defaultProps,
        planAmount: '29.99'
      };
      
      render(<RdsCompSubscriptionPlan {...customProps} />);
      
      // Switch to premium plan to see the custom amount
      fireEvent.click(screen.getByTestId('plan-switcher-button2'));
      
      // Check if the custom price is displayed
      expect(screen.getByText('$29.99')).toBeInTheDocument();
    });
    
    it('uses premium plan price when plan amount is not provided', () => {
      render(<RdsCompSubscriptionPlan {...defaultProps} />);
      
      // Switch to premium plan
      fireEvent.click(screen.getByTestId('plan-switcher-button2'));
      
      // Check if the default premium price is displayed
      expect(screen.getByText('$19.99')).toBeInTheDocument();
    });
  });

  // Modal Behavior Tests
  describe('Modal Behavior', () => {
    it('closes the modal when close button is clicked', () => {
      render(<RdsCompSubscriptionPlan {...defaultProps} />);
      
      // Initially the modal should be visible
      expect(document.querySelector('.subscriptionContainer')).toBeInTheDocument();
      
      // Click the close button
      fireEvent.click(screen.getByTestId('rds-icon-close'));
      
      // The modal should be removed from the DOM
      expect(document.querySelector('.subscriptionContainer')).not.toBeInTheDocument();
    });
  });

  // Feature Rendering Tests
  describe('Feature Rendering', () => {
    it('renders the correct number of features for free plan', () => {
      render(<RdsCompSubscriptionPlan {...defaultProps} />);
      
      // There should be two features in the free plan
      const featureContainers = document.querySelectorAll('.accessChat');
      expect(featureContainers.length).toBe(2);
    });
    
    it('renders the correct number of features for premium plan', () => {
      render(<RdsCompSubscriptionPlan {...defaultProps} />);
      
      // Switch to premium plan
      fireEvent.click(screen.getByTestId('plan-switcher-button2'));
      
      // There should be three features in the premium plan
      const featureContainers = document.querySelectorAll('.accessChat');
      expect(featureContainers.length).toBe(3);
    });
    
    it('renders check icons for each feature', () => {
      render(<RdsCompSubscriptionPlan {...defaultProps} />);
      
      // Each feature should have a check icon
      const checkIcons = document.querySelectorAll('.accessChat img');
      expect(checkIcons.length).toBe(2); // 2 features in free plan
      
      checkIcons.forEach(icon => {
        expect(icon).toHaveAttribute('src', './assets/check.png');
        expect(icon).toHaveAttribute('alt', 'Check Icon');
      });
    });
  });
});
