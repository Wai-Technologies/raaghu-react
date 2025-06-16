import type { Meta, StoryObj } from "@storybook/react";
import RdsCompPremiumSupport from "./rds-comp-premium-support";

const meta: Meta = {
  title: "Components/Premium Support",
  component: RdsCompPremiumSupport,
  parameters: {
    layout: "padded",
    docs: {
    description: {
        component: 
            'The **Premium Support** component is a customizable UI element designed to display and manage premium support options within your application. It provides a structured interface for users to access premium support features, such as contact information and personalized messages. This component is ideal for applications offering tiered support services, ensuring a seamless user experience while maintaining consistency with your design system and functional requirements.'
    },
}
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof RdsCompPremiumSupport>;

export default meta;
type Story = StoryObj<typeof RdsCompPremiumSupport>;

export const Default: Story = {
  args: {
    premiumSupportData: {
      phoneNumber: "",
      message: "",
    },
  },
} satisfies Story;
