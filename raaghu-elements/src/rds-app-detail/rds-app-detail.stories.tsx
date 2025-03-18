import React from "react";
import RdsAppDetail from "./rds-app-detail";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "Components/App Details",
  component: RdsAppDetail,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    iconPosition: {
      options: ["left", "center", "right"],
      control: { type: "radio" },
    },
  },
} satisfies Meta<typeof RdsAppDetail>;

export default meta;
type Story = StoryObj<typeof RdsAppDetail>;

export const Default: Story = {
  args: {
    iconPosition: "left",
    showUpperBorder: true,
    linkUrl: "https://example.com",
    appDetailsItem: {
      title: "Zapier",
      subtitle: "Build custom automation and integration with app",
      icon: "zapier",
      route: "/home",
      selected: true,
      iconHeight: "30px",
      iconWidth: "30px",
      iconFill: true,
      iconColor: "warning",
      iconStroke: true,
      routeLabel: "View integration",
    },
  },
} satisfies Story;
Default.parameters = {
  controls: { include: ["iconPosition", "appDetailsItem", "showUpperBorder"] },
};
