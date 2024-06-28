import type { Meta, StoryObj } from '@storybook/react';
import RdsCompEmailSettings from "./rds-comp-email-settings";


const meta: Meta = { 
    title: "Components/Email Settings",
    component: RdsCompEmailSettings,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        displayType: {
            options: ["basic", "advanced"],
            control: { type: "select" },
        },
    },
} satisfies Meta<typeof RdsCompEmailSettings>;

export default meta;
type Story = StoryObj<typeof RdsCompEmailSettings>;

export const Default: Story = {
    args: {
        displayType: "basic",
    }
} satisfies Story;

export const Advanced: Story = {
    args: {
        displayType: "advanced",
    }
} satisfies Story;

