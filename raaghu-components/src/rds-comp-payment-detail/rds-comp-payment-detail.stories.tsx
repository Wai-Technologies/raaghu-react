import type { Meta, StoryObj } from "@storybook/react";
import RdsCompPaymentDetail from "./rds-comp-payment-detail";

const meta: Meta = {
  title: "Components/Payment Detail",
  component: RdsCompPaymentDetail,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof RdsCompPaymentDetail>;

export default meta;
type Story = StoryObj<typeof RdsCompPaymentDetail>;

export const Default: Story = {
  args: {
    paymentModeList: [
      {
        id: 1,
        label: "Credit Card",
        checked: true,
        name: "Radio-Button",
      },
      {
        id: 2,
        label: "Paypal",
        checked: true,
        name: "Radio-Button",
      },
      {
        id: 3,
        label: "eTransfer",
        checked: true,
        name: "Radio-Button",
      },
    ],
  },
} satisfies Story;
