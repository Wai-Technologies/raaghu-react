import { useTranslation } from "react-i18next";
import { RdsButton, RdsCheckbox, RdsInput, RdsTextArea } from "../rds-elements";
import React, { useEffect, useState } from "react";


export interface RdsCompIdentityClientBasicProps {
    clientData?: any;
    onSaveHandler?: (data: any) => void;
}


const RdsCompIdentityClientBasic = (props: RdsCompIdentityClientBasicProps) => {

    const [clientData, setClientData] = useState<any>(props.clientData);

    useEffect(() => {
        setClientData(props.clientData);
      }, [props.clientData]);
    
      const handleDataChanges = (value: any, key: string) => {
        setClientData({ ...clientData, [key]: value });
      };
    
      function emitSaveData(event: any) {
        event.preventDefault();
        props.onSaveHandler && props.onSaveHandler(clientData);
        setClientData({
            clientId: "",
            clientName: "",
            description: "",
            clientUrl: "",
            logoUrl: "",
            callbackUrl: "",
            logoutUrl: ""

      });
      }

    return (
        <>
            <form className="p-2 mt-1">
                <div className="custom-content-scroll">
                <div className="row mb-4">
                    <div className="col-lg-6 col-md-6">
                        <div>
                            <RdsInput
                                placeholder="Enter ID"
                                inputType="text"
                                label="Client ID"
                                name="name"
                                required={false}
                                dataTestId='client-id'
                                onChange={(e) => {
                                   handleDataChanges(e.target.value, "clientId");
                                }}
                                value={clientData?.clientId}
                            ></RdsInput>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <div>
                            <RdsInput
                                placeholder="Enter Client Name"
                                inputType="text"
                                label="Client Name"
                                name="name"
                                required={false}
                                dataTestId='client-name'
                                onChange={(e) => {
                                 handleDataChanges(e.target.value, "clientName");
                                }}
                                value={clientData?.clientName}
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
                            dataTestId='description'
                            onChange={(e) => {
                             handleDataChanges(e.target.value, "description");
                            }}
                            value={clientData?.description}
                        />
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col-lg-6 col-md-6">
                        <div>
                            <RdsInput
                                placeholder="Enter URL"
                                inputType="text"
                                label="Client URL"
                                name="name"
                                required={false}
                                dataTestId='client-url'
                                onChange={(e) => {
                                    handleDataChanges(e.target.value, "clientUrl");
                                }}
                                value={clientData?.clientUrl}
                            ></RdsInput>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <div>
                            <RdsInput
                                placeholder="Enter URL"
                                inputType="text"
                                label="Logo URL"
                                name="name"
                                required={false}
                                dataTestId='logo-url'
                                onChange={(e) => {
                                    handleDataChanges(e.target.value, "logoUrl");
                                }}
                                value={clientData?.logoUrl}
                            ></RdsInput>
                        </div>
                    </div>

                </div>
                <div className="row mb-4">
                    <div className="col-lg-6 col-md-6">
                        <div>
                            <RdsInput
                                placeholder="Enter URL"
                                inputType="text"
                                label="CallBack URL"
                                name="name"
                                required={false}
                                dataTestId='callback-url'
                                onChange={(e) => {
                                    handleDataChanges(e.target.value, "callbackUrl");
                                }}
                                value={clientData?.callbackUrl}
                            ></RdsInput>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <div>
                            <RdsInput
                                placeholder="Enter URL"
                                inputType="text"
                                label="Logout URL"
                                name="name"
                                required={false}
                                dataTestId='logout-url'
                                onChange={(e) => {
                                    handleDataChanges(e.target.value, "logoutUrl");
                                }}
                                value={clientData?.logoutUrl}
                            ></RdsInput>
                        </div>
                    </div>

                </div>
                <div className="row">
                    <RdsCheckbox
                        label="Required Consent"
                        dataTestId='consent'
                        onChange={(e: any) => {
                            handleDataChanges(e.target.checked, "requiredConsent");
                        }}
                        checked={clientData?.requiredConsent}
                    ></RdsCheckbox>
                </div>
                </div>
                <div  className="d-flex flex-column-reverse ps-4 flex-lg-row flex-md-column-reverse flex-row flex-xl-row flex-xxl-row footer-buttons gap-2 mt-3 pb-3">
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
                        onClick={(e: any) => emitSaveData(e)}
                        databsdismiss="offcanvas"
                    ></RdsButton>
                </div>
            </form>
        </>
    );
};

export default RdsCompIdentityClientBasic;