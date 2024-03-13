import React, { ChangeEvent, useCallback, useEffect, useState, useRef, Fragment, } from "react";
import "./rds-double-range.css";

export interface RdsDoubleRangeProps {
    min: number;
    max: number;
    doubleRangeType: "default" | "type_1" | "type_2";
}


const RdsDoubleRange = (props: RdsDoubleRangeProps) => {
    const [minVal, setMinVal] = useState(props.min);
    const [maxVal, setMaxVal] = useState(props.max);
    const minValRef = useRef<HTMLInputElement>(null);
    const maxValRef = useRef<HTMLInputElement>(null);
    const range = useRef<HTMLDivElement>(null);

    // Convert to percentage
    const getPercent = useCallback(
        (value: number) => Math.round(((value - props.min) / (props.max - props.min)) * 100),
        [props.min, props.max]
    );

    // Set width of the range to decrease from the left side
    useEffect(() => {
        if (maxValRef.current) {
            const minPercent = getPercent(minVal);
            const maxPercent = getPercent(+maxValRef.current.value); // Precede with '+' to convert the value from type string to type number

            if (range.current) {
                range.current.style.left = `${minPercent}%`;
                range.current.style.width = `${maxPercent - minPercent}%`;
            }
        }
    }, [minVal, getPercent]);

    // Set width of the range to decrease from the right side
    useEffect(() => {
        if (minValRef.current) {
            const minPercent = getPercent(+minValRef.current.value);
            const maxPercent = getPercent(maxVal);

            if (range.current) {
                range.current.style.width = `${maxPercent - minPercent}%`;
            }
        }
    }, [maxVal, getPercent]);

    // Get min and max values when their state changes

    const [Value1, setValue1] = useState(props.min);
    const [isTouched1, setIsTouched1] = useState(false);
    const [isTouched2, setIsTouched2] = useState(false);
    const [Value2, setValue2] = useState(props.max);

    const handlerChange1 = (event: ChangeEvent<HTMLInputElement>) => {
        const value1 = Math.min(+event.target.value, maxVal - 1);
        setMinVal(value1);
        setValue1(value1);
        event.target.value = value1.toString();
        setIsTouched1(true);

    };


    const handlerChange2 = (event: ChangeEvent<HTMLInputElement>) => {

        const value2 = Math.max(+event.target.value, minVal + 1);
        setMaxVal(value2);
        setValue2(value2);
        event.target.value = value2.toString();
        setIsTouched2(true);
    };

    const percent1 = ((Value1 - props.min) / (props.max - props.min)) * 100;
    const percent2 = ((Value2 - props.min) / (props.max - props.min)) * 100;
    const left1 = `calc(${percent1}% + (${-5 - percent1 * 0.15}px))`;
    const left2 = `calc(${percent2}% + (${-5 - percent2 * 0.17}px))`;
    const background = `linear-gradient(90deg, #D0D7DD ${percent1}% , #7E2EEf ${percent1}% , #7E2EEf ${percent2}%, #D0D7DD ${percent2}%)`;

    const a = "calc(0% + (-5px))";
    const b = "calc(100% + (-30px))";
    const styleleft1 = `${isTouched1 === true ? left1 : a}`;
    const styleleft2 = `${isTouched2 === true ? left2 : b}`;

    return (
        <Fragment>
            {/* Default */}
            {props.doubleRangeType == "default" && <div className="position-relative py-5">
                <div className="slider-track" data-testid="slider-1" style={{ background: background }}>
                    <span
                        id="range1"
                        style={{ left: styleleft1, top: "-60px", padding: "5px 10px" }}
                        className="sliderTooltipRangeOne "
                    >
                        {Value1}
                    </span>
                    <span
                        id="range2"
                        style={{ left: styleleft2, top: "-60px", padding: "5px 10px" }}
                        className="sliderTooltipRangeOne "
                    >
                        {Value2}
                    </span>

                </div>
                <input
                    type="range"
                    min={props.min}
                    max={props.max}
                    defaultValue={minVal}
                    ref={minValRef}
                    onChange={handlerChange1}
                    className="thumb thumb--zindex-4 slider_1"
                />
                <input
                    type="range"
                    min={props.min}
                    max={props.max}
                    defaultValue={maxVal}
                    ref={maxValRef}
                    onChange={handlerChange2}
                    className="thumb thumb--zindex-5 slider_2"
                />

                <div className="showvalue mt-4">
                    <span>{props.min}</span> <span>{props.max}</span>
                </div>
            </div>}
            {/* type1 */}
            {props.doubleRangeType == "type_1" &&
                <div className="position-relative py-5">

                    <div className="slider-track" style={{ background: background }}>
                        <span
                            id="range11"
                            style={{ left: styleleft1, top: "-15px", padding: "5px 10px" }}
                            className="sliderTooltipRangeOne1 "
                        >
                            {Value1}
                        </span>
                        <span
                            id="range21"
                            style={{ left: styleleft2, top: "-15px", padding: "5px 10px" }}
                            className="sliderTooltipRangeOne1 "
                        >
                            {Value2}
                        </span>

                    </div>
                    <input
                        type="range"
                        min={props.min}
                        max={props.max}
                        defaultValue={minVal}
                        ref={minValRef}
                        onChange={handlerChange1}
                        className="thumb1 thumb--zindex-41 slider_11"
                    />
                    <input
                        type="range"
                        min={props.min}
                        max={props.max}
                        defaultValue={maxVal}
                        ref={maxValRef}
                        onChange={handlerChange2}
                        className="thumb1 thumb--zindex-51 slider_21"
                    />

                    <div className="showvalue mt-4"> <span>{props.min}</span> <span>{props.max}</span>
                    </div>
                </div>
            }
            {/* type - 2 */}
            {props.doubleRangeType == "type_2" && <div className="position-relative py-5">
                <div className="showvalue mb-3"><span className="showVlu">{props.min}</span> <span className="showVlu">{props.max}</span></div>
                <div className="slider-track" style={{ background: background }}>
                    <span
                        id="range12"
                        style={{ left: styleleft1, top: "1.8rem", padding: "5px 10px" }}
                        className="sliderTooltipRangeOne2 "
                    >
                        {Value1}
                    </span>
                    <span
                        id="range22"
                        style={{ left: styleleft2, top: "1.8rem", padding: "5px 10px" }}
                        className="sliderTooltipRangeOne2 "
                    >
                        {Value2}
                    </span>

                </div>
                <input
                    type="range"
                    min={props.min}
                    max={props.max}
                    defaultValue={minVal}
                    ref={minValRef}
                    onChange={handlerChange1}
                    className="thumb2 thumb--zindex-42 slider_12"
                />
                <input
                    type="range"
                    min={props.min}
                    max={props.max}
                    defaultValue={maxVal}
                    ref={maxValRef}
                    onChange={handlerChange2}
                    className="thumb2 thumb--zindex-52 slider_22"
                />


            </div>}
            {/* { props.rangeType =="type2" && 
      <div className="position-relative py-5">
         <div className="showvalue mb-3"><span className="showVlu">{props.min}</span> <span className="showVlu">{props.max}</span></div>
        <div className="slider-track" style={{ background: background }}>
         
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
       
      </div>}
        /> */}



        </Fragment>
    );
};

export default RdsDoubleRange;



