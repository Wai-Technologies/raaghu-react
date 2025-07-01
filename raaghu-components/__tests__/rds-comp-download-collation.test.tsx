import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompDownloadCollation, { RdsCompDownloadCollationProps } from '../src/rds-comp-download-collation/rds-comp-download-collation';

// Mock RDS components
jest.mock('../src/rds-elements', () => ({
  RdsCompIcon: ({ name, onClick, colorVariant, isCursorPointer, ...props }: any) => (
    <div 
      data-testid={`icon-${name}`}
      onClick={onClick}
      className={isCursorPointer ? 'cursor-pointer' : ''}
      data-color-variant={colorVariant}
      {...props}
    >
      {name}
    </div>
  ),
}));

// Mock file download functionality
const mockClick = jest.fn();
const mockCreateObjectURL = jest.fn();
const mockRevokeObjectURL = jest.fn();

// Mock anchor element
const mockAnchorElement = {
  href: '',
  download: '',
  click: mockClick,
};

// Mock Blob
global.Blob = jest.fn((content: any[], options: any) => ({
  content,
  options,
})) as any;

// Mock URL methods
Object.defineProperty(window, 'URL', {
  value: {
    createObjectURL: mockCreateObjectURL,
    revokeObjectURL: mockRevokeObjectURL,
  },
  writable: true,
});

// Mock document.createElement
const originalCreateElement = document.createElement;
document.createElement = jest.fn((tagName: string) => {
  if (tagName === 'a') {
    return mockAnchorElement as any;
  }
  return originalCreateElement.call(document, tagName);
});

describe('RdsCompDownloadCollation', () => {
  const mockDownloadTable = [
    {
      DateofData: '2024-01-15',
      NummberofDay: '30 days ago'
    },
    {
      DateofData: '2024-02-20',
      NummberofDay: '15 days ago'
    }
  ];

  const defaultProps: RdsCompDownloadCollationProps = {
    downloadTable: mockDownloadTable,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockAnchorElement.href = '';
    mockAnchorElement.download = '';
    mockCreateObjectURL.mockReturnValue('mock-blob-url');
  });

  // 1. Basic Rendering Tests
  it('should render download items correctly', () => {
    render(<RdsCompDownloadCollation {...defaultProps} />);
    
    expect(screen.getByText('2024-01-15')).toBeInTheDocument();
    expect(screen.getByText('30 days ago')).toBeInTheDocument();
    expect(screen.getByText('2024-02-20')).toBeInTheDocument();
    expect(screen.getByText('15 days ago')).toBeInTheDocument();
  });

  it('should render information and download icons', () => {
    render(<RdsCompDownloadCollation {...defaultProps} />);
    
    const informationIcons = screen.getAllByTestId('icon-information');
    const downloadIcons = screen.getAllByTestId('icon-download');
    
    expect(informationIcons).toHaveLength(2);
    expect(downloadIcons).toHaveLength(2);
  });

  // 2. Icon Properties Tests
  it('should render icons with correct properties', () => {
    render(<RdsCompDownloadCollation {...defaultProps} />);
    
    const informationIcons = screen.getAllByTestId('icon-information');
    const downloadIcons = screen.getAllByTestId('icon-download');
    
    informationIcons.forEach(icon => {
      expect(icon).toHaveAttribute('data-color-variant', 'dark');
      expect(icon).not.toHaveClass('cursor-pointer');
    });

    downloadIcons.forEach(icon => {
      expect(icon).toHaveAttribute('data-color-variant', 'primary');
      expect(icon).toHaveClass('cursor-pointer');
    });
  });

  // 3. Download Functionality Tests
  it('should trigger download when download icon is clicked', () => {
    render(<RdsCompDownloadCollation {...defaultProps} />);
    
    const firstDownloadIcon = screen.getAllByTestId('icon-download')[0];
    fireEvent.click(firstDownloadIcon);
    
    // Verify Blob creation
    expect(global.Blob).toHaveBeenCalledWith(
      ['Date of Data: 2024-01-15\nNumber of Days: 30 days ago'],
      { type: 'text/plain' }
    );
    
    // Verify URL creation and cleanup
    expect(mockCreateObjectURL).toHaveBeenCalled();
    expect(mockAnchorElement.href).toBe('mock-blob-url');
    expect(mockAnchorElement.download).toBe('data-2024-01-15.txt');
    expect(mockClick).toHaveBeenCalled();
    expect(mockRevokeObjectURL).toHaveBeenCalledWith('mock-blob-url');
  });

  it('should generate correct filename and content for each download', () => {
    render(<RdsCompDownloadCollation {...defaultProps} />);
    
    const downloadIcons = screen.getAllByTestId('icon-download');
    
    // Test first item
    fireEvent.click(downloadIcons[0]);
    expect(mockAnchorElement.download).toBe('data-2024-01-15.txt');
    
    // Test second item
    fireEvent.click(downloadIcons[1]);
    expect(mockAnchorElement.download).toBe('data-2024-02-20.txt');
    expect(global.Blob).toHaveBeenLastCalledWith(
      ['Date of Data: 2024-02-20\nNumber of Days: 15 days ago'],
      { type: 'text/plain' }
    );
  });

  // 4. Edge Cases Tests
  it('should handle empty downloadTable array', () => {
    render(<RdsCompDownloadCollation downloadTable={[]} />);
    
    expect(screen.queryAllByTestId('icon-information')).toHaveLength(0);
    expect(screen.queryAllByTestId('icon-download')).toHaveLength(0);
  });

  it('should handle items with missing properties', () => {
    const incompleteItems = [
      { DateofData: '2024-01-01' }, // Missing NummberofDay
      { NummberofDay: '10 days ago' }, // Missing DateofData
    ];
    
    render(<RdsCompDownloadCollation downloadTable={incompleteItems} />);
    
    expect(screen.getAllByTestId('icon-information')).toHaveLength(2);
    expect(screen.getAllByTestId('icon-download')).toHaveLength(2);
  });

  // 5. Component Structure Tests
  it('should have correct CSS structure', () => {
    render(<RdsCompDownloadCollation {...defaultProps} />);
    
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(2);
    
    listItems.forEach(item => {
      expect(item).toHaveClass('d-flex', 'justify-content-between', 'p-3');
    });
  });

  it('should display day information with muted text', () => {
    render(<RdsCompDownloadCollation {...defaultProps} />);
    
    const dayElements = screen.getAllByText(/days ago/);
    expect(dayElements).toHaveLength(2);
    
    dayElements.forEach(element => {
      expect(element).toHaveClass('text-muted');
    });
  });
});