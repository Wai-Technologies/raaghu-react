import RdsTag from "./rds-tag";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: 'Components/Tag',
    component: RdsTag,
    parameters: { 
        layout: 'padded',
    },
    tags:['autodocs'],
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
        tagType:{
            options:["square" , "round"],
            control: { type: "select" },
        },
        role:{
            options:["basic" , "tagWithScroll"],
            control: { type: "select" },
        },
    },
} satisfies Meta<typeof RdsTag>;

export default meta;
type Story = StoryObj<typeof RdsTag>;


export const MultiTagInput :Story={
    args:{
        tagType:"square" ,
        role:"basic",
        colorVariant:"primary",
        fillClose:false,
        tagArray:[ "primary",
        "secondary",
        "success",
        "info",
        "warning",
        "danger",
        "dark",
        "light",]
    }
} satisfies Story;

MultiTagInput.parameters = { controls: { include: ["tagType","role","colorVariant","fillClose","tagArray"] } };