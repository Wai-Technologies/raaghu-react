import type { Meta, StoryObj } from '@storybook/react';
import RdsCompPaymentCard from "./rds-comp-payment-card";

const meta: Meta = { 
  title: "Components/Payment Card",
    component: RdsCompPaymentCard,
    parameters: {
        layout: 'padded',
        docs: {
    description: {
        component: 
            'The **Payment Card** component is a customizable UI element designed to display and manage payment card information within your application. It provides a structured interface for presenting card details, making it ideal for e-commerce platforms, subscription services, or any application requiring payment card management. Fully customizable, the Payment Card component ensures a seamless user experience while maintaining consistency with your design system and functional requirements.'
    },
}
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompPaymentCard>;

export default meta;
type Story = StoryObj<typeof RdsCompPaymentCard>;

export const Default: Story = {
    args: {
        
    }
} satisfies Story;

