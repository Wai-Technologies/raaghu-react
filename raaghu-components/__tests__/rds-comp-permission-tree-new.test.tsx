
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompPermissionTreeNew from '../src/rds-comp-permission-tree-new/rds-comp-permission-tree-new';

// Mock CheckboxStatus enum
enum CheckboxStatus {
  Checked = 'checked',
  Unchecked = 'unchecked',
  Indeterminate = 'indeterminate'
}

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

// Mock the rds-elements components
jest.mock('../src/rds-elements', () => ({
  RdsCheckbox: ({ 
    labelText, 
    checked, 
    onChange,
    status,
    dataTestId,
    ...props 
  }: any) => (
    <div data-testid={`checkbox-container-${labelText?.replace(/\s+/g, '-').toLowerCase()}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        data-testid={dataTestId || `checkbox-input-${labelText?.replace(/\s+/g, '-').toLowerCase()}`}
        {...props}
      />
      <label>{labelText}</label>
      {status === CheckboxStatus.Indeterminate && <span data-testid="indeterminate-status">indeterminate</span>}
    </div>
  ),
}));

describe('RdsCompPermissionTreeNew', () => {
  const mockPermissions = [
    {
      displayName: "User Management",
      name: "userManagement",
      id: "userManagement",
      isGranted: false,
      isIntermediate: false,
      disabled: false,
      parentName: null,
      permissions: [
        {
          displayName: "Create User",
          name: "createUser",
          id: "createUser",
          isGranted: false,
          isIntermediate: false,
          disabled: false,
          parentName: "userManagement"
        },
        {
          displayName: "Edit User",
          name: "editUser",
          id: "editUser",
          isGranted: false,
          isIntermediate: false,
          disabled: false,
          parentName: "userManagement"
        }
      ]
    },
    {
      displayName: "Role Management",
      name: "roleManagement",
      id: "roleManagement",
      isGranted: false,
      isIntermediate: false,
      disabled: false,
      parentName: null,
      permissions: [
        {
          displayName: "Create Role",
          name: "createRole",
          id: "createRole",
          isGranted: false,
          isIntermediate: false,
          disabled: false,
          parentName: "roleManagement"
        }
      ]
    },
    {
      displayName: "Settings",
      name: "settings",
      id: "settings",
      isGranted: false,
      isIntermediate: false,
      disabled: false,
      parentName: null,
      permissions: []
    }
  ];

  const defaultProps = {
    permissions: mockPermissions,
    selectedPermissions: jest.fn(),
    editedPermissions: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.getItem.mockReturnValue('[]');
  });
  describe('Component Rendering', () => {
    it('should render without crashing', () => {
      expect(() => {
        render(<RdsCompPermissionTreeNew permissions={[]} />);
      }).not.toThrow();
    });

    it('should render Select All checkbox and all permissions', () => {
      render(<RdsCompPermissionTreeNew {...defaultProps} />);
      
      expect(screen.getByTestId('select-all')).toBeInTheDocument();
      expect(screen.getByText('Select All')).toBeInTheDocument();
      expect(screen.getByText('User Management')).toBeInTheDocument();
      expect(screen.getByText('Create User')).toBeInTheDocument();
    });
  });
  describe('Select All Functionality', () => {
    it('should select/deselect all permissions when Select All is clicked', () => {
      render(<RdsCompPermissionTreeNew {...defaultProps} />);
      
      const selectAllCheckbox = screen.getByTestId('select-all');
      
      // Select all
      fireEvent.click(selectAllCheckbox);
      expect(defaultProps.editedPermissions).toHaveBeenCalledTimes(1);
      
      // Deselect all
      fireEvent.click(selectAllCheckbox);
      expect(defaultProps.editedPermissions).toHaveBeenCalledTimes(2);
    });
  });
  describe('Checkbox Interactions', () => {
    it('should handle parent checkbox selection', () => {
      render(<RdsCompPermissionTreeNew {...defaultProps} />);
      
      const userManagementCheckbox = screen.getByTestId('checkbox-input-user-management');
      fireEvent.click(userManagementCheckbox);
      
      expect(defaultProps.editedPermissions).toHaveBeenCalled();
      const callArgs = defaultProps.editedPermissions.mock.calls[0][0];
      expect(Array.isArray(callArgs)).toBe(true);
    });

    it('should handle child checkbox selection', () => {
      render(<RdsCompPermissionTreeNew {...defaultProps} />);
      
      const createUserCheckbox = screen.getByTestId('checkbox-input-create-user');
      fireEvent.click(createUserCheckbox);
      
      expect(defaultProps.editedPermissions).toHaveBeenCalled();
    });
  });
  describe('Props Handling', () => {
    it('should handle empty permissions gracefully', () => {
      expect(() => {
        render(<RdsCompPermissionTreeNew permissions={[]} />);
      }).not.toThrow();
    });

    it('should call selectedPermissions callback', async () => {
      render(<RdsCompPermissionTreeNew {...defaultProps} />);
      
      const createUserCheckbox = screen.getByTestId('checkbox-input-create-user');
      fireEvent.click(createUserCheckbox);
      
      await waitFor(() => {
        expect(defaultProps.selectedPermissions).toHaveBeenCalled();
      });
    });    it('should handle different permission structures', () => {
      const simplePermissions = [
        {
          displayName: "Simple Permission",
          name: "simplePermission",
          id: "simplePermission",
          isGranted: false,
          isIntermediate: false,
          disabled: false,
          parentName: null,
          permissions: []
        }
      ];
      
      expect(() => {
        render(<RdsCompPermissionTreeNew permissions={simplePermissions} />);
      }).not.toThrow();
      
      expect(screen.getByText('Simple Permission')).toBeInTheDocument();
    });
  });

  describe('LocalStorage Integration', () => {
    it('should handle localStorage operations', () => {
      render(<RdsCompPermissionTreeNew {...defaultProps} />);
      
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'initailStateData',
        expect.any(String)
      );
    });
  });
});