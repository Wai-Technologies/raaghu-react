import React, { useEffect, useState } from "react";
import { RdsCheckbox } from "../rds-elements";

function TreeNode(props: any) {
    const hasChildren = props.node.children && props.node.children.length > 0;
    const [checked, setChecked] = useState(props.node.selected);

    const handlerCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;
        // Update the checked state of the current node
        setChecked(isChecked);

        // Update the array state by calling the callback function
        props.onCheckboxChange && props.onCheckboxChange(props.node, isChecked);
    };

    const isVertical = () => {
        if (props.node.level == 1) {
            if (props.index !== props.listlength) {
                return true;

            } else return false;

        } else {
            if (props.index !== props.listlength) {
                return true;

            } else return false;

        }
    };
    return (<>

        {props.node && (
            <div className="mt-1" key={props.node.data.id}>
                <div className="my-3">
                    <div className="position-relative ">
                        {isVertical() && (<div className="verticalPermi"></div>)}
                        <div className={`${props.node ? `${props.node?.level === 1 ? " " : "horizontalPermi"}` : "" }`}></div>
                        {props.isLastNode && (<div className="verticallPermi"></div>)}
                            <RdsCheckbox
                                label={props.node.label}
                                checked={checked}
                                onChange={handlerCheckbox} />

                        {hasChildren && (
                            <div className="mx-5  mt-1">
                                {props.node.children.map((child: any, id: number) => (
                                    <TreeNode
                                        key={child.data?.id}
                                        node={child}
                                        onCheckboxChange={props.onCheckboxChange}
                                        index={id}
                                        listlength={props.node.children?.length - 1}
                                        isLastNode={props.index == props.listlength}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

        )
        }
    </>
    );
}

export interface RdsCompPermissionTreeProps {
    treeData: any,
    onCheckboxChange?: any,
    changeData?: any
}

function RdsCompPermissionTreeNew(props: RdsCompPermissionTreeProps) {
    const [treeData, setTreeData] = useState(props.treeData);
    useEffect(() => {
        setTreeData(props.treeData);
    }, [props]);

    const handleCheckboxChange = (node: any, isChecked: boolean) => {
        props.onCheckboxChange && props.onCheckboxChange(node, isChecked);
        const updatedTreeData = updateNodeState(treeData, node, isChecked);
        setTreeData(updatedTreeData);
        props.changeData && props.changeData(updatedTreeData);
    };

    const updateNodeState: any = (data: any[], targetNode: any, isChecked: boolean) => {
        return data.map((node) => {
            if (node === targetNode) {
                // Update the selected state of the target node
                return { ...node, selected: isChecked };
            } else if (node.children && node.children.length > 0) {
                // Recursively update the state of child nodes
                const updatedChildren = updateNodeState(node.children, targetNode, isChecked);
                return { ...node, children: updatedChildren };
            }
            return node;
        });
    };

    return (
        <div className="overflow-x-hidden overflow-y-scroll offcanvas-custom-scroll">
            {treeData?.map((node: any, index: number) => (
                <TreeNode
                    key={node.data?.id}
                    node={node}
                    onCheckboxChange={handleCheckboxChange}
                    index={index}
                    listlength={treeData?.length - 1}
                />
            ))}
        </div>
    );
}

export default RdsCompPermissionTreeNew;