import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import RdsSidebar, { RdsSidebarItem } from './rds-sidebar';
import { axe, configureAxe } from 'jest-axe';
import { warnDeprecatedProp } from '../shared/utils/deprecation';

jest.mock('./rds-sidebar.scss');
jest.mock('../shared/utils/deprecation', () => ({ warnDeprecatedProp: jest.fn() }));

jest.mock('../rds-avatar/rds-avatar', () => {
  return function MockAvatar(props: any) {
    return <div data-testid="rds-avatar" className="rds-avatar" data-src={props.src}>{props.name ?? props.title}</div>;
  };
});

jest.mock('../rds-search/rds-search', () => {
  return function MockSearch(props: any) {
    return (
      <input
        data-testid="rds-search"
        type="text"
        placeholder={props.placeholder}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
      />
    );
  };
});

jest.mock('../rds-tooltip/rds-tooltip', () => {
  return function MockTooltip(props: any) {
    return <div data-testid="rds-tooltip" title={props.title}>{props.children}</div>;
  };
});

const renderWithTheme = (component: React.ReactElement) =>
  render(<ThemeProvider theme={createTheme()}>{component}</ThemeProvider>);

describe('RdsSidebar', () => {
  const mockItems: RdsSidebarItem[] = [
    { label: 'Home', icon: <span>🏠</span>, onClick: jest.fn(), active: false, disabled: false },
    {
      label: 'Settings',
      icon: <span>⚙️</span>,
      onClick: jest.fn(),
      active: false,
      disabled: false,
      children: [
        { label: 'Profile', icon: <span>👤</span>, onClick: jest.fn(), active: false, disabled: false },
        { label: 'Security', icon: <span>🔒</span>, onClick: jest.fn(), active: false, disabled: false },
      ],
    },
  ];

  const setup = (props: Record<string, any> = {}) =>
    renderWithTheme(<RdsSidebar items={mockItems} isOpen={true} {...props} />);

  describe('Basic Rendering', () => {
    it('should render sidebar component with menu items', () => {
      setup();
      expect(screen.getByRole('presentation')).toBeInTheDocument();
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Settings')).toBeInTheDocument();
    });

    it('should handle empty items array', () => {
      expect(() => setup({ items: [] })).not.toThrow();
    });

    it('should have correct displayName', () => {
      expect(RdsSidebar.displayName).toBe('RdsSidebar');
    });
  });

  describe('Sidebar States', () => {
    it('should be closed when isOpen=false', () => {
      setup({ isOpen: false });
      expect(document.querySelector('.rds-sidebar')).toBeNull();
    });

    it('should call onClose when backdrop clicked', () => {
      const handleClose = jest.fn();
      const { container } = setup({ onClose: handleClose, variant: 'temporary' });
      const backdrop = container.querySelector('.MuiBackdrop-root');
      if (backdrop) {
        fireEvent.click(backdrop);
        expect(handleClose).toHaveBeenCalled();
      }
    });
  });

  describe('Menu Items', () => {
    it('should call onClick when item clicked', async () => {
      const onClick = jest.fn();
      setup({ items: [{ label: 'Home', onClick, icon: <span>🏠</span> }] });
      await userEvent.setup().click(screen.getByText('Home'));
      expect(onClick).toHaveBeenCalled();
    });

    it('should highlight active item', () => {
      setup({ items: [{ label: 'Home', active: true, icon: <span>🏠</span> }] });
      expect(screen.getByText('Home').closest('[role="button"]')).toHaveAttribute('class');
    });

    it('should disable disabled items', () => {
      setup({ items: [{ label: 'Home', disabled: true, icon: <span>🏠</span> }] });
      expect(screen.getByText('Home').closest('[role="button"]')).toHaveAttribute('aria-disabled', 'true');
    });
  });

  describe('Collapsible Items', () => {
    it('should expand, collapse and re-expand children when the parent is clicked', async () => {
      const user = userEvent.setup();
      setup();
      const settingsButton = screen.getByText('Settings');
      await user.click(settingsButton);
      expect(screen.getByText('Profile')).toBeInTheDocument();
      expect(screen.getByText('Security')).toBeInTheDocument();
      await user.click(settingsButton);
      expect(screen.queryByText('Profile')).not.toBeInTheDocument();
      await user.click(settingsButton);
      expect(screen.getByText('Profile')).toBeInTheDocument();
    });

    it('should call child onClick when clicked', async () => {
      const user = userEvent.setup();
      const childOnClick = jest.fn();
      setup({ items: [{ label: 'Parent', children: [{ label: 'Child', onClick: childOnClick }] }] });
      await user.click(screen.getByText('Parent'));
      await user.click(screen.getByText('Child'));
      expect(childOnClick).toHaveBeenCalled();
    });

    it('should handle multiple nested children', async () => {
      const complexItems: RdsSidebarItem[] = [
        { label: 'Level 1', children: [{ label: 'Level 2-A' }, { label: 'Level 2-B' }, { label: 'Level 2-C' }] },
      ];
      setup({ items: complexItems });
      await userEvent.setup().click(screen.getByText('Level 1'));
      expect(screen.getByText('Level 2-A')).toBeInTheDocument();
      expect(screen.getByText('Level 2-B')).toBeInTheDocument();
      expect(screen.getByText('Level 2-C')).toBeInTheDocument();
    });
  });

  describe('Search Functionality', () => {
    it.each([
      [{ showSearch: true }, true],
      [{ showSearch: false }, false],
      [{ showSearch: true, layout: 'raaghu', typeOf: 'collapse' }, true],
      [{ showSearch: true, layout: 'toolbar', typeOf: 'collapse' }, true],
      [{ showSearch: false, layout: 'toolbar', typeOf: 'collapse' }, false],
    ])('should render search for %j -> %s', (props, shown) => {
      setup(props);
      if (shown) expect(screen.getByTestId('rds-search')).toBeInTheDocument();
      else expect(screen.queryByTestId('rds-search')).not.toBeInTheDocument();
    });

    it('should update search value', async () => {
      setup({ showSearch: true });
      const searchInput = screen.getByTestId('rds-search') as HTMLInputElement;
      await userEvent.setup().type(searchInput, 'test');
      expect(searchInput.value).toBe('test');
    });

    it('should have search placeholder in expanded mode', () => {
      setup({ showSearch: true, typeOf: 'expanded' });
      expect(screen.getByTestId('rds-search')).toHaveAttribute('placeholder', 'Search...');
    });
  });

  describe('Sidebar Width', () => {
    it.each([undefined, 300])('should render with width %s', width => {
      setup({ width });
      expect(document.querySelector('.rds-sidebar')).toBeInTheDocument();
    });

    it('should show icons only when width < 200', () => {
      setup({ width: 150 });
      expect(document.querySelector('.rds-sidebar')?.className.includes('rds-sidebar--narrow-collapsed')).toBe(true);
    });
  });

  describe('Sidebar Types', () => {
    it.each([
      ['collapse', '.rds-sidebar--collapse'],
      ['fixed', '.rds-sidebar--fixed'],
    ])('should render %s sidebar', (typeOf, selector) => {
      setup({ typeOf });
      expect(document.querySelector(selector)).toBeInTheDocument();
    });

    it('should show tooltips in collapsed mode', () => {
      setup({ typeOf: 'collapse' });
      expect(screen.getAllByTestId('rds-tooltip').length).toBeGreaterThan(0);
    });
  });

  describe('Platforms', () => {
    it('should use abp-list items when platform=abp-list', () => {
      setup({ items: [], platform: 'abp-list' });
      expect(screen.getByText('Dashboard')).toBeInTheDocument();
      expect(screen.getByText('Invoices')).toBeInTheDocument();
    });

    it('should use anz-list items when platform=anz-list', () => {
      setup({ items: [], platform: 'anz-list' });
      expect(screen.getByText('Dashboard')).toBeInTheDocument();
      expect(screen.getByText('Saas')).toBeInTheDocument();
      expect(screen.getByText('Administration')).toBeInTheDocument();
    });
  });

  describe('Layouts', () => {
    it.each([
      [{ layout: 'raaghu' }],
      [{ layout: 'list' }],
      [{ layout: 'toolbar', showLogo: true }],
      [{ typeOf: 'expanded' }],
    ])('should render Home for %j', props => {
      setup(props);
      expect(screen.getByText('Home')).toBeInTheDocument();
    });
  });

  describe('Avatar Display', () => {
    it.each([
      [{ layout: 'toolbar', showLogo: true, avatarSrc: '/avatar.png' }],
      [{ avatarSrc: '/avatar.png' }],
    ])('should show avatar for %j', props => {
      setup(props);
      expect(screen.getAllByTestId('rds-avatar').length).toBeGreaterThan(0);
    });

    it('should not show logo when showLogo=false', () => {
      const { container } = setup({ showLogo: false });
      expect(container.querySelector('.rds-sidebar__header')).not.toBeInTheDocument();
    });

    it('should use avatarCollapsedSrc in collapsed mode', () => {
      setup({ showLogo: true, layout: 'raaghu', avatarCollapsedSrc: '/collapsed-logo.png', typeOf: 'collapse' });
      expect(document.querySelector('.rds-sidebar--collapse')).toBeInTheDocument();
    });
  });

  describe('Theme Integration', () => {
    it.each(['light', 'dark'] as const)('should work with %s theme', mode => {
      render(
        <ThemeProvider theme={createTheme({ palette: { mode } })}>
          <RdsSidebar items={mockItems} isOpen={true} />
        </ThemeProvider>
      );
      expect(screen.getByText('Home')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have accessible buttons', () => {
      setup();
      expect(screen.getAllByRole('button').length).toBeGreaterThan(0);
    });

    it('should have aria-expanded for collapsible items', () => {
      setup();
      expect(screen.getByText('Settings').closest('[role="button"]')).toHaveAttribute('aria-expanded');
    });

    it('should have list semantics', () => {
      setup();
      expect(screen.getAllByRole('list').length).toBeGreaterThan(0);
    });
  });

  describe('Edge Cases', () => {
    it.each([
      [{ label: 'No Icon Item' }],
      [{ label: 'This is a very long item label that should be handled gracefully in the sidebar' }],
      [{ label: 'Item & Special <>' }],
      [{ label: 'Disabled Parent', disabled: true, children: [{ label: 'Child' }] }],
      [{ label: 'Parent with Empty Children', children: [] }],
    ])('should render item %j', item => {
      setup({ items: [item] });
      expect(screen.getByText(item.label)).toBeInTheDocument();
    });

    it('should handle items with no onClick', async () => {
      setup({ items: [{ label: 'No Click' }] });
      const button = screen.getByText('No Click');
      await userEvent.setup().click(button);
      expect(button).toBeInTheDocument();
    });

    it('should handle all props at once', () => {
      setup({
        onClose: jest.fn(),
        width: 300,
        showSearch: true,
        layout: 'toolbar',
        typeOf: 'expanded',
        avatarSrc: '/avatar.png',
        avatarCollapsedSrc: '/collapsed.png',
        showLogo: true,
      });
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByTestId('rds-search')).toBeInTheDocument();
    });

    it('has no axe accessibility violations', async () => {
      const { container } = setup({ items: [{ label: 'Home', onClick: () => {} }], variant: 'permanent' });
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});

describe('audit fixes', () => {
  const items: RdsSidebarItem[] = [
    { label: 'Home', icon: <span>h</span> },
    { label: 'Parent', icon: <span>p</span>, children: [{ label: 'Kid' }] },
  ];

  it('renders custom user name and default user', () => {
    const { unmount } = renderWithTheme(
      <RdsSidebar items={items} open variant="permanent" user={{ name: 'Ann', subtitle: 'Boss' }} />
    );
    expect(screen.getByText('Ann')).toBeInTheDocument();
    unmount();
    renderWithTheme(<RdsSidebar items={items} open variant="permanent" />);
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
  });

  it('supports controlled and uncontrolled search', async () => {
    const onSearchChange = jest.fn();
    const { unmount } = renderWithTheme(
      <RdsSidebar items={items} open variant="permanent" defaultSearchValue="abc" onSearchChange={onSearchChange} />
    );
    const input = screen.getByTestId('rds-search') as HTMLInputElement;
    expect(input.value).toBe('abc');
    await userEvent.type(input, 'd');
    expect(input.value).toBe('abcd');
    expect(onSearchChange).toHaveBeenCalledWith('abcd');
    unmount();
    renderWithTheme(<RdsSidebar items={items} open variant="permanent" searchValue="fixed" />);
    const controlled = screen.getByTestId('rds-search') as HTMLInputElement;
    await userEvent.type(controlled, 'x');
    expect(controlled.value).toBe('fixed');
  });

  it('renders custom logo', () => {
    renderWithTheme(<RdsSidebar items={items} open variant="permanent" showLogo logo={<span>MyLogo</span>} />);
    expect(screen.getByText('MyLogo')).toBeInTheDocument();
    expect(screen.queryByAltText('Raaghu Design System Logo')).not.toBeInTheDocument();
  });

  it('open overrides isOpen', () => {
    renderWithTheme(<RdsSidebar items={items} open={false} isOpen />);
    expect(screen.queryByText('Home')).not.toBeInTheDocument();
  });

  it('merges className and sets aria-expanded only on parents', () => {
    const { container } = renderWithTheme(<RdsSidebar items={items} open variant="permanent" className="custom-x" />);
    expect(container.querySelector('.rds-sidebar.custom-x')).toBeInTheDocument();
    expect(screen.getByText('Home').closest('[role="button"], .MuiListItemButton-root')).not.toHaveAttribute('aria-expanded');
    expect(screen.getByText('Parent').closest('.MuiListItemButton-root')).toHaveAttribute('aria-expanded', 'false');
  });

  it('512: user.avatarSrc wins over deprecated avatarSrc', () => {
    renderWithTheme(<RdsSidebar items={items} open variant="permanent" user={{ avatarSrc: '/new.png' }} avatarSrc="/old.png" />);
    expect(screen.getByTestId('rds-avatar')).toHaveAttribute('data-src', '/new.png');
    expect(warnDeprecatedProp).toHaveBeenCalledWith('RdsSidebar', 'avatarSrc', '`user.avatarSrc`');
  });

  it('514: items[].selected marks the item and wins over active', () => {
    renderWithTheme(
      <RdsSidebar items={[{ label: 'A', selected: true }, { label: 'B', selected: false, active: true }]} open variant="permanent" />
    );
    expect(screen.getByText('A').closest('.MuiListItemButton-root')).toHaveClass('Mui-selected');
    expect(screen.getByText('B').closest('.MuiListItemButton-root')).not.toHaveClass('Mui-selected');
  });

  it('515: header and footer slots replace the default content', () => {
    renderWithTheme(
      <RdsSidebar items={items} open variant="permanent" header={<span>Head</span>} footer={<span>Foot</span>} />
    );
    expect(screen.getByText('Head').closest('.rds-sidebar__header')).toBeInTheDocument();
    expect(screen.getByText('Foot').closest('.rds-sidebar__avatar-container')).toBeInTheDocument();
    expect(screen.queryByTestId('rds-avatar')).not.toBeInTheDocument();
  });

  it('516: platform still selects the built-in menu and warns', () => {
    renderWithTheme(<RdsSidebar items={[]} open variant="permanent" platform="abp-list" />);
    expect(screen.getByText('Ticket Allocation')).toBeInTheDocument();
    expect(warnDeprecatedProp).toHaveBeenCalledWith('RdsSidebar', 'platform', '`items`');
  });

  it('517: collapsed wins over typeOf', () => {
    const { container, rerender } = renderWithTheme(<RdsSidebar items={items} open variant="permanent" collapsed typeOf="expanded" />);
    expect(container.querySelector('.rds-sidebar--collapse')).toBeInTheDocument();
    rerender(
      <ThemeProvider theme={createTheme()}>
        <RdsSidebar items={items} open variant="permanent" collapsed={false} typeOf="fixed" />
      </ThemeProvider>
    );
    expect(container.querySelector('.rds-sidebar--expanded')).toBeInTheDocument();
  });
});

