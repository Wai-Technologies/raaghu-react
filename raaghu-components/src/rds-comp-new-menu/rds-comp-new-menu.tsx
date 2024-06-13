import { RdsCheckbox, RdsSelectList } from "../rds-elements";
import React, { useState, useEffect } from "react";
import { RdsInput, RdsButton } from "../rds-elements";
import { useTranslation } from "react-i18next";
export interface RdsCompNewMenuProps {
    onSubmit: any;
    menusData: any;
    valueType?: any;
    reset?: boolean;
    onCancel?: any
    menuPage: {
        option: string;
        value: number;
    }[];
}
export interface MenuPage {
    option: string;
    value: number;
}
const RdsCompNewMenu = (props: RdsCompNewMenuProps) => {
    const [data, setData] = useState(props.menusData);
    const [inputReset, setInputReset] = useState(props.reset);
    const [menuPageList, setMenuPageList] = useState<MenuPage[]>([]);

    useEffect(() => {
        setMenuPageList(props.menuPage);
    }, [props.menuPage]);

    useEffect(() => {
        setInputReset(props.reset)
    }, [props.reset])

    useEffect(() => {
        setData(props.menusData);
    }, [props.menusData]);

    const handlerChangeInput = (e: any, key: any) => {
        setData({ ...data, [key]: e.target.value });
    };

    const handlerChangeActive = (e: any) => {
        setData({ ...data, isActive: e });
    };

    function handlePageId(value: any) {
        setData({ ...data, pageId: value, });
    }

    function emitSaveData(event: any) {
        event.preventDefault();
        props.onSubmit && props.onSubmit(data);
        setInputReset(!inputReset);
        setData({
            url: "",
            pageId: 0,
            displayName: "",
            isActive: false,
            icon: "",
            target: "",
            elementId: "",
            cssClass: "",
        });
    }

    return (
        <>
            <div className="custom-content-scroll">
                <div className="row">
                    <div className="col-md-12 mb-3">
                        <RdsInput
                            label="URL"
                            value={data?.url}
                            placeholder="Enter Url"
                            name="url"
                            onChange={(e) => handlerChangeInput(e, "url")}
                            dataTestId="url"
                        />
                    </div>
                    <div className="col-md-12 mb-3">
                        <RdsSelectList
                            id="selpa"
                            label="Page"
                            placeholder="Select Page"
                            selectItems={menuPageList}
                            isSearchable={true}
                            selectedValue={data?.pageId}
                            onChange={(item: any) => handlePageId(item.value)}
                        ></RdsSelectList>
                    </div>
                    <div className="col-md-12"><hr /></div>
                    <div className="col-md-12 mb-3">
                        <RdsInput
                            label="Display Name"
                            value={data?.displayName}
                            placeholder={("Enter Display Name") || ""}
                            name="displayName"
                            required={true}
                            onChange={(e) => handlerChangeInput(e, "displayName")}
                            dataTestId="display-name"
                            reset={inputReset}
                        />
                    </div>
                    <div className="col-md-12 mb-3">
                        <RdsCheckbox
                            label="Active"
                            onChange={(e) => {
                                handlerChangeActive(e.target.checked);
                            }}
                            checked={data?.isActive}
                            dataTestId="active"
                        ></RdsCheckbox>
                    </div>
                    <div className="col-md-12 mb-3">
                        <RdsInput
                            label="Icon"
                            value={data?.icon}
                            placeholder={("Enter Icon") || ""}
                            name="icon"
                            onChange={(e) => handlerChangeInput(e, "icon")}
                            dataTestId="enter-icon"
                        />
                    </div>
                    <div className="col-md-12 mb-3">
                        <RdsInput
                            label="Target"
                            value={data?.target}
                            placeholder="Enter Target"
                            name="target"
                            onChange={(e) => handlerChangeInput(e, "target")}
                            dataTestId="target"
                        />
                    </div>
                    <div className="col-md-12 mb-3">
                        <RdsInput
                            label="Element ID"
                            value={data?.elementId}
                            placeholder="Enter Element ID"
                            name="elementId"
                            onChange={(e) => handlerChangeInput(e, "elementId")}
                            dataTestId="enter-id"
                        />
                    </div>
                    <div className="col-md-12 mb-3">
                        <RdsInput
                            label="Css Class"
                            value={data?.cssClass}
                            placeholder="Enter Css Class"
                            name="cssClass"
                            onChange={(e) => handlerChangeInput(e, "cssClass")}
                            dataTestId="enter-css-class"
                        />
                    </div>
                </div>
            </div>

            <div className="d-flex flex-column-reverse ps-4 flex-lg-row flex-md-column-reverse flex-row flex-xl-row flex-xxl-row footer-buttons gap-2 mt-3 pb-3">
                <RdsButton
                    label="Cancel"
                    databsdismiss="offcanvas"
                    type={"button"}
                    size="small"
                    isOutline={true}
                    colorVariant="primary"
                    class="me-2"
                    dataTestId="cancel"
                    onClick={(e) => props?.onCancel && props?.onCancel(e)}
                ></RdsButton>
                <RdsButton
                    label="Save"
                    type={"button"}
                    size="small"
                    databsdismiss="offcanvas"
                    isDisabled={!data?.displayName}
                    colorVariant="primary"
                    class="me-2"
                    onClick={(e: any) => emitSaveData(e)}
                    dataTestId="save"
                ></RdsButton>
            </div>
        </>
    );
};

export default RdsCompNewMenu;
