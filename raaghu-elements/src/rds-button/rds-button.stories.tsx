import type { Meta, StoryObj } from '@storybook/react';
import RdsButton from './rds-button';

const meta: Meta = { 
    title: "Elements/Button",
    component: RdsButton,
    parameters: {
        layout: "centered",
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsButton>;

export default meta;
type Story = StoryObj<typeof RdsButton>;

export const Default: Story = {
    args: {
        colorVariant: "primary",
        label: "BUTTON",
        block: false,
        size: "medium",
        showLoadingSpinner: true,
    }
} satisfies Story;

export const Disable: Story = {
    args: {
        colorVariant: "primary",
        label: "Disable",
        isDisabled: true,
        block: false,
        size: "medium",
    }
} satisfies Story;

export const WithIcon: Story = {
    args: {
        icon: "plus",
        colorVariant: "primary",
        size: "medium",
        isFabIcon: true,
    }
} satisfies Story;

export const Outline: Story = {
    args: {
        isOutline: true,
        colorVariant: "primary",
        label: "BUTTON",
        block: false,
        size: "medium",
    }
} satisfies Story;

export const Tooltip: Story = {
    args: {
        colorVariant: "primary",
        icon: "plus",
        block: false,
        size: "medium",
        databstoggle: "tooltip",
        tooltip: true,
        tooltipPlacement: "right",
        tooltipTitle: "This is tooltip",
    }
} satisfies Story;

export const TextWithIcon: Story = {
    args: {
        icon: "plus",
        colorVariant: "primary",
        label: "Button",
        block: false,
        size: "medium",
        showLoadingSpinner: true,
    }
} satisfies Story;


