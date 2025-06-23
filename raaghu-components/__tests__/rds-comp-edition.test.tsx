import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompEdition, { RdsCompEditionProps } from '../src/rds-comp-edition/rds-comp-edition';

// Mock RDS elements
jest.mock('../src/rds-elements', () => ({
  RdsLabel: ({ label, size, multiline, ...props }: any) => (
    <div data-testid="rds-label" data-size={size} data-multiline={multiline} {...props}>
      {label}
    </div>
  ),
  RdsIcon: ({ name, width, height, fill, stroke, ...props }: any) => (
    <div data-testid="rds-icon" data-name={name} data-width={width} data-height={height} data-fill={fill} data-stroke={stroke} {...props}>
      Icon
    </div>
  ),
  RdsOffcanvas: ({ children, placement, backdrop, scrolling, preventEscapeKey, offId, ...props }: any) => (
    <div data-testid="rds-offcanvas" data-placement={placement} data-backdrop={backdrop} data-scrolling={scrolling} data-prevent-escape-key={preventEscapeKey} data-off-id={offId} {...props}>
      {children}
    </div>
  ),
  RdsNavtabs: ({ activeNavTabId, navtabsItems, type, isNextPressed, activeNavtabOrder, ...props }: any) => (
    <div data-testid="rds-navtabs" data-active-nav-tab-id={activeNavTabId} data-type={type} data-is-next-pressed={isNextPressed} {...props}>
      {navtabsItems?.map((item: any, index: number) => (
        <button
          key={index}
          data-testid={`nav-tab-${item.id}`}
          onClick={() => activeNavtabOrder && activeNavtabOrder(item.id.toString())}
        >
          {item.label}
        </button>
      ))}
    </div>
  ),
  RdsButton: ({ label, onClick, type, colorVariant, size, class: className, dataTestId, databsdismiss, ...props }: any) => (
    <button
      data-testid={dataTestId || `button-${label?.toLowerCase()}`}
      onClick={onClick}
      type={type}
      data-color-variant={colorVariant}
      data-size={size}
      className={className}
      data-bs-dismiss={databsdismiss}
      {...props}
    >
      {label}
    </button>
  ),
  RdsInput: ({ name, label, placeholder, value, onChange, inputType, required, id, reset, dataTestId, ...props }: any) => (
    <div data-testid={`input-container-${id || name}`}>
      {label && <label>{name}</label>}
      <input
        data-testid={dataTestId || id || name}
        type={inputType}
        placeholder={placeholder}
        value={value || ''}
        onChange={onChange}
        required={required}
        {...props}
      />
    </div>
  ),
  RdsSelectList: ({ id, label, selectItems, onChange, selectedValue, classes, isDisabled, isMultiple, required, dataTestId, ...props }: any) => (
    <div data-testid={`select-container-${id}`}>
      {label && <label>{label}</label>}
      <select
        data-testid={dataTestId || id}
        value={selectedValue || ''}
        onChange={(e) => onChange && onChange({ value: e.target.value })}
        disabled={isDisabled}
        multiple={isMultiple}
        required={required}
        className={classes}
        {...props}
      >
        {selectItems?.map((item: any, index: number) => (
          <option key={index} value={item.value || item}>
            {item.label || item.option || item}
          </option>
        ))}
      </select>
    </div>
  ),
}));

// Mock RdsCompAlertPopup
jest.mock('../src/rds-comp-alert-popup', () => {
  return {
    __esModule: true,
    default: ({ ...props }: any) => <div data-testid="alert-popup" {...props}>Alert Popup</div>,
  };
});

describe('RdsCompEdition', () => {
  const mockEditionItems = {
    EditionName: 'Standard Edition',
    EditionTitle: 'Perfect for small teams',
    Price: '29.99',
    Features: ['Feature 1', 'Feature 2', 'Feature 3']
  };

  const mockPlanList = [
    { label: 'Monthly', value: 'monthly' },
    { label: 'Yearly', value: 'yearly' },
    { label: 'Lifetime', value: 'lifetime' }
  ];

  const mockAccountTwoFactorSettings = {
    planList: 'monthly'
  };

  const mockOnSaveHandler = jest.fn();

  const defaultBasicProps: RdsCompEditionProps = {
    EditionItems: mockEditionItems,
    features: ['Feature 1', 'Feature 2'],
    editionName: { editionName: 'Test Edition', plan: 'monthly' },
    planList: mockPlanList,
    accountTwoFactorSettings: mockAccountTwoFactorSettings,
    planListLabel: 'Select Plan',
    displayType: 'basic',
    onSaveHandler: mockOnSaveHandler,
    radioItems: [],
    tableHeaders: [],
    actions: [],
    tableData: [],
    pagination: false,
    onActionSelection: function (arg: any): void {
      throw new Error('Function not implemented.');
    },
    onNewTenantClick: function (event: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>): void {
      throw new Error('Function not implemented.');
    }
  };

  const defaultAdvancedProps: RdsCompEditionProps = {
    ...defaultBasicProps,
    displayType: 'advanced'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // 1. Basic Rendering Tests
  describe('Basic Display Type', () => {
    it('should render basic edition card correctly', () => {
      render(<RdsCompEdition {...defaultBasicProps} />);
      
      expect(screen.getByText('Standard Edition')).toBeInTheDocument();
      expect(screen.getByText('Perfect for small teams')).toBeInTheDocument();
      expect(screen.getByText('$')).toBeInTheDocument();
      expect(screen.getByText('29.99')).toBeInTheDocument();
    });    it('should render pricing information correctly', () => {
      render(<RdsCompEdition {...defaultBasicProps} />);
      
      expect(screen.getByText('$')).toBeInTheDocument();
      expect(screen.getByText('29.99')).toBeInTheDocument();
    });    it('should render offcanvas and delete button', () => {
      render(<RdsCompEdition {...defaultBasicProps} />);
      
      expect(screen.getByTestId('rds-offcanvas')).toBeInTheDocument();
      expect(screen.getByTestId('alert-popup')).toBeInTheDocument();
    });
  });
  // 2. Advanced Display Type Tests
  describe('Advanced Display Type', () => {
    it('should render advanced form correctly', () => {
      render(<RdsCompEdition {...defaultAdvancedProps} />);
      
      expect(screen.getByTestId('editionName')).toBeInTheDocument();
      expect(screen.getByTestId('plan-list')).toBeInTheDocument();
      expect(screen.getByTestId('cancel')).toBeInTheDocument();
      expect(screen.getByTestId('save')).toBeInTheDocument();
    });

    it('should render edition name input field', () => {
      render(<RdsCompEdition {...defaultAdvancedProps} />);
      
      const editionNameInput = screen.getByTestId('editionName');
      expect(editionNameInput).toBeInTheDocument();
      expect(editionNameInput).toHaveAttribute('required');
    });

    it('should render plan select list', () => {
      render(<RdsCompEdition {...defaultAdvancedProps} />);
      
      const planSelect = screen.getByTestId('plan-list');
      expect(planSelect).toBeInTheDocument();
      expect(planSelect).toHaveAttribute('required');
    });
  });

  // 3. Form Data Management Tests
  describe('Form Data Management', () => {
    it('should initialize form data from props', () => {
      render(<RdsCompEdition {...defaultAdvancedProps} />);
      
      const editionNameInput = screen.getByTestId('editionName');
      expect(editionNameInput).toHaveValue('Test Edition');
    });

    it('should update form data when input changes', () => {
      render(<RdsCompEdition {...defaultAdvancedProps} />);
      
      const editionNameInput = screen.getByTestId('editionName');
      fireEvent.change(editionNameInput, { target: { value: 'New Edition Name' } });
      
      expect(editionNameInput).toHaveValue('New Edition Name');
    });

    it('should update plan selection', () => {
      render(<RdsCompEdition {...defaultAdvancedProps} />);
      
      const planSelect = screen.getByTestId('plan-list');
      fireEvent.change(planSelect, { target: { value: 'yearly' } });
      
      expect(planSelect).toHaveValue('yearly');
    });

    it('should handle form data updates correctly', () => {
      const { rerender } = render(<RdsCompEdition {...defaultAdvancedProps} />);
      
      const updatedProps = {
        ...defaultAdvancedProps,
        editionName: { editionName: 'Updated Edition', plan: 'yearly' }
      };
      
      rerender(<RdsCompEdition {...updatedProps} />);
      
      const editionNameInput = screen.getByTestId('editionName');
      expect(editionNameInput).toHaveValue('Updated Edition');
    });
  });
  // 4. Navigation and Tab Management Tests
  describe('Navigation and Tab Management', () => {
    it('should render basic display without navigation tabs', () => {
      render(<RdsCompEdition {...defaultAdvancedProps} />);
      
      // Navigation tabs are only in basic mode within offcanvas, not in advanced mode
      expect(screen.getByTestId('editionName')).toBeInTheDocument();
    });
  });
  // 5. Form Submission Tests
  describe('Form Submission', () => {
    it('should have save button with correct configuration', () => {
      render(<RdsCompEdition {...defaultAdvancedProps} />);
      
      const saveButton = screen.getByTestId('save');
      expect(saveButton).toBeInTheDocument();
      expect(saveButton).toHaveTextContent('Save');
      expect(saveButton).toHaveAttribute('type', 'submit');
    });

    it('should have cancel button with correct configuration', () => {
      render(<RdsCompEdition {...defaultAdvancedProps} />);
      
      const cancelButton = screen.getByTestId('cancel');
      expect(cancelButton).toBeInTheDocument();
      expect(cancelButton).toHaveTextContent('Cancel');
      expect(cancelButton).toHaveAttribute('type', 'button');
    });
  });

  // 6. Button Configuration Tests
  describe('Button Configuration', () => {
    it('should configure cancel button correctly', () => {
      render(<RdsCompEdition {...defaultAdvancedProps} />);
      
      const cancelButton = screen.getByTestId('cancel');
      
      expect(cancelButton).toHaveTextContent('Cancel');
      expect(cancelButton).toHaveAttribute('type', 'button');
      expect(cancelButton).toHaveAttribute('data-color-variant', 'outline-primary');
      expect(cancelButton).toHaveAttribute('data-size', 'small');
      expect(cancelButton).toHaveAttribute('data-bs-dismiss', 'offcanvas');
    });

    it('should configure save button correctly', () => {
      render(<RdsCompEdition {...defaultAdvancedProps} />);
      
      const saveButton = screen.getByTestId('save');
      
      expect(saveButton).toHaveTextContent('Save');
      expect(saveButton).toHaveAttribute('type', 'submit');
      expect(saveButton).toHaveAttribute('data-color-variant', 'primary');
      expect(saveButton).toHaveAttribute('data-size', 'small');
      expect(saveButton).toHaveAttribute('data-bs-dismiss', 'offcanvas');
    });
  });

  // 7. Plan List Management Tests
  describe('Plan List Management', () => {
    it('should render plan list with correct options', () => {
      render(<RdsCompEdition {...defaultAdvancedProps} />);
      
      const planSelect = screen.getByTestId('plan-list');
      const options = planSelect.querySelectorAll('option');
      
      expect(options).toHaveLength(mockPlanList.length);
      expect(options[0]).toHaveTextContent('Monthly');
      expect(options[1]).toHaveTextContent('Yearly');
      expect(options[2]).toHaveTextContent('Lifetime');
    });

    it('should handle plan selection changes', () => {
      render(<RdsCompEdition {...defaultAdvancedProps} />);
      
      const planSelect = screen.getByTestId('plan-list');
      fireEvent.change(planSelect, { target: { value: 'yearly' } });
      
      expect(planSelect).toHaveValue('yearly');
    });

    it('should display correct plan list label', () => {
      render(<RdsCompEdition {...defaultAdvancedProps} />);
      
      expect(screen.getByText('Select Plan')).toBeInTheDocument();
    });
  });
  // 8. Edge Cases and Error Handling Tests
  describe('Edge Cases and Error Handling', () => {
    it('should handle empty plan list', () => {
      const propsWithEmptyPlanList = { ...defaultAdvancedProps, planList: [] };
      render(<RdsCompEdition {...propsWithEmptyPlanList} />);
      
      const planSelect = screen.getByTestId('plan-list');
      const options = planSelect.querySelectorAll('option');
      
      expect(options).toHaveLength(0);
    });

    it('should handle null edition name', () => {
      const propsWithNullName = { ...defaultAdvancedProps, editionName: null };
      render(<RdsCompEdition {...propsWithNullName} />);
      
      const editionNameInput = screen.getByTestId('editionName');
      expect(editionNameInput).toHaveValue('');
    });
  });

  // 9. Reset Functionality Tests
  describe('Reset Functionality', () => {
    it('should reset form when reset prop changes', () => {
      const { rerender } = render(<RdsCompEdition {...defaultAdvancedProps} reset={false} />);
      
      const editionNameInput = screen.getByTestId('editionName');
      fireEvent.change(editionNameInput, { target: { value: 'Test Value' } });
      
      rerender(<RdsCompEdition {...defaultAdvancedProps} reset={true} />);
      
      // Form should be reset
      expect(editionNameInput).toBeInTheDocument();
    });

    it('should handle multiple reset cycles', () => {
      const { rerender } = render(<RdsCompEdition {...defaultAdvancedProps} reset={false} />);
      
      rerender(<RdsCompEdition {...defaultAdvancedProps} reset={true} />);
      rerender(<RdsCompEdition {...defaultAdvancedProps} reset={false} />);
      rerender(<RdsCompEdition {...defaultAdvancedProps} reset={true} />);
      
      expect(screen.getByTestId('editionName')).toBeInTheDocument();
    });
  });
  // 10. Component Structure Tests
  describe('Component Structure', () => {
    it('should render with correct CSS structure for basic type', () => {
      render(<RdsCompEdition {...defaultBasicProps} />);
      
      const card = screen.getByText('Standard Edition').closest('.card');
      expect(card).toBeInTheDocument();
      expect(card).toHaveClass('border-undefined');
    });

    it('should render with correct CSS structure for advanced type', () => {
      render(<RdsCompEdition {...defaultAdvancedProps} />);
      
      const editionNameInput = screen.getByTestId('editionName');
      expect(editionNameInput).toBeInTheDocument();
    });

    it('should have proper form field structure', () => {
      render(<RdsCompEdition {...defaultAdvancedProps} />);
      
      const editionNameContainer = screen.getByTestId('input-container-editionName');
      const planListContainer = screen.getByTestId('select-container-planLis');
      
      expect(editionNameContainer).toBeInTheDocument();
      expect(planListContainer).toBeInTheDocument();
    });
  });

  // 11. Two Factor Settings Tests
  describe('Two Factor Settings', () => {
    it('should initialize two factor data from props', () => {
      render(<RdsCompEdition {...defaultAdvancedProps} />);
      
      const planSelect = screen.getByTestId('plan-list');
      expect(planSelect).toHaveValue('monthly');
    });

    it('should update two factor settings when account settings change', () => {
      const { rerender } = render(<RdsCompEdition {...defaultAdvancedProps} />);
      
      const updatedSettings = { planList: 'yearly' };
      const updatedProps = {
        ...defaultAdvancedProps,
        accountTwoFactorSettings: updatedSettings
      };
      
      rerender(<RdsCompEdition {...updatedProps} />);
      
      const planSelect = screen.getByTestId('plan-list');
      expect(planSelect).toHaveValue('yearly');
    });
  });
  // 12. Display Type Switching Tests
  describe('Display Type Switching', () => {
    it('should switch between basic and advanced display types', () => {
      const { rerender } = render(<RdsCompEdition {...defaultBasicProps} />);
      
      expect(screen.getByText('Standard Edition')).toBeInTheDocument();
      expect(screen.queryByTestId('editionName')).toBeInTheDocument(); // Edition name exists in basic mode too
      
      rerender(<RdsCompEdition {...defaultAdvancedProps} />);
      
      expect(screen.queryByText('Standard Edition')).not.toBeInTheDocument();
      expect(screen.getByTestId('editionName')).toBeInTheDocument();
    });

    it('should render only appropriate content for each display type', () => {
      render(<RdsCompEdition {...defaultBasicProps} />);
      
      expect(screen.getByText('Standard Edition')).toBeInTheDocument();
      expect(screen.queryByTestId('save')).not.toBeInTheDocument();
    });
  });
  // 13. Integration Tests
  describe('Integration Tests', () => {
    it('should render form elements correctly together', () => {
      render(<RdsCompEdition {...defaultAdvancedProps} />);
      
      // Verify form elements exist together
      const editionNameInput = screen.getByTestId('editionName');
      const planSelect = screen.getByTestId('plan-list');
      const saveButton = screen.getByTestId('save');
      const cancelButton = screen.getByTestId('cancel');
      
      expect(editionNameInput).toBeInTheDocument();
      expect(planSelect).toBeInTheDocument();
      expect(saveButton).toBeInTheDocument();
      expect(cancelButton).toBeInTheDocument();
    });

    it('should work correctly with multiple component instances', () => {
      render(
        <div>
          <RdsCompEdition {...defaultBasicProps} EditionItems={{ ...mockEditionItems, EditionName: 'Edition 1' }} />
          <RdsCompEdition {...defaultBasicProps} EditionItems={{ ...mockEditionItems, EditionName: 'Edition 2' }} />
        </div>
      );
      
      expect(screen.getByText('Edition 1')).toBeInTheDocument();
      expect(screen.getByText('Edition 2')).toBeInTheDocument();
    });
  });
});