import React from "react";
import {
    RdsIcon,
    RdsButton,
    RdsButtonGroup,
} from "../rds-elements";
import "./rds-comp-organization-tree.css";
export interface RdsCompOrganizationTreeProps {
    counter?: number;
    nodeColor: any[];
    organizationTreeData: any[];
    OrganizationTreeType?: any;
    OrganizationTreeLabeles?: any;
    mutable: boolean;
    offId?: any;
    buttonLabel?: string;
    onSelectNode?: (item: any) => void;
    onDeleteNode?: (id: any) => void;
    onNodeEdit?: (data: any) => void;
    onCreateNode?: (node: any) => void;
    onCreateSubUnit?: (node: any) => void;
    onCreateRootNode?: () => void;
}

const RdsCompOrganizationTree = (props: RdsCompOrganizationTreeProps) => {
    const handlerExtraBackdrop = () => {
        const allBackdrops = document.querySelectorAll(".offcanvas-backdrop, .modal-backdrop");
        if (allBackdrops.length > 1) {
            for (let i = 0; i < allBackdrops.length - 1; i++) {
                allBackdrops[i].remove();
            }
        }
    };
    const TreeNode = ({
        node,
        index,
        listlength,
        isLastParentNode
    }: {
        node: any;
        index: any;
        listlength: any;
        isLastParentNode?: boolean
    }) => {
        const hasChildren = node.children?.length > 0;
        const lastnode = node.children?.length === 0;
        const isLastChild = index === listlength;
        if (isLastParentNode) {
        }

        const buttonGroupList = [
            {
                id: "plus",
                databstoggle: 'offcanvas',
                ariacontrols: `a${props.offId}`,
                databstarget: `#a${props.offId}`,
                label: '',
                name: 'btnradio',
                checked: true,
                icon: "plus",
                iconWidth: "14px",
                iconHeight: "14px",
                colorVariant: "light",


            },
            {
                databstoggle: 'offcanvas',
                ariacontrols: `b${props.offId}`,
                databstarget: `#b${props.offId}`,
                id: 'edit',
                label: '',
                name: 'btnradio',
                checked: false,
                icon: "pencil",
                iconWidth: "14px",
                iconHeight: "14px",
                colorVariant: "light"
            },
            {
                databstoggle: 'modal',
                ariacontrols: '#deleteTreeNode',
                databstarget: '#deleteTreeNode',
                id: "delete",
                label: '',
                name: 'btnradio',
                checked: false,
                icon: "delete",
                iconWidth: "14px",
                iconHeight: "14px",
                colorVariant: "light"
            }
        ]
        const mobileList = [
            {
                id: "plus",
                databstoggle: 'offcanvas',
                ariacontrols: `a${props.offId}`,
                databstarget: `#a${props.offId}`,
                label: 'New',
                name: 'btnradio',
                checked: true,
            },
            {
                databstoggle: 'offcanvas',
                ariacontrols: `b${props.offId}`,
                databstarget: `#b${props.offId}`,
                id: 'edit',
                label: 'Edit',
                name: 'btnradio',
                checked: false,
            },
            {
                databstoggle: 'modal',
                ariacontrols: '#deleteTreeNode',
                databstarget: '#deleteTreeNode',
                id: "delete",
                label: 'Delete',
                name: 'btnradio',
                checked: false,
            }
        ]
        const isVertical = () => {
            if (node.level == 1) {

                return true;
            } else if (index !== listlength) {
                return true;
            }
            else return false;
        }

        const handlerButtonGroupClick = (e: any, id: any, node: any) => {
            handlerExtraBackdrop();
            if (id == 'plus') {
                props.onCreateNode && props.onCreateNode(node.data)
            }
            if (id == 'edit') {
                props.onNodeEdit && props.onNodeEdit(node.data);
            }
            if (id == 'delete') {
                props.onDeleteNode && props.onDeleteNode(node.data.id);
            }
        }

        const handlerButtonGroupClickdrop = (e: any, id: any, node: any) => {
            handlerExtraBackdrop();
            if (id == 'plus') {
                props.onCreateNode && props.onCreateNode(node.data);
            }
            if (id == 'edit') {
                props.onNodeEdit && props.onNodeEdit(node.data);
            }
            if (id == 'delete') {
                props.onDeleteNode && props.onDeleteNode(node.data.id);
            }
        };

        return (
            <>
                {node && (
                    <>
                        <li key={node.data.id}>
                            <div className="position-relative ">
                                {isVertical() && (<div className="vertical"></div>)}
                                <div className="d-flex align-items-top py-2 main-list">
                                    <div className="align-items-baseline ps-1 node-items d-flex justify-content-between w-100">
                                        <div className="d-flex">
                                            <div className="node_dot" >
                                                <div className={`${node ? `${node?.level === 1 ? " " : "horizontal"}` : ""}`}></div>
                                                {isLastParentNode && (<div className="verticall"></div>)}
                                            </div>
                                            <div className="d-flex">
                                                <span className="mbdropdown mt-1">
                                                    {hasChildren && (
                                                        <RdsIcon
                                                            name="plussquare"
                                                            fill={false}
                                                            stroke={true}
                                                            height="14px"
                                                            width="14px"

                                                        ></RdsIcon>)}
                                                    {lastnode && (
                                                        <RdsIcon
                                                            name="minussquare"
                                                            fill={false}
                                                            stroke={true}
                                                            height="14px"
                                                            width="14px"

                                                        ></RdsIcon>)}
                                                </span>
                                                <span className="ms-2 node-label d-flex">
                                                    <div className="NodeLabel">
                                                        <div className="cursor-pointer "
                                                            onClick={() => { props.onSelectNode && props.onSelectNode(node); }}
                                                        >
                                                            {node.data.displayName || node.data.name}
                                                        </div>
                                                    </div>
                                                    <span className=" node-icon1 btn-group-size pb-0 spacingbetweenbtn">
                                                        <RdsButtonGroup
                                                            buttonGroupItems={buttonGroupList}
                                                            colorVariant="primary"
                                                            isOutline={true}
                                                            role="button"
                                                            size="small"
                                                            vertical={false}
                                                            onButtonClick={(e, id) => handlerButtonGroupClick(e, id, node)}
                                                        />
                                                    </span>
                                                </span>
                                            </div>
                                        </div>
                                        {/* <div className="btn-group dropstart mbdropdown">
                                            <button
                                                className="btn btn-sm btn-icon border-0 three-dot-btn"
                                                type="button"
                                                aria-expanded="false"
                                                data-bs-toggle="dropdown"
                                                data-bs-auto-close="true"
                                                data-bs-boundary="clippingParents"
                                                id="dropdownMenuButton"
                                                data-testid="action-btn">
                                                <RdsIcon
                                                    name={"three_dots"}
                                                    height="14px"
                                                    width="14px"
                                                    stroke={true}
                                                    fill={true}
                                                    tooltip={false}

                                                />
                                            </button>
                                            <ul aria-labelledby="dropdownMenuButton" className="dropdown-menu"> {mobileList.map((button, index) => (<li data-bs-toggle={button.databstoggle} data-bs-target={button.databstarget} aria-controls={button.ariacontrols} key={index}><a className="dropdown-item" onClick={(e) => handlerButtonGroupClickdrop(e, button.id, node)}>{button.label}</a> </li>))} </ul>
                                           </div> */}
                                    </div>
                                </div>

                                <div className="leftSpace">
                                    {hasChildren && (

                                        <div key={node.data.id} className="unitName">
                                            <div
                                                className="position-relative mb-0 list-style ps-0">
                                                {node?.children?.map((tree: any, id: any) => (<>

                                                    <div key={tree.data.id}>
                                                        <TreeNode
                                                            node={tree}
                                                            index={id}
                                                            listlength={node?.children?.length - 1}
                                                            isLastParentNode={index == listlength}
                                                        ></TreeNode>
                                                    </div>
                                                </>
                                                ))}
                                                {hasChildren && (
                                                    <div></div>
                                                )}
                                            </div>
                                        </div>

                                    )}</div>
                            </div>
                        </li>
                    </>
                )}
            </>
        );
    };

    return (
        <>
            <ul className="position-relative mb-0 list-style">
                {props.organizationTreeData?.map((tree, index) => (
                    <div key={tree.data.id}>

                        <TreeNode
                            node={tree}
                            index={index}
                            listlength={props.organizationTreeData?.length - 1}
                        ></TreeNode>
                    </div>
                ))}
                {props.organizationTreeData?.length !== 0 && (
                    <div></div>
                )}
            </ul>

            {/* {props.mutable === true && (<> */}
            <div>
                <div className="mb-2 mt-3">
                    <div className="unitName">
                        <RdsButton
                            iconHeight="10px"
                            iconWidth="10px"
                            iconColorVariant="dark"
                            type={"button"}
                            icon={"Plus"}
                            size={"small"}
                            colorVariant={"primary"}
                            label={props.buttonLabel}
                            data-bs-dismiss="offcanvas"
                            databstoggle="offcanvas"
                            databstarget={`#d${props.offId}`}
                            ariacontrols={`d${props.offId}`}
                            onClick={() => {
                                handlerExtraBackdrop();
                                props.onCreateRootNode && props.onCreateRootNode();
                            }}
                        />
                    </div>
                </div>
            </div>
            {/* </>
            )} */}
        </>
    );
};

export default RdsCompOrganizationTree;
