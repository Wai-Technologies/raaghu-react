import React from "react";
import { StoryObj, Meta } from "@storybook/react";
import RdsEmptyState from "./rds-empty-state";

const meta: Meta = {
  title: "Elements/Empty State",
  component: RdsEmptyState,
  parameters: {
    layout: "padded",
    docs: {
    description: {
        component:
            'The **Empty State** element is a visual component used to indicate the absence of data or content in a section of your application. It supports customizable modes (`Dark NRA`, `Light NRA`), labels, sub-labels, and illustration assets to match different themes and contexts. You can adjust the illustration’s size and provide descriptive text to guide users on what action to take next. This element is ideal for improving user experience by clearly communicating empty or loading states in dashboards, lists, or any area where data might not be available.'
    }
}
  },
  tags: ["autodocs"],
  argTypes: {
    mode: {
      options: ["Dark NRA", "Light NRA"],
      control: { type: "select" },
    },
  },
} satisfies Meta<typeof RdsEmptyState>;

export default meta;
type Story = StoryObj<typeof RdsEmptyState>;

export const Standard: Story = {
  args: {
    mode: "Dark NRA",
    label: "Currently you don't have any data",
    subLabel: "Click on the button above to add data",
    iconHeight: "250px",
    iconWidth: "250px",
    iconPath:
      "/assets/lottie-files/outlined/dual-color/illustration-light.json",
  },
} satisfies Story;
Standard.parameters = {
  controls: {
    include: [
      "mode",
      "label",
    //   "subLabel",
    //   "iconHeight",
    //   "iconWidth",
    //   "iconPath",
    ],
  },
};
