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
        title: {
            control: { type: "text" },
        },
        mandatory: {
            control: { type: "boolean" },
        },
        showTitle: {
            control: { type: "boolean" },
        },
        showHint: {
            control: { type: "boolean" },
        },
    },
} satisfies Meta<typeof RdsFileUploader>;

export default meta;
type Story = StoryObj<typeof RdsFileUploader>;

export const Default: Story = {
    args: {
        size: "large",
        Drop_Area_Top_Icon: false,
        Drop_Area_Side_Icon: false,
        Drop_Area_With_Upload_Button : false,
        Drop_Area_With_Icon: false,
        extensions: "png, jpg, doc, pdf, ppt",
        limit: 5,
        validation: [
            { isError: false, hint: "File size exceeds the limit" }
        ],
        title: "Title",
        mandatory: true,
        showTitle: true,
        showHint: true,
    }
} satisfies Story;
Default.parameters = { controls: { include: ['size', 'extensions', 'limit', 'title', 'mandatory', 'showTitle', 'showHint'] } };

export const Drop_Area_Top_Icon
: Story = {
    args: {
        colorVariant: "primary",
        Drop_Area_Top_Icon: true,
        Drop_Area_Side_Icon: false,
        Drop_Area_With_Upload_Button : false,
        Drop_Area_With_Icon: false,
        extensions: "png, jpg, doc, pdf, ppt",
        limit: 5,
        size: "large",
        validation: [
            { isError: false, hint: "File size exceeds the limit" }
        ],
        title: "Title",
        mandatory: true,
        showTitle: true,
        showHint: true,
    }
} satisfies Story;
Drop_Area_Top_Icon.parameters = { controls: { include: ['colorVariant','extensions', 'limit', 'size', 'title', 'mandatory', 'showTitle', 'showHint'] } };

export const Drop_Area_Side_Icon
: Story = {
    args: {
        colorVariant: "primary",
        Drop_Area_Top_Icon: false,
        Drop_Area_Side_Icon: true,
        Drop_Area_With_Upload_Button : false,
        Drop_Area_With_Icon: false,
        extensions: "png, jpg, doc, pdf, ppt",
        limit: 5,
        size: "large",
        validation: [
            { isError: false, hint: "File size exceeds the limit" }
        ],
        title: "Title",
        mandatory: true,
        showTitle: true,
        showHint: true,
    }
} satisfies Story;
Drop_Area_Side_Icon.parameters = { controls: { include: ['colorVariant','extensions', 'limit', 'size', 'title', 'mandatory', 'showTitle', 'showHint'] } };

export const Drop_Area_With_Upload_Button
: Story = {
    args: {
        colorVariant: "primary",
        Drop_Area_Top_Icon: false,
        Drop_Area_Side_Icon: false,
        Drop_Area_With_Upload_Button : true,
        extensions: "png, jpg, doc, pdf, ppt",
        limit: 5,
        size: "large",
        validation: [
            { isError: false, hint: "File size exceeds the limit" }
        ],
        title: "Title",
        mandatory: true,
        showTitle: true,
        showHint: true,
    }
} satisfies Story;
Drop_Area_With_Upload_Button.parameters = { controls: { include: ['colorVariant',  'extensions', 'limit', 'size', 'title', 'mandatory', 'showTitle', 'showHint'] } };
export const Drop_Area_With_Icon
: Story = {
    args: {
        colorVariant: "primary",
        Drop_Area_Top_Icon: false,
        Drop_Area_Side_Icon: false,
        Drop_Area_With_Upload_Button : false,
        Drop_Area_With_Icon: true,
        extensions: "png, jpg, doc, pdf, ppt",
        limit: 5,
        size: "large",
        validation: [
            { isError: false, hint: "File size exceeds the limit" }
        ],
        title: "Title",
        mandatory: true,
        showTitle: true,
        showHint: true,
        showIcon: true,
    }
} satisfies Story;
Drop_Area_With_Icon.parameters = { controls: { include: ['colorVariant','extensions', 'limit', 'size', 'title', 'mandatory', 'showTitle', 'showHint','showIcon'] } };