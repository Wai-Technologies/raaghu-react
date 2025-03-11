import React, { useEffect, useState } from "react";
import { RdsCheckbox } from "../rds-elements";

function TreeNode(props: any) {
    const hasChildren = props.node.children && props.node.children.length > 0;
    const [checked, setChecked] = useState(props.node.selected);

    useEffect(() => {
        setChecked(props.node.selected);
    }, [props.node.selected]);

    useEffect(() => {
        // Update the state of this node based on its children
        if (hasChildren) {
            const updatedChildren = props.node.children.some((child: any) => child.selected);
            setChecked(updatedChildren);
        }
    }, [props.node.children]);

    const handlerCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;
        setChecked(isChecked);
        props.onCheckboxChange && props.onCheckboxChange(props.node, isChecked);
    
        // Update the state of all child nodes to match the state of the root node
        if (hasChildren) {
            props.node.children.forEach((child: any) => {
                props.onCheckboxChange && props.onCheckboxChange(child, isChecked);
            });
        }
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
                        <div className={`${props.node ? `${props.node?.level === 0 ? " " : "horizontalPermi"}` : "" }`}></div>
                        {props.isLastNode && (<div className="verticallPermi"></div>)}
                            <RdsCheckbox
                                labelText={props.node.label}
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

function RdsCompPermissionTree(props: RdsCompPermissionTreeProps) {
    const [treeData, setTreeData] = useState(props.treeData);
    useEffect(() => {
        setTreeData(props.treeData);
    }, [props]);

    const handleCheckboxChange = (node: any, isChecked: boolean) => {
        const updatedTreeData = updateNodeState(treeData, node, isChecked);
        setTreeData(updatedTreeData);
        props.changeData && props.changeData(updatedTreeData);
    };
    
    const updateNodeState: any = (data: any[], targetNode: any, isChecked: boolean) => {
        return data.map((node) => {
            if (node === targetNode) {
                // Update the selected state of the target node
                node.selected = isChecked;
                // Update the selected state of all child nodes if any
                if (node.children && node.children.length > 0) {
                    node.children = updateChildNodes(node.children, isChecked);
                }
                // Update the state of parent node if it has any
                if (node.parent) {
                    updateParentNodeState(node.parent, data);
                }
                return node;
            } else if (node.children && node.children.length > 0) {
                // Recursively update the state of child nodes
                const updatedChildren = updateNodeState(node.children, targetNode, isChecked);
                node.children = updatedChildren;
                // If any child is selected, select the parent node
                if (updatedChildren.some((child: any) => child.selected)) {
                    node.selected = true;
                } else {
                    // If none of the grandchildren are selected, deselect the parent node
                    node.selected = false;
                }
                return { ...node, children: updatedChildren };
            }
            return node;
        });
    };
    
    const updateChildNodes = (children: any[], isChecked: boolean) => {
        return children.map(child => {
            child.selected = isChecked;
            if (child.children && child.children.length > 0) {
                // Recursively update the state of child nodes
                child.children = updateChildNodes(child.children, isChecked);
            }
            return child;
        });
    };

    const updateParentNodeState = (parentNode: any, data: any[]) => {
        if (parentNode) {
            const allChildrenSelected = parentNode.children.every((child: any) => child.selected);
            parentNode.selected = allChildrenSelected;
            // Update the state of the parent's parent if it has any
            if (parentNode.parent) {
                updateParentNodeState(parentNode.parent, data);
            }
        }
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
export default RdsCompPermissionTree;
