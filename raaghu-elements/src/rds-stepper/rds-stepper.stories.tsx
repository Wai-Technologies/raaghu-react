import React from "react";
import RdsStepper from "./rds-stepper";
import { Meta, StoryObj } from "@storybook/react";

export interface StepIconName {
    iconName: string;
    iconFill: boolean;
    iconStroke: boolean;
    iconWidth: string;
    iconHeight: string;
}

const meta: Meta = {
    title: 'Elements/Stepper',
    component: RdsStepper,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        steps: {
            control: { type: 'number', min: 1, max: 20 },
            defaultValue: 5,
        },
        selectedStep: {
            control: { type: 'number', min: 0, max: 9 },
            defaultValue: 4,
        },
        height: {
            control: { type: 'number', min: 5, max: 300 },
            defaultValue: 5,
        },
        state: {
            options: ['default', 'inprogress', 'completed', 'error'],
            control: { type: "select" },
        },
        variant: {
            options: ['filled', 'outlined'],
            control: { type: "select" },
        },
        Icon: {
            control: { type: 'boolean' },
            defaultValue: false,
        },
        iconName: {
            control: { type: 'text' },
            defaultValue: 'default-icon',
        },
        iconFill: {
            control: { type: 'boolean' },
            defaultValue: false,
        },
        iconStroke: {
            control: { type: 'boolean' },
            defaultValue: false,
        },
        iconWidth: {
            control: { type: 'text' },
            defaultValue: '20',
        },
        iconHeight: {
            control: { type: 'text' },
            defaultValue: '20',
        },
        StepIconName: {
            control: { type: 'object' },
            defaultValue: [
                { iconName: 'icon1', iconFill: true, iconStroke: false, iconWidth: '20', iconHeight: '20' },
                { iconName: 'icon2', iconFill: false, iconStroke: true, iconWidth: '20', iconHeight: '20' },
                { iconName: 'icon3', iconFill: true, iconStroke: true, iconWidth: '20', iconHeight: '20' },
                { iconName: 'icon4', iconFill: false, iconStroke: false, iconWidth: '20', iconHeight: '20' },
                { iconName: 'icon5', iconFill: true, iconStroke: false, iconWidth: '20', iconHeight: '20' }
            ],
        },
        stepperType: {
            options: ["simple", "withcheckbox"],
            control: { type: "select" },
        },
        showSubtitles: {
            control: { type: 'boolean' },
            defaultValue: true,
        },
    },
} satisfies Meta<typeof RdsStepper>;

export default meta;
type Story = StoryObj<typeof RdsStepper>;

export const Simple: Story = {
    args: {
        stepperType: "simple",
    }
} satisfies Story;
Simple.parameters = { controls: { include: ['stepperType'] } };

export const withcheckbox: Story = {
    args: {
        stepperType: "withcheckbox",  
        stepperDetails: [
        { label: "Project Details", subtitle: "You can initiate a project which will be workspace to track, monitor project progress" },
        { label: "Design System", subtitle: "Create and customize your design system based on your branding guidelines. AI Pundit will help you generate it." },
        { label: "Resource Allocation", subtitle: "Create and customize your design system based on your branding guidelines. AI Pundit will help you generate it" },
    ],
    showSubtitles: true,
    }
} satisfies Story;
withcheckbox.parameters = { controls: { include: ['stepperType', 'stepperDetails', 'showSubtitles'] } };

export const Dash: Story = {
    args: {
        role: "Dash",
        steps: 5,
        height: 5,
        state: 'default'
    },
} satisfies Story;

Dash.parameters = {
    controls: {
        include: ['state', 'height', 'steps']
    }
};


export const Block: Story = {
    args: {
        role: "Block",
        steps: 5,
        state: 'default',
        stepNames: ["Step 1", "Step 2", "Step 3", "Step 4", "Step 5"]
    },
} satisfies Story;

Block.parameters = {
    controls: {
        include: ['state', 'steps', 'stepNames']
    }
};

export const Stepper: Story = {
    args: {
        role: "Stepper",
        steps: 5,
        state: 'default',
        variant: 'filled',
        Icon: false,
        StepIconName: [
            { iconName: 'circle', iconFill: true, iconStroke: false, iconWidth: '20', iconHeight: '20' },
            { iconName: 'users', iconFill: false, iconStroke: true, iconWidth: '20', iconHeight: '20' },
            { iconName: 'administration', iconFill: true, iconStroke: true, iconWidth: '20', iconHeight: '20' },
            { iconName: 'award', iconFill: false, iconStroke: false, iconWidth: '20', iconHeight: '20' },
            { iconName: 'bag', iconFill: true, iconStroke: false, iconWidth: '20', iconHeight: '20' }
        ]
    },
} satisfies Story;

Stepper.parameters = {
    controls: {
        include: ['state', 'steps', 'variant', 'Icon', 'StepIconName']
    }
};