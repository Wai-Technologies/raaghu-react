import React from "react";
import { RdsIcon } from "../rds-elements";
import "./rds-comp-hierarcy.css";

export interface RdsCompHierarcyProps {
    treeData: any[];
    nodeColor: any;
    ButtonLabel: string;
    mutable?: boolean;
    TreeType?: string;
}

const RdsCompHierarcy = (props: RdsCompHierarcyProps) => {
    const TreeNode = ({ node, key }: any) => {
        const setStateBasedOnMutable = (lastNode: boolean, node: any) => {

            if (!props.mutable && lastNode && node.children.length === 0) {
                return false;
            }
            return true;
        };
        const getNodeColor = () => { };
        return (
            <>
                <div>
                    <div className="d-flex align-items-center">
                        <div
                            className="node-dot bg-success">
                            {node.level !== 1 && (
                                <div className="horizontal-dotted-line"
                                ></div>
                            )}

                            <span
                                className={
                                    node.level !== 1
                                        ? "node-dote-icon"
                                        : "node-dote-icon_with_horizontal_line"
                                }
                            >
                                {" "}
                                <RdsIcon
                                    name={node.children.length > 0 ? "minus" : "plus"}
                                    width="10px"
                                    height="10px"
                                    colorVariant="light"
                                    fill={false}
                                    stroke={true}
                                />{" "}
                            </span>
                        </div>

                        <span
                            className="my-1 node-label"
                        >
                            <span
                                className="mr-4"  >
                                {node.ItemDescription}
                            </span>
                            {(props.mutable === true && props.TreeType == "IconLabel") ||
                                (props.TreeType == "Normal" && (
                                    <i data-bs-toggle="offcanvas"
                                        data-bs-target="#addNestedNodeModal"
                                        className="pl-3 nest-icon bi bi-plus-circle-fill text-secondary font-size-lg pointer"
                                    ></i>
                                ))}

                            {(props.mutable === true && props.TreeType == "IconLabel") ||
                                (props.TreeType == "Normal" && (
                                    <i data-bs-toggle="offcanvas"
                                        data-bs-target="#EditNodeModal"
                                        className="bi bi-pencil m-2"
                                    ></i>
                                ))}

                            {(props.mutable === true && props.TreeType == "IconLabel") ||
                                (props.TreeType == "Normal" && (
                                    <i className="bi bi-trash"
                                    ></i>
                                ))}
                        </span>
                    </div>
                    {setStateBasedOnMutable(key === node.length - 1, node) && (
                        <div className="vertical-dotted-line"></div>
                    )}

                    {node.children?.length > 0 && (
                        <div>
                            <div
                                className="position-relative submenuMargin">
                                {node.children.map((node: any, i: number) => {
                                    return (<>
                                        <TreeNode node={node} key={i} />
                                    </>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>


            </>
        );
    };

    return (
        <>
            <div
                className="position-relative"
                style={{ marginLeft: props.treeData[0].level === 1 ? "0px" : "20px" }}
            >
                {props.treeData.map((node: any, i: number) => (
                    <TreeNode node={node} />
                ))}
            </div>
        </>
    );
};

export default RdsCompHierarcy;
