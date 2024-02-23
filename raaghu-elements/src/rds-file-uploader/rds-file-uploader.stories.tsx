import React from "react";
import RdsFileUploader from "./rds-file-uploader";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: 'Elements/File Uploader',
    component: RdsFileUploader,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
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
} satisfies Meta<typeof RdsFileUploader>;

export default meta;
type Story = StoryObj<typeof RdsFileUploader>;

export const Default: Story = {
    args: {
        size: "large",
        multiple: false,
        extensions: "",
    }
} satisfies Story;
Default.parameters = { controls: { include: ['size', 'multiple', 'extensions'] } };

export const Multiple: Story = {
    args: {
        colorVariant: "primary",
        placeholder: "for E.g. ",
        multiple: true,
        extensions: "",
        limit: 5,
        size: "large",
    }
} satisfies Story;
Multiple.parameters = { controls: { include: ['placeholder', 'colorVariant', 'multiple', 'extensions', 'limit', 'size'] } };


