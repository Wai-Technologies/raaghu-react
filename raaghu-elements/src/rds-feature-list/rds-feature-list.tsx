import React, { Fragment } from "react";
import "./rds-feature-list.css";

export interface RdsFeatureListProps {
    heading: string
    itemList: string[]
    columns: number,
    fontStyle?: "italic" | "normal";
    colorVariant?: "primary" | "success" | "danger" | "warning" | "light" | "info" | "secondary" | "dark";
}

const RdsFeatureList = (props: RdsFeatureListProps) => {
    const noOfColumns = (props.columns > 0) ? props.columns : 1;
    const columnArray = (props.columns > 0) ? Array.from(Array(Math.min(props.columns, props.itemList.length)), (_: any, index: number) => index + 1) : [1];
    const listItemInEachRow = props.itemList.length / noOfColumns < 1 ? 1 : Math.ceil(props.itemList.length / noOfColumns);
    const ExtraListElements = props.itemList.length % noOfColumns;
    const fontStyle = props.fontStyle == "italic" ? " fst-italic fw-normal " : " select-container ";
    const color = " text-" + props.colorVariant || "dark";
    return (
        <>
            <div>
                {props.heading && <div className={` RdsFeatureList__Heading ${color}`} role="heading">{props.heading}</div>}
                <div className="row">
                    {columnArray.map(colNumber =>
                        <div key={"col-" + colNumber} className="col" data-testId="column">
                            <ul className="RdsFeatureList__Ul">
                                {props.itemList.map((item, index) =>
                                    <Fragment key={"listitem" + index + "-col" + colNumber}>
                                        {index >= ((colNumber - 1) * listItemInEachRow - ((colNumber - ExtraListElements > 0 && ExtraListElements > 0) ? colNumber - ExtraListElements - 1 : 0))
                                            && index < ((colNumber) * listItemInEachRow - ((colNumber - ExtraListElements > 0 && ExtraListElements > 0) ? colNumber - ExtraListElements : 0))
                                            && <li>
                                                <span className="bullet">&bull;</span>
                                                <span className={fontStyle} >{item}</span>
                                            </li>
                                        }
                                    </Fragment>
                                )}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default RdsFeatureList;
