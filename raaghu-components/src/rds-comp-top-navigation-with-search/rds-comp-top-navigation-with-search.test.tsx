import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import RdsCompTopNavigationWithSearch from "./rds-comp-top-navigation-with-search";
import "@testing-library/jest-dom";

// Mock react-i18next
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

// Mock child components and enums that use hooks or cause issues
jest.mock("../rds-elements", () => ({
  RdsCompIcon: ({ name, onClick, ...props }: any) => (
    <div data-testid={`rds-icon-${name}`} onClick={onClick} {...props}>
      {name}
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
  RdsOffcanvas: ({ children, offcanvasbutton, ...props }: any) => (
    <div data-testid="rds-offcanvas" {...props}>
      {offcanvasbutton}
      {children}
    </div>
  ),
  RdsSearch: ({ placeholder, ...props }: any) => (
    <input data-testid="rds-search" placeholder={placeholder} {...props} />
  ),
  RdsBreadcrumb: ({ breadcrumbItems, ...props }: any) => (
    <nav data-testid="rds-breadcrumb" {...props}>
      {breadcrumbItems?.map((item: any, index: number) => (
        <span key={index}>{item.label}</span>
      ))}
    </nav>
  ),
}));

jest.mock("../../../raaghu-elements/src/rds-offcanvas/rds-offcanvas", () => ({
  RdsOffcanvasPlacement: { Start: "start", End: "end", Top: "top", Bottom: "bottom" },
  RdsOffcanvasBackDrop: { True: "true", False: "false", Static: "static" },
}));

jest.mock("../../../raaghu-elements/src/rds-search/rds-search", () => ({
  IconPosition: { Left: "left", Right: "right" },
}));

jest.mock("../rds-comp-profile", () => {
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

describe("RdsCompTopNavigationWithSearch", () => {
  const defaultProps = {
    themeItems: [
      { id: 0, label: 'Light', val: 'Light' },
      { id: 1, label: 'Dark', val: 'Dark' },
    ],
    toggleItems: [],
    elementList: [],
    componentsList: [],
    languageLabel: 'Language',
    themeLabel: 'Theme',
    logo: '/assets/test-logo.png',
    profileTitle: 'John Doe',
    profileEmail: 'john@example.com',
    tenantName: 'Test Tenant',
    profilePic: '/assets/profile.jpg',
    onForgotPassword: jest.fn(),
    onProfileLinkTopNav: jest.fn(),
    onClick: jest.fn(),
    navbarTitle: 'Test Dashboard',
    breacrumItem: [],  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test 1: Basic rendering
  it('renders without crashing', () => {
    render(<RdsCompTopNavigationWithSearch {...defaultProps} />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  // Test 2: Logo rendering
  it('renders logo correctly', () => {
    render(<RdsCompTopNavigationWithSearch {...defaultProps} logo="/test-logo.png" />);
    const logo = screen.getByAltText('logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/test-logo.png');
  });

  // Test 3: Search component
  it('renders search component', () => {
    render(<RdsCompTopNavigationWithSearch {...defaultProps} />);
    const searchInput = screen.getByTestId('rds-search');
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveAttribute('placeholder', 'Search');
  });

  // Test 4: Navbar title display
  it('displays navbar title when no breadcrumb items', () => {
    render(<RdsCompTopNavigationWithSearch {...defaultProps} navbarTitle="Custom Dashboard" breacrumItem={[]} />);
    expect(screen.getByText('Custom Dashboard')).toBeInTheDocument();
  });

  // Test 5: Breadcrumb rendering
  it('renders breadcrumb when breadcrumb items are provided', () => {
    const breadcrumbItems = [
      { id: 1, label: 'Home', active: false },
      { id: 2, label: 'Dashboard', active: true }
    ];
    
    render(<RdsCompTopNavigationWithSearch {...defaultProps} breacrumItem={breadcrumbItems} />);
    
    const breadcrumb = screen.getByTestId('rds-breadcrumb');
    expect(breadcrumb).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  // Test 6: Language dropdown
  it('renders language dropdown and handles change', () => {
    const mockOnClick = jest.fn();
    render(<RdsCompTopNavigationWithSearch {...defaultProps} onClick={mockOnClick} />);
    
    const languageDropdown = screen.getByTestId('rds-dropdown-languageDropdownTopNavigation');
    expect(languageDropdown).toBeInTheDocument();
    
    const select = screen.getByDisplayValue('EN');
    fireEvent.change(select, { target: { value: 'fr' } });
    expect(mockOnClick).toHaveBeenCalledWith(expect.any(Object), 'fr');
  });

  // Test 7: Navigation icons
  it('renders navigation icons correctly', () => {
    render(<RdsCompTopNavigationWithSearch {...defaultProps} />);
    expect(screen.getByTestId('rds-icon-star')).toBeInTheDocument();
    expect(screen.getByTestId('rds-icon-notification')).toBeInTheDocument();
    expect(screen.getByTestId('rds-icon-question')).toBeInTheDocument();
    expect(screen.getByTestId('rds-icon-chevron_down')).toBeInTheDocument();
  });

  // Test 8: Icon click handlers
  it('calls mobileViewLogoClick when navigation icons are clicked', () => {
    const mockClick = jest.fn();
    render(<RdsCompTopNavigationWithSearch {...defaultProps} mobileViewLogoClick={mockClick} />);
    
    const starIcon = screen.getByTestId('rds-icon-star');
    fireEvent.click(starIcon);
    expect(mockClick).toHaveBeenCalledTimes(1);
  });
  // Test 9: Profile information display
  it('renders profile information correctly', () => {
    render(<RdsCompTopNavigationWithSearch {...defaultProps} profileTitle="Test User" profileEmail="test@example.com" />);
    
    expect(screen.getByText('Hi, Test User')).toBeInTheDocument();
    expect(screen.getAllByText('test@example.com')).toHaveLength(2); // One in UI, one in mock profile component
  });

  // Test 10: Profile component in offcanvas
  it('renders profile component within offcanvas', () => {
    render(<RdsCompTopNavigationWithSearch {...defaultProps} />);
    const offcanvas = screen.getByTestId('rds-offcanvas');
    const profileComponent = screen.getByTestId('rds-comp-profile');
    expect(offcanvas).toBeInTheDocument();
    expect(profileComponent).toBeInTheDocument();
  });

  // Test 11: Logout functionality
  it('calls onLogout when logout is clicked', () => {
    const mockOnLogout = jest.fn();
    render(<RdsCompTopNavigationWithSearch {...defaultProps} onLogout={mockOnLogout} />);
    
    const logoutButton = screen.getByText('Logout');
    fireEvent.click(logoutButton);
    expect(mockOnLogout).toHaveBeenCalledTimes(1);
  });
  // Test 12: Hamburger menu
  it('renders hamburger button and handles click', () => {
    const mockOnClickHamburger = jest.fn();
    render(<RdsCompTopNavigationWithSearch {...defaultProps} onClickHamburger={mockOnClickHamburger} />);
    
    const hamburgerButton = screen.getByRole('button', { name: '' }); // Get button without specific name (hamburger)
    expect(hamburgerButton).toBeInTheDocument();
    expect(hamburgerButton).toHaveClass('navbar-toggler');
    
    fireEvent.click(hamburgerButton);
    expect(mockOnClickHamburger).toHaveBeenCalledTimes(1);
  });

  // Test 13: Impersonation functionality
  it('shows impersonation controls when isImpersonation is true', () => {
    const mockBackToMyAccount = jest.fn();
    render(<RdsCompTopNavigationWithSearch {...defaultProps} isImpersonation={true} backToMyAccount={mockBackToMyAccount} />);
    
    const backButton = screen.getByText('Back to My Account');
    expect(backButton).toBeInTheDocument();
    
    fireEvent.click(backButton);
    expect(mockBackToMyAccount).toHaveBeenCalledTimes(1);
  });  // Test 14: Profile link navigation
  it('handles profile navigation with correct parameters', () => {
    const mockOnProfileLink = jest.fn();
    render(<RdsCompTopNavigationWithSearch {...defaultProps} onProfileLinkTopNav={mockOnProfileLink} />);
    
    const accountLink = screen.getByText('My Account');
    fireEvent.click(accountLink);
    expect(mockOnProfileLink).toHaveBeenCalledWith('nav-MyAccount', '/my-account', 'My Account');
  });  // Test 15: Breadcrumb vs navbar title toggle
  it('hides navbar title when breadcrumb items exist', () => {
    const breadcrumbItems = [{ id: 1, label: 'Home', active: false }];
    
    // First test: show title when no breadcrumb
    const { rerender } = render(<RdsCompTopNavigationWithSearch {...defaultProps} navbarTitle="My Dashboard" breacrumItem={[]} />);
    expect(screen.getByText('My Dashboard')).toBeInTheDocument();
    expect(screen.queryByTestId('rds-breadcrumb')).not.toBeInTheDocument();
    
    // Then test: hide title when breadcrumb exists
    rerender(<RdsCompTopNavigationWithSearch {...defaultProps} navbarTitle="My Dashboard" breacrumItem={breadcrumbItems} />);
    expect(screen.queryByText('My Dashboard')).not.toBeInTheDocument();
    expect(screen.getByTestId('rds-breadcrumb')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
  });
});
