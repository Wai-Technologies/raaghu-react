import React, { Fragment, useEffect, useState } from "react";
import { colors } from "../../libs/types";
import RdsIcon from "../rds-icon/rds-icon";
import RdsBadge from "../rds-badge/rds-badge";
import RdsButton from "../rds-button";
import "./rds-notification.css";

export interface RdsNotificationProps {
    colorVariant?: colors;
    notifications: any[];
    onSetAsRead?: (Event: React.MouseEventHandler<HTMLButtonElement>, notification: any) => void;
    onMarkAsRead?: (Event: React.MouseEventHandler<HTMLButtonElement>, notifications: any) => void;
}

const RdsNotification = (props: RdsNotificationProps) => {
    const [textColor, setTextColor] = useState("");
    const [id, setId] = useState("");

    const getIcon = (notification: any) => {
        if (notification.status == "success") {
            return "tick_circle";
        }
        if (notification.status == "warn") {
            return "exclamation_circle";
        }
        if (notification.status == "error") {
            return "close_circle";
        }
        if (notification.status == "info") {
            return "information";
        }
        return "";
    };

    const getColor = (notification: any, isIcon = false) => {
        if (isIcon) {
            if (notification.status == "info") {
                return "primary";
            }
            if (notification.status == "error") {
                return "danger";
            }
            if (notification.status == "warn") {
                return "dark";
            }
            return notification.status;
        } else {
            if (notification.selected) {
                if (notification.status == "info") {
                    setTextColor("text-primary");
                }
                if (notification.status == "error") {
                    setTextColor("text-danger");
                }
                if (notification.status == "warn") {
                    setTextColor("text-dark");
                }
                return "text-" + notification.status;
            }
        }
    };
    const textColorHandler = (notification: any, i: any) => {
        console.log("index - " + i);
        console.log("notification.status - " + notification.status);
        if (notification.status == "success") {
            setTextColor("text-success");
        }
        if (notification.status == "warn") {
            setTextColor("text-dark");
        }
        if (notification.status == "error") {
            setTextColor("text-danger");
        }
        if (notification.status == "info") {
            setTextColor("text-primary");
        }
        setId(i);
        console.log("TextColor - " + textColor);
    };
    const bgColor = "bg-" + (props.colorVariant || "success");

    const onSetAsRead = (e: any, notification: any) => {
        console.log(notification);
        props.onSetAsRead != undefined && props.onSetAsRead(e, notification);
    };
    const onMarkAsRead = (e: any, notifications: any) => {
        props.onSetAsRead != undefined && props.onSetAsRead(e, notifications);
    };

    useEffect(() => {
    }, [props.notifications]);
    return (
        <Fragment>
            <div className="card ">
                <div className={"card-header p-3 text-start headerStyle " + `${bgColor}`}>
                    <div className="head ps-2 position-relative">
                        <span>
                            <RdsIcon
                                name="notification"
                                fill={false}
                                stroke={true}
                                colorVariant={bgColor.includes('bg-dark') || bgColor.includes('bg-primary') || bgColor.includes('bg-danger') ? 'light' : 'dark'}
                                width="30px"
                                height="30px"
                            />
                        </span>
                        <span className={`ms-2 me-3 ${
                            bgColor.includes('bg-dark') ? 'text-light' : 
                            bgColor.includes('bg-primary') ? 'text-light' :
                            bgColor.includes('bg-danger') ? 'text-light' :
                            'text-dark'
                        }`}> Notification</span>

                        {props.notifications?.length >= 1 && (
                            <RdsBadge
                                label={`${props.notifications?.length}  New`}
                                colorVariant="success"
                            />
                        )}{" "}
                    </div>
                    <div>
                        <RdsIcon
                            name="gear"
                            fill={false}
                            stroke={true}
                            colorVariant={bgColor.includes('bg-dark') || bgColor.includes('bg-primary') || bgColor.includes('bg-danger') ? 'light' : 'dark'}
                            width="20px"
                            height="20px"
                        />{" "}
                    </div>
                </div>
                {props.notifications?.map((notification: any, index: any) => (
                    <div key={notification.userNotificationId}>
                        <div
                            className="d-flex py-2 px-4  justify-content-between"
                            onClick={() => textColorHandler(notification, index)}
                        >
                            <div className="d-flex p-1">
                                <div
                                    className="px-3 d-flex ps-0 align-items-center"
                                >
                                    <RdsIcon
                                        name={getIcon(notification)}
                                        fill={false}
                                        stroke={true}
                                        colorVariant={getColor(notification, true)}
                                        width="20px"
                                        height="20px"
                                    />
                                </div>
                                <div className="text-start ps-0 w-100">
                                    <div
                                        className={
                                            "fs-6 " +
                                            `${notification.userNotificationId == id ? textColor : ""}`
                                        }
                                    >
                                        {notification.title}{" "}
                                    </div>
                                    {notification.hasOwnProperty("url") == true && (
                                        <a href={notification.url}>{notification.urlTitle}</a>
                                    )}
                                    <div>
                                        <small className="text-muted">{notification.time}</small>
                                    </div>
                                </div>
                            </div>
                            <div className=" align-self-center">
                                {" "}
                                <RdsButton
                                    colorVariant="light"
                                    label="Set as Read"
                                    type={"button"}
                                    onClick={(e) => onSetAsRead(e, notification)}
                                />
                            </div>

                        </div>
                        <hr className="m-0" />
                    </div>
                ))}
                <div className="d-flex justify-content-end m-4 ">
                    <RdsButton
                        colorVariant="primary"
                        label="Mark As Read"
                        class="fw-semibold"
                        type={"button"}
                        onClick={(e) => onMarkAsRead(e, props.notifications)}
                    />

                </div>
            </div>
        </Fragment>
    );
};

export default RdsNotification;
