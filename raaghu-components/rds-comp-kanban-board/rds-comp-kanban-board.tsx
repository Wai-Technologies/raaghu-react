import React from 'react';

import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import './rds-comp-kanban-board.scss';
import {
  Card, CardContent, Typography, IconButton, Chip, Avatar, Menu, MenuItem,
  TextField, Button, Box, FormControl, InputLabel, Select, Autocomplete,
} from '@mui/material';
import { MoreVert as MoreVertIcon, Add as AddIcon, Close as CloseIcon, Delete as DeleteIcon } from '@mui/icons-material';
import {
  boardInfo, RdsCompKanbanBoardProps, useKanbanBoardState, createEventHandlers,
  createDragEndHandler, colorClass,
} from './kanban-board-helpers.tsx';

const RdsCompKanbanBoard = (props: RdsCompKanbanBoardProps) => {
  const state = useKanbanBoardState(props);
  const { boardName, boards, showBoard, isEditingBoardName, showAddBoardBtn, addButton, subCardInputsVisible, anchorEl, subCardAnchorEl, selectedCard, selectedSubCard, selectedCardIndex, addQuestionData } = state;

  const handlers = createEventHandlers(state, props);
  const { handleShowInputBox, onAddButtonClick, onCancel, handleDataChanges, toggleDropdown, toggleSubCardDropdown, handleClose, handleCardOptionClick, handleOptionClick, addSubCard, onAddSubCardClick, handleChange, handleAddQuestionDataChanges, onSelectedCreators } = handlers;

  const onDragEnd = createDragEndHandler(boards, state.setBoards);

  // Type casting for React 19 compatibility
  const DroppableComponent = Droppable as any;
  const DraggableComponent = Draggable as any;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, padding: 1, alignItems: 'flex-start' }}>
        {boards.map((card, index) => (
          <Box key={index}>
            {showBoard && card.name && (
              <Box className={`kanban-board ${colorClass(card.colorType)}`}>
                <Card sx={{ minHeight: 600 }}>
                  <CardContent sx={{ p: '5px !important' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, backgroundColor: '#ebdcff', minHeight: '35px', p: 1, mx: -1, mt: -1 }}>
                      <Box display="flex" alignItems="center" flexGrow={1}>
                        {!isEditingBoardName[index] ? (
                          <Box display="flex" alignItems="center">
                            <Typography variant="subtitle1" className="card-name f-14 fw-400">{card.name}</Typography>
                            <Typography variant="body2" className="f-14 fw-400" sx={{ ml: 1 }}>({card.subCards.length.toString()})</Typography>
                          </Box>
                        ) : (
                          <TextField size="small" value={boardName} onChange={handleDataChanges} onKeyDown={(e) => { if (e.key === "Enter") { handleChange(e.target, card.cardId); } }} autoFocus />
                        )}
                      </Box>
                      <IconButton size="small" onClick={(e) => toggleDropdown(index, e)} className="btn-sm"><MoreVertIcon /></IconButton>
                    </Box>

                    <DroppableComponent droppableId={`${index}`} type="subCard">
                      {(provided: any) => (
                        <Box {...provided.droppableProps} ref={provided.innerRef} className="sub-cards-container" sx={{ px: 1 }}>
                          {card.subCards.map((subCard) => (
                            <DraggableComponent key={subCard.SubcardId} draggableId={`${subCard.SubcardId}`} index={subCard.SubcardId}>
                              {(provided: any) => (
                                <Box ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} sx={{ mt: 1 }} className="sub-card">
                                  <Card variant="outlined" sx={{ backgroundColor: '#FEF7FF', border: '1px solid #e0e0e0', borderRadius: 0, minHeight: '133.6px' }}>
                                    <CardContent sx={{ p: '15px !important', '&:last-child': { pb: '15px !important' } }}>
                                      <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
                                        <Box>
                                          <Typography variant="body2" className="f-12 fw-500" fontWeight="medium">{subCard.ticketId}</Typography>
                                          {subCard.ticketPriority && (
                                            <Box className="priority-btn" sx={{ mt: 0.5 }}>
                                              <Chip label={subCard.ticketPriority} size="small" className="custom-badge small" sx={{ borderColor: '#904cec', backgroundColor: 'transparent', color: '#904cec', border: '1px solid #904cec', fontSize: '0.65rem' }} />
                                            </Box>
                                          )}
                                        </Box>
                                        <IconButton size="small" onClick={(e) => toggleSubCardDropdown(subCard.SubcardId, e, subCard, index)} className="btn-sm"><MoreVertIcon fontSize="small" /></IconButton>
                                      </Box>
                                      <Box sx={{ mb: 2 }}>
                                        <Typography variant="body2" className="f-16 fw-500 truncate-text">{subCard.ticketQuestion}</Typography>
                                      </Box>
                                      <Box display="flex" justifyContent="space-between" alignItems="center">
                                        <Typography variant="caption" className="f-12 fw-500">{subCard.ticketDate}</Typography>
                                        {subCard.assignedTo && <Avatar src={subCard.assignedTo} alt={subCard.assignedToName} sx={{ width: 24, height: 24 }} />}
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
                                <Box sx={{ mt: 2 }}>
                                  <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                                    <InputLabel>Category</InputLabel>
                                    <Select label="Category" onChange={(e) => handleAddQuestionDataChanges(e.target.value, "supportCategoryId")}>
                                      {props?.allCategoriesList?.map((category: any, idx: number) => (
                                        <MenuItem key={idx} value={category.val}>{category.label}</MenuItem>
                                      ))}
                                    </Select>
                                  </FormControl>
                                  <TextField fullWidth size="small" label="Title" placeholder="Enter Title" value={addQuestionData?.title || ""} onChange={(e) => handleAddQuestionDataChanges(e.target.value, "title")} sx={{ mb: 2 }} />
                                  <TextField fullWidth size="small" label="Description" placeholder="Enter Description" multiline rows={2} value={addQuestionData?.description || ""} onChange={(e) => handleAddQuestionDataChanges(e.target.value, "description")} sx={{ mb: 2 }} />
                                  <Autocomplete multiple size="small" options={props.allTagsList || []} getOptionLabel={(option: any) => option.label} onChange={(event, value) => onSelectedCreators(value)} renderInput={(params) => (<TextField {...params} label="Tags" placeholder="Select Tags" />)} sx={{ mb: 2 }} />
                                  <Box display="flex" gap={1} alignItems="center" className="add-item-btn btn-margin">
                                    <Button variant="outlined" size="medium" startIcon={<AddIcon />} onClick={() => onAddSubCardClick(index)} sx={{ border: '1px solid #904cec', color: '#904cec', textTransform: 'none', '&:hover': { backgroundColor: 'rgba(144, 76, 236, 0.04)' } }}>Add Item</Button>
                                    <IconButton size="small" onClick={() => state.setSubCardInputsVisible(null)} className="close-board"><CloseIcon fontSize="small" /></IconButton>
                                  </Box>
                                </Box>
                              ) : (
                                <Box sx={{ mt: 2 }} className="add-item-btn">
                                  <Button variant="outlined" size="medium" startIcon={<AddIcon />} onClick={() => addSubCard(index)} fullWidth sx={{ border: '1px solid #904cec', color: '#904cec', textTransform: 'none', '&:hover': { backgroundColor: 'rgba(144, 76, 236, 0.04)' } }}>Add Item</Button>
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

        {props.allowAddingNewCard !== undefined && (
          <>
            {showAddBoardBtn && props.allowAddingNewCard && (
              <Box>
                <Box className="add-board" sx={{ width: '300px', height: '600px', backgroundColor: '#fff', border: '1px dashed #D4BBFF', borderRadius: '0.5rem', p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }}>
                  <TextField fullWidth size="small" placeholder="Enter Board Title" value={boardName} onChange={handleDataChanges} sx={{ mb: 2 }} />
                  <Box display="flex" gap={1} alignItems="center" className="add-item-btn btn-margin">
                    <Button variant="outlined" size="medium" startIcon={<AddIcon />} onClick={onAddButtonClick} sx={{ border: '1px solid #904cec', color: '#904cec', textTransform: 'none', '&:hover': { backgroundColor: 'rgba(144, 76, 236, 0.04)' } }}>Add Board</Button>
                    <IconButton size="small" onClick={onCancel} sx={{ ml: 1 }}><CloseIcon /></IconButton>
                  </Box>
                </Box>
              </Box>
            )}
            {!showAddBoardBtn && props.allowAddingNewCard && addButton && (
              <Box>
                <Box className="add-board" sx={{ width: '300px', height: '600px', backgroundColor: '#fff', border: '1px dashed #D4BBFF', borderRadius: '0.5rem', p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <Button variant="outlined" size="medium" startIcon={<AddIcon />} onClick={handleShowInputBox} fullWidth sx={{ border: '1px solid #904cec', color: '#904cec', textTransform: 'none', '&:hover': { backgroundColor: 'rgba(144, 76, 236, 0.04)' } }}>Add Board</Button>
                </Box>
              </Box>
            )}
          </>
        )}
      </Box>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} className="dropdown-menu">
        <MenuItem onClick={() => handleCardOptionClick("delete", selectedCardIndex, selectedCard?.cardId, selectedCard?.key)} sx={{ fontSize: '14px', p: '8px 16px' }}>
          <DeleteIcon sx={{ mr: 1, width: 16, height: 16 }} />Delete Board
        </MenuItem>
        {selectedCard?.actions?.map((option: any, optIndex: number) => (
          <MenuItem key={optIndex} onClick={() => handleCardOptionClick(option.value, selectedCardIndex, selectedCard?.cardId, selectedCard?.key)} sx={{ fontSize: '14px', p: '8px 16px' }}>{option.key}</MenuItem>
        ))}
      </Menu>

      <Menu anchorEl={subCardAnchorEl} open={Boolean(subCardAnchorEl)} onClose={handleClose} className="dropdown-menu">
        {selectedSubCard?.actions?.map((option: any, optIndex: number) => (
          <MenuItem key={optIndex} onClick={() => handleOptionClick(option.value, selectedCardIndex, selectedSubCard?.SubcardId)} sx={{ fontSize: '14px', p: '8px 16px' }}>{option.key}</MenuItem>
        ))}
      </Menu>
    </DragDropContext>
  );
};
RdsCompKanbanBoard.displayName = "RdsCompKanbanBoard";
export default RdsCompKanbanBoard;
