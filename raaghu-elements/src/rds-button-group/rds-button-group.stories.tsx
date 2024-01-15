import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsButtonGroup from "./rds-button-group";
import { button_colors } from "../../libs/types/colorvariant";

export default {
    title: "Elements/Button Group",
    component: RdsButtonGroup,
    argTypes: {
        colorVariant: {
            options: button_colors,
            control: { type: "select" },
        },
        size: {
            options: ["small", "medium", "large"],
            control: { type: "select" },
        },
        role:{
            options:["button", "radio" , "checkbox"],
            control:{type: "select"}
        }
    },
}as ComponentMeta<typeof RdsButtonGroup>;

const Template: ComponentStory<typeof RdsButtonGroup> = (args) => (
    <RdsButtonGroup {...args} />
);


export const Default = Template.bind({});
Default.args = {
    vertical: false,
    size: "medium",
    colorVariant:"primary",
    role:"button",
    buttonGroupItems: [
        {
            label: "Left",
            id: "",
            name: "",
            
        },
        {
            label: "Middle",
            id: "",
            name: "",
        },
        {
            label: "Right",
            id: "",
            name: "",
        }

    ]
};

export const CheckboxButtonGroup = Template.bind({});
CheckboxButtonGroup.args = {
    vertical: false,
    size: "medium",
    colorVariant:"primary",
    isOutline:true,
    role:"checkbox",
    buttonGroupItems: [
        {
            label: "Checkbox 1",
            id: "checkbox1",
            name: "",
            
        },
        {
            label: "Checkbox 2",
            id: "checkbox2",
            name: "",
        },
        {
            label: "Checkbox 3",
            id: "checkbox3",
            name: "",
        }

    ]
};

export const IconButtonGroup = Template.bind({});
IconButtonGroup.args = {
    vertical: false,
    size: "medium",
    colorVariant:"dark",
    role:"button",
    isOutline:true,
    buttonGroupItems: [
        {
            label: "",
            id: "",
            name: "",
            icon:"plus",
            iconWidth:"14px",
            iconHeight: "14px",
            colorVariant:"light"
        },
        {
            label: "",
            id: "",
            name: "",
            icon:"pencil",
            iconWidth:"14px",
            iconHeight: "14px",
            colorVariant:"light"
        },
        {
            label: "",
            id: "",
            name: "",
            icon:"delete",
            iconWidth:"14px",
            iconHeight: "14px",
            colorVariant:"light"
        }

    ]
};

export const RadioButtonGroup = Template.bind({});
RadioButtonGroup.args = {
    vertical: false,
    size: "medium",
    colorVariant:"primary",
    isOutline:true,
    role:"radio",
    buttonGroupItems: [
        {
            label: "radio1",
            id: "radio1",
            name: "btnradio",
            checked: true
        },
        {
            label: "radio2",
            id: "radio2",
            name: "btnradio",
            checked: true
        },
        {
            label: "radio3",
            id: "radio3",
            name: "btnradio",
            checked: true
        }

    ]
};


export const Vertical = Template.bind({});
Vertical.args = {
    vertical: true,
    size: "medium",
    colorVariant:"primary",
    role:"button",
    buttonGroupItems: [
        {
            label: "Left",
            id: "",
            name: "",
        },
        {
            label: "Middle",
            id: "",
            name: "",
        },
        {
            label: "Right",
            id: "",
            name: "",
        }

    ]
};
