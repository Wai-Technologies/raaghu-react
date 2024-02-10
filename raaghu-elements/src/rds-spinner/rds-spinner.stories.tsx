import React from "react";
import { ComponentStory, ComponentMeta, StoryObj, Meta } from "@storybook/react";
import RdsSpinner from "./rds-spinner";

const meta: Meta = {
    title: 'Elements/Spinner',
    component: RdsSpinner,
    parameters: {
        layout: '',
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
    },
} satisfies Meta<typeof RdsSpinner>;

export default meta;
type Story = StoryObj<typeof RdsSpinner>;



export const Spinner: Story = {
    args: {
        colorVariant: "primary",
        spinnerType: false
    }
} satisfies Story;


