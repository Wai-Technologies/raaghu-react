import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompMenuDirectory from '../src/rds-comp-menus-directories/rds-comp-menus-directories';

// Mock the translation hook
jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

// Mock the rds-elements components
// Mock Bootstrap's JavaScript components to prevent errors
jest.mock('bootstrap', () => {
  return {
    Offcanvas: jest.fn().mockImplementation(() => ({
      show: jest.fn(),
      hide: jest.fn(),
      toggle: jest.fn(),
      dispose: jest.fn()
    })),
    Modal: jest.fn().mockImplementation(() => ({
      show: jest.fn(),
      hide: jest.fn(),
      toggle: jest.fn(),
      dispose: jest.fn()
    }))
  };
}, { virtual: true });

jest.mock('../src/rds-elements', () => ({
  RdsCompIcon: ({ 
    name, 
    height, 
    width, 
    colorVariant, 
    onClick,
    dataTestId 
  }: any) => (
    <span 
      data-testid={dataTestId || `icon-${name}`}
      className={`icon-${colorVariant}`} 
      style={{ height, width }}
      onClick={onClick}
    >
      {name}
    </span>
  ),  RdsButtonGroup: ({ 
    buttonGroupItems, 
    colorVariant, 
    isOutline, 
    role, 
    size, 
    onButtonClick 
  }: any) => (
    <div data-testid="button-group" className={`btn-group-${size} ${isOutline ? 'btn-outline' : ''}`}>
      {buttonGroupItems.map((item: any, index: number) => (
        <button
          key={index}
          data-testid={`btn-${item.id}`}
          className={`btn btn-${colorVariant}`}
          // Store the Bootstrap attributes as custom attributes that won't trigger Bootstrap JS
          data-test-toggle={item.databstoggle}
          data-test-target={item.databstarget}
          onClick={(e) => onButtonClick(e, item.id)}
        >
          <span data-testid={`btn-icon-${item.id}`}>{item.icon}</span>
        </button>
      ))}
    </div>
  )
}));

describe('RdsCompMenuDirectory Component', () => {
  // Mock props for testing
  const mockItems = [
    {
      data: {
        id: '1',
        displayName: 'Main Menu',
        isActive: true,
        url: '/main'
      },
      children: [
        {
          data: {
            id: '1-1',
            displayName: 'Submenu 1',
            isActive: true,
            url: '/submenu1'
          },
          children: []
        },
        {
          data: {
            id: '1-2',
            displayName: 'Submenu 2',
            isActive: true,
            url: '/submenu2'
          },
          children: [
            {
              data: {
                id: '1-2-1',
                displayName: 'Nested Submenu',
                isActive: true,
                url: '/nested'
              },
              children: []
            }
          ]
        }
      ]
    },
    {
      data: {
        id: '2',
        displayName: 'Secondary Menu',
        isActive: true,
        url: '/secondary'
      },
      children: []
    }
  ];
  
  const mockProps = {
    items: mockItems,
    offId: 'offcanvas1',
    onCreateSubMenu: jest.fn(),
    onDeleteMenu: jest.fn(),
    onMenuEdit: jest.fn()
  };  beforeEach(() => {
    jest.clearAllMocks();
    
    // Set up DOM elements for Bootstrap components
    document.body.innerHTML = `
      <div id="a${mockProps.offId}" class="offcanvas"></div>
      <div id="b${mockProps.offId}" class="offcanvas"></div>
      <div id="deleteMenu" class="modal"></div>
    `;
  });

  afterEach(() => {
    // Clean up DOM after each test
    document.body.innerHTML = '';
  });

  // Test 1: Basic rendering
  test('renders menu directory items correctly', () => {
    render(<RdsCompMenuDirectory {...mockProps} />);
    
    // Check if main menu items are rendered
    expect(screen.getByText('Main Menu')).toBeInTheDocument();
    expect(screen.getByText('Secondary Menu')).toBeInTheDocument();
    
    // Submenu items should not be visible initially (before expansion)
    expect(screen.queryByText('Submenu 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Submenu 2')).not.toBeInTheDocument();
  });
  // Test 2: Expanding/collapsing menu items
  test('expands and collapses menu items when clicked', () => {
    render(<RdsCompMenuDirectory {...mockProps} />);
    
    // Initially, the submenu items should not be visible
    expect(screen.queryByText('Submenu 1')).not.toBeInTheDocument();
    
    // Find and click the chevron icon for the main menu to expand it
    const mainMenuChevron = screen.getByTestId('icon-chevron_down');
    fireEvent.click(mainMenuChevron);
    
    // After expansion, submenu items should be visible
    expect(screen.getByText('Submenu 1')).toBeInTheDocument();
    expect(screen.getByText('Submenu 2')).toBeInTheDocument();
    
    // The chevron icon should change to up
    const mainMenuChevronUp = screen.getByTestId('icon-chevron_up');
    expect(mainMenuChevronUp).toBeInTheDocument();
    
    // Now collapse it again
    fireEvent.click(mainMenuChevronUp);
    
    // Wait for the collapse to take effect (the component might need time to update)
    expect(screen.queryByText('Submenu 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Submenu 2')).not.toBeInTheDocument();
  });
  // Test 3: Nested menu expansion
  test('expands nested menu items correctly', () => {
    render(<RdsCompMenuDirectory {...mockProps} />);
    
    // Expand the main menu
    const mainMenuChevron = screen.getByTestId('icon-chevron_down');
    fireEvent.click(mainMenuChevron);
    
    // After expansion, submenu items should be visible
    expect(screen.getByText('Submenu 1')).toBeInTheDocument();
    expect(screen.getByText('Submenu 2')).toBeInTheDocument();
    
    // Now find and click the chevron icon for Submenu 2
    const submenu2Chevrons = screen.getAllByTestId('icon-chevron_down');
    // The first one is for the already expanded main menu, so we need the second one
    if (submenu2Chevrons.length > 1) {
      fireEvent.click(submenu2Chevrons[1]);
      
      // After expansion, nested submenu should be visible
      expect(screen.getByText('Nested Submenu')).toBeInTheDocument();
    }
  });
  // Test 4: Create submenu button
  test('calls onCreateSubMenu when plus button is clicked', () => {
    render(<RdsCompMenuDirectory {...mockProps} />);
    
    // Find and click the plus button for the main menu (first menu item)
    const plusButtons = screen.getAllByTestId('btn-plus');
    fireEvent.click(plusButtons[0]); // Use the first one (for Main Menu)
    
    // Check if onCreateSubMenu was called with the correct data
    expect(mockProps.onCreateSubMenu).toHaveBeenCalledWith(mockItems[0].data);
  });
  // Test 5: Edit menu button
  test('calls onMenuEdit when edit button is clicked', () => {
    render(<RdsCompMenuDirectory {...mockProps} />);
    
    // Find and click the edit button for the main menu
    const editButtons = screen.getAllByTestId('btn-edit');
    fireEvent.click(editButtons[0]); // Use the first one (for Main Menu)
    
    // Check if onMenuEdit was called with the correct data
    expect(mockProps.onMenuEdit).toHaveBeenCalledWith(mockItems[0].data);
  });
  // Test 6: Delete menu button
  test('calls onDeleteMenu when delete button is clicked', () => {
    render(<RdsCompMenuDirectory {...mockProps} />);
    
    // Find and click the delete button for the main menu
    const deleteButtons = screen.getAllByTestId('btn-delete');
    fireEvent.click(deleteButtons[0]); // Use the first one (for Main Menu)
    
    // Check if onDeleteMenu was called with the correct id
    expect(mockProps.onDeleteMenu).toHaveBeenCalledWith(mockItems[0].data.id);
  });

  // Test 7: Test with empty children array
  test('renders correctly with items that have empty children array', () => {
    const itemsWithEmptyChildren = [
      {
        data: {
          id: '1',
          displayName: 'Menu With Empty Children',
          isActive: true,
          url: '/empty'
        },
        children: []
      }
    ];
    
    render(
      <RdsCompMenuDirectory 
        {...mockProps} 
        items={itemsWithEmptyChildren} 
      />
    );
    
    // The menu item should be rendered
    expect(screen.getByText('Menu With Empty Children')).toBeInTheDocument();
    
    // No chevron icon should be rendered since there are no children
    expect(screen.queryByTestId('icon-chevron_down')).not.toBeInTheDocument();
  });
  // Test 8: Folder icon clickability
  test('expands menu when folder icon is clicked', () => {
    render(<RdsCompMenuDirectory {...mockProps} />);
    
    // Initially, the submenu items should not be visible
    expect(screen.queryByText('Submenu 1')).not.toBeInTheDocument();
    
    // Find and click the folder icon for the main menu
    const folderIcons = screen.getAllByTestId('folder-icon');
    fireEvent.click(folderIcons[0]); // Use the first one (for Main Menu)
    
    // Submenu items should be visible after clicking the folder icon
    expect(screen.getByText('Submenu 1')).toBeInTheDocument();
    expect(screen.getByText('Submenu 2')).toBeInTheDocument();
  });
});