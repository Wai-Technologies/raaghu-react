import React, { useEffect, useState } from "react";
import "./rds-comp-notification-settings.css";

export interface RdsCompNotificationSettingsProps {
    onSave?: (event: React.MouseEvent, data: any) => void;
    onCancel?: (event: React.MouseEvent) => void;
    default: any[];
}

const RdsCompNotificationSettings = (
    props: RdsCompNotificationSettingsProps
) => {
    useEffect(() => {
        setdata(props.default);
    });
    const [data, setdata] = useState(props.default);

    const enabler = (event: any) => {
        if (event.target.id === "notification") {
            setdata([...data, (data[0].enabled = !data[0].enabled)]);
        }
        if (event.target.id === "newuser") {
            setdata([...data, (data[0].NewUser = !data[0].NewUser)]);
        }
        if (event.target.id === "newtenant") {
            setdata([...data, (data[0].NewTenant = !data[0].NewTenant)]);
        }
    };
    return (
        <>
            {" "}
            <h4>Receive Notifications</h4>
            <div className="form-switch switch mt-2 mb-4 ">
                <input
                    onChange={enabler}
                    className="form-check-input me-2"
                    type="checkbox"
                    id="notification"
                    checked={props.default[0].enabled}
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
                    onChange={enabler}
                    className="form-check-input"
                    type="checkbox"
                    id="newuser"
                    checked={props.default[0].NewUser}
                    data-testid="new-user"
                />
                <label className="form-check-label" htmlFor="newuser">
                    On a New User Registered to the Application
                </label>
            </div>
            <div className="form-check">
                <input
                    onChange={enabler}
                    className="form-check-input"
                    type="checkbox"
                    id="newtenant"
                    checked={props.default[0].NewTenant}
                    data-testid="new-tenant"
                />
                <label className="form-check-label" htmlFor="newtenant">
                    On a New Tenant Registered to the Application
                </label>
            </div>
            <div className="buttongrp fixed-bottom m-3 position-absolute">
                <div>
                    <button
                        className="btn buttonname btn-outline-primary me-3"
                        onClick={props.onCancel}
                        data-testid="cancel-btn"
                    >
                        Cancel
                    </button>
                </div>
                <div>
                    <button
                        className="btn buttonname btn-primary"
                        onClick={(event) => props.onSave && props.onSave(event, data)}
                        data-testid="save-btn"
                    >
                        save
                    </button>
                </div>
            </div>
        </>
    );
};

export default RdsCompNotificationSettings;
