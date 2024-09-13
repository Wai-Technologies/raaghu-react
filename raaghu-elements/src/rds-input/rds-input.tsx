import React, { useEffect, useState, useRef } from "react";
import "./rds-input.css";
import Tooltip from "../rds-tooltip/rds-tooltip";
import { placements } from "../../libs/types";
import RdsIcon from "../rds-icon";
import { fontWeight } from "../../libs";
import { useTranslation } from "react-i18next";

export interface RdsInputProps {
    size?: "small" | "large" | "medium" | string;
    isDisabled?: boolean;
    readonly?: boolean;
    value?: string;
    inputType?: string;
    validatonPattern?: RegExp;
    validationMsg?: string;
    placeholder?: string;
    autoFocus?: [boolean, number];
    singleDigit?: boolean;
    ref?: any;
    labelPosition?: string;
    tooltipPlacement?: placements;
    tooltipTitle?: string;
    name?: string;
    label?: string;
    id?: string;
    required?: boolean;
    dataTestId?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => any;
    onFocus?: (event: React.FocusEvent<HTMLInputElement>) => any;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => any;
    onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
    onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
    customClasses?: string;
    formName?: string;
    reset?: boolean;
    fontWeight?: fontWeight;
    minLength?: any;
    maxLength?: any;
    minValue?: any;
    maxValue?: any;
    showIcon?: boolean;
}

const RdsInput = React.forwardRef<HTMLInputElement, RdsInputProps>((props, ref) => {
    const { t } = useTranslation();
    const [value, setValue] = useState(props.value);
    const [errorRegardingLengthOrValue, setErrorRegardingLengthOrValue] = useState("")
    const [showPassword, setShowPassword] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [isTouch, setIsTouch] = useState(false);
    const [isValid, setIsValid] = useState<boolean>(true);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        setIsTouch(false);
    }, [props?.reset]);

    useEffect(() => {
        setValue(props.value ?? "");
    }, [props.value]);
    
    const handlerChange = (e: any) => {
        const inputValue = e.target.value;
        setIsTouch(true);
        props.onChange && props.onChange(e);
        if (e.target.value) {
            setHasError(false);
        } else {
            setHasError(true);
        }
        if (props.validatonPattern !== undefined && e.target.value) {
            const urlPattern = props.validatonPattern;
            setIsValid(urlPattern.test(inputValue));
        } else {
            setIsValid(true);
        }
        const valueLength = (e.target.value).length
        const value = (e.target.value)
        if (e.target.value) {
            if (valueLength < props.minLength) {
                setErrorRegardingLengthOrValue(`This field must be a string or array type with a minimum length of ${props.minLength}.`)
            } else {
                if (valueLength > props.maxLength) {
                    setErrorRegardingLengthOrValue(`This field must be a string or array type with a maximum length of ${props.maxLength}.`)
                } else {
                    setErrorRegardingLengthOrValue("")
                }
            }
            if (value < props.minValue) {
                setErrorRegardingLengthOrValue(`Value should be greater than ${props.minValue}`)
            } else {
                if (value > props.maxValue) {
                    setErrorRegardingLengthOrValue(`Value cannot be more than ${props.maxValue}`)
                } else {
                    setErrorRegardingLengthOrValue("")
                }
            }
        } else {
            setErrorRegardingLengthOrValue("")
        }
        if (props.inputType === "otp" && !/^\d*$/.test(e.target.value) && e.target.value !== "") {
            return;
        }
        setValue(e.target.value);

    };


    let size: "sm" | "lg" | undefined = undefined;

    if (props.size == "small") {
        size = "sm";
    } else if (props.size == "large") {
        size = "lg";
    }
    const inputClasses =
        "form-control rounded mt-1 form-control-" +
        size +
        " flex-grow-1 " +
        props.customClasses;

    const getClassNames = () => {
        let defaultClasses: string = "input-group mb-0";
        if (props.labelPosition == "floating") {
            defaultClasses = "form-floating";
        }
        return defaultClasses;
    };
    const labelClass = () => {

        let labelPositionClass: string = '';
        if (props.labelPosition === 'bottom') {
            labelPositionClass = ' d-flex flex-column-reverse';
        }
        if (props.labelPosition === 'left') {
            labelPositionClass = ' d-flex align-items-center gap-2';
        }
        if (props.labelPosition === 'right') {
            labelPositionClass = ' d-flex align-items-center gap-2 flex-row-reverse';
        }
        if (props.labelPosition === 'floating') {
            labelPositionClass = '';
        }
        return labelPositionClass;

    }
    const fontWeight = "fw-" + props.fontWeight

    return (
        <>
            {/* test  */}
            <div className={labelClass()}>
                <label htmlFor={props.id} className={`text-capitalize form-label ${fontWeight}`} >
                    {props.label}
                    {(props.required || props.validatonPattern) && <span className="text-danger ms-1">*</span>}
                </label>
                {!props.tooltipTitle && (
                    <div className={getClassNames()}>
                        <input
                            type={
                                props.inputType == "password"
                                    ? showPassword
                                        ? "text"
                                        : "password"
                                    : props.inputType === "otp"
                                        ? "tel"
                                        : props.inputType
                            }
                            maxLength={props.inputType === "otp" && props.singleDigit ? 1 : undefined}
                            className={`${inputClasses}`}
                            id={props.id}
                            placeholder={props.placeholder}
                            form={props.formName}
                            required={props.required}
                            onFocus={props.onFocus}
                            onBlur={props.onBlur}
                            onKeyDown={props.onKeyDown}
                            value={value ?? ""}
                            onChange={handlerChange}
                            disabled={props.isDisabled}
                            readOnly={props.readonly}
                            data-testid={props.dataTestId}
                            onClick={props.onClick} key={props.id}
                            name="otp"
                            autoFocus={props.autoFocus && props.autoFocus[1] === 0}
                            ref={ref}
                        />
                        {props.inputType === "password" && props.showIcon == true && (
                            <RdsIcon
                                name={showPassword ? "eye" : "eye_slash"}
                                classes="password-toggle"
                                height="16px"
                                width="16px"
                                fill={false}
                                stroke={true}
                                opacity="0.5"
                                onClick={() => setShowPassword(!showPassword)}
                            />
                        )}
                    </div>
                )}
                {props.tooltipTitle && (
                    <Tooltip text={props.tooltipTitle} place={props.tooltipPlacement}>
                        <div className={getClassNames()}>
                            <input
                                type={
                                    props.inputType == "password"
                                        ? showPassword
                                            ? "text"
                                            : "password"
                                        : props.inputType
                                }
                                className={inputClasses}
                                id={props.id}
                                placeholder={props.placeholder}
                                name={props.name}
                                form={props.formName}
                                required={props.required}
                                onFocus={props.onFocus}
                                onBlur={props.onBlur}
                                onKeyDown={props.onKeyDown}
                                value={value}
                                onChange={handlerChange}
                                disabled={props.isDisabled}
                                readOnly={props.readonly}
                                data-testid={props.dataTestId}
                            ></input>
                            {props.labelPosition == "floating" && (
                                <>
                                    {props.label && (
                                        <>
                                            <label htmlFor={props.id} className={`form-label text-capitalize ${fontWeight}`}>
                                                {" "}
                                                {props.label}
                                            </label>
                                        </>
                                    )}
                                </>
                            )}
                            {props.inputType === "password" && props.showIcon == true && (
                                <RdsIcon
                                    name={showPassword ? "eye" : "eye_slash"}
                                    classes="password-toggle"
                                    height="20px"
                                    width="20px"
                                    fill={false}
                                    stroke={true}
                                    opacity="0.5"
                                    onClick={() => setShowPassword(!showPassword)}
                                />
                            )}
                        </div>
                    </Tooltip>
                )}
                {props.required && !props.validationMsg && hasError && isTouch && (
                    <div className="form-control-feedback">
                        {props.value === "" && (
                            <span className="text-danger">{props.label} {t("is required") || ""}</span>
                        )}
                    </div>
                )}

                {props.validatonPattern && props.validationMsg && isTouch && !isValid && (
                    <div className="form-control-feedback">
                        <span className="text-danger">{props.validationMsg}</span>
                    </div>
                )}

                {errorRegardingLengthOrValue && (
                    <div className="form-control-feedback">
                        <span className="text-danger">{errorRegardingLengthOrValue} </span>
                    </div>
                )}

            </div>
        </>
    );
})

export default RdsInput;
