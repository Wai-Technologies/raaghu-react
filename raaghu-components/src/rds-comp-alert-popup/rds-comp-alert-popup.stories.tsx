import type { Meta, StoryObj } from '@storybook/react';
import RdsCompAlertPopup from "./rds-comp-alert-popup";
import React from 'react';

const meta: Meta = {
    title: "Components/Alert Popup",
    component: RdsCompAlertPopup,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompAlertPopup>;

export default meta;
type Story = StoryObj<typeof RdsCompAlertPopup>;
 
export const Default: Story = (args : any) => (
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
    alertConfirmation: "Are you sure to Delete?", // Added question mark for clarity
    messageAlert: "This record will be deleted permanently.", // Added period for completeness
    cancelBtnLabel: "Cancel",
    deleteBtnLabel: "Delete",
};

Default.parameters = { 
    controls: { 
        include: ['alertID', 'iconUrl', 'colorVariant', 'alertConfirmation', 'messageAlert', 'cancelBtnLabel', 'deleteBtnLabel'] 
    } 
};
