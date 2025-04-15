import React from "react";
import RdsSortingDropdown from "./rds-sorting-dropdown";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: 'Components/AI ChatBox/Sorting Dropdown',
    component: RdsSortingDropdown,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsSortingDropdown>;

export default meta;
type Story = StoryObj<typeof RdsSortingDropdown>;


export const Default: Story = {
    args: {
        label: "Trending",
        listItems: [
            { label: "Trending", id: "1" },
            { label: "Top", id: "2" },
            { label: "Newest", id: "3" },
        ],
    }
}
Default.parameters = { controls: { include: ['label'] } };
