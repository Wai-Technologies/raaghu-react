import { StoryObj, Meta } from "@storybook/react";
import RdsSpinner from "./rds-spinner";

const meta: Meta = {
    title: 'Elements/Spinner',
    component: RdsSpinner,
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
        size: {
            options: ["small", "medium","large", "custom"],
            control: { type: "select" },
        },
        labelPosition: {
            options: ["top", "bottom", "right", "left"],
            control: { type: "select" },
        },
        spinnerType: {
            options: [
                "grow",
                "border"
            ],
            control: { type: "radio" },
        },
        width: {
            control: { type: 'text' },
            if: { arg: 'size', eq: 'custom' },
        },
        height: {
            control: { type: 'text' },
            if: { arg: 'size', eq: 'custom' },
        }
    },
} satisfies Meta<typeof RdsSpinner>;

export default meta;
type Story = StoryObj<typeof RdsSpinner>;

export const Border: Story = {
    args: {
        spinnerType: 'grow',
        label:"Loading...",
        colorVariant: 'primary',
        size: 'medium',
        width: '50px',
        height: '50px',
        showLabel: true,
        labelPosition: "right",
    },
} satisfies Story;
Border.parameters = { controls: { include: ['spinnerType','size','colorVariant', 'width', 'height', 'showLabel', 'labelPosition'] } };