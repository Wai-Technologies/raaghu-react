import React, { ReactNode, useState } from "react";
import "./rds-accordion.css";
export interface RdsAccordionProps {
  accordionType: string;
  children?: ReactNode;
  accordionId?: string;
  onclick?: (event: React.MouseEvent<HTMLInputElement>) => void;
}




const RdsAccordion = (props: RdsAccordionProps) => {
    return (
        <div id={`accordion${props.accordionId}`}>
            <div
                className={`accordion accordion-${
                    props.accordionType === "flush" ? "flush" : ""
                }`}
                id="accordionBasic"
            >
                {props.children}
            </div>
        </div>
    );
};

export default RdsAccordion;
