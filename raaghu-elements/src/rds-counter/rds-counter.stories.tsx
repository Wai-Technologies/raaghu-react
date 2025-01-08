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
        type: {
            options: ["default", "side", "bottom"],
            control: { type: "radio" },
        },
    },
} satisfies Meta<typeof RdsCounter>;

export default meta;
type Story = StoryObj<typeof RdsCounter>;

export const Default: Story = {
    args: {
        counterValue: 0,
        min: 0,
        max: 50,
        width: 135,
        colorVariant: "primary",
        type: "default", // Default button placement
        label: "Counter",
    },
};
Default.parameters = { controls: { include: ['min', 'max', 'width', 'colorVariant', 'type', 'label'] } };

export const Side: Story = {
    args: {
        counterValue: 0,
        min: 0,
        max: 50,
        width: 135,
        colorVariant: "secondary",
        type: "side", // Buttons placed side by side
        label: "Counter",
    },
};
Side.parameters = { controls: { include: ['min', 'max', 'width', 'colorVariant', 'type', 'label'] } };

export const Bottom: Story = {
    args: {
        counterValue: 0,
        min: 0,
        max: 50,
        width: 135,
        colorVariant: "success",
        type: "bottom", // Buttons placed below the counter
        label: "Counter",
    },
};
Bottom.parameters = { controls: { include: ['min', 'max', 'width', 'colorVariant', 'type', 'label'] } };
