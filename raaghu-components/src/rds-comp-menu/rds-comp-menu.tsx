import { RdsCheckbox, RdsSelectList } from "../rds-elements";
import React, { useState, useEffect } from "react";
import { RdsInput, RdsButton } from "../rds-elements";
import { useTranslation } from "react-i18next";
export interface RdsCompMenuProps {
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
const RdsCompMenu = (props: RdsCompMenuProps) => {
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
    const isUrlValid = (url: any) => {
        if (!url || url.length === 0|| !/^(ftp|http|https):\/\/[^ "]+$/.test(url)) {
            return false;
        }
        return true;
    }
  const  isDisplayNameValid = (displayName: any) => {
        if (!displayName || displayName.length === 0) {
            return false;
        }
        return true;
    }

const isFormValid =isUrlValid(data?.url)&& isDisplayNameValid(data?.displayName);
    return (
        <>
            <div className="custom-content-scroll">
                <div className="row">
                    <div className="col-md-12">
                        <RdsInput
                            name="URL"
                            label={true}
                            value={data?.url}
                            placeholder="Enter Url"                           
                            onChange={(e) => handlerChangeInput(e, "url")}
                            dataTestId="url"
                            validatonPattern={/^(ftp|http|https):\/\/[^ "]+$/}                   
                            validationMsg="Enter valid url"
                            required={true}
                        />
                    </div>
                    <div className="col-md-12 mb-2">
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
                    <div className="col-md-12">
                        <RdsInput
                            name="Display Name"
                            label={true}
                            value={data?.displayName}
                            placeholder={("Enter Display Name")}                            
                            required={true}
                            onChange={(e) => handlerChangeInput(e, "displayName")}
                            dataTestId="display-name"
                            reset={inputReset}                           
                        />
                    </div>
                    <div className="col-md-12 pt-1">
                        <RdsCheckbox
                            labelText="Active"
                            onChange={(e) => {
                                handlerChangeActive(e.target.checked);
                            }}
                            checked={data?.isActive}
                            dataTestId="active"
                        ></RdsCheckbox>
                    </div>
                    <div className="col-md-12">
                        <RdsInput
                            name="Icon"
                            label={true}
                            value={data?.icon}
                            placeholder={("Enter Icon")}                           
                            onChange={(e) => handlerChangeInput(e, "icon")}
                            dataTestId="enter-icon"
                        />
                    </div>
                    <div className="col-md-12">
                        <RdsInput
                            name="Target"
                            label={true}
                            value={data?.target}
                            placeholder="Enter Target"                            
                            onChange={(e) => handlerChangeInput(e, "target")}
                            dataTestId="target"
                        />
                    </div>
                    <div className="col-md-12">
                        <RdsInput
                            name="Element ID"
                            label={true}
                            value={data?.elementId}
                            placeholder="Enter Element ID"                            
                            onChange={(e) => handlerChangeInput(e, "elementId")}
                            dataTestId="enter-id"
                        />
                    </div>
                    <div className="col-md-12">
                        <RdsInput
                            name="Css Class"
                            label={true}
                            value={data?.cssClass}
                            placeholder="Enter Css Class"                            
                            onChange={(e) => handlerChangeInput(e, "cssClass")}
                            dataTestId="enter-css-class"
                        />
                    </div>
                </div>
            </div>

            <div className="d-flex flex-column-reverse ps-4 flex-lg-row flex-md-column-reverse flex-row flex-xl-row flex-xxl-row footer-buttons gap-2 mt-3 pb-3 p-4">
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
                    isDisabled={!isFormValid}
                    colorVariant="primary"
                    class="me-2"
                    onClick={(e: any) => emitSaveData(e)}
                    dataTestId="save"
                ></RdsButton>
            </div>
        </>
    );
};

export default RdsCompMenu;
