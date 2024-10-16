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

        layout: {
            options: [
                "Textonly",
                "IconBefore",
                "onlyIcon",
            ],
            control: { type: "select" },
        },
    },
} satisfies Meta<typeof RdsDropdown>;

export default meta;
type Story = StoryObj<typeof RdsDropdown>;





export const Default: Story = {
    args: {
        id: "1",
        displayType: 'dropdown',
        colorVariant: "primary",
        label: "Dropdown Button",
        layout: "Textonly",
        icon: "plus",
        iconFill: true,
        iconStroke:false,
        size: "mid",
        darkDropdown: false,
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
} 
Default.parameters = { controls: { include: ['displayType','colorVariant','layout', 'iconFill', 'iconStroke', 'icon','size','label'] } };


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


