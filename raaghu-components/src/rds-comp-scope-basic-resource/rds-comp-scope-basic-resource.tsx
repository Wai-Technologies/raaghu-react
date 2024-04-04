import React, { useEffect, useState } from "react";
import {
    RdsInput,
    RdsButton,
    RdsCheckbox,
    RdsCheckboxGroup,
} from "../rds-elements";

export interface RdsCompScopeBasicResourceProps {
    apiScopeData?: any;
    saveApiScopeData?: any;
    resourceData: any;
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
                    <div className="custom-content-scroll">
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
                        <div className="col-6">
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
                    <div className="row">                  
                    <RdsCheckboxGroup itemList={props.resourceData.checklist} />
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
