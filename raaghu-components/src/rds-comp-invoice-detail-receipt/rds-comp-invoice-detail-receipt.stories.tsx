import type { Meta, StoryObj } from '@storybook/react';
import RdsCompInvoiceDetailReceipt from "./rds-comp-invoice-detail-receipt";

const meta: Meta = { 
  title: "Components/Invoice Detail Receipt",
  component: RdsCompInvoiceDetailReceipt,
  parameters: {
      layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
  },
} satisfies Meta<typeof RdsCompInvoiceDetailReceipt>;

export default meta;
type Story = StoryObj<typeof RdsCompInvoiceDetailReceipt>;

export const Default: Story = {
  args: {
    invoiceDetails: {
      purchaseDate: "2024-05-29T14:30:00Z",
      billedTo: "John Doe",
      transactionId: "TRX20240529123456789",
      invoiceNumber: "INV-2024-MAY-29-001",
      grandTotal: 1587.2,
      subTotal: 1747,
      discount: 159.8,
      invoiceItems: [
        {
          itemName: "Premium Subscription",
          itemAmount: 149.00,
          quantity: 1,
          totalAmount: 149.00
        },
        {
          itemName: "Advanced Support Package",
          itemAmount: 799.00,
          quantity: 2,
          totalAmount: 1598.00
        },
      ]
    }
  }
} satisfies Story;