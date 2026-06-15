import { useCallback, useMemo, memo, type ReactNode, type MouseEvent } from 'react';
import clsx from 'clsx';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import './rds-comp-kanban-board.scss';
import {
  Card, CardContent, Typography, IconButton, Menu, MenuItem,
  TextField, Box, FormControl, InputLabel, Select, Autocomplete, Paper,
} from '@mui/material';
import RdsButton from '../../raaghu-elements/rds-button/rds-button';
import { MoreVert as MoreVertIcon, Close as CloseIcon, Delete as DeleteIcon } from '@mui/icons-material';
import RdsBadge from "../../raaghu-elements/rds-badge/rds-badge";
import RdsAvatar from "../../raaghu-elements/rds-avatar/rds-avatar";
import {
  RdsCompKanbanBoardProps,
  useKanbanBoardState,
  createEventHandlers,
  createDragEndHandler,
  colorClass,
  KanbanSubCard,
  KanbanAction,
} from './kanban-board-helpers';

interface SortableSubCardProps {
  subCard: KanbanSubCard;
  subCardIndex: number;
  boardIndex: number;
  avatarData?: Array<{ title: string; subText?: string; src?: string }>;
  toggleSubCardDropdown: (id: number, e: MouseEvent<HTMLElement>, subCard: any, cardIndex: number) => void;
}

const SortableSubCard = memo(({ subCard, subCardIndex, boardIndex, avatarData, toggleSubCardDropdown }: SortableSubCardProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: subCard.SubcardId,
    data: { type: 'subCard', boardIndex, subCardIndex },
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };
  return (
    <Box ref={setNodeRef} style={style} {...attributes} {...listeners} className="sub-card rds-kanban-board__sub-card">
      <Card variant="outlined" className="rds-kanban-board__sub-card-card">
        <CardContent className="rds-kanban-board__sub-card-content">
          <Box className="rds-kanban-board__sub-card-header">
            <Box className="rds-kanban-board__sub-card-header-left">
              <Typography variant="body2" className="f-12 fw-500" fontWeight="medium">RDS110110</Typography>
            </Box>
            <Box className="rds-kanban-board__sub-card-header-right">
              <RdsBadge badgeContent="Badge" color="secondary" size="small" shape="rectangle" colorVariant="secondary" />
              <IconButton
                size="small"
                onClick={(e) => { e.stopPropagation(); toggleSubCardDropdown(subCard.SubcardId, e, subCard, boardIndex); }}
                onPointerDown={(e) => e.stopPropagation()}
                className="btn-sm rds-kanban-board__subcard-dropdown-button"
                aria-label="More options"
              >
                <MoreVertIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
          <Box className="rds-kanban-board__sub-card-body">
            <Typography variant="body2" className="f-14 fw-400 rds-kanban-board__sub-card-text">
              {subCard.ticketQuestion && subCard.ticketId &&
               subCard.ticketQuestion !== 'Question 1' && subCard.ticketQuestion !== 'Question 2' ? (
                <>
                  <strong>{subCard.ticketQuestion}</strong><br />
                  {subCard.ticketId}
                </>
              ) : (
                <>
                  This is a sample text<br />
                  This is a sample text<br />
                  This is a sample text
                </>
              )}
            </Typography>
          </Box>
          <Box className="rds-kanban-board__sub-card-footer">
            <Typography variant="caption" className="f-12 fw-500 rds-kanban-board__sub-card-footer-left">
              {subCard.ticketDate}
            </Typography>
            <Box className="rds-kanban-board__sub-card-footer-right">
              {avatarData && (
                <RdsAvatar
                  displayStyle="stacking"
                  size="smallest"
                  maxVisibleAvatars={2}
                  showRemainingCount={false}
                  avatars={avatarData}
                />
              )}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
});

interface DroppableColumnProps {
  boardIndex: number;
  subCardIds: number[];
  children: ReactNode;
}

const DroppableColumn = memo(({ boardIndex, subCardIds, children }: DroppableColumnProps) => {
  const { setNodeRef } = useDroppable({ id: `column-${boardIndex}` });
  return (
    <SortableContext items={subCardIds} strategy={verticalListSortingStrategy}>
      <Box ref={setNodeRef} className="sub-cards-container rds-kanban-board__sub-cards-container">
        {children}
      </Box>
    </SortableContext>
  );
});

const PlusIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const RdsCompKanbanBoard = ({
  avatarData,
  allowAddingNewCard,
  allowAddingNewSubCard,
  allCategoriesList,
  allTagsList,
  ...props
}: RdsCompKanbanBoardProps) => {
  const state = useKanbanBoardState(props);
  const {
    boardName, boards, showBoard, isEditingBoardName, showAddBoardBtn,
    addButton, subCardInputsVisible, anchorEl, subCardAnchorEl,
    selectedCard, selectedSubCard, selectedCardIndex, addQuestionData,
  } = state;

  const handlers = createEventHandlers(state, props);
  const {
    handleShowInputBox, onAddButtonClick, onCancel, handleDataChanges,
    toggleDropdown, toggleSubCardDropdown, handleClose, handleCardOptionClick,
    handleOptionClick, addSubCard, onAddSubCardClick, handleChange,
    handleAddQuestionDataChanges, onSelectedCreators,
  } = handlers;

  const onDragEnd = useMemo(() => createDragEndHandler(boards, state.setBoards), [boards, state.setBoards]);

  const handleCloseSubCardInput = useCallback(() => {
    state.setSubCardInputsVisible(null);
  }, [state]);

  const handleAddSubCardAtIndex = useCallback((index: number) => {
    onAddSubCardClick(index);
  }, [onAddSubCardClick]);

  const handleShowAddSubCard = useCallback((index: number) => {
    addSubCard(index);
  }, [addSubCard]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
      <Box className="rds-kanban-board-container">
        {allowAddingNewCard !== undefined && (
          <>
            {showAddBoardBtn && allowAddingNewCard && (
              <Box>
                <Box className={`kanban-board ${colorClass('primary')}`}>
                  <Card className="kanban-board__card kanban-board__card--add-board-320">
                    <CardContent className="kanban-board__card-content">
                      <Box className="kanban-board__card-header">
                        <Box className="kanban-board__header-content">
                          <Box className="kanban-board__title-area">
                            <Typography variant="subtitle1" className="card-name f-14 fw-400">{boardName || 'Board 1'}</Typography>
                            <Typography variant="body2" className="f-14 fw-400 kanban-board__title-count">(0)</Typography>
                          </Box>
                        </Box>
                        <IconButton size="small" className="btn-sm kanban-board__header-button" aria-label="Close">
                          <MoreVertIcon />
                        </IconButton>
                      </Box>
                      <Box className="add-board add-board--with-input">
                        <TextField fullWidth size="small" placeholder="Enter Board Title" value={boardName} onChange={handleDataChanges} className="rds-kanban-board__input-field" />
                        <Box className="add-item-btn btn-margin rds-kanban-board__button-container">
                          <RdsButton style="outlined" size="medium" showLeftIcon changeLeftIcon={PlusIcon} onClick={onAddButtonClick} className="rds-kanban-board__add-button" text="Add Board" />
                          <IconButton size="small" onClick={onCancel} className="rds-kanban-board__close-button" aria-label="Close">
                            <CloseIcon />
                          </IconButton>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              </Box>
            )}
            {!showAddBoardBtn && allowAddingNewCard && addButton && (
              <Box>
                <Box className={`kanban-board ${colorClass('primary')}`}>
                  <Card className="kanban-board__card kanban-board__card--add-board-280">
                    <CardContent className="kanban-board__card-content">
                      <Box className="kanban-board__card-header">
                        <Box className="kanban-board__header-content">
                          <Box className="kanban-board__title-area">
                            <Typography variant="subtitle1" className="card-name f-14 fw-400">{boardName || 'Board 1'}</Typography>
                            <Typography variant="body2" className="f-14 fw-400 kanban-board__title-count">(0)</Typography>
                          </Box>
                        </Box>
                        <IconButton size="small" className="btn-sm kanban-board__header-button" aria-label="More options">
                          <MoreVertIcon />
                        </IconButton>
                      </Box>
                      <Box className="add-board add-board--center-button">
                        <RdsButton style="outlined" size="medium" showLeftIcon changeLeftIcon={PlusIcon} onClick={handleShowInputBox} fullWidth className="rds-kanban-board__add-button" text="Add Board" />
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              </Box>
            )}
          </>
        )}
        {boards.map((card, index) => (
          <Box key={index}>
            {showBoard && card.name && (
              <Box className={`kanban-board ${colorClass(card.colorType)}`}>
                <Card className={clsx("kanban-board__card", card.subCards && card.subCards.length === 0 && "kanban-board__card--empty-board")}>
                  <CardContent className="kanban-board__card-content">
                    <Box className="kanban-board__card-header">
                      <Box className="kanban-board__header-content">
                        {!isEditingBoardName[index] ? (
                          <Box className="kanban-board__title-area">
                            <Typography variant="subtitle1" className="card-name f-14 fw-400">
                              {card.name === 'Board 1' ? 'Board 2' : card.name}
                            </Typography>
                            <Typography variant="body2" className="f-14 fw-400 kanban-board__title-count">
                              ({card.subCards.length.toString()})
                            </Typography>
                          </Box>
                        ) : (
                          <TextField
                            size="small"
                            value={boardName}
                            onChange={handleDataChanges}
                            onKeyDown={(e) => { if (e.key === "Enter") { handleChange(e.target, card.cardId); } }}
                            autoFocus
                          />
                        )}
                      </Box>
                      <IconButton size="small" onClick={(e) => toggleDropdown(index, e)} className="btn-sm kanban-board__header-button" aria-label="More options">
                        <MoreVertIcon />
                      </IconButton>
                    </Box>
                    <DroppableColumn boardIndex={index} subCardIds={card.subCards.map((sc) => sc.SubcardId)}>
                      {card.subCards.map((subCard, subCardIndex) => (
                        <SortableSubCard
                          key={subCard.SubcardId}
                          subCard={subCard}
                          subCardIndex={subCardIndex}
                          boardIndex={index}
                          avatarData={avatarData}
                          toggleSubCardDropdown={toggleSubCardDropdown}
                        />
                      ))}
                      {allowAddingNewSubCard && (
                        <>
                          {subCardInputsVisible === index ? (
                            <Box className="rds-kanban-board__add-item-form">
                              <FormControl fullWidth size="small" className="rds-kanban-board__input-field">
                                <InputLabel>Category</InputLabel>
                                <Select
                                  label="Category"
                                  onChange={(e) => handleAddQuestionDataChanges(e.target.value, "supportCategoryId")}
                                  MenuProps={{ slotProps: { paper: { className: "rds-kanban-board__select-menu" } } }}
                                >
                                  {allCategoriesList?.map((category: any, idx: number) => (
                                    <MenuItem key={idx} value={category.val}>{category.label}</MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                              <TextField fullWidth size="small" label="Title" placeholder="Enter Title" value={addQuestionData?.title || ""} onChange={(e) => handleAddQuestionDataChanges(e.target.value, "title")} className="rds-kanban-board__input-field" />
                              <TextField fullWidth size="small" label="Description" placeholder="Enter Description" multiline rows={2} value={addQuestionData?.description || ""} onChange={(e) => handleAddQuestionDataChanges(e.target.value, "description")} className="rds-kanban-board__input-field" />
                              <Autocomplete
                                multiple
                                size="small"
                                options={allTagsList || []}
                                getOptionLabel={(option: any) => option.label}
                                value={addQuestionData?.supportTagIds || []}
                                onChange={(_event, value) => onSelectedCreators(value)}
                                className="rds-kanban-board__autocomplete"
                                renderInput={(params) => {
                                  const currentTags = addQuestionData?.supportTagIds || [];
                                  const placeholderText = Array.isArray(currentTags) && currentTags.length > 0 ? "" : "Select Tags";
                                  return <TextField {...params} label="Tags" placeholder={placeholderText} />;
                                }}
                                PaperComponent={(paperProps) => (
                                  <Paper {...paperProps} className="rds-kanban-board__autocomplete-paper" />
                                )}
                                slotProps={{
                                  popper: {
                                    modifiers: [
                                      { name: 'preventOverflow', options: { altBoundary: true, rootBoundary: 'viewport' } },
                                      { name: 'offset', options: { offset: [0, 10] } },
                                    ],
                                  },
                                }}
                              />
                              <Box className="add-item-btn btn-margin add-board rds-kanban-board__button-container">
                                <RdsButton style="outlined" size="medium" showLeftIcon changeLeftIcon={PlusIcon} onClick={() => handleAddSubCardAtIndex(index)} className="rds-kanban-board__add-button" text="Add Item" />
                                <IconButton size="small" onClick={handleCloseSubCardInput} className="close-board rds-kanban-board__close-button" aria-label="Close">
                                  <CloseIcon fontSize="small" />
                                </IconButton>
                              </Box>
                            </Box>
                          ) : (
                            <Box className="add-item-btn add-board rds-kanban-board__add-item-simple">
                              <RdsButton style="outlined" size="medium" showLeftIcon changeLeftIcon={PlusIcon} onClick={() => handleShowAddSubCard(index)} fullWidth className="rds-kanban-board__add-button" text="Add Item" />
                            </Box>
                          )}
                        </>
                      )}
                    </DroppableColumn>
                  </CardContent>
                </Card>
              </Box>
            )}
          </Box>
        ))}
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className="dropdown-menu"
        disablePortal={true}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{ className: "rds-kanban-board__menu-paper" }}
      >
        <MenuItem onClick={() => handleCardOptionClick("delete", selectedCardIndex, selectedCard?.cardId, selectedCard?.key)} className="rds-kanban-board__menu-item">
          <DeleteIcon className="rds-kanban-board__menu-icon" />Delete Board
        </MenuItem>
        {selectedCard?.actions?.map((option: KanbanAction, optIndex: number) => (
          <MenuItem key={optIndex} onClick={() => handleCardOptionClick(option.value, selectedCardIndex, selectedCard?.cardId, selectedCard?.key)} className="rds-kanban-board__menu-item">
            {option.key}
          </MenuItem>
        ))}
      </Menu>
      <Menu
        anchorEl={subCardAnchorEl}
        open={Boolean(subCardAnchorEl)}
        onClose={handleClose}
        className="dropdown-menu"
        disablePortal={true}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{ className: "rds-kanban-board__menu-paper" }}
      >
        {selectedSubCard?.actions?.map((option: KanbanAction, optIndex: number) => (
          <MenuItem key={optIndex} onClick={() => handleOptionClick(option.value, selectedCardIndex, selectedSubCard?.SubcardId)} className="rds-kanban-board__menu-item">
            {option.key}
          </MenuItem>
        ))}
      </Menu>
    </DndContext>
  );
};

RdsCompKanbanBoard.displayName = "RdsCompKanbanBoard";
export default RdsCompKanbanBoard;
