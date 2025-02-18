import React, { useState, useEffect } from "react";
import { RdsButton, RdsSelectList, RdsIcon } from "../rds-elements";

export interface RdsCompTypeaheadProps {
    selectItems: Array<{ option: string; value: string; }>;
    onChange?: any;
    label?: string;
    selectedItems?: Array<{ option: string; value: string; }>;
    selectedValue?: Array<{ option: string; value: string; }>;
}

const RdsCompTypeahead = (props: RdsCompTypeaheadProps) => {
    const [selectItems, setSelectItems] = useState<Array<{ option: string; value: string }>>(props.selectItems);
    const [selectedItemList, setSelectedItemList] = useState<Array<{ option: string; value: string }>>(props.selectedItems ?? []);
    const [tempSelectedValue, setTempSelectedValue] = useState("");

    const handleListChange = (value: any) => {
        setTempSelectedValue(value);
    };

    useEffect(() => {
        setSelectedItemList(props.selectedItems ?? [])
        if (props.selectedItems?.length) {
            const tempSelectListItem = props.selectItems.filter((item: any) => !props.selectedItems?.some((itemA: any) => itemA.option == item.option));
            setSelectItems(tempSelectListItem)
        }
        props.onChange && props.onChange(props.selectedItems)
    }, [props.selectedItems])


    const onAddHandlerClick = () => {
        const temp = selectItems.filter((item: any) => (item.value == tempSelectedValue));
        setSelectedItemList(prevList => [...prevList, ...temp]);
        const remainingList = selectItems.filter((item: any) => (item.value !== tempSelectedValue));
        setSelectItems(remainingList);
    };


    const onDeleteIconClick = (e: any) => {
        const temp = selectedItemList.filter((item) => item.value === e);
        const tempItemList = selectedItemList.filter((item) => item.value !== e);
        setSelectItems(prev => [...prev, ...temp]);
        setSelectedItemList(tempItemList);
    };

    useEffect(() => {
        props.onChange && props.onChange(selectedItemList);
    }, [selectedItemList]);

    return (
        <>
            <div>
                <div className="row align-items-end d-flex px-2">
                    <div className="col-lg-11 col-md-11 col-sm-12 mt-2">
                        <RdsSelectList
                            id="selCat"
                            selectedValue={tempSelectedValue}
                            selectItems={selectItems}
                            label={props.label}
                            placeholder="Select Authors"
                            key={`selectItem-${tempSelectedValue}`}
                            onChange={(item: any) => handleListChange(item.value)}>
                        </RdsSelectList>
                    </div>
                    <div className="col-lg-1 col-md-1 col-sm-12 mt-2">
                        <RdsButton
                            label="ADD"
                            block={false}
                            size="medium"
                            type="button"
                            colorVariant="primary"
                            onClick={onAddHandlerClick}
                        ></RdsButton>
                    </div>
                </div>

                {(selectedItemList.length != 0) && (
                    <div className="row mt-3">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col"></th>
                                    <th scope="col" className="ps-2">{props.label}</th>
                                    <th scope="col" className="text-center">Actions</th>
                                </tr>
                            </thead>
                            {
                                selectedItemList.map((item) => (
                                    <tbody key={item.value}>
                                        <tr>
                                            <th></th>
                                            <td scope="col" className="ps-2">{item.option}</td>
                                            <td scope="col" className="text-center">
                                                <RdsIcon
                                                    name="delete"
                                                    height="15px"
                                                    width="15px"
                                                    fill={false}
                                                    stroke={true}
                                                    colorVariant="danger"
                                                    onClick={() => { onDeleteIconClick(item.value); }}
                                                    isCursorPointer={true}
                                                />
                                            </td>
                                        </tr>
                                    </tbody>
                                ))
                            }
                        </table>
                    </div>
                )}
            </div>
        </>
    );
};

export default RdsCompTypeahead;
