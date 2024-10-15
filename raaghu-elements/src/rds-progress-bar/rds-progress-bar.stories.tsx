import React from "react";
import RdsProgressBar from "./rds-progress-bar";
import { button_colors } from "../../libs/types/colorvariant";
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
            options: button_colors,
            control: { type: "select" },
            if: { arg: 'colorVariant' }
        },
        State: {
            options: ['success', 'error'],
            control: { type: "select" },
            if: { arg: 'State' }
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
        height: 15,
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


export const Circular: Story = {
    args: {
        role: "Circular",
        State: "success", 
        progressWidth: 40,
        height: 80,
        displayPercentage: true
    },
    argTypes: {
        height: {
            control: {
                type: 'number',
                min: 80,
                max: 300,
            },
            table: {
                defaultValue: { summary: 80 },
            }
        }
    }
} satisfies Story;

Circular.parameters = { 
    controls: { 
        include: ['role', 'State', 'progressWidth', 'height', 'displayPercentage'] 
    } 
};


