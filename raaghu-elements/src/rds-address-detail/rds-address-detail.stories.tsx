import React from "react";
import RdsAddressDetail, { RdsAddressDetailProps } from "./rds-address-detail";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: 'Elements/Alert',
  component: RdsAddressDetail,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
  },
} satisfies Meta<typeof RdsAddressDetail>;

export default meta;
type Story = StoryObj<typeof RdsAddressDetail>;



//👇 Each story then reuses that template
export const AddressDetail: Story = {
  args: {
    withIcon: true,
    header: "Address Header",
    addressLine1: "Address Line 1",
    addressLine2: "Address Line 2",
    addressLine3: "Address Line 3",
    cardborder: true
  }
} satisfies Story;
