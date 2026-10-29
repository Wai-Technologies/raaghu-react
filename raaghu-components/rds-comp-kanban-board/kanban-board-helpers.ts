import {
  useState,
  type ChangeEvent,
  type HTMLAttributes,
  type MouseEvent,
  type MouseEventHandler,
  type Ref,
} from 'react';
import type { DragEndEvent, DragOverEvent, UniqueIdentifier } from '@dnd-kit/core';
import type { SxProps, Theme } from '@mui/material';

export interface KanbanAction {
  key: string;
  value: string;
}

export interface KanbanAssignee {
  title: string;
  subText?: string;
  src?: string;
}

export interface KanbanOption {
  label: string;
  val: string | number;
}

export interface KanbanSubCard {
  ticketId: string;
  ticketPriority: string;
  ticketQuestion: string;
  ticketDate: string;
  SubcardId: number;
  actions: KanbanAction[];
  /** Identifier shown in the card header. Nothing is rendered when omitted. */
  displayId?: string;
  /** Badge label shown in the card header. No badge is rendered when omitted. */
  badge?: string;
  /** Body text shown under the title. When omitted the body shows the title and ticket id, or just the title. */
  description?: string;
  /** Card id. Takes precedence over `SubcardId`. */
  id?: number;
  /** Card title. Takes precedence over `ticketQuestion`. */
  title?: string;
  /** Avatars shown on this card. Takes precedence over `avatarData`. */
  assignees?: KanbanAssignee[];
  /** Category picked in the add form; only set on the card passed to `onCardAdd`. */
  categoryId?: string | number;
  /** Tags picked in the add form; only set on the card passed to `onCardAdd`. */
  tags?: KanbanOption[];
}

export interface KanbanBoardInfo {
  cardId?: number;
  name: string;
  status?: string;
  subCardIndex: number;
  /** Column accent color. Preferred over `colorType`. */
  color?: "primary" | "success" | "warning" | "error";
  /** @deprecated Use `color`. */
  colorType?: "primary" | "success" | "warning" | "error";
  actions: KanbanAction[];
  key: string;
  subCards: KanbanSubCard[];
  noDataTitle?: string;
}

/** Legacy name of {@link KanbanBoardInfo}. */
export type boardInfo = KanbanBoardInfo;
export type KanbanColumn = KanbanBoardInfo;
export type KanbanCard = KanbanSubCard;

export const cardIdOf = (card: KanbanSubCard) => card.id ?? card.SubcardId;

export interface RdsCompKanbanBoardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** @deprecated It has no effect. */
  isIlliustrationSmall?: boolean;
  /** @deprecated It has no effect. */
  noDataTitle?: string | undefined;
  /** @deprecated It has no effect. */
  noDataHeaderTitle?: string | undefined;
  /** @deprecated It has no effect. */
  illustration?: boolean;
  /** Controlled columns. */
  columns?: KanbanColumn[];
  /** Initial columns when uncontrolled. */
  defaultColumns?: KanbanColumn[];
  /** @deprecated Use `columns` or `defaultColumns` instead. */
  boardData?: KanbanBoardInfo[];
  /** Shows the "Add Board" column. */
  allowAddColumn?: boolean;
  /** @deprecated Use `allowAddColumn` instead. */
  allowAddingNewCard?: boolean;
  /** Shows the "Add Item" button in each column. */
  allowAddCard?: boolean;
  /** @deprecated Use `allowAddCard` instead. */
  allowAddingNewSubCard?: boolean;
  /** @deprecated It has no effect. */
  allowAddingDynamicData?: boolean;
  /** Avatars shown on cards without their own `assignees`. */
  avatarData?: KanbanAssignee[];
  /** @deprecated It has no effect. */
  onClick?: MouseEventHandler<HTMLButtonElement>;
  /** Called when a card menu action is clicked. */
  onCardAction?: (event: MouseEvent<HTMLElement>, details: { action: string; columnId: number | undefined; cardId: number }) => void;
  /** @deprecated Use `onCardAction` instead. */
  onSubCardOption?: (option: string, subCardIndex: number, subCardId: number) => void;
  /** Called when a column menu action is clicked. */
  onColumnAction?: (event: MouseEvent<HTMLElement>, details: { action: string; columnId: number | undefined }) => void;
  /** @deprecated Use `onColumnAction` instead. */
  onCardOption?: (option: string, cardIndex: number, cardId: number | undefined, cardKey: string) => void;
  /** Called with the updated columns after a drag, add, rename or delete. */
  onColumnsChange?: (columns: KanbanColumn[]) => void;
  /** @deprecated Use `onColumnsChange` instead. */
  onBoardDataChange?: (boards: KanbanBoardInfo[]) => void;
  /** Tag options offered when adding a card. */
  tagOptions?: KanbanOption[];
  /** @deprecated Use `tagOptions` instead. */
  allTagsList?: KanbanOption[];
  /** Category options offered when adding a card. */
  categoryOptions?: KanbanOption[];
  /** @deprecated Use `categoryOptions` instead. */
  allCategoriesList?: KanbanOption[];
  /** Called with the new card when "Add Item" is clicked. */
  onCardAdd?: (event: MouseEvent<HTMLElement>, card: KanbanCard) => void;
  /** @deprecated Use `onCardAdd` instead. */
  onAddQuestionSaveHandler?: (data: Record<string, unknown>) => void;
  /** @deprecated It has no effect. */
  addQuestionData?: Record<string, unknown>;
  /** Called with the selected tags when the tag selection in the add-card form changes. */
  onSelectedTagsListChange?: (items: unknown) => void;
  /** Extra class name applied to the root element. */
  className?: string;
  /** MUI system styles applied to the root element. */
  sx?: SxProps<Theme>;
  /** Ref forwarded to the root element. */
  ref?: Ref<HTMLDivElement>;
}

const EDIT_ACTION = "edit";
const DELETE_ACTION = "delete";

const formatDate = (date: Date) => {
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  const ordinalSuffix = (n: number) => {
    return n + (["st", "nd", "rd"][((((n + 90) % 100) - 10) % 10) - 1] || "th");
  };

  return `${ordinalSuffix(day)} ${month} ${year}`;
};

const generateRandomId = (): number => {
  const cryptoApi = typeof globalThis !== 'undefined' ? globalThis.crypto : undefined;
  if (cryptoApi && typeof cryptoApi.randomUUID === 'function') {
    return parseInt(cryptoApi.randomUUID().replace(/-/g, '').slice(0, 13), 16);
  }
  return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
};

export const colorClass = (colortype: string) =>
  `kanban-${colortype != "" && colortype != null ? colortype : "primary"}`;

export const useKanbanBoardState = (props: RdsCompKanbanBoardProps) => {
  const [boardName, setBoardName] = useState("");
  const [showAddBoardBtn, setShowAddBoardBtn] = useState(props.allowAddingNewCard ? false : true);
  const [addButton, setAddButton] = useState(props.allowAddingNewSubCard ? true : false);
  const [showBoard, setShowBoard] = useState(true);
  const initial = props.columns ?? props.defaultColumns ?? props.boardData;
  const [isEditingBoardName, setIsEditingBoardName] = useState<boolean[]>(initial ? initial.map(() => false) : []);

  const [innerBoards, setInnerBoards] = useState<KanbanBoardInfo[]>(() => [...(props.defaultColumns ?? props.boardData ?? [])]);
  const [prevBoardData, setPrevBoardData] = useState(props.boardData);
  if (props.boardData !== prevBoardData) {
    setPrevBoardData(props.boardData);
    setInnerBoards(props.boardData ? [...props.boardData] : []);
  }
  const boards = props.columns ?? innerBoards;
  const setBoards = (next: KanbanBoardInfo[]) => {
    if (props.columns === undefined) setInnerBoards(next);
  };

  const [subCardInputsVisible, setSubCardInputsVisible] = useState<number | null>(null);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [subCardAnchorEl, setSubCardAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedCard, setSelectedCard] = useState<KanbanBoardInfo | null>(null);
  const [selectedSubCard, setSelectedSubCard] = useState<KanbanSubCard | null>(null);
  const [selectedCardIndex, setSelectedCardIndex] = useState<number>(-1);

  const [addQuestionData, setAddQuestionFormData] = useState<Record<string, unknown>>({});

  return {
    boardName,
    setBoardName,
    showAddBoardBtn,
    setShowAddBoardBtn,
    addButton,
    setAddButton,
    showBoard,
    setShowBoard,
    isEditingBoardName,
    setIsEditingBoardName,
    boards,
    setBoards,
    subCardInputsVisible,
    setSubCardInputsVisible,
    anchorEl,
    setAnchorEl,
    subCardAnchorEl,
    setSubCardAnchorEl,
    selectedCard,
    setSelectedCard,
    selectedSubCard,
    setSelectedSubCard,
    selectedCardIndex,
    setSelectedCardIndex,
    addQuestionData,
    setAddQuestionFormData,
  };
};

type KanbanBoardState = ReturnType<typeof useKanbanBoardState>;

export const createEventHandlers = (state: KanbanBoardState, props: RdsCompKanbanBoardProps) => {
  const {
    boardName,
    setBoardName,
    boards,
    setBoards,
    setShowAddBoardBtn,
    setAddButton,
    setShowBoard,
    setIsEditingBoardName,
    setAnchorEl,
    setSubCardAnchorEl,
    setSelectedCard,
    setSelectedSubCard,
    setSelectedCardIndex,
    setSubCardInputsVisible,
    addQuestionData,
    setAddQuestionFormData,
  } = state;

  const commitBoards = (next: KanbanBoardInfo[]) => {
    setBoards(next);
    props.onColumnsChange?.(next);
  };

  const handleShowInputBox = () => {
    setShowAddBoardBtn(true);
    setBoardName("");
  };

  const onAddButtonClick = () => {
    const newBoard: KanbanBoardInfo = {
      cardId: generateRandomId(),
      name: boardName,
      color: "primary",
      subCardIndex: boards.length,
      subCards: [],
      actions: [],
      key: "",
    };

    commitBoards([...boards, newBoard]);
    setIsEditingBoardName((prevState: boolean[]) => [...prevState, false]);
    setShowAddBoardBtn(false);
    setAddButton(true);
    setShowBoard(true);
  };

  const onCancel = () => {
    setShowAddBoardBtn(false);
    setAddButton(true);
    setBoardName("");
    setShowBoard(true);
  };

  const handleDataChanges = (event: ChangeEvent<HTMLInputElement>) => {
    setBoardName(event.target.value);
  };

  const toggleDropdown = (index: number, event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setSelectedCardIndex(index);
    setSelectedCard(boards[index]);
  };

  const toggleSubCardDropdown = (subCardId: number, event: MouseEvent<HTMLElement>, subCard: KanbanSubCard, cardIndex: number) => {
    setSubCardAnchorEl(event.currentTarget);
    setSelectedSubCard(subCard);
    setSelectedCardIndex(cardIndex);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSubCardAnchorEl(null);
    setSelectedCard(null);
    setSelectedSubCard(null);
    setSelectedCardIndex(-1);
  };

  const editBoardName = (index: number) => {
    setIsEditingBoardName((prevState: boolean[]) =>
      prevState.map((s: boolean, i: number) => i === index ? true : false)
    );
    setBoardName(boards[index].name);
    handleClose();
  };

  const deleteCard = (index: number) => {
    commitBoards(boards.filter((_card: KanbanBoardInfo, i: number) => i !== index));
    setIsEditingBoardName((prevState: boolean[]) => prevState.filter((_s: boolean, i: number) => i !== index));
    handleClose();
  };

  const deleteSubCard = (index: number, subCardId: number) => {
    commitBoards(
      boards.map((card: KanbanBoardInfo, i: number) =>
        i === index
          ? {
              ...card,
              subCards: card.subCards.filter((subCard: KanbanSubCard) => cardIdOf(subCard) !== subCardId),
            }
          : card
      )
    );
    handleClose();
  };

  const handleCardOptionClick = (event: MouseEvent<HTMLElement>, action: string, cardIndex: number, cardId: number | undefined, cardKey: string) => {
    if (props.onColumnAction) props.onColumnAction(event, { action, columnId: cardId });
    else props.onCardOption?.(action, cardIndex, cardId, cardKey);
    switch (action) {
      case EDIT_ACTION:
        editBoardName(cardIndex);
        break;
      case DELETE_ACTION:
        deleteCard(cardIndex);
        break;
      default:
    }
    handleClose();
  };

  const handleOptionClick = (event: MouseEvent<HTMLElement>, action: string, boardIndex: number, subCardId: number) => {
    const subCardIndex = boards[boardIndex]?.subCards.findIndex((sc: KanbanSubCard) => cardIdOf(sc) === subCardId) ?? -1;
    if (props.onCardAction) props.onCardAction(event, { action, columnId: boards[boardIndex]?.cardId, cardId: subCardId });
    else props.onSubCardOption?.(action, subCardIndex, subCardId);
    if (action === DELETE_ACTION) {
      deleteSubCard(boardIndex, subCardId);
    }
    handleClose();
  };

  const addSubCard = (index: number) => {
    setSubCardInputsVisible(index);
  };

  const onAddSubCardClick = (event: MouseEvent<HTMLElement>, index: number) => {
    const subCardId = generateRandomId();
    const newSubcard: KanbanSubCard = {
      ticketId: String(subCardId),
      ticketPriority: "",
      ticketQuestion: String(addQuestionData.title ?? ''),
      ticketDate: formatDate(new Date()),
      SubcardId: subCardId,
      description: String(addQuestionData.description ?? ''),
      actions: [
        { key: "Assign", value: "assign" },
        { key: "View", value: "view" },
        { key: "Delete", value: "delete" },
      ],
    };

    const updatedCards = [...boards];
    updatedCards[index] = {
      ...updatedCards[index],
      subCards: [...updatedCards[index].subCards, newSubcard]
    };
    commitBoards(updatedCards);

    setSubCardInputsVisible(null);
    setAddQuestionFormData({});

    const { supportCategoryId, supportTagIds } = addQuestionData;
    if (props.onCardAdd) {
      props.onCardAdd(event, {
        ...newSubcard,
        ...(supportCategoryId !== undefined && { categoryId: supportCategoryId as string | number }),
        ...(supportTagIds !== undefined && { tags: supportTagIds as KanbanOption[] }),
      });
    } else props.onAddQuestionSaveHandler?.(addQuestionData);
  };

  const handleChange = (val: { value: string }, selectedCardId: number | undefined) => {
    commitBoards(
      boards.map((card: KanbanBoardInfo) =>
        card.cardId === selectedCardId ? { ...card, name: val.value } : card
      )
    );
    setIsEditingBoardName((prevState: boolean[]) => prevState.map(() => false));
  };

  const handleAddQuestionDataChanges = (value: unknown, key: string) => {
    setAddQuestionFormData((prev: Record<string, unknown>) => ({ ...prev, [key]: value }));
  };

  const onSelectedCreators = (items: unknown) => {
    handleAddQuestionDataChanges(items, "supportTagIds");
    props.onSelectedTagsListChange && props.onSelectedTagsListChange(items);
  };

  return {
    handleShowInputBox,
    onAddButtonClick,
    onCancel,
    handleDataChanges,
    toggleDropdown,
    toggleSubCardDropdown,
    handleClose,
    editBoardName,
    deleteCard,
    deleteSubCard,
    handleCardOptionClick,
    handleOptionClick,
    addSubCard,
    onAddSubCardClick,
    handleChange,
    handleAddQuestionDataChanges,
    onSelectedCreators,
  };
};

const findSubCardLocation = (boards: KanbanBoardInfo[], id: UniqueIdentifier) => {
  for (let boardIndex = 0; boardIndex < boards.length; boardIndex++) {
    const subCardIndex = boards[boardIndex].subCards.findIndex(
      (card) => cardIdOf(card) === id,
    );
    if (subCardIndex !== -1) return { boardIndex, subCardIndex };
  }
  return null;
};

const resolveDropLocation = (
  boards: KanbanBoardInfo[],
  overId: UniqueIdentifier,
  overData: { boardIndex?: number; subCardIndex?: number } | null | undefined,
) => {
  if (typeof overId === 'string' && overId.startsWith('column-')) {
    const boardIndex = parseInt(overId.replace('column-', ''), 10);
    return {
      boardIndex,
      subCardIndex: boards[boardIndex]?.subCards.length ?? 0,
    };
  }
  return {
    boardIndex: overData?.boardIndex ?? -1,
    subCardIndex: overData?.subCardIndex ?? -1,
  };
};

const moveSubCard = (
  boards: KanbanBoardInfo[],
  sourceBoardIndex: number,
  sourceSubCardIndex: number,
  destBoardIndex: number,
  destSubCardIndex: number,
) => {
  const newBoards = Array.from(boards);
  if (sourceBoardIndex === destBoardIndex) {
    const newSubCards = Array.from(boards[sourceBoardIndex].subCards);
    const [moved] = newSubCards.splice(sourceSubCardIndex, 1);
    newSubCards.splice(destSubCardIndex, 0, moved);
    newBoards[sourceBoardIndex] = { ...newBoards[sourceBoardIndex], subCards: newSubCards };
  } else {
    const sourceSubCards = Array.from(boards[sourceBoardIndex].subCards);
    const destSubCards = Array.from(boards[destBoardIndex].subCards);
    const [moved] = sourceSubCards.splice(sourceSubCardIndex, 1);
    destSubCards.splice(destSubCardIndex, 0, moved);
    newBoards[sourceBoardIndex] = { ...newBoards[sourceBoardIndex], subCards: sourceSubCards };
    newBoards[destBoardIndex] = { ...newBoards[destBoardIndex], subCards: destSubCards };
  }
  return newBoards;
};

/** Cross-column preview while dragging (G5-132). Same-column reorder is handled on drag end. */
export const createDragOverHandler = (
  boards: KanbanBoardInfo[],
  setBoards: (next: KanbanBoardInfo[]) => void,
  onColumnsChange?: (columns: KanbanColumn[]) => void,
) => {
  return (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;
    if (active.id === over.id) return;

    const source = findSubCardLocation(boards, active.id);
    if (!source) return;

    const dest = resolveDropLocation(boards, over.id, over.data.current);
    if (dest.boardIndex < 0 || dest.boardIndex >= boards.length) return;
    if (source.boardIndex === dest.boardIndex) return;

    const newBoards = moveSubCard(
      boards,
      source.boardIndex,
      source.subCardIndex,
      dest.boardIndex,
      dest.subCardIndex,
    );
    setBoards(newBoards);
    onColumnsChange?.(newBoards);
  };
};

export const createDragEndHandler = (
  boards: KanbanBoardInfo[],
  setBoards: (next: KanbanBoardInfo[]) => void,
  onColumnsChange?: (columns: KanbanColumn[]) => void,
) => {
  return (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    if (active.id === over.id) return;

    const source = findSubCardLocation(boards, active.id)
      ?? {
        boardIndex: active.data.current?.boardIndex ?? -1,
        subCardIndex: active.data.current?.subCardIndex ?? -1,
      };
    if (source.boardIndex === -1 || source.subCardIndex === -1) return;

    const dest = resolveDropLocation(boards, over.id, over.data.current);
    if (dest.boardIndex < 0 || dest.boardIndex >= boards.length) return;

    const newBoards = moveSubCard(
      boards,
      source.boardIndex,
      source.subCardIndex,
      dest.boardIndex,
      dest.subCardIndex,
    );
    setBoards(newBoards);
    onColumnsChange?.(newBoards);
  };
};
