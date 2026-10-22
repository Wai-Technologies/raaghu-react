import RdsCompAiAttachment from "./rds-comp-ai-attachment";
import { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from 'storybook/test';
 
const meta: Meta = {
    title: "Components/AI ChatBox/Attachment",
    component: RdsCompAiAttachment,
    argTypes: {
        placement: {
            control: { type: 'select' },
            options: ['start', 'end'],
        },
    },
    parameters: {
            status: { type: 'stable' },
        layout: 'padded',
        docs:{
            story: {
                height: '132px'
            },
        }
    },
    tags: ['autodocs', 'stable'],
} satisfies Meta<typeof RdsCompAiAttachment>;


export default meta;
type Story = StoryObj<typeof RdsCompAiAttachment>;

export const Default: Story = {
    args: {
        icon: "attachment_icon",
        badge: "Premium",
        badgeProps: { color: "primary" },
        slotProps: {
            menu: { uploadText: "Upload From Figma", importText: "Import From This Device" },
            dialog: {
                title: "Import From Figma",
                text: "Ask AI Pundit to turn your designs into code by attaching a link to a desired section or frame in your Figma file.",
                hintText: "Hint Text",
                placeholder: "Enter URL",
            },
        },
        placement: "start",
    },
    play: async ({ canvasElement }) => {
        await expect(canvasElement.firstChild).toBeTruthy();
    },
}
Default.parameters = { controls: { include: ['icon', 'badge', 'badgeProps', 'slotProps', 'placement'] } };