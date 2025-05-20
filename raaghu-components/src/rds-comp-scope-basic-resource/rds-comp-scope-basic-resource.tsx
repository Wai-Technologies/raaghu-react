import React, { useEffect, useState } from "react";
import {
    RdsInput,
    RdsButton,
    RdsCheckbox
} from "../rds-elements";

export interface RdsCompScopeBasicResourceProps {
    apiScopeData?: any;
    onSaveHandler?: (data: any) => void;
    reset?: boolean;
}

const RdsCompScopeBasicResource = (props: RdsCompScopeBasicResourceProps) => {
    const [formData, setFormData] = useState(props.apiScopeData);
    const [inputReset, setInputReset] = useState(false);
    useEffect(() => {
        setFormData(props.apiScopeData);
    }, [props.apiScopeData]);

    useEffect(() => {
        setInputReset(!inputReset);
    }, [props.reset]);

    const apiScopeDataChange = (value: any, key: string) => {
        setFormData({ ...formData, [key]: value });
    };

    function emitSaveData(event: any) {
        event.preventDefault();
        props.onSaveHandler && props.onSaveHandler(formData);
        setInputReset(!inputReset);
        setFormData({
            name: "",
            description: "",
            enabled: false,
            required: false,
            emphasize: false,
            showInDiscovery: false,
        });
    }
    const isNameValid = (name: any) => {
        if (!name || name.length === 0) {
            return false;
        }
        return true;
    };
const isFormValid=isNameValid(formData?.name);
    return (
        <>
            <div>
                <form>
                    <div className="custom-content-scroll">
                        <div className="row mt-3">
                            <div className="col-6">
                                <RdsInput
                                    required={true}
                                    name="Name"
                                    label={true}
                                    placeholder="Enter name"
                                    inputType="text"
                                    onChange={(e) => {
                                        apiScopeDataChange(e.target.value, "name");
                                    }}
                                    value={formData?.name}                                    
                                    dataTestId="name"
                                    reset={inputReset}
                                ></RdsInput>
                            </div>
                            <div className="col-6">
                                <RdsInput
                                    name="Description"
                                    label={true}
                                    placeholder="Enter Description"
                                    inputType="text"
                                    required={false}                                    
                                    onChange={(e) => {
                                        apiScopeDataChange(e.target.value, "description");
                                    }}
                                    value={formData?.description}
                                    dataTestId="description"
                                ></RdsInput>
                            </div>
                        </div>
                        <div className="row mb-2 mt-1">
                            <RdsCheckbox
                                id="0"
                                labelText="Enabled"
                                checked={formData?.enabled}
                                onChange={(e) => {
                                    apiScopeDataChange(e.target.checked, "enabled");
                                }}
                                dataTestId="enabled"
                            ></RdsCheckbox>
                        </div>
                        <div className="row mb-2">
                            <RdsCheckbox
                                id="0"
                                labelText="Required"
                                checked={formData?.required}
                                onChange={(e: any) => {
                                    apiScopeDataChange(e.target.checked, "required");
                                }}
                                dataTestId="required"
                            ></RdsCheckbox>
                        </div>
                        <div className="row mb-2">
                            <RdsCheckbox
                                id="0"
                                labelText="Emphasize"
                                checked={formData?.emphasize}
                                onChange={(e: any) => {
                                    apiScopeDataChange(e.target.checked, "emphasize");
                                }}
                                dataTestId="emphasize"
                            ></RdsCheckbox>
                        </div>
                        <div className="row mb-2">
                            <RdsCheckbox
                                id="0"
                                labelText="Show in Discovery Document"
                                checked={formData?.showInDiscovery}
                                onChange={(e) => {
                                    apiScopeDataChange(e.target.checked, "showInDiscovery");
                                }}
                                dataTestId="discovery-document"
                            ></RdsCheckbox>
                        </div>
                    </div>
                    <div className="d-flex flex-column-reverse ps-4 flex-lg-row flex-md-column-reverse flex-row flex-xl-row flex-xxl-row footer-buttons gap-2 mt-3 pb-3 p-4">
                        <RdsButton
                            class="me-2"
                            tooltipTitle={""}
                            type={"button"}
                            label="Cancel"
                            colorVariant="outline-primary"
                            size="small"
                            databsdismiss="offcanvas"
                            dataTestId="cancel"
                        ></RdsButton>
                        <RdsButton
                            class="me-2"
                            label="Save"
                            size="small"
                            type="button"
                            colorVariant="primary"
                            databsdismiss="offcanvas"
                            onClick={(e: any) => emitSaveData(e)}
                            dataTestId="save"
                            isDisabled={!isFormValid}
                        ></RdsButton>
                    </div>
                </form>
            </div>
        </>
    );
};
export default RdsCompScopeBasicResource;
