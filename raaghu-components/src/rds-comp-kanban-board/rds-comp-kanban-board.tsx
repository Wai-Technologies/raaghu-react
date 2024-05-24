import React, { useEffect } from "react";
import { RdsButton, RdsLabel, RdsModal } from "../rds-elements";
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
                                                Delete Board
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
                                                <div className="d-flex">
                                                   <span className="me-3">{subCard}</span>
                                                   <div>
                                                      <RdsModal
                                                         cancelButtonName="Close"
                                                         modalAnimation="modal-fade"
                                                         modalId={`modal${index}-${subCardIndex}`}
                                                         modalTitle={subCard}
                                                         modalbutton={<RdsIcon name={"three_dots_horizontal"} height="14px" width="14px" fill={true} />}
                                                         saveChangesName="Save Changes"
                                                         showModalFooter
                                                         showModalHeader
                                                         size="medium"
                                                         verticallyCentered
                                                      >
                                                         <p>
                                                            <div className="row">
                                                            <div className="col-md-8">
                                                               <RdsLabel label="Label" fontWeight="bold"/>
                                                            </div>
                                                            <div className="col-md-4">
                                                               <RdsLabel label="Add to card" fontWeight="bold"/>
                                                               <div className="mt-1">
                                                                  <RdsButton
                                                                     colorVariant="secondary"
                                                                     label="Add Label"
                                                                     size="small"   
                                                                     icon=""
                                                                     
                                                                  />
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