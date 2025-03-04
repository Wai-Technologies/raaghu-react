import React from "react";
import { StoryObj, Meta } from "@storybook/react";
import RdsSkeleton, { RdsSkeletonShape, SkeletonState } from "./rds-skeleton";

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
      control: { type: "select" }, 
    },
    isAnimated: {
      control: { type: "boolean" },
    },
    state: {
      options: [1, 2, 3], 
      control: { type: "select" },
    },
  },
} satisfies Meta<typeof RdsSkeleton>;

export default meta;

type Story = StoryObj<typeof RdsSkeleton>;

export const Default: Story = {
  args: {
    shape: RdsSkeletonShape.RECTANGLE,
    isAnimated: false,
    state: SkeletonState.State1,
  },
} satisfies Story;

Default.parameters = {
  controls: {
    include: ["shape", "isAnimated", "state"],
  },
};

// export const Circle: Story = {
//   args: {
//     shape: "circle",
//     isAnimated: false,
//     width: "200px",
//   },
// } satisfies Story;
// Circle.parameters = {
//   controls: {
//     include: ["shape", "isAnimated", "width"],
//   },
// };
