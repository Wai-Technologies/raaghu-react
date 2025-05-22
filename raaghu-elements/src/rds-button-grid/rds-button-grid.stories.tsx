import { Meta, StoryObj } from "@storybook/react";
import RdsButtonGrid, { ButtonInput } from "../rds-button-grid/rds-button-grid";

const meta: Meta = {
    title: "Elements/Button Grid",
    component: RdsButtonGrid,
    parameters: {
        layout: "padded",
        docs: {
   description: {
  component: `The Button Grid element is a versatile UI element designed to display a collection of buttons organized in customizable **rows** and **columns**. It supports multiple **color variants** and flexible button inputs, making it suitable for numeric keypads, option selectors, or interactive dashboards. This element provides a clean and organized layout to enhance user interaction and visual consistency.`,
},




    },
        
    },
    tags: ["autodocs"],
    argTypes: {
        colorVariant: {
            options: [
                "primary",
                "secondary",
                "success",
                "danger",
                "warning",
                "info",
                "dark",
                "light",
            ],
            control: { type: "select" },
        },        
    },
} satisfies Meta<typeof RdsButtonGrid>;

export default meta;
type Story = StoryObj<typeof RdsButtonGrid>;

const buttonInputs: ButtonInput[] = [
    {
        id: "1",
        text: "14",
    },
    {
        id: "2",
        text: "16",
    },
    {
        id: "3",
        text: "20",
    },
    {
        id: "4",
        text: "24",
    },
    {
        id: "5",
        text: "32",
    },
    {
        id: "6",
        text: "36",
    },
    {
        id: "7",
        text: "40",
    },
    {
        id: "8",
        text: "44",
    },
];

export const Default: Story = {
    args: {
        rows: 2,
        columns: 4,
        colorVariant: "primary", 
        buttonInputs: buttonInputs,       
    }
} satisfies Story;
Default.parameters = { controls: { include: ["rows", "columns", "colorVariant", "buttonInputs"] } };


const buttonInputsWithColor: ButtonInput[] = [
    {
        id: "1",
        text: "Primary",
        colorVariant: "primary",
    },
    {
        id: "2",
        text: "Secondary",
        colorVariant: "secondary",
    },
    {
        id: "3",
        text: "Tertiary",
        colorVariant: "tertiary",
    },
    {
        id: "4",
        text: "Neutral",
        colorVariant: "neutral",
    }
];

export const WithDifferentButtonColor: Story = {
    args: {
        rows: 2,
        columns: 2,
        buttonInputs: buttonInputsWithColor,       
    }
} satisfies Story;
WithDifferentButtonColor.parameters = { controls: { include: ["rows", "columns", "colorVariant", "buttonInputs"] } };
