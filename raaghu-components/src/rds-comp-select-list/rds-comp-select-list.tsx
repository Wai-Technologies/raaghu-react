import React, { useState, useEffect } from "react";
import Select, { components } from "react-select";
import "./rds-comp-select-list.css";
import { SpinnerSize } from "../../../raaghu-elements/src/rds-spinner/rds-spinner";
import { RdsSpinner } from "../rds-elements";
 
export interface RdsCompSelectListProps {
  size?: "small" | "large" | "medium" | string;
  style?: "default" | "BottomLine";
  label?: string;
  showHint?: boolean;
  showLabel?: boolean;
  isBold?: boolean;
  isMultiple?: boolean;
  color?: "primary" | "secondary" | "success" | "danger" | "none" |string;
  selectItems: {
    label?: string;
    option?: string;
    value?: any;
    imgUrl?: string;
    imgWidth?: string;
    imgHeight?: string;
  }[];
  selectedValue?: string | string[];
  id: string;
  required?: boolean;
  classes?: string;
  onChange?: (value: any) => void;
  placeholder?: string;
  dataTestId?: string;
  isSearchable?: boolean;
  isDisabled?: boolean;
  defaultImgUrl?: string;
  borderBottomWidth?: string;
  customClasses?: string;
  reset?: boolean;
}
 
const BORDER_COLORS = {
  primary: "#b38de9",
  danger: "red",
  success: "green",
  default: undefined, // Default/fallback border color
};
 
const BACKGROUND_COLORS = {
  primary: "#b38de9",
  danger: "red",
  success: "green",
  focused: "lightgray",
  default: "transparent", // Default/fallback color
};
 
const TEXT_COLORS = {
  selected: "white",
  default: undefined, // Default/fallback text color
};
 
const RdsCompSelectList = (props: RdsCompSelectListProps) => {
  const [selectedValue, setSelectedValue] = useState<any | null>(
    props.isMultiple ? [] : null
  );
  const [isSearching, setIsSearching] = useState(false);
  const [searchTimer, setSearchTimer] = useState<NodeJS.Timeout | null>(null);
  const showLabel = props.showLabel === undefined ? true : props.showLabel;
  const reset = props.reset || false;

  useEffect(() => {
    if (props.selectedValue !== undefined) {
      setSelectedValue(props.selectedValue);
    }
  }, [props.selectedValue]);
 
  // Create a fixed array of select items without the "Select All" option
  const regularItems = props.selectItems?.map((item) => ({
    label: item.label || item.option,
    value: item.value,
    imgUrl: item.imgUrl,
    imgWidth: item.imgWidth,
    imgHeight: item.imgHeight,
  }));
 
  // Create the full array including "Select All" if needed
  const mappedSelectItems = props.isMultiple
    ? [{ label: "(Select All)", value: "select_all" }, ...regularItems]
    : regularItems;
 
  const handleSelectChange = (items: any) => {
    if (props.isMultiple) {
      if (items && items.some((item: any) => item.value === "select_all")) {
        const wasSelectAllAlreadySelected = selectedValue?.includes("select_all");
 
        if (wasSelectAllAlreadySelected) {
          // If "Select All" was already selected, unselect everything
          if (props.onChange) {
            props.onChange([]);
          }
          setSelectedValue([]);
        } else {
          // Select all items (excluding the "select_all" option)
          const allItemValues = regularItems.map((item) => item.value);
          if (props.onChange) {
            props.onChange(allItemValues);
          }
          setSelectedValue(["select_all", ...allItemValues]);
        }
      } else {
        // Handle individual selections
        const values = items ? items.map((item: any) => item.value) : [];
 
        // Check if all regular items are selected
        const allRegularItemsSelected =
          regularItems.length > 0 &&
          regularItems.every((item) =>
            items ? items.some((selected: any) => selected.value === item.value) : false
          );
 
        const finalValues = allRegularItemsSelected
          ? ["select_all", ...values]
          : values;
 
        if (props.onChange) {
          props.onChange(finalValues.filter((value: string) => value !== "select_all"));
        }
 
        setSelectedValue(finalValues);
      }
    } else {
      // Single select case
      if (props.onChange) {
        props.onChange(items?.value);
      }
      setSelectedValue(items?.value);
    }
  };
 
  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      minHeight:
        props.size === "small"
          ? "2.2rem"
          : props.size === "large"
          ? "3.125rem"
          : "2.375rem",
      fontSize:
        props.size === "small"
          ? "0.75rem"
          : props.size === "large"
          ? "1.125rem"
          : "0.875rem",
      borderBottomWidth:
        props.style === "BottomLine" ? props.borderBottomWidth || "2px" : undefined,
      borderBottomStyle: props.style === "BottomLine" ? "solid" : undefined,
 
      borderColor: props.color && props.color in BORDER_COLORS
      ? BORDER_COLORS[props.color as keyof typeof BORDER_COLORS]
      : provided.borderColor,
    }),
    menu: (provided: any) => ({
      ...provided,
      fontSize:
        props.size === "small"
          ? "0.75rem"
          : props.size === "large"
          ? "1.125rem"
          : "0.875rem",
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      fontSize:
        props.size === "small"
          ? "0.75rem"
          : props.size === "large"
          ? "1.125rem"
          : "0.875rem",
          backgroundColor:
          state.isSelected
            ? props.color === "primary"
              ? BACKGROUND_COLORS.primary
              : props.color === "danger"
              ? BACKGROUND_COLORS.danger
              : props.color === "success"
              ? BACKGROUND_COLORS.success
              : provided.backgroundColor // Fallback to the provided background color
            : state.isFocused
            ? BACKGROUND_COLORS.focused
            : BACKGROUND_COLORS.default, // Default background color when not selected or focused,
        color: state.isSelected ? TEXT_COLORS.selected : provided.color, // Text color
    }),
  };
 
  const selectedItem = props.isMultiple
    ? mappedSelectItems.filter(
        (item: any) => selectedValue?.includes(item.value) && item.value !== "select_all"
      )
    : mappedSelectItems?.find((item: any) => item.value === selectedValue);
 
    const Option = (optionProps: any) => {
      const isSelectAll = optionProps.data.value === "select_all";
   
      const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (optionProps.isDisabled) return;
   
        if (isSelectAll) {
          const allItemValues = regularItems.map((item) => item.value);
   
          if (selectedValue?.includes("select_all")) {
            // Already selected, unselect everything
            setSelectedValue([]);
            props.onChange?.([]);
          } else {
            // Select all
            setSelectedValue(["select_all", ...allItemValues]);
            props.onChange?.(allItemValues);
          }
        } else {
          optionProps.selectOption(optionProps.data);
        }
   
        event.stopPropagation();
      };
   
      const handleDoubleClick = () => {
        // Always clear all on double click
        setSelectedValue([]);
        props.onChange?.([]);
      };
   
    return (
      <div
      id="select-background-color"
      onDoubleClick={isSelectAll ? handleDoubleClick : undefined}
      style={{
        backgroundColor:
          optionProps.isFocused || optionProps.isSelected
            ? props.color === "primary"
              ? BACKGROUND_COLORS.primary
              : props.color === "danger"
              ? BACKGROUND_COLORS.danger
              : props.color === "success"
              ? BACKGROUND_COLORS.success
              : BACKGROUND_COLORS.default
            : BACKGROUND_COLORS.default,
      }}
    >
         <components.Option {...optionProps}>
        {props.isMultiple && (
          <input
            className="form-check-input selectClasses my-1 mx-1"
            type="checkbox"
            checked={
              isSelectAll
                ? selectedValue?.includes("select_all")
                : optionProps.isSelected
            }
            onChange={handleOptionChange}
            onClick={(e) => e.stopPropagation()}
          />
        )}
          {optionProps.data.value !== "select_all" &&
          optionProps.data.imgUrl && (
            <img
              src={optionProps.data.imgUrl}
              style={{
                width: optionProps.data.imgWidth,
                height: optionProps.data.imgHeight,
                cursor: "pointer",
              }}
              alt=""
            />
          )}
        <label className="cursor-pointer ms-1">{optionProps.label}</label>
      </components.Option>
    </div>
    );
  };
 
  // Added Spinner
  const customComponents = {
    ...props.isMultiple ? { Option } : {},
    LoadingIndicator: () => (
      <div className="custom-select__loading-indicator" data-testid="loading-spinner">
        <RdsSpinner
          spinnerType="border"
          colorVariant="primary"
          width="16px"
          height="16px"
          borderWidth="2px"
          size={SpinnerSize.Small}
        />
      </div>
    ),
    IndicatorSeparator: () => null
  };

  const handleInputChange = (inputValue: string) => {
    if (inputValue === "") {
    // Do not show loader when closing the dropdown
    return;
    }
    setIsSearching(true);
    if (searchTimer) {
      clearTimeout(searchTimer);
    }
    const timer = setTimeout(() => {
      setIsSearching(false);
    }, 500);
    setSearchTimer(timer);
  };

  useEffect(() => {
    return () => {
      if (searchTimer) {
        clearTimeout(searchTimer);
      }
    };
  }, [searchTimer]);

  useEffect(() => {
    if (reset) {
      setSelectedValue(props.isMultiple ? [] : null);
    }
  }, [reset, props.isMultiple]);

  return (
    <div className={`${props.classes} mt-2`}>
      <div className="d-flex mb-1">
        {showLabel && props.label && (
          <label
            htmlFor={props.id}
            className={` ${props.isBold ? "fw-bold" : ""}`}
          >
            {props.label}
          </label>
        )}
        {props.required && <span className="text-danger ms-1">*</span>}
      </div>
      <Select
        id={props.id}
        options={mappedSelectItems}
        isMulti={props.isMultiple}
        closeMenuOnSelect={!props.isMultiple}
        hideSelectedOptions={false}
        components={customComponents}
        onChange={handleSelectChange}
        onInputChange={handleInputChange}
        value={reset === true ? null : selectedItem}
        placeholder={props.placeholder}
        isSearchable={props.isSearchable}
        isDisabled={props.isDisabled}
        classNamePrefix="custom-select"
        aria-label="select example"
        data-testid={props.dataTestId}
        styles={customStyles}
        isLoading={isSearching}
      />
      {props.showHint && (
        <p className="my-1 text-black-50">
          <small>Hint Text</small>
        </p>
      )}
    </div>
  );
}
 
export default RdsCompSelectList;