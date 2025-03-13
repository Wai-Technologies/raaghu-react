import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import RdsRadioButton, { RdsRadioButtonLayout, RdsRadioButtonState } from "./rds-radio-button";

const meta: Meta = {
    title: "Elements/Radio Button",
    component: RdsRadioButton,
    argTypes: {
        // displayType: {
        //     options: [
        //         "Default",
        //         "Horizontal"
        //     ],
        //     control: { type: "select" },
        // },
        layout: {
            options: [
                "Icon",
                "Icon with Label",
                "Icon with bottom Label",
            ],
            control: { type: "select" },
        },
        state: {
            options: [
                "Default",
                "Hover",
                "Disabled",
            ],
            control: { type: "select" },
        },
        selected: {
            control: { type: "boolean" },
        },
        text: {
            control: { type: "text" },
        }
    },
    tags: ['autodocs'],
} satisfies Meta<typeof RdsRadioButton>;

export default meta;
type Story = StoryObj<typeof RdsRadioButton>;


export const Default: Story = {
    args: {
        displayType: "Default",
        layout: RdsRadioButtonLayout.Icon, // Use the enum here
        state: RdsRadioButtonState.Default, // Use the enum here
        selected: false,
        text: "Label",
        itemList: [
            {
                id: 1,
                label: "Radio Button 1",
                checked: true,
                name: "radio_button",
            },
            {
                id: 2,
                label: "Radio Button 2",
                checked: true,
                name: "radio_button",
            },
            {
                id: 3,
                label: "Radio Button 3",
                checked: true,
                name: "radio_button",
            },
        ]
    }
} satisfies Story;
//Default.parameters = { controls: { include: ['displayType', 'itemList'] } };
Default.parameters = { controls: { include: ['layout', 'state', 'selected', 'text'] } };

// export const Horizontal: Story = {
//     args: {
//         displayType: "Horizontal",
//         itemList: [
//             {
//                 id: 1,
//                 label: "Radio Button 1",
//                 checked: true,
//                 name: "radio_button",
//             },
//             {
//                 id: 2,
//                 label: "Radio Button 2",
//                 checked: true,
//                 name: "radio_button",
//             },
//             {
//                 id: 3,
//                 label: "Radio Button 3",
//                 checked: true,
//                 name: "radio_button",
//             },
//         ]
//     }
// } satisfies Story;
// Horizontal.parameters = { controls: { include: ['displayType', 'itemList'] } };




