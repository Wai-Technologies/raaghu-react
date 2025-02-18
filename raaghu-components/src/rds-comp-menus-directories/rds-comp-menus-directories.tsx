import React, { useState } from "react";
import { RdsIcon, RdsButtonGroup } from "../rds-elements";
import { useTranslation } from "react-i18next";

export interface RdsCompMenuDirectoryProps {
    items?: any;
    offId: string;
    onCreateSubMenu: (data: any) => void;
    onDeleteMenu: (id: any) => void;
    onMenuEdit: (data: any) => void;
}

const RdsCompMenuDirectory = (props: RdsCompMenuDirectoryProps) => {

    const [expandedItems, setExpandedItems] = useState<string[]>([]);
    const buttonGroupList = [{
        id: 'plus',
        databstoggle: 'offcanvas',
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
        databstarget: `#b${props.offId}`,
        id: 'edit',
        label: (''),
        name: 'btnradio',
        checked: false,
        icon: "pencil",
        iconWidth: "14px",
        iconHeight: "14px",
        colorVariant: "light"
    },
    {
        databstoggle: 'modal',
        databstarget: "#deleteMenu",
        id: 'delete',
        label: (''),
        name: 'btnradio',
        checked: false,
        icon: "delete",
        iconWidth: "14px",
        iconHeight: "14px",
        colorVariant: "light"
    }
    ];
    const handlerButtonGroupClick = (e: any, id: any, item: any) => {
        if (id == 'plus') {
            props.onCreateSubMenu && props.onCreateSubMenu(item?.data)
        }
       else if (id == 'edit') {
            props.onMenuEdit && props.onMenuEdit(item?.data)
        }
        else if (id == 'delete') {
            props.onDeleteMenu && props.onDeleteMenu(item?.data?.id)
        }
    }

    const handleClick = (id: string) => () => {
        if (expandedItems?.includes(id)) {
            setExpandedItems(expandedItems.filter((item) => item !== id));
        } else {
            setExpandedItems([...expandedItems, id]);
        }
    };

    const renderDirectoryItem = (item: any) => (
        <>
            <div key={item.data.id} className="d-flex align-items-center mb-3">
                {item?.children?.length != 0 && (
                    <button
                        className=" me-1 border-0 bg-transparent"
                        onClick={handleClick(item.data.id)}
                    >
                        <RdsIcon
                            name={expandedItems?.includes(item.data.id) ? "chevron_up" : "chevron_down"}
                            height="8px"
                            width="12px"
                            fill={false}
                            stroke={true}
                            colorVariant="primary"
                            onClick={handleClick(item.data.id)}
                            isCursorPointer={true}
                        />
                    </button>
                )}
                <span className="mx-1">
                    <RdsIcon
                        name="folder"
                        height="17px"
                        width="20px"
                        fill={false}
                        stroke={true}
                        colorVariant="primary"
                        onClick={handleClick(item.data.id)}
                        dataTestId="folder-icon"
                        isCursorPointer={true}
                    />
                </span>
                <span className="mt-1 ms-2 node-label d-flex">
                    <span className="my-1">{item.data.displayName}</span>
                    <span className="node-icon ms-2">

                        <RdsButtonGroup
                            buttonGroupItems={buttonGroupList}
                            colorVariant="primary"
                            isOutline={true}
                            role="button"
                            size="small"
                            vertical={false}
                            onButtonClick={(e: any, id: any) => handlerButtonGroupClick(e, id, item)}
                        />
                    </span>
                </span>
            </div>
            {item.children?.length > 0 && expandedItems?.includes(item.data.id) && (
                <ul className="pl-0" id="mobileviewmenusdirectory">
                    <RdsCompMenuDirectory
                        items={item.children}
                        offId={props.offId}
                        onCreateSubMenu={props.onCreateSubMenu}
                        onDeleteMenu={props.onDeleteMenu}
                        onMenuEdit={props.onMenuEdit}
                    />
                </ul>
            )}
        </>
    );

    const renderDirectoryItems = (items: any) => {
        return items.map(renderDirectoryItem);
    };

    return <ul>{renderDirectoryItems(props.items)}</ul>;
};

export default RdsCompMenuDirectory;
