import React, { useState, useEffect } from "react";
import Select, { components } from "react-select";
import "./rds-select-list.css";

export interface RdsSelectProps {
  size?: "small" | "large" | "medium" | string;
  style?:"default" | "BottomLine";
  label?: string;
  showHint?: boolean;
  showTitle?: boolean;
  isBold?: boolean;
  isMultiple?: boolean;
  selectItems: {
    label: string;
    value: string;
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
}

const RdsSelectList = (props: RdsSelectProps) => {
  const [selectedValue, setSelectedValue] = useState<any | null>(
    props.isMultiple ? [] : null
  );

  useEffect(() => {
    setSelectedValue(props.selectedValue);
  }, [props.selectedValue]);

  const handleSelectChange = (items: any) => {
    if (!props.isMultiple) {
      if (props.onChange) {
        props.onChange(items);
      }
      setSelectedValue(items.value);
    } else {
      const multiSelectValue = items.map((item: any) => {
        return { label: item.label, value: item.value };
      });
      if (props.onChange) {
        props.onChange(multiSelectValue);
      }
      setSelectedValue(items.map((item: any) => item.value));
    }
  };

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      minHeight: props.size === "small" ? "1.875rem" : props.size === "large" ? "3.125rem" : "2.5rem", 
      fontSize: props.size === "small" ? "0.75rem" : props.size === "large" ? "1.125rem" : "0.875rem",
      borderBottomWidth: props.style === "BottomLine" ? (props.borderBottomWidth || "2px") : undefined,
      borderBottomStyle: props.style === "BottomLine" ? "solid" : undefined, 
    }),
    menu: (provided: any) => ({
      ...provided,
      fontSize: props.size === "small" ? "0.75rem" : props.size === "large" ? "1.125rem" : "0.875rem", 
    }),
    option: (provided: any) => ({
      ...provided,
      fontSize: props.size === "small" ? "0.75rem" : props.size === "large" ? "1.125rem" : "0.875rem",
    }),
  };


  const selectedItem = props.isMultiple
    ? props.selectItems.filter((item: any) => selectedValue?.includes(item.value))
    : props.selectItems.find((item: any) => item.value === selectedValue);

  const Option = (optionProps: any) => {
    const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (optionProps.isDisabled) return;
      optionProps.selectOption(optionProps.data);
    };

    const defaultImgUrl = props.defaultImgUrl; // Replace with your default image URL profile_picture_circle
    const imgUrl = optionProps.data.imgUrl || defaultImgUrl;

    return (
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
        <img
          src={imgUrl}
          style={{
            width: optionProps.data.imgWidth,
            height: optionProps.data.imgHeight,
            cursor: "pointer",
          }}
        />
        <label className="cursor-pointer ms-1">{optionProps.label}</label>
      </components.Option>
    );
  };

  return (
    <div className={props.classes}>
      {props.label &&props.showTitle&& (
        <label
          htmlFor={props.id}
          className={`form-label ${props.isBold ? "fw-bold" : ""}`}
        >
          {props.label}
        </label>
      )}
      {props.required && <span className="text-danger ms-1">*</span>}
      <Select
        id={props.id}
        options={props.selectItems}
        isMulti={props.isMultiple}
        closeMenuOnSelect={!props.isMultiple}
        hideSelectedOptions={false}
        components={props.isMultiple ? { Option } : undefined}
        onChange={handleSelectChange}
        value={selectedItem}
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
};

export default RdsSelectList;
