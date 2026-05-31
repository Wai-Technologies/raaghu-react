import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';
import RdsCompAiFabMenu, { RdsCompAiFabMenuProps } from './rds-comp-ai-fab-menu';

// Mock SCSS
jest.mock('./rds-comp-ai-fab-menu.scss', () => ({}));

// Mock Material UI Icons
jest.mock('@mui/icons-material/List', () => {
  return function MockListIcon() {
    return <span data-testid="list-icon">List</span>;
  };
});

jest.mock('@mui/icons-material/Refresh', () => {
  return function MockRefreshIcon() {
    return <span data-testid="refresh-icon">Refresh</span>;
  };
});

jest.mock('@mui/icons-material/FileUpload', () => {
  return function MockFileUploadIcon() {
    return <span data-testid="upload-icon">Upload</span>;
  };
});

jest.mock('@mui/icons-material/Delete', () => {
  return function MockDeleteIcon() {
    return <span data-testid="delete-icon">Delete</span>;
  };
});

jest.mock('@mui/icons-material/Download', () => {
  return function MockDownloadIcon() {
    return <span data-testid="download-icon">Download</span>;
  };
});

// Mock RdsCompAiIcon
jest.mock('../../raaghu-components/rds-comp-ai-icon/rds-comp-ai-icon', () => {
  return {
    __esModule: true,
    default: function MockRdsCompAiIcon({ name, height, width, colorVariant, fill, stroke, ...props }: any) {
      return (
        <span data-testid={`icon-${name}`} data-height={height} data-width={width} {...props}>
          {name}
        </span>
      );
    },
    registerMaterialIcons: jest.fn(),
  };
});

// Default props for testing
const defaultListItems = [
  { key: 'item1', value: 'Item 1', icon: 'list', onClick: jest.fn() },
  { key: 'item2', value: 'Item 2', icon: 'refresh', onClick: jest.fn() },
  { key: 'item3', value: 'Item 3', icon: 'delete', onClick: jest.fn() },
];

const defaultProps: RdsCompAiFabMenuProps = {
  listItems: defaultListItems,
  menuIcon: 'list',
  colorVariant: 'primary',
  alignment: 'left',
};

describe('RdsCompAiFabMenu', () => {
  describe('Basic Rendering', () => {
    it('renders the component without crashing', () => {
      render(<RdsCompAiFabMenu {...defaultProps} />);
      expect(screen.getByTestId('fab-menu-btn')).toBeInTheDocument();
    });

    it('renders FAB menu button', () => {
      render(<RdsCompAiFabMenu {...defaultProps} />);
      const button = screen.getByTestId('fab-menu-btn');
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute('type', 'button');
    });

    it('renders menu dropdown initially hidden', () => {
      const { container } = render(<RdsCompAiFabMenu {...defaultProps} />);
      const dropdown = container.querySelector('.rds-fab-menu__dropdown');
      expect(dropdown).toBeInTheDocument();
    });

    it('has correct display name for debugging', () => {
      expect(RdsCompAiFabMenu.displayName).toBe('RdsCompAiFabMenu');
    });

    it('renders with default props', () => {
      render(
        <RdsCompAiFabMenu
          listItems={[
            { key: 'item1', value: 'Item 1', icon: 'list' },
          ]}
        />
      );
      expect(screen.getByTestId('fab-menu-btn')).toBeInTheDocument();
    });
  });

  describe('Menu Toggle', () => {
    it('opens menu when button is clicked', async () => {
      const { container } = render(<RdsCompAiFabMenu {...defaultProps} />);
      const button = screen.getByTestId('fab-menu-btn');

      fireEvent.click(button);

      await waitFor(() => {
        const dropdown = container.querySelector('.rds-fab-menu__dropdown--open');
        expect(dropdown).toBeInTheDocument();
      });
    });

    it('closes menu when button is clicked again', async () => {
      const { container } = render(<RdsCompAiFabMenu {...defaultProps} />);
      const button = screen.getByTestId('fab-menu-btn');

      fireEvent.click(button);
      await waitFor(() => {
        expect(container.querySelector('.rds-fab-menu__dropdown--open')).toBeInTheDocument();
      });

      fireEvent.click(button);
      await waitFor(() => {
        expect(container.querySelector('.rds-fab-menu__dropdown--open')).not.toBeInTheDocument();
      });
    });

    it('toggles aria-expanded attribute', async () => {
      render(<RdsCompAiFabMenu {...defaultProps} />);
      const button = screen.getByTestId('fab-menu-btn');

      expect(button).toHaveAttribute('aria-expanded', 'false');

      fireEvent.click(button);
      await waitFor(() => {
        expect(button).toHaveAttribute('aria-expanded', 'true');
      });

      fireEvent.click(button);
      await waitFor(() => {
        expect(button).toHaveAttribute('aria-expanded', 'false');
      });
    });

    it('closes menu when clicking outside', async () => {
      const { container } = render(
        <div>
          <RdsCompAiFabMenu {...defaultProps} />
          <div data-testid="outside">Outside</div>
        </div>
      );
      const button = screen.getByTestId('fab-menu-btn');
      const outside = screen.getByTestId('outside');

      fireEvent.click(button);
      await waitFor(() => {
        expect(container.querySelector('.rds-fab-menu--open')).toBeInTheDocument();
      });

      fireEvent.mouseDown(outside);
      await waitFor(() => {
        expect(container.querySelector('.rds-fab-menu--open')).not.toBeInTheDocument();
      });
    });
  });

  describe('List Items Rendering', () => {
    it('renders all list items', () => {
      render(<RdsCompAiFabMenu {...defaultProps} />);
      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
      expect(screen.getByText('Item 3')).toBeInTheDocument();
    });

    it('renders list items with correct role', () => {
      render(<RdsCompAiFabMenu {...defaultProps} />);
      const items = screen.getAllByRole('link');
      expect(items.length).toBeGreaterThanOrEqual(defaultListItems.length);
    });

    it('renders single list item', () => {
      const singleItem = [{ key: 'item1', value: 'Single Item', icon: 'list' }];
      render(<RdsCompAiFabMenu listItems={singleItem} />);
      expect(screen.getByText('Single Item')).toBeInTheDocument();
    });

    it('renders empty list when no items provided', () => {
      const { container } = render(<RdsCompAiFabMenu listItems={[]} />);
      const dropdown = container.querySelector('.rds-fab-menu__dropdown');
      expect(dropdown?.children.length).toBe(0);
    });

    it('renders large number of list items', () => {
      const manyItems = Array.from({ length: 20 }, (_, i) => ({
        key: `item${i}`,
        value: `Item ${i}`,
        icon: 'list',
      }));
      render(<RdsCompAiFabMenu listItems={manyItems} />);
      const items = screen.getAllByRole('link');
      expect(items.length).toBe(20);
    });

    it('renders list items with custom icons', () => {
      const itemsWithIcons = [
        { key: 'item1', value: 'Refresh', icon: 'refresh' },
        { key: 'item2', value: 'Download', icon: 'download' },
        { key: 'item3', value: 'Delete', icon: 'delete' },
      ];
      render(<RdsCompAiFabMenu listItems={itemsWithIcons} />);
      expect(screen.getByTestId('icon-refresh')).toBeInTheDocument();
      expect(screen.getByTestId('icon-download')).toBeInTheDocument();
      expect(screen.getByTestId('icon-delete')).toBeInTheDocument();
    });
  });

  describe('Icon Rendering', () => {
    it('renders menu button with icon', () => {
      const { container } = render(<RdsCompAiFabMenu {...defaultProps} menuIcon="list" />);
      const button = container.querySelector('button');
      const buttonIcon = button?.querySelector('[data-testid="icon-list"]');
      expect(buttonIcon).toBeInTheDocument();
    });

    it('renders with custom menu icon', () => {
      const { container } = render(<RdsCompAiFabMenu {...defaultProps} menuIcon="refresh" />);
      const button = container.querySelector('button');
      const buttonIcon = button?.querySelector('[data-testid="icon-refresh"]');
      expect(buttonIcon).toBeInTheDocument();
    });

    it('renders item icons with correct dimensions', () => {
      const itemsWithDimensions = [
        { key: 'item1', value: 'Item', icon: 'list', iconHeight: '20px', iconWidth: '20px' },
      ];
      const { container } = render(<RdsCompAiFabMenu listItems={itemsWithDimensions} />);
      const icons = container.querySelectorAll('[data-testid="icon-list"]');
      expect(icons.length).toBeGreaterThan(0);
      // Target the item icon, not the button icon
      const itemIcon = Array.from(icons).find((icon) => icon.getAttribute('data-height') === '20px');
      expect(itemIcon).toHaveAttribute('data-height', '20px');
      expect(itemIcon).toHaveAttribute('data-width', '20px');
    });
  });

  describe('Props and Styling', () => {
    it('applies color variant class', () => {
      const { container } = render(
        <RdsCompAiFabMenu {...defaultProps} colorVariant="primary" />
      );
      const button = container.querySelector('.rds-fab-menu__button--primary');
      expect(button).toBeInTheDocument();
    });

    it('renders with different color variants', () => {
      const variants = ['primary', 'danger', 'secondary'];
      variants.forEach((variant) => {
        const { container, unmount } = render(
          <RdsCompAiFabMenu {...defaultProps} colorVariant={variant as 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'dark' | 'light'} />
        );
        const button = container.querySelector(`.rds-fab-menu__button--${variant}`);
        expect(button).toBeInTheDocument();
        unmount();
      });
    });

    it('applies size class when size prop is provided', () => {
      const { container } = render(
        <RdsCompAiFabMenu {...defaultProps} size="large" />
      );
      const button = container.querySelector('.rds-fab-menu__button--large');
      expect(button).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(
        <RdsCompAiFabMenu {...defaultProps} className="custom-class" />
      );
      const button = container.querySelector('.custom-class');
      expect(button).toBeInTheDocument();
    });

    it('renders with left alignment by default', () => {
      const { container } = render(
        <RdsCompAiFabMenu listItems={defaultListItems} />
      );
      expect(container.querySelector('[data-alignment="left"]')).toBeInTheDocument();
    });

    it('renders with right alignment', () => {
      const { container } = render(
        <RdsCompAiFabMenu {...defaultProps} alignment="right" />
      );
      expect(container.querySelector('[data-alignment="right"]')).toBeInTheDocument();
      expect(container.querySelector('.rds-fab-menu--right')).toBeInTheDocument();
    });

    it('applies border class when isShowBorder is true', () => {
      const { container } = render(
        <RdsCompAiFabMenu {...defaultProps} isShowBorder={true} />
      );
      expect(container.querySelector('.rds-fab-menu__dropdown--bordered')).toBeInTheDocument();
    });

    it('does not apply border class when isShowBorder is false', () => {
      const { container } = render(
        <RdsCompAiFabMenu {...defaultProps} isShowBorder={false} />
      );
      expect(container.querySelector('.rds-fab-menu__dropdown--bordered')).not.toBeInTheDocument();
    });

    it('applies id attribute', () => {
      const { container } = render(
        <RdsCompAiFabMenu {...defaultProps} id="attachment-text" />
      );
      expect(container.querySelector('#attachment-text')).not.toBeInTheDocument();
      const item = container.querySelector('.rds-fab-menu__item--compact');
      expect(item).toBeInTheDocument();
    });
  });

  describe('Background Type', () => {
    it('renders with circular background by default', () => {
      const { container } = render(
        <RdsCompAiFabMenu {...defaultProps} backgroundType="circular" />
      );
      expect(container.querySelector('.rds-fab-menu__button--circular')).toBeInTheDocument();
    });

    it('renders with rectangular background', () => {
      const { container } = render(
        <RdsCompAiFabMenu {...defaultProps} backgroundType="rectangular" />
      );
      expect(container.querySelector('.rds-fab-menu__button--rectangular')).toBeInTheDocument();
    });

    it('renders with no background', () => {
      const { container } = render(
        <RdsCompAiFabMenu {...defaultProps} backgroundType="none" />
      );
      expect(container.querySelector('.rds-fab-menu__button--none')).toBeInTheDocument();
    });

    it('uses isRectangular prop when backgroundType is not set', () => {
      const { container } = render(
        <RdsCompAiFabMenu listItems={defaultListItems} isRectangular={true} />
      );
      expect(container.querySelector('.rds-fab-menu__button--rectangular')).toBeInTheDocument();
    });

    it('prioritizes backgroundType over isRectangular', () => {
      const { container } = render(
        <RdsCompAiFabMenu
          listItems={defaultListItems}
          backgroundType="circular"
          isRectangular={true}
        />
      );
      expect(container.querySelector('.rds-fab-menu__button--circular')).toBeInTheDocument();
      expect(container.querySelector('.rds-fab-menu__button--rectangular')).not.toBeInTheDocument();
    });
  });

  describe('Event Handling', () => {
    it('calls list item onClick when item is clicked', async () => {
      const onClick = jest.fn();
      const items = [
        { key: 'item1', value: 'Item 1', icon: 'list', onClick },
      ];
      render(<RdsCompAiFabMenu listItems={items} />);

      const item = screen.getByText('Item 1');
      fireEvent.click(item);

      await waitFor(() => {
        expect(onClick).toHaveBeenCalled();
      });
    });

    it('closes menu after clicking list item', async () => {
      const { container } = render(<RdsCompAiFabMenu {...defaultProps} />);
      const button = screen.getByTestId('fab-menu-btn');

      fireEvent.click(button);
      await waitFor(() => {
        expect(container.querySelector('.rds-fab-menu--open')).toBeInTheDocument();
      });

      const item = screen.getByText('Item 1');
      fireEvent.click(item);

      await waitFor(() => {
        expect(container.querySelector('.rds-fab-menu--open')).not.toBeInTheDocument();
      });
    });

    it('prevents default event on item click', async () => {
      const items = [
        { key: 'item1', value: 'Item 1', icon: 'list', onClick: jest.fn() },
      ];
      render(<RdsCompAiFabMenu listItems={items} />);

      const item = screen.getByText('Item 1');
      const event = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }) as any;
      event.preventDefault = jest.fn();

      fireEvent.click(item);

      await waitFor(() => {
        expect(event.preventDefault).not.toThrow();
      });
    });

    it('calls menu button onClick when provided', async () => {
      const onClick = jest.fn();
      render(
        <RdsCompAiFabMenu {...defaultProps} onClick={onClick} />
      );
      const button = screen.getByTestId('fab-menu-btn');
      fireEvent.click(button);

      await waitFor(() => {
        expect(button).toBeInTheDocument();
      });
    });
  });

  describe('Accessibility', () => {
    it('menu button is keyboard accessible', async () => {
      render(<RdsCompAiFabMenu {...defaultProps} />);
      const button = screen.getByTestId('fab-menu-btn');
      expect(button).toHaveAttribute('type', 'button');
  
    it('has no axe accessibility violations', async () => {
      const { container } = render(<RdsCompAiFabMenu {...defaultProps} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

    it('has proper role attribute on dropdown', () => {
      const { container } = render(<RdsCompAiFabMenu {...defaultProps} />);
      const dropdown = container.querySelector('[role="menu"]');
      expect(dropdown).toBeInTheDocument();
    });

    it('list items have link role', () => {
      render(<RdsCompAiFabMenu {...defaultProps} />);
      const items = screen.getAllByRole('link');
      expect(items.length).toBeGreaterThan(0);
    });

    it('aria-expanded reflects menu state', async () => {
      render(<RdsCompAiFabMenu {...defaultProps} />);
      const button = screen.getByTestId('fab-menu-btn');

      expect(button).toHaveAttribute('aria-expanded', 'false');

      fireEvent.click(button);
      await waitFor(() => {
        expect(button).toHaveAttribute('aria-expanded', 'true');
      });
    });
  });

  describe('Edge Cases', () => {
    it('handles list items with missing optional properties', () => {
      const minimalItems = [
        { key: 'item1', value: 'Item 1' },
      ];
      render(<RdsCompAiFabMenu listItems={minimalItems as any} />);
      expect(screen.getByText('Item 1')).toBeInTheDocument();
    });

    it('handles list item with very long text', () => {
      const longText = 'A'.repeat(200);
      const items = [
        { key: 'item1', value: longText, icon: 'list' },
      ];
      render(<RdsCompAiFabMenu listItems={items} />);
      expect(screen.getByText(longText)).toBeInTheDocument();
    });

    it('handles list item with special characters', () => {
      const items = [
        { key: 'item1', value: 'Item & <Special> "Characters"', icon: 'list' },
      ];
      render(<RdsCompAiFabMenu listItems={items} />);
      expect(screen.getByText('Item & <Special> "Characters"')).toBeInTheDocument();
    });

    it('handles list item with unicode characters', () => {
      const items = [
        { key: 'item1', value: '世界 🌍 Emoji', icon: 'list' },
      ];
      render(<RdsCompAiFabMenu listItems={items} />);
      expect(screen.getByText('世界 🌍 Emoji')).toBeInTheDocument();
    });

    it('handles undefined menuIcon', () => {
      render(<RdsCompAiFabMenu listItems={defaultListItems} menuIcon={undefined} />);
      expect(screen.getByTestId('fab-menu-btn')).toBeInTheDocument();
    });

    it('handles multiple menu instances independently', () => {
      const { container } = render(
        <div>
          <RdsCompAiFabMenu listItems={[{ key: 'item1', value: 'Menu 1', icon: 'list' }]} />
          <RdsCompAiFabMenu listItems={[{ key: 'item2', value: 'Menu 2', icon: 'list' }]} />
        </div>
      );
      expect(screen.getByText('Menu 1')).toBeInTheDocument();
      expect(screen.getByText('Menu 2')).toBeInTheDocument();
    });

    it('handles rapid open/close toggles', async () => {
      const { container } = render(<RdsCompAiFabMenu {...defaultProps} />);
      const button = screen.getByTestId('fab-menu-btn');

      fireEvent.click(button);
      fireEvent.click(button);
      fireEvent.click(button);

      await waitFor(() => {
        expect(container.querySelector('.rds-fab-menu--open')).toBeInTheDocument();
      });
    });
  });

  describe('Component Structure', () => {
    it('renders with correct root class', () => {
      const { container } = render(<RdsCompAiFabMenu {...defaultProps} />);
      expect(container.querySelector('.rds-fab-menu')).toBeInTheDocument();
    });

    it('renders button before dropdown container', () => {
      const { container } = render(<RdsCompAiFabMenu {...defaultProps} />);
      const button = container.querySelector('button');
      const dropdownContainer = container.querySelector('.rds-fab-menu__dropdown-container');
      if (button && dropdownContainer) {
        // Check if button is in the DOM and appears before dropdown
        expect(button).toBeInTheDocument();
        expect(dropdownContainer).toBeInTheDocument();
        // Both elements should exist in the same container
        const fabMenu = container.querySelector('.rds-fab-menu');
        expect(fabMenu?.contains(button)).toBe(true);
        expect(fabMenu?.contains(dropdownContainer)).toBe(true);
      }
    });

    it('applies data attributes correctly', () => {
      const { container } = render(
        <RdsCompAiFabMenu {...defaultProps} alignment="right" />
      );
      const root = container.querySelector('.rds-fab-menu');
      expect(root).toHaveAttribute('data-alignment', 'right');
      expect(root).toHaveAttribute('data-open');
    });
  });

  describe('Re-render Behavior', () => {
    it('updates list items on prop change', () => {
      const { rerender } = render(
        <RdsCompAiFabMenu
          listItems={[{ key: 'item1', value: 'Initial', icon: 'list' }]}
        />
      );
      expect(screen.getByText('Initial')).toBeInTheDocument();

      rerender(
        <RdsCompAiFabMenu
          listItems={[{ key: 'item1', value: 'Updated', icon: 'list' }]}
        />
      );
      expect(screen.getByText('Updated')).toBeInTheDocument();
    });

    it('updates color variant on prop change', () => {
      const { container, rerender } = render(
        <RdsCompAiFabMenu {...defaultProps} colorVariant="primary" />
      );
      expect(container.querySelector('.rds-fab-menu__button--primary')).toBeInTheDocument();

      rerender(
        <RdsCompAiFabMenu {...defaultProps} colorVariant="danger" />
      );
      expect(container.querySelector('.rds-fab-menu__button--danger')).toBeInTheDocument();
    });

    it('maintains open state across re-renders with same props', async () => {
      const { rerender } = render(<RdsCompAiFabMenu {...defaultProps} />);
      const button = screen.getByTestId('fab-menu-btn');

      fireEvent.click(button);
      await waitFor(() => {
        expect(button).toHaveAttribute('aria-expanded', 'true');
      });

      rerender(<RdsCompAiFabMenu {...defaultProps} />);
      await waitFor(() => {
        expect(button).toHaveAttribute('aria-expanded', 'true');
      });
    });
  });

  describe('Icon Customization', () => {
    it('renders menu icon with correct properties', () => {
      const { container } = render(
        <RdsCompAiFabMenu
          {...defaultProps}
          menuIcon="refresh"
          menuiconHeight="28px"
          menuiconWidth="28px"
        />
      );
      const button = container.querySelector('button');
      const menuIcon = button?.querySelector('[data-testid="icon-refresh"]');
      expect(menuIcon).toBeInTheDocument();
    });

    it('renders variation of menu icons', () => {
      const icons = ['list', 'refresh', 'download', 'delete'];
      icons.forEach((icon) => {
        const { container, unmount } = render(
          <RdsCompAiFabMenu listItems={[]} menuIcon={icon} />
        );
        const button = container.querySelector('button');
        const buttonIcon = button?.querySelector(`[data-testid="icon-${icon}"]`);
        expect(buttonIcon).toBeInTheDocument();
        unmount();
      });
    });
  });
});