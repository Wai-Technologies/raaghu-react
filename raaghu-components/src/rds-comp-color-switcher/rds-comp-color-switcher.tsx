import React, { useEffect, useState } from "react";
import "./rds-comp-color-switcher.css";
import { use } from "i18next";

export enum DisplayType {
    Rounded = "rounded",
    Square = "square",
  }
export interface RdsCompColorSwitcherProps {
    header?: string;
    itemList: { id: number, color: string }[];
    defaultValue?: number;
    displayType?: DisplayType;
    selectedColor?: (event: React.MouseEvent<HTMLDivElement>, selected_Color: any) => void;
}

const RdsCompColorSwitcher = (props: RdsCompColorSwitcherProps) => {
    const defaultV = props.hasOwnProperty("defaultValue") ? props.defaultValue : 1;
    const [value, setValue] = useState(defaultV);
    const displaytype = props.hasOwnProperty("displayType")
        ? props.displayType
        : DisplayType.Rounded;
    const selectColor = (e: any, item: any) => {
        setValue(item.id);
        selectColor(e, item.value);
    };

    useEffect(() => {
        setValue(defaultV);
    }, [props.defaultValue]);
    
    return (
        <>
            <div>
                {displaytype == DisplayType.Rounded && (
                    <div>
                        <h6>{props.header}</h6>
                        <div className="d-flex">
                            {props.itemList.map((item: any, index: any) => (
                                <div
                                    key={index}
                                    className={`${value === item.id ? "selected-border" : "default-border"
                                        }`}
                                    id={item.color}
                                    style={{ backgroundColor: item.color }}
                                    onClick={(e) => selectColor(e, item)}
                                    data-testid={value === item.id ? "selected-color" : undefined}
                                ></div>
                            ))}
                        </div>
                    </div>
                )}
                {displaytype == DisplayType.Square && (
                    <div>
                        <h6>{props.header}</h6>
                        <div className="d-flex">
                            {props.itemList.map((item: any, index: any) => (
                                <div
                                    key={index}
                                    className={`${value === item.id
                                            ? "selected-border-square"
                                            : "default-border-square"
                                        }`}
                                    id={item.color}
                                    style={{ backgroundColor: item.color }}
                                    onClick={(e) => selectColor(e, item)}
                                ></div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};
export default RdsCompColorSwitcher;
