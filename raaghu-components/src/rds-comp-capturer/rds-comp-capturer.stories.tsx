import type { Meta, StoryObj } from "@storybook/react";
import RdsCompCaptureCe from "./rds-comp-capturer";

const meta: Meta = {
    title: "Components/Capturer",
    component: RdsCompCaptureCe,
    parameters: {
        layout: "padded",
    },
    tags: ["autodocs"],
    argTypes: {},
} satisfies Meta<typeof RdsCompCaptureCe>;

export default meta;
type Story = StoryObj<typeof RdsCompCaptureCe>;

export const Default: Story = {
    args: {},
} satisfies Story;
