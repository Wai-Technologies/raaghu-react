import type { Meta, StoryObj } from "@storybook/react-vite";
import RdsCompPaymentDetail from "./rds-comp-payment-detail";

const meta: Meta = {
  title: "Components/Payment Detail",
  component: RdsCompPaymentDetail,
  parameters: {
    layout: "padded",
    docs: {
    description: {
        component: 
            'The **Payment Detail** component is a customizable UI element designed to display and manage payment details within your application. It supports features such as listing payment modes and capturing user selections, making it ideal for e-commerce platforms, subscription services, or any application requiring payment processing functionality. Fully customizable, the Payment Detail component ensures a seamless user experience while maintaining consistency with your design system and functional requirements.'
    },
}
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
  },
} satisfies Story;
