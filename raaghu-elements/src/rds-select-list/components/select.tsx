import React, { ReactNode, useState, useRef } from "react";
import useOnClickOutside from "../hooks/useOnClickOutside";
import { SelectContext } from "./selectContext";
import RdsIcon from "../../rds-icon";
import RdsBadge from "../../rds-badge";
import RdsSearch from "../../rds-search";

const Select: React.FC<{
    id: string;
    children: ReactNode | ReactNode[];
    defaultValue?: string;
    placeholder?: string;
    multiple?: boolean;
    disabled?: boolean;
    search?: boolean;
    onChange: (value: string) => void;
}> = ({ id, children, defaultValue, placeholder, multiple, search, disabled, onChange}) => {
    const [select_id, setID] = useState(id);
    const [selectedOption, setSelectedOption] = useState(defaultValue || "");
    const [showDropdown, setShowDropdown] = useState(false);
    const [isDisabled, setDisabled] = useState(disabled);
    const [isMultiSelect, setMultiSelect] = useState(multiple || false);
    const [isSearchable, setSearchable] = useState(search || false);
    const showDropdownHandler = () => setShowDropdown(!showDropdown);
    const selectPlaceholder = placeholder || "Choose an option";
    const selectContainerRef = useRef(null);
    const clickOutsideHandler = () => setShowDropdown(false);
    useOnClickOutside(selectContainerRef, clickOutsideHandler);

    const updateSelectedOption = (option: string) => {
        if (isMultiSelect) {
            const arr = selectedOption.split(",");
            if (arr.filter((val) => { return val == option }).length == 0) {
                setSelectedOption(selectedOption + (selectedOption.length == 0 ? "" : ",") + option);
            } else {
                setSelectedOption(arr.filter((val) => { return val != option }).join(","));
            }
        } else if (!isMultiSelect) {
            setSelectedOption(option);
            setShowDropdown(false);
        }
        onChange(option);
    };

    const onBadgeClose = (option: string) => {
        updateSelectedOption(option);
    };

    const displayBadges = () => {
        const arr = selectedOption.split(",");
        return (
            arr.map((value: any) => (
                <>
                    <RdsBadge label={value} showClose={false} onClose={onBadgeClose} size="small" colorVariant="primary"></RdsBadge>
                </>
            ))
        );
    };

    return (
        <SelectContext.Provider
            value={{ selectedOption, isChecked: false, multiple: isMultiSelect, changeSelectedOption: updateSelectedOption }}
        >
            <div className="select-container w-100 border-0 rounded" ref={selectContainerRef}>
                <div
                    className={"d-flex gap-1 align-items-center justify-content-between form-control selected-text "
                        + (showDropdown ? "active " : "")
                        + (isDisabled ? "disabled " : "")
                        + (selectedOption.length <= 0 ? "select-placeholder " : "")}
                    onClick={showDropdownHandler}
                >
                    <div className="d-flex gap-1 overflow-auto">
                        {isMultiSelect ? (
                            (selectedOption.length > 0 ? displayBadges() : selectPlaceholder)
                        ) : (selectedOption.length > 0 ? selectedOption : selectPlaceholder)}
                    </div>
                    <div>
                        <RdsIcon
                            name={showDropdown ? "chevron_up" : "chevron_down"}
                            fill={false}
                            stroke={true}
                            height="11px"
                            width="11px"
                        ></RdsIcon>
                    </div>
                </div>
                <ul
                    className={"dropdown-menu select-options "
                        + (showDropdown
                            ? "show "
                            : "hide ")
                    }>
                    {children}
                </ul>
            </div>
        </SelectContext.Provider>
    );
};

export default Select;
