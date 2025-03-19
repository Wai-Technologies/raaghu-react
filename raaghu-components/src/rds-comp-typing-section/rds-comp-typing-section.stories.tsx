import type { Meta, StoryObj } from '@storybook/react';
import RdsCompTypingSection from "./rds-comp-typing-section";


const meta: Meta = { 
    title: "Components/Typing Section",
    component: RdsCompTypingSection,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        selectAllType: {
            options: [
                "default",
                "advanced",       
            ],
            control: { type: "radio" },
        },
    }, 
} satisfies Meta<typeof RdsCompTypingSection>;

export default meta;
type Story = StoryObj<typeof RdsCompTypingSection>;

export const Default: Story = {
    args: {
        selectAllType: "default",
        colorVariant: "#353535",
        placeholderText: "Ask me anything",
    }
} satisfies Story;
