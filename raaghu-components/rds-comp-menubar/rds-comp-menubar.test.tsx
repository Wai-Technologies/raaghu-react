import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompMenubar, { RdsCompMenubarItem } from './rds-comp-menubar';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
} from '@mui/icons-material';

const defaultItems: RdsCompMenubarItem[] = [
  {
    id: 'file',
    label: 'File',
    submenu: [
      { id: 'new', label: 'New', shortcut: 'Ctrl+N' },
      { id: 'open', label: 'Open', shortcut: 'Ctrl+O' },
      { id: 'save', label: 'Save', shortcut: 'Ctrl+S', icon: <SaveIcon /> },
    ],
  },
  {
    id: 'edit',
    label: 'Edit',
    submenu: [
      { id: 'cut', label: 'Cut', shortcut: 'Ctrl+X' },
      { id: 'copy', label: 'Copy', shortcut: 'Ctrl+C' },
      { id: 'paste', label: 'Paste', shortcut: 'Ctrl+V' },
    ],
  },
  {
    id: 'help',
    label: 'Help',
  },
];

describe('RdsCompMenubar', () => {
  // ──────────────────────────────────────────────────────────────────────────────
  describe('Uncontrolled Mode', () => {
    // ────────────────────────────────────────────────────────────────────────────
    it('renders menubar with items', () => {
      render(<RdsCompMenubar items={defaultItems} />);

      const menubar = screen.getByTestId('rds-comp-menubar');
      expect(menubar).toBeInTheDocument();
      expect(screen.getByTestId('rds-menubar-item-file')).toBeInTheDocument();
      expect(screen.getByTestId('rds-menubar-item-edit')).toBeInTheDocument();
      expect(screen.getByTestId('rds-menubar-item-help')).toBeInTheDocument();
    });

    // ────────────────────────────────────────────────────────────────────────────
    it('displays submenu when item with submenu is clicked', async () => {
      render(<RdsCompMenubar items={defaultItems} />);

      const fileItem = screen.getByTestId('rds-menubar-item-file');
      fireEvent.click(fileItem);

      await waitFor(() => {
        expect(screen.getByTestId('rds-menubar-subitem-new')).toBeInTheDocument();
        expect(screen.getByTestId('rds-menubar-subitem-open')).toBeInTheDocument();
      });
    });

    // ────────────────────────────────────────────────────────────────────────────
    it('closes submenu when clicking the same item again', async () => {
      render(<RdsCompMenubar items={defaultItems} />);

      const fileItem = screen.getByTestId('rds-menubar-item-file');

      // Open submenu
      fireEvent.click(fileItem);
      await waitFor(() => {
        expect(screen.getByTestId('rds-menubar-subitem-new')).toBeInTheDocument();
      });

      // Close submenu
      fireEvent.click(fileItem);
      await waitFor(() => {
        expect(screen.queryByTestId('rds-menubar-subitem-new')).not.toBeInTheDocument();
      });
    });

    // ────────────────────────────────────────────────────────────────────────────
    it('calls onClick callback when subitem is clicked', async () => {
      const handleClick = jest.fn();
      const itemsWithCallback: RdsCompMenubarItem[] = [
        {
          id: 'file',
          label: 'File',
          submenu: [
            { id: 'new', label: 'New', onClick: handleClick },
          ],
        },
      ];

      render(<RdsCompMenubar items={itemsWithCallback} />);

      const fileItem = screen.getByTestId('rds-menubar-item-file');
      fireEvent.click(fileItem);

      await waitFor(() => {
        const newItem = screen.getByTestId('rds-menubar-subitem-new');
        fireEvent.click(newItem);
      });

      expect(handleClick).toHaveBeenCalled();
    });

    // ────────────────────────────────────────────────────────────────────────────
    it('respects disabled flag on menu items', () => {
      const itemsWithDisabled: RdsCompMenubarItem[] = [
        { id: 'file', label: 'File' },
        { id: 'edit', label: 'Edit', disabled: true },
      ];

      render(<RdsCompMenubar items={itemsWithDisabled} />);

      const editItem = screen.getByTestId('rds-menubar-item-edit');
      expect(editItem).toHaveClass('Mui-disabled');
    });

    // ────────────────────────────────────────────────────────────────────────────
    it('displays icons in menu items when provided', () => {
      const itemsWithIcons: RdsCompMenubarItem[] = [
        { id: 'edit', label: 'Edit', icon: <EditIcon /> },
        { id: 'delete', label: 'Delete', icon: <DeleteIcon /> },
      ];

      const { container } = render(<RdsCompMenubar items={itemsWithIcons} />);

      const menubar = container.querySelector('.rds-comp-menubar__icon');
      expect(menubar).toBeInTheDocument();
    });

    // ────────────────────────────────────────────────────────────────────────────
    it('displays shortcut text when provided', () => {
      render(<RdsCompMenubar items={defaultItems} />);

      const fileItem = screen.getByTestId('rds-menubar-item-file');
      fireEvent.click(fileItem);

      const shortcutElements = screen.getAllByText(/Ctrl\+/);
      expect(shortcutElements.length).toBeGreaterThan(0);
    });

    // ────────────────────────────────────────────────────────────────────────────
    it('calls onMenuChange callback when menu opens/closes', () => {
      const handleMenuChange = jest.fn();
      render(
        <RdsCompMenubar
          items={defaultItems}
          onMenuChange={handleMenuChange}
        />
      );

      const fileItem = screen.getByTestId('rds-menubar-item-file');
      fireEvent.click(fileItem);

      expect(handleMenuChange).toHaveBeenCalledWith('file');
    });

    // ────────────────────────────────────────────────────────────────────────────
    it('switches between different submenus', async () => {
      render(<RdsCompMenubar items={defaultItems} />);

      // Open File menu
      const fileItem = screen.getByTestId('rds-menubar-item-file');
      fireEvent.click(fileItem);

      await waitFor(() => {
        expect(screen.getByTestId('rds-menubar-subitem-new')).toBeInTheDocument();
      });

      // Open Edit menu (should close File menu)
      const editItem = screen.getByTestId('rds-menubar-item-edit');
      fireEvent.click(editItem);

      await waitFor(() => {
        expect(screen.getByTestId('rds-menubar-subitem-cut')).toBeInTheDocument();
      });
    });
  });

  // ──────────────────────────────────────────────────────────────────────────────
  describe('Controlled Mode (openId + onMenuChange)', () => {
    // ────────────────────────────────────────────────────────────────────────────
    it('reflects controlled openId prop', async () => {
      const { rerender } = render(
        <RdsCompMenubar
          items={defaultItems}
          openId={null}
        />
      );

      await waitFor(() => {
        rerender(
          <RdsCompMenubar
            items={defaultItems}
            openId="file"
          />
        );
      });

      await waitFor(() => {
        expect(screen.getByTestId('rds-menubar-item-file')).toHaveClass('rds-comp-menubar__item--active');
      }, { timeout: 2000 });
    });

    // ────────────────────────────────────────────────────────────────────────────
    it('calls onMenuChange callback in controlled mode', () => {
      const handleMenuChange = jest.fn();
      render(
        <RdsCompMenubar
          items={defaultItems}
          openId={null}
          onMenuChange={handleMenuChange}
        />
      );

      const fileItem = screen.getByTestId('rds-menubar-item-file');
      fireEvent.click(fileItem);

      expect(handleMenuChange).toHaveBeenCalledWith('file');
    });

    // ────────────────────────────────────────────────────────────────────────────
    it('controlled mode prevents internal state updates', () => {
      const handleMenuChange = jest.fn();
      const { rerender } = render(
        <RdsCompMenubar
          items={defaultItems}
          openId="file"
          onMenuChange={handleMenuChange}
        />
      );

      const editItem = screen.getByTestId('rds-menubar-item-edit');
      fireEvent.click(editItem);

      expect(handleMenuChange).toHaveBeenCalledWith('edit');

      // Rerender with same openId to verify controlled behavior
      rerender(
        <RdsCompMenubar
          items={defaultItems}
          openId="file"
          onMenuChange={handleMenuChange}
        />
      );

      // Menu should still show File menu
      expect(screen.getByTestId('rds-menubar-item-file')).toHaveClass('rds-comp-menubar__item--active');
    });
  });

  // ──────────────────────────────────────────────────────────────────────────────
  describe('MUI Props', () => {
    // ────────────────────────────────────────────────────────────────────────────
    it('applies size prop correctly', () => {
      const { container } = render(
        <RdsCompMenubar items={defaultItems} size="large" />
      );

      expect(container.querySelector('.rds-comp-menubar--large')).toBeInTheDocument();
    });

    // ────────────────────────────────────────────────────────────────────────────
    it('applies variant prop correctly', () => {
      const { container } = render(
        <RdsCompMenubar items={defaultItems} variant="filled" />
      );

      expect(container.querySelector('.rds-comp-menubar--filled')).toBeInTheDocument();
    });

    // ────────────────────────────────────────────────────────────────────────────
    it('applies color prop correctly', () => {
      const { container } = render(
        <RdsCompMenubar items={defaultItems} color="success" />
      );

      expect(container.querySelector('.rds-comp-menubar--color-success')).toBeInTheDocument();
    });

    // ────────────────────────────────────────────────────────────────────────────
    it('applies fullWidth prop correctly', () => {
      const { container } = render(
        <RdsCompMenubar items={defaultItems} fullWidth={true} />
      );

      expect(container.querySelector('.rds-comp-menubar--full-width')).toBeInTheDocument();
    });

    // ────────────────────────────────────────────────────────────────────────────
    it('closeOnItemClick prop controls menu closure', async () => {
      const handleMenuChange = jest.fn();
      render(
        <RdsCompMenubar
          items={defaultItems}
          onMenuChange={handleMenuChange}
          closeOnItemClick={true}
        />
      );

      const fileItem = screen.getByTestId('rds-menubar-item-file');
      fireEvent.click(fileItem);

      await waitFor(() => {
        const newItem = screen.getByTestId('rds-menubar-subitem-new');
        fireEvent.click(newItem);
      });

      // Menu should close after item click
      expect(handleMenuChange).toHaveBeenLastCalledWith(null);
    });

    // ────────────────────────────────────────────────────────────────────────────
    it('closeOnItemClick=false keeps menu open', async () => {
      const handleMenuChange = jest.fn();
      render(
        <RdsCompMenubar
          items={defaultItems}
          onMenuChange={handleMenuChange}
          closeOnItemClick={false}
        />
      );

      const fileItem = screen.getByTestId('rds-menubar-item-file');
      fireEvent.click(fileItem);

      await waitFor(() => {
        const newItem = screen.getByTestId('rds-menubar-subitem-new');
        fireEvent.click(newItem);
      });

      // Menu should still be open
      expect(handleMenuChange).not.toHaveBeenLastCalledWith(null);
    });
  });

  // ──────────────────────────────────────────────────────────────────────────────
  describe('Accessibility', () => {
    // ────────────────────────────────────────────────────────────────────────────
    it('has proper ARIA attributes on menu items', () => {
      render(<RdsCompMenubar items={defaultItems} />);

      const fileItem = screen.getByTestId('rds-menubar-item-file');
      expect(fileItem).toHaveAttribute('role', 'menuitem');
    });

    // ────────────────────────────────────────────────────────────────────────────
    it('shows divider when divider flag is true', () => {
      const itemsWithDivider: RdsCompMenubarItem[] = [
        { id: 'file', label: 'File', divider: true },
        { id: 'edit', label: 'Edit' },
      ];

      const { container } = render(<RdsCompMenubar items={itemsWithDivider} />);

      const divider = container.querySelector('.rds-comp-menubar__divider');
      expect(divider).toBeInTheDocument();
    });
  });
});
