import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RdsCompDirectoryList, DirectoryItem, RdsCompDirectoryListProps } from '../src/rds-comp-directory-list/rds-comp-directory-list';

// Mock RDS components
jest.mock('../src/rds-elements', () => ({
  RdsIcon: ({ name, onClick, dataTestId, ...props }: any) => (
    <div 
      data-testid={dataTestId || `icon-${name}`} 
      onClick={onClick}
      {...props}
    >
      {name}
    </div>
  ),
  RdsLabel: ({ label, class: className, ...props }: any) => (
    <span className={className} {...props}>
      {label}
    </span>
  ),
}));

describe('RdsCompDirectoryList', () => {
  const mockItems: DirectoryItem[] = [
    {
      id: 'folder1',
      name: 'Documents',
      children: [
        {
          id: 'folder1-1',
          name: 'Work',
          children: [{ id: 'folder1-1-1', name: 'Projects' }],
        },
        { id: 'folder1-2', name: 'Personal' },
      ],
    },
    {
      id: 'folder2',
      name: 'Pictures',
      children: [{ id: 'folder2-1', name: 'Vacation' }],
    },
    { id: 'folder3', name: 'Empty Folder' },
  ];

  const defaultProps: RdsCompDirectoryListProps = {
    items: mockItems,
    path: jest.fn(),
    setMoveId: jest.fn(),
    onDragAndDrop: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // 1. Basic Rendering Tests
  it('should render directory items with proper structure', () => {
    render(<RdsCompDirectoryList {...defaultProps} />);
    
    expect(screen.getByText('Documents')).toBeInTheDocument();
    expect(screen.getByText('Pictures')).toBeInTheDocument();
    expect(screen.getByText('Empty Folder')).toBeInTheDocument();
    expect(screen.getAllByTestId('icon-folder')).toHaveLength(3);
  });

  it('should display child count for folders with children', () => {
    render(<RdsCompDirectoryList {...defaultProps} />);
    
    expect(screen.getByText('(2)')).toBeInTheDocument(); // Documents has 2 children
    expect(screen.getByText('(1)')).toBeInTheDocument(); // Pictures has 1 child
    expect(screen.queryByText('(0)')).not.toBeInTheDocument(); // Empty folder has no count
  });

  // 2. Expand/Collapse Functionality
  it('should expand and collapse folders correctly', async () => {
    render(<RdsCompDirectoryList {...defaultProps} />);
    
    // Initially children are hidden
    expect(screen.queryByText('Work')).not.toBeInTheDocument();
    
    // Click to expand
    fireEvent.click(screen.getByText('Documents'));
    
    await waitFor(() => {
      expect(screen.getByText('Work')).toBeInTheDocument();
      expect(screen.getByText('Personal')).toBeInTheDocument();
    });
    
    // Click to collapse
    fireEvent.click(screen.getByText('Documents'));
      await waitFor(() => {
      expect(screen.queryByText('Work')).not.toBeInTheDocument();
    });
  });

  // 3. Selection State
  it('should highlight selected items', () => {
    render(<RdsCompDirectoryList {...defaultProps} selectedItemId="folder1" />);
    
    const selectedItem = screen.getByText('Documents').closest('div');
    expect(selectedItem).toHaveClass('text-bg-white');
    
    const nonSelectedItem = screen.getByText('Pictures').closest('div');
    expect(nonSelectedItem).not.toHaveClass('text-bg-white');
  });

  // 4. Event Handlers
  it('should call path callback when items are clicked', () => {
    const mockPath = jest.fn();
    render(<RdsCompDirectoryList {...defaultProps} path={mockPath} />);
    
    fireEvent.click(screen.getByText('Documents'));
    
    expect(mockPath).toHaveBeenCalledWith({
      id: 'folder1',
      name: 'Documents'
    });
  });

  // 5. Drag and Drop
  it('should handle drag and drop operations', () => {
    const mockOnDragAndDrop = jest.fn();
    const mockSetMoveId = jest.fn();
    
    render(
      <RdsCompDirectoryList 
        {...defaultProps} 
        onDragAndDrop={mockOnDragAndDrop}
        setMoveId={mockSetMoveId}
      />
    );
    
    const documentsItem = screen.getByText('Documents').closest('div');
    const picturesItem = screen.getByText('Pictures').closest('div');
    
    expect(documentsItem).toHaveAttribute('draggable', 'true');
    
    // Simulate drag and drop
    fireEvent.dragStart(documentsItem!);
    fireEvent.drop(picturesItem!);
    
    expect(mockOnDragAndDrop).toHaveBeenCalled();
    expect(mockSetMoveId).toHaveBeenCalledWith('folder2');
  });

  // 6. Nested Structure
  it('should handle nested directory structure', async () => {
    render(<RdsCompDirectoryList {...defaultProps} />);
    
    // Expand Documents
    fireEvent.click(screen.getByText('Documents'));
    
    await waitFor(() => {
      expect(screen.getByText('Work')).toBeInTheDocument();
    });
    
    // Expand Work to show Projects
    fireEvent.click(screen.getByText('Work'));
    
    await waitFor(() => {
      expect(screen.getByText('Projects')).toBeInTheDocument();
    });
  });

  // 7. Edge Cases
  it('should handle empty items array', () => {
    render(<RdsCompDirectoryList {...defaultProps} items={[]} />);
    
    const container = screen.getByRole('list');
    expect(container).toBeInTheDocument();
    expect(container).toBeEmptyDOMElement();
  });

  it('should handle items without children', () => {
    const itemsWithoutChildren: DirectoryItem[] = [
      { id: 'item1', name: 'Item 1' },
      { id: 'item2', name: 'Item 2' },
    ];
    
    render(<RdsCompDirectoryList {...defaultProps} items={itemsWithoutChildren} />);
    
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.queryAllByTestId(/icon-chevron/)).toHaveLength(0);
  });

  it('should work with minimal props', () => {
    const minimalProps = { items: mockItems };
    
    expect(() => {
      render(<RdsCompDirectoryList {...minimalProps} />);
    }).not.toThrow();
    
    expect(screen.getByText('Documents')).toBeInTheDocument();
  });

  // 8. Recursive Props Passing
  it('should pass selectedItemId to nested components', async () => {
    render(<RdsCompDirectoryList {...defaultProps} selectedItemId="folder1-1" />);
    
    // Expand Documents to show nested items
    fireEvent.click(screen.getByText('Documents'));
    
    await waitFor(() => {
      const workItem = screen.getByText('Work').closest('div');
      expect(workItem).toHaveClass('text-bg-white');
    });
  });
});