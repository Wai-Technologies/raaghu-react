import React, { useRef, useState } from "react";
import { RdsButtonGroup } from "../rds-elements";
import { RdsLabel } from "../rds-elements";
import { useTranslation } from "react-i18next";

export interface FileManagementTree {
    id: string;
    name: string;
    children?: FileManagementTree[];
    hasChildren?: boolean;
    offId?: any
}

export interface RdsCompFileManagementTreeProps {
    items: FileManagementTree[];
    path?: ({id,  name}:any) => void;
    setMoveId?: any;
    selectedItemId?: string;
    onDragAndDrop?: (sourceId: string, destinationId: string) => void;
    offId?: any;

    onNodeEdit?: any;
    onDeleteNode?: any
}

export const RdsCompFileManagementTree = (props: RdsCompFileManagementTreeProps) => {
    const firstLevelDirectoryIds = props.items.map((item) => item.id);
    const {  } = useTranslation();
    const handlerExtraBackdrop = () => {
        const allBackdrops = document.querySelectorAll(".offcanvas-backdrop, .modal-backdrop");
        if (allBackdrops.length > 1) {
            for (let i = 0; i < allBackdrops.length - 1; i++) {
                allBackdrops[i].remove();
            }
        }
    };
    const [expandedItems, setExpandedItems] = useState<string[]>(firstLevelDirectoryIds);
    const draggingItem = useRef<string | null>(null);

    const handleClick = (id: string, name: string) => () => {

        const isExpanded = expandedItems.includes(id);
        if (isExpanded) {
            setExpandedItems(expandedItems.filter((item) => item !== id));
        } else {
            setExpandedItems([...expandedItems, id]);
        }
        props.path && props.path({ id, name });

    };

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, id: string) => {
        draggingItem.current = id;
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>, id: string) => {
        e.preventDefault();
    };
    const handleDrop = (e: React.DragEvent<HTMLDivElement>, id: string) => {
        e.preventDefault();
        if (draggingItem.current !== null) {
            if (props.onDragAndDrop) {
                props.onDragAndDrop(draggingItem.current, id);
                props.setMoveId(id);
            }
            draggingItem.current = null;
        }
    };
    const buttonGroupList = [
        {
            id: 'radio1',
            databstoggle: 'offcanvas',
            ariacontrols: `a${props.offId}`,
            databstarget: `#a${props.offId}`,
            label: (''),
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
            id: 'radio2',
            label: (''),
            name: 'btnradio',
            checked: false,
            icon: "pencil",
            iconWidth: "14px",
            iconHeight: "14px",
            colorVariant: "light"
        },
        {
            databstoggle: 'offcanvas',
            ariacontrols: `#c${props.offId}`,
            databstarget: `#c${props.offId}`,
            id: 'radio3',
            label: (''),
            name: 'btnradio',
            checked: false,
            icon: "move",
            iconWidth: "14px",
            iconHeight: "14px",
            colorVariant: "light"
        },
        {
            databstoggle: 'modal',
            ariacontrols: '#deleteTreeNode',
            databstarget: '#deleteTreeNode',
            id: 'radio4',
            label: (''),
            name: 'btnradio',
            checked: false,
            icon: "delete",
            iconWidth: "14px",
            iconHeight: "14px",
            colorVariant: "light"
        }
    ]

    const [name, setName] = useState("");
    const handlerButtonGroupClick = (e: any, id: any) => {
                handlerExtraBackdrop();
    }
    interface RenderDirectoryItemProps {
        item: FileManagementTree; // Assuming FileManagementTree is a type or interface
        siblings: number;
        childIndex: number;
    }

    const RenderDirectoryItem = (prop: RenderDirectoryItemProps) => {
        const isExpanded = expandedItems.includes(prop.item.id);
        const notLastNode = (prop.siblings - 1) !== prop.childIndex;

        return (
            <div key={prop.item.id}>
                <div className="position-relative">
                    <div className="verticalNodefile"></div>
                    <div className=" align-items-top mt-3">
                        <div className="FileNode-items d-flex">
                            <div className="FileNode_dot" >

                                <div className="NodeHorizontal" ></div>
                                <div className={notLastNode ? "verticalNodeSiblingfile" : ''}></div>
                            </div>
                            <div className="d-xxl-flex d-xl-flex d-lg-flex d-md-flex cursor-pointer file-tree">
                                <RdsLabel
                                    class="ps-1 pe-1 cursor-pointer"
                                    label={prop.item.name}
                                    onClick={handleClick(prop.item.id, prop.item.name)}
                                />
                                {prop.item.children && (
                                    <RdsLabel
                                        onClick={handleClick(prop.item.id, prop.item.name)} />
                                )}
                                <span className=" ms-3 node-icon1 btn-group-size pb-0 "
                                    onClick={handleClick(prop.item.id, prop.item.name)}
                                >
                                    <RdsButtonGroup
                                        buttonGroupItems={buttonGroupList}
                                        colorVariant="primary"
                                        isOutline={true}
                                        role="button"
                                        size="small"
                                        vertical={false}
                                        onButtonClick={handlerButtonGroupClick}
                                    />
                                </span>
                            </div>
                        </div>
                        {prop.item.children && isExpanded && (

                            <RdsCompFileManagementTree
                                items={prop.item.children || []}
                                path={props.path}
                                selectedItemId={props.selectedItemId}
                                onDragAndDrop={props.onDragAndDrop}
                                offId={props.offId}
                            />
                        )}
                    </div>
                </div>
            </div>
        );
    };


    const renderDirectoryItems = (items: FileManagementTree[] | undefined) => {
        return items?.map((item: any, index: number) => <RenderDirectoryItem item={item} siblings={items.length} childIndex={index} />) || null;
    };


    return <ul className="pt-1 cursor-pointer file-folder pb-3">{renderDirectoryItems(props.items)}</ul>;
};

export default RdsCompFileManagementTree;
