import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsRadioButton from "./rds-radio-button";

export default {
    title: "Elements/RadioButton",
    component: RdsRadioButton,
    argTypes: {
        displayType:{
            options:[
                "Default",
                "Horizontal"
            ],
            control: { type: "select" },
        }
    },
    tags: ['autodocs'],
} as ComponentMeta<typeof RdsRadioButton>;

const Template: ComponentStory<typeof RdsRadioButton> = (args) => (
    <RdsRadioButton {...args} />
);

export const Default = Template.bind({});
Default.args = {
 
    displayType: "Default",
    label:"Radio Button" ,
    itemList : [
        {
            id: 1,
            label: "Radio Button 1",
            checked: false,
            name:"radio_button",
        },
        {
            id: 2,
            label: "Radio Button 2",
            checked: false,
            name:"radio_button",
        },
        {
            id: 3,
            label: "Radio Button 3",
            checked: true,
            name:"radio_button",
        },    
    ]
};

export const Horizontal = Template.bind({});
Horizontal.args = {
    displayType: "Horizontal",
    label:"Radio Button" ,
    itemList : [
        {
            id: 1,
            label: "Radio Button 1",
            checked: false,
            name:"radio_button",
        },
        {
            id: 2,
            label: "Radio Button 2",
            checked: false,
            name:"radio_button",
        },
        {
            id: 3,
            label: "Radio Button 3",
            checked: true,
            name:"radio_button",
        },    
    ]
};
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





