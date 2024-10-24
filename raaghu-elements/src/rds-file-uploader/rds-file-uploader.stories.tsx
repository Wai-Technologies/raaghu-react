
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
        
       
        title: {
            control: { type: "text" },
        },
        isRequired: {
            control: { type: "boolean" },
        },
        showTitle: {
            control: { type: "boolean" },
        },
        showHint: {
            control: { type: "boolean" },
        },
        hintText: {
            control: { type: "text" },
        },
        multiple: {
            control: { type: "boolean" },
        }
    },
} satisfies Meta<typeof RdsFileUploader>;

export default meta;
type Story = StoryObj<typeof RdsFileUploader>;

export const Default: Story = {
    args: {
        extensions: "png, jpg, doc, pdf, ppt",
        fileSizeLimitInMb: 5,
        validation: [
            { isError: false, hint: "File size exceeds the limit" }
        ],
        title: "Title",
        isRequired: true,
        showTitle: true,
        showHint: true,
        hintText: "File size should be less than given file size limit",
    }
} satisfies Story;
Default.parameters = { controls: { include: ['extensions', 'fileSizeLimitInMb', 'title', 'isRequired', 'showTitle', 'showHint', 'hintText'] } };

export const Drop_Area_Top_Icon
: Story = {
    args: {
        Drop_Area_Top_Icon: true,
        multiple: true,
        extensions: "png, jpg, doc, pdf, ppt",
        fileSizeLimitInMb: 5,
        validation: [
            { isError: false, hint: "File size exceeds the limit" }
        ],
        title: "Title",
        isRequired: true,
        showTitle: true,
        showHint: true,
        hintText: "File size should be less than given file size limit",
    }
} satisfies Story;
Drop_Area_Top_Icon.parameters = { controls: { include: ['multiple','extensions', 'fileSizeLimitInMb', 'title', 'isRequired', 'showTitle', 'showHint', 'hintText'] } };

export const Drop_Area_Side_Icon
: Story = {
    args: {
        Drop_Area_Side_Icon: true,
        multiple: true,
        extensions: "png, jpg, doc, pdf, ppt",
        fileSizeLimitInMb: 5,
        showThumbnail: false,
        validation: [
            { isError: false, hint: "File size exceeds the limit" }
        ],
        title: "Title",
        isRequired: true,
        showTitle: true,
        showHint: true,
        hintText: "File size should be less than given file size limit",
    }
} satisfies Story;
Drop_Area_Side_Icon.parameters = { controls: { include: ['multiple','showThumbnail', 'extensions', 'fileSizeLimitInMb', 'title', 'isRequired', 'showTitle', 'showHint', 'hintText'] } };

export const Drop_Area_With_Upload_Button
: Story = {
    args: {
        Drop_Area_With_Upload_Button : true,
        multiple: true,
        extensions: "png, jpg, doc, pdf, ppt",
        fileSizeLimitInMb: 5,
        validation: [
            { isError: false, hint: "File size exceeds the limit" }
        ],
        title: "Title",
        isRequired: true,
        showTitle: true,
        showHint: true,
        hintText: "File size should be less than given file size limit",
    }
} satisfies Story;
Drop_Area_With_Upload_Button.parameters = { controls: { include: ['extensions', 'fileSizeLimitInMb', 'title', 'isRequired', 'showTitle', 'showHint', 'hintText'] } };