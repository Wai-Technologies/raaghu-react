import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompClientResource from '../src/rds-comp-client-resources/rds-comp-client-resources';

// Mock the RdsCompApiScopeResource component
jest.mock('../src/rds-comp-api-scope-resource', () => ({
  __esModule: true,
  default: ({ resources, role, onCreate, onCancel }: any) => (
    <div data-testid="mock-api-scope-resource" data-role={role}>
      <div data-testid="resource-count">{resources.length}</div>
      <div data-testid="resource-items">
        {resources.map((resource: any, index: number) => (
          <div key={index} data-testid={`resource-${resource.id}`}>
            <div data-testid={`resource-name-${resource.id}`}>{resource.displayName}</div>
            <div data-testid={`resource-children-${resource.id}`}>{resource.children.length}</div>
          </div>
        ))}
      </div>
      {/* Add buttons to simulate the API resource component events */}
      <button data-testid="api-create-button" onClick={() => onCreate && onCreate(resources)}>
        Trigger Create
      </button>
      <button data-testid="api-cancel-button" onClick={() => onCancel && onCancel(resources)}>
        Trigger Cancel
      </button>
    </div>
  )
}));

// Mock the RdsButton component
jest.mock('../src/rds-elements', () => ({
  RdsButton: ({ 
    label, 
    type, 
    colorVariant, 
    size,
    databsdismiss,
    isDisabled, 
    dataTestId,
    onClick
  }: any) => (
    <button
      data-testid={dataTestId}
      type={type}
      disabled={isDisabled}
      data-bs-dismiss={databsdismiss}
      className={`btn btn-${colorVariant} btn-${size}`}
      onClick={onClick}
    >
      {label}
    </button>
  )
}));

describe('RdsCompClientResource', () => {
  // Sample data for testing
  const mockResources = [
    {
      id: 1,
      displayName: "A - E",
      selected: false,
      select: false,
      children: [
        {
          id: 1,
          p_id: 1,
          displayName: "Availability",
          selected: false,
        },
        {
          id: 2,
          p_id: 1,
          displayName: "Apiopolis",
          selected: false,
        }
      ]
    },
    {
      id: 2,
      displayName: "F - O",
      selected: false,
      select: false,
      children: [
        {
          id: 1,
          p_id: 2,
          displayName: "Foobar",
          selected: false,
        },
        {
          id: 2,
          p_id: 2,
          displayName: "GraphQL",
          selected: false,
        }
      ]
    }
  ];

  // Default props
  const defaultProps = {
    resources: mockResources,
    role: "basic" as const
  };

  it('renders without crashing', () => {
    const { container } = render(<RdsCompClientResource {...defaultProps} />);
    expect(container).toBeTruthy();
  });

  it('renders the RdsCompApiScopeResource component with correct props', () => {
    render(<RdsCompClientResource {...defaultProps} />);
    
    // Check if the ApiScopeResource component is rendered
    const apiScopeResource = screen.getByTestId('mock-api-scope-resource');
    expect(apiScopeResource).toBeInTheDocument();
    
    // Check if the role prop is correctly passed
    expect(apiScopeResource).toHaveAttribute('data-role', 'basic');
    
    // Check if resources are passed correctly
    expect(screen.getByTestId('resource-count')).toHaveTextContent('2');
    
    // Check if specific resources are rendered
    expect(screen.getByTestId('resource-name-1')).toHaveTextContent('A - E');
    expect(screen.getByTestId('resource-name-2')).toHaveTextContent('F - O');
    
    // Check if children counts are correct
    expect(screen.getByTestId('resource-children-1')).toHaveTextContent('2');
    expect(screen.getByTestId('resource-children-2')).toHaveTextContent('2');
  });

  it('renders buttons when role is "basic"', () => {
    render(<RdsCompClientResource {...defaultProps} role="basic" />);
    
    // Check if Save and Cancel buttons are rendered
    expect(screen.getByTestId('save')).toBeInTheDocument();
    expect(screen.getByTestId('cancel')).toBeInTheDocument();
    
    // Check button text
    expect(screen.getByTestId('save')).toHaveTextContent('Save');
    expect(screen.getByTestId('cancel')).toHaveTextContent('Cancel');
  });

  it('does not render buttons when role is not "basic"', () => {
    render(<RdsCompClientResource {...defaultProps} role="advanced" />);
    
    // Buttons should not be rendered
    expect(screen.queryByTestId('save')).not.toBeInTheDocument();
    expect(screen.queryByTestId('cancel')).not.toBeInTheDocument();
  });

  it('renders the component with the default role if not specified', () => {
    // Create props without role
    const { role, ...propsWithoutRole } = defaultProps;
    
    render(<RdsCompClientResource {...propsWithoutRole} />);
    
    // Should render the ApiScopeResource component
    const apiScopeResource = screen.getByTestId('mock-api-scope-resource');
    expect(apiScopeResource).toBeInTheDocument();
    
    // Should use the default role (which is "basic" as shown in the code)
    expect(apiScopeResource).toHaveAttribute('data-role', 'basic');
  });

  it('renders different content based on role prop', () => {
    const { rerender } = render(<RdsCompClientResource {...defaultProps} role="basic" />);
    
    // With role="basic", buttons should be rendered
    expect(screen.getByTestId('save')).toBeInTheDocument();
    expect(screen.getByTestId('cancel')).toBeInTheDocument();
    
    // Re-render with role="advanced"
    rerender(<RdsCompClientResource {...defaultProps} role="advanced" />);
    
    // With role="advanced", buttons should not be rendered
    expect(screen.queryByTestId('save')).not.toBeInTheDocument();
    expect(screen.queryByTestId('cancel')).not.toBeInTheDocument();
    
    // But ApiScopeResource should still be rendered
    expect(screen.getByTestId('mock-api-scope-resource')).toBeInTheDocument();
  });

  it('renders correctly with empty resources array', () => {
    render(<RdsCompClientResource {...defaultProps} resources={[]} />);
    
    // Should render the ApiScopeResource component
    const apiScopeResource = screen.getByTestId('mock-api-scope-resource');
    expect(apiScopeResource).toBeInTheDocument();
    
    // Resource count should be 0
    expect(screen.getByTestId('resource-count')).toHaveTextContent('0');
  });
  it('renders buttons with correct attributes when role is "basic"', () => {
    render(<RdsCompClientResource {...defaultProps} role="basic" />);
    
    // Check Save button attributes
    const saveButton = screen.getByTestId('save');
    expect(saveButton).toHaveAttribute('type', 'submit');
    expect(saveButton).toHaveAttribute('data-bs-dismiss', 'offcanvas');
    expect(saveButton).not.toBeDisabled();
    expect(saveButton).toHaveClass('btn-primary');
    expect(saveButton).toHaveClass('btn-small');
    
    // Check Cancel button attributes
    const cancelButton = screen.getByTestId('cancel');
    expect(cancelButton).toHaveAttribute('type', 'button');
    expect(cancelButton).toHaveAttribute('data-bs-dismiss', 'offcanvas');
    expect(cancelButton).toHaveClass('btn-outline-primary');
    expect(cancelButton).toHaveClass('btn-small');
  });

  it('passes multiple resources correctly to the ApiScopeResource component', () => {
    const extendedResources = [
      ...mockResources,
      {
        id: 3,
        displayName: "P - Z",
        selected: false,
        select: false,
        children: [
          {
            id: 1,
            p_id: 3,
            displayName: "Python API",
            selected: false,
          },
          {
            id: 2,
            p_id: 3,
            displayName: "REST Services",
            selected: false,
          },
          {
            id: 3,
            p_id: 3,
            displayName: "Zero Auth",
            selected: false,
          }
        ]
      }
    ];
    
    render(<RdsCompClientResource {...defaultProps} resources={extendedResources} />);
    
    // Check if resources count is correct
    expect(screen.getByTestId('resource-count')).toHaveTextContent('3');
    
    // Check if the new resource is rendered
    expect(screen.getByTestId('resource-name-3')).toHaveTextContent('P - Z');
    expect(screen.getByTestId('resource-children-3')).toHaveTextContent('3');
  });

  it('handles resources with no children correctly', () => {
    const resourcesWithEmptyChildren = [
      {
        id: 1,
        displayName: "Empty Group",
        selected: false,
        select: false,
        children: []
      }
    ];
    
    render(<RdsCompClientResource {...defaultProps} resources={resourcesWithEmptyChildren} />);
    
    // Resource should still be rendered
    expect(screen.getByTestId('resource-name-1')).toHaveTextContent('Empty Group');
    
    // Children count should be 0
    expect(screen.getByTestId('resource-children-1')).toHaveTextContent('0');
  });

  it('properly handles child component events', () => {
    render(<RdsCompClientResource {...defaultProps} />);
    
    // Simulate the ApiScopeResource component triggering its onCreate event
    fireEvent.click(screen.getByTestId('api-create-button'));
    
    // Simulate the ApiScopeResource component triggering its onCancel event
    fireEvent.click(screen.getByTestId('api-cancel-button'));
    
    // No assertions needed here since we're just testing that the events don't cause errors
    // The component doesn't have any state changes or side effects we can observe in this test
  });

  it('correctly handles button clicks in basic role mode', () => {
    render(<RdsCompClientResource {...defaultProps} role="basic" />);
    
    // Click the Save button
    fireEvent.click(screen.getByTestId('save'));
    
    // Click the Cancel button
    fireEvent.click(screen.getByTestId('cancel'));
    
    // No assertions needed here since we're just testing that the button clicks don't cause errors
    // The component doesn't have any state changes or side effects we can observe in this test
  });

  // Edge cases and special scenarios
  it('handles resources with special characters in displayName', () => {
    const resourcesWithSpecialChars = [
      {
        id: 1,
        displayName: "<Special & Chars>",
        selected: false,
        select: false,
        children: [
          {
            id: 1,
            p_id: 1,
            displayName: "Resource & API",
            selected: false,
          }
        ]
      }
    ];
    
    render(<RdsCompClientResource {...defaultProps} resources={resourcesWithSpecialChars} />);
    
    // Special characters should be rendered correctly
    expect(screen.getByTestId('resource-name-1')).toHaveTextContent('<Special & Chars>');
  });

  it('renders consistently with various resource structures', () => {
    // Test with a complex nested structure
    const complexResources = [
      {
        id: 1,
        displayName: "Deep Nested",
        selected: true, // Pre-selected
        select: true,
        children: Array(10).fill(0).map((_, i) => ({
          id: i + 1,
          p_id: 1,
          displayName: `Child ${i + 1}`,
          selected: i % 2 === 0, // Alternating selection
        }))
      }
    ];
    
    render(<RdsCompClientResource {...defaultProps} resources={complexResources} />);
    
    // Complex resources should be rendered correctly
    expect(screen.getByTestId('resource-name-1')).toHaveTextContent('Deep Nested');
    expect(screen.getByTestId('resource-children-1')).toHaveTextContent('10');
  });
});