import React, { useState, useEffect, useReducer } from "react";
import {
    RdsButton,
    RdsCheckbox,
    RdsIcon,
    RdsSelectList,
} from "../rds-elements";
import "./rds-comp-visual-setting.css";

export interface RdsCompVisualSettingProps {
  visualsettingsItem: any[];
  navtabItems: any[];
  listskin: any[];
  listSubmenu: any[];
  visualSettingHeader?: any[];
  visualSettingSubHeader?: any[];
  isShimmer?: boolean;
  onSaveVisualSettingsData?: (visualsettingsItem: any[]) => void;
  indexEmitter?: any;
  themeItem: any[];
}

//reducer

const reducer = (state: any, action: any) => {
    switch (action.type) {
    case "CHECKBOX":
        return state.map((vsItem: any) => {
            if (vsItem.themeId === action.theme) {
                const obj = Object.assign({}, vsItem);
                obj[action.tab][action.name] = !obj[action.tab][action.name];
                return obj;
            } else {
                return { ...vsItem };
            }
        });

    case "SELECTLIST":
        return state.map((vsItem: any) => {
            if (vsItem.themeId === action.theme) {
                const obj = Object.assign({}, vsItem);
                obj[action.tab][action.name] = action.value;
                return obj;
            } else {
                return { ...vsItem };
            }
        });

    default:
        return state;
    }
};

const RdsCompVisualSetting = (props: RdsCompVisualSettingProps) => {
    const [vsItem, dispatch] = useReducer(reducer, props.visualsettingsItem);
    const [selectedSkin, setSelectedSkin] = useState("");

    const [activeTheme, setActiveTheme] = useState("default");
    const [activeTab, setActiveTab] = useState(
        props.navtabItems.filter((tabs) => tabs.themeId == activeTheme)[0]
            .navtabs[0].id
    );
    const [resetSelectList, setResetSelectList] = useState(false);
    const [fixedAsideChecked, setfixedAsideChecked] = useState(false);
    const [allowAsideMinimizing, setallowAsideMinimizing] = useState(false);
    const [defaultMinimisedAside, setdefaultMinimisedAside] = useState(false);
    const [expandMenuWhenHovered, setexpandMenuWhenHovered] = useState(false);
    const [fixedSubHeader, setfixedSubHeader] = useState(false);
    const [fixedFooter, setfixedFooter] = useState(false);
    
    const onSetActiveTheme = (themeId: any) => {
        setActiveTheme(themeId);
        setSelectedSkin(themeId.toLowerCase()); // set the selected skin based on the themeId
        setActiveTab(
            props.navtabItems.filter((tabs) => tabs.themeId == themeId)[0].navtabs[0]
                .id
        );
    };

    const onTabSelect = (id: any) => {
        setActiveTab(id);
    };
    const onSaveVisualSettings = () => {
        props.onSaveVisualSettingsData != undefined &&
        props.onSaveVisualSettingsData(vsItem);
        setResetSelectList(true);
        setfixedAsideChecked(false);
        setallowAsideMinimizing(false);
        setdefaultMinimisedAside(false);
        setexpandMenuWhenHovered(false);
        setfixedSubHeader(false);
        setfixedFooter(false);
        setTimeout(() => setResetSelectList(false), 0);
    };

    const onCheckboxCheck = (e: any, propertyName?: string) => {
        const propertySetters: Record<string, (value: any) => void> = {
            fixedAside: setfixedAsideChecked,
            allowAsideMinimizing: setallowAsideMinimizing,
            defaultMinimizedAside: setdefaultMinimisedAside,
            expandMenuHovered: setexpandMenuWhenHovered,
            fixedSubHeader: setfixedSubHeader,
            fixedFooter: setfixedFooter,
        };
    
        if (propertyName && propertySetters[propertyName]) {
            propertySetters[propertyName](e);
        }
    
        dispatch({
            type: "CHECKBOX",
            theme: activeTheme,
            tab: activeTab,
            name: e.target.name,
        });
    };
    const onSelectListValue = (e: any) => {
        console.log("selected  value e.target.value ", e.target.value);
        setSelectedSkin(e.target.value);
        dispatch({
            type: "SELECTLIST",
            theme: activeTheme,
            tab: activeTab,
            name: e.target.name,
            value: e.target.value,
        });
    };

    useEffect(() => {
        onTabSelect;
    }, [activeTheme, activeTab, vsItem]);

    return (
        <>
            <div className="row">
                <div className="col-md-12">
                    <div className="card p-2 border-0 rounded-0 vh-88">
                        {/* Theme optionand active theme from here */}

                        <div className="row pt-4 theam-cards">
                            {props.themeItem.map((theme) => (
                                <div className="col-md-4 mb-4" key={theme.themeId}>
                                    <div
                                        className={`d-inline-block p-3 pb-0 ${
                                            activeTheme == theme.themeId
                                                ? "themeActivate"
                                                : "themeInactivate"
                                        }`}
                                    >
                                        <div
                                            className="p-0 cursorpointer"
                                            onClick={() => onSetActiveTheme(theme.themeId)}
                                        >
                                            <img src={theme.imgsrc} className="w-100" />
                                        </div>
                                        <div className="col-md-12">
                                            <h6 className="text-center"></h6>
                                        </div>

                                        <div className="p-2">
                                            <h5 className="text-center">{theme.theme}</h5>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Start NavTabs  from here */}

                        <div className="row navsm-p-0">
                            <div className="navtabs-wrapper-div">
                                <ul className="nav nav-tabs-our-custom">
                                    {props.navtabItems
                                        .filter((tabs) => tabs.themeId == activeTheme)[0]
                                        .navtabs.map((navtabsItem: any) => (
                                            <li className="nav-item" key={navtabsItem.id}>
                                                <a
                                                    className={
                                                        "nav-link pe-4 ps-4 " +
                                                      (navtabsItem.id === activeTab
                                                          ? " border-bottom border-primary border-3 text-primary "
                                                          : "inactive") +
                                                      (navtabsItem.disabled ? "disabled " : "")
                                                    }
                                                    aria-current="page"
                                                    data-bs-target={navtabsItem.tablink}
                                                    aria-controls={navtabsItem.ariacontrols}
                                                    onClick={() => setActiveTab(navtabsItem.id)}
                                                >
                                                    {navtabsItem.icon && (
                                                        <span className="pe-3">
                                                            <RdsIcon
                                                                name={navtabsItem.icon}
                                                                height="20px"
                                                                width="20px"
                                                                stroke={true}
                                                            />
                                                        </span>
                                                    )}
                                                    <span>{navtabsItem.label}</span>
                                                </a>
                                            </li>
                                        ))}
                                </ul>
                            </div>

                            {/* Start Setting Options from here */}

                            <div className="tab-content" id="headerbar">
                                {activeTab == "subheader" && (
                                    <div
                                        className="  pt-4 pb-4"
                                        id="nav-subheader"
                                        role="tabpanel"
                                        aria-labelledby="nav-subheader"
                                    >
                                        <RdsCheckbox
                                           onChange={()=>onCheckboxCheck(!fixedSubHeader,"fixedSubHeader")}
                                            labelText="Fixed SubHeader"
                                            name="fixedSubHeader"
                                            checked={
                                                fixedSubHeader
                                            }
                                        />

                                        <div className="d-flex flex-column-reverse px-4 flex-lg-row flex-md-column-reverse flex-row flex-xl-row flex-xxl-row footer-buttons gap-2 mt-3 pb-3">
                                            <RdsButton
                                                label="Save as system default"
                                                colorVariant="primary"
                                                block={false}
                                                size="small"
                                                tooltipTitle={""}
                                                type="submit"
                                                onClick={onSaveVisualSettings}
                                            />
                                        </div>
                                    </div>
                                )}

                                {activeTab == "menu" && (
                                    <div
                                        className="pt-4"
                                        id="nav-Menu"
                                        role="tabpanel"
                                        aria-labelledby="nav-Menu"
                                    >
                                        {props.listskin && (
                                            <div className="col-lg-4 col-md-6 mb-3">
                                                <RdsSelectList
                                                    id="asideSkin"
                                                    label="Skin"
                                                    placeholder={
                                                         "Select Aside Skin"
                                                    }
                                                    selectItems={props.listskin.map((skin: any) => ({
                                                        option: skin.displayText,
                                                        value: skin.value,
                                                    }))}
                                                    dataTestId="select-aside-skin"
                                                    onChange={(item: any) =>
                                                        onSelectListValue({
                                                            target: {
                                                                name: "asideSkin",
                                                                value: item.value,
                                                            },
                                                        })
                                                    }
                                                    reset={resetSelectList}
                                                />
                                            </div>
                                        )}

                                        <div className="form-group mb-3">
                                            <RdsCheckbox
                                                onChange={()=>onCheckboxCheck(!fixedAsideChecked,"fixedAside")}
                                                labelText="Fixed Aside"
                                                name="fixedAside"
                                                checked={
                                                    fixedAsideChecked
                                                }
                                            />

                                            <RdsCheckbox
                                                onChange={()=>onCheckboxCheck(!allowAsideMinimizing,"allowAsideMinimizing")}
                                                labelText="Allow Aside Minimizing"
                                                name="allowAsideMinimizing"
                                                checked={
                                                    allowAsideMinimizing
                                                }
                                            />

                                            <RdsCheckbox
                                                onChange={()=>onCheckboxCheck(!defaultMinimisedAside,"defaultMinimizedAside")}
                                                name="defaultMinimizedAside"
                                                labelText="Default Minimised Aside"
                                                checked={
                                                    defaultMinimisedAside
                                                }
                                            />

                                            <RdsCheckbox
                                                onChange={()=>onCheckboxCheck(!expandMenuWhenHovered,"expandMenuHovered")}
                                                labelText="Expand Menu when Hovered"
                                                name="hoverableAside"
                                                checked={
                                                    expandMenuWhenHovered
                                                }
                                            />
                                        </div>

                                        {props.listSubmenu && (
                                            <div className=" col-md-4 mb-3 mt-1 mb-4">
                                                <RdsSelectList
                                                    id="submenuToggle"
                                                    label="Submenu Toggle"
                                                    placeholder={
                                                        "Select Submenu"
                                                    }
                                                    selectItems={props.listSubmenu.map(
                                                        (submenu: any) => ({
                                                            option: submenu.displayText,
                                                            value: submenu.value,
                                                        })
                                                    )}
                                                    dataTestId="select-submenu-toggle"
                                                    onChange={(item: any) =>
                                                        onSelectListValue({
                                                            target: {
                                                                name: "submenuToggle",
                                                                value: item.value,
                                                            },
                                                        })
                                                    }
                                                    reset={resetSelectList}
                                                />
                                                <div className="d-flex flex-column-reverse px-4 flex-lg-row flex-md-column-reverse flex-row flex-xl-row flex-xxl-row footer-buttons gap-2 mt-3 pb-3">
                                                    <RdsButton
                                                        label="Save as system default"
                                                        colorVariant="primary"
                                                        block={false}
                                                        size="small"
                                                        tooltipTitle={""}
                                                        type="submit"
                                                        onClick={onSaveVisualSettings}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {activeTab == "footer" && (
                                    <div
                                        className="  pb-4"
                                        id="nav-footer"
                                        role="tabpanel"
                                        aria-labelledby="nav-footer"
                                    >
                                        <div className="pt-4"> 
                                            <RdsCheckbox
                                                onChange={()=>onCheckboxCheck(!fixedFooter,"fixedFooter")}
                                                labelText="Fixed Footer"
                                                name="fixedFooter"
                                                checked={
                                                    fixedFooter
                                                }
                                            />
                                        </div>
                                        <div className="d-flex flex-column-reverse px-4 flex-lg-row flex-md-column-reverse flex-row flex-xl-row flex-xxl-row footer-buttons gap-2 mt-3 pb-3">
                                            <RdsButton
                                                label="Save as system default"
                                                colorVariant="primary"
                                                block={false}
                                                size="small"
                                                tooltipTitle={""}
                                                type="submit"
                                                onClick={onSaveVisualSettings}
                                            />
                                        </div>
                                    </div>
                                )}

                                {activeTab == "header" && (
                                    <div className="tab-content" id="headerbar">
                                        <div
                                            className="  pt-4 navsm-p-0"
                                            id="nav-headerbar"
                                            role="tabpanel"
                                            aria-labelledby="nav-headerbar"
                                        >
                                            <div className="row">
                                                <div className="col-md-4">
                                                    {props.listskin && (
                                                        <div
                                                            className={`mb-3 ${
                                                                selectedSkin === "dark"
                                                                    ? "dark-class"
                                                                    : selectedSkin === "semidark"
                                                                        ? "semidark-class"
                                                                        : ""
                                                            }`}
                                                        >
                                                            <label className="">Skin</label>
                                                            <RdsSelectList
                                                                id="headerSkin"
                                                                placeholder={
                                                                    vsItem.filter(
                                                                        (item: any) => item.themeId === activeTheme
                                                                    )[0]?.header?.headerSkin ||
                                                                  (activeTheme === "dark" ? "Dark" : "Semidark")
                                                                }
                                                                selectItems={props.listskin.map(
                                                                    (skin: any) => ({
                                                                        option: skin.displayText,
                                                                        value: skin.value,
                                                                    })
                                                                )}
                                                                dataTestId="select-header-skin"
                                                                onChange={(item: any) =>
                                                                    onSelectListValue({
                                                                        target: {
                                                                            name: "headerSkin",
                                                                            value: item.value,
                                                                        },
                                                                    })
                                                                }
                                                            />
                                                        </div>
                                                    )}

                                                    <div className="form-group mb-4">
                                                        <label className="mb-2">Desktop</label>
                                                        <RdsCheckbox
                                                            onChange={onCheckboxCheck}
                                                            labelText="Fixed Header"
                                                            name="desktopFixedHeader"
                                                            checked={
                                                                vsItem.filter(
                                                                    (item: any) => item.themeId == activeTheme
                                                                )[0]?.header?.desktopFixedHeader
                                                            }
                                                        />
                                                        <label className="mb-2">Mobile</label>
                                                        <RdsCheckbox
                                                            onChange={onCheckboxCheck}
                                                            labelText="Fixed Header"
                                                            name="mobileFixedHeader"
                                                            checked={
                                                                vsItem.filter(
                                                                    (item: any) => item.themeId == activeTheme
                                                                )[0]?.header?.mobileFixedHeader
                                                            }
                                                        />
                                                    </div>
                                                    <div className="d-flex flex-column-reverse px-4 flex-lg-row flex-md-column-reverse flex-row flex-xl-row flex-xxl-row footer-buttons gap-2 mt-3 pb-3">
                                                        <RdsButton
                                                            label="Save as system default"
                                                            colorVariant="primary"
                                                            block={false}
                                                            size="small"
                                                            tooltipTitle={""}
                                                            type="submit"
                                                            onClick={onSaveVisualSettings}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* ********************************/}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RdsCompVisualSetting;
