import React, { useEffect } from "react";
import { RdsButton, RdsCheckbox, RdsLabel, RdsModal, RdsProgressBar } from "../rds-elements";
import { useState } from "react";
import { RdsInput } from "../rds-elements";
import { RdsIcon } from "../rds-elements";
import { RdsCard } from "../rds-elements";
import { RdsBadge } from "../rds-elements";
import './rds-comp-kanban-board.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export interface KanbanBoardProps {
   inputValue: string;
}

const KanbanBoard = (props: KanbanBoardProps) => {
   const [inputValue, setInputValue] = useState(props.inputValue);
   const [visibleInput, setVisibleInput] = useState(false);
   const [addButton, setAddButton] = useState(true);
   const [showCard, setShowCard] = useState(false);
   const [cards, setCards] = useState<{
      subCardIndex: number; name: string, subCards: { subcardName: string, SubcardId: number }[], cardId: number
   }[]>([]);
   const [isDropdownOpen, setIsDropdownOpen] = useState<boolean[]>([]);
   const [subCardInputVisible, setSubCardInputVisible] = useState<number | null>(null);
   const [subCardInputValue, setSubCardInputValue] = useState<string>('');
   const [showInputTask, setShowInputTask] = useState(false);
   const [taskName, setTaskName] = useState('');
   const [tasks, setTasks] = useState<{ name: string, completed: boolean, subCardIndex: number, cardIndex: number, taskId: number }[]>([]);
   const [totalTasks, setTotalTasks] = useState(0);
   const [completedTasks, setCompletedTasks] = useState(0);

   useEffect(() => {
      setInputValue(props.inputValue);
   }
      , [props.inputValue]);

   const showInput = () => {
      setVisibleInput(true);
      setInputValue('');
      // setShowCard(false);
   }

   const onAddButtonClick = () => {
      // When initializing tasks for each sub-card, ensure correct assignment of subCardIndex
      setCards(prevCards => [...prevCards, { name: inputValue, subCards: [], subCardIndex: prevCards.length, cardId: generateRandomId() }]);
      setIsDropdownOpen(prevState => [...prevState, false]);
      setVisibleInput(false);
      setAddButton(true);
      setShowCard(true);
   }

   const onCancel = () => {
      setVisibleInput(false);
      setAddButton(true);
      setInputValue('');
      setShowCard(true);
   }

   const handleDataChanges = (event: any) => {
      setInputValue(event.target.value);
   }

   const toggleDropdown = (index: number) => {
      setIsDropdownOpen(prevState => prevState.map((state, i) => i === index ? !state : state));
   }

   const deleteCard = (index: number) => {
      setCards(prevCards => prevCards.filter((card, i) => i !== index));
      setIsDropdownOpen(prevState => prevState.filter((state, i) => i !== index));
   };

   const deleteSubCard = (index: number, subCardIndex: number) => {
      setCards(prevCards => prevCards.map((card, i) => i === index ? { ...card, subCards: card.subCards.filter((subCard, j) => subCard.SubcardId !== subCardIndex) } : card));
  
      const allBackdrops = document.querySelectorAll(".offcanvas-backdrop, .modal-backdrop");
      if (allBackdrops.length > 1) {
          for (let i = 0; i < allBackdrops.length - 1; i++) {
              allBackdrops[i].remove();
          }
      }
  }

   const addSubCard = (index: number) => {
      setSubCardInputVisible(index);
   };

   const onAddSubCardClick = (index: number) => {
      // Update the cards state to add the new sub-card to the specified card index
      setCards(prevCards => {
         const updatedCards = [...prevCards];
         const subcard = { subcardName: subCardInputValue, SubcardId: generateRandomId() };
         updatedCards[index].subCards.push(subcard);
         return updatedCards;
      });

      // Reset sub-card input visibility and value
      setSubCardInputVisible(null);
      setSubCardInputValue('');
   };

   const handleAddTask = (cardIndex: number, subCardIndex: number) => {
      const newTask = { name: taskName, completed: false, cardIndex, subCardIndex, taskId: generateRandomId() };
      // rest of your code...
      setTasks([...tasks, newTask]);
      setTaskName('');
      setShowInputTask(false);
      setTotalTasks(totalTasks + 1);

      // Update completed tasks count if the new task is completed
      if (newTask.completed) {
         setCompletedTasks(completedTasks + 1);
      }
   };

   function generateRandomId() {
      return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
  }

   const handleCheckboxClick = (cardIndex: number, subCardIndex: number, taskIndex: number) => {
      const updatedTasks = tasks.map((task, index) => {
         if (task.cardIndex === cardIndex && task.subCardIndex === subCardIndex && task.taskId === taskIndex) {
            const updatedTask = { ...task, completed: !task.completed };
            if (updatedTask.completed) {
               setCompletedTasks(completedTasks + 1);
            } else {
               setCompletedTasks(completedTasks - 1);
            }
            return updatedTask;
         }
         return task;
      });
      setTasks(updatedTasks);
   };

   const handleDeleteTask = (cardIndex: number, subCardIndex: number, taskIndex: number) => {
      const deletedTask = tasks.find((task, index) => task.cardIndex === cardIndex && task.subCardIndex === subCardIndex && task.taskId === taskIndex);
      if (deletedTask) {
         const updatedTasks = tasks.filter((task, index) => !(task.cardIndex === cardIndex && task.subCardIndex === subCardIndex && task.taskId === taskIndex));
         setTasks(updatedTasks);
         setTotalTasks(totalTasks - 1);
         if (deletedTask.completed) {
            setCompletedTasks(completedTasks - 1);
         }
      }
   };

   const handleDeleteAllTasks = (index: number) => {
      const newTasks = tasks.filter(task => task.subCardIndex !== index);
      setTasks(newTasks);
      setTotalTasks(totalTasks - newTasks.length);
      const deletedCompletedTasks = newTasks.filter(task => task.completed);
      setCompletedTasks(completedTasks - deletedCompletedTasks.length);
   };

   const subCardProgress = (cardIndex: number, subCardIndex: number) => {
      const subCardTasks = tasks.filter(task => task.cardIndex === cardIndex && task.subCardIndex === subCardIndex);
      const completedTasks = subCardTasks.filter(task => task.completed).length;
      const totalTasks = subCardTasks.length;

      if (totalTasks > 0) {
         const progressPercentage = (completedTasks / totalTasks) * 100;
         const progress = Math.floor(progressPercentage);
         return progress;
      } else {
         return 0;
      }
   };

   const onDragEnd = (result: any) => {
      const { source, destination, draggableId, type } = result;

      if (!destination) {
         return;
      }
      if (source.droppableId === destination.droppableId && source.index === destination.index) {
         return;
      }

      if (type === 'subCard') {
         const startCard = cards.find(card => card.subCardIndex == source.droppableId);
         const finishCard = cards.find(card => card.subCardIndex == destination.droppableId);

         if (!startCard || !finishCard) {
            return;
         }

         const startCardIndex = cards.indexOf(startCard);
         const finishCardIndex = cards.indexOf(finishCard);

         if (startCardIndex === finishCardIndex) {
            // Reorder within the same card
            const newSubCards = Array.from(startCard.subCards);
            const movedSubCard = newSubCards.find(subCard => subCard.SubcardId === Number(draggableId));
            const sourceIndex = movedSubCard ? newSubCards.indexOf(movedSubCard) : -1;
            const secondSubCard = newSubCards.find(subCard => subCard.SubcardId === Number(destination.index));
            const secondsourceIndex = secondSubCard ? newSubCards.indexOf(secondSubCard) : -1;

            if (movedSubCard && sourceIndex !== -1) {

               let temp = newSubCards[sourceIndex];
               newSubCards[sourceIndex] = newSubCards[secondsourceIndex];
               newSubCards[secondsourceIndex] = temp;

               const newCards = Array.from(cards);
               newCards[startCardIndex] = { ...newCards[startCardIndex], subCards: newSubCards };

               setCards(newCards);

               // Reorder tasks within the same card
               const reorderedTasks = tasks.map(task => {
                  if (task.cardIndex === source.droppableId && task.subCardIndex === Number(draggableId)) {
                     return { ...task, subCardId: Number(draggableId) };
                  } else if (task.cardIndex === destination.droppableId && task.subCardIndex === destination.droppableId) {
                     return { ...task, subCardId: destination.droppableId };
                  }
                  return task;
               });

               setTasks(reorderedTasks);
            }
         } else {
            // Move to a different card
            const startSubCards = Array.from(startCard.subCards);
            const movedSubCard = startSubCards.find(subCard => subCard.SubcardId === Number(draggableId));
            const sourceIndex = movedSubCard ? startSubCards.indexOf(movedSubCard) : -1;

            if (movedSubCard && sourceIndex !== -1) {
               startSubCards.splice(sourceIndex, 1);
               const finishSubCards = Array.from(finishCard.subCards);
               finishSubCards.splice(destination.index, 0, movedSubCard);

               const newCards = Array.from(cards);
               newCards[startCardIndex] = { ...newCards[startCardIndex], subCards: startSubCards };
               newCards[finishCardIndex] = { ...newCards[finishCardIndex], subCards: finishSubCards };

               setCards(newCards);

               // Update the cardId and subCardId of the moved subcard's tasks              
               const updateTask = tasks.filter(task => task.subCardIndex === Number(draggableId)).map(task => task.taskId);
               const updatedTasks = tasks.map(task => {
                  if (task.cardIndex === source.droppableId && task.subCardIndex === Number(draggableId)) {
                     return { ...task, cardId: finishCard.cardId, subCardId: Number(draggableId) };
                  }
                  if (updateTask.includes(task.taskId)) {
                     task.cardIndex = Number(destination.droppableId);
                     return { ...task, cardId: finishCard.cardId, subCardId: destination.droppableId };
                  }
                  return task;
               });

               setTasks(updatedTasks);
            }
         }
      }
   };

   return (
      <DragDropContext onDragEnd={onDragEnd}>
         <div className="row d-flex">
            {cards.map((card, index) => (
               <div className={showCard && card.name ? 'col-md-3 mt-2' : ''} key={index}>
                  {showCard && card.name &&
                     <div className="">
                        <RdsCard
                           cardTitle={
                              <div className="d-flex">
                                 <div className="">
                                    <div className="d-flex">
                                       {card.name}
                                       <div className="mx-1">
                                          <RdsBadge
                                             badgeType="pill"
                                             colorVariant="dark"
                                             label={card.subCards.length.toString()}
                                             size="smallest"
                                          />
                                       </div>
                                    </div>
                                 </div>
                                 <div className="btn-group dropstart">
                                    <button
                                       className="btn btn-sm btn-icon border-0 three-dot-btn justify-content-end"
                                       type="button"
                                       data-bs-toggle="dropdown"
                                       data-bs-auto-close="true"
                                       aria-expanded="false"
                                       onClick={() => toggleDropdown(index)}
                                    >
                                       <RdsIcon
                                          name={"three_dots_horizontal"}
                                          height="14px"
                                          width="14px"
                                          fill={true}
                                       />
                                    </button>
                                    <ul aria-labelledby="dropdownMenuButton"
                                       className={`dropdown-menu dropdown-adjusted ${isDropdownOpen[index] ? 'show' : ''} dropdown-right`}
                                    >
                                       <li onClick={() => deleteCard(index)}>
                                          <a
                                             data-bs-toggle="modal" className="dropdown-item">
                                             <RdsLabel label="Delete Board" />
                                          </a>
                                       </li>
                                    </ul>
                                 </div>
                              </div>
                           }
                           cardText={
                              <>
                                 <Droppable droppableId={`${index}`} type="subCard">
                                    {(provided) => (
                                       <div {...provided.droppableProps} ref={provided.innerRef}>
                                          {card.subCards.map((subCard) => (
                                             <Draggable key={subCard.SubcardId} draggableId={`${subCard.SubcardId}`} index={subCard.SubcardId}>
                                                {(provided) => (
                                                   <div
                                                      className="mt-2 row"
                                                      ref={provided.innerRef}
                                                      {...provided.draggableProps}
                                                      {...provided.dragHandleProps}
                                                   >
                                                      <RdsCard
                                                         key={subCard.SubcardId}
                                                         cardTitle={
                                                            <>
                                                               <div className="d-flex">
                                                                  <span className="me-3">{subCard.subcardName}</span>
                                                                  <div>
                                                                     <RdsModal
                                                                        cancelButtonName="Close"
                                                                        modalAnimation="modal-fade"
                                                                        modalId={`modal${index}-${subCard.SubcardId}`}
                                                                        modalTitle={subCard.subcardName}
                                                                        modalbutton={<RdsIcon name={"three_dots_horizontal"} height="14px" width="14px" fill={true} />}
                                                                        showModalHeader
                                                                        size="medium"
                                                                        verticallyCentered
                                                                     >
                                                                        <p>
                                                                           <div className="row">
                                                                              <div className="col-md-8">
                                                                                 <div className="">
                                                                                    <RdsLabel label="Label" fontWeight="bold" />
                                                                                 </div>
                                                                                 <div className="mt-5 row">
                                                                                    <div className="col-md-6">
                                                                                       <RdsLabel label="Check List" fontWeight="bold" />
                                                                                    </div>
                                                                                    <div className="col-md-6">
                                                                                       <RdsButton
                                                                                          colorVariant="secondary"
                                                                                          label="Delete all tasks"
                                                                                          size="small"
                                                                                          onClick={() => handleDeleteAllTasks(subCard.SubcardId)}
                                                                                       />
                                                                                    </div>
                                                                                 </div>
                                                                                 <div className="mt-2">
                                                                                    <RdsProgressBar
                                                                                       colorVariant="success"
                                                                                       displayPercentage
                                                                                       height={15}
                                                                                       progressWidth={subCardProgress(index, subCard.SubcardId)} // Pass both index and subCardIndex as arguments
                                                                                       role="single"
                                                                                       striped
                                                                                    />
                                                                                 </div>
                                                                                 <div className="mt-2">
                                                                                    <div>
                                                                                       {tasks
                                                                                          .filter(task => task.cardIndex === index && task.subCardIndex === subCard.SubcardId)
                                                                                          .map((task, taskIndex) => (
                                                                                             <div key={taskIndex} className="row">
                                                                                                <div className="col-md-8">
                                                                                                   <RdsCheckbox state="Checkbox" label={task.name} checked={task.completed} onChange={() => handleCheckboxClick(index, subCard.SubcardId, task.taskId)} />
                                                                                                </div>
                                                                                                <div className="col-md-4">
                                                                                                   <RdsIcon name="delete" height="15px" width="15px" onClick={() => handleDeleteTask(index, subCard.SubcardId, task.taskId)}></RdsIcon>
                                                                                                </div>
                                                                                             </div>
                                                                                          ))}
                                                                                    </div>
                                                                                    {showInputTask && (
                                                                                       <>
                                                                                          <RdsInput
                                                                                             value={taskName}
                                                                                             size="small"
                                                                                             onChange={(e) => setTaskName(e.target.value)}
                                                                                          />
                                                                                          <div className="mt-2">
                                                                                             <RdsButton
                                                                                                colorVariant="primary"
                                                                                                label="Add Task"
                                                                                                size="medium"
                                                                                                onClick={() => handleAddTask(index, subCard.SubcardId)}
                                                                                             />
                                                                                             <RdsIcon
                                                                                                colorVariant="secondary"
                                                                                                name="Cancel"
                                                                                                height="13px"
                                                                                                width="13px"
                                                                                                classes={"m-2"}
                                                                                                onClick={() => setShowInputTask(false)}
                                                                                             />
                                                                                          </div>
                                                                                       </>
                                                                                    )}
                                                                                    {!showInputTask && (
                                                                                       <RdsButton
                                                                                          colorVariant="secondary"
                                                                                          label="Add task"
                                                                                          size="medium"
                                                                                          icon="plus"
                                                                                          onClick={() => setShowInputTask(true)}
                                                                                       />
                                                                                    )}
                                                                                 </div>
                                                                              </div>
                                                                              <div className="col-md-4">
                                                                                 <RdsLabel label="Add to card" fontWeight="bold" />
                                                                                 <div className="mt-1">
                                                                                    <RdsModal
                                                                                       cancelButtonName="Close"
                                                                                       modalAnimation="modal-fade"
                                                                                       modalId={""}
                                                                                       modalTitle="Label"
                                                                                       modalbutton={<RdsButton colorVariant="secondary" label="Add Label" size="small" icon="" />}
                                                                                       showModalHeader
                                                                                       verticallyCentered={false}
                                                                                       size="medium"
                                                                                    >
                                                                                       <p>label modal</p>
                                                                                    </RdsModal>
                                                                                 </div>
                                                                                 <div className="my-2">
                                                                                    <RdsButton
                                                                                       colorVariant="secondary"
                                                                                       label="Date"
                                                                                       size="small"
                                                                                       icon="calendar"
                                                                                    />
                                                                                 </div>
                                                                                 <div>
                                                                                    <RdsButton
                                                                                       colorVariant="secondary"
                                                                                       label="Delete Card"
                                                                                       size="small"
                                                                                       icon="delete"
                                                                                       onClick={() => deleteSubCard(index, subCard.SubcardId)}
                                                                                    />
                                                                                 </div>
                                                                              </div>
                                                                           </div>
                                                                        </p>
                                                                     </RdsModal>
                                                                  </div>
                                                               </div>
                                                               <div className="mt-2">
                                                                  {/* Display completed tasks count out of total tasks for the current subcard */}
                                                                  {`${tasks.filter(task => task.cardIndex === index && task.subCardIndex === subCard.SubcardId && task.completed).length}/${tasks.filter(task => task.cardIndex === index && task.subCardIndex === subCard.SubcardId).length}`}
                                                               </div>
                                                            </>
                                                         }
                                                      />
                                                   </div>
                                                )}
                                             </Draggable>
                                          ))}
                                          {provided.placeholder}
                                          {subCardInputVisible === index ? (
                                             <div className="mt-1">
                                                <RdsInput
                                                   id=""
                                                   inputType="text"
                                                   placeholder="Enter Card Title"
                                                   size="small"
                                                   value={subCardInputValue}
                                                   onChange={(event) => setSubCardInputValue(event.target.value)}
                                                />
                                                <div className="mt-2 d-flex">
                                                   <RdsButton
                                                      colorVariant="primary"
                                                      icon="plus"
                                                      label="Add Card"
                                                      size="medium"
                                                      onClick={() => onAddSubCardClick(index)}
                                                   />
                                                   <RdsIcon
                                                      classes={"m-2"}
                                                      colorVariant="black"
                                                      name="cancel"
                                                      height="13px"
                                                      width="13px"
                                                      onClick={() => setSubCardInputVisible(null)}
                                                   />
                                                </div>

                                             </div>
                                          ) : (
                                             <div className="mt-2">
                                                <RdsButton
                                                   colorVariant="default"
                                                   icon="plus"
                                                   label="Add Card"
                                                   size="medium"
                                                   onClick={() => addSubCard(index)}
                                                />
                                             </div>
                                          )}
                                       </div>
                                    )}
                                 </Droppable>
                              </>
                           }
                        >
                        </RdsCard>
                     </div>
                  }
               </div>
            ))}
            {visibleInput &&
               <div className="col-md-3 mt-2">
                  <div className="row">
                     <div className="col-md-8">
                        <RdsInput
                           id=""
                           inputType="text"
                           placeholder="Enter Board Title"
                           size="small"
                           value={inputValue}
                           onChange={(event) => handleDataChanges(event)}
                        />
                     </div>
                  </div>
                  <div className="mt-3 d-flex">
                     <div className="">
                        <RdsButton
                           colorVariant="primary"
                           label="Add Board"
                           size="medium"
                           onClick={onAddButtonClick}
                        />
                     </div>
                     <div className="m-2">
                        <RdsIcon
                           height="13px"
                           name="cancel"
                           width="13px"
                           onClick={onCancel}
                        />
                     </div>

                  </div>
               </div>
            }
            {!visibleInput && addButton &&
               <div className="col-md-3 mt-2">
                  <RdsButton
                     colorVariant="default"
                     icon="plus"
                     label="Add Board"
                     size="medium"
                     onClick={showInput}
                  />
               </div>
            }
         </div>
      </DragDropContext>
   )
}

export default KanbanBoard;