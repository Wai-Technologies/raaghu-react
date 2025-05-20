import React, { useEffect, useState } from "react";
import { RdsDropdownList, RdsIcon } from "../rds-elements";
import elementList from "./element-list";
import componentList from "./components-list";
import chartList from "./charts-list";
import Tooltip, { TooltipStyle } from "../../../raaghu-elements/src/rds-tooltip/rds-tooltip";

const MultiLevelDropdown = (props: any) => {
    const [currUI, setCurrUI] = useState<any>({
        ui: "",
        list: [],
        placeholder: "UI Library",
        listItem: "",
    });
    const [isTouch, setIsTouch] = useState(false);
    const [toggle, setToggle] = useState("show");

    const uiList = [
        {
            label: "Elements",
            val: "ele",
            hasChild: true,
        },
        {
            label: "Charts",
            val: "char",
            hasChild: true,
        },
        {
            label: "Components",
            val: "comp",
            hasChild: true,
        },
        {
            label: "Icons",
            val: "icon",
            hasChild: false,
        },
    ];
    const lang = localStorage.getItem("i18nextLng");
    let index = uiList.findIndex((item) => item.val === lang);
    if (index == -1) {
        index = 0;
    }

    function clickedOnDropDown(e: any) {
        const dropdownMenu = document.getElementById("uiDrop");
        if (toggle == "show") {
            dropdownMenu?.classList.remove("hide");
            dropdownMenu?.classList.add(toggle);
            setToggle("hide");
        } else {
            dropdownMenu?.classList.remove("show");
            dropdownMenu?.classList.add(toggle);
            setToggle("show");
        }
        setCurrUI({ ...currUI, ui: "" });
    }

    //  updating the selected language accordingly

    useEffect(() => {
        setIsTouch(false);
    }, [props.reset]);
    const handlerListItem = (
        event: React.MouseEvent<HTMLLIElement>,
        index: number,
        val: string
    ) => {
        if (val === "icon") {
            if (props.onsubmenu) {
                props.onsubmenu(event, val, "Icons", currUI.ui);
            }
            setIsTouch(true);
            setCurrUI({
                ...currUI,
                ui: "",
                list: [],
                listItem: "",
                placeholder: "Icons",
            });
            const dropdownMenu = document.getElementById("uiDrop");
            dropdownMenu?.classList.remove("show");
            dropdownMenu?.classList.add("hide");
            setToggle("show");
        }

        if (val === "char") {
            setCurrUI({
                ...currUI,
                ui: uiList[index].label,
                list: chartList,
                listItem: val,
            });
        }
        if (val === "ele") {
            setCurrUI({
                ...currUI,
                ui: uiList[index].label,
                list: elementList,
                listItem: val,
            });
        }
        if (val === "comp") {
            setCurrUI({
                ...currUI,
                ui: uiList[index].label,
                list: componentList,
                listItem: val,
            });
        }
    };
    const handlerSubMenuItem = (
        event: React.MouseEvent<HTMLLIElement>,
        index: number,
        val: string
    ) => {
        if (props.onsubmenu) {
            props.onsubmenu(event, val, currUI.list[index].label, currUI.ui);
        }
        setIsTouch(true);
        setCurrUI({
            ...currUI,
            ui: "",
            list: [],
            listItem: "",
            placeholder: currUI.list[index].label,
        });
        const dropdownMenu = document.getElementById("uiDrop");
        dropdownMenu?.classList.remove("show");
        dropdownMenu?.classList.add("hide");
        setToggle("show");
    };

    return (
        <div className="dropdown-raaghu w-100 position-relative multi-level-drop">
            <span
                className="cursor-pointer"
                onClick={clickedOnDropDown}
            >
                <div className="px-2 py-1 fw-light fs-5 d-flex align-items-center ps-2 justify-content-between">
                    {/* simple dropdown  */}
                    <div className="d-flex align-items-baseline">
                        <Tooltip label="UI Library" style={TooltipStyle.MiddleTopArrow}>
                            <span className="fs-6 ms-2 me-2 flex-grow-1 text-nowrap">
                                <RdsIcon
                                    name="ui_library"
                                    fill={false}
                                    stroke={true}
                                    height="20px"
                                    width="20px"
                                    classes="ui-lib"
                                ></RdsIcon>
                            </span>
                        </Tooltip>
                    </div>
                </div>
            </span>

            {/* DropdownList items */}
            <ul className="dropdown-menu ms-3 " id="uiDrop" aria-labelledby="uiDrop">
                {uiList?.map((listItem: any, i: any) => (
                    <li
                        className={listItem.val == currUI.listItem ? "active" : ""}
                        key={i}
                        onClick={(event) => {
                            handlerListItem(event, i, listItem.val);
                        }}
                    >
                        <a
                            id={i}
                            className="px-2 dropdown-item fab-dropdown-item d-flex cursor-pointer"
                        >
                            <span className="ms-1 w-100  d-flex align-items-center justify-content-between">
                                <div data-name={listItem.val}>{listItem.label} </div>
                                {listItem.val !== "icon" && (
                                    <div>
                                        <RdsIcon
                                            name="chevron_right"
                                            fill={false}
                                            stroke={true}
                                            height="11px"
                                            width="18px"
                                        ></RdsIcon>
                                    </div>
                                )}
                            </span>
                        </a>
                    </li>
                ))}
            </ul>
            {/* submenu DropdownList items */}
            {currUI.ui !== "" && (
                <div className={`multi-drop ${currUI.ui} `}>
                    <ul
                        className="list-unstyled m-0"
                        id="chartDrop"
                        aria-labelledby="chartDrop"
                    >
                        {currUI.list?.map((listItem: any, i: any) => (
                            <li
                                className="submenu-li"
                                key={i}
                                onClick={(event) => {
                                    handlerSubMenuItem(event, i, listItem.val);
                                }}
                            >
                                <a
                                    id={i}
                                    className="px-2 py-1 dropdown-item fab-dropdown-item d-flex cursor-pointer"
                                >
                                    <span className="ms-1">
                                        <div data-name={listItem.val}>{listItem.label} </div>
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

export default MultiLevelDropdown;
