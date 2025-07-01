import RdsCompAttachement from "./rds-comp-attachement";
import { Meta, StoryObj } from "@storybook/react";
 
const meta: Meta = {
    title: "Components/AI ChatBox/Attachement",
    component: RdsCompAttachement,
    argTypes: {
    },
    parameters: {
        layout: 'padded',
        docs:{
            description: {
  component: `The **Attachment** component is a versatile UI modal designed for uploading design resources and integrating them into AI-assisted workflows. It allows users to either upload files directly from their device or paste a Figma URL for automated design-to-code generation. Key props include \`modalTitle\` for setting the header, \`hintText\` for additional guidance, and \`inputPlaceholder\` for the URL input field. The component can display a premium badge via \`showBadge\`, \`badgeLabel\`, and \`badgeColor\` to indicate feature tiers. Functional props like \`handleAddComment\`, \`onFileSelect\`, and \`onFigmaSubmit\` provide hooks for comment handling and file submission. The \`modalText\` prop informs users about how to interact with the modal, while optional props like \`image\` and \`userData\` support further customization. This component is ideal for design systems integrating AI tools with collaborative file input mechanisms, especially in design-to-code or design review contexts.`
}

        }
    },
    tags: ['autodocs'],
} satisfies Meta<typeof RdsCompAttachement>;
 
 
export default meta;
type Story = StoryObj<typeof RdsCompAttachement>;
 
export const Standard: Story = {
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