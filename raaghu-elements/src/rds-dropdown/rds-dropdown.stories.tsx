import React from "react";
import RdsDropdown, { DisplayType, Layout, Shape, State, Style, TooltipPlacement } from "./rds-dropdown";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: 'Elements/Dropdown Button',
    component: RdsDropdown,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        state: {
            options: [
                "default",
                "selected"
            ],
            control: { type: "select" },
        },
        size: {
            options: [
                "small",
                "medium",
                "large"
            ],
            control: { type: "select" },
        },
        style: {
            options: [
                "primary",
                "secondary",
                "outline",
                "transparent",
            ],
            control: { type: "select" },
        },
        shape: {
            options: [
                "rectangle",
                "pill",
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
        states: {
            options: [
                "default",
                "hover",
                "disabled",
                "selected",
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
        state: "default",
        size: "medium",
        layout: Layout.TextOnly,
        states: State.Default,
        displayType: DisplayType.Dropdown,
        style: Style.Primary, 
        shape: Shape.Rectangle, 
        colorVariant: "primary",
        label: "Button",
        buttonIcon: "plus",
        iconFill: false,
        iconStroke: true,
        darkDropdown: false,
        disable: false,
        isSelected: false,
        selectIcon: "circle",
        profileImage: "https://www.svgrepo.com/show/497407/profile-circle.svg",
        tooltip: true,
        tooltipPlacement:TooltipPlacement.Right,
        tooltipTitle: "This is tooltip",
        showChevron: true, // Added showChevron prop
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
Default.parameters = { controls: { include: ['state','size','states','style', 'shape', 'layout', 'label', 'showChevron', /*'colorVariant', 'displayType','buttonIcon','disable', 'isSelected', 'selectIcon', 'iconFill', 'iconStroke', 'profileImage', 'tooltip', 'tooltipPlacement', 'tooltipTitle',*/ ] } };




// export const WithSplit: Story = {
//     args: {
//         state: "default",
//         colorVariant: "primary",
//         id: "3",
//         size: "medium",
//         darkDropdown: false,
//         displayType: 'split',
//         label: "Dropdown Button",
//         layout: "Textonly",
//         buttonIcon: "plus",
//         iconFill: false,
//         iconStroke: true,
//         disable: false,
//         isSelected: false,
//         selectIcon: "circle",
//         profileImage: "https://www.svgrepo.com/show/497407/profile-circle.svg",
//         tooltip: true,
//         tooltipPlacement: "right",
//         tooltipTitle: "This is tooltip",
     
//         listItems: [
//             {
//                 label: "Option 1",
//                 id: "1",
//                 path: "",
//             },
//             {
//                 label: "Option 2",
//                 id: "2",
//                 path: "",
//             },
//             {
//                 label: "Option 3",
//                 id: "3",
//                 path: "",
//             },
//         ],
//     }
// }
// Default.parameters = { controls: { include: ['state', 'displayType', 'colorVariant', 'layout', 'iconFill', 'iconStroke', 'buttonIcon', 'size', 'label', 'disable', 'isSelected', 'selectIcon', 'profileImage', ] } };

// export const LinkButton: Story = {
//     args: {
//         id: "4",
//         displayType: 'dropdown',
//         colorVariant: "primary",
//         label: "Link Button",
//         layout: "Textonly",
//         buttonIcon: "plus",
//         iconFill: false,
//         iconStroke: true,
//         size: "medium",
//         darkDropdown: false,
//         disable: false,
//         isSelected: false,
//         selectIcon: "circle",
//         profileImage: "https://www.svgrepo.com/show/497407/profile-circle.svg",
//         tooltip: true,
//         tooltipPlacement: "right",
//         tooltipTitle: "This is tooltip",
//         state: "default",
//         listItems: [
//             {
//                 label: "Option 1",
//                 id: "1",
//                 path: "",
//             },
//             {
//                 label: "Option 2",
//                 id: "2",
//                 path: "",
//             },
//             {
//                 label: "Option 3",
//                 id: "3",
//                 path: "",
//             },
//         ],
//     }
// } satisfies Story;

// Default.parameters = {
//     controls: {
//         include: [
//             'state',
//             'displayType',
//             'colorVariant',
//             'layout',
//             'iconFill',
//             'iconStroke',
//             'buttonIcon',
//             'size',
//             'label',
//             'disable',
//             'isSelected',
//             'selectIcon',
//             'profileImage',
//             'tooltip', 
//             'tooltipPlacement', 
//             'tooltipTitle', 
            
//         ]
//     }
// };