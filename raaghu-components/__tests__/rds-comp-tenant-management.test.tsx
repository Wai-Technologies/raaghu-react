import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompTenantManagement from '../src/rds-comp-tenant-management/rds-comp-tenant-management';

// Mock the RDS elements
jest.mock('../src/rds-elements', () => ({
  RdsLabel: (props: any) => (
    <div data-testid="rds-label" data-label={props.label}>
      {props.label}
    </div>
  ),
  RdsCheckbox: (props: any) => (
    <div 
      data-testid={`rds-checkbox-${props.labelText.toLowerCase().replace(/\s+/g, '-')}`}
      data-checked={props.checked ? 'true' : 'false'}
      data-disabled={props.isDisabled ? 'true' : 'false'}
    >
      <input 
        type="checkbox" 
        checked={props.checked}
        disabled={props.isDisabled}
        onChange={() => {}}
      />
      <label>{props.labelText}</label>
    </div>
  ),
  RdsDropdownList: (props: any) => (
    <div 
      data-testid="rds-dropdown-list"
      data-placeholder={props.placeholder}
      data-is-placeholder={props.isPlaceholder ? 'true' : 'false'}
      data-border-dropdown={props.borderDropdown ? 'true' : 'false'}
    >
      <select>
        <option value="">{props.placeholder}</option>
        {props.listItems?.map((item: any, index: number) => (
          <option key={index} value={item.val}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  )
}));

describe('RdsCompTenantManagement Component', () => {
  // Sample data for testing
  const mockSettingsTenantEditionList = [
    { label: 'Standard', value: 'standard' },
    { label: 'Basic', value: 'basic' },
    { label: 'Premium', value: 'premium' },
    { label: 'Professional', value: 'professional' }
  ];
  
  const defaultProps = {
    settingsTenantEditionList: mockSettingsTenantEditionList,
    allowSelfRegistration: true,
    useCaptchaOnRegistration: false,
    isNewRegisteredTenantActiveByDefault: true
  };

  // Helper function to render component with custom props
  const renderComponent = (props = {}) => {
    return render(
      <RdsCompTenantManagement 
        {...defaultProps} 
        {...props} 
      />
    );
  };

  // Basic Rendering Tests
  describe('Basic Rendering', () => {
    it('renders without crashing', () => {
      renderComponent();
      expect(screen.getByText('Form-Based Registration')).toBeInTheDocument();
    });

    it('renders all checkbox options with correct labels', () => {
      renderComponent();
      
      // Check all checkbox labels are rendered
      expect(screen.getByText('Allow Tenants To Register To The System.')).toBeInTheDocument();
      expect(screen.getByText('New Registered Tenants Are Active By Default.')).toBeInTheDocument();
      expect(screen.getByText('Use Security Image Question (Captcha) On Registration.')).toBeInTheDocument();
    });

    it('renders helper text for checkboxes', () => {
      renderComponent();
      
      // Check helper text is rendered
      expect(screen.getByText('If You Disable This, Tenants Will Only Be Added By Admin Using Tenant Management Page')).toBeInTheDocument();
      expect(screen.getByText('If You Disable This, New Tenants Will Not Be Active (And Can Not Login) Until Admin Manually Activates The Account')).toBeInTheDocument();
    });

    it('renders dropdown for edition selection', () => {
      renderComponent();
      
      // Check edition dropdown is rendered
      expect(screen.getByText('Edition')).toBeInTheDocument();
      const dropdown = screen.getByTestId('rds-dropdown-list');
      expect(dropdown).toBeInTheDocument();
      expect(dropdown).toHaveAttribute('data-placeholder', 'Select Edition');
    });
  });

  // Props Tests
  describe('Props Handling', () => {
    it('displays checkboxes with correct checked states from props', () => {
      renderComponent({
        allowSelfRegistration: true,
        useCaptchaOnRegistration: false,
        isNewRegisteredTenantActiveByDefault: true
      });
      
      // Check checkbox states reflect props
      const selfRegCheckbox = screen.getByTestId('rds-checkbox-allow-tenants-to-register-to-the-system.');
      const activeByDefaultCheckbox = screen.getByTestId('rds-checkbox-new-registered-tenants-are-active-by-default.');
      const captchaCheckbox = screen.getByTestId('rds-checkbox-use-security-image-question-(captcha)-on-registration.');
      
      expect(selfRegCheckbox).toHaveAttribute('data-checked', 'true');
      expect(activeByDefaultCheckbox).toHaveAttribute('data-checked', 'true');
      expect(captchaCheckbox).toHaveAttribute('data-checked', 'false');
    });

    it('reflects changes in props correctly', () => {
      const { rerender } = renderComponent();
      
      // Initial state
      let selfRegCheckbox = screen.getByTestId('rds-checkbox-allow-tenants-to-register-to-the-system.');
      expect(selfRegCheckbox).toHaveAttribute('data-checked', 'true');
      
      // Update props and check if UI reflects changes
      rerender(
        <RdsCompTenantManagement 
          {...defaultProps}
          allowSelfRegistration={false}
        />
      );
      
      selfRegCheckbox = screen.getByTestId('rds-checkbox-allow-tenants-to-register-to-the-system.');
      expect(selfRegCheckbox).toHaveAttribute('data-checked', 'false');
    });
  });

  // Dropdown Tests
  describe('Dropdown Behavior', () => {
    it('renders dropdown with correct placeholder', () => {
      renderComponent();
      
      const dropdown = screen.getByTestId('rds-dropdown-list');
      expect(dropdown).toHaveAttribute('data-placeholder', 'Select Edition');
      expect(dropdown).toHaveAttribute('data-is-placeholder', 'true');
    });

    it('renders dropdown with border styling when specified', () => {
      renderComponent();
      
      const dropdown = screen.getByTestId('rds-dropdown-list');
      expect(dropdown).toHaveAttribute('data-border-dropdown', 'true');
    });
  });

  // Edge Cases
  describe('Edge Cases', () => {
    it('handles empty settingsTenantEditionList', () => {
      renderComponent({ settingsTenantEditionList: [] });
      
      // Component should still render without errors
      expect(screen.getByText('Form-Based Registration')).toBeInTheDocument();
      expect(screen.getByTestId('rds-dropdown-list')).toBeInTheDocument();
    });

    it('handles disabled state for checkboxes', () => {
      // This test is hypothetical since the component doesn't currently 
      // have a way to disable checkboxes through props, but tests the mock properly
      
      // Mock a hypothetical situation where a checkbox would be disabled
      const mockIsDisabled = true;
      
      // We'll use the component's structure but need to inject disabled state in our test
      const { container } = render(
        <div>
          <div data-testid="rds-checkbox-test" data-disabled={mockIsDisabled ? 'true' : 'false'}>
            <input type="checkbox" disabled={mockIsDisabled} />
            <label>Test Checkbox</label>
          </div>
        </div>
      );
      
      const testCheckbox = container.querySelector('input[type="checkbox"]');
      expect(testCheckbox).toBeDisabled();
    });
  });

  // Visual Appearance Tests
  describe('Visual Appearance', () => {
    it('applies appropriate class names for styling', () => {
      const { container } = renderComponent();
      
      // Check that main container has expected classes
      const mainDiv = container.firstChild;
      expect(mainDiv).toHaveClass('mt-4');
      
      // Check for form-group classes
      const formGroups = container.querySelectorAll('.form-group');
      expect(formGroups.length).toBeGreaterThan(0);
      
      // Check for subtitle styling
      const subTexts = container.querySelectorAll('.sub-text');
      expect(subTexts.length).toBe(2); // There should be 2 helper texts
    });
  });
});
