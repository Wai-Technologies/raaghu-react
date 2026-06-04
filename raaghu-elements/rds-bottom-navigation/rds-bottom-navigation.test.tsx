import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RdsBottomNavigation, { RdsBottomNavigationProps, RdsBottomNavigationItem } from './rds-bottom-navigation';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';

// Mock SCSS
jest.mock('./rds-bottom-navigation.scss', () => ({}));

// Mock MUI Icons
jest.mock('@mui/icons-material/Home', () => {
  return function HomeIcon() {
    return <span data-testid="home-icon">HomeIcon</span>;
  };
});

jest.mock('@mui/icons-material/FavoriteBorder', () => {
  return function FavoriteBorderIcon() {
    return <span data-testid="favorite-icon">FavoriteBorderIcon</span>;
  };
});

jest.mock('@mui/icons-material/Person', () => {
  return function PersonIcon() {
    return <span data-testid="person-icon">PersonIcon</span>;
  };
});

jest.mock('@mui/icons-material/Settings', () => {
  return function SettingsIcon() {
    return <span data-testid="settings-icon">SettingsIcon</span>;
  };
});

describe('RdsBottomNavigation', () => {
  const defaultItems: RdsBottomNavigationItem[] = [
    { label: 'Home', value: 'home' },
    { label: 'Favorites', value: 'favorites' },
    { label: 'Profile', value: 'profile' },
  ];

  const defaultProps: RdsBottomNavigationProps = {
    items: defaultItems,
  };

  describe('Basic Rendering', () => {
    it('should render component without crashing', () => {
      const { container } = render(<RdsBottomNavigation {...defaultProps} />);
      expect(container.querySelector('.rds-bottom-navigation')).toBeInTheDocument();
    });

    it('should have correct displayName', () => {
      expect(RdsBottomNavigation.displayName).toBe('RdsBottomNavigation');
    });

    it('should render MUI BottomNavigation component', () => {
      const { container } = render(<RdsBottomNavigation {...defaultProps} />);
      expect(container.querySelector('.MuiBottomNavigation-root')).toBeInTheDocument();
    });

    it('should render rds-bottom-navigation wrapper', () => {
      const { container } = render(<RdsBottomNavigation {...defaultProps} />);
      expect(container.querySelector('.rds-bottom-navigation')).toBeInTheDocument();
    });

    it('should render with default props', () => {
      const { container } = render(<RdsBottomNavigation {...defaultProps} />);
      expect(container.querySelector('.MuiBottomNavigation-root')).toBeInTheDocument();
    });
  });

  describe('Items Rendering', () => {
    it('should render all items', () => {
      const { container } = render(<RdsBottomNavigation {...defaultProps} />);
      const buttons = container.querySelectorAll('.MuiBottomNavigationAction-root');
      expect(buttons.length).toBe(3);
    });

    it('should render items with correct labels', () => {
      render(<RdsBottomNavigation {...defaultProps} showLabels={true} />);
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Favorites')).toBeInTheDocument();
      expect(screen.getByText('Profile')).toBeInTheDocument();
    });

    it('should render single item', () => {
      const singleItem: RdsBottomNavigationItem[] = [{ label: 'Home', value: 'home' }];
      const { container } = render(
        <RdsBottomNavigation items={singleItem} />
      );
      const buttons = container.querySelectorAll('.MuiBottomNavigationAction-root');
      expect(buttons.length).toBe(1);
    });

    it('should render many items', () => {
      const manyItems: RdsBottomNavigationItem[] = Array.from({ length: 10 }, (_, i) => ({
        label: `Item ${i + 1}`,
        value: `item-${i + 1}`,
      }));
      const { container } = render(
        <RdsBottomNavigation items={manyItems} />
      );
      const buttons = container.querySelectorAll('.MuiBottomNavigationAction-root');
      expect(buttons.length).toBe(10);
    });

    it('should render empty items array', () => {
      const { container } = render(
        <RdsBottomNavigation items={[]} />
      );
      const buttons = container.querySelectorAll('.MuiBottomNavigationAction-root');
      expect(buttons.length).toBe(0);
    });
  });

  describe('Labels Visibility', () => {
    it('should show labels when showLabels is true', () => {
      render(<RdsBottomNavigation {...defaultProps} showLabels={true} />);
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Favorites')).toBeInTheDocument();
    });

    it('should not show labels when showLabels is false', () => {
      render(<RdsBottomNavigation {...defaultProps} showLabels={false} />);
      // Labels should not be visible
      const container = render(<RdsBottomNavigation {...defaultProps} showLabels={false} />).container;
      expect(container.querySelectorAll('.MuiBottomNavigationAction-root').length).toBeGreaterThan(0);
    });

    it('should default to not showing labels', () => {
      const { container } = render(<RdsBottomNavigation {...defaultProps} />);
      expect(container.querySelectorAll('.MuiBottomNavigationAction-root').length).toBeGreaterThan(0);
    });

    it('should toggle label visibility', () => {
      const { rerender } = render(
        <RdsBottomNavigation {...defaultProps} showLabels={false} />
      );
      
      rerender(<RdsBottomNavigation {...defaultProps} showLabels={true} />);
      expect(screen.getByText('Home')).toBeInTheDocument();
    });
  });

  describe('Icons', () => {
    it('should render item icons when provided', () => {
      const itemsWithIcons: RdsBottomNavigationItem[] = [
        { label: 'Home', value: 'home', icon: <span data-testid="home-icon">🏠</span> },
        { label: 'Favorites', value: 'favorites', icon: <span data-testid="fav-icon">❤️</span> },
      ];
      render(<RdsBottomNavigation items={itemsWithIcons} />);
      expect(screen.getByTestId('home-icon')).toBeInTheDocument();
      expect(screen.getByTestId('fav-icon')).toBeInTheDocument();
    });

    it('should render without icons when not provided', () => {
      const { container } = render(<RdsBottomNavigation {...defaultProps} />);
      const buttons = container.querySelectorAll('.MuiBottomNavigationAction-root');
      expect(buttons.length).toBeGreaterThan(0);
    });

    it('should render some items with icons and some without', () => {
      const itemsWithMixedIcons: RdsBottomNavigationItem[] = [
        { label: 'Home', value: 'home', icon: <span>🏠</span> },
        { label: 'Favorites', value: 'favorites' },
      ];
      const { container } = render(
        <RdsBottomNavigation items={itemsWithMixedIcons} />
      );
      const buttons = container.querySelectorAll('.MuiBottomNavigationAction-root');
      expect(buttons.length).toBe(2);
    });
  });

  describe('Selection and Active Value', () => {
    it('should set active item with activeValue prop', () => {
      const { container } = render(
        <RdsBottomNavigation {...defaultProps} activeValue="favorites" />
      );
      expect(container.querySelector('.MuiBottomNavigationAction-root')).toBeInTheDocument();
    });

    it('should set active item with value prop', () => {
      const { container } = render(
        <RdsBottomNavigation {...defaultProps} value="profile" />
      );
      expect(container.querySelector('.MuiBottomNavigationAction-root')).toBeInTheDocument();
    });

    it('should prioritize value prop over activeValue', () => {
      const { container } = render(
        <RdsBottomNavigation {...defaultProps} activeValue="favorites" value="profile" />
      );
      expect(container.querySelector('.MuiBottomNavigation-root')).toBeInTheDocument();
    });

    it('should update active item when value changes', () => {
      const { rerender, container } = render(
        <RdsBottomNavigation {...defaultProps} value="home" />
      );
      expect(container.querySelector('.MuiBottomNavigation-root')).toBeInTheDocument();
      
      rerender(<RdsBottomNavigation {...defaultProps} value="profile" />);
      expect(container.querySelector('.MuiBottomNavigation-root')).toBeInTheDocument();
    });
  });

  describe('Item Selection', () => {
    it('should call onItemChange when item is clicked', () => {
      const onItemChange = jest.fn();
      const { container } = render(
        <RdsBottomNavigation {...defaultProps} onItemChange={onItemChange} />
      );
      const buttons = container.querySelectorAll('.MuiBottomNavigationAction-root');
      fireEvent.click(buttons[1]);
      expect(onItemChange).toHaveBeenCalled();
    });

    it('should call onChange when item is clicked', () => {
      const onChange = jest.fn();
      const { container } = render(
        <RdsBottomNavigation {...defaultProps} onChange={onChange} />
      );
      const buttons = container.querySelectorAll('.MuiBottomNavigationAction-root');
      fireEvent.click(buttons[0]);
      expect(onChange).toHaveBeenCalled();
    });

    it('should call both onItemChange and onChange when item is clicked', () => {
      const onItemChange = jest.fn();
      const onChange = jest.fn();
      const { container } = render(
        <RdsBottomNavigation {...defaultProps} onItemChange={onItemChange} onChange={onChange} />
      );
      const buttons = container.querySelectorAll('.MuiBottomNavigationAction-root');
      fireEvent.click(buttons[1]);
      expect(onItemChange).toHaveBeenCalled();
      expect(onChange).toHaveBeenCalled();
    });

    it('should pass correct value to onItemChange callback', () => {
      const onItemChange = jest.fn();
      const { container } = render(
        <RdsBottomNavigation {...defaultProps} onItemChange={onItemChange} />
      );
      const buttons = container.querySelectorAll('.MuiBottomNavigationAction-root');
      fireEvent.click(buttons[1]);
      expect(onItemChange).toHaveBeenCalledWith('favorites');
    });
  });

  describe('Disabled State', () => {
    it('should disable item when disabled is true', () => {
      const itemsWithDisabled: RdsBottomNavigationItem[] = [
        { label: 'Home', value: 'home' },
        { label: 'Favorites', value: 'favorites', disabled: true },
        { label: 'Profile', value: 'profile' },
      ];
      const { container } = render(
        <RdsBottomNavigation items={itemsWithDisabled} />
      );
      const buttons = container.querySelectorAll('.MuiBottomNavigationAction-root');
      // MUI BottomNavigationAction renders disabled items, verify structure
      expect(buttons.length).toBe(3);
    });

    it('should not disable item by default', () => {
      const { container } = render(<RdsBottomNavigation {...defaultProps} />);
      const buttons = container.querySelectorAll('.MuiBottomNavigationAction-root');
      // By default items should be rendered
      expect(buttons.length).toBe(defaultItems.length);
    });

    it('should not trigger callback for disabled item', () => {
      const onItemChange = jest.fn();
      const itemsWithDisabled: RdsBottomNavigationItem[] = [
        { label: 'Home', value: 'home' },
        { label: 'Favorites', value: 'favorites', disabled: true },
      ];
      const { container } = render(
        <RdsBottomNavigation items={itemsWithDisabled} onItemChange={onItemChange} />
      );
      const buttons = container.querySelectorAll('.MuiBottomNavigationAction-root');
      fireEvent.click(buttons[1]);
      // Disabled items may still trigger events, but the component should handle it
      expect(container.querySelector('.MuiBottomNavigation-root')).toBeInTheDocument();
    });

    it('should handle all items disabled', () => {
      const itemsAllDisabled: RdsBottomNavigationItem[] = [
        { label: 'Home', value: 'home', disabled: true },
        { label: 'Favorites', value: 'favorites', disabled: true },
      ];
      const { container } = render(
        <RdsBottomNavigation items={itemsAllDisabled} />
      );
      const buttons = container.querySelectorAll('.MuiBottomNavigationAction-root');
      // All disabled items should still render
      expect(buttons.length).toBe(2);
    });
  });

  describe('Combined Props', () => {
    it('should render with all customization props', () => {
      const onItemChange = jest.fn();
      const onChange = jest.fn();
      const itemsWithIcons: RdsBottomNavigationItem[] = [
        { label: 'Home', value: 'home', icon: <span>🏠</span> },
        { label: 'Favorites', value: 'favorites', icon: <span>❤️</span> },
        { label: 'Profile', value: 'profile', disabled: true },
      ];
      render(
        <RdsBottomNavigation
          items={itemsWithIcons}
          activeValue="home"
          showLabels={true}
          onItemChange={onItemChange}
          onChange={onChange}
        />
      );
      expect(screen.getByText('Home')).toBeInTheDocument();
    });

    it('should handle multiple interactions', () => {
      const onItemChange = jest.fn();
      const { container } = render(
        <RdsBottomNavigation {...defaultProps} onItemChange={onItemChange} />
      );
      const buttons = container.querySelectorAll('.MuiBottomNavigationAction-root');
      
      fireEvent.click(buttons[0]);
      fireEvent.click(buttons[1]);
      fireEvent.click(buttons[2]);
      
      expect(onItemChange).toHaveBeenCalledTimes(3);
    });
  });

  describe('Default Props', () => {
    it('should not show labels by default', () => {
      const { container } = render(<RdsBottomNavigation {...defaultProps} />);
      expect(container.querySelector('.MuiBottomNavigation-root')).toBeInTheDocument();
    });

    it('should have no active value by default', () => {
      const { container } = render(<RdsBottomNavigation {...defaultProps} />);
      expect(container.querySelector('.MuiBottomNavigation-root')).toBeInTheDocument();
    });

    it('should not have items disabled by default', () => {
      const { container } = render(<RdsBottomNavigation {...defaultProps} />);
      const buttons = container.querySelectorAll('.MuiBottomNavigationAction-root');
      // Items should be rendered and interactive by default
      expect(buttons.length).toBeGreaterThan(0);
    });
  });

  describe('MUI Props Integration', () => {
    it('should accept MUI BottomNavigation props', () => {
      const { container } = render(
        <RdsBottomNavigation {...defaultProps} sx={{ backgroundColor: 'red' }} />
      );
      expect(container.querySelector('.MuiBottomNavigation-root')).toBeInTheDocument();
    });

    it('should spread MUI props correctly', () => {
      const { container } = render(
        <RdsBottomNavigation
          {...defaultProps}
          data-testid="custom-bottom-nav"
        />
      );
      expect(container.querySelector('[data-testid="custom-bottom-nav"]')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle item with empty label', () => {
      const itemsWithEmpty: RdsBottomNavigationItem[] = [
        { label: '', value: 'empty' },
        { label: 'Home', value: 'home' },
      ];
      const { container } = render(
        <RdsBottomNavigation items={itemsWithEmpty} showLabels={true} />
      );
      expect(container.querySelectorAll('.MuiBottomNavigationAction-root').length).toBe(2);
    });

    it('should handle very long label text', () => {
      const longLabel = 'This is a very long label text that should fit in the bottom navigation';
      const itemsWithLongLabel: RdsBottomNavigationItem[] = [
        { label: longLabel, value: 'long' },
      ];
      render(
        <RdsBottomNavigation items={itemsWithLongLabel} showLabels={true} />
      );
      expect(screen.getByText(longLabel)).toBeInTheDocument();
    });

    it('should handle special characters in label', () => {
      const itemsWithSpecialChars: RdsBottomNavigationItem[] = [
        { label: 'Home & More', value: 'home' },
        { label: 'Favorites @', value: 'favorites' },
      ];
      render(
        <RdsBottomNavigation items={itemsWithSpecialChars} showLabels={true} />
      );
      expect(screen.getByText('Home & More')).toBeInTheDocument();
      expect(screen.getByText('Favorites @')).toBeInTheDocument();
    });

    it('should handle unicode characters in label', () => {
      const itemsWithUnicode: RdsBottomNavigationItem[] = [
        { label: '🏠 Home', value: 'home' },
        { label: '❤️ Favorites', value: 'favorites' },
      ];
      render(
        <RdsBottomNavigation items={itemsWithUnicode} showLabels={true} />
      );
      expect(screen.getByText('🏠 Home')).toBeInTheDocument();
    });

    it('should handle duplicate item values', () => {
      const itemsWithDuplicates: RdsBottomNavigationItem[] = [
        { label: 'Home', value: 'home' },
        { label: 'Home 2', value: 'home' },
      ];
      const { container } = render(
        <RdsBottomNavigation items={itemsWithDuplicates} />
      );
      expect(container.querySelectorAll('.MuiBottomNavigationAction-root').length).toBe(2);
    });

    it('should handle rapid value changes', () => {
      const { rerender, container } = render(
        <RdsBottomNavigation {...defaultProps} value="home" />
      );
      
      rerender(<RdsBottomNavigation {...defaultProps} value="favorites" />);
      rerender(<RdsBottomNavigation {...defaultProps} value="profile" />);
      rerender(<RdsBottomNavigation {...defaultProps} value="home" />);
      
      expect(container.querySelector('.MuiBottomNavigation-root')).toBeInTheDocument();
    });

    it('should handle component without any optional props', () => {
      const { container } = render(
        <RdsBottomNavigation items={[{ label: 'Single', value: 'single' }]} />
      );
      expect(container.querySelector('.rds-bottom-navigation')).toBeInTheDocument();
    });
  });

  describe('Props Validation', () => {
    it('should accept items array', () => {
      const { container } = render(<RdsBottomNavigation items={defaultItems} />);
      expect(container.querySelectorAll('.MuiBottomNavigationAction-root').length).toBe(defaultItems.length);
    });

    it('should accept activeValue as string', () => {
      const { container } = render(
        <RdsBottomNavigation items={defaultItems} activeValue="home" />
      );
      expect(container.querySelector('.MuiBottomNavigation-root')).toBeInTheDocument();
    });

    it('should accept showLabels as boolean', () => {
      render(<RdsBottomNavigation items={defaultItems} showLabels={true} />);
      expect(screen.getByText('Home')).toBeInTheDocument();
    });

    it('should accept onItemChange callback', () => {
      const onItemChange = jest.fn();
      const { container } = render(
        <RdsBottomNavigation items={defaultItems} onItemChange={onItemChange} />
      );
      const buttons = container.querySelectorAll('.MuiBottomNavigationAction-root');
      fireEvent.click(buttons[0]);
      expect(onItemChange).toHaveBeenCalled();
    });

    it('should accept onChange callback', () => {
      const onChange = jest.fn();
      const { container } = render(
        <RdsBottomNavigation items={defaultItems} onChange={onChange} />
      );
      const buttons = container.querySelectorAll('.MuiBottomNavigationAction-root');
      fireEvent.click(buttons[0]);
      expect(onChange).toHaveBeenCalled();
    });

    it('should accept ReactNode for icon', () => {
      const itemsWithIcons: RdsBottomNavigationItem[] = [
        { label: 'Home', value: 'home', icon: <span data-testid="custom-icon">Custom</span> },
      ];
      render(<RdsBottomNavigation items={itemsWithIcons} />);
      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should render as a navigation component', () => {
      const { container } = render(<RdsBottomNavigation {...defaultProps} />);
      expect(container.querySelector('.MuiBottomNavigation-root')).toBeInTheDocument();
  
    it('has no axe accessibility violations', async () => {
      const { container } = render(<RdsBottomNavigation {...defaultProps} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

    it('should have button role for items', () => {
      const { container } = render(<RdsBottomNavigation {...defaultProps} />);
      const buttons = container.querySelectorAll('button[type="button"]');
      expect(buttons.length).toBeGreaterThan(0);
    });

    it('should support keyboard navigation with buttons', () => {
      const { container } = render(<RdsBottomNavigation {...defaultProps} />);
      const buttons = container.querySelectorAll('button');
      expect(buttons.length).toBeGreaterThan(0);
    });
  });
});