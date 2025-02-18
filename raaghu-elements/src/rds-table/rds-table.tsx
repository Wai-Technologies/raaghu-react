import React, { useState } from "react";
import "./rds-table.css";
import RdsIcon from "../rds-icon/rds-icon";

export interface RdsTableProps {
    headerDatas: any[];
    tableDatas: any[];
    colorVariant?: string;
    id?: string;
    striped?: boolean;
    bordered?: boolean;
    iconColorVariant?: string;
    width?: number;
    headerTextColor?: string;
    tableHeightForScroll?: string;
}

const RdsTable = (props: RdsTableProps) => {
    return (
        <div
            key={props.id}
            className={`${props.tableHeightForScroll ? "parentDiv" : ""}  `}
            style={{ height: `${props.tableHeightForScroll}` }}
        >
            <table
                className={`table table-hover mt-0 ${props.tableHeightForScroll ? "tableFixed" : ""
                    }   tableFixed table-${props.colorVariant} ${props.striped ? "table-striped" : ""
                    } ${props.bordered ? "table-bordered" : "table-borderless"}`}
                width={props.width}
            >
                <thead
                    className={`${props.tableHeightForScroll ? "headFixed" : ""}`}

                >
                    <tr>
                        {props.headerDatas.map((headerData) => (
                            <th
                                key={headerData.key}
                                scope="col"
                                className={"pl-4" + " " + "text-" + props.headerTextColor}
                            >
                                {headerData.displayName}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {props.tableDatas.map((tableData) => (
                        <tr key={tableData.id} className="normal-rows">
                            {props.headerDatas.map((headerData) => (
                                <td
                                    key={`${tableData.id}${headerData.key}`}
                                    width={`${headerData.dataType == "text"
                                            ? "40%"
                                            : headerData.dataType == "icon"
                                                ? "20%"
                                                : headerData.dataType == "textNumber"
                                                    ? "20%"
                                                    : ""
                                        }`}
                                    className={`${headerData.dataType == "icon" ? "" : "align-middle"
                                        }`}
                                    style={{
                                        borderLeft: `${headerData.dataType == "icon" ? "solid 1px #E2E2E3" : ""
                                            }`,
                                        padding: `${headerData.dataType == "icon" ? "0.625rem 0.5rem" : ""
                                            }`,
                                    }}
                                >
                                    {headerData.dataType == "icon" && (
                                        <RdsIcon
                                            name={tableData.icon}
                                            height="15px"
                                            width="15px"
                                            fill={true}
                                            stroke={false}
                                            colorVariant={props.iconColorVariant}
                                            isCursorPointer={false}
                                        ></RdsIcon>
                                    )}
                                    {headerData.dataType != "icon" && tableData[headerData.key]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RdsTable;
