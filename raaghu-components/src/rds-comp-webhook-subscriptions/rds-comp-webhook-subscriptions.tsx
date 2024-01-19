import React, { useState } from "react";
import RdsCompDatatable from "../rds-comp-data-table/rds-comp-data-table";
import {
    RdsButton,
    RdsIllustration,
    RdsInput,
    RdsTextArea,
} from "../rds-elements";
import { useTranslation } from "react-i18next";

export interface RdsCompWebhookSubscriptionProps {
    webhookItem?: (item: any) => void;
}

const RdsCompWebhookSubscription = (props: RdsCompWebhookSubscriptionProps) => {
    let nextId = 0;
    const { t } = useTranslation();
    const [webhookheaderfile, setWebhookheaderfile] = useState<any>([]);
    const [user, setUser] = useState({
        endpoint: "",
        event: "",
        headerKey: "",
        headerValue: "",
    });
    const [error, setError] = useState({
        endpoint: "",
        event: "",
        headerKey: "",
        position: "",
        headerValue: "",
    });

    //****************endPoint********************
    const isEndpointValid = (endpoint: any) => {
        if (!endpoint || endpoint.length === 0) {
            return "empty";
        } else if (
            !/^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/i.test(
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

    //****************endPoint********************
    const endpointhandleChange = (event: any) => {
        if (isEndpointValid(event.target.value) == "empty") {
            setError({ ...error, endpoint: "Endpoint is required" });
        } else if (isEndpointValid(event.target.value) == "notValid") {
            setError({ ...error, endpoint: "Enter valid url" });
        } else {
            setError({ ...error, endpoint: "" });
        }
        setUser({ ...user, endpoint: event.target.value });
    };

    const eventhandleChange = (event: any) => {
        if (!isEventValid(event.target.value)) {
            setError({ ...error, event: "Event is required" });
        } else {
            setError({ ...error, event: "" });
        }
        setUser({ ...user, event: event.target.value });
    };
    const headerKeyhandleChange = (event: any) => {
        if (!isHeaderKeyValid(event.target.value)) {
            setError({ ...error, headerKey: "Header Key is required" });
        } else {
            setError({ ...error, headerKey: "" });
        }
        setUser({ ...user, headerKey: event.target.value });
    };
    const headerValuehandleChange = (event: any) => {
        if (!isHeaderValueValid(event.target.value)) {
            setError({ ...error, headerValue: "Header Value is required" });
        } else {
            setError({ ...error, headerValue: "" });
        }
        setUser({ ...user, headerValue: event.target.value });
    };
    const isHeaderFormValid =
        isHeaderValueValid(user.headerValue) && isHeaderKeyValid(user.headerKey);

    const isFormValid =
        isEndpointValid(user.endpoint) &&
        isEventValid(user.event) &&
        webhookheaderfile.length != 0;

    //****************handle Submit********************
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        props.webhookItem != undefined && props.webhookItem(user);
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

    return (
        <>
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="fw-normal mt-1 mb-3">
                        <RdsInput
                            label="Webhook Endpoint"
                            required={true}
                            placeholder="https://example.com/postreceive"
                            inputType="url"
                            onChange={endpointhandleChange}
                            value={user.endpoint}
                            name={"endpoint"}
                            dataTestId="webhook-endpoint"
                        ></RdsInput>
                        {error.endpoint && (
                            <span className="text-danger">{error.endpoint}</span>
                        )}
                    </div>
                    <div className="fw-normal mb-4">
                        <RdsTextArea
                            label="Webhook Event"
                            placeholder="carolyn Carpenter"
                            required={true}
                            onChange={eventhandleChange}
                            rows={4}
                            value={user.event}
                            dataTestId="webhook-event"
                        />
                        {error.event && <span className="text-danger">{error.event}</span>}
                    </div>

                    <div className=" fw-normal row mb-3 mt-2">
                        <label className="mb-2" id="webhookEndpoint">Additional Webhook Headers</label>
                        <div className="col-5 mb-3">
                            <RdsInput
                                placeholder="Header key"
                                inputType="text"
                                onChange={headerKeyhandleChange}
                                name={"headerKey"}
                                value={user.headerKey}
                                dataTestId="header-key"
                            ></RdsInput>
                            {error.headerKey && (
                                <span className="text-danger">{error.headerKey}</span>
                            )}
                        </div>
                        <div className="col-5 mb-3">
                            <RdsInput
                                placeholder="Header Value"
                                inputType="text"
                                onChange={headerValuehandleChange}
                                name={"headerValue"}
                                value={user.headerValue}
                                dataTestId="header-value"
                            ></RdsInput>
                            {error.headerValue && (
                                <span className="text-danger">{error.headerValue}</span>
                            )}
                        </div>
                        <div className="col-2 mb-3">
                            <RdsButton
                                label={t("Add") || ""}
                                onClick={additionalHeaderHandleSubmit}
                                colorVariant="primary"
                                isDisabled={!isHeaderFormValid}
                                block={true}
                                tooltipTitle={""}
                                type="submit"
                                dataTestId="add"
                            />
                        </div>
                    </div>

                    {webhookheaderfile.length == 0 && (
                        <div>
                            <RdsIllustration
                                label="Currently you do not have webhook header"
                                subLabel="Click on the button above to add"
                                colorVariant="light"
                            />{" "}
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
                    <div className="row m-3 mt-5">
                        <div className="col-2">
                            <RdsButton
                                label={t("Cancel") || ""}
                                colorVariant="primary"
                                block={true}
                                tooltipTitle={""}
                                type="button"
                                size="small"
                                isOutline={true}
                                dataTestId="cancel"
                            />
                        </div>
                        <div className="col-2">
                            <RdsButton
                                label={t("Save") || ""}
                                colorVariant="primary"
                                isDisabled={!isFormValid}
                                block={true}
                                tooltipTitle={""}
                                type="submit"
                                size="small"
                                dataTestId="save"
                            />
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};
export default RdsCompWebhookSubscription;
