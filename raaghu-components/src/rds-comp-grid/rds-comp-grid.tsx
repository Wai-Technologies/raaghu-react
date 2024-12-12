import React, { useEffect, useRef, useState } from "react";
import { DndProvider, DragSourceMonitor, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./rds-comp-grid.css";
import { RdsBadge, RdsIcon, RdsPagination, RdsSearch } from "../rds-elements";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css"; // Import the styles for resizable

export interface RdsCompGridCombinedProps {
  tableHeaders: {
    key: string;
    label: string;
    displayName: string;
    hasSearch?: boolean;
    filter?: boolean;
    wraptext?: boolean;
    sortable?: boolean;
    datatype?: string;
    dataLength?: number;
  }[];
  tableData: {
    id: string | number;
    [key: string]: any;
  }[];
  allSearch?: boolean;
  allFilter?: boolean;
  recordsPerPage?: number;
  recordsPerPageSelectListOption?: boolean;
  pagination: boolean;
  onPaginationHandler?: (currentPage: number, recordsPerPage: number) => void;
  totalRecords?: any;
  actions?: {
    displayName: string;
    id: string;
    offId?: string;
    modalId?: string;
  }[];
  actionPosition?: "right" | "left";
  onActionSelection?: (rowData: any, actionId: any) => void;
  enablecheckboxselection?: boolean;
  onRowSelect?: (data: any) => void;
}

const DraggableColumnHeader: React.FC<{
  column: {
    sortable: React.JSX.Element;
    displayName: string;
    key: string;
    hasSearch?: boolean;
    filter?: boolean;
  };
  index: number;
  moveColumn: (fromIndex: number, toIndex: number) => void;
  hasSearch?: boolean;
  filter?: boolean;
  onSearchChange?: (key: string, value: string) => void;
  onFilterClick?: (key: string, position: DOMRect) => void;
  allSearch?: boolean;
  allFilter?: boolean;
  onSortClick?: (key: string) => void;
  sortConfig?: { key: string; direction: "asc" | "desc" } | null;
}> = ({
  column,
  index,
  moveColumn,
  hasSearch,
  filter,
  onSearchChange,
  onFilterClick,
  allSearch,
  allFilter,
  onSortClick,
  sortConfig,
}) => {
  const refheader = useRef<HTMLTableHeaderCellElement>(null);
  const [resizeStop, setResizeStop] = useState(true);
  const [isResizing, setIsResizing] = useState(false);
  const [{ isDragging }, drag] = useDrag({
    type: "COLUMN",
    item: { index },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "COLUMN",
    hover(item: { index: number }) {
      if (item.index !== index) {
        if (resizeStop == true) {
          moveColumn(item.index, index);
          item.index = index;
        }
      }
    },
  });

  if (!isResizing) {
    // if resinging start the  desable drag drop
    drag(drop(refheader));
  }

  const handleSortIconClick = () => {
    if (onSortClick) {
      onSortClick(column.key);
    }
  };

  const handleFilterIconClick = () => {
    if (refheader.current && onFilterClick) {
      const position = refheader.current.getBoundingClientRect();
      onFilterClick(column.key, position);
    }
  };
  const handleResizeStop = (event: any, { size }: any) => {
    setResizeStop(true);
    setIsResizing(false);
  };
  const handleResizeStart = (event: any, { size }: any) => {
    setResizeStop(false);
    setIsResizing(true);
  };

  return (
    <>
      <th
        className={`text-nowrap ${isDragging ? 'dragging' : 'not-dragging'}`}
        ref={refheader}
      >
        <div className="d-flex justify-content-start align-items-center full-width">
          <span>{column.displayName}</span>
          {column.sortable && (
            <div className="cursor-pointer sorting-alignment" onClick={handleSortIconClick}>
              {sortConfig && sortConfig.key === column.key
                ? sortConfig.direction === "asc"
                  ? "▲"
                  : "▼"
                : "↕"}
            </div>
          )}

          {(column.filter || allFilter) && (
            <div className="cursor-pointer">
              <RdsIcon
                colorVariant="dark"
                height="10px"
                name="filter"
                stroke
                width="20px"
                onClick={handleFilterIconClick}
              />
            </div>
          )}

          <ResizableBox
            width={10} // Initial width of the column header
            height={20} // Height of the column header
            axis="x"
            resizeHandles={["e"]}
            minConstraints={[50, Infinity]} // Minimum width the column can resize to
            maxConstraints={[400, Infinity]} // Maximum width the column can resize to
            onResizeStop={handleResizeStop}
            onResizeStart={handleResizeStart}
          ></ResizableBox>
        </div>

        <div className="d-flex justify-content-between align-items-center full-width">
          {(column.hasSearch || allSearch) && (
            <RdsSearch
              labelPosition="top"
              placeholder="Search"
              size="small"
              onChange={(e) =>
                onSearchChange && onSearchChange(column.key, e.target.value)
              }
            />
          )}
        </div>
      </th>
    </>
  );
};

const RdsCompGrid = ( props: RdsCompGridCombinedProps ) => {
  const [searchTexts, setSearchTexts] = useState<{ [key: string]: string }>({});
  const [columns, setColumns] = useState(props.tableHeaders);
  const [totalData, setTotalData] = useState(props.tableData);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(
    props.recordsPerPage ? props.recordsPerPage : 10
  );
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);
  const [totalRecords, setTotalRecords] = useState<any>(props.totalRecords);
  const actionPosition =
    Object.prototype.hasOwnProperty.call(props, "actionPosition") &&
    props.actionPosition === "right"
      ? true
      : false;
  const [activeDropdownId, setActiveDropdownId] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLUListElement>(null);
  const [array, setArray] = useState<boolean[]>([]);
  const [data, setData] = useState(props.tableData);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

  const moveColumn = (fromIndex: number, toIndex: number) => {
    const updatedColumns = [...columns];
    const [removed] = updatedColumns.splice(fromIndex, 1);
    updatedColumns.splice(toIndex, 0, removed);
    setColumns(updatedColumns);
  };

  const handleSearchChange = (key: string, value: string) => {
    setSearchTexts((prev) => ({ ...prev, [key]: value }));
    setTotalData(filteredData);
  };

  const [popupData, setPopupData] = useState<any[]>([]);
  const [popupVisible, setPopupVisible] = useState<boolean>(false);
  const [popupPosition, setPopupPosition] = useState<{
    top: number;
    left: number;
  }>({ top: 0, left: 0 });
  const [popupColumnKey, setPopupColumnKey] = useState<string | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<{
    [key: string]: Set<string>;
  }>({});

  const handleFilterClick = (key: string, position: DOMRect) => {
    const distinctData = Array.from(
      new Set(props.tableData.map((row) => row[key]))
    );
    setPopupData(distinctData);
    setPopupVisible(true);
    setPopupColumnKey(key);
    const width = position.width;
    const lastColumnKey = columns[columns.length - 1];

    if (lastColumnKey.key !== key) {
      setPopupPosition({
        top: position.bottom,
        left: position.left + width - 20,
      });
    } else {
      setPopupPosition({ top: position.bottom, left: position.left + 12 });
    }
  };

  const handleClosePopup = () => {
    setPopupVisible(false);
  };

  const handleFilterChange = (value: string, checked: boolean) => {
    setSelectedFilters((prev) => {
      const newFilters = { ...prev };
      if (!newFilters[popupColumnKey!]) {
        newFilters[popupColumnKey!] = new Set();
      }
      if (checked) {
        newFilters[popupColumnKey!].add(value);
      } else {
        newFilters[popupColumnKey!].delete(value);
      }
      return newFilters;
    });
  };

  const filteredData = props.tableData.filter((row) => {
    return (
      Object.entries(searchTexts).every(([key, value]) =>
        row[key].toString().toLowerCase().includes(value.toLowerCase())
      ) &&
      Object.entries(selectedFilters).every(([key, values]) => {
        if (values.size === 0) return true;
        return values.has(row[key]);
      })
    );
  });

  const getSortedData = (
    data: any[],
    config: { key: string; direction: "asc" | "desc" } | null,
    currentPage: any
  ) => {
    let startingIndex = 0;
    if (currentPage === 1) {
      startingIndex = 0;
    } else {
      startingIndex = (currentPage - 1) * rowsPerPage;
    }

    if (!config) return data.slice(startingIndex, rowsPerPage * currentPage);

    return [...data]
      .sort((a, b) => {
        if (a[config.key] < b[config.key]) {
          return config.direction === "asc" ? -1 : 1;
        }
        if (a[config.key] > b[config.key]) {
          return config.direction === "asc" ? 1 : -1;
        }
        return 0;
      })
      .slice(startingIndex, rowsPerPage * currentPage);
  };

  const sortedData = getSortedData(
    selectedFilters ? filteredData : totalData,
    sortConfig,
    currentPage
  );

  const handleSortClick = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const [rowStatus, setRowStatus] = useState({
    startingRow: 0,
    endingRow: props.recordsPerPage,
  });

  const onPageChangeHandler = (currentPage: number, recordsPerPage: number) => {
    props.onPaginationHandler &&
      props.onPaginationHandler(currentPage, recordsPerPage);
    if (totalRecords) {
      setRowStatus({
        startingRow: (currentPage - 1) * recordsPerPage, //0, //0-index
        endingRow: recordsPerPage, //considering that 1st element has '0' index
      });
    } else {
      setRowStatus({
        startingRow: (currentPage - 1) * recordsPerPage, //0-index
        endingRow: currentPage * recordsPerPage, //considering that 1st element has '0' index
      });
    }
    setCurrentPage(currentPage);
  };

  useEffect(() => {
    setTotalRecords(props.totalRecords);
  }, [props.totalRecords]);

  const resetGrid = () => {
    setSortConfig(null);
    setTotalData(props.tableData); // Reset data to original
    setSearchTexts({}); // Reset search texts
    setSelectedFilters({}); // Reset filters
    setCurrentPage(1); // Reset to the first page
  };

  const toggleDropdown = (id: any) => {
    setIsDropdownOpen(id === activeDropdownId ? !isDropdownOpen : true);
    setActiveDropdownId(id);
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

  const handleChange = ( e: any, rowIndex: number ) => {
    const { checked } = e.target;
    setSelectedRows((prevSelectedRows) => {
      const newSelectedRows = new Set(prevSelectedRows);
      if (rowIndex === -1) {
        // "Select All" checkbox
        if (checked) {
          props.tableData.forEach((_, index) => newSelectedRows.add(index));
        } else {
          newSelectedRows.clear();
        }
      } else {
        // Individual checkbox
        if (checked) {
          newSelectedRows.add(rowIndex);
        } else {
          newSelectedRows.delete(rowIndex);
        }
      }
      return newSelectedRows;
    });
  };

const Popup: React.FC<{
  data: any[];
  onClose: () => void;
  onFilterChange: (value: string, checked: boolean) => void;
  selectedValues: Set<string>;
  position: { top: number; left: number };
}> = ({ data, onClose, onFilterChange, selectedValues, position }) => {
  return (
    <div className="popup" style={{ top: position.top, left: position.left }}>
      <div className="popup-content">
        <div className="d-flex justify-content-end ">
         <span className="cursor-pointer"> <RdsIcon
            colorVariant="dark"
            height="10px"
            name="cancel"
            stroke
            width="10px"
            onClick={onClose}
          /></span>
        </div>
        {data.map((item, index) => (
          <div key={index} className="cursor-pointer d-flex align-items-center ps-2">
            <input
              type="checkbox"
              id={`checkbox-${index}`}
              checked={selectedValues.has(item)}
              onChange={(e) => onFilterChange(item, e.target.checked)}
            />
            <label className="ms-2" htmlFor={`checkbox-${index}`}>{item}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

  return (
    <DndProvider backend={HTML5Backend}>
      <div
        className={
          props.actionPosition == "left"
            ? "table-responsive"
            : "table-responsive-none"
        }
      >
        <div className="table-responsive-sm">
          <table className={`table table-hover table-bordered`} id="grid">
            <thead className="text-nowrap">
              <tr className="align-top">
                {actionPosition != true &&
                  props.tableHeaders &&
                  props.tableHeaders?.length > 0 &&
                  props.actions &&
                  props.actions?.length > 0 && (
                    <th className="text-center fw-medium">Actions</th>
                  )}

                {props.enablecheckboxselection && (
                  <th scope="col">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="allSelect"
                      onChange={(e) => handleChange(e, -1)}
                      checked={selectedRows.size === props.tableData.length}
                    />
                  </th>
                )}

                {columns.map((column, index) => (
                  <DraggableColumnHeader
                    key={column.key}
                    column={{
                      ...column,
                      sortable: <></> // Replace undefined with an empty React element
                    }}
                    index={index}
                    moveColumn={moveColumn}
                    onSearchChange={handleSearchChange}
                    onFilterClick={handleFilterClick}
                    onSortClick={handleSortClick}
                    sortConfig={sortConfig}
                    allSearch={props.allSearch}
                    allFilter={props.allFilter}
                  />
                ))}

                {actionPosition &&
                  props.tableHeaders &&
                  props.tableHeaders?.length > 0 &&
                  props.actions &&
                  props.actions?.length > 0 && (
                    <th className="text-center fw-medium">Actions</th>
                  )}
              </tr>
            </thead>

            <tbody>
              {/* Render table rows using the reordered columns */}
              {sortedData.map((row, rowIndex) => (
                <tr key={row.id}>
                  {actionPosition != true &&
                    props.tableHeaders &&
                    props.tableHeaders?.length > 0 &&
                    props.actions &&
                    props.actions?.length > 0 && (
                      <td className="text-center fw-medium">
                        <>
                          <div className="btn-group dropstart">
                            <button
                              className="btn btn-sm btn-icon border-0 three-dot-btn"
                              type="button"
                              aria-expanded={ activeDropdownId === row.id ? "true" : "false" }
                              onClick={() => toggleDropdown(row.id)}
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
                              />
                            </button>
                            <ul
                              ref={dropdownRef}
                              aria-labelledby="dropdownMenuButton"
                              className={`dropdown-menu dropdown-adjusted ${ activeDropdownId === row.id && isDropdownOpen ? "show" : "" }`}
                            >
                              {props.actions.map((action, actionIndex) => (
                                <li key={"action-" + actionIndex + "-inside-tableRow" + row.id } >
                                  {action.modalId && (
                                    <a
                                      data-bs-toggle="modal"
                                      data-bs-target={`#${action?.modalId}`}
                                      aria-controls={action?.modalId}
                                      onClick={(e) => actionOnClickHandler( e, row, Number(row.id), action )}
                                      className="dropdown-item"
                                    >
                                      {action.displayName}
                                    </a>
                                  )}
                                  {action.offId && (
                                    <a
                                      data-bs-toggle="offcanvas"
                                      data-bs-target={`#${action?.offId}`}
                                      aria-controls={action?.offId}
                                      onClick={(e) => actionOnClickHandler( e, row, Number(row.id), action ) }
                                      className="dropdown-item"
                                    >
                                      {action.displayName}
                                    </a>
                                  )}
                                  {action.offId == undefined && action.modalId == undefined && (
                                      <a
                                        onClick={(e) => actionOnClickHandler( e, row, Number(row.id), action ) }
                                        className="dropdown-item"
                                      >
                                        {action.displayName}
                                      </a>
                                    )}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </>
                      </td>
                    )}

                  {props.enablecheckboxselection && (
                    <th scope="row" className="align-middle">
                      <input
                        type="checkbox"
                        name={row ? rowIndex.toString() : ""}
                        checked={selectedRows.has(rowIndex)}
                        onChange={(e) => handleChange(e, rowIndex)}
                        className="form-check-input"
                        id="rowcheck{user.id}"
                      />
                    </th>
                  )}

                  {columns.map((column) => (
                    <td
                      className={`px-2 align-middle fw-medium ${ column.wraptext ? "wrap-text" : "text-nowrap" }`}
                      key={column.key}
                    >
                      {column.datatype === "badge" ? (
                        <RdsBadge
                          colorVariant={ row[column.key]?.badgeColorVariant || "success" }
                          label={row[column.key]?.content || row[column.key]}
                        />
                      ) : (
                        row[column.key]
                      )}
                    </td>
                  ))}

                  {actionPosition &&
                    props.tableHeaders &&
                    props.tableHeaders?.length > 0 &&
                    props.actions &&
                    props.actions?.length > 0 && (
                      <td className="text-center fw-medium">
                        <>
                          <div className="btn-group dropstart">
                            <button
                              className="btn btn-sm btn-icon border-0 three-dot-btn"
                              type="button"
                              aria-expanded={ activeDropdownId === row.id ? "true" : "false" }
                              onClick={() => toggleDropdown(row.id)}
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
                              />
                            </button>
                            <ul
                              ref={dropdownRef}
                              aria-labelledby="dropdownMenuButton"
                              className={`dropdown-menu dropdown-adjusted ${ activeDropdownId === row.id && isDropdownOpen ? "show" : "" }`}
                            >
                              {props.actions.map((action, actionIndex) => (
                                <li
                                  key={ "action-" + actionIndex + "-inside-tableRow" + row.id } >
                                  {action.modalId && (
                                    <a
                                      data-bs-toggle="modal"
                                      data-bs-target={`#${action?.modalId}`}
                                      aria-controls={action?.modalId}
                                      onClick={(e) => actionOnClickHandler( e, row, Number(row.id), action ) }
                                      className="dropdown-item"
                                    >
                                      {action.displayName}
                                    </a>
                                  )}
                                  {action.offId && (
                                    <a
                                      data-bs-toggle="offcanvas"
                                      data-bs-target={`#${action?.offId}`}
                                      aria-controls={action?.offId}
                                      onClick={(e) => actionOnClickHandler( e, row, Number(row.id), action ) }
                                      className="dropdown-item"
                                    >
                                      {action.displayName}
                                    </a>
                                  )}
                                  {action.offId == undefined &&
                                    action.modalId == undefined && (
                                      <a
                                        onClick={(e) => actionOnClickHandler( e, row, Number(row.id), action ) }
                                        className="dropdown-item"
                                      >
                                        {action.displayName}
                                      </a>
                                    )}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </>
                      </td>
                    )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {popupVisible && (
        <Popup
          data={popupData}
          onClose={handleClosePopup}
          onFilterChange={handleFilterChange}
          selectedValues={selectedFilters[popupColumnKey!] || new Set()}
          position={popupPosition}
        />
      )}

      <div className="pagination-container gap-2">
       <span className="cursor-pointer"> <RdsIcon
          colorVariant="primary"
          height="20px"
          name="refresh"
          stroke
          width="20px"
          onClick={resetGrid}
        /></span>

        {props.pagination && (
          <RdsPagination
            totalRecords={totalRecords}
            recordsPerPage={props.recordsPerPage ? props.recordsPerPage : 10}
            onPageChange={onPageChangeHandler}
            paginationType={
              props.recordsPerPageSelectListOption ? "default" : "advanced"
            }
          ></RdsPagination>
        )}
      </div>
    </DndProvider>
  );
};

export default RdsCompGrid;
