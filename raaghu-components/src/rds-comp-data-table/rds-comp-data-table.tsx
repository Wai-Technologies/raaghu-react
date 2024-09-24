import React, { MouseEvent, useState, useEffect, useRef } from "react";
import "./rds-comp-data-table.css";
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom';
import { RdsAvatar, RdsBadge, RdsButton, RdsIcon, RdsIllustration, RdsInput, RdsLabel, RdsPagination, RdsTooltip } from "../rds-elements";
import { fontWeight } from "../../../raaghu-elements/libs/types";
export interface RdsCompDatatableProps {
  fontWeight?: string;
  enablecheckboxselection?: boolean;
  illustration?: boolean;
  isIlliustrationSmall?: boolean;
  noDataTitle?: string,
  noDataheaderTitle?: string,
  classes?: string;
  swapRows?: any
  isSwap?: any
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
    isTooltipCard?: boolean;
    addCustomClassTd?: boolean;
  }[];
  actions?: {
    displayName: string;
    widthMaxContent?: boolean;
    id: string;
    offId?: string;
    modalId?: string;
  }[];
  globalActions?: {
    displayName: string;
    id: string;
    offId?: string;
    modalId?: string;
  }[];
  tableData: any[];
  pagination: boolean;
  recordsPerPage?: number;
  recordsPerPageSelectListOption?: boolean;
  onActionSelection?: (
    rowData: any,
    actionId: any
  ) => void;
  onGlobalActionSelection?: (
    selectedRowIds: any,
    actionId: any
  ) => void;
  onRowSelect?: (data: any) => void
  tableStyle?: any;
  alignmentType?: any;
  actionPosition?: "right" | "left",
  onPaginationHandler?: (currentPage: number, recordsPerPage: number) => void,
  totalRecords?: any,
  data?: any;
  buttonAction?: boolean;
  // onSortSelection(arg: {
  //    sortClickEvent: MouseEvent<HTMLSpanElement, globalThis.MouseEvent>;
  //    sortOrder: string;
  // }): void;
}
const RdsCompDatatable = (props: RdsCompDatatableProps) => {
 // const navigate = useNavigate();
  const [data, setData] = useState(props.tableData);
  const [totalRecords, setTotalRecords] = useState<any>(props.totalRecords);

  const illusPath = "../../../.storybook/assets/lottie-files/outlined/dual-color/illustration-light.json"
  const [array, setArray] = useState<boolean[]>([]);
  const [selectedRowIds, setSelectedRowIds] = useState<number[]>([]);
  const [rowStatus, setRowStatus] = useState({
    startingRow: 0,
    endingRow: props.recordsPerPage,
  });
  let sort: boolean;
  useEffect(() => {
    setTotalRecords(props.totalRecords);
  }, [props.totalRecords]);
  useEffect(() => {
    if (!sort) {
      setData(props.tableData);
      const tempArray: boolean[] = [];
      props?.tableData?.map(res => {
        tempArray.push(false);
      });
      setArray(tempArray);
    }

  }, [props.tableData]);

  const onPageChangeHandler = (currentPage: number, recordsPerPage: number) => {
    props.onPaginationHandler && props.onPaginationHandler(currentPage, recordsPerPage);
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
    // alert("actionOnClickHandler " + action.id + " " + tableDataRowIndex + " " + tableDataRow + " " + tableDataRow.id);
    const allBackdrops = document.querySelectorAll(".offcanvas-backdrop, .modal-backdrop");
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

    if (action.id === "edit" && action.offId !== undefined && action.modalId !== undefined) {
      const tempData = data?.map((Data) => {
        if (Data.id == tableDataRowIndex) {
          return { ...Data, isEndUserEditing: true };
        } else {
          return { ...Data };
        }
      });
      setData(tempData);
    }
    if (props.onActionSelection !== undefined) {
      props.onActionSelection(tableDataRow, action.id);
    }
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
    const { name, checked } = e.target;
    if (name === "allSelect") {
      const tempUser = data?.map((user) => {
        return { ...user, selected: checked };
      });
      setData(tempUser);
      props.onRowSelect !== undefined && props.onRowSelect(tempUser);
      if (checked) {
        setSelectedRowIds(data?.map((user) => user.id));
      } else {
        setSelectedRowIds([]);
      }
    } else {
      const id = parseInt(name, 10);
      const tempUser = data?.map((user) => {
        if (user.id === id) {
          return { ...user, selected: checked };
        }
        return user;
      });
      setData(tempUser);
      props.onRowSelect !== undefined && props.onRowSelect(tempUser);
      if (checked) {
        setSelectedRowIds((prevSelectedRowIds) => [...prevSelectedRowIds, id]);
      } else {
        setSelectedRowIds((prevSelectedRowIds) =>
          prevSelectedRowIds.filter((selectedId) => selectedId !== id)
        );
      }
    }
  };

  const globalActionOnClickHandler = (
    clickEvent: any,
    selectedRowIds: any,
    globalActions: {
      displayName: string;
      id: string;
      offId?: string;
      modalId?: string;
    }
  ) => {
    const allBackdrops = document.querySelectorAll(".offcanvas-backdrop, .modal-backdrop");
    if (allBackdrops.length > 1) {
      for (let i = 0; i < allBackdrops.length - 1; i++) {
        allBackdrops[i].remove();
      }
    }
    props.onGlobalActionSelection != undefined &&
      props.onGlobalActionSelection(selectedRowIds, globalActions.id);
  };

  const onSortClickHandler = (
    event: MouseEvent<HTMLSpanElement, globalThis.MouseEvent>,
    sortOrder: string,
    col: string
  ) => {
    const sorted = [...data].sort((a, b) => {
      if (a[col] === undefined) return 1;
      if (b[col] === undefined) return -1;
      if (a[col] === undefined && b[col] === undefined) return 0;
      return (
        a[col].toString().localeCompare(b[col].toString(), "en", {
          numeric: true,
        }) * (sortOrder === "ascending" ? 1 : -1)
      );
    });
    setData(sorted);
    sort = true;
  };
  const Classes = props.classes;

  const actionPosition = Object.prototype.hasOwnProperty.call(props, "actionPosition") && props.actionPosition === "right" ? true : false;
  return (
    <>
      {data?.length == 0 && !totalRecords && props.illustration && (
        <div className="d-flex align-items-center justify-content-center">
          <RdsIllustration
            label={props.noDataheaderTitle}
            subLabel={props.noDataTitle}
            displayType="animate"
            height="200px"
          //  width="200px"
        //    vHeightClass={false}
         //   isAnimatePath="../assets/portal-assets/Light - No Records Available.gif"
          />
        </div>
      )}
      {data?.length == 0 && !totalRecords && props.isIlliustrationSmall && (
        <div className="d-flex align-items-center justify-content-center">
          <RdsIllustration
            label={props.noDataheaderTitle}
            subLabel={props.noDataTitle}
            displayType="animate"
            height="200px"
          //  width="200px"
            //vHeightClass={true}
          //  isAnimatePath="../assets/portal-assets/Light - No Records Available.gif"
          />
        </div>
      )}

      {data?.length > 0 && (<>
        <div className="overflow-auto">
          <table
            className={`table table-hover table-bordered ${Classes} `}
            id="sortTable"
          >
            <thead className="text-nowrap">
              <tr className="align-middle " >
                {actionPosition != true && props.tableHeaders && props.tableHeaders?.length > 0 && props.actions && props.actions?.length > 0 && (
                  <th
                    className="align-items-center d-flex justify-content-center" >
                    <span>{"AbpUi.Actions"}</span>
                    <span className="position-relative px-1">
                      {props.enablecheckboxselection && (
                        <button
                          className="btn btn-sm btn-icon border-0 three-dot-btn"
                          type="button"
                          aria-expanded="false"
                          data-bs-toggle="dropdown"
                          data-bs-auto-close="true"
                          id="dropdownMenuButton"
                          data-testid="action-btn" >
                          <RdsIcon
                            name={"three_dots"}
                            height="14px"
                            width="14px"
                            stroke={false}
                            fill={true}
                            tooltip={true}
                            tooltipTitle={"Global Actions"}
                            tooltipPlacement="top"
                          />
                        </button>
                      )}
                      {(
                        <ul aria-labelledby="dropdownMenuButton" className="dropdown-menu">
                          {props.globalActions?.map((globalActions, actionIndex) => (
                            <li
                              key={
                                "action-" +
                                actionIndex +
                                "-inside-tableRow" +
                                index
                              } >
                              {globalActions.offId == undefined && globalActions.modalId == undefined && (
                                <a onClick={(e) => {
                                  globalActionOnClickHandler(
                                    e,
                                    selectedRowIds,
                                    globalActions
                                  );
                                }}
                                  className="dropdown-item text-wrap" >
                                  {globalActions.displayName}
                                </a>
                              )}
                              {globalActions.modalId && (
                                <a
                                  data-bs-toggle="modal"
                                  data-bs-target={`#${globalActions?.modalId}`}
                                  aria-controls={globalActions?.modalId}
                                  //data-bs-backdrop={false}
                                  onClick={(e) => {
                                    globalActionOnClickHandler(
                                      e,
                                      selectedRowIds,
                                      globalActions
                                    );
                                  }}
                                  className="dropdown-item text-wrap" >
                                  {(globalActions.displayName)}
                                </a>
                              )}
                              {globalActions.offId &&
                                (
                                  <a
                                    data-bs-toggle="offcanvas"
                                    data-bs-target={`#${globalActions?.offId}`}
                                    aria-controls={globalActions?.offId}
                                    // data-bs-backdrop={false}
                                    onClick={(e) => {
                                      globalActionOnClickHandler(
                                        e,
                                        selectedRowIds,
                                        globalActions
                                      );
                                    }}
                                    className="dropdown-item text-wrap" >
                                    {(globalActions.displayName)}
                                  </a>
                                )
                              }
                            </li>
                          ))}
                        </ul>
                      )}
                    </span>
                  </th>
                )}
                {props.isSwap && (<th></th>)}
                {props.enablecheckboxselection && (
                  <th scope="col">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="allSelect"
                      checked={
                        data.filter((user) => user?.selected == true)?.length ==
                        data?.length
                      }
                      onChange={handleChange}
                    />
                  </th>
                )}
                {props?.tableHeaders?.map((tableHeader, index) => (
                  <th scope="col" key={"tableHeader-" + index}>
                    <div className={`align-items-center d-flex ${tableHeader.datatype === "iconAvatarTitle" ? "justify-content-center" : ""}`}>
                      <span className="fw-medium">
                        {tableHeader.displayName}
                      </span>
                      <div className="header-options mobile-header-option cursor-pointer ps-1">
                        {tableHeader.sortable && (
                          <span className="px-2 d-flex">
                            <span
                              onClick={(e) =>
                                onSortClickHandler(e, "ascending", tableHeader.key)
                              } >
                              <RdsIcon
                                name={"up"}
                                height="12px"
                                width="auto"
                                stroke={true}
                              />
                            </span>
                            <span
                              onClick={(e) =>
                                onSortClickHandler(e, "descending", tableHeader.key)
                              } >
                              <RdsIcon
                                name={"down"}
                                height="12px"
                                width="12px"
                                stroke={true}
                              />
                            </span>
                          </span>
                        )}
                      </div>
                    </div>
                  </th>
                ))}
                {actionPosition && props.tableHeaders && props.tableHeaders?.length > 0 && props.actions && props.actions?.length > 0 && (
                  <>
                    <th
                      className="align-items-center d-flex justify-content-center" >
                      <span className="fw-medium">Actions</span>
                      <span className="position-relative px-1">
                        {props.enablecheckboxselection && (
                          <button
                            className="btn btn-sm btn-icon border-0 three-dot-btn"
                            type="button"
                            aria-expanded="false"
                            data-bs-toggle="dropdown"
                            data-bs-auto-close="true"
                            id="dropdownMenuButton"
                            data-testid="action-btn" >
                            <RdsIcon
                              name={"three_dots"}
                              height="14px"
                              width="14px"
                              stroke={false}
                              fill={true}
                              tooltip={true}
                              tooltipTitle={"Global Actions"}
                              tooltipPlacement="top"
                            />
                          </button>
                        )}
                        {(
                          <ul aria-labelledby="dropdownMenuButton" className="dropdown-menu">
                            {props.globalActions?.map((globalActions, actionIndex) => (
                              <li
                                key={
                                  "action-" +
                                  actionIndex +
                                  "-inside-tableRow" +
                                  index
                                } >
                                {globalActions.offId == undefined && globalActions.modalId == undefined && (
                                  <a onClick={(e) => {
                                    globalActionOnClickHandler(
                                      e,
                                      selectedRowIds,
                                      globalActions
                                    );
                                  }}
                                    className="dropdown-item text-wrap" >
                                    {(globalActions.displayName)}
                                  </a>
                                )}
                                {globalActions.modalId && (
                                  <a
                                    data-bs-toggle="modal"
                                    data-bs-target={`#${globalActions?.modalId}`}
                                    aria-controls={globalActions?.modalId}
                                    //data-bs-backdrop={false}
                                    onClick={(e) => {
                                      globalActionOnClickHandler(
                                        e,
                                        selectedRowIds,
                                        globalActions
                                      );
                                    }}
                                    className="dropdown-item text-wrap" >
                                    {(globalActions.displayName)}
                                  </a>
                                )}
                                {globalActions.offId &&
                                  (
                                    <a
                                      data-bs-toggle="offcanvas"
                                      data-bs-target={`#${globalActions?.offId}`}
                                      aria-controls={globalActions?.offId}
                                      // data-bs-backdrop={false}
                                      onClick={(e) => {
                                        globalActionOnClickHandler(
                                          e,
                                          selectedRowIds,
                                          globalActions
                                        );
                                      }}
                                      className="dropdown-item text-wrap" >
                                      {(globalActions.displayName)}
                                    </a>
                                  )
                                }
                              </li>
                            ))}
                          </ul>
                        )}
                      </span>
                    </th>
                  </>
                )
                }
              </tr>
            </thead>
            <tbody>
              {Array.isArray(data) && data?.map(
                (tableDataRow, index) => {
                  const totalActions = (tableDataRow?.rowActions && props?.actions) ? [...props.actions, tableDataRow?.rowActions] : props.actions;

                  return (
                    (props.pagination ? typeof rowStatus.endingRow != "undefined" && index >= rowStatus.startingRow && index < rowStatus.endingRow : true) &&
                    (
                      <tr
                        onDragStart={(e) => handleDragStart(e, index)}
                        onDragOver={(e) => e.preventDefault()}
                        onDragEnter={(e) => handleDragEnter(e, index)}
                        draggable
                        key={"tableRow-" + index}>
                        {actionPosition != true && totalActions && totalActions?.length > 1 && (
                          <td className="align-middle text-center">
                            {!tableDataRow.isEndUserEditing ? (
                              <>
                                <div className="btn-group dropstart">
                                  <button
                                    className="btn btn-sm btn-icon border-0 three-dot-btn"
                                    type="button"
                                    aria-expanded="false"
                                    data-bs-toggle="dropdown"
                                    data-bs-auto-close="true"
                                    data-bs-boundary="clippingParents"
                                    id="dropdownMenuButton"
                                    data-testid="action-btn" >
                                    <RdsIcon
                                      name={"three_dots"}
                                      height="14px"
                                      width="14px"
                                      stroke={true}
                                      fill={true}
                                      tooltip={true}
                                      tooltipTitle={("More Actions") || ""}
                                      tooltipPlacement="top"
                                    />
                                  </button>
                                  {/* array[index] &&  */}
                                  {(
                                    <ul aria-labelledby="dropdownMenuButton" className="dropdown-menu">
                                      {totalActions?.map((action, actionIndex) => (
                                        <li
                                          key={
                                            "action-" +
                                            actionIndex +
                                            "-inside-tableRow" +
                                            index
                                          } >
                                          {action.modalId && (
                                            <a
                                              data-bs-toggle="modal"
                                              data-bs-target={`#${action?.modalId}`}
                                              aria-controls={action?.modalId}
                                              // data-bs-backdrop={false}
                                              onClick={(e) => {
                                                actionOnClickHandler(
                                                  e,
                                                  tableDataRow,
                                                  tableDataRow.id,
                                                  action
                                                );
                                              }}
                                              className="dropdown-item text-wrap" >
                                              {(action.displayName)}
                                            </a>
                                          )}
                                          {action.offId &&
                                            (
                                              <>
                                                <a
                                                  data-bs-toggle="offcanvas"
                                                  data-bs-target={`#${action?.offId}`}
                                                  aria-controls={action?.offId}
                                                  // data-bs-backdrop={false}
                                                  onClick={(e) => {
                                                    actionOnClickHandler(
                                                      e,
                                                      tableDataRow,
                                                      tableDataRow.id,
                                                      action
                                                    );
                                                  }}
                                                  className="dropdown-item text-wrap" >
                                                  {(action.displayName)}
                                                </a>
                                              </>
                                            )
                                          }
                                          {action.offId == undefined && action.modalId == undefined && (
                                            <>
                                              <a
                                                onClick={(e) => {
                                                  actionOnClickHandler(
                                                    e,
                                                    tableDataRow,
                                                    tableDataRow.id,
                                                    action
                                                  );
                                                }}
                                                className="dropdown-item text-wrap"> {(action.displayName)}</a>
                                            </>
                                          )
                                          }

                                        </li>
                                      ))}
                                    </ul>)}
                                </div>
                              </>
                            ) : (
                              <div className="d-flex ">
                                <RdsButton
                                  class="action"
                                  colorVariant="primary"
                                  size="medium"
                                  tooltipTitle={""}
                                  type={"button"}
                                  onClick={(e) => {
                                    onEditCheck(e, tableDataRow, tableDataRow.id);
                                  }} >
                                  <RdsIcon
                                    name={"check"}
                                    height="14px"
                                    width="14px"
                                    stroke={true}
                                    fill={false}
                                  // class="bi bi-check2"
                                  />
                                </RdsButton>
                                <RdsButton
                                  class="ms-2 text-white"
                                  colorVariant="danger"
                                  tooltipPlacement="top"
                                  size="medium"
                                  tooltipTitle={""}
                                  type={"button"}
                                  onClick={(e) => {
                                    onEditClose(e, tableDataRow, tableDataRow.id);
                                  }} >
                                  <RdsIcon
                                    name={"close"}
                                    height="14px"
                                    width="14px"
                                    stroke={true}
                                    fill={true}
                                  // class="bi bi-close"
                                  />
                                </RdsButton>
                              </div>
                            )}
                          </td>
                        )}
                        {actionPosition != true && totalActions && totalActions?.length == 1 && (
                          <div className="d-grid  justify-content-center single_action_icon">
                            {totalActions?.map((action, actionIndex) => (
                              <>
                                <RdsButton
                                  colorVariant="primary"
                                  isOutline
                                  label={action.displayName || "BUTTON"}
                                  size="medium"
                                  onClick={(e) => {
                                    actionOnClickHandler(
                                      e,
                                      tableDataRow,
                                      tableDataRow.id,
                                      action
                                    );
                                  }}
                                  databstoggle={action.offId ? "offcanvas" : action.modalId ? "modal" : ""}
                                  databstarget={action.offId ? `#${action?.offId}` : action.modalId ? `#${action?.modalId}` : ""}
                                />
                                <RdsButton
                                  colorVariant="secondary"
                                  isOutline
                                  label={action.displayName || "BUTTON"}
                                  size="medium"
                                  onClick={(e) => {
                                    actionOnClickHandler(
                                      e,
                                      tableDataRow,
                                      tableDataRow.id,
                                      action
                                    );
                                  }}
                                  databstoggle={action.offId ? "offcanvas" : action.modalId ? "modal" : ""}
                                  databstarget={action.offId ? `#${action?.offId}` : action.modalId ? `#${action?.modalId}` : ""}
                                />
                              </>
                            ))}
                          </div>
                        )}
                        {props.isSwap && (
                          <th  >
                            <RdsIcon name="six_dots_vertical" height="14px" width="14px" stroke={false} fill={true} />
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
                        {props.tableHeaders?.map((tableHeader, tableHeaderIndex) => (
                          <td
                            key={
                              "column-" +
                              tableHeaderIndex +
                              "-inside-tableRow" +
                              index
                            }
                            // className="px-2 align-middle"
                            className={`px-2 align-middle ${tableHeader.isBold === true ? `fw-${tableHeader.fontWeight}` : ""}`}
                          >
                            {!tableDataRow.isEndUserEditing ? (
                              <div>
                                {tableHeader.datatype === "text" && (
                                  <>
                                    {tableDataRow[tableHeader.key]}
                                  </>
                                )}

                                {tableHeader.datatype === "date" && (
                                  <>
                                    <span className="d-flex text-truncate">
                                      {new Intl.DateTimeFormat("en-US", {
                                        year: "numeric",
                                        month: "2-digit",
                                        day: "2-digit",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        hour12: true,
                                      }).format(new Date(tableDataRow[tableHeader.key]))}
                                    </span>
                                  </>
                                )}
                                {tableHeader.datatype === "datewithouttime" && (
                                  <>
                                    <span className="d-flex text-truncate">
                                      {new Intl.DateTimeFormat("en-US", {
                                        year: "numeric",
                                        month: "2-digit",
                                        day: "2-digit",
                                        // hour12: true,
                                      }).format(new Date(tableDataRow[tableHeader.key]))}
                                    </span>
                                  </>
                                )}
                                {tableHeader.datatype === "formattedDate" && (
                                  <>
                                    <span className="d-flex text-truncate">
                                      {new Intl.DateTimeFormat("en-US", {
                                        month: "long",
                                        day: "numeric",
                                        year: "numeric",
                                      }).format(new Date(tableDataRow[tableHeader.key]))}
                                    </span>
                                  </>
                                )}
                                {tableHeader.datatype === "number" &&
                                  tableDataRow[tableHeader.key]}
                                {tableHeader.datatype === "badge" && (
                                  <RdsBadge colorVariant={tableDataRow[tableHeader.key].badgeColorVariant
                                    ? tableDataRow[tableHeader.key].badgeColorVariant
                                    : "success"} label={tableDataRow[tableHeader.key].content
                                      ? tableDataRow[tableHeader.key].content
                                      : tableDataRow[tableHeader.key]}
                                  />
                                )}
                                {tableHeader.datatype === "avatarTitleInfo" && (
                                  <div className="avatarTitleInfo">
                                    <RdsAvatar
                                      withProfilePic={true}
                                      profilePic={
                                        tableDataRow[tableHeader.key].avatar
                                      }
                                      firstName={
                                        tableDataRow[tableHeader.key].title
                                          ? tableDataRow[tableHeader.key].title
                                          : tableDataRow[tableHeader.key]
                                      }
                                      role={tableDataRow[tableHeader.key].info}
                                    />
                                  </div>
                                )}
                                {tableHeader.datatype === "iconAvatarTitle" && (
                                  <div className="d-flex justify-content-evenly align-items-center">
                                    <div className="col-1 me-2">
                                      <RdsIcon
                                        name={
                                          tableDataRow[tableHeader.key].iconName
                                        }
                                        fill={
                                          tableDataRow[tableHeader.key].iconFill
                                        }
                                        stroke={
                                          tableDataRow[tableHeader.key].iconStroke
                                        }
                                        colorVariant={
                                          tableDataRow[tableHeader.key].iconColor
                                        }
                                        width={
                                          tableDataRow[tableHeader.key].iconWidth
                                        }
                                        height={
                                          tableDataRow[tableHeader.key].iconHeight
                                        }
                                        strokeWidth={
                                          tableDataRow[tableHeader.key].iconStrokeWidth
                                        }
                                      />
                                    </div>
                                    {tableDataRow[tableHeader.key].withavatar && (
                                      <div>
                                        <div className="col-5">
                                          <RdsAvatar
                                            withProfilePic={true}
                                            profilePic={
                                              tableDataRow[tableHeader.key]?.avatar
                                            }
                                          />
                                        </div>
                                        <div className="col-6">
                                          <label>
                                            {tableDataRow[tableHeader.key].title}{" "}
                                          </label>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                )}
                                {tableHeader.datatype === "children" && (
                                  <div className="d-flex">
                                    {" "}
                                    {tableDataRow[tableHeader.key]}
                                  </div>
                                )}
                                {tableHeader.datatype === "tooltip" && tableDataRow[tableHeader.key] !== null && (
                                  <RdsTooltip text={tableDataRow[tableHeader.key]} place="bottom">
                                    <span className="d-inline-block">{tableDataRow[tableHeader.key].substring(0, tableHeader.dataLength) + "..."}</span>
                                  </RdsTooltip>
                                )}
                                {/* Adding datatype hidden */}

                                {
                                  tableHeader.datatype === "hidden" && (
                                    <><span className="d-flex gap-2">
                                      <RdsIcon name="eye" height="20px" width="20px" fill={false} stroke={true} />
                                      <RdsLabel
                                        label={tableDataRow[tableHeader.key]}
                                      ></RdsLabel>
                                    </span>
                                    </>
                                  )
                                }

                              </div>
                            ) : (
                              <RdsInput
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
                        ))}
                        {actionPosition && totalActions && totalActions?.length > 1 && !props.buttonAction && (
                          <td className="align-middle text-center">
                            {!tableDataRow?.isEndUserEditing ? (
                              <>
                                <div className="btn-group dropstart">
                                  <button
                                    className="btn btn-sm btn-icon border-0 three-dot-btn"
                                    type="button"
                                    aria-expanded="false"
                                    //onClick={() => openCloseDropDown(index)}
                                    data-bs-toggle="dropdown"
                                    data-bs-auto-close="true"
                                    id="dropdownMenuButton"
                                    data-testid="action-btn" >
                                    <RdsIcon
                                      name={"three_dots"}
                                      height="14px"
                                      width="14px"
                                      stroke={false}
                                      fill={true}
                                      tooltip={true}
                                      tooltipTitle={("More Actions") || ""}
                                      tooltipPlacement="top"
                                    // class="bi bi-three-dots-vertical"
                                    />
                                  </button>
                                  {/* array[index] &&  */}
                                  {(
                                    <ul aria-labelledby="dropdownMenuButton" className="dropdown-menu">
                                      {totalActions?.map((action, actionIndex) => (
                                        <li
                                          key={
                                            "action-" +
                                            actionIndex +
                                            "-inside-tableRow" +
                                            index
                                          } >
                                          {action.modalId && (
                                            <a
                                              data-bs-toggle="modal"
                                              data-bs-target={`#${action?.modalId}`}
                                              aria-controls={action?.modalId}
                                              onClick={(e) => {
                                                actionOnClickHandler(
                                                  e,
                                                  tableDataRow,
                                                  tableDataRow.id,
                                                  action
                                                );
                                              }}
                                              className="dropdown-item text-wrap">
                                              {(action.displayName)}
                                            </a>
                                          )}
                                          {action.offId && (
                                            <>
                                              <a
                                                data-bs-toggle="offcanvas"
                                                data-bs-target={`#${action?.offId}`}
                                                aria-controls={action?.offId}
                                                onClick={(e) => {
                                                  actionOnClickHandler(
                                                    e,
                                                    tableDataRow,
                                                    tableDataRow.id,
                                                    action
                                                  );
                                                }}
                                                className="dropdown-item text-wrap" >
                                                {(action.displayName)}
                                              </a>
                                            </>
                                          )}
                                          {action.offId == undefined && action.modalId == undefined && (
                                            <>
                                              <a
                                                onClick={(e) => {
                                                  actionOnClickHandler(
                                                    e,
                                                    tableDataRow,
                                                    tableDataRow.id,
                                                    action
                                                  );
                                                }}
                                                className="dropdown-item text-wrap"> {(action.displayName)}</a>
                                            </>
                                          )
                                          }
                                        </li>
                                      ))}

                                    </ul>)}
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
                                    onEditCheck(e, tableDataRow, tableDataRow.id);
                                  }} >
                                  <RdsIcon
                                    name={"check"}
                                    height="14px"
                                    width="14px"
                                    stroke={true}
                                    fill={false}
                                  // class="bi bi-check2"
                                  />
                                </RdsButton>
                                <RdsButton
                                  class="ms-2 text-white"
                                  colorVariant="danger"
                                  tooltipPlacement="top"
                                  size="medium"
                                  tooltipTitle={""}
                                  type={"button"}
                                  onClick={(e) => {
                                    onEditClose(e, tableDataRow, tableDataRow.id);
                                  }} >
                                  <RdsIcon
                                    name={"close"}
                                    height="14px"
                                    width="14px"
                                    stroke={true}
                                    fill={true}
                                  // class="bi bi-close"
                                  />
                                </RdsButton>
                              </div>
                            )}
                          </td>
                        )}
                        {/* adding button here */}
                        {actionPosition && totalActions && totalActions?.length && props.actions && props.buttonAction && (
                          <td className={`align-middle table-btns text-center ${totalActions?.length > 1 ? 'd-flex justify-content-center' : ''}`}>
                            <>
                              {totalActions?.map((action, actionIndex) => (
                                <>
                                  {!action.link && (
                                    <RdsButton
                                      label={action.displayName}
                                      size="small"
                                      //widthMaxContent={action.widthMaxContent}
                                      databstoggle={action.offId ? "offcanvas" : action.modalId ? "modal" : undefined}
                                      databstarget={action.offId ? `#${action.offId}` : action.modalId ? `#${action.modalId}` : undefined}
                                      ariacontrols={action.offId ? action.offId : action.modalId}
                                      isOutline={action.isOutline}
                                      colorVariant = {action.colorVariable}
                                      onClick={(e) => {
                                        actionOnClickHandler(
                                          e,
                                          tableDataRow,
                                          tableDataRow.id,
                                          action
                                        );
                                      }}
                                    />
                                  )}
                                  {action.link && (
                                    <RdsButton
                                    label={action.displayName}
                                    size="small"
                                    // onClick={() => navigate(action.link)}
                                    // isOutline={action.isOutline}
                                    colorVariant = {action.colorVariable}
                                    />

                                    // <button
                                    //   className={`btn btn-${action.colorVariable}`} type="button"
                                    //   onClick={() => navigate(action.link)}
                                    // >
                                    //   {action.displayName}
                                    // </button>
                                  )}
                                  {/* <button
                                    className={`btn btn-${action.colorVariable}`} type="button"
                                    // data-bs-toggle="offcanvas"
                                    // data-bs-target={`#${action.offId}`}
                                    // aria-controls={action.offId}
                                    onClick={() => navigate(action.link)}
                                      >
                                    {action.displayName}

                                  </button> */}
                                  {/* {action.link && (
                                    <button
                                      className={`btn btn-${action.colorVariable}`} type="button"
                                      onClick={() => navigate(action.link)}
                                    >
                                      {action.displayName}
                                    </button>
                                  )} */}
                                </>
                              ))}
                            </>
                          </td>
                        )}
                      </tr>
                    )
                  );
                }
              )}
            </tbody>
          </table>
        </div>
        {props.pagination && props.totalRecords > 10 && (
          <div className=" d-flex justify-content-xxl-end justify-content-xl-end justify-content-lg-end justify-content-md-end pt-3 pagination-sm-scroll">
            <RdsPagination
              totalRecords={props.totalRecords ? props.totalRecords : props.tableData?.length}
              recordsPerPage={props.recordsPerPage ? props.recordsPerPage : 10}
              onPageChange={onPageChangeHandler}
              paginationType={props.recordsPerPageSelectListOption ? "advanced" : "default"}
            ></RdsPagination>
          </div>
        )}
      </>)}

    </>
  );
};
export default RdsCompDatatable;