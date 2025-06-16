import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompTopNavigation from '../src/rds-comp-top-navigation/rds-comp-top-navigation';

// Mock the required modules
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock('../src/rds-comp-profile/rds-comp-profile', () => {
  return function MockRdsCompProfile(props: any) {
    return (
      <div data-testid="rds-comp-profile">
        <div>{props.userName}</div>
        <div>{props.userEmail}</div>
        <div>{props.userRole}</div>
        <button onClick={props.onLogout}>Logout</button>
        {props.isImpersonation && (
          <button onClick={props.backToMyAccount}>Back to My Account</button>
        )}
        {props.navtabItems?.map((item: any, index: number) => (
          <div key={index} onClick={() => props.onProfileLink(item.id, item.navigateTo, item.label)}>
            {item.label}
          </div>
        ))}
      </div>
    );
  };
});

jest.mock('../src/rds-elements', () => ({
  RdsIcon: ({ name, onClick, ...props }: any) => (
    <div data-testid={`rds-icon-${name}`} onClick={onClick} {...props}>
      {name}
    </div>
  ),
  RdsOffcanvas: ({ children, offcanvasbutton, ...props }: any) => (
    <div data-testid="rds-offcanvas" {...props}>
      {offcanvasbutton}
      {children}
    </div>
  ),
  RdsBreadcrumb: ({ breadcrumbItems, ...props }: any) => (
    <div data-testid="rds-breadcrumb" {...props}>
      {breadcrumbItems?.map((item: any, index: number) => (
        <span key={index}>{item.label}</span>
      ))}
    </div>
  ),
  RdsDropdownList: ({ listItems, onClick, placeholder, id, ...props }: any) => (
    <div data-testid={`rds-dropdown-${id}`} {...props}>
      <select onChange={(e) => onClick && onClick(e, e.target.value)}>
        <option value="">{placeholder}</option>
        {listItems?.map((item: any, index: number) => (
          <option key={index} value={item.val || item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  ),
  RdsSearch: (props: any) => (
    <input data-testid="rds-search" placeholder={props.placeholder} {...props} />
  ),
  RdsAvatar: (props: any) => (
    <div data-testid="rds-avatar" {...props}>
      {props.firstName} {props.lastName}
    </div>
  ),
}));

// Mock window.location properly for Jest
delete (window as any).location;
window.location = {
  pathname: '/test-path',
  search: '',
  hash: '',
  href: 'http://localhost/test-path',
  hostname: 'localhost',
  origin: 'http://localhost',
  protocol: 'http:',
  port: '',
  host: 'localhost',
  assign: jest.fn(),
  replace: jest.fn(),
  reload: jest.fn(),
} as any;

describe('RdsCompTopNavigation Component', () => {  const defaultProps = {
    style: 'Default',
    themeItems: [
      { id: 0, label: 'Light', val: 'Light' },
      { id: 1, label: 'Dark', val: 'Dark' },
    ],
    toggleItems: [],
    elementList: [],
    componentsList: [],
    languageLabel: 'Language',
    themeLabel: 'Theme',
    ShowProfileSection: true,
    showLogo: true,
    brandLogo: '/assets/test-logo.png',
    profileTitle: 'John Doe',
    profileEmail: 'john@example.com',
    tenantName: 'Test Tenant',
    role: 'Admin',
    profilePic: '/assets/profile.jpg',
    onLogout: jest.fn(),
    onProfileLinkTopNav: jest.fn(),
    onClick: jest.fn(),
    onClickThemeCheck: jest.fn(),
    onForgotPassword: jest.fn(),
    navbarTitle: 'Test Dashboard',
    navtabItems: [
      { id: 'linkedAccounts', label: 'Linked Accounts', navigateTo: '/linked-accounts' },
      { id: 'authorityDelegation', label: 'Authority Delegation', navigateTo: '/authority-delegation' },
      { id: 'myAccount', label: 'My Account', navigateTo: '/my-account' },
      { id: 'mySecurityLogs', label: 'My Security Logs', navigateTo: '/my-security-logs' },
      { id: 'personalData', label: 'Personal Data', navigateTo: '/personal-data' },
    ],
  };

  const renderComponent = (props = {}) => {
    return render(<RdsCompTopNavigation {...defaultProps} {...props} />);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Basic Rendering Tests
  describe('Basic Rendering', () => {
    it('renders without crashing', () => {
      renderComponent();
      expect(screen.getByRole('navigation')).toBeInTheDocument();
    });

    it('renders with default style', () => {
      renderComponent();
      expect(screen.getByRole('navigation')).toHaveClass('navbar');
    });    it('renders logo when showLogo is true', () => {
      renderComponent({ showLogo: true, brandLogo: '/test-logo.png' });
      const logoImages = screen.getAllByAltText(/logo/i);
      expect(logoImages.length).toBeGreaterThan(0);
    });

    it('displays navbar title correctly', () => {
      renderComponent({ navbarTitle: 'Custom Dashboard' });
      expect(screen.getByText('Custom Dashboard')).toBeInTheDocument();
    });
  });

  // RaaghuPortal Style Tests
  describe('RaaghuPortal Style', () => {
    it('renders RaaghuPortal style correctly', () => {
      renderComponent({ 
        style: 'RaaghuPortal',
        navtabItems: [
          { label: 'Home', href: '/home' },
          { label: 'About', href: '/about' }
        ]
      });
      
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('About')).toBeInTheDocument();
    });

    it('renders navigation tabs in RaaghuPortal style', () => {
      const navtabItems = [
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Settings', href: '/settings' }
      ];
      
      renderComponent({ 
        style: 'RaaghuPortal',
        navtabItems 
      });
        navtabItems.forEach(item => {
        expect(screen.getByText(item.label)).toBeInTheDocument();
      });
    });
  });

  // Ecommerce_1 Style Tests
  describe('Ecommerce_1 Style', () => {
    it('renders Ecommerce_1 style correctly', () => {
      renderComponent({ style: 'Ecommerce_1' });
      expect(screen.getByRole('navigation')).toBeInTheDocument();
    });
  });
  // Profile Section Tests
  describe('Profile Section', () => {
    it('renders profile picture', () => {
      renderComponent({ profilePic: '/assets/custom-profile.jpg' });
      const profileImages = screen.getAllByRole('img');
      const profileImage = profileImages.find(img => 
        img.getAttribute('src')?.includes('custom-profile.jpg')
      );
      expect(profileImage).toBeInTheDocument();
    });
  });

  // Theme Dropdown Tests
  describe('Theme Dropdown', () => {
    it('renders theme dropdown with items', () => {
      const themeItems = [
        { id: 0, label: 'Light Theme', val: 'light' },
        { id: 1, label: 'Dark Theme', val: 'dark' }
      ];
      
      renderComponent({ themeItems });
      
      const themeDropdown = screen.getByTestId('rds-dropdown-themeDropdown');
      expect(themeDropdown).toBeInTheDocument();
    });

    it('calls onClickThemeCheck when theme is changed', () => {
      const mockOnClickTheme = jest.fn();
      const themeItems = [
        { id: 0, label: 'Light Theme', val: 'light' },
        { id: 1, label: 'Dark Theme', val: 'dark' }
      ];
      
      renderComponent({ 
        themeItems,
        onClickThemeCheck: mockOnClickTheme
      });
      
      const select = screen.getByDisplayValue('');
      fireEvent.change(select, { target: { value: 'dark' } });
      
      expect(mockOnClickTheme).toHaveBeenCalledWith(expect.any(Object), 'dark');
    });
  });
  // Language Dropdown Tests
  describe('Language Dropdown', () => {
    it('renders language dropdown', () => {
      renderComponent();
      
      const languageDropdown = screen.getByTestId('rds-dropdown-languageDropdown');
      expect(languageDropdown).toBeInTheDocument();
    });
  });
  // Breadcrumb Tests
  describe('Breadcrumb', () => {
    it('does not render breadcrumb when breadcrumItem is empty', () => {
      renderComponent({ breadcrumItem: [] });
      
      const breadcrumb = screen.queryByTestId('rds-breadcrumb');
      expect(breadcrumb).not.toBeInTheDocument();
    });
  });

  // Search Functionality Tests
  describe('Search Functionality', () => {
    it('renders search when showSearch is true', () => {
      renderComponent({ 
        showSearch: true,
        product4: true
      });
      
      const searchInput = screen.getByTestId('rds-search');
      expect(searchInput).toBeInTheDocument();
    });

    it('does not render search when showSearch is false', () => {
      renderComponent({ 
        showSearch: false,
        product4: true
      });
      
      const searchInput = screen.queryByTestId('rds-search');
      expect(searchInput).not.toBeInTheDocument();
    });  });
  // Product Variants Tests
  describe('Product Variants', () => {
    it('renders avatar for product4', () => {
      renderComponent({ 
        product4: true,
        firstName: 'John',
        lastName: 'Doe',
        colorVariant: 'primary'
      });
      
      const avatar = screen.getByTestId('rds-avatar');
      expect(avatar).toBeInTheDocument();
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });
  });

  // Props Handling Tests
  describe('Props Handling', () => {it('handles missing optional props gracefully', () => {
      const minimalProps = {
        style: 'Default',
        themeItems: [],
        toggleItems: [],
        elementList: [],
        componentsList: [],
        languageLabel: 'Language',
        themeLabel: 'Theme',
        onProfileLinkTopNav: jest.fn(),
        onForgotPassword: jest.fn(),
        onLogout: jest.fn(),
        onClick: jest.fn(),
        onClickThemeCheck: jest.fn(),
      };
      
      expect(() => render(<RdsCompTopNavigation {...minimalProps} />)).not.toThrow();
    });    it('handles empty arrays gracefully', () => {
      renderComponent({
        themeItems: [],
        breadcrumItem: [],
        navtabItems: [],
        icons: [],
        socialMediaIcons: []
      });
      
      expect(screen.getByRole('navigation')).toBeInTheDocument();
    });
  });
  
  // Edge Cases Tests
  describe('Edge Cases', () => {
    it('handles undefined profilePic', () => {
      renderComponent({ profilePic: undefined });
      
      const profileImages = screen.getAllByRole('img');
      const profileImage = profileImages.find(img => 
        img.getAttribute('src')?.includes('profile-picture-circle.svg')
      );
      expect(profileImage).toBeInTheDocument();
    });

    it('handles long navbar titles', () => {
      const longTitle = 'This is a very long navbar title that might cause layout issues';
      renderComponent({ navbarTitle: longTitle });
      
      expect(screen.getByText(longTitle)).toBeInTheDocument();
    });

    it('handles special characters in user names', () => {
      renderComponent({ 
        profileTitle: 'José María',
        profileEmail: 'josé@example.com'
      });
      
      expect(screen.getByText('Hi, José María')).toBeInTheDocument();
    });
  });
  // Layout Tests
  describe('Layout', () => {
    it('applies correct CSS classes for navbar', () => {
      renderComponent();
      
      const navbar = screen.getByRole('navigation');
      expect(navbar).toHaveClass('navbar');
      expect(navbar).toHaveClass('d-flex');
      expect(navbar).toHaveClass('justify-content-between');
    });  });
});
