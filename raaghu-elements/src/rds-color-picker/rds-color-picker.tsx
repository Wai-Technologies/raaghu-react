// import React, { useState, Fragment, useEffect } from "react";
// import "./rds-color-picker.css";
// import { SketchPicker } from "react-color";


// export interface RdsColorPickerProps {
//     value: string;
//     isDisabled?: boolean;
//     label: string;
//     displayType?: "basic" | "hex" | "rgba" | "hsl";
// }

// const RdsColorPicker = (props: RdsColorPickerProps) => {
//     const Value = props.value;

//     let [Color, setColor] = useState(Value);

//     useEffect(() => {
//         setColor(Value);
//     }, [Value]);

//     const HandlerChangecolor = (color: any) => {
//         // color.hex will contain the selected hex color
//         setColor(color.hex);
//     };

//     // Array of predefined colors for the swatcher (Optional)
//     const colorSwatches = [
//         "#FFC300", "#FF4F00", "#EA00FA", "#1708FF", "#00F5FF"
//     ];

//     const handleSwatchClick = (swatchColor: string) => {
//         setColor(swatchColor);
//     };

//     return (
//         <Fragment>
//             {props.displayType == "basic" && (
//                 <>
//                     <div className="m-2">
//                         {/* Color Swatcher Section */}
//                         <div className="mt-2">
//                             <label className="text-center">Choose from color swatches</label>
//                             <div className="d-flex mt-2">
//                                 {colorSwatches.map((color, index) => (
//                                     <div
//                                         key={index}
//                                         onClick={() => handleSwatchClick(color)}
//                                         style={{
//                                             backgroundColor: color,
//                                             width: "30px",
//                                             height: "30px",
//                                             borderRadius: "50%",
//                                             cursor: "pointer",
//                                             marginRight: "10px",
//                                         }}
//                                     ></div>
//                                 ))}
//                             </div>
//                         </div>
//                         <div className="text-start" >
//                             <label className="mt-4" >{props.label}</label>
//                         </div>

//                         {/* Color Picker Section */}
//                         <div className="align-items-center col-md-3 col-xl-2 col-6 d-flex mt-1 p-2">
//                             <span className="me-3">
//                                 <input
//                                     type="color"
//                                     className="form-control form-control-color colorPick"
//                                     value={Color}
//                                     id="color"
//                                     disabled={props.isDisabled}
//                                     onChange={HandlerChangecolor}
//                                     title="Choose your color"
//                                     data-testId="colorPicker"
//                                 />
//                             </span>
//                         </div>
//                     </div>
//                 </>
//             )}

//             {props.displayType === "hex" && (
//                 <>
//                     <div className="m-2">
//                         <div className="text-start" >
//                             {/* Label for the color picker */}
//                             <label>{props.label}</label>
//                         </div>

//                         <div className="align-items-center col-md-3 col-xl-2 col-6 d-flex mt-1 p-2">
//                             <span className="me-3">
//                                 {/* SketchPicker */}
//                                 <SketchPicker
//                                     color={Color}
//                                     onChange={HandlerChangecolor}
//                                     disabled={props.isDisabled}
//                                 />
//                             </span>
//                         </div>
//                     </div>
//                 </>
//             )}
//         </Fragment>
//     );
// };

// export default RdsColorPicker;

import React, { useState, Fragment, useEffect } from "react";
import "./rds-color-picker.css";

export interface RdsColorPickerProps {
    value?: string;
    isDisabled?: boolean;
    label?: string;
}

const RdsColorPicker = (props: RdsColorPickerProps) => {
    const Value = props.value || "#e1e1e1";

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

    // Array of predefined colors for the swatcher (Optional)
    const colorSwatches = [
        "#FFC300", "#FF4F00", "#EA00FA", "#1708FF", "#00F5FF"
    ];

    const handleSwatchClick = (swatchColor: string) => {
        setColor(swatchColor);
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
            <div className="m-2">
                {/* <div>
                    <label>{props.label}</label>
                </div> */}

                {/* Color Swatcher Section */}
                <div className="mt-2 text-start ">
                    <label>Choose from color swatches</label>
                    <div className="d-flex mt-2">
                        {colorSwatches.map((color, index) => (
                            <div className="swatches"
                                key={index}
                                onClick={() => handleSwatchClick(color)}
                                style={{
                                    backgroundColor: color,
                                }}
                            ></div>
                        ))}
                    </div>
                </div>

                <div className="align-items-center col-md-3 col-xl-2 col-6 d-flex mt-3" >
                    <span className="me-3 border d-flex align-items-center p-1">
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
                        <span className="ms-2 pe-2" >{Color}</span>
                    </span>

                </div>
            </div>
        </Fragment>
    );
};
export default RdsColorPicker;
