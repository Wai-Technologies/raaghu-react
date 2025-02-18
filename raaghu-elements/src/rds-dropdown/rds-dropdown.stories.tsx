import React from "react";
import RdsDropdown from "./rds-dropdown";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: 'Elements/Dropdown Button',
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
        buttonIcon: "plus",
        iconFill: false,
        iconStroke: true,
        size: "medium",
        darkDropdown: false,
        disable: false,
        isSelected: false,
        selectIcon: "circle",
        profileImage: "https://www.svgrepo.com/show/497407/profile-circle.svg",
        tooltip: true,
        tooltipPlacement: "right",
        tooltipTitle: "This is tooltip",
        listItems: [
            {
                label: "Option 1",
                id: "1",
                path: "",
            },
            {
                label: "Option 2",
                id: "2",
                path: "",
            },
            {
                label: "Option 3",
                id: "3",
                path: "",
            },
        ],
    }
}
Default.parameters = { controls: { include: ['displayType', 'colorVariant', 'layout', 'iconFill', 'iconStroke', 'buttonIcon', 'size', 'label', 'disable', 'isSelected','selectIcon','profileImage'] } };


export const WithSplit: Story = {
    args: {
        colorVariant: "primary",
        id: "3",
        size: "medium",
        darkDropdown: false,
        displayType: 'split',
        label: "Dropdown Button",
        layout: "Textonly",
        buttonIcon: "plus",
        iconFill: false,
        iconStroke: true,
        disable: false,
        isSelected: false,
        selectIcon: "circle",
        profileImage: "https://www.svgrepo.com/show/497407/profile-circle.svg",
        tooltip: true,
        tooltipPlacement: "right",
        tooltipTitle: "This is tooltip",
        listItems: [
            {
                label: "Option 1",
                id: "1",
                path: "",
            },
            {
                label: "Option 2",
                id: "2",
                path: "",
            },
            {
                label: "Option 3",
                id: "3",
                path: "",
            },
        ],
    }
}
Default.parameters = { controls: { include: ['displayType', 'colorVariant', 'layout', 'iconFill', 'iconStroke', 'buttonIcon', 'size', 'label', 'disable', 'isSelected','selectIcon','profileImage'] } };

export const LinkButton: Story = {
    args: {
        id: "4",
        displayType: 'dropdown',
        colorVariant: "primary",
        label: "Link Button",
        layout: "Textonly",
        buttonIcon: "plus",
        iconFill: false,
        iconStroke: true,
        size: "medium",
        darkDropdown: false,
        disable: false,
        isSelected: false,
        selectIcon: "circle",
        profileImage: "https://www.svgrepo.com/show/497407/profile-circle.svg",
        tooltip: true,
        tooltipPlacement: "right",
        tooltipTitle: "This is tooltip",
        listItems: [
            {
                label: "Option 1",
                id: "1",
                path: "",
            },
            {
                label: "Option 2",
                id: "2",
                path: "",
            },
            {
                label: "Option 3",
                id: "3",
                path: "",
            },
        ],
    }
} satisfies Story;

Default.parameters = {
    controls: {
        include: [
            'displayType',
            'colorVariant',
            'layout',
            'iconFill',
            'iconStroke',
            'buttonIcon',
            'size',
            'label',
            'disable',
            'isSelected',
            'selectIcon',
            'profileImage',
            'tooltip', 
            'tooltipPlacement', 
            'tooltipTitle', 
        ]
    }
};


