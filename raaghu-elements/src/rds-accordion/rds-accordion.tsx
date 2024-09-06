import React, { useState, useEffect, ReactNode } from "react";
import "./rds-accordion.css";

export interface AccordionItem {
    id: string;
    title: string;
    content: ReactNode;
    defaultOpen?: boolean;
}

export interface RdsAccordionProps {
    accordionType: 'single' | 'multiple';
    accordionId?: string;
    items: AccordionItem[];
    onclick?: (event: React.MouseEvent<HTMLInputElement>) => void;
}

const RdsAccordion = (props: RdsAccordionProps) => {
    const [openItemIds, setOpenItemIds] = useState<string[]>([]);

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
    };

    return (
        <div id={`accordion${props.accordionId}`}>
            <div className="accordion" id="accordionBasic">
                {props.items.map((item) => {
                    const isOpen = openItemIds.includes(item.id);
                    return (
                        <div className="accordion-item" key={item.id}>
                            <h2 className="accordion-header" id={`heading${item.id}`}>
                                <button
                                    className={`accordion-button ${isOpen ? '' : 'collapsed'}`}
                                    type="button"
                                    aria-expanded={isOpen}
                                    aria-controls={`collapse${item.id}`}
                                    onClick={() => toggleOpen(item.id)}
                                >
                                    {item.title}
                                </button>
                            </h2>
                            <div
                                id={`collapse${item.id}`}
                                className={`accordion-collapse collapse ${isOpen ? 'show' : ''}`}
                                aria-labelledby={`heading${item.id}`}
                                data-bs-parent={props.accordionType === 'single' ? `#accordion${props.accordionId}` : undefined}
                            >
                                <div className="accordion-body">{item.content}</div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default RdsAccordion;