import React, { useState, useEffect, ReactNode, useRef } from "react";
import "./rds-accordion.css";
import RdsIcon from "../rds-icon";

export interface AccordionItem {
    id: string;
    title: string;
    accordionContent: ReactNode;
    defaultOpen?: boolean;
    
}

export interface RdsAccordionProps {
    icon?: string;
    iconFill?: boolean;
    iconStroke?: boolean;
    iconHeight?: string;
    iconWidth?: string;
    size?: "small" | "medium" | "large";
    border?: "border" | "bottomline" | "borderhide";
    accordionType?: 'single' | 'multiple';
    accordionId?: string;
    items: AccordionItem[];
    
    onclick?: (event: React.MouseEvent<HTMLInputElement>) => void;
}

const classes = (props: RdsAccordionProps) => {
    let classes: string = '';

    if (props.size) {
        const size = 'accordion-' + `${props.size === 'small' ? 'sm' : props.size === 'large' ? 'lg' : 'md'}`;
        classes = ' ' + size;
    }
    if (props.border) {
        const borderClass = `accordion-${props.border}`;
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
        openItemIds.forEach(id => {
            const element = document.getElementById(`heading${id}`);
            if (element) {
                element.classList.add('accordion-active-bg');
            }
        });

        return () => {
            openItemIds.forEach(id => {
                const element = document.getElementById(`heading${id}`);
                if (element) {
                    element.classList.remove('accordion-active-bg');
                }
            });
        };
    }, [openItemIds]);

    return (
        <div id={`accordion${props.accordionId}`} ref={accordionRef}>
            <div className="accordion" id="accordionBasic">
                {props.items.map((item) => {
                    const isOpen = openItemIds.includes(item.id);
                    const isCollapsed = collapsedItemId === item.id;
                    return (
                        <div className={`accordion-item ${classes(props)} ${isCollapsed ? 'collapsed' : ''}`} key={item.id}>
                            <h2 className="accordion-header" id={`heading${item.id}`}>
                                <button
                                    className={`accordion-button ${isOpen ? "" : "collapsed"}`}
                                    type="button"
                                    aria-expanded={isOpen}
                                    aria-controls={`collapse${item.id}`}
                                    onClick={() => toggleOpen(item.id)}
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
                                className={`accordion-collapse collapse ${isOpen ? 'show' : ''}`}
                                aria-labelledby={`heading${item.id}`}
                                data-bs-parent={props.accordionType === 'single' ? `#accordion${props.accordionId}` : undefined}
                            >
                                <div className="accordion-body">{item.accordionContent}</div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default RdsAccordion;