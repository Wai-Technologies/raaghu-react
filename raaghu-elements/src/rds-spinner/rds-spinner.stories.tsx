import { StoryObj, Meta } from "@storybook/react";
import RdsSpinner, { SpinnerLayout, SpinnerSize } from "./rds-spinner";

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
            options: ["Default", "Small", "Large",],
            control: { type: "select" },
        },
        layout: {
            options: ["Label on bottom", "Spinner + Label", "Label + Spinner", "Label on top"],
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

export const Default: Story = {
    args: {
        layout: SpinnerLayout.LabelAndSpinner,
        size: SpinnerSize.Small,
        showLabel: true,
        labelText:"Loading...",
        spinnerType: 'border',
        colorVariant: 'primary',
        width: '50px',
        height: '50px',
    },
} satisfies Story;
Default.parameters = { controls: { include: ['spinnerType','size','colorVariant', 'width', 'height', 'showLabel', 'layout',"labelText"] } };