import RdsCompAiAttachement from "./rds-comp-ai-attachement";
import { Meta, StoryObj } from "@storybook/react-vite";
 
const meta: Meta = {
    title: "Components/AI ChatBox/Attachement",
    component: RdsCompAiAttachement,
    argTypes: {
    },
    parameters: {
        layout: 'padded',
        docs:{
            story: {
                height: '132px'
            },
        }
    },
    tags: ['autodocs'],
} satisfies Meta<typeof RdsCompAiAttachement>;


export default meta;
type Story = StoryObj<typeof RdsCompAiAttachement>;

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
        //modalText: "Ask AI Pundit to turn your designs into code by attaching a link to a desired section or frame in your Figma file.",
        handleAddComment: (comment) => console.log('Comment added:', comment),
        menuAlignment: "left",
    },
}
Default.parameters = { controls: { include: ['menuIcon', 'modalTitle', 'hintText', 'inputPlaceholder', 'showBadge', 'badgeLabel', 'badgeColor', 'uploadText', 'importText', 'modalText'] } };