import React from "react";
import { Meta, StoryObj } from "@storybook/react-vite";
import RdsOutput, { RdsOutputButtonType } from "./rds-output";

const meta: Meta =  {
  title: "Components/AI ChatBox/Output",
  component: RdsOutput,
  parameters:{
    docs:{
      description: {
  component: `The **Output** component provides a flexible container for displaying AI-generated results or content outputs. It includes customizable action buttons defined by the \`buttonInfo\` array, where each button has an \`id\` and a \`text\` label corresponding to predefined types such as \`Preview\` and \`Code\`. This component is ideal for interfaces requiring users to switch between different output views or modes, enhancing interaction with generated content.`
}

    }
  },  
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