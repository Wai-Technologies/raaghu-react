import type { Meta, StoryObj } from '@storybook/react';
import RdsCompAlertPopup from "./rds-comp-alert-popup";
import React from 'react';
import RdsCompOtpInput from '../rds-comp-otpinput/rds-comp-otpinput';

const meta: Meta = {
    title: "Components/Alert Popup",
    component: RdsCompAlertPopup,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
            colorVariant: {
                options: ["primary", "success", "danger", "warning", "info", "secondary"],
                control: { type: "select" },
            }
    },
} satisfies Meta<typeof RdsCompAlertPopup>;

export default meta;
type Story = StoryObj<typeof RdsCompAlertPopup>;

export const Default: Story = (args: any) => (
    <>
        <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target={`#${args.alertID}`}
        >
            ALERT POPUP
        </button>
        <RdsCompAlertPopup {...args} />
    </>
);

Default.args = {
    alertID: "alert_popup",
    iconUrl: "delete",
    colorVariant: "danger",
    alertConfirmation: "Are you sure to Delete?",
    messageAlert: "This record will be deleted permanently.",
    cancelBtnLabel: "Cancel",
    deleteBtnLabel: "Delete",
    type: "default"
};

Default.parameters = {
    controls: {
        include: ['alertID', 'iconUrl', 'colorVariant', 'alertConfirmation', 'messageAlert', 'cancelBtnLabel', 'deleteBtnLabel','type']
    }
};

export const OtpValidation: Story = (args: any) => (
    <>
        <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target={`#${args.alertID}`}
        >
            OTP VALIDATION POPUP
        </button>
        <RdsCompAlertPopup {...args}>
            <RdsCompOtpInput otpSize={6} fieldStyle="Advance" iconUrl={args.iconUrl}/>
        </RdsCompAlertPopup>
    </>
);

OtpValidation.args = {
    alertID: "otp_validation_popup",
    iconUrl: "otpvalidation",
    type: "otpvalidation",
};

OtpValidation.parameters = {
    controls: {
        include: [ 'iconUrl']
    }
};

export const Confirm: Story = (args: any) => (
    <>
        <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target={`#${args.alertID}`}
        >
            CONFIRM POPUP
        </button>
        <RdsCompAlertPopup {...args} />
    </>
);

Confirm.args = {
    alertID: "alert_popup",
    iconUrl: "tick_circle",
    colorVariant: "primary",
    alertConfirmation: "Ownership transfer is complete !",
    messageAlert: "Full control has been granted. Thank you for your patience",
    buttonlabel: "Ok",
    type: "confirm"
};

Confirm.parameters = {
    controls: {
        include: ['alertID', 'iconUrl', 'colorVariant', 'alertConfirmation', 'messageAlert', 'buttonlabel','type']
    }
};
export const Transfer_Ownership: Story = (args: any) => (
    <>
        <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target={`#${args.alertID}`}
        >
           TRANSFER POPUP
        </button>
        <RdsCompAlertPopup {...args} />
    </>
);

Transfer_Ownership.args = {
    alertID: "alert_popup",
    iconUrl: "exchange",
    colorVariant: "primary",
    alertConfirmation: "Are you Sure?",
    messageAlert: "This will transfer the ownership and assign them full control based on their new role. You can modify it later if needed.",
    buttonlabel: "Confirm",
    cancelBtnLabel: "Cancel",
    type: "transfer_ownership"
};

Transfer_Ownership.parameters = {
    controls: {
        include: ['alertID', 'iconUrl', 'colorVariant', 'alertConfirmation', 'messageAlert', 'buttonlabel','cancelBtnLabel','type']
    }
};