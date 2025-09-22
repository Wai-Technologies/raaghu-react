import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import './rds-comp-kanban-board.scss';
import { Card, CardContent, Typography, IconButton, Chip, Avatar, Menu, MenuItem, TextField, Button, Box, FormControl, InputLabel, Select, Autocomplete, Paper, } from '@mui/material';
import { MoreVert as MoreVertIcon, Close as CloseIcon, Delete as DeleteIcon } from '@mui/icons-material';
import RdsBadge from "../../raaghu-elements/rds-badge/rds-badge";
import RdsAvatar from "../../raaghu-elements/rds-avatar/rds-avatar";
import { boardInfo, RdsCompKanbanBoardProps, useKanbanBoardState, createEventHandlers, createDragEndHandler, colorClass, } from './kanban-board-helpers.tsx';
const RdsCompKanbanBoard = (props: RdsCompKanbanBoardProps) => {
  const state = useKanbanBoardState(props);
  const { boardName, boards, showBoard, isEditingBoardName, showAddBoardBtn, addButton, subCardInputsVisible, anchorEl, subCardAnchorEl, selectedCard, selectedSubCard, selectedCardIndex, addQuestionData } = state;
  const handlers = createEventHandlers(state, props);
  const { handleShowInputBox, onAddButtonClick, onCancel, handleDataChanges, toggleDropdown, toggleSubCardDropdown, handleClose, handleCardOptionClick, handleOptionClick, addSubCard, onAddSubCardClick, handleChange, handleAddQuestionDataChanges, onSelectedCreators } = handlers;
  const onDragEnd = createDragEndHandler(boards, state.setBoards);
  const DroppableComponent = Droppable as any;
  const DraggableComponent = Draggable as any;
  const PlusIcon = (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Box className="rds-kanban-board-container">
        {props.allowAddingNewCard !== undefined && (
          <>
            {showAddBoardBtn && props.allowAddingNewCard && (
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
                        <IconButton size="small" className="btn-sm kanban-board__header-button"
                        >
                          <MoreVertIcon />
                        </IconButton>
                      </Box>
                      <Box className="add-board add-board--with-input">
                        <TextField fullWidth size="small" placeholder="Enter Board Title" value={boardName} onChange={handleDataChanges} className="rds-kanban-board__input-field"
                        />
                        <Box className="add-item-btn btn-margin rds-kanban-board__button-container">
                          <Button variant="outlined" size="medium" startIcon={PlusIcon} onClick={onAddButtonClick} className="rds-kanban-board__add-button">Add Board</Button>
                          <IconButton size="small" onClick={onCancel} className="rds-kanban-board__close-button"
                          >
                            <CloseIcon />
                          </IconButton>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              </Box>
            )}
            {!showAddBoardBtn && props.allowAddingNewCard && addButton && (
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
                        <IconButton size="small" className="btn-sm kanban-board__header-button"
                        >
                          <MoreVertIcon />
                        </IconButton>
                      </Box>

                      <Box className="add-board add-board--center-button">
                        <Button variant="outlined" size="medium" startIcon={PlusIcon} onClick={handleShowInputBox} fullWidth className="rds-kanban-board__add-button">Add Board</Button>
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
                <Card className={`kanban-board__card ${(card.subCards && card.subCards.length === 0) ? 'kanban-board__card--empty-board' : ''}`}>
                  <CardContent className="kanban-board__card-content">
                    <Box className="kanban-board__card-header">
                      <Box className="kanban-board__header-content">
                        {!isEditingBoardName[index] ? (
                          <Box className="kanban-board__title-area">
                            <Typography variant="subtitle1" className="card-name f-14 fw-400">{card.name === 'Board 1' ? 'Board 2' : card.name}</Typography>
                            <Typography variant="body2" className="f-14 fw-400 kanban-board__title-count">({card.subCards.length.toString()})</Typography>
                          </Box>
                        ) : (
                          <TextField size="small" value={boardName} onChange={handleDataChanges} onKeyDown={(e) => { if (e.key === "Enter") { handleChange(e.target, card.cardId); } }} autoFocus />
                        )}
                      </Box>
                      <IconButton size="small" onClick={(e) => toggleDropdown(index, e)} className="btn-sm kanban-board__header-button"
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </Box>
                    <DroppableComponent droppableId={`${index}`} type="subCard">
                      {(provided: any) => (
                        <Box {...provided.droppableProps} ref={provided.innerRef} className="sub-cards-container rds-kanban-board__sub-cards-container">
                          {card.subCards.map((subCard, subCardIndex) => (
                            <DraggableComponent key={subCard.SubcardId} draggableId={`${subCard.SubcardId}`} index={subCardIndex}>
                              {(provided: any) => (
                                <Box ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="sub-card rds-kanban-board__sub-card">
                                  <Card variant="outlined" className="rds-kanban-board__sub-card-card">
                                    <CardContent className="rds-kanban-board__sub-card-content">
                                      <Box className="rds-kanban-board__sub-card-header">
                                        <Box className="rds-kanban-board__sub-card-header-left">
                                          <Typography variant="body2" className="f-12 fw-500" fontWeight="medium">RDS110110</Typography>
                                        </Box>
                                        <Box className="rds-kanban-board__sub-card-header-right">
                                          <RdsBadge badgeContent="Badge" color="secondary" size="small" shape="rectangle" colorVariant='secondary'
                                          />
                                          <IconButton size="small" onClick={(e) => toggleSubCardDropdown(subCard.SubcardId, e, subCard, index)} className="btn-sm rds-kanban-board__subcard-dropdown-button"
                                          >
                                            <MoreVertIcon fontSize="small" />
                                          </IconButton>
                                        </Box>
                                      </Box>
                                      <Box className="rds-kanban-board__sub-card-body">
                                        <Typography variant="body2" className="f-14 fw-400 rds-kanban-board__sub-card-text">
                                          {subCard.ticketQuestion && subCard.ticketId && subCard.ticketQuestion !== 'Question 1' && subCard.ticketQuestion !== 'Question 2' ? (
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
                                        <Typography variant="caption" className="f-12 fw-500 rds-kanban-board__sub-card-footer-left">{subCard.ticketDate}</Typography>
                                        <Box className="rds-kanban-board__sub-card-footer-right">
                                          {props.avatarData && (
                                            <RdsAvatar 
                                              displayStyle="stacking" 
                                              size="smallest"
                                              maxVisibleAvatars={2}
                                              showRemainingCount={false}
                                              avatars={props.avatarData}
                                            />
                                          )}
                                        </Box>
                                      </Box>
                                    </CardContent>
                                  </Card>
                                </Box>
                              )}
                            </DraggableComponent>
                          ))}
                          {props.allowAddingNewSubCard && (
                            <>
                              {subCardInputsVisible === index ? (
                                <Box className="rds-kanban-board__add-item-form">
                                  <FormControl fullWidth size="small" className="rds-kanban-board__input-field"
                                  >
                                    <InputLabel>Category</InputLabel>
                                    <Select label="Category" onChange={(e) => handleAddQuestionDataChanges(e.target.value, "supportCategoryId")}
                                      MenuProps={{
                                        PaperProps: { className: "rds-kanban-board__select-menu" }
                                      }}
                                    >
                                      {props?.allCategoriesList?.map((category: any, idx: number) => (
                                        <MenuItem key={idx} value={category.val}>{category.label}</MenuItem>
                                      ))}
                                    </Select>
                                  </FormControl>
                                  <TextField fullWidth size="small" label="Title" placeholder="Enter Title" value={addQuestionData?.title || ""} onChange={(e) => handleAddQuestionDataChanges(e.target.value, "title")} className="rds-kanban-board__input-field"
                                  />
                                  <TextField fullWidth size="small" label="Description" placeholder="Enter Description" multiline rows={2} value={addQuestionData?.description || ""} onChange={(e) => handleAddQuestionDataChanges(e.target.value, "description")} className="rds-kanban-board__input-field"
                                  />
                                  <Autocomplete
                                    multiple
                                    size="small"
                                    options={props.allTagsList || []}
                                    getOptionLabel={(option: any) => option.label}
                                    value={addQuestionData?.supportTagIds || []}
                                    onChange={(_event, value) => onSelectedCreators(value)}
                                    className="rds-kanban-board__autocomplete"
                                    renderInput={(params) => {
                                      const currentTags = addQuestionData?.supportTagIds || [];
                                      const placeholderText = Array.isArray(currentTags) && currentTags.length > 0 ? "" : "Select Tags";
                                      return (
                                        <TextField {...params} label="Tags" placeholder={placeholderText} />
                                      );
                                    }}
                                    PaperComponent={(props) => (
                                      <Paper {...props} className="rds-kanban-board__autocomplete-paper"
                                      />
                                    )}
                                    // Ensure the popper doesn't clip long labels and appears above other elements
                                    slotProps={{
                                      popper: {
                                        modifiers: [
                                          { name: 'preventOverflow', options: { altBoundary: true, rootBoundary: 'viewport' } },
                                          { name: 'offset', options: { offset: [0, 10] } }
                                        ],
                                      }
                                    }}
                                  />
                                  <Box className="add-item-btn btn-margin add-board rds-kanban-board__button-container">
                                    <Button variant="outlined" size="medium" startIcon={PlusIcon} onClick={() => onAddSubCardClick(index)} className="rds-kanban-board__add-button">Add Item</Button>
                                    <IconButton size="small" onClick={() => state.setSubCardInputsVisible(null)} className="close-board rds-kanban-board__close-button"
                                    >
                                      <CloseIcon fontSize="small" />
                                    </IconButton>
                                  </Box>
                                </Box>
                              ) : (
                                <Box className="add-item-btn add-board rds-kanban-board__add-item-simple">
                                  <Button variant="outlined" size="medium" startIcon={PlusIcon} onClick={() => addSubCard(index)} fullWidth className="rds-kanban-board__add-button">Add Item</Button>
                                </Box>
                              )}
                            </>
                          )}
                          {provided.placeholder}
                        </Box>
                      )}
                    </DroppableComponent>
                  </CardContent>
                </Card>
              </Box>
            )}
          </Box>
        ))}
      </Box>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} className="dropdown-menu" disablePortal={true} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} transformOrigin={{ vertical: 'top', horizontal: 'right' }} PaperProps={{
        className: "rds-kanban-board__menu-paper"
      }}
      >
        <MenuItem onClick={() => handleCardOptionClick("delete", selectedCardIndex, selectedCard?.cardId, selectedCard?.key)} className="rds-kanban-board__menu-item">
          <DeleteIcon className="rds-kanban-board__menu-icon" />Delete Board
        </MenuItem>
        {selectedCard?.actions?.map((option: any, optIndex: number) => (
          <MenuItem key={optIndex} onClick={() => handleCardOptionClick(option.value, selectedCardIndex, selectedCard?.cardId, selectedCard?.key)} className="rds-kanban-board__menu-item">{option.key}</MenuItem>
        ))}
      </Menu>
      <Menu anchorEl={subCardAnchorEl} open={Boolean(subCardAnchorEl)} onClose={handleClose} className="dropdown-menu" disablePortal={true} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} transformOrigin={{ vertical: 'top', horizontal: 'right' }} PaperProps={{
        className: "rds-kanban-board__menu-paper"
      }} >
        {selectedSubCard?.actions?.map((option: any, optIndex: number) => (<MenuItem key={optIndex} onClick={() => handleOptionClick(option.value, selectedCardIndex, selectedSubCard?.SubcardId)} className="rds-kanban-board__menu-item">{option.key}</MenuItem>
        ))}
      </Menu>
    </DragDropContext>
  );
};
RdsCompKanbanBoard.displayName = "RdsCompKanbanBoard";
export default RdsCompKanbanBoard;