import React, { useState } from "react";
import {
    RdsButton,
    RdsLabel,
    RdsSelectList,
} from "../rds-elements";

import "./rds-comp-theme-new.css";
import { useTranslation } from "react-i18next";

export interface RdsCompThemeNewProps {
    StyleList: { option: any, value: any }[];
    WebList: { option: any, value: any }[];
    MenuList: { option: any, value: any }[];
    StatusList: { option: any, value: any }[];
}

const RdsCompThemeNew = (props: RdsCompThemeNewProps) => {
    const { t } = useTranslation();
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
                            onChange={(item: any) => {
                                handleSelectListChange(item.value, "StatusList");
                            }}
                            dataTestId="status-select-list"
                        ></RdsSelectList>
                    </div>
                </div>
                <div className="footer-buttons pb-3 justify-content-end d-flex gap-2 flex-column-reverse flex-lg-row flex-md-column-reverse flex-xl-row flex-xxl-row flex-row bottom-0 pt-0" >
                    <RdsButton
                        class="me-2"
                        label={t("Cancel") || ""}
                        type="button"
                        isOutline={true}
                        colorVariant="primary"
                        size="small"
                        dataTestId="cancel"
                    ></RdsButton>
                    <RdsButton
                        class="me-2"
                        label={t("Save") || ""}
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
