import React, { Fragment } from "react";
import { colors } from "../../libs/types";
import RdsIcon from "../rds-icon/rds-icon";
import RdsButton from "../rds-button";
import "./rds-notification.css";

export enum NotificationLayout {
    Vertical = "vertical",
    Horizontal = "horizontal"
}

export enum NotificationStyle {
    Default = "default",
    Avatar = "avatar",
    Icon = "icon",
    Image = "image"
}

export enum NotificationType {
    Error = "error",
    Info = "info",
    Success = "success",
    Warning = "warning"
}

export interface RdsNotificationProps {
    notifications: any[]; // Array of notifications
    layout?: NotificationLayout; // Layout of the notification
    style?: NotificationStyle; // Style of the notification
    type?: NotificationType; // Type of the notification
    showButton?: boolean; // Show buttons in the notification
    showPrimaryButton?: boolean; // Show primary button in the notification
    showSecondaryButton?: boolean; // Show secondary button in the notification
    showDismissIcon?: boolean; // Show dismiss button in the notification
    onDismiss?: (event: React.MouseEvent<HTMLElement>, notification: any) => void; // Event handler for dismiss button
    onAccept?: (event: React.MouseEvent<HTMLElement>, notification: any) => void; // Event handler for accept button
}


const RdsNotification = (props : RdsNotificationProps) => {
    return (
        <Fragment>
            {props.notifications.map((notification) => (
                <div
                    key={notification.userNotificationId}
                    className={`notification-card layout-${props.layout} style-${props.style} type-${props.type}`}
                >
                    <div className="notification-header">
                    {props.style === "image" && props.layout === "vertical" && (
                        <img
                            src={notification.image || "https://raaghustorageaccount.blob.core.windows.net/raaghu-blob/raaghu-design-system-lightmode.png"}
                            alt="Notification"
                            className="notification-image-horizontal me-2"
                            height="50px"
                            width="120px"
                        />
                    )}
                        {props.style === "avatar" && (
                            <img
                                src={notification.avatar || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp=CAU"}
                                alt="Avatar"
                                className="notification-avatar me-2"
                            />
                        )}
                        {props.style === "icon" && (
                            <RdsIcon name={notification.icon || "notification_icon"} stroke={true} width="38px" height="38px" classes="me-2"/>
                        )}
                        
                        <div className={`notification-title flex-grow-1 ${props.layout === "vertical" ? "" : ""}`}>
                                <strong>{notification.title}</strong>{" "}
                                <span className="text-muted ms-2">{notification.time}</span>
                            </div>
                        {/* <button
                            type="button"
                            className="btn-close position-absolute top-0 end-0 m-1"
                            aria-label="Close"
                            onClick={(e) => props.onDismiss?.(e, notification)}
                        ></button> */}
                        {props.showDismissIcon && (
                            <>
                        <RdsIcon name="close" classes="position-absolute top-0 end-0" stroke={true} width="13px" height="13px" isCursorPointer={true} onClick={(e) => props.onDismiss?.(e, notification)} />
                            </>
                        )}
                    </div>
                    <div className={`notification-body mt-2 ${props.layout === "vertical" && (props.style === "avatar" || props.style === "icon" || props.style === "image") ? "ms-5" : ""} `}>
                    {props.style === "image" && props.layout === "horizontal" && (
                            <img
                                src={notification.image || "https://raaghustorageaccount.blob.core.windows.net/raaghu-blob/raaghu-design-system-lightmode.png"}
                                alt="Notification"
                                className={`notification-image mt-3 ${props.layout === "horizontal" ? "me-3 full-width" : "h-50 w-100"}`}
                            />
                        )}
                        {notification.description}
                    </div>
                    <div className="notification-footer d-flex justify-content-end mt-2 gap-2">
                        {props.showButton && ( 
                        <>
                        {props.showSecondaryButton && (
                        <RdsButton
                            label="Dismiss"
                            size="small"
                            onClick={(e) => props.onDismiss?.(e, notification)}
                        />
                        )}
                        {props.showPrimaryButton && (
                        <RdsButton
                            label="Accept"
                            size="small"
                            onClick={(e) => props.onAccept?.(e, notification)}
                            style="transparent"
                            colorVariant="primary"
                        />
                        )}
                    </>
                        )}
                    </div>
                </div>
            ))}
        </Fragment>
    );
};

export default RdsNotification;





// import React, { Fragment, useEffect, useState } from "react";
// import { colors } from "../../libs/types";
// import RdsIcon from "../rds-icon/rds-icon";
// import RdsBadge from "../rds-badge/rds-badge";
// import RdsButton from "../rds-button";
// import "./rds-notification.css";

// export interface RdsNotificationProps {
//     colorVariant?: colors;
//     notifications: any[];
//     onSetAsRead?: (Event: React.MouseEventHandler<HTMLButtonElement>, notification: any) => void;
//     onMarkAsRead?: (Event: React.MouseEventHandler<HTMLButtonElement>, notifications: any) => void;
// }

// const RdsNotification = (props: RdsNotificationProps) => {
//     const [textColor, setTextColor] = useState("");
//     const [id, setId] = useState("");

//     const getIcon = (notification: any) => {
//         if (notification.status == "success") {
//             return "tick_circle";
//         }
//         if (notification.status == "warn") {
//             return "exclamation_circle";
//         }
//         if (notification.status == "error") {
//             return "close_circle";
//         }
//         if (notification.status == "info") {
//             return "information";
//         }
//         return "";
//     };

//     const getColor = (notification: any, isIcon = false) => {
//         if (isIcon) {
//             if (notification.status == "info") {
//                 return "primary";
//             }
//             if (notification.status == "error") {
//                 return "danger";
//             }
//             if (notification.status == "warn") {
//                 return "dark";
//             }
//             return notification.status;
//         } else {
//             if (notification.selected) {
//                 if (notification.status == "info") {
//                     setTextColor("text-primary");
//                 }
//                 if (notification.status == "error") {
//                     setTextColor("text-danger");
//                 }
//                 if (notification.status == "warn") {
//                     setTextColor("text-dark");
//                 }
//                 return "text-" + notification.status;
//             }
//         }
//     };
//     const textColorHandler = (notification: any, i: any) => {
//         console.log("index - " + i);
//         console.log("notification.status - " + notification.status);
//         if (notification.status == "success") {
//             setTextColor("text-success");
//         }
//         if (notification.status == "warn") {
//             setTextColor("text-dark");
//         }
//         if (notification.status == "error") {
//             setTextColor("text-danger");
//         }
//         if (notification.status == "info") {
//             setTextColor("text-primary");
//         }
//         setId(i);
//         console.log("TextColor - " + textColor);
//     };
//     const bgColor = "bg-" + (props.colorVariant || "success");

//     const onSetAsRead = (e: any, notification: any) => {
//         console.log(notification);
//         props.onSetAsRead != undefined && props.onSetAsRead(e, notification);
//     };
//     const onMarkAsRead = (e: any, notifications: any) => {
//         props.onSetAsRead != undefined && props.onSetAsRead(e, notifications);
//     };

//     useEffect(() => {
//     }, [props.notifications]);
//     return (
//         <Fragment>
//             <div className="card ">
//                 <div className={"card-header p-3 text-start headerStyle " + `${bgColor}`}>
//                     <div className="head ps-2 position-relative">
//                         <span>
//                             <RdsIcon
//                                 name="notification"
//                                 fill={false}
//                                 stroke={true}
//                                 colorVariant={bgColor.includes('bg-dark') || bgColor.includes('bg-primary') || bgColor.includes('bg-danger') ? 'light' : 'dark'}
//                                 width="30px"
//                                 height="30px"
//                                 isCursorPointer={true}
//                             />
//                         </span>
//                         <span className={`ms-2 me-3 ${
//                             bgColor.includes('bg-dark') ? 'text-light' : 
//                             bgColor.includes('bg-primary') ? 'text-light' :
//                             bgColor.includes('bg-danger') ? 'text-light' :
//                             'text-dark'
//                         }`}> Notification</span>

//                         {props.notifications?.length >= 1 && (
//                             <RdsBadge
//                                 label={`${props.notifications?.length}  New`}
//                                 colorVariant="success"
//                             />
//                         )}{" "}
//                     </div>
//                     <div>
//                         <RdsIcon
//                             name="gear"
//                             fill={false}
//                             stroke={true}
//                             colorVariant={bgColor.includes('bg-dark') || bgColor.includes('bg-primary') || bgColor.includes('bg-danger') ? 'light' : 'dark'}
//                             width="20px"
//                             height="20px"
//                             isCursorPointer={true}
//                         />{" "}
//                     </div>
//                 </div>
//                 {props.notifications?.map((notification: any, index: any) => (
//                     <div key={notification.userNotificationId}>
//                         <div
//                             className="d-flex py-2 px-2  justify-content-between"
//                             onClick={() => textColorHandler(notification, index)}
//                         >
//                             <div className="d-flex p-1">
//                                 <div
//                                     className="px-3 d-flex ps-0 align-items-center"
//                                 >
//                                     <RdsIcon
//                                         name={getIcon(notification)}
//                                         fill={false}
//                                         stroke={true}
//                                         colorVariant={getColor(notification, true)}
//                                         width="20px"
//                                         height="20px"
//                                         isCursorPointer={true}
//                                     />
//                                 </div>
//                                 <div className="text-start ps-0 w-100">
//                                     <div
//                                         className={
//                                             "fs-6 " +
//                                             `${notification.userNotificationId == id ? textColor : ""}`
//                                         }
//                                     >
//                                         {notification.title}{" "}
//                                     </div>
//                                     {notification.hasOwnProperty("url") == true && (
//                                         <a href={notification.url}>{notification.urlTitle}</a>
//                                     )}
//                                     <div>
//                                         <small className="text-muted">{notification.time}</small>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="me-2 align-self-center">
//                                 {" "}
//                                 <RdsButton
//                                     colorVariant="light"
//                                     label="Set as Read"
//                                     size="small"
//                                     type={"button"}
//                                     onClick={(e) => onSetAsRead(e, notification)}
//                                 />
//                             </div>

//                         </div>
//                         <hr className="m-0" />
//                     </div>
//                 ))}
//                 <div className="d-flex justify-content-end m-2">
//                     <RdsButton
//                         colorVariant="primary"
//                         label="Mark As Read"
//                         size="small"
//                         class="fw-semibold"
//                         type={"button"}
//                         onClick={(e) => onMarkAsRead(e, props.notifications)}
//                     />

//                 </div>
//             </div>
//         </Fragment>
//     );
// };

// export default RdsNotification;
