import type { Meta, StoryObj } from "@storybook/react";
import RdsCompCapturer from "./rds-comp-capturer";

const meta: Meta = {
    title: "Components/Capturer",
    component: RdsCompCapturer,
    parameters: {
        layout: "padded",
    },
    tags: ["autodocs"],
    argTypes: {},
} satisfies Meta<typeof RdsCompCapturer>;

export default meta;
type Story = StoryObj<typeof RdsCompCapturer>;

export const Default: Story = {
    args: {
        username: "David",
        takeScreenshotButtonLabel: "Screenshot",
        recordScreenButtonLabel: "Record",
        submitButtonLabel: "Submit",
        uploadButtonLabel: "Upload",
        bugTitle: "Bug Title",
        email: "john.doe@gmail.com",
        description: "Describe the issue",
        onSaveHandler: (data: any) => { },
        capturerFields: {}
    },
} satisfies Story;
