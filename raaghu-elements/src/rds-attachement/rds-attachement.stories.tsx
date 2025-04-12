import RdsAttachement from "./rds-attachement";
import { Meta, StoryObj } from "@storybook/react";
 
const meta: Meta = {
    title: "Components/AI ChatBox/Attachement",
    component: RdsAttachement,
    argTypes: {
    },
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof RdsAttachement>;
 
 
export default meta;
type Story = StoryObj<typeof RdsAttachement>;
 
export const Default: Story = {
    args: {
        menuIcon: "attachment_icon",
        modalTitle: "Import From Figma",
        hintText: "Hint Text",
        inputPlaceholder: "Enter URL",
        showBadge: true,
        badgeLabel: "Premium",
        badgeColor: "success",
        uploadText: "Upload From Figma",
        importText: "Import From This Device",
        modalText: "Ask AI Pundit to turn your designs into code by attaching a link to a desired section or frame in your Figma file.",
        handleAddComment: (comment) => console.log('Comment added:', comment),
    },
}