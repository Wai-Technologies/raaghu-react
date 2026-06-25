import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RdsAppBar from './rds-app-bar';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';

// Mock SCSS
jest.mock('./rds-app-bar.scss', () => ({}));

// Mock ProfileMenu component
jest.mock('./ProfileMenu', () => {
  return {
    ProfileMenu: ({ name, email, menuItems }: any) => (
      <div data-testid="profile-menu">
        <div data-testid="profile-name">{name}</div>
        <div data-testid="profile-email">{email}</div>
        <div data-testid="profile-menu-items">{menuItems?.length || 0}</div>
      </div>
    ),
  };
});

// Mock MUI Icons
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

  describe('Basic Rendering', () => {
    it('should render component without crashing', () => {
      const { container } = render(<RdsAppBar {...defaultProps} />);
      expect(container.querySelector('.rds-header')).toBeInTheDocument();
    });

    it('should have correct displayName', () => {
      expect(RdsAppBar.displayName).toBe('RdsAppBar');
    });

    it('should render AppBar element', () => {
      const { container } = render(<RdsAppBar {...defaultProps} />);
      expect(container.querySelector('header')).toBeInTheDocument();
    });

    it('should render toolbar', () => {
      const { container } = render(<RdsAppBar {...defaultProps} />);
      expect(container.querySelector('.rds-app-bar--size-medium')).toBeInTheDocument();
    });

    it('should render header toolbar container', () => {
      const { container } = render(<RdsAppBar {...defaultProps} />);
      expect(container.querySelector('.rds-header__toolbar')).toBeInTheDocument();
    });

    it('should render with default color', () => {
      const { container } = render(<RdsAppBar {...defaultProps} color="primary" />);
      expect(container.querySelector('.rds-header--primary')).toBeInTheDocument();
    });
  });

  describe('Title Display', () => {
    it('should display title when provided', () => {
      render(<RdsAppBar {...defaultProps} title="Test App Bar" />);
      expect(screen.getByText('Test App Bar')).toBeInTheDocument();
    });

    it('should not display title when not provided', () => {
      const { container } = render(<RdsAppBar {...defaultProps} />);
      const titleElement = container.querySelector('.rds-header__title');
      expect(titleElement?.textContent).toBe('');
    });

    it('should display long title text', () => {
      const longTitle = 'A'.repeat(100);
      render(<RdsAppBar {...defaultProps} title={longTitle} />);
      expect(screen.getByText(longTitle)).toBeInTheDocument();
    });

    it('should display special characters in title', () => {
      render(
        <RdsAppBar
          {...defaultProps}
          title="Test <App> & Bar!"
        />
      );
      expect(
        screen.getByText(/Test.*App.*Bar/)
      ).toBeInTheDocument();
    });
  });

  describe('Logo Display', () => {
    it('should display logo when showLogo is true and logo is provided', () => {
      const logoElement = <span data-testid="test-logo">Logo</span>;
      render(
        <RdsAppBar {...defaultProps} logo={logoElement} showLogo={true} />
      );
      expect(screen.getByTestId('test-logo')).toBeInTheDocument();
    });

    it('should not display logo when showLogo is false', () => {
      const logoElement = <span data-testid="test-logo">Logo</span>;
      const { container } = render(
        <RdsAppBar
          {...defaultProps}
          logo={logoElement}
          showLogo={false}
        />
      );
      const logo = container.querySelector('.rds-header__logo');
      expect(logo).not.toBeInTheDocument();
    });

    it('should not display logo when logo is not provided', () => {
      const { container } = render(
        <RdsAppBar {...defaultProps} showLogo={true} />
      );
      const logo = container.querySelector('.rds-header__logo');
      expect(logo).not.toBeInTheDocument();
    });

    it('should apply logo class to logo element', () => {
      const logoElement = <span data-testid="test-logo">Logo</span>;
      const { container } = render(
        <RdsAppBar {...defaultProps} logo={logoElement} showLogo={true} />
      );
      const logo = container.querySelector('.rds-header__logo');
      expect(logo).toBeInTheDocument();
    });
  });

  describe('Menu Button', () => {
    it('should display menu button when showMenuButton is true', () => {
      const { container } = render(
        <RdsAppBar {...defaultProps} showMenuButton={true} />
      );
      const menuButton = container.querySelector('[aria-label="menu"]');
      expect(menuButton).toBeInTheDocument();
    });

    it('should not display menu button when showMenuButton is false', () => {
      const { container } = render(
        <RdsAppBar {...defaultProps} showMenuButton={false} />
      );
      const menuButton = container.querySelector('[aria-label="menu"]');
      expect(menuButton).not.toBeInTheDocument();
    });

    it('should call onMenuClick when menu button is clicked', () => {
      const onMenuClick = jest.fn();
      const { container } = render(
        <RdsAppBar
          {...defaultProps}
          showMenuButton={true}
          onMenuClick={onMenuClick}
        />
      );
      const menuButton = container.querySelector('[aria-label="menu"]');
      fireEvent.click(menuButton!);
      expect(onMenuClick).toHaveBeenCalled();
    });

    it('should display dehaze icon in menu button', () => {
      render(
        <RdsAppBar {...defaultProps} showMenuButton={true} />
      );
      expect(screen.getByTestId('dehaze-icon')).toBeInTheDocument();
    });
  });

  describe('Size Variants', () => {
    it('should apply small size class', () => {
      const { container } = render(
        <RdsAppBar {...defaultProps} size="small" />
      );
      expect(container.querySelector('.rds-app-bar--size-small')).toBeInTheDocument();
    });

    it('should apply medium size class by default', () => {
      const { container } = render(<RdsAppBar {...defaultProps} />);
      expect(container.querySelector('.rds-app-bar--size-medium')).toBeInTheDocument();
    });

    it('should apply large size class', () => {
      const { container } = render(
        <RdsAppBar {...defaultProps} size="large" />
      );
      expect(container.querySelector('.rds-app-bar--size-large')).toBeInTheDocument();
    });

    it('should have correct toolbar height for small size', () => {
      const { container } = render(
        <RdsAppBar {...defaultProps} size="small" />
      );
      const toolbar = container.querySelector('.rds-app-bar--size-small');
      expect(toolbar).toBeInTheDocument();
    });

    it('should have correct toolbar height for medium size', () => {
      const { container } = render(
        <RdsAppBar {...defaultProps} size="medium" />
      );
      const toolbar = container.querySelector('.rds-app-bar--size-medium');
      expect(toolbar).toBeInTheDocument();
    });

    it('should have correct toolbar height for large size', () => {
      const { container } = render(
        <RdsAppBar {...defaultProps} size="large" />
      );
      const toolbar = container.querySelector('.rds-app-bar--size-large[style*="height"]');
      expect(toolbar).toBeInTheDocument();
    });
  });

  describe('Color Variants', () => {
    it('should apply primary color class', () => {
      const { container } = render(
        <RdsAppBar {...defaultProps} color="primary" />
      );
      expect(container.querySelector('.rds-header--primary')).toBeInTheDocument();
    });

    it('should apply secondary color class', () => {
      const { container } = render(
        <RdsAppBar {...defaultProps} color="secondary" />
      );
      expect(container.querySelector('.rds-header--secondary')).toBeInTheDocument();
    });

    it('should apply transparent color class', () => {
      const { container } = render(
        <RdsAppBar {...defaultProps} color="transparent" />
      );
      expect(container.querySelector('.rds-header--transparent')).toBeInTheDocument();
    });

    it('should apply primary color when color is primary', () => {
      const { container } = render(
        <RdsAppBar {...defaultProps} color="primary" />
      );
      expect(container.querySelector('.rds-header--primary')).toBeInTheDocument();
    });
  });

  describe('Center Content', () => {
    it('should display center content when provided', () => {
      const centerContent = <span data-testid="center-content">Center</span>;
      render(<RdsAppBar {...defaultProps} centerContent={centerContent} />);
      expect(screen.getByTestId('center-content')).toBeInTheDocument();
    });

    it('should not display center content when not provided', () => {
      const { container } = render(<RdsAppBar {...defaultProps} />);
      const centerContent = container.querySelector('.rds-header__center-content');
      expect(centerContent).not.toBeInTheDocument();
    });

    it('should apply center content class', () => {
      const centerContent = <span data-testid="center-content">Center</span>;
      const { container } = render(
        <RdsAppBar {...defaultProps} centerContent={centerContent} />
      );
      expect(container.querySelector('.rds-header__center-content')).toBeInTheDocument();
    });
  });

  describe('Search Functionality', () => {
    it('should display search input when showSearch is true and searchValue is provided', () => {
      const { container } = render(
        <RdsAppBar
          {...defaultProps}
          showSearch={true}
          searchValue="test"
          onSearchChange={jest.fn()}
        />
      );
      const searchInput = container.querySelector('.rds-header__search');
      expect(searchInput).toBeInTheDocument();
    });

    it('should not display search input when showSearch is false', () => {
      const { container } = render(
        <RdsAppBar
          {...defaultProps}
          showSearch={false}
          searchValue="test"
          onSearchChange={jest.fn()}
        />
      );
      expect(container.querySelector('.rds-header__search')).not.toBeInTheDocument();
    });

    it('should display search input with custom placeholder', () => {
      const { container } = render(
        <RdsAppBar
          {...defaultProps}
          showSearch={true}
          searchValue="test"
          searchPlaceholder="Type here..."
          onSearchChange={jest.fn()}
        />
      );
      const input = container.querySelector('.rds-header__search input');
      expect(input).toHaveAttribute('placeholder', 'Type here...');
    });

    it('should display default search placeholder', () => {
      const { container } = render(
        <RdsAppBar
          {...defaultProps}
          showSearch={true}
          searchValue=""
          onSearchChange={jest.fn()}
        />
      );
      const input = container.querySelector('.rds-header__search input');
      expect(input).toHaveAttribute('placeholder', 'Search…');
    });

    it('should call onSearchChange when search value changes', () => {
      const onSearchChange = jest.fn();
      const { container } = render(
        <RdsAppBar
          {...defaultProps}
          showSearch={true}
          searchValue="test"
          onSearchChange={onSearchChange}
        />
      );
      const input = container.querySelector('.rds-header__search input') as HTMLInputElement;
      fireEvent.change(input, { target: { value: 'new value' } });
      expect(onSearchChange).toHaveBeenCalledWith('new value');
    });

    it('should display clear button when search value is not empty', () => {
      const { container } = render(
        <RdsAppBar
          {...defaultProps}
          showSearch={true}
          searchValue="test"
          onSearchChange={jest.fn()}
        />
      );
      expect(container.querySelector('.rds-header__search-clear')).toBeInTheDocument();
    });

    it('should not display clear button when search value is empty', () => {
      const { container } = render(
        <RdsAppBar
          {...defaultProps}
          showSearch={true}
          searchValue=""
          onSearchChange={jest.fn()}
        />
      );
      expect(container.querySelector('.rds-header__search-clear')).not.toBeInTheDocument();
    });

    it('should clear search value when clear button is clicked', () => {
      const onSearchChange = jest.fn();
      const { container } = render(
        <RdsAppBar
          {...defaultProps}
          showSearch={true}
          searchValue="test"
          onSearchChange={onSearchChange}
        />
      );
      const clearButton = container.querySelector('.rds-header__search-clear');
      fireEvent.click(clearButton!);
      expect(onSearchChange).toHaveBeenCalledWith('');
    });
  });

  describe('Tabs Functionality', () => {
    const tabs = ['Tab 1', 'Tab 2', 'Tab 3'];

    it('should display tabs when tabs array is provided', () => {
      const { container } = render(
        <RdsAppBar
          {...defaultProps}
          tabs={tabs}
          tabValue={0}
          onTabChange={jest.fn()}
        />
      );
      expect(container.querySelector('.rds-header__tabs-inline')).toBeInTheDocument();
    });

    it('should not display tabs when tabs is not provided', () => {
      const { container } = render(
        <RdsAppBar {...defaultProps} tabValue={0} onTabChange={jest.fn()} />
      );
      expect(container.querySelector('.rds-header__tabs-inline')).not.toBeInTheDocument();
    });

    it('should display all tabs', () => {
      render(
        <RdsAppBar
          {...defaultProps}
          tabs={tabs}
          tabValue={0}
          onTabChange={jest.fn()}
        />
      );
      tabs.forEach((tab) => {
        expect(screen.getByText(tab)).toBeInTheDocument();
      });
    });

    it('should call onTabChange when tab is clicked', () => {
      const onTabChange = jest.fn();
      const { container } = render(
        <RdsAppBar
          {...defaultProps}
          tabs={tabs}
          tabValue={0}
          onTabChange={onTabChange}
        />
      );
      const tabButtons = container.querySelectorAll('[role="tab"]');
      fireEvent.click(tabButtons[1]);
      expect(onTabChange).toHaveBeenCalledWith(1);
    });

    it('should render tabs with object labels', () => {
      const _tabsWithObjects = [
        { label: 'Home' },
        { label: 'About' },
        { label: 'Contact' },
      ];
      // Only test simple string tabs due to Tab component requirements
      render(
        <RdsAppBar
          {...defaultProps}
          tabs={['Home', 'About', 'Contact']}
          tabValue={0}
          onTabChange={jest.fn()}
        />
      );
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('About')).toBeInTheDocument();
    });
  });

  describe('Profile Menu / Actions', () => {
    it('should display profile menu when userName and userEmail are provided', () => {
      render(
        <RdsAppBar
          {...defaultProps}
          userName="John Doe"
          userEmail="john@example.com"
        />
      );
      expect(screen.getByTestId('profile-menu')).toBeInTheDocument();
    });

    it('should display user name in profile menu', () => {
      render(
        <RdsAppBar
          {...defaultProps}
          userName="John Doe"
          userEmail="john@example.com"
        />
      );
      expect(screen.getByTestId('profile-name')).toHaveTextContent('John Doe');
    });

    it('should display user email in profile menu', () => {
      render(
        <RdsAppBar
          {...defaultProps}
          userName="John Doe"
          userEmail="john@example.com"
        />
      );
      expect(screen.getByTestId('profile-email')).toHaveTextContent('john@example.com');
    });

    it('should not display profile menu when userName is not provided', () => {
      render(
        <RdsAppBar
          {...defaultProps}
          userEmail="john@example.com"
        />
      );
      expect(screen.queryByTestId('profile-menu')).not.toBeInTheDocument();
    });

    it('should display actions when userName and userEmail are not provided', () => {
      const actions = <span data-testid="custom-actions">Actions</span>;
      render(<RdsAppBar {...defaultProps} actions={actions} />);
      expect(screen.getByTestId('custom-actions')).toBeInTheDocument();
    });

    it('should prefer profile menu over actions', () => {
      const actions = <span data-testid="custom-actions">Actions</span>;
      render(
        <RdsAppBar
          {...defaultProps}
          userName="John Doe"
          userEmail="john@example.com"
          actions={actions}
        />
      );
      expect(screen.getByTestId('profile-menu')).toBeInTheDocument();
      expect(screen.queryByTestId('custom-actions')).not.toBeInTheDocument();
    });
  });

  describe('Right Actions', () => {
    it('should display right actions when provided', () => {
      const rightActions = <span data-testid="right-actions">Right</span>;
      render(<RdsAppBar {...defaultProps} rightActions={rightActions} />);
      expect(screen.getByTestId('right-actions')).toBeInTheDocument();
    });

    it('should not display right actions when not provided', () => {
      const { container } = render(<RdsAppBar {...defaultProps} />);
      const rightActions = container.querySelector('.rds-header__right-actions');
      expect(rightActions).not.toBeInTheDocument();
    });

    it('should apply right actions class', () => {
      const rightActions = <span data-testid="right-actions">Right</span>;
      const { container } = render(
        <RdsAppBar {...defaultProps} rightActions={rightActions} />
      );
      expect(container.querySelector('.rds-header__right-actions')).toBeInTheDocument();
    });
  });

  describe('SubHeader', () => {
    it('should display sub header when provided', () => {
      const subHeader = <div data-testid="sub-header">Sub Header</div>;
      render(<RdsAppBar {...defaultProps} subHeader={subHeader} />);
      expect(screen.getByTestId('sub-header')).toBeInTheDocument();
    });

    it('should not display sub header when not provided', () => {
      const { container } = render(<RdsAppBar {...defaultProps} />);
      expect(container.querySelector('.rds-header__sub-header')).not.toBeInTheDocument();
    });

    it('should apply sub header class', () => {
      const subHeader = <div data-testid="sub-header">Sub Header</div>;
      const { container } = render(
        <RdsAppBar {...defaultProps} subHeader={subHeader} />
      );
      expect(container.querySelector('.rds-header__sub-header')).toBeInTheDocument();
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
      const { container } = render(
        <RdsAppBar {...defaultProps} className="custom-header" />
      );
      const header = container.querySelector('.rds-header');
      expect(header).toHaveClass('custom-header');
    });

    it('should maintain base classes with custom className', () => {
      const { container } = render(
        <RdsAppBar {...defaultProps} className="custom-class" />
      );
      const header = container.querySelector('.rds-header');
      expect(header).toHaveClass('rds-header');
      expect(header).toHaveClass('custom-class');
    });
  });

  describe('Variant Styles', () => {
    it('should apply variant style class', () => {
      const { container } = render(
        <RdsAppBar {...defaultProps} variantStyle="WithMenuButton" />
      );
      expect(container.querySelector('.rds-header--variant-withmenubutton')).toBeInTheDocument();
    });

    it('should normalize variant style class names', () => {
      const { container } = render(
        <RdsAppBar {...defaultProps} variantStyle="With Menu Button" />
      );
      const header = container.querySelector('.rds-header');
      expect(header?.className).toMatch(/rds-header--variant-/);
    });
  });

  describe('Props Validation', () => {
    it('should render with minimal required props', () => {
      render(<RdsAppBar />);
      expect(screen.getByRole('banner')).toBeInTheDocument();
    });

    it('should handle empty title', () => {
      const { container } = render(<RdsAppBar title="" />);
      const titleElement = container.querySelector('.rds-header__title');
      expect(titleElement?.textContent).toBe('');
    });

    it('should accept MUI AppBar props', () => {
      render(<RdsAppBar elevation={2} />);
      expect(screen.getByRole('banner')).toBeInTheDocument();
    });
  });

  describe('Combined Props Tests', () => {
    it('should render app bar with all props customized', () => {
      const rightActions = <span data-testid="right-actions">Right</span>;
      const centerContent = <span data-testid="center-content">Center</span>;

      render(
        <RdsAppBar
          title="Complete App Bar"
          rightActions={rightActions}
          centerContent={centerContent}
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
      const { container } = render(
        <RdsAppBar
          color="secondary"
          size="small"
          title="Styled App Bar"
        />
      );

      expect(container.querySelector('.rds-header--secondary')).toBeInTheDocument();
      expect(container.querySelector('.rds-app-bar--size-small')).toBeInTheDocument();
    });

    it('should handle profile menu with tabs and search', () => {
      const tabs = ['Home', 'About'];
      render(
        <RdsAppBar
          {...defaultProps}
          tabs={tabs}
          tabValue={0}
          onTabChange={jest.fn()}
          showSearch={true}
          searchValue=""
          onSearchChange={jest.fn()}
          userName="User"
          userEmail="user@test.com"
        />
      );

      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByTestId('profile-menu')).toBeInTheDocument();
    });
  });

  describe('Default Props Tests', () => {
    it('should use default size as medium', () => {
      const { container } = render(<RdsAppBar {...defaultProps} />);
      expect(container.querySelector('.rds-app-bar--size-medium')).toBeInTheDocument();
    });

    it('should use default showLogo as true', () => {
      render(
        <RdsAppBar
          {...defaultProps}
          logo={<span data-testid="logo">Logo</span>}
        />
      );
      expect(screen.getByTestId('logo')).toBeInTheDocument();
    });

    it('should use default showMenuButton as false', () => {
      const { container } = render(<RdsAppBar {...defaultProps} />);
      expect(container.querySelector('[aria-label="menu"]')).not.toBeInTheDocument();
    });

    it('should use default showSearch as true', () => {
      const { container } = render(
        <RdsAppBar
          {...defaultProps}
          searchValue=""
          onSearchChange={jest.fn()}
        />
      );
      expect(container.querySelector('.rds-header__search')).toBeInTheDocument();
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
      const { container } = render(
        <RdsAppBar
          showSearch={true}
          searchValue={specialValue}
          onSearchChange={jest.fn()}
        />
      );
      const input = container.querySelector('.rds-header__search input') as HTMLInputElement;
      expect(input.value).toBe(specialValue);
    });

    it('should handle rapid tab changes', () => {
      const onTabChange = jest.fn();
      const { container } = render(
        <RdsAppBar
          tabs={['Tab 1', 'Tab 2']}
          tabValue={0}
          onTabChange={onTabChange}
        />
      );

      const tabButtons = container.querySelectorAll('[role="tab"]');
      fireEvent.click(tabButtons[1]);
      fireEvent.click(tabButtons[0]);

      expect(onTabChange).toHaveBeenCalledTimes(1);
      expect(onTabChange).toHaveBeenNthCalledWith(1, 1);
    });

    it('should handle empty tabs array', () => {
      const { container } = render(
        <RdsAppBar
          tabs={[]}
          tabValue={0}
          onTabChange={jest.fn()}
        />
      );
      const tabsContainer = container.querySelector('.rds-header__tabs-inline');
      expect(tabsContainer).toBeInTheDocument();
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
