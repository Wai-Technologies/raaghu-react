import { useTranslation } from "react-i18next";
import { RdsButton, RdsCheckbox, RdsInput, RdsTextArea } from "../rds-elements";
import React, { useEffect, useState } from "react";

export interface RdsCompIdentiyResourceBasicProps {
    identityResourceBasicData?: any;
    onSaveHandler?: (data: any) => void;
    reset?: boolean;
}

const RdsCompIdentiyResourceBasic = (props: RdsCompIdentiyResourceBasicProps) => {
    const [identityBasicData, setIdentityBasicData] = useState(props.identityResourceBasicData);
    const [inputReset, setInputReset] = useState(false);

    useEffect(() => {
        setIdentityBasicData(props.identityResourceBasicData);
    }, [props.identityResourceBasicData]);

    useEffect(() => {
        setInputReset(!inputReset);
    }, [props.reset]);

    const handleDataChange = (value: any, key: string) => {
        setIdentityBasicData({ ...identityBasicData, [key]: value });
    };

    function emitSaveData(event: any) {
        event.preventDefault();
        props.onSaveHandler && props.onSaveHandler(identityBasicData);
        setInputReset(!inputReset);
        setIdentityBasicData({
            name: "",
            displayName: "",
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
    const isFormValid=isNameValid(identityBasicData?.name);
    return (
        <>
            <div>
                <form>
                    <div className="custom-content-scroll">
                        <div className="row">
                            <div className="col-6">
                                <RdsInput
                                    required={true}
                                    name="Name"
                                    label={true}
                                    placeholder="Enter name"
                                    inputType="text"
                                    value={identityBasicData?.name}                                    
                                    onChange={(e) => {
                                        handleDataChange(e.target.value, "name");
                                    }}
                                    dataTestId="name"
                                    reset={inputReset}
                                ></RdsInput>
                            </div>
                            <div className="col-6">
                                <RdsInput
                                    name="Display name"
                                    label={true}
                                    placeholder="Enter display name"
                                    inputType="text"
                                    required={false}
                                    value={identityBasicData?.displayName}
                                    onChange={(e) => {
                                        handleDataChange(e.target.value, "displayName");
                                    }}                                   
                                    dataTestId="display-name"
                                ></RdsInput>
                            </div>
                        </div>
                        <div className="row">
                            <RdsTextArea
                                label="Description"
                                placeholder="Description"
                                value={identityBasicData?.description}
                                onChange={(e) => {
                                    handleDataChange(e.target.value, "description");
                                }}
                                dataTestId="description"
                            />
                        </div>
                        <div className="row mb-3">
                            <RdsCheckbox
                                id="0"
                                labelText="Enabled"
                                checked={identityBasicData?.enabled}
                                onChange={(e) => {
                                    handleDataChange(e.target.checked, "enabled");
                                }}
                                dataTestId="enabled"
                            ></RdsCheckbox>
                        </div>
                        <div className="row mb-3">
                            <RdsCheckbox
                                id="0"
                                labelText="Required"
                                checked={identityBasicData?.required}
                                onChange={(e:any) => {
                                    handleDataChange(e.target.checked, "required");
                                }}
                                dataTestId="required"
                            ></RdsCheckbox>
                        </div>
                        <div className="row mb-3">
                            <RdsCheckbox
                                id="0"
                                labelText="Emphasize"
                                checked={identityBasicData?.emphasize}
                                onChange={(e:any) => {
                                    handleDataChange(e.target.checked, "emphasize");
                                }}
                                dataTestId="emphasize"
                            ></RdsCheckbox>
                        </div>
                        <div className="row mb-3">
                            <RdsCheckbox
                                id="0"
                                labelText="Show in Discovery Document"
                                checked={identityBasicData?.showInDiscovery}
                                onChange={(e) => {
                                    handleDataChange(e.target.checked, "showInDiscovery");
                                }}
                                dataTestId="discovery-document"
                            ></RdsCheckbox>
                        </div>
                    </div>
                    <div className="d-flex ps-4 flex-column-reverse flex-lg-row flex-md-column-reverse flex-row flex-xl-row flex-xxl-row footer-buttons gap-2 mt-3 pb-3 p-4">
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
                            colorVariant="primary"
                            tooltipTitle={""}
                            type={"submit"}
                            databsdismiss="offcanvas"
                            dataTestId="save"
                            onClick={(e: any) => emitSaveData(e)}
                            isDisabled={!isFormValid}
                        ></RdsButton>
                    </div>
                </form>
            </div>
        </>
    );
};

export default RdsCompIdentiyResourceBasic;
