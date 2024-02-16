
import type { Meta, StoryObj } from '@storybook/react';
import RdsCompOrderSummary from "./rds-comp-order-summary";


const meta: Meta = {
  title: "Components/Order Summary",
  component: RdsCompOrderSummary,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
  },
} satisfies Meta<typeof RdsCompOrderSummary>;

export default meta;
type Story = StoryObj<typeof RdsCompOrderSummary>;

export const Default: Story = {
  args: {
    isCheckout: true,
  }
} satisfies Story;




