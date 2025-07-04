import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsCompAlertPopup from "./rds-comp-alert-popup";
import React from 'react';
import RdsCompOtpInput, { FieldStyle } from '../rds-comp-otpinput/rds-comp-otpinput';

const meta: Meta = {
    title: "Components/Alert Popup",
    component: RdsCompAlertPopup,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
        component: 
            'The **Alert Popup** component is a versatile and customizable UI element designed to display modal-based alerts, confirmations, or validations within your application. It supports various use cases, such as delete confirmations, OTP validations, and ownership transfers, making it ideal for interactive and user-driven workflows. The component includes properties like `alertID` to uniquely identify the popup, `iconUrl` to display an icon, `colorVariant` to define the theme (e.g., `primary`, `danger`, `success`), and `type` to specify the popup type (e.g., `default`, `otpvalidation`, `confirm`, `transfer_ownership`). Additionally, it allows customization of labels such as `alertConfirmation`, `messageAlert`, `cancelBtnLabel`, and `deleteBtnLabel` to tailor the content to specific actions. Fully customizable, the Alert Popup component is perfect for creating intuitive and engaging user experiences while maintaining consistency with your design system.'
    },
            source: {
              transform: (code: string) => {
                // Transform FieldStyle enum - remove spaces and transform
                code = code.replace(/"(Default|Square|Circle|Advance)"/g, '{FieldStyle.$1}');
                return code;
              }
            }
          }
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

export const Standard: Story = (args: any) => (
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

Standard.args = {
    alertID: "alert_popup",
    iconUrl: "delete",
    colorVariant: "danger",
    alertConfirmation: "Are you sure to Delete?",
    messageAlert: "This record will be deleted permanently.",
    cancelBtnLabel: "Cancel",
    deleteBtnLabel: "Delete",
    type: "default"
};

Standard.parameters = {
    controls: {
        include: ['alertID', 'iconUrl', 'colorVariant', 'alertConfirmation', 'messageAlert', 'cancelBtnLabel', 'deleteBtnLabel','type']
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
            <RdsCompOtpInput otpSize={6} fieldStyle={FieldStyle.Advance} iconUrl={args.iconUrl}/>
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