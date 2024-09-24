import React, { useState } from "react";
import { default as ReactSelect, components } from "react-select";
import RdsIcon from "../rds-icon";
import "./rds-dropdown-list-with-search.css";

export interface RdsSelectProps {
  label?: string;
  isBold?: boolean;
  isMultiple?: boolean;
  selectItems: {
    label: string;
    value: string;
    icon?: string;
    iconWidth?: string;
    iconHeight?: string;
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
  const [state, setState] = useState<{ optionSelected: any[] | null }>({
    optionSelected: null,
  });

  const handleChange = (selected: any) => {
    setState({
      optionSelected: selected,
    });
  };

  return (
    <div>
      <ReactSelect
        options={props.selectItems}
        isMulti
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        components={{
          Option,
        }}
        onChange={handleChange}
        value={state.optionSelected}
        placeholder={props.placeholder}
        isSearchable={props.isSearchable}
        isDisabled={props.isDisabled}
      />
    </div>
  );
};

export default RdsSelectList;

const Option = (props: any) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (props.isDisabled) return;
    props.selectOption(props.data);
  };

  return (
    <div>
      <components.Option {...props}>
        <input
        className="form-check-input"
          type="checkbox"
          checked={props.isSelected}
          onChange={handleChange}
          onClick={(e) => e.stopPropagation()} // Prevent the dropdown from closing
        />{" "}
        <RdsIcon
          colorVariant="secondary"
          height={props.data.iconHeight}
          isCursorPointer
          name={props.data.icon}
          stroke
          width={props.data.iconWidth}
        />
        <label>{props.label}</label>
      </components.Option>
    </div>
  );
};