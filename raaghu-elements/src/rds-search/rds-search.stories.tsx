import React from "react";
import RdsSearch from "./rds-search";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: 'Components/Search',
    component: RdsSearch,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        size: {
            options: ["small", "medium", "large"],
            control: { type: "select" },
        },
        iconPosition: {
            options: ["left", "right"],
            control: { type: "select" },
        },
        labelPosition: {
            options: ["top", "bottom", "left", "right"],
            control: { type: "select" }
        },
        onChange: { action: 'onChange' },
        onKeyPress: { action: 'onKeyPress' },
        onKeyUp: { action: 'onKeyUp' },
    },
} satisfies Meta<typeof RdsSearch>;

export default meta;
type Story = StoryObj<typeof RdsSearch>;

export const ClearableSearchWithIcon: Story = {
    args: {
        label: 'Search',
        labelPosition: 'top',
        placeholder: "Search",
        size: "small",
        iconPosition: "left",
    }
} satisfies Story;
ClearableSearchWithIcon.parameters = { controls: { include: ['label', 'labelPosition', 'placeholder', 'size', 'iconPosition'] } };


