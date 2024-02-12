import React, { useRef, useState } from "react";
import { RdsIcon } from "../rds-elements";
import { RdsLabel } from "../rds-elements";

export interface DirectoryItem {
    id: string;
    name: string;
    children?: DirectoryItem[];
    hasChildren?: boolean;
}

export interface RdsCompDirectoryListProps {
    items: DirectoryItem[];
    path?: any;
    setMoveId?: any;
    selectedItemId?: string;
    onDragAndDrop?: (sourceId: string, destinationId: string) => void;
}

export const RdsCompDirectoryList = (props: RdsCompDirectoryListProps) => {
    const [expandedItems, setExpandedItems] = useState<string[]>([]);
    const draggingItem = useRef<string | null>(null);

    const handleClick = (id: string, name: string) => () => {

        const isExpanded = expandedItems.includes(id);
        if (isExpanded) {
            setExpandedItems(expandedItems.filter((item) => item !== id));
        } else {
            setExpandedItems([...expandedItems, id]);
        }
        props.path({ id, name });
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

    const renderDirectoryItem = (item: DirectoryItem) => {
        const hasChildren = item.children && item.children.length > 0;
        const isExpanded = expandedItems.includes(item.id);
        const isSelected = props.selectedItemId === item.id;

        return (
            <div key={item.id}>
                <div
                    draggable
                    onDragStart={(e) => handleDragStart(e, item.id)}
                    onDragOver={(e) => handleDragOver(e, item.id)}
                    onDrop={(e) => handleDrop(e, item.id)}
                    className={`d-flex align-items-center cursor-pointer pb-3 ${isSelected ? "text-bg-white  cursor-pointer pb-3" : ""
                        }`}
                    onClick={handleClick(item.id, item.name)}
                >
                    {hasChildren && (
                        <button
                            className="me-3 border-0 bg-transparent cursor-pointer"
                            onClick={handleClick(item.id, item.name)}
                        >
                            <RdsIcon
                                name={isExpanded ? "chevron_down" : "chevron_right"}
                                height="12px"
                                width="12px"
                                fill={false}
                                stroke={true}
                                onClick={handleClick(item.id, item.name,)}
                                dataTestId="collapse-icon"
                            />
                        </button>
                    )}
                    <RdsIcon
                        name="folder"
                        height="30px"
                        width="20px"
                        fill={false}
                        stroke={true}
                        colorVariant={isSelected ? "primary" : undefined}
                        onClick={handleClick(item.id, item.name)}
                    />
                    <RdsLabel
                        class="ps-3 pe-2 cursor-pointer"
                        label={item.name}

                    />
                    {item.children && (
                        <RdsLabel label={`(${item.children.length})`} />
                    )}
                </div>

                {item.children && isExpanded && (

                    <RdsCompDirectoryList
                        items={item.children || []}
                        path={props.path}
                        selectedItemId={props.selectedItemId}
                        onDragAndDrop={props.onDragAndDrop}
                    />

                )}
            </div>
        );
    };

    const renderDirectoryItems = (items: DirectoryItem[]) => {
        return items?.map(renderDirectoryItem);
    };

    return <ul className="pt-1 cursor-pointer file-folder ps-4 ms-3 pb-3">{renderDirectoryItems(props.items)}</ul>;
};

export default RdsCompDirectoryList;
