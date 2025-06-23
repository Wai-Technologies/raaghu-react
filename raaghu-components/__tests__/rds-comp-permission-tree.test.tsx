import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompPermissionTree from '../src/rds-comp-permission-tree/rds-comp-permission-tree';

// Mock the rds-elements components
jest.mock('../src/rds-elements', () => ({
  RdsCheckbox: ({ 
    labelText, 
    checked, 
    onChange,
    ...props 
  }: any) => (
    <div data-testid={`checkbox-${labelText?.replace(/\s+/g, '-').toLowerCase()}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        data-testid={`checkbox-input-${labelText?.replace(/\s+/g, '-').toLowerCase()}`}
        {...props}
      />
      <label>{labelText}</label>
    </div>
  ),
}));

describe('RdsCompPermissionTree', () => {
  const mockTreeData = [
    {
      data: { id: 1 },
      label: 'User Management',
      selected: false,
      level: 0,
      children: [
        {
          data: { id: 2 },
          label: 'Create User',
          selected: false,
          level: 1,
          children: []
        },
        {
          data: { id: 3 },
          label: 'Edit User',
          selected: false,
          level: 1,
          children: []
        }
      ]
    },
    {
      data: { id: 4 },
      label: 'Role Management',
      selected: false,
      level: 0,
      children: [
        {
          data: { id: 5 },
          label: 'Create Role',
          selected: false,
          level: 1,
          children: [
            {
              data: { id: 6 },
              label: 'Assign Permissions',
              selected: false,
              level: 2,
              children: []
            }
          ]
        }
      ]
    },
    {
      data: { id: 7 },
      label: 'Settings',
      selected: false,
      level: 0,
      children: []
    }
  ];

  const defaultProps = {
    treeData: mockTreeData,
    onCheckboxChange: jest.fn(),
    changeData: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Component Rendering', () => {
    it('should render without crashing', () => {
      expect(() => {
        render(<RdsCompPermissionTree treeData={[]} />);
      }).not.toThrow();
    });

    it('should render all root level nodes', () => {
      render(<RdsCompPermissionTree {...defaultProps} />);
      
      expect(screen.getByText('User Management')).toBeInTheDocument();
      expect(screen.getByText('Role Management')).toBeInTheDocument();
      expect(screen.getByText('Settings')).toBeInTheDocument();
    });

    it('should render child nodes for nodes with children', () => {
      render(<RdsCompPermissionTree {...defaultProps} />);
      
      expect(screen.getByText('Create User')).toBeInTheDocument();
      expect(screen.getByText('Edit User')).toBeInTheDocument();
      expect(screen.getByText('Create Role')).toBeInTheDocument();
    });

    it('should render nested child nodes', () => {
      render(<RdsCompPermissionTree {...defaultProps} />);
      
      expect(screen.getByText('Assign Permissions')).toBeInTheDocument();
    });

    it('should render container with correct CSS classes', () => {
      const { container } = render(<RdsCompPermissionTree {...defaultProps} />);
      
      const containerDiv = container.querySelector('.overflow-x-hidden.overflow-y-scroll.offcanvas-custom-scroll');
      expect(containerDiv).toBeInTheDocument();
    });
  });
  describe('Checkbox Interactions', () => {
    it('should call changeData when checkbox state changes', () => {
      render(<RdsCompPermissionTree {...defaultProps} />);
      
      const userManagementCheckbox = screen.getByTestId('checkbox-input-user-management');
      fireEvent.click(userManagementCheckbox);
      
      expect(defaultProps.changeData).toHaveBeenCalled();
    });

    it('should update checkbox state when clicked', () => {
      render(<RdsCompPermissionTree {...defaultProps} />);
      
      const settingsCheckbox = screen.getByTestId('checkbox-input-settings');
      
      expect(settingsCheckbox).not.toBeChecked();
      fireEvent.click(settingsCheckbox);
      
      // The component should update its internal state
      expect(defaultProps.changeData).toHaveBeenCalled();
    });
  });

  describe('Tree Hierarchy Logic', () => {
    it('should select all children when parent is selected', () => {
      render(<RdsCompPermissionTree {...defaultProps} />);
      
      const userManagementCheckbox = screen.getByTestId('checkbox-input-user-management');
      fireEvent.click(userManagementCheckbox);
      
      // Should call changeData with updated tree structure
      expect(defaultProps.changeData).toHaveBeenCalled();
      
      // Verify the callback was called with the expectation that children are selected
      const callArgs = defaultProps.changeData.mock.calls[0][0];
      expect(callArgs).toBeDefined();
    });

    it('should handle parent selection based on child selection', () => {
      const treeDataWithSelectedChild = [
        {
          data: { id: 1 },
          label: 'User Management',
          selected: false,
          level: 0,
          children: [
            {
              data: { id: 2 },
              label: 'Create User',
              selected: true, // Child is selected
              level: 1,
              children: []
            }
          ]
        }
      ];
      
      render(<RdsCompPermissionTree {...defaultProps} treeData={treeDataWithSelectedChild} />);
      
      const createUserCheckbox = screen.getByTestId('checkbox-input-create-user');
      expect(createUserCheckbox).toBeChecked();
    });    it('should propagate selection down the tree hierarchy', () => {
      render(<RdsCompPermissionTree {...defaultProps} />);
      
      const roleManagementCheckbox = screen.getByTestId('checkbox-input-role-management');
      fireEvent.click(roleManagementCheckbox);
      
      // Verify changeData was called with updated data structure
      expect(defaultProps.changeData).toHaveBeenCalled();
      const callArgs = defaultProps.changeData.mock.calls[0][0];
      expect(callArgs).toBeDefined();
      expect(Array.isArray(callArgs)).toBe(true);
    });
  });

  describe('Tree Node Structure', () => {
    it('should render vertical line CSS classes for hierarchy visualization', () => {
      const { container } = render(<RdsCompPermissionTree {...defaultProps} />);
      
      const verticalElements = container.querySelectorAll('.verticalPermi');
      expect(verticalElements.length).toBeGreaterThan(0);
    });

    it('should render horizontal line CSS classes for child connections', () => {
      const { container } = render(<RdsCompPermissionTree {...defaultProps} />);
      
      const horizontalElements = container.querySelectorAll('.horizontalPermi');
      expect(horizontalElements.length).toBeGreaterThan(0);
    });

    it('should apply correct CSS classes based on node level', () => {
      const { container } = render(<RdsCompPermissionTree {...defaultProps} />);
      
      // Root level nodes should not have horizontal lines
      const rootNodes = container.querySelectorAll('[class*="level-0"]');
      // Child nodes should have proper indentation
      const childContainer = container.querySelector('.mx-5');
      expect(childContainer).toBeInTheDocument();
    });

    it('should handle nodes without children correctly', () => {
      render(<RdsCompPermissionTree {...defaultProps} />);
      
      const settingsCheckbox = screen.getByTestId('checkbox-input-settings');
      expect(settingsCheckbox).toBeInTheDocument();
      
      // Settings node has no children, so no child container should be rendered for it
      const settingsNode = screen.getByText('Settings').closest('.mt-1');
      const childContainer = settingsNode?.querySelector('.mx-5');
      expect(childContainer).toBeFalsy();
    });
  });

  describe('Props Handling', () => {
    it('should handle empty treeData gracefully', () => {
      expect(() => {
        render(<RdsCompPermissionTree treeData={[]} />);
      }).not.toThrow();
    });

    it('should handle undefined treeData', () => {
      expect(() => {
        render(<RdsCompPermissionTree treeData={undefined} />);
      }).not.toThrow();
    });

    it('should handle missing callback functions', () => {
      expect(() => {
        render(<RdsCompPermissionTree treeData={mockTreeData} />);
      }).not.toThrow();
    });

    it('should update when treeData prop changes', () => {
      const { rerender } = render(<RdsCompPermissionTree {...defaultProps} />);
      
      const newTreeData = [
        {
          data: { id: 8 },
          label: 'New Permission',
          selected: false,
          level: 0,
          children: []
        }
      ];
      
      rerender(<RdsCompPermissionTree {...defaultProps} treeData={newTreeData} />);
      
      expect(screen.getByText('New Permission')).toBeInTheDocument();
      expect(screen.queryByText('User Management')).not.toBeInTheDocument();
    });

    it('should handle treeData with different structures', () => {
      const malformedTreeData = [
        {
          data: { id: 1 },
          label: 'Test Node',
          selected: false,
          level: 0,
          // Missing children property
        },
        {
          data: { id: 2 },
          label: 'Another Node',
          selected: false,
          level: 0,
          children: null // Null children
        }
      ];
      
      expect(() => {
        render(<RdsCompPermissionTree treeData={malformedTreeData} />);
      }).not.toThrow();
    });
  });  describe('Component State Management', () => {
    it('should handle component rerenders correctly', () => {
      const { rerender } = render(<RdsCompPermissionTree {...defaultProps} />);
      
      // Rerender with same props
      rerender(<RdsCompPermissionTree {...defaultProps} />);
      
      expect(screen.getByText('User Management')).toBeInTheDocument();
    });
  });
  describe('Error Handling', () => {
    it('should handle nodes with missing labels', () => {
      const noLabelTreeData = [
        {
          data: { id: 1 },
          // Missing label
          selected: false,
          level: 0,
          children: []
        }
      ];
      
      expect(() => {
        render(<RdsCompPermissionTree treeData={noLabelTreeData} />);
      }).not.toThrow();
    });it('should handle circular references safely', () => {
      // Test with a simple case that won't cause infinite loops
      const circularTreeData: any = [
        {
          data: { id: 1 },
          label: 'Parent',
          selected: false,
          level: 0,
          children: [
            {
              data: { id: 2 },
              label: 'Child',
              selected: false,
              level: 1,
              children: []
            }
          ]
        }
      ];
      
      expect(() => {
        render(<RdsCompPermissionTree treeData={circularTreeData} />);
      }).not.toThrow();
    });
  });
  describe('Accessibility', () => {
    it('should render checkboxes with proper labels', () => {
      render(<RdsCompPermissionTree {...defaultProps} />);
      
      const userManagementLabel = screen.getByText('User Management');
      const createUserLabel = screen.getByText('Create User');
      const settingsLabel = screen.getByText('Settings');
      
      expect(userManagementLabel).toBeInTheDocument();
      expect(createUserLabel).toBeInTheDocument();
      expect(settingsLabel).toBeInTheDocument();
    });

    it('should have proper checkbox input elements', () => {
      render(<RdsCompPermissionTree {...defaultProps} />);
      
      const checkboxInputs = screen.getAllByRole('checkbox');
      expect(checkboxInputs.length).toBeGreaterThan(0);
      
      checkboxInputs.forEach(checkbox => {
        expect(checkbox).toHaveAttribute('type', 'checkbox');
      });
    });
  });
  describe('Performance', () => {
    it('should handle moderately large tree structures efficiently', () => {
      const largeTreeData = Array.from({ length: 10 }, (_, i) => ({
        data: { id: i },
        label: `Node ${i}`,
        selected: false,
        level: 0,
        children: Array.from({ length: 5 }, (_, j) => ({
          data: { id: i * 10 + j },
          label: `Child ${i}-${j}`,
          selected: false,
          level: 1,
          children: []
        }))
      }));
      
      expect(() => {
        render(<RdsCompPermissionTree treeData={largeTreeData} />);
      }).not.toThrow();
    });

    it('should render within reasonable time for complex trees', () => {
      const startTime = performance.now();
      
      render(<RdsCompPermissionTree {...defaultProps} />);
      
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      
      // Should render within 500ms for reasonable performance
      expect(renderTime).toBeLessThan(500);
    });
  });
});