import type { Meta, StoryObj } from '@storybook/react';
import RdsCompEmailSettings from "./rds-comp-email-settings";


const meta: Meta = { 
    title: "Components/Email Settings",
    component: RdsCompEmailSettings,
    parameters: {
        layout: "",
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompEmailSettings>;

export default meta;
type Story = StoryObj<typeof RdsCompEmailSettings>;

export const Default: Story = {
    args: {
      emailSettings: {
        "currentEmail": "niphy.anto@waiin.com",
        "newEmail": "abc@waiin.com",
        "confirmEmail": "abc@waiin.com"
      }
    }
} satisfies Story;




