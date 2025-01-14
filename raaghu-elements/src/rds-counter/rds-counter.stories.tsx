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
            options: ["Default", "Side", "Bottom"],
            control: { type: "radio" },
        },
        showLabel:{
            control: { type: "boolean" }
        },
        isDisabled: {  // Added this field for controlling the disabled state
            control: { type: "boolean" },
        },
        label: {
            control: { type: "text" },
        },
        min: {
            control: { type: "number" },
        },
        max: {
            control: { type: "number" },
        },
        width: {
            control: { type: "number" },
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
        width: 400,
        colorVariant: "primary",
        type: "Default", // Default button placement
        label: "Counter",
        isDisabled: false, // Default disabled state to false
        showLabel:true,
        showTitle:true,
    },
};

Default.parameters = { controls: { include: ['min', 'max', 'width', 'colorVariant', 'type', 'label', 'isDisabled','showLabel'] } };


export const Side: Story = {
    args: {
        counterValue: 0,
        min: 0,
        max: 50,
        width: 400,
        colorVariant: "primary",
        type: "Side", // Default button placement
        label: "Counter",
        isDisabled: false, // Default disabled state to false
        showLabel:true,
        showTitle:true,
    },
};

Side.parameters = { controls: { include: ['min', 'max', 'width', 'colorVariant', 'type', 'label', 'isDisabled','showLabel'] } };


export const Bottom: Story = {
    args: {
        counterValue: 0,
        min: 0,
        max: 50,
        width: 400,
        colorVariant: "primary",
        type: "Bottom", // Default button placement
        label: "Counter",
        isDisabled: false, // Default disabled state to false
        showLabel:true,
        showTitle:true,
    },
};

Bottom.parameters = { controls: { include: ['min', 'max', 'width', 'colorVariant', 'type', 'label', 'isDisabled','showLabel'] } };