import React from "react";
import RdsDropdown from "./rds-dropdown";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: 'Elements/Dropdown',
    component: RdsDropdown,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        size: {
            options: [
                "small",
                "medium",
                "large"
            ],
            control: { type: "select" },
        },
        colorVariant: {
            options: [
                "primary",
                "secondary",
                "success",
                "danger",
                "warning",
                "info",
                "light",
                "dark",
                "white",
            ],
            control: { type: "select" },
        },
    },
} satisfies Meta<typeof RdsDropdown>;

export default meta;
type Story = StoryObj<typeof RdsDropdown>;





export const Default: Story = {
    args: {
        colorVariant: "primary",
        id: "1",
        size: "mid",
        darkDropdown: false,
        displayType: 'dropdown',
        label: "Dropdown Button",
        listItems: [
            {
                label: "Export To Excel",
                id: "1",
                path: "",
            },
            {
                label: "Import From Excel",
                id: "2",
                path: "",
            },
            {
                label: "Click here download sample import file",
                id: "3",
                path: "",
            },
        ],
    }
} satisfies Story;


export const WithSplit: Story = {
    args: {
        colorVariant: "primary",
        id: "3",
        size: "mid",
        darkDropdown: false,
        displayType: 'split',
        label: "Dropdown Button",
        listItems: [
            {
                label: "Export To Excel",
                id: "1",
                path: "",
            },
            {
                label: "Import From Excel",
                id: "2",
                path: "",
            },
            {
                label: "Click here download sample import file",
                id: "3",
                path: "",
            },
        ],
    }
} satisfies Story;
