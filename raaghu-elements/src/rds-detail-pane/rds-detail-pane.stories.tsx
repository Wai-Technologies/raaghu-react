import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import RdsDetailPane from "./rds-detail-pane";

const meta: Meta =  {
  title: "Elements/Detail Pane",
  component: RdsDetailPane,
  tags: ['autodocs'],
  argTypes: {
  },
} satisfies Meta<typeof RdsDetailPane>

export default meta;
type Story = StoryObj<typeof RdsDetailPane>;

export const Default : Story = {
  args: {}
} satisfies Story;

Default.parameters = { controls: { include: [] } };