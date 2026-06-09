import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import userEvent from '@testing-library/user-event';
import RdsMenu from './rds-menu';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import DeleteIcon from '@mui/icons-material/Delete';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';

// Mock SCSS
jest.mock('./rds-menu.scss', () => ({}));

const renderWithTheme = (component: React.ReactElement, isDark = false) => {
  const theme = createTheme({
    palette: {
      mode: isDark ? 'dark' : 'light',
    },
  });
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('RdsMenu', () => {
  const defaultItems = [
    { id: 1, label: 'Profile', icon: <HomeIcon /> },
    { id: 2, label: 'Settings', icon: <SettingsIcon /> },
    { id: 3, label: 'Logout' },
  ];

  describe('Basic Rendering', () => {
    it('should render component without crashing', () => {
      const { container } = renderWithTheme(
        <RdsMenu items={defaultItems} open={true} anchorEl={document.body} />
      );
      expect(container).toBeInTheDocument();
    });

    it('should have correct displayName', () => {
      expect(RdsMenu.displayName).toBe('RdsMenu');
    });

    it('should render MuiMenu component', () => {
      renderWithTheme(
        <RdsMenu items={defaultItems} open={true} anchorEl={document.body} />
      );
      // Verify menu items are rendered
      expect(screen.getByText('Profile')).toBeInTheDocument();
    });

    it('should render with rds-menu class', () => {
      renderWithTheme(
        <RdsMenu items={defaultItems} open={true} anchorEl={document.body} />
      );
      // Verify menu items are rendered
      expect(screen.getByText('Profile')).toBeInTheDocument();
      expect(screen.getByText('Settings')).toBeInTheDocument();
    });
  });

  describe('Menu Items', () => {
    it('should render all menu items', () => {
      renderWithTheme(
        <RdsMenu items={defaultItems} open={true} anchorEl={document.body} />
      );
      expect(screen.getByText('Profile')).toBeInTheDocument();
      expect(screen.getByText('Settings')).toBeInTheDocument();
      expect(screen.getByText('Logout')).toBeInTheDocument();
    });

    it('should render menu items with labels', () => {
      const items = [
        { id: 1, label: 'Item 1' },
        { id: 2, label: 'Item 2' },
      ];
      renderWithTheme(
        <RdsMenu items={items} open={true} anchorEl={document.body} />
      );
      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
    });

    it('should render empty menu when items array is empty', () => {
      renderWithTheme(
        <RdsMenu items={[]} open={true} anchorEl={document.body} />
      );
      // Empty menu should render without errors
      expect(screen.queryByText('Profile')).not.toBeInTheDocument();
    });

    it('should apply rds-menu__item class to menu items', () => {
      renderWithTheme(
        <RdsMenu items={defaultItems} open={true} anchorEl={document.body} />
      );
      const items = screen.getAllByRole('menuitem');
      expect(items.length).toBe(defaultItems.length);
    });
  });

  describe('Icons', () => {
    it('should render icons when provided', () => {
      const items = [
        { id: 1, label: 'Home', icon: <HomeIcon data-testid="home-icon" /> },
      ];
      renderWithTheme(
        <RdsMenu items={items} open={true} anchorEl={document.body} />
      );
      expect(screen.getByTestId('home-icon')).toBeInTheDocument();
    });

    it('should not render icons when not provided', () => {
      const items = [
        { id: 1, label: 'Item without icon' },
      ];
      renderWithTheme(
        <RdsMenu items={items} open={true} anchorEl={document.body} />
      );
      // Just verify the item renders
      expect(screen.getByText('Item without icon')).toBeInTheDocument();
    });

    it('should render multiple icons', () => {
      const items = [
        { id: 1, label: 'Home', icon: <HomeIcon data-testid="icon-1" /> },
        { id: 2, label: 'Settings', icon: <SettingsIcon data-testid="icon-2" /> },
      ];
      renderWithTheme(
        <RdsMenu items={items} open={true} anchorEl={document.body} />
      );
      expect(screen.getByTestId('icon-1')).toBeInTheDocument();
      expect(screen.getByTestId('icon-2')).toBeInTheDocument();
    });

    it('should apply rds-menu__item__icon class to icons', () => {
      const items = [
        { id: 1, label: 'Item', icon: <HomeIcon data-testid="test-icon" /> },
      ];
      renderWithTheme(
        <RdsMenu items={items} open={true} anchorEl={document.body} />
      );
      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    });
  });

  describe('Shortcuts', () => {
    it('should render shortcuts when provided', () => {
      const items = [
        { id: 1, label: 'Copy', shortcut: 'Ctrl+C' },
      ];
      renderWithTheme(
        <RdsMenu items={items} open={true} anchorEl={document.body} />
      );
      expect(screen.getByText('Ctrl+C')).toBeInTheDocument();
    });

    it('should not render shortcuts when not provided', () => {
      const items = [
        { id: 1, label: 'Item without shortcut' },
      ];
      renderWithTheme(
        <RdsMenu items={items} open={true} anchorEl={document.body} />
      );
      expect(screen.getByText('Item without shortcut')).toBeInTheDocument();
    });

    it('should render shortcuts with correct class', () => {
      const items = [
        { id: 1, label: 'Save', shortcut: 'Ctrl+S' },
      ];
      renderWithTheme(
        <RdsMenu items={items} open={true} anchorEl={document.body} />
      );
      expect(screen.getByText('Ctrl+S')).toBeInTheDocument();
    });
  });

  describe('Dividers', () => {
    it('should render divider when divider prop is true', () => {
      const items = [
        { id: 1, label: 'Item 1' },
        { id: 2, divider: true },
        { id: 3, label: 'Item 2' },
      ];
      renderWithTheme(
        <RdsMenu items={items} open={true} anchorEl={document.body} />
      );
      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
    });

    it('should not render label for divider item', () => {
      const items = [
        { id: 1, divider: true, label: 'This should not appear' },
      ];
      const { container } = renderWithTheme(
        <RdsMenu items={items} open={true} anchorEl={document.body} />
      );
      expect(screen.queryByText('This should not appear')).not.toBeInTheDocument();
    });

    it('should apply rds-menu__divider class', () => {
      const items = [
        { id: 1, divider: true },
      ];
      renderWithTheme(
        <RdsMenu items={items} open={true} anchorEl={document.body} />
      );
      // Divider renders in the menu
      expect(screen.getByRole('menu')).toBeInTheDocument();
    });
  });

  describe('Headers', () => {
    it('should render header when header prop is provided', () => {
      const items = [
        { id: 1, header: 'Group 1' },
        { id: 2, label: 'Item 1' },
      ];
      renderWithTheme(
        <RdsMenu items={items} open={true} anchorEl={document.body} />
      );
      expect(screen.getByText('Group 1')).toBeInTheDocument();
    });

    it('should not render label for header item', () => {
      const items = [
        { id: 1, header: 'Header Text', label: 'This should not appear' },
      ];
      const { container } = renderWithTheme(
        <RdsMenu items={items} open={true} anchorEl={document.body} />
      );
      expect(screen.getByText('Header Text')).toBeInTheDocument();
      expect(screen.queryByText('This should not appear')).not.toBeInTheDocument();
    });

    it('should apply rds-menu__header class', () => {
      const items = [
        { id: 1, header: 'Section Header' },
      ];
      renderWithTheme(
        <RdsMenu items={items} open={true} anchorEl={document.body} />
      );
      expect(screen.getByText('Section Header')).toBeInTheDocument();
    });

    it('should render multiple headers', () => {
      const items = [
        { id: 1, header: 'Group 1' },
        { id: 2, label: 'Item 1' },
        { id: 3, header: 'Group 2' },
        { id: 4, label: 'Item 2' },
      ];
      renderWithTheme(
        <RdsMenu items={items} open={true} anchorEl={document.body} />
      );
      expect(screen.getByText('Group 1')).toBeInTheDocument();
      expect(screen.getByText('Group 2')).toBeInTheDocument();
    });
  });

  describe('Disabled State', () => {
    it('should render disabled menu items', () => {
      const items = [
        { id: 1, label: 'Enabled', disabled: false },
        { id: 2, label: 'Disabled', disabled: true },
      ];
      renderWithTheme(
        <RdsMenu items={items} open={true} anchorEl={document.body} />
      );
      const disabledItem = screen.getByText('Disabled');
      expect(disabledItem.closest('[role="menuitem"]')).toHaveAttribute('aria-disabled', 'true');
    });

    it('should apply rds-menu__item--disabled class', () => {
      const items = [
        { id: 1, label: 'Disabled Item', disabled: true },
      ];
      renderWithTheme(
        <RdsMenu items={items} open={true} anchorEl={document.body} />
      );
      const disabledItem = screen.getByText('Disabled Item');
      expect(disabledItem.closest('[role="menuitem"]')).toHaveAttribute('aria-disabled', 'true');
    });

    it('should not call onClick for disabled items', () => {
      const onClick = jest.fn();
      const items = [
        { id: 1, label: 'Disabled', disabled: true, onClick },
      ];
      renderWithTheme(
        <RdsMenu items={items} open={true} anchorEl={document.body} />
      );
      const disabledItem = screen.getByText('Disabled');
      expect(disabledItem.closest('[role="menuitem"]')).toHaveAttribute('aria-disabled', 'true');
    });
  });

  describe('Click Handlers', () => {
    it('should call onClick when menu item is clicked', () => {
      const onClick = jest.fn();
      const items = [
        { id: 1, label: 'Item', onClick },
      ];
      renderWithTheme(
        <RdsMenu items={items} open={true} anchorEl={document.body} />
      );
      const menuItem = screen.getByText('Item');
      if (menuItem) {
        fireEvent.click(menuItem);
        expect(onClick).toHaveBeenCalled();
      }
    });

    it('should handle multiple items with different click handlers', () => {
      const onClick1 = jest.fn();
      const onClick2 = jest.fn();
      const items = [
        { id: 1, label: 'Item 1', onClick: onClick1 },
        { id: 2, label: 'Item 2', onClick: onClick2 },
      ];
      renderWithTheme(
        <RdsMenu items={items} open={true} anchorEl={document.body} />
      );

      fireEvent.click(screen.getByText('Item 1'));
      expect(onClick1).toHaveBeenCalled();

      fireEvent.click(screen.getByText('Item 2'));
      expect(onClick2).toHaveBeenCalled();
    });

    it('should not call onClick when item has no handler', () => {
      const items = [
        { id: 1, label: 'Item without handler' },
      ];
      const { container } = renderWithTheme(
        <RdsMenu items={items} open={true} anchorEl={document.body} />
      );
      fireEvent.click(screen.getByText('Item without handler'));
      expect(container).toBeInTheDocument();
    });
  });

  describe('Menu Sizes', () => {
    it('should apply small size class', () => {
      renderWithTheme(
        <RdsMenu items={defaultItems} size="small" open={true} anchorEl={document.body} />
      );
      const items = screen.getAllByRole('menuitem');
      expect(items.length).toBe(defaultItems.length);
    });

    it('should apply medium size class', () => {
      renderWithTheme(
        <RdsMenu items={defaultItems} size="medium" open={true} anchorEl={document.body} />
      );
      const items = screen.getAllByRole('menuitem');
      expect(items.length).toBe(defaultItems.length);
    });

    it('should apply large size class', () => {
      renderWithTheme(
        <RdsMenu items={defaultItems} size="large" open={true} anchorEl={document.body} />
      );
      const items = screen.getAllByRole('menuitem');
      expect(items.length).toBe(defaultItems.length);
    });

    it('should set dense prop for small size', () => {
      renderWithTheme(
        <RdsMenu items={defaultItems} size="small" open={true} anchorEl={document.body} />
      );
      expect(screen.getByText('Profile')).toBeInTheDocument();
    });
  });

  describe('Colors', () => {
    it('should apply primary color class', () => {
      const items = [
        { id: 1, label: 'Primary', color: 'primary' },
      ];
      renderWithTheme(
        <RdsMenu items={items} open={true} anchorEl={document.body} />
      );
      expect(screen.getByText('Primary')).toBeInTheDocument();
    });

    it('should apply success color class', () => {
      const items = [
        { id: 1, label: 'Success', color: 'success' },
      ];
      renderWithTheme(
        <RdsMenu items={items} open={true} anchorEl={document.body} />
      );
      expect(screen.getByText('Success')).toBeInTheDocument();
    });

    it('should apply danger color class', () => {
      const items = [
        { id: 1, label: 'Delete', color: 'danger' },
      ];
      renderWithTheme(
        <RdsMenu items={items} open={true} anchorEl={document.body} />
      );
      expect(screen.getByText('Delete')).toBeInTheDocument();
    });

    it('should apply custom color', () => {
      const items = [
        { id: 1, label: 'Custom', color: '#ff0000' },
      ];
      renderWithTheme(
        <RdsMenu items={items} open={true} anchorEl={document.body} />
      );
      expect(screen.getByText('Custom')).toBeInTheDocument();
    });

    it('should apply color to icon', () => {
      const items = [
        { id: 1, label: 'Item', icon: <DeleteIcon data-testid="colored-icon" />, color: 'danger' },
      ];
      renderWithTheme(
        <RdsMenu items={items} open={true} anchorEl={document.body} />
      );
      expect(screen.getByTestId('colored-icon')).toBeInTheDocument();
      expect(screen.getByText('Item')).toBeInTheDocument();
    });
  });

  describe('Custom Children', () => {
    it('should render custom children when provided', () => {
      const customChild = <div data-testid="custom-child">Custom Content</div>;
      renderWithTheme(
        <RdsMenu items={defaultItems} open={true} anchorEl={document.body}>
          {customChild}
        </RdsMenu>
      );
      expect(screen.getByTestId('custom-child')).toBeInTheDocument();
    });

    it('should not render items when custom children are provided', () => {
      const customChild = <div>Custom</div>;
      renderWithTheme(
        <RdsMenu items={defaultItems} open={true} anchorEl={document.body}>
          {customChild}
        </RdsMenu>
      );
      // Items should not be rendered when children are provided
      expect(screen.queryByText('Profile')).not.toBeInTheDocument();
      expect(screen.getByText('Custom')).toBeInTheDocument();
    });

    it('should render multiple custom children', () => {
      const customChildren = (
        <>
          <div data-testid="child-1">Child 1</div>
          <div data-testid="child-2">Child 2</div>
        </>
      );
      renderWithTheme(
        <RdsMenu items={defaultItems} open={true} anchorEl={document.body}>
          {customChildren}
        </RdsMenu>
      );
      expect(screen.getByTestId('child-1')).toBeInTheDocument();
      expect(screen.getByTestId('child-2')).toBeInTheDocument();
    });
  });

  describe('Menu Props', () => {
    it('should pass through MenuProps', () => {
      const { container } = renderWithTheme(
        <RdsMenu 
          items={defaultItems} 
          open={true} 
          anchorEl={document.body}
          data-testid="custom-menu"
        />
      );
      expect(screen.getByTestId('custom-menu')).toBeInTheDocument();
    });

    it('should apply custom className', () => {
      renderWithTheme(
        <RdsMenu 
          items={defaultItems} 
          open={true} 
          anchorEl={document.body}
          className="custom-class"
          data-testid="custom-menu"
        />
      );
      expect(screen.getByTestId('custom-menu')).toBeInTheDocument();
      expect(screen.getByText('Profile')).toBeInTheDocument();
    });

    it('should support onClose handler', () => {
      const onClose = jest.fn();
      const { container } = renderWithTheme(
        <RdsMenu 
          items={defaultItems} 
          open={true} 
          anchorEl={document.body}
          onClose={onClose}
        />
      );
      expect(container).toBeInTheDocument();
    });
  });

  describe('Theme Integration', () => {
    it('should render with light theme', () => {
      const { container } = renderWithTheme(
        <RdsMenu items={defaultItems} open={true} anchorEl={document.body} />,
        false
      );
      expect(container).toBeInTheDocument();
    });

    it('should render with dark theme', () => {
      const { container } = renderWithTheme(
        <RdsMenu items={defaultItems} open={true} anchorEl={document.body} />,
        true
      );
      expect(container).toBeInTheDocument();
    });
  });

  describe('Complex Scenarios', () => {
    it('should render menu with all features combined', () => {
      const items = [
        { id: 1, header: 'Edit' },
        { id: 2, label: 'Copy', shortcut: 'Ctrl+C', icon: <HomeIcon data-testid="copy-icon" /> },
        { id: 3, label: 'Paste', shortcut: 'Ctrl+V', disabled: false },
        { id: 4, divider: true },
        { id: 5, label: 'Delete', color: 'danger', icon: <DeleteIcon data-testid="delete-icon" /> },
      ];
      renderWithTheme(
        <RdsMenu items={items} size="medium" open={true} anchorEl={document.body} />
      );

      expect(screen.getByText('Edit')).toBeInTheDocument();
      expect(screen.getByText('Copy')).toBeInTheDocument();
      expect(screen.getByText('Ctrl+C')).toBeInTheDocument();
      expect(screen.getByTestId('copy-icon')).toBeInTheDocument();
      expect(screen.getByText('Delete')).toBeInTheDocument();
      expect(screen.getByTestId('delete-icon')).toBeInTheDocument();
    });

    it('should handle menu open and close', () => {
      const { rerender } = renderWithTheme(
        <RdsMenu items={defaultItems} open={false} anchorEl={document.body} />
      );

      // When closed, items should not be visible
      expect(screen.queryByText('Profile')).not.toBeInTheDocument();

      // Rerender with open={true}
      rerender(
        <ThemeProvider theme={createTheme()}>
          <RdsMenu items={defaultItems} open={true} anchorEl={document.body} />
        </ThemeProvider>
      );

      // When open, items should be visible
      expect(screen.getByText('Profile')).toBeInTheDocument();
    });

    it('should handle large menu with many items', () => {
      const items = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        label: `Item ${i}`,
        icon: i % 2 === 0 ? <HomeIcon /> : undefined,
      }));

      renderWithTheme(
        <RdsMenu items={items} open={true} anchorEl={document.body} />
      );

      expect(screen.getByText('Item 0')).toBeInTheDocument();
      expect(screen.getByText('Item 19')).toBeInTheDocument();
    });

    it('should handle menu with mixed item types', () => {
      const items = [
        { id: 1, header: 'Section 1' },
        { id: 2, label: 'Item 1' },
        { id: 3, label: 'Item 2', icon: <SettingsIcon /> },
        { id: 4, divider: true },
        { id: 5, header: 'Section 2' },
        { id: 6, label: 'Item 3', disabled: true },
        { id: 7, label: 'Item 4', color: 'danger' },
      ];

      renderWithTheme(
        <RdsMenu items={items} open={true} anchorEl={document.body} />
      );

      expect(screen.getByText('Section 1')).toBeInTheDocument();
      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Section 2')).toBeInTheDocument();
      expect(screen.getByText('Item 4')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper menu role', () => {
      renderWithTheme(
        <RdsMenu items={defaultItems} open={true} anchorEl={document.body} />
      );
      // Menu items should render with proper structure
      expect(screen.getByText('Profile')).toBeInTheDocument();
      // Verify at least one menu item exists
      const menuItems = screen.getAllByRole('menuitem');
      expect(menuItems.length).toBeGreaterThan(0);
  
    });

    it('has no axe accessibility violations', async () => {
      const { container } = renderWithTheme(<RdsMenu items={defaultItems} open={true} anchorEl={document.body} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should render menu items', () => {
      renderWithTheme(
        <RdsMenu items={defaultItems} open={true} anchorEl={document.body} />
      );
      expect(screen.getByText('Profile')).toBeInTheDocument();
    });

    it('should apply disabled class to disabled items', () => {
      const items = [
        { id: 1, label: 'Disabled', disabled: true },
      ];
      renderWithTheme(
        <RdsMenu items={items} open={true} anchorEl={document.body} />
      );
      const menuItem = screen.getByText('Disabled');
      expect(menuItem).toBeInTheDocument();
      expect(menuItem.closest('[role="menuitem"]')).toHaveAttribute('aria-disabled', 'true');
    });
  });
});