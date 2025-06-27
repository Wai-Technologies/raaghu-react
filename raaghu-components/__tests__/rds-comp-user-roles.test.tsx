import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompUserRoles from '../src/rds-comp-user-roles/rds-comp-user-roles';

// Mock the dependencies
jest.mock('../src/rds-elements', () => ({
  RdsButton: jest.fn(({ label, onClick, ...props }) => (
    <button onClick={onClick} {...props}>
      {label}
    </button>
  )),
  RdsCheckbox: jest.fn(({ labelText, onChange, checked, dataTestId, ...props }) => {
    return (
      <div data-testid={dataTestId} {...props}>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => {
            if (onChange) {
              onChange(e);
            }
          }}
          data-testid={`${dataTestId}-input`}
          id={`${dataTestId}-checkbox`}
        />
        <label htmlFor={`${dataTestId}-checkbox`}>{labelText}</label>
      </div>
    );
  }),
  RdsCompLabel: jest.fn(({ label, ...props }) => (
    <label {...props}>{label}</label>
  )),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { changeLanguage: jest.fn() },
  }),
}));

describe('RdsCompUserRoles', () => {
  const mockUsersRole = [
    { name: 'Admin', isChecked: true },
    { name: 'User', isChecked: false },
    { name: 'Manager', isChecked: true },
    { name: 'Developer', isChecked: false },
  ];

  const mockChangedData = jest.fn();
  const defaultProps = {
    usersRole: mockUsersRole,
    changedData: mockChangedData,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Basic Rendering Tests
  describe('Basic Rendering', () => {
    it('renders without crashing', () => {
      render(<RdsCompUserRoles {...defaultProps} />);
      expect(screen.getByText('Admin')).toBeInTheDocument();
    });

    it('renders the main container with correct structure', () => {
      const { container } = render(<RdsCompUserRoles {...defaultProps} />);
      const rowDiv = container.querySelector('.row');
      const colDiv = container.querySelector('.col-md-12');
      
      expect(rowDiv).toBeInTheDocument();
      expect(colDiv).toBeInTheDocument();
    });

    it('renders all role checkboxes', () => {
      render(<RdsCompUserRoles {...defaultProps} />);
      
      expect(screen.getByText('Admin')).toBeInTheDocument();
      expect(screen.getByText('User')).toBeInTheDocument();
      expect(screen.getByText('Manager')).toBeInTheDocument();
      expect(screen.getByText('Developer')).toBeInTheDocument();
    });

    it('renders checkboxes with correct test IDs', () => {
      render(<RdsCompUserRoles {...defaultProps} />);
      
      expect(screen.getByTestId('Admin')).toBeInTheDocument();
      expect(screen.getByTestId('User')).toBeInTheDocument();
      expect(screen.getByTestId('Manager')).toBeInTheDocument();
      expect(screen.getByTestId('Developer')).toBeInTheDocument();
    });
  });

  // Checkbox State Tests
  describe('Checkbox State Management', () => {
    it('displays correct initial checked states', () => {
      render(<RdsCompUserRoles {...defaultProps} />);
      
      const adminInput = screen.getByTestId('Admin-input');
      const userInput = screen.getByTestId('User-input');
      const managerInput = screen.getByTestId('Manager-input');
      const developerInput = screen.getByTestId('Developer-input');
      
      expect(adminInput).toBeChecked();
      expect(userInput).not.toBeChecked();
      expect(managerInput).toBeChecked();
      expect(developerInput).not.toBeChecked();
    });

    it('passes correct props to RdsCheckbox components', () => {
      const { RdsCheckbox } = require('../src/rds-elements');
      render(<RdsCompUserRoles {...defaultProps} />);
      
      expect(RdsCheckbox).toHaveBeenCalledTimes(4);
      
      // Check Admin checkbox props
      expect(RdsCheckbox).toHaveBeenCalledWith(
        expect.objectContaining({
          labelText: 'Admin',
          checked: true,
          dataTestId: 'Admin',
          onChange: expect.any(Function),
        }),
        expect.anything()
      );
      
      // Check User checkbox props
      expect(RdsCheckbox).toHaveBeenCalledWith(
        expect.objectContaining({
          labelText: 'User',
          checked: false,
          dataTestId: 'User',
          onChange: expect.any(Function),
        }),
        expect.anything()
      );
    });    it('uses role name as key for each checkbox', () => {
      const { RdsCheckbox } = require('../src/rds-elements');
      render(<RdsCompUserRoles {...defaultProps} />);
      
      const calls = RdsCheckbox.mock.calls;
      calls.forEach((call: any, index: number) => {
        const props = call[0];
        expect(props.labelText).toBe(mockUsersRole[index].name);
        expect(props.dataTestId).toBe(mockUsersRole[index].name);
      });
    });
  });
  // User Interaction Tests (Basic)
  describe('User Interactions', () => {
    it('handles checkbox click events without crashing', () => {
      render(<RdsCompUserRoles {...defaultProps} />);
      
      const userInput = screen.getByTestId('User-input');
      expect(() => fireEvent.change(userInput, { target: { checked: true } })).not.toThrow();
    });

    it('handles multiple checkbox interactions', () => {
      render(<RdsCompUserRoles {...defaultProps} />);
      
      const userInput = screen.getByTestId('User-input');
      const developerInput = screen.getByTestId('Developer-input');
      
      expect(() => {
        fireEvent.change(userInput, { target: { checked: true } });
        fireEvent.change(developerInput, { target: { checked: true } });
      }).not.toThrow();
    });
  });

  // Props Handling Tests
  describe('Props Handling', () => {
    it('handles empty usersRole array', () => {
      const propsWithEmptyRoles = { ...defaultProps, usersRole: [] };
      expect(() => render(<RdsCompUserRoles {...propsWithEmptyRoles} />)).not.toThrow();
      
      const { RdsCheckbox } = require('../src/rds-elements');
      expect(RdsCheckbox).not.toHaveBeenCalled();
    });

    it('handles undefined usersRole', () => {
      const propsWithUndefinedRoles = { ...defaultProps, usersRole: undefined };
      expect(() => render(<RdsCompUserRoles {...propsWithUndefinedRoles} />)).not.toThrow();
    });    it('handles null usersRole', () => {
      const propsWithNullRoles = { ...defaultProps, usersRole: null };
      expect(() => render(<RdsCompUserRoles {...propsWithNullRoles} />)).not.toThrow();
    });

    it('handles missing changedData callback', () => {
      const propsWithoutCallback = { usersRole: mockUsersRole };
      expect(() => render(<RdsCompUserRoles {...propsWithoutCallback} />)).not.toThrow();
      
      // Try to trigger a change - should not crash even without callback
      const userInput = screen.getByTestId('User-input');
      expect(() => fireEvent.change(userInput, { target: { checked: true } })).not.toThrow();
    });

    it('handles roles with missing properties gracefully', () => {
      const incompleteRoles = [
        { name: 'Admin' }, // Missing isChecked
        { isChecked: true }, // Missing name
        { name: 'Manager', isChecked: false },
      ];
      
      const propsWithIncompleteRoles = { ...defaultProps, usersRole: incompleteRoles };
      expect(() => render(<RdsCompUserRoles {...propsWithIncompleteRoles} />)).not.toThrow();
    });

    it('handles roles with additional properties', () => {
      const extendedRoles = [
        { name: 'Admin', isChecked: true, description: 'Administrator role', id: 1 },
        { name: 'User', isChecked: false, description: 'Regular user', id: 2 },
      ];
      
      const propsWithExtendedRoles = { ...defaultProps, usersRole: extendedRoles };
      expect(() => render(<RdsCompUserRoles {...propsWithExtendedRoles} />)).not.toThrow();
      
      expect(screen.getByText('Admin')).toBeInTheDocument();
      expect(screen.getByText('User')).toBeInTheDocument();
    });
  });

  // CSS Classes and Layout Tests
  describe('CSS Classes and Layout', () => {
    it('applies correct CSS classes to main container', () => {
      const { container } = render(<RdsCompUserRoles {...defaultProps} />);
      
      expect(container.querySelector('.row')).toBeInTheDocument();
      expect(container.querySelector('.col-md-12')).toBeInTheDocument();
    });

    it('applies pt-3 class to each checkbox container', () => {
      const { container } = render(<RdsCompUserRoles {...defaultProps} />);
      
      const checkboxContainers = container.querySelectorAll('.pt-3');
      expect(checkboxContainers).toHaveLength(4); // One for each role
    });

    it('maintains consistent layout structure', () => {
      const { container } = render(<RdsCompUserRoles {...defaultProps} />);
      
      const pt3Divs = container.querySelectorAll('.pt-3');
      pt3Divs.forEach(div => {
        expect(div.querySelector('[data-testid]')).toBeInTheDocument();
      });
    });
  });
  // State Management Tests (Basic)
  describe('State Management', () => {
    it('initializes state correctly from props', () => {
      const { RdsCheckbox } = require('../src/rds-elements');
      render(<RdsCompUserRoles {...defaultProps} />);
      
      // Verify that initial render reflects props
      const calls = RdsCheckbox.mock.calls;
      calls.forEach((call: any, index: number) => {
        const props = call[0];
        expect(props.checked).toBe(mockUsersRole[index].isChecked);
      });
    });

    it('handles state initialization correctly', () => {
      render(<RdsCompUserRoles {...defaultProps} />);
      
      const adminInput = screen.getByTestId('Admin-input');
      const userInput = screen.getByTestId('User-input');
      
      expect(adminInput).toBeChecked();
      expect(userInput).not.toBeChecked();
    });
  });

  // Edge Cases Tests
  describe('Edge Cases', () => {
    it('handles role with empty name', () => {
      const rolesWithEmptyName = [
        { name: '', isChecked: true },
        { name: 'Admin', isChecked: false },
      ];
      
      const propsWithEmptyName = { ...defaultProps, usersRole: rolesWithEmptyName };
      expect(() => render(<RdsCompUserRoles {...propsWithEmptyName} />)).not.toThrow();
    });

    it('handles role with special characters in name', () => {
      const rolesWithSpecialChars = [
        { name: 'Admin & Manager', isChecked: true },
        { name: 'User-Developer', isChecked: false },
        { name: 'Test@Role', isChecked: true },
      ];
      
      const propsWithSpecialChars = { ...defaultProps, usersRole: rolesWithSpecialChars };
      expect(() => render(<RdsCompUserRoles {...propsWithSpecialChars} />)).not.toThrow();
      
      expect(screen.getByText('Admin & Manager')).toBeInTheDocument();
      expect(screen.getByText('User-Developer')).toBeInTheDocument();
      expect(screen.getByText('Test@Role')).toBeInTheDocument();
    });

    it('handles single role in array', () => {
      const singleRole = [{ name: 'OnlyRole', isChecked: true }];
      const propsWithSingleRole = { ...defaultProps, usersRole: singleRole };
      
      render(<RdsCompUserRoles {...propsWithSingleRole} />);
      expect(screen.getByText('OnlyRole')).toBeInTheDocument();
      expect(screen.getByTestId('OnlyRole')).toBeInTheDocument();
    });

    it('handles large number of roles', () => {
      const manyRoles = Array.from({ length: 50 }, (_, i) => ({
        name: `Role${i}`,
        isChecked: i % 2 === 0,
      }));
      
      const propsWithManyRoles = { ...defaultProps, usersRole: manyRoles };
      expect(() => render(<RdsCompUserRoles {...propsWithManyRoles} />)).not.toThrow();
      
      const { RdsCheckbox } = require('../src/rds-elements');
      expect(RdsCheckbox).toHaveBeenCalledTimes(50);
    });
  });  // Callback Function Tests (Basic)
  describe('Callback Function Behavior', () => {
    it('handles missing changedData callback gracefully', () => {
      const propsWithoutCallback = { usersRole: mockUsersRole };
      expect(() => render(<RdsCompUserRoles {...propsWithoutCallback} />)).not.toThrow();
      
      // Try to trigger a change - should not crash even without callback
      const userInput = screen.getByTestId('User-input');
      expect(() => fireEvent.change(userInput, { target: { checked: true } })).not.toThrow();
    });

    it('does not mutate original props data', () => {
      const originalData = JSON.parse(JSON.stringify(mockUsersRole));
      render(<RdsCompUserRoles {...defaultProps} />);
      
      const userInput = screen.getByTestId('User-input');
      fireEvent.change(userInput, { target: { checked: true } });
      
      // Original props should remain unchanged
      expect(mockUsersRole).toEqual(originalData);
    });

    it('handles rapid checkbox changes without crashing', () => {
      render(<RdsCompUserRoles {...defaultProps} />);
      
      const userInput = screen.getByTestId('User-input');
      const developerInput = screen.getByTestId('Developer-input');
      
      // Rapid changes should not crash
      expect(() => {
        fireEvent.change(userInput, { target: { checked: true } });
        fireEvent.change(developerInput, { target: { checked: true } });
        fireEvent.change(userInput, { target: { checked: false } });
      }).not.toThrow();
    });
  });

  // Accessibility Tests
  describe('Accessibility', () => {
    it('provides accessible test IDs for all checkboxes', () => {
      render(<RdsCompUserRoles {...defaultProps} />);
        mockUsersRole.forEach(role => {
        expect(screen.getByTestId(role.name)).toBeInTheDocument();
        expect(screen.getByTestId(`${role.name}-input`)).toBeInTheDocument();
      });
    });

    it('associates labels with checkboxes properly', () => {
      render(<RdsCompUserRoles {...defaultProps} />);
      
      // Check that each role has a properly associated label and input
      mockUsersRole.forEach(role => {
        const label = screen.getByLabelText(role.name);
        expect(label).toBeInTheDocument();
        expect(label).toHaveAttribute('type', 'checkbox');
      });
    });

    it('maintains proper DOM structure for screen readers', () => {
      const { container } = render(<RdsCompUserRoles {...defaultProps} />);
      
      const checkboxes = container.querySelectorAll('input[type="checkbox"]');
      const labels = container.querySelectorAll('label');
      
      expect(checkboxes).toHaveLength(4);
      expect(labels).toHaveLength(4);
    });
  });
});
