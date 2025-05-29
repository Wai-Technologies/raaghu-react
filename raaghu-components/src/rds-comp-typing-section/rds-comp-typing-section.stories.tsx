import type { Meta, StoryObj } from '@storybook/react';
import RdsCompTypingSection from "./rds-comp-typing-section";

const meta: Meta = { 
    title: "Components/AI ChatBox/Typing Section",
    component: RdsCompTypingSection,
    parameters: {
        layout: 'padded',
        docs:{
            description: {
  component: `The **Typing Section** component provides an intuitive and responsive input area for users to interact with the AI ChatBot. It includes a text field with customizable placeholder text, an optional icon, image preview support, and triggers for sending messages or adding attachments.

### Key Features:
- **Customizable Appearance**: Set input background color via \`colorVariant\` and personalize placeholder with \`placeholderText\`.
- **Icon Integration**: Use \`icon_name\` to add a relevant visual cue or button inside the input.
- **Message Handling**: Handles user input via the \`onSend\` callback, optionally supporting image attachments.
- **Attachment Support**: Allows adding comments or media through \`onAddComment\`, supporting richer interactions.
- **Preview Feature**: Supports an optional \`previewImage\` display before submission.

Ideal for chat interfaces or AI assistants, this component ensures a seamless and modern messaging experience across platforms.`
}

        }
    },
    tags: ['autodocs'],
    argTypes: {
    }, 
} satisfies Meta<typeof RdsCompTypingSection>;

export default meta;
type Story = StoryObj<typeof RdsCompTypingSection>;

export const Default: Story = {
    args: {
        colorVariant: "#353535",
        placeholderText: "How can AI Pundit help you today?",
        icon_name: "enhancer",
    }
} satisfies Story;
