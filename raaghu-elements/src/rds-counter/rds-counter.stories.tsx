import RdsCounter from "./rds-counter";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: 'Elements/Counter',
    component: RdsCounter,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        colorVariant: {
            options: [
                "primary",
                "secondary",
                "success",
                "info",
                "warning",
                "danger",
                "dark",
                "light",
            ],
            control: { type: "select" },
        },
        position: {
            options: ["top", "bottom", "left", "right"],
            control: { type: "radio" },
        },
    },
} satisfies Meta<typeof RdsCounter>;

export default meta;
type Story = StoryObj<typeof RdsCounter>;

export const Counter: Story = {
    args: {
        // counterValue: 0,
        min: 0,
        max: 50,
        width: 110,
        colorVariant: "primary",
        position: "top",
        label: "Counter",
    }
} satisfies Story;
Counter.parameters = { controls: { include: ['min', 'max', 'width', 'colorVariant', 'position', 'label'] } };
