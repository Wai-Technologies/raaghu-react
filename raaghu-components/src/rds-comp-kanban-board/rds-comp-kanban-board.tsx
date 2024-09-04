import React, { useEffect } from "react";
import {
  RdsButton,
  RdsCheckbox,
  RdsDatePicker,
  RdsDropdownList,
  RdsLabel,
  RdsModal,
  RdsProgressBar,
} from "../rds-elements";
import { useState } from "react";
import { RdsInput } from "../rds-elements";
import { RdsIcon } from "../rds-elements";
import { RdsCard } from "../rds-elements";
import { RdsBadge } from "../rds-elements";
import "./rds-comp-kanban-board.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export interface RdsCompKanbanBoardProps {
  boardName: string;
}

const RdsCompKanbanBoard = (props: RdsCompKanbanBoardProps) => {
  const [boardName, setboardName] = useState(props.boardName);
  const [showAddBoardBtn, setShowAddBoardBtn] = useState(false);
  const [addButton, setAddButton] = useState(true);
  const [showBoard, setShowBoard] = useState(false);
  const [isEditingBoardName, setIsEditingBoardName] = useState<boolean[]>([]);

  const [boards, setBoards] = useState<
    {
      subCardIndex: number;
      name: string;
      subCards: {
        ticketId: string;
        ticketPriority: string;
        ticketQuestion: string;
        ticketDate: string;
        SubcardId: number;
      }[];
      cardId: number;
    }[]
  >([]);
  const [isBoardDropdownOpen, setIsBoardDropdownOpen] = useState<boolean[]>([]);
  const [isSubCardDropdownOpen, setIsSubCardDropdownOpen] = useState<{
    [key: number]: boolean;
  }>({});
  const [subCardInputsVisible, setSubCardInputsVisible] = useState<
    number | null
  >(null);
  const formatDate = (date: Date) => {
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();

    // Adding ordinal suffix to the day
    const ordinalSuffix = (n: number) => {
      return (
        n + (["st", "nd", "rd"][((((n + 90) % 100) - 10) % 10) - 1] || "th")
      );
    };

    return `${ordinalSuffix(day)} ${month} ${year}`;
  };
  const [ticketIdValue, setticketIdValue] = useState<string>("");
  const [ticketPriorityValue, setTicketPriorityValue] = useState<string>("");
  const [ticketQuestionValue, setTicketQuestionValue] = useState<string>("");
  const [ticketDateValue, setTicketDateValue] = useState<string>(
    formatDate(new Date())
  );

  const [tasks, setTasks] = useState<
    {
      name: string;
      completed: boolean;
      subCardIndex: number;
      cardIndex: number;
      taskId: number;
    }[]
  >([]);
  const [totalTasks, setTotalTasks] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);

  const priorityList = [
    {
      label: "High",
      val: "High",
    },
    {
      label: "Moderate",
      val: "Moderate",
    },
    {
      label: "Low",
      val: "Low",
    },
  ];

  useEffect(() => {
    setboardName(props.boardName);
  }, [props.boardName]);

  const handleShowInputBox = () => {
    setShowAddBoardBtn(true);
    setboardName("");
    // setShowBoard(false);
  };

  const onAddButtonClick = () => {
    // When initializing tasks for each sub-card, ensure correct assignment of subCardIndex
    setBoards((prevCards) => [
      ...prevCards,
      {
        name: boardName,
        subCards: [],
        subCardIndex: prevCards.length,
        cardId: generateRandomId(),
      },
    ]);
    setIsBoardDropdownOpen((prevState) => [...prevState, false]);
    setIsEditingBoardName((prevState) => [...prevState, false]);
    setShowAddBoardBtn(false);
    setAddButton(true);
    setShowBoard(true);
  };

  const onCancel = () => {
    setShowAddBoardBtn(false);
    setAddButton(true);
    setboardName("");
    setShowBoard(true);
  };

  const handleDataChanges = (event: any) => {
    setboardName(event.target.value);
  };

  const toggleDropdown = (index: number) => {
    setIsBoardDropdownOpen((prevState) =>
      prevState.map((state, i) => (i === index ? !state : state))
    );
  };

  // const toggleSubCardDropdown = (index: number) => {
  //   setIsSubCardDropdownOpen((prevState) =>
  //     prevState.map((state, i) => (i === index ? true : false))
  //   );
  // };
  const toggleSubCardDropdown = (subCardId: number) => {
    setIsSubCardDropdownOpen((prevState) => ({
      ...prevState,
      [subCardId]: !prevState[subCardId],
    }));
  };

  const editBoardName = (index: number) => {
    setIsEditingBoardName((prevState) =>
      prevState.map((state, i) => (i === index ? true : false))
    );
    setboardName(boards[index].name);
    setIsBoardDropdownOpen((prevState) =>
      prevState.map((state, i) => (i === index ? !state : state))
    );
  };

  const deleteCard = (index: number) => {
    setBoards((prevCards) => prevCards.filter((card, i) => i !== index));
    setIsBoardDropdownOpen((prevState) =>
      prevState.filter((state, i) => i !== index)
    );
  };

  const deleteSubCard = (index: number, subCardIndex: number) => {
    setBoards((prevCards) =>
      prevCards.map((card, i) =>
        i === index
          ? {
              ...card,
              subCards: card.subCards.filter(
                (subCard, j) => subCard.SubcardId !== subCardIndex
              ),
            }
          : card
      )
    );
  };

  const addSubCard = (index: number) => {
    setSubCardInputsVisible(index);
  };

  const onAddSubCardClick = (index: number) => {
    setTicketDateValue(formatDate(new Date()));
   
    const newSubcard = {
      ticketId: ticketIdValue,
      ticketPriority: ticketPriorityValue,
      ticketQuestion: ticketQuestionValue,
      ticketDate: ticketDateValue,
      SubcardId: generateRandomId(), // Ensure unique SubcardId for each subcard
    };
   
    setBoards((prevCards) => {
      const updatedCards = [...prevCards];
      updatedCards[index].subCards.push(newSubcard);
      return updatedCards;
    });
   
    setIsSubCardDropdownOpen((prevState) => ({
      ...prevState,
      [newSubcard.SubcardId]: false, 
    }));
   
    // Reset sub-card input visibility and value
    setSubCardInputsVisible(null);
    setticketIdValue("");
    setTicketPriorityValue("");
    setTicketQuestionValue("");
    setTicketDateValue(formatDate(new Date()));
  };

  function generateRandomId() {
    return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
  }

  const onDragEnd = (result: any) => {
    const { source, destination, draggableId, type } = result;

    if (!destination) {
      return;
    }
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    if (type === "subCard") {
      const startCard = boards.find(
        (card) => card.subCardIndex == source.droppableId
      );
      const finishCard = boards.find(
        (card) => card.subCardIndex == destination.droppableId
      );

      if (!startCard || !finishCard) {
        return;
      }

      const startCardIndex = boards.indexOf(startCard);
      const finishCardIndex = boards.indexOf(finishCard);

      if (startCardIndex === finishCardIndex) {
        // Reorder within the same card
        const newSubCards = Array.from(startCard.subCards);
        const movedSubCard = newSubCards.find(
          (subCard) => subCard.SubcardId === Number(draggableId)
        );
        const sourceIndex = movedSubCard
          ? newSubCards.indexOf(movedSubCard)
          : -1;
        const secondSubCard = newSubCards.find(
          (subCard) => subCard.SubcardId === Number(destination.index)
        );
        const secondsourceIndex = secondSubCard
          ? newSubCards.indexOf(secondSubCard)
          : -1;

        if (movedSubCard && sourceIndex !== -1) {
          let temp = newSubCards[sourceIndex];
          newSubCards[sourceIndex] = newSubCards[secondsourceIndex];
          newSubCards[secondsourceIndex] = temp;

          const newCards = Array.from(boards);
          newCards[startCardIndex] = {
            ...newCards[startCardIndex],
            subCards: newSubCards,
          };

          setBoards(newCards);

          // Reorder tasks within the same card
          const reorderedTasks = tasks.map((task) => {
            if (
              task.cardIndex === source.droppableId &&
              task.subCardIndex === Number(draggableId)
            ) {
              return { ...task, subCardId: Number(draggableId) };
            } else if (
              task.cardIndex === destination.droppableId &&
              task.subCardIndex === destination.droppableId
            ) {
              return { ...task, subCardId: destination.droppableId };
            }
            return task;
          });

          setTasks(reorderedTasks);
        }
      } else {
        // Move to a different card
        const startSubCards = Array.from(startCard.subCards);
        const movedSubCard = startSubCards.find(
          (subCard) => subCard.SubcardId === Number(draggableId)
        );
        const sourceIndex = movedSubCard
          ? startSubCards.indexOf(movedSubCard)
          : -1;

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

          // Update the cardId and subCardId of the moved subcard's tasks
          const updateTask = tasks
            .filter((task) => task.subCardIndex === Number(draggableId))
            .map((task) => task.taskId);
          const updatedTasks = tasks.map((task) => {
            if (
              task.cardIndex === source.droppableId &&
              task.subCardIndex === Number(draggableId)
            ) {
              return {
                ...task,
                cardId: finishCard.cardId,
                subCardId: Number(draggableId),
              };
            }
            if (updateTask.includes(task.taskId)) {
              task.cardIndex = Number(destination.droppableId);
              return {
                ...task,
                cardId: finishCard.cardId,
                subCardId: destination.droppableId,
              };
            }
            return task;
          });

          setTasks(updatedTasks);
        }
      }
    }
  };

  const handleChange = (val: any, selectedCardId: any) => {
    setBoards((prevCards) =>
      prevCards.map((card) =>
        card.cardId === selectedCardId
          ? { ...card, name: val.defaultValue }
          : card
      )
    );
    setIsEditingBoardName((prevState) => prevState.map(() => false));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="row d-flex ">
        {boards.map((card, index) => (
          <div
            className={showBoard && card.name ? "col-md-3 mt-2 " : ""}
            key={index}
          >
            {showBoard && card.name && (
              <div className="kanban-board">
                <RdsCard
                  cardTitle={
                    <div className="row">
                      <div className="col-md-8">
                        {!isEditingBoardName[index] ? (
                          <div className="d-flex">
                            <span className="f-14 fw-400">{card.name}</span>
                            <span className="mx-2 f-14 fw-400">
                              ({card.subCards.length.toString()})
                            </span>
                          </div>
                        ) : (
                          <div className="d-flex">
                            <RdsInput
                              size="small"
                              inputType="text"
                              customClasses="form-control margin-top-5"
                              value={card.name}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  handleChange(e.target, card.cardId);
                                }
                              }}
                            ></RdsInput>
                          </div>
                        )}
                      </div>
                      <div className="col-md-4">
                        <div className="d-flex justify-content-end">
                          <div className="btn-group dropstart">
                            <button
                              className="btn btn-sm btn-icon border-0 three-dot-btn"
                              type="button"
                              data-bs-toggle="dropdown"
                              data-bs-auto-close="true"
                              aria-expanded="false"
                              onClick={() => toggleDropdown(index)}
                            >
                              <RdsIcon
                                name={"three_dots"}
                                height="14px"
                                width="14px"
                                fill={true}
                              />
                            </button>
                            <ul
                              aria-labelledby="dropdownMenuButton"
                              className={`dropdown-menu dropdown-adjusted ${
                                isBoardDropdownOpen[index] ? "show" : ""
                              } dropdown-right`}
                            >
                              <li onClick={() => editBoardName(index)}>
                                <a
                                  data-bs-toggle="modal"
                                  className="dropdown-item"
                                >
                                  <RdsLabel label="Edit" />
                                </a>
                              </li>
                              <li onClick={() => deleteCard(index)}>
                                <a
                                  data-bs-toggle="modal"
                                  className="dropdown-item"
                                >
                                  <RdsLabel label="Delete Board" />
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  }
                  cardText={
                    <>
                      <Droppable droppableId={`${index}`} type="subCard">
                        {(provided: any) => (
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                          >
                            {card.subCards.map((subCard) => (
                              <Draggable
                                key={subCard.SubcardId}
                                draggableId={`${subCard.SubcardId}`}
                                index={subCard.SubcardId}
                              >
                                {(provided: any) => (
                                  <div
                                    className="mt-2 row sub-card"
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
                                    <RdsCard
                                      key={subCard.SubcardId}
                                      cardTitle={
                                        <>
                                          <div className="row">
                                            <div className="col-md-8">
                                              <div className="d-flex flex-column">
                                                <span className="f-12 fw-500">
                                                  {subCard.ticketId}
                                                </span>
                                                <div className="priority-btn mt-1">
                                                  <RdsBadge
                                                    badgeType="rectangle"
                                                    colorVariant="primary"
                                                    label={
                                                      subCard.ticketPriority
                                                    }
                                                    size="small"
                                                    className="custom-badge"
                                                  />
                                                </div>
                                              </div>
                                            </div>
                                            <div className="col-md-4">
                                              <div className="d-flex justify-content-end">
                                                <div className="btn-group dropstart">
                                                  <button
                                                    className="btn btn-sm btn-icon border-0 three-dot-btn"
                                                    type="button"
                                                    data-bs-toggle="dropdown"
                                                    data-bs-auto-close="true"
                                                    aria-expanded="true"
                                                    onClick={() =>
                                                      toggleSubCardDropdown(
                                                        subCard.SubcardId
                                                      )
                                                    }
                                                  >
                                                    <RdsIcon
                                                      name={"three_dots"}
                                                      height="14px"
                                                      width="14px"
                                                      fill={true}
                                                    />
                                                  </button>
                                                  <ul
                                                    aria-labelledby="dropdownMenuButton"
                                                    className={`dropdown-menu dropdown-adjusted ${
                                                      isSubCardDropdownOpen[
                                                        subCard.SubcardId
                                                      ]
                                                        ? "show"
                                                        : ""
                                                    } dropdown-right`}
                                                  >
                                                    <li
                                                      onClick={() =>
                                                        deleteSubCard(
                                                          index,
                                                          subCard.SubcardId
                                                        )
                                                      }
                                                    >
                                                      <a
                                                        data-bs-toggle="modal"
                                                        className="dropdown-item"
                                                      >
                                                        <RdsLabel label="Delete Card" />
                                                      </a>
                                                    </li>
                                                  </ul>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </>
                                      }
                                      cardText={
                                        <>
                                          <div className="mb-2">
                                            <span className="f-16 fw-500 truncate-text">
                                              {subCard.ticketQuestion}
                                            </span>
                                          </div>
                                          <div className="row">
                                            <div className="col-12 d-flex justify-content-between">
                                              <span className="f-12 fw-500">
                                                {subCard.ticketDate}
                                              </span>
                                              <span className="f-12 fw-500">
                                                <img
                                                  src="./assets/kanban.png"
                                                  alt="profilePic"
                                                  width="24px"
                                                  height="24px"
                                                  className="rounded-circle"
                                                ></img>
                                              </span>
                                            </div>
                                          </div>
                                        </>
                                      }
                                    />
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            {/* {provided.placeholder} */}
                            {subCardInputsVisible === index ? (
                              <div className="mt-1">
                                <RdsInput
                                  id=""
                                  inputType="text"
                                  placeholder="Enter Ticket Id"
                                  size="small"
                                  value={ticketIdValue}
                                  onChange={(event) =>
                                    setticketIdValue(event.target.value)
                                  }
                                />
                                <RdsDropdownList
                                  data-testid="priority"
                                  borderDropdown={true}
                                  placeholder="Select Priority"
                                  listItems={priorityList}
                                  isPlaceholder={true}
                                  onClick={(e: any, val: any) =>
                                    setTicketPriorityValue(val)
                                  }
                                />
                                <RdsInput
                                  id=""
                                  inputType="text"
                                  placeholder="Enter Question"
                                  size="small"
                                  value={ticketQuestionValue}
                                  onChange={(event) =>
                                    setTicketQuestionValue(event.target.value)
                                  }
                                />
                                {/* <RdsDatePicker
                                                   onDatePicker={handleEndDate}
                                                   DatePickerLabel="Select Date"
                                                   type="default"
                                                   isBoardDropdownOpen={false}
                                                /> */}
                                <div className="mt-2 d-flex add-item-btn btn-margin">
                                  <RdsButton
                                    colorVariant="default"
                                    icon="plus_circle"
                                    label="Add Item"
                                    size="medium"
                                    onClick={() => onAddSubCardClick(index)}
                                  />
                                  <RdsIcon
                                    classes={"m-2"}
                                    colorVariant="black"
                                    name="cancel"
                                    height="13px"
                                    width="13px"
                                    onClick={() =>
                                      setSubCardInputsVisible(null)
                                    }
                                  />
                                </div>
                              </div>
                            ) : (
                              <div className="mt-2 add-item-btn">
                                <RdsButton
                                  class="w-100"
                                  colorVariant="default"
                                  icon="plus_circle"
                                  label="Add Item"
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
                ></RdsCard>
              </div>
            )}
          </div>
        ))}
        {showAddBoardBtn && (
          <div className="mx-2 mt-2 add-board">
            <div className="col-md-12">
              <RdsInput
                id=""
                inputType="text"
                placeholder="Enter Board Title"
                size="small"
                value={boardName}
                onChange={(event) => handleDataChanges(event)}
              />
            </div>
            <div className="mt-2 d-flex add-item-btn btn-margin">
              <RdsButton
                colorVariant="default"
                icon="plus_circle"
                label="Add Board"
                size="medium"
                onClick={onAddButtonClick}
              />
              <RdsIcon
                classes={"m-2"}
                colorVariant="black"
                name="cancel"
                height="13px"
                width="13px"
                onClick={onCancel}
              />
            </div>
          </div>
        )}
        {!showAddBoardBtn && addButton && (
          <div className="d-flex align-items-center mt-2 mx-2 add-board">
            <div className="add-item-btn add-board-btn flex-grow-1">
              <RdsButton
                class="mt-2"
                colorVariant="default"
                icon="plus_circle"
                label="Add Board"
                size="medium"
                onClick={handleShowInputBox}
              />
            </div>
          </div>
        )}
      </div>
    </DragDropContext>
  );
};

export default RdsCompKanbanBoard;
