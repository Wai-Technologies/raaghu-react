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
        spinnerType: {
            options: [
                "grow",
                "border"
            ],
            control: { type: "radio" },
        },
        width: {
            control: { type: 'text' },
        },
        height: {
            control: { type: 'text' },
        }
    },
} satisfies Meta<typeof RdsSpinner>;

export default meta;
type Story = StoryObj<typeof RdsSpinner>;

export const Border: Story = {
    args: {
        spinnerType: 'grow',
        colorVariant: 'primary',
        width: '50px',
        height: '50px',
    },
} satisfies Story;
Border.parameters = { controls: { include: ['spinnerType', 'colorVariant', 'width', 'height'] } };
