import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsCompEmailSettings from "./rds-comp-email-settings";


const meta: Meta = { 
    title: "Components/Email Settings",
    component: RdsCompEmailSettings,
    parameters: {
        layout: 'padded',
        docs: {
    description: {
        component: 
            'The **Email Settings** component is a versatile and customizable UI element designed to manage email configuration settings within your application. It supports two display types: `basic` and `advanced`. The `basic` display type allows users to update their email address with fields for `Current Email`, `New Email`, and `Confirm New Email`. The `advanced` display type provides a detailed interface for configuring email server settings, including fields for `Default From Display Name`, `Default From Address`, `Host`, `Port`, and options like `Enable SSL` and `Use Default Credentials`. This component is ideal for administrative dashboards, user account settings, or any interface requiring email configuration management. Fully customizable, the Email Settings component ensures a seamless user experience while maintaining consistency with your design system and functional requirements.'
    },
}
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

