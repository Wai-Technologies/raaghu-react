import React from "react";
import RdsDropdown from "./rds-dropdown";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: 'Elements/Dropdown',
    component: RdsDropdown,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        size: {
            options: ["small", "mid", "large"],
            control: { type: "radio" },
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
        direction: {
            options: ["Drop-Up", "Drop-Right", "Drop-Down", "Drop-Left"],
            control: { type: "radio" },
        },
        // decorators: [
        //     (Story) => (
        //         <div style={{ margin: "150px 0", textAlign: "center" }}>
        //             <Story />
        //         </div>
        //     ),
        // ],
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
        label: "Dropdown Button",
        direction: "Drop-Down",
        split: false,
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
        label: "Dropdown Button",
        direction: "Drop-Down",
        split: true,
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
