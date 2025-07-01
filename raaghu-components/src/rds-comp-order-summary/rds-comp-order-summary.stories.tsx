
import type { Meta, StoryObj } from '@storybook/react';
import RdsCompOrderSummary from "./rds-comp-order-summary";


const meta: Meta = {
  title: "Components/Order Summary",
  component: RdsCompOrderSummary,
  parameters: {
    layout: 'padded',
    docs: {
    description: {
        component: 
            'The **Order Summary** component is a customizable UI element designed to display a summary of orders within your application. It provides a structured interface for presenting order details, including items, pricing, and checkout options. This component is ideal for e-commerce platforms, booking systems, or any application requiring a concise and user-friendly order summary interface. Fully customizable, the Order Summary component ensures a seamless user experience while maintaining consistency with your design system and functional requirements.'
    },
}
  },
  tags: ['autodocs'],
  argTypes: {
  },
} satisfies Meta<typeof RdsCompOrderSummary>;

export default meta;
type Story = StoryObj<typeof RdsCompOrderSummary>;

export const Standard: Story = {
  args: {
    isCheckout: true,
  }
} satisfies Story;




