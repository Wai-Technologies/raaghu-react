import React, { useState, Fragment, useEffect } from "react";
import "./rds-color-picker.css";

export interface RdsColorPickerProps {
    value: string;
    isDisabled?: boolean;
    label: string;
}

const RdsColorPicker = (props: RdsColorPickerProps) => {
    const Value = props.value;

    let [Color, setColor] = useState(Value);

    useEffect(() => {
        setColor(Value);
    }, [Value]);
    const HandlerChangecolor = (e: any) => {
        const { value } = e.target;
        console.log(value);
        return (
            setColor(Color = value));
    };

    const stri = Color;
    const isValidHexaCode = () => {
        if (stri[0] != "#")
            return false;

        if (!(stri.length == 4 || stri.length == 7))
            return false;

        for (let i = 1; i < stri.length; i++)
            if (!((stri[i].charCodeAt(0) <= "0".charCodeAt(0) && stri[i].charCodeAt(0) <= 9)
                || (stri[i].charCodeAt(0) >= "a".charCodeAt(0) && stri[i].charCodeAt(0) <= "f".charCodeAt(0))
                || (stri[i].charCodeAt(0) >= "A".charCodeAt(0) || stri[i].charCodeAt(0) <= "F".charCodeAt(0))))
                return false;

        return true;
    };
    // Driver Code
    if (isValidHexaCode() === true) {
        Color = stri;
    }
    else {
        Color = "#000000";
    }

    return (
        <Fragment>
            <div className="m-2 ">
                <div>

                    <label>{props.label}</label>
                </div>
      
                <div className=" align-items-center border col-md-3 col-xl-2 col-6 d-flex mt-1 p-2" >
                    <span className="me-3">
                        <input
                            type="color"
                            className="form-control form-control-color colorPick"
                            value={Color}
                            id="color"
                            disabled={props.isDisabled}
                            onChange={HandlerChangecolor}
                            title="Choose your color"
                            data-testId="colorPicker"
                        />
                    </span>
                    <span>{Color}</span>

                </div>
            </div>
        </Fragment>
    );
};
export default RdsColorPicker;
