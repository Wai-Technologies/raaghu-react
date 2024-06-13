import type { Meta, StoryObj } from '@storybook/react';
import RdsCompPaymentCard from "./rds-comp-payment-card";

const meta: Meta = { 
  title: "Components/Payment Card",
    component: RdsCompPaymentCard,
    parameters: {
        layout: 'padded',
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

