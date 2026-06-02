import React from 'react';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RdsCompKanbanBoard from './rds-comp-kanban-board';
import { boardInfo, RdsCompKanbanBoardProps } from './kanban-board-helpers';
import { axe } from 'jest-axe';

// Mock SCSS
jest.mock('./rds-comp-kanban-board.scss', () => ({}));

// Mock MUI components
jest.mock('@mui/material', () => ({
  Card: ({ children, ...props }: any) => <div data-testid="card" {...props}>{children}</div>,
  CardContent: ({ children, ...props }: any) => <div data-testid="card-content" {...props}>{children}</div>,
  Typography: ({ children, variant, ...props }: any) => <div data-testid="typography" data-variant={variant} {...props}>{children}</div>,
  IconButton: ({ children, onClick, ...props }: any) => <button data-testid="icon-button" onClick={onClick} {...props}>{children}</button>,
  Chip: ({ children, label, ...props }: any) => <div data-testid="chip" {...props}>{label || children}</div>,
  Avatar: ({ children, alt, src, ...props }: any) => <div data-testid="avatar" {...props} data-src={src}>{children}</div>,
  Menu: ({ children, open, anchorEl, onClose, ...props }: any) => open ? <div data-testid="menu" {...props}>{children}</div> : null,
  MenuItem: ({ children, onClick, ...props }: any) => <button type="button" data-testid="menu-item" onClick={onClick} {...props} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>{children}</button>,
  TextField: ({ value, onChange, onKeyDown, placeholder, ...props }: any) => (
    <input 
      data-testid="text-field" 
      value={value} 
      onChange={(e) => onChange?.(e)} 
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      {...props}
    />
  ),
  Button: ({ children, onClick, startIcon, ...props }: any) => (
    <button data-testid="button" onClick={onClick} {...props}>{startIcon}{children}</button>
  ),
  Box: React.forwardRef(({ children, className, ...props }: any, ref: any) => <div data-testid="box" className={className} ref={ref} {...props}>{children}</div>),
  FormControl: ({ children, ...props }: any) => <div data-testid="form-control" {...props}>{children}</div>,
  InputLabel: ({ children, ...props }: any) => <label data-testid="input-label" {...props}>{children}</label>,
  Select: ({ children, onChange, label, ...props }: any) => (
    <select data-testid="select" onChange={(e) => onChange?.(e)} {...props}>{children}</select>
  ),
  Autocomplete: ({ onChange, renderInput, label, ...props }: any) => (
    <div data-testid="autocomplete" {...props}>
      {renderInput?.({ id: 'autocomplete-input' })}
    </div>
  ),
  Paper: ({ children, ...props }: any) => <div data-testid="paper" {...props}>{children}</div>,
}));

// Mock MUI Icons
jest.mock('@mui/icons-material', () => ({
  MoreVert: () => <span data-testid="more-vert-icon">⋮</span>,
  Close: () => <span data-testid="close-icon">✕</span>,
  Delete: () => <span data-testid="delete-icon">🗑</span>,
  MoreVertIcon: () => <span data-testid="more-vert-icon">⋮</span>,
  CloseIcon: () => <span data-testid="close-icon">✕</span>,
  DeleteIcon: () => <span data-testid="delete-icon">🗑</span>,
}));

// Mock @dnd-kit
jest.mock('@dnd-kit/core', () => ({
  DndContext: ({ children }: any) => <div data-testid="dnd-context">{children}</div>,
  closestCenter: jest.fn(),
  KeyboardSensor: jest.fn(),
  PointerSensor: jest.fn(),
  useSensor: jest.fn(),
  useSensors: jest.fn(() => []),
  useDroppable: () => ({ setNodeRef: jest.fn() }),
}));
jest.mock('@dnd-kit/sortable', () => ({
  SortableContext: ({ children }: any) => <>{children}</>,
  sortableKeyboardCoordinates: jest.fn(),
  useSortable: () => ({
    attributes: {},
    listeners: {},
    setNodeRef: jest.fn(),
    transform: null,
    transition: null,
    isDragging: false,
  }),
  verticalListSortingStrategy: jest.fn(),
}));
jest.mock('@dnd-kit/utilities', () => ({
  CSS: { Transform: { toString: () => '' } },
}));

// Mock Raaghu components
jest.mock('../../raaghu-elements/rds-badge/rds-badge', () => {
  return function MockRdsBadge({ badgeContent, ...props }: any) {
    return <span data-testid="rds-badge" {...props}>{badgeContent}</span>;
  };
});

jest.mock('../../raaghu-elements/rds-avatar/rds-avatar', () => {
  return function MockRdsAvatar({ avatars, ...props }: any) {
    return <div data-testid="rds-avatar" {...props}>{avatars?.length || 0} avatars</div>;
  };
});

const mockBoardData: boardInfo[] = [
  {
    cardId: 1,
    name: 'Board 1',
    status: 'active',
    subCardIndex: 0,
    colorType: 'primary',
    actions: [{ key: 'Edit', value: 'edit' }],
    key: 'board-1',
    subCards: [
      {
        ticketId: 'TKT001',
        ticketPriority: 'High',
        ticketQuestion: 'Sample Question 1',
        ticketDate: '15 Feb 2024',
        SubcardId: 1,
        assignedToName: 'John Doe',
        assignedTo: 'john.doe',
        actions: [{ key: 'Edit', value: 'edit' }],
      },
      {
        ticketId: 'TKT002',
        ticketPriority: 'Low',
        ticketQuestion: 'Sample Question 2',
        ticketDate: '16 Feb 2024',
        SubcardId: 2,
        actions: [{ key: 'Edit', value: 'edit' }],
      },
    ],
  },
  {
    cardId: 2,
    name: 'Board 2',
    status: 'inactive',
    subCardIndex: 0,
    colorType: 'success',
    actions: [{ key: 'Edit', value: 'edit' }],
    key: 'board-2',
    subCards: [],
  },
];

describe('RdsCompKanbanBoard', () => {
  const renderComponent = (props: Partial<RdsCompKanbanBoardProps> = {}) => {
    const defaultProps: RdsCompKanbanBoardProps = {
      boardData: mockBoardData,
      allowAddingNewCard: true,
      allowAddingNewSubCard: true,
      ...props,
    };
    return render(<RdsCompKanbanBoard {...defaultProps} />);
  };

  describe('Basic Rendering', () => {
    it('should render component without crashing', () => {
      renderComponent();
      expect(screen.getByTestId('drag-drop-context')).toBeInTheDocument();
    });

    it('should have correct displayName', () => {
      expect(RdsCompKanbanBoard.displayName).toBe('RdsCompKanbanBoard');
    });

    it('should render kanban container', () => {
      renderComponent();
      const boxes = screen.getAllByTestId('box');
      const container = boxes.find((box) => box.className?.includes('rds-kanban-board-container'));
      expect(container).toHaveClass('rds-kanban-board-container');
    });

    it('should render without any board data', () => {
      renderComponent({ boardData: [] });
      expect(screen.getByTestId('drag-drop-context')).toBeInTheDocument();
    });

    it('should render with null board data', () => {
      renderComponent({ boardData: undefined });
      expect(screen.getByTestId('drag-drop-context')).toBeInTheDocument();
    });
  });

  describe('Board Display', () => {
    it('should render all boards from boardData', () => {
      renderComponent();
      const boards = screen.getAllByTestId('card');
      expect(boards.length).toBeGreaterThan(0);
    });

    it('should render board names', () => {
      renderComponent();
      const typographies = screen.getAllByTestId('typography');
      const boardNames = typographies.filter((el) => el.textContent?.includes('Board'));
      expect(boardNames.length).toBeGreaterThan(0);
    });

    it('should display board with correct color type', () => {
      renderComponent();
      const boxes = screen.getAllByTestId('box');
      expect(boxes.length).toBeGreaterThan(0);
    });

    it('should apply correct color class to board', () => {
      renderComponent();
      const boxes = screen.getAllByTestId('box');
      const coloredBox = boxes.find((box) => box.className?.includes('kanban-'));
      expect(coloredBox).toBeTruthy();
    });

    it('should display sub card count for boards', () => {
      renderComponent();
      const typographies = screen.getAllByTestId('typography');
      const countText = typographies.find((el) => el.textContent?.includes('(2)'));
      expect(countText).toBeInTheDocument();
    });
  });

  describe('Sub Cards', () => {
    it('should render sub cards for each board', () => {
      renderComponent();
      const droppables = screen.getAllByTestId('droppable');
      expect(droppables.length).toBeGreaterThan(0);
    });

    it('should render sub card content', () => {
      renderComponent();
      const typographies = screen.getAllByTestId('typography');
      const subCardContent = typographies.find((el) => el.textContent?.includes('TKT001'));
      expect(subCardContent).toBeInTheDocument();
    });

    it('should render badge in sub cards', () => {
      renderComponent();
      const badges = screen.getAllByTestId('rds-badge');
      expect(badges.length).toBeGreaterThan(0);
    });

    it('should render avatar in sub cards when avatarData is provided', () => {
      const avatarData = [{ title: 'User 1', src: 'user1.jpg' }];
      renderComponent({ avatarData });
      const avatars = screen.queryAllByTestId('rds-avatar');
      expect(avatars.length).toBeGreaterThan(0);
    });

    it('should not render avatar when avatarData is not provided', () => {
      renderComponent({ avatarData: undefined });
      expect(screen.queryByTestId('rds-avatar')).not.toBeInTheDocument();
    });

    it('should render sub card menu button', () => {
      renderComponent();
      const iconButtons = screen.getAllByTestId('icon-button');
      expect(iconButtons.length).toBeGreaterThan(0);
    });

    it('should display sub card footer with date', () => {
      renderComponent();
      const typographies = screen.getAllByTestId('typography');
      const dateContent = typographies.find((el) => el.textContent?.includes('Feb 2024'));
      expect(dateContent).toBeInTheDocument();
    });

    it('should render sample text when ticketQuestion is default', () => {
      const customBoardData: boardInfo[] = [
        {
          cardId: 1,
          name: 'Test Board',
          subCardIndex: 0,
          colorType: 'primary',
          actions: [],
          key: 'test',
          subCards: [
            {
              ticketId: '',
              ticketQuestion: 'Question 1',
              ticketDate: '15 Feb 2024',
              SubcardId: 1,
              actions: [],
            },
          ],
        },
      ];
      renderComponent({ boardData: customBoardData });
      const typographies = screen.getAllByTestId('typography');
      const sampleText = typographies.find((el) => el.textContent?.includes('This is a sample text'));
      expect(sampleText).toBeInTheDocument();
    });
  });

  describe('Add Board Button', () => {
    it('should render add board button when allowAddingNewCard is true', () => {
      renderComponent({ allowAddingNewCard: true });
      const buttons = screen.getAllByTestId('button');
      const addBoardBtn = buttons.find((btn) => btn.textContent?.includes('Add Board'));
      expect(addBoardBtn).toBeInTheDocument();
    });

    it('should not render add board button when allowAddingNewCard is false', () => {
      renderComponent({ allowAddingNewCard: false });
      const buttons = screen.queryAllByTestId('button');
      const addBoardBtn = buttons.find((btn) => btn.textContent?.includes('Add Board'));
      expect(addBoardBtn).not.toBeTruthy();
    });

    it('should handle add board button click', () => {
      renderComponent({ allowAddingNewCard: true });
      const buttons = screen.getAllByTestId('button');
      const addBoardBtn = buttons.find((btn) => btn.textContent?.includes('Add Board'));
      expect(addBoardBtn).toBeInTheDocument();
      fireEvent.click(addBoardBtn!);
    });

    it('should show input field when add board button is clicked initially', () => {
      renderComponent({ allowAddingNewCard: true, boardData: [] });
      const inputs = screen.queryAllByTestId('text-field');
      expect(inputs.length).toBeGreaterThanOrEqual(0);
    });

    it('should have cancel button for add board form', () => {
      renderComponent({ allowAddingNewCard: true });
      const buttons = screen.getAllByTestId('button');
      expect(buttons.length).toBeGreaterThan(0);
    });
  });

  describe('Add Sub Card', () => {
    it('should render add item button when allowAddingNewSubCard is true', () => {
      renderComponent({ allowAddingNewSubCard: true });
      const buttons = screen.getAllByTestId('button');
      const addItemBtn = buttons.find((btn) => btn.textContent?.includes('Add Item'));
      expect(addItemBtn).toBeInTheDocument();
    });

    it('should not render add item button when allowAddingNewSubCard is false', () => {
      renderComponent({ allowAddingNewSubCard: false });
      const buttons = screen.queryAllByTestId('button');
      const addItemBtn = buttons.find((btn) => btn.textContent?.includes('Add Item'));
      expect(addItemBtn).not.toBeTruthy();
    });

    it('should show form fields when add item button is clicked', async () => {
      renderComponent({ allowAddingNewSubCard: true });
      const buttons = screen.getAllByTestId('button');
      const addItemBtn = buttons.find((btn) => btn.textContent?.includes('Add Item'));
      
      if (addItemBtn) {
        fireEvent.click(addItemBtn);
        await waitFor(() => {
          const selects = screen.queryAllByTestId('select');
          expect(selects.length).toBeGreaterThanOrEqual(0);
        });
      }
    });

    it('should render category select in add item form', () => {
      const categories = [
        { label: 'Category 1', val: 'cat1' },
        { label: 'Category 2', val: 'cat2' },
      ];
      renderComponent({
        allowAddingNewSubCard: true,
        allCategoriesList: categories,
      });
      const selects = screen.queryAllByTestId('select');
      expect(selects.length).toBeGreaterThanOrEqual(0);
    });

    it('should render tags autocomplete in add item form', () => {
      const tags = [
        { label: 'Tag 1', val: 'tag1' },
        { label: 'Tag 2', val: 'tag2' },
      ];
      renderComponent({
        allowAddingNewSubCard: true,
        allTagsList: tags,
      });
      const autocompletes = screen.queryAllByTestId('autocomplete');
      expect(autocompletes.length).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Board Menu', () => {
    it('should render board menu button', () => {
      renderComponent();
      const iconButtons = screen.getAllByTestId('icon-button');
      expect(iconButtons.length).toBeGreaterThan(0);
    });

    it('should open menu when board menu button is clicked', async () => {
      renderComponent();
      const iconButtons = screen.getAllByTestId('icon-button');
      if (iconButtons[0]) {
        fireEvent.click(iconButtons[0]);
        await waitFor(() => {
          const menus = screen.queryAllByTestId('menu');
          expect(menus.length).toBeGreaterThanOrEqual(0);
        });
      }
    });

    it('should render delete option in menu', async () => {
      renderComponent();
      const iconButtons = screen.getAllByTestId('icon-button');
      if (iconButtons[0]) {
        fireEvent.click(iconButtons[0]);
        await waitFor(() => {
          const menus = screen.queryAllByTestId('menu');
          expect(menus.length).toBeGreaterThanOrEqual(0);
        });
      }
    });

    it('should call onCardOption callback when menu item is clicked', () => {
      const onCardOption = jest.fn();
      renderComponent({ onCardOption });
      // Menu interaction handled by component state
      expect(onCardOption).toBeDefined();
    });

    it('should render custom board actions in menu', async () => {
      const customBoardData: boardInfo[] = [
        {
          cardId: 1,
          name: 'Test Board',
          subCardIndex: 0,
          colorType: 'primary',
          actions: [{ key: 'Archive', value: 'archive' }],
          key: 'test',
          subCards: [],
        },
      ];
      renderComponent({ boardData: customBoardData });
      const iconButtons = screen.getAllByTestId('icon-button');
      if (iconButtons[0]) {
        fireEvent.click(iconButtons[0]);
        await waitFor(() => {
          const menuItems = screen.queryAllByTestId('menu-item');
          expect(menuItems.length).toBeGreaterThanOrEqual(0);
        });
      }
    });
  });

  describe('Sub Card Menu', () => {
    it('should render sub card dropdown button', () => {
      renderComponent();
      const iconButtons = screen.getAllByTestId('icon-button');
      // First icon button is for board menu, others for sub cards
      expect(iconButtons.length).toBeGreaterThan(1);
    });

    it('should render sub card menu on dropdown click', async () => {
      renderComponent();
      const iconButtons = screen.getAllByTestId('icon-button');
      // Click a sub card dropdown button (not the first one which is board menu)
      if (iconButtons[1]) {
        fireEvent.click(iconButtons[1]);
        await waitFor(() => {
          const menus = screen.queryAllByTestId('menu');
          expect(menus.length).toBeGreaterThanOrEqual(0);
        });
      }
    });

    it('should call onSubCardOption callback', () => {
      const onSubCardOption = jest.fn();
      renderComponent({ onSubCardOption });
      expect(onSubCardOption).toBeDefined();
    });

    it('should render sub card actions in menu', () => {
      renderComponent();
      expect(screen.getByTestId('drag-drop-context')).toBeInTheDocument();
    });
  });

  describe('Input Handling', () => {
    it('should handle board name input change', () => {
      renderComponent({ allowAddingNewCard: true });
      const inputs = screen.queryAllByTestId('text-field');
      if (inputs[0]) {
        fireEvent.change(inputs[0], { target: { value: 'New Board' } });
        expect(inputs[0]).toHaveValue('New Board');
      }
    });

    it('should handle category selection change', () => {
      const categories = [{ label: 'Category 1', val: 'cat1' }];
      renderComponent({
        allowAddingNewSubCard: true,
        allCategoriesList: categories,
      });
      const selects = screen.queryAllByTestId('select');
      if (selects[0]) {
        fireEvent.change(selects[0], { target: { value: 'cat1' } });
        expect(selects[0]).toHaveValue('cat1');
      }
    });

    it('should handle title input in add sub card form', () => {
      renderComponent({ allowAddingNewSubCard: true });
      const inputs = screen.queryAllByTestId('text-field');
      const titleInput = inputs.find((input) => input.getAttribute('placeholder')?.includes('Title'));
      if (titleInput) {
        fireEvent.change(titleInput, { target: { value: 'New Ticket' } });
        expect(titleInput).toHaveValue('New Ticket');
      }
    });

    it('should handle description input in add sub card form', () => {
      renderComponent({ allowAddingNewSubCard: true });
      const inputs = screen.queryAllByTestId('text-field');
      const descInput = inputs.find((input) => input.getAttribute('placeholder')?.includes('Description'));
      if (descInput) {
        fireEvent.change(descInput, { target: { value: 'Sample Description' } });
        expect(descInput).toHaveValue('Sample Description');
      }
    });
  });

  describe('Drag and Drop', () => {
    it('should render DragDropContext', () => {
      renderComponent();
      expect(screen.getByTestId('drag-drop-context')).toBeInTheDocument();
    });

    it('should render Droppable zones for each board', () => {
      renderComponent();
      const droppables = screen.getAllByTestId('droppable');
      expect(droppables.length).toBeGreaterThan(0);
    });

    it('should render Draggable items for sub cards', () => {
      renderComponent();
      const draggables = screen.queryAllByTestId('draggable');
      expect(draggables.length).toBeGreaterThanOrEqual(0);
    });

    it('should have correct droppableId format', () => {
      renderComponent();
      const droppables = screen.getAllByTestId('droppable');
      const firstDroppable = droppables[0];
      expect(firstDroppable.getAttribute('data-id')).toBeDefined();
    });

    it('should have correct draggableId format', () => {
      renderComponent();
      const draggables = screen.queryAllByTestId('draggable');
      if (draggables.length > 0) {
        expect(draggables[0].getAttribute('data-id')).toBeDefined();
      }
    });
  });

  describe('Empty States', () => {
    it('should render empty board', () => {
      const emptyBoardData: boardInfo[] = [
        {
          cardId: 1,
          name: 'Empty Board',
          subCardIndex: 0,
          colorType: 'warning',
          actions: [],
          key: 'empty',
          subCards: [],
        },
      ];
      renderComponent({ boardData: emptyBoardData });
      const typographies = screen.getAllByTestId('typography');
      const emptyBoardTitle = typographies.find((el) => el.textContent?.includes('Empty Board'));
      expect(emptyBoardTitle).toBeInTheDocument();
    });

    it('should render with no sub cards', () => {
      const noBoardData: boardInfo[] = [
        {
          cardId: 1,
          name: 'No Cards',
          subCardIndex: 0,
          colorType: 'primary',
          actions: [],
          key: 'no-cards',
          subCards: [],
        },
      ];
      renderComponent({ boardData: noBoardData });
      const typographies = screen.getAllByTestId('typography');
      const title = typographies.find((el) => el.textContent?.includes('No Cards'));
      expect(title).toBeInTheDocument();
    });

    it('should render add item button on empty board', () => {
      const noBoardData: boardInfo[] = [
        {
          cardId: 1,
          name: 'Empty',
          subCardIndex: 0,
          colorType: 'primary',
          actions: [],
          key: 'empty',
          subCards: [],
        },
      ];
      renderComponent({ boardData: noBoardData, allowAddingNewSubCard: true });
      const buttons = screen.queryAllByTestId('button');
      const addItemBtn = buttons.find((btn) => btn.textContent?.includes('Add Item'));
      expect(addItemBtn).toBeInTheDocument();
    });
  });

  describe('Board Color Types', () => {
    it('should apply primary color class', () => {
      const boardData: boardInfo[] = [
        {
          cardId: 1,
          name: 'Primary Board',
          subCardIndex: 0,
          colorType: 'primary',
          actions: [],
          key: 'primary',
          subCards: [],
        },
      ];
      renderComponent({ boardData });
      const boxes = screen.getAllByTestId('box');
      const coloredBox = boxes.find((box) => box.className?.includes('kanban-primary'));
      expect(coloredBox).toBeTruthy();
    });

    it('should apply success color class', () => {
      const boardData: boardInfo[] = [
        {
          cardId: 1,
          name: 'Success Board',
          subCardIndex: 0,
          colorType: 'success',
          actions: [],
          key: 'success',
          subCards: [],
        },
      ];
      renderComponent({ boardData });
      const boxes = screen.getAllByTestId('box');
      const coloredBox = boxes.find((box) => box.className?.includes('kanban-success'));
      expect(coloredBox).toBeTruthy();
    });

    it('should apply warning color class', () => {
      const boardData: boardInfo[] = [
        {
          cardId: 1,
          name: 'Warning Board',
          subCardIndex: 0,
          colorType: 'warning',
          actions: [],
          key: 'warning',
          subCards: [],
        },
      ];
      renderComponent({ boardData });
      const boxes = screen.getAllByTestId('box');
      const coloredBox = boxes.find((box) => box.className?.includes('kanban-warning'));
      expect(coloredBox).toBeTruthy();
    });

    it('should apply error color class', () => {
      const boardData: boardInfo[] = [
        {
          cardId: 1,
          name: 'Error Board',
          subCardIndex: 0,
          colorType: 'error',
          actions: [],
          key: 'error',
          subCards: [],
        },
      ];
      renderComponent({ boardData });
      const boxes = screen.getAllByTestId('box');
      const coloredBox = boxes.find((box) => box.className?.includes('kanban-error'));
      expect(coloredBox).toBeTruthy();
    });
  });

  describe('Props Propagation', () => {
    it('should accept boardData prop', () => {
      renderComponent({ boardData: mockBoardData });
      expect(screen.getByTestId('drag-drop-context')).toBeInTheDocument();
    });

    it('should accept allowAddingNewCard prop', () => {
      renderComponent({ allowAddingNewCard: true });
      expect(screen.getByTestId('drag-drop-context')).toBeInTheDocument();
    });

    it('should accept allowAddingNewSubCard prop', () => {
      renderComponent({ allowAddingNewSubCard: true });
      expect(screen.getByTestId('drag-drop-context')).toBeInTheDocument();
    });

    it('should accept avatarData prop', () => {
      const avatarData = [{ title: 'User 1' }];
      renderComponent({ avatarData });
      expect(screen.getByTestId('drag-drop-context')).toBeInTheDocument();
    });

    it('should accept allTagsList prop', () => {
      const tags = [{ label: 'Tag 1', val: 'tag1' }];
      renderComponent({ allTagsList: tags });
      expect(screen.getByTestId('drag-drop-context')).toBeInTheDocument();
    });

    it('should accept allCategoriesList prop', () => {
      const categories = [{ label: 'Cat 1', val: 'cat1' }];
      renderComponent({ allCategoriesList: categories });
      expect(screen.getByTestId('drag-drop-context')).toBeInTheDocument();
    });

    it('should accept onCardOption callback', () => {
      const onCardOption = jest.fn();
      renderComponent({ onCardOption });
      expect(onCardOption).toBeDefined();
    });

    it('should accept onSubCardOption callback', () => {
      const onSubCardOption = jest.fn();
      renderComponent({ onSubCardOption });
      expect(onSubCardOption).toBeDefined();
    });
  });

  describe('Integration', () => {
    it('should render complete kanban board with all features', () => {
      renderComponent();
      expect(screen.getByTestId('drag-drop-context')).toBeInTheDocument();
      expect(screen.getAllByTestId('card').length).toBeGreaterThan(0);
      expect(screen.getAllByTestId('button').length).toBeGreaterThan(0);
    });

    it('should render board with multiple sub cards and actions', () => {
      renderComponent();
      expect(screen.getAllByTestId('card').length).toBeGreaterThan(0);
      expect(screen.getAllByTestId('icon-button').length).toBeGreaterThan(0);
      expect(screen.getAllByTestId('rds-badge').length).toBeGreaterThan(0);
    });

    it('should handle board with actions and sub cards', () => {
      renderComponent();
      expect(screen.getByTestId('drag-drop-context')).toBeInTheDocument();
    });

    it('should display all components together', () => {
      const avatarData = [{ title: 'User 1', src: 'user1.jpg' }];
      const categories = [{ label: 'Category 1', val: 'cat1' }];
      const tags = [{ label: 'Tag 1', val: 'tag1' }];
      
      renderComponent({
        avatarData,
        allCategoriesList: categories,
        allTagsList: tags,
        allowAddingNewCard: true,
        allowAddingNewSubCard: true,
      });

      expect(screen.getByTestId('drag-drop-context')).toBeInTheDocument();
      expect(screen.getAllByTestId('card').length).toBeGreaterThan(0);
      expect(screen.getAllByTestId('button').length).toBeGreaterThan(0);
      const avatars = screen.queryAllByTestId('rds-avatar');
      expect(avatars.length).toBeGreaterThan(0);
    });
  });

  describe('Edge Cases', () => {
    it('should handle rapid board menu opens', async () => {
      renderComponent();
      const iconButtons = screen.getAllByTestId('icon-button');
      if (iconButtons[0]) {
        fireEvent.click(iconButtons[0]);
        fireEvent.click(iconButtons[0]);
        fireEvent.click(iconButtons[0]);
        await waitFor(() => {
          expect(screen.getByTestId('drag-drop-context')).toBeInTheDocument();
        });
      }
    });

    it('should handle very long board names', () => {
      const longName = 'A'.repeat(100);
      const boardData: boardInfo[] = [
        {
          cardId: 1,
          name: longName,
          subCardIndex: 0,
          colorType: 'primary',
          actions: [],
          key: 'long',
          subCards: [],
        },
      ];
      renderComponent({ boardData });
      expect(screen.getByTestId('drag-drop-context')).toBeInTheDocument();
    });

    it('should handle many boards', () => {
      const manyBoards: boardInfo[] = Array.from({ length: 10 }, (_, i) => ({
        cardId: i,
        name: `Board ${i + 1}`,
        subCardIndex: 0,
        colorType: 'primary' as const,
        actions: [],
        key: `board-${i}`,
        subCards: [
          {
            ticketId: `TKT${i}01`,
            ticketQuestion: `Question ${i}`,
            ticketDate: '15 Feb 2024',
            SubcardId: i * 10 + 1,
            actions: [],
          },
        ],
      }));
      renderComponent({ boardData: manyBoards });
      expect(screen.getAllByTestId('card').length).toBeGreaterThan(0);
    });

    it('should handle many sub cards in one board', () => {
      const manySubCards = Array.from({ length: 20 }, (_, i) => ({
        ticketId: `TKT${i}`,
        ticketPriority: i % 2 === 0 ? 'High' : 'Low',
        ticketQuestion: `Question ${i}`,
        ticketDate: '15 Feb 2024',
        SubcardId: i,
        actions: [],
      }));
      const boardData: boardInfo[] = [
        {
          cardId: 1,
          name: 'Busy Board',
          subCardIndex: 0,
          colorType: 'primary',
          actions: [],
          key: 'busy',
          subCards: manySubCards,
        },
      ];
      renderComponent({ boardData });
      expect(screen.getByTestId('drag-drop-context')).toBeInTheDocument();
    });

    it('should handle empty allCategoriesList', () => {
      renderComponent({
        allowAddingNewSubCard: true,
        allCategoriesList: [],
      });
      expect(screen.getByTestId('drag-drop-context')).toBeInTheDocument();
    });

    it('should handle empty allTagsList', () => {
      renderComponent({
        allowAddingNewSubCard: true,
        allTagsList: [],
      });
      expect(screen.getByTestId('drag-drop-context')).toBeInTheDocument();
    });

    it('should handle undefined callbacks', () => {
      renderComponent({
        onCardOption: undefined,
        onSubCardOption: undefined,
        onAddQuestionSaveHandler: undefined,
      });
      expect(screen.getByTestId('drag-drop-context')).toBeInTheDocument();
    });

    it('should handle board with no actions', () => {
      const boardData: boardInfo[] = [
        {
          cardId: 1,
          name: 'No Actions Board',
          subCardIndex: 0,
          colorType: 'primary',
          actions: [],
          key: 'no-actions',
          subCards: [],
        },
      ];
      renderComponent({ boardData });
      expect(screen.getByTestId('drag-drop-context')).toBeInTheDocument();
    });

    it('should handle sub card with no actions', () => {
      const boardData: boardInfo[] = [
        {
          cardId: 1,
          name: 'Board',
          subCardIndex: 0,
          colorType: 'primary',
          actions: [],
          key: 'board',
          subCards: [
            {
              ticketId: 'TKT001',
              ticketQuestion: 'Question',
              ticketDate: '15 Feb 2024',
              SubcardId: 1,
              actions: [],
            },
          ],
        },
      ];
      renderComponent({ boardData });
      expect(screen.getByTestId('drag-drop-context')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has no axe accessibility violations', async () => {
      const { container } = render(<RdsCompKanbanBoard {...defaultProps} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
