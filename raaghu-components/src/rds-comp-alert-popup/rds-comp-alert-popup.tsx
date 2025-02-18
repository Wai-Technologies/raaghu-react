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
    children?: React.ReactNode;
    type?: string;
    labelText?: string;
    buttonlabel?:string;

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
    const type = props.type || "default";

    return (
        <div>
           {(type=="default" || type =="confirm" || type== "transfer_ownership") &&( <RdsModal
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
                            height={`${props.type == "confirm" || props.type == "transfer_ownership"  ? "65px":"28px"}`}
                            width={`${props.type == "confirm" || props.type == "transfer_ownership" ? "65px":"28px"}`}
                            name={iconUrl}
                            fill={false}
                            stroke={true}
                            colorVariant={colorVariant}
                            classes={`border-${props.type == "default" ?"danger" :"none"} px-3 py-3  rounded-5`}
                        />
                    </p>
                    <h4>
                        <RdsLabel class="align-items-center  justify-content-center" label={alertConfirmation} />
                    </h4>
                    <span>
                        <RdsLabel class="text-muted align-items-center  justify-content-center" label={messageAlert} />
                    </span>
                    {props.children}
                  {type=="default" &&(  <div className="mt-4 pt-2 d-flex gap-3 justify-content-center">
                        <RdsButton
                            onClick={props.onCancel}
                            class="px-2"
                            databsdismiss="modal"
                            aria-label="close"
                            label={CancelButtonLabel}
                            size="small"
                            type="button"
                            tooltipTitle=""
                            colorVariant="danger"
                            isOutline={true}
                        />
                        <RdsButton
                            type="button"
                            class="px-2 text-white"
                            label={DeleteButtonLabel}
                            size="small"
                            tooltipTitle=""
                            colorVariant="danger"
                            databsdismiss="modal"
                            aria-label="close"
                            onClick={props.onSuccess}
                        />
                    </div>)}
                    {type=="confirm" &&(  <div className="mt-4 pt-2 d-flex gap-3 justify-content-center">
                        <RdsButton
                            type="button"
                            class="px-2 text-white"
                            label={props.buttonlabel}
                            size="small"
                            tooltipTitle=""
                            colorVariant={props.colorVariant}
                            databsdismiss="modal"
                            aria-label="close"
                            onClick={props.onSuccess}
                        />
                    </div>)}
                    {type=="transfer_ownership" &&(  <div className="mt-4 pt-2 d-flex gap-3 justify-content-center">
                        <RdsButton
                            onClick={props.onCancel}
                            class="px-2 "
                            databsdismiss="modal"
                            aria-label="close"
                            label={CancelButtonLabel}
                            size="small"
                            type="button"
                            tooltipTitle=""
                            colorVariant="primary"
                            isOutline={true}
                        />
                       <RdsButton
                            type="button"
                            class="px-2 text-white"
                            label={props.buttonlabel}
                            size="small"
                            tooltipTitle=""
                            colorVariant="primary"
                            databsdismiss="modal"
                            aria-label="close"
                            onClick={props.onSuccess}
                        />
                    </div>)}
                </div>
            </RdsModal>)}
            {type=="otpvalidation" &&( <RdsModal
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
                <div className="text-center py-4 px-4 mb-5 ">
                    
                 
                    {props.children}
                </div>
            </RdsModal>)}
        </div>
    );
};


export default RdsCompAlertPopup;
