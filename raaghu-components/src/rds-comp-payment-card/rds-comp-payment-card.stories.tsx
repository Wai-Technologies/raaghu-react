import type { Meta, StoryObj } from '@storybook/react';
import RdsCompPaymentCard from "./rds-comp-payment-card";

const meta: Meta = { 
  title: "Components/Payment",
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
        payment: {
            options: ["default", "card", "detail", "tenure"],
            control: { type: "select" },
        }
    },
} satisfies Meta<typeof RdsCompPaymentCard>;

export default meta;
type Story = StoryObj<typeof RdsCompPaymentCard>;

export const Default: Story = {
    args: {
      summaryDetailsList : 
            {
                planName: "Teams",
                licenseTenureName: "1 Year",
                licensePrice: "799.00",
                additionalDevelopersCount: "15",
                additionalDevelopersPrice: "149",
                additionalDevelopersTotalPrice: "2235.00",
                totalPrice: "3034.00",
                taxPercentage: "18",
                taxPrice: "546.12",
                discountPercentage: "0",
                discountPrice: "$00.00",
                totalNetPrice: "$3580.12"
            },
        payment: "default"
    }
} satisfies Story;
Default.parameters = { controls: { include: ['summaryDetailsList'] } };

export const Card: Story = {
    args: {
        payment: "card",
    }
} satisfies Story;
Card.parameters = { controls: { include: ['paymentCardData', 'reset', 'onSaveHandler'] } };

export const Detail: Story = {
  args: {
    paymentModeList: [
      {
        id: 1,
        label: "Credit Card",
        checked: null,
        name: "Radio-Button",
      },
      {
        id: 2,
        label: "Paypal",
        checked: null,
        name: "Radio-Button",
      },
      {
        id: 3,
        label: "eTransfer",
        checked: null,
        name: "Radio-Button",
      },
    ],
    payment: "detail",
  },
} satisfies Story;
Detail.parameters = { controls: { include: ['paymentModeList', 'buttonSpinner', 'paymentDetails', 'reset', 'onSaveHandler'] } };

export const Tenure: Story = {
  args: {
    paymentTenure: [
      {
        "id": "055a3082-f712-c37d-2a5e-3a10c2ac974f",
        "licenseTenureName": "1 Year",
        "tenureCount": 1,
        "discountPercentage": 0,
        "discountAmount": 0,
        "editionId": "98c31254-1364-0c32-7eb4-3a10af43a2d8",
        "taxPercentage": 18
      },
      {
        "id": "c6a5466e-b8e0-f377-d3d9-3a10c2ad04ec",
        "licenseTenureName": "2 Years",
        "tenureCount": 2,
        "discountPercentage": 10,
        "discountAmount": 159.8,
        "editionId": "98c31254-1364-0c32-7eb4-3a10af43a2d8",
        "taxPercentage": 18
      },
      {
        "id": "de75f4b7-60ee-863d-48a5-3a10c2ad1eb1",
        "licenseTenureName": "3 Years",
        "tenureCount": 3,
        "discountPercentage": 20,
        "discountAmount": 479.4,
        "editionId": "98c31254-1364-0c32-7eb4-3a10af43a2d8",
        "taxPercentage": 18
      },
      {
        "id": "0d889fdf-00a9-7021-81e6-3a110b76a44c",
        "licenseTenureName": "4 Years",
        "tenureCount": 4,
        "discountPercentage": 30,
        "discountAmount": 958.8,
        "editionId": "98c31254-1364-0c32-7eb4-3a10af43a2d8",
        "taxPercentage": 18
      }
    ],
    payment: "tenure",
  }
} satisfies Story;
Tenure.parameters = { controls: { include: ['paymentTenure', 'sendTenureId', 'developerCount', 'reset', 'onSaveHandler'] } };
