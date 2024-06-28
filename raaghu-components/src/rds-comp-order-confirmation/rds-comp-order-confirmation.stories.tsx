import type { Meta, StoryObj } from '@storybook/react';
import RdsCompOrderConfirmation from "./rds-comp-order-confirmation";

const meta: Meta = {
  title: "Components/Order Confirmation",
  component: RdsCompOrderConfirmation,
  parameters: {
    layout: 'padded',
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