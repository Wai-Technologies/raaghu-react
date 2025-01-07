import React, { useState } from "react";
import {
    RdsButton,
    RdsSelectList,
} from "../rds-elements";

import "./rds-comp-theme.css";


export interface RdsCompThemeProps {
    StyleList: { option: any, value: any }[];
    WebList: { option: any, value: any }[];
    MenuList: { option: any, value: any }[];
    StatusList: { option: any, value: any }[];
    onSaveHandler?: (data: any) => void;
}

const RdsCompTheme = (props: RdsCompThemeProps) => {
    ;
    const [formData, setFormData] = useState({
        StyleList: "",
        WebList : "",       
        MenuList: "",
        StatusList: "",
    });
    const handleSelectListChange = (value: any, key: any) => {
        setFormData({ ...formData, [key]: value });
    };


    function emitSaveData(event: any) {
        event.preventDefault();
        props.onSaveHandler && props.onSaveHandler(formData);
        setFormData({
            StyleList: "", 
            WebList: "",
            MenuList: "",
            StatusList: "",
        });
    }

    return (
        <>
            <form>
                <div className="custom-content-scroll">
                    <div className="row pt-4">
                        <div className="col-lg-6 col-md-6 form-group">
                            <RdsSelectList
                                id="style"
                                label="Style"
                                placeholder="Select Style"
                                selectItems={props.StyleList}
                                selectedValue={formData?.StyleList} 
                                key={`style-${formData.StyleList}`} 
                                onChange={(item: any) => {
                                    handleSelectListChange(item.value, "StyleList");
                                }}
                            />
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <RdsSelectList
                                id="webL"
                                label="Public Website Style"
                                placeholder="Select Public Website Style"
                                selectItems={props.WebList}
                                selectedValue={formData?.WebList}
                                key={`web-${formData.WebList}`}
                                onChange={(item: any) => {
                                    handleSelectListChange(item.value, "WebList");
                                }}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-6 col-md-6 form-group">
                            <RdsSelectList
                                id="menuL"
                                label="Menu Placement"
                                placeholder="Select Menu Placement"
                                selectItems={props.MenuList}
                                selectedValue={formData?.MenuList}
                                key={`menu-${formData.MenuList}`}
                                onChange={(item: any) => {
                                    handleSelectListChange(item.value, "MenuList");
                                }}
                            />
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <RdsSelectList
                                id="statl"
                                label="Menu Status"
                                placeholder="Select Menu Status"
                                selectItems={props.StatusList}
                                selectedValue={formData?.StatusList}
                                key={`status-${formData.StatusList}`} 
                                onChange={(item: any) => {
                                    handleSelectListChange(item.value, "StatusList");
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className="d-flex flex-column-reverse ps-4 flex-lg-row flex-md-column-reverse flex-row flex-xl-row flex-xxl-row footer-buttons gap-2 mt-3 pb-3 p-4">
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
                        onClick={(e: any) => emitSaveData(e)}
                        size="small"
                        data-testId="save"
                    ></RdsButton>
                </div>
            </form>
        </>
    );
};

export default RdsCompTheme;
