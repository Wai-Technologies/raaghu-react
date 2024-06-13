import React, { useEffect, useState } from "react";
import { RdsInput, RdsTextArea, RdsButton } from "../rds-elements";
import { useTranslation } from "react-i18next";

export interface RdsCompApiScopeBasicResourceProps {
    scopeData: any
    onSuccess?: any;
    reset?: boolean
}

const RdsCompApiScopeBasicResource = (props: RdsCompApiScopeBasicResourceProps) => {
    const [fieldScopeData, setFieldScopeData] = useState(props.scopeData);
    const [inputReset, setInputReset] = useState(props.reset)
    useEffect(() => {
        setFieldScopeData(props.scopeData);
    }, [props.scopeData]);

    useEffect(() => {
        setInputReset(props.reset);
    }, [props.reset]);

    const isEmailValid = (email: any) => {
        if (!fieldScopeData?.name || fieldScopeData?.name.length === 0) {
            return false;
        }
        return true;
    };
    const inputHandlerChange = (event: any, key: string) => {
        setFieldScopeData({ ...fieldScopeData, [key]: event.target.value });
    };

    const isFormValid = isEmailValid(fieldScopeData?.email);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        props.onSuccess && props.onSuccess(fieldScopeData);
        setInputReset(!inputReset);
        setFieldScopeData({
            id: "",
            name: "",
            displayName: "",
            description: "",
            resources: "",
        });
    };
    return (
        <>
            <div>
                <form onSubmit={handleSubmit}>
                  <div className="custom-content-scroll">
                    <div className="row mt-3">
                        <div className="col-md-6">
                            <RdsInput
                                reset={inputReset}
                                required={true}
                                label="Name"
                                placeholder="Enter Name"
                                inputType='text'
                                onChange={(e) => inputHandlerChange(e, "name")}
                                value={fieldScopeData?.name}
                                name={"email"}
                                dataTestId="name"
                            ></RdsInput>

                        </div>

                        <div className="col-md-6 ">
                            <RdsInput
                                reset={inputReset}
                                label="Display Name"
                                placeholder="Enter Display Name"
                                inputType='text'
                                onChange={(e) => inputHandlerChange(e, "displayName")}
                                required={false}
                                name={"Displayname"}
                                value={fieldScopeData?.displayName}
                                dataTestId="display-name"
                            ></RdsInput>

                        </div>
                    </div>
                    <div className=" mb-4">
                        <RdsInput
                            reset={inputReset}
                            label="Description"
                            placeholder="Description"
                            inputType='text'
                            onChange={(e) => inputHandlerChange(e, "description")}
                            required={false}
                            name={"Description"}
                            value={fieldScopeData?.description}
                            dataTestId="desc"
                        ></RdsInput>
                    </div>
                    <div className=" mb-4">
                        <RdsTextArea
                            label="Resources"
                            placeholder="Resources"
                            onChange={(e) => inputHandlerChange(e, "resources")}
                            rows={3}
                            value={fieldScopeData?.resources}
                            dataTestId="resources"
                        />
                    </div>
                    <div>
                        {/* <label className="Text-bold" >Others</label>
            <RdsCheckboxGroup itemList={props.resourceData.checklist} /> */}
                    </div>
                    </div>
                    <div className="d-flex flex-column-reverse ps-4 flex-lg-row flex-md-column-reverse flex-row flex-xl-row flex-xxl-row footer-buttons gap-2 mt-3 pb-3">
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
                            isDisabled={!isFormValid}
                            dataTestId="save"
                        ></RdsButton>
                    </div>
                </form>
            </div>
        </>
    );
};
export default RdsCompApiScopeBasicResource;
