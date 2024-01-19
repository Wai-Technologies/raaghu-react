import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsFileUploader from "./rds-file-uploader";

export default {
    title: "Elements/File Uploader",
    component: RdsFileUploader,
    argTypes: {
        size: {
            options: ["small", "large"],
            control: { type: "radio" },
        },
        colorVariant: {
            options: [
                "primary",
                "secondary",
                "success",
                "danger",
                "warning",
                "info",
                "light",
                "dark",
                "white",
            ],

            extensions: {},
            control: { type: "select" },
        },
    },
} as ComponentMeta<typeof RdsFileUploader>;

const Template: ComponentStory<typeof RdsFileUploader> = (args) => (
    <RdsFileUploader {...args} />
);

export const Default = Template.bind({});

Default.args = {
    size: "large",
    multiple: false,
    extensions: "",
    colorVariant: "dark",
};

export const Multiple = Template.bind({});

Multiple.args = {
    colorVariant: "primary",
    placeholder: "for E.g. ",
    multiple: true,
    extensions: "",
    limit: 5,
};
