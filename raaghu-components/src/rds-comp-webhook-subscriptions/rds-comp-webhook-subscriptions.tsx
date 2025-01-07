import React, { useEffect, useState } from "react";
import RdsCompDatatable from "../rds-comp-data-table/rds-comp-data-table";
import {
    RdsButton,
    RdsIllustration,
    RdsInput,
    RdsTextArea,
    RdsLabel,
} from "../rds-elements";

export interface RdsCompWebhookSubscriptionProps {
    webhookSubscriptionData?: any;
    reset?: boolean;
    onSaveHandler?: (data: any) => void;
}

const RdsCompWebhookSubscription = (props: RdsCompWebhookSubscriptionProps) => {
   const [inputReset, setInputReset] = useState(false);
    let nextId = 0;

    const [webhookheaderfile, setWebhookheaderfile] = useState<any>([]);
    const [user, setUser] = useState({
        endpoint: "",
        event: "",
        headerKey: "",
        headerValue: "",
    });

    //****************endPoint********************
    const isEndpointValid = (endpoint: any) => {
        if (!endpoint || endpoint.length === 0) {
            return "empty";
        } else if (
            !/^(ftp|http|https):\/\/[^ "]+$/.test(
                endpoint
            )
        ) {
            return "notValid";
        }

        return "valid";
    };
    const isEventValid = (event: any) => {
        if (!event || event.length === 0) {
            return false;
        }
        return true;
    };
    const isHeaderKeyValid = (headerKey: any) => {
        if (!headerKey || headerKey.length === 0) {
            return false;
        }
        return true;
    };
    const isHeaderValueValid = (headerValue: any) => {
        if (!headerValue || headerValue.length === 0) {
            return false;
        }
        return true;
    };
    
    const isHeaderFormValid =
        isHeaderValueValid(user.headerValue) && isHeaderKeyValid(user.headerKey);

    const isFormValid =
        isEndpointValid(user.endpoint) &&
       
        webhookheaderfile.length != 0;

    //****************handle Submit********************
    const handleSubmit = (event: any) => {
        event.preventDefault();
        props.onSaveHandler && props.onSaveHandler(user);  
        setInputReset(!inputReset);
        setUser({
            ...user,
            endpoint: "",
            event: "",
            headerKey: "",
            headerValue: "",
        });
        setWebhookheaderfile([]);
    };
    const onActionSelection = (rowData: any, actionId: any) => { };

    const tableHeaders = [
        {
            displayName: "Header Key",
            key: "headerKey",
            datatype: "text",
            sortable: true,
            isEndUserEditing: true,
        },
        {
            displayName: "Header Value",
            key: "headerValue",
            datatype: "text",
            sortable: true,
        },
    ],
        actions = [{ id: "edit", displayName: "Edit" }];
    const additionalHeaderHandleSubmit = (event: any) => {
        webhookheaderfile.push({
            id: nextId++,
            headerKey: user.headerKey,
            headerValue: user.headerValue,
        });
        setUser((prev) => ({
            ...prev,
            headerKey: "",
            headerValue: "",
        }));
    };

    const handleDataChanges = (value: any, key: string) => {
        setUser({ ...user, [key]: value });
    }

    return (
        <>
            <div>
                <form>
                <div className="custom-content-scroll">
                    <div className="fw-normal mt-1 mb-3">
                        <RdsInput
                            label="Webhook Endpoint"
                            reset={inputReset}
                            required={true}
                            placeholder="https://example.com/postreceive"
                            inputType="url"
                            onChange={(e) => {
                              handleDataChanges(e.target.value, "endpoint");
                            }}
                            value={user?.endpoint}
                            name={"endpoint"}
                            dataTestId="webhook-endpoint"
                            validatonPattern={/^(ftp|http|https):\/\/[^ "]+$/}                   
                            validationMsg="Enter valid url"
                        ></RdsInput>
                    </div>
                    <div className="fw-normal mb-4">
                        <RdsTextArea
                            label="Webhook Event"
                            reset={inputReset}
                            placeholder="carolyn Carpenter"
                            rows={4}
                            onChange={(e) => {
                              handleDataChanges(e.target.value, "event");
                            }}
                            value={user?.event}
                            dataTestId="webhook-event"
                            validatonPattern={/^(ftp|http|https):\/\/[^ "]+$/}                   
                            validationMsg="Enter valid url"
                        />
                    </div>

                     <div className="fw-normal row mb-3 mt-2 align-items-center">              
                        {/* <label className="mb-2" id="webhookEndpoint">Additional Webhook Headers</label> */}
                        <RdsLabel
                           label="Additional Webhook Headers"
                           id="webhookEndpoint"
                           required={true}
                        />
                        <div className="col-12 col-md-5 mb-3">
                            <RdsInput
                                placeholder="Header key"
                                reset={inputReset}
                                inputType="text"
                                name={"headerKey"}
                                onChange={(e) => {
                                  handleDataChanges(e.target.value, "headerKey");
                                }}
                                value={user?.headerKey}
                                
                                dataTestId="header-key"
                            ></RdsInput>
                        </div>
                        <div className="col-12 col-md-5 mb-3">
                            <RdsInput
                                placeholder="Header Value"
                                reset={inputReset}
                                inputType="text"
                                name={"headerValue"}
                               
                                onChange={(e) => {
                                  handleDataChanges(e.target.value, "headerValue");
                                }}
                                value={user?.headerValue}
                                dataTestId="header-value"
                            ></RdsInput>
                        </div>
                        <div className="col-12 col-md-2 mb-3 mt-1 d-flex justify-content-center justify-content-md-end">
                            <RdsButton
                                label="Add"
                                onClick={additionalHeaderHandleSubmit}
                                colorVariant="primary"
                                isDisabled={!isHeaderFormValid}
                                block={false}
                                tooltipTitle={""}
                                type="submit"
                                dataTestId="add"
                            />
                        </div>
                    </div> 
                    {webhookheaderfile.length == 0 && (
                        <div>
                            <RdsIllustration
                                iconHeight="250px"
                                iconPath="/assets/lottie-files/outlined/dual-color/illustration-light.json"
                                iconWidth="250px"
                                label="Currently you don't have any data"
                                subLabel="Click on the button above to add data"
                            />
                        </div>
                    )}

                    {webhookheaderfile.length != 0 && (
                        <RdsCompDatatable
                            actionPosition="right"
                            classes="table__userTable"
                            tableHeaders={tableHeaders}
                            actions={actions}
                            tableData={webhookheaderfile}
                            pagination={true}
                            recordsPerPage={5}
                            onActionSelection={onActionSelection}
                            recordsPerPageSelectListOption={true}
                        ></RdsCompDatatable>
                    )}
                </div>
                    <div className="d-flex flex-column-reverse ps-4 flex-lg-row flex-md-column-reverse flex-row flex-xl-row flex-xxl-row footer-buttons gap-2 mt-3 pb-3 p-4">
                            <RdsButton
                                label="Cancel"
                                colorVariant="primary"
                                tooltipTitle={""}
                                type="button"
                                size="small"
                                isOutline={true}
                                dataTestId="cancel"
                            />                        
                            <RdsButton
                                label="Save"
                                colorVariant="primary"
                                isDisabled={!isFormValid}
                                tooltipTitle={""}
                                type="submit"
                                size="small"
                                dataTestId="save"
                                onClick={(e: any) => handleSubmit(e)}
                            />
                        </div>
                </form>
            </div>
        </>
    );
};
export default RdsCompWebhookSubscription;
