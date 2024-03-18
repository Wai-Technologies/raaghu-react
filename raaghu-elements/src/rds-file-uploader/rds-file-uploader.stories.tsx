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
        extensions: "png, jpg, doc, pdf, ppt",
        limit: 5,
        validation: [
            { isError: false, hint: "File size exceeds the limit" }
        ],
    }
} satisfies Story;
Default.parameters = { controls: { include: ['size', 'multiple', 'extensions', 'limit'] } };

export const Multiple: Story = {
    args: {
        colorVariant: "primary",
        multiple: true,
        extensions: "png, jpg, doc, pdf, ppt",
        limit: 5,
        size: "large",
        validation: [
            { isError: false, hint: "File size exceeds the limit" }
        ],
    }
} satisfies Story;
Multiple.parameters = { controls: { include: ['colorVariant', 'multiple', 'extensions', 'limit', 'size'] } };


