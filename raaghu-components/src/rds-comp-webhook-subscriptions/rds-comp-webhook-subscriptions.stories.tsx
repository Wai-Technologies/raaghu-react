import type { Meta, StoryObj } from '@storybook/react';
import RdsCompWebhookSubscription from "./rds-comp-webhook-subscriptions";


const meta: Meta = { 
    title: "Components/Webhook Subscription",
    component: RdsCompWebhookSubscription,
    parameters: {
        layout: 'padded',
        docs: {
    description: {
        component: 
            'The **Webhook Subscription** component is a functional UI element designed to manage and configure webhook subscriptions within an application. It allows administrators to define, view, and manage webhook endpoints and events efficiently. This component is ideal for applications requiring webhook integration, enabling seamless communication between systems. Fully customizable, the Webhook Subscription component ensures seamless integration with your design system while providing a user-friendly interface for managing webhook subscriptions effectively.'
    },
},
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompWebhookSubscription>;

export default meta;
type Story = StoryObj<typeof RdsCompWebhookSubscription>;

export const Standard: Story = {
    args: {
        
    }
} satisfies Story;
