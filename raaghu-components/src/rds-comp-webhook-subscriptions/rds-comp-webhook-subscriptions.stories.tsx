import type { Meta, StoryObj } from '@storybook/react';
import RdsCompWebhookSubscription from "./rds-comp-webhook-subscriptions";


const meta: Meta = { 
    title: "Components/Webhook Subscription",
    component: RdsCompWebhookSubscription,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompWebhookSubscription>;

export default meta;
type Story = StoryObj<typeof RdsCompWebhookSubscription>;

export const Default: Story = {
    args: {
        
    }
} satisfies Story;
