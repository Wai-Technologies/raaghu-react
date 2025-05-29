import type { Meta, StoryObj } from '@storybook/react';
import RdsCompOrderConfirmation from "./rds-comp-order-confirmation";

const meta: Meta = {
  title: "Components/Order Confirmation",
  component: RdsCompOrderConfirmation,
  parameters: {
    layout: 'padded',
    docs: {
    description: {
        component: 
            'The **Order Confirmation** component is a customizable UI element designed to display order confirmation details within your application. It provides a structured interface for presenting order summaries, payment details, and confirmation messages, making it ideal for e-commerce platforms, booking systems, or any application requiring order confirmation functionality. Fully customizable, the Order Confirmation component ensures a seamless user experience while maintaining consistency with your design system and functional requirements.'
    },
}
  },
  tags: ['autodocs'],
  argTypes: {
  },
} satisfies Meta<typeof RdsCompOrderConfirmation>;

export default meta;
type Story = StoryObj<typeof RdsCompOrderConfirmation>;

export const Default: Story = {
  args: {
    
  }
} satisfies Story;