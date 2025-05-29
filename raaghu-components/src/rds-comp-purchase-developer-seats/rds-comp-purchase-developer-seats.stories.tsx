import type { Meta, StoryObj } from '@storybook/react';
import RdsCompPurchaseDeveloperSeats from "./rds-comp-purchase-developer-seats";

const meta: Meta = { 
  title: "Components/Purchase Developer Seats",
  component: RdsCompPurchaseDeveloperSeats,
  parameters: {
      layout: 'padded',
      docs: {
    description: {
        component: 
            'The **Purchase Developer Seats** component is a customizable UI element designed to manage and display the purchase process for developer seats within your application. It supports features such as setting the number of developer seats, calculating tax amounts, and displaying pricing details. This component is ideal for subscription-based platforms, licensing systems, or any application requiring a streamlined and user-friendly interface for purchasing developer seats. Fully customizable, the Purchase Developer Seats component ensures a seamless user experience while maintaining consistency with your design system and functional requirements.'
    },
}
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