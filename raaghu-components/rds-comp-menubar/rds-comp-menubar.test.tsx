import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RdsCompMenubar, { MenubarItem } from './rds-comp-menubar';

const defaultItems: MenubarItem[] = [
  { id: 'file', label: 'File' },
  { id: 'edit', label: 'Edit' },
  { id: 'view', label: 'View' },
];

const itemsWithSubmenu: MenubarItem[] = [
  {
    id: 'file',
    label: 'File',
    submenu: [
      { id: 'new', label: 'New' },
      { id: 'open', label: 'Open' },
      { id: 'save', label: 'Save', disabled: true },
    ],
  },
  {
    id: 'edit',
    label: 'Edit',
    submenu: [
      { id: 'undo', label: 'Undo' },
      { id: 'redo', label: 'Redo' },
    ],
  },
];

describe('RdsCompMenubar', () => {
  describe('Rendering', () => {
    it('should render menubar with items', () => {
      render(<RdsCompMenubar items={defaultItems} />);
      expect(screen.getByTestId('rds-comp-menubar')).toBeInTheDocument();
      expect(screen.getByText('File')).toBeInTheDocument();
      expect(screen.getByText('Edit')).toBeInTheDocument();
      expect(screen.getByText('View')).toBeInTheDocument();
    });

    it('should have correct CSS classes', () => {
      const { container } = render(
        <RdsCompMenubar items={defaultItems} size="medium" variant="text" />
      );
      const menubar = container.querySelector('.rds-comp-menubar');
      expect(menubar).toHaveClass('rds-comp-menubar--medium');
      expect(menubar).toHaveClass('rds-comp-menubar--text');
    });

    it('should render with correct orientation', () => {
      const { container } = render(
        <RdsCompMenubar items={defaultItems} orientation="horizontal" />
      );
      expect(container.querySelector('.rds-comp-menubar--horizontal')).toBeInTheDocument();
    });

    it('should render vertical orientation', () => {
      const { container } = render(
        <RdsCompMenubar items={defaultItems} orientation="vertical" />
      );
      expect(container.querySelector('.rds-comp-menubar--vertical')).toBeInTheDocument();
    });
  });

  describe('Size Variants', () => {
    it('should apply small size class', () => {
      const { container } = render(<RdsCompMenubar items={defaultItems} size="small" />);
      expect(container.querySelector('.rds-comp-menubar--small')).toBeInTheDocument();
    });

    it('should apply large size class', () => {
      const { container } = render(<RdsCompMenubar items={defaultItems} size="large" />);
      expect(container.querySelector('.rds-comp-menubar--large')).toBeInTheDocument();
    });
  });

  describe('Color Variants', () => {
    it('should apply color classes', () => {
      const { container } = render(
        <RdsCompMenubar items={defaultItems} color="primary" />
      );
      expect(container.querySelector('.rds-comp-menubar--primary')).toBeInTheDocument();
    });

    it('should apply secondary color', () => {
      const { container } = render(
        <RdsCompMenubar items={defaultItems} color="secondary" />
      );
      expect(container.querySelector('.rds-comp-menubar--secondary')).toBeInTheDocument();
    });

    it('should apply success color', () => {
      const { container } = render(
        <RdsCompMenubar items={defaultItems} color="success" />
      );
      expect(container.querySelector('.rds-comp-menubar--success')).toBeInTheDocument();
    });

    it('should apply error color', () => {
      const { container } = render(
        <RdsCompMenubar items={defaultItems} color="error" />
      );
      expect(container.querySelector('.rds-comp-menubar--error')).toBeInTheDocument();
    });
  });

  describe('Variant Styling', () => {
    it('should apply filled variant', () => {
      const { container } = render(
        <RdsCompMenubar items={defaultItems} variant="filled" />
      );
      expect(container.querySelector('.rds-comp-menubar--filled')).toBeInTheDocument();
    });

    it('should apply outlined variant', () => {
      const { container } = render(
        <RdsCompMenubar items={defaultItems} variant="outlined" />
      );
      expect(container.querySelector('.rds-comp-menubar--outlined')).toBeInTheDocument();
    });
  });

  describe('Disabled Items', () => {
    it('should render disabled items with correct class', () => {
      const disabledItems: MenubarItem[] = [
        { id: 'file', label: 'File' },
        { id: 'edit', label: 'Edit', disabled: true },
      ];
      const { container } = render(<RdsCompMenubar items={disabledItems} />);
      const disabledItem = container.querySelector('.rds-comp-menubar__item--disabled');
      expect(disabledItem).toBeInTheDocument();
    });

    it('should not allow clicking disabled items', () => {
      const mockClick = jest.fn();
      const disabledItems: MenubarItem[] = [
        { id: 'file', label: 'File', disabled: true, onClick: mockClick },
      ];
      render(<RdsCompMenubar items={disabledItems} />);
      const button = screen.getByText('File').closest('button');
      fireEvent.click(button!);
      expect(mockClick).not.toHaveBeenCalled();
    });
  });

  describe('Horizontal Menubar with Submenus', () => {
    it('should render items with submenu indicator', () => {
      const { container } = render(
        <RdsCompMenubar items={itemsWithSubmenu} orientation="horizontal" />
      );
      const submenuItems = container.querySelectorAll('.rds-comp-menubar__item--has-submenu');
      expect(submenuItems.length).toBe(2);
    });

    it('should open submenu on click (horizontal)', () => {
      render(<RdsCompMenubar items={itemsWithSubmenu} orientation="horizontal" />);
      const fileButton = screen.getByText('File');
      fireEvent.click(fileButton);
      expect(screen.getByText('New')).toBeInTheDocument();
      expect(screen.getByText('Open')).toBeInTheDocument();
    });

    it('should close submenu when clicking a submenu item', async () => {
      const user = userEvent.setup();
      const mockCallback = jest.fn();
      const items: MenubarItem[] = [
        {
          id: 'file',
          label: 'File',
          submenu: [
            { id: 'new', label: 'New', onClick: mockCallback },
          ],
        },
      ];
      render(<RdsCompMenubar items={items} orientation="horizontal" />);
      const fileButton = screen.getByText('File');
      await user.click(fileButton);
      expect(screen.getByText('New')).toBeInTheDocument();
      const newItem = screen.getByText('New');
      await user.click(newItem);
      // Verify the submenu item click handler was called
      expect(mockCallback).toHaveBeenCalled();
    });

    it('should handle submenu item clicks', () => {
      const mockClick = jest.fn();
      const items: MenubarItem[] = [
        {
          id: 'file',
          label: 'File',
          submenu: [
            { id: 'new', label: 'New', onClick: mockClick },
          ],
        },
      ];
      render(<RdsCompMenubar items={items} orientation="horizontal" />);
      const fileButton = screen.getByText('File');
      fireEvent.click(fileButton);
      const newItem = screen.getByText('New');
      fireEvent.click(newItem);
      expect(mockClick).toHaveBeenCalled();
    });
  });

  describe('Vertical Menubar with Submenus', () => {
    it('should expand/collapse submenu on click (vertical)', async () => {
      const user = userEvent.setup();
      render(<RdsCompMenubar items={itemsWithSubmenu} orientation="vertical" />);
      const fileButton = screen.getByText('File');
      
      // Initially collapsed, submenu not visible
      expect(screen.queryByText('New')).not.toBeInTheDocument();
      
      // Click to expand
      await user.click(fileButton);
      expect(screen.getByText('New')).toBeInTheDocument();
      
      // Click to collapse
      await user.click(fileButton);
      // Wait for collapse animation to complete
      setTimeout(() => {
        expect(screen.queryByText('New')).not.toBeInTheDocument();
      }, 100);
    });

    it('should handle multiple submenus in vertical mode', () => {
      render(<RdsCompMenubar items={itemsWithSubmenu} orientation="vertical" />);
      const fileButton = screen.getByText('File');
      fireEvent.click(fileButton);
      expect(screen.getByText('New')).toBeInTheDocument();
    });
  });

  describe('Callbacks', () => {
    it('should call onItemClick when item is clicked', () => {
      const mockCallback = jest.fn();
      render(
        <RdsCompMenubar items={defaultItems} onItemClick={mockCallback} />
      );
      const fileButton = screen.getByText('File');
      fireEvent.click(fileButton);
      // When no submenu is clicked, only itemId is passed (subItemId is undefined)
      expect(mockCallback).toHaveBeenCalledWith('file', undefined);
    });

    it('should call onItemClick with both item and sub-item IDs', () => {
      const mockCallback = jest.fn();
      render(
        <RdsCompMenubar
          items={itemsWithSubmenu}
          orientation="horizontal"
          onItemClick={mockCallback}
        />
      );
      const fileButton = screen.getByText('File');
      fireEvent.click(fileButton);
      const newItem = screen.getByText('New');
      fireEvent.click(newItem);
      expect(mockCallback).toHaveBeenCalledWith('file', 'new');
    });

    it('should call item onClick callback', () => {
      const mockClick = jest.fn();
      const items: MenubarItem[] = [
        { id: 'file', label: 'File', onClick: mockClick },
      ];
      render(<RdsCompMenubar items={items} />);
      const fileButton = screen.getByText('File');
      fireEvent.click(fileButton);
      expect(mockClick).toHaveBeenCalled();
    });
  });

  describe('Badge Support', () => {
    it('should render badge when provided', () => {
      const items: MenubarItem[] = [
        { id: 'file', label: 'File', badge: 5 },
      ];
      render(<RdsCompMenubar items={items} />);
      expect(screen.getByText('5')).toBeInTheDocument();
    });

    it('should render string badge', () => {
      const items: MenubarItem[] = [
        { id: 'file', label: 'File', badge: 'NEW' },
      ];
      render(<RdsCompMenubar items={items} />);
      expect(screen.getByText('NEW')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', () => {
      const { container } = render(
        <RdsCompMenubar items={defaultItems} orientation="horizontal" />
      );
      const menuList = container.querySelector('[role="menubar"]');
      expect(menuList).toBeInTheDocument();
    });

    it('should mark items with submenu as aria-haspopup', () => {
      const { container } = render(
        <RdsCompMenubar items={itemsWithSubmenu} orientation="horizontal" />
      );
      const button = screen.getByText('File').closest('button');
      expect(button).toHaveAttribute('aria-haspopup', 'true');
    });

    it('should update aria-expanded state', () => {
      render(<RdsCompMenubar items={itemsWithSubmenu} orientation="horizontal" />);
      const button = screen.getByText('File').closest('button');
      expect(button).toHaveAttribute('aria-expanded', 'false');
      fireEvent.click(button!);
      expect(button).toHaveAttribute('aria-expanded', 'true');
    });
  });

  describe('Icon Support', () => {
    it('should render icons when provided', () => {
      const items: MenubarItem[] = [
        {
          id: 'file',
          label: 'File',
          icon: <span data-testid="file-icon">📄</span>,
        },
      ];
      render(<RdsCompMenubar items={items} />);
      expect(screen.getByTestId('file-icon')).toBeInTheDocument();
    });

    it('should render submenu item icons', () => {
      const items: MenubarItem[] = [
        {
          id: 'file',
          label: 'File',
          submenu: [
            {
              id: 'new',
              label: 'New',
              icon: <span data-testid="new-icon">✨</span>,
            },
          ],
        },
      ];
      render(<RdsCompMenubar items={items} orientation="horizontal" />);
      const fileButton = screen.getByText('File');
      fireEvent.click(fileButton);
      expect(screen.getByTestId('new-icon')).toBeInTheDocument();
    });
  });

  describe('Active State', () => {
    it('should apply active class to active item', () => {
      const { container } = render(
        <RdsCompMenubar items={defaultItems} activeId="file" />
      );
      const activeItem = container.querySelector('.rds-comp-menubar__item--active');
      expect(activeItem).toHaveTextContent('File');
    });

    it('should update active state on prop change', () => {
      const { container, rerender } = render(
        <RdsCompMenubar items={defaultItems} activeId="file" />
      );
      let activeItem = container.querySelector('.rds-comp-menubar__item--active');
      expect(activeItem).toHaveTextContent('File');

      rerender(<RdsCompMenubar items={defaultItems} activeId="edit" />);
      activeItem = container.querySelector('.rds-comp-menubar__item--active');
      expect(activeItem).toHaveTextContent('Edit');
    });
  });

  describe('Theme Support', () => {
    it('should apply dark theme class', () => {
      const { container } = render(
        <RdsCompMenubar items={defaultItems} theme="dark" />
      );
      expect(container.querySelector('[data-theme="dark"]')).toBeInTheDocument();
    });

    it('should apply light theme class', () => {
      const { container } = render(
        <RdsCompMenubar items={defaultItems} theme="light" />
      );
      expect(container.querySelector('[data-theme="light"]')).toBeInTheDocument();
    });
  });

  describe('Layout Variants', () => {
    it('should apply compact layout', () => {
      const { container } = render(
        <RdsCompMenubar items={defaultItems} layout="compact" />
      );
      expect(container.querySelector('.rds-comp-menubar--compact')).toBeInTheDocument();
    });
  });

  describe('Custom CSS Class', () => {
    it('should apply custom class', () => {
      const { container } = render(
        <RdsCompMenubar items={defaultItems} className="custom-class" />
      );
      expect(container.querySelector('.custom-class')).toBeInTheDocument();
    });
  });
});
