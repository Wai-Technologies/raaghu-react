import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RdsBottomNavigation, { RdsBottomNavigationProps, RdsBottomNavigationItem } from './rds-bottom-navigation';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';

import { warnDeprecatedProp } from '../shared/utils/deprecation';

jest.mock('../shared/utils/deprecation', () => ({ warnDeprecatedProp: jest.fn() }));

jest.mock('./rds-bottom-navigation.scss', () => ({}));

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

  const setup = (p: Partial<RdsBottomNavigationProps> & Record<string, any> = {}) =>
    render(<RdsBottomNavigation {...defaultProps} {...p} />);
  const getActions = (container: HTMLElement) => container.querySelectorAll('.MuiBottomNavigationAction-root');

  describe('Basic Rendering', () => {
    it('should render wrapper and MUI BottomNavigation without crashing', () => {
      const { container } = setup();
      expect(container.querySelector('.rds-bottom-navigation')).toBeInTheDocument();
      expect(container.querySelector('.MuiBottomNavigation-root')).toBeInTheDocument();
    });

    it('should have correct displayName', () => {
      expect(RdsBottomNavigation.displayName).toBe('RdsBottomNavigation');
    });
  });

  describe('Items Rendering', () => {
    it.each([
      ['default', undefined, 3],
      ['single', [{ label: 'Home', value: 'home' }], 1],
      ['many', Array.from({ length: 10 }, (_, i) => ({ label: `Item ${i + 1}`, value: `item-${i + 1}` })), 10],
      ['empty', [], 0],
      ['one disabled', defaultItems.map((it, i) => ({ ...it, disabled: i === 1 })), 3],
      ['all disabled', defaultItems.slice(0, 2).map(it => ({ ...it, disabled: true })), 2],
      ['duplicate values', [{ label: 'Home', value: 'home' }, { label: 'Home 2', value: 'home' }], 2],
      ['empty label', [{ label: '', value: 'empty' }, { label: 'Home', value: 'home' }], 2],
      ['mixed icons', [{ label: 'Home', value: 'home', icon: <span>H</span> }, { label: 'Favorites', value: 'favorites' }], 2],
    ])('should render %s items', (_name, items, count) => {
      const { container } = setup(items ? { items: items as RdsBottomNavigationItem[] } : {});
      expect(getActions(container).length).toBe(count);
    });

    it('should render items with correct labels', () => {
      setup({ showLabels: true });
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Favorites')).toBeInTheDocument();
      expect(screen.getByText('Profile')).toBeInTheDocument();
    });

    it.each([
      [['This is a very long label text that should fit in the bottom navigation']],
      [['Home & More', 'Favorites @']],
      [['🏠 Home', '❤️ Favorites']],
    ])('should show labels %j', labels => {
      setup({ items: labels.map((label, i) => ({ label, value: `v${i}` })), showLabels: true });
      labels.forEach(l => expect(screen.getByText(l)).toBeInTheDocument());
    });
  });

  describe('Labels Visibility', () => {
    it('should render actions with showLabels false or default', () => {
      const { container } = setup({ showLabels: false });
      expect(getActions(container).length).toBeGreaterThan(0);
    });

    it('should toggle label visibility', () => {
      const { rerender } = setup({ showLabels: false });
      rerender(<RdsBottomNavigation {...defaultProps} showLabels={true} />);
      expect(screen.getByText('Home')).toBeInTheDocument();
    });
  });

  describe('Icons', () => {
    it('should render item icons when provided', () => {
      const items: RdsBottomNavigationItem[] = [
        { label: 'Home', value: 'home', icon: <span data-testid="home-icon">🏠</span> },
        { label: 'Favorites', value: 'favorites', icon: <span data-testid="fav-icon">❤️</span> },
      ];
      render(<RdsBottomNavigation items={items} />);
      expect(screen.getByTestId('home-icon')).toBeInTheDocument();
      expect(screen.getByTestId('fav-icon')).toBeInTheDocument();
    });
  });

  describe('Selection and Active Value', () => {
    it.each([
      [{ activeValue: 'favorites' }],
      [{ value: 'profile' }],
      [{ activeValue: 'favorites', value: 'profile' }],
    ])('should render with %j', props => {
      const { container } = setup(props);
      expect(container.querySelector('.MuiBottomNavigationAction-root')).toBeInTheDocument();
    });

    it('should update active item when value changes', () => {
      const { rerender, container } = setup({ value: 'home' });
      expect(container.querySelector('.MuiBottomNavigation-root')).toBeInTheDocument();
      rerender(<RdsBottomNavigation {...defaultProps} value="profile" />);
      expect(container.querySelector('.MuiBottomNavigation-root')).toBeInTheDocument();
    });
  });

  describe('Item Selection', () => {
    it.each([
      ['onItemChange', 1],
      ['onChange', 0],
    ])('should call %s when item is clicked', (prop, index) => {
      const handler = jest.fn();
      const { container } = setup({ [prop]: handler });
      fireEvent.click(getActions(container)[index]);
      expect(handler).toHaveBeenCalled();
    });

    it('should pass correct value to onItemChange and call both callbacks', () => {
      const onItemChange = jest.fn();
      const onChange = jest.fn();
      const { container } = setup({ onItemChange, onChange });
      fireEvent.click(getActions(container)[1]);
      expect(onChange).toHaveBeenCalled();
      expect(onItemChange).toHaveBeenCalledWith('favorites');
    });

    it('should handle multiple interactions', () => {
      const onItemChange = jest.fn();
      const { container } = setup({ onItemChange });
      getActions(container).forEach(b => fireEvent.click(b));
      expect(onItemChange).toHaveBeenCalledTimes(3);
    });
  });

  describe('Disabled State', () => {
    it('should not trigger callback for disabled item', () => {
      const onItemChange = jest.fn();
      const items = [{ label: 'Home', value: 'home' }, { label: 'Favorites', value: 'favorites', disabled: true }];
      const { container } = render(<RdsBottomNavigation items={items} onItemChange={onItemChange} />);
      fireEvent.click(getActions(container)[1]);
      expect(container.querySelector('.MuiBottomNavigation-root')).toBeInTheDocument();
    });
  });

  describe('Combined Props', () => {
    it('should render with all customization props', () => {
      const items: RdsBottomNavigationItem[] = [
        { label: 'Home', value: 'home', icon: <span>🏠</span> },
        { label: 'Favorites', value: 'favorites', icon: <span>❤️</span> },
        { label: 'Profile', value: 'profile', disabled: true },
      ];
      render(
        <RdsBottomNavigation
          items={items}
          activeValue="home"
          showLabels={true}
          onItemChange={jest.fn()}
          onChange={jest.fn()}
        />
      );
      expect(screen.getByText('Home')).toBeInTheDocument();
    });
  });

  describe('MUI Props Integration', () => {
    it('should accept MUI BottomNavigation props', () => {
      const { container } = setup({ sx: { backgroundColor: 'red' } });
      expect(container.querySelector('.MuiBottomNavigation-root')).toBeInTheDocument();
    });

    it('should spread MUI props correctly', () => {
      const { container } = setup({ 'data-testid': 'custom-bottom-nav' });
      expect(container.querySelector('[data-testid="custom-bottom-nav"]')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle rapid value changes', () => {
      const { rerender, container } = setup({ value: 'home' });
      ['favorites', 'profile', 'home'].forEach(value =>
        rerender(<RdsBottomNavigation {...defaultProps} value={value} />)
      );
      expect(container.querySelector('.MuiBottomNavigation-root')).toBeInTheDocument();
    });
  });

  describe('Props Validation', () => {
    it('should accept ReactNode for icon', () => {
      const items: RdsBottomNavigationItem[] = [
        { label: 'Home', value: 'home', icon: <span data-testid="custom-icon">Custom</span> },
      ];
      render(<RdsBottomNavigation items={items} />);
      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has no axe accessibility violations', async () => {
      const { container } = setup({ showLabels: true });
      expect(await axe(container)).toHaveNoViolations();
    });

    it('should have button role for items', () => {
      const { container } = setup();
      expect(container.querySelectorAll('button[type="button"]').length).toBeGreaterThan(0);
    });
  });

  describe('audit fixes', () => {
    beforeEach(() => {
      (warnDeprecatedProp as jest.Mock).mockClear();
    });

    it.each([
      ['activeValue', 'home', '`value`'],
      ['onItemChange', jest.fn(), '`onChange`'],
    ])('warns when the deprecated %s prop is used', (prop, val, replacement) => {
      setup({ [prop]: val });
      expect(warnDeprecatedProp).toHaveBeenCalledWith('RdsBottomNavigation', prop, replacement);
    });

    it('does not warn when value and onChange are used', () => {
      setup({ value: 'home', onChange: jest.fn() });
      expect(warnDeprecatedProp).not.toHaveBeenCalled();
    });

    it('still selects the item given by the deprecated activeValue', () => {
      const { container } = setup({ activeValue: 'favorites' });
      expect(getActions(container)[1]).toHaveClass('Mui-selected');
    });

    it('selects the item given by value, and value wins over activeValue', () => {
      const { container } = setup({ activeValue: 'favorites', value: 'profile' });
      expect(getActions(container)[2]).toHaveClass('Mui-selected');
      expect(getActions(container)[1]).not.toHaveClass('Mui-selected');
    });

    it('treats an empty-string value as set instead of falling back to activeValue', () => {
      const items: RdsBottomNavigationItem[] = [
        { label: 'None', value: '' },
        { label: 'Home', value: 'home' },
      ];
      const { container } = render(<RdsBottomNavigation items={items} value="" activeValue="home" />);
      expect(getActions(container)[0]).toHaveClass('Mui-selected');
      expect(getActions(container)[1]).not.toHaveClass('Mui-selected');
    });

    it('calls onChange with the event and the new value, and still calls onItemChange', () => {
      const onChange = jest.fn();
      const onItemChange = jest.fn();
      const { container } = setup({ onChange, onItemChange });
      fireEvent.click(getActions(container)[1]);
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange.mock.calls[0][0]).toHaveProperty('type', 'click');
      expect(onChange.mock.calls[0][1]).toBe('favorites');
      expect(onItemChange).toHaveBeenCalledWith('favorites');
    });

    it('keeps the selected item label hidden when showLabels is false', () => {
      const { container } = setup({ value: 'home', showLabels: false });
      expect(getActions(container)[0]).toHaveClass('Mui-selected');
      expect(screen.queryByText('Home')).not.toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Home' })).toBeInTheDocument();
    });

    it('does not leak showLabels onto the DOM', () => {
      const { container } = setup({ showLabels: true });
      expect(container.querySelector('[showlabels]')).toBeNull();
    });

    it('renders duplicate item values without a duplicate-key warning', () => {
      const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      const items: RdsBottomNavigationItem[] = [
        { label: 'Home', value: 'home' },
        { label: 'Home 2', value: 'home' },
      ];
      render(<RdsBottomNavigation items={items} />);
      const keyWarnings = errorSpy.mock.calls.filter((call) =>
        call.some((arg) => typeof arg === 'string' && arg.includes('same key'))
      );
      expect(keyWarnings).toHaveLength(0);
      errorSpy.mockRestore();
    });

    it('passes className and ref to the MUI root', () => {
      const ref = React.createRef<HTMLDivElement>();
      const { container } = setup({ className: 'custom', ref });
      const root = container.querySelector('.MuiBottomNavigation-root');
      expect(root).toHaveClass('custom');
      expect(ref.current).toBe(root);
    });

    it('forwards data-testid to the root .rds-bottom-navigation', () => {
      setup({ 'data-testid': 'app-nav' });
      expect(screen.getByTestId('app-nav')).toHaveClass('rds-bottom-navigation');
    });
  });
});
