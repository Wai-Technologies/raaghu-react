import React from "react";
import "./rds-button-grid.css";

export interface ButtonInput {
        id: string;
        text: string;
        colorVariant?: string;
    }

interface RdsButtonGridProps {
        rows: number;
        columns: number;
        colorVariant?: string;
        buttonInputs:any;
}

const RdsButtonGrid = (props: RdsButtonGridProps) => {

    const btnColorVariant = "btn fw-bold  mx-1 my-1 text-" + (props.colorVariant ? props.colorVariant : "white ");

    const getButtonWidth = (text: string) => {
        const isNumeric = /^[0-9]+$/.test(text);
        const isAlphabetic = /^[a-zA-Z]+$/.test(text);
        if (isNumeric) {
            return "rds-btn-md"; // Custom class for small button size
        } else if (isAlphabetic) {
            return "rds-btn-md"; // Custom class for medium button size
        } else {
            return "rds-btn-lg"; // Custom class for large button size
        }
    };

    return ( 
        <div className="button-grid">
            {Array.from({ length: props.rows }).map((_, rowIndex) => (
                <div key={rowIndex} className="button-row">
                    <div className="d-flex">
                    {Array.from({ length: props.columns }).map((_, colIndex) => {
                        const buttonInput = props.buttonInputs[rowIndex * props.columns + colIndex];
                        return buttonInput ? (
                            <button
                                title={buttonInput.text}
                                key={colIndex}
                                className={` ${btnColorVariant} ${buttonInput.colorVariant ? " btn-" + buttonInput.colorVariant : ""} `}
                                style={{ width: getButtonWidth(buttonInput.text) }}
                            >
                                {buttonInput.text}
                            </button>
                        ) : null;
                    })}
                </div>
                </div>
            ))}
        </div>
    );
};

export default RdsButtonGrid;