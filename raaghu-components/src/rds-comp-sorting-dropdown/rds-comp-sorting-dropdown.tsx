import React, { useState } from "react"; 
import "./rds-comp-sorting-dropdown.css";
import RdsCompIcon from "../rds-comp-icon";

export interface RdsCompSortingDropdownProps {
    label: string;
    listItems: { id: string; label: string }[];
}

const RdsCompSortingDropdown = (props: RdsCompSortingDropdownProps) => {
    const [show, setShow] = useState(false);

    return (
        <div className="relative inline-block text-left">
            <span
                onClick={() => setShow(!show)} 
                className="cursor-pointer flex items-center sorting-text fs-5 ms-3" 
                tabIndex={0}
            >
                {props.label}
                <span className="ms-4">
                    <RdsCompIcon
                        fill={false}
                        stroke={true}
                        height="25px"
                        width="25px"
                        name="chevron_right_sorting_dropdown"
                        dataTestId="chevron_right_sorting_dropdown"
                        colorVariant="primary"
                    ></RdsCompIcon>
                </span>
            </span>
            {show && (
                <div id="sorting-dropdown">
                    <ul className="dropdown-menu show sorting-text">
                        {props.listItems.map((item) => (
                            <li key={item.id} className="px-3 py-2 cursor-pointer">
                                {item.label}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default RdsCompSortingDropdown;
