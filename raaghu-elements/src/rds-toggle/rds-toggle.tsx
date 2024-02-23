import React, { useEffect, useState } from "react";
import RdsLabel from "../rds-label/rds-label";

export interface RdsToggleProps {
  onClick?: React.MouseEventHandler<HTMLInputElement>;
  iconOnUncheck: string;
  iconOnCheck: string;
  small?: boolean;
  checked: boolean;
}

const RdsToggle = (props: RdsToggleProps) => {
    const [checked, setChecked] = useState(props.checked);

    // useEffect(() => {
    
    //     setChecked(props.checked);
    // }, [props.checked]);
    const onChangeHandler = () => {
    
        setChecked((prev) => !prev);
    };

    const toggleClass = props.small ? "small-toggle-switch pt-1" : "toggle-switch pt-1";
    const sliderClass = props.small ? "toggle-small-switch-slider" : "toggle-switch-slider";

    return (
        <>
            <label
                className={`${toggleClass} switch btn-color-mode-switch border-0`}
            >
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={onChangeHandler}
                    onClick={props.onClick}
                    id="flexSwitchCheckDefault"
                />
                <span
                    id="toggleId"
                    className={`${sliderClass} d-flex align-items-center justify-content-around btn-color-mode-switch-inner border-0`}
                >
                    <span className="position-relative z-3">
                        <span>{props.iconOnUncheck}</span>
                    </span>
                    <span className="position-relative z-3">
                        {/* <RdsLabel label={props.iconOnCheck}></RdsLabel> */}
                        <span>{props.iconOnCheck}</span>
                    </span>
                </span>
            </label>
        </>
    );

};

export default RdsToggle;
