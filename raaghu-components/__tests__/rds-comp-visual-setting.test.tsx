import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompVisualSetting from '../src/rds-comp-visual-setting/rds-comp-visual-setting';

// Mock the dependencies
jest.mock('../src/rds-elements', () => ({
  RdsButton: jest.fn(({ label, onClick, colorVariant, size, type, ...props }) => (
    <button 
      onClick={onClick} 
      type={type}
      data-testid={`button-${label?.replace(/\s+/g, '-').toLowerCase()}`}
      className={`btn-${colorVariant} btn-${size}`}
      {...props}
    >
      {label}
    </button>
  )),
  RdsCheckbox: jest.fn(({ labelText, onChange, checked, name, ...props }) => (
    <div data-testid={`checkbox-${name}`} {...props}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        name={name}
        data-testid={`checkbox-input-${name}`}
      />
      <label>{labelText}</label>
    </div>
  )),
  RdsCompIcon: jest.fn(({ name, height, width, stroke, ...props }) => (
    <i 
      data-testid={`icon-${name}`}
      className={`icon-${name}`}
      style={{ height, width }}
      {...props}
    />
  )),
  RdsCompSelectList: jest.fn(({ 
    id, 
    label, 
    placeholder, 
    selectItems, 
    onChange, 
    dataTestId, 
    reset,
    ...props 
  }) => (
    <div data-testid={dataTestId || `select-${id}`} {...props}>
      {label && <label>{label}</label>}
      <select
        onChange={(e) => onChange && onChange({ value: e.target.value })}
        data-testid={`select-input-${id}`}
      >
        <option value="">{placeholder}</option>
        {selectItems?.map((item: any, index: number) => (
          <option key={index} value={item.value}>
            {item.option}
          </option>
        ))}
      </select>
    </div>
  )),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { changeLanguage: jest.fn() },
  }),
}));

describe('RdsCompVisualSetting', () => {
  const mockThemeItems = [
    {
      themeId: 'default',
      theme: 'Default Theme',
      imgsrc: '/images/default-theme.png',
    },
    {
      themeId: 'dark',
      theme: 'Dark Theme',
      imgsrc: '/images/dark-theme.png',
    },
    {
      themeId: 'semidark',
      theme: 'Semi Dark Theme',
      imgsrc: '/images/semidark-theme.png',
    },
  ];

  const mockNavTabItems = [
    {
      themeId: 'default',
      navtabs: [
        { id: 'header', label: 'Header', icon: 'header', tablink: '#header' },
        { id: 'menu', label: 'Menu', icon: 'menu', tablink: '#menu' },
        { id: 'subheader', label: 'Sub Header', icon: 'subheader', tablink: '#subheader' },
        { id: 'footer', label: 'Footer', icon: 'footer', tablink: '#footer' },
      ],
    },
    {
      themeId: 'dark',
      navtabs: [
        { id: 'header', label: 'Header', icon: 'header', tablink: '#header' },
        { id: 'menu', label: 'Menu', icon: 'menu', tablink: '#menu' },
        { id: 'subheader', label: 'Sub Header', icon: 'subheader', tablink: '#subheader' },
        { id: 'footer', label: 'Footer', icon: 'footer', tablink: '#footer' },
      ],
    },
    {
      themeId: 'semidark',
      navtabs: [
        { id: 'header', label: 'Header', icon: 'header', tablink: '#header' },
        { id: 'menu', label: 'Menu', icon: 'menu', tablink: '#menu' },
        { id: 'subheader', label: 'Sub Header', icon: 'subheader', tablink: '#subheader' },
        { id: 'footer', label: 'Footer', icon: 'footer', tablink: '#footer' },
      ],
    },
  ];

  const mockVisualSettingsItem = [
    {
      themeId: 'default',
      header: {
        headerSkin: 'light',
        desktopFixedHeader: false,
        mobileFixedHeader: false,
      },
      menu: {
        asideSkin: 'light',
        fixedAside: false,
        allowAsideMinimizing: false,
        defaultMinimizedAside: false,
        hoverableAside: false,
        submenuToggle: 'hover',
      },
      subheader: {
        fixedSubHeader: false,
      },
      footer: {
        fixedFooter: false,
      },
    },
    {
      themeId: 'dark',
      header: {
        headerSkin: 'dark',
        desktopFixedHeader: true,
        mobileFixedHeader: true,
      },
      menu: {
        asideSkin: 'dark',
        fixedAside: true,
        allowAsideMinimizing: true,
        defaultMinimizedAside: false,
        hoverableAside: true,
        submenuToggle: 'click',
      },
      subheader: {
        fixedSubHeader: true,
      },
      footer: {
        fixedFooter: true,
      },
    },
  ];

  const mockListSkin = [
    { displayText: 'Light', value: 'light' },
    { displayText: 'Dark', value: 'dark' },
    { displayText: 'Semi Dark', value: 'semidark' },
  ];

  const mockListSubmenu = [
    { displayText: 'Hover', value: 'hover' },
    { displayText: 'Click', value: 'click' },
  ];

  const mockOnSaveVisualSettingsData = jest.fn();

  const defaultProps = {
    visualsettingsItem: mockVisualSettingsItem,
    navtabItems: mockNavTabItems,
    themeItem: mockThemeItems,
    listskin: mockListSkin,
    listSubmenu: mockListSubmenu,
    visualSettingHeader: [],
    visualSettingSubHeader: [],
    isShimmer: false,
    onSaveVisualSettingsData: mockOnSaveVisualSettingsData,
    indexEmitter: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Basic Rendering Tests
  describe('Basic Rendering', () => {
    it('renders without crashing', () => {
      render(<RdsCompVisualSetting {...defaultProps} />);
      expect(screen.getByText('Default Theme')).toBeInTheDocument();
    });

    it('renders the main container with correct structure', () => {
      const { container } = render(<RdsCompVisualSetting {...defaultProps} />);
      
      expect(container.querySelector('.row')).toBeInTheDocument();
      expect(container.querySelector('.col-md-12')).toBeInTheDocument();
      expect(container.querySelector('.card')).toBeInTheDocument();
    });

    it('renders all theme cards', () => {
      render(<RdsCompVisualSetting {...defaultProps} />);
      
      expect(screen.getByText('Default Theme')).toBeInTheDocument();
      expect(screen.getByText('Dark Theme')).toBeInTheDocument();
      expect(screen.getByText('Semi Dark Theme')).toBeInTheDocument();
    });

    it('renders theme images correctly', () => {
      const { container } = render(<RdsCompVisualSetting {...defaultProps} />);
      
      const images = container.querySelectorAll('img');
      expect(images).toHaveLength(3);
      expect(images[0]).toHaveAttribute('src', '/images/default-theme.png');
      expect(images[1]).toHaveAttribute('src', '/images/dark-theme.png');
      expect(images[2]).toHaveAttribute('src', '/images/semidark-theme.png');
    });
  });

  // Theme Selection Tests
  describe('Theme Selection', () => {
    it('sets default theme as active initially', () => {
      const { container } = render(<RdsCompVisualSetting {...defaultProps} />);
      
      const activeTheme = container.querySelector('.themeActivate');
      expect(activeTheme).toBeInTheDocument();
      expect(activeTheme).toHaveTextContent('Default Theme');
    });    it('changes active theme when clicking on theme card', () => {
      const { container } = render(<RdsCompVisualSetting {...defaultProps} />);
      
      const darkThemeImg = container.querySelector('img[src="/images/dark-theme.png"]');
      fireEvent.click(darkThemeImg!);
      
      // Check that dark theme becomes active
      const activeTheme = container.querySelector('.themeActivate');
      expect(activeTheme).toHaveTextContent('Dark Theme');
    });
  });

  // Navigation Tabs Tests
  describe('Navigation Tabs', () => {
    it('renders all navigation tabs', () => {
      render(<RdsCompVisualSetting {...defaultProps} />);
      
      expect(screen.getByText('Header')).toBeInTheDocument();
      expect(screen.getByText('Menu')).toBeInTheDocument();
      expect(screen.getByText('Sub Header')).toBeInTheDocument();
      expect(screen.getByText('Footer')).toBeInTheDocument();
    });

    it('renders tab icons', () => {
      render(<RdsCompVisualSetting {...defaultProps} />);
      
      expect(screen.getByTestId('icon-header')).toBeInTheDocument();
      expect(screen.getByTestId('icon-menu')).toBeInTheDocument();
      expect(screen.getByTestId('icon-subheader')).toBeInTheDocument();
      expect(screen.getByTestId('icon-footer')).toBeInTheDocument();
    });

    it('switches tabs when clicked', () => {
      render(<RdsCompVisualSetting {...defaultProps} />);
      
      const menuTab = screen.getByText('Menu');
      fireEvent.click(menuTab);
      
      // Should show menu-specific content
      expect(screen.getByTestId('select-aside-skin')).toBeInTheDocument();
    });

    it('shows correct content for each tab', () => {
      render(<RdsCompVisualSetting {...defaultProps} />);
      
      // Test Header tab
      expect(screen.getByTestId('select-header-skin')).toBeInTheDocument();
      
      // Test Menu tab
      const menuTab = screen.getByText('Menu');
      fireEvent.click(menuTab);
      expect(screen.getByTestId('select-aside-skin')).toBeInTheDocument();
      
      // Test Sub Header tab
      const subHeaderTab = screen.getByText('Sub Header');
      fireEvent.click(subHeaderTab);
      expect(screen.getByTestId('checkbox-fixedSubHeader')).toBeInTheDocument();
      
      // Test Footer tab
      const footerTab = screen.getByText('Footer');
      fireEvent.click(footerTab);
      expect(screen.getByTestId('checkbox-fixedFooter')).toBeInTheDocument();
    });
  });

  // Header Tab Tests
  describe('Header Tab', () => {
    it('renders header skin select list', () => {
      render(<RdsCompVisualSetting {...defaultProps} />);
      
      expect(screen.getByTestId('select-header-skin')).toBeInTheDocument();
      expect(screen.getByText('Skin')).toBeInTheDocument();
    });

    it('renders desktop and mobile fixed header checkboxes', () => {
      render(<RdsCompVisualSetting {...defaultProps} />);
      
      expect(screen.getByTestId('checkbox-desktopFixedHeader')).toBeInTheDocument();
      expect(screen.getByTestId('checkbox-mobileFixedHeader')).toBeInTheDocument();
    });

    it('handles header skin selection', () => {
      render(<RdsCompVisualSetting {...defaultProps} />);
      
      const headerSkinSelect = screen.getByTestId('select-input-headerSkin');
      fireEvent.change(headerSkinSelect, { target: { value: 'dark' } });
      
      expect(headerSkinSelect).toHaveValue('dark');
    });
  });

  // Menu Tab Tests
  describe('Menu Tab', () => {
    beforeEach(() => {
      render(<RdsCompVisualSetting {...defaultProps} />);
      const menuTab = screen.getByText('Menu');
      fireEvent.click(menuTab);
    });

    it('renders aside skin select list', () => {
      expect(screen.getByTestId('select-aside-skin')).toBeInTheDocument();
    });

    it('renders all menu checkboxes', () => {
      expect(screen.getByTestId('checkbox-fixedAside')).toBeInTheDocument();
      expect(screen.getByTestId('checkbox-allowAsideMinimizing')).toBeInTheDocument();
      expect(screen.getByTestId('checkbox-defaultMinimizedAside')).toBeInTheDocument();
      expect(screen.getByTestId('checkbox-hoverableAside')).toBeInTheDocument();
    });

    it('renders submenu toggle select list', () => {
      expect(screen.getByTestId('select-submenu-toggle')).toBeInTheDocument();
    });

    it('handles aside skin selection', () => {
      const asideSkinSelect = screen.getByTestId('select-input-asideSkin');
      fireEvent.change(asideSkinSelect, { target: { value: 'dark' } });
      
      expect(asideSkinSelect).toHaveValue('dark');
    });

    it('handles submenu toggle selection', () => {
      const submenuSelect = screen.getByTestId('select-input-submenuToggle');
      fireEvent.change(submenuSelect, { target: { value: 'click' } });
      
      expect(submenuSelect).toHaveValue('click');
    });
  });

  // Sub Header Tab Tests
  describe('Sub Header Tab', () => {
    beforeEach(() => {
      render(<RdsCompVisualSetting {...defaultProps} />);
      const subHeaderTab = screen.getByText('Sub Header');
      fireEvent.click(subHeaderTab);
    });    it('renders fixed sub header checkbox', () => {
      expect(screen.getByTestId('checkbox-fixedSubHeader')).toBeInTheDocument();
      expect(screen.getByText('Fixed SubHeader')).toBeInTheDocument();
    });
  });

  // Footer Tab Tests
  describe('Footer Tab', () => {
    beforeEach(() => {
      render(<RdsCompVisualSetting {...defaultProps} />);
      const footerTab = screen.getByText('Footer');
      fireEvent.click(footerTab);
    });    it('renders fixed footer checkbox', () => {
      expect(screen.getByTestId('checkbox-fixedFooter')).toBeInTheDocument();
      expect(screen.getByText('Fixed Footer')).toBeInTheDocument();
    });
  });

  // Save Functionality Tests
  describe('Save Functionality', () => {
    it('renders save button in all tabs', () => {
      render(<RdsCompVisualSetting {...defaultProps} />);
      
      // Header tab
      expect(screen.getByTestId('button-save-as-system-default')).toBeInTheDocument();
      
      // Menu tab
      const menuTab = screen.getByText('Menu');
      fireEvent.click(menuTab);
      expect(screen.getByTestId('button-save-as-system-default')).toBeInTheDocument();
      
      // Sub Header tab
      const subHeaderTab = screen.getByText('Sub Header');
      fireEvent.click(subHeaderTab);
      expect(screen.getByTestId('button-save-as-system-default')).toBeInTheDocument();
      
      // Footer tab
      const footerTab = screen.getByText('Footer');
      fireEvent.click(footerTab);
      expect(screen.getByTestId('button-save-as-system-default')).toBeInTheDocument();
    });

    it('calls onSaveVisualSettingsData when save button is clicked', () => {
      render(<RdsCompVisualSetting {...defaultProps} />);      
      const saveButton = screen.getByTestId('button-save-as-system-default');
      fireEvent.click(saveButton);
      
      expect(mockOnSaveVisualSettingsData).toHaveBeenCalledTimes(1);
    });
  });

  // Props Handling Tests
  describe('Props Handling', () => {
    it('handles missing onSaveVisualSettingsData callback', () => {
      const propsWithoutCallback = { ...defaultProps };
      delete (propsWithoutCallback as any).onSaveVisualSettingsData;
      
      expect(() => render(<RdsCompVisualSetting {...propsWithoutCallback} />)).not.toThrow();
    });    it('handles empty theme items', () => {
      const propsWithEmptyThemes = { ...defaultProps, themeItem: [] };
      expect(() => render(<RdsCompVisualSetting {...propsWithEmptyThemes} />)).not.toThrow();
    });

    it('handles empty visual settings item', () => {
      const propsWithEmptySettings = { ...defaultProps, visualsettingsItem: [] };
      expect(() => render(<RdsCompVisualSetting {...propsWithEmptySettings} />)).not.toThrow();
    });

    it('handles missing list skin', () => {      const propsWithoutListSkin = { ...defaultProps, listskin: [] };
      render(<RdsCompVisualSetting {...propsWithoutListSkin} />);
      
      // Should not render skin select lists
      expect(screen.queryByTestId('select-aside-skin')).toBeNull();
    });
  });
  // State Management Tests
  describe('State Management', () => {
    it('updates visual settings data when checkboxes change', () => {
      render(<RdsCompVisualSetting {...defaultProps} />);
      
      const checkbox = screen.getByTestId('checkbox-input-desktopFixedHeader');
      fireEvent.click(checkbox);
      
      // The component should dispatch an action to update the reducer state
      expect(checkbox).toBeChecked();
    });
  });
  // Edge Cases Tests
  describe('Edge Cases', () => {
    it('handles themes with missing nav tabs', () => {
      const propsWithMissingNavTabs = {
        ...defaultProps,
        navtabItems: [
          {
            themeId: 'default',
            navtabs: [],
          },
        ],
      };
      
      expect(() => render(<RdsCompVisualSetting {...propsWithMissingNavTabs} />)).toThrow();
    });
  });

  // CSS Classes Tests
  describe('CSS Classes', () => {
    it('applies correct theme activation classes', () => {
      const { container } = render(<RdsCompVisualSetting {...defaultProps} />);
      
      const activeTheme = container.querySelector('.themeActivate');
      const inactiveThemes = container.querySelectorAll('.themeInactivate');
      
      expect(activeTheme).toBeInTheDocument();
      expect(inactiveThemes).toHaveLength(2); // 2 inactive themes
    });

    it('applies correct tab classes', () => {
      const { container } = render(<RdsCompVisualSetting {...defaultProps} />);
      
      const activeTab = container.querySelector('.border-bottom.border-primary.border-3.text-primary');
      const inactiveTabs = container.querySelectorAll('.inactive');
      
      expect(activeTab).toBeInTheDocument();
      expect(inactiveTabs.length).toBeGreaterThan(0);
    });
  });

  // Accessibility Tests
  describe('Accessibility', () => {
    it('provides proper ARIA attributes for tabs', () => {
      render(<RdsCompVisualSetting {...defaultProps} />);
      
      const headerTab = screen.getByText('Header').closest('a');
      expect(headerTab).toHaveAttribute('aria-current', 'page');
    });

    it('provides proper role attributes for tab panels', () => {
      render(<RdsCompVisualSetting {...defaultProps} />);
      
      const menuTab = screen.getByText('Menu');
      fireEvent.click(menuTab);
      
      const tabPanel = screen.getByRole('tabpanel');
      expect(tabPanel).toHaveAttribute('aria-labelledby', 'nav-Menu');
    });

    it('maintains proper labeling for form controls', () => {
      render(<RdsCompVisualSetting {...defaultProps} />);
      
      expect(screen.getByText('Skin')).toBeInTheDocument();
      expect(screen.getByText('Desktop')).toBeInTheDocument();
      expect(screen.getByText('Mobile')).toBeInTheDocument();
    });
  });
});
