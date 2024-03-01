import React from "react";
import "./rds-accordion.css";


export interface RdsAccordionItemProps {
  title: string;
  children: React.ReactNode;
  id: any;
  AlwaysOpen?: boolean;
  defaultOpen?: boolean;
}

const RdsAccordionItem = (props: RdsAccordionItemProps) => {
    return (
        <>
            <div title={props.title}>
                <div className="accordion-item">
                    <h2 className="accordion-header" id={`heading${props.id}`}>
                        <button
                            type="button"
                            data-bs-toggle="collapse"
                            className={`accordion-button ${
                                props.defaultOpen ? "" : "collapsed"
                            }`}
                            data-bs-target={`#collapse${props.id}`}
                            aria-expanded={`${props.defaultOpen ? "true" : "false"}`}
                            aria-controls={`collapse${props.id}`}
                        >
                            {props.title}
                        </button>
                    </h2>
                    <div
                        className={`accordion-collapse collapse ${
                            props.defaultOpen ? "show" : ""
                        }`}
                        id={`collapse${props.id}`}
                        data-bs-parent={`${props.AlwaysOpen ? "" : "#accordionBasic"}`}
                        aria-labelledby={`heading${props.id}`}
                    >
                        <div className="accordion-body">{props.children}</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RdsAccordionItem;
