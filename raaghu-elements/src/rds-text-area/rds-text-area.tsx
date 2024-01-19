import React, { useEffect, useState } from "react";
import "./rds-text-area.css";
import Tooltip from "../rds-tooltip/rds-tooltip";
import { placements } from "../../libs";
import { useTranslation } from "react-i18next";

export interface RdsTextAreaProps {
  rows?: number;
  readonly?: boolean;
  label?: string;
  placeholder: string;
  value?: any;
  isDisabled?: boolean;
  isRequired?: boolean;
  id?: string;
  required?: boolean;
  dataTestId?: string;
  isFloatingInputLabel?: boolean;
  tooltip?: boolean;
  tooltipPlacement?: placements;
  tooltipTitle?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  labelPosition?: string;
  onClick?: (event: React.MouseEvent<HTMLTextAreaElement>) => void;
  reset?: boolean;
  onKeyDown?: any;
  validatonPattern?: RegExp;
  validationMsg?: string;
  isMultiUrl?: boolean;
}

const RdsTextArea = (props: RdsTextAreaProps) => {
  const { t } = useTranslation();
  const [hasError, setHasError] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [isValid, setIsValid] = useState<boolean>(true);

  useEffect(() => {
    setIsTouch(false);
  }, [props?.reset]);

  const handlerChange = (e: any) => {
    const inputValue = e.target.value;
    setIsTouch(true);

    if (e.target.value) {
      setHasError(true);
    }
    if (props.validatonPattern !== undefined) {
      const urlPattern = props.validatonPattern;
      let urlValid;
      if (props.isMultiUrl) {
        const lines = inputValue.split("\n");
        urlValid = lines.every((url: string) => urlPattern.test(url));
      } else {
        urlValid = urlPattern.test(inputValue);
      }
      setIsValid(urlValid);
    }
    props.onChange && props.onChange(e);
  };
  const getClassNames = () => {
    let defaultClasses: string = "mb-0";
    if (props.isFloatingInputLabel === true) {
      defaultClasses = "form-floating";
    }
    return defaultClasses;
  };

  const labelPosition = props.labelPosition || "top";

  return (
    <>
      {props.tooltip ? (
        <div className="row vh-100">
          <div className="align-items-center col-md-12 d-flex justify-content-center">
            <Tooltip text={props.tooltipTitle} place={props.tooltipPlacement}>
              <div>
                {labelPosition === "top" && (
                  <label
                    className={` form-label ${
                      props.isDisabled ? " opacity-50 " : ""
                    } `}
                  >
                    {props.label}
                    {props.required && (
                      <span className="text-danger fs-6"> *</span>
                    )}
                  </label>
                )}
                <div className={getClassNames()}>
                  <textarea
                    className="form-control"
                    disabled={props.isDisabled}
                    rows={props.rows}
                    readOnly={props.readonly}
                    placeholder={props.placeholder}
                    onClick={props.onClick}
                    onKeyDown={props.onKeyDown}
                    id={props.id}
                    required={props.required}
                    value={props.value}
                    onChange={handlerChange}
                  ></textarea>
                  {props.isFloatingInputLabel && props.label && (
                    <>
                      {props.label && (
                        <label
                          htmlFor={props.id}
                          className={` form-label ${
                            props.isDisabled ? " opacity-50 " : ""
                          } `}
                        >
                          {props.label}
                        </label>
                      )}

                      {props.required && (
                        <span className="text-danger ms-1">*</span>
                      )}
                    </>
                  )}
                </div>
                {labelPosition === "bottom" && (
                  <label className="form-label mt-1">
                    {props.label}
                    {props.required && (
                      <span className="text-danger fs-6"> *</span>
                    )}
                  </label>
                )}
              </div>
            </Tooltip>
          </div>
        </div>
      ) : (
        <div>
          {labelPosition === "top" && (
            <label
              className={` form-label ${
                props.isDisabled ? " opacity-50 " : ""
              } `}
            >
              {props.label}
              {props.required && <span className="text-danger fs-6"> *</span>}
            </label>
          )}
          <div className={getClassNames()}>
            <textarea
              className="form-control"
              disabled={props.isDisabled}
              rows={props.rows}
              readOnly={props.readonly}
              placeholder={props.placeholder}
              onClick={props.onClick}
              onKeyDown={props.onKeyDown}
              id={props.id}
              required={props.required}
              value={props.value}
              onChange={handlerChange}
            ></textarea>
            {props.isFloatingInputLabel && props.label && (
              <>
                {props.label && (
                  <label
                    htmlFor={props.id}
                    className={` form-label ${
                      props.isDisabled ? " opacity-50 " : ""
                    } `}
                  >
                    {props.label}
                  </label>
                )}

                {props.required && <span className="text-danger ms-1">*</span>}
              </>
            )}
          </div>
          {labelPosition === "bottom" && (
            <label className="form-label mt-1">
              {props.label}
              {props.required && <span className="text-danger fs-6"> *</span>}
            </label>
          )}
        </div>
      )}
      {props.required && (
        <div className="form-control-feedback">
          {props.required && props.value == "" && hasError && isTouch && (
            <span className="text-danger">
              {props.label} {t("is required") || ""}{" "}
            </span>
          )}
        </div>
      )}

      {props.validatonPattern !== undefined && (
        <div className="form-control-feedback">
          {props.validatonPattern !== undefined &&
            props.validationMsg !== undefined &&
            isTouch &&
            isValid == false && (
              <span className="text-danger">{props.validationMsg} </span>
            )}
        </div>
      )}
    </>
  );
};

export default RdsTextArea;
