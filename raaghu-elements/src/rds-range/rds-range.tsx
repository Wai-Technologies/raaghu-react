import React, { Fragment, useState } from "react";
import "./rds-range.css";
export interface RdsRangeProps {
    max: number;
    min: number;
    step?: number;
    rangeType: string;
}

const RdsRange = (props: RdsRangeProps) => {
    const [Value, setValue] = useState(props.min);
    const [isTouched, setIsTouched] = useState(false);

    const handlerChange = (e: any) => {
        const value1 = e.target.value;
        setIsTouched(true);
        setValue(value1);
    };

    const percent1 = ((Value - props.min) / (props.max - props.min)) * 100;
    const left = `calc(${percent1}% + (${-3 - percent1 * 0.28}px))`;
    const left2 = `calc(${percent1}% + (${-10 - percent1 * 0.22}px))`;

    const background = `linear-gradient(90deg,#5C82E3 ${percent1}%,#D0D7DD 0%)`;
    const a = "calc(0% + (-5px))";
    const styleleft = `${isTouched === true ? left : a}`;


    return (
        <Fragment>
            {/* Default */}
            {props.rangeType == "default" && <div className="position-relative py-5">
                <div className="slider-track" style={{ background: background }}>

                    <span
                        id="range1"
                        style={{ left: styleleft, top: "-55px", padding: "5px 10px" }}
                        className="sliderTooltipRange"
                    >
                        {Value}
                    </span>

                </div>

                <input
                    className="slider_0 "
                    type="range"
                    max={props.max}
                    min={props.min}
                    defaultValue={props.min}
                    onChange={handlerChange}
                />
                <div className="showvalue mt-4"><span>{props.min}</span> <span>{props.max}</span></div>
            </div>}

            {/* type - 2 */}
            {props.rangeType == "type2" &&
                <div className="position-relative py-5">
                    <div className="showvalue mb-3"><span className="showVlu">{props.min}</span> <span className="showVlu">{props.max}</span></div>
                    <div className="slider-track__range" style={{ background: background }}>

                        <span
                            id="range11"
                            style={{ left: styleleft, top: "1.8rem", padding: "5px 10px" }}
                            className="sliderTooltipRange1"
                        >
                            {Value}
                        </span>

                    </div>

                    <input
                        className="slider_01 "
                        type="range"
                        max={props.max}
                        min={props.min}
                        defaultValue={props.min}
                        onChange={handlerChange}
                    />

                </div>}
            {/* type - 1 */}
            {props.rangeType == "type1" &&
                <div className="position-relative py-5">
                    <div className="slider-track" style={{ background: background }}>

                        <span
                            id="rangetwo"
                            style={{ left: left2, top: "-15px", padding: "5px 10px" }}
                            className="sliderTooltipRangetwo"
                        >
                            {Value}
                        </span>
                    </div>
                    <input
                        className="slider_two "
                        type="range"
                        max={props.max}
                        min={props.min}
                        onChange={handlerChange}
                        defaultValue={props.min}
                    />
                    <div className="showvalue mt-4"><span className="showVlu mt-1" >{props.min}</span> <span className="showVlu mt-1" >{props.max}</span></div>
                </div>}


        </Fragment>
    );
};
export default RdsRange;
