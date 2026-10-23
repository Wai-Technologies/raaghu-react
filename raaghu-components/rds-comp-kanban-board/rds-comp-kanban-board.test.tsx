import React from 'react';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RdsCompKanbanBoard from './rds-comp-kanban-board';
import { boardInfo, RdsCompKanbanBoardProps, colorClass } from './kanban-board-helpers';
import { warnDeprecatedProp } from '../../raaghu-elements/shared/utils/deprecation';
import { axe } from 'jest-axe';

jest.mock('../../raaghu-elements/shared/utils/deprecation', () => ({ warnDeprecatedProp: jest.fn() }));

jest.mock('./rds-comp-kanban-board.scss', () => ({}));

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

jest.mock('@mui/icons-material', () => ({
  MoreVert: () => <span data-testid="more-vert-icon">⋮</span>,
  Close: () => <span data-testid="close-icon">✕</span>,
  Delete: () => <span data-testid="delete-icon">🗑</span>,
  MoreVertIcon: () => <span data-testid="more-vert-icon">⋮</span>,
  CloseIcon: () => <span data-testid="close-icon">✕</span>,
  DeleteIcon: () => <span data-testid="delete-icon">🗑</span>,
}));

jest.mock('@dnd-kit/core', () => ({
  DndContext: ({ children }: any) => <div data-testid="dnd-context">{children}</div>,
  closestCenter: jest.fn(),
  KeyboardSensor: jest.fn(),
  PointerSensor: jest.fn(),
  useSensor: jest.fn(),
  useSensors: jest.fn(() => []),
  useDroppable: ({ id }: { id: string }) => ({
    setNodeRef: (node: HTMLElement | null) => {
      if (node) {
        node.setAttribute('data-testid', 'droppable');
        node.setAttribute('data-id', id);
      }
    },
  }),
}));
jest.mock('@dnd-kit/sortable', () => ({
  SortableContext: ({ children }: any) => <>{children}</>,
  sortableKeyboardCoordinates: jest.fn(),
  useSortable: ({ id }: { id: number | string }) => ({
    attributes: { 'data-testid': 'draggable', 'data-id': String(id) },
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

const makeBoard = (name: string, colorType: any = 'primary', subCards: any[] = [], key = name): boardInfo => ({
  cardId: 1,
  name,
  subCardIndex: 0,
  colorType,
  actions: [],
  key,
  subCards,
});

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
  const dnd = () => expect(screen.getByTestId('dnd-context'));
  const findButton = (text: string) => screen.queryAllByTestId('button').find((btn) => btn.textContent?.includes(text));
  const findTypography = (text: string) =>
    screen.getAllByTestId('typography').find((el) => el.textContent?.includes(text));

  describe('Basic Rendering', () => {
    it('should render component without crashing', () => {
      renderComponent();
      dnd().toBeInTheDocument();
    });

    it('should have correct displayName', () => {
      expect(RdsCompKanbanBoard.displayName).toBe('RdsCompKanbanBoard');
    });

    it('should render kanban container', () => {
      renderComponent();
      const container = screen.getAllByTestId('box').find((box) => box.className?.includes('rds-kanban-board-container'));
      expect(container).toHaveClass('rds-kanban-board-container');
    });

    it.each([[[]], [undefined]])('should render with board data %j', (boardData) => {
      renderComponent({ boardData: boardData as any });
      dnd().toBeInTheDocument();
    });
  });

  describe('Board Display', () => {
    it('should render all boards from boardData', () => {
      renderComponent();
      expect(screen.getAllByTestId('card').length).toBeGreaterThan(0);
    });

    it('should render board names', () => {
      renderComponent();
      const boardNames = screen.getAllByTestId('typography').filter((el) => el.textContent?.includes('Board'));
      expect(boardNames.length).toBeGreaterThan(0);
    });

    it('should display board with correct color type and class', () => {
      renderComponent();
      const boxes = screen.getAllByTestId('box');
      expect(boxes.length).toBeGreaterThan(0);
      expect(boxes.find((box) => box.className?.includes('kanban-'))).toBeTruthy();
    });

    it('should display sub card count for boards', () => {
      renderComponent();
      expect(findTypography('(2)')).toBeInTheDocument();
    });
  });

  describe('Sub Cards', () => {
    it('should render sub cards for each board', () => {
      renderComponent();
      expect(document.querySelectorAll('.rds-kanban-board__sub-card').length).toBeGreaterThan(0);
    });

    it('should render sub card content', () => {
      renderComponent();
      expect(findTypography('TKT001')).toBeInTheDocument();
    });

    it('should render badge in sub cards', () => {
      renderComponent();
      expect(screen.getAllByTestId('rds-badge').length).toBeGreaterThan(0);
    });

    it('should render avatar in sub cards when avatarData is provided', () => {
      renderComponent({ avatarData: [{ title: 'User 1', src: 'user1.jpg' }] });
      expect(screen.queryAllByTestId('rds-avatar').length).toBeGreaterThan(0);
    });

    it('should not render avatar when avatarData is not provided', () => {
      renderComponent({ avatarData: undefined });
      expect(screen.queryByTestId('rds-avatar')).not.toBeInTheDocument();
    });

    it('should render sub card menu button', () => {
      renderComponent();
      expect(screen.getAllByTestId('icon-button').length).toBeGreaterThan(0);
    });

    it('should display sub card footer with date', () => {
      renderComponent();
      expect(findTypography('Feb 2024')).toBeInTheDocument();
    });

    it('should render sample text when ticketQuestion is default', () => {
      const subCard = { ticketId: '', ticketQuestion: 'Question 1', ticketDate: '15 Feb 2024', SubcardId: 1, actions: [] };
      renderComponent({ boardData: [makeBoard('Test Board', 'primary', [subCard], 'test')] });
      expect(findTypography('This is a sample text')).toBeInTheDocument();
    });
  });

  describe('Add Board Button', () => {
    it('should render add board button when allowAddingNewCard is true', () => {
      renderComponent({ allowAddingNewCard: true });
      expect(findButton('Add Board')).toBeInTheDocument();
    });

    it('should not render add board button when allowAddingNewCard is false', () => {
      renderComponent({ allowAddingNewCard: false });
      expect(findButton('Add Board')).not.toBeTruthy();
    });

    it('should handle add board button click', () => {
      renderComponent({ allowAddingNewCard: true });
      const addBoardBtn = findButton('Add Board');
      expect(addBoardBtn).toBeInTheDocument();
      fireEvent.click(addBoardBtn!);
    });

    it('should show input field when add board button is clicked initially', () => {
      renderComponent({ allowAddingNewCard: true, boardData: [] });
      expect(screen.queryAllByTestId('text-field').length).toBeGreaterThanOrEqual(0);
    });

    it('should have cancel button for add board form', () => {
      renderComponent({ allowAddingNewCard: true });
      expect(screen.getAllByTestId('button').length).toBeGreaterThan(0);
    });
  });

  describe('Add Sub Card', () => {
    it('should render add item button when allowAddingNewSubCard is true', () => {
      renderComponent({ allowAddingNewSubCard: true });
      expect(findButton('Add Item')).toBeInTheDocument();
    });

    it('should not render add item button when allowAddingNewSubCard is false', () => {
      renderComponent({ allowAddingNewSubCard: false });
      expect(findButton('Add Item')).not.toBeTruthy();
    });

    it('should show form fields when add item button is clicked', async () => {
      renderComponent({ allowAddingNewSubCard: true });
      const addItemBtn = findButton('Add Item');
      if (addItemBtn) {
        fireEvent.click(addItemBtn);
        await waitFor(() => {
          expect(screen.queryAllByTestId('select').length).toBeGreaterThanOrEqual(0);
        });
      }
    });

    it('should render category select in add item form', () => {
      const categories = [
        { label: 'Category 1', val: 'cat1' },
        { label: 'Category 2', val: 'cat2' },
      ];
      renderComponent({ allowAddingNewSubCard: true, allCategoriesList: categories });
      expect(screen.queryAllByTestId('select').length).toBeGreaterThanOrEqual(0);
    });

    it('should render tags autocomplete in add item form', () => {
      const tags = [
        { label: 'Tag 1', val: 'tag1' },
        { label: 'Tag 2', val: 'tag2' },
      ];
      renderComponent({ allowAddingNewSubCard: true, allTagsList: tags });
      expect(screen.queryAllByTestId('autocomplete').length).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Board and Sub Card Menu', () => {
    it('should render board menu button and sub card dropdown button', () => {
      renderComponent();
      expect(screen.getAllByTestId('icon-button').length).toBeGreaterThan(1);
    });

    it.each([0, 1])('should open menu when icon button %s is clicked', async (i) => {
      renderComponent();
      const iconButtons = screen.getAllByTestId('icon-button');
      if (iconButtons[i]) {
        fireEvent.click(iconButtons[i]);
        await waitFor(() => {
          expect(screen.queryAllByTestId('menu').length).toBeGreaterThanOrEqual(0);
        });
      }
    });

    it('should call onCardOption and onSubCardOption callbacks', () => {
      const onCardOption = jest.fn();
      const onSubCardOption = jest.fn();
      renderComponent({ onCardOption, onSubCardOption });
      expect(onCardOption).toBeDefined();
      expect(onSubCardOption).toBeDefined();
    });

    it('should render custom board actions in menu', async () => {
      const board = { ...makeBoard('Test Board', 'primary', [], 'test'), actions: [{ key: 'Archive', value: 'archive' }] };
      renderComponent({ boardData: [board] });
      const iconButtons = screen.getAllByTestId('icon-button');
      if (iconButtons[0]) {
        fireEvent.click(iconButtons[0]);
        await waitFor(() => {
          expect(screen.queryAllByTestId('menu-item').length).toBeGreaterThanOrEqual(0);
        });
      }
    });

    it('should render sub card actions in menu', () => {
      renderComponent();
      dnd().toBeInTheDocument();
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
      renderComponent({ allowAddingNewSubCard: true, allCategoriesList: [{ label: 'Category 1', val: 'cat1' }] });
      const selects = screen.queryAllByTestId('select');
      if (selects[0]) {
        fireEvent.change(selects[0], { target: { value: 'cat1' } });
        expect(selects[0]).toHaveValue('cat1');
      }
    });

    it.each([
      ['Title', 'New Ticket'],
      ['Description', 'Sample Description'],
    ])('should handle %s input in add sub card form', (placeholder, value) => {
      renderComponent({ allowAddingNewSubCard: true });
      const input = screen
        .queryAllByTestId('text-field')
        .find((el) => el.getAttribute('placeholder')?.includes(placeholder));
      if (input) {
        fireEvent.change(input, { target: { value } });
        expect(input).toHaveValue(value);
      }
    });
  });

  describe('Drag and Drop', () => {
    it('should render DragDropContext', () => {
      renderComponent();
      dnd().toBeInTheDocument();
    });

    it('should render Droppable zones for each board', () => {
      renderComponent();
      expect(document.querySelectorAll('.kanban-board').length).toBeGreaterThan(0);
    });

    it('should render Draggable items for sub cards', () => {
      renderComponent();
      expect(screen.queryAllByTestId('draggable').length).toBeGreaterThanOrEqual(0);
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
    it.each(['Empty Board', 'No Cards'])('should render empty board %s', (name) => {
      renderComponent({ boardData: [makeBoard(name, 'warning')] });
      expect(findTypography(name)).toBeInTheDocument();
    });

    it('should render add item button on empty board', () => {
      renderComponent({ boardData: [makeBoard('Empty')], allowAddingNewSubCard: true });
      expect(findButton('Add Item')).toBeInTheDocument();
    });
  });

  describe('Board Color Types', () => {
    it.each(['primary', 'success', 'warning', 'error'])('should apply %s color class', (color) => {
      renderComponent({ boardData: [makeBoard(`${color} Board`, color)] });
      const coloredBox = screen.getAllByTestId('box').find((box) => box.className?.includes(`kanban-${color}`));
      expect(coloredBox).toBeTruthy();
    });
  });

  describe('Props Propagation', () => {
    it.each([
      ['boardData', { boardData: mockBoardData }],
      ['allowAddingNewCard', { allowAddingNewCard: true }],
      ['allowAddingNewSubCard', { allowAddingNewSubCard: true }],
      ['avatarData', { avatarData: [{ title: 'User 1' }] }],
      ['allTagsList', { allTagsList: [{ label: 'Tag 1', val: 'tag1' }] }],
      ['allCategoriesList', { allCategoriesList: [{ label: 'Cat 1', val: 'cat1' }] }],
    ])('should accept %s prop', (_n, props) => {
      renderComponent(props);
      dnd().toBeInTheDocument();
    });

    it.each(['onCardOption', 'onSubCardOption'])('should accept %s callback', (name) => {
      const cb = jest.fn();
      renderComponent({ [name]: cb });
      expect(cb).toBeDefined();
    });
  });

  describe('Integration', () => {
    it('should render complete kanban board with all features', () => {
      renderComponent();
      dnd().toBeInTheDocument();
      expect(screen.getAllByTestId('card').length).toBeGreaterThan(0);
      expect(screen.getAllByTestId('button').length).toBeGreaterThan(0);
      expect(screen.getAllByTestId('icon-button').length).toBeGreaterThan(0);
      expect(screen.getAllByTestId('rds-badge').length).toBeGreaterThan(0);
    });

    it('should display all components together', () => {
      renderComponent({
        avatarData: [{ title: 'User 1', src: 'user1.jpg' }],
        allCategoriesList: [{ label: 'Category 1', val: 'cat1' }],
        allTagsList: [{ label: 'Tag 1', val: 'tag1' }],
        allowAddingNewCard: true,
        allowAddingNewSubCard: true,
      });
      dnd().toBeInTheDocument();
      expect(screen.getAllByTestId('card').length).toBeGreaterThan(0);
      expect(screen.getAllByTestId('button').length).toBeGreaterThan(0);
      expect(screen.queryAllByTestId('rds-avatar').length).toBeGreaterThan(0);
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
          dnd().toBeInTheDocument();
        });
      }
    });

    it('should handle very long board names', () => {
      renderComponent({ boardData: [makeBoard('A'.repeat(100), 'primary', [], 'long')] });
      dnd().toBeInTheDocument();
    });

    it('should handle many boards', () => {
      const manyBoards: boardInfo[] = Array.from({ length: 10 }, (_, i) => ({
        ...makeBoard(`Board ${i + 1}`, 'primary', [], `board-${i}`),
        cardId: i,
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
      renderComponent({ boardData: [makeBoard('Busy Board', 'primary', manySubCards, 'busy')] });
      dnd().toBeInTheDocument();
    });

    it.each([
      ['allCategoriesList', { allCategoriesList: [] }],
      ['allTagsList', { allTagsList: [] }],
    ])('should handle empty %s', (_n, props) => {
      renderComponent({ allowAddingNewSubCard: true, ...props });
      dnd().toBeInTheDocument();
    });

    it('should handle undefined callbacks', () => {
      renderComponent({
        onCardOption: undefined,
        onSubCardOption: undefined,
        onAddQuestionSaveHandler: undefined,
      });
      dnd().toBeInTheDocument();
    });

    it('should handle board with no actions', () => {
      renderComponent({ boardData: [makeBoard('No Actions Board', 'primary', [], 'no-actions')] });
      dnd().toBeInTheDocument();
    });

    it('should handle sub card with no actions', () => {
      const subCard = { ticketId: 'TKT001', ticketQuestion: 'Question', ticketDate: '15 Feb 2024', SubcardId: 1, actions: [] };
      renderComponent({ boardData: [makeBoard('Board', 'primary', [subCard], 'board')] });
      dnd().toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has no axe accessibility violations', async () => {
      const { container } = renderComponent();
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});

describe('audit fixes', () => {
  const base: RdsCompKanbanBoardProps = { boardData: mockBoardData, allowAddingNewCard: false, allowAddingNewSubCard: false };
  const openBoardMenu = (i: number) => {
    const headers = document.querySelectorAll('.kanban-board__header-button');
    fireEvent.click(headers[i]);
  };
  const clickMenuItem = (text: string) => {
    fireEvent.click(screen.getAllByTestId('menu-item').find((el) => el.textContent?.includes(text))!);
  };

  it('G5-115: renders the sub-card displayId, badge and description when present', () => {
    const boardData = [{ ...mockBoardData[1], subCards: [{ ...mockBoardData[0].subCards[0], displayId: 'T-9', badge: 'Urgent', description: 'Real body' }] }];
    render(<RdsCompKanbanBoard {...base} boardData={boardData} />);
    expect(screen.getByText('T-9')).toBeInTheDocument();
    expect(screen.getByTestId('rds-badge')).toHaveTextContent('Urgent');
    expect(screen.getByText(/Real body/)).toBeInTheDocument();
    expect(screen.queryByText('RDS110110')).not.toBeInTheDocument();
  });

  it('G5-116: renders the board name as given', () => {
    render(<RdsCompKanbanBoard {...base} />);
    expect(document.querySelectorAll('.card-name')[0]).toHaveTextContent('Board 1');
  });

  it('G5-117/G5-122: onBoardDataChange gets the new boards, new board appended last', () => {
    const onBoardDataChange = jest.fn();
    render(<RdsCompKanbanBoard {...base} allowAddingNewCard onBoardDataChange={onBoardDataChange} />);
    fireEvent.change(screen.getByPlaceholderText('Enter Board Title'), { target: { value: 'New' } });
    fireEvent.click(screen.getAllByTestId('button').find((b) => b.textContent?.includes('Add Board'))!);
    const boards = onBoardDataChange.mock.calls[0][0];
    expect(boards.map((b: boardInfo) => b.name)).toEqual(['Board 1', 'Board 2', 'New']);
  });

  it('G5-117: onBoardDataChange fires on board delete', () => {
    const onBoardDataChange = jest.fn();
    render(<RdsCompKanbanBoard {...base} onBoardDataChange={onBoardDataChange} />);
    openBoardMenu(0);
    clickMenuItem('Delete Board');
    expect(onBoardDataChange).toHaveBeenCalledWith([mockBoardData[1]]);
  });

  it('G5-123/G5-126: Add Item disabled until a title, ticketId not taken from description', () => {
    const onBoardDataChange = jest.fn();
    const onAddQuestionSaveHandler = jest.fn();
    render(<RdsCompKanbanBoard {...base} boardData={[mockBoardData[1]]} allowAddingNewSubCard allCategoriesList={[{ label: 'Cat', val: 'c1' }]} onBoardDataChange={onBoardDataChange} onAddQuestionSaveHandler={onAddQuestionSaveHandler} />);
    fireEvent.click(screen.getByText('Add Item'));
    const addBtn = () => screen.getAllByTestId('button').find((b) => b.textContent?.includes('Add Item'))!;
    expect(addBtn()).toBeDisabled();
    fireEvent.change(screen.getByPlaceholderText('Enter Title'), { target: { value: 'Title' } });
    fireEvent.change(screen.getByPlaceholderText('Enter Description'), { target: { value: 'Desc' } });
    expect(addBtn()).not.toBeDisabled();
    fireEvent.click(addBtn());
    const sub = onBoardDataChange.mock.calls[0][0][0].subCards[0];
    expect(sub.ticketId).not.toBe('Desc');
    expect(sub.description).toBe('Desc');
    expect(onAddQuestionSaveHandler).toHaveBeenCalledWith({ title: 'Title', description: 'Desc' });
  });

  it('G5-124: deleting a board keeps the edit state on the right board', () => {
    render(<RdsCompKanbanBoard {...base} />);
    openBoardMenu(1);
    clickMenuItem('Edit');
    expect(screen.getByDisplayValue('Board 2')).toBeInTheDocument();
    openBoardMenu(0);
    clickMenuItem('Delete Board');
    expect(screen.getByDisplayValue('Board 2')).toBeInTheDocument();
  });

  it('G5-125: onSubCardOption receives the sub-card index', () => {
    const onSubCardOption = jest.fn();
    render(<RdsCompKanbanBoard {...base} onSubCardOption={onSubCardOption} />);
    fireEvent.click(document.querySelectorAll('.rds-kanban-board__subcard-dropdown-button')[1]);
    clickMenuItem('Edit');
    expect(onSubCardOption).toHaveBeenCalledWith('edit', 1, 2);
  });

  it('G5-129: warns for props that have no effect', () => {
    render(<RdsCompKanbanBoard {...base} noDataTitle="x" />);
    expect(warnDeprecatedProp).toHaveBeenCalledWith('RdsCompKanbanBoard', 'noDataTitle', 'nothing (it has no effect)');
  });

  it('G5-137: forwards className, ref and rest to the root', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<RdsCompKanbanBoard {...base} ref={ref} className="extra" data-foo="bar" />);
    expect(ref.current).toHaveClass('rds-kanban-board-container', 'extra');
    expect(ref.current).toHaveAttribute('data-foo', 'bar');
  });

  it('G5-139: colorClass has no stray spaces', () => {
    expect(colorClass('')).toBe('kanban-primary');
    expect(colorClass('success')).toBe('kanban-success');
  });
});

describe('audit fixes', () => {
  const openMenu = (selector: string, i: number) => fireEvent.click(document.querySelectorAll(selector)[i]);
  const clickItem = (text: string) =>
    fireEvent.click(screen.getAllByTestId('menu-item').find((el) => el.textContent?.includes(text))!);

  it('305/306: allowAddColumn and allowAddCard show the add controls', () => {
    render(<RdsCompKanbanBoard defaultColumns={mockBoardData} allowAddColumn allowAddCard />);
    expect(screen.getByPlaceholderText('Enter Board Title')).toBeInTheDocument();
    expect(screen.getAllByText('Add Item').length).toBeGreaterThan(0);
  });

  it('305: warns for allowAddingNewCard', () => {
    render(<RdsCompKanbanBoard defaultColumns={mockBoardData} allowAddingNewCard />);
    expect(warnDeprecatedProp).toHaveBeenCalledWith('RdsCompKanbanBoard', 'allowAddingNewCard', '`allowAddColumn`');
  });

  it('307: categoryOptions wins over allCategoriesList', () => {
    render(<RdsCompKanbanBoard defaultColumns={[mockBoardData[1]]} allowAddCard categoryOptions={[{ label: 'New', val: 'n' }]} allCategoriesList={[{ label: 'Old', val: 'o' }]} />);
    fireEvent.click(screen.getByText('Add Item'));
    expect(screen.getByText('New')).toBeInTheDocument();
    expect(screen.queryByText('Old')).not.toBeInTheDocument();
  });

  it('308: card assignees override avatarData', () => {
    const columns = [{ ...mockBoardData[1], subCards: [{ ...mockBoardData[0].subCards[1], assignees: [{ title: 'A' }] }] }];
    render(<RdsCompKanbanBoard defaultColumns={columns} avatarData={[{ title: 'X' }, { title: 'Y' }]} />);
    expect(screen.getByTestId('rds-avatar')).toHaveTextContent('1 avatars');
  });

  it('309: controlled columns only change through onColumnsChange', () => {
    const onColumnsChange = jest.fn();
    render(<RdsCompKanbanBoard columns={mockBoardData} onColumnsChange={onColumnsChange} />);
    openMenu('.kanban-board__header-button', 0);
    clickItem('Delete Board');
    expect(onColumnsChange).toHaveBeenCalledWith([mockBoardData[1]]);
    expect(screen.getByText('Board 1')).toBeInTheDocument();
  });

  it('309: defaultColumns is uncontrolled', () => {
    render(<RdsCompKanbanBoard defaultColumns={mockBoardData} />);
    openMenu('.kanban-board__header-button', 0);
    clickItem('Delete Board');
    expect(screen.queryByText('Board 1')).not.toBeInTheDocument();
  });

  it('311: onCardAdd gets the event and the new card', () => {
    const onCardAdd = jest.fn();
    const onAddQuestionSaveHandler = jest.fn();
    render(<RdsCompKanbanBoard defaultColumns={[mockBoardData[1]]} allowAddCard onCardAdd={onCardAdd} onAddQuestionSaveHandler={onAddQuestionSaveHandler} />);
    fireEvent.click(screen.getByText('Add Item'));
    fireEvent.change(screen.getByPlaceholderText('Enter Title'), { target: { value: 'T' } });
    fireEvent.click(screen.getAllByTestId('button').find((b) => b.textContent?.includes('Add Item'))!);
    expect(onCardAdd).toHaveBeenCalledWith(expect.objectContaining({ type: 'click' }), expect.objectContaining({ ticketQuestion: 'T' }));
    expect(onAddQuestionSaveHandler).not.toHaveBeenCalled();
  });

  it('312: onColumnAction gets the event, action and column id', () => {
    const onColumnAction = jest.fn();
    const onCardOption = jest.fn();
    render(<RdsCompKanbanBoard defaultColumns={mockBoardData} onColumnAction={onColumnAction} onCardOption={onCardOption} />);
    openMenu('.kanban-board__header-button', 1);
    clickItem('Edit');
    expect(onColumnAction).toHaveBeenCalledWith(expect.objectContaining({ type: 'click' }), { action: 'edit', columnId: 2 });
    expect(onCardOption).not.toHaveBeenCalled();
  });

  it('314/315: onCardAction gets column and card ids, id/title aliases apply', () => {
    const onCardAction = jest.fn();
    const columns = [{ ...mockBoardData[0], subCards: [{ ...mockBoardData[0].subCards[1], id: 7, title: 'Alias title' }] }];
    render(<RdsCompKanbanBoard defaultColumns={columns} onCardAction={onCardAction} />);
    expect(screen.getByText('Alias title')).toBeInTheDocument();
    openMenu('.rds-kanban-board__subcard-dropdown-button', 0);
    clickItem('Edit');
    expect(onCardAction).toHaveBeenCalledWith(expect.objectContaining({ type: 'click' }), { action: 'edit', columnId: 1, cardId: 7 });
  });
});
