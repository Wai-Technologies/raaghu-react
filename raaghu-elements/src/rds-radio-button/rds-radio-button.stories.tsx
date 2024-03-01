import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import RdsRadioButton from "./rds-radio-button";

const meta: Meta = {
    title: "Elements/RadioButton",
    component: RdsRadioButton,
    argTypes: {
        displayType: {
            options: [
                "Default",
                "Horizontal"
            ],
            control: { type: "select" },
        }
    },
    tags: ['autodocs'],
} satisfies Meta<typeof RdsRadioButton>;

export default meta;
type Story = StoryObj<typeof RdsRadioButton>;


export const Default: Story = {
    args: {
        displayType: "Default",
        label: "Radio Button",
        itemList: [
            {
                id: 1,
                label: "Radio Button 1",
                checked: false,
                name: "radio_button",
            },
            {
                id: 2,
                label: "Radio Button 2",
                checked: false,
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


export const Horizontal: Story = {
    args: {
        displayType: "Horizontal",
        label: "Radio Button",
        itemList: [
            {
                id: 1,
                label: "Radio Button 1",
                checked: false,
                name: "radio_button",
            },
            {
                id: 2,
                label: "Radio Button 2",
                checked: false,
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
// export const ErrorMessage = Template.bind({});
// ErrorMessage.args = {
//     state:"errorRadio",
//     errorMessage:"Error message" ,
//     displayType: "Default",
//     label:"Radio Button" ,
//     itemList : [
//         {
//             id: 1,
//             label: "Radio Button 1",
//             checked: false,
//             name:"radio_button",
//         },
//         {
//             id: 2,
//             label: "Radio Button 2",
//             checked: false,
//             name:"radio_button",
//         },
//         {
//             id: 3,
//             label: "Radio Button 3",
//             checked: true,
//             name:"radio_button",
//         },
//     ]
// };





