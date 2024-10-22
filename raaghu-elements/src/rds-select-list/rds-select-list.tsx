import React, { Fragment, useEffect, useState } from "react";
import "./rds-select-list.css";
import Select, { MultiValue, SingleValue } from "react-select";

export interface RdsSelectProps {
  label?: string;
  isBold?: boolean;
  isMultiple?: boolean;
  selectItems: {
    option: any;
    value: any;
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
}

const RdsSelectList = (props: RdsSelectProps) => {
  const [selectedValue, setSelectedValue] = useState<any | null>(
    props.selectedValue || null
  );
  const [options, setOptions] = useState<any>([]);

  useEffect(() => {
    setSelectedValue(props.selectedValue);
  }, [props.selectedValue]);

  useEffect(() => {
    if (props.selectItems) {
      const tempOptions = props.selectItems.map((item) => ({
        value: item.value,
        label: item.option,
        className: "rds-select-list-items",
      }));
      if (!areArraysEqual(tempOptions, options)) {
        setOptions(tempOptions);
      }
    }
  }, [props.selectItems, options]);

  function areArraysEqual(arr1: any[], arr2: any[]) {
    return JSON.stringify(arr1) === JSON.stringify(arr2);
  }

  const handleSelectChange = (items: SingleValue<any> | MultiValue<any>) => {
    if (!props.isMultiple) {
      const selectedSingle = items as SingleValue<any>;
      setSelectedValue(selectedSingle?.value || "");
      props.onChange?.(selectedSingle);
    } else {
      const selectedMultiple = (items as MultiValue<any>).map((item) => ({
        option: item.label,
        value: item.value,
      }));
      setSelectedValue(selectedMultiple.map((item) => item.value));
      props.onChange?.(selectedMultiple);
    }
  };

  const selectedItem = props.isMultiple
    ? options.filter((item: any) => selectedValue?.includes(item.value))
    : options.find((item: any) => item.value === selectedValue);

  return (
    <Fragment>
      <div className="mt-2">
        {props.label && (
          <label
            htmlFor={props.id}
            className={`form-label  ${props.isBold ? "fw-bold" : ""}`}
          >
            {props.label}
          </label>
        )}
        {props.required && <span className="text-danger ms-1">*</span>}
        <Select
          id={props.id}
          value={selectedItem}
          placeholder={props.placeholder}
          isMulti={props.isMultiple}
          options={options}
          aria-label="select example"
          data-testid={props.dataTestId}
          onChange={handleSelectChange}
          isSearchable={props.isSearchable ?? true}
          required={props.required}
          isDisabled={props.isDisabled}
          className={props.classes}
          classNamePrefix={
            !selectedValue ? "raaghu-not-select" : "raaghu-select"
          }
          classNames={{
            control: (state) =>
              state.isFocused ? "border-red-600 mt-1" : "border-grey-300 mt-1",
          }}
        />
      </div>
    </Fragment>
  );
};

export default RdsSelectList;