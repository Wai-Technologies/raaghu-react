import { useState, ReactNode } from "react";
import React from "react";
import "./rds-collapse.css";

export interface RdsCollapseProps {
    children?: ReactNode;
    buttonList: any[];
    horizontalCollapse?: boolean;
    multitoggle?: boolean;
}

const RdsCollapse = (props: RdsCollapseProps) => {
    const [display, setDisplay] = useState(false);

    function toggleDisplay() {
        setDisplay(!display);
    }

    return (
        <>
            <div className="me-3">
                <button
                    type="button"
                    className="btn btn-primary btn-sm ms-1"
                    onClick={toggleDisplay}
                >
                    Toggle Element
                </button>
                {display && (
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12 mt-2 ms-3 collapseContent p-3">
                            <div>
                                This is some placeholder content for a horizontal collapse. its
                                hidden by default and shown when triggered
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default RdsCollapse;
