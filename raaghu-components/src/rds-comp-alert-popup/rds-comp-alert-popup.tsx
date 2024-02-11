import React from "react";
import { RdsModal, RdsIcon, RdsButton, RdsLabel } from "../rds-elements";
import { useTranslation } from "react-i18next";
export interface RdsCompAlertPopupProps {
    alertID: any;
    iconUrl?: string;
    colorVariant?: string;
    alertConfirmation?: string;
    messageAlert?: string;
    cancelButtonLabel?: string;
    deleteButtonLabel?: string;
    cancelButtonColor?: string;
    deleteButtonColor?: string;

    onSuccess?: (Event: React.MouseEvent<HTMLButtonElement>) => void;
    onCancel?: (Event: React.MouseEvent<HTMLButtonElement>) => void;
}
const RdsCompAlertPopup = (props: RdsCompAlertPopupProps) => {
    const { t } = useTranslation();
    const iconUrl = props.iconUrl || "delete";
    const colorVariant = props.colorVariant || "danger";
    const alertConfirmation = props.alertConfirmation || t("AbpUi.AreYouSure") || "";
    const messageAlert =
        props.messageAlert || t("This record will be deleted permanently") || "";
    const CancelButtonLabel = props.cancelButtonLabel || t("AbpUi.Cancel") || "";
    const DeleteButtonLabel = props.deleteButtonLabel || t("AbpUi.Delete") || "";
    return (
        <div>
            <RdsModal
                modalId={props.alertID}
                modalBackdrop="static"
                preventEscapeKey={false}
                modalAnimation="modal fade"
                showModalFooter={false}
                showModalHeader={false}
                scrollable={false}
                size='default'
                verticallyCentered={true}
            >
                <div className="text-center  py-3 px-4 ">
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
                        <RdsLabel class="" label={messageAlert} />
                    </span>
                    <div className="mt-4 pt-2 d-flex gap-3 justify-content-center">
                        <RdsButton
                            onClick={props.onCancel}
                            class="px-2"
                            databsdismiss="modal"
                            arialabel="close"
                            label={CancelButtonLabel}
                            size="'small'"
                            type="button"
                            tooltipTitle=""
                            colorVariant="danger"
                            isOutline={true}
                        />
                        <RdsButton
                            type="button"
                            class="px-2 text-white"
                            label={DeleteButtonLabel}
                            size="'small'"
                            tooltipTitle=""
                            colorVariant="danger"
                            databsdismiss="modal"
                            arialabel="close"
                            onClick={props.onSuccess}
                        />
                    </div>
                </div>
            </RdsModal>
        </div>
    );
};

export default RdsCompAlertPopup;
