import type { Meta, StoryObj } from "@storybook/react";
import RdsConfirmationPopup from "./rds-confirmation-popup";

const meta: Meta = {
    title: "Elements/Confirmation Popup",
    component: RdsConfirmationPopup,
    parameters: {
        layout: 'padded',
   docs: {
    description: {
        component:
            'The **Confirmation Popup** component is a reusable modal dialog for requesting user confirmation before performing critical or irreversible actions, such as deleting a record. It supports customizable icons, color variants, confirmation messages, and button labels to match your application’s style and requirements. Optional features include displaying an icon and a descriptive message to provide additional context for the user. This component is ideal for use in forms, dashboards, or any interface where user acknowledgment is needed to proceed, helping prevent accidental actions and ensuring clear communication.'
    }
}
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsConfirmationPopup>;

export default meta;
type Story = StoryObj<typeof RdsConfirmationPopup>;

export const Standard: Story = {
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

Standard.parameters = { controls: { include: ['showIcon', 'showDescription'] } };