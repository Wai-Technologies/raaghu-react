import React, { useEffect, useState } from "react";
import "./rds-comp-notification-settings.css";
import { RdsButton } from "../rds-elements";

export interface RdsCompNotificationSettingsProps {
    onSaveHandler?: (data: any) => void;
    onCancelHandler?: (event: any) => void;
    default: any;
}

const RdsCompNotificationSettings = (props: RdsCompNotificationSettingsProps) => {
    const [data, setdata] = useState(props.default);

    useEffect(() => {
        setdata(props.default);
    }, [props.default]
);

const handleDataChanges = (value: boolean, key: string) => {
    setdata({ ...data, [key]: value});
}

function emitCancel(event: any) {
    event.preventDefault();
    props.onCancelHandler && props.onCancelHandler(event);
}

function emitSaveData(event: any) {
    event.preventDefault();
    props.onSaveHandler && props.onSaveHandler(data);
    setdata({
        enabled: false,
        NewUser: false,
        NewTenant: false
    });
}

    return (
        <>
            <div className="custom-content-scroll">
            <h4>Receive Notifications</h4>
            <div className="form-switch switch mt-2 mb-4 ">
                <input
                    onChange={(e) => {
                        handleDataChanges(e.target.checked, "enabled");
                      }}
                    className="form-check-input me-2"
                    type="checkbox"
                    id="notification"
                    checked={data?.enabled}
                    data-testid="notification"
                />

                <label className="form-check-label" htmlFor="notification">
                    (This option can be used to completely Enable/Disable the
                    notifications)
                </label>
            </div>
            <h4>Notification Types</h4>
            <div className="form-check mt-3">
                <input
                    className="form-check-input"
                    type="checkbox"
                    id="newuser"
                    onChange={(e) => {
                        handleDataChanges(e.target.checked, "NewUser");
                      }}
                      checked={data?.NewUser}
                    data-testid="new-user"
                />
                <label className="form-check-label" htmlFor="newuser">
                    On a New User Registered to the Application
                </label>
            </div>
            <div className="form-check">
                <input
                    className="form-check-input"
                    type="checkbox"
                    id="newtenant"
                    onChange={(e) => {
                        handleDataChanges(e.target.checked, "NewTenant");
                      }}
                      checked={data?.NewTenant}
                    data-testid="new-tenant"
                />
                <label className="form-check-label" htmlFor="newtenant">
                    On a New Tenant Registered to the Application
                </label>
            </div>
            </div>
            <div className="d-flex flex-column-reverse ps-4 flex-lg-row flex-md-column-reverse flex-row flex-xl-row flex-xxl-row footer-buttons gap-2 mt-3 pb-3 p-4">
                    <RdsButton
                            tooltipTitle={""}
                            type={"button"}
                            label="Cancel"
                            colorVariant="outline-primary"
                            size="small"
                            databsdismiss="offcanvas"
                            onClick={(e: any) => emitCancel(e)}
                        ></RdsButton>
                        <RdsButton
                            label="Save"
                            size="small"
                            colorVariant="primary"
                            tooltipTitle={""}
                            type={"submit"}
                            databsdismiss="offcanvas"
                            onClick={(e: any) => emitSaveData(e)}
                        ></RdsButton>
                </div>
        </>
    );
};

export default RdsCompNotificationSettings;
