import React, { Fragment, useEffect, useState } from "react";
import "./rds-select-list.css";
import Select from "react-select";
export interface RdsSelectProps {
  label?: string;
  isBold?: boolean;
  isMultiple?: boolean;
  selectItems: {
    option: any;
    value: any;
  }[];
  selectedValue?: any;
  id: string;
  required?: boolean;
  classes?: string;
  onChange?: any;
  placeholder?: string;
  dataTestId?: string;
  isSearchable?: boolean;
  isDisabled?: boolean;
}

const RdsSelectList = (props: RdsSelectProps) => {
  const [selectedValue, setselectedValue] = useState<any | null>(
    props.selectedValue || null
  );
  const [options, setOptions] = useState<any>([]);

  useEffect(() => {
    setselectedValue(props.selectedValue);

  }, [props.selectedValue]);
  useEffect(() => {
    debugger
    if (props.selectItems) {
      const tempOptions = props.selectItems.map((item) => ({
        value: item.value,
        label: item.option,
        className: "rds-select-list-items",
      }));
      // Check if tempOptions is different from the current options
      if (!areArraysEqual(tempOptions, options)) {
        setOptions(tempOptions);
      }
    }
  }, [props.selectItems, options]);

  // Function to compare arrays
  function areArraysEqual(arr1: { value: any; label: any; className: string; }[], arr2: { value: any; label: any; className: string; }[]) {
    return JSON.stringify(arr1) === JSON.stringify(arr2);
  }

  const handleSelectChange = (items: any) => {
    debugger
    if (!props.isMultiple) {
      props.onChange(items);
      setselectedValue(items.value);
    } else {
      const multiSelectValue = items.map((item: any) => {
        return { option: item.label, value: item.value };
      });
      props.onChange(multiSelectValue);
      setselectedValue(items);
    }
  };
  const selectedItem = props.isMultiple
    ? options.filter((item: any) => selectedValue?.includes(item.value))
    : options.find((item: any) => item.value === selectedValue);

  const placeholder =
    props.selectedValue !== undefined && props.selectedValue !== null
      ? selectedItem?.label
      : props.placeholder;
  return (
    <Fragment>
      <div>
        {props.label && (
          <label
            htmlFor={props.id}
            className={`form-label ${props?.isBold ? "fw-bold" : ""}`}
          >
            {props.label}
          </label>
        )}
        {props.required && <span className="text-danger ms-1">*</span>}
        <Select
          id={props.id}
          value={selectedValue}
          placeholder={placeholder}
          isMulti={props.isMultiple}
          options={options}
          aria-label="select example"
          data-testid={props.dataTestId}
          onChange={handleSelectChange}
          isSearchable={props.isSearchable ?? false}
          required={props.required}
          isDisabled={props.isDisabled}
          className={props.classes}
          classNamePrefix={
            !selectedValue ? "raaghu-not-select" : "raaghu-select"
          }
          classNames={{
            control: (state) =>
              state.isFocused ? "border-red-600" : "border-grey-300",
          }}
        />
      </div>
    </Fragment>
  );
};
export default RdsSelectList;
