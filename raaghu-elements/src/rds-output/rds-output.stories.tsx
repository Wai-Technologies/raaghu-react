import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import RdsOutput, { RdsOutputButtonType } from "./rds-output";

const meta: Meta =  {
  title: "Components/AI ChatBox/Output",
  component: RdsOutput,
  tags: ['autodocs'],
  argTypes: {
  },
} satisfies Meta<typeof RdsOutput>

export default meta;
type Story = StoryObj<typeof RdsOutput>;

export const Default : Story = {
  args: {
        buttonInfo: [
          {
            id : 1,
            text: RdsOutputButtonType.Preview,
          },
          {
            id : 2,
            text: RdsOutputButtonType.Code,
          }
        ]
  }
} satisfies Story;

Default.parameters = { controls: { include: [] } };