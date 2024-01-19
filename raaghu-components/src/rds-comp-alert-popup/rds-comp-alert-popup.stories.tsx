import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsCompAlertPopup from "./rds-comp-alert-popup";

export default {
    title: "Components/AlertPopup",
    component: RdsCompAlertPopup,
} as ComponentMeta<typeof RdsCompAlertPopup>;

const Template: ComponentStory<typeof RdsCompAlertPopup> = (args) => (
    <>
        {/* // Button trigger modal  */}
        <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#alert_popup"
        >
            Alert popup
        </button>
        <RdsCompAlertPopup {...args} />
    </>
);

export const AlertPopup = Template.bind({});

AlertPopup.args = {
    alertID: "alert_popup",
    iconUrl: "delete",
    colorVariant: "danger",
    alertConfirmation: "Are you sure to Delete",
    messageAlert: "This record will be deleted permanently",
    cancelButtonLabel: "Cancel",
    deleteButtonLabel: "Delete",
};
