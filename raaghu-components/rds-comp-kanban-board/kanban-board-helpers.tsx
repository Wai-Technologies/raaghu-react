import React, { useState, useEffect } from 'react';

export interface boardInfo {
  cardId?: number;
  name: string;
  status?: string;
  subCardIndex: number;
  colorType: "primary" | "success" | "warning" | "error";
  actions: any[];
  key: string;
  subCards: {
    ticketId: string;
    ticketPriority?: string;
    ticketQuestion: string;
    ticketDate: string;
    SubcardId: number;
    assignedToName?: string;
    assignedTo?: string;
    actions: any[];
  }[];
  noDataTitle?: string;
}

export interface RdsCompKanbanBoardProps {
  isIlliustrationSmall?: boolean;
  noDataTitle?: string | undefined;
  noDataHeaderTitle?: string | undefined;
  illustration?: boolean;
  boardData?: any;
  allowAddingNewCard?: boolean;
  allowAddingNewSubCard?: boolean;
  allowAddingDynamicData?: boolean;
  avatarData?: Array<{
    title: string;
    subText?: string;
    src?: string;
  }>;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onSubCardOption?: (option: any, subCardIndex: number, subCardId: any) => void;
  onCardOption?: (option: any, cardIndex: number, cardId: any, cardKey: string) => void;
  allTagsList?: any;
  allCategoriesList?: any;
  onAddQuestionSaveHandler?: (data: any) => void;
  addQuestionData?: any;
  onSelectedTagsListChange?: (items: any) => void;
}

export const formatDate = (date: Date) => {
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  const ordinalSuffix = (n: number) => {
    return n + (["st", "nd", "rd"][((((n + 90) % 100) - 10) % 10) - 1] || "th");
  };

  return `${ordinalSuffix(day)} ${month} ${year}`;
};

export const generateRandomId = () => {
  return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
};

export const colorClass = (colortype: string) => {
  let defaultClass: string = " ";
  const colorVar = "kanban-" + (colortype != "" && colortype != null ? colortype : "primary ");
  if (colorVar) {
    defaultClass += colorVar;
  }
  return defaultClass;
};

export const priorityList = [
  { label: "High", val: "High" },
  { label: "Moderate", val: "Moderate" },
  { label: "Low", val: "Low" },
];

export const useKanbanBoardState = (props: RdsCompKanbanBoardProps) => {
  const [boardName, setBoardName] = useState("");
  const [allowAddingNewCard, setAllowAddingNewCard] = useState(props.allowAddingNewCard || true);
  const [showAddBoardBtn, setShowAddBoardBtn] = useState(props.allowAddingNewCard ? false : true);
  const [addButton, setAddButton] = useState(props.allowAddingNewSubCard ? true : false);
  const [showBoard, setShowBoard] = useState(true);
  const [isEditingBoardName, setIsEditingBoardName] = useState<boolean[]>(
    props.boardData ? [...props.boardData.map(() => false)] : []
  );

  const [boards, setBoards] = useState<boardInfo[]>(props.boardData ? [...props.boardData] : []);
  const [totalRecords, setBoardsRecord] = useState<any>(props.boardData ? [...props.boardData] : []);

  useEffect(() => {
    setBoards(props.boardData ? [...props.boardData] : []);
  }, [props.boardData]);

  const [isBoardDropdownOpen, setIsBoardDropdownOpen] = useState<boolean[]>(
    props.boardData ? [...props.boardData.map(() => false)] : []
  );
  const [isSubCardDropdownOpen, setIsSubCardDropdownOpen] = useState<{ [key: number]: boolean }>({});
  const [subCardInputsVisible, setSubCardInputsVisible] = useState<number | null>(null);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [subCardAnchorEl, setSubCardAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedCard, setSelectedCard] = useState<any>(null);
  const [selectedSubCard, setSelectedSubCard] = useState<any>(null);
  const [selectedCardIndex, setSelectedCardIndex] = useState<number>(-1);

  const [ticketIdValue, setTicketIdValue] = useState<string>("");
  const [ticketPriorityValue, setTicketPriorityValue] = useState<string>("");
  const [ticketQuestionValue, setTicketQuestionValue] = useState<string>("");
  const [ticketDateValue, setTicketDateValue] = useState<string>(formatDate(new Date()));
  const [editAction, setEditAction] = useState<string>("edit");
  const [deleteAction, setDeleteAction] = useState<string>("delete");
  const [assignAction, setAssignAction] = useState<string>("assign");
  const [viewAction, setViewAction] = useState<string>("view");

  const [tasks, setTasks] = useState<{
    name: string;
    completed: boolean;
    subCardIndex: number;
    cardIndex: number;
    taskId: number;
  }[]>([]);
  const [totalTasks, setTotalTasks] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);

  const [addQuestionData, setAddQuestionFormData] = useState<any>({});

  return {
    boardName,
    setBoardName,
    allowAddingNewCard,
    setAllowAddingNewCard,
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
    totalRecords,
    setBoardsRecord,
    isBoardDropdownOpen,
    setIsBoardDropdownOpen,
    isSubCardDropdownOpen,
    setIsSubCardDropdownOpen,
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
    ticketIdValue,
    setTicketIdValue,
    ticketPriorityValue,
    setTicketPriorityValue,
    ticketQuestionValue,
    setTicketQuestionValue,
    ticketDateValue,
    setTicketDateValue,
    editAction,
    setEditAction,
    deleteAction,
    setDeleteAction,
    assignAction,
    setAssignAction,
    viewAction,
    setViewAction,
    tasks,
    setTasks,
    totalTasks,
    setTotalTasks,
    completedTasks,
    setCompletedTasks,
    addQuestionData,
    setAddQuestionFormData,
  };
};

export const createEventHandlers = (state: any, props: RdsCompKanbanBoardProps) => {
  const {
    boardName,
    setBoardName,
    boards,
    setBoards,
    setShowAddBoardBtn,
    setAddButton,
    setShowBoard,
    setIsBoardDropdownOpen,
    setIsEditingBoardName,
    setAnchorEl,
    setSubCardAnchorEl,
    setSelectedCard,
    setSelectedSubCard,
    setSelectedCardIndex,
    setSubCardInputsVisible,
    addQuestionData,
    setAddQuestionFormData,
    setTicketDateValue,
    setIsSubCardDropdownOpen,
    editAction,
    deleteAction,
    assignAction,
    viewAction,
  } = state;

  const handleShowInputBox = () => {
    setShowAddBoardBtn(true);
    setBoardName("");
  };

  const onAddButtonClick = () => {
    const newBoard: boardInfo = {
      cardId: generateRandomId(),
      name: boardName,
      colorType: "primary",
      subCardIndex: boards.length,
      subCards: [],
      actions: [],
      key: "",
    };

    setBoards((prevCards: any) => {
      const updatedCards = [...prevCards];
      if (updatedCards.length > 0) {
        updatedCards.splice(-1, 0, newBoard);
      } else {
        updatedCards.push(newBoard);
      }
      return updatedCards;
    });
    setIsBoardDropdownOpen((prevState: any) => [...prevState, false]);
    setIsEditingBoardName((prevState: any) => [...prevState, false]);
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

  const handleDataChanges = (event: any) => {
    setBoardName(event.target.value);
  };

  const toggleDropdown = (index: number, event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setSelectedCardIndex(index);
    setSelectedCard(boards[index]);
  };

  const toggleSubCardDropdown = (subCardId: number, event: React.MouseEvent<HTMLElement>, subCard: any, cardIndex: number) => {
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
    setIsEditingBoardName((prevState: any) =>
      prevState.map((state: any, i: number) => (i === index ? true : false))
    );
    setBoardName(boards[index].name);
    handleClose();
  };

  const deleteCard = (index: number) => {
    setBoards((prevCards: any) => prevCards.filter((card: any, i: number) => i !== index));
    setIsBoardDropdownOpen((prevState: any) => prevState.filter((state: any, i: number) => i !== index));
    handleClose();
  };

  const deleteSubCard = (index: number, subCardIndex: number) => {
    setBoards((prevCards: any) =>
      prevCards.map((card: any, i: number) =>
        i === index
          ? {
              ...card,
              subCards: card.subCards.filter((subCard: any, j: number) => subCard.SubcardId !== subCardIndex),
            }
          : card
      )
    );
    handleClose();
  };

  const handleCardOptionClick = (action: string, cardIndex: number, cardId: any, cardKey: string) => {
    props.onCardOption && props.onCardOption(action, cardIndex, cardId, cardKey);
    switch (action) {
      case editAction:
        editBoardName(cardIndex);
        break;
      case deleteAction:
        deleteCard(cardIndex);
        break;
      default:
    }
    handleClose();
  };

  const handleOptionClick = (action: string, subCardIndex: number, subCardId: any) => {
    props.onSubCardOption && props.onSubCardOption(action, subCardIndex, subCardId);
    switch (action) {
      case assignAction:
        break;
      case viewAction:
        break;
      case "viewedit":
        break;
      case deleteAction:
        deleteSubCard(subCardIndex, subCardId);
        break;
      default:
    }
    handleClose();
  };

  const addSubCard = (index: number) => {
    setSubCardInputsVisible(index);
  };

  const onAddSubCardClick = (index: number) => {
    setTicketDateValue(formatDate(new Date()));

    const newSubcard = {
      ticketId: addQuestionData.description,
      ticketPriority: "",
      ticketQuestion: addQuestionData.title,
      ticketDate: formatDate(new Date()),
      SubcardId: generateRandomId(),
      actions: [
        { key: "Assign", value: "assign" },
        { key: "View", value: "view" },
        { key: "Delete", value: "delete" },
      ],
    };

    setBoards((prevCards: any) => {
      const updatedCards = [...prevCards];
      updatedCards[index] = {
        ...updatedCards[index],
        subCards: [...updatedCards[index].subCards, newSubcard]
      };
      return updatedCards;
    });

    setIsSubCardDropdownOpen((prevState: any) => ({
      ...prevState,
      [newSubcard.SubcardId]: false,
    }));

    setSubCardInputsVisible(null);
    setAddQuestionFormData({});
    setTicketDateValue(formatDate(new Date()));

    props.onAddQuestionSaveHandler && props.onAddQuestionSaveHandler(addQuestionData);
  };

  const handleChange = (val: any, selectedCardId: any) => {
    setBoards((prevCards: any) =>
      prevCards.map((card: any) =>
        card.cardId === selectedCardId ? { ...card, name: val.value } : card
      )
    );
    setIsEditingBoardName((prevState: any) => prevState.map(() => false));
  };

  const handleAddQuestionDataChanges = (value: any, key: string) => {
    setAddQuestionFormData({ ...addQuestionData, [key]: value });
  };

  const onSelectedCreators = (items: any) => {
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

export const createDragEndHandler = (boards: boardInfo[], setBoards: any) => {
  return (event: { active: { id: any; data: { current: any } }; over: { id: any; data: { current: any } } | null }) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;
    if (activeId === overId) return;

    // Source info comes from useSortable data
    const sourceBoardIndex: number = active.data.current?.boardIndex ?? -1;
    const sourceSubCardIndex: number = active.data.current?.subCardIndex ?? -1;
    if (sourceBoardIndex === -1 || sourceSubCardIndex === -1) return;

    // Destination: either a column drop zone ("column-N") or another subcard
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

    if (sourceBoardIndex === destBoardIndex) {
      const newSubCards = Array.from(boards[sourceBoardIndex].subCards);
      const [moved] = newSubCards.splice(sourceSubCardIndex, 1);
      newSubCards.splice(destSubCardIndex, 0, moved);
      const newBoards = Array.from(boards);
      newBoards[sourceBoardIndex] = { ...newBoards[sourceBoardIndex], subCards: newSubCards };
      setBoards(newBoards);
    } else {
      const sourceSubCards = Array.from(boards[sourceBoardIndex].subCards);
      const destSubCards = Array.from(boards[destBoardIndex].subCards);
      const [moved] = sourceSubCards.splice(sourceSubCardIndex, 1);
      destSubCards.splice(destSubCardIndex, 0, moved);
      const newBoards = Array.from(boards);
      newBoards[sourceBoardIndex] = { ...newBoards[sourceBoardIndex], subCards: sourceSubCards };
      newBoards[destBoardIndex] = { ...newBoards[destBoardIndex], subCards: destSubCards };
      setBoards(newBoards);
    }
  };
};
