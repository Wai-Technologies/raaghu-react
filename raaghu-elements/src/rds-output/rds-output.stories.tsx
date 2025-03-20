import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import RdsOutput from "./rds-output";

const meta: Meta =  {
  title: "Elements/Output",
  component: RdsOutput,
  tags: ['autodocs'],
  argTypes: {
  },
} satisfies Meta<typeof RdsOutput>

export default meta;
type Story = StoryObj<typeof RdsOutput>;

export const Default : Story = {
  args: {
        // button1Text: "Preview",
        // button2Text: "Code",
        buttonInfo: [
          {
            id : 1,
            text: "Preview",
          },
          {
            id : 2,
            text: "Code",
          }
        ]
  }
} satisfies Story;

Default.parameters = { controls: { include: [] } };