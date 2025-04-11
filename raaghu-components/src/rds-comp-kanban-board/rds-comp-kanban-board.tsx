import React, { useCallback, useEffect } from "react";
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
import { InputSize } from "../../../raaghu-elements/src/rds-input/rds-input";

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
  //boardName: string;
  boardData?: any;
  allowAddingNewCard?: boolean;
  allowAddingNewSubCard?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onSubCardOption?: (option: any, subCardIndex: number, subCardId: any) => void;
  onCardOption?: (
    option: any,
    cardIndex: number,
    cardId: any,
    cardKey: string
  ) => void;
  allTagsList?: any;
  allCategoriesList?: any;
  onAddQuestionSaveHandler?: (data: any) => void;
  addQuestionData?: any;
  onSelectedTagsListChange?: (items: any) => void;
}

const RdsCompKanbanBoard = (props: RdsCompKanbanBoardProps) => {
  const [boardName, setboardName] = useState("");
  const [allowAddingNewCard, setAllowAddingNewCard] = useState(
    props.allowAddingNewCard || false
  );
  const [allowAddingNewSubCard, setAllowAddingNewSubCard] = useState(
    props.allowAddingNewSubCard || false
  );

  const [showAddBoardBtn, setShowAddBoardBtn] = useState(
    props.allowAddingNewCard ? false : true
  );
  const [addButton, setAddButton] = useState(
    props.allowAddingNewSubCard ? true : false
  );
  const [showBoard, setShowBoard] = useState(true);
  const [isEditingBoardName, setIsEditingBoardName] = useState<boolean[]>(
    props.boardData ? props.boardData.map(() => false) : []
  );

  const [boards, setBoards] = useState<
    {
      subCardIndex: number;
      name: string;
      status?: string;
      colorType: "primary" | "success" | "warning" | "error";
      actions: any[];
      subCards: {
        ticketId: string;
        ticketPriority: string;
        ticketQuestion: string;
        ticketDate: string;
        SubcardId: number;
        assignedToName?: string;
        assignedTo?: string;
        actions: any[];
      }[];
      cardId: number;
      key: string;
    }[]
  >(props.boardData);
  const [totalRecords, setBoardsRecord] = useState<any>(props.boardData);
  const illusPath =
    "../../../.storybook/assets/lottie-files/outlined/dual-color/illustration-light.json";

  useEffect(() => {
    setBoards(props.boardData);
  }, [props.boardData]);

  const [isBoardDropdownOpen, setIsBoardDropdownOpen] = useState<boolean[]>(
    props.boardData ? props.boardData.map(() => false) : []
  );
  const [isSubCardDropdownOpen, setIsSubCardDropdownOpen] = useState<{
    [key: number]: boolean;
  }>({});
  const [subCardInputsVisible, setSubCardInputsVisible] = useState<
    number | null
  >(props.boardData ? props.boardData.length : 0);

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
  const [editAction, setEditAction] = useState<string>("edit");
  const [deleteAction, setDeleteAction] = useState<string>("delete");
  const [assignAction, setAssignAction] = useState<string>("assign");
  const [viewAction, setViewAction] = useState<string>("view");

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
    { label: "High", val: "High" },
    { label: "Moderate", val: "Moderate" },
    { label: "Low", val: "Low" },
  ];

  // useEffect(() => {
  //     setboardName(props.boardName);
  // }, [props.boardName]);

  const handleShowInputBox = () => {
    setShowAddBoardBtn(true);
    setboardName("");
    // setShowBoard(false);
  };

  const onAddButtonClick = () => {
    // When initializing tasks for each sub-card, ensure correct assignment of subCardIndex
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

    const curBoard = props.boardData[index];
    const cardToDelete = curBoard.subCards[subCardIndex];

    props.boardData.map((board: any) => {
      if (board.subCardIndex === index) {
        return {
          ...board,
          subCards: board.subCards.filter(
            (subCard: any) => subCard !== cardToDelete
          ),
        };
      }
      return board;
    });
  };

  const handleCardOptionClick = (
    action: string,
    cardIndex: number,
    cardId: any,
    cardKey: string
  ) => {
    props.onCardOption &&
      props.onCardOption(action, cardIndex, cardId, cardKey);
    switch (action) {
      case editAction:
        break;
      case deleteAction:
        break;
      default:
    }
  };

  const handleOptionClick = (
    action: string,
    subCardIndex: number,
    subCardId: any
  ) => {
    props.onSubCardOption &&
      props.onSubCardOption(action, subCardIndex, subCardId);
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
  };

  const addSubCard = (index: number) => {
    setSubCardInputsVisible(index);
  };

  const onAddSubCardClick = (index: number) => {
    setTicketDateValue(formatDate(new Date()));

    const newSubcard = {
      ticketId: addQuestionData.discription,
      ticketPriority: "",
      ticketQuestion: addQuestionData.title,
      ticketDate: ticketDateValue,
      SubcardId: generateRandomId(), // Ensure unique SubcardId for each subcard
      actions: [
        {
          key: "Assign",
          value: "assign",
        },
        {
          key: "View",
          value: "view",
        },
        {
          key: "Delete",
          value: "delete",
        },
      ],
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
    //setticketIdValue("");
    //setTicketPriorityValue("");
    setAddQuestionFormData({});
    setTicketDateValue(formatDate(new Date()));

    props.onAddQuestionSaveHandler &&
      props.onAddQuestionSaveHandler(addQuestionData);
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
          const temp = newSubCards[sourceIndex];
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

  const classesHeader = (cardStatus: any) => {
    let defaultClass: string = "";

    if (cardStatus) {
      const cardStatusClasses = " status-" + cardStatus + "-header" + " ";
      defaultClass = defaultClass + cardStatusClasses;
    }

    return defaultClass;
  };

  const classesSubCards = (cardStatus: any) => {
    let defaultClass: string = "";

    if (cardStatus) {
      const cardStatusClasses = " status-" + cardStatus + " ";
      defaultClass = defaultClass + cardStatusClasses;
    }

    return defaultClass;
  };

  const colorClass = (colortype: string) => {
    let defaultClass: string = " ";

    const colorVar =
      "kanban-" +
      (colortype != "" && colortype != null ? colortype : "primary ");
    if (colorVar) {
      defaultClass += colorVar;
    }
    return defaultClass;
  };
  const [addQuestionData, setAddQuestionFormData] = useState<any>({});
  const handleAddQuestionDataChanges = (value: any, key: string) => {
    setAddQuestionFormData({ ...addQuestionData, [key]: value });
  };

  const onSelectedCreators = (items: any) => {
    handleAddQuestionDataChanges(items, "supportTagIds");
    props.onSelectedTagsListChange && props.onSelectedTagsListChange(items);
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="row d-flex">
        {boards.map((card, index) => (
          <div
            className={
              showBoard && card.name
                ? "col-xl-3 col-lg-6 col-md-12 col-12 mt-2 mb-xl-0 mb-3"
                : ""
            }
            key={index}
          >
            {showBoard && card.name && (
              <div className={`kanban-board ${colorClass(card.colorType)}`}>
                <RdsCard
                  colorVariant={card.colorType}
                  cardTitle={
                    <div className="row">
                      <div className="col-md-8 col-6">
                        {!isEditingBoardName[index] ? (
                          <div className="d-flex">
                            <span className="f-14 fw-400 card-name">
                              {card.name}
                            </span>
                            <span className="mx-2 f-14 fw-400">
                              ({card.subCards.length.toString()})
                            </span>
                          </div>
                        ) : (
                          <div className="d-flex">
                            <RdsInput
                              name="cardTitle"
                              size={InputSize.Small}
                              inputType="text"
                              customClasses="form-control margin-top-5"
                              value={card.name}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  handleChange(e.target, card.cardId);
                                }
                              }}
                            />
                          </div>
                        )}
                      </div>
                      <div className="col-md-4 col-6">
                        <div className="d-flex justify-content-end">
                          <div className="btn-group dropstart">
                            <button
                              className="btn btn-sm btn-icon border-0 three-dot-btn"
                              type="button"
                              data-bs-toggle="dropdown"
                              data-bs-auto-close="true"
                              aria-expanded="false"
                              title="More options"
                              onClick={() => toggleDropdown(index)}
                            >
                              <RdsIcon
                                name="three_dots"
                                height="14px"
                                width="14px"
                                fill={true}
                              />
                            </button>
                            <ul
                              className={`dropdown-menu dropdown-adjusted ${
                                isBoardDropdownOpen[index] ? "show" : ""
                              } dropdown-right`}
                            >
                              {card.actions.map((option, optIndex) => (
                                <li
                                  key={optIndex}
                                  onClick={() =>
                                    handleCardOptionClick(
                                      option.value,
                                      index,
                                      card.cardId,
                                      card.key
                                    )
                                  }
                                >
                                  <a
                                    data-bs-toggle="modal"
                                    data-bs-target={`#${option.value}`}
                                    className="dropdown-item"
                                  >
                                    <RdsLabel label={option.key} />
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  }
                  cardText={
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
                                    colorVariant={card.colorType}
                                    cardTitle={
                                      <div className="row">
                                        <div className="col-md-8">
                                          <div className="d-flex flex-column">
                                            <span className="f-12 fw-500">
                                              {subCard.ticketId}
                                            </span>
                                            {subCard.ticketPriority && (
                                              <div className="priority-btn mt-1">
                                                <RdsBadge
                                                  shape="rectangle"
                                                  colorVariant="warning"
                                                  label={subCard.ticketPriority}
                                                  size="small"
                                                  className="custom-badge"
                                                />
                                              </div>
                                            )}
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
                                                title="More options"
                                                onClick={() =>
                                                  toggleSubCardDropdown(
                                                    subCard.SubcardId
                                                  )
                                                }
                                              >
                                                <RdsIcon
                                                  name="three_dots"
                                                  height="14px"
                                                  width="14px"
                                                  fill={true}
                                                />
                                              </button>
                                              <ul
                                                className={`dropdown-menu dropdown-adjusted ${
                                                  isSubCardDropdownOpen[
                                                    subCard.SubcardId
                                                  ]
                                                    ? "show"
                                                    : ""
                                                } dropdown-right`}
                                              >
                                                {subCard.actions.map(
                                                  (option, optIndex) => (
                                                    <li
                                                      key={optIndex}
                                                      onClick={() =>
                                                        handleOptionClick(
                                                          option.value,
                                                          index,
                                                          subCard.SubcardId
                                                        )
                                                      }
                                                    >
                                                      <a
                                                        data-bs-toggle="offcanvas"
                                                        data-bs-target={`#${option.value}`}
                                                        className="dropdown-item"
                                                      >
                                                        <RdsLabel
                                                          label={option.key}
                                                        />
                                                      </a>
                                                    </li>
                                                  )
                                                )}
                                              </ul>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
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
                                            {subCard.assignedTo && (
                                              <span className="f-12 fw-500">
                                                <img
                                                  src={subCard.assignedTo}
                                                  alt="assignedToName"
                                                  width="24px"
                                                  height="24px"
                                                  className="rounded-circle"
                                                />
                                              </span>
                                            )}
                                          </div>
                                        </div>
                                      </>
                                    }
                                  />
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                          {allowAddingNewSubCard && (
                            <>
                              {subCardInputsVisible === index ? (
                                <div className="mt-3">
                                  <RdsDropdownList
                                    borderDropdown={true}
                                    isPlaceholder={true}
                                    listItems={props.allCategoriesList}
                                    onClick={(e: any, val: any) =>
                                      handleAddQuestionDataChanges(
                                        val,
                                        "supportCategoryId"
                                      )
                                    }
                                    placeholder="Select Category"
                                  />
                                  <div className="pt-1">
                                    <RdsInput
                                      name="cardTitle"
                                      inputType="text"
                                      placeholder="Enter Title"
                                      showIcon
                                      size={InputSize.Medium}
                                      value={addQuestionData?.title || ""}
                                      onChange={(e: any) =>
                                        handleAddQuestionDataChanges(
                                          e.target.value,
                                          "title"
                                        )
                                      }
                                    />
                                  </div>
                                  <div className="pt-1">
                                    <RdsInput
                                      name="cardText"
                                      inputType="text"
                                      placeholder="Enter Description"
                                      value={addQuestionData?.description || ""}
                                      onChange={(e: any) =>
                                        handleAddQuestionDataChanges(
                                          e.target.value,
                                          "description"
                                        )
                                      }
                                      size={InputSize.Small}
                                    />
                                  </div>
                                  <div className="pt-1">
                                    <RdsDropdownList
                                      borderDropdown={true}
                                      isPlaceholder={true}
                                      listItems={props.allTagsList}
                                      multiSelect={true}
                                      placeholder="Select Tags"
                                      selectedItems={(items) => {
                                        onSelectedCreators(items);
                                      }}
                                    />
                                  </div>
                                  <div className="mt-2 d-flex add-item-btn btn-margin">
                                    <RdsButton
                                      colorVariant="default"
                                      icon="plus_circle"
                                      label="Add Item"
                                      size="medium"
                                      onClick={() => onAddSubCardClick(index)}
                                    />
                                    <RdsIcon
                                      classes="m-2 close-board"
                                      colorVariant="black"
                                      name="cancel"
                                      height="12px"
                                      width="12px"
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
                            </>
                          )}
                        </div>
                      )}
                    </Droppable>
                  }
                />
              </div>
            )}
          </div>
        ))}
        {allowAddingNewCard && (
          <>
            {showAddBoardBtn && (
              <div className="mx-2 mt-2 add-board">
                <div className="col-md-12">
                  <RdsInput
                    name="cardTitle"
                    inputType="text"
                    placeholder="Enter Board Title"
                    size={InputSize.Small}
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
                    classes="m-2"
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
          </>
        )}
      </div>
    </DragDropContext>
  );
};
export default RdsCompKanbanBoard;
