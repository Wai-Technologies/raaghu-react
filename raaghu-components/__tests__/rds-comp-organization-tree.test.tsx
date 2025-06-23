import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompOrganizationTree from '../src/rds-comp-organization-tree/rds-comp-organization-tree';

// Mock the rds-elements components
jest.mock('../src/rds-elements', () => ({
  RdsIcon: ({ name, height, width, stroke, fill }: any) => (
    <span data-testid={`rds-icon-${name}`} className={`icon-${name}`}>
      {name}
    </span>
  ),
  RdsButton: ({ label, icon, onClick, colorVariant, size, ...props }: any) => (
    <button
      data-testid="rds-button"
      onClick={onClick}
      className={`btn ${colorVariant} ${size}`}
      {...props}
    >
      {icon && <span data-testid={`button-icon-${icon}`}>{icon}</span>}
      {label}
    </button>
  ),
  RdsButtonGroup: ({ buttonGroupItems, onButtonClick, colorVariant, size }: any) => (
    <div data-testid="rds-button-group" className={`btn-group ${colorVariant} ${size}`}>
      {buttonGroupItems?.map((item: any, index: number) => (
        <button
          key={index}
          data-testid={`button-group-${item.id}`}
          onClick={(e) => onButtonClick && onButtonClick(e, item.id)}
          className={`btn btn-${item.colorVariant}`}
        >
          {item.icon && <span data-testid={`icon-${item.icon}`}>{item.icon}</span>}
          {item.label}
        </button>
      ))}
    </div>
  ),
}));

describe('RdsCompOrganizationTree', () => {
  const mockOrganizationData = [
    {
      data: {
        id: 1,
        name: 'Root Organization',
        displayName: 'Root Org'
      },
      level: 1,
      children: [
        {
          data: {
            id: 2,
            name: 'Child Organization 1',
            displayName: 'Child 1'
          },
          level: 2,
          children: []
        },
        {
          data: {
            id: 3,
            name: 'Child Organization 2',
            displayName: 'Child 2'
          },
          level: 2,
          children: [
            {
              data: {
                id: 4,
                name: 'Grandchild Organization',
                displayName: 'Grandchild'
              },
              level: 3,
              children: []
            }
          ]
        }
      ]
    }
  ];

  const defaultProps = {
    counter: 0,
    nodeColor: [],
    organizationTreeData: mockOrganizationData,
    OrganizationTreeType: 'default',
    OrganizationTreeLabeles: {},
    mutable: true,
    offId: 'test',
    buttonLabel: 'Add Root Organization',
    onSelectNode: jest.fn(),
    onDeleteNode: jest.fn(),
    onNodeEdit: jest.fn(),
    onCreateNode: jest.fn(),
    onCreateSubUnit: jest.fn(),
    onCreateRootNode: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Component Rendering', () => {
    it('should render without crashing', () => {
      expect(() => {
        render(<RdsCompOrganizationTree {...defaultProps} />);
      }).not.toThrow();
    });

    it('should render the organization tree structure', () => {
      render(<RdsCompOrganizationTree {...defaultProps} />);
      
      expect(screen.getByText('Root Org')).toBeInTheDocument();
      expect(screen.getByText('Child 1')).toBeInTheDocument();
      expect(screen.getByText('Child 2')).toBeInTheDocument();
      expect(screen.getByText('Grandchild')).toBeInTheDocument();
    });

    it('should render the root button', () => {
      render(<RdsCompOrganizationTree {...defaultProps} />);
      
      const rootButton = screen.getByText('Add Root Organization');
      expect(rootButton).toBeInTheDocument();
    });

    it('should render with empty data', () => {
      const emptyProps = { ...defaultProps, organizationTreeData: [] };
      render(<RdsCompOrganizationTree {...emptyProps} />);
      
      expect(screen.getByText('Add Root Organization')).toBeInTheDocument();
    });
  });

  describe('Tree Node Structure', () => {
    it('should render correct icons for nodes with children', () => {
      render(<RdsCompOrganizationTree {...defaultProps} />);
      
      const plusSquareIcons = screen.getAllByTestId('rds-icon-plussquare');
      expect(plusSquareIcons.length).toBeGreaterThan(0);
    });

    it('should render correct icons for leaf nodes', () => {
      render(<RdsCompOrganizationTree {...defaultProps} />);
      
      const minusSquareIcons = screen.getAllByTestId('rds-icon-minussquare');
      expect(minusSquareIcons.length).toBeGreaterThan(0);
    });

    it('should render button groups for each node', () => {
      render(<RdsCompOrganizationTree {...defaultProps} />);
      
      const buttonGroups = screen.getAllByTestId('rds-button-group');
      expect(buttonGroups.length).toBeGreaterThan(0);
    });

    it('should render action buttons (plus, edit, delete) for each node', () => {
      render(<RdsCompOrganizationTree {...defaultProps} />);
      
      expect(screen.getAllByTestId('button-group-plus')).toBeTruthy();
      expect(screen.getAllByTestId('button-group-edit')).toBeTruthy();
      expect(screen.getAllByTestId('button-group-delete')).toBeTruthy();
    });
  });

  describe('Node Interactions', () => {
    it('should call onSelectNode when node is clicked', () => {
      render(<RdsCompOrganizationTree {...defaultProps} />);
      
      const rootNode = screen.getByText('Root Org');
      fireEvent.click(rootNode);
      
      expect(defaultProps.onSelectNode).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            id: 1,
            name: 'Root Organization'
          })
        })
      );
    });

    it('should call onCreateNode when plus button is clicked', () => {
      render(<RdsCompOrganizationTree {...defaultProps} />);
      
      const plusButton = screen.getAllByTestId('button-group-plus')[0];
      fireEvent.click(plusButton);
      
      expect(defaultProps.onCreateNode).toHaveBeenCalledWith(
        expect.objectContaining({
          id: 1,
          name: 'Root Organization'
        })
      );
    });

    it('should call onNodeEdit when edit button is clicked', () => {
      render(<RdsCompOrganizationTree {...defaultProps} />);
      
      const editButton = screen.getAllByTestId('button-group-edit')[0];
      fireEvent.click(editButton);
      
      expect(defaultProps.onNodeEdit).toHaveBeenCalledWith(
        expect.objectContaining({
          id: 1,
          name: 'Root Organization'
        })
      );
    });    it('should call onDeleteNode when delete button is clicked', () => {
      render(<RdsCompOrganizationTree {...defaultProps} />);
      
      const deleteButton = screen.getAllByTestId('button-group-delete')[0];
      fireEvent.click(deleteButton);
      
      expect(defaultProps.onDeleteNode).toHaveBeenCalledWith(1);
    });
  });

  describe('Props Handling', () => {
    it('should render with custom button label', () => {
      const customProps = { ...defaultProps, buttonLabel: 'Custom Root Button' };
      render(<RdsCompOrganizationTree {...customProps} />);
      
      expect(screen.getByText('Custom Root Button')).toBeInTheDocument();
    });

    it('should handle missing optional props', () => {
      const minimalProps = {
        nodeColor: [],
        organizationTreeData: mockOrganizationData,
        mutable: true,
      };
      
      expect(() => {
        render(<RdsCompOrganizationTree {...minimalProps} />);
      }).not.toThrow();
    });

    it('should handle undefined callback functions gracefully', () => {
      const propsWithoutCallbacks = {
        ...defaultProps,
        onSelectNode: undefined,
        onDeleteNode: undefined,
        onNodeEdit: undefined,
        onCreateNode: undefined,
        onCreateRootNode: undefined,
      };
      
      expect(() => {
        render(<RdsCompOrganizationTree {...propsWithoutCallbacks} />);
      }).not.toThrow();
    });
  });

  describe('Tree Hierarchy', () => {
    it('should render nested children correctly', () => {
      render(<RdsCompOrganizationTree {...defaultProps} />);
      
      // Root level
      expect(screen.getByText('Root Org')).toBeInTheDocument();
      
      // Second level
      expect(screen.getByText('Child 1')).toBeInTheDocument();
      expect(screen.getByText('Child 2')).toBeInTheDocument();
      
      // Third level
      expect(screen.getByText('Grandchild')).toBeInTheDocument();
    });

    it('should handle nodes with displayName over name', () => {
      render(<RdsCompOrganizationTree {...defaultProps} />);
      
      // Should display 'Root Org' (displayName) instead of 'Root Organization' (name)
      expect(screen.getByText('Root Org')).toBeInTheDocument();
      expect(screen.queryByText('Root Organization')).not.toBeInTheDocument();
    });

    it('should handle nodes without displayName', () => {
      const dataWithoutDisplayName = [
        {
          data: {
            id: 1,
            name: 'Organization Name Only'
          },
          level: 1,
          children: []
        }
      ];
      
      const props = { ...defaultProps, organizationTreeData: dataWithoutDisplayName };
      render(<RdsCompOrganizationTree {...props} />);
      
      expect(screen.getByText('Organization Name Only')).toBeInTheDocument();
    });
  });

  describe('Component Structure', () => {
    it('should have correct CSS classes for tree structure', () => {
      const { container } = render(<RdsCompOrganizationTree {...defaultProps} />);
      
      const treeList = container.querySelector('.list-style');
      expect(treeList).toBeInTheDocument();
      expect(treeList).toHaveClass('position-relative', 'mb-0');
    });

    it('should render proper list items for each node', () => {
      const { container } = render(<RdsCompOrganizationTree {...defaultProps} />);
      
      const listItems = container.querySelectorAll('li');
      expect(listItems.length).toBe(4); // All nodes in the tree
    });

    it('should have node dots for tree structure', () => {
      const { container } = render(<RdsCompOrganizationTree {...defaultProps} />);
      
      const nodeDots = container.querySelectorAll('.node_dot');
      expect(nodeDots.length).toBeGreaterThan(0);
    });
  });

  describe('Accessibility', () => {
    it('should have accessible button elements', () => {
      render(<RdsCompOrganizationTree {...defaultProps} />);
      
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBeGreaterThan(0);
      
      buttons.forEach(button => {
        expect(button).toBeVisible();
      });
    });

    it('should have proper list structure for screen readers', () => {
      const { container } = render(<RdsCompOrganizationTree {...defaultProps} />);
      
      const lists = container.querySelectorAll('ul');
      expect(lists.length).toBeGreaterThan(0);
      
      const listItems = container.querySelectorAll('li');
      expect(listItems.length).toBeGreaterThan(0);
    });
  });

  describe('Component Stability', () => {
    it('should not crash on multiple renders', () => {
      const { rerender } = render(<RdsCompOrganizationTree {...defaultProps} />);
      
      expect(() => {
        rerender(<RdsCompOrganizationTree {...defaultProps} />);
        rerender(<RdsCompOrganizationTree {...defaultProps} />);
      }).not.toThrow();
    });

    it('should handle data updates correctly', () => {
      const { rerender } = render(<RdsCompOrganizationTree {...defaultProps} />);
      
      const updatedData = [
        {
          data: {
            id: 5,
            name: 'Updated Organization',
            displayName: 'Updated Org'
          },
          level: 1,
          children: []
        }
      ];
      
      const updatedProps = { ...defaultProps, organizationTreeData: updatedData };
      rerender(<RdsCompOrganizationTree {...updatedProps} />);
      
      expect(screen.getByText('Updated Org')).toBeInTheDocument();
      expect(screen.queryByText('Root Org')).not.toBeInTheDocument();
    });
  });
});