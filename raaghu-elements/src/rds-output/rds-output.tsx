import React, { useState } from "react";
import RdsIcon from "../rds-icon";
import "./rds-output.css";

export interface RdsOutPutProps {
  setPreview?: (isSelected: any) => void;
  buttonInfo?: { id: number; text: string }[];
}

const RdsOutput = (props: RdsOutPutProps) => {
  // Initialize state with the first button as active
  const [isSelected, setIsSelected] = useState(props.buttonInfo?.[0] || null);

  const handleToggle = (button: any) => {
    setIsSelected(button);
    props.setPreview?.(button);
  };

  return (
    <div className="planToggle">
      {props.buttonInfo?.map((button) => (
        <div
          key={button.id}
          onClick={() => handleToggle(button)}
          className={`equalWidth ${isSelected?.id === button.id ? "activeButton" : ""}`}
        >
          <span>
            <RdsIcon
              name={
                button.text === "Preview"
                  ? isSelected?.id === button.id
                    ? "eye_new"
                    : "eye"
                  : isSelected?.id === button.id
                  ? "code_new"
                  : "code"
              }
              height="18px"
              width="18px"
              strokeWidth={isSelected?.id === button.id ? "0px" : "1px"}
            />
          </span>
          <span>{button.text}</span>
        </div>
      ))}
    </div>
  );
};

export default RdsOutput;
