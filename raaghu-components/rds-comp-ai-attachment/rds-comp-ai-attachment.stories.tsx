import RdsCompAiAttachment from "./rds-comp-ai-attachment";
import { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from 'storybook/test';
 
const meta: Meta = {
    title: "Components/AI ChatBox/Attachment",
    component: RdsCompAiAttachment,
    argTypes: {
        badgeColor: {
            control: { type: 'select' },
            options: ['primary', 'secondary', 'tertiary', 'danger', 'warning', 'light', 'success'],
            description: 'Badge color variant',
            defaultValue: 'primary',
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
        menuIcon: "attachment_icon",
        modalTitle: "Import From Figma",
        hintText: "Hint Text",
        inputPlaceholder: "Enter URL",
        showBadge: true,
        badgeLabel: "Premium",
        badgeColor: "primary",
        uploadText: "Upload From Figma",
        importText: "Import From This Device",
        modalText: "Ask AI Pundit to turn your designs into code by attaching a link to a desired section or frame in your Figma file.",
        menuAlignment: "left",
    },
    play: async ({ canvasElement }) => {
        await expect(canvasElement.firstChild).toBeTruthy();
    },
}
Default.parameters = { controls: { include: ['menuIcon', 'modalTitle', 'hintText', 'inputPlaceholder', 'showBadge', 'badgeLabel', 'badgeColor', 'uploadText', 'importText', 'modalText'] } };