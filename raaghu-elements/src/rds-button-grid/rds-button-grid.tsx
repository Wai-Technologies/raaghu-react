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
            return "50px"; // Width for numeric text
        } else if (isAlphabetic) {
            return "100px"; // Width for alphabetic text
        } else {
            return "150px"; // Default width for other text
        }
    };

    return ( 
        <div className="button-grid">
            {Array.from({ length: props.rows }).map((_, rowIndex) => (
                <div key={rowIndex} className="button-row"      >
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
            ))}
        </div>
    );
};

export default RdsButtonGrid;