import React from "react";
import { StoryObj, Meta } from "@storybook/react";
import RdsCompSkeleton from "./rds-comp-skeleton";

const meta: Meta = {
  title: "Components/Skeleton Components",
  component: RdsCompSkeleton,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["pagination", "dropdown", "card"],
    },
    isAnimated: {
      control: { type: "boolean" },
    },
    count: {
      control: { type: "number", min: 1 },
    },
    rows: {
      control: { type: "number", min: 1 },
    },
    columns: {
      control: { type: "number", min: 1 },
    },
    cardCount: {
      control: { type: "number", min: 1 },
    },
  },
} satisfies Meta<typeof RdsCompSkeleton>;

export default meta;

type Story = StoryObj<typeof RdsCompSkeleton>;

export const CardSkeleton: Story = {
  args: {
    type: "card",
    isAnimated: false,
    cardCount: 3,
  },
} satisfies Story;
CardSkeleton.parameters = {
  controls: {
    include: ["type", "isAnimated", "cardCount"],
  },
};

export const PaginationSkeleton: Story = {
  args: {
    type: "pagination",
    isAnimated: false,
    count: 5,
  },
} satisfies Story;
PaginationSkeleton.parameters = {
  controls: {
    include: ["type", "isAnimated", "count"],
  },
};

export const DropdownSkeleton: Story = {
  args: {
    type: "dropdown",
    isAnimated: false,
    count: 6,
  },
} satisfies Story;
DropdownSkeleton.parameters = {
  controls: {
    include: ["type", "isAnimated", "count"],
  },
};

// export const DataTableSkeleton: Story = {
//   args: {
//     type: "dataTable",
//     isAnimated: false,
//     rows: 3,
//     columns: 3,
//   },
// } satisfies Story;
// DataTableSkeleton.parameters = {
//   controls: {
//     include: ["type", "isAnimated", "rows", "columns"],
//   },
// };
