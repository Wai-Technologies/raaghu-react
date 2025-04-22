import React, { useState, useEffect } from "react";
import Select, { components } from "react-select";
import "./rds-select-list.css";
 
export interface RdsSelectProps {
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

const RdsSelectList = (props: RdsSelectProps) => {
  const [selectedValue, setSelectedValue] = useState<any | null>(
    props.isMultiple ? [] : null
  );
  const [reset, setIsReset] = useState<boolean>(false);
 
  useEffect(() => {
    if (props.reset) {
      setIsReset(true);
    }
  }, [props.reset]);
 
  const showLabel = props.showLabel ?? true;

  useEffect(() => {
    setSelectedValue(props.selectedValue);
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
    setIsReset(false);
    
    if (props.isMultiple) {
      // Handle "Select All" option
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
          const allItemValues = regularItems.map(item => item.value);
          if (props.onChange) {
            props.onChange(allItemValues);
          }
          setSelectedValue(["select_all", ...allItemValues]);
        }
      } else {
        // Handle individual selections
        const values = items ? items.map((item: any) => item.value) : [];
        
        // Check if all regular items are selected (to decide whether to include "select_all")
        const allRegularItemsSelected = regularItems.length > 0 && 
          regularItems.every(item => 
            items ? items.some((selected: any) => selected.value === item.value) : false
          );
        
        const finalValues = allRegularItemsSelected 
          ? ["select_all", ...values]
          : values;
        
        if (props.onChange) {
          props.onChange(values);
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
          ? "1.875rem"
          : props.size === "large"
          ? "3.125rem"
          : "1.875rem",
      fontSize:
        props.size === "small"
          ? "0.75rem"
          : props.size === "large"
          ? "1.125rem"
          : "0.75rem",
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
    ? mappedSelectItems.filter((item: any) => selectedValue?.includes(item.value))
    : mappedSelectItems?.find((item: any) => item.value === selectedValue);
 
  const Option = (optionProps: any) => {
    const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (optionProps.isDisabled) return;
      
      // Special handling for the Select All checkbox
      if (optionProps.data.value === "select_all") {
        if (optionProps.isSelected) {
          // If "Select All" is already selected, unselect everything
          optionProps.clearValue();
        } else {
          // Select all options
          const allOptions = mappedSelectItems.filter(item => item.value !== "select_all");
          optionProps.setValue(allOptions, 'select-option');
        }
      } else {
        // For regular options, toggle as normal
        optionProps.selectOption(optionProps.data);
      }
      
      event.stopPropagation();
    };
 
    return (
      <div
        id="select-background-color"
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
              : BACKGROUND_COLORS.default, // Default when not focused or selected
        }}
      >
        <components.Option {...optionProps}>
          {optionProps.selectProps.isMulti && (
            <input
              className="form-check-input selectClasses my-1 mx-1"
              type="checkbox"
              checked={optionProps.isSelected}
              onChange={handleOptionChange}
              onClick={(e) => e.stopPropagation()}
            />
          )}
          {optionProps.data.value !== "select_all" && optionProps.data.imgUrl && (
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
        components={props.isMultiple ? { Option } : undefined}
        onChange={handleSelectChange}
        value={reset === true ? null : selectedItem}
        placeholder={props.placeholder}
        isSearchable={props.isSearchable}
        isDisabled={props.isDisabled}
        classNamePrefix="custom-select"
        aria-label="select example"
        data-testid={props.dataTestId}
        styles={customStyles}
      />
      {props.showHint && (
        <p className="my-1 text-black-50">
          <small>Hint Text</small>
        </p>
      )}
    </div>
  );
}
 
export default RdsSelectList;