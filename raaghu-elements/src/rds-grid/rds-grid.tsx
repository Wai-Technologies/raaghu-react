import React, { MouseEvent, useState, useEffect, useRef, useCallback } from "react";
import {
  RdsBadge,
  RdsInput,
  RdsButton,
  RdsPagination,
  RdsEmptyState,
  RdsAvatar,
  RdsTooltip,
  RdsProgressBar,
  RdsDropdown,
  RdsCheckboxParentChild,
} from "../../../raaghu-components/src/rds-elements";
import "./rds-grid.css";
import { useTranslation } from "react-i18next";
import { fontWeight } from "../../libs/types/fontWeight";
import {
  AvatarSize,
  AvatarStyle,
} from "../rds-avatar/rds-avatar";
import { TooltipStyle } from "../rds-tooltip/rds-tooltip";
import { Options } from "html2canvas";
import {
  DisplayType,
  Layout,
  Style,
} from "../rds-dropdown/rds-dropdown";
import { InputSize } from "../rds-input/rds-input";
import RdsCompIcon from "../../../raaghu-components/src/rds-comp-icon";
import RdsCompLabel from "../../../raaghu-components/src/rds-comp-label";
import RdsCompSearch from "../../../raaghu-components/src/rds-comp-search";
import { IconPosition } from "../../../raaghu-components/src/rds-comp-search/rds-comp-search";
import RdsCompSelectList from "../../../raaghu-components/src/rds-comp-select-list/rds-comp-select-list";

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

export interface RdsGridProps {
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
    resizable?: boolean;
    showHeader?: boolean;
    showsubHeader?: boolean;
    showShuffleIcon?: boolean;
    showAddNewColumn?: boolean;
  }[];
  resizableColumns?: boolean;
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

const RdsGrid = (props: RdsGridProps) => {
  const [data, setData] = useState(props.tableData);
  const [totalRecords, setTotalRecords] = useState<any>(props.totalRecords);
  const [array, setArray] = useState<boolean[]>([]);
  const iconForIllustration = localStorage.getItem("theme") || " light";
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeDropdownId, setActiveDropdownId] = useState<string | null>(null); // Updated type
  const dropdownRef = useRef<HTMLUListElement>(null);
  const dropdownRefs = useRef<(HTMLDivElement | null)[]>([]); // Array of refs for multiple dropdowns
  const actionColumnStyle =
    props.actionColumnStyle || ActionColumnStyle.ShowDots;
  const [isCollapsed, setIsCollapsed] = useState(
    props.state === State.Collpsed
  );
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  const [tableHeaders, setTableHeaders] = useState(props.tableHeaders);
  const [tableData, setTableData] = useState(props.tableData);
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
      [newColumnKey]: "Default Value",
    }));
    setTableData(updatedData);
  };

  const [columnWidths, setColumnWidths] = useState<Record<string, number>>({});
  const [resizingColumn, setResizingColumn] = useState<string | null>(null);
  const [startX, setStartX] = useState<number>(0);
  const [startWidth, setStartWidth] = useState<number>(0);

 const handleResizeStart = (e: React.MouseEvent<HTMLDivElement>, columnKey: string) => {
  if (!props.resizableColumns || (props.tableHeaders.find(h => h.key === columnKey)?.resizable === false)) {
    return;
  }
  
  e.preventDefault();
  setResizingColumn(columnKey);
  setStartX(e.clientX);
  
  const currentWidth = columnWidths[columnKey] || 150; // Default width if not set
  setStartWidth(currentWidth);
  document.addEventListener('mousemove', handleResizeMove as unknown as EventListener);
  document.addEventListener('mouseup', handleResizeEnd as unknown as EventListener);
};

const handleResizeMove = useCallback((e: globalThis.MouseEvent) => {
  if (!resizingColumn) return;
  
  const diff = e.clientX - startX;
  const newWidth = Math.max(100, startWidth + diff); // Minimum width of 100px
  
  setColumnWidths(prev => ({
    ...prev,
    [resizingColumn]: newWidth
  }));
}, [resizingColumn, startX, startWidth]);

const handleResizeEnd = useCallback(() => {
  setResizingColumn(null);
  document.removeEventListener('mousemove', handleResizeMove as unknown as EventListener);
  document.removeEventListener('mouseup', handleResizeEnd as unknown as EventListener);
}, [handleResizeMove]);

// Clean up event listeners when component unmounts
useEffect(() => {
  return () => {
    document.removeEventListener('mousemove', handleResizeMove as unknown as EventListener);
    document.removeEventListener('mouseup', handleResizeEnd as unknown as EventListener);
  };
}, [handleResizeMove, handleResizeEnd]);


  const [rowStatus, setRowStatus] = useState({
    startingRow: 0,
    endingRow: props.recordsPerPage,
  });
  let sort: boolean = false;
  useEffect(() => {
    setTotalRecords(props.totalRecords);
  }, [props.totalRecords]);
  const [isAddColumn, setIsAddColumn] = useState(true);

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
        [newColumnKey]: "Default Value",
      }));
      setTableData(updatedData);
    } else {
      if (tableHeaders.length > 0) {
        const updatedHeaders = [...tableHeaders];
        const removedColumn = updatedHeaders.pop();
        setTableHeaders(updatedHeaders);

        if (removedColumn) {
          const updatedData = tableData.map((row) => {
            const { [removedColumn.key]: _, ...rest } = row;
            return rest;
          });
          setTableData(updatedData);
        }
      }
    }
    setIsAddColumn(!isAddColumn);
  };
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside as EventListener);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  useEffect(() => {
    const handleClickOutside = (event: globalThis.MouseEvent) => {
      if (
        dropdownRefs.current.every(
          (ref) => ref && !ref.contains(event.target as Node)
        )
      ) {
        setActiveDropdownId(null); // Close all dropdowns
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
        startingRow: 0,
        endingRow: recordsPerPage,
      });
    } else {
      setRowStatus({
        startingRow: (currentPage - 1) * recordsPerPage,
        endingRow: currentPage * recordsPerPage,
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
    setIsCollapsed(props.state === State.Collpsed);
  }, [props.state]);

  function toggleFilterPopup(event: React.MouseEvent<HTMLElement>): void {
    throw new Error("Function not implemented.");
  }

  const [showAvatar, setShowAvatar] = useState(false);
  const [showCheckbox, setShowCheckbox] = useState(false);
  const [showHideColumns, setShowHideColumns] = useState(false);
  const [searchColumns, setSearchColumns] = useState("");

  const columnOptions = [
    { id: "all", label: "All Columns", checked: true },
    { id: "status", label: "Status", checked: true },
    { id: "name", label: "Name", checked: true },
    { id: "type", label: "Type", checked: false },
    { id: "library", label: "Library", checked: false },
    { id: "required", label: "Required", checked: false },
    { id: "mandatory", label: "Mandatory", checked: true },
    { id: "recommended", label: "Recommended", checked: false },
    { id: "optional", label: "Optional", checked: true },
    { id: "isNillable", label: "Is Nillable", checked: true },
    { id: "defaultValue", label: "Default Value", checked: true },
  ];

  const [showFilters, setShowFilters] = useState(false);

  const [filterColumn, setFilterColumn] = useState("");
  const [filterCondition, setFilterCondition] = useState("And");
  const [filterTask, setFilterTask] = useState("");

  const [showSort, setShowSort] = useState(false);

  const [showFilterPopup, setShowFilterPopup] = useState(false);

  const closeAllDropdowns = () => {
    setShowAvatar(false);
    setShowFilters(false);
    setShowSort(false);
    setShowHideColumns(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: globalThis.MouseEvent) => {
      if (!(event.target as Element).closest(".position-relative")) {
        closeAllDropdowns();
      }
    };

    document.addEventListener("click", handleClickOutside as EventListener);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: globalThis.MouseEvent) => {
      const selectListElement = document.querySelector(".fixed-selectlist");
      if (
        selectListElement &&
        !selectListElement.contains(event.target as Node)
      ) {
        // Close the select list when clicking outside
        // setSelectedValues([]); // Clear selected values or close logic
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
   <div className="comp-grid">
      {data?.length == 0 && !totalRecords && props.illustration ? (
        <div className="h-100 d-flex align-items-center justify-content-center">
          {isLoading ? <div className="loader"></div> : <></>}
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
                        <RdsCompSearch
                          iconPosition={IconPosition.Right}
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
                            id: "1",
                            label: "Row",
                          },
                          {
                            id: "2",
                            label: "Column",
                          },
                          {
                            id: "3",
                            label: "Field Group",
                          },
                          {
                            id: "4",
                            label: "Column Group",
                          },
                          {
                            id: "5",
                            label: "Import",
                          },
                        ]}
                        size="medium"
                        state="default"
                        style={Style.Transparent}
                        darkDropdown={false}
                      />
                    </div>
                    <div className="mx-1 grid-header position-relative">
                      <RdsButton
                        badgeLayout="Text_only"
                        badgeState="default"
                        displayType="Icon + Text"
                        icon="persons"
                        label="Person"
                        shape="rectangle"
                        size="medium"
                        state="default"
                        style={Style.Transparent}
                        textCase="unset"
                        onClick={() => {
                          closeAllDropdowns();
                          setShowAvatar(!showAvatar);
                        }}
                      />
                      {showAvatar && (
                        <div
                          className="position-absolute start-0 mt-2 bg-white p-4 shadow-lg rounded-3"
                          style={{ minWidth: "400px", zIndex: 1000 }}
                        >
                          <div className="d-flex justify-content-between align-items-start mb-4">
                            <div>
                              <h2 className="h4 mb-2 text-muted">
                                Filter this board by person
                              </h2>
                              <p className="text-muted mb-4">
                                And find items they're working on
                              </p>
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
                          onClick={() => {
                            closeAllDropdowns();
                            setShowFilters(!showFilters);
                          }}
                        />
                        {showFilters && (
                          <div
                            className="position-absolute start-0 mt-2 bg-white p-4 shadow-lg rounded-3"
                            style={{ minWidth: "700px", zIndex: 1000 }}
                          >
                            <div className="d-flex justify-content-between align-items-center mb-4">
                              <h2 className="h5 mb-0 text-body-secondary">
                                Advance Filters
                              </h2>
                              <div className="d-flex align-items-center gap-3">
                                <button
                                  className="btn btn-link text-decoration-none text-secondary p-0"
                                  onClick={() => {}}
                                >
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
                                  <label
                                    className="text-body-secondary mb-0"
                                    style={{ width: "60px" }}
                                  >
                                    Where
                                  </label>
                                  <div className="d-flex gap-3 flex-grow-1">
                                    <RdsDropdown
                                      id="column-dropdown"
                                      colorVariant="primary"
                                      displayType={DisplayType.Dropdown}
                                      label="Column"
                                      size="medium"
                                      style={Style.Outline}
                                      darkDropdown={false}
                                      listItems={[
                                        { id: "status", label: "Status" },
                                        { id: "name", label: "Name" },
                                        { id: "type", label: "Type" },
                                      ]}
                                    />
                                    <RdsDropdown
                                      id="condition-dropdown"
                                      colorVariant="primary"
                                      displayType={DisplayType.Dropdown}
                                      label="Condition"
                                      size="medium"
                                      style={Style.Outline}
                                      darkDropdown={false}
                                      listItems={[
                                        { id: "equals", label: "Equals" },
                                        { id: "contains", label: "Contains" },
                                        {
                                          id: "startsWith",
                                          label: "Starts with",
                                        },
                                      ]}
                                    
                                    />
                                    <RdsDropdown
                                      id="task-dropdown"
                                      colorVariant="primary"
                                      displayType={DisplayType.Dropdown}
                                      label="Task"
                                      size="medium"
                                      style={Style.Outline}
                                      darkDropdown={false}
                                      listItems={[
                                        { id: "task1", label: "Task 1" },
                                        { id: "task2", label: "Task 2" },
                                        { id: "task3", label: "Task 3" },
                                      ]}
                                     
                                    />
                                  </div>
                                </div>
                              </div>

                              <button
                                className="btn btn-link text-purple d-flex align-items-center gap-2 p-0"
                                onClick={() => {}}
                              >
                                <RdsCompIcon
                                  name="plus"
                                  height="16px"
                                  width="16px"
                                  fill={false}
                                  stroke={true}
                                />
                                <span className="text-decoration-none">
                                  New Filter
                                </span>
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
                          onClick={() => {
                            closeAllDropdowns();
                            setShowSort(!showSort);
                          }}
                        />
                        {showSort && (
                          <div
                            className="position-absolute start-0 mt-2 bg-white p-4 shadow-lg rounded-3"
                            style={{ minWidth: "600px", zIndex: 1000 }}
                          >
                            <div className="d-flex justify-content-between align-items-center mb-4">
                              <h2 className="h5 mb-0 text-body-secondary">
                                Sort By
                              </h2>
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
                                    style={Style.Outline}
                                    darkDropdown={false}
                                    listItems={[
                                      { id: "status", label: "Status" },
                                      { id: "name", label: "Name" },
                                      { id: "type", label: "Type" },
                                    ]}
                                   // chevron={true}
                                  />
                                  <RdsDropdown
                                    id="sort-order"
                                    colorVariant="primary"
                                    displayType={DisplayType.Dropdown}
                                    label="Ascending"
                                    size="medium"
                                    style={Style.Outline}
                                    darkDropdown={false}
                                    listItems={[
                                      { id: "asc", label: "Ascending" },
                                      { id: "desc", label: "Descending" },
                                    ]}
                                    //chevron={true}
                                  />
                                </div>
                              </div>

                              <button
                                className="btn btn-link text-purple d-flex align-items-center gap-2 p-0"
                                onClick={() => {}}
                              >
                                <RdsCompIcon
                                  name="plus"
                                  height="16px"
                                  width="16px"
                                  fill={false}
                                  stroke={true}
                                />
                                <span className="text-decoration-none">
                                  New Sort
                                </span>
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
                          onClick={() => {
                            closeAllDropdowns();
                            setShowHideColumns(!showHideColumns);
                          }}
                        />
                        {showHideColumns && (
                          <div
                            className="position-absolute start-0 mt-2 bg-white p-4 shadow-lg rounded-3"
                            style={{ minWidth: "320px", zIndex: 1000 }}
                          >
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
                                  colorVariant="light"
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
                                  onChange={(e) =>
                                    setSearchColumns(e.target.value)
                                  }
                                  size={InputSize.Medium}
                                />
                                <span className="position-absolute end-0 top-50 translate-middle-y pe-3 mt-md-3">
                                  <RdsCompIcon
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
                                <div
                                  key={option.id}
                                  className="form-check custom-checkbox mb-3"
                                >
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id={option.id}
                                    checked={option.checked}
                                    onChange={() => {}}
                                  />
                                  <label
                                    className="form-check-label ms-2"
                                    htmlFor={option.id}
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
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
                            id: "1",
                            label: "Pin Column",
                          },
                          {
                            id: "2",
                            label: "Item Height",
                          },
                          {
                            id: "3",
                            label: "Conditional Coloring",
                          },
                          {
                            id: "4",
                            label: "Default Item Values",
                          },
                        ]}
                        size="medium"
                        state="default"
                        style={Style.Transparent}
                        darkDropdown={false}
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
                    <RdsCompLabel fontWeight="bolder" label="Title" />
                    <div className="ms-3" style={{ gap: "10px" }}>
                      <RdsCompIcon
                        classes="stroke"
                        name="three_dotshorizontal"
                        height="12px"
                        width="auto"
                        stroke={true}
                        isCursorPointer={true}
                      />
                    </div>
                    <div className="ms-5">
                      <RdsCompIcon
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
            <div className={`table-responsive table-responsive-sm ${props.resizableColumns ? 'resizable-table' : ''}`}>
              {!isCollapsed && (
                <table
                  className={`table table-bordered     ${Classes} `}
                  id="sortTable"
                >
                  <thead className="text-nowrap">
                    {props.showSubHeader && (
                      <tr className="align-middle ">
                        <th className="text-center fw-medium">
                          <RdsCompIcon
                            name=""
                            height="16px"
                            width="16px"
                            fill={false}
                            isCursorPointer={true}
                          />
                        </th>
                        <th className="text-center fw-medium">
                          <RdsCompIcon
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
                        {props?.tableHeaders?.map((tableHeader, index) => {
                          const isResizable = props.resizableColumns && tableHeader.resizable !== false;
                          const width = columnWidths[tableHeader.key] || tableHeader.colWidth || 'auto';
                          
                          return (
                            <th scope="col" key={"tableHeader-" + index}
                            className={`${isResizable ? 'resizable' : ''} ${resizingColumn === tableHeader.key ? 'resizing' : ''}`}
                              style={{ width }}
                              >
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
                                <span className="ps-4 d-flex ">
                                  <RdsDropdown
                                    buttonIcon="three_dots"
                                    colorVariant="primary"
                                    displayType={DisplayType.Dropdown}
                                    iconStroke
                                    id="1"
                                    label="More"
                                    layout={Layout.OnlyIcon}
                                    listItems={[
                                      {
                                        id: "1",
                                        label: "Settings",
                                        icon: "setting",
                                      },
                                      {
                                        id: "2",
                                        label: "Filter",
                                        icon: "filter",
                                      },
                                      {
                                        id: "3",
                                        label: "Sort",
                                        icon: "sort",
                                      },
                                      {
                                        id: "4",
                                        label: "Collapse",
                                      },
                                      {
                                        id: "5",
                                        label: "Add Column",
                                        icon: "plus",
                                      },
                                      {
                                        id: "6",
                                        label: "Change Column Type",
                                        icon: "change",
                                      },
                                      {
                                        id: "7",
                                        label: "Rename",
                                        icon: "rename",
                                      },
                                      {
                                        id: "8",
                                        label: "Delete",
                                        icon: "delete",
                                      },
                                    ]}
                                    size="medium"
                                    state="default"
                                    style={Style.Transparent}
                                    darkDropdown={false}
                                  />
                                </span>
                              </div>
                              {isResizable && (
                                <div 
                                  className="resize-handle" 
                                  onMouseDown={(e) => handleResizeStart(e, tableHeader.key)}
                                />
                              )}
                            </div>
                            <div className="d-flex align-items-center mt-1 ps-1 px-4 custom-select-list">
                              <RdsCompSelectList
                                classes="fixed-selectlist px-3"
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
                              <span className="ms-2 position-relative">
                                <RdsCompIcon
                                  name="filter"
                                  height="12px"
                                  width="30px"
                                  stroke={true}
                                  isCursorPointer={true}
                                  onClick={() =>
                                    setActiveDropdownId(
                                      activeDropdownId === `filter-icon-${index}`
                                        ? null
                                        : `filter-icon-${index}`
                                    )
                                  }
                                />
                                {activeDropdownId === `filter-icon-${index}` && (
                                  <div
                                    ref={(el) =>
                                      (dropdownRefs.current[index] = el)
                                    } // Assign ref to the dropdown
                                    className="position-absolute bg-white p-3 shadow-lg rounded-3"
                                    style={{
                                      minWidth: "200px",
                                      zIndex: 1000,
                                      top: "20px",
                                      right: "0",
                                    }}
                                  >
                                    <div className="mb-2">
                                      <RdsDropdown
                                        id={`filter-condition-1-${index}`}
                                        colorVariant="primary"
                                        displayType={DisplayType.Dropdown}
                                        label="Equals"
                                        size={InputSize.Small}
                                        style={Style.Outline}
                                        listItems={[
                                          { id: "equals", label: "Equals" },
                                          { id: "contains", label: "Contains" },
                                          {
                                            id: "startsWith",
                                            label: "Starts With",
                                          },
                                        ]}
                                        darkDropdown={false}
                                      />
                                      <RdsInput
                                        name={`filter-value-1-${index}`}
                                        placeholder="Type here"
                                        inputType="text"
                                        size={InputSize.Small}
                                        className="mt-2"
                                      />
                                    </div>
                                    <div className="d-flex align-items-center mb-2">
                                      <input
                                        type="radio"
                                        id={`and-condition-${index}`}
                                        name={`filter-condition-${index}`}
                                        value="And"
                                        checked={filterCondition === "And"}
                                        onChange={() =>
                                          setFilterCondition("And")
                                        }
                                        className="me-1"
                                      />
                                      <label
                                        htmlFor={`and-condition-${index}`}
                                        className="me-3"
                                      >
                                        And
                                      </label>
                                      <input
                                        type="radio"
                                        id={`or-condition-${index}`}
                                        name={`filter-condition-${index}`}
                                        value="Or"
                                        checked={filterCondition === "Or"}
                                        onChange={() =>
                                          setFilterCondition("Or")
                                        }
                                        className="me-1"
                                      />
                                      <label htmlFor={`or-condition-${index}`}>
                                        Or
                                      </label>
                                    </div>
                                    <div>
                                      <RdsDropdown
                                        id={`filter-condition-2-${index}`}
                                        colorVariant="primary"
                                        displayType={DisplayType.Dropdown}
                                        label="Equals"
                                        size={InputSize.Small}
                                        style={Style.Outline}
                                        listItems={[
                                          { id: "equals", label: "Equals" },
                                          { id: "contains", label: "Contains" },
                                          {
                                            id: "startsWith",
                                            label: "Starts With",
                                          },
                                        ]}
                                        darkDropdown={false}
                                      />
                                      <RdsInput
                                        name={`filter-value-2-${index}`}
                                        placeholder="Type here"
                                        inputType="text"
                                        size={InputSize.Small}
                                        className="mt-2"
                                      />
                                    </div>
                                  </div>
                                )}
                              </span>
                            </div>
                          </th>
                        );
                        })}
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
                                <RdsCompIcon
                                  name="shuffle"
                                  height="16px"
                                  width="16px"
                                  fill={false}
                                  isCursorPointer={true}
                                />
                              </td>
                              <td className="text-center align-middle">
                                <div className="position-relative">
                                  <RdsDropdown
                                    buttonIcon="three_dotshorizontal"
                                    colorVariant="secondary"
                                    displayType={DisplayType.Dropdown}
                                    iconStroke
                                    id="1"
                                    layout={Layout.OnlyIcon}
                                    listItems={[
                                      {
                                        id: "1",
                                        label: "Settings",
                                        icon: "settings",
                                      },
                                      {
                                        id: "2",
                                        label: "Filter",
                                        icon: "filter",
                                      },
                                      {
                                        id: "3",
                                        label: "Sort",
                                        icon: "sort",
                                      },
                                      {
                                        id: "4",
                                        label: "Collapse",
                                      },
                                      {
                                        id: "5",
                                        label: "Duplicate",
                                      },
                                      {
                                        id: "6",
                                        label: "Add Column",
                                      },
                                      {
                                        id: "7",
                                        label: "Change Column Type",
                                      },
                                      {
                                        id: "8",
                                        label: "Rename",
                                      },
                                      {
                                        id: "9",
                                        label: "Delete",
                                      },
                                    ]}
                                    size="medium"
                                    state="default"
                                    style={Style.Transparent}
                                    darkDropdown={false}
                                    label=""
                                  />
                                </div>
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
                                            ></button>
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
                                                    {action.offId ==
                                                      undefined &&
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
                                                tableDataRow.id &&
                                              isDropdownOpen
                                                ? "none"
                                                : "block",
                                          }}
                                        >
                                          <RdsCompIcon
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
                                          <RdsCompIcon
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
                                            <RdsCompIcon
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

                              {props.isSwap && (
                                <th>
                                  <RdsCompIcon
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
                                            href=""
                                            onClick={() =>
                                              handleRowClick(tableDataRow.id)
                                            }
                                          >
                                            {tableDataRow[tableHeader.key]}
                                          </a>
                                        ) : (
                                          <>
                                            {tableHeader.datatype ===
                                              "text" && (
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
                                        {tableHeader.datatype ===
                                          "checkbox" && (
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
                                              <RdsCompIcon
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
                                              <RdsCompIcon
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
                                        {tableHeader.datatype ===
                                          "children" && (
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
                                              <RdsCompIcon
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
                                                    {action.offId ==
                                                      undefined &&
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
                                                    {action.offId ==
                                                      undefined &&
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
                                          <RdsCompIcon
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
                                          <RdsCompIcon
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
                                            <RdsCompIcon
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
              )}
              <div className="ps-3 ms-1">
                <RdsCompIcon
                  colorVariant="dark"
                  isCursorPointer
                  onClick={handleToggleColumn}
                  name={isAddColumn ? "with_border_plus" : "with_border_minus"}
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
    </div>
  );
};
export default RdsGrid;
