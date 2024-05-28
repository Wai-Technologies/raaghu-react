import React, { useEffect } from "react";
import { RdsButton, RdsCheckbox, RdsLabel, RdsModal, RdsProgressBar } from "../rds-elements";
import { useState } from "react";
import { RdsInput } from "../rds-elements";
import { RdsIcon } from "../rds-elements";
import { RdsCard } from "../rds-elements";
import { RdsBadge } from "../rds-elements";
import './rds-comp-kanban-board.css';

export interface KanbanBoardProps {
   inputValue: string;
}

const KanbanBoard = (props: KanbanBoardProps) => {
   const [inputValue, setInputValue] = useState(props.inputValue);
   const [visibleInput, setVisibleInput] = useState(false);
   const [addButton, setAddButton] = useState(true);
   const [showCard, setShowCard] = useState(false);
   const [cards, setCards] = useState<{ name: string, subCards: string[] }[]>([]);
   const [isDropdownOpen, setIsDropdownOpen] = useState<boolean[]>([]);
   const [subCardInputVisible, setSubCardInputVisible] = useState<number | null>(null);
   const [subCardInputValue, setSubCardInputValue] = useState<string>('');
   const [showInputTask, setShowInputTask] = useState(false);
   const [taskName, setTaskName] = useState('');
   const [tasks, setTasks] = useState<{ name: string, completed: boolean }[]>([]);
   const [totalTasks, setTotalTasks] = useState(0);
   const [completedTasks, setCompletedTasks] = useState(0);
   useEffect(() => {
      setInputValue(props.inputValue);
   }
      , [props.inputValue]);

   const showInput = () => {
      setVisibleInput(true);
      setInputValue('');
      setShowCard(false);
   }

   const onAddButtonClick = () => {
      setCards(prevCards => [...prevCards, { name: inputValue, subCards: [] }]);
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
      setCards(prevCards => prevCards.map((card, i) => i === index ? { ...card, subCards: [...card.subCards, subCardInputValue] } : card));
      setSubCardInputVisible(null);
      setSubCardInputValue('');
   };

   const handleAddTask = () => {
      setTasks([...tasks, { name: taskName, completed: false }]);
      setTaskName('');
      setShowInputTask(false);
      setTotalTasks(totalTasks + 1);
   };
   const handleCheckboxClick = (index: any) => {
      const newTasks = [...tasks];
      newTasks[index].completed = !newTasks[index].completed;
      setTasks(newTasks);
    
      const newCompletedTasks = newTasks[index].completed ? completedTasks + 1 : completedTasks - 1;
      setCompletedTasks(newCompletedTasks);
    };

    const handleDeleteTask = (index: any) => {
      const newTasks = tasks.filter((_, i) => i !== index);
      setTasks(newTasks);
    
      setTotalTasks(totalTasks - 1);
      if (tasks[index].completed) {
        setCompletedTasks(completedTasks - 1);
      }
    };

    const handleDeleteAllTasks = () => {
      setTasks([]);
      setTotalTasks(0);
      setCompletedTasks(0);
    };
    
    const noOfCompletedTasks = tasks.filter(task => task.completed)?.length;
    const progress = tasks?.length > 0 ? Math.round((noOfCompletedTasks / tasks?.length) * 100) : 0;
   return (
      <>
         {visibleInput &&
            <>
               <div className="row">
                  <div className="col-md-3">
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
            </>

         }
         <div className="">
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
                                    {card.subCards.map((subCard, subCardIndex) => (
                                       <div className="mt-2 row">
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
                                                                              onClick={handleDeleteAllTasks}
                                                                           />
                                                                        </div>
                                                                     </div>
                                                                     <div className="mt-2">
                                                                        <RdsProgressBar
                                                                           colorVariant="success"
                                                                           displayPercentage
                                                                           height={15}
                                                                           progressWidth={progress}
                                                                           role="single"
                                                                           striped
                                                                        />
                                                                     </div>
                                                                     <div className="mt-2">
                                                                        <div>
                                                                           {tasks.map((task, index) => (
                                                                              <div key={index} className="row ">
                                                                                 <div className="col-md-8">
                                                                                    <RdsCheckbox state="Checkbox" label={task.name} checked={task.completed} onChange={() => handleCheckboxClick(index)} />
                                                                                 </div>
                                                                                 <div className="col-md-4">
                                                                                    <RdsIcon name="delete" height="15px" width="15px" onClick={() => handleDeleteTask(index)} ></RdsIcon>
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
                                                                                    onClick={handleAddTask}
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
                                                                        {/* <RdsButton
                                                                        colorVariant="secondary"
                                                                        label="Add Label"
                                                                        size="small"
                                                                        icon=""
                                                                     /> */}
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
                                                      {totalTasks > 0 && `${completedTasks}/${totalTasks}`}
                                                   </div>
                                                </>
                                             }
                                          />
                                       </div>
                                    ))}
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
                                 </>
                              }
                           >
                           </RdsCard>
                        </div>
                     }
                  </div>
               ))}
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
         </div>
      </>
   )
}

export default KanbanBoard;