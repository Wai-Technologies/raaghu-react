import React from "react";
import { StoryObj, Meta } from "@storybook/react";
import RdsSkeleton from "./rds-skeleton";

const meta: Meta = {
  title: "Elements/Skeleton",
  component: RdsSkeleton,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    shape: {
      options: ["rectangle", "circle"],
      control: { type: "radio" },
    },
    isAnimated: {
      control: { type: "boolean" },
    },
  },
} satisfies Meta<typeof RdsSkeleton>;

export default meta;

type Story = StoryObj<typeof RdsSkeleton>;

export const Default: Story = {
  args: {
    shape: "rectangle",
    isAnimated: false,
    width: "200px",
    height: "100px",
  },
} satisfies Story;
Default.parameters = {
  controls: {
    include: ["shape", "isAnimated", "width", "height"],
  },
};

export const Circle: Story = {
  args: {
    shape: "circle",
    isAnimated: false,
    width: "200px",
  },
} satisfies Story;
Circle.parameters = {
  controls: {
    include: ["shape", "isAnimated", "width"],
  },
};
