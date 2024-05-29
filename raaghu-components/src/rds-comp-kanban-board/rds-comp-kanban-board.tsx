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
      subCardIndex: number; name: string, subCards: string[]
   }[]>([]);
   const [isDropdownOpen, setIsDropdownOpen] = useState<boolean[]>([]);
   const [subCardInputVisible, setSubCardInputVisible] = useState<number | null>(null);
   const [subCardInputValue, setSubCardInputValue] = useState<string>('');
   const [showInputTask, setShowInputTask] = useState(false);
   const [taskName, setTaskName] = useState('');
   const [tasks, setTasks] = useState<{ name: string, completed: boolean, subCardIndex: number, cardIndex: number }[]>([]);
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
      setCards(prevCards => [...prevCards, { name: inputValue, subCards: [], subCardIndex: prevCards.length }]);
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
      setCards(prevCards => prevCards.map((card, i) => i === index ? { ...card, subCards: card.subCards.filter((subCard, j) => j !== subCardIndex) } : card));
   }

   const addSubCard = (index: number) => {
      setSubCardInputVisible(index);
   };

   const onAddSubCardClick = (index: number) => {
      // Update the cards state to add the new sub-card to the specified card index
      setCards(prevCards => {
         const updatedCards = [...prevCards];
         updatedCards[index].subCards.push(subCardInputValue);
         return updatedCards;
      });

      // Reset sub-card input visibility and value
      setSubCardInputVisible(null);
      setSubCardInputValue('');
   };

   const handleAddTask = (cardIndex: number, subCardIndex: number) => {
      const newTask = { name: taskName, completed: false, cardIndex, subCardIndex };
      setTasks([...tasks, newTask]);
      setTaskName('');
      setShowInputTask(false);
      setTotalTasks(totalTasks + 1);

      // Update completed tasks count if the new task is completed
      if (newTask.completed) {
         setCompletedTasks(completedTasks + 1);
      }
   };

   const handleCheckboxClick = (cardIndex: number, subCardIndex: number, taskIndex: number) => {
      const updatedTasks = tasks.map((task, index) => {
         if (task.cardIndex === cardIndex && task.subCardIndex === subCardIndex && index === taskIndex) {
            const updatedTask = { ...task, completed: !task.completed };
            // Update completed tasks count based on the task's completion status
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
      const deletedTask = tasks.find((task, index) => task.cardIndex === cardIndex && task.subCardIndex === subCardIndex && index === taskIndex);
      if (deletedTask) {
         // Update tasks state by filtering out the deleted task
         const updatedTasks = tasks.filter((task, index) => !(task.cardIndex === cardIndex && task.subCardIndex === subCardIndex && index === taskIndex));
         setTasks(updatedTasks);
         setTotalTasks(totalTasks - 1);

         // Update completed tasks count if the deleted task was completed
         if (deletedTask.completed) {
            setCompletedTasks(completedTasks - 1);
         }
      }
   };

   const handleDeleteAllTasks = (index: number) => {
      // Filter out the tasks not associated with the card index
      const newTasks = tasks.filter(task => task.subCardIndex !== index);

      // Update the tasks state
      setTasks(newTasks);

      // Update the totalTasks count
      setTotalTasks(totalTasks - newTasks.length);

      // Check if any of the deleted tasks were completed and update the completedTasks count accordingly
      const deletedCompletedTasks = newTasks.filter(task => task.completed);
      setCompletedTasks(completedTasks - deletedCompletedTasks.length);
   };

   const subCardProgress = (cardIndex: number, subCardIndex: number) => {
      const subCardTasks = tasks.filter(task => task.cardIndex === cardIndex && task.subCardIndex === subCardIndex);
      const completedTasks = subCardTasks.filter(task => task.completed).length;
      const totalTasks = subCardTasks.length;

      if (totalTasks > 0) {
         // Calculate the progress percentage
         const progressPercentage = (completedTasks / totalTasks) * 100;
         // Round down to the nearest whole number
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
         const startCardIndex = parseInt(source.droppableId);
         const finishCardIndex = parseInt(destination.droppableId);

         if (startCardIndex === finishCardIndex) {
            // Reorder within the same card
            const newSubCards = Array.from(cards[startCardIndex].subCards);
            const [movedSubCard] = newSubCards.splice(source.index, 1);
            newSubCards.splice(destination.index, 0, movedSubCard);

            const newCards = Array.from(cards);
            newCards[startCardIndex] = { ...newCards[startCardIndex], subCards: newSubCards };

            setCards(newCards);

            // Reorder tasks within the same card
            const reorderedTasks = tasks.map(task => {
               if (task.cardIndex === startCardIndex && task.subCardIndex === source.index) {
                  return { ...task, subCardIndex: destination.index };
               } else if (task.cardIndex === startCardIndex && task.subCardIndex === destination.index) {
                  return { ...task, subCardIndex: source.index };
               }
               return task;
            });

            setTasks(reorderedTasks);
         } else {
            // Move to a different card
            const startSubCards = Array.from(cards[startCardIndex].subCards);
            const [movedSubCard] = startSubCards.splice(source.index, 1);
            const finishSubCards = Array.from(cards[finishCardIndex].subCards);
            finishSubCards.splice(destination.index, 0, movedSubCard);

            const newCards = Array.from(cards);
            newCards[startCardIndex] = { ...newCards[startCardIndex], subCards: startSubCards };
            newCards[finishCardIndex] = { ...newCards[finishCardIndex], subCards: finishSubCards };

            setCards(newCards);

            // Update the cardIndex and subCardIndex of the moved subcard's tasks
            const updatedTasks = tasks.map(task => {
               if (task.cardIndex === startCardIndex && task.subCardIndex === source.index) {
                  return { ...task, cardIndex: finishCardIndex, subCardIndex: destination.index };
               }
               if (task.cardIndex === startCardIndex && task.subCardIndex > source.index) {
                  return { ...task, subCardIndex: task.subCardIndex - 1 };
               }
               if (task.cardIndex === finishCardIndex && task.subCardIndex >= destination.index) {
                  return { ...task, subCardIndex: task.subCardIndex + 1 };
               }
               return task;
            });

            setTasks(updatedTasks);
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
                                                {card.subCards.map((subCard, subCardIndex) => (
                                                   <Draggable key={subCardIndex} draggableId={`subCard-${index}-${subCardIndex}`} index={subCardIndex}>
                                                      {(provided) => (
                                                         <div
                                                            className="mt-2 row"
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                         >
                                                            <RdsCard
                                                               key={subCardIndex}
                                                               cardTitle={
                                                                  <>
                                                                     <div className="d-flex">
                                                                        <span className="me-3">{subCard}</span>
                                                                        <div>
                                                                           <RdsModal
                                                                              cancelButtonName="Close"
                                                                              modalAnimation="modal-fade"
                                                                              modalId={`modal${index}-${subCardIndex}`}
                                                                              modalTitle={subCard}
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
                                                                                                onClick={() => handleDeleteAllTasks(subCardIndex)}
                                                                                             />
                                                                                          </div>
                                                                                       </div>
                                                                                       <div className="mt-2">
                                                                                          <RdsProgressBar
                                                                                             colorVariant="success"
                                                                                             displayPercentage
                                                                                             height={15}
                                                                                             progressWidth={subCardProgress(index, subCardIndex)} // Pass both index and subCardIndex as arguments
                                                                                             role="single"
                                                                                             striped
                                                                                          />
                                                                                       </div>
                                                                                       <div className="mt-2">
                                                                                          <div>
                                                                                             {tasks
                                                                                                .filter(task => task.cardIndex === index && task.subCardIndex === subCardIndex)
                                                                                                .map((task, taskIndex) => (
                                                                                                   <div key={taskIndex} className="row">
                                                                                                      <div className="col-md-8">
                                                                                                         <RdsCheckbox state="Checkbox" label={task.name} checked={task.completed} onChange={() => handleCheckboxClick(index, subCardIndex, taskIndex)} />
                                                                                                      </div>
                                                                                                      <div className="col-md-4">
                                                                                                         <RdsIcon name="delete" height="15px" width="15px" onClick={() => handleDeleteTask(index, subCardIndex, taskIndex)}></RdsIcon>
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
                                                                                                      onClick={() => handleAddTask(index, subCardIndex)}
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
                                                                                             onClick={() => deleteSubCard(index, subCardIndex)}
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
                                                                        {`${tasks.filter(task => task.cardIndex === index && task.subCardIndex === subCardIndex && task.completed).length}/${tasks.filter(task => task.cardIndex === index && task.subCardIndex === subCardIndex).length}`}
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