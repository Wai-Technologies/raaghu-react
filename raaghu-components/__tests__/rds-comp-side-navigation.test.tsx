import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompSideNavigation from '../src/rds-comp-side-navigation/rds-comp-side-navigation';

// Mock the rds-elements components
jest.mock('../src/rds-elements', () => ({
  RdsSideNav: ({ sideNavItems, toggleTheme, collapse, toggleClass, logo, lockIconVisible }: any) => (
    <div 
      data-testid="rds-side-nav"
      data-collapse={collapse}
      data-toggle-class={toggleClass}
      data-logo={logo}
      data-lock-icon-visible={lockIconVisible}
    >
      <ul>
        {sideNavItems?.map((item: any, index: number) => (
          <li key={index} data-testid={`nav-item-${item.key}`}>
            {item.label}
            {item.children && (
              <ul>
                {item.children.map((child: any, childIndex: number) => (
                  <li key={childIndex} data-testid={`nav-child-${child.key}`}>
                    {child.label}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}));

describe('RdsCompSideNavigation Component', () => {
  // Sample data for testing
  const mockSideNavItems = [
    {
      key: 'dashboard',
      label: 'Dashboard',
      icon: 'dashboard',
      path: '/dashboard'
    },
    {
      key: 'administration',
      label: 'Administration',
      icon: 'settings',
      children: [
        {
          key: 'users',
          label: 'Users',
          icon: 'user',
          path: '/administration/users'
        },
        {
          key: 'roles',
          label: 'Roles',
          icon: 'shield',
          path: '/administration/roles'
        }
      ]
    }
  ];

  const defaultProps = {
    sideNavItems: mockSideNavItems
  };

  describe('Component Rendering', () => {
    it('should render without crashing', () => {
      render(<RdsCompSideNavigation {...defaultProps} />);
      expect(screen.getByTestId('rds-side-nav')).toBeInTheDocument();
    });

    it('should render all top-level navigation items', () => {
      render(<RdsCompSideNavigation {...defaultProps} />);
      expect(screen.getByTestId('nav-item-dashboard')).toBeInTheDocument();
      expect(screen.getByTestId('nav-item-administration')).toBeInTheDocument();
    });

    it('should render child navigation items', () => {
      render(<RdsCompSideNavigation {...defaultProps} />);
      expect(screen.getByTestId('nav-child-users')).toBeInTheDocument();
      expect(screen.getByTestId('nav-child-roles')).toBeInTheDocument();
    });
  });

  describe('Props Handling', () => {
    it('should pass collapse prop to RdsSideNav', () => {
      const collapsedProps = {
        ...defaultProps,
        collapse: true
      };
      render(<RdsCompSideNavigation {...collapsedProps} />);
      expect(screen.getByTestId('rds-side-nav')).toHaveAttribute('data-collapse', 'true');
    });

    it('should pass toggleClass prop to RdsSideNav', () => {
      const toggleProps = {
        ...defaultProps,
        toggleClass: true
      };
      render(<RdsCompSideNavigation {...toggleProps} />);
      expect(screen.getByTestId('rds-side-nav')).toHaveAttribute('data-toggle-class', 'true');
    });

    it('should pass logo prop to RdsSideNav', () => {
      const logoProps = {
        ...defaultProps,
        logo: 'logo-url.svg'
      };
      render(<RdsCompSideNavigation {...logoProps} />);
      expect(screen.getByTestId('rds-side-nav')).toHaveAttribute('data-logo', 'logo-url.svg');
    });

    it('should pass lockIconVisible prop to RdsSideNav', () => {
      const lockIconProps = {
        ...defaultProps,
        lockIconVisible: true
      };
      render(<RdsCompSideNavigation {...lockIconProps} />);
      expect(screen.getByTestId('rds-side-nav')).toHaveAttribute('data-lock-icon-visible', 'true');
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty sideNavItems array', () => {
      const emptyProps = {
        sideNavItems: []
      };
      render(<RdsCompSideNavigation {...emptyProps} />);
      expect(screen.getByTestId('rds-side-nav')).toBeInTheDocument();
      // No navigation items should be present
      expect(screen.queryByTestId(/nav-item-/)).not.toBeInTheDocument();
    });

    it('should handle sideNavItems without children', () => {
      const noChildrenProps = {
        sideNavItems: [
          {
            key: 'home',
            label: 'Home',
            icon: 'home',
            path: '/home'
          }
        ]
      };
      render(<RdsCompSideNavigation {...noChildrenProps} />);
      expect(screen.getByTestId('nav-item-home')).toBeInTheDocument();
      // No child items should be present
      expect(screen.queryByTestId(/nav-child-/)).not.toBeInTheDocument();
    });
  });
});
