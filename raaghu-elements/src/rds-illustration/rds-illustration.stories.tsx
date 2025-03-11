import React from "react";
import { StoryObj, Meta } from "@storybook/react";
import RdsIllustration from "./rds-illustration";

const meta: Meta = {
  title: "Elements/Empty State",
  component: RdsIllustration,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    mode: {
      options: ["Dark NRA", "Light NRA"],
      control: { type: "select" },
    },
  },
} satisfies Meta<typeof RdsIllustration>;

export default meta;
type Story = StoryObj<typeof RdsIllustration>;

export const EmptyDataView: Story = {
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
EmptyDataView.parameters = {
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
