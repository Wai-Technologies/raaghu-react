// import React, { useState, Fragment, useEffect } from "react";
// import "./rds-color-picker.css";
// import { SketchPicker } from "react-color";

// export interface RdsColorPickerProps {
//     value: string;
//     isDisabled?: boolean;
//     label: string;
// }

// const RdsColorPicker = (props: RdsColorPickerProps) => {
//     const Value = props.value;

//     let [Color, setColor] = useState(Value);

//     useEffect(() => {
//         setColor(Value);
//     }, [Value]);

//     const HandlerChangecolor = (e: any) => {
//         const { value } = e.target;
//         console.log(value);
//         return (
//             setColor(Color = value));
//     };

//     // const stri = Color;
//     // const isValidHexaCode = () => {
//     //     if (stri[0] != "#")
//     //         return false;

//     //     if (!(stri.length == 4 || stri.length == 7))
//     //         return false;

//     //     for (let i = 1; i < stri.length; i++)
//     //         if (!((stri[i].charCodeAt(0) <= "0".charCodeAt(0) && stri[i].charCodeAt(0) <= 9)
//     //             || (stri[i].charCodeAt(0) >= "a".charCodeAt(0) && stri[i].charCodeAt(0) <= "f".charCodeAt(0))
//     //             || (stri[i].charCodeAt(0) >= "A".charCodeAt(0) || stri[i].charCodeAt(0) <= "F".charCodeAt(0))))
//     //             return false;

//     //     return true;
//     // };
//     // // Driver Code
//     // if (isValidHexaCode() === true) {
//     //     Color = stri;
//     // }
//     // else {
//     //     Color = "#000000";
//     // }

//     return (
//         <Fragment>
//             <div className="m-2 ">
//                 <div>
//                     <label>{props.label}</label>
//                 </div>

//                 <div className=" align-items-center border col-md-3 col-xl-2 col-6 d-flex mt-1 p-2" >
//                     <span className="me-3">
//                         <SketchPicker
//                             color={Color}
//                             onChangeComplete={(Color) => {
//                                 setColor(Color.hex);
//                             }}
//                         />
//                     </span>
//                     <span>{Color}</span>

//                 </div>
//             </div>
//         </Fragment>
//     );
// };
// export default RdsColorPicker;



// import React, { useState, Fragment, useEffect } from "react";
// import "./rds-color-picker.css";
// import { SketchPicker } from "react-color";

// export interface RdsColorPickerProps {
//     value: string;
//     isDisabled?: boolean;
//     label: string;
// }

// const RdsColorPicker = (props: RdsColorPickerProps) => {
//     const Value = props.value;

//     let [Color, setColor] = useState(Value);

//     useEffect(() => {
//         setColor(Value);
//     }, [Value]);

//     const HandlerChangecolor = (e: any) => {
//         const { value } = e.target;
//         console.log(value);
//         return (
//             setColor(Color = value));
//     };

//     return (
//         <Fragment>
//             <div className="m-2 ">
//                 <div>
//                     <label>{props.label}</label>
//                 </div>

//                 <div className=" align-items-center border col-md-3 col-xl-2 col-6 d-flex mt-1 p-2" >
//                     <span className="me-3">
//                         <SketchPicker
//                             color={Color}
//                             onChangeComplete={(Color) => {
//                                 setColor(Color.hex);
//                             }}
//                         />
//                     </span>
//                     <span>{Color}</span>

//                 </div>
//             </div>
//         </Fragment>
//     );
// };
// export default RdsColorPicker;


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


