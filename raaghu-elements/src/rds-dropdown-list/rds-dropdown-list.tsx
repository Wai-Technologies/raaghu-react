import React, { useState, useEffect, useRef } from "react";
import RdsIcon from "../rds-icon";
import RdsBadge from "../rds-badge";
import RdsCheckbox from "../rds-checkbox";
import "./rds-dropdown-list.css";
import Tooltip from "../rds-tooltip/rds-tooltip";
import { placements } from "../../libs";
import "../../../raaghu-react-themes/src/styles/dropdown.scss";

export enum DropdownSize {
  Default = "Default",
  Small = "Small",
  Large = "Large",
}

export enum DropdownState {
  Default = "Default",
  Expanded = "Expanded",
  Selected = "Selected",
  Disabled = "Disabled",
}

export enum DropdownStyle {
  Default = "Default",
  BottomLine = "Bottom Line",
}

export interface RdsDropdownListProps {
  
  id?: string; // Id of the dropdown
  reset?: boolean; // To reset the dropdown
  labelIcon?: string; // Icon for the label
  labelIconWidth?: string; // Width of the icon for the label
  labelIconHeight?: string; // Height of the icon for the label
  icon?: string; // Icon for the dropdown
  iconFill?: boolean; // To fill the icon
  iconWidth?: string; // Width of the icon
  iconStroke?: boolean; // To stroke the icon
  iconHeight?: string; // Height of the icon
  placeholder?: string; // Placeholder for the dropdown
  isPlaceholder?: boolean; // To show placeholder
  isIconPlaceholder?: boolean; // To show icon placeholder
  borderDropdown?: boolean; // To show border in dropdown
  size?: DropdownSize; // Size of the dropdown
  listItems: {
    label: string; // Label of the dropdown
    val: string; // Value of the dropdown
    icon?: string; // Icon of the dropdown
    iconWidth?: string; // Width of the icon
    iconHeight?: string; // Height of the icon
    iconPath?: string; // Path of the icon
  }[]; // List of items in the dropdown

  multiSelect?: boolean; // To enable multiselect dropdown
  xOffset?: string; // X offset of the dropdown
  yOffset?: string; // Y offset of the dropdown
  iconPath?: string;  // To show icon in dropdown
  onClick?: ($event: React.MouseEvent<HTMLLIElement>, val: string) => void; // To get the selected item
  selectedItems?: (selectedItems: any) => void; // To get the selected items
  selectedIndex?: (selectedindex: number) => void; // To get the index of the selected item
  showIcon?: boolean; // To show icon in dropdown
  isCode?: boolean; // To show code in dropdown
  block?: boolean; // To show dropdown in block
  state?: DropdownState; // To set the state of the dropdown
  style?: DropdownStyle; // To show bottom line in dropdown
  showTitle?: boolean; // show/hide title of the dropdown
  title?: string; // Title of the dropdown
  isMandatory?: boolean; // To show required field
  showHint?: boolean; // To show hint in dropdown
  hint?: string; // Hint text
  showSelectedOption?: boolean; // To show selected option
}

const RdsDropdownList = (props: RdsDropdownListProps) => {
  const [showIcon, setShowIcon] = useState(
    props.showIcon || props.showIcon == undefined ? true : false
  );
  const [showSelectedOption, setShowSelectedOption] = useState(props.showSelectedOption == undefined ? true : false);
  const [checkedCategoryList, setCheckedCategoryList] = useState<any>([]);
  const [expand, setExpend] = useState(props.state === "Expanded");
  const [isTouch, setIsTouch] = useState(false);
  const [toggle, setToggle] = useState("show");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const block = props.block == false ? props.block : true;
  const [hoveredItem, setHoveredItem] = useState("");
  const [selectedOption, setSelectedOption] = useState<number>(0);

  // Ensure listItems is always an array
  const listItems = props.listItems || [];

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
    setShowIcon(props.showIcon || false);
  }, [props.showIcon]);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [props.id]);

  //  updating the selected language accordingly

  // using handlerLIstItem to change the language

  const handlerLIstItem = (
    event: React.MouseEvent<HTMLLIElement>,
    index: number,
    val: string
  ) => {
    if (props.multiSelect) {
      const isChecked = checkedCategoryList.some(
        (item: any) => item.label === props.listItems && props.listItems[index]?.label
      );
      if (isChecked) {
        uncheckHandler(event, props.listItems && props.listItems[index]);
      } else {
        checkHandler(event, props.listItems && props.listItems[index]);
      }
    } else {
      setSelectedOption(index);
      setExpend(false);
      props.onClick && props.onClick(event, val);
    }
  };
  const IconWidth = props.listItems && props.listItems[selectedOption]?.iconWidth || "16px";
  const IconHeight = props.listItems && props.listItems[selectedOption]?.iconHeight || "12px";

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

  if (props.listItems && props.listItems.length > 0) {
    props.listItems.forEach((listItems: any) => {
      labelObj[listItems.val] = false;
    });
  }
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
  
  const border = props.state === "Disabled" ? "form-control " + fieldSize : props.borderDropdown ? "form-control border-primary " + fieldSize : "border-0";
  const bottomLine = props.style === "Bottom Line" 
    ? props.state === "Disabled" 
      ? "bottom-line-disabled" 
      : "bottom-line-primary" 
    : "";
  const defaultDisabled = props.style === "Default" && props.state === "Disabled" ? "default-disabled" : "";
  
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
      <div className={`dropdown ${block ? "w-100 mt-1" : ""} d-flex`} ref={dropdownRef} style={{ marginBottom: '8px' }}>
        <span
          className={`gap-2 ${offset} ${border} ${bottomLine} ${defaultDisabled} ${props.state === "Disabled" ? "disabled" : ""}`}
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
            {props.state === "Selected" && listItems.length > 0 && (
              <div className="d-flex align-items-baseline">
                {(listItems[selectedOption]?.icon ||
                  listItems[selectedOption]?.iconPath) &&
                  props.showIcon && (
                    <span>
                      {listItems[selectedOption]?.iconPath ? (
                        <span>
                          <RdsIcon
                            iconPath={listItems[selectedOption]?.iconPath}
                            width={listItems[selectedOption]?.iconWidth || ""}
                            height={listItems[selectedOption]?.iconHeight || ""}
                            fill={false}
                            stroke={true}
                            isHovered={hoveredItem === listItems[selectedOption]?.label}
                            type="lottie"
                          ></RdsIcon>
                        </span>
                      ) : (
                        <RdsIcon
                          name={listItems[selectedOption]?.icon}
                          width={IconWidth}
                          height={IconHeight}
                          stroke={true}
                          fill={false}
                        ></RdsIcon>
                      )}
                    </span>
                  )}
                <span className="fs-6 me-2 flex-grow-1 text-nowrap">
                  {props.isCode === true ? (
                    <span className="fs-6 ms-2 me-2 flex-grow-1 text-nowrap">
                      {listItems[selectedOption]?.val.toUpperCase()}
                    </span>
                  ) : (
                    <span className="fs-6 me-2 flex-grow-1 text-nowrap">
                      {listItems[selectedOption]?.label}
                    </span>
                  )}
                </span>
              </div>
            )}
  
            {/* single select dropdown placeholder */}
            {props.state !== "Selected" && !props.multiSelect && (
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
                {showSelectedOption && <span className="dw-placeholder fs-6 ms-2 nowrap">
                  {selectedOption >= 0 && listItems.length > 0 ? listItems[selectedOption]?.label : props.placeholder}
                </span>}
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
            {props.state !== "Selected" && !props.isIconPlaceholder && (
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
            className={`dropdown-menu ${expand ? "show" : "hide"} ${props.size === "Default" ? "mt-2" : props.size === "Large" ? "mt-3" : ""}`}
            id={props.id}
            aria-labelledby={props.id}
          >
            {props.listItems && props.listItems.map((language: any, i: any) => (
              <li
                key={i}
                className={`dropdown-item ${
                  props.multiSelect ? "d-flex align-items-center" : ""
                }`}
                onClick={(event) => handlerLIstItem(event, i, language.val)}
                onMouseEnter={() => handleMouseEnter(language.val)}
                onMouseLeave={handleMouseLeave}
              >
                {props.multiSelect && (
                  <RdsCheckbox
                    checked={checkedCategoryList.some(
                      (item: any) => item.label === language.label
                    )}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      if (e.target.checked) {
                        checkHandler(e, language);
                      } else {
                        uncheckHandler(e, language);
                      }
                    }}
                  />
                )}
                {language.iconPath ? (
                  <span>
                    <RdsIcon
                      iconPath={language.iconPath}
                      width={language.iconWidth || ""}
                      height={language.iconHeight || ""}
                      fill={false}
                      stroke={true}
                      isHovered={hoveredItem === language.val}
                      type="lottie"
                    ></RdsIcon>
                  </span>
                ) : (
                  language.icon && (
                    <RdsIcon
                      name={language.icon}
                      width={language.iconWidth || "16px"}
                      height={language.iconHeight || "12px"}
                      stroke={true}
                      fill={false}
                    ></RdsIcon>
                  )
                )}
                {props.isCode === true ? (
                  <span className="fs-6 ms-2">{language.val.toUpperCase()}</span>
                ) : (
                  <span className="fs-6 ms-2">{language.label}</span>
                )}
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