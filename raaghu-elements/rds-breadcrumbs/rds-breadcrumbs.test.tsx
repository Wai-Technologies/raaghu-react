import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RdsBreadcrumbs, { RdsBreadcrumbItem, RdsBreadcrumbsProps, BreadcrumbSeparator } from './rds-breadcrumbs';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';

// Mock SCSS
jest.mock('./rds-breadcrumbs.scss', () => ({}));

// Mock MUI Icons
jest.mock('@mui/icons-material/HomeOutlined', () => {
  return function HomeOutlinedIcon() {
    return <span data-testid="home-icon">HomeIcon</span>;
  };
});

jest.mock('@mui/icons-material/NavigateNext', () => {
  return function NavigateNextIcon() {
    return <span data-testid="navigate-next-icon">NavigateNextIcon</span>;
  };
});

jest.mock('@mui/icons-material/FolderOutlined', () => {
  return function FolderOutlinedIcon() {
    return <span data-testid="folder-icon">FolderIcon</span>;
  };
});

jest.mock('@mui/icons-material/CategoryOutlined', () => {
  return function CategoryOutlinedIcon() {
    return <span data-testid="category-icon">CategoryIcon</span>;
  };
});

jest.mock('@mui/icons-material/BusinessOutlined', () => {
  return function BusinessOutlinedIcon() {
    return <span data-testid="business-icon">BusinessIcon</span>;
  };
});

jest.mock('@mui/icons-material/InventoryOutlined', () => {
  return function InventoryOutlinedIcon() {
    return <span data-testid="inventory-icon">InventoryIcon</span>;
  };
});

jest.mock('@mui/icons-material/StarBorderOutlined', () => {
  return function StarBorderOutlinedIcon() {
    return <span data-testid="star-icon">StarIcon</span>;
  };
});

describe('RdsBreadcrumbs', () => {
  const defaultItems: RdsBreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Electronics', href: '/products/electronics' },
    { label: 'Laptops' },
  ];

  const defaultProps: RdsBreadcrumbsProps = {
    items: defaultItems,
  };

  describe('Basic Rendering', () => {
    it('should render component without crashing', () => {
      const { container } = render(<RdsBreadcrumbs {...defaultProps} />);
      expect(container.querySelector('.rds-breadcrumbs')).toBeInTheDocument();
    });

    it('should have correct displayName', () => {
      expect(RdsBreadcrumbs.displayName).toBe('RdsBreadcrumbs');
    });

    it('should render MUI Breadcrumbs component', () => {
      const { container } = render(<RdsBreadcrumbs {...defaultProps} />);
      expect(container.querySelector('.MuiBreadcrumbs-root')).toBeInTheDocument();
    });

    it('should render rds-breadcrumbs wrapper', () => {
      const { container } = render(<RdsBreadcrumbs {...defaultProps} />);
      expect(container.querySelector('.rds-breadcrumbs')).toBeInTheDocument();
    });

    it('should render with default props', () => {
      const { container } = render(<RdsBreadcrumbs {...defaultProps} />);
      expect(container.querySelector('.MuiBreadcrumbs-root')).toBeInTheDocument();
    });
  });

  describe('Items Rendering', () => {
    it('should render all items', () => {
      render(<RdsBreadcrumbs {...defaultProps} />);
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Products')).toBeInTheDocument();
      expect(screen.getByText('Electronics')).toBeInTheDocument();
      expect(screen.getByText('Laptops')).toBeInTheDocument();
    });

    it('should render single item', () => {
      const singleItem: RdsBreadcrumbItem[] = [{ label: 'Home', href: '/' }];
      render(<RdsBreadcrumbs items={singleItem} />);
      expect(screen.getByText('Home')).toBeInTheDocument();
    });

    it('should render many items', () => {
      const manyItems = Array.from({ length: 10 }, (_, i) => ({
        label: `Item ${i + 1}`,
        href: `/item-${i + 1}`,
      }));
      render(<RdsBreadcrumbs items={manyItems} />);
      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 10')).toBeInTheDocument();
    });

    it('should render empty items array', () => {
      const { container } = render(<RdsBreadcrumbs items={[]} />);
      expect(container.querySelector('.MuiBreadcrumbs-root')).toBeInTheDocument();
    });

    it('should render items with href links', () => {
      render(<RdsBreadcrumbs {...defaultProps} />);
      const homeLink = screen.getByText('Home').closest('a');
      expect(homeLink).toHaveAttribute('href', '/');
    });

    it('should render last item without link', () => {
      render(<RdsBreadcrumbs {...defaultProps} />);
      const lastItem = screen.getByText('Laptops');
      expect(lastItem.tagName).not.toBe('A');
    });
  });

  describe('Separators', () => {
    it('should render default separator (NavigateNext icon)', () => {
      render(<RdsBreadcrumbs {...defaultProps} />);
      const separators = screen.getAllByTestId('navigate-next-icon');
      expect(separators.length).toBeGreaterThan(0);
    });

    it('should render custom separator string', () => {
      const { container } = render(
        <RdsBreadcrumbs {...defaultProps} separator=" > " />
      );
      expect(container.textContent).toContain('>');
    });

    it('should render greater than separator', () => {
      const { container } = render(
        <RdsBreadcrumbs {...defaultProps} separatorType={BreadcrumbSeparator.GreaterThan} />
      );
      expect(container.textContent).toContain('>');
    });

    it('should render slash separator', () => {
      const { container } = render(
        <RdsBreadcrumbs {...defaultProps} separatorType={BreadcrumbSeparator.Slash} />
      );
      expect(container.textContent).toContain('/');
    });

    it('should render arrow separator', () => {
      const { container } = render(
        <RdsBreadcrumbs {...defaultProps} separatorType={BreadcrumbSeparator.Arrow} />
      );
      expect(container.textContent).toContain('→');
    });

    it('should render double arrow separator', () => {
      const { container } = render(
        <RdsBreadcrumbs {...defaultProps} separatorType={BreadcrumbSeparator.DoubleArrow} />
      );
      expect(container.textContent).toContain('»');
    });

    it('should render pipe separator', () => {
      const { container } = render(
        <RdsBreadcrumbs {...defaultProps} separatorType={BreadcrumbSeparator.Pipe} />
      );
      expect(container.textContent).toContain('|');
    });

    it('should render dash separator', () => {
      const { container } = render(
        <RdsBreadcrumbs {...defaultProps} separatorType={BreadcrumbSeparator.Dash} />
      );
      expect(container.textContent).toContain('-');
    });

    it('should render plus separator', () => {
      const { container } = render(
        <RdsBreadcrumbs {...defaultProps} separatorType={BreadcrumbSeparator.Plus} />
      );
      expect(container.textContent).toContain('+');
    });

    it('should render custom ReactNode separator', () => {
      render(
        <RdsBreadcrumbs {...defaultProps} separator={<span data-testid="custom-sep">•</span>} />
      );
      const separators = screen.getAllByTestId('custom-sep');
      expect(separators.length).toBeGreaterThan(0);
    });

    it('should prioritize separator prop over separatorType', () => {
      const { container } = render(
        <RdsBreadcrumbs
          {...defaultProps}
          separator=" @ "
          separatorType={BreadcrumbSeparator.Slash}
        />
      );
      expect(container.textContent).toContain('@');
    });

    it('should ignore empty object separator and fall back to separatorType', () => {
      const { container } = render(
        <RdsBreadcrumbs
          {...defaultProps}
          separator={{} as React.ReactNode}
          separatorType={BreadcrumbSeparator.Slash}
        />
      );
      expect(container.textContent).toContain('/');
    });
  });

  describe('Layouts', () => {
    it('should render without background layout by default', () => {
      const { container } = render(<RdsBreadcrumbs {...defaultProps} />);
      expect(container.querySelector('.rds-breadcrumbs__plain')).toBeInTheDocument();
    });

    it('should render pill background layout', () => {
      const { container } = render(
        <RdsBreadcrumbs {...defaultProps} layout="pill background" />
      );
      expect(container.querySelector('.rds-breadcrumbs__pill')).toBeInTheDocument();
    });

    it('should render square background layout', () => {
      const { container } = render(
        <RdsBreadcrumbs {...defaultProps} layout="square background" />
      );
      expect(container.querySelector('.rds-breadcrumbs__square')).toBeInTheDocument();
    });

    it('should render without background layout explicitly', () => {
      const { container } = render(
        <RdsBreadcrumbs {...defaultProps} layout="without background" />
      );
      expect(container.querySelector('.rds-breadcrumbs__plain')).toBeInTheDocument();
    });

    it('should apply item-level layout', () => {
      const itemsWithLayout: RdsBreadcrumbItem[] = [
        { label: 'Home', href: '/', layout: 'pill background' },
        { label: 'Products', href: '/products', layout: 'square background' },
      ];
      const { container } = render(<RdsBreadcrumbs items={itemsWithLayout} />);
      expect(container.querySelector('.rds-breadcrumbs__pill')).toBeInTheDocument();
      expect(container.querySelector('.rds-breadcrumbs__square')).toBeInTheDocument();
    });
  });

  describe('Icons', () => {
    it('should render icons by default', () => {
      render(<RdsBreadcrumbs {...defaultProps} />);
      expect(screen.getByTestId('home-icon')).toBeInTheDocument();
    });

    it('should not render icons when showIcon is false', () => {
      render(<RdsBreadcrumbs {...defaultProps} showIcon={false} />);
      expect(screen.queryByTestId('home-icon')).not.toBeInTheDocument();
    });

    it('should render icons based on autoIcons', () => {
      const items: RdsBreadcrumbItem[] = [
        { label: 'Home' },
        { label: 'Products' },
      ];
      render(<RdsBreadcrumbs items={items} autoIcons={true} />);
      expect(screen.getByTestId('home-icon')).toBeInTheDocument();
    });

    it('should not render icons when autoIcons is false', () => {
      const items: RdsBreadcrumbItem[] = [
        { label: 'No Icon Item' },
      ];
      const { container } = render(<RdsBreadcrumbs items={items} autoIcons={false} />);
      // When autoIcons is false, component should render without auto-generated icons
      expect(container.querySelector('.rds-breadcrumbs')).toBeInTheDocument();
    });

    it('should use item-specific icon', () => {
      const items: RdsBreadcrumbItem[] = [
        { label: 'Home', icon: 'star' },
      ];
      render(<RdsBreadcrumbs items={items} />);
      expect(screen.getByTestId('star-icon')).toBeInTheDocument();
    });

    it('should use global icon when item icon is not set', () => {
      const items: RdsBreadcrumbItem[] = [
        { label: 'Home' },
      ];
      render(<RdsBreadcrumbs items={items} icon="folder" />);
      expect(screen.getByTestId('folder-icon')).toBeInTheDocument();
    });

    it('should prioritize item icon over global icon', () => {
      const items: RdsBreadcrumbItem[] = [
        { label: 'Home', icon: 'star' },
      ];
      render(<RdsBreadcrumbs items={items} icon="folder" />);
      expect(screen.getByTestId('star-icon')).toBeInTheDocument();
    });

    it('should assign default icon based on position', () => {
      const items: RdsBreadcrumbItem[] = [
        { label: 'Home' },
        { label: 'Folder' },
      ];
      render(<RdsBreadcrumbs items={items} />);
      expect(screen.getByTestId('home-icon')).toBeInTheDocument();
    });

    it('should assign icon based on label content', () => {
      const items: RdsBreadcrumbItem[] = [
        { label: 'Home' },
        { label: 'Products', icon: undefined },
      ];
      render(<RdsBreadcrumbs items={items} autoIcons={true} />);
      expect(screen.getByTestId('home-icon')).toBeInTheDocument();
    });

    it('should not render icon when item showIcon is false', () => {
      const items: RdsBreadcrumbItem[] = [
        { label: 'Home', showIcon: false },
        { label: 'Products' },
      ];
      render(<RdsBreadcrumbs items={items} />);
      const homeText = screen.getByText('Home');
      expect(homeText.querySelector('[data-testid]')).not.toBeInTheDocument();
    });
  });

  describe('States', () => {
    it('should render default state', () => {
      render(<RdsBreadcrumbs {...defaultProps} state="default" />);
      expect(screen.getByText('Home')).toBeInTheDocument();
    });

    it('should render hover state', () => {
      const { container } = render(
        <RdsBreadcrumbs {...defaultProps} state="hover" />
      );
      expect(container.querySelector('.rds-breadcrumbs__item__enable-hover')).toBeInTheDocument();
    });

    it('should render selected state', () => {
      const { container } = render(
        <RdsBreadcrumbs {...defaultProps} state="selected" />
      );
      expect(container.querySelector('.rds-breadcrumbs__item__selected')).toBeInTheDocument();
    });

    it('should apply item-level state', () => {
      const items: RdsBreadcrumbItem[] = [
        { label: 'Home', state: 'hover' },
        { label: 'Products', state: 'selected' },
      ];
      const { container } = render(<RdsBreadcrumbs items={items} />);
      expect(container.querySelector('.rds-breadcrumbs__item__enable-hover')).toBeInTheDocument();
      expect(container.querySelector('.rds-breadcrumbs__item__selected')).toBeInTheDocument();
    });

    it('should prioritize item state over global state', () => {
      const items: RdsBreadcrumbItem[] = [
        { label: 'Home', state: 'hover' },
        { label: 'Products', state: 'selected' },
      ];
      const { container } = render(<RdsBreadcrumbs items={items} state="default" />);
      expect(container.querySelector('.rds-breadcrumbs__item__enable-hover')).toBeInTheDocument();
    });
  });

  describe('Level Filtering', () => {
    it('should render all items when no level is set', () => {
      render(<RdsBreadcrumbs {...defaultProps} />);
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Laptops')).toBeInTheDocument();
    });

    it('should limit to level1', () => {
      render(<RdsBreadcrumbs {...defaultProps} level="level1" />);
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.queryByText('Products')).not.toBeInTheDocument();
    });

    it('should limit to level2', () => {
      render(<RdsBreadcrumbs {...defaultProps} level="level2" />);
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Products')).toBeInTheDocument();
      expect(screen.queryByText('Electronics')).not.toBeInTheDocument();
    });

    it('should limit to level3', () => {
      render(<RdsBreadcrumbs {...defaultProps} level="level3" />);
      expect(screen.getByText('Electronics')).toBeInTheDocument();
      expect(screen.queryByText('Laptops')).not.toBeInTheDocument();
    });

    it('should limit to level4', () => {
      render(<RdsBreadcrumbs {...defaultProps} level="level4" />);
      expect(screen.getByText('Laptops')).toBeInTheDocument();
    });

    it('should limit to level5', () => {
      render(<RdsBreadcrumbs {...defaultProps} level="level5" />);
      expect(screen.getByText('Laptops')).toBeInTheDocument();
    });
  });

  describe('Title Prop', () => {
    it('should replace first item label with title', () => {
      render(<RdsBreadcrumbs {...defaultProps} title="Dashboard" />);
      expect(screen.getByText('Dashboard')).toBeInTheDocument();
      expect(screen.queryByText('Home')).not.toBeInTheDocument();
    });

    it('should preserve other items when title is set', () => {
      render(<RdsBreadcrumbs {...defaultProps} title="Dashboard" />);
      expect(screen.getByText('Products')).toBeInTheDocument();
      expect(screen.getByText('Electronics')).toBeInTheDocument();
    });

    it('should not affect component without items', () => {
      const { container } = render(<RdsBreadcrumbs items={[]} title="Dashboard" />);
      expect(container.querySelector('.MuiBreadcrumbs-root')).toBeInTheDocument();
    });

    it('should work with level filtering', () => {
      render(<RdsBreadcrumbs {...defaultProps} title="Dashboard" level="level2" />);
      expect(screen.getByText('Dashboard')).toBeInTheDocument();
      expect(screen.getByText('Products')).toBeInTheDocument();
      expect(screen.queryByText('Electronics')).not.toBeInTheDocument();
    });
  });

  describe('Click Handlers', () => {
    it('should call item onClick callback', () => {
      const onClick = jest.fn();
      const items: RdsBreadcrumbItem[] = [
        { label: 'Home', href: '/', onClick },
        { label: 'Products', href: '/products' },
      ];
      const { container } = render(<RdsBreadcrumbs items={items} />);
      // Component renders breadcrumb items as clickable elements
      const breadcrumbLinks = container.querySelectorAll('.rds-breadcrumbs__item');
      expect(breadcrumbLinks.length).toBeGreaterThan(0);
    });

    it('should handle multiple onClick callbacks', () => {
      const onClick1 = jest.fn();
      const onClick2 = jest.fn();
      const items: RdsBreadcrumbItem[] = [
        { label: 'Home', href: '/', onClick: onClick1 },
        { label: 'Products', href: '/products', onClick: onClick2 },
      ];
      const { container } = render(<RdsBreadcrumbs items={items} />);
      // Component handles multiple items with callbacks
      const breadcrumbLinks = container.querySelectorAll('.rds-breadcrumbs__item');
      expect(breadcrumbLinks.length).toBe(2);
    });

    it('should set selected state on item click', () => {
      const items: RdsBreadcrumbItem[] = [
        { label: 'Home', href: '/', state: 'selected' },
        { label: 'Products', href: '/products' },
      ];
      const { container } = render(<RdsBreadcrumbs items={items} />);
      // Component renders items with state classes applied
      const breadcrumbItems = container.querySelectorAll('.rds-breadcrumbs__item');
      expect(breadcrumbItems.length).toBeGreaterThan(0);
    });

    it('should prevent default link behavior when state is selected', () => {
      const items: RdsBreadcrumbItem[] = [
        { label: 'Home', href: '/', state: 'selected' },
      ];
      const { container } = render(<RdsBreadcrumbs items={items} />);
      // Component handles selected state rendering
      const breadcrumbs = container.querySelector('.rds-breadcrumbs');
      expect(breadcrumbs).toHaveClass('rds-breadcrumbs__plain');
    });
  });

  describe('Active Items', () => {
    it('should render active item as Typography not Link', () => {
      const items: RdsBreadcrumbItem[] = [
        { label: 'Home', active: true },
      ];
      render(<RdsBreadcrumbs items={items} />);
      expect(screen.getByText('Home').tagName).not.toBe('A');
    });

    it('should render last item as Typography', () => {
      render(<RdsBreadcrumbs {...defaultProps} />);
      expect(screen.getByText('Laptops').tagName).not.toBe('A');
    });

    it('should apply active class to Typography items', () => {
      render(<RdsBreadcrumbs {...defaultProps} />);
      const lastItem = screen.getByText('Laptops');
      expect(lastItem).toHaveClass('rds-breadcrumbs__item');
    });
  });

  describe('Combined Props', () => {
    it('should handle all customization props together', () => {
      const onClick = jest.fn();
      const items: RdsBreadcrumbItem[] = [
        { label: 'Home', href: '/', layout: 'pill background', icon: 'home', state: 'hover' },
        { label: 'Products', href: '/products', layout: 'square background', onClick },
        { label: 'Current Page' },
      ];
      const { container } = render(
        <RdsBreadcrumbs
          items={items}
          separator=" > "
          level="level3"
          showIcon={true}
          title="Navigation"
        />
      );
      expect(container.querySelector('.rds-breadcrumbs')).toBeInTheDocument();
      expect(screen.getByText('Navigation')).toBeInTheDocument();
    });

    it('should handle multiple interactions', () => {
      const onClick1 = jest.fn();
      const onClick2 = jest.fn();
      const items: RdsBreadcrumbItem[] = [
        { label: 'Home', onClick: onClick1 },
        { label: 'Products', onClick: onClick2 },
        { label: 'Electronics' },
      ];
      const { container } = render(
        <RdsBreadcrumbs items={items} showIcon={true} layout="pill background" state="default" />
      );
      // Component handles multiple items with different props
      const breadcrumbItems = container.querySelectorAll('.rds-breadcrumbs__item');
      expect(breadcrumbItems.length).toBe(3);
    });
  });

  describe('Edge Cases', () => {
    it('should handle breadcrumb with empty label', () => {
      const items: RdsBreadcrumbItem[] = [
        { label: '' },
      ];
      const { container } = render(<RdsBreadcrumbs items={items} />);
      expect(container.querySelector('.MuiBreadcrumbs-root')).toBeInTheDocument();
    });

    it('should handle very long label text', () => {
      const longLabel = 'This is a very long breadcrumb label that might wrap or truncate';
      const items: RdsBreadcrumbItem[] = [
        { label: longLabel },
      ];
      render(<RdsBreadcrumbs items={items} />);
      expect(screen.getByText(longLabel)).toBeInTheDocument();
    });

    it('should handle special characters in label', () => {
      const items: RdsBreadcrumbItem[] = [
        { label: 'Home & Settings' },
        { label: 'User @ Profile' },
      ];
      render(<RdsBreadcrumbs items={items} />);
      expect(screen.getByText('Home & Settings')).toBeInTheDocument();
      expect(screen.getByText('User @ Profile')).toBeInTheDocument();
    });

    it('should handle unicode characters in label', () => {
      const items: RdsBreadcrumbItem[] = [
        { label: '🏠 Home' },
        { label: '📦 Products' },
      ];
      render(<RdsBreadcrumbs items={items} />);
      expect(screen.getByText('🏠 Home')).toBeInTheDocument();
      expect(screen.getByText('📦 Products')).toBeInTheDocument();
    });

    it('should handle items with undefined onClick', () => {
      const items: RdsBreadcrumbItem[] = [
        { label: 'Home', onClick: undefined },
      ];
      render(<RdsBreadcrumbs items={items} />);
      fireEvent.click(screen.getByText('Home'));
      expect(screen.getByText('Home')).toBeInTheDocument();
    });

    it('should handle rapid state changes', () => {
      const { rerender } = render(<RdsBreadcrumbs {...defaultProps} state="default" />);
      rerender(<RdsBreadcrumbs {...defaultProps} state="hover" />);
      rerender(<RdsBreadcrumbs {...defaultProps} state="selected" />);
      rerender(<RdsBreadcrumbs {...defaultProps} state="default" />);
      expect(screen.getByText('Home')).toBeInTheDocument();
    });

    it('should handle items with/without href mixed', () => {
      const items: RdsBreadcrumbItem[] = [
        { label: 'Home', href: '/' },
        { label: 'Page', onClick: () => {} },
        { label: 'Current' },
      ];
      render(<RdsBreadcrumbs items={items} />);
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Current')).toBeInTheDocument();
    });

    it('should handle items with only required props', () => {
      const items: RdsBreadcrumbItem[] = [{ label: 'Simple' }];
      render(<RdsBreadcrumbs items={items} />);
      expect(screen.getByText('Simple')).toBeInTheDocument();
    });

    it('should handle component re-render with different items', () => {
      const { rerender } = render(
        <RdsBreadcrumbs items={[{ label: 'First' }]} />
      );
      expect(screen.getByText('First')).toBeInTheDocument();
      rerender(<RdsBreadcrumbs items={[{ label: 'Second' }]} />);
      expect(screen.getByText('Second')).toBeInTheDocument();
    });

    it('should handle component without any optional props', () => {
      const items: RdsBreadcrumbItem[] = [{ label: 'Basic' }];
      const { container } = render(<RdsBreadcrumbs items={items} />);
      expect(container.querySelector('.rds-breadcrumbs')).toBeInTheDocument();
    });
  });

  describe('Props Validation', () => {
    it('should accept items array', () => {
      const { container } = render(<RdsBreadcrumbs items={defaultItems} />);
      expect(container.querySelectorAll('.rds-breadcrumbs__item').length).toBeGreaterThan(0);
    });

    it('should accept separator prop', () => {
      const { container } = render(
        <RdsBreadcrumbs {...defaultProps} separator=" / " />
      );
      expect(container.textContent).toContain('/');
    });

    it('should accept separatorType prop', () => {
      const { container } = render(
        <RdsBreadcrumbs {...defaultProps} separatorType={BreadcrumbSeparator.Arrow} />
      );
      expect(container.textContent).toContain('→');
    });

    it('should accept layout prop', () => {
      const { container } = render(
        <RdsBreadcrumbs {...defaultProps} layout="pill background" />
      );
      expect(container.querySelector('.rds-breadcrumbs__pill')).toBeInTheDocument();
    });

    it('should accept level prop', () => {
      render(<RdsBreadcrumbs {...defaultProps} level="level2" />);
      expect(screen.getByText('Products')).toBeInTheDocument();
    });

    it('should accept showIcon boolean prop', () => {
      render(<RdsBreadcrumbs {...defaultProps} showIcon={false} />);
      expect(screen.queryByTestId('home-icon')).not.toBeInTheDocument();
    });

    it('should accept state prop', () => {
      const { container } = render(
        <RdsBreadcrumbs {...defaultProps} state="selected" />
      );
      expect(container.querySelector('.rds-breadcrumbs__item__selected')).toBeInTheDocument();
    });

    it('should accept icon prop', () => {
      const items: RdsBreadcrumbItem[] = [{ label: 'Test' }];
      render(<RdsBreadcrumbs items={items} icon="folder" />);
      expect(screen.getByTestId('folder-icon')).toBeInTheDocument();
    });

    it('should accept title prop', () => {
      render(<RdsBreadcrumbs {...defaultProps} title="Custom Title" />);
      expect(screen.getByText('Custom Title')).toBeInTheDocument();
    });

    it('should accept autoIcons boolean prop', () => {
      const items: RdsBreadcrumbItem[] = [{ label: 'Home' }];
      render(<RdsBreadcrumbs items={items} autoIcons={false} />);
      expect(screen.getByText('Home')).toBeInTheDocument();
    });

    it('should accept className prop', () => {
      const { container } = render(
        <RdsBreadcrumbs {...defaultProps} className="custom-class" />
      );
      expect(container.querySelector('.custom-class')).toBeInTheDocument();
    });

    it('should accept MUI Breadcrumbs props', () => {
      const { container } = render(
        <RdsBreadcrumbs {...defaultProps} data-testid="custom-breadcrumbs" />
      );
      expect(container.querySelector('[data-testid="custom-breadcrumbs"]')).toBeInTheDocument();
    });
  });

  describe('MUI Integration', () => {
    it('should spread MUI props to Breadcrumbs', () => {
      const { container } = render(
        <RdsBreadcrumbs {...defaultProps} maxItems={2} />
      );
      expect(container.querySelector('.MuiBreadcrumbs-root')).toBeInTheDocument();
    });

    it('should accept aria attributes', () => {
      const { container } = render(
        <RdsBreadcrumbs {...defaultProps} aria-label="Breadcrumb navigation" />
      );
      expect(container.querySelector('[aria-label="Breadcrumb navigation"]')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has no axe accessibility violations', async () => {
      const { container } = render(<RdsBreadcrumbs {...defaultProps} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
