import type { Meta, StoryObj } from '@storybook/react';
import RdsCompAlertPopup from "./rds-comp-alert-popup";


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

export const Default: Story = {
    args: {
        alertID: "alert_popup",
        iconUrl: "delete",
        colorVariant: "danger",
        alertConfirmation: "Are you sure to Delete",
        messageAlert: "This record will be deleted permanently",
        cancelButtonLabel: "Cancel",
        deleteButtonLabel: "Delete",
    }
} satisfies Story;