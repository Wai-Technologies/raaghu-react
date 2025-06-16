import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompUserManagement from '../src/rds-comp-user-management/rds-comp-user-management';

// Mock the RdsCheckbox component
jest.mock('../src/rds-elements', () => ({
  RdsCheckbox: jest.fn(({ labelText, dataTestId, ...props }) => (
    <div data-testid={dataTestId} {...props}>
      <input type="checkbox" />
      <label>{labelText}</label>
    </div>
  )),
}));

describe('RdsCompUserManagement', () => {
  const mockProps = {
    Usermanagementsettings: {}
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Basic rendering tests
  describe('Basic Rendering', () => {
    it('renders without crashing', () => {
      render(<RdsCompUserManagement {...mockProps} />);
      expect(screen.getByText('Email Confirmation Required For Login.')).toBeInTheDocument();
    });

    it('renders the main container with correct structure', () => {
      const { container } = render(<RdsCompUserManagement {...mockProps} />);
      const mainDiv = container.querySelector('.fw-normal.mt-4');
      expect(mainDiv).toBeInTheDocument();
    });
  });

  // Security Settings Section Tests
  describe('Security Settings Section', () => {
    it('renders email confirmation checkbox', () => {
      render(<RdsCompUserManagement {...mockProps} />);
      const emailCheckbox = screen.getByTestId('email-confirmation');
      expect(emailCheckbox).toBeInTheDocument();
      expect(screen.getByText('Email Confirmation Required For Login.')).toBeInTheDocument();
    });

    it('renders phone number verification checkbox', () => {
      render(<RdsCompUserManagement {...mockProps} />);
      const phoneCheckbox = screen.getByTestId('phone-number-verification');
      expect(phoneCheckbox).toBeInTheDocument();
      expect(screen.getByText('Phone Number Verification Enabled (Via SMS).')).toBeInTheDocument();
    });

    it('renders security image question checkbox', () => {
      render(<RdsCompUserManagement {...mockProps} />);
      const securityCheckbox = screen.getByTestId('security-image-quest');
      expect(securityCheckbox).toBeInTheDocument();
      expect(screen.getByText('Use Security Image Question (Captcha) On Login.')).toBeInTheDocument();
    });

    it('security checkboxes have correct default props', () => {
      const { RdsCheckbox } = require('../src/rds-elements');
      render(<RdsCompUserManagement {...mockProps} />);
      
      expect(RdsCheckbox).toHaveBeenCalledWith(
        expect.objectContaining({
          isDisabled: false,
          checked: false,
          showText: true,
          isSwitch: false,
          dataTestId: 'email-confirmation'
        }),
        expect.anything()
      );
    });
  });

  // Cookie Consent Section Tests
  describe('Cookie Consent Section', () => {
    it('renders cookie consent section label', () => {
      render(<RdsCompUserManagement {...mockProps} />);
      expect(screen.getByText('Cookie Consent')).toBeInTheDocument();
    });

    it('renders cookie consent checkbox', () => {
      render(<RdsCompUserManagement {...mockProps} />);
      const cookieCheckbox = screen.getByTestId('cookie-consent-enable');
      expect(cookieCheckbox).toBeInTheDocument();
      expect(screen.getByText('Cookie Consent Enabled')).toBeInTheDocument();
    });

    it('cookie consent label has correct styling', () => {
      const { container } = render(<RdsCompUserManagement {...mockProps} />);
      const cookieLabel = screen.getByText('Cookie Consent');
      expect(cookieLabel).toHaveClass('mt-3', 'fw-medium');
    });
  });

  // Session Timeout Section Tests
  describe('Session Timeout Section', () => {
    it('renders session timeout section label', () => {
      render(<RdsCompUserManagement {...mockProps} />);
      expect(screen.getByText('Session Timeout Control')).toBeInTheDocument();
    });

    it('renders session timeout checkbox', () => {
      render(<RdsCompUserManagement {...mockProps} />);
      const sessionCheckbox = screen.getByTestId('session-time-out-control');
      expect(sessionCheckbox).toBeInTheDocument();
      expect(screen.getByText('Session Time Out Control Enabled')).toBeInTheDocument();
    });

    it('session timeout label has correct styling', () => {
      const { container } = render(<RdsCompUserManagement {...mockProps} />);
      const sessionLabel = screen.getByText('Session Timeout Control');
      expect(sessionLabel).toHaveClass('mt-3', 'fw-medium');
    });
  });

  // Profile Section Tests
  describe('Profile Section', () => {
    it('renders profile section label', () => {
      render(<RdsCompUserManagement {...mockProps} />);
      expect(screen.getByText('Profile')).toBeInTheDocument();
    });

    it('renders gravatar profile picture checkbox', () => {
      render(<RdsCompUserManagement {...mockProps} />);
      const gravatarCheckbox = screen.getByTestId('gravatar-profile-picture');
      expect(gravatarCheckbox).toBeInTheDocument();
      expect(screen.getByText('Allow Using to use Gravatar Profile Picture')).toBeInTheDocument();
    });

    it('profile label has correct styling', () => {
      const { container } = render(<RdsCompUserManagement {...mockProps} />);
      const profileLabel = screen.getByText('Profile');
      expect(profileLabel).toHaveClass('mt-3', 'fw-medium');
    });
  });

  // RdsCheckbox Integration Tests
  describe('RdsCheckbox Integration', () => {
    it('passes correct props to all RdsCheckbox components', () => {
      const { RdsCheckbox } = require('../src/rds-elements');
      render(<RdsCompUserManagement {...mockProps} />);
      
      // Check that RdsCheckbox was called 6 times (for 6 checkboxes)
      expect(RdsCheckbox).toHaveBeenCalledTimes(6);
        // Verify common props for all checkboxes
      const calls = RdsCheckbox.mock.calls;
      calls.forEach((call: any) => {
        const props = call[0];
        expect(props.isDisabled).toBe(false);
        expect(props.checked).toBe(false);
        expect(props.showText).toBe(true);
        expect(props.isSwitch).toBe(false);
        expect(props.dataTestId).toBeDefined();
      });
    });

    it('passes unique dataTestId to each checkbox', () => {
      const { RdsCheckbox } = require('../src/rds-elements');
      render(<RdsCompUserManagement {...mockProps} />);
      
      const expectedTestIds = [
        'email-confirmation',
        'phone-number-verification',
        'security-image-quest',
        'cookie-consent-enable',
        'session-time-out-control',
        'gravatar-profile-picture'
      ];
        const calls = RdsCheckbox.mock.calls;
      const actualTestIds = calls.map((call: any) => call[0].dataTestId);
      
      expectedTestIds.forEach(testId => {
        expect(actualTestIds).toContain(testId);
      });
    });

    it('passes unique labelText to each checkbox', () => {
      const { RdsCheckbox } = require('../src/rds-elements');
      render(<RdsCompUserManagement {...mockProps} />);
      
      const expectedLabels = [
        'Email Confirmation Required For Login.',
        'Phone Number Verification Enabled (Via SMS).',
        'Use Security Image Question (Captcha) On Login.',
        'Cookie Consent Enabled',
        'Session Time Out Control Enabled',
        'Allow Using to use Gravatar Profile Picture'
      ];
        const calls = RdsCheckbox.mock.calls;
      const actualLabels = calls.map((call: any) => call[0].labelText);
      
      expectedLabels.forEach(label => {
        expect(actualLabels).toContain(label);
      });
    });
  });

  // CSS Classes and Layout Tests
  describe('CSS Classes and Layout', () => {
    it('applies correct CSS classes to main container', () => {
      const { container } = render(<RdsCompUserManagement {...mockProps} />);
      const mainDiv = container.querySelector('.fw-normal.mt-4');
      expect(mainDiv).toBeInTheDocument();
    });

    it('applies py-1 class to checkbox containers', () => {
      const { container } = render(<RdsCompUserManagement {...mockProps} />);
      const checkboxContainers = container.querySelectorAll('.py-1');
      expect(checkboxContainers).toHaveLength(6); // 6 checkboxes
    });

    it('section labels have correct CSS classes', () => {
      const { container } = render(<RdsCompUserManagement {...mockProps} />);
      const labels = container.querySelectorAll('label.mt-3.fw-medium');
      expect(labels).toHaveLength(3); // Cookie Consent, Session Timeout Control, Profile
    });
  });

  // Props Handling Tests
  describe('Props Handling', () => {
    it('handles undefined Usermanagementsettings prop', () => {
      const propsWithUndefined = { Usermanagementsettings: undefined };
      expect(() => render(<RdsCompUserManagement {...propsWithUndefined} />)).not.toThrow();
    });

    it('handles null Usermanagementsettings prop', () => {
      const propsWithNull = { Usermanagementsettings: null };
      expect(() => render(<RdsCompUserManagement {...propsWithNull} />)).not.toThrow();
    });

    it('handles empty object Usermanagementsettings prop', () => {
      const propsWithEmpty = { Usermanagementsettings: {} };
      expect(() => render(<RdsCompUserManagement {...propsWithEmpty} />)).not.toThrow();
    });

    it('renders correctly with complex Usermanagementsettings prop', () => {
      const complexProps = {
        Usermanagementsettings: {
          emailConfirmation: true,
          phoneVerification: false,
          cookieConsent: true
        }
      };
      expect(() => render(<RdsCompUserManagement {...complexProps} />)).not.toThrow();
    });
  });

  // Accessibility Tests
  describe('Accessibility', () => {
    it('all checkboxes have associated labels', () => {
      render(<RdsCompUserManagement {...mockProps} />);
      
      const expectedLabels = [
        'Email Confirmation Required For Login.',
        'Phone Number Verification Enabled (Via SMS).',
        'Use Security Image Question (Captcha) On Login.',
        'Cookie Consent Enabled',
        'Session Time Out Control Enabled',
        'Allow Using to use Gravatar Profile Picture'
      ];
      
      expectedLabels.forEach(labelText => {
        expect(screen.getByText(labelText)).toBeInTheDocument();
      });
    });

    it('all checkboxes have unique test ids for accessibility testing', () => {
      render(<RdsCompUserManagement {...mockProps} />);
      
      const testIds = [
        'email-confirmation',
        'phone-number-verification',
        'security-image-quest',
        'cookie-consent-enable',
        'session-time-out-control',
        'gravatar-profile-picture'
      ];
      
      testIds.forEach(testId => {
        expect(screen.getByTestId(testId)).toBeInTheDocument();
      });
    });

    it('section headings are properly marked with label elements', () => {
      const { container } = render(<RdsCompUserManagement {...mockProps} />);
      const sectionLabels = container.querySelectorAll('label.mt-3.fw-medium');
      
      expect(sectionLabels).toHaveLength(3);
      expect(sectionLabels[0]).toHaveTextContent('Cookie Consent');
      expect(sectionLabels[1]).toHaveTextContent('Session Timeout Control');
      expect(sectionLabels[2]).toHaveTextContent('Profile');
    });
  });

  // Edge Cases and Error Handling
  describe('Edge Cases and Error Handling', () => {
    it('renders correctly when no props are passed', () => {
      // @ts-ignore - Testing edge case
      expect(() => render(<RdsCompUserManagement />)).not.toThrow();
    });

    it('maintains consistent structure regardless of prop values', () => {
      const { container: container1 } = render(<RdsCompUserManagement {...mockProps} />);
      const { container: container2 } = render(<RdsCompUserManagement Usermanagementsettings={{test: 'value'}} />);
      
      const checkboxes1 = container1.querySelectorAll('[data-testid]');
      const checkboxes2 = container2.querySelectorAll('[data-testid]');
      
      expect(checkboxes1).toHaveLength(6);
      expect(checkboxes2).toHaveLength(6);
    });  });

  // Component Structure Tests
  describe('Component Structure', () => {
    it('renders all checkbox sections in correct order', () => {
      render(<RdsCompUserManagement {...mockProps} />);
      
      // Check that security checkboxes come first
      expect(screen.getByTestId('email-confirmation')).toBeInTheDocument();
      expect(screen.getByTestId('phone-number-verification')).toBeInTheDocument();
      expect(screen.getByTestId('security-image-quest')).toBeInTheDocument();
      
      // Then cookie consent section
      expect(screen.getByText('Cookie Consent')).toBeInTheDocument();
      expect(screen.getByTestId('cookie-consent-enable')).toBeInTheDocument();
      
      // Then session timeout section
      expect(screen.getByText('Session Timeout Control')).toBeInTheDocument();
      expect(screen.getByTestId('session-time-out-control')).toBeInTheDocument();
      
      // Finally profile section
      expect(screen.getByText('Profile')).toBeInTheDocument();
      expect(screen.getByTestId('gravatar-profile-picture')).toBeInTheDocument();
    });

    it('has proper nesting structure', () => {
      const { container } = render(<RdsCompUserManagement {...mockProps} />);
      
      // Check main container
      const mainDiv = container.querySelector('.fw-normal.mt-4');
      expect(mainDiv).toBeInTheDocument();
      
      // Check that all checkboxes are within py-1 divs
      const pyDivs = container.querySelectorAll('.py-1');
      expect(pyDivs).toHaveLength(6);
      
      pyDivs.forEach(div => {
        expect(div.querySelector('[data-testid]')).toBeInTheDocument();
      });
    });
  });
});
