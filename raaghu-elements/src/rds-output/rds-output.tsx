import React, { useState } from "react";
import RdsIcon from "../rds-icon";
import "./rds-output.css";

// Define enum for button types
export enum RdsOutputButtonType {
  Preview = "Preview",
  Code = "Code",
}

export interface RdsOutputProps {
  setPreview?: (isSelected: any) => void;
  buttonInfo?: { id: number; text: RdsOutputButtonType }[];
}

const RdsOutput = (props: RdsOutputProps) => {
  // Initialize state with the first button as active
  const [isSelected, setIsSelected] = useState(props.buttonInfo?.[0] || null);

  const handleToggle = (button: { id: number; text: RdsOutputButtonType }) => {
    setIsSelected(button);
    props.setPreview?.(button);
  };

  return (
    <div className="planToggleOutPut">
      {props.buttonInfo?.map((button) => (
        <div
          key={button.id}
          onClick={() => handleToggle(button)}
          className={`equalWidthOutPut ${isSelected?.id === button.id ? "activeButton" : ""}`}
        >
          <span>
            <RdsIcon
              name={
                button.text === RdsOutputButtonType.Preview
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
