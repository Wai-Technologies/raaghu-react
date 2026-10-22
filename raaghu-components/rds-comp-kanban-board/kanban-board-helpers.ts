import {
  useState,
  type ChangeEvent,
  type Dispatch,
  type HTMLAttributes,
  type MouseEvent,
  type MouseEventHandler,
  type Ref,
  type SetStateAction,
} from 'react';
import type { DragEndEvent } from '@dnd-kit/core';
import type { SxProps, Theme } from '@mui/material';

export interface KanbanAction {
  key: string;
  value: string;
}

export interface KanbanSubCard {
  ticketId: string;
  ticketPriority: string;
  ticketQuestion: string;
  ticketDate: string;
  SubcardId: number;
  actions: KanbanAction[];
  assignedToName?: string;
  assignedTo?: string;
  /** Identifier shown in the card header. Falls back to `RDS110110` when omitted. */
  displayId?: string;
  /** Badge label shown in the card header. Falls back to `Badge` when omitted. */
  badge?: string;
  /** Body text shown under the question. When omitted the legacy body is rendered. */
  description?: string;
}

export interface KanbanBoardInfo {
  cardId?: number;
  name: string;
  status?: string;
  subCardIndex: number;
  colorType: "primary" | "success" | "warning" | "error";
  actions: KanbanAction[];
  key: string;
  subCards: KanbanSubCard[];
  noDataTitle?: string;
}

/** Legacy name of {@link KanbanBoardInfo}. */
export type boardInfo = KanbanBoardInfo;

export interface RdsCompKanbanBoardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** @deprecated It has no effect. */
  isIlliustrationSmall?: boolean;
  /** @deprecated It has no effect. */
  noDataTitle?: string | undefined;
  /** @deprecated It has no effect. */
  noDataHeaderTitle?: string | undefined;
  /** @deprecated It has no effect. */
  illustration?: boolean;
  boardData?: KanbanBoardInfo[];
  allowAddingNewCard?: boolean;
  allowAddingNewSubCard?: boolean;
  /** @deprecated It has no effect. */
  allowAddingDynamicData?: boolean;
  avatarData?: Array<{
    title: string;
    subText?: string;
    src?: string;
  }>;
  /** @deprecated It has no effect. */
  onClick?: MouseEventHandler<HTMLButtonElement>;
  onSubCardOption?: (option: string, subCardIndex: number, subCardId: number) => void;
  onCardOption?: (option: string, cardIndex: number, cardId: number | undefined, cardKey: string) => void;
  /** Called with the updated boards after a drag, add, rename or delete. */
  onBoardDataChange?: (boards: KanbanBoardInfo[]) => void;
  allTagsList?: any[];
  allCategoriesList?: any[];
onAddQuestionSave?: (data: Record<string, unknown>) => void;
  /** @deprecated It has no effect. */
  addQuestionData?: Record<string, any>;
  onSelectedTagsListChange?: (items: unknown) => void;
  className?: string;
  sx?: SxProps<Theme>;
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
    // 13 hex digits = 52 bits, always a safe integer.
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
  const [isEditingBoardName, setIsEditingBoardName] = useState<boolean[]>(
    props.boardData ? [...props.boardData.map(() => false)] : []
  );

  const [boards, setBoards] = useState<KanbanBoardInfo[]>(props.boardData ? [...props.boardData] : []);
  const [prevBoardData, setPrevBoardData] = useState(props.boardData);
  if (props.boardData !== prevBoardData) {
    setPrevBoardData(props.boardData);
    setBoards(props.boardData ? [...props.boardData] : []);
  }

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
    props.onBoardDataChange?.(next);
  };

  const handleShowInputBox = () => {
    setShowAddBoardBtn(true);
    setBoardName("");
  };

  const onAddButtonClick = () => {
    const newBoard: KanbanBoardInfo = {
      cardId: generateRandomId(),
      name: boardName,
      colorType: "primary",
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

  const toggleSubCardDropdown = (subCardId: number, event: MouseEvent<HTMLElement>, subCard: any, cardIndex: number) => {
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
              subCards: card.subCards.filter((subCard: KanbanSubCard) => subCard.SubcardId !== subCardId),
            }
          : card
      )
    );
    handleClose();
  };

  const handleCardOptionClick = (action: string, cardIndex: number, cardId: number | undefined, cardKey: string) => {
    props.onCardOption && props.onCardOption(action, cardIndex, cardId, cardKey);
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

  const handleOptionClick = (action: string, boardIndex: number, subCardId: number) => {
    const subCardIndex = boards[boardIndex]?.subCards.findIndex((sc: KanbanSubCard) => sc.SubcardId === subCardId) ?? -1;
    props.onSubCardOption && props.onSubCardOption(action, subCardIndex, subCardId);
    if (action === DELETE_ACTION) {
      deleteSubCard(boardIndex, subCardId);
    }
    handleClose();
  };

  const addSubCard = (index: number) => {
    setSubCardInputsVisible(index);
  };

  const onAddSubCardClick = (index: number) => {
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

    props.onAddQuestionSave && props.onAddQuestionSave(addQuestionData);
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

export const createDragEndHandler = (
  boards: KanbanBoardInfo[],
  setBoards: Dispatch<SetStateAction<KanbanBoardInfo[]>>,
  onBoardDataChange?: (boards: KanbanBoardInfo[]) => void,
) => {
  return (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;
    if (activeId === overId) return;

    const sourceBoardIndex: number = active.data.current?.boardIndex ?? -1;
    const sourceSubCardIndex: number = active.data.current?.subCardIndex ?? -1;
    if (sourceBoardIndex === -1 || sourceSubCardIndex === -1) return;

    let destBoardIndex: number;
    let destSubCardIndex: number;

    if (typeof overId === 'string' && overId.startsWith('column-')) {
      destBoardIndex = parseInt(overId.replace('column-', ''), 10);
      destSubCardIndex = boards[destBoardIndex]?.subCards.length ?? 0;
    } else {
      destBoardIndex = over.data.current?.boardIndex ?? -1;
      destSubCardIndex = over.data.current?.subCardIndex ?? -1;
    }

    if (destBoardIndex < 0 || destBoardIndex >= boards.length) return;

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
    setBoards(newBoards);
    onBoardDataChange?.(newBoards);
  };
};
