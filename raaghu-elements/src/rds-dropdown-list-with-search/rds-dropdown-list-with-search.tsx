import React, { useState, useEffect, useRef } from "react";
import RdsIcon from "../rds-icon";
import RdsBadge from "../rds-badge";
import Tooltip from "../rds-tooltip/rds-tooltip";
import { placements } from "../../libs";

export interface RdsDropdownListProps {
  id?: string;
  reset?: boolean;
  labelIcon?: string;
  labelIconWidth?: string;
  labelIconHeight?: string;
  icon?: string;
  iconFill?: boolean;
  iconWidth?: string;
  iconStroke?: boolean;
  iconHeight?: string;
  placeholder?: string;
  isPlaceholder?: boolean;
  isIconPlaceholder?: boolean;
  borderDropdown?: boolean;
  dataTestId?: string;
  tooltip?: boolean;
  tooltipPlacement?: placements;
  tooltipTitle?: string;
  databsdismiss?: string;
  databstarget?: string;
  databstoggle?: string;
  ariacontrols?: string;
  size?: string;
  listItems: {
    label: string;
    val: string;
    icon?: string;
    iconWidth?: string;
    iconHeight?: string;
    iconPath?: string;
  }[];
  multiSelect?: boolean;
  xOffset?: string;
  yOffset?: string;
  iconPath?: string;
  onClick?: ($event: React.MouseEvent<HTMLLIElement>, val: string) => void;
  selectedItems?: (selectedItems: any) => void;
  selectedIndex?: (selectedindex: number) => void;
  showIcon?: boolean;
  isCode?: boolean;
  block?: boolean;
}

const RdsDropdownList = (props: RdsDropdownListProps) => {
  const [showIcon, setShowIcon] = useState(props.showIcon ?? true);
  const [checkedCategoryList, setCheckedCategoryList] = useState<any[]>([]);
  const [expand, setExpend] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [hoveredItem, setHoveredItem] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const block = props.block !== false;
  const [selectedOption, setSelectedOption] = useState<number>(0);

  const clickedOnDropDown = () => {
    setExpend(!expand);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setExpend(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handlerLIstItem = (event: React.MouseEvent<HTMLLIElement>, index: number, val: string) => {
    setIsTouch(true);
    if (props.multiSelect) {
      const isChecked = checkedCategoryList.some(item => item.label === props.listItems[index].label);
      if (isChecked) {
        setCheckedCategoryList(checkedCategoryList.filter(item => item.label !== props.listItems[index].label));
      } else {
        setCheckedCategoryList([...checkedCategoryList, { label: props.listItems[index].label }]);
      }
    } else {
      setSelectedOption(index);
      if (props.onClick) {
        props.onClick(event, val);
      }
      setExpend(!expand);
    }
  };

  const uncheckHandler = (e: any, item: any) => {
    setCheckedCategoryList(checkedCategoryList.filter(curItem => curItem.label !== item.label));
  };

  useEffect(() => {
    setIsTouch(false);
    setCheckedCategoryList([]);
  }, [props.reset]);

  useEffect(() => {
    if (!props.multiSelect && props.selectedIndex) {
      props.selectedIndex(selectedOption);
    }
  }, [selectedOption]);

  useEffect(() => {
    if (props.multiSelect && props.selectedItems) {
      props.selectedItems(checkedCategoryList);
    }
  }, [checkedCategoryList]);

  const IconWidth = props.listItems[selectedOption]?.iconWidth || "16px";
  const IconHeight = props.listItems[selectedOption]?.iconHeight || "12px";

  const filteredListItems = props.listItems.filter(item =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`dropdown ${block ? "w-100 mt-1" : ""}`} ref={dropdownRef}>
      {props.tooltip ? (
        <Tooltip text={props.tooltipTitle} place={props.tooltipPlacement}>
          <span
            className={`gap-2 ${props.xOffset || ""} ${props.yOffset || ""} ${props.borderDropdown ? "form-control " + props.size : "border-0"}`}
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            id={props.id}
            onClick={clickedOnDropDown}
          >
            <div className="d-flex align-items-center justify-content-between">
              {isTouch !== true && props.placeholder && !props.multiSelect && (
                <div className="d-flex align-items-baseline m-auto">
                  {props.isIconPlaceholder && !props.isPlaceholder && (
                    <span>
                      {props.iconPath ? (
                        <RdsIcon
                          iconPath={props.iconPath}
                          fill={false}
                          stroke={true}
                          width={props.labelIconWidth || ""}
                          height={props.labelIconHeight || ""}
                          classes="me-2"
                          type="lottie"
                        />
                      ) : (
                        <RdsIcon
                          name={props.labelIcon}
                          height={props.labelIconHeight}
                          width={props.labelIconWidth}
                        />
                      )}
                    </span>
                  )}
                  {props.icon && props.isPlaceholder && !props.isIconPlaceholder && (
                    <span>
                      <RdsIcon
                        name={props.icon}
                        height={IconHeight}
                        width={IconWidth}
                        fill={props.iconFill}
                        stroke={props.iconStroke}
                      />
                    </span>
                  )}
                  {props.isPlaceholder && (
                    <span className="fs-6 flex-grow-1 text-nowrap dw-placeholder">
                      {props.placeholder}
                    </span>
                  )}
                </div>
              )}
              {isTouch && !props.multiSelect && props.listItems.length !== 0 && (
                <div className="d-flex align-items-baseline">
                  {(props.listItems[selectedOption]?.icon || props.listItems[selectedOption]?.iconPath) && showIcon && (
                    <span>
                      {props.listItems[selectedOption]?.iconPath ? (
                        <RdsIcon
                          iconPath={props.listItems[selectedOption]?.iconPath}
                          width={props.listItems[selectedOption]?.iconWidth || ""}
                          height={props.listItems[selectedOption]?.iconHeight || ""}
                          fill={false}
                          stroke={true}
                          type="lottie"
                        />
                      ) : (
                        <RdsIcon
                          name={props.listItems[selectedOption].icon}
                          width={IconWidth}
                          height={IconHeight}
                          stroke={true}
                          fill={false}
                        />
                      )}
                    </span>
                  )}
                  {!props.isIconPlaceholder && (
                    <span className="fs-6 ms-2 me-2 flex-grow-1 text-nowrap">
                      {props.isCode ? props.listItems[selectedOption].val.toUpperCase() : props.listItems[selectedOption].label}
                    </span>
                  )}
                </div>
              )}
              {checkedCategoryList.length === 0 && props.multiSelect && props.placeholder && (
                <div>
                  <span className="me-2 dw-placeholder">{props.placeholder}</span>
                </div>
              )}
              {props.multiSelect && checkedCategoryList.length !== 0 && (
                <div>
                  {checkedCategoryList.map(item => (
                    <RdsBadge
                      className="me-1"
                      key={item.label}
                      label={item.label}
                      colorVariant="primary"
                      size="small"
                      onClose={e => uncheckHandler(e, item)}
                      showClose={true}
                    />
                  ))}
                </div>
              )}
              {!props.isIconPlaceholder && !props.multiSelect && (
                <span className="ms-2" onClick={e => { e.stopPropagation(); clickedOnDropDown(); }}>
                  <RdsIcon
                    name={expand ? "chevron_up" : "chevron_down"}
                    fill={false}
                    stroke={true}
                    height="11px"
                    width="11px"
                  />
                </span>
              )}
            </div>
          </span>
        </Tooltip>
      ) : (
        <span
          className={`gap-2 ${props.xOffset || ""} ${props.yOffset || ""} ${props.borderDropdown ? "form-control " + props.size : "border-0"}`}
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          id={props.id}
          onClick={clickedOnDropDown}
        >
          <div className="d-flex align-items-center justify-content-between">
            {isTouch !== true && props.placeholder && !props.multiSelect && (
              <div className="d-flex align-items-baseline">
                {props.isIconPlaceholder && !props.isPlaceholder && (
                  <span>
                    {props.iconPath ? (
                      <RdsIcon
                        iconPath={props.iconPath}
                        fill={false}
                        stroke={true}
                        width={props.labelIconWidth || ""}
                        height={props.labelIconHeight || ""}
                        classes="me-2"
                        type="lottie"
                      />
                    ) : (
                      <RdsIcon
                        name={props.labelIcon}
                        height={props.labelIconHeight}
                        width={props.labelIconWidth}
                      />
                    )}
                  </span>
                )}
                {props.icon && props.isPlaceholder && !props.isIconPlaceholder && (
                  <span>
                    <RdsIcon
                      name={props.icon}
                      height={IconHeight}
                      width={IconWidth}
                      fill={props.iconFill}
                      stroke={props.iconStroke}
                    />
                  </span>
                )}
                {props.isPlaceholder && (
                  <span className="fs-6 flex-grow-1 text-nowrap dw-placeholder">
                    {props.placeholder}
                  </span>
                )}
              </div>
            )}
            {isTouch && !props.multiSelect && props.listItems.length !== 0 && (
              <div className="d-flex align-items-baseline">
                {(props.listItems[selectedOption]?.icon || props.listItems[selectedOption]?.iconPath) && showIcon && (
                  <span>
                    {props.listItems[selectedOption]?.iconPath ? (
                      <RdsIcon
                        iconPath={props.listItems[selectedOption]?.iconPath}
                        width={props.listItems[selectedOption]?.iconWidth || ""}
                        height={props.listItems[selectedOption]?.iconHeight || ""}
                        fill={false}
                        stroke={true}
                        type="lottie"
                      />
                    ) : (
                      <RdsIcon
                        name={props.listItems[selectedOption].icon}
                        width={IconWidth}
                        height={IconHeight}
                        stroke={true}
                        fill={false}
                      />
                    )}
                  </span>
                )}
                {!props.isIconPlaceholder && (
                  <span className="fs-6 ms-2 me-2 flex-grow-1 text-nowrap">
                    {props.isCode ? props.listItems[selectedOption].val.toUpperCase() : props.listItems[selectedOption].label}
                  </span>
                )}
              </div>
            )}
            {checkedCategoryList.length === 0 && props.multiSelect && props.placeholder && (
              <div>
                <span className="dw-placeholder fs-6">{props.placeholder}</span>
              </div>
            )}
            {props.multiSelect && checkedCategoryList.length !== 0 && (
              <div>
                {checkedCategoryList.map(item => (
                  <RdsBadge
                    className="me-1"
                    key={item.label}
                    label={item.label}
                    colorVariant="primary"
                    size="small"
                    onClose={e => uncheckHandler(e, item)}
                    showClose={true}
                  />
                ))}
              </div>
            )}
            {!props.isIconPlaceholder && !props.multiSelect && (
              <span className="ms-2" onClick={e => { e.stopPropagation(); clickedOnDropDown(); }}>
                <RdsIcon
                  name={expand ? "chevron_up" : "chevron_down"}
                  fill={false}
                  stroke={true}
                  height="11px"
                  width="11px"
                />
              </span>
            )}
          </div>
        </span>
      )}

      {expand && (
        <div className="dropdown-menu-container">
          <ul className={`dropdown-menu ${expand ? "show" : "hide"}`} id={props.id} aria-labelledby={props.id}>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="dropdown-search"
          />
            {filteredListItems.map((language, i) => (
              <li
                key={i}
                onMouseEnter={() => setHoveredItem(language.val)}
                onMouseLeave={() => setHoveredItem("")}
                onClick={event => handlerLIstItem(event, i, language.val)}
              >
                <a className="dropdown-item fab-dropdown-item d-flex cursor-pointer align-items-center">
                  {props.multiSelect && (
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={checkedCategoryList.some(curElem => curElem.label === language.label)}
                        value=""
                      />
                    </div>
                  )}
                  {language.icon && showIcon && (
                    <div className="ms-2 me-2">
                      <RdsIcon
                        name={language.icon}
                        height={language.iconWidth || "20px"}
                        width={language.iconWidth || "20px"}
                        fill={false}
                        stroke={true}
                      />
                    </div>
                  )}
                  {language.iconPath && (
                    <div>
                      <RdsIcon
                        iconPath={language.iconPath}
                        height={language.iconWidth || "30px"}
                        width={language.iconWidth || "30px"}
                        fill={false}
                        stroke={true}
                        isHovered={hoveredItem === language.val}
                        type="lottie"
                      />
                    </div>
                  )}
                  <span className="ms-1">
                    <div data-name={language.val}>{language.label}</div>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RdsDropdownList;