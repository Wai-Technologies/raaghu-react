import { StoryObj, Meta } from "@storybook/react";
import RdsLoader from "./rds-loader";
import type { LoaderSize } from "./rds-loader"; // Import the type

const meta: Meta = {
    title: 'Components/Loader',
    component: RdsLoader,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        loaderType: {
            options: [
                "line-wobble",
                "loader-moving",
                "loader-hash",
                "loader-jump",
                "sand",
                "rolling-rock",
                "loader-round",
                "rotate",
                "spin",
                "triangle",
                "spinner-ring",
            ],
            control: { type: "select" },
        },
        size: { // Add size argType
            options: ["small", "medium", "large"] as LoaderSize[],
            control: { type: "radio" },
            defaultValue: "medium",
            // Conditionally show the control only if loaderType is spinner-ring
            if: { arg: 'loaderType', eq: 'spinner-ring' }, 
        },
    },
} satisfies Meta<typeof RdsLoader>;

export default meta;
type Story = StoryObj<typeof RdsLoader>;


export const LineWobble: Story = {
    args: {
      loaderType: 'line-wobble',
    },
} satisfies Story;
// No parameters needed here

export const LoaderMoving: Story = {
  args: {
    loaderType: 'loader-moving',
  },
} satisfies Story;

export const LoaderHash: Story = {
  args: {
    loaderType: 'loader-hash',
  },
} satisfies Story;

export const LoaderJump: Story = {
  args: {
    loaderType: 'loader-jump',
  },
} satisfies Story;

export const Sand: Story = {
  args: {
    loaderType: 'sand',
  },
} satisfies Story;

export const RollingRock: Story = {
  args: {
    loaderType: 'rolling-rock',
  },
} satisfies Story;

export const LoaderRound: Story = {
  args: {
    loaderType: 'loader-round',
  },
} satisfies Story;

export const Rotate: Story = {
  args: {
    loaderType: 'rotate',
  },
} satisfies Story;

export const Spin: Story = {
  args: {
    loaderType: 'spin',
  },
} satisfies Story;

export const Triangle: Story = {
  args: {
    loaderType: 'triangle',
  },
} satisfies Story;

export const Spinner: Story = {
  args: {
    loaderType: 'spinner-ring',
    size: 'medium', // Set default size for this specific story
  },
} satisfies Story;
// Controls for size will show automatically due to argTypes 'if' condition
