import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Todos from "./rds-size";

export default {
    title: "Elements/Size",
    component: Todos,
    argTypes: {
        colorVariant: {
            options: [
                "primary",
                "secondary",
                "success",
                "info",
                "warning",
                "danger",
                "dark",
                "light",
            ],
            control: { type: "select" },
        },
        sizeType: {
            options: ["withoutDescription", "withDescription"],
            control: { type: "select" },
        },
    },
} as ComponentMeta<typeof Todos>;

const Template: ComponentStory<typeof Todos> = (args) => (
    <Todos {...args} />
);

export const Default = Template.bind({});
Default.args = {
    sizeType: "withoutDescription",
    sizeData: [
        { value: "XXS",inStock:false},
        { value: "XS", inStock:true},
        { value: "S", inStock:true},
        { value: "M", inStock:true},
        { value: "L", inStock:true},
        { value: "XL",inStock:true},
        { value: "XXL",inStock:true},
   
    ],

};

export const WithDescription = Template.bind({});
WithDescription.args = {
    sizeType: "withDescription",

    sizeDataWithDescription: [
        { value: "13", description: "impoity input " },
        { value: "15", description: "impoity input and ngonint"},
        { value: "14", description: " with the passanger"},
    ],
};
