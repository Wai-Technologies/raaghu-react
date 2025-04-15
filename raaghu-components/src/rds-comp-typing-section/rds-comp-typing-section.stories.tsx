import type { Meta, StoryObj } from '@storybook/react';
import RdsCompTypingSection from "./rds-comp-typing-section";

const meta: Meta = { 
    title: "Components/AI ChatBox/Typing Section",
    component: RdsCompTypingSection,
    parameters: {
        layout: 'padded',
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
        placeholderText: "Ask me anything",
        icon_name: "enhancer",
    }
} satisfies Story;
