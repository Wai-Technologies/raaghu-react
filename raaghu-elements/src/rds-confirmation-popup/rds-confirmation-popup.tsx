import React from "react";
import RdsButton from "../rds-button";
import RdsIcon from "../rds-icon";
import RdsLabel from "../rds-label";
import RdsModal from "../rds-modal";
import "./rds-confirmation-popup.css";

export interface RdsCompAlertPopupProps {
    alertID: string;
    iconUrl?: string;
    colorVariant?: string;
    alertConfirmation?: string;
    messageAlert?: string;
    cancelBtnLabel?: string;
    deleteBtnLabel?: string;
    cancelButtonColor?: string;
    deleteButtonColor?: string;
    children?: React.ReactNode;
    labelText?: string;
    buttonlabel?: string;
    onSuccess?: (Event: React.MouseEvent<HTMLButtonElement>) => void;
    onCancel?: (Event: React.MouseEvent<HTMLButtonElement>) => void;
    showIcon?: boolean;
    showDescription?: boolean;
}

const RdsConfirmationPopup = (props: RdsCompAlertPopupProps) => {

    return (
        <div id="confirmation-popup">
            <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target={`#${props.alertID}`}
            >
                ALERT POPUP
            </button>
            <RdsModal
                modalId={props.alertID}
                modalBackdrop={true}
                preventEscapeKey={false}
                modalAnimation="modal fade"
                showModalFooter={false}
                showModalHeader={false}
                scrollable={false}
                size="default"
                verticallyCentered={true}
            >
                <div className="popup-btn-color">
                    <div className="text-center py-3 px-4">
                        {props.showIcon && (
                            <p className="align-items-center d-flex justify-content-center">
                                <div className="icon-circle">
                                    <RdsIcon
                                        height="50px"
                                        width="50px"
                                        name={props.iconUrl}
                                        fill={false}
                                        stroke={true}
                                        colorVariant={props.colorVariant}
                                        classes={`px-3 py-3`}
                                    />
                                </div>
                            </p>
                        )}
                        <h4>
                            <RdsLabel class="align-items-center  justify-content-center" label={props.alertConfirmation} />
                        </h4>
                        {props.showDescription && (
                            <span>
                                <RdsLabel class="text-muted align-items-center  justify-content-center" label={props.messageAlert} />
                            </span>
                        )}
                        {props.children}
                        <div className="mt-4 pt-2 d-flex gap-3 justify-content-center">
                            <RdsButton
                                onClick={props.onCancel}
                                class="px-2"
                                databsdismiss="modal"
                                aria-label="close"
                                label={props.cancelBtnLabel}
                                size="small"
                                type="button"
                                tooltipTitle=""
                                colorVariant="primary"
                                isOutline={true}
                                style={"outline"}
                            />
                            <RdsButton
                                type="button"
                                class="px-2 text-white"
                                label={props.deleteBtnLabel}
                                size="small"
                                tooltipTitle=""
                                colorVariant="primary"
                                databsdismiss="modal"
                                aria-label="close"
                                onClick={props.onSuccess}
                            />
                        </div>
                    </div>
                </div>
            </RdsModal>
        </div>
    );
};

export default RdsConfirmationPopup;