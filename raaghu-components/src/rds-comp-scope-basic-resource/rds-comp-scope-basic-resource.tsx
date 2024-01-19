import React, { useEffect, useState } from "react";
import {
    RdsInput,
    RdsButton,
    RdsCheckbox,
} from "../rds-elements";
import { useTranslation } from "react-i18next";

export interface RdsCompScopeBasicResourceProps {
    apiScopeData?: any;
    saveApiScopeData?: any;
}

const RdsCompScopeBasicResource = (props: RdsCompScopeBasicResourceProps) => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        displayName: "",
        enabled: false,
        required: false,
        emphasize: false,
        showInDiscoveryDocument: false,
    });

    const { t } = useTranslation();

    useEffect(() => {
        if (props.apiScopeData) {
            setFormData(props.apiScopeData);
        }
    }, [props]);

    const handleName = (event: any) => {
        setFormData({ ...formData, name: event });
    };
    const handleDescription = (event: any) => {
        setFormData({ ...formData, description: event });
    };
    function handleEnabled(event: any) {
        setFormData({ ...formData, enabled: event });
    }
    function handleRequired(event: any) {
        setFormData({ ...formData, required: event });
    }
    function handleEmphasize(event: any) {
        setFormData({ ...formData, emphasize: event });
    }
    function handleShowInDiscovery(event: any) {
        setFormData({ ...formData, showInDiscoveryDocument: event });
    }


    return (
        <>
            <div>
                <form>
                    <div className="row mt-3">
                        <div className="col-6">
                            <RdsInput
                                required={true}
                                label="Name"
                                placeholder="Enter name"
                                inputType="text"
                                onChange={(e: any) => {
                                    handleName(e.target.value);
                                }}
                                value={formData.name}
                                name="name"
                                dataTestId="name"
                            ></RdsInput>
                        </div>
                        <div className="col-6 ">
                            <RdsInput
                                label="Description"
                                placeholder="Enter Description"
                                inputType="text"
                                onChange={(e: any) => {
                                    handleDescription(e.target.value);
                                }}
                                required={false}
                                name="Description"
                                value={formData.description}
                                dataTestId="description"
                            ></RdsInput>
                        </div>
                    </div>
                    <div className=" mb-4">
                        <RdsCheckbox
                            id="0"
                            label="Enabled"
                            checked={formData.enabled}
                            onChange={(e) => {
                                handleEnabled(e.target.checked);
                            }}
                            dataTestId="enabled"
                        ></RdsCheckbox>
                    </div>
                    <div className=" mb-4">
                        <RdsCheckbox
                            id="1"
                            label="Required"
                            checked={formData.required}
                            onChange={(e) => {
                                handleRequired(e.target.checked);
                            }}
                            dataTestId="required"
                        ></RdsCheckbox>
                    </div>
                    <div className=" mb-4">
                        <RdsCheckbox
                            id="2"
                            label="Emphasize"
                            checked={formData.emphasize}
                            onChange={(e) => {
                                handleEmphasize(e.target.checked);
                            }}
                            dataTestId="emphasize"
                        ></RdsCheckbox>
                    </div>
                    <div className=" mb-4">
                        <RdsCheckbox
                            id="0"
                            label="Show in discovery Documents"
                            checked={formData.showInDiscoveryDocument}
                            onChange={(e) => {
                                handleShowInDiscovery(e.target.checked);
                            }}
                            dataTestId="show-discovery-documents"
                        ></RdsCheckbox>
                    </div>
                    <div>
                        {/* <label className="Text-bold" >Others</label>
            <RdsCheckboxGroup itemList={props.resourceData.checklist} /> */}
                    </div>
                    <div className="mb-xxl-0 mb-xl-0 mb-lg-0 mb-md-0 mb-3 pb-3 d-flex flex-column-reverse flex-lg-row flex-md-column-reverse flex-xl-row flex-xxl-row flex-row gap-2 footer-buttons">
                        <RdsButton
                            class="me-2"
                            tooltipTitle={""}
                            type={"button"}
                            label={t("Cancel") || ""}
                            colorVariant="outline-primary"
                            size="small"
                            databsdismiss="offcanvas"
                            dataTestId="cancel"
                        ></RdsButton>
                        <RdsButton
                            class="me-2"
                            label={t("Save") || ""}
                            size="small"
                            type="button"
                            colorVariant="primary"
                            databsdismiss="offcanvas"
                            onClick={() => props.saveApiScopeData(formData)}
                            dataTestId="save"
                        ></RdsButton>
                    </div>
                </form>
            </div>
        </>
    );
};
export default RdsCompScopeBasicResource;
