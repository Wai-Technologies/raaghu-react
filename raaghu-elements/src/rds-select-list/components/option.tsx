import React, { ReactNode } from "react";
import { useSelectContext } from "./selectContext";
import RdsCheckbox from "../../rds-checkbox";

const Option: React.FC<{
    children: ReactNode | ReactNode[];
    key: string;
    value: string;
    isChecked?: boolean;
    multiple?: boolean;
}> = ({ children, key, value, isChecked, multiple }) => {
    const { changeSelectedOption } = useSelectContext();
    multiple = useSelectContext().multiple;
    isChecked = useSelectContext().isChecked;

    const onChangeSelectedOption = () => {
        isChecked = !isChecked;
        changeSelectedOption(value);
    };

    return (
        <li className="select-option" onClick={!multiple ? onChangeSelectedOption : undefined}>
            {!multiple ? value + (key == undefined ? "" : " - " + key) : (
                <RdsCheckbox id={value} labelText={value} checked={isChecked} onChange={onChangeSelectedOption}></RdsCheckbox>
            )}
        </li>
    );
};

export default Option;
