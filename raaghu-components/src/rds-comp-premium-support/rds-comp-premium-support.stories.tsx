import type { Meta, StoryObj } from "@storybook/react";
import RdsCompPremiumSupport from "./rds-comp-premium-support";

const meta: Meta = {
  title: "Components/Premium Support",
  component: RdsCompPremiumSupport,
  parameters: {
    layout: "padded",
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
