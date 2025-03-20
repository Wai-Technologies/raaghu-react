import type { Meta, StoryObj } from "@storybook/react";
import RdsConfirmationPopup from "./rds-confirmation-popup";

const meta: Meta = {
    title: "Elements/Confirmation Popup",
    component: RdsConfirmationPopup,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsConfirmationPopup>;

export default meta;
type Story = StoryObj<typeof RdsConfirmationPopup>;

export const Default: Story = {
    args: {
        alertID: "alert_popup",
        iconUrl: "delete",
        colorVariant: "danger",
        alertConfirmation: "Are you sure?",
        messageAlert: "This record will be deleted permanently.",
        cancelBtnLabel: "Cancel",
        deleteBtnLabel: "Delete",
        showIcon: true,
        showDescription: true,
    },
};

Default.parameters = { controls: { include: ['showIcon', 'showDescription'] } };