import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompCollapsibleContainer, { Position, MenuItem } from '../src/rds-comp-collapsible-container/rds-comp-collapsible-container';

// Mock the RdsCompIcon component
jest.mock('../src/rds-elements', () => ({
  RdsCompIcon: ({ name, width, height, onClick, classes }: any) => (
    <div 
      data-testid={`icon-${name}`}
      onClick={onClick}
      className={classes}
      style={{ width, height }}
    >
      {name}
    </div>
  )
}));

describe('RdsCompCollapsibleContainer', () => {
  // Define sample menu items for testing
  const menuItems: MenuItem[] = [
    {
      id: '1',
      name: 'Item 1',
      icon: 'home',
      component: <div data-testid="component-1">Component 1</div>
    },
    {
      id: '2',
      name: 'Item 2',
      icon: 'settings',
      component: <div data-testid="component-2">Component 2</div>
    },
    {
      id: '3',
      name: 'Item 3',
      icon: 'user',
      component: <div data-testid="component-3">Component 3</div>
    }
  ];

  it('renders without crashing with right position', () => {
    const { container } = render(
      <RdsCompCollapsibleContainer 
        position={Position.Right} 
        menuItems={menuItems} 
      />
    );
    expect(container).toBeTruthy();
  });

  it('renders without crashing with left position', () => {
    const { container } = render(
      <RdsCompCollapsibleContainer 
        position={Position.Left} 
        menuItems={menuItems} 
      />
    );
    expect(container).toBeTruthy();
  });

  it('displays all menu items with names when not collapsed', () => {
    render(
      <RdsCompCollapsibleContainer 
        position={Position.Right} 
        menuItems={menuItems} 
      />
    );
    
    // Check if all item names are displayed
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByText('Item 3')).toBeInTheDocument();
  });

  it('displays all menu icons', () => {
    render(
      <RdsCompCollapsibleContainer 
        position={Position.Right} 
        menuItems={menuItems} 
      />
    );
    
    // Check if all icons are displayed
    expect(screen.getByTestId('icon-home')).toBeInTheDocument();
    expect(screen.getByTestId('icon-settings')).toBeInTheDocument();
    expect(screen.getByTestId('icon-user')).toBeInTheDocument();
  });

  it('displays all menu components', () => {
    render(
      <RdsCompCollapsibleContainer 
        position={Position.Right} 
        menuItems={menuItems} 
      />
    );
    
    // Check if all components are displayed
    expect(screen.getByTestId('component-1')).toBeInTheDocument();
    expect(screen.getByTestId('component-2')).toBeInTheDocument();
    expect(screen.getByTestId('component-3')).toBeInTheDocument();
  });

  it('shows chevron_right icon initially for right position', () => {
    render(
      <RdsCompCollapsibleContainer 
        position={Position.Right} 
        menuItems={menuItems} 
      />
    );
    
    expect(screen.getByTestId('icon-chevron_right')).toBeInTheDocument();
  });

  it('shows chevron_left icon initially for left position', () => {
    render(
      <RdsCompCollapsibleContainer 
        position={Position.Left} 
        menuItems={menuItems} 
      />
    );
    
    expect(screen.getByTestId('icon-chevron_left')).toBeInTheDocument();
  });

  it('toggles collapse state when chevron is clicked (right position)', () => {
    render(
      <RdsCompCollapsibleContainer 
        position={Position.Right} 
        menuItems={menuItems} 
      />
    );
    
    // Initially not collapsed
    const container = document.querySelector('.container-collapse');
    expect(container).not.toHaveClass('collapsed-container');
    
    // Click the chevron
    const chevron = screen.getByTestId('icon-chevron_right');
    fireEvent.click(chevron);
    
    // Now it should be collapsed
    expect(container).toHaveClass('collapsed-container');
    expect(screen.getByTestId('icon-chevron_left')).toBeInTheDocument();
    
    // Names should not be visible when collapsed
    expect(screen.queryByText('Item 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Item 2')).not.toBeInTheDocument();
    expect(screen.queryByText('Item 3')).not.toBeInTheDocument();
    
    // But icons should still be visible
    expect(screen.getByTestId('icon-home')).toBeInTheDocument();
    expect(screen.getByTestId('icon-settings')).toBeInTheDocument();
    expect(screen.getByTestId('icon-user')).toBeInTheDocument();
    
    // Click the chevron again
    const newChevron = screen.getByTestId('icon-chevron_left');
    fireEvent.click(newChevron);
    
    // Now it should be expanded again
    expect(container).not.toHaveClass('collapsed-container');
    expect(screen.getByTestId('icon-chevron_right')).toBeInTheDocument();
    
    // Names should be visible again
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByText('Item 3')).toBeInTheDocument();
  });

  it('toggles collapse state when chevron is clicked (left position)', () => {
    render(
      <RdsCompCollapsibleContainer 
        position={Position.Left} 
        menuItems={menuItems} 
      />
    );
    
    // Initially not collapsed
    const container = document.querySelector('.container-collapse');
    expect(container).not.toHaveClass('collapsed-container');
    
    // Click the chevron
    const chevron = screen.getByTestId('icon-chevron_left');
    fireEvent.click(chevron);
    
    // Now it should be collapsed
    expect(container).toHaveClass('collapsed-container');
    expect(screen.getByTestId('icon-chevron_right')).toBeInTheDocument();
    
    // Names should not be visible when collapsed
    expect(screen.queryByText('Item 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Item 2')).not.toBeInTheDocument();
    expect(screen.queryByText('Item 3')).not.toBeInTheDocument();
    
    // Click the chevron again
    const newChevron = screen.getByTestId('icon-chevron_right');
    fireEvent.click(newChevron);
    
    // Now it should be expanded again
    expect(container).not.toHaveClass('collapsed-container');
    expect(screen.getByTestId('icon-chevron_left')).toBeInTheDocument();
    
    // Names should be visible again
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByText('Item 3')).toBeInTheDocument();
  });

  it('correctly positions chevron based on position prop', () => {
    const { rerender } = render(
      <RdsCompCollapsibleContainer 
        position={Position.Right} 
        menuItems={menuItems} 
      />
    );
    
    // For right position, chevron should be in leftChevronPosition
    expect(document.querySelector('.leftChevronPosition')).toBeInTheDocument();
    expect(document.querySelector('.rightChevronPosition')).not.toBeInTheDocument();
    
    // Rerender with left position
    rerender(
      <RdsCompCollapsibleContainer 
        position={Position.Left} 
        menuItems={menuItems} 
      />
    );
    
    // For left position, chevron should be in rightChevronPosition
    expect(document.querySelector('.leftChevronPosition')).not.toBeInTheDocument();
    expect(document.querySelector('.rightChevronPosition')).toBeInTheDocument();
  });

  it('handles empty menuItems array', () => {
    const { container } = render(
      <RdsCompCollapsibleContainer 
        position={Position.Right} 
        menuItems={[]} 
      />
    );
    
    // Should render without crashing
    expect(container).toBeTruthy();
    
    // Content should be empty
    const content = document.querySelector('.content');
    expect(content?.children.length).toBe(0);
  });

  it('handles menuItems with missing properties', () => {
    const incompleteMenuItems: MenuItem[] = [
      { id: '1', name: 'No Icon or Component' },
      { id: '2', icon: 'settings' },
      { component: <div data-testid="component-only">Component Only</div> }
    ];
    
    render(
      <RdsCompCollapsibleContainer 
        position={Position.Right} 
        menuItems={incompleteMenuItems} 
      />
    );
    
    // Should render without crashing
    expect(screen.getByText('No Icon or Component')).toBeInTheDocument();
    expect(screen.getByTestId('icon-settings')).toBeInTheDocument();
    expect(screen.getByTestId('component-only')).toBeInTheDocument();
  });
});