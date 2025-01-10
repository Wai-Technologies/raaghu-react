import React, { useState, Fragment, useEffect } from "react";
import "./rds-color-picker.css";
import { SketchPicker } from "react-color";

export interface RdsColorPickerProps {
    value: string;
    isDisabled?: boolean;
    label: string;
}

const RdsColorPicker = (props: RdsColorPickerProps) => {
    const Value = props.value;


    const [Color, setColor] = useState(Value);


    useEffect(() => {
        setColor(Value);
    }, [Value]);

    // Convert color to rgba format if needed
    const convertToRgba = (color: any) => {
        // if color is in hex or rgb format, convert it to rgba
        if (color.rgb) {
            const { r, g, b, a } = color.rgb;
            return `rgba(${r}, ${g}, ${b}, ${a})`;
        }
        return color.hex; // fallback to hex if it's in hex
    };

    return (
        <Fragment>
            <div className="m-2">
                <div>
                    <label>{props.label}</label>
                </div>

                <div className="align-items-center border col-md-3 col-xl-2 col-6 d-flex mt-2 p-0">
                    <span className="me-3">
                        <SketchPicker
                            color={Color}
                            disableAlpha={false} // Allow opacity control
                            onChangeComplete={(color) => {
                                // Handle color change and store it in rgba format
                                setColor(convertToRgba(color));
                            }}
                        />
                    </span>
                    {/* <span>{Color}</span> */}
                </div>
            </div>
        </Fragment>
    );
};

export default RdsColorPicker;


