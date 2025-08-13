import React, { useCallback, useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import './rds-comp-kanban-board.scss';
// @ts-ignore - React 19 compatibility
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Chip,
  Avatar,
  Menu,
  MenuItem,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  FormControl,
  InputLabel,
  Select,
  Autocomplete,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import {
  MoreVert as MoreVertIcon,
  Add as AddIcon,
  Close as CloseIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

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
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onSubCardOption?: (option: any, subCardIndex: number, subCardId: any) => void;
  onCardOption?: (option: any, cardIndex: number, cardId: any, cardKey: string) => void;
  allTagsList?: any;
  allCategoriesList?: any;
  onAddQuestionSaveHandler?: (data: any) => void;
  addQuestionData?: any;
  onSelectedTagsListChange?: (items: any) => void;
}

const RdsCompKanbanBoard = (props: RdsCompKanbanBoardProps) => {
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
  const [subCardInputsVisible, setSubCardInputsVisible] = useState<number | null>(
    props.boardData ? props.boardData.length : 0
  );

  // Menu anchor elements
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [subCardAnchorEl, setSubCardAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedCard, setSelectedCard] = useState<any>(null);
  const [selectedSubCard, setSelectedSubCard] = useState<any>(null);
  const [selectedCardIndex, setSelectedCardIndex] = useState<number>(-1);

  const formatDate = (date: Date) => {
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();

    const ordinalSuffix = (n: number) => {
      return n + (["st", "nd", "rd"][((((n + 90) % 100) - 10) % 10) - 1] || "th");
    };

    return `${ordinalSuffix(day)} ${month} ${year}`;
  };

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

  const priorityList = [
    { label: "High", val: "High" },
    { label: "Moderate", val: "Moderate" },
    { label: "Low", val: "Low" },
  ];

  const [addQuestionData, setAddQuestionFormData] = useState<any>({});

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

    setBoards((prevCards: any) => [...prevCards, newBoard]);
    setIsBoardDropdownOpen((prevState) => [...prevState, false]);
    setIsEditingBoardName((prevState) => [...prevState, false]);
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
    setIsEditingBoardName((prevState) =>
      prevState.map((state, i) => (i === index ? true : false))
    );
    setBoardName(boards[index].name);
    handleClose();
  };

  const deleteCard = (index: number) => {
    setBoards((prevCards) => prevCards.filter((card, i) => i !== index));
    setIsBoardDropdownOpen((prevState) => prevState.filter((state, i) => i !== index));
    handleClose();
  };

  const deleteSubCard = (index: number, subCardIndex: number) => {
    setBoards((prevCards) =>
      prevCards.map((card, i) =>
        i === index
          ? {
              ...card,
              subCards: card.subCards.filter((subCard, j) => subCard.SubcardId !== subCardIndex),
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
      ticketDate: ticketDateValue,
      SubcardId: generateRandomId(),
      actions: [
        { key: "Assign", value: "assign" },
        { key: "View", value: "view" },
        { key: "Delete", value: "delete" },
      ],
    };

    setBoards((prevCards) => {
      const updatedCards = [...prevCards];
      updatedCards[index] = {
        ...updatedCards[index],
        subCards: [...updatedCards[index].subCards, newSubcard]
      };
      return updatedCards;
    });

    setIsSubCardDropdownOpen((prevState) => ({
      ...prevState,
      [newSubcard.SubcardId]: false,
    }));

    setSubCardInputsVisible(null);
    setAddQuestionFormData({});
    setTicketDateValue(formatDate(new Date()));

    props.onAddQuestionSaveHandler && props.onAddQuestionSaveHandler(addQuestionData);
  };

  function generateRandomId() {
    return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
  }

  const onDragEnd = (result: any) => {
    const { source, destination, draggableId, type } = result;

    if (!destination) {
      return;
    }
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    if (type === "subCard") {
      const startCard = boards.find((card) => card.subCardIndex === Number(source.droppableId));
      const finishCard = boards.find((card) => card.subCardIndex === Number(destination.droppableId));

      if (!startCard || !finishCard) {
        return;
      }

      const startCardIndex = boards.indexOf(startCard);
      const finishCardIndex = boards.indexOf(finishCard);

      if (startCardIndex === finishCardIndex) {
        // Reorder within the same card
        const newSubCards = Array.from(startCard.subCards);
        const movedSubCard = newSubCards.find((subCard) => subCard.SubcardId === Number(draggableId));
        let sourceIndex = -1;
        if (movedSubCard) {
          sourceIndex = newSubCards.indexOf(movedSubCard);
        }
        const secondSubCard = newSubCards.find((subCard) => subCard.SubcardId === Number(destination.index));
        let secondsourceIndex = -1;
        if (secondSubCard) {
          secondsourceIndex = newSubCards.indexOf(secondSubCard);
        }

        if (movedSubCard && sourceIndex !== -1) {
          const temp = newSubCards[sourceIndex];
          newSubCards[sourceIndex] = newSubCards[secondsourceIndex];
          newSubCards[secondsourceIndex] = temp;

          const newCards = Array.from(boards);
          newCards[startCardIndex] = {
            ...newCards[startCardIndex],
            subCards: newSubCards,
          };

          setBoards(newCards);
        }
      } else {
        // Move to a different card
        const startSubCards = Array.from(startCard.subCards);
        const movedSubCard = startSubCards.find((subCard) => subCard.SubcardId === Number(draggableId));
        let sourceIndex = -1;
        if (movedSubCard) {
          sourceIndex = startSubCards.indexOf(movedSubCard);
        }

        if (movedSubCard && sourceIndex !== -1) {
          startSubCards.splice(sourceIndex, 1);
          const finishSubCards = Array.from(finishCard.subCards);
          finishSubCards.splice(destination.index, 0, movedSubCard);

          const newCards = Array.from(boards);
          newCards[startCardIndex] = {
            ...newCards[startCardIndex],
            subCards: startSubCards,
          };
          newCards[finishCardIndex] = {
            ...newCards[finishCardIndex],
            subCards: finishSubCards,
          };

          setBoards(newCards);
        }
      }
    }
  };

  const handleChange = (val: any, selectedCardId: any) => {
    setBoards((prevCards) =>
      prevCards.map((card) =>
        card.cardId === selectedCardId ? { ...card, name: val.value } : card
      )
    );
    setIsEditingBoardName((prevState) => prevState.map(() => false));
  };

  const colorClass = (colortype: string) => {
    let defaultClass: string = " ";
    const colorVar = "kanban-" + (colortype != "" && colortype != null ? colortype : "primary ");
    if (colorVar) {
      defaultClass += colorVar;
    }
    return defaultClass;
  };

  const handleAddQuestionDataChanges = (value: any, key: string) => {
    setAddQuestionFormData({ ...addQuestionData, [key]: value });
  };

  const onSelectedCreators = (items: any) => {
    handleAddQuestionDataChanges(items, "supportTagIds");
    props.onSelectedTagsListChange && props.onSelectedTagsListChange(items);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 2,
          padding: 2,
          '@media (min-width: 600px)': {
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          },
          '@media (min-width: 900px)': {
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          }
        }}
      >
        {boards.map((card, index) => (
          <Box key={index}>
            {showBoard && card.name && (
              <Box className={`kanban-board ${colorClass(card.colorType)}`}>
                <Card sx={{ minHeight: 600 }}>
                  <CardContent sx={{ p: '5px !important' }}>
                    {/* Card Header */}
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center', 
                        mb: 2,
                        backgroundColor: '#ebdcff',
                        minHeight: '35px',
                        p: 1,
                        mx: -1,
                        mt: -1
                      }}
                    >
                      <Box display="flex" alignItems="center" flexGrow={1}>
                        {!isEditingBoardName[index] ? (
                          <Box display="flex" alignItems="center">
                            <Typography variant="subtitle1" className="card-name f-14 fw-400">
                              {card.name}
                            </Typography>
                            <Typography variant="body2" className="f-14 fw-400" sx={{ ml: 1 }}>
                              ({card.subCards.length.toString()})
                            </Typography>
                          </Box>
                        ) : (
                          <TextField
                            size="small"
                            value={boardName}
                            onChange={handleDataChanges}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                handleChange(e.target, card.cardId);
                              }
                            }}
                            autoFocus
                          />
                        )}
                      </Box>
                      <IconButton
                        size="small"
                        onClick={(e) => toggleDropdown(index, e)}
                        className="btn-sm"
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </Box>

                    {/* Droppable Area for Sub Cards */}
                    {/* @ts-ignore - React 19 compatibility with @hello-pangea/dnd */}
                    <Droppable droppableId={`${index}`} type="subCard">
                      {(provided: any) => (
                        <Box
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          className="sub-cards-container"
                          sx={{ px: 1 }}
                        >
                          {card.subCards.map((subCard) => (
                            <Draggable
                              key={subCard.SubcardId}
                              draggableId={`${subCard.SubcardId}`}
                              index={subCard.SubcardId}
                            >
                              {(provided: any) => (
                                <Box
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  sx={{ mt: 1 }}
                                  className="sub-card"
                                >
                                  <Card 
                                    variant="outlined" 
                                    sx={{ 
                                      backgroundColor: '#FEF7FF',
                                      border: '1px solid #e0e0e0',
                                      borderRadius: 0,
                                      minHeight: '133.6px'
                                    }}
                                  >
                                    <CardContent sx={{ p: '15px !important', '&:last-child': { pb: '15px !important' } }}>
                                      {/* Sub Card Header */}
                                      <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
                                        <Box>
                                          <Typography variant="body2" className="f-12 fw-500" fontWeight="medium">
                                            {subCard.ticketId}
                                          </Typography>
                                          {subCard.ticketPriority && (
                                            <Box className="priority-btn" sx={{ mt: 0.5 }}>
                                              <Chip
                                                label={subCard.ticketPriority}
                                                size="small"
                                                className="custom-badge small"
                                                sx={{
                                                  borderColor: '#904cec',
                                                  backgroundColor: 'transparent',
                                                  color: '#904cec',
                                                  border: '1px solid #904cec',
                                                  fontSize: '0.65rem'
                                                }}
                                              />
                                            </Box>
                                          )}
                                        </Box>
                                        <IconButton
                                          size="small"
                                          onClick={(e) => toggleSubCardDropdown(subCard.SubcardId, e, subCard, index)}
                                          className="btn-sm"
                                        >
                                          <MoreVertIcon fontSize="small" />
                                        </IconButton>
                                      </Box>

                                      {/* Sub Card Content */}
                                      <Box sx={{ mb: 2 }}>
                                        <Typography variant="body2" className="f-16 fw-500 truncate-text">
                                          {subCard.ticketQuestion}
                                        </Typography>
                                      </Box>

                                      {/* Sub Card Footer */}
                                      <Box display="flex" justifyContent="space-between" alignItems="center">
                                        <Typography variant="caption" className="f-12 fw-500">
                                          {subCard.ticketDate}
                                        </Typography>
                                        {subCard.assignedTo && (
                                          <Avatar
                                            src={subCard.assignedTo}
                                            alt={subCard.assignedToName}
                                            sx={{ width: 24, height: 24 }}
                                          />
                                        )}
                                      </Box>
                                    </CardContent>
                                  </Card>
                                </Box>
                              )}
                            </Draggable>
                          ))}

                          {/* Add Sub Card Section */}
                          {props.allowAddingNewSubCard && (
                            <>
                              {subCardInputsVisible === index ? (
                                <Box sx={{ mt: 2 }}>
                                  {/* Category Dropdown */}
                                  <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                                    <InputLabel>Category</InputLabel>
                                    <Select
                                      label="Category"
                                      onChange={(e) => handleAddQuestionDataChanges(e.target.value, "supportCategoryId")}
                                    >
                                      {props?.allCategoriesList?.map((category: any, idx: number) => (
                                        <MenuItem key={idx} value={category.val}>
                                          {category.label}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                  </FormControl>

                                  {/* Title Input */}
                                  <TextField
                                    fullWidth
                                    size="small"
                                    label="Title"
                                    placeholder="Enter Title"
                                    value={addQuestionData?.title || ""}
                                    onChange={(e) => handleAddQuestionDataChanges(e.target.value, "title")}
                                    sx={{ mb: 2 }}
                                  />

                                  {/* Description Input */}
                                  <TextField
                                    fullWidth
                                    size="small"
                                    label="Description"
                                    placeholder="Enter Description"
                                    multiline
                                    rows={2}
                                    value={addQuestionData?.description || ""}
                                    onChange={(e) => handleAddQuestionDataChanges(e.target.value, "description")}
                                    sx={{ mb: 2 }}
                                  />

                                  {/* Tags Autocomplete */}
                                  <Autocomplete
                                    multiple
                                    size="small"
                                    options={props.allTagsList || []}
                                    getOptionLabel={(option: any) => option.label}
                                    onChange={(event, value) => onSelectedCreators(value)}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        label="Tags"
                                        placeholder="Select Tags"
                                      />
                                    )}
                                    sx={{ mb: 2 }}
                                  />

                                  {/* Action Buttons */}
                                  <Box display="flex" gap={1} alignItems="center" className="add-item-btn btn-margin">
                                    <Button
                                      variant="outlined"
                                      size="medium"
                                      startIcon={<AddIcon />}
                                      onClick={() => onAddSubCardClick(index)}
                                      sx={{
                                        border: '1px solid #904cec',
                                        color: '#904cec',
                                        textTransform: 'none',
                                        '&:hover': {
                                          backgroundColor: 'rgba(144, 76, 236, 0.04)'
                                        }
                                      }}
                                    >
                                      Add Item
                                    </Button>
                                    <IconButton
                                      size="small"
                                      onClick={() => setSubCardInputsVisible(null)}
                                      className="close-board"
                                    >
                                      <CloseIcon fontSize="small" />
                                    </IconButton>
                                  </Box>
                                </Box>
                              ) : (
                                <Box sx={{ mt: 2 }} className="add-item-btn">
                                  <Button
                                    variant="outlined"
                                    size="medium"
                                    startIcon={<AddIcon />}
                                    onClick={() => addSubCard(index)}
                                    fullWidth
                                    sx={{
                                      border: '1px solid #904cec',
                                      color: '#904cec',
                                      textTransform: 'none',
                                      '&:hover': {
                                        backgroundColor: 'rgba(144, 76, 236, 0.04)'
                                      }
                                    }}
                                  >
                                    Add Item
                                  </Button>
                                </Box>
                              )}
                            </>
                          )}
                          {provided.placeholder}
                        </Box>
                      )}
                    </Droppable>
                  </CardContent>
                </Card>
              </Box>
            )}
          </Box>
        ))}

        {/* Add New Board Section */}
        {props.allowAddingNewCard !== undefined && (
          <>
            {showAddBoardBtn && props.allowAddingNewCard && (
              <Box>
                <Box className="add-board" sx={{ 
                  width: '300px',
                  height: '600px',
                  backgroundColor: '#fff',
                  border: '1px dashed #D4BBFF',
                  borderRadius: '0.5rem',
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'flex-start'
                }}>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Enter Board Title"
                    value={boardName}
                    onChange={handleDataChanges}
                    sx={{ mb: 2 }}
                  />
                  <Box display="flex" gap={1} alignItems="center" className="add-item-btn btn-margin">
                    <Button
                      variant="outlined"
                      size="medium"
                      startIcon={<AddIcon />}
                      onClick={onAddButtonClick}
                      sx={{
                        border: '1px solid #904cec',
                        color: '#904cec',
                        textTransform: 'none',
                        '&:hover': {
                          backgroundColor: 'rgba(144, 76, 236, 0.04)'
                        }
                      }}
                    >
                      Add Board
                    </Button>
                    <IconButton 
                      size="small" 
                      onClick={onCancel}
                      sx={{ ml: 1 }}
                    >
                      <CloseIcon />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            )}
            {!showAddBoardBtn && props.allowAddingNewCard && addButton && (
              <Box>
                <Box className="add-board" sx={{ 
                  width: '300px',
                  height: '600px',
                  backgroundColor: '#fff',
                  border: '1px dashed #D4BBFF',
                  borderRadius: '0.5rem',
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Button
                    variant="outlined"
                    size="medium"
                    startIcon={<AddIcon />}
                    onClick={handleShowInputBox}
                    fullWidth
                    sx={{
                      border: '1px solid #904cec',
                      color: '#904cec',
                      textTransform: 'none',
                      '&:hover': {
                        backgroundColor: 'rgba(144, 76, 236, 0.04)'
                      }
                    }}
                  >
                    Add Board
                  </Button>
                </Box>
              </Box>
            )}
          </>
        )}
      </Box>

      {/* Card Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className="dropdown-menu"
      >
        <MenuItem 
          onClick={() => handleCardOptionClick("delete", selectedCardIndex, selectedCard?.cardId, selectedCard?.key)}
          sx={{ fontSize: '14px', p: '8px 16px' }}
        >
          <DeleteIcon sx={{ mr: 1, width: 16, height: 16 }} />
          Delete Board
        </MenuItem>
        {selectedCard?.actions?.map((option: any, optIndex: number) => (
          <MenuItem
            key={optIndex}
            onClick={() => handleCardOptionClick(option.value, selectedCardIndex, selectedCard?.cardId, selectedCard?.key)}
            sx={{ fontSize: '14px', p: '8px 16px' }}
          >
            {option.key}
          </MenuItem>
        ))}
      </Menu>

      {/* Sub Card Menu */}
      <Menu
        anchorEl={subCardAnchorEl}
        open={Boolean(subCardAnchorEl)}
        onClose={handleClose}
        className="dropdown-menu"
      >
        {selectedSubCard?.actions?.map((option: any, optIndex: number) => (
          <MenuItem
            key={optIndex}
            onClick={() => handleOptionClick(option.value, selectedCardIndex, selectedSubCard?.SubcardId)}
            sx={{ fontSize: '14px', p: '8px 16px' }}
          >
            {option.key}
          </MenuItem>
        ))}
      </Menu>
    </DragDropContext>
  );
};

export default RdsCompKanbanBoard;
