import type { Meta, StoryObj } from '@storybook/react';
import RdsCompPurchaseDeveloperSeats from "./rds-comp-purchase-developer-seats";

const meta: Meta = { 
  title: "Components/Purchase Developer Seats",
  component: RdsCompPurchaseDeveloperSeats,
  parameters: {
      layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
  },
} satisfies Meta<typeof RdsCompPurchaseDeveloperSeats>;

export default meta;
type Story = StoryObj<typeof RdsCompPurchaseDeveloperSeats>;

export const Default: Story = {
  args: {
    purchaseDeveloperData: {
      developerSeatsCounter: 50,
      taxAmount: 0,
      taxRate: 0,
    },
    developerPriceByIdDetails: {
      additionalDeveloperPrice: 149,
      taxPercentage: 0,
    },
  }
} satisfies Story;