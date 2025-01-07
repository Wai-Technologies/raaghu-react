import React, { useEffect, useState, useRef } from "react";
import RdsIcon from "../rds-icon";
import "./rds-pagination.css";
import { useTranslation } from "react-i18next";
import RdsButton from "../rds-button/rds-button";

export interface RdsPaginationProps {
  totalRecords: number;
  recordsPerPage?: number;
  paginationType?: string;
  alignmentType?: string;
  size?: string;
  onPageChange?: (currentPage: number, recordsPerPage: number) => void;
  currentPage?: number;
  count?: number;
  onPreviousClickHandler?: () => void;
  onNextClickHandler?: () => void;
  style?: string;
  showFirst?: boolean;
  showLast?: boolean;
  showManualInput?: boolean;
  showDropdown?: boolean;
  showLegend?: boolean;


}

const RdsPagination = (props: RdsPaginationProps) => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(props.currentPage || 1);
  const [totalRecords, setTotalRecords] = useState(props.totalRecords);
  const [recordsPerPage, setRecordsPerPage] = useState(props.recordsPerPage || 10);
  const [selectedRecordsPerPage, setSelectedRecordsPerPage] = useState(props.recordsPerPage || 10);

  const paginType = props.paginationType || "default";
  const dropdownButtonRef = useRef(null);
  const values = [10, 25, 50, 100];
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownIcon, setDropdownIcon] = useState("chevron_down");

  // Pagination logic
  const PageNumbers: number[] = [];
  const previous: (number | string)[] = [];
  const continued: (number | string)[] = [];
  let int = Math.ceil(totalRecords / recordsPerPage);

  // Generate Page Numbers
  for (let i = 1; i <= int; i++) {
    PageNumbers.push(i);
  }

  let leftBound = currentPage - 2;
  let rightBound = currentPage + 1;

  if (leftBound <= 1) {
    leftBound = 1;
    rightBound = Math.min(5, int);
  }

  if (rightBound >= int) {
    rightBound = int;
    leftBound = Math.max(int - 4, 1);
  }

  const displayedPages = PageNumbers.slice(leftBound - 1, rightBound);

  if (leftBound > 2) {
    previous.push(1);
    if (leftBound > 3) {
      previous.push('...');
    }
  }

  previous.push(...displayedPages);

  if (rightBound < int - 1) {
    if (rightBound < int - 2) {
      continued.push('...');
    }
    continued.push(int);
  }

  const onNext = (current: number) => {
    setCurrentPage(current + 1);
  };

  const onPage = (current: number) => {
    setCurrentPage(current);
  };

  const onPrevious = (current: number) => {
    setCurrentPage(current - 1);
  };

  const onFirstClick = () => {
    setCurrentPage(1);
  };

  const onLastClick = () => {
    setCurrentPage(int);
  };

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

  const handleGotoPage = (page: string) => {
    const pageNumber = parseInt(page, 10);
    if (!isNaN(pageNumber) && pageNumber > 0 && pageNumber <= int) {
      setCurrentPage(pageNumber);
    }
  };

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

  const size = ' pagination-' + `${props.size === 'small' ? 'sm' : props.size === 'large' ? 'lg' : 'md'}`;
  const align = " pagination justify-content-" + `${props.alignmentType || "start"}`;

  const getLinkStyles = () => {
    if (props.style === 'Style1') {
        return {};
    }
     else {
        return {
            backgroundColor: 'unset',
        };
    }
};
  return (
    <>
      <div data-testid="page-link">
        {paginType === "default" && (
          <nav aria-label="Page navigation example">
            <ul className={"pagination align-items-center mb-0" + `${size}` + `${align}`}>
              <li className={"page-item cursor-pointer " + `${currentPage === 1 ? "disabled d-none" : " "}`}>
                <a className="page-link b d-flex border-0" onClick={() => onPrevious(currentPage)}>
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

              {displayedPages.map((number) => (
                <li key={number} className={"cursor-pointer " + `${number === currentPage ? "page-item m-1 default-li active" : "page-item m-1 default-li "}`}>
                  <a onClick={() => onPage(number)} className="page-link pe-auto">
                    {number}
                  </a>
                </li>
              ))}

              <li className={"page-item m-1 cursor-pointer " + `${currentPage === int ? "disabled" : " "}`}>
                <a className="page-link b d-flex border-0" onClick={() => onNext(currentPage)}>
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

        {paginType === "advanced" && (props.style!="Style5" && props.style!="Style6" && props.style !="Style8" && props.style!="Style9" && props.style!="Style10" && props.style!="Style11") && (
          <nav aria-label="page navigation" className={"d-flex align-items-center" + `${size}` +`${align} ${props.style=='Style3' ?'bg-white ':''} ${props.style=='Style7' ?'bg-white rounded-5 ':''}`}>
            <ul className={"pagination rounded align-items-center mb-0" + `${size}` + `${align} `}>
              {/* Previous Page Button */}
              <li className={`m-1 page-item chevron cursor-pointer ${currentPage === 1 ? "disabled" : ""}`}>
              {( props.style != "Style4" &&  <a onClick={() => onPrevious(currentPage)}>
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
                  
                </a>)}
                {totalRecords > recordsPerPage && props.style === "Style4" && (
                    <button className={`btn btn-primary pagination-prev ms-2 btn-${props.size} `} onClick={() => onPrevious(currentPage)}> <span>Prev</span></button>
                  )}
              </li>
            {(
              props.showFirst && props.style != "Style4" && (
                <li className={`me-3 page-item chevron cursor-pointer}`}>
                <a onClick={() => onFirstClick()}>
                  {totalRecords > recordsPerPage && (
                    <RdsIcon
                      name="chevron_left_pagination"
                      width="20px"
                      height="20px"
                      fill={false}
                      stroke={true}
                      colorVariant="primary"
                    />
                  )}
                </a>
              </li>
              )
            )}
              

              {/* Displayed Pages */}
              {previous.map((number, index) => (
                <li
                  key={number}
                  className={`m-1 page-item cursor-pointer ${typeof number === 'number' ? ((number === currentPage) ? "active" : "") : ""} ${(props.style =='Style3' && number === currentPage) ? 'pagination-border-bottom-custom' : ''}`}
                 
                >
                  <a onClick={() => typeof number === 'number' && onPage(number)}  style={getLinkStyles()}>
                    {number}
                  </a>
                </li>
              ))}

              {/* Continued Pages */}
              {continued.map((number, index) => (
                <li
                  key={number}
                  className={`m-1 page-item cursor-pointer ${typeof number === 'number' ? (number === currentPage ? "active" : "") : ""} text-${props.style =='Style1' ? '' : 'primary'}`}
                >
                  <a onClick={() => typeof number === 'number' && onPage(number)}>
                    {number}
                  </a>
                </li>
              ))}

              {/* Next Page Button */}
              <li className={`m-1 page-item chevron ${currentPage === int ? "disabled" : ""}`}>
            {(  props.style !== "Style4" &&  <a onClick={() => onNext(currentPage)}>
                  {totalRecords > recordsPerPage &&  (
                    <RdsIcon
                      name="chevron_right"
                      width="15px"
                      height="15px"
                      fill={false}
                      stroke={true}
                      colorVariant="primary"
                    />
                  )}
                </a>)}
                {totalRecords > recordsPerPage && props.style === "Style4" && (
                    <button className={`btn btn-primary pagination-next ms-2 me-2 btn-${props.size}`} onClick={() => onNext(currentPage)}><span>Next</span></button>
                  )}
              </li>
              {(
              props.showLast && props.style !== "Style4" &&(
                <li className={`me-3 page-item chevron cursor-pointer}`}>
                <a onClick={() => onLastClick()}>
                  {totalRecords > recordsPerPage && (
                    <RdsIcon
                      name="chevron_right_pagination"
                      width="20px"
                      height="20px"
                      fill={false}
                      stroke={true}
                      colorVariant="primary"
                    />
                  )}
                </a>
              </li>
              )
            )}
            </ul>

            {/* Dropdown for Records Per Page */}
            {(totalRecords > recordsPerPage && props.showDropdown) && (<div className={`dropdown custom-navigation  ${props.style =='Style3' ? 'pagination-border-bottom-custom' : ''}`}>
              <button
                className={`btn  btn-outline btn-${props.size}  ${(props.style =='Style3') ? 'text-dark border-primary' : 'customWidthForBtn'}`}
                id="paginationBtnId"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded={isDropdownOpen}
                onClick={toggleDropdown}
                ref={dropdownButtonRef}
                style={{height:props.size === 'small' ? '2.2rem' : props.size === 'large' ? '2.6rem' : '2.3rem'}}
              >
                <div className="d-flex justify-content-between customrecordpagedropdown">
                  {selectedRecordsPerPage}
                  <span className="mt-0 toggledropdown" onClick={toggleDropdown}>
                    <div style={{ pointerEvents: "none" }}>
                      <RdsIcon name={dropdownIcon} fill={false} stroke={true} height="12px" width="12px" />
                    </div>
                  </span>
                </div>
              </button>
              <ul className={`dropdown-menu customWidthClass ${isDropdownOpen ? "show" : ""}`}>
                {values.map((value) => (
                  <li
                    key={value}
                    className={`pagination-item ${selectedRecordsPerPage === value ? "active" : ""}`}
                    onClick={() => handleItemsPerPageChange(value)}
                  >
                    {value}
                  </li>
                ))}
              </ul>
            </div>
            )}
             {(
              props.showLegend && (
                <li className={` ms-3 page-item chevron cursor-pointer}`}>
                  {totalRecords > recordsPerPage && (
                    <span>{currentPage} of {int} items</span>
                  )}
              </li>
              )
            )}

        {(
              props.showManualInput && (
                <li className={` page-item cursor-pointer}`}>
                  {totalRecords > recordsPerPage && (
                    <div className="d-flex"> <span className="m-2">Go to</span>
                      <input type="text"  className={`form-control btn-outline border-primary gotopageinput   ${(props.style=="Style3"||props.style=="Style7")?"bg-white text-dark":""}`} onChange={(e) => handleGotoPage(e.target.value)} /> 
                      <span className="m-2">Page</span> </div>
                  )}
              </li>
              )
            )}
          </nav>
        )}
        {paginType === "advanced" && (props.style == "Style5" || props.style==="Style6" || props.style =="Style8" || props.style=="Style9" || props.style=="Style10" || props.style=="Style11") && (
          <nav aria-label="page navigation" className={"d-flex align-items-center" + `${align} ` }>
          <ul className={"pagination rounded align-items-center mb-0" + `${size}` + `${align} `}>
            {/* Previous Page Button */}
            <li className={`m-1 page-item chevron cursor-pointer  ${currentPage === 1 ? "disabled" : ""}`}>
            <button onClick={() => onPrevious(currentPage)} className={`btn btn-primary ms-2 me-2 btn-${props.size} ${(props.style =="Style8" ||props.style =="Style9"|| props.style=="Style10" || props.style=="Style11")?"custom-border-radius-left":""}`}>
                {totalRecords > recordsPerPage && (
                  <RdsIcon
                    name="chevron_left"
                    width="20px"
                    height="20px"
                    fill={false}
                    stroke={true}
                    colorVariant="light"
                  />
                )}
                
              </button>
            </li>
            {(
              props.showLegend && (props.style==='Style6' || props.style==='Style8' ) && (
                <li className={` ms-3 page-item chevron cursor-pointer}`}>
                  {totalRecords > recordsPerPage && (
                    <span style={{fontWeight:'600'}}>{currentPage} of {int} </span>
                  )}
              </li>
              )
            )}
                { props.style=='Style9' && (<div className="d-flex">
                {previous.map((number, index) => (
                <li
                  key={number}
                  className={`m-1 page-item cursor-pointer ${typeof number === 'number' ? ((number === currentPage) ? "active" : "") : ""} ${(props.style =='Style3' && number === currentPage) ? 'pagination-border-bottom-custom' : ''}`}
                 
                >
                  <a onClick={() => typeof number === 'number' && onPage(number)}  style={getLinkStyles()}>
                    {number}
                  </a>
                </li>
              ))}
                </div>)}
            {/* Next Page Button */}
            <li className={`m-1 page-item chevron ${currentPage === int ? "disabled" : ""}`}>
              {totalRecords > recordsPerPage &&  (
                 <> <button className={`btn btn-primary pagination-next ms-2 me-2 btn-${props.size} ${props.style == "Style5" || props.style == "Style11" ?"ps-3 pe-4":''} ${(props.style =="Style8" ||props.style =="Style9" || props.style=="Style10" || props.style=="Style11")?"custom-border-radius-right":""}`} onClick={() => onNext(currentPage)}> <span className="ps-2 pe-1">
                  <RdsIcon
                 name="chevron_right"
                 width="20px"
                 height="20px"
                 fill={false}
                 stroke={true}
                 colorVariant="light"
               /></span>  {(props.style == "Style5" || props.style == "Style11" )&&(<span>Next</span>)}</button>
               </> )}
            </li>
          </ul>
        </nav>
        )}

        {paginType === "onPagerPagination" && (
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
        )}
      </div>
    </>
  );
};

export default RdsPagination;
