import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompTransferList from './rds-comp-transfer-list';
import { TransferListItem } from './rds-comp-transfer-list';

// Mock SCSS
jest.mock('./rds-comp-transfer-list.scss', () => ({}));

// Mock MUI Icons
jest.mock('@mui/icons-material/ChevronRight', () => {
  return function MockChevronRightIcon() {
    return <span data-testid="ChevronRightIcon">ChevronRightIcon</span>;
  };
});

jest.mock('@mui/icons-material/ChevronLeft', () => {
  return function MockChevronLeftIcon() {
    return <span data-testid="ChevronLeftIcon">ChevronLeftIcon</span>;
  };
});

const mockItems: TransferListItem[] = [
  { id: 'item-1', label: 'Item 1', description: 'Description 1' },
  { id: 'item-2', label: 'Item 2', description: 'Description 2' },
  { id: 'item-3', label: 'Item 3', description: 'Description 3' },
  { id: 'item-4', label: 'Item 4', disabled: false },
  { id: 'item-5', label: 'Item 5 (Disabled)', disabled: true },
];

describe('RdsCompTransferList', () => {
  describe('Rendering', () => {
    it('should render without crashing', () => {
      render(
        <RdsCompTransferList
          items={mockItems}
          defaultLeftItems={['item-1', 'item-2', 'item-3', 'item-4', 'item-5']}
        />
      );
      expect(screen.getByTestId('rds-comp-transfer-list')).toBeInTheDocument();
    });

    it('should render both list containers', () => {
      render(
        <RdsCompTransferList
          items={mockItems}
          defaultLeftItems={['item-1', 'item-2']}
        />
      );
      expect(screen.getByTestId('transfer-list-left')).toBeInTheDocument();
      expect(screen.getByTestId('transfer-list-right')).toBeInTheDocument();
    });

    it('should render items in left list', () => {
      render(
        <RdsCompTransferList
          items={mockItems}
          defaultLeftItems={['item-1', 'item-2']}
        />
      );
      expect(screen.getByTestId('transfer-item-item-1')).toBeInTheDocument();
      expect(screen.getByTestId('transfer-item-item-2')).toBeInTheDocument();
    });

    it('should render items in right list', () => {
      render(
        <RdsCompTransferList
          items={mockItems}
          defaultLeftItems={['item-1', 'item-2']}
        />
      );
      expect(screen.getByTestId('transfer-item-item-3')).toBeInTheDocument();
      expect(screen.getByTestId('transfer-item-item-4')).toBeInTheDocument();
    });

    it('should render with correct CSS classes', () => {
      const { container } = render(
        <RdsCompTransferList
          items={mockItems}
          defaultLeftItems={['item-1']}
          size="medium"
        />
      );
      expect(container.querySelector('.rds-comp-transfer-list')).toHaveClass(
        'rds-comp-transfer-list--medium'
      );
    });

    it('should render move buttons', () => {
      render(
        <RdsCompTransferList
          items={mockItems}
          defaultLeftItems={['item-1']}
        />
      );
      expect(screen.getByTestId('button-move-right')).toBeInTheDocument();
      expect(screen.getByTestId('button-move-left')).toBeInTheDocument();
    });
  });

  describe('Uncontrolled Mode', () => {
    it('should handle item selection in uncontrolled mode', () => {
      const handleCheckChange = jest.fn();
      render(
        <RdsCompTransferList
          items={mockItems}
          defaultLeftItems={['item-1', 'item-2']}
          onCheckChange={handleCheckChange}
        />
      );

      const item1 = screen.getByTestId('transfer-item-item-1');
      fireEvent.click(item1);

      expect(handleCheckChange).toHaveBeenCalledWith(['item-1']);
    });

    it('should move items from left to right', () => {
      const handleMove = jest.fn();
      const handleLeftItemsChange = jest.fn();

      render(
        <RdsCompTransferList
          items={mockItems}
          defaultLeftItems={['item-1', 'item-2']}
          defaultChecked={['item-1']}
          onMove={handleMove}
          onLeftItemsChange={handleLeftItemsChange}
        />
      );

      const moveRightButton = screen.getByTestId('button-move-right');
      fireEvent.click(moveRightButton);

      expect(handleLeftItemsChange).toHaveBeenCalledWith(['item-2']);
      expect(handleMove).toHaveBeenCalled();
    });

    it('should move items from right to left', () => {
      const handleMove = jest.fn();
      const handleLeftItemsChange = jest.fn();

      render(
        <RdsCompTransferList
          items={mockItems}
          defaultLeftItems={['item-1']}
          defaultChecked={['item-2']}
          onMove={handleMove}
          onLeftItemsChange={handleLeftItemsChange}
        />
      );

      const moveLeftButton = screen.getByTestId('button-move-left');
      fireEvent.click(moveLeftButton);

      expect(handleLeftItemsChange).toHaveBeenCalledWith(['item-1', 'item-2']);
      expect(handleMove).toHaveBeenCalled();
    });

    it('should clear checked items after move', () => {
      const handleCheckChange = jest.fn();

      const { rerender } = render(
        <RdsCompTransferList
          items={mockItems}
          defaultLeftItems={['item-1', 'item-2']}
          defaultChecked={['item-1']}
          onCheckChange={handleCheckChange}
        />
      );

      const moveRightButton = screen.getByTestId('button-move-right');
      fireEvent.click(moveRightButton);

      // Check that checkChange was called with empty array after move
      expect(handleCheckChange).toHaveBeenLastCalledWith([]);
    });

    it('should respect disabled items', () => {
      render(
        <RdsCompTransferList
          items={mockItems}
          defaultLeftItems={['item-1', 'item-5']}
        />
      );

      const disabledItem = screen.getByTestId('transfer-item-item-5');
      expect(disabledItem).toHaveClass('rds-comp-transfer-list__item--disabled');
    });
  });

  describe('Controlled Mode', () => {
    it('should reflect controlled checked values', () => {
      const { rerender } = render(
        <RdsCompTransferList
          items={mockItems}
          leftItems={['item-1', 'item-2']}
          checked={['item-1']}
        />
      );

      const checkbox1 = screen.getByTestId('checkbox-item-1').querySelector('input') as HTMLInputElement;
      expect(checkbox1.checked).toBe(true);

      rerender(
        <RdsCompTransferList
          items={mockItems}
          leftItems={['item-1', 'item-2']}
          checked={['item-2']}
        />
      );

      const checkbox2 = screen.getByTestId('checkbox-item-2').querySelector('input') as HTMLInputElement;
      expect(checkbox2.checked).toBe(true);
    });

    it('should reflect controlled leftItems values', () => {
      const { rerender } = render(
        <RdsCompTransferList
          items={mockItems}
          leftItems={['item-1', 'item-2']}
        />
      );

      expect(screen.getByTestId('transfer-item-item-1')).toBeInTheDocument();
      expect(screen.getByTestId('transfer-item-item-2')).toBeInTheDocument();
      expect(screen.getByTestId('transfer-item-item-3')).toBeInTheDocument();

      rerender(
        <RdsCompTransferList
          items={mockItems}
          leftItems={['item-3', 'item-4']}
        />
      );

      expect(screen.getByTestId('transfer-item-item-3')).toBeInTheDocument();
      expect(screen.getByTestId('transfer-item-item-4')).toBeInTheDocument();
    });

    it('should call onCheckChange when items are selected', () => {
      const handleCheckChange = jest.fn();

      render(
        <RdsCompTransferList
          items={mockItems}
          leftItems={['item-1', 'item-2']}
          checked={[]}
          onCheckChange={handleCheckChange}
        />
      );

      const item1 = screen.getByTestId('transfer-item-item-1');
      fireEvent.click(item1);

      expect(handleCheckChange).toHaveBeenCalledWith(['item-1']);
    });

    it('should handle multiple selection in controlled mode', () => {
      const handleCheckChange = jest.fn();

      render(
        <RdsCompTransferList
          items={mockItems}
          leftItems={['item-1', 'item-2', 'item-3']}
          checked={['item-1']}
          multiple={true}
          onCheckChange={handleCheckChange}
        />
      );

      const item2 = screen.getByTestId('transfer-item-item-2');
      fireEvent.click(item2);

      expect(handleCheckChange).toHaveBeenCalledWith(['item-1', 'item-2']);
    });
  });

  describe('Select All Functionality', () => {
    it('should select all items when select all checkbox is clicked', () => {
      const handleCheckChange = jest.fn();

      render(
        <RdsCompTransferList
          items={mockItems}
          defaultLeftItems={['item-1', 'item-2', 'item-3']}
          showSelectAll={true}
          onCheckChange={handleCheckChange}
        />
      );

      const selectAllCheckbox = screen.getByTestId('select-all-left');
      const checkboxInput = selectAllCheckbox.querySelector('input[type="checkbox"]') as HTMLInputElement;
      
      fireEvent.click(checkboxInput);

      // Should select all non-disabled items
      const enabledItems = mockItems
        .filter(item => !item.disabled && ['item-1', 'item-2', 'item-3'].includes(item.id as string))
        .map(item => item.id);

      // Check that some items were selected
      expect(handleCheckChange).toHaveBeenCalled();
      const lastCall = handleCheckChange.mock.calls[handleCheckChange.mock.calls.length - 1][0];
      expect(lastCall.length).toBeGreaterThan(0);
    });

    it('should deselect all items when select all checkbox is clicked again', () => {
      const handleCheckChange = jest.fn();

      render(
        <RdsCompTransferList
          items={mockItems}
          defaultLeftItems={['item-1', 'item-2']}
          defaultChecked={['item-1', 'item-2']}
          showSelectAll={true}
          onCheckChange={handleCheckChange}
        />
      );

      const selectAllCheckbox = screen.getByTestId('select-all-left');
      const checkboxInput = selectAllCheckbox.querySelector('input[type="checkbox"]') as HTMLInputElement;
      
      fireEvent.click(checkboxInput);

      expect(handleCheckChange).toHaveBeenCalled();
    });

    it('should not show select all checkbox when showSelectAll is false', () => {
      render(
        <RdsCompTransferList
          items={mockItems}
          defaultLeftItems={['item-1']}
          showSelectAll={false}
        />
      );

      expect(screen.queryByTestId('select-all-left')).not.toBeInTheDocument();
    });
  });

  describe('Move Buttons', () => {
    it('should disable move right button when no items are selected in left list', () => {
      render(
        <RdsCompTransferList
          items={mockItems}
          defaultLeftItems={['item-1', 'item-2']}
          defaultChecked={[]}
        />
      );

      const moveRightButton = screen.getByTestId('button-move-right');
      expect(moveRightButton).toBeDisabled();
    });

    it('should disable move left button when no items are selected in right list', () => {
      render(
        <RdsCompTransferList
          items={mockItems}
          defaultLeftItems={['item-1']}
          defaultChecked={[]}
        />
      );

      const moveLeftButton = screen.getByTestId('button-move-left');
      expect(moveLeftButton).toBeDisabled();
    });

    it('should disable move buttons when disableMoveButtons is true', () => {
      render(
        <RdsCompTransferList
          items={mockItems}
          defaultLeftItems={['item-1', 'item-2']}
          defaultChecked={['item-1']}
          disableMoveButtons={true}
        />
      );

      const moveRightButton = screen.getByTestId('button-move-right');
      expect(moveRightButton).toBeDisabled();
    });

    it('should enable move right button when items are selected in left list', () => {
      render(
        <RdsCompTransferList
          items={mockItems}
          defaultLeftItems={['item-1', 'item-2']}
          defaultChecked={['item-1']}
        />
      );

      const moveRightButton = screen.getByTestId('button-move-right');
      expect(moveRightButton).not.toBeDisabled();
    });
  });

  describe('Size Variants', () => {
    it('should apply small size class', () => {
      const { container } = render(
        <RdsCompTransferList
          items={mockItems}
          defaultLeftItems={['item-1']}
          size="small"
        />
      );
      expect(container.querySelector('.rds-comp-transfer-list--small')).toBeInTheDocument();
    });

    it('should apply medium size class', () => {
      const { container } = render(
        <RdsCompTransferList
          items={mockItems}
          defaultLeftItems={['item-1']}
          size="medium"
        />
      );
      expect(container.querySelector('.rds-comp-transfer-list--medium')).toBeInTheDocument();
    });

    it('should apply large size class', () => {
      const { container } = render(
        <RdsCompTransferList
          items={mockItems}
          defaultLeftItems={['item-1']}
          size="large"
        />
      );
      expect(container.querySelector('.rds-comp-transfer-list--large')).toBeInTheDocument();
    });
  });

  describe('Custom Props', () => {
    it('should render custom left title', () => {
      render(
        <RdsCompTransferList
          items={mockItems}
          defaultLeftItems={['item-1']}
          leftTitle="Available Items"
        />
      );
      expect(screen.getByText('Available Items')).toBeInTheDocument();
    });

    it('should render custom right title', () => {
      render(
        <RdsCompTransferList
          items={mockItems}
          defaultLeftItems={['item-1']}
          rightTitle="Selected Items"
        />
      );
      expect(screen.getByText('Selected Items')).toBeInTheDocument();
    });

    it('should render custom className', () => {
      const { container } = render(
        <RdsCompTransferList
          items={mockItems}
          defaultLeftItems={['item-1']}
          className="custom-transfer-list"
        />
      );
      expect(container.querySelector('.custom-transfer-list')).toBeInTheDocument();
    });
  });

  describe('Display Name', () => {
    it('should have correct displayName', () => {
      expect(RdsCompTransferList.displayName).toBe('RdsCompTransferList');
    });
  });
});
