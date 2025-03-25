import React, { MouseEvent, useState, useEffect, useRef } from "react";
import {
  RdsIcon,
  RdsBadge,
  RdsInput,
  RdsButton,
  RdsPagination,
  RdsIllustration,
  RdsAvatar,
  RdsTooltip,
  RdsProgressBar,
  RdsSearch,
  RdsLabel,
  RdsSelectList,
} from "../rds-elements";
import "./rds-comp-grid.css";
import { useTranslation } from "react-i18next";
import { fontWeight } from "../../../raaghu-elements/libs/types/fontWeight";
import { AvatarSize } from "../../../raaghu-elements/src/rds-avatar/rds-avatar";
import { TooltipStyle } from "../../../raaghu-elements/src/rds-tooltip/rds-tooltip";

export enum ActionPosition {
  Right = "right",
  Left = "left",
}

export enum ActionColumnStyle {
  ShowDots = "show dots",
  ShowButtonsDirectly = "show buttons directly",
}

export interface RdsCompGridCombinedProps {
  fontWeight?: string;
  enablecheckboxselection?: boolean;
  enableRadioButtonselection?: boolean;
  illustration?: boolean;
  noDataTitle?: string;
  noDataheaderTitle?: string;
  classes?: string;
  swapRows?: any;
  isSwap?: any;
  tableHeaders: {
    displayName: string;
    key: string;
    datatype: string;
    dataLength?: number;
    required?: boolean;
    sortable?: boolean;
    colWidth?: string;
    disabled?: boolean;
    isEndUserEditing?: boolean;
    isBold?: boolean;
    fontWeight?: fontWeight;
    filter?: boolean;
    state?: string;
    showHeader?: boolean;
    showsubHeader?: boolean;
    showShuffleIcon?: boolean;
    showAddNewColumn?: boolean;
  }[];
  actions?: {
    displayName: string;
    id: string;
    offId?: string;
    modalId?: string;
  }[];
  tableData: any[];
  pagination?: boolean;
  isClickable?: boolean;
  recordsPerPage?: number;
  recordsPerPageSelectListOption?: boolean;
  onActionSelection?: (rowData: any, actionId: any) => void;
  onRowSelect?: (data: any) => void;
  onRowClick?: (rowId: any) => void;
  actionPosition?: ActionPosition;
  onPaginationHandler?: (currentPage: number, recordsPerPage: number) => void;
  totalRecords?: any;
  actionColumnStyle?: ActionColumnStyle;
  showSubHeader?: boolean;
  showHeader?: boolean;
  showAddNewColumn?: boolean;
  state?: string;
  collapsed?: boolean;
}

const RdsCompGrid = (props: RdsCompGridCombinedProps) => {
  const [data, setData] = useState(props.tableData);
  const [totalRecords, setTotalRecords] = useState<any>(props.totalRecords);
  const [array, setArray] = useState<boolean[]>([]);
  const iconForIllustration = localStorage.getItem("theme") || " light";
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeDropdownId, setActiveDropdownId] = useState(null);
  const dropdownRef = useRef<HTMLUListElement>(null);
  const actionColumnStyle =
    props.actionColumnStyle || ActionColumnStyle.ShowDots;
  const [isCollapsed, setIsCollapsed] = useState(props.collapsed || false); // Modify this line
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  const selectItemsArray = [
    {
      option: "(Select All)",
      value: "(Select All)",
    },
    {
      option: "One",
      value: "one",
    },
    {
      option: "two",
      value: "two",
    },
  ];
  const [rowStatus, setRowStatus] = useState({
    startingRow: 0,
    endingRow: props.recordsPerPage,
  });
  let sort: boolean = false;
  useEffect(() => {
    setTotalRecords(props.totalRecords);
  }, [props.totalRecords]);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  useEffect(() => {
    if (!sort) {
      setData(props.tableData);
      const tempArray: boolean[] = [];
      props?.tableData?.map((res) => {
        tempArray.push(false);
      });
      setArray(tempArray);
    }
  }, [props.tableData]);

  const onPageChangeHandler = (currentPage: number, recordsPerPage: number) => {
    props.onPaginationHandler &&
      props.onPaginationHandler(currentPage, recordsPerPage);
    if (totalRecords) {
      setRowStatus({
        startingRow: 0, //0-index
        endingRow: recordsPerPage, //considering that 1st element has '0' index
      });
    } else {
      setRowStatus({
        startingRow: (currentPage - 1) * recordsPerPage, //0-index
        endingRow: currentPage * recordsPerPage, //considering that 1st element has '0' index
      });
    }
  };

  const [html, setHtml] = useState("");
  const [index, setIndex] = useState(-1);
  const handleMouseUp = (e: any) => {
    if (props.isSwap) {
      const index1 = e.currentTarget.parentElement.rowIndex;
      const index2 = index;
      if (index1 === index2) {
        e.preventDefault();
        return;
      }
      props.swapRows(index, index1);
    }
    return;
  };
  const draggingItem = useRef<any>(null);
  const dragOverItem = useRef<any>(null);
  const handleDragStart = (e: any, position: any) => {
    if (props.isSwap) {
      draggingItem.current = position;
    }
  };
  const handleDragEnter = (e: any, position: any) => {
    if (props.isSwap) {
      dragOverItem.current = position;
      const listCopy = [...data];
      const draggingItemContent = listCopy[draggingItem.current];
      listCopy.splice(draggingItem.current, 1);
      listCopy.splice(dragOverItem.current, 0, draggingItemContent);

      draggingItem.current = dragOverItem.current;
      dragOverItem.current = null;
      props.swapRows(listCopy);
      setData(listCopy);
    }
  };
  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    const value = e.target.value.toLowerCase();
    const filteredData = props.tableData.filter((item) =>
      item[key]?.toString().toLowerCase().includes(value)
    );
    setData(filteredData);
  };
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    const filteredData = props.tableData.filter((item) =>
      Object.values(item).some((val) =>
        val?.toString().toLowerCase().includes(value)
      )
    );
    setData(filteredData);
  };
  const handleDelete = (id: any) => {
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
    if (props.onRowSelect) {
      props.onRowSelect(updatedData);
    }
  };

  const actionOnClickHandler = (
    clickEvent: any,
    tableDataRow: any,
    tableDataRowIndex: number,
    action: {
      displayName: string;
      id: string;
      offId?: string;
      modalId?: string;
    }
  ) => {
    const allBackdrops = document.querySelectorAll(
      ".offcanvas-backdrop, .modal-backdrop"
    );
    if (allBackdrops.length > 1) {
      for (let i = 0; i < allBackdrops.length - 1; i++) {
        allBackdrops[i].remove();
      }
    }

    const tempArray: boolean[] = [];
    array.map((res: any) => {
      tempArray.push(false);
    });
    setArray(tempArray);
    if (
      action.id == "edit" &&
      action.offId != undefined &&
      action.modalId != undefined
    ) {
      const tempData = data?.map((Data) => {
        if (Data.id == tableDataRowIndex) {
          return { ...Data, isEndUserEditing: true };
        } else {
          return { ...Data };
        }
      });
      setData(tempData);
    }
    props.onActionSelection != undefined &&
      props.onActionSelection(tableDataRow, action.id);
  };
  let tempData: any;
  const onInputChangeHandler = (
    e: any,
    tableDataRow: any,
    tableHeader: any,
    key: any,
    tableDataRowIndex: number
  ) => {
    tempData = data?.map((Data) => {
      if (Data.id == tableDataRowIndex) {
        const obj = Object.assign({}, Data);
        obj[key] = e.target.value;
        return obj;
      } else {
        return { ...Data };
      }
    });
  };

  const onEditCheck = (
    clickEvent: any,
    tableDataRow: any,
    tableDataRowIndex: number
  ) => {
    const tempata = tempData?.map((Data: any) => {
      if (Data.id == tableDataRowIndex) {
        return { ...Data, isEndUserEditing: false };
      } else {
        return { ...Data };
      }
    });
    setData(tempata);
  };

  const onEditClose = (
    clickEvent: any,
    tableDataRow: any,
    tableDataRowIndex: number
  ) => {
    const tempData = data?.map((Data) => {
      if (Data.id == tableDataRowIndex) {
        return { ...Data, isEndUserEditing: false };
      } else {
        return { ...Data };
      }
    });
    setData(tempData);
  };
  const handleChange = (e: any) => {
    let tempUser;
    const { name, checked } = e.target;
    if (name === "allSelect") {
      const tempUser = data?.map((user) => {
        return { ...user, selected: checked };
      });
      setData(tempUser);
      props.onRowSelect !== undefined && props.onRowSelect(tempUser);
    } else {
      tempUser = data?.map((user) =>
        user.id == name ? { ...user, selected: checked } : user
      );
      setData(tempUser);
      props.onRowSelect !== undefined && props.onRowSelect(tempUser);
    }
  };
  const handleRadioButtonChange = (e: any) => {
    const { name, checked } = e.target;
    const tempUser = data?.map((user) =>
      user.id == name
        ? { ...user, selected: checked }
        : { ...user, selected: false }
    );
    setData(tempUser);
    props.onRowSelect !== undefined && props.onRowSelect(tempUser);
  };
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Simulate data loading for 2 seconds, replace this with your actual data loading logic
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);
  const [sortOrder, setSortOrder] = useState("ascending");
  const onSortClickHandler = (
    event: MouseEvent<HTMLSpanElement, globalThis.MouseEvent>,
    col: string
  ) => {
    const newSortOrder = sortOrder === "ascending" ? "descending" : "ascending";
    setSortOrder(newSortOrder);
    const sorted = [...data].sort((a, b) => {
      const aVal =
        a[col] !== undefined && a[col] !== null ? a[col].toString() : "";
      const bVal =
        b[col] !== undefined && b[col] !== null ? b[col].toString() : "";
      return (
        aVal.localeCompare(bVal, "en", { numeric: true }) *
        (newSortOrder === "ascending" ? 1 : -1)
      );
    });
    setData(sorted);
  };
  const Classes = props.classes;

  const actionPosition =
    Object.prototype.hasOwnProperty.call(props, "actionPosition") &&
    props.actionPosition === "right"
      ? true
      : false;

  const toggleDropdown = (id: any) => {
    setIsDropdownOpen(id === activeDropdownId ? !isDropdownOpen : true);
    setActiveDropdownId(id);
  };

  const handleRowClick = (rowId: any) => {
    props.onRowClick && props.onRowClick(rowId);
  };

  return (
    <>
      {data?.length == 0 && !totalRecords && props.illustration ? (
        <div className="h-100 d-flex align-items-center justify-content-center">
          {isLoading ? (
            // Display a loader while data is loading
            <div className="loader"></div>
          ) : (
            <>
              {iconForIllustration === "light" && (
                <RdsIllustration
                  label={props.noDataheaderTitle}
                  subLabel={props.noDataTitle}
                  colorVariant="dark"
                  iconHeight="200px"
                  iconWidth="200px"
                  iconPath="./assets/lottie-files/outlined/dual-color/illustration-light.json"
                  isContinueAnimate={true}
                />
              )}
              {iconForIllustration === "dark" && (
                <RdsIllustration
                  label={props.noDataheaderTitle}
                  subLabel={props.noDataTitle}
                  colorVariant="dark"
                  iconHeight="200px"
                  iconWidth="200px"
                  iconPath="./assets/lottie-files/outlined/dual-color/illustration-dark.json"
                  isContinueAnimate={true}
                />
              )}
              {iconForIllustration === "semidark" && (
                <RdsIllustration
                  label={props.noDataheaderTitle}
                  subLabel={props.noDataTitle}
                  colorVariant="dark"
                  iconHeight="200px"
                  iconWidth="200px"
                  iconPath="./assets/lottie-files/outlined/dual-color/illustration-light.json"
                  isContinueAnimate={true}
                />
              )}
            </>
          )}
        </div>
      ) : (
        <>
          <div
            className={
              props.actionPosition == "left"
                ? "table-responsive left-action"
                : "table-responsive-none"
            }
          >
            <div className="table-responsive table-responsive-sm">
              <table
                className={`table table-hover table-bordered     ${Classes} `}
                id="sortTable"
              >
                <thead className="text-nowrap">
                  {props.showHeader && (
                    <tr>
                      <th
                        colSpan={
                          props.tableHeaders.length + (props.actions ? 1 : 0)
                        }
                      >
                        <div className="d-flex align-items-center">
                          <div className="me">
                            <RdsSearch
                              iconPosition="right"
                              labelPosition="top"
                              placeholder="Search"
                              size="small"
                              onChange={handleSearchChange} // Add this line
                            />
                          </div>
                          <div className="mx-2 grid-header">
                            <RdsButton
                              class="buttonWidth color"
                              badgeLayout="Text_only"
                              badgeState="default"
                              databstoggle="tooltip"
                              displayType="Icon + Text"
                              icon="plus"
                              label="Add New"
                              shape="rectangle"
                              size="medium"
                              state="default"
                              style="transparent"
                            />
                          </div>
                          <div className="mx-1 grid-header">
                            <RdsButton
                              badgeLayout="Text_only"
                              badgeState="default"
                              databstoggle="tooltip"
                              displayType="Icon + Text"
                              icon="persons"
                              label="Persons"
                              shape="rectangle"
                              size="medium"
                              state="default"
                              style="transparent"
                              textCase="unset"
                            />
                          </div>
                          <div className="mx-1 grid-header">
                            <RdsButton
                              badgeLayout="Text_only"
                              badgeState="default"
                              databstoggle="tooltip"
                              displayType="Icon + Text"
                              icon="filters"
                              label="Filters"
                              shape="rectangle"
                              size="medium"
                              state="default"
                              style="transparent"
                            />
                          </div>
                          <div className="mx-1 grid-header">
                            <RdsButton
                              class="stroke"
                              badgeLayout="Text_only"
                              badgeState="default"
                              databstoggle="tooltip"
                              displayType="Icon + Text"
                              icon="sort"
                              label="Sort"
                              shape="rectangle"
                              size="medium"
                              state="default"
                              style="transparent"
                            />
                          </div>
                          <div className="mx-1 grid-header">
                            <RdsButton
                              badgeLayout="Text_only"
                              badgeState="default"
                              databstoggle="tooltip"
                              displayType="Icon + Text"
                              icon="hide"
                              label="Hide"
                              shape="rectangle"
                              size="medium"
                              state="default"
                              style="transparent"
                            />
                          </div>
                          <div className="mx-1 grid-header">
                            <RdsButton
                              badgeLayout="Text_only"
                              badgeState="default"
                              databstoggle="tooltip"
                              displayType="Icon + Text"
                              icon="more"
                              label="More"
                              shape="rectangle"
                              size="medium"
                              state="default"
                              style="transparent"
                            />
                          </div>
                        </div>
                      </th>
                    </tr>
                  )}
                  {props.showSubHeader && (
                    <tr>
                      <th
                        colSpan={
                          props.tableHeaders.length + (props.actions ? 1 : 0)
                        }
                      >
                        <div className="d-flex">
                          <RdsLabel fontWeight="bolder" label="Title" />
                          <div className="ms-3" style={{ gap: "10px" }}>
                            <RdsIcon
                              classes="stroke"
                              name="three_dotshorizontal"
                              height="12px"
                              width="auto"
                              stroke={true}
                              isCursorPointer={true}
                            />
                          </div>
                          <div className="ms-5">
                            <RdsIcon
                              classes="ms-2"
                              name="chevron_down"
                              height="8px"
                              width="auto"
                              stroke={true}
                              isCursorPointer={true}
                              onClick={toggleCollapse}
                            />
                          </div>
                        </div>
                      </th>
                    </tr>
                  )}
                  <tr className="align-middle ">
                    <th className="text-center fw-medium">
                      <RdsIcon
                        name=""
                        height="16px"
                        width="16px"
                        fill={false}
                        isCursorPointer={true}
                      />
                    </th>
                    <th className="text-center fw-medium">
                      <RdsIcon
                        name=""
                        height="16px"
                        width="16px"
                        fill={false}
                        isCursorPointer={true}
                      />
                    </th>
                    {actionPosition != true &&
                      props.tableHeaders &&
                      props.tableHeaders?.length > 0 &&
                      props.actions &&
                      props.actions?.length > 0 && (
                        <th className="text-center fw-medium actionWidth">
                          Actions
                        </th>
                      )}
                    {props.isSwap && <th></th>}
                    {props.enablecheckboxselection && (
                      <th scope="col">
                        <label className="fw-medium ms-2">Text</label>
                      </th>
                    )}
                    {props.enablecheckboxselection && (
                      <th scope="col">
                        <label className="fw-medium">Text</label>
                      </th>
                    )}
                    {props.enablecheckboxselection && (
                      <th scope="col">
                        <label className="fw-medium">Text</label>
                      </th>
                    )}
                    {props?.tableHeaders?.map((tableHeader, index) => (
                      <th scope="col" key={"tableHeader-" + index}>
                        <div
                          className={`align-items-center d-flex ${
                            tableHeader.datatype === "iconAvatarTitle"
                              ? "justify-content-center"
                              : ""
                          }`}
                        >
                          <span className="fw-medium ps-1">
                            {tableHeader.displayName}
                          </span>
                          <div className="header-options mobile-header-option cursor-pointer ps-5">
                            <span className="ps-2 d-flex ms-3">
                              <RdsIcon
                                name="three_dots"
                                height="12px"
                                width="auto"
                                stroke={true}
                                isCursorPointer={true}
                              />
                            </span>
                          </div>
                        </div>
                        <div className="d-flex align-items-center mt-1 ps-1 px-4">
                          <RdsSelectList
                            color="primary"
                            id="story"
                            isMultiple
                            isSearchable
                            label=""
                            onChange={function Xs() {}}
                            placeholder="filter..."
                            selectItems={selectItemsArray}
                          />
                          <span className="ms-2">
                            <RdsIcon
                              name="filter"
                              height="12px"
                              width="30px"
                              stroke={true}
                              isCursorPointer={true}
                            />
                          </span>
                        </div>
                      </th>
                    ))}
                    {actionPosition &&
                      props.tableHeaders &&
                      props.tableHeaders?.length > 0 &&
                      props.actions &&
                      props.actions?.length > 0 && (
                        <th className="text-center fw-medium actionWidth">
                          Actions
                        </th>
                      )}
                  </tr>
                </thead>

                <tbody>
                  {Array.isArray(data) &&
                    data?.map((tableDataRow, index) => {
                      const totalActions =
                        tableDataRow?.rowActions &&
                        props?.actions &&
                        tableDataRow?.rowActionsAdd
                          ? [
                              ...props.actions,
                              tableDataRow?.rowActions,
                              tableDataRow?.rowActionsAdd,
                            ]
                          : tableDataRow?.rowActions && props?.actions
                          ? [...props.actions, tableDataRow?.rowActions]
                          : tableDataRow?.rowActionsAdd && props?.actions
                          ? [...props.actions, tableDataRow?.rowActionsAdd]
                          : props.actions;

                      function handleDelete(id: any): void {
                        const updatedData = data.filter(
                          (item) => item.id !== id
                        );
                        setData(updatedData);
                        if (props.onRowSelect) {
                          props.onRowSelect(updatedData);
                        }
                      }

                      return (
                        (props.pagination
                          ? typeof rowStatus.endingRow != "undefined" &&
                            index >= rowStatus.startingRow &&
                            index < rowStatus.endingRow
                          : true) && (
                          <tr
                            onDragStart={(e) => handleDragStart(e, index)}
                            onDragOver={(e) => e.preventDefault()}
                            onDragEnter={(e) => handleDragEnter(e, index)}
                            draggable
                            key={"tableRow-" + index}
                          >
                            <td className="text-center align-middle">
                              <RdsIcon
                                name="shuffle"
                                height="16px"
                                width="16px"
                                fill={false}
                                isCursorPointer={true}
                              />
                            </td>
                            <td className="text-center align-middle">
                              <RdsIcon
                                name="three_dotshorizontal"
                                height="16px"
                                width="16px"
                                fill={false}
                                isCursorPointer={true}
                              />
                            </td>
                            {actionPosition != true &&
                              totalActions &&
                              totalActions?.length > 1 && (
                                <td className="align-middle bg-transparent text-center actionWidth">
                                  {!tableDataRow.isEndUserEditing ? (
                                    <>
                                      {actionColumnStyle === "show dots" && (
                                        <div className="btn-group dropstart">
                                          <button
                                            className="btn btn-sm btn-icon border-0 three-dot-btn"
                                            type="button"
                                            aria-expanded={
                                              activeDropdownId ===
                                              tableDataRow.id
                                                ? "true"
                                                : "false"
                                            }
                                            onClick={() =>
                                              toggleDropdown(tableDataRow.id)
                                            }
                                            data-bs-toggle="dropdown"
                                            data-bs-auto-close="true"
                                            id="dropdownMenuButton"
                                            data-testid="action-btn"
                                          >
                                            <RdsIcon
                                              name={"three_dots"}
                                              height="14px"
                                              width="14px"
                                              stroke={false}
                                              fill={true}
                                              tooltip={true}
                                              tooltipTitle="More Actions"
                                              tooltipPlacement="top"
                                              isCursorPointer={true}
                                            />
                                          </button>
                                          <ul
                                            ref={dropdownRef}
                                            aria-labelledby="dropdownMenuButton"
                                            className={`dropdown-menu dropdown-adjusted ${
                                              activeDropdownId ===
                                                tableDataRow.id &&
                                              isDropdownOpen
                                                ? "show"
                                                : ""
                                            }`}
                                          >
                                            {totalActions?.map(
                                              (action, actionIndex) => (
                                                <li
                                                  key={
                                                    "action-" +
                                                    actionIndex +
                                                    "-inside-tableRow" +
                                                    tableDataRow.id
                                                  }
                                                >
                                                  {action.modalId && (
                                                    <a
                                                      data-bs-toggle="modal"
                                                      data-bs-target={`#${action?.modalId}`}
                                                      aria-controls={
                                                        action?.modalId
                                                      }
                                                      onClick={(e) =>
                                                        actionOnClickHandler(
                                                          e,
                                                          tableDataRow,
                                                          tableDataRow.id,
                                                          action
                                                        )
                                                      }
                                                      className="dropdown-item"
                                                    >
                                                      {action.displayName}
                                                    </a>
                                                  )}
                                                  {action.offId && (
                                                    <a
                                                      data-bs-toggle="offcanvas"
                                                      data-bs-target={`#${action?.offId}`}
                                                      aria-controls={
                                                        action?.offId
                                                      }
                                                      onClick={(e) =>
                                                        actionOnClickHandler(
                                                          e,
                                                          tableDataRow,
                                                          tableDataRow.id,
                                                          action
                                                        )
                                                      }
                                                      className="dropdown-item"
                                                    >
                                                      {action.displayName}
                                                    </a>
                                                  )}
                                                  {action.offId == undefined &&
                                                    action.modalId ==
                                                      undefined && (
                                                      <a
                                                        onClick={(e) =>
                                                          actionOnClickHandler(
                                                            e,
                                                            tableDataRow,
                                                            tableDataRow.id,
                                                            action
                                                          )
                                                        }
                                                        className="dropdown-item"
                                                      >
                                                        {action.displayName}
                                                      </a>
                                                    )}
                                                </li>
                                              )
                                            )}
                                          </ul>
                                        </div>
                                      )}
                                      {actionColumnStyle ===
                                        "show buttons directly" && (
                                        <div
                                          className="d-flex flex-wrap align-items-center justify-content-center mx-1"
                                          id="action_column"
                                        >
                                          {totalActions?.map(
                                            (action, actionIndex) => (
                                              <button
                                                key={
                                                  "action-" +
                                                  actionIndex +
                                                  "-inside-tableRow" +
                                                  tableDataRow.id
                                                }
                                                className="btn btn-outline-primary mx-2 my-1"
                                              >
                                                {action.modalId && (
                                                  <a
                                                    data-bs-toggle="modal"
                                                    data-bs-target={`#${action?.modalId}`}
                                                    aria-controls={
                                                      action?.modalId
                                                    }
                                                    onClick={(e) =>
                                                      actionOnClickHandler(
                                                        e,
                                                        tableDataRow,
                                                        tableDataRow.id,
                                                        action
                                                      )
                                                    }
                                                    className="dropdown-item"
                                                  >
                                                    {action.displayName}
                                                  </a>
                                                )}
                                                {action.offId && (
                                                  <a
                                                    data-bs-toggle="offcanvas"
                                                    data-bs-target={`#${action?.offId}`}
                                                    aria-controls={
                                                      action?.offId
                                                    }
                                                    onClick={(e) =>
                                                      actionOnClickHandler(
                                                        e,
                                                        tableDataRow,
                                                        tableDataRow.id,
                                                        action
                                                      )
                                                    }
                                                    className="dropdown-item"
                                                  >
                                                    {action.displayName}
                                                  </a>
                                                )}
                                                {action.offId == undefined &&
                                                  action.modalId ==
                                                    undefined && (
                                                    <a
                                                      onClick={(e) =>
                                                        actionOnClickHandler(
                                                          e,
                                                          tableDataRow,
                                                          tableDataRow.id,
                                                          action
                                                        )
                                                      }
                                                      className="dropdown-item"
                                                    >
                                                      {action.displayName}
                                                    </a>
                                                  )}
                                              </button>
                                            )
                                          )}
                                        </div>
                                      )}
                                    </>
                                  ) : (
                                    <div className="d-flex justify-content-center align-items-center w-60px">
                                      <RdsButton
                                        class="action"
                                        colorVariant="primary"
                                        size="medium"
                                        tooltipTitle={""}
                                        type={"button"}
                                        onClick={(e) => {
                                          onEditCheck(
                                            e,
                                            tableDataRow,
                                            tableDataRow.id
                                          );
                                        }}
                                        style={{
                                          display:
                                            activeDropdownId ===
                                              tableDataRow.id && isDropdownOpen
                                              ? "none"
                                              : "block",
                                        }}
                                      >
                                        <RdsIcon
                                          name={"check"}
                                          height="14px"
                                          width="14px"
                                          stroke={true}
                                          fill={false}
                                          isCursorPointer={true}
                                        />
                                      </RdsButton>
                                      <RdsButton
                                        class="ms-2 text-white"
                                        colorVariant="danger"
                                        tooltipPlacement={
                                          TooltipStyle.MiddleBottomArrow
                                        }
                                        size="medium"
                                        tooltipTitle={""}
                                        type={"button"}
                                        onClick={(e) => {
                                          onEditClose(
                                            e,
                                            tableDataRow,
                                            tableDataRow.id
                                          );
                                        }}
                                      >
                                        <RdsIcon
                                          name={"close"}
                                          height="14px"
                                          width="14px"
                                          stroke={true}
                                          fill={true}
                                          isCursorPointer={true}
                                        />
                                      </RdsButton>
                                    </div>
                                  )}
                                </td>
                              )}
                            {actionPosition != true &&
                              totalActions &&
                              totalActions?.length == 1 && (
                                <td className="px-2 align-middle">
                                  <div className="d-grid justify-content-center">
                                    {totalActions?.map(
                                      (action, actionIndex) => (
                                        <>
                                          <RdsIcon
                                            key={
                                              "action-" +
                                              actionIndex +
                                              "-inside-tableRow" +
                                              index
                                            }
                                            name={action.icon || action.id}
                                            height="16px"
                                            width="16px"
                                            stroke={true}
                                            fill={false}
                                            tooltip={true}
                                            tooltipTitle={action.displayName}
                                            tooltipPlacement={"top"}
                                            isCursorPointer={true}
                                            databstoggle={
                                              action.offId
                                                ? "offcanvas"
                                                : action.modalId
                                                ? "modal"
                                                : ""
                                            }
                                            databstarget={
                                              action.offId
                                                ? `#${action?.offId}`
                                                : action.modalId
                                                ? `#${action?.modalId}`
                                                : ""
                                            }
                                            ariacontrols={action?.offId}
                                            onClick={(e) => {
                                              actionOnClickHandler(
                                                e,
                                                tableDataRow,
                                                tableDataRow.id,
                                                action
                                              );
                                            }}
                                          />
                                        </>
                                      )
                                    )}
                                  </div>
                                </td>
                              )}

                            {/* <th>
                              <RdsBadge
                                shape="rectangle"
                                colorVariant="primary"
                                iconName="notification"
                                iconPosition="right"
                                isIconshow
                                label="Badge"
                                layout="Text_only"
                                size="small"
                                style="primary"
                              />
                            </th> */}

                            {props.isSwap && (
                              <th>
                                <RdsIcon
                                  name="six_dots_vertical"
                                  height="14px"
                                  width="14px"
                                  stroke={false}
                                  fill={true}
                                  isCursorPointer={true}
                                />
                              </th>
                            )}
                            {props.enablecheckboxselection && (
                              <th scope="row" className="align-middle">
                                <input
                                  type="checkbox"
                                  name={tableDataRow?.id}
                                  onChange={handleChange}
                                  checked={tableDataRow?.selected}
                                  className="form-check-input"
                                  id="rowcheck{user.id}"
                                />
                              </th>
                            )}
                            {props.enableRadioButtonselection && (
                              <th scope="row" className="align-middle">
                                <input
                                  type="radio"
                                  name={tableDataRow?.id}
                                  onChange={handleRadioButtonChange}
                                  checked={tableDataRow?.selected}
                                  className="form-check-input"
                                  id="rowcheck{user.id}"
                                />
                              </th>
                            )}

                            {props.tableHeaders?.map(
                              (tableHeader, tableHeaderIndex) => (
                                <td
                                  key={
                                    "column-" +
                                    tableHeaderIndex +
                                    "-inside-tableRow" +
                                    index
                                  }
                                  className={`px-2 align-middle text-nowrap ${
                                    tableHeader.isBold === true
                                      ? `fw-${tableHeader.fontWeight}`
                                      : ""
                                  }`}
                                >
                                  {!tableDataRow.isEndUserEditing ? (
                                    <div>
                                      {tableHeader.datatype === "text" &&
                                      tableHeaderIndex === 0 &&
                                      props.isClickable ? (
                                        <a
                                          href="#"
                                          onClick={() =>
                                            handleRowClick(tableDataRow.id)
                                          }
                                        >
                                          {tableDataRow[tableHeader.key]}
                                        </a>
                                      ) : (
                                        <>
                                          {tableHeader.datatype === "text" && (
                                            <>
                                              {tableHeader.key.includes(
                                                "time"
                                              ) ||
                                              tableHeader.key.includes(
                                                "Time"
                                              ) ? (
                                                <>
                                                  {`${(
                                                    "0" +
                                                    new Date(
                                                      tableDataRow[
                                                        tableHeader.key
                                                      ]
                                                    ).getDate()
                                                  ).slice(-2)}/${(
                                                    "0" +
                                                    (new Date(
                                                      tableDataRow[
                                                        tableHeader.key
                                                      ]
                                                    ).getMonth() +
                                                      1)
                                                  ).slice(-2)}/${new Date(
                                                    tableDataRow[
                                                      tableHeader.key
                                                    ]
                                                  ).getFullYear()}, ${(
                                                    "0" +
                                                    new Date(
                                                      tableDataRow[
                                                        tableHeader.key
                                                      ]
                                                    ).getHours()
                                                  ).slice(-2)}:${(
                                                    "0" +
                                                    new Date(
                                                      tableDataRow[
                                                        tableHeader.key
                                                      ]
                                                    ).getMinutes()
                                                  ).slice(-2)} ${
                                                    new Date(
                                                      tableDataRow[
                                                        tableHeader.key
                                                      ]
                                                    ).getHours() >= 12
                                                      ? "PM"
                                                      : "AM"
                                                  }`}
                                                </>
                                              ) : (
                                                <>
                                                  {
                                                    tableDataRow[
                                                      tableHeader.key
                                                    ]
                                                  }
                                                </>
                                              )}
                                            </>
                                          )}
                                        </>
                                      )}
                                      {tableHeader.datatype === "date" && (
                                        <span className="d-flex text-truncate">
                                          {new Intl.DateTimeFormat("en-US", {
                                            year: "numeric",
                                            month: "2-digit",
                                            day: "2-digit",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            hour12: true,
                                          }).format(
                                            new Date(
                                              tableDataRow[tableHeader.key]
                                            )
                                          )}
                                        </span>
                                      )}
                                      {/* {tableHeader.datatype === "number" &&
                                        tableDataRow[tableHeader.key]}
                                      {tableHeader.datatype === "badge" && (
                                        <RdsBadge
                                          shape="rectangle"
                                          colorVariant={
                                            tableDataRow[tableHeader.key]
                                              .badgeColorVariant
                                          }
                                          iconName={
                                            tableDataRow[tableHeader.key].icon
                                          }
                                          iconPosition="right"
                                          isIconshow
                                          label={
                                            tableDataRow[tableHeader.key]
                                              .content
                                          }
                                          layout="Text_only"
                                          size="small"
                                          style="primary"
                                        />
                                      )} */}
                                      {tableHeader.datatype === "status" && (
                                        <div className="d-flex align-items-center">
                                          <span>
                                            {tableDataRow[tableHeader.key]}
                                          </span>
                                          {tableDataRow.statusBadges?.map(
                                            (badge: any, index: number) => (
                                              <RdsBadge
                                                key={index}
                                                shape="rectangle"
                                                colorVariant={
                                                  badge.badgeColorVariant
                                                }
                                                iconName={badge.icon}
                                                iconPosition="right"
                                                isIconshow
                                                label={badge.content}
                                                layout="Text_only"
                                                size="small"
                                                style="primary"
                                              />
                                            )
                                          )}
                                        </div>
                                      )}
                                      {tableHeader.datatype === "checkbox" && (
                                        <div className="d-flex align-items-center">
                                          {tableDataRow.checkboxBadges?.map(
                                            (badge: any, index: number) => (
                                              <RdsBadge
                                                key={index}
                                                shape="rectangle"
                                                colorVariant={
                                                  badge.badgeColorVariant
                                                }
                                                iconName={badge.icon}
                                                iconPosition="right"
                                                isIconshow
                                                label={badge.content}
                                                layout="Text_only"
                                                size="small"
                                                style="primary"
                                              />
                                            )
                                          )}
                                          <span className="ms-2">
                                            {tableDataRow[tableHeader.key]}
                                          </span>
                                        </div>
                                      )}
                                      {tableHeader.datatype ===
                                        "avatarTitleInfo" && (
                                        <div className="avatarTitleInfo">
                                          <RdsAvatar
                                            //border="NoBorder"
                                            firstName="Wai"
                                            lastName="Technologies"
                                            profilePic="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp=CAU"
                                            role="Developer"
                                            size={AvatarSize.small}
                                            withProfilePic
                                          />
                                        </div>
                                      )}
                                      {tableHeader.datatype ===
                                        "progressbar" && (
                                        <div>
                                          <RdsProgressBar
                                            colorVariant="primary"
                                            height={4}
                                            progressValues={[]}
                                            progressWidth={70}
                                            role="single"
                                            striped
                                            steps={0}
                                            completedSteps={0}
                                          />
                                          <span>
                                            {tableDataRow[tableHeader.key]}
                                          </span>
                                        </div>
                                      )}

                                      {tableHeader.datatype === "button" &&
                                        tableHeader.key === "delete" && (
                                          <div className="d-flex justify-content-center">
                                            <RdsIcon
                                              name="deleteIcon"
                                              height="16px"
                                              width="16px"
                                              stroke={true}
                                              fill={false}
                                              tooltip={true}
                                              tooltipTitle="Delete"
                                              tooltipPlacement={"top"}
                                              isCursorPointer={true}
                                              onClick={() =>
                                                handleDelete(tableDataRow.id)
                                              }
                                            />
                                          </div>
                                        )}
                                      {tableHeader.datatype ===
                                        "iconAvatarTitle" && (
                                        <div className=" ms-2 justify-content-evenly align-items-center">
                                          <div className="col-1">
                                            <RdsIcon
                                              colorVariant="danger"
                                              height="20px"
                                              isCursorPointer
                                              name="Delete"
                                              stroke
                                              width="20px"
                                            />
                                          </div>
                                          {tableDataRow[tableHeader.key]
                                            .withavatar && (
                                            <div>
                                              <div className="col-5">
                                                <RdsAvatar
                                                  withProfilePic={true}
                                                  profilePic={
                                                    tableDataRow[
                                                      tableHeader.key
                                                    ]?.avatar
                                                  }
                                                />
                                              </div>
                                              <div className="col-6">
                                                <label>
                                                  {
                                                    tableDataRow[
                                                      tableHeader.key
                                                    ].title
                                                  }{" "}
                                                </label>
                                              </div>
                                            </div>
                                          )}
                                        </div>
                                      )}
                                      {tableHeader.datatype === "children" && (
                                        <div className="d-xxl-flex d-xl-flex d-block">
                                          {tableDataRow[tableHeader.key]}
                                        </div>
                                      )}
                                      {tableHeader.datatype === "tooltip" &&
                                        tableDataRow[tableHeader.key] !==
                                          null && (
                                          <RdsTooltip
                                            label={
                                              tableDataRow[tableHeader.key]
                                            }
                                            style={
                                              TooltipStyle.MiddleBottomArrow
                                            }
                                          >
                                            <span className="d-inline-block">
                                              {tableDataRow[
                                                tableHeader.key
                                              ].substring(
                                                0,
                                                tableHeader.dataLength
                                              ) + "..."}
                                            </span>
                                          </RdsTooltip>
                                        )}
                                      {tableHeader.key === "tenant" && (
                                        <div
                                          dangerouslySetInnerHTML={{
                                            __html:
                                              tableDataRow[tableHeader.key],
                                          }}
                                        />
                                      )}
                                    </div>
                                  ) : (
                                    <RdsInput
                                      name={tableHeader.key}
                                      inputType={tableHeader.datatype}
                                      value={tableDataRow[tableHeader.key]}
                                      onChange={(e) => {
                                        onInputChangeHandler(
                                          e,
                                          tableDataRow,
                                          tableHeader,
                                          tableHeader.key,
                                          tableDataRow.id
                                        );
                                      }}
                                    />
                                  )}
                                </td>
                              )
                            )}
                            {actionPosition &&
                              totalActions &&
                              totalActions?.length > 1 && (
                                <td className="align-middle text-center">
                                  {!tableDataRow?.isEndUserEditing ? (
                                    <>
                                      {actionColumnStyle === "show dots" && (
                                        <div className="btn-group dropstart">
                                          <button
                                            className="btn btn-sm btn-icon border-0 three-dot-btn"
                                            type="button"
                                            aria-expanded={
                                              activeDropdownId ===
                                              tableDataRow.id
                                                ? "false"
                                                : "true"
                                            }
                                            onClick={() =>
                                              toggleDropdown(tableDataRow.id)
                                            }
                                            data-bs-toggle="dropdown"
                                            data-bs-auto-close="true"
                                            id="dropdownMenuButton"
                                            data-testid="action-btn"
                                          >
                                            <RdsIcon
                                              name={"three_dots"}
                                              height="14px"
                                              width="14px"
                                              stroke={false}
                                              fill={true}
                                              tooltip={true}
                                              tooltipTitle="More Actions"
                                              tooltipPlacement="top"
                                              isCursorPointer={true}
                                            />
                                          </button>
                                          <ul
                                            ref={dropdownRef}
                                            aria-labelledby="dropdownMenuButton"
                                            className={`dropdown-menu ${
                                              activeDropdownId ===
                                                tableDataRow.id &&
                                              isDropdownOpen
                                                ? "show"
                                                : ""
                                            }`}
                                          >
                                            {totalActions?.map(
                                              (action, actionIndex) => (
                                                <li
                                                  key={
                                                    "action-" +
                                                    actionIndex +
                                                    "-inside-tableRow" +
                                                    tableDataRow.id
                                                  }
                                                >
                                                  {action.modalId && (
                                                    <a
                                                      data-bs-toggle="modal"
                                                      data-bs-target={`#${action?.modalId}`}
                                                      aria-controls={
                                                        action?.modalId
                                                      }
                                                      onClick={(e) =>
                                                        actionOnClickHandler(
                                                          e,
                                                          tableDataRow,
                                                          tableDataRow.id,
                                                          action
                                                        )
                                                      }
                                                      className="dropdown-item"
                                                    >
                                                      {action.displayName}
                                                    </a>
                                                  )}
                                                  {action.offId && (
                                                    <a
                                                      data-bs-toggle="offcanvas"
                                                      data-bs-target={`#${action?.offId}`}
                                                      aria-controls={
                                                        action?.offId
                                                      }
                                                      onClick={(e) =>
                                                        actionOnClickHandler(
                                                          e,
                                                          tableDataRow,
                                                          tableDataRow.id,
                                                          action
                                                        )
                                                      }
                                                      className="dropdown-item"
                                                    >
                                                      {action.displayName}
                                                    </a>
                                                  )}
                                                  {action.offId == undefined &&
                                                    action.modalId ==
                                                      undefined && (
                                                      <a
                                                        onClick={(e) =>
                                                          actionOnClickHandler(
                                                            e,
                                                            tableDataRow,
                                                            tableDataRow.id,
                                                            action
                                                          )
                                                        }
                                                        className="dropdown-item"
                                                      >
                                                        {action.displayName}
                                                      </a>
                                                    )}
                                                </li>
                                              )
                                            )}
                                          </ul>
                                        </div>
                                      )}
                                      <div>
                                        {actionColumnStyle ===
                                          "show buttons directly" && (
                                          <div
                                            className="d-flex align-items-center justify-content-center mx-1"
                                            id="action_column"
                                          >
                                            {totalActions?.map(
                                              (action, actionIndex) => (
                                                <button
                                                  key={
                                                    "action-" +
                                                    actionIndex +
                                                    "-inside-tableRow" +
                                                    tableDataRow.id
                                                  }
                                                  className="btn btn-outline-primary mx-1 my-1"
                                                >
                                                  {action.modalId && (
                                                    <a
                                                      data-bs-toggle="modal"
                                                      data-bs-target={`#${action?.modalId}`}
                                                      aria-controls={
                                                        action?.modalId
                                                      }
                                                      onClick={(e) =>
                                                        actionOnClickHandler(
                                                          e,
                                                          tableDataRow,
                                                          tableDataRow.id,
                                                          action
                                                        )
                                                      }
                                                      className="dropdown-item"
                                                    >
                                                      {action.displayName}
                                                    </a>
                                                  )}
                                                  {action.offId && (
                                                    <a
                                                      data-bs-toggle="offcanvas"
                                                      data-bs-target={`#${action?.offId}`}
                                                      aria-controls={
                                                        action?.offId
                                                      }
                                                      onClick={(e) =>
                                                        actionOnClickHandler(
                                                          e,
                                                          tableDataRow,
                                                          tableDataRow.id,
                                                          action
                                                        )
                                                      }
                                                      className="dropdown-item"
                                                    >
                                                      {action.displayName}
                                                    </a>
                                                  )}
                                                  {action.offId == undefined &&
                                                    action.modalId ==
                                                      undefined && (
                                                      <a
                                                        onClick={(e) =>
                                                          actionOnClickHandler(
                                                            e,
                                                            tableDataRow,
                                                            tableDataRow.id,
                                                            action
                                                          )
                                                        }
                                                        className="dropdown-item"
                                                      >
                                                        {action.displayName}
                                                      </a>
                                                    )}
                                                </button>
                                              )
                                            )}
                                          </div>
                                        )}
                                      </div>
                                    </>
                                  ) : (
                                    <div className="d-flex justify-content-center align-items-center w-60px">
                                      <RdsButton
                                        class="action"
                                        colorVariant="primary"
                                        size="medium"
                                        tooltipTitle={""}
                                        type={"button"}
                                        onClick={(e) => {
                                          onEditCheck(
                                            e,
                                            tableDataRow,
                                            tableDataRow.id
                                          );
                                        }}
                                      >
                                        <RdsIcon
                                          name={"check"}
                                          height="14px"
                                          width="14px"
                                          stroke={true}
                                          fill={false}
                                          isCursorPointer={true}
                                        />
                                      </RdsButton>
                                      <RdsButton
                                        class="ms-2 text-white"
                                        colorVariant="danger"
                                        tooltipPlacement={
                                          TooltipStyle.MiddleBottomArrow
                                        }
                                        size="medium"
                                        tooltipTitle={""}
                                        type={"button"}
                                        onClick={(e) => {
                                          onEditClose(
                                            e,
                                            tableDataRow,
                                            tableDataRow.id
                                          );
                                        }}
                                      >
                                        <RdsIcon
                                          name={"close"}
                                          height="14px"
                                          width="14px"
                                          stroke={true}
                                          fill={true}
                                          isCursorPointer={true}
                                        />
                                      </RdsButton>
                                    </div>
                                  )}
                                </td>
                              )}
                            {actionPosition &&
                              totalActions &&
                              totalActions?.length == 1 && (
                                <td className="px-2 align-middle">
                                  <div className="d-grid justify-content-center">
                                    {totalActions?.map(
                                      (action, actionIndex) => (
                                        <>
                                          <RdsIcon
                                            key={
                                              "action-" +
                                              actionIndex +
                                              "-inside-tableRow" +
                                              index
                                            }
                                            name={action.icon || action.id}
                                            height="16px"
                                            width="16px"
                                            stroke={true}
                                            fill={false}
                                            tooltip={true}
                                            tooltipTitle={action.displayName}
                                            tooltipPlacement={"top"}
                                            isCursorPointer={true}
                                            databstoggle={
                                              action.offId
                                                ? "offcanvas"
                                                : action.modalId
                                                ? "modal"
                                                : ""
                                            }
                                            databstarget={
                                              action.offId
                                                ? `#${action?.offId}`
                                                : action.modalId
                                                ? `#${action?.modalId}`
                                                : ""
                                            }
                                            ariacontrols={action?.offId}
                                            onClick={(e) => {
                                              actionOnClickHandler(
                                                e,
                                                tableDataRow,
                                                tableDataRow.id,
                                                action
                                              );
                                            }}
                                          />
                                        </>
                                      )
                                    )}
                                  </div>
                                </td>
                              )}
                          </tr>
                        )
                      );
                    })}
                </tbody>
              </table>
              <div className="ps-3 ms-1">
                <RdsIcon
                  colorVariant="dark"
                  isCursorPointer
                  name="with_border_plus"
                />
              </div>
            </div>
          </div>
          {props.pagination && (
            <div className=" d-flex justify-content-end pt-3">
              <RdsPagination
                totalRecords={
                  totalRecords ? totalRecords : props.tableData?.length
                }
                recordsPerPage={
                  props.recordsPerPage ? props.recordsPerPage : 10
                }
                onPageChange={onPageChangeHandler}
                paginationType={
                  props.recordsPerPageSelectListOption ? "default" : "advanced"
                }
              ></RdsPagination>
            </div>
          )}
        </>
      )}
    </>
  );
};
export default RdsCompGrid;

// import React, { useEffect, useRef, useState } from "react";
// import { DndProvider, DragSourceMonitor, useDrag, useDrop } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";
// import "./rds-comp-grid.css";
// import { RdsBadge, RdsIcon, RdsPagination, RdsSearch } from "../rds-elements";
// import { ResizableBox } from "react-resizable";
// import "react-resizable/css/styles.css"; // Import the styles for resizable

// export interface RdsCompGridCombinedProps {
//   tableHeaders: {
//     key: string;
//     label: string;
//     displayName: string;
//     hasSearch?: boolean;
//     filter?: boolean;
//     wraptext?: boolean;
//     sortable?: boolean;
//     datatype?: string;
//     dataLength?: number;
//     hidden?: boolean;
//     fixed?: boolean;
//     frozen?: boolean;
//   }[];
//   tableData: {
//     id: string | number;
//     [key: string]: any;
//   }[];
//   allSearch?: boolean;
//   allFilter?: boolean;
//   recordsPerPage?: number;
//   recordsPerPageSelectListOption?: boolean;
//   pagination: boolean;
//   onPaginationHandler?: (currentPage: number, recordsPerPage: number) => void;
//   totalRecords?: any;
//   actions?: {
//     displayName: string;
//     id: string;
//     offId?: string;
//     modalId?: string;
//   }[];
//   actionPosition?: "right" | "left";
//   onActionSelection?: (rowData: any, actionId: any) => void;
//   enablecheckboxselection?: boolean;
//   onRowSelect?: (data: any) => void;
//   gridType?: string;
// }

// const DraggableColumnHeader: React.FC<{
//   column: {
//     sortable: React.JSX.Element;
//     displayName: string;
//     key: string;
//     hasSearch?: boolean;
//     filter?: boolean;
//     hidden?: boolean;
//     fixed?: boolean;
//     frozen?: boolean;
//   };
//   index: number;
//   moveColumn: (fromIndex: number, toIndex: number) => void;
//   onLeftPin: (key: string) => void;
//   onRightPin: (key: string) => void;
//   onNoPin: (key: string) => void;
//   hasSearch?: boolean;
//   filter?: boolean;
//   onSearchChange?: (key: string, value: string) => void;
//   onFilterClick?: (key: string, position: DOMRect) => void;
//   allSearch?: boolean;
//   allFilter?: boolean;
//   onSortClick?: (key: string) => void;
//   sortConfig?: { key: string; direction: "asc" | "desc" } | null;
//   data: any[];
//   onToggleFixed: (key: string) => void;
//   onToggleFrozen: (key: string) => void;
//   onToggleHidden: (key: string) => void;
//   gridType?: string|undefined;
// }> = ({
//   column,
//   index,
//   moveColumn,
//   onLeftPin,
//   onRightPin,
//   onNoPin,
//   hasSearch,
//   filter,
//   onSearchChange,
//   onFilterClick,
//   allSearch,
//   allFilter,
//   onSortClick,
//   sortConfig,
//   data,
//   onToggleFixed,
//   onToggleFrozen,
//   onToggleHidden,
//   gridType,
// }) => {
//   const refheader = useRef<HTMLTableHeaderCellElement>(null);
//   const [resizeStop, setResizeStop] = useState(true);
//   const [isResizing, setIsResizing] = useState(false);
//   const [isPopUpOpen, setIsPopUpOpen] = useState(false);
//   const [selectedOption, setSelectedOption] = useState('No Pin');
//   const pinOptions = ['No Pin', 'Pin Left', 'Pin Right'];
//   const popupRef = useRef<HTMLDivElement>(null);
//   const [{ isDragging }, drag, preview] = useDrag({
//     type: "COLUMN",
//     item: { index },
//     collect: (monitor: DragSourceMonitor) => ({
//       isDragging: monitor.isDragging(),
//     }),
//     canDrag: () => !isResizing, // Disable drag while resizing
//   });

//   const [, drop] = useDrop({
//     accept: "COLUMN",
//     hover(item: { index: number }) {
//       if (item.index !== index) {
//         if (resizeStop == true) {
//           moveColumn(item.index, index);
//           item.index = index;
//         }
//       }
//     },
//   });

//   useEffect(() => {
//     if (!isResizing) {
//       drag(drop(refheader));
//     }
//   }, [isResizing, drag, drop]);

//   const handleSortIconClick = () => {
//     if (onSortClick) {
//       onSortClick(column.key);
//     }
//   };

//   const handleFilterIconClick = () => {
//     if (refheader.current && onFilterClick) {
//       const position = refheader.current.getBoundingClientRect();
//       onFilterClick(column.key, position);
//     }
//   };

//   const handleResizeStop = (event: any, { size }: any) => {
//     setResizeStop(true);
//     setIsResizing(false);
//   };

//   const handleResizeStart = (event: any, { size }: any) => {
//     setResizeStop(false);
//     setIsResizing(true);
//   };

//   const togglePopup = () => {
//     setIsPopUpOpen(!isPopUpOpen);
//   };

//   const popUpOptionClick = (value : string) => {
//     setSelectedOption(value);
//     if(value == 'Pin Left'){
//       onLeftPin(column.key);
//     }
//     else if(value == 'Pin Right'){
//       onRightPin(column.key);
//     }
//     else if(value == 'No Pin'){
//       onNoPin(column.key);
//     }
//     setIsPopUpOpen(!isPopUpOpen);
//   }

//   const handleClickOutside = (event: MouseEvent) => {
//     if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
//       setIsPopUpOpen(false);
//     }
//   };

//   useEffect(() => {
//     if (isPopUpOpen) {
//       document.addEventListener('mousedown', handleClickOutside);
//     } else {
//       document.removeEventListener('mousedown', handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [isPopUpOpen]);

//   const hasData = data.some(row => row[column.key] !== undefined && row[column.key] !== null);

//   if (column.hidden) {
//     return null; // Do not render hidden columns
//   }

//   return (
//     <th
//       className={`text-nowrap ${isDragging ? 'dragging' : 'not-dragging'} ${column.fixed ? "fixed-auto" : ""} ${column.frozen ? "frozen-auto" : ""}`}
//       ref={refheader}

//     >
//       <div className="d-flex justify-content-start align-items-center full-width">
//         <span>{column.displayName}</span>
//         {column.sortable && (
//           <div className="cursor-pointer sorting-alignment" onClick={handleSortIconClick}>
//             {sortConfig && sortConfig.key === column.key
//               ? sortConfig.direction === "asc"
//                 ? "▲"
//                 : "▼"
//               : "↕"}
//           </div>
//         )}
//         {gridType === "advance" && ( <>
//         <button onClick={() => onToggleFixed(column.key)} className="btn btn-sm btn-icon ms-1">

//           <RdsIcon
//             name={column.fixed ? "fixed_unlock" : "fixed_lock"}
//             width="20px"
//             height="20px"
//             tooltip={true}
//             tooltipTitle="Toggle Fixed"
//             tooltipPlacement="bottom"
//             fill={false}
//             stroke={true}
//             opacity="0.7"
//           />
//         </button>
//         {/* <button onClick={() => onToggleFrozen(column.key)} className="btn btn-sm btn-icon ms-1">
//           <RdsIcon
//             name={"arrow_left"}
//             width="16px"
//             height="16px"
//             fill={false}
//             stroke={true}
//             opacity="0.7"
//           />
//         </button> */}
//         <button onClick={() => onToggleHidden(column.key)} className="btn btn-sm btn-icon ms-1">
//           <RdsIcon
//             name="eye_slash"
//             width="20px"
//             height="20px"
//             fill={false}
//             stroke={true}
//             opacity="0.7"
//             tooltip={true}
//             tooltipTitle="Hide Column"
//             tooltipPlacement="bottom"
//           />
//         </button>
//         <div>
//           <button onClick={togglePopup} className="btn btn-sm btn-icon ms-1">
//             <RdsIcon
//               name="three_dots"
//               width="20px"
//               height="20px"
//               fill={false}
//               stroke={true}
//               opacity="0.7"
//               tooltip={true}
//               tooltipTitle="Hide Column"
//               tooltipPlacement="bottom"
//             />
//           </button>
//           {isPopUpOpen && (
//             <div className="list-popup" ref={popupRef} >
//               <ul className="list-popup-ul">
//                 {pinOptions.map((option, index) => (
//                   <li className="pb-2" key={index}>
//                     <label className="list-popup-li">
//                       <input
//                         type="checkbox"
//                         className="form-check-input"
//                         checked={selectedOption === option}
//                         onChange={() => popUpOptionClick(option)}
//                         style={{ marginRight: '10px' }}
//                       />
//                       <span>{option}</span>
//                     </label>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </div>
//         </>)}
//         {(column.filter || allFilter) && hasData && (
//           <div className="cursor-pointer">
//             <RdsIcon
//               colorVariant="dark"
//               height="10px"
//               name="filter"
//               stroke
//               width="20px"
//               onClick={handleFilterIconClick}
//             />
//           </div>
//         )}

//         <ResizableBox
//           className="text-end"
//           width={10} // Initial width of the column header
//           height={20} // Height of the column header
//           axis="x"
//           resizeHandles={["e"]}
//           minConstraints={[50, Infinity]} // Minimum width the column can resize to
//           maxConstraints={[400, Infinity]} // Maximum width the column can resize to
//           onResizeStop={handleResizeStop}
//           onResizeStart={handleResizeStart}
//         ></ResizableBox>
//       </div>

//       <div className="d-flex justify-content-between align-items-center full-width">
//         {(column.hasSearch || allSearch) && (
//           <RdsSearch
//             labelPosition="top"
//             placeholder="Search"
//             size="small"
//             onChange={(e) =>
//               onSearchChange && onSearchChange(column.key, e.target.value)
//             }
//           />
//         )}
//       </div>
//     </th>
//   );
// };
// const RdsCompGrid = ( props: RdsCompGridCombinedProps ) => {
//   const [searchTexts, setSearchTexts] = useState<{ [key: string]: string }>({});
//   const [columns, setColumns] = useState(props.tableHeaders);
//   const [fixedcolumns, setFixedColumns] = useState(props.tableHeaders);
//   const [totalData, setTotalData] = useState(props.tableData);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState(
//     props.recordsPerPage ? props.recordsPerPage : 10
//   );
//   const [sortConfig, setSortConfig] = useState<{
//     key: string;
//     direction: "asc" | "desc";
//   } | null>(null);
//   const [totalRecords, setTotalRecords] = useState<any>(props.totalRecords);
//   const actionPosition =
//     Object.prototype.hasOwnProperty.call(props, "actionPosition") &&
//     props.actionPosition === "right"
//       ? true
//       : false;
//   const [activeDropdownId, setActiveDropdownId] = useState(null);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const dropdownRef = useRef<HTMLUListElement>(null);
//   const [array, setArray] = useState<boolean[]>([]);
//   const [data, setData] = useState(props.tableData);
//   const [leftPinColumn, setLeftPinColumn] = useState<string[]>([]);
//   const [rightPinColumn, setRightPinColumn] = useState<string[]>([]);
//   const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
//   useEffect(() => {
//     if (props.gridType === "advance") {
//       const paginatedData = getSortedData(
//         selectedFilters ? filteredData : totalData,
//         sortConfig,
//         currentPage
//       );
//       setData(paginatedData);
//     } else {
//       setData(totalData);
//     }
//   }, [totalData, sortConfig, currentPage, rowsPerPage, props.gridType]);

//   const moveColumn = (fromIndex: number, toIndex: number) => {
//     const updatedColumns = [...columns];
//     const [removed] = updatedColumns.splice(fromIndex, 1);
//     updatedColumns.splice(toIndex, 0, removed);
//     setColumns(updatedColumns);
//   };

//   const onLeftPin = (key: string) => {
//     if(!leftPinColumn.includes(key)){
//       const currentKeyIndex = columns.findIndex(item => item['key'] == key);
//       moveColumn(currentKeyIndex, leftPinColumn.length);
//       setRightPinColumn(rightPinColumn.filter(element => element !== key));
//       setLeftPinColumn([...leftPinColumn, key]);
//     }
//   }

//   const onRightPin = (key: string) => {
//     if(!rightPinColumn.includes(key)){
//       const currentKeyIndex = columns.findIndex(item => item['key'] == key);
//       moveColumn(currentKeyIndex, columns.length - 1);
//       setLeftPinColumn(leftPinColumn.filter(element => element !== key));
//       setRightPinColumn([...rightPinColumn, key]);
//     }
//   }

//   const onNoPin = (key: string) => {
//     if(leftPinColumn.includes(key)){
//     const currentKeyIndex = columns.findIndex(item => item['key'] == key);
//     const InitialKeyIndex = fixedcolumns.findIndex(item => item['key'] == key);
//     moveColumn(currentKeyIndex, (leftPinColumn.length -1) + (InitialKeyIndex));
//     setLeftPinColumn(leftPinColumn.filter(element => element !== key));
//     setRightPinColumn(rightPinColumn.filter(element => element !== key));
//     }
//     else if(rightPinColumn.includes(key)) {
//     const currentKeyIndex = columns.findIndex(item => item['key'] == key);
//     const InitialKeyIndex = fixedcolumns.findIndex(item => item['key'] == key);
//     moveColumn(currentKeyIndex, (leftPinColumn.length) + (InitialKeyIndex));
//     setLeftPinColumn(leftPinColumn.filter(element => element !== key));
//     setRightPinColumn(rightPinColumn.filter(element => element !== key));
//     }
//   }

//   const handleSearchChange = (key: string, value: string) => {
//     setSearchTexts((prev) => ({ ...prev, [key]: value }));
//     const filteredData = props.tableData.filter((row) =>
//       row[key].toString().toLowerCase().includes(value.toLowerCase())
//     );
//     setTotalData(filteredData);
//     if(props.gridType == "advance"){
//       setData(filteredData);
//     }
//   };

//   const [popupData, setPopupData] = useState<any[]>([]);
//   const [popupVisible, setPopupVisible] = useState<boolean>(false);
//   const [popupPosition, setPopupPosition] = useState<{
//     top: number;
//     left: number;
//   }>({ top: 0, left: 0 });
//   const [popupColumnKey, setPopupColumnKey] = useState<string | null>(null);
//   const [selectedFilters, setSelectedFilters] = useState<{
//     [key: string]: Set<string>;
//   }>({});

//   const handleFilterClick = (key: string, position: DOMRect) => {
//     const distinctData = Array.from(
//       new Set(props.tableData.map((row) => row[key]))
//     );
//     setPopupData(distinctData);
//     setPopupVisible(true);
//     setPopupColumnKey(key);
//     const width = position.width;
//     const lastColumnKey = columns[columns.length - 1];

//     if (lastColumnKey.key !== key) {
//       setPopupPosition({
//         top: position.bottom,
//         left: position.left + width - 20,
//       });
//     } else {
//       setPopupPosition({ top: position.bottom, left: position.left + 12 });
//     }
//   };

//   const handleClosePopup = () => {
//     setPopupVisible(false);
//   };

//   const handleFilterChange = (value: string, checked: boolean) => {
//     setSelectedFilters((prev) => {
//       const newFilters = { ...prev };
//       if (!newFilters[popupColumnKey!]) {
//         newFilters[popupColumnKey!] = new Set();
//       }
//       if (checked) {
//         newFilters[popupColumnKey!].add(value);
//       } else {
//         newFilters[popupColumnKey!].delete(value);
//       }

//       const filteredData = props.tableData.filter((row) => {
//         return (
//           Object.entries(searchTexts).every(([key, value]) =>
//             row[key].toString().toLowerCase().includes(value.toLowerCase())
//           ) &&
//           Object.entries({ ...newFilters }).every(([key, values]) => {
//             if (values.size === 0) return true;
//             return values.has(row[key]);
//           })
//         );
//       });

//       setTotalData(filteredData);
//       if (props.gridType === "advance") {
//         setData(filteredData);
//       }

//       return newFilters;
//     });
//   };

//   const getSortedData = (
//     data: any[],
//     config: { key: string; direction: "asc" | "desc" } | null,
//     currentPage: any
//   ) => {
//     let startingIndex = 0;
//     if (currentPage === 1) {
//       startingIndex = 0;
//     } else {
//       startingIndex = (currentPage - 1) * rowsPerPage;
//     }

//     if (!config) return data.slice(startingIndex, rowsPerPage * currentPage);

//     return [...data]
//       .sort((a, b) => {
//         if (a[config.key] < b[config.key]) {
//           return config.direction === "asc" ? -1 : 1;
//         }
//         if (a[config.key] > b[config.key]) {
//           return config.direction === "asc" ? 1 : -1;
//         }
//         return 0;
//       })
//       .slice(startingIndex, rowsPerPage * currentPage);
//   };

//   const filteredData = props.tableData.filter((row) => {
//     return (
//       Object.entries(searchTexts).every(([key, value]) =>
//         row[key].toString().toLowerCase().includes(value.toLowerCase())
//       ) &&
//       Object.entries(selectedFilters).every(([key, values]) => {
//         if (values.size === 0) return true;
//         return values.has(row[key]);
//       })
//     );
//   });

//   const sortedData = getSortedData(
//     selectedFilters ? filteredData : totalData,
//     sortConfig,
//     currentPage
//   );

//   const handleSortClick = (key: string) => {
//     let direction: "asc" | "desc" = "asc";
//     if (
//       sortConfig &&
//       sortConfig.key === key &&
//       sortConfig.direction === "asc"
//     ) {
//       direction = "desc";
//     }
//     setSortConfig({ key, direction });
//     if(props.gridType == "advance"){
//       setData(sortedData);
//     }
//   };

//   const [rowStatus, setRowStatus] = useState({
//     startingRow: 0,
//     endingRow: props.recordsPerPage,
//   });

//   const onPageChangeHandler = (currentPage: number, recordsPerPage: number) => {
//     props.onPaginationHandler &&
//       props.onPaginationHandler(currentPage, recordsPerPage);
//     setCurrentPage(currentPage);
//     setRowsPerPage(recordsPerPage);

//     if (props.gridType === "advance") {
//       const paginatedData = getSortedData(
//         selectedFilters ? filteredData : totalData,
//         sortConfig,
//         currentPage
//       );
//       setData(paginatedData);
//     }
//   };

//   useEffect(() => {
//     setTotalRecords(props.totalRecords);
//   }, [props.totalRecords]);

//   const resetGrid = () => {
//     setSortConfig(null);
//     setTotalData(props.tableData); // Reset data to original
//     setSearchTexts({}); // Reset search texts
//     setSelectedFilters({}); // Reset filters
//     setCurrentPage(1); // Reset to the first page
//   };

//   const toggleDropdown = (id: any) => {
//     setIsDropdownOpen(id === activeDropdownId ? !isDropdownOpen : true);
//     setActiveDropdownId(id);
//   };

//   useEffect(() => {
//     function handleClickOutside(event: any) {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsDropdownOpen(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [dropdownRef]);

//   const actionOnClickHandler = (
//     clickEvent: any,
//     tableDataRow: any,
//     tableDataRowIndex: number,
//     action: {
//       displayName: string;
//       id: string;
//       offId?: string;
//       modalId?: string;
//     }
//   ) => {
//     const allBackdrops = document.querySelectorAll(
//       ".offcanvas-backdrop, .modal-backdrop"
//     );
//     if (allBackdrops.length > 1) {
//       for (let i = 0; i < allBackdrops.length - 1; i++) {
//         allBackdrops[i].remove();
//       }
//     }

//     const tempArray: boolean[] = [];
//     array.map((res: any) => {
//       tempArray.push(false);
//     });
//     setArray(tempArray);
//     if (
//       action.id == "edit" &&
//       action.offId != undefined &&
//       action.modalId != undefined
//     ) {
//       const tempData = data?.map((Data) => {
//         if (Data.id == tableDataRowIndex) {
//           return { ...Data, isEndUserEditing: true };
//         } else {
//           return { ...Data };
//         }
//       });
//       setData(tempData);
//     }
//     props.onActionSelection != undefined &&
//       props.onActionSelection(tableDataRow, action.id);
//   };

//   const handleChange = ( e: any, rowIndex: number ) => {
//     const { checked } = e.target;
//     setSelectedRows((prevSelectedRows) => {
//       const newSelectedRows = new Set(prevSelectedRows);
//       if (rowIndex === -1) {
//         // "Select All" checkbox
//         if (checked) {
//           props.tableData.forEach((_, index) => newSelectedRows.add(index));
//         } else {
//           newSelectedRows.clear();
//         }
//       } else {
//         // Individual checkbox
//         if (checked) {
//           newSelectedRows.add(rowIndex);
//         } else {
//           newSelectedRows.delete(rowIndex);
//         }
//       }
//       return newSelectedRows;
//     });
//   };

// const Popup: React.FC<{
//   data: any[];
//   onClose: () => void;
//   onFilterChange: (value: string, checked: boolean) => void;
//   selectedValues: Set<string>;
//   position: { top: number; left: number };
// }> = ({ data, onClose, onFilterChange, selectedValues, position }) => {
//   return (
//     <div className="popup" style={{ top: position.top, left: position.left }}>
//       <div className="popup-content">
//         <div className="d-flex justify-content-end ">
//          <span className="cursor-pointer"> <RdsIcon
//             colorVariant="dark"
//             height="10px"
//             name="cancel"
//             stroke
//             width="10px"
//             onClick={onClose}
//           /></span>
//         </div>
//         {data.map((item, index) => (
//           <div key={index} className="cursor-pointer d-flex align-items-center ps-2">
//             <input
//               type="checkbox"
//               id={`checkbox-${index}`}
//               checked={selectedValues.has(item)}
//               onChange={(e) => onFilterChange(item, e.target.checked)}
//             />
//             <label className="ms-2" htmlFor={`checkbox-${index}`}>{item}</label>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };
// const DraggableRow: React.FC<{
//   row: any;
//   index: number;
//   moveRow: (fromIndex: number, toIndex: number) => void;
//   children: React.ReactNode;
// }> = ({ row, index, moveRow, children }) => {
//   const ref = useRef<HTMLTableRowElement>(null);
//   const [, drop] = useDrop({
//     accept: "ROW",
//     hover(item: { index: number }) {
//       if (item.index !== index) {
//         moveRow(item.index, index);
//         item.index = index;
//       }
//     },
//   });

//   const [{ isDragging }, drag] = useDrag({
//     type: "ROW",
//     item: { index },
//     collect: (monitor: DragSourceMonitor) => ({
//       isDragging: monitor.isDragging(),
//     }),
//   });

//   drag(drop(ref));

//   return (
//     <tr ref={ref} style={{ opacity: isDragging ? 0.5 : 1 }}>
//       {children}
//     </tr>
//   );
// };
// const moveRow = (fromIndex: number, toIndex: number) => {
//   const updatedData = [...data];
//   const [removed] = updatedData.splice(fromIndex, 1);
//   updatedData.splice(toIndex, 0, removed);
//   setData(updatedData);
// };
// const handleToggleFixed = (key: string) => {
//   setColumns((prevColumns) =>
//     prevColumns.map((col) =>
//       col.key === key ? { ...col, fixed: !col.fixed } : col
//     )
//   );
// };

// const handleToggleFrozen = (key: string) => {
//   setColumns((prevColumns) =>
//     prevColumns.map((col) =>
//       col.key === key ? { ...col, frozen: !col.frozen } : col
//     )
//   );
// };

// const handleToggleHidden = (key: string) => {
//   setColumns((prevColumns) => {
//     const updatedColumns = prevColumns.map((col) =>
//       col.key === key ? { ...col, hidden: !col.hidden } : col
//     );

//     // Recalculate left positions
//     let left = 0;
//     return updatedColumns.map((column) => {
//       const newColumn = { ...column, left };
//       if (column.fixed && !column.hidden) {
//         left += 100; // Assuming each column has a fixed width of 100px
//       }
//       return newColumn;
//     });
//   });
// };

// const calculateLeftPositions = () => {
//   let left = 0;
//   return columns.map((column, index) => {
//     const newColumn = { ...column, left };
//     if (column.fixed && !column.hidden) {
//       left += 100; // Assuming each column has a fixed width of 100px
//     }
//     return newColumn;
//   });
// };

// const updatedColumns = calculateLeftPositions();

//   return (
//     <DndProvider backend={HTML5Backend}>
//    {props.gridType != "advance" &&(   <div
//         className={
//           props.actionPosition == "left"
//             ? "table-responsive"
//             : "table-responsive-none"
//         }
//       >
//         <div className="table-responsive-sm">
//           <table className={`table table-hover table-bordered grid-table`} id="grid">
//             <thead className="text-nowrap">
//               <tr className="align-top">
//                 {actionPosition != true &&
//                   props.tableHeaders &&
//                   props.tableHeaders?.length > 0 &&
//                   props.actions &&
//                   props.actions?.length > 0 && (
//                     <th className="text-center fw-medium">Actions</th>
//                   )}

//                 {props.enablecheckboxselection && (
//                   <th scope="col">
//                     <input
//                       type="checkbox"
//                       className="form-check-input"
//                       name="allSelect"
//                       onChange={(e) => handleChange(e, -1)}
//                       checked={selectedRows.size === props.tableData.length}
//                     />
//                   </th>
//                 )}

//                 {columns.map((column, index) => (
//                   <DraggableColumnHeader
//                     key={column.key}
//                     column={{
//                       ...column,
//                       sortable: <></> // Replace undefined with an empty React element
//                     }}
//                     index={index}
//                     moveColumn={moveColumn}
//                     onLeftPin={onLeftPin}
//                     onRightPin={onRightPin}
//                     onNoPin={onNoPin}
//                     onSearchChange={handleSearchChange}
//                     onFilterClick={handleFilterClick}
//                     onSortClick={handleSortClick}
//                     sortConfig={sortConfig}
//                     allSearch={props.allSearch}
//                     allFilter={props.allFilter}
//                     data={data}
//                     onToggleFixed={handleToggleFixed}
//                     onToggleFrozen={handleToggleFrozen}
//                     onToggleHidden={handleToggleHidden}
//                   />
//                 ))}

//                 {actionPosition &&
//                   props.tableHeaders &&
//                   props.tableHeaders?.length > 0 &&
//                   props.actions &&
//                   props.actions?.length > 0 && (
//                     <th className="text-center fw-medium">Actions</th>
//                   )}
//               </tr>
//             </thead>

//             <tbody>
//               {/* Render table rows using the reordered columns */}
//               {sortedData.map((row, rowIndex) => (
//                 <tr key={row.id}>
//                   {actionPosition != true &&
//                     props.tableHeaders &&
//                     props.tableHeaders?.length > 0 &&
//                     props.actions &&
//                     props.actions?.length > 0 && (
//                       <td className="text-center fw-medium">
//                         <>
//                           <div className="btn-group dropstart">
//                             <button
//                               className="btn btn-sm btn-icon border-0 three-dot-btn"
//                               type="button"
//                               aria-expanded={ activeDropdownId === row.id ? "true" : "false" }
//                               onClick={() => toggleDropdown(row.id)}
//                               data-bs-toggle="dropdown"
//                               data-bs-auto-close="true"
//                               id="dropdownMenuButton"
//                               data-testid="action-btn"
//                             >
//                               <RdsIcon
//                                 name={"three_dots"}
//                                 height="14px"
//                                 width="14px"
//                                 stroke={false}
//                                 fill={true}
//                                 tooltip={true}
//                                 tooltipTitle="More Actions"
//                                 tooltipPlacement="top"
//                               />
//                             </button>
//                             <ul
//                               ref={dropdownRef}
//                               aria-labelledby="dropdownMenuButton"
//                               className={`dropdown-menu dropdown-adjusted ${ activeDropdownId === row.id && isDropdownOpen ? "show" : "" }`}
//                             >
//                               {props.actions.map((action, actionIndex) => (
//                                 <li key={"action-" + actionIndex + "-inside-tableRow" + row.id } >
//                                   {action.modalId && (
//                                     <a
//                                       data-bs-toggle="modal"
//                                       data-bs-target={`#${action?.modalId}`}
//                                       aria-controls={action?.modalId}
//                                       onClick={(e) => actionOnClickHandler( e, row, Number(row.id), action )}
//                                       className="dropdown-item"
//                                     >
//                                       {action.displayName}
//                                     </a>
//                                   )}
//                                   {action.offId && (
//                                     <a
//                                       data-bs-toggle="offcanvas"
//                                       data-bs-target={`#${action?.offId}`}
//                                       aria-controls={action?.offId}
//                                       onClick={(e) => actionOnClickHandler( e, row, Number(row.id), action ) }
//                                       className="dropdown-item"
//                                     >
//                                       {action.displayName}
//                                     </a>
//                                   )}
//                                   {action.offId == undefined && action.modalId == undefined && (
//                                       <a
//                                         onClick={(e) => actionOnClickHandler( e, row, Number(row.id), action ) }
//                                         className="dropdown-item"
//                                       >
//                                         {action.displayName}
//                                       </a>
//                                     )}
//                                 </li>
//                               ))}
//                             </ul>
//                           </div>
//                         </>
//                       </td>
//                     )}

//                   {props.enablecheckboxselection && (
//                     <th scope="row" className="align-middle">
//                       <input
//                         type="checkbox"
//                         name={row ? rowIndex.toString() : ""}
//                         checked={selectedRows.has(rowIndex)}
//                         onChange={(e) => handleChange(e, rowIndex)}
//                         className="form-check-input"
//                         id="rowcheck{user.id}"
//                       />
//                     </th>
//                   )}

//                   {columns.map((column) => (
//                     <td
//                       className={`px-2 align-middle fw-medium ${ column.wraptext ? "wrap-text" : "text-nowrap" }`}
//                       key={column.key}
//                     >
//                       {column.datatype === "badge" ? (
//                         <RdsBadge
//                           colorVariant={ row[column.key]?.badgeColorVariant || "success" }
//                           label={row[column.key]?.content || row[column.key]}
//                         />
//                       ) : (
//                         row[column.key]
//                       )}
//                     </td>
//                   ))}

//                   {actionPosition &&
//                     props.tableHeaders &&
//                     props.tableHeaders?.length > 0 &&
//                     props.actions &&
//                     props.actions?.length > 0 && (
//                       <td className="text-center fw-medium">
//                         <>
//                           <div className="btn-group dropstart">
//                             <button
//                               className="btn btn-sm btn-icon border-0 three-dot-btn"
//                               type="button"
//                               aria-expanded={ activeDropdownId === row.id ? "true" : "false" }
//                               onClick={() => toggleDropdown(row.id)}
//                               data-bs-toggle="dropdown"
//                               data-bs-auto-close="true"
//                               id="dropdownMenuButton"
//                               data-testid="action-btn"
//                             >
//                               <RdsIcon
//                                 name={"three_dots"}
//                                 height="14px"
//                                 width="14px"
//                                 stroke={false}
//                                 fill={true}
//                                 tooltip={true}
//                                 tooltipTitle="More Actions"
//                                 tooltipPlacement="top"
//                               />
//                             </button>
//                             <ul
//                               ref={dropdownRef}
//                               aria-labelledby="dropdownMenuButton"
//                               className={`dropdown-menu dropdown-adjusted ${ activeDropdownId === row.id && isDropdownOpen ? "show" : "" }`}
//                             >
//                               {props.actions.map((action, actionIndex) => (
//                                 <li
//                                   key={ "action-" + actionIndex + "-inside-tableRow" + row.id } >
//                                   {action.modalId && (
//                                     <a
//                                       data-bs-toggle="modal"
//                                       data-bs-target={`#${action?.modalId}`}
//                                       aria-controls={action?.modalId}
//                                       onClick={(e) => actionOnClickHandler( e, row, Number(row.id), action ) }
//                                       className="dropdown-item"
//                                     >
//                                       {action.displayName}
//                                     </a>
//                                   )}
//                                   {action.offId && (
//                                     <a
//                                       data-bs-toggle="offcanvas"
//                                       data-bs-target={`#${action?.offId}`}
//                                       aria-controls={action?.offId}
//                                       onClick={(e) => actionOnClickHandler( e, row, Number(row.id), action ) }
//                                       className="dropdown-item"
//                                     >
//                                       {action.displayName}
//                                     </a>
//                                   )}
//                                   {action.offId == undefined &&
//                                     action.modalId == undefined && (
//                                       <a
//                                         onClick={(e) => actionOnClickHandler( e, row, Number(row.id), action ) }
//                                         className="dropdown-item"
//                                       >
//                                         {action.displayName}
//                                       </a>
//                                     )}
//                                 </li>
//                               ))}
//                             </ul>
//                           </div>
//                         </>
//                       </td>
//                     )}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>)}
//       {props.gridType == "advance" &&(   <div
//         className={
//           props.actionPosition == "left"
//             ? "table-responsive"
//             : ""
//         }
//       >
//         <div className="table-responsive-sm">
//           <table className={`table table-hover table-bordered grid-table`} id="grid">
//             <thead className="text-nowrap">
//               <tr className="align-top">
//                 <th></th>
//                 {actionPosition != true &&
//                   props.tableHeaders &&
//                   props.tableHeaders?.length > 0 &&
//                   props.actions &&
//                   props.actions?.length > 0 && (
//                     <th className="text-center fw-medium header-padding">Actions</th>
//                   )}

//                 {props.enablecheckboxselection && (
//                   <th scope="col">
//                     <input
//                       type="checkbox"
//                       className="form-check-input"
//                       name="allSelect"
//                       onChange={(e) => handleChange(e, -1)}
//                       checked={selectedRows.size === props.tableData.length}
//                     />
//                   </th>
//                 )}

//                 {updatedColumns.map((column, index) => (
//                 !column.hidden && (
//                   <DraggableColumnHeader
//                     key={column.key}
//                     column={{
//                       ...column,
//                       sortable: <></>, // Replace undefined with an empty React element
//                     }}
//                     index={index}
//                     moveColumn={moveColumn}
//                     onLeftPin={onLeftPin}
//                     onRightPin={onRightPin}
//                     onNoPin={onNoPin}
//                     onSearchChange={handleSearchChange}
//                     onFilterClick={handleFilterClick}
//                     onSortClick={handleSortClick}
//                     sortConfig={sortConfig}
//                     allSearch={props.allSearch}
//                     allFilter={props.allFilter}
//                     data={data}
//                     onToggleFixed={handleToggleFixed}
//                     onToggleFrozen={handleToggleFrozen}
//                     onToggleHidden={handleToggleHidden}
//                     gridType={props.gridType}
//                   />
//                 )
//               ))}

//                 {actionPosition &&
//                   props.tableHeaders &&
//                   props.tableHeaders?.length > 0 &&
//                   props.actions &&
//                   props.actions?.length > 0 && (
//                     <th className="text-center fw-medium header-padding" style={{paddingTop: '20px'}}>Actions</th>
//                   )}
//               </tr>
//             </thead>

//             <tbody className="cursor-pointer">
//             {/* Render table rows using the reordered columns */}
//             {data.map((row, rowIndex) => (
//               <DraggableRow key={row.id} row={row} index={rowIndex} moveRow={moveRow}>
//                <td className="text-center fw-medium">
//                <RdsIcon
//             colorVariant="dark"
//             height="15px"
//             name="collapsable"
//             stroke
//             width="20px"

//           /> </td>

//                 {actionPosition != true&&
//                   props.tableHeaders &&
//                   props.tableHeaders?.length > 0 &&
//                   props.actions &&
//                   props.actions?.length > 0 && (
//                     <td className="text-center fw-medium">
//                       <>
//                         <div className="btn-group dropstart">
//                           <button
//                             className="btn btn-sm btn-icon border-0 three-dot-btn"
//                             type="button"
//                             aria-expanded={activeDropdownId === row.id ? "true" : "false"}
//                             onClick={() => toggleDropdown(row.id)}
//                             data-bs-toggle="dropdown"
//                             data-bs-auto-close="true"
//                             id="dropdownMenuButton"
//                             data-testid="action-btn"
//                           >
//                             <RdsIcon
//                               name={"three_dots"}
//                               height="14px"
//                               width="14px"
//                               stroke={false}
//                               fill={true}
//                               tooltip={true}
//                               tooltipTitle="More Actions"
//                               tooltipPlacement="top"
//                             />
//                           </button>
//                           <ul
//                             ref={dropdownRef}
//                             aria-labelledby="dropdownMenuButton"
//                             className={`dropdown-menu dropdown-adjusted ${activeDropdownId === row.id && isDropdownOpen ? "show" : ""}`}
//                           >
//                             {props.actions.map((action, actionIndex) => (
//                               <li key={"action-" + actionIndex + "-inside-tableRow" + row.id}>
//                                 {action.modalId && (
//                                   <a
//                                     data-bs-toggle="modal"
//                                     data-bs-target={`#${action?.modalId}`}
//                                     aria-controls={action?.modalId}
//                                     onClick={(e) => actionOnClickHandler( e, row, Number(row.id), action )}
//                                     className="dropdown-item"
//                                   >
//                                     {action.displayName}
//                                   </a>
//                                 )}
//                                 {action.offId && (
//                                   <a
//                                     data-bs-toggle="offcanvas"
//                                     data-bs-target={`#${action?.offId}`}
//                                     aria-controls={action?.offId}
//                                     onClick={(e) => actionOnClickHandler( e, row, Number(row.id), action ) }
//                                     className="dropdown-item"
//                                   >
//                                     {action.displayName}
//                                   </a>
//                                 )}
//                                 {action.offId == undefined && action.modalId == undefined && (
//                                   <a
//                                   onClick={(e) => actionOnClickHandler( e, row, Number(row.id), action ) }
//                                     className="dropdown-item"
//                                   >
//                                     {action.displayName}
//                                   </a>
//                                 )}
//                               </li>
//                             ))}
//                           </ul>
//                         </div>
//                       </>
//                     </td>
//                   )}

//                 {props.enablecheckboxselection && (
//                   <th scope="row" className="align-middle">
//                     <input
//                       type="checkbox"
//                       name={row ? rowIndex.toString() : ""}
//                       checked={selectedRows.has(rowIndex)}
//                       onChange={(e) => handleChange(e, rowIndex)}
//                       className="form-check-input"
//                       id="rowcheck{user.id}"
//                     />
//                   </th>
//                 )}

//           {updatedColumns.map((column, colIndex) => (
//                   !column.hidden && (
//                     <td
//                       className={`px-2 align-middle fw-medium ${column.wraptext ? "wrap-text" : "text-nowrap"} ${column.frozen ? "frozen-auto" : ""}`}
//                       key={column.key}
//                       style={column.fixed ? { left: `${column.left}px` } : {}}
//                     >
//                       {column.datatype === "badge" ? (
//                         row[column.key] && typeof row[column.key] === 'object' ? (
//                           <RdsBadge
//                             colorVariant={row[column.key]?.badgeColorVariant || "success"}
//                             label={row[column.key]?.content || ""}
//                           />
//                         ) : (
//                           row[column.key] || ""
//                         )
//                       ) : (
//                         row[column.key]
//                       )}
//                     </td>
//                   )
//                 ))}

//                 {actionPosition &&
//                   props.tableHeaders &&
//                   props.tableHeaders?.length > 0 &&
//                   props.actions &&
//                   props.actions?.length > 0 && (
//                     <td className="text-center fw-medium">
//                       <>
//                         <div className="btn-group dropstart">
//                           <button
//                             className="btn btn-sm btn-icon border-0 three-dot-btn"
//                             type="button"
//                             aria-expanded={activeDropdownId === row.id ? "true" : "false"}
//                             onClick={() => toggleDropdown(row.id)}
//                             data-bs-toggle="dropdown"
//                             data-bs-auto-close="true"
//                             id="dropdownMenuButton"
//                             data-testid="action-btn"
//                           >
//                             <RdsIcon
//                               name={"three_dots"}
//                               height="14px"
//                               width="14px"
//                               stroke={false}
//                               fill={true}
//                               tooltip={true}
//                               tooltipTitle="More Actions"
//                               tooltipPlacement="top"
//                             />
//                           </button>
//                           <ul
//                             ref={dropdownRef}
//                             aria-labelledby="dropdownMenuButton"
//                             className={`dropdown-menu dropdown-adjusted ${activeDropdownId === row.id && isDropdownOpen ? "show" : ""}`}
//                           >
//                             {props.actions.map((action, actionIndex) => (
//                               <li key={"action-" + actionIndex + "-inside-tableRow" + row.id}>
//                                 {action.modalId && (
//                                   <a
//                                     data-bs-toggle="modal"
//                                     data-bs-target={`#${action?.modalId}`}
//                                     aria-controls={action?.modalId}
//                                     onClick={(e) => actionOnClickHandler( e, row, Number(row.id), action ) }
//                                     className="dropdown-item"
//                                   >
//                                     {action.displayName}
//                                   </a>
//                                 )}
//                                 {action.offId && (
//                                   <a
//                                     data-bs-toggle="offcanvas"
//                                     data-bs-target={`#${action?.offId}`}
//                                     aria-controls={action?.offId}
//                                     onClick={(e) => actionOnClickHandler( e, row, Number(row.id), action ) }
//                                     className="dropdown-item"
//                                   >
//                                     {action.displayName}
//                                   </a>
//                                 )}
//                                 {action.offId == undefined && action.modalId == undefined && (
//                                   <a
//                                   onClick={(e) => actionOnClickHandler( e, row, Number(row.id), action ) }
//                                     className="dropdown-item"
//                                   >
//                                     {action.displayName}
//                                   </a>
//                                 )}
//                               </li>
//                             ))}
//                           </ul>
//                         </div>
//                       </>
//                     </td>
//                   )}
//               </DraggableRow>
//             ))}
//           </tbody>
//           </table>
//         </div>
//       </div>)}
//       {popupVisible && (
//         <Popup
//           data={popupData}
//           onClose={handleClosePopup}
//           onFilterChange={handleFilterChange}
//           selectedValues={selectedFilters[popupColumnKey!] || new Set()}
//           position={popupPosition}
//         />
//       )}

//       <div className="pagination-container gap-2">
//        <span className="cursor-pointer"> <RdsIcon
//           colorVariant="primary"
//           height="20px"
//           name="refresh"
//           stroke
//           width="20px"
//           onClick={resetGrid}
//         /></span>

//         {props.pagination && (
//           <RdsPagination
//             totalRecords={totalRecords}
//             recordsPerPage={props.recordsPerPage ? props.recordsPerPage : 10}
//             onPageChange={onPageChangeHandler}
//             paginationType={
//               props.recordsPerPageSelectListOption ? "default" : "advanced"
//             }
//           ></RdsPagination>
//         )}
//       </div>
//     </DndProvider>
//   );
// };

// export default RdsCompGrid;
