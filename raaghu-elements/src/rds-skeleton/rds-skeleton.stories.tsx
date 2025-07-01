import React from "react";
import { StoryObj, Meta } from "@storybook/react";
import RdsSkeleton, { RdsSkeletonShape, SkeletonState } from "./rds-skeleton";

const meta: Meta = {
  title: "Elements/Skeleton",
  component: RdsSkeleton,
  parameters: {
    layout: "padded",
    docs: {
      description: {
  component: `The **Skeleton** element is a flexible and customizable placeholder used to indicate loading content within your application. It provides a smooth user experience during data fetch or rendering delays by simulating the layout of the final content. The Skeleton supports multiple **shapes** (\`rectangle\`, \`circle\`) via the \`RdsSkeletonShape\` enum, and allows for **animation** toggling through the \`isAnimated\` boolean prop. Additionally, it accepts various **loading states** defined by the \`SkeletonState\` enum to represent different visual placeholders. Ideal for dashboards, cards, lists, and data-driven UIs, the Skeleton element can be fully tailored to fit your design system's visual language and loading experience standards.`,
},

      source: {
        transform: (code: string) => {
          // Transform shape enum - remove spaces and transform
          code = code.replace(/shape="([^"]+)"/g, (match, p1) => `shape={RdsSkeletonShape.${p1.replace(/\s+/g, "")}}`);
          code = code.replace(/shape:\s*"([^"]+)"/g, (match, p1) => `shape: RdsSkeletonShape.${p1.replace(/\s+/g, "")}`);
          // Transform state enum - remove spaces and transform
          code = code.replace(/state="([^"]+)"/g, (match, p1) => `state={SkeletonState.${p1.replace(/\s+/g, "")}}`);
          code = code.replace(/state:\s*"([^"]+)"/g, (match, p1) => `state: SkeletonState.${p1.replace(/\s+/g, "")}`);
          return code;
        },
      },
    },
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

export const Standard: Story = {
  args: {
    shape: RdsSkeletonShape.RECTANGLE,
    isAnimated: false,
    state: SkeletonState.State1,
  },
} satisfies Story;

Standard.parameters = {
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
