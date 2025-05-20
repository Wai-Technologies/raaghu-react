import React, { useEffect, useState } from "react";
import "./rds-radio-button.css";
import { useTranslation } from "react-i18next";

export enum RdsRadioButtonState {
  Default = "Default",
  Hover = "Hover",
  Disabled = "Disabled",
}

export enum RdsRadioButtonLayout {
  Icon = "Icon",
  IconWithLabel = "Icon with Label",
  IconWithBottomLabel = "Icon with bottom Label",
}
export interface RdsRadioButtonProps {
  switch?: boolean;
  inline?: boolean;
  isInputGroup?: boolean;
  onClick?: React.MouseEventHandler<HTMLInputElement>;
  onChange?: (value: any) => void;
  itemList: any[] | undefined;
  value: string; 
  displayType?: string;
  label?: string;
  id?: number;
  dataTestId?: string;
  state?: RdsRadioButtonState;
  errorMessage?: string;
  onlyChecked?: boolean;
  checkedId?: string;
  customClass?: string;
  layout?: RdsRadioButtonLayout;
  selected?: boolean;
  text?: string;
}


const RdsRadioButton = (props: RdsRadioButtonProps) => {
  const { t } = useTranslation();
  const [list, setlist] = useState(props.itemList);
 
  let InputGroup = props.isInputGroup || false;
  let Switch = props.switch || false;
  let Inline = props.inline || false;

  useEffect(() => {
    setlist(props.itemList)
  }, [props.itemList])

  const display_type = props.displayType || "Default";

  const InputGroup1 = `${InputGroup === true ? "input-group-text" : ""} `;
  const Switch1 = `${Switch === true ? "form-switch" : ""} `;
  // const Inline1 = `${Inline === true || display_type == "Horizontal" ? "form-check-inline" : ""
  //   } `;
  // const state = props.state || "radio"; //form-check-input-error
  const Inline1 = `${Inline === true || display_type == "Horizontal" ? "form-check-inline" : ""} `;
  const stateClass = props.state === "Hover" ? "hover-state" : props.state === "Disabled" ? "disabled-state" : "";
  const radioButtonClass = props.displayType === "Horizontal" ? "d-flex" : "";
  const handlerRadioChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
  e.persist(); // This will remove the event from the pool
  const selectedPaymentMethod = e.currentTarget.value;
  // Now you can safely use selectedPaymentMethod asynchronously
  props.onChange && props.onChange(selectedPaymentMethod);
}
const renderLabel = (item: any) => {
  const label = props.text || t(item.label); // Use the text prop if provided
  switch (props.layout) {
    case "Icon":
      return <i className={item.iconClass}></i>;
    case "Icon with Label":
      return (
        <>
          <i className={item.iconClass}></i>
          <span>{label}</span>
        </>
      );
    case "Icon with bottom Label":
      return (
        <div className="d-flex flex-column align-items-start">
          <i className={item.iconClass}></i>
          <div>{label}</div>
        </div>
      );
    default:
      return label;
  }
};

return (
  <>
    <div key={props.id}>
      <div>
        <div className={`${radioButtonClass} ${stateClass}`}>
          {list?.map((item: any, idx: any) => (
            <div
              key={idx}
              className={
                "form-check mb-2" + `${InputGroup1}` + `${Switch1}` + `${Inline1}`
              }
            >
              {props.layout === "Icon with bottom Label" ? (
                <div className="d-flex flex-column align-items-start">
                  <div className="icon-with-bottom-label ">
                  <input
                    type="radio"
                    className="form-check-input radio-toggle-switch" 
                    //className={`${state == "errorRadio" ? "form-check-input-error" : "form-check-input"}`}
                    name={item.name}
                    value={item.label}
                    {...(props.selected ? { checked: true } : {})}
                    //checked={props.selected ? true : false}
                    id={item.id}
                    disabled={props.state === "Disabled" || item.disabled}
                    onClick={props.onClick}
                    onChange={handlerRadioChange}
                    data-testid={props.dataTestId}
                  />
                  </div>  
                  <label htmlFor={item.id} className="form-check-label mt-2">
                    {renderLabel(item)}
                  </label>
                </div>
              ) : (
                <>
                  <input
                    type="radio"
                    className="form-check-input radio-toggle-switch" 
                    //className={`${state == "errorRadio" ? "form-check-input-error" : "form-check-input"}`}
                    name={item.name}
                    value={item.label}
                    //checked={props.selected ? true : false}
                    {...(props.selected ? { checked: true } : {})}
                    id={item.id}
                    disabled={props.state === "Disabled" || item.disabled}
                    onClick={props.onClick}
                    onChange={handlerRadioChange}
                    data-testid={props.dataTestId}
                  />
                  <label htmlFor={item.id} className="form-check-label">
                    {renderLabel(item)}
                  </label>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  </>
);
};

export default RdsRadioButton;
