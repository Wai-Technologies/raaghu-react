import React, { useEffect, useState } from "react";
import "./rds-radio-button.css";
import { useTranslation } from "react-i18next";

export interface RdsRadioButtonProps {
  switch?: boolean;
  inline?: boolean;
  isInputGroup?: boolean;
  onClick?: React.MouseEventHandler<HTMLInputElement>;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => any;
  itemList: any;
  displayType?: string;
  label?: string;
  id?: number;
  dataTestId?: string;
  state?: "radio" | "errorRadio";
  errorMessage?: string;
  onlyChecked?: boolean;
  checkedId?: string;
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
  const Inline1 = `${Inline === true || display_type == "Horizontal" ? "form-check-inline" : ""
    } `;
  const state = props.state || "radio"; //form-check-input-error
  const radioButtonClass = props.displayType === "Horizontal" ? "d-flex" : "";
  const handlerRadioChange =(e:any) =>{
    props.onChange&&props.onChange(e);
  }
  return (
    <>
      <div key={props.id}>
        <div>
          {state == "errorRadio" && (
            <span className="error_Msg"> {props.errorMessage}</span>
          )}
          <div className={radioButtonClass}>
            {list?.map((item: any, idx: any) => (
              <div
                key={idx}
                className={
                  "form-check mb-2" + `${InputGroup1}` + `${Switch1}` + `${Inline1}`
                }
              >
                {props.onlyChecked ?
                  <input
                    type="radio"
                    className={`${state == "errorRadio" ? "form-check-input-error" : "form-check-input"}`}
                    name={item.name}
                    value={item.label}
                    checked={item.checked}
                    id={item.id}
                    disabled={item.disabled}
                    onClick={props.onClick}
                    onChange={handlerRadioChange}
                    data-testid={props.dataTestId}
                  /> : props.checkedId ? <input
                    type="radio"
                    className={`${state == "errorRadio"
                      ? "form-check-input-error"
                      : "form-check-input"
                      }`}
                    name={item.name}
                    value={item.label}
                    defaultChecked={item.checked}
                    id={item.id}
                    disabled={item.disabled}
                    onClick={props.onClick}
                    onChange={handlerRadioChange}
                    data-testid={props.dataTestId}
                    checked={item.id == props.checkedId}
                  /> :

                    <input
                      type="radio"
                      className={`${state == "errorRadio" ? "form-check-input-error" : "form-check-input"}`}
                      name={item.name}
                      value={item.label}
                      checked={item.checked}
                      id={item.id}
                      disabled={item.disabled}
                      onClick={props.onClick}
                      onChange={handlerRadioChange}
                      data-testid={props.dataTestId}
                    />}
                <label htmlFor={item.id} className="form-check-label ms-2">

                  {t(item.label)}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default RdsRadioButton;
