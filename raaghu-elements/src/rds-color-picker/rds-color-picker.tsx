import React, { useState, Fragment, useEffect } from "react";
import "./rds-color-picker.css";
import { SketchPicker } from "react-color";

export interface RdsColorPickerProps {
    value: string;
    isDisabled?: boolean;
    label: string;
    storyType: "basic" | "hex" | "rgba" | "hsl";
}

const RdsColorPicker = (props: RdsColorPickerProps) => {
    const Value = props.value;

    let [Color, setColor] = useState(Value);

    useEffect(() => {
        setColor(Value);
    }, [Value]);

    const HandlerChangecolor = (color: any) => {
        // color.hex will contain the selected hex color
        setColor(color.hex);
    };

    const handleSwatchClick = (swatchColor: string) => {
        setColor(swatchColor);
    };

    return (
        <Fragment>

            {props.storyType == "basic" && (
                <>
                    <div className="m-2">
                        <div className="text-start" >
                            {/* Label for the color picker */}
                            <label>{props.label}</label>
                        </div>

                        <div className="align-items-center col-md-3 col-xl-2 col-6 d-flex mt-1 p-2">
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
                        </div>
                    </div>
                </>
            )}

            {props.storyType === "hex" && (
                <>
                    <div className="m-2">
                        <div className="text-start" >
                            {/* Label for the color picker */}
                            <label>{props.label}</label>
                        </div>

                        <div className="align-items-center col-md-3 col-xl-2 col-6 d-flex mt-1 p-2">
                            <span className="me-3">
                                {/* SketchPicker */}
                                <SketchPicker
                                    color={Color}
                                    onChange={HandlerChangecolor}
                                    disabled={props.isDisabled}
                                />
                            </span>
                        </div>
                    </div>
                </>
            )}

        </Fragment>
    );
};

export default RdsColorPicker;


