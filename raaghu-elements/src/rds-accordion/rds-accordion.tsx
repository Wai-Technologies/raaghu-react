import React, { useState, useEffect, ReactNode, useRef } from "react";
import "./rds-accordion.css";
import RdsIcon from "../rds-icon";

export interface AccordionItem {
    id: string;
    title: string;
    accordionContent: ReactNode;
    defaultOpen?: boolean;
}

export enum AccordionSize {
    small = "small",
    medium = "medium",
    large = "large"
}

export enum AccordionBorder {
    border = "border",
    bottomline = "bottomline",
    borderhide = "borderhide"
}

export enum AccordionType {
    single = "single",
    multiple = "multiple"
}

export enum AccordionLayout {
    default = "default",
    expanded = "expanded"
}

export enum AccordionState {
    default = "default",
    hover = "hover",
    selected = "selected"
}

export interface RdsAccordionProps {
    withIcon?: boolean;
    icon?: string;
    iconFill?: boolean;
    iconStroke?: boolean;
    iconHeight?: string;
    iconWidth?: string;
    size?: AccordionSize;
    style?: AccordionBorder;
    accordionType?: AccordionType;
    layout?: AccordionLayout; // NEW: Layout Prop
    accordionId?: string;
    items: AccordionItem[];
    //defaultopen?: boolean;
    state?: AccordionState;
    onclick?: (event: React.MouseEvent<HTMLInputElement>) => void;
}

const classes = (props: RdsAccordionProps) => {
    let classes: string = '';

    if (props.size) {
        const size = 'accordion-' + `${props.size === 'small' ? 'sm' : props.size === 'large' ? 'lg' : 'md'}`;
        classes = ' ' + size;
    }
    if (props.style) {
        const borderClass = `accordion-${props.style}`;
        classes += ' ' + borderClass;
    }

    return classes;
}

const RdsAccordion = (props: RdsAccordionProps) => {
    const [openItemIds, setOpenItemIds] = useState<string[]>([]);
    const [collapsedItemId, setCollapsedItemId] = useState<string | null>(null);
    const accordionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const defaultOpenItems = props.items
            .filter(item => item.defaultOpen)
            .map(item => item.id);
        setOpenItemIds(defaultOpenItems);
    }, [props.items]);

    useEffect(() => {
        if (props.layout === "expanded") {
            setOpenItemIds(props.items.map(item => item.id)); // Open all sections
        } else {
            setOpenItemIds([]); // Close all sections
        }
    }, [props.layout, props.items]);

    const toggleOpen = (id: string) => {
        if (props.accordionType === 'single') {
            setOpenItemIds(openItemIds.includes(id) ? [] : [id]);
        } else {
            setOpenItemIds(openItemIds.includes(id)
                ? openItemIds.filter(openId => openId !== id)
                : [...openItemIds, id]);
        }

        if (openItemIds.includes(id)) {
            setCollapsedItemId(id);
        } else {
            setCollapsedItemId(null);
        }
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (accordionRef.current && !accordionRef.current.contains(event.target as Node)) {
            setCollapsedItemId(null);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const iconClasses = () => {
        let iconSpan: string = '';
        if (props.icon) {
            const iconClass = 'accordion-icon';
            iconSpan = iconClass;
        }

        return iconSpan;
    }

    useEffect(() => {
        props.items.forEach(item => {
            const element = document.getElementById(`heading${item.id}`);
            if (element) {
                if (openItemIds.includes(item.id)) {
                    element.classList.add(props.state==="selected" ? 'accordion-selected' : 'default');
                } else {
                    element.classList.remove(props.state==="selected" ? 'accordion-selected' : 'default');
                }
            }
        });
    }, [openItemIds, props.items]);

    const handleMouseEnter = (id: string) => {
        if (props.state === "hover" || props.style === "borderhide") {
            const headerElement = document.getElementById(`heading${id}`);
            const bodyElement = document.getElementById(`collapse${id}`);
            const itemElement = document.getElementById(`item${id}`);
    
            if (headerElement && bodyElement && itemElement) {
                headerElement.classList.add("hover-content-wrapper");
                bodyElement.classList.add("hover-content-wrapper");
                itemElement.classList.add("hover-content-wrapper");
            }
        }
    };

    const handleMouseLeave = (id: string) => {
        if (props.state === "hover" || props.style === "borderhide") {
            const headerElement = document.getElementById(`heading${id}`);
            const bodyElement = document.getElementById(`collapse${id}`);
            const itemElement = document.getElementById(`item${id}`);
    
            if (headerElement && bodyElement && itemElement) {
                headerElement.classList.remove("hover-content-wrapper");
                bodyElement.classList.remove("hover-content-wrapper");
                itemElement.classList.remove("hover-content-wrapper");
            }
        }
    }

    return (
        <div id={`accordion${props.accordionId}`} ref={accordionRef}>
            <div className="accordion" id="accordionBasic">
                {props.items.map((item) => {
                    const isOpen = openItemIds.includes(item.id);
                    const isCollapsed = collapsedItemId === item.id;
                    const stateClass = props.state === "hover" ? "accordion-hover" : props.state === "selected" ? "accordion-selected" : "";

                    return (
                        <div
                            id={`item${item.id}`} className={`accordion-item ${classes(props)} ${isCollapsed ? 'collapsed' : ''} ${stateClass}`}
                            key={item.id}
                            onMouseEnter={() => handleMouseEnter(item.id)}
                            onMouseLeave={() => handleMouseLeave(item.id)}
                        >
                            <h2 className="accordion-header" id={`heading${item.id}`}>
                                <button
                                    className={`accordion-button ${isOpen ? "" : "collapsed"} ${props.style === "borderhide" && props.state === "hover" ? "hover-content-wrapper" : ""} ${props.state === "selected" ? "accordion-selected" : ""}`}
                                    type="button"
                                    aria-expanded={isOpen}
                                    aria-controls={`collapse${item.id}`}
                                    onClick={() => toggleOpen(item.id)}
                                    onMouseEnter={() => handleMouseEnter(item.id)}
                                    onMouseLeave={() => handleMouseLeave(item.id)}
                                >
                                    {props.icon && (
                                        <span className={iconClasses()}>
                                            <RdsIcon
                                                name={props.icon}
                                                fill={props.iconFill}
                                                stroke={props.iconStroke} />
                                        </span>
                                    )}
                                    {item.title}
                                </button>
                            </h2>
                            <div
                                id={`collapse${item.id}`}
                                className={`accordion-collapse collapse ${isOpen ? 'show' : ''} ${props.style === "borderhide" && props.state === "hover" ? "hover-content-wrapper" : ""}`}
                                aria-labelledby={`heading${item.id}`}
                                data-bs-parent={props.accordionType === 'single' ? `#accordion${props.accordionId}` : undefined}
                                onMouseEnter={() => handleMouseEnter(item.id)}
                                onMouseLeave={() => handleMouseLeave(item.id)}
                            >
                                <div className="accordion-body"><div className="accordion-content">{item.accordionContent}</div></div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default RdsAccordion;