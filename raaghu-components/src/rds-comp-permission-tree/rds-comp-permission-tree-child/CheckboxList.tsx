import React from "react";
import Checkbox from "./Checkbox";
// import { CheckboxState } from "../rds-comp-permission-tree";
import styles from "./checkboxlist.module.css";

export type Item = {
    id: number;
    name: string;
    parentId: number;
};

type CheckboxListProps = {
    items: Item[];
    idsToRender?: number[];
    indentLevel?: number;
    onClick?: (id: number) => void;
    getStateForId: (id: number) => any;
};

const CheckboxList: React.FC<CheckboxListProps> = ({
    items,
    getStateForId,
    idsToRender = [],
    indentLevel = 1,
    onClick = () => { },
}) => {
    if (!idsToRender.length) {
        idsToRender = items.filter((i) => !i.parentId).map((i) => i.id);
    }

    const getChildNodes = (parentId: number) => {
        const nodeItems = items.filter((i) => i.parentId === parentId);
        if (!nodeItems.length) return null;
        return (
            <>
                <CheckboxList
                    items={items}
                    idsToRender={nodeItems.map((i) => i.id)}
                    indentLevel={indentLevel + 1}
                    onClick={onClick}
                    getStateForId={getStateForId}
                />
            </>
        );
    };

    return (
        <>
            <ul className={"form-check"} style={{ paddingLeft: indentLevel * 20 }}>
                {idsToRender.map((id) => {
                    const item = items.find((i) => i.id === id);
                    if (!item) return;
                    const checkboxState = getStateForId(id);
                    return (
                        <React.Fragment key={item.id}>
                            <li className="mb-3">
                                {/* <Checkbox
                                    onClick={() => onClick(item.id)}
                                    isChecked={checkboxState === CheckboxState.CHECKED}
                                    isIndeterminate={checkboxState === CheckboxState.INDETERMINATE}
                                /> */}
                                <span className="node-label text-nowrap cursor-pointer ms-2">
                                    {item.name}
                                </span>
                            </li>
                            {getChildNodes(item.id)}
                        </React.Fragment>
                    );
                })}
            </ul>
        </>
    );
};

export default CheckboxList;
