import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RdsAppBar, { RdsAppBarProps, RdsAppBarSize } from './rds-app-bar';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';
import { warnDeprecatedProp } from '../shared/utils/deprecation';
jest.mock('../shared/utils/deprecation', () => ({ warnDeprecatedProp: jest.fn() }));

jest.mock('./rds-app-bar.scss', () => ({}));

jest.mock('./ProfileMenu', () => {
  return {
    ProfileMenu: ({ name, email, items, menuItems }: any) => (
      <div data-testid="profile-menu">
        <div data-testid="profile-name">{name}</div>
        <div data-testid="profile-email">{email}</div>
        <div data-testid="profile-menu-items">{(items ?? menuItems)?.length || 0}</div>
      </div>
    ),
  };
});

jest.mock('@mui/icons-material/Clear', () => {
  return function GetAppIcon() {
    return <span data-testid="clear-icon">ClearIcon</span>;
  };
});

jest.mock('@mui/icons-material/Dehaze', () => {
  return function DehazeIcon() {
    return <span data-testid="dehaze-icon">DehazeIcon</span>;
  };
});

jest.mock('@mui/icons-material/Logout', () => {
  return function LogoutIcon() {
    return <span data-testid="logout-icon">LogoutIcon</span>;
  };
});

jest.mock('@mui/icons-material/Person', () => {
  return function PersonIcon() {
    return <span data-testid="person-icon">PersonIcon</span>;
  };
});

jest.mock('@mui/icons-material/Close', () => {
  return function CloseIcon() {
    return <span data-testid="close-icon">CloseIcon</span>;
  };
});

describe('RdsAppBar', () => {
  const defaultProps: RdsAppBarProps = {};
  const setup = (p: RdsAppBarProps = {}) => render(<RdsAppBar {...defaultProps} {...p} />);
  const has = (container: HTMLElement, sel: string) => expect(container.querySelector(sel)).toBeInTheDocument();
  const hasNot = (container: HTMLElement, sel: string) => expect(container.querySelector(sel)).not.toBeInTheDocument();
  const searchProps = { showSearch: true, onSearchChange: jest.fn() };
  const user = { userName: 'John Doe', userEmail: 'john@example.com' };

  describe('Basic Rendering', () => {
    it('should render component without crashing', () => {
      has(setup().container, '.rds-header');
    });

    it('should have correct displayName', () => {
      expect(RdsAppBar.displayName).toBe('RdsAppBar');
    });

    it('should render AppBar element', () => {
      has(setup().container, 'header');
    });

    it('should render toolbar', () => {
      has(setup().container, '.rds-app-bar--size-medium');
    });

    it('should render header toolbar container', () => {
      has(setup().container, '.rds-header__toolbar');
    });

    it('should render with default color', () => {
      has(setup({ color: 'primary' }).container, '.rds-header--primary');
    });
  });

  describe('Title Display', () => {
    it('should display title when provided', () => {
      setup({ title: 'Test App Bar' });
      expect(screen.getByText('Test App Bar')).toBeInTheDocument();
    });

    it('should not display title when not provided', () => {
      expect(setup().container.querySelector('.rds-header__title')?.textContent).toBe('');
    });

    it('should display long title text', () => {
      const longTitle = 'A'.repeat(100);
      setup({ title: longTitle });
      expect(screen.getByText(longTitle)).toBeInTheDocument();
    });

    it('should display special characters in title', () => {
      setup({ title: 'Test <App> & Bar!' });
      expect(screen.getByText(/Test.*App.*Bar/)).toBeInTheDocument();
    });
  });

  describe('Logo Display', () => {
    const logoElement = <span data-testid="test-logo">Logo</span>;

    it('should display logo when showLogo is true and logo is provided', () => {
      setup({ logo: logoElement, showLogo: true });
      expect(screen.getByTestId('test-logo')).toBeInTheDocument();
    });

    it('should not display logo when showLogo is false', () => {
      hasNot(setup({ logo: logoElement, showLogo: false }).container, '.rds-header__logo');
    });

    it('should not display logo when logo is not provided', () => {
      hasNot(setup({ showLogo: true }).container, '.rds-header__logo');
    });

    it('should apply logo class to logo element', () => {
      has(setup({ logo: logoElement, showLogo: true }).container, '.rds-header__logo');
    });
  });

  describe('Menu Button', () => {
    it('should display menu button when showMenuButton is true', () => {
      has(setup({ showMenuButton: true }).container, '[aria-label="menu"]');
    });

    it('should not display menu button when showMenuButton is false', () => {
      hasNot(setup({ showMenuButton: false }).container, '[aria-label="menu"]');
    });

    it('should call onMenuClick when menu button is clicked', () => {
      const onMenuClick = jest.fn();
      const { container } = setup({ showMenuButton: true, onMenuClick });
      fireEvent.click(container.querySelector('[aria-label="menu"]')!);
      expect(onMenuClick).toHaveBeenCalled();
    });

    it('should display dehaze icon in menu button', () => {
      setup({ showMenuButton: true });
      expect(screen.getByTestId('dehaze-icon')).toBeInTheDocument();
    });
  });

  describe('Size Variants', () => {
    it.each(['small', 'medium', 'large'] as const)('should apply %s size class', (size) => {
      has(setup({ size }).container, `.rds-app-bar--size-${size}`);
    });

    it('should apply medium size class by default', () => {
      has(setup().container, '.rds-app-bar--size-medium');
    });

    it('should have correct toolbar height for large size', () => {
      has(setup({ size: 'large' }).container, '.rds-app-bar--size-large[style*="height"]');
    });
  });

  describe('Color Variants', () => {
    it.each(['primary', 'secondary', 'transparent'] as const)('should apply %s color class', (color) => {
      has(setup({ color }).container, `.rds-header--${color}`);
    });
  });

  describe('Center Content', () => {
    const centerContent = <span data-testid="center-content">Center</span>;

    it('should display center content when provided', () => {
      setup({ centerContent });
      expect(screen.getByTestId('center-content')).toBeInTheDocument();
    });

    it('should not display center content when not provided', () => {
      hasNot(setup().container, '.rds-header__center-content');
    });

    it('should apply center content class', () => {
      has(setup({ centerContent }).container, '.rds-header__center-content');
    });
  });

  describe('Search Functionality', () => {
    it('should display search input when showSearch is true and searchValue is provided', () => {
      has(setup({ ...searchProps, searchValue: 'test' }).container, '.rds-header__search');
    });

    it('should not display search input when showSearch is false', () => {
      hasNot(setup({ ...searchProps, showSearch: false, searchValue: 'test' }).container, '.rds-header__search');
    });

    it('should display search input with custom placeholder', () => {
      const { container } = setup({ ...searchProps, searchValue: 'test', searchPlaceholder: 'Type here...' });
      expect(container.querySelector('.rds-header__search input')).toHaveAttribute('placeholder', 'Type here...');
    });

    it('should display default search placeholder', () => {
      const { container } = setup({ ...searchProps, searchValue: '' });
      expect(container.querySelector('.rds-header__search input')).toHaveAttribute('placeholder', 'Search…');
    });

    it('should call onSearchChange when search value changes', () => {
      const onSearchChange = jest.fn();
      const { container } = setup({ showSearch: true, searchValue: 'test', onSearchChange });
      const input = container.querySelector('.rds-header__search input') as HTMLInputElement;
      fireEvent.change(input, { target: { value: 'new value' } });
      expect(onSearchChange).toHaveBeenCalledWith('new value');
    });

    it('should display clear button when search value is not empty', () => {
      has(setup({ ...searchProps, searchValue: 'test' }).container, '.rds-header__search-clear');
    });

    it('should not display clear button when search value is empty', () => {
      hasNot(setup({ ...searchProps, searchValue: '' }).container, '.rds-header__search-clear');
    });

    it('should clear search value when clear button is clicked', () => {
      const onSearchChange = jest.fn();
      const { container } = setup({ showSearch: true, searchValue: 'test', onSearchChange });
      fireEvent.click(container.querySelector('.rds-header__search-clear')!);
      expect(onSearchChange).toHaveBeenCalledWith('');
    });
  });

  describe('Tabs Functionality', () => {
    const tabs = ['Tab 1', 'Tab 2', 'Tab 3'];

    it('should display tabs when tabs array is provided', () => {
      has(setup({ tabs, tabValue: 0, onTabChange: jest.fn() }).container, '.rds-header__tabs-inline');
    });

    it('should not display tabs when tabs is not provided', () => {
      hasNot(setup({ tabValue: 0, onTabChange: jest.fn() }).container, '.rds-header__tabs-inline');
    });

    it('should display all tabs', () => {
      setup({ tabs, tabValue: 0, onTabChange: jest.fn() });
      tabs.forEach((tab) => {
        expect(screen.getByText(tab)).toBeInTheDocument();
      });
    });

    it('should call onTabChange when tab is clicked', () => {
      const onTabChange = jest.fn();
      const { container } = setup({ tabs, tabValue: 0, onTabChange });
      fireEvent.click(container.querySelectorAll('[role="tab"]')[1]);
      expect(onTabChange).toHaveBeenCalledWith(1);
    });

    it('should render tabs with object labels', () => {
      setup({ tabs: ['Home', 'About', 'Contact'], tabValue: 0, onTabChange: jest.fn() });
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('About')).toBeInTheDocument();
    });
  });

  describe('Profile Menu / Actions', () => {
    const actions = <span data-testid="custom-actions">Actions</span>;

    it('should display profile menu when userName and userEmail are provided', () => {
      setup(user);
      expect(screen.getByTestId('profile-menu')).toBeInTheDocument();
    });

    it('should display user name in profile menu', () => {
      setup(user);
      expect(screen.getByTestId('profile-name')).toHaveTextContent('John Doe');
    });

    it('should display user email in profile menu', () => {
      setup(user);
      expect(screen.getByTestId('profile-email')).toHaveTextContent('john@example.com');
    });

    it('should not display profile menu when userName is not provided', () => {
      setup({ userEmail: 'john@example.com' });
      expect(screen.queryByTestId('profile-menu')).not.toBeInTheDocument();
    });

    it('should display actions when userName and userEmail are not provided', () => {
      setup({ actions });
      expect(screen.getByTestId('custom-actions')).toBeInTheDocument();
    });

    it('should prefer profile menu over actions', () => {
      setup({ ...user, actions });
      expect(screen.getByTestId('profile-menu')).toBeInTheDocument();
      expect(screen.queryByTestId('custom-actions')).not.toBeInTheDocument();
    });
  });

  describe('Right Actions', () => {
    const rightActions = <span data-testid="right-actions">Right</span>;

    it('should display right actions when provided', () => {
      setup({ rightActions });
      expect(screen.getByTestId('right-actions')).toBeInTheDocument();
    });

    it('should not display right actions when not provided', () => {
      hasNot(setup().container, '.rds-header__right-actions');
    });

    it('should apply right actions class', () => {
      has(setup({ rightActions }).container, '.rds-header__right-actions');
    });
  });

  describe('SubHeader', () => {
    const subHeader = <div data-testid="sub-header">Sub Header</div>;

    it('should display sub header when provided', () => {
      setup({ subHeader });
      expect(screen.getByTestId('sub-header')).toBeInTheDocument();
    });

    it('should not display sub header when not provided', () => {
      hasNot(setup().container, '.rds-header__sub-header');
    });

    it('should apply sub header class', () => {
      has(setup({ subHeader }).container, '.rds-header__sub-header');
    });
  });

  describe('Children', () => {
    it('should render children elements', () => {
      render(
        <RdsAppBar {...defaultProps}>
          <span data-testid="child-element">Child</span>
        </RdsAppBar>
      );
      expect(screen.getByTestId('child-element')).toBeInTheDocument();
    });

    it('should render multiple children', () => {
      render(
        <RdsAppBar {...defaultProps}>
          <span data-testid="child-1">Child 1</span>
          <span data-testid="child-2">Child 2</span>
        </RdsAppBar>
      );
      expect(screen.getByTestId('child-1')).toBeInTheDocument();
      expect(screen.getByTestId('child-2')).toBeInTheDocument();
    });
  });

  describe('Custom ClassName', () => {
    it('should apply custom className to root element', () => {
      const { container } = setup({ className: 'custom-header' });
      expect(container.querySelector('.rds-header')).toHaveClass('custom-header');
    });

    it('should maintain base classes with custom className', () => {
      const { container } = setup({ className: 'custom-class' });
      const header = container.querySelector('.rds-header');
      expect(header).toHaveClass('rds-header');
      expect(header).toHaveClass('custom-class');
    });
  });

  describe('Variant Styles', () => {
    it('should apply variant style class', () => {
      has(setup({ variantStyle: 'WithMenuButton' }).container, '.rds-header--variant-withmenubutton');
    });

    it('should normalize variant style class names', () => {
      const { container } = setup({ variantStyle: 'With Menu Button' });
      expect(container.querySelector('.rds-header')?.className).toMatch(/rds-header--variant-/);
    });
  });

  describe('Props Validation', () => {
    it('should render with minimal required props', () => {
      render(<RdsAppBar />);
      expect(screen.getByRole('banner')).toBeInTheDocument();
    });

    it('should handle empty title', () => {
      const { container } = render(<RdsAppBar title="" />);
      expect(container.querySelector('.rds-header__title')?.textContent).toBe('');
    });

    it('should accept MUI AppBar props', () => {
      render(<RdsAppBar elevation={2} />);
      expect(screen.getByRole('banner')).toBeInTheDocument();
    });
  });

  describe('Combined Props Tests', () => {
    it('should render app bar with all props customized', () => {
      render(
        <RdsAppBar
          title="Complete App Bar"
          rightActions={<span data-testid="right-actions">Right</span>}
          centerContent={<span data-testid="center-content">Center</span>}
          size="large"
          showMenuButton={true}
          onMenuClick={jest.fn()}
          showSearch={true}
          searchValue="search"
          onSearchChange={jest.fn()}
        />
      );
      expect(screen.getByText('Complete App Bar')).toBeInTheDocument();
      expect(screen.getByTestId('right-actions')).toBeInTheDocument();
      expect(screen.getByTestId('center-content')).toBeInTheDocument();
    });

    it('should render with color and size variants', () => {
      const { container } = render(<RdsAppBar color="secondary" size="small" title="Styled App Bar" />);
      has(container, '.rds-header--secondary');
      has(container, '.rds-app-bar--size-small');
    });

    it('should handle profile menu with tabs and search', () => {
      setup({
        tabs: ['Home', 'About'],
        tabValue: 0,
        onTabChange: jest.fn(),
        ...searchProps,
        searchValue: '',
        userName: 'User',
        userEmail: 'user@test.com',
      });
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByTestId('profile-menu')).toBeInTheDocument();
    });
  });

  describe('Default Props Tests', () => {
    it('should use default showLogo as true', () => {
      setup({ logo: <span data-testid="logo">Logo</span> });
      expect(screen.getByTestId('logo')).toBeInTheDocument();
    });

    it('should use default showMenuButton as false', () => {
      hasNot(setup().container, '[aria-label="menu"]');
    });

    it('should use default showSearch as true', () => {
      has(setup({ searchValue: '', onSearchChange: jest.fn() }).container, '.rds-header__search');
    });
  });

  describe('Edge Cases', () => {
    it('should handle very long title text', () => {
      const longTitle = 'A'.repeat(500);
      render(<RdsAppBar title={longTitle} />);
      expect(screen.getByText(longTitle)).toBeInTheDocument();
    });

    it('should handle special characters in search', () => {
      const specialValue = '<>&"';
      const { container } = render(<RdsAppBar showSearch={true} searchValue={specialValue} onSearchChange={jest.fn()} />);
      const input = container.querySelector('.rds-header__search input') as HTMLInputElement;
      expect(input.value).toBe(specialValue);
    });

    it('should handle rapid tab changes', () => {
      const onTabChange = jest.fn();
      const { container } = render(<RdsAppBar tabs={['Tab 1', 'Tab 2']} tabValue={0} onTabChange={onTabChange} />);
      const tabButtons = container.querySelectorAll('[role="tab"]');
      fireEvent.click(tabButtons[1]);
      fireEvent.click(tabButtons[0]);
      expect(onTabChange).toHaveBeenCalledTimes(1);
      expect(onTabChange).toHaveBeenNthCalledWith(1, 1);
    });

    it('should handle empty tabs array', () => {
      has(render(<RdsAppBar tabs={[]} tabValue={0} onTabChange={jest.fn()} />).container, '.rds-header__tabs-inline');
    });

    it('should handle whitespace in title', () => {
      render(<RdsAppBar title="   Title With Spaces   " />);
      expect(screen.getByText(/Title With Spaces/)).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has no axe accessibility violations', async () => {
      const { container } = render(<RdsAppBar />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});

describe('RdsAppBar audit fixes', () => {
  const mockSmallScreen = (matches: boolean) => {
    window.matchMedia = jest.fn().mockImplementation((query: string) => ({
      matches,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));
  };
  const originalMatchMedia = window.matchMedia;
  afterEach(() => {
    window.matchMedia = originalMatchMedia;
  });

  it('keeps its own classes when a consumer passes className', () => {
    const { container } = render(<RdsAppBar className="my-app-bar" />);
    const header = container.querySelector('header');
    expect(header).toHaveClass('rds-header');
    expect(header).toHaveClass('my-app-bar');
  });

  it('lets consumers set elevation (G1-030)', () => {
    const { container, rerender } = render(<RdsAppBar />);
    expect(container.querySelector('header')).toHaveClass('MuiPaper-elevation0');
    rerender(<RdsAppBar elevation={4} />);
    expect(container.querySelector('header')).toHaveClass('MuiPaper-elevation4');
  });

  it('has no demo profile menu items by default and accepts custom ones (G1-026)', () => {
    const { rerender } = render(<RdsAppBar userName="Ann Lee" userEmail="ann@example.com" />);
    expect(screen.getByTestId('profile-menu-items')).toHaveTextContent('0');
    rerender(
      <RdsAppBar
        userName="Ann Lee"
        userEmail="ann@example.com"
        profileMenuItems={[{ label: 'Profile', onClick: jest.fn() }, { label: 'Settings' }, { label: 'Sign out' }]}
      />
    );
    expect(screen.getByTestId('profile-menu-items')).toHaveTextContent('3');
  });

  it('has no demo bottom actions by default and allows custom content (G1-025)', () => {
    mockSmallScreen(true);
    const tabs = ['Home', 'Reports'];
    const { rerender } = render(<RdsAppBar variantStyle="withMenuButton" tabs={tabs} />);
    expect(screen.queryByText('28 Days Left')).not.toBeInTheDocument();
    expect(screen.queryByText('View Plans')).not.toBeInTheDocument();

    rerender(<RdsAppBar variantStyle="withMenuButton" tabs={tabs} bottomActions={<span>Upgrade</span>} />);
    expect(screen.getByText('Upgrade')).toBeInTheDocument();

    rerender(<RdsAppBar variantStyle="withMenuButton" tabs={tabs} bottomActions={null} />);
    expect(screen.queryByText('Upgrade')).not.toBeInTheDocument();
  });

  it('keeps "With Menu Button" (with spaces) off the mobile bottom bar, as before', () => {
    mockSmallScreen(true);
    render(<RdsAppBar variantStyle="With Menu Button" tabs={['Home']} bottomActions={<span>28 Days Left</span>} />);
    expect(screen.queryByText('28 Days Left')).not.toBeInTheDocument();
  });

  it('renders tabs with duplicate labels without key warnings (G1-034/G1-035)', () => {
    const error = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(<RdsAppBar tabs={['Same', 'Same']} tabValue={0} onTabChange={jest.fn()} />);
    expect(error.mock.calls.some(([msg]) => String(msg).includes('same key'))).toBe(false);
    error.mockRestore();
  });

  it('merges consumer sx after theme-aware base styles (G1-041)', () => {
    const { container } = render(<RdsAppBar sx={{ opacity: 0.87 }} />);
    expect(container.querySelector('header')).toHaveStyle({ opacity: '0.87' });
  });

  it('keeps primary and transparent variant classes for theme sx hooks (G1-041)', () => {
    const { container, rerender } = render(<RdsAppBar color="primary" />);
    expect(container.querySelector('header')).toHaveClass('rds-header--primary');
    rerender(<RdsAppBar color="transparent" />);
    expect(container.querySelector('header')).toHaveClass('rds-header--transparent');
  });

  it('moves withMenuButton chrome to bottom nav classes and hides inline tabs (G1-041 Phase I/J)', () => {
    mockSmallScreen(true);
    const { container } = render(
      <RdsAppBar variantStyle="withMenuButton" tabs={['Home', 'Reports']} tabValue={0} onTabChange={jest.fn()} />,
    );
    const header = container.querySelector('header');
    expect(header).toHaveClass('rds-header--bottom-nav-active');
    expect(header).toHaveClass('rds-header--withmenubutton-compact');
    expect(header).toHaveClass('rds-header--withmenubutton-narrow');
    expect(container.querySelector('.rds-header__tabs-inline')).not.toBeInTheDocument();
    expect(container.querySelector('.rds-bottom-navigation')).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Home' })).toBeInTheDocument();
  });

  it.each([
    ['logoSearchTabs', 'rds-header--logosearchtabs-compact', 'rds-header--logosearchtabs-narrow'],
    ['logoSearchTabsActions', 'rds-header--logosearchtabsactions-compact', undefined],
    ['logoTabsActions', 'rds-header--logotabsactions-compact', 'rds-header--logotabsactions-narrow'],
    ['dashboardWithLang', 'rds-header--dashboardwithlang-compact', 'rds-header--dashboardwithlang-narrow'],
  ] as const)('applies compact/narrow classes for %s (G1-041)', (variantStyle, compact, narrow) => {
    mockSmallScreen(true);
    const { container } = render(<RdsAppBar variantStyle={variantStyle} />);
    const header = container.querySelector('header');
    expect(header).toHaveClass(compact);
    if (narrow) expect(header).toHaveClass(narrow);
  });

  it.each(['withTabs', 'withActions', 'withLogoAndTabs', 'withNotificationBadge'] as const)(
    'applies tablet-compact + mobile-toolbar classes for %s (G1-041)',
    (variantStyle) => {
      mockSmallScreen(true);
      const { container } = render(<RdsAppBar variantStyle={variantStyle} />);
      const header = container.querySelector('header');
      expect(header).toHaveClass('rds-header--tablet-compact');
      expect(header).toHaveClass('rds-header--mobile-toolbar');
      expect(header).toHaveClass('rds-header--mobile-toolbar-xs');
    },
  );
});

describe('RdsAppBar additive renames', () => {
  beforeEach(() => (warnDeprecatedProp as jest.Mock).mockClear());

  it('endSlot wins over rightActions and actions', () => {
    render(<RdsAppBar endSlot={<b>new</b>} rightActions={<b>old-right</b>} actions={<b>old-actions</b>} />);
    expect(screen.getByText('new')).toBeInTheDocument();
    expect(screen.queryByText('old-right')).toBeNull();
    expect(screen.queryByText('old-actions')).toBeNull();
  });

  it('rightActions, actions and centerContent still work and warn', () => {
    render(<RdsAppBar rightActions={<b>r</b>} actions={<b>a</b>} centerContent={<b>c</b>} />);
    expect(screen.getByText('r')).toBeInTheDocument();
    expect(screen.getByText('a')).toBeInTheDocument();
    expect(screen.getByText('c')).toBeInTheDocument();
    expect(warnDeprecatedProp).toHaveBeenCalledWith('RdsAppBar', 'rightActions', '`endSlot`');
    expect(warnDeprecatedProp).toHaveBeenCalledWith('RdsAppBar', 'actions', '`endSlot`');
    expect(warnDeprecatedProp).toHaveBeenCalledWith('RdsAppBar', 'centerContent', '`centerSlot`');
  });

  it('centerSlot wins over centerContent', () => {
    render(<RdsAppBar centerSlot={<b>new</b>} centerContent={<b>old</b>} />);
    expect(screen.getByText('new')).toBeInTheDocument();
    expect(screen.queryByText('old')).toBeNull();
  });

  it('tabsProps value/onChange win over tabValue/onTabChange', () => {
    const onTabChange = jest.fn();
    const onChange = jest.fn();
    render(<RdsAppBar tabs={['A', 'B']} tabValue={0} onTabChange={onTabChange} tabsProps={{ value: 1, onChange }} />);
    expect(screen.getByRole('tab', { name: 'B' })).toHaveAttribute('aria-selected', 'true');
    fireEvent.click(screen.getByRole('tab', { name: 'A' }));
    expect(onChange).toHaveBeenCalledWith(expect.anything(), 0);
    expect(onTabChange).not.toHaveBeenCalled();
  });

  it('tabValue/onTabChange still work (value signature) and warn', () => {
    const onTabChange = jest.fn();
    render(<RdsAppBar tabs={['A', 'B']} tabValue={0} onTabChange={onTabChange} />);
    fireEvent.click(screen.getByRole('tab', { name: 'B' }));
    expect(onTabChange).toHaveBeenCalledWith(1);
    expect(warnDeprecatedProp).toHaveBeenCalledWith('RdsAppBar', 'tabValue', '`tabsProps.value`');
  });
});
