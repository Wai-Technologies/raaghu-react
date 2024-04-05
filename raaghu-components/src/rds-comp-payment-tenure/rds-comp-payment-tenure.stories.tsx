/* eslint-disable */

import type { Meta, StoryObj } from '@storybook/react';
import RdsCompPaymentTenure from "./rds-comp-payment-tenure";


const meta: Meta = {
  title: "Components/Payment Tenure",
  component: RdsCompPaymentTenure,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
  },
} satisfies Meta<typeof RdsCompPaymentTenure>;

export default meta;
type Story = StoryObj<typeof RdsCompPaymentTenure>;

export const Default: Story = {
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
    ]
  }
} satisfies Story;




