import React, { useState } from "react";
import {
    RdsButton,
    RdsLabel,
    RdsSelectList,
} from "../rds-elements";

import "./rds-comp-theme-new.css";


export interface RdsCompThemeNewProps {
    StyleList: { option: any, value: any }[];
    WebList: { option: any, value: any }[];
    MenuList: { option: any, value: any }[];
    StatusList: { option: any, value: any }[];
}

const RdsCompThemeNew = (props: RdsCompThemeNewProps) => {

    const [formData, setFormData] = useState({
        styleList: "",
        webList: "",
        menuList: "",
        StatusList: "",
    });
    const handleSelectListChange = (value: any, key: any) => {
        setFormData({ ...formData, [key]: value });
    };
    function submitData(event: any) {
        event.preventDefault();
    }
    return (
        <>
            <form data-testid="form" onSubmit={submitData}>
            <div className="custom-content-scroll">
                <div className="row mb-3 pt-4">
                    <div className="col-lg-6 col-md-6 form-group">
                        <RdsLabel
                            label="Style"
                            class="form-label"
                            children={<span className="text-danger">*</span>}
                        ></RdsLabel>
                        <RdsSelectList
                            id="style"
                            label="Select"
                            selectItems={props.StyleList}
                            selectedValue={formData?.styleList}
                            onChange={(item: any) => {
                                handleSelectListChange(item.value, "StyleList");
                            }}
                            dataTestId="style-select-list"
                        ></RdsSelectList>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <RdsLabel
                            label="Public Website Style"
                            class="form-label"
                            children={<span className="text-danger">*</span>}
                        ></RdsLabel>
                        <RdsSelectList
                            id="webL"
                            label="Select"
                            selectItems={props.WebList}
                            selectedValue={formData?.webList}
                            onChange={(item: any) => {
                                handleSelectListChange(item.value, "WebList");
                            }}
                            dataTestId="web-select-list"
                        ></RdsSelectList>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-6 col-md-6 form-group">
                        <RdsLabel
                            label="Menu Placement"
                            class="form-label"
                            children={<span className="text-danger">*</span>}
                        ></RdsLabel>
                        <RdsSelectList
                            id="menuL"
                            label="Select"
                            selectItems={props.MenuList}
                            selectedValue={formData?.menuList}
                            onChange={(item: any) => {
                                handleSelectListChange(item.value, "MenuList");
                            }}
                            dataTestId="menu-select-list"
                        ></RdsSelectList>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <RdsLabel
                            label="Menu Status"
                            class="form-label"
                            children={<span className="text-danger">*</span>}
                        ></RdsLabel>
                        <RdsSelectList
                            id="statl"
                            label="Select"
                            selectItems={props.StatusList}
                            selectedValue={formData?.StatusList}
                            onChange={(item: any) => {
                                handleSelectListChange(item.value, "StatusList");
                            }}
                            dataTestId="status-select-list"
                        ></RdsSelectList>
                    </div>
                </div>
            </div>
            <div className="d-flex flex-column-reverse ps-4 flex-lg-row flex-md-column-reverse flex-row flex-xl-row flex-xxl-row footer-buttons gap-2 mt-3 pb-3">
                         <RdsButton
                        class="me-2"
                        label="Cancel"
                        type="button"
                        isOutline={true}
                        colorVariant="primary"
                        size="small"
                        dataTestId="cancel"
                    ></RdsButton>
                    <RdsButton
                        class="me-2"
                        label="Save"
                        type="submit"
                        isOutline={false}
                        colorVariant="primary"
                        size="small"
                        data-testId="save"
                    ></RdsButton>
                </div>
            </form>
        </>
    );
};

export default RdsCompThemeNew;
