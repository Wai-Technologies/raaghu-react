import React, { useState } from "react";
import RdsIcon from "../rds-icon";
import "./rds-output.css";

export interface RdsOutPutProps {
  setPreview?: (isSelected: any) => void;
  // button1Text: string;
  // button2Text: string;
  buttonInfo?: any [] ;
}

const RdsOutput = (props: RdsOutPutProps) => {

  const [isSelected, setIsSelected] = useState();
  const [isPreview, setIsPreview] = useState(true);
  const [isBorder , setIsBorder] = useState(false);

  const handleToggle = (value: any) => {
    debugger
    setIsSelected(value);
    if(value.text === "Preview"){
      setIsPreview(true);
      setIsBorder(false);
    }
    if (props.setPreview) {
      props.setPreview(value);
    }
  };

  return (
    <div className="planToggle">
       {props.buttonInfo?.map((button: any) => (

      <div onClick={() => handleToggle(button)} className={`equalWidth ${isPreview  ? "activeButton" : ""}`}>
        <span>
          <RdsIcon name={button.text === "Preview" ? "eye_new" : "eye"} height="18px" width="18px" strokeWidth={button.text === "Preview" ? "0px" : "1px"} />
        </span>
         <span key={button.id}>{button.text}</span>
      </div>
        ))}


      {/* <div  onClick={() => handleToggle(false)} className={`equalWidth ${!isPreview ? "activeButton" : ""}`}>
        <span>
          <RdsIcon name={!isPreview ? "code_new" : "code"} height="18px" width="18px" strokeWidth={!isPreview ? "0px" : "1px"} />
        </span>
        <span>{button2Text}</span>
      </div> */}
    </div>
  );
};

export default RdsOutput;
