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
  RdsDropdown,
  RdsCheckboxParentChild,
} from "../rds-elements";
import "./rds-comp-grid.css";
import { useTranslation } from "react-i18next";
import { fontWeight } from "../../../raaghu-elements/libs/types/fontWeight";
import { AvatarSize, AvatarStyle } from "../../../raaghu-elements/src/rds-avatar/rds-avatar";
import { TooltipStyle } from "../../../raaghu-elements/src/rds-tooltip/rds-tooltip";
import { Options } from "html2canvas";
import { DisplayType, Layout, Style } from "../../../raaghu-elements/src/rds-dropdown/rds-dropdown";
import { InputSize } from "../../../raaghu-elements/src/rds-input/rds-input";

export enum ActionPosition {
  Right = "right",
  Left = "left",
}
export enum State {
  Default = "default",
  Collpsed = "collpsed",
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
  options?: Options;
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
  const [isCollapsed, setIsCollapsed] = useState(
    props.state === State.Collpsed
  ); // Updated to use props.state
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  const [tableHeaders, setTableHeaders] = useState(props.tableHeaders); // Manage headers dynamically
  const [tableData, setTableData] = useState(props.tableData); // Manage table data dynamically
  const handleAddColumn = () => {
    const newColumnKey = `newColumn${tableHeaders.length + 1}`;
    const newColumn = {
      displayName: `New Column ${tableHeaders.length + 1}`,
      key: newColumnKey,
      datatype: "text",
    };
    setTableHeaders([...tableHeaders, newColumn]);
    const updatedData = tableData.map((row) => ({
      ...row,
      [newColumnKey]: "Default Value", // Set a default value for the new column
    }));
    setTableData(updatedData);
  };
  // const selectItemsArray = Array.from(
  //   new Map(
  //     [
  //       { label: "One", value: "one" },
  //       { label: "two", value: "two" },
  //       { label: "three", value: "three" },
  //     ].map((item) => [item.value, item])
  //   ).values()
  // );
  const [rowStatus, setRowStatus] = useState({
    startingRow: 0,
    endingRow: props.recordsPerPage,
  });
  let sort: boolean = false;
  useEffect(() => {
    setTotalRecords(props.totalRecords);
  }, [props.totalRecords]);
  const [isAddColumn, setIsAddColumn] = useState(true); // State to toggle between add and remove

  const handleToggleColumn = () => {
    if (isAddColumn) {
      // Add a new column
      const newColumnKey = `newColumn${tableHeaders.length + 1}`;
      const newColumn = {
        displayName: `New Column ${tableHeaders.length + 1}`,
        key: newColumnKey,
        datatype: "text",
      };
      setTableHeaders([...tableHeaders, newColumn]);
      const updatedData = tableData.map((row) => ({
        ...row,
        [newColumnKey]: "Default Value", // Set a default value for the new column
      }));
      setTableData(updatedData);
    } else {
      // Remove the last column
      if (tableHeaders.length > 0) {
        const updatedHeaders = [...tableHeaders];
        const removedColumn = updatedHeaders.pop(); // Remove the last column
        setTableHeaders(updatedHeaders);
  
        if (removedColumn) {
          const updatedData = tableData.map((row) => {
            const { [removedColumn.key]: _, ...rest } = row; // Remove the column data
            return rest;
          });
          setTableData(updatedData);
        }
      }
    }
    setIsAddColumn(!isAddColumn); // Toggle the state
  };
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

  useEffect(() => {
    setIsCollapsed(props.state === State.Collpsed); // Update collapse state when props.state changes
  }, [props.state]);

  function toggleFilterPopup(event: React.MouseEvent<HTMLElement>): void {
    throw new Error("Function not implemented.");
  }

  const [showAvatar, setShowAvatar] = useState(false);
  const [showCheckbox, setShowCheckbox] = useState(false);
  const [showHideColumns, setShowHideColumns] = useState(false);
  const [searchColumns, setSearchColumns] = useState("");

  const columnOptions = [
    { id: 'all', label: 'All Columns', checked: true },
    { id: 'status', label: 'Status', checked: true },
    { id: 'name', label: 'Name', checked: true },
    { id: 'type', label: 'Type', checked: true },
    { id: 'library', label: 'Library', checked: false },
    { id: 'required', label: 'Required', checked: false },
    { id: 'mandatory', label: 'Mandatory', checked: true },
    { id: 'recommended', label: 'Recommended', checked: false },
    { id: 'optional', label: 'Optional', checked: true },
    { id: 'isNillable', label: 'Is Nillable', checked: true },
    { id: 'defaultValue', label: 'Default Value', checked: true }
  ];

  const [showFilters, setShowFilters] = useState(false);

  const [filterColumn, setFilterColumn] = useState("");
  const [filterCondition, setFilterCondition] = useState("And");
  const [filterTask, setFilterTask] = useState("");

  const [showSort, setShowSort] = useState(false);

  const [showFilterPopup, setShowFilterPopup] = useState(false);

  return (
    <div className={`rds-comp-grid ${Classes}`}>
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
          <div className="table-controls"></div>
          <div
            className={
              props.actionPosition == "left"
                ? "table-responsive left-action"
                : "table-responsive-none"
            }
          >
            {" "}
            {props.showHeader && (
              <tr>
                <th
                  colSpan={props.tableHeaders.length + (props.actions ? 1 : 0)}
                >
       <div className="table-controls d-flex align-items-center justify-content-between flex-wrap">
  <div className="d-flex align-items-center flex-grow-1">
    <div className="mt-2 flex-grow-1 w-100 w-md-auto">
      <RdsSearch
        iconPosition="right"
        labelPosition="top"
        placeholder="Search"
        size="small"
        onChange={handleSearchChange}
      />
    </div>
  </div>
                  
                    <div className="mx-2 grid-header">
                      <RdsDropdown
                          buttonIcon="plus"
                          colorVariant="primary"
                          displayType={DisplayType.Dropdown}
                          iconStroke
                          id="1"
                          label="Add New"
                          layout={Layout.IconBefore}
                          listItems={[
                            {
                              id: '1',
                              label: 'Row',
                            },
                            {
                              id: '2',
                              label: 'Column',
                            },
                            {
                              id: '3',
                              label: 'Field Group',
                            },
                            {
                              id: '4',
                              label: 'Column Group',
                            },
                            {
                              id: '5',
                              label: 'Import',
                            },
                          ]}
                          size="medium"
                          state="default"
                          style={Style.Transparent} darkDropdown={false} 
/>
                      
                    </div>
                    <div className="mx-1 grid-header position-relative">
                      <RdsButton
                        badgeLayout="Text_only"
                        badgeState="default"
                        databstoggle="tooltip"
                        displayType="Icon + Text"
                        icon="persons"
                        label="Person"
                        shape="rectangle"
                        size="medium"
                        state="default"
                        style="transparent"
                        textCase="unset"
                        onClick={() => {
                          setShowAvatar(!showAvatar);
                        }}
                      />
                      {showAvatar && (
                        <div className="position-absolute start-0 mt-2 bg-white p-4 shadow-lg rounded-3" style={{ minWidth: '400px', zIndex: 1000 }}>
                          <div className="d-flex justify-content-between align-items-start mb-4">
                            <div>
                              <h2 className="h4 mb-2 text-muted">Filter this board by person</h2>
                              <p className="text-muted mb-4">And find items they're working on</p>
                            </div>
                            <div>
                              <RdsButton
                                badgeLayout="Text_only"
                                badgeState="default"
                                displayType="Icon + Text"
                                icon="save"
                                label="Save View"
                                shape="rectangle"
                                size="medium"
                                colorVariant="primary"
                                style="transparent"
                                textCase="unset"
                              />
                            </div>
                          </div>
                          <div className="d-flex gap-2">
                            {[1, 2, 3].map((index) => (
                              <div key={index} className="cursor-pointer">
                                <RdsAvatar
                                  withProfilePic={true}
                                  profilePic="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp=CAU"
                                  size={AvatarSize.medium}
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="mx-1 grid-header">
                      <div className="position-relative">
                        <RdsButton
                          badgeLayout="Text_only"
                          badgeState="default"
                          displayType="Icon + Text"
                          icon="filters"
                          label="Filters"
                          shape="rectangle"
                          size="medium"
                          state="default"
                          style="transparent"
                          textCase="unset"
                          onClick={() => setShowFilters(!showFilters)}
                        />
                        {showFilters && (
                          <div className="position-absolute start-0 mt-2 bg-white p-4 shadow-lg rounded-3" style={{ minWidth: '700px', zIndex: 1000 }}>
                            <div className="d-flex justify-content-between align-items-center mb-4">
                              <h2 className="h5 mb-0 text-body-secondary">Advance Filters</h2>
                              <div className="d-flex align-items-center gap-3">
                                <button className="btn btn-link text-decoration-none text-secondary p-0" onClick={() => {
                                  // Handle clear filters
                                }}>
                                  Clear Filters
                                </button>
                                <RdsButton
                                  badgeLayout="Text_only"
                                  badgeState="default"
                                  displayType="Icon + Text"
                                  icon="save"
                                  label="Save View"
                                  shape="rectangle"
                                  colorVariant="primary"
                                  size="medium"
                                  style="outline"
                                  textCase="unset"
                                />
                              </div>
                            </div>

                            <div className="filter-content">
                              <div className="mb-4">
                                <div className="d-flex gap-3 align-items-center">
                                  <label className="text-body-secondary mb-0" style={{ width: '60px' }}>Where</label>
                                  <div className="d-flex gap-3 flex-grow-1">
                                    <RdsDropdown
                                      id="column-dropdown"
                                      colorVariant="primary"
                                      displayType={DisplayType.Dropdown}
                                      label="Column"
                                      size="medium"
                                      style={Style.Transparent}
                                      darkDropdown={false}
                                      listItems={[
                                        { id: 'status', label: 'Status' },
                                        { id: 'name', label: 'Name' },
                                        { id: 'type', label: 'Type' }
                                      ]}
                                    />
                                    <RdsDropdown
                                      id="condition-dropdown"
                                      colorVariant="primary"
                                      displayType={DisplayType.Dropdown}
                                      label="Condition"
                                      size="medium"
                                      style={Style.Transparent}
                                      darkDropdown={false}
                                      listItems={[
                                        { id: 'equals', label: 'Equals' },
                                        { id: 'contains', label: 'Contains' },
                                        { id: 'startsWith', label: 'Starts with' }
                                      ]}
                                    />
                                    <RdsDropdown
                                      id="task-dropdown"
                                      colorVariant="primary"
                                      displayType={DisplayType.Dropdown}
                                      label="Task"
                                      size="medium"
                                      style={Style.Transparent}
                                      darkDropdown={false}
                                      listItems={[
                                        { id: 'task1', label: 'Task 1' },
                                        { id: 'task2', label: 'Task 2' },
                                        { id: 'task3', label: 'Task 3' }
                                      ]}
                                    />
                                  </div>
                                </div>
                              </div>

                              <button className="btn btn-link text-purple d-flex align-items-center gap-2 p-0" onClick={() => {
                                // Handle new filter
                              }}>
                                <RdsIcon
                                  name="plus"
                                  height="16px"
                                  width="16px"
                                  fill={false}
                                  stroke={true}
                                />
                                <span className="text-decoration-none">New Filter</span>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="mx-1 grid-header">
                      <div className="position-relative">
                        <RdsButton
                          badgeLayout="Text_only"
                          badgeState="default"
                          displayType="Icon + Text"
                          icon="sort"
                          label="Sort"
                          shape="rectangle"
                          size="medium"
                          state="default"
                          style="transparent"
                          textCase="unset"
                          onClick={() => setShowSort(!showSort)}
                        />
                        {showSort && (
                          <div className="position-absolute start-0 mt-2 bg-white p-4 shadow-lg rounded-3" style={{ minWidth: '600px', zIndex: 1000 }}>
                            <div className="d-flex justify-content-between align-items-center mb-4">
                              <h2 className="h5 mb-0 text-body-secondary">Sort By</h2>
                              <RdsButton
                                badgeLayout="Text_only"
                                badgeState="default"
                                displayType="Icon + Text"
                                icon="save"
                                label="Save View"
                                shape="rectangle"
                                colorVariant="primary"
                                size="medium"
                                style="outline"
                                textCase="unset"
                              />
                            </div>

                            <div className="sort-content">
                              <div className="mb-4">
                                <div className="d-flex gap-3">
                                  <RdsDropdown
                                    id="sort-column"
                                    colorVariant="primary"
                                    displayType={DisplayType.Dropdown}
                                    label="Column"
                                    size="medium"
                                    style={Style.Transparent}
                                    darkDropdown={false}
                                    listItems={[
                                      { id: 'status', label: 'Status' },
                                      { id: 'name', label: 'Name' },
                                      { id: 'type', label: 'Type' }
                                    ]}
                                  />
                                  <RdsDropdown
                                    id="sort-order"
                                    colorVariant="primary"
                                    displayType={DisplayType.Dropdown}
                                    label="Ascending"
                                    size="medium"
                                    style={Style.Transparent}
                                    darkDropdown={false}
                                    listItems={[
                                      { id: 'asc', label: 'Ascending' },
                                      { id: 'desc', label: 'Descending' }
                                    ]}
                                  />
                                </div>
                              </div>

                              <button className="btn btn-link text-purple d-flex align-items-center gap-2 p-0" onClick={() => {
                                // Handle new sort
                              }}>
                                <RdsIcon
                                  name="plus"
                                  height="16px"
                                  width="16px"
                                  fill={false}
                                  stroke={true}
                                />
                                <span className="text-decoration-none">New Sort</span>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="mx-1 grid-header">
                      <div className="position-relative">
                        <RdsButton
                          badgeLayout="Text_only"
                          badgeState="default"
                          displayType="Icon + Text"
                          icon="hide"
                          label="Hide"
                          shape="rectangle"
                          size="medium"
                          state="default"
                          style="transparent"
                          textCase="unset"
                          onClick={() => setShowHideColumns(!showHideColumns)}
                        />
                        {showHideColumns && (
                          <div className="position-absolute start-0 mt-2 bg-white p-4 shadow-lg rounded-3" style={{ minWidth: '320px', zIndex: 1000 }}>
                            <div className="d-flex justify-content-between align-items-center mb-4">
                              <h2 className="h5 mb-0">Display Columns</h2>
                              <div className="d-flex align-items-center">
                                <RdsButton
                                  badgeLayout="Text_only"
                                  badgeState="default"
                                  displayType="Icon + Text"
                                  icon="save"
                                  label="Save View"
                                  shape="rectangle"
                                  colorVariant="primary"
                                  size="medium"
                                  style="outline"
                                  textCase="unset"
                                />
                              </div>
                            </div>

                            <div className="mb-4">
                              <div className="search-wrapper position-relative">
                                <RdsInput
                                  name="column-search"
                                  placeholder="Find columns"
                                  inputType="text"
                                  value={searchColumns}
                                  onChange={(e) => setSearchColumns(e.target.value)}
                                  size={InputSize.Medium}
                                />
                                <span className="position-absolute end-0 top-50 translate-middle-y pe-3">
                                  <RdsIcon
                                    name="search"
                                    height="16px"
                                    width="16px"
                                    fill={false}
                                    stroke={true}
                                  />
                                </span>
                              </div>
                            </div>

                            <div className="column-options">
                              {columnOptions.map((option) => (
                                <div key={option.id} className="form-check custom-checkbox mb-3">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id={option.id}
                                    checked={option.checked}
                                    onChange={() => {
                                      // Handle checkbox change
                                    }}
                                  />
                                  <label className="form-check-label ms-2" htmlFor={option.id}>
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    {/* <div className="mx-1 grid-header">
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
                        textCase="unset"
                        onClick={() => {
                          setShowCheckbox(!showCheckbox);
                        }}
                      />
                    </div> */}
                
                    <div className="mx-1 grid-header">
                      <RdsDropdown
                          buttonIcon="more"
                          colorVariant="primary"
                          displayType={DisplayType.Dropdown}
                          iconStroke
                          id="1"
                          label="More"
                          layout={Layout.IconBefore}
                          listItems={[
                            {
                              id: '1',
                              label: 'Pin Column',
                            },
                            {
                              id: '2',
                              label: 'Item Height',
                            },
                            {
                              id: '3',
                              label: 'Conditional Coloring',
                            },
                            {
                              id: '4',
                              label: 'Default Item Values',
                            },                            
                          ]}
                          size="medium"
                          state="default"
                          style={Style.Transparent} darkDropdown={false} 
/>
                    </div>
                  </div>
                  
                  
                </th>
              </tr>
            )}
            {props.showSubHeader && (
              <tr>
                <th
                  colSpan={props.tableHeaders.length + (props.actions ? 1 : 0)}
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
            <div className="table-responsive table-responsive-sm">
              {!isCollapsed && (
                <table
                  className={`table table-hover table-bordered     ${Classes} `}
                  id="sortTable"
                >
                  <thead className="text-nowrap">
                    {props.showSubHeader && (
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
                                <span className="ps-4 d-flex ms-3">
                                  {/* <RdsIcon
                                    name="three_dots"
                                    height="12px"
                                    width="auto"
                                    stroke={true}
                                    isCursorPointer={true}
                                  /> */}
                                  <RdsDropdown
                          buttonIcon="three_dots"
                          colorVariant="primary"
                          displayType={DisplayType.Dropdown}
                          iconStroke
                          id="1"
                          label=""
                          layout={Layout.OnlyIcon}
                          listItems={[
                            {
                              id: 'settings',
                              label: 'Settings',
                              icon: 'settings'
                            },
                            {
                              id: 'filter',
                              label: 'Filter',
                              icon: 'filter'
                            },
                            {
                              id: 'sort',
                              label: 'Sort',
                              icon: 'sort'
                            },
                            {
                              id: 'collapse',
                              label: 'Collapse',
                              icon: 'collapse'
                            },
                            {
                              id: 'duplicate',
                              label: 'Duplicate',
                              icon: 'duplicate'
                            },
                            {
                              id: 'add_column',
                              label: 'Add Column',
                              icon: 'plus'
                            },
                            {
                              id: 'change_type',
                              label: 'Change Column Type',
                              icon: 'change'
                            },
                            {
                              id: 'rename',
                              label: 'Rename',
                              icon: 'rename'
                            },
                            {
                              id: 'delete',
                              label: 'Delete',
                              icon: 'delete'
                            }
                          ]}
                          size="medium"
                          state="default"
                          style={Style.Transparent}
                          darkDropdown={false}
                        />
                                </span>
                              </div>
                            </div>
                            <div className="d-flex align-items-center mt-1 ps-1 px-4 custom-select-list">
  <RdsSelectList
    classes="fixed-selectlist"
    id="story"
    isMultiple={true} 
    isSearchable={true}    
    placeholder="Select" 
    selectItems={[
      { label: "one", value: "option1" },
      { label: "Two", value: "option2" },
      { label: "Three", value: "option3" },
    ]} 
  />
  <span className="ms-2">
        <RdsIcon
          name="filter"
          height="12px"
          width="30px"
          stroke={true}
          isCursorPointer={true}
          onClick={() => setShowFilterPopup(!showFilterPopup)}
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
                    )}
                  </thead>

                  <tbody>
                    {[1, 2, 3, 4, 5].map((rowIndex) => (
                      <tr key={`row-${rowIndex}`}>
                        <td className="text-center align-middle">...</td>
                        {[1, 2, 3, 4, 5, 6].map((colIndex) => (
                          <td key={`cell-${rowIndex}-${colIndex}`} className="align-middle">
                            Text
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
             <div className="ps-3 ms-1">
  <RdsIcon
    colorVariant="dark"
    isCursorPointer
    onClick={handleToggleColumn}
    name={isAddColumn ? "with_border_plus" : "with_border_minus"} // Toggle icon
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
   </div>
  );
};
export default RdsCompGrid;
