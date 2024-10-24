import React from "react";
import { RdsModal, RdsIcon, RdsButton, RdsLabel } from "../rds-elements";

export interface RdsCompAlertPopupProps {
    alertID: any;
    iconUrl?: string;
    colorVariant?: string;
    alertConfirmation?: string;
    messageAlert?: string;
    cancelBtnLabel?: string;
    deleteBtnLabel?: string;
    cancelButtonColor?: string;
    deleteButtonColor?: string;

    onSuccess?: (Event: React.MouseEvent<HTMLButtonElement>) => void;
    onCancel?: (Event: React.MouseEvent<HTMLButtonElement>) => void;
}

const RdsCompAlertPopup = (props: RdsCompAlertPopupProps) => {
    const iconUrl = props.iconUrl || "delete";
    const colorVariant = props.colorVariant || "danger";
    const alertConfirmation = props.alertConfirmation || "Are You Sure?";
    const messageAlert = props.messageAlert || "This record will be deleted permanently.";
    const CancelButtonLabel = props.cancelBtnLabel || "Cancel";
    const DeleteButtonLabel = props.deleteBtnLabel || "Delete";

    return (
        <div>
            <RdsModal
                modalId={props.alertID}
                modalBackdrop={true} 
                preventEscapeKey={false}
                modalAnimation="modal fade"
                showModalFooter={false}
                showModalHeader={false}
                scrollable={false}
                size='default'
                verticallyCentered={true}
            >
                <div className="text-center py-3 px-4">
                    <p className="align-items-center d-flex justify-content-center">
                        <RdsIcon
                            height="28px"
                            width="28px"
                            name={iconUrl}
                            fill={false}
                            stroke={true}
                            colorVariant={colorVariant}
                            classes="border-danger px-3 py-3 border rounded-5"
                        />
                    </p>
                    <h4>
                        <RdsLabel label={alertConfirmation} />
                    </h4>
                    <span>
                        <RdsLabel label={messageAlert} />
                    </span>
                    <div className="mt-4 pt-2 d-flex gap-3 justify-content-center">
                        <RdsButton
                            onClick={props.onCancel}
                            class="px-2"
                            databsdismiss="modal"
                            aria-label="close"
                            label={CancelButtonLabel}
                            size="small" // Corrected from "'small'" to "small"
                            type="button"
                            tooltipTitle=""
                            colorVariant="danger"
                            isOutline={true}
                        />
                        <RdsButton
                            type="button"
                            class="px-2 text-white"
                            label={DeleteButtonLabel}
                            size="small" // Corrected from "'small'" to "small"
                            tooltipTitle=""
                            colorVariant="danger"
                            databsdismiss="modal"
                            aria-label="close"
                            onClick={props.onSuccess}
                        />
                    </div>
                </div>
            </RdsModal>
        </div>
    );
};

export default RdsCompAlertPopup;
