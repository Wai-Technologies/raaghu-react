import React from "react";
import RdsProgressBar from "./rds-progress-bar";
import { progress_colors } from "../../libs/types/colorvariant";
import { Meta, StoryObj } from "@storybook/react";


const meta: Meta = {
    title: 'Elements/ProgressBar',
    component: RdsProgressBar,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        colorVariant: {
            options: progress_colors,
            control: { type: "select" },
            if: { arg: 'colorVariant' }
        }
    },
} satisfies Meta<typeof RdsProgressBar>;

export default meta;
type Story = StoryObj<typeof RdsProgressBar>;



export const Default: Story = {
    args: {
        role: "single",
        colorVariant: "primary",
        striped: true,
        progressWidth: 40,
        animation: false,
        height: 4,
        displayLabel: true,
        displayPercentage: true
    }
} satisfies Story;
Default.parameters = { controls: { include: ['role', 'colorVariant', 'striped', 'progressWidth', 'animation', 'height', 'displayLabel', 'displayPercentage'] } };

export const MultiProgressBar: Story = {
    args: {
        role: "multiple",
        height: 15,
        progressValues: [
            {
                progressWidth: 50,
                colorVariant: "success",
                stripe: true,
                animation: true
            },
            {
                progressWidth: 20,
                colorVariant: "danger",
                stripe: true,
                animation: true
            },
            {
                progressWidth: 30,
                colorVariant: "info",
                stripe: true,
                animation: true
            },
        ],
    }
} satisfies Story;
MultiProgressBar.parameters = { controls: { include: ['role', 'height', 'progressValues'] } };

