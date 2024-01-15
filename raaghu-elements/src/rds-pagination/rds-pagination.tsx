import React, { useEffect, useState, useRef } from "react";
import RdsIcon from "../rds-icon";
import "./rds-pagination.css";
import { useTranslation } from "react-i18next";
import RdsButton from "../rds-button/rds-button";
export interface RdsPaginationProps {
  totalRecords: number;
  recordsPerPage?: any;
  paginationType?: string;
  alignmentType?: string;
  size?: string;
  onPageChange?: (currentPage: number, recordsPerPage: number) => void;
  currentPage?: number;
  count?: number;
  onPreviousClickHandler?: any;
  onNextClickHandler?: any;
}
const RdsPagination = (props: RdsPaginationProps) => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState<number>(props.totalRecords);
  const [recordsPerPage, setRecordsPerPage] = useState(props.recordsPerPage);
  const [selectedRecordsPerPage, setSelectedRecordsPerPage] = useState(
    props.recordsPerPage || 10
  );

  // const [showOptions, setShowOptions] = useState(false); // State to control dropdown options visibility
  const paginType = props.paginationType || "default";
  const setItemsPerPage = (value: string) => {
    setSelectedRecordsPerPage(parseInt(value, 10)); // Update selectedRecordsPerPage
    setRecordsPerPage(parseInt(value, 10)); // Update recordsPerPage
    // setShowOptions(false); // Hide dropdown options after selection
  };

  const dropdownButtonRef = useRef(null);
  const values = [10, 25, 50, 100];
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownIcon, setDropdownIcon] = useState("chevron_down");
  const PageNumbers = [];
  const continued = [];
  const previous = [];
  let int: any;

  if (paginType == "default") {
    int = Math.ceil(props.totalRecords / props.recordsPerPage);
    for (let i = 1; i <= int; i++) {
      PageNumbers.push(i);
    }
  } else {
    int = Math.ceil(totalRecords / recordsPerPage);
    // let tempPageArray=[...pageNumbers]
    for (let i = 1; i <= int; i++) {
      PageNumbers.push(i);
    }
  }

  const onNext = (current: any) => {
    setCurrentPage(current + 1);
  };
  const onPage = (current: any) => {
    setCurrentPage(current);
  };
  const onPrevious = (current: any) => {
    setCurrentPage(current - 1);
  };
  const startIndex = Math.max(currentPage - 5, 0);

  const endIndex = Math.min(startIndex + 5, PageNumbers.length);

  const displayedPages = PageNumbers.slice(startIndex, endIndex);

  let leftBound = currentPage - 2;
  let rightBound = currentPage + 1;

  if (leftBound <= 1) {
    leftBound = 1;
    rightBound = 5;
  }

  if (rightBound >= int) {
    rightBound = int;
    leftBound = int - 4;
  }
  if (rightBound < int) {
    continued.push("...");
    continued.push(int);
  }
  if (rightBound >= int && int > 5) {
    previous.push(1);
    previous.push("...");
  }
  useEffect(() => {
    setTotalRecords(props.totalRecords);
  }, [props.totalRecords]);

  useEffect(() => {
    if ((currentPage - 1) * recordsPerPage >= totalRecords) {
      props.onPageChange != undefined &&
        props.onPageChange(currentPage - 1, recordsPerPage);
      setCurrentPage(currentPage - 1);
    }
  }, [totalRecords]);

  useEffect(() => {
    props.onPageChange != undefined &&
      props.onPageChange(currentPage, recordsPerPage);
  }, [currentPage, recordsPerPage]);

  const size = " pagination-" + `${props.size || "sm"}`;
  const align =
    " pagination justify-content-" + `${props.alignmentType || "start"}`;

  const closeDropdown = () => {
    setIsDropdownOpen(false);
    setDropdownIcon("chevron_down");
    document.removeEventListener("click", handleDocumentClick);
  };
  const toggleDropdown = () => {
    if (isDropdownOpen) {
      closeDropdown();
    } else {
      setIsDropdownOpen(true);
      setDropdownIcon("chevron_up");
      document.addEventListener("click", handleDocumentClick);
    }
  };

  const handleDocumentClick = (event: MouseEvent) => {
    const dropdownButton = document.getElementById("paginationBtnId");
    if (
      dropdownButton &&
      !dropdownButton.contains(event.target as HTMLElement)
    ) {
      closeDropdown();
    }
  };

  const handleItemsPerPageChange = (value: number) => {
    setSelectedRecordsPerPage(value);
    setRecordsPerPage(value);
    closeDropdown();
  };

  return (
    <>
      <div data-testid="page-link">
        {/* {totalRecords > 5 && ( */}
        <>
          {paginType == "default" && (
            <nav aria-label="Page navigation example">
              <ul
                className={
                  "pagination align-items-center mb-0" + `${size}` + `${align}`
                }
              >
                <li
                  className={
                    "page-item cursor-pointer " +
                    `${currentPage == 1 ? "disabled d-none" : " "}`
                  }
                >
                  <a
                    className="page-link b d-flex border-0"
                    onClick={() => onPrevious(currentPage)}
                  >
                    {totalRecords > recordsPerPage && (
                      <RdsIcon
                        name="chevron_left"
                        width="15px"
                        height="15px"
                        fill={false}
                        stroke={true}
                        colorVariant="primary"
                      />
                    )}
                    <span className="ms-1 pagination-prev">Prev</span>
                  </a>
                </li>

                {displayedPages.map((number: any) => (
                  <li
                    key={number}
                    className={
                      "cursor-pointer " +
                      `${
                        number === currentPage
                          ? "page-item m-1 default-li active"
                          : "page-item m-1 default-li "
                      }`
                    }
                  >
                    <a
                      onClick={() => {
                        onPage(number);
                      }}
                      className="page-link pe-auto"
                    >
                      {number}
                    </a>
                  </li>
                ))}
                <li
                  className={
                    "page-item m-1 cursor-pointer " +
                    `${currentPage === int ? "disabled" : " "}`
                  }
                >
                  <a
                    className="page-link b d-flex border-0"
                    onClick={() => onNext(currentPage)}
                  >
                    <span className="pagination-next me-1">Next</span>
                    {totalRecords > recordsPerPage && (
                      <RdsIcon
                        name="chevron_right"
                        width="15px"
                        height="15px"
                        fill={false}
                        stroke={true}
                        colorVariant="primary"
                      />
                    )}
                  </a>
                </li>
              </ul>
            </nav>
          )}
          {paginType == "advance" && (
            <nav
              aria-label="page navigation"
              className="d-flex align-items-baseline"
            >
              <ul
                className={
                  "pagination rounded align-items-center mb-0" +
                  `${size}` +
                  `${align}`
                }
              >
                <li
                  className={
                    "m-1 page-item chevron cursor-pointer " +
                    `${currentPage == 1 ? "disabled" : " "}`
                  }
                >
                  <a
                    // className="page-link rounds"
                    onClick={() => onPrevious(currentPage)}
                  >
                    {totalRecords > recordsPerPage && (
                      <RdsIcon
                        name="chevron_left"
                        width="15px"
                        height="15px"
                        fill={false}
                        stroke={true}
                        colorVariant="primary"
                      />
                    )}
                  </a>
                </li>
                {previous.map((number) => (
                  <li
                    key={number}
                    className={`${
                      number === currentPage
                        ? "page-item m-1 default-li active"
                        : "page-item m-1 default-li "
                    }`}
                  >
                    <a
                      onClick={() => onPage(number)}
                      className={`${number === 1 ? "page-link roundeds" : ""}`}
                    >
                      {number}
                    </a>
                  </li>
                ))}
                {displayedPages.map((number: any) => (
                  <li
                    key={number}
                    className={`${
                      number === currentPage
                        ? "page-item m-1 default-li active"
                        : "page-item m-1 default-li "
                    }`}
                  >
                    <a
                      onClick={() => onPage(number)}
                      className="page-link roundeds pe-auto cursor-pointer"
                    >
                      {number}
                    </a>
                  </li>
                ))}

                {continued.map((number) => (
                  <li
                    key={number}
                    className={`${
                      number === currentPage
                        ? "page-item m-1 default-li active"
                        : "page-item m-1 default-li "
                    }`}
                  >
                    <a
                      onClick={() => onPage(number)}
                      className={`${
                        number === int ? "page-link roundeds" : ""
                      }`}
                    >
                      {number}
                    </a>
                  </li>
                ))}
                <li
                  className={
                    "page-item m-1 chevron " +
                    `${currentPage == int ? "disabled" : " "}`
                  }
                >
                  <a onClick={() => onNext(currentPage)}>
                    {props.totalRecords > recordsPerPage && (
                      <RdsIcon
                        name="chevron_right"
                        width="15px"
                        height="15px"
                        fill={false}
                        stroke={true}
                        colorVariant="primary"
                      />
                    )}
                  </a>
                </li>
              </ul>

              <div className="dropdown custom-navigation">
                <button
                  className="btn customWidthForBtn btn-outline border-primary"
                  id="paginationBtnId"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded={isDropdownOpen}
                  onClick={toggleDropdown}
                  ref={dropdownButtonRef}
                >
                  <div className="d-flex justify-content-between">
                    {selectedRecordsPerPage}
                    <span className="mt-1" onClick={toggleDropdown}>
                      <div style={{ pointerEvents: "none" }}>
                        <RdsIcon
                          name={dropdownIcon}
                          fill={false}
                          stroke={true}
                          height="12px"
                          width="12px"
                        />
                      </div>
                    </span>
                  </div>
                </button>
                <ul
                  className={`dropdown-menu customWidthClass ${
                    isDropdownOpen ? " show" : ""
                  }`}
                >
                  {values.map((value) => (
                    <li
                      key={value}
                      className={`pagination-item ${
                        selectedRecordsPerPage === value ? "active" : ""
                      }`}
                      onClick={() => handleItemsPerPageChange(value)}
                    >
                      {value}
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
          )}
          {paginType == "onPagerPagination" && (
            <>
              <div className="d-flex pagination">
                <div className="me-2">
                  <RdsButton
                    colorVariant="primary"
                    isOutline={true}
                    icon="chevron_left"
                    size="medium"
                    onClick={props.onPreviousClickHandler}
                  />
                </div>
                <div className="page-link me-2 rounded">{props.count}</div>
                <div className="me-2 d-flex align-items-center fs-5">
                  of {totalRecords}
                </div>
                <div className="me-2">
                  <RdsButton
                    colorVariant="primary"
                    isOutline={true}
                    icon="chevron_right"
                    size="medium"
                    onClick={props.onNextClickHandler}
                  />
                </div>
              </div>
            </>
          )}
        </>
        {/* )} */}
      </div>
    </>
  );
};

export default RdsPagination;
