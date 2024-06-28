import { StoryObj, Meta } from "@storybook/react";
import RdsLoader from "./rds-loader";

const meta: Meta = {
    title: 'Elements/Loader',
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
            ],
            control: { type: "select" },
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
LineWobble.parameters = { controls: { include: ['loaderType'] } };

export const LoaderMoving: Story = {
  args: {
    loaderType: 'loader-moving',
  },
} satisfies Story;
LoaderMoving.parameters = { controls: { include: ['loaderType'] } };

export const LoaderHash: Story = {
  args: {
    loaderType: 'loader-hash',
  },
} satisfies Story;
LoaderHash.parameters = { controls: { include: ['loaderType'] } };

export const LoaderJump: Story = {
  args: {
    loaderType: 'loader-jump',
  },
} satisfies Story;
LoaderJump.parameters = { controls: { include: ['loaderType'] } };

export const Sand: Story = {
  args: {
    loaderType: 'sand',
  },
} satisfies Story;
Sand.parameters = { controls: { include: ['loaderType'] } };

export const RollingRock: Story = {
  args: {
    loaderType: 'rolling-rock',
  },
} satisfies Story;
RollingRock.parameters = { controls: { include: ['loaderType'] } };

export const LoaderRound: Story = {
  args: {
    loaderType: 'loader-round',
  },
} satisfies Story;
LoaderRound.parameters = { controls: { include: ['loaderType'] } };

export const Rotate: Story = {
  args: {
    loaderType: 'rotate',
  },
} satisfies Story;
Rotate.parameters = { controls: { include: ['loaderType'] } };

export const Spin: Story = {
  args: {
    loaderType: 'spin',
  },
} satisfies Story;
Spin.parameters = { controls: { include: ['loaderType'] } };

export const Triangle: Story = {
  args: {
    loaderType: 'triangle',
  },
} satisfies Story;
Triangle.parameters = { controls: { include: ['loaderType'] } };
