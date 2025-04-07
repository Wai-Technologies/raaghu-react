import React, { ReactNode, useEffect, useState } from "react";
import "./rds-navtabs.css";
import RdsIcon from "../rds-icon";
import RdsBadge from "../rds-badge"; // Ensure you import the RdsBadge component

export interface RdsNavtabsProps {
    children?: ReactNode;
    navtabsItems: {
        label: string;
        tablink?: string;
        ariacontrols?: string;
        icon?: string;
        subText?: string;
        disabled?: boolean;
        id: any;        
        count?: number; // Ensure count is part of the navtabsItems interface
        colorVariant?: string; // Include colorVariant for RdsBadge   
    }[];
    type: "default"  | "tabs";
    fill?: boolean;
    justified?: boolean;
    activeNavtabOrder?: (id: any) => void;
    //Addded isNextPressed and activeNavTabId prop for changing active tab in page when next is pressed.
    activeNavTabId?: string | number;
    isNextPressed?: boolean;
    onClick?: React.MouseEvent<HTMLElement>;
    layout?:string;
    style?:string;
    iconOnly?: boolean;
    id?: string;
}

const RdsNavtabs = (props: RdsNavtabsProps) => {
    const [activeNavTabId, setActiveNavTabId] = useState(props.activeNavTabId);
    const [navStyle, setNavStyle] = useState<string | undefined>(props.style);


    // const [activeTabKey, setActiveTabKey] = useState(
    //   props.navtabsItems?.[0]?.id || null
    // );
    useEffect(() => {
        if (props.layout === 'Vertical') {
            setNavStyle('Vertical -Alt Right Line');
        } else if (props.layout === 'Horizontal') {
            setNavStyle('Bottom Select');
        }
    }, [props.layout]);

    useEffect(() => {
        props.activeNavtabOrder && props.activeNavtabOrder(activeNavTabId);
    }, [activeNavTabId]);


    useEffect(() => {
        setActiveNavTabId(props.activeNavTabId);
    }, [props.activeNavTabId]);

    if (!props.navtabsItems || props.navtabsItems.length === 0) {
        return null;
    }
    return (
      <div>
       <ul
  className={
    `nav fit-content mobile-ul-tabs d-flex navtabs-icon-align nav-tabs ${props.id == "chat"? "":"d-md-block "}` +
    (props.layout === "horizontal"
      ? " col-12 d-flex d-lg-block d-xl-block d-xxl-block d-md-block"
              : props.style === "Top Select"
              ? " top-select"
              : props.style === "Bottom Select"
              ? " bottom-select"
              : props.style === "Bottom Select Alt"
              ? " bottom-select-alt"
              : props.style === "Top Select Alt"
              ? " top-select-alt"
              : props.style === "Background Filled"
              ? " background-filled"
              : props.style === "Pill"
              ? " nav-pills"
              : props.style === "Select Tabs"
              ? " select-tabs"
              
              : props.type === "tabs"
              ? " text-primary"
      : props.style === "pills"
      ? " nav-pills"
      : props.style === "tabs"
      ? " flex-lg-row flex-md-row flex-xl-row flex-xxl-row justify-content-start nav-tabs pb-0 pb-lg-0 pb-md-0 pb-xl-0 pb-xxl-0"
      : " nav-tabs") + 
      (props.layout === "vertical"
        ? " col-12 d-block"
                
                : props.style === "Vertical -Alt Right Line"
                ? " vertical-alt-right-line"
                : props.style === "Vertical -Alt Left Line"
                ? " vertical-alt-left-line"
                : props.style === "Vertical -Left Line"
                ? " vertical-left-line"
                : props.style === "Vertical -Right Line"
                ? " vertical-right-line"
                : props.style === "Vertical -Left Filled"
                ? " vertical-leftFilled"
                : props.style === "Vertical -Pointer"
                ? " vertical-pointer"
                : props.style === "Vertical -Flap"
                ? " vertical-flap"
                : props.type === "tabs"
                ? " text-primary"
        : props.style === "pills"
        ? " nav-pills"
        : props.style === "tabs"
        ? " flex-lg-row flex-md-row flex-xl-row flex-xxl-row justify-content-start nav-tabs pb-0 pb-lg-0 pb-md-0 pb-xl-0 pb-xxl-0"
        : " nav-tabs")
      +
    (props.fill ? " nav-fill" : "") +
    (props.justified ? " nav-justified" : "")+
    (props.iconOnly ? " nav-icon-only" : "")
  }
  id={props.id == "features" ? "features" :""}
>
  {props.navtabsItems.map((navtabsItem) => (
    <li
      className="nav-item py-0 cursor-pointer"
      key={navtabsItem.id}
    >
      <a
        className={
          "nav-link pe-auto mt-2" +
          (props.type === "tabs"
            ? " rounded-0"
            : props.layout === "Vertical"
            ? " rounded-2"
            : "") +
          (navtabsItem.id === activeNavTabId
            ? props.style === "Top Select"
              ? " selected"
              : props.style === "Bottom Select"
              ? " selected"
              : props.style === "Bottom Select Alt"
              ? " selected"
              : props.style === "Top Select Alt"
              ? " selected"
              : props.style === "Background Filled"
              ? " selected"
              : props.style === "Pill"
              ? " selected"
              : props.style === "Select Tabs"
              ? " selected"
              : props.style === "Vertical -Alt Right Line"
              ? " selected"
              : props.style === "Vertical -Alt Left Line"
              ? " selected"
              : props.style === "Vertical -Left Line"
              ? " selected"
              : props.style === "Vertical -Right Line"
              ? " selected"
              : props.style === "Vertical -Left Filled"
              ? " selected"
              : props.style === "Vertical -Pointer"
              ? " selected"
              : props.style === "Vertical -Flap"
              ? " selected"
              : props.type === "tabs"
              ? " border-bottom border-primary border-3 text-primary"
              : " active"
            : " inactive") +
          (navtabsItem.disabled
            ? " disabled"
            : props.layout === "Vertical"
            ? " " // Primary color for vertical layout
            : " ") // Black color for horizontal layout
        }
        aria-current="page"
        data-bs-target={navtabsItem.tablink}
        aria-controls={navtabsItem.ariacontrols}
        onClick={() => setActiveNavTabId(navtabsItem.id)}
      >
        {navtabsItem.icon && (
          <span>
            <RdsIcon
              name={navtabsItem.icon}
              height="20px"
              width="20px"
              stroke={true}
            />
          </span>
        )}
        {!props.iconOnly && (
    <span className="fw-medium px-3">{navtabsItem.label}</span>
)}
{navtabsItem.count && navtabsItem.count > 0 && (
    <span>
        <RdsBadge
            shape="pill"
            colorVariant={navtabsItem.colorVariant || "default"} // Fallback colorVariant
            label={navtabsItem.count.toString()} // Ensure label is a string
            size="small"
            className=""
        />
    </span>
)}
      </a>
    </li>
  ))}
</ul>


        {props.children}
      </div>
    );
};

export default RdsNavtabs;