import { useTranslation } from "react-i18next";
import { RdsButton, RdsCheckbox, RdsInput, RdsTextArea } from "../rds-elements";
import React, { useState } from "react";

export interface RdsCompIdentiyResourceBasicProps { }

const RdsCompIdentiyResourceBasic = (props: RdsCompIdentiyResourceBasicProps) => {

    const [identityBasicData, setidentityBasicData] = useState({
        name: "",
        displayName: "",
        description: "",
        enabled: false,
        required: false,
        emphasize: false,
        showInDiscovery: false,
    });
    const resourceBasicData = (event: any) => {
        event.preventDefault();
    };

    function setName(value: any) {
        setidentityBasicData({ ...identityBasicData, name: value });
    }
    function setDisplayName(value: any) {
        setidentityBasicData({ ...identityBasicData, displayName: value });
    }
    function setDescription(value: any) {
        setidentityBasicData({ ...identityBasicData, description: value });
    }

    function setEnabled(value: boolean) {
        setidentityBasicData({ ...identityBasicData, enabled: value });
    }

    function setRequired(value: boolean) {
        setidentityBasicData({ ...identityBasicData, required: value });
    }
    function setEmphasize(value: boolean) {
        setidentityBasicData({ ...identityBasicData, emphasize: value });
    }
    function setDiscovery(value: boolean) {
        setidentityBasicData({ ...identityBasicData, showInDiscovery: value });
    }
    return (
        <>
            <div>
                <form onSubmit={resourceBasicData}>
                <div className="custom-content-scroll">
                    <div className="row">
                        <div className="col-6">
                            <RdsInput
                                required={true}
                                label="Name"
                                placeholder="Enter name"
                                inputType="text"
                                value={identityBasicData.name}
                                name={"email"}
                                onChange={(e: any) => {
                                    setName(e.target.value);
                                }}
                                dataTestId="name"
                            ></RdsInput>
                        </div>
                        <div className="col-6">
                            <RdsInput
                                label="Display name"
                                placeholder="Enter display name"
                                inputType="text"
                                required={false}
                                value={identityBasicData.displayName}
                                onChange={(e: any) => {
                                    setDisplayName(e.target.value);
                                }}
                                name={"Displayname"}
                                dataTestId="display-name"
                            ></RdsInput>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <RdsTextArea
                            label="Description"
                            placeholder="Description"
                            rows={2}
                            value={identityBasicData.description}
                            onChange={(e: any) => {
                                setDescription(e.target.value);
                            }}
                            dataTestId="description"
                        />
                    </div>
                    <div className="row mb-3">
                        <RdsCheckbox
                            id="0"
                            label="Enabled"
                            checked={identityBasicData.enabled}
                            onChange={(e: any) => {
                                setEnabled(e.target.checked);
                            }}
                            dataTestId="enabled"
                        ></RdsCheckbox>
                    </div>
                    <div className="row mb-3">
                        <RdsCheckbox
                            id="0"
                            label="Required"
                            checked={identityBasicData.required}
                            onChange={(e: any) => {
                                setRequired(e.target.checked);
                            }}
                            dataTestId="required"
                        ></RdsCheckbox>
                    </div>
                    <div className="row mb-3">
                        <RdsCheckbox
                            id="0"
                            label="Emphasize"
                            checked={identityBasicData.emphasize}
                            onChange={(e: any) => {
                                setEmphasize(e.target.checked);
                            }}
                            dataTestId="emphasize"
                        ></RdsCheckbox>
                    </div>
                    <div className="row mb-3">
                        <RdsCheckbox
                            id="0"
                            label="Show in Discovery Document"
                            checked={identityBasicData.showInDiscovery}
                            onChange={(e: any) => {
                                setDiscovery(e.target.checked);
                            }}
                            dataTestId="discovery-document"
                        ></RdsCheckbox>
                    </div>
                    </div>
                    <div className="d-flex flex-column-reverse flex-lg-row flex-md-column-reverse flex-row flex-xl-row flex-xxl-row footer-buttons gap-2 mt-3 pb-3">
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
                        ></RdsButton>
                    </div>
                </form>
            </div>
        </>
    );
};

export default RdsCompIdentiyResourceBasic;
