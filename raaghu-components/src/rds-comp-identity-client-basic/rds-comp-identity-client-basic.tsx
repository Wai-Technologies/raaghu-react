import { useTranslation } from "react-i18next";
import { RdsButton, RdsCheckbox, RdsInput, RdsTextArea } from "../rds-elements";
import React, { useState } from "react";


export interface RdsCompIdentityClientBasicProps {
    clientData?: any;
}


const RdsCompIdentityClientBasic = (props: RdsCompIdentityClientBasicProps) => {

    const [clientData, setClientData] = useState<any>(props.clientData);


    return (
        <>
            <form className="p-2 mt-2">
                <div className="row mb-4">
                    <div className="col-lg-6 col-md-6">
                        <div>
                            <RdsInput
                                value={clientData?.id}
                                placeholder="Enter ID"
                                inputType="text"
                                label="Client ID"
                                name="name"
                                required={false}
                                dataTestId='client-id'
                            ></RdsInput>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <div>
                            <RdsInput
                                value={clientData?.name}
                                placeholder="Enter Client Name"
                                inputType="text"
                                label="Client Name"
                                name="name"
                                required={false}
                                dataTestId='client-name'
                            ></RdsInput>
                        </div>
                    </div>

                </div>
                <div className="row">
                    <div className="col-md-12 mb-4">
                        <RdsTextArea
                            label='Description'
                            placeholder='Enter Description'
                            rows={4}
                            value={clientData?.Description}
                            dataTestId='description'
                        />
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col-lg-6 col-md-6">
                        <div>
                            <RdsInput
                                value={clientData?.url}
                                placeholder="Enter URL"
                                inputType="text"
                                label="Client URL"
                                name="name"
                                required={false}
                                dataTestId='client-url'
                            ></RdsInput>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <div>
                            <RdsInput
                                value={clientData?.name}
                                placeholder="Enter URL"
                                inputType="text"
                                label="Logo URL"
                                name="name"
                                required={false}
                                dataTestId='logo-url'
                            ></RdsInput>
                        </div>
                    </div>

                </div>
                <div className="row mb-4">
                    <div className="col-lg-6 col-md-6">
                        <div>
                            <RdsInput
                                value={clientData?.url}
                                placeholder="Enter URL"
                                inputType="text"
                                label="CallBack URL"
                                name="name"
                                required={false}
                                dataTestId='callback-url'
                            ></RdsInput>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <div>
                            <RdsInput
                                value={clientData?.name}
                                placeholder="Enter URL"
                                inputType="text"
                                label="Logout URL"
                                name="name"
                                required={false}
                                dataTestId='logout-url'
                            ></RdsInput>
                        </div>
                    </div>

                </div>
                <div className="row">
                    <RdsCheckbox
                        label="Required Consent"
                        checked={false}
                        dataTestId='consent'
                    ></RdsCheckbox>
                </div>
                <div className="mt-3 d-flex pb-3 footer-buttons flex-column-reverse flex-lg-row flex-md-column-reverse flex-xl-row flex-xxl-row flex-row gap-2">
                    <RdsButton
                        class="me-2"
                        tooltipTitle={""}
                        type={"button"}
                        label="Cancel"
                        colorVariant="outline-primary"
                        size="small"
                        databsdismiss="offcanvas"
                        dataTestId='cancel'
                    ></RdsButton>
                    <RdsButton
                        class="me-2"
                        label="Save"
                        size="small"
                        colorVariant="primary"
                        tooltipTitle={""}
                        type={"submit"}
                        databsdismiss="offcanvas"
                    ></RdsButton>
                </div>
            </form>
        </>
    );
};

export default RdsCompIdentityClientBasic;