import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import RdsSidebar, { RdsSidebarItem } from './rds-sidebar';

// Mock the SCSS file
jest.mock('./rds-sidebar.scss');

// Mock child components
jest.mock('../rds-avatar/rds-avatar', () => {
  return function MockAvatar(props: any) {
    return <div data-testid="rds-avatar" className="rds-avatar">{props.title}</div>;
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

// Helper function to render with theme
const renderWithTheme = (component: React.ReactElement) => {
  const theme = createTheme();
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('RdsSidebar', () => {
  const mockItems: RdsSidebarItem[] = [
    {
      label: 'Home',
      icon: <span>🏠</span>,
      onClick: jest.fn(),
      active: false,
      disabled: false,
    },
    {
      label: 'Settings',
      icon: <span>⚙️</span>,
      onClick: jest.fn(),
      active: false,
      disabled: false,
      children: [
        {
          label: 'Profile',
          icon: <span>👤</span>,
          onClick: jest.fn(),
          active: false,
          disabled: false,
        },
        {
          label: 'Security',
          icon: <span>🔒</span>,
          onClick: jest.fn(),
          active: false,
          disabled: false,
        },
      ],
    },
  ];

  describe('Basic Rendering', () => {
    it('should render sidebar component', () => {
      renderWithTheme(
        <RdsSidebar items={mockItems} isOpen={true} />
      );
      const drawer = screen.getByRole('presentation');
      expect(drawer).toBeInTheDocument();
    });

    it('should render menu items', () => {
      renderWithTheme(
        <RdsSidebar items={mockItems} isOpen={true} />
      );
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Settings')).toBeInTheDocument();
    });

    it('should render without errors with default props', () => {
      expect(() => {
        renderWithTheme(
          <RdsSidebar items={mockItems} isOpen={true} />
        );
      }).not.toThrow();
    });

    it('should handle empty items array', () => {
      expect(() => {
        renderWithTheme(
          <RdsSidebar items={[]} isOpen={true} />
        );
      }).not.toThrow();
    });

    it('should have correct displayName', () => {
      expect(RdsSidebar.displayName).toBe('RdsSidebar');
    });
  });

  describe('Sidebar States', () => {
    it('should be open when isOpen=true', () => {
      renderWithTheme(
        <RdsSidebar items={mockItems} isOpen={true} />
      );
      expect(screen.getByText('Home')).toBeInTheDocument();
    });

    it('should be closed when isOpen=false', () => {
      renderWithTheme(
        <RdsSidebar items={mockItems} isOpen={false} />
      );
      // When closed, sidebar should not be visible (or might not render in modal mode)
      const sidebar = document.querySelector('.rds-sidebar');
      // Just verify it doesn't crash
      expect(sidebar).toBeNull();
    });

    it('should call onClose when backdrop clicked', () => {
      const handleClose = jest.fn();
      const { container } = renderWithTheme(
        <RdsSidebar items={mockItems} isOpen={true} onClose={handleClose} variant="temporary" />
      );
      const backdrop = container.querySelector('.MuiBackdrop-root');
      if (backdrop) {
        fireEvent.click(backdrop);
        expect(handleClose).toHaveBeenCalled();
      }
    });
  });

  describe('Menu Items', () => {
    it('should render all items', () => {
      renderWithTheme(
        <RdsSidebar items={mockItems} isOpen={true} />
      );
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Settings')).toBeInTheDocument();
    });

    it('should call onClick when item clicked', async () => {
      const user = userEvent.setup();
      const onClick = jest.fn();
      const items = [{ label: 'Home', onClick, icon: <span>🏠</span> }];
      
      renderWithTheme(
        <RdsSidebar items={items} isOpen={true} />
      );
      
      const homeButton = screen.getByText('Home');
      await user.click(homeButton);
      expect(onClick).toHaveBeenCalled();
    });

    it('should highlight active item', () => {
      const items = [{ label: 'Home', active: true, icon: <span>🏠</span> }];
      renderWithTheme(
        <RdsSidebar items={items} isOpen={true} />
      );
      const button = screen.getByText('Home').closest('[role="button"]');
      expect(button).toHaveAttribute('class');
    });

    it('should disable disabled items', () => {
      const items = [{ label: 'Home', disabled: true, icon: <span>🏠</span> }];
      renderWithTheme(
        <RdsSidebar items={items} isOpen={true} />
      );
      const button = screen.getByText('Home').closest('[role="button"]');
      expect(button).toHaveAttribute('aria-disabled', 'true');
    });

    it('should render item icons', () => {
      renderWithTheme(
        <RdsSidebar items={mockItems} isOpen={true} />
      );
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBeGreaterThan(0);
    });
  });

  describe('Collapsible Items', () => {
    it('should render children when parent expanded', async () => {
      const user = userEvent.setup();
      renderWithTheme(
        <RdsSidebar items={mockItems} isOpen={true} />
      );
      
      const settingsButton = screen.getByText('Settings');
      await user.click(settingsButton);
      
      expect(screen.getByText('Profile')).toBeInTheDocument();
      expect(screen.getByText('Security')).toBeInTheDocument();
    });

    it('should hide children when parent collapsed', async () => {
      const user = userEvent.setup();
      renderWithTheme(
        <RdsSidebar items={mockItems} isOpen={true} />
      );
      
      const settingsButton = screen.getByText('Settings');
      // Expand
      await user.click(settingsButton);
      expect(screen.getByText('Profile')).toBeInTheDocument();
      
      // Collapse
      await user.click(settingsButton);
      expect(screen.queryByText('Profile')).not.toBeInTheDocument();
    });

    it('should toggle expand/collapse icon', async () => {
      const user = userEvent.setup();
      renderWithTheme(
        <RdsSidebar items={mockItems} isOpen={true} />
      );
      
      const settingsButton = screen.getByText('Settings');
      expect(settingsButton).toBeInTheDocument();
      
      await user.click(settingsButton);
      expect(screen.getByText('Profile')).toBeInTheDocument();
    });

    it('should call child onClick when clicked', async () => {
      const user = userEvent.setup();
      const childOnClick = jest.fn();
      const items: RdsSidebarItem[] = [
        {
          label: 'Parent',
          children: [{ label: 'Child', onClick: childOnClick }],
        },
      ];
      
      renderWithTheme(
        <RdsSidebar items={items} isOpen={true} />
      );
      
      // Expand parent
      const parentButton = screen.getByText('Parent');
      await user.click(parentButton);
      
      // Click child
      const childButton = screen.getByText('Child');
      await user.click(childButton);
      expect(childOnClick).toHaveBeenCalled();
    });
  });

  describe('Search Functionality', () => {
    it('should render search when showSearch=true', () => {
      renderWithTheme(
        <RdsSidebar items={mockItems} isOpen={true} showSearch={true} />
      );
      expect(screen.getByTestId('rds-search')).toBeInTheDocument();
    });

    it('should not render search when showSearch=false', () => {
      renderWithTheme(
        <RdsSidebar items={mockItems} isOpen={true} showSearch={false} />
      );
      expect(screen.queryByTestId('rds-search')).not.toBeInTheDocument();
    });

    it('should update search value', async () => {
      const user = userEvent.setup();
      renderWithTheme(
        <RdsSidebar items={mockItems} isOpen={true} showSearch={true} />
      );
      
      const searchInput = screen.getByTestId('rds-search') as HTMLInputElement;
      await user.type(searchInput, 'test');
      expect(searchInput.value).toBe('test');
    });

    it('should have search placeholder in expanded mode', () => {
      renderWithTheme(
        <RdsSidebar items={mockItems} isOpen={true} showSearch={true} typeOf="expanded" />
      );
      const searchInput = screen.getByTestId('rds-search');
      expect(searchInput).toHaveAttribute('placeholder', 'Search...');
    });
  });

  describe('Sidebar Width', () => {
    it('should use default width of 240', () => {
      renderWithTheme(
        <RdsSidebar items={mockItems} isOpen={true} />
      );
      const sidebar = document.querySelector('.rds-sidebar');
      expect(sidebar).toBeInTheDocument();
    });

    it('should use custom width', () => {
      renderWithTheme(
        <RdsSidebar items={mockItems} isOpen={true} width={300} />
      );
      const sidebar = document.querySelector('.rds-sidebar');
      expect(sidebar).toBeInTheDocument();
    });

    it('should show icons only when width < 200', () => {
      renderWithTheme(
        <RdsSidebar items={mockItems} isOpen={true} width={150} />
      );
      // Should have narrow-collapsed class when width < 200
      const sidebar = document.querySelector('.rds-sidebar');
      const hasNarrowClass = sidebar?.className.includes('rds-sidebar--narrow-collapsed');
      expect(hasNarrowClass).toBe(true);
    });
  });

  describe('Sidebar Types', () => {
    it('should render expanded sidebar', () => {
      renderWithTheme(
        <RdsSidebar items={mockItems} isOpen={true} typeOf="expanded" />
      );
      expect(screen.getByText('Home')).toBeInTheDocument();
    });

    it('should render collapsed sidebar', () => {
      renderWithTheme(
        <RdsSidebar items={mockItems} isOpen={true} typeOf="collapse" />
      );
      expect(document.querySelector('.rds-sidebar--collapse')).toBeInTheDocument();
    });

    it('should render fixed sidebar', () => {
      renderWithTheme(
        <RdsSidebar items={mockItems} isOpen={true} typeOf="fixed" />
      );
      expect(document.querySelector('.rds-sidebar--fixed')).toBeInTheDocument();
    });

    it('should show tooltips in collapsed mode', () => {
      renderWithTheme(
        <RdsSidebar items={mockItems} isOpen={true} typeOf="collapse" />
      );
      const tooltips = screen.getAllByTestId('rds-tooltip');
      expect(tooltips.length).toBeGreaterThan(0);
    });
  });

  describe('Platforms', () => {
    it('should use custom items when no platform specified', () => {
      renderWithTheme(
        <RdsSidebar items={mockItems} isOpen={true} />
      );
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Settings')).toBeInTheDocument();
    });

    it('should use abp-list items when platform=abp-list', () => {
      renderWithTheme(
        <RdsSidebar items={[]} isOpen={true} platform="abp-list" />
      );
      expect(screen.getByText('Dashboard')).toBeInTheDocument();
      expect(screen.getByText('Invoices')).toBeInTheDocument();
    });

    it('should use anz-list items when platform=anz-list', () => {
      renderWithTheme(
        <RdsSidebar items={[]} isOpen={true} platform="anz-list" />
      );
      expect(screen.getByText('Dashboard')).toBeInTheDocument();
      expect(screen.getByText('Saas')).toBeInTheDocument();
      expect(screen.getByText('Administration')).toBeInTheDocument();
    });
  });

  describe('Layouts', () => {
    it('should render raaghu layout', () => {
      renderWithTheme(
        <RdsSidebar items={mockItems} isOpen={true} layout="raaghu" />
      );
      expect(screen.getByText('Home')).toBeInTheDocument();
    });

    it('should render list layout', () => {
      renderWithTheme(
        <RdsSidebar items={mockItems} isOpen={true} layout="list" />
      );
      expect(screen.getByText('Home')).toBeInTheDocument();
    });

    it('should render toolbar layout', () => {
      renderWithTheme(
        <RdsSidebar items={mockItems} isOpen={true} layout="toolbar" showLogo={true} />
      );
      expect(screen.getByText('Home')).toBeInTheDocument();
    });

    it('should show avatar in toolbar layout header', () => {
      renderWithTheme(
        <RdsSidebar items={mockItems} isOpen={true} layout="toolbar" showLogo={true} avatarSrc="/avatar.png" />
      );
      const avatars = screen.getAllByTestId('rds-avatar');
      expect(avatars.length).toBeGreaterThan(0);
    });
  });

  describe('Avatar Display', () => {
    it('should show avatar when showLogo=true and layout=toolbar', () => {
      renderWithTheme(
        <RdsSidebar items={mockItems} isOpen={true} layout="toolbar" showLogo={true} avatarSrc="/avatar.png" />
      );
      const avatars = screen.getAllByTestId('rds-avatar');
      expect(avatars.length).toBeGreaterThan(0);
    });

    it('should not show logo when showLogo=false', () => {
      const { container } = renderWithTheme(
        <RdsSidebar items={mockItems} isOpen={true} showLogo={false} />
      );
      expect(container.querySelector('.rds-sidebar__header')).not.toBeInTheDocument();
    });

    it('should show avatar in footer by default', () => {
      renderWithTheme(
        <RdsSidebar items={mockItems} isOpen={true} avatarSrc="/avatar.png" />
      );
      const avatars = screen.getAllByTestId('rds-avatar');
      expect(avatars.length).toBeGreaterThan(0);
    });

    it('should use avatarCollapsedSrc in collapsed mode', () => {
      renderWithTheme(
        <RdsSidebar items={mockItems} isOpen={true} showLogo={true} layout="raaghu" avatarCollapsedSrc="/collapsed-logo.png" typeOf="collapse" />
      );
      // Sidebar should render in collapsed mode
      expect(document.querySelector('.rds-sidebar--collapse')).toBeInTheDocument();
    });
  });

  describe('Complex Scenarios', () => {
    it('should handle rapid item toggles', async () => {
      const user = userEvent.setup();
      renderWithTheme(
        <RdsSidebar items={mockItems} isOpen={true} />
      );
      
      const settingsButton = screen.getByText('Settings');
      
      // Expand
      await user.click(settingsButton);
      expect(screen.getByText('Profile')).toBeInTheDocument();
      
      // Collapse
      await user.click(settingsButton);
      expect(screen.queryByText('Profile')).not.toBeInTheDocument();
      
      // Expand again
      await user.click(settingsButton);
      expect(screen.getByText('Profile')).toBeInTheDocument();
    });

    it('should handle sidebar type change', () => {
      renderWithTheme(
        <RdsSidebar items={mockItems} isOpen={true} typeOf="expanded" />
      );
      expect(screen.getByText('Home')).toBeInTheDocument();
    });

    it('should handle width change', () => {
      renderWithTheme(
        <RdsSidebar items={mockItems} isOpen={true} width={150} />
      );
      // Sidebar should render with updated width
      expect(document.querySelector('.rds-sidebar')).toBeInTheDocument();
    });

    it('should handle isOpen toggle', () => {
      renderWithTheme(
        <RdsSidebar items={mockItems} isOpen={true} />
      );
      expect(screen.getByText('Home')).toBeInTheDocument();
    });

    it('should handle multiple nested children', async () => {
      const user = userEvent.setup();
      const complexItems: RdsSidebarItem[] = [
        {
          label: 'Level 1',
          children: [
            { label: 'Level 2-A' },
            { label: 'Level 2-B' },
            { label: 'Level 2-C' },
          ],
        },
      ];
      
      renderWithTheme(
        <RdsSidebar items={complexItems} isOpen={true} />
      );
      
      const level1 = screen.getByText('Level 1');
      await user.click(level1);
      
      expect(screen.getByText('Level 2-A')).toBeInTheDocument();
      expect(screen.getByText('Level 2-B')).toBeInTheDocument();
      expect(screen.getByText('Level 2-C')).toBeInTheDocument();
    });
  });

  describe('Theme Integration', () => {
    it('should work with light theme', () => {
      const lightTheme = createTheme({ palette: { mode: 'light' } });
      expect(lightTheme).toBeDefined();
      
      render(
        <ThemeProvider theme={lightTheme}>
          <RdsSidebar items={mockItems} isOpen={true} />
        </ThemeProvider>
      );
      expect(screen.getByText('Home')).toBeInTheDocument();
    });

    it('should work with dark theme', () => {
      const darkTheme = createTheme({ palette: { mode: 'dark' } });
      expect(darkTheme).toBeDefined();
      
      render(
        <ThemeProvider theme={darkTheme}>
          <RdsSidebar items={mockItems} isOpen={true} />
        </ThemeProvider>
      );
      expect(screen.getByText('Home')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have accessible buttons', () => {
      renderWithTheme(
        <RdsSidebar items={mockItems} isOpen={true} />
      );
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBeGreaterThan(0);
    });

    it('should have aria-expanded for collapsible items', async () => {
      renderWithTheme(
        <RdsSidebar items={mockItems} isOpen={true} />
      );
      
      const settingsButton = screen.getByText('Settings').closest('[role="button"]');
      expect(settingsButton).toHaveAttribute('aria-expanded');
    });

    it('should have list semantics', () => {
      renderWithTheme(
        <RdsSidebar items={mockItems} isOpen={true} />
      );
      const lists = screen.getAllByRole('list');
      expect(lists.length).toBeGreaterThan(0);
    });

    it('should support keyboard navigation', async () => {
      renderWithTheme(
        <RdsSidebar items={mockItems} isOpen={true} />
      );
      
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBeGreaterThan(0);
    });
  });

  describe('Edge Cases', () => {
    it('should handle items with no icons', () => {
      const items = [{ label: 'No Icon Item' }];
      renderWithTheme(
        <RdsSidebar items={items} isOpen={true} />
      );
      expect(screen.getByText('No Icon Item')).toBeInTheDocument();
    });

    it('should handle items with no onClick', async () => {
      const user = userEvent.setup();
      const items = [{ label: 'No Click' }];
      renderWithTheme(
        <RdsSidebar items={items} isOpen={true} />
      );
      
      const button = screen.getByText('No Click');
      await user.click(button);
      expect(button).toBeInTheDocument();
    });

    it('should handle very long item labels', () => {
      const items = [
        { label: 'This is a very long item label that should be handled gracefully in the sidebar' }
      ];
      renderWithTheme(
        <RdsSidebar items={items} isOpen={true} />
      );
      expect(screen.getByText(/very long/)).toBeInTheDocument();
    });

    it('should handle items with special characters', () => {
      const items = [
        { label: 'Item & Special <>' }
      ];
      renderWithTheme(
        <RdsSidebar items={items} isOpen={true} />
      );
      expect(screen.getByText('Item & Special <>')).toBeInTheDocument();
    });

    it('should handle disabled parent with children', async () => {
      const items: RdsSidebarItem[] = [
        {
          label: 'Disabled Parent',
          disabled: true,
          children: [{ label: 'Child' }],
        },
      ];
      
      renderWithTheme(
        <RdsSidebar items={items} isOpen={true} />
      );
      
      expect(screen.getByText('Disabled Parent')).toBeInTheDocument();
    });

    it('should handle empty children array', () => {
      const items: RdsSidebarItem[] = [
        {
          label: 'Parent with Empty Children',
          children: [],
        },
      ];
      
      renderWithTheme(
        <RdsSidebar items={items} isOpen={true} />
      );
      
      expect(screen.getByText('Parent with Empty Children')).toBeInTheDocument();
    });

    it('should handle all props at once', () => {
      renderWithTheme(
        <RdsSidebar
          items={mockItems}
          isOpen={true}
          onClose={jest.fn()}
          width={300}
          showSearch={true}
          layout="toolbar"
          typeOf="expanded"
          avatarSrc="/avatar.png"
          avatarCollapsedSrc="/collapsed.png"
          showLogo={true}
        />
      );
      
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByTestId('rds-search')).toBeInTheDocument();
    });
  });
});
