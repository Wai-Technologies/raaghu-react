import type { ReactNode, MouseEvent } from 'react';
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
  type PaperProps,
} from '@mui/material';
import RdsButton from '../../raaghu-elements/rds-button/rds-button';
import { MoreVert as MoreVertIcon, Close as CloseIcon, Delete as DeleteIcon } from '@mui/icons-material';
import RdsBadge from "../../raaghu-elements/rds-badge/rds-badge";
import RdsAvatar from "../../raaghu-elements/rds-avatar/rds-avatar";
import { warnDeprecatedProp } from '../../raaghu-elements/shared/utils/deprecation';
import {
  RdsCompKanbanBoardProps,
  useKanbanBoardState,
  createEventHandlers,
  createDragEndHandler,
  colorClass,
  cardIdOf,
  KanbanSubCard,
  KanbanAction,
  type KanbanAssignee,
} from './kanban-board-helpers';

interface SortableSubCardProps {
  subCard: KanbanSubCard;
  subCardIndex: number;
  boardIndex: number;
  avatarData?: KanbanAssignee[];
  toggleSubCardDropdown: (id: number, e: MouseEvent<HTMLElement>, subCard: any, cardIndex: number) => void;
}

const SortableSubCard = ({ subCard, subCardIndex, boardIndex, avatarData, toggleSubCardDropdown }: SortableSubCardProps) => {
  const cardId = cardIdOf(subCard);
  const title = subCard.title ?? subCard.ticketQuestion;
  const avatars = subCard.assignees ?? avatarData;
  const bodyContent = subCard.description ? (
    <>
      {title && <><strong>{title}</strong><br /></>}
      {subCard.description}
    </>
  ) : title && subCard.ticketId ? (
    <>
      <strong>{title}</strong><br />
      {subCard.ticketId}
    </>
  ) : title || null;
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: cardId,
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
              {subCard.displayId && <Typography variant="body2" className="f-12 fw-500" fontWeight="medium">{subCard.displayId}</Typography>}
            </Box>
            <Box className="rds-kanban-board__sub-card-header-right">
              {subCard.badge && <RdsBadge badgeContent={subCard.badge} color="secondary" size="small" shape="rectangle" />}
              <IconButton
                size="small"
                onClick={(e) => { e.stopPropagation(); toggleSubCardDropdown(cardId, e, subCard, boardIndex); }}
                onPointerDown={(e) => e.stopPropagation()}
                className="btn-sm rds-kanban-board__subcard-dropdown-button"
                aria-label="More options"
              >
                <MoreVertIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
          {bodyContent && (
            <Box className="rds-kanban-board__sub-card-body">
              <Typography variant="body2" className="f-14 fw-400 rds-kanban-board__sub-card-text">
                {bodyContent}
              </Typography>
            </Box>
          )}
          <Box className="rds-kanban-board__sub-card-footer">
            <Typography variant="caption" className="f-12 fw-500 rds-kanban-board__sub-card-footer-left">
              {subCard.ticketDate}
            </Typography>
            <Box className="rds-kanban-board__sub-card-footer-right">
              {avatars && (
                <RdsAvatar
                  displayStyle="stacking"
                  size="smallest"
                  max={2}
                  showRemainingCount={false}
                  avatars={avatars}
                />
              )}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

interface DroppableColumnProps {
  boardIndex: number;
  subCardIds: number[];
  children: ReactNode;
}

const DroppableColumn = ({ boardIndex, subCardIds, children }: DroppableColumnProps) => {
  const { setNodeRef } = useDroppable({ id: `column-${boardIndex}` });
  return (
    <SortableContext items={subCardIds} strategy={verticalListSortingStrategy}>
      <Box ref={setNodeRef} className="sub-cards-container rds-kanban-board__sub-cards-container">
        {children}
      </Box>
    </SortableContext>
  );
};

const PlusIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const AutocompletePaper = (paperProps: PaperProps) => (
  <Paper {...paperProps} className="rds-kanban-board__autocomplete-paper" />
);

const NO_EFFECT = 'nothing (it has no effect)';
const DEPRECATED_PROPS: Record<string, string> = {
  isIlliustrationSmall: NO_EFFECT,
  noDataTitle: NO_EFFECT,
  noDataHeaderTitle: NO_EFFECT,
  illustration: NO_EFFECT,
  allowAddingDynamicData: NO_EFFECT,
  onClick: NO_EFFECT,
  addQuestionData: NO_EFFECT,
  boardData: '`columns` or `defaultColumns`',
  onBoardDataChange: '`onColumnsChange`',
  allowAddingNewCard: '`allowAddColumn`',
  allowAddingNewSubCard: '`allowAddCard`',
  allTagsList: '`tagOptions`',
  allCategoriesList: '`categoryOptions`',
  onAddQuestionSaveHandler: '`onCardAdd`',
  onCardOption: '`onColumnAction`',
  onSubCardOption: '`onCardAction`',
};

const RdsCompKanbanBoard = ({
  avatarData,
  columns,
  defaultColumns,
  onColumnsChange,
  allowAddColumn,
  allowAddCard,
  tagOptions,
  categoryOptions,
  onCardAdd,
  onColumnAction,
  onCardAction,
  allowAddingNewCard,
  allowAddingNewSubCard,
  allCategoriesList,
  allTagsList,
  boardData,
  onSubCardOption,
  onCardOption,
  onBoardDataChange,
  onAddQuestionSaveHandler,
  onSelectedTagsListChange,
  isIlliustrationSmall,
  noDataTitle,
  noDataHeaderTitle,
  illustration,
  allowAddingDynamicData,
  onClick,
  addQuestionData: addQuestionDataProp,
  className,
  sx,
  ref,
  ...rest
}: RdsCompKanbanBoardProps) => {
  const legacy = {
    isIlliustrationSmall, noDataTitle, noDataHeaderTitle, illustration,
    allowAddingDynamicData, onClick, addQuestionData: addQuestionDataProp,
    boardData, onBoardDataChange, allowAddingNewCard, allowAddingNewSubCard, allTagsList, allCategoriesList,
    onAddQuestionSaveHandler, onCardOption, onSubCardOption,
  };
  Object.entries(legacy).forEach(([key, value]) => {
    if (value !== undefined) warnDeprecatedProp('RdsCompKanbanBoard', key, DEPRECATED_PROPS[key]);
  });

  const showAddColumn = allowAddColumn ?? allowAddingNewCard;
  const showAddCard = allowAddCard ?? allowAddingNewSubCard;
  const resolvedTagOptions = tagOptions ?? allTagsList;
  const resolvedCategoryOptions = categoryOptions ?? allCategoriesList;
  const handleColumnsChange = onColumnsChange ?? onBoardDataChange;

  const props: RdsCompKanbanBoardProps = {
    columns, defaultColumns, boardData, onColumnsChange: handleColumnsChange,
    onCardAction, onSubCardOption, onColumnAction, onCardOption, onCardAdd, onAddQuestionSaveHandler, onSelectedTagsListChange,
  };
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

  const onDragEnd = createDragEndHandler(boards, state.setBoards, handleColumnsChange);

  const handleCloseSubCardInput = () => {
    state.setSubCardInputsVisible(null);
  };

  const isNewItemTitleEmpty = !String(addQuestionData?.title ?? '').trim();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
      <Box {...rest} ref={ref} className={clsx('rds-kanban-board-container', className)} sx={sx}>
        {showAddColumn !== undefined && (
          <>
            {showAddBoardBtn && showAddColumn && (
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
                      </Box>
                      <Box className="add-board add-board--with-input">
                        <TextField fullWidth size="small" placeholder="Enter Board Title" value={boardName} onChange={handleDataChanges} className="rds-kanban-board__input-field" />
                        <Box className="add-item-btn btn-margin rds-kanban-board__button-container">
                          <RdsButton variant="outlined" size="medium" showLeftIcon changeLeftIcon={PlusIcon} onClick={onAddButtonClick} className="rds-kanban-board__add-button" text="Add Board" />
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
            {!showAddBoardBtn && showAddColumn && addButton && (
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
                      </Box>
                      <Box className="add-board add-board--center-button">
                        <RdsButton variant="outlined" size="medium" showLeftIcon changeLeftIcon={PlusIcon} onClick={handleShowInputBox} fullWidth className="rds-kanban-board__add-button" text="Add Board" />
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              </Box>
            )}
          </>
        )}
        {boards.map((card, index) => (
          <Box key={card.cardId}>
            {showBoard && card.name && (
              <Box className={`kanban-board ${colorClass(card.color ?? card.colorType ?? 'primary')}`}>
                <Card className={clsx("kanban-board__card", card.subCards && card.subCards.length === 0 && "kanban-board__card--empty-board")}>
                  <CardContent className="kanban-board__card-content">
                    <Box className="kanban-board__card-header">
                      <Box className="kanban-board__header-content">
                        {!isEditingBoardName[index] ? (
                          <Box className="kanban-board__title-area">
                            <Typography variant="subtitle1" className="card-name f-14 fw-400">
                              {card.name}
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
                            onKeyDown={(e) => { if (e.key === "Enter") { handleChange({ value: (e.target as HTMLInputElement).value }, card.cardId); } }}
                            autoFocus
                          />
                        )}
                      </Box>
                      <IconButton size="small" onClick={(e) => toggleDropdown(index, e)} className="btn-sm kanban-board__header-button" aria-label="More options">
                        <MoreVertIcon />
                      </IconButton>
                    </Box>
                    <DroppableColumn boardIndex={index} subCardIds={card.subCards.map(cardIdOf)}>
                      {card.subCards.map((subCard, subCardIndex) => (
                        <SortableSubCard
                          key={cardIdOf(subCard)}
                          subCard={subCard}
                          subCardIndex={subCardIndex}
                          boardIndex={index}
                          avatarData={avatarData}
                          toggleSubCardDropdown={toggleSubCardDropdown}
                        />
                      ))}
                      {showAddCard && (
                        <>
                          {subCardInputsVisible === index ? (
                            <Box className="rds-kanban-board__add-item-form">
                              <FormControl fullWidth size="small" className="rds-kanban-board__input-field">
                                <InputLabel>Category</InputLabel>
                                <Select
                                  label="Category"
                                  value={addQuestionData?.supportCategoryId ?? ''}
                                  onChange={(e) => handleAddQuestionDataChanges(e.target.value, "supportCategoryId")}
                                  MenuProps={{ slotProps: { paper: { className: "rds-kanban-board__select-menu" } } }}
                                >
                                  {resolvedCategoryOptions?.map((category: any) => (
                                    <MenuItem key={category.val} value={category.val}>{category.label}</MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                              <TextField fullWidth size="small" label="Title" placeholder="Enter Title" value={addQuestionData?.title || ""} onChange={(e) => handleAddQuestionDataChanges(e.target.value, "title")} className="rds-kanban-board__input-field" />
                              <TextField fullWidth size="small" label="Description" placeholder="Enter Description" multiline rows={2} value={addQuestionData?.description || ""} onChange={(e) => handleAddQuestionDataChanges(e.target.value, "description")} className="rds-kanban-board__input-field" />
                              <Autocomplete
                                multiple
                                size="small"
                                options={resolvedTagOptions || []}
                                getOptionLabel={(option: any) => option.label}
                                value={(Array.isArray(addQuestionData?.supportTagIds) ? addQuestionData.supportTagIds : []) as any[]}
                                onChange={(_event, value) => onSelectedCreators(value)}
                                className="rds-kanban-board__autocomplete"
                                renderInput={(params) => {
                                  const currentTags = addQuestionData?.supportTagIds || [];
                                  const placeholderText = Array.isArray(currentTags) && currentTags.length > 0 ? "" : "Select Tags";
                                  return <TextField {...params} label="Tags" placeholder={placeholderText} />;
                                }}
                                PaperComponent={AutocompletePaper}
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
                                <RdsButton variant="outlined" size="medium" showLeftIcon changeLeftIcon={PlusIcon} onClick={(e: MouseEvent<HTMLElement>) => onAddSubCardClick(e, index)} disabled={isNewItemTitleEmpty} className="rds-kanban-board__add-button" text="Add Item" />
                                <IconButton size="small" onClick={handleCloseSubCardInput} className="close-board rds-kanban-board__close-button" aria-label="Close">
                                  <CloseIcon fontSize="small" />
                                </IconButton>
                              </Box>
                            </Box>
                          ) : (
                            <Box className="add-item-btn add-board rds-kanban-board__add-item-simple">
                              <RdsButton variant="outlined" size="medium" showLeftIcon changeLeftIcon={PlusIcon} onClick={() => addSubCard(index)} fullWidth className="rds-kanban-board__add-button" text="Add Item" />
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
      {(() => {
        const sharedMenuProps = {
          onClose: handleClose,
          className: "dropdown-menu",
          disablePortal: true,
          anchorOrigin: { vertical: 'top' as const, horizontal: 'right' as const },
          transformOrigin: { vertical: 'top' as const, horizontal: 'right' as const },
          slotProps: { paper: { className: "rds-kanban-board__menu-paper" } },
        };
        return (
          <>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              {...sharedMenuProps}
            >
              <MenuItem onClick={(e) => handleCardOptionClick(e, "delete", selectedCardIndex, selectedCard?.cardId, selectedCard?.key ?? '')} className="rds-kanban-board__menu-item">
                <DeleteIcon className="rds-kanban-board__menu-icon" />Delete Board
              </MenuItem>
              {selectedCard?.actions?.map((option: KanbanAction) => (
                <MenuItem key={option.value ?? option.key} onClick={(e) => handleCardOptionClick(e, option.value, selectedCardIndex, selectedCard?.cardId, selectedCard?.key ?? '')} className="rds-kanban-board__menu-item">
                  {option.key}
                </MenuItem>
              ))}
            </Menu>
            <Menu
              anchorEl={subCardAnchorEl}
              open={Boolean(subCardAnchorEl)}
              {...sharedMenuProps}
            >
              {selectedSubCard?.actions?.map((option: KanbanAction) => (
                <MenuItem key={option.value ?? option.key} onClick={(e) => selectedSubCard && handleOptionClick(e, option.value, selectedCardIndex, cardIdOf(selectedSubCard))} className="rds-kanban-board__menu-item">
                  {option.key}
                </MenuItem>
              ))}
            </Menu>
          </>
        );
      })()}
    </DndContext>
  );
};

RdsCompKanbanBoard.displayName = "RdsCompKanbanBoard";
export default RdsCompKanbanBoard;
