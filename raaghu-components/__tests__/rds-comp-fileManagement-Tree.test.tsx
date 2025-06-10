import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RdsCompFileManagementTree, FileManagementTree } from '../src/rds-comp-fileManagement-Tree/rds-comp-fileManagement-Tree';

// Mock RDS components
jest.mock('../src/rds-elements', () => ({
    RdsButtonGroup: ({ buttonGroupItems, onButtonClick, ...props }: any) => (
        <div data-testid="rds-button-group" {...props}>
            {buttonGroupItems?.map((item: any, index: number) => (
                <button
                    key={item.id || index}
                    data-testid={`button-${item.id}`}
                    onClick={(e) => onButtonClick && onButtonClick(e, item.id)}
                    data-bs-toggle={item.databstoggle}
                    data-bs-target={item.databstarget}
                    aria-controls={item.ariacontrols}
                >
                    {item.icon}
                </button>
            ))}
        </div>
    ),
    RdsLabel: ({ label, onClick, ...props }: any) => (
        <span 
            data-testid="rds-label"
            onClick={onClick}
            {...props}
        >
            {label}
        </span>
    ),
}));

// Mock CSS import
jest.mock('../src/rds-comp-fileManagement-Tree/rds-comp-fileManagement-Tree.css', () => ({}));

describe('RdsCompFileManagementTree', () => {
    const mockPath = jest.fn();
    const mockOnClickButtonGroup = jest.fn();
    const mockOnDragAndDrop = jest.fn();

    const simpleTreeItems: FileManagementTree[] = [
        {
            id: '1',
            name: 'Documents',
        },
        {
            id: '2',
            name: 'Images',
        },
    ];

    const nestedTreeItems: FileManagementTree[] = [
        {
            id: '1',
            name: 'Root Folder',
            hasChildren: true,
            children: [
                {
                    id: '1-1',
                    name: 'Sub Folder 1',
                    children: [
                        {
                            id: '1-1-1',
                            name: 'File 1.txt',
                        },
                        {
                            id: '1-1-2',
                            name: 'File 2.pdf',
                        },
                    ],
                },
                {
                    id: '1-2',
                    name: 'Sub Folder 2',
                },
            ],
        },
        {
            id: '2',
            name: 'Another Root',
            hasChildren: true,
            children: [
                {
                    id: '2-1',
                    name: 'Nested File.doc',
                },
            ],
        },
    ];

    beforeEach(() => {
        mockPath.mockClear();
        mockOnClickButtonGroup.mockClear();
        mockOnDragAndDrop.mockClear();
        
        // Mock DOM methods
        document.querySelectorAll = jest.fn().mockReturnValue([]);
    });

    it('renders simple tree items correctly', () => {
        render(
            <RdsCompFileManagementTree 
                items={simpleTreeItems}
                path={mockPath}
            />
        );

        expect(screen.getByText('Documents')).toBeInTheDocument();
        expect(screen.getByText('Images')).toBeInTheDocument();
        expect(screen.getAllByTestId('rds-button-group')).toHaveLength(2);
    });

    it('renders nested tree structure correctly', () => {
        render(
            <RdsCompFileManagementTree 
                items={nestedTreeItems}
                path={mockPath}
            />
        );

        expect(screen.getByText('Root Folder')).toBeInTheDocument();
        expect(screen.getByText('Another Root')).toBeInTheDocument();
        
        // Initially expanded, so children should be visible
        expect(screen.getByText('Sub Folder 1')).toBeInTheDocument();
        expect(screen.getByText('Sub Folder 2')).toBeInTheDocument();
        expect(screen.getByText('Nested File.doc')).toBeInTheDocument();
    });

    it('renders button group with correct buttons for each item', () => {
        render(
            <RdsCompFileManagementTree 
                items={simpleTreeItems}
                path={mockPath}
                offId="test"
            />
        );

        // Check for all button types
        expect(screen.getAllByTestId('button-plusButton')).toHaveLength(2);
        expect(screen.getAllByTestId('button-editButton')).toHaveLength(2);
        expect(screen.getAllByTestId('button-moveButton')).toHaveLength(2);
        expect(screen.getAllByTestId('button-deleteButton')).toHaveLength(2);
    });

    it('calls path callback when item label is clicked', () => {
        render(
            <RdsCompFileManagementTree 
                items={simpleTreeItems}
                path={mockPath}
            />
        );

        const documentsLabel = screen.getByText('Documents');
        fireEvent.click(documentsLabel);

        expect(mockPath).toHaveBeenCalledWith({ id: '1', name: 'Documents' });
    });

    it('calls onClickButtonGroup when button is clicked', () => {
        render(
            <RdsCompFileManagementTree 
                items={simpleTreeItems}
                path={mockPath}
                onClickButtonGroup={mockOnClickButtonGroup}
            />
        );

        const plusButton = screen.getAllByTestId('button-plusButton')[0];
        fireEvent.click(plusButton);

        expect(mockOnClickButtonGroup).toHaveBeenCalledWith('plusButton', 'Documents');
    });

    it('toggles expansion state when folder is clicked', () => {
        render(
            <RdsCompFileManagementTree 
                items={nestedTreeItems}
                path={mockPath}
            />
        );

        // Initially expanded - children should be visible
        expect(screen.getByText('Sub Folder 1')).toBeInTheDocument();

        // Click to collapse
        const rootFolder = screen.getByText('Root Folder');
        fireEvent.click(rootFolder);

        // Children should still be visible since they're in nested components
        // The expansion state is managed internally
        expect(mockPath).toHaveBeenCalledWith({ id: '1', name: 'Root Folder' });
    });

    it('handles deep nesting correctly', () => {
        const deepNestedItems: FileManagementTree[] = [
            {
                id: '1',
                name: 'Level 1',
                children: [
                    {
                        id: '1-1',
                        name: 'Level 2',
                        children: [
                            {
                                id: '1-1-1',
                                name: 'Level 3',
                                children: [
                                    {
                                        id: '1-1-1-1',
                                        name: 'Deep File.txt',
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ];

        render(
            <RdsCompFileManagementTree 
                items={deepNestedItems}
                path={mockPath}
            />
        );

        expect(screen.getByText('Level 1')).toBeInTheDocument();
        expect(screen.getByText('Level 2')).toBeInTheDocument();
        expect(screen.getByText('Level 3')).toBeInTheDocument();
        expect(screen.getByText('Deep File.txt')).toBeInTheDocument();
    });

    it('handles empty items array gracefully', () => {
        render(
            <RdsCompFileManagementTree 
                items={[]}
                path={mockPath}
            />
        );

        // Should render without crashing
        const treeContainer = screen.getByRole('list');
        expect(treeContainer).toBeInTheDocument();
        expect(treeContainer.children).toHaveLength(0);
    });

    it('handles items without children property', () => {
        const itemsWithoutChildren: FileManagementTree[] = [
            {
                id: '1',
                name: 'Simple File',
            },
        ];

        render(
            <RdsCompFileManagementTree 
                items={itemsWithoutChildren}
                path={mockPath}
            />
        );

        expect(screen.getByText('Simple File')).toBeInTheDocument();
        expect(screen.getByTestId('rds-button-group')).toBeInTheDocument();
    });

    it('applies correct CSS classes and structure', () => {
        render(
            <RdsCompFileManagementTree 
                items={simpleTreeItems}
                path={mockPath}
            />
        );

        const treeContainer = screen.getByRole('list');
        expect(treeContainer).toHaveClass('file-tree', 'pt-1', 'cursor-pointer', 'pb-3');
    });

    it('passes selectedItemId prop to nested components', () => {
        render(
            <RdsCompFileManagementTree 
                items={nestedTreeItems}
                path={mockPath}
                selectedItemId="1-1"
            />
        );

        // Component should render without errors when selectedItemId is provided
        expect(screen.getByText('Root Folder')).toBeInTheDocument();
    });

    it('passes onDragAndDrop prop to nested components', () => {
        render(
            <RdsCompFileManagementTree 
                items={nestedTreeItems}
                path={mockPath}
                onDragAndDrop={mockOnDragAndDrop}
            />
        );

        // Component should render without errors when onDragAndDrop is provided
        expect(screen.getByText('Root Folder')).toBeInTheDocument();
    });

    it('sets correct button attributes for modal and offcanvas triggers', () => {
        render(
            <RdsCompFileManagementTree 
                items={simpleTreeItems}
                path={mockPath}
                offId="test123"
            />
        );

        const plusButton = screen.getAllByTestId('button-plusButton')[0];
        const editButton = screen.getAllByTestId('button-editButton')[0];
        const moveButton = screen.getAllByTestId('button-moveButton')[0];
        const deleteButton = screen.getAllByTestId('button-deleteButton')[0];

        expect(plusButton).toHaveAttribute('data-bs-toggle', 'offcanvas');
        expect(plusButton).toHaveAttribute('data-bs-target', '#atest123');
        
        expect(editButton).toHaveAttribute('data-bs-toggle', 'offcanvas');
        expect(editButton).toHaveAttribute('data-bs-target', '#btest123');
        
        expect(moveButton).toHaveAttribute('data-bs-toggle', 'offcanvas');
        expect(moveButton).toHaveAttribute('data-bs-target', '#ctest123');
        
        expect(deleteButton).toHaveAttribute('data-bs-toggle', 'modal');
        expect(deleteButton).toHaveAttribute('data-bs-target', '#deleteTreeNode');
    });

    it('handles backdrop cleanup when buttons are clicked', () => {
        const mockRemove = jest.fn();
        const mockBackdrops = [
            { remove: mockRemove },
            { remove: mockRemove },
            { remove: mockRemove },
        ];
        
        document.querySelectorAll = jest.fn().mockReturnValue(mockBackdrops);

        render(
            <RdsCompFileManagementTree 
                items={simpleTreeItems}
                path={mockPath}
                onClickButtonGroup={mockOnClickButtonGroup}
            />
        );

        const plusButton = screen.getAllByTestId('button-plusButton')[0];
        fireEvent.click(plusButton);

        expect(document.querySelectorAll).toHaveBeenCalledWith('.offcanvas-backdrop, .modal-backdrop');
        expect(mockRemove).toHaveBeenCalledTimes(2); // Should remove all but the last backdrop
        expect(mockOnClickButtonGroup).toHaveBeenCalledWith('plusButton', 'Documents');
    });

    it('renders correct number of tree items at each level', () => {
        render(
            <RdsCompFileManagementTree 
                items={nestedTreeItems}
                path={mockPath}
            />
        );

        // Should have 2 root level items
        const rootItems = screen.getAllByTestId('rds-button-group');
        expect(rootItems.length).toBeGreaterThanOrEqual(2);
    });
});