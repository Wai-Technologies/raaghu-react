import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RdsCompFileMover, FileItem } from '../src/rds-comp-file-mover/rds-comp-file-mover';

// Mock RdsIcon component
jest.mock('../src/rds-elements', () => ({
    RdsIcon: ({ name, onClick, colorVariant, ...props }: any) => (
        <div
            data-testid={`rds-icon-${name}`}
            onClick={onClick}
            data-color-variant={colorVariant || 'default'}
            {...props}
        >
            {name}
        </div>
    ),
}));

describe('RdsCompFileMover', () => {
    const mockPath = jest.fn();

    const simpleFileItems: FileItem[] = [
        {
            id: '1',
            name: 'Document.pdf',
            iconName: 'file',
            iconFill: false,
        },
        {
            id: '2',
            name: 'Image.jpg',
            iconName: 'image',
            iconFill: true,
        },
    ];

    const nestedFileItems: FileItem[] = [
        {
            id: '1',
            name: 'Documents',
            hasChildren: true,
            iconName: 'folder',
            iconFill: false,
            children: [
                {
                    id: '1-1',
                    name: 'Report.pdf',
                    iconName: 'file',
                    iconFill: false,
                },
                {
                    id: '1-2',
                    name: 'Presentation.pptx',
                    iconName: 'file',
                    iconFill: false,
                },
            ],
        },
        {
            id: '2',
            name: 'Images',
            hasChildren: true,
            iconName: 'folder',
            iconFill: false,
            children: [
                {
                    id: '2-1',
                    name: 'Photo1.jpg',
                    iconName: 'image',
                    iconFill: true,
                },
            ],
        },
    ];

    beforeEach(() => {
        mockPath.mockClear();
    });

    it('renders simple file items correctly', () => {
        render(<RdsCompFileMover items={simpleFileItems} path={mockPath} />);

        expect(screen.getByText('Document.pdf')).toBeInTheDocument();
        expect(screen.getByText('Image.jpg')).toBeInTheDocument();
        expect(screen.getByTestId('rds-icon-file')).toBeInTheDocument();
        expect(screen.getByTestId('rds-icon-image')).toBeInTheDocument();
    });    it('renders nested file items with expand/collapse icons', () => {
        render(<RdsCompFileMover items={nestedFileItems} path={mockPath} />);

        expect(screen.getByText('Documents')).toBeInTheDocument();
        expect(screen.getByText('Images')).toBeInTheDocument();
        expect(screen.getAllByTestId('rds-icon-chevron_right')).toHaveLength(2);
        expect(screen.getAllByTestId('rds-icon-folder')).toHaveLength(2);
    });

    it('expands folder when clicked and shows children', () => {
        render(<RdsCompFileMover items={nestedFileItems} path={mockPath} />);

        const documentsFolder = screen.getByText('Documents');
        fireEvent.click(documentsFolder);

        expect(screen.getByText('Report.pdf')).toBeInTheDocument();
        expect(screen.getByText('Presentation.pptx')).toBeInTheDocument();
        expect(screen.getByTestId('rds-icon-chevron_down')).toBeInTheDocument();
    });    it('collapses folder when clicked again', () => {
        render(<RdsCompFileMover items={nestedFileItems} path={mockPath} />);

        const documentsFolder = screen.getByText('Documents');
        
        // First click to expand
        fireEvent.click(documentsFolder);
        expect(screen.getByText('Report.pdf')).toBeInTheDocument();

        // Second click to collapse
        fireEvent.click(documentsFolder);
        expect(screen.queryByText('Report.pdf')).not.toBeInTheDocument();
        expect(screen.getAllByTestId('rds-icon-chevron_right')).toHaveLength(2);
    });

    it('calls path callback with correct id when item is clicked', () => {
        render(<RdsCompFileMover items={simpleFileItems} path={mockPath} />);

        const documentFile = screen.getByText('Document.pdf');
        fireEvent.click(documentFile);

        expect(mockPath).toHaveBeenCalledWith({ id: '1' });
    });

    it('calls path callback when nested item is clicked', () => {
        render(<RdsCompFileMover items={nestedFileItems} path={mockPath} />);

        // First expand the Documents folder
        const documentsFolder = screen.getByText('Documents');
        fireEvent.click(documentsFolder);

        // Then click on the nested file
        const reportFile = screen.getByText('Report.pdf');
        fireEvent.click(reportFile);

        expect(mockPath).toHaveBeenLastCalledWith({ id: '1-1' });
    });

    it('highlights selected item with primary color variant', () => {
        render(
            <RdsCompFileMover 
                items={simpleFileItems} 
                path={mockPath} 
                selectedItemId="1" 
            />
        );

        const selectedIcon = screen.getByTestId('rds-icon-file');
        expect(selectedIcon).toHaveAttribute('data-color-variant', 'primary');
    });    it('does not highlight non-selected items', () => {
        render(
            <RdsCompFileMover 
                items={simpleFileItems} 
                path={mockPath} 
                selectedItemId="1" 
            />
        );

        const nonSelectedIcon = screen.getByTestId('rds-icon-image');
        expect(nonSelectedIcon).toHaveAttribute('data-color-variant', 'default');
    });

    it('handles empty items array gracefully', () => {
        render(<RdsCompFileMover items={[]} path={mockPath} />);
        
        // Should render without crashing
        expect(screen.queryByText('Document.pdf')).not.toBeInTheDocument();
    });

    it('handles items without children property', () => {
        const itemsWithoutChildren: FileItem[] = [
            {
                id: '1',
                name: 'File.txt',
                iconName: 'file',
                iconFill: false,
            },
        ];

        render(<RdsCompFileMover items={itemsWithoutChildren} path={mockPath} />);

        expect(screen.getByText('File.txt')).toBeInTheDocument();
        expect(screen.queryByTestId('rds-icon-chevron_right')).not.toBeInTheDocument();
    });

    it('renders multiple levels of nesting correctly', () => {
        const deeplyNestedItems: FileItem[] = [
            {
                id: '1',
                name: 'Root Folder',
                hasChildren: true,
                iconName: 'folder',
                iconFill: false,
                children: [
                    {
                        id: '1-1',
                        name: 'Sub Folder',
                        hasChildren: true,
                        iconName: 'folder',
                        iconFill: false,
                        children: [
                            {
                                id: '1-1-1',
                                name: 'Deep File.txt',
                                iconName: 'file',
                                iconFill: false,
                            },
                        ],
                    },
                ],
            },
        ];

        render(<RdsCompFileMover items={deeplyNestedItems} path={mockPath} />);

        // Expand root folder
        fireEvent.click(screen.getByText('Root Folder'));
        expect(screen.getByText('Sub Folder')).toBeInTheDocument();

        // Expand sub folder
        fireEvent.click(screen.getByText('Sub Folder'));
        expect(screen.getByText('Deep File.txt')).toBeInTheDocument();
    });

    it('maintains expansion state for multiple folders independently', () => {
        render(<RdsCompFileMover items={nestedFileItems} path={mockPath} />);

        // Expand Documents folder
        fireEvent.click(screen.getByText('Documents'));
        expect(screen.getByText('Report.pdf')).toBeInTheDocument();

        // Expand Images folder
        fireEvent.click(screen.getByText('Images'));
        expect(screen.getByText('Photo1.jpg')).toBeInTheDocument();

        // Both should remain expanded
        expect(screen.getByText('Report.pdf')).toBeInTheDocument();
        expect(screen.getByText('Photo1.jpg')).toBeInTheDocument();

        // Collapse Documents folder only
        fireEvent.click(screen.getByText('Documents'));
        expect(screen.queryByText('Report.pdf')).not.toBeInTheDocument();
        expect(screen.getByText('Photo1.jpg')).toBeInTheDocument(); // Images folder should still be expanded
    });
});