import { RdsCheckbox } from "../rds-elements";
import React, { useState, useEffect, useRef } from "react";
import { RdsInput, RdsButton } from "../rds-elements";
import { useTranslation } from "react-i18next";
import RdsCompMenuDirectory from "../rds-comp-menus-directories/rds-comp-menus-directories";
import RdsCompButtonGroup from "../rds-comp-button-group";
import { Role } from "../rds-comp-button-group/rds-comp-button-group";
import RdsCompIcon from "../rds-comp-icon";
import RdsCompSelectList from "../rds-comp-select-list";
export interface RdsCompMenuProps {
  onSubmit: any;
  menusData: any;
  valueType?: any;
  reset?: boolean;
  onCancel?: any;
  menuPage: {
    option: string;
    value: number;
  }[];
  menu?: string;
  items?: any;
  offId: string;
  onCreateSubMenu: (data: any) => void;
  onDeleteMenu: (id: any) => void;
  onMenuEdit: (data: any) => void;
  colorVariant?: string;
  size?: string;
  menuIcon?: string;
  menuiconWidth?: string;
  menuiconHeight?: string;
  listItems: any[];
  className?: string;
  id?: string;
  isShowBorder?: boolean;
  onClick?: () => void;
}
export interface MenuPage {
  option: string;
  value: number;
}
const RdsCompMenu = (props: RdsCompMenuProps) => {
  const [data, setData] = useState(props.menusData);
  const [inputReset, setInputReset] = useState(props.reset);
  const [menuPageList, setMenuPageList] = useState<MenuPage[]>([]);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const customClasses = `btn border-0 btn-${
    props.colorVariant
  } btn-icon fab-btn ${
    props.size == "small" ? "btn-sm" : props.size == "large" ? "btn-lg" : ""
  }`;

  const buttonGroupList = [
    {
      id: "plus",
      databstoggle: "offcanvas",
      databstarget: `#a${props.offId}`,
      label: "",
      name: "btnradio",
      checked: true,
      icon: "plus",
      iconWidth: "14px",
      iconHeight: "14px",
      colorVariant: "light",
    },
    {
      databstoggle: "offcanvas",
      databstarget: `#b${props.offId}`,
      id: "edit",
      label: "",
      name: "btnradio",
      checked: false,
      icon: "pencil",
      iconWidth: "14px",
      iconHeight: "14px",
      colorVariant: "light",
    },
    {
      databstoggle: "modal",
      databstarget: "#deleteMenu",
      id: "delete",
      label: "",
      name: "btnradio",
      checked: false,
      icon: "delete",
      iconWidth: "14px",
      iconHeight: "14px",
      colorVariant: "light",
    },
  ];
  const handlerButtonGroupClick = (e: any, id: any, item: any) => {
    if (id == "plus") {
      props.onCreateSubMenu && props.onCreateSubMenu(item?.data);
    } else if (id == "edit") {
      props.onMenuEdit && props.onMenuEdit(item?.data);
    } else if (id == "delete") {
      props.onDeleteMenu && props.onDeleteMenu(item?.data?.id);
    }
  };

  const handleClick = (id: string) => () => {
    if (expandedItems?.includes(id)) {
      setExpandedItems(expandedItems.filter((item) => item !== id));
    } else {
      setExpandedItems([...expandedItems, id]);
    }
  };

  const renderDirectoryItem = (item: any) => (
    <>
      <div key={item.data.id} className="d-flex align-items-center mb-3">
        {item?.children?.length != 0 && (
          <button
            className=" me-1 border-0 bg-transparent"
            onClick={handleClick(item.data.id)}
          >
            <RdsCompIcon
              name={
                expandedItems?.includes(item.data.id)
                  ? "chevron_up"
                  : "chevron_down"
              }
              height="8px"
              width="12px"
              fill={false}
              stroke={true}
              colorVariant="primary"
              onClick={handleClick(item.data.id)}
              isCursorPointer={true}
            />
          </button>
        )}
        <span className="mx-1">
          <RdsCompIcon
            name="folder"
            height="17px"
            width="20px"
            fill={false}
            stroke={true}
            colorVariant="primary"
            onClick={handleClick(item.data.id)}
            dataTestId="folder-icon"
            isCursorPointer={true}
          />
        </span>
        <span className="mt-1 ms-2 node-label d-flex">
          <span className="my-1">{item.data.displayName}</span>
          <span className="node-icon ms-2">
            <RdsCompButtonGroup
              buttonGroupItems={buttonGroupList}
              colorVariant="primary"
              isOutline={true}
              role={Role.Button}
              size="small"
              vertical={false}
              onButtonClick={(e: any, id: any) =>
                handlerButtonGroupClick(e, id, item)
              }
            />
          </span>
        </span>
      </div>
      {item.children?.length > 0 && expandedItems?.includes(item.data.id) && (
        <ul className="pl-0" id="mobileviewmenusdirectory">
          <RdsCompMenuDirectory
            items={item.children}
            offId={props.offId}
            onCreateSubMenu={props.onCreateSubMenu}
            onDeleteMenu={props.onDeleteMenu}
            onMenuEdit={props.onMenuEdit}
          />
        </ul>
      )}
    </>
  );

  const renderDirectoryItems = (items: any) => {
    return items.map(renderDirectoryItem);
  };

  useEffect(() => {
    setMenuPageList(props.menuPage);
  }, [props.menuPage]);

  useEffect(() => {
    setInputReset(props.reset);
  }, [props.reset]);

  useEffect(() => {
    setData(props.menusData);
  }, [props.menusData]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node)
    ) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleItemClick = (onClick: () => void) => {
    return (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      onClick();
      setIsMenuOpen(false);
    };
  };

  const handlerChangeInput = (e: any, key: any) => {
    setData({ ...data, [key]: e.target.value });
  };

  const handlerChangeActive = (e: any) => {
    setData({ ...data, isActive: e });
  };

  function handlePageId(value: any) {
    setData({ ...data, pageId: value });
  }

  function emitSaveData(event: any) {
    event.preventDefault();
    props.onSubmit && props.onSubmit(data);
    setInputReset(!inputReset);
    setData({
      url: "",
      pageId: 0,
      displayName: "",
      isActive: false,
      icon: "",
      target: "",
      elementId: "",
      cssClass: "",
    });
  }
  const isUrlValid = (url: any) => {
    if (
      !url ||
      url.length === 0 ||
      !/^(ftp|http|https):\/\/[^ "]+$/.test(url)
    ) {
      return false;
    }
    return true;
  };
  const isDisplayNameValid = (displayName: any) => {
    if (!displayName || displayName.length === 0) {
      return false;
    }
    return true;
  };

  const isFormValid =
    isUrlValid(data?.url) && isDisplayNameValid(data?.displayName);
  return (
    <>
      {props.menu === "default" && (
        <>
          <div className="custom-content-scroll">
            <div className="row">
              <div className="col-md-12">
                <RdsInput
                  name="URL"
                  label={true}
                  value={data?.url}
                  placeholder="Enter Url"
                  onChange={(e) => handlerChangeInput(e, "url")}
                  dataTestId="url"
                  validatonPattern={/^(ftp|http|https):\/\/[^ "]+$/}
                  validationMsg="Enter valid url"
                  required={true}
                />
              </div>
              <div className="col-md-12 mb-2">
                <RdsCompSelectList
                  id="selpa"
                  label="Page"
                  placeholder="Select Page"
                  selectItems={menuPageList}
                  isSearchable={true}
                  selectedValue={data?.pageId}
                  onChange={(item: any) => handlePageId(item.value)}
                ></RdsCompSelectList>
              </div>
              <div className="col-md-12">
                <RdsInput
                  name="Display Name"
                  label={true}
                  value={data?.displayName}
                  placeholder={"Enter Display Name"}
                  required={true}
                  onChange={(e) => handlerChangeInput(e, "displayName")}
                  dataTestId="display-name"
                  reset={inputReset}
                />
              </div>
              <div className="col-md-12 pt-1">
                <RdsCheckbox
                  labelText="Active"
                  onChange={(e) => {
                    handlerChangeActive(e.target.checked);
                  }}
                  checked={data?.isActive}
                  dataTestId="active"
                ></RdsCheckbox>
              </div>
              <div className="col-md-12">
                <RdsInput
                  name="Icon"
                  label={true}
                  value={data?.icon}
                  placeholder={"Enter Icon"}
                  onChange={(e) => handlerChangeInput(e, "icon")}
                  dataTestId="enter-icon"
                />
              </div>
              <div className="col-md-12">
                <RdsInput
                  name="Target"
                  label={true}
                  value={data?.target}
                  placeholder="Enter Target"
                  onChange={(e) => handlerChangeInput(e, "target")}
                  dataTestId="target"
                />
              </div>
              <div className="col-md-12">
                <RdsInput
                  name="Element ID"
                  label={true}
                  value={data?.elementId}
                  placeholder="Enter Element ID"
                  onChange={(e) => handlerChangeInput(e, "elementId")}
                  dataTestId="enter-id"
                />
              </div>
              <div className="col-md-12">
                <RdsInput
                  name="Css Class"
                  label={true}
                  value={data?.cssClass}
                  placeholder="Enter Css Class"
                  onChange={(e) => handlerChangeInput(e, "cssClass")}
                  dataTestId="enter-css-class"
                />
              </div>
            </div>
          </div>

          <div className="d-flex flex-column-reverse ps-4 flex-lg-row flex-md-column-reverse flex-row flex-xl-row flex-xxl-row footer-buttons gap-2 mt-3 mb-2 px-4">
            <RdsButton
              label="Cancel"
              databsdismiss="offcanvas"
              type={"button"}
              size="small"
              isOutline={true}
              colorVariant="primary"
              class="me-2"
              dataTestId="cancel"
              onClick={(e) => props?.onCancel && props?.onCancel(e)}
            ></RdsButton>
            <RdsButton
              label="Save"
              type={"button"}
              size="small"
              databsdismiss="offcanvas"
              isDisabled={!isFormValid}
              colorVariant="primary"
              class="me-2"
              onClick={(e: any) => emitSaveData(e)}
              dataTestId="save"
            ></RdsButton>
          </div>
        </>
      )}
      {props.menu === "directories" && (
        <ul>{renderDirectoryItems(props.items)}</ul>
      )}
      {props.menu === "fab" && (
        <div style={{ position: "relative" }}>
          <button
            ref={buttonRef}
            className={customClasses}
            type="button"
            onClick={toggleMenu}
            aria-expanded={isMenuOpen ? "true" : "false"}
            data-testid="fab-menu-btn"
          >
            <RdsCompIcon
              name={props.menuIcon || "list"}
              fill={false}
              stroke={true}
              height="17px"
              width="17px"
              colorVariant={
                customClasses.includes("btn-dark") ||
                customClasses.includes("btn-primary") ||
                customClasses.includes("btn-danger")
                  ? "light"
                  : "dark"
              }
            ></RdsCompIcon>
          </button>
          <div id="fab-list" ref={menuRef}>
            <div
              className={`${
                props.isShowBorder
                  ? props.className
                  : "border-0 dropdown-menu dropdown-menu-list fab-dropdown shadow mb-1"
              } ${isMenuOpen ? " show" : ""}`}
              role="menu"
            >
              {props.listItems.map((listItem) => (
                <a
                  key={listItem.key}
                  role="link"
                  className={`dropdown-item fab-dropdown-item d-flex ${
                    props.id === "attachment-text" ? "py-2" : "py-3"
                  }`}
                  onClick={handleItemClick(listItem.onClick)}
                >
                  <RdsCompIcon
                    name={listItem.icon}
                    height={listItem.iconHeight}
                    width={listItem.iconWidth}
                    fill={false}
                    stroke={true}
                  ></RdsCompIcon>
                  <span className="ms-3">{listItem.value}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RdsCompMenu;
