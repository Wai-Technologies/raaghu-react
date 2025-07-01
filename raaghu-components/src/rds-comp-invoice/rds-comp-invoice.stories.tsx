import type { Meta, StoryObj } from '@storybook/react';
import RdsCompInvoice from './rds-comp-invoice';


const meta: Meta = { 
    title: "Components/Invoice",
    component: RdsCompInvoice,
    parameters: {
        layout: 'padded',
        docs: {
    description: {
        component: 
            'The **Invoice** component is a customizable UI element designed to display invoice details in a structured and user-friendly format. It can be used to present billing information, transaction details, and payment summaries. This component is ideal for e-commerce platforms, billing systems, or any application requiring invoice generation and presentation. Fully customizable, the Invoice component ensures a seamless user experience while maintaining consistency with your design system and functional requirements.'
    },
}
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompInvoice>;

export default meta;
type Story = StoryObj<typeof RdsCompInvoice>;

export const Standard: Story = {
    args: {
    invoice: "default",
    }
} satisfies Story;
Standard.parameters = { controls: { include: [] } };

export const DetailReceipt: Story = {
  args: {
    invoice: "detailReceipt",
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
DetailReceipt.parameters = { controls: { include: ["invoiceDetails"] } };
