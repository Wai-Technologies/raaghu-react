import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import RdsHeader, { RdsHeaderProps } from './rds-header';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';

// Mock SCSS
jest.mock('./rds-header.scss', () => ({}));

// Mock ProfileMenu component
jest.mock('./ProfileMenu', () => {
  return {
    ProfileMenu: (props: any) => (
      <div data-testid="profile-menu-mock">
        <span>{props.name}</span>
        <span>{props.email}</span>
      </div>
    ),
  };
});

// Mock MUI Icons
jest.mock('@mui/icons-material/Menu', () => {
  return function DummyIcon(props: any) {
    return <span data-testid="menu-icon" {...props} />;
  };
});

jest.mock('@mui/icons-material/Clear', () => {
  return function DummyIcon(props: any) {
    return <span data-testid="clear-icon" {...props} />;
  };
});

jest.mock('@mui/icons-material/Logout', () => {
  return function DummyIcon(props: any) {
    return <span data-testid="logout-icon" {...props} />;
  };
});

jest.mock('@mui/icons-material/Person', () => {
  return function DummyIcon(props: any) {
    return <span data-testid="person-icon" {...props} />;
  };
});

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

describe('RdsHeader', () => {
  const defaultProps: RdsHeaderProps = {
    title: 'Test Header',
  };

  describe('Basic Rendering', () => {
    it('should render component without crashing', () => {
      const { container } = renderWithTheme(
        <RdsHeader {...defaultProps} />
      );
      expect(container).toBeInTheDocument();
    });

    it('should have correct displayName', () => {
      expect(RdsHeader.displayName).toBe('RdsHeader');
    });

    it('should render MuiAppBar component', () => {
      const { container } = renderWithTheme(
        <RdsHeader {...defaultProps} />
      );
      expect(container.querySelector('.MuiAppBar-root')).toBeInTheDocument();
    });

    it('should render toolbar wrapper', () => {
      const { container } = renderWithTheme(
        <RdsHeader {...defaultProps} />
      );
      expect(container.querySelector('.rds-header__toolbar')).toBeInTheDocument();
    });
  });

  describe('Title Rendering', () => {
    it('should render title when provided', () => {
      renderWithTheme(<RdsHeader title="My Header" />);
      expect(screen.getByText('My Header')).toBeInTheDocument();
    });

    it('should render title without crashing when not provided', () => {
      const { container } = renderWithTheme(<RdsHeader />);
      expect(container.querySelector('.rds-header__title')).toBeInTheDocument();
    });

    it('should update title when prop changes', () => {
      const { rerender } = renderWithTheme(
        <RdsHeader title="First Title" />
      );
      expect(screen.getByText('First Title')).toBeInTheDocument();

      rerender(
        <ThemeProvider theme={createTheme()}>
          <RdsHeader title="Second Title" />
        </ThemeProvider>
      );
      expect(screen.getByText('Second Title')).toBeInTheDocument();
    });
  });

  describe('Logo Rendering', () => {
    it('should render logo when provided', () => {
      renderWithTheme(
        <RdsHeader logo={<img alt="logo" src="logo.png" />} />
      );
      expect(screen.getByAltText('logo')).toBeInTheDocument();
    });

    it('should not render logo when not provided', () => {
      const { container } = renderWithTheme(
        <RdsHeader title="Header" />
      );
      const logoSpan = container.querySelector('.rds-header__logo');
      expect(logoSpan).not.toBeInTheDocument();
    });

    it('should render custom logo component', () => {
      const LogoComponent = () => <div data-testid="custom-logo">Logo</div>;
      renderWithTheme(<RdsHeader logo={<LogoComponent />} />);
      expect(screen.getByTestId('custom-logo')).toBeInTheDocument();
    });
  });

  describe('Menu Button', () => {
    it('should not show menu button by default', () => {
      const { container } = renderWithTheme(
        <RdsHeader title="Header" />
      );
      const buttons = container.querySelectorAll('button');
      expect(buttons.length).toBe(0);
    });

    it('should show menu button when showMenuButton is true', () => {
      renderWithTheme(
        <RdsHeader title="Header" showMenuButton={true} />
      );
      const menuIcon = screen.getByTestId('menu-icon');
      expect(menuIcon).toBeInTheDocument();
    });

    it('should call onMenuClick when menu button is clicked', () => {
      const onMenuClick = jest.fn();
      const { container } = renderWithTheme(
        <RdsHeader
          title="Header"
          showMenuButton={true}
          onMenuClick={onMenuClick}
        />
      );
      const button = container.querySelector('button');
      if (button) {
        fireEvent.click(button);
        expect(onMenuClick).toHaveBeenCalled();
      }
    });
  });

  describe('Search Functionality', () => {
    it('should render search input when searchValue and onSearchChange are provided', () => {
      const { container } = renderWithTheme(
        <RdsHeader
          title="Header"
          searchValue=""
          onSearchChange={() => {}}
          searchPlaceholder="Search..."
        />
      );
      const searchInput = container.querySelector(
        '.rds-header__search input'
      ) as HTMLInputElement;
      expect(searchInput).toBeInTheDocument();
    });

    it('should use custom search placeholder', () => {
      const { container } = renderWithTheme(
        <RdsHeader
          title="Header"
          searchValue=""
          onSearchChange={() => {}}
          searchPlaceholder="Custom Search"
        />
      );
      const searchInput = container.querySelector(
        '.rds-header__search input'
      ) as HTMLInputElement;
      expect(searchInput?.placeholder).toBe('Custom Search');
    });

    it('should call onSearchChange when search input changes', () => {
      const onSearchChange = jest.fn();
      const { container } = renderWithTheme(
        <RdsHeader
          title="Header"
          searchValue=""
          onSearchChange={onSearchChange}
        />
      );
      const searchInput = container.querySelector(
        '.rds-header__search input'
      ) as HTMLInputElement;
      fireEvent.change(searchInput, { target: { value: 'test' } });
      expect(onSearchChange).toHaveBeenCalledWith('test');
    });

    it('should show clear button when search has value', () => {
      const { container } = renderWithTheme(
        <RdsHeader
          title="Header"
          searchValue="test query"
          onSearchChange={() => {}}
        />
      );
      const clearButton = container.querySelector('.rds-header__search-clear');
      expect(clearButton).toBeInTheDocument();
    });

    it('should hide clear button when search is empty', () => {
      const { container } = renderWithTheme(
        <RdsHeader
          title="Header"
          searchValue=""
          onSearchChange={() => {}}
        />
      );
      const clearButton = container.querySelector('.rds-header__search-clear');
      expect(clearButton).not.toBeInTheDocument();
    });

    it('should clear search when clear button is clicked', () => {
      const onSearchChange = jest.fn();
      const { container } = renderWithTheme(
        <RdsHeader
          title="Header"
          searchValue="test"
          onSearchChange={onSearchChange}
        />
      );
      const clearButton = container.querySelector(
        '.rds-header__search-clear'
      ) as HTMLElement;
      fireEvent.click(clearButton);
      expect(onSearchChange).toHaveBeenCalledWith('');
    });
  });

  describe('Tabs Functionality', () => {
    it('should render tabs when provided', () => {
      renderWithTheme(
        <RdsHeader
          title="Header"
          tabs={['Home', 'About', 'Contact']}
          tabValue={0}
          onTabChange={() => {}}
        />
      );
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('About')).toBeInTheDocument();
      expect(screen.getByText('Contact')).toBeInTheDocument();
    });

    it('should not render tabs when not provided', () => {
      const { container } = renderWithTheme(
        <RdsHeader title="Header" />
      );
      const tabs = container.querySelectorAll('.MuiTab-root');
      expect(tabs.length).toBe(0);
    });

    it('should call onTabChange when tab is clicked', () => {
      const onTabChange = jest.fn();
      renderWithTheme(
        <RdsHeader
          title="Header"
          tabs={['Tab1', 'Tab2']}
          tabValue={0}
          onTabChange={onTabChange}
        />
      );
      const tabs = screen.getAllByRole('tab');
      fireEvent.click(tabs[1]);
      expect(onTabChange).toHaveBeenCalled();
    });

    it('should render tabs with complex objects', () => {
      renderWithTheme(
        <RdsHeader
          title="Header"
          tabs={[
            { label: 'Dashboard' },
            { label: 'Profile' },
            { label: 'Settings' },
          ]}
          tabValue={0}
          onTabChange={() => {}}
        />
      );
      expect(screen.getByText('Dashboard')).toBeInTheDocument();
      expect(screen.getByText('Profile')).toBeInTheDocument();
      expect(screen.getByText('Settings')).toBeInTheDocument();
    });
  });

  describe('Profile Menu', () => {
    it('should render ProfileMenu when user info is provided', () => {
      renderWithTheme(
        <RdsHeader
          title="Header"
          userName="John Doe"
          userShortName="JD"
          userEmail="john@example.com"
        />
      );
      expect(screen.getByTestId('profile-menu-mock')).toBeInTheDocument();
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('john@example.com')).toBeInTheDocument();
    });

    it('should not render ProfileMenu when user info is missing', () => {
      renderWithTheme(
        <RdsHeader
          title="Header"
          userName="John Doe"
          userEmail="john@example.com"
        />
      );
      expect(screen.queryByTestId('profile-menu-mock')).not.toBeInTheDocument();
    });

    it('should render actions when user info is not provided', () => {
      renderWithTheme(
        <RdsHeader
          title="Header"
          actions={<button>Custom Action</button>}
        />
      );
      expect(screen.getByText('Custom Action')).toBeInTheDocument();
    });
  });

  describe('Color Variants', () => {
    it('should apply primary color class', () => {
      const { container } = renderWithTheme(
        <RdsHeader title="Header" color="primary" />
      );
      const header = container.querySelector('.rds-header');
      expect(header).toHaveClass('rds-header--primary');
    });

    it('should apply secondary color class', () => {
      const { container } = renderWithTheme(
        <RdsHeader title="Header" color="secondary" />
      );
      const header = container.querySelector('.rds-header');
      expect(header).toHaveClass('rds-header--secondary');
    });

    it('should apply transparent color class', () => {
      const { container } = renderWithTheme(
        <RdsHeader title="Header" color="transparent" />
      );
      const header = container.querySelector('.rds-header');
      expect(header).toHaveClass('rds-header--transparent');
    });

    it('should not apply color class for default color', () => {
      const { container } = renderWithTheme(
        <RdsHeader title="Header" color="default" />
      );
      const header = container.querySelector('.rds-header');
      expect(header).not.toHaveClass('rds-header--primary');
      expect(header).not.toHaveClass('rds-header--secondary');
    });
  });

  describe('Sub Header', () => {
    it('should render subHeader when provided', () => {
      renderWithTheme(
        <RdsHeader
          title="Header"
          subHeader={<div>Sub Header Content</div>}
        />
      );
      expect(screen.getByText('Sub Header Content')).toBeInTheDocument();
    });

    it('should not render subHeader when not provided', () => {
      const { container } = renderWithTheme(
        <RdsHeader title="Header" />
      );
      const subHeader = container.querySelector('.rds-header__sub-header');
      expect(subHeader).not.toBeInTheDocument();
    });
  });

  describe('Children', () => {
    it('should render children content', () => {
      renderWithTheme(
        <RdsHeader title="Header">
          <div>Custom Child Content</div>
        </RdsHeader>
      );
      expect(screen.getByText('Custom Child Content')).toBeInTheDocument();
    });

    it('should render multiple children', () => {
      renderWithTheme(
        <RdsHeader title="Header">
          <span>Child 1</span>
          <span>Child 2</span>
        </RdsHeader>
      );
      expect(screen.getByText('Child 1')).toBeInTheDocument();
      expect(screen.getByText('Child 2')).toBeInTheDocument();
    });
  });

  describe('Custom Props', () => {
    it('should pass className to header', () => {
      const { container } = renderWithTheme(
        <RdsHeader title="Header" className="custom-header" />
      );
      const header = container.querySelector('.rds-header');
      expect(header).toHaveClass('custom-header');
    });

    it('should handle position prop', () => {
      const { container } = renderWithTheme(
        <RdsHeader title="Header" position="fixed" />
      );
      const appBar = container.querySelector('.MuiAppBar-root');
      expect(appBar).toHaveClass('MuiAppBar-positionFixed');
    });

    it('should handle elevation prop', () => {
      const { container } = renderWithTheme(
        <RdsHeader title="Header" elevation={4} />
      );
      const appBar = container.querySelector('.MuiAppBar-root');
      expect(appBar).toBeInTheDocument();
    });
  });

  describe('Theme Integration', () => {
    it('should render with light theme', () => {
      const { container } = renderWithTheme(
        <RdsHeader title="Header" />,
        false
      );
      expect(container).toBeInTheDocument();
    });

    it('should render with dark theme', () => {
      const { container } = renderWithTheme(
        <RdsHeader title="Header" />,
        true
      );
      expect(container).toBeInTheDocument();
    });
  });

  describe('Complex Scenarios', () => {
    it('should render header with all features', () => {
      renderWithTheme(
        <RdsHeader
          title="Full Featured Header"
          logo={<div>Logo</div>}
          showMenuButton={true}
          searchValue="search term"
          onSearchChange={() => {}}
          tabs={['Tab1', 'Tab2']}
          tabValue={0}
          onTabChange={() => {}}
          actions={<button>Action</button>}
          subHeader={<div>Sub Header</div>}
          color="primary"
        >
          <span>Children</span>
        </RdsHeader>
      );
      expect(screen.getByText('Full Featured Header')).toBeInTheDocument();
      expect(screen.getByText('Logo')).toBeInTheDocument();
      expect(screen.getByDisplayValue('search term')).toBeInTheDocument();
      expect(screen.getByText('Tab1')).toBeInTheDocument();
      expect(screen.getByText('Sub Header')).toBeInTheDocument();
      expect(screen.getByText('Children')).toBeInTheDocument();
    });

    it('should handle menu click with search and tabs', () => {
      const onMenuClick = jest.fn();
      const onSearchChange = jest.fn();
      const onTabChange = jest.fn();

      const { container } = renderWithTheme(
        <RdsHeader
          title="Header"
          showMenuButton={true}
          onMenuClick={onMenuClick}
          searchValue=""
          onSearchChange={onSearchChange}
          tabs={['A', 'B']}
          tabValue={0}
          onTabChange={onTabChange}
        />
      );

      const button = container.querySelector('button');
      if (button) {
        fireEvent.click(button);
        expect(onMenuClick).toHaveBeenCalled();
      }
    });
  });

  describe('Accessibility', () => {
    it('has no axe accessibility violations', async () => {
      const { container } = render(<RdsHeader {...defaultProps} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
