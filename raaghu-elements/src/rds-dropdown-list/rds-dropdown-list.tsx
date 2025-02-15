import React, { useState, useEffect, useRef } from "react";
import RdsIcon from "../rds-icon";
import RdsBadge from "../rds-badge";
import "./rds-dropdown-list.css";
import Tooltip from "../rds-tooltip/rds-tooltip";
import { placements } from "../../libs";
import "../../../raaghu-react-themes/src/styles/dropdown.scss";

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
  tooltip?: boolean;
  tooltipPlacement?: placements;
  tooltipTitle?: string;
  
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
  state?: "Default" | "Expanded" | "Selected" | "Disabled";
  style?: "Default" | "Bottom Line";
  showTitle?: boolean;
  title?: string;
  isMandatory?: boolean;
  showHint?: boolean;
  hint?: string;
}

const RdsDropdownList = (props: RdsDropdownListProps) => {
  const [showIcon, setShowIcon] = useState(
    props.showIcon || props.showIcon == undefined ? true : false
  );
  const [checkedCategoryList, setCheckedCategoryList] = useState<any>([]);
  const [expand, setExpend] = useState(props.state === "Expanded");
  const [isTouch, setIsTouch] = useState(false);
  // to fetch the index of the selected language
  const [toggle, setToggle] = useState("show");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const block = props.block == false ? props.block : true;
  //  If language not found then we are updating index to 0
  const [hoveredItem, setHoveredItem] = useState("");
  const clickedOnDropDown = () => {
    if (props.state !== "Disabled") {
      setExpend(!expand);
      const dropdownMenu = document.getElementById(
        props.id as string
      ) as HTMLElement;

      if (dropdownMenu) {
        dropdownMenu.classList.toggle("show");
        dropdownMenu.classList.toggle("hide");
      }
    }
  };
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setExpend(false);
      const dropdownMenu = document.getElementById(
        props.id as string
      ) as HTMLElement;

      if (dropdownMenu) {
        dropdownMenu.classList.remove("show");
        dropdownMenu.classList.add("hide");
      }
      setToggle("show");
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [props.id]);

  //  updating the selected language accordingly

  const [selectedOption, setSelectedOption] = useState<number>(-1);

  // using handlerLIstItem to change the language

  const handlerLIstItem = (
    event: React.MouseEvent<HTMLLIElement>,
    index: number,
    val: string
  ) => {
    setIsTouch(true);
    if (props.multiSelect) {
      // If it's a multiselect dropdown, handle checkbox selection
      const isChecked = checkedCategoryList.some(
        (item: any) => item.label === props.listItems[index].label
      );

      if (isChecked) {
        // If item is already selected, uncheck it
        const newCheckedCategoryList = checkedCategoryList.filter(
          (item: any) => item.label !== props.listItems[index].label
        );
        setCheckedCategoryList(newCheckedCategoryList);
      } else {
        // If item is not selected, check it
        setCheckedCategoryList([
          ...checkedCategoryList,
          { label: props.listItems[index].label }
        ]);
      }
    } else {
      // If it's a single select dropdown, just update the selected option
      setSelectedOption(index);
      if (props.onClick) {
        props.onClick(event, val);
      }
      setExpend(!expand);
    }
  };
  const IconWidth = props.listItems[selectedOption]?.iconWidth || "16px";
  const IconHeight = props.listItems[selectedOption]?.iconHeight || "12px";

  const uncheckHandler = (e: any, item: any) => {
    const newChildTreeunits = checkedCategoryList.filter(
      (curItem: any) => curItem.label !== item.label
    );
    setCheckedCategoryList(newChildTreeunits);
  };

  const offset = `${props.xOffset || ""}  ${props.yOffset || ""}`;
  const checkHandler = (e: any, item: any) => {
    let newTempData: any;

    newTempData = {
      id: item.val,
      label: item.label,
    };

    setCheckedCategoryList((prev: any) => [...prev, newTempData]);
  };

  const labelObj: any = {};
  const [hoverState, setHoverState] = useState(labelObj);

  props.listItems.forEach((listItems: any) => {
    labelObj[listItems.val] = false;
  });
  useEffect(() => {
    setHoverState(labelObj);
  }, []);
  const updateHoverState = (val: string, isHover: boolean) => {
    const obj = hoverState;
    obj[val] = isHover;
    setHoverState((hoverState: any) => ({ ...obj }));
  };

  // Function to handle mouse enter on an li item
  const handleMouseEnter = (languageval: string) => {
    setHoveredItem(languageval);
  };

  // Function to handle mouse leave on an li item
  const handleMouseLeave = () => {
    setHoveredItem("");
  };
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEntericon = () => {
    setIsHovered(true);
  };

  const handleMouseLeaveicon = () => {
    setIsHovered(false);
  };
  const fieldSize =
    props.size === "Small"
      ? "form-control-sml"
      : props.size === "Default"
      ? "form-control-mid"
      : props.size === "Large"
      ? "form-control-lng"
      : ""; // Default size if not provided

  const border = props.borderDropdown ? "form-control " + fieldSize : "border-0";
  const bottomLine = props.style === "Bottom Line" ? "bottom-line" : "";

  useEffect(() => {
    setIsTouch(false);
    setCheckedCategoryList([]);
  }, [props.reset]);
  useEffect(() => {
    props.multiSelect === undefined &&
      props.selectedIndex != undefined &&
      props.selectedIndex(selectedOption);
  }, [selectedOption]);

  useEffect(() => {
    props.multiSelect &&
      props.selectedItems != undefined &&
      props.selectedItems(checkedCategoryList);
  }, [checkedCategoryList]);

  const calculateVisibleItems = () => {
    return checkedCategoryList.slice(0, 2); // Always take the first two items
  };

  const visibleItems = calculateVisibleItems();
  const remainingCount = checkedCategoryList.length - visibleItems.length;

  useEffect(() => {
    if (props.state === "Expanded") {
      setExpend(true);
    }
  }, [props.state]);

  return (
    <>
      {props.showTitle && props.title && (
        <label>
          {props.title}
          {props.isMandatory && <span className="text-danger"> *</span>}
        </label>
      )}
      <div className={`dropdown ${block ? "w-100 mt-1" : ""} d-flex`} ref={dropdownRef}>
        <span
          className={`gap-2 ${offset} ${border} ${bottomLine} ${props.state === "Disabled" ? "disabled" : ""}`}
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          id={props.id}
          onClick={props.state !== "Selected" && props.state !== "Disabled" ? clickedOnDropDown : undefined}
        >
          <div
            className={
              "d-flex align-items-center justify-content-xxl-between justify-content-xl-between justify-content-lg-between justify-content-md-between justify-content-between"
            }
          >
            {/* simple dropdown  */}
            {props.state === "Selected" && props.listItems.length !== 0 && (
              <div className="d-flex align-items-baseline">
                {(props.listItems[selectedOption]?.icon ||
                  props.listItems[selectedOption]?.iconPath) &&
                  props.showIcon && (
                    <span>
                      {props.listItems[selectedOption]?.iconPath ? (
                        <span>
                          <RdsIcon
                            iconPath={props.listItems[selectedOption]?.iconPath}
                            width={props.listItems[selectedOption]?.iconWidth || ""}
                            height={props.listItems[selectedOption]?.iconHeight || ""}
                            fill={false}
                            stroke={true}
                            isHovered={hoveredItem === props.listItems[selectedOption].label}
                            type="lottie"
                          ></RdsIcon>
                        </span>
                      ) : (
                        <RdsIcon
                          name={props.listItems[selectedOption].icon}
                          width={IconWidth}
                          height={IconHeight}
                          stroke={true}
                          fill={false}
                        ></RdsIcon>
                      )}
                    </span>
                  )}
                {!props.isIconPlaceholder &&
                  (props.isCode === true ? (
                    <span className="fs-6 ms-2 me-2 flex-grow-1 text-nowrap">
                      {props.listItems[selectedOption].val.toUpperCase()}
                    </span>
                  ) : (
                    <span className="fs-6 me-2 flex-grow-1 text-nowrap">
                      {props.listItems[selectedOption].label}
                    </span>
                  ))}
              </div>
            )}

            {/* single select dropdown placeholder */}
            {props.state !== "Selected" && !props.multiSelect && (
              <div className="d-flex align-items-center">
                {showIcon && (
                  <RdsIcon
                    name={props.listItems[selectedOption]?.iconPath ? "" : props.icon}
                    width="16px"
                    height="16px"
                    fill={false}
                    stroke={true}
                  />
                )}
                <span className="dw-placeholder fs-6 ms-2">
                  {selectedOption >= 0 ? props.listItems[selectedOption].label : props.placeholder}
                </span>
              </div>
            )}

            {/* multiselected dropdown placeholder */}
            {props.state !== "Selected" && checkedCategoryList.length == 0 &&
              props.multiSelect &&
              props.placeholder && (
                <div className="d-flex align-items-center">
                  {showIcon && (
                    <RdsIcon
                      name={props.icon}
                      width="16px"
                      height="16px"
                      fill={false}
                      stroke={true}
                    />
                  )}
                  <span className="dw-placeholder fs-6 ms-2">
                    {props.placeholder}
                  </span>
                </div>
              )}
            {/* multiselected dropdown's badge */}
            {props.state !== "Selected" && props.multiSelect && checkedCategoryList.length != 0 && (
              <div>
                {visibleItems.map((item: any) => (
                  <RdsBadge
                    className="me-1 mt-1"
                    key={item.id}
                    label={item.label}
                    colorVariant="primary"
                    size="small"
                    onClose={(e) => uncheckHandler(e, item)}
                    showClose={true}
                    textwithlabel={true}
                  />
                ))}
                {remainingCount > 0 && (
                  <RdsBadge
                    className="me-1 mt-1"
                    label={"+" + remainingCount.toString()}
                    colorVariant="primary"
                    size="small"
                    textwithlabel={true}
                    style="pill"
                  />
                )}
              </div>
            )}

            {/* chevron_down icon */}
            {props.state !== "Selected" && !props.isIconPlaceholder && !props.multiSelect && (
              <span
                className="ms-2"
                onClick={(e) => {
                  e.stopPropagation();
                  clickedOnDropDown();
                }}
              >
                <RdsIcon
                  name={expand ? "chevron_up" : "chevron_down"}
                  fill={false}
                  stroke={true}
                  height="11px"
                  width="11px"
                ></RdsIcon>
              </span>
            )}
          </div>
        </span>

        {/* DropdownList items */}
        {props.state !== "Selected" && props.state !== "Disabled" && (
          <ul
            className={`dropdown-menu ${expand ? "show" : "hide"}`}
            id={props.id}
            aria-labelledby={props.id}
          >
            {props.listItems?.map((language: any, i: any) => (
              <li
                key={i}
                onMouseEnter={() => handleMouseEnter(language.val)}
                onMouseLeave={handleMouseLeave}
                onClick={(event) => {
                  handlerLIstItem(event, i, language.val);
                }}
              >
                <a
                  id={i}
                  className="dropdown-item fab-dropdown-item d-flex cursor-pointer align-items-center"
                >
                  {props.multiSelect && (
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={
                          checkedCategoryList.filter(
                            (curElem: any) => curElem.label == language.label
                          ).length == 1
                        }
                        value=""
                        id="flexCheckDefault"
                      />
                    </div>
                  )}
                  {language.icon && showIcon && (
                    <div
                      className={`${language.icon == "isNull" ? "ms-4 me-2 " : "ms-2 me-2"
                        }`}
                    >
                      <RdsIcon
                        name={language.icon}
                        height={language.iconWidth ? language.iconWidth : "20px"}
                        width={language.iconWidth ? language.iconWidth : "20px"}
                        fill={false}
                        stroke={true}
                      ></RdsIcon>
                    </div>
                  )}

                  {language.iconPath && (
                    <div>
                      <RdsIcon
                        iconPath={language.iconPath}
                        height={language.iconWidth ? language.iconWidth : "30px"}
                        width={language.iconWidth ? language.iconWidth : "30px"}
                        fill={false}
                        stroke={true}
                        isHovered={hoveredItem === language.val}
                        type="lottie"
                      ></RdsIcon>
                    </div>
                  )}

                  <span className="ms-1">
                    <div data-name={language.val}>{language.label} </div>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

      {props.showHint && (
        <p className="my-1 text-black-50">
          <small>{props.hint}</small>
        </p>
      )}
    </>
  );
};

export default RdsDropdownList;